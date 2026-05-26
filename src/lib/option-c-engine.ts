import type { Patient, OptionC } from "./types";

// ------------------------------------
// HELPERS
// ------------------------------------

function parseNumericLab(value: unknown) {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.\-]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function getPatientValue(patient: Patient, key: string) {
  const direct = (patient as any)[key];
  if (direct !== undefined) return direct;

  const labKey = Object.keys(patient.labs || {}).find(
    (k) => k.toLowerCase() === key.toLowerCase()
  );

  return labKey ? patient.labs?.[labKey] : undefined;
}

function normalizeMedicationNames(patient: Patient) {
  return (patient.medications || []).map((med) => {
    const name = typeof med === "string" ? med : med.name || "";
    return name.toLowerCase();
  });
}

function pushUnique(list: string[], value: string) {
  if (!list.includes(value)) list.push(value);
}

// ------------------------------------
// MAIN ENGINE
// ------------------------------------

export function generateOptionC(patient: Patient): OptionC {
  // --------------------------
  // LABS
  // --------------------------
  const eGFR = parseNumericLab(getPatientValue(patient, "eGFR"));
  const hba1c = parseNumericLab(getPatientValue(patient, "HbA1c"));
  const bmi = parseNumericLab(getPatientValue(patient, "BMI")) ?? patient.bmi;

  // --------------------------
  // CONDITIONS
  // --------------------------
  const conditions = (patient.conditions || []).map((c) =>
    c.toLowerCase()
  );

  const medications = normalizeMedicationNames(patient);

  const hasT2DM = conditions.some((c) => /t2dm|diabetes/.test(c));
  const hasCKD = conditions.some((c) => /ckd|chronic kidney disease/.test(c));
  const hasHTN = conditions.some((c) => /htn|hypertension/.test(c));

  const hasMetformin = medications.some((m) =>
    /metformin/.test(m)
  );

  const isObese = bmi !== undefined ? bmi >= 30 : false;

  // --------------------------
  // OUTPUT ARRAYS
  // --------------------------
  const key_recommendations: string[] = [];
  const diabetes_recommendations: string[] = [];
  const renal_recommendations: string[] = [];
  const cardiology_recommendations: string[] = [];
  const lifestyle_recommendations: string[] = [];
  const drug_safety_flags: string[] = [];
  const cost_notes: string[] = [];
  const monitoring_plan: string[] = [];

  // ====================================
  // DIABETES LOGIC
  // ====================================
  if (hasT2DM && hba1c !== undefined) {
    if (hba1c >= 9) {
      pushUnique(
        diabetes_recommendations,
        `HbA1c ${hba1c}% indicates uncontrolled diabetes`
      );

      pushUnique(
        diabetes_recommendations,
        "Consider insulin initiation if oral therapy inadequate"
      );
    } else if (hba1c >= 8) {
      pushUnique(
        diabetes_recommendations,
        `HbA1c ${hba1c}% above target`
      );

      pushUnique(
        diabetes_recommendations,
        "Consider SGLT2 inhibitor or DPP4 inhibitor based on renal function"
      );
    }
  }

  // ====================================
  // CKD LOGIC
  // ====================================
  if (eGFR !== undefined) {
    if (eGFR < 30) {
      pushUnique(renal_recommendations, `Severe CKD (eGFR ${eGFR})`);

      pushUnique(
        drug_safety_flags,
        "Metformin contraindicated in severe CKD"
      );

      if (hasMetformin) {
        pushUnique(
          diabetes_recommendations,
          "STOP metformin due to severe CKD"
        );
      }
    } else if (eGFR < 45) {
      pushUnique(
        renal_recommendations,
        `CKD Stage 3b (eGFR ${eGFR}) requires dose adjustment`
      );

      if (hasMetformin) {
        pushUnique(
          diabetes_recommendations,
          "Reduce metformin dose or switch therapy due to CKD"
        );
      }

      pushUnique(
        drug_safety_flags,
        "Renal impairment increases hypoglycemia risk"
      );
    } else {
      pushUnique(
        renal_recommendations,
        `eGFR ${eGFR} — renal dosing acceptable`
      );
    }
  }

  if (hasCKD) {
    pushUnique(
      renal_recommendations,
      "CKD requires periodic creatinine and potassium monitoring"
    );
  }

  // ====================================
  // HTN
  // ====================================
  if (hasHTN) {
    pushUnique(
      cardiology_recommendations,
      "Continue ACEi/ARB therapy"
    );
  }

  // ====================================
  // COST ENGINE (FIXED - IMPORTANT)
  // ====================================

  let hasCostSpecificLogic = false;

  if (hasT2DM) {
    // CKD + METFORMIN COST LOGIC
    if (eGFR !== undefined && eGFR < 45 && hasMetformin) {
      pushUnique(
        cost_notes,
        "Prefer renal-safe low-cost alternatives instead of metformin"
      );

      pushUnique(
        cost_notes,
        "Teneligliptin preferred DPP4 inhibitor in India (cost-effective)"
      );

      pushUnique(
        cost_notes,
        "Insulin may be more cost-effective than multiple oral agents"
      );

      hasCostSpecificLogic = true;
    }

    // HIGH HbA1c COST STRATEGY
    if (hba1c !== undefined && hba1c >= 9) {
      pushUnique(
        cost_notes,
        "Insulin is often cost-effective in uncontrolled diabetes"
      );

      hasCostSpecificLogic = true;
    }
  }

  // FALLBACK COST ONLY IF NOTHING SPECIFIC
  if (!hasCostSpecificLogic) {
    pushUnique(
      cost_notes,
      "Use NLEM-based affordable Indian medicines when appropriate"
    );
  }

  // ====================================
  // LIFESTYLE
  // ====================================
  pushUnique(
    lifestyle_recommendations,
    isObese
      ? "Weight reduction + low carb Indian diet"
      : "Maintain healthy lifestyle"
  );

  // ====================================
  // MONITORING
  // ====================================
  pushUnique(monitoring_plan, "HbA1c every 3 months");

  if (eGFR !== undefined && eGFR < 60) {
    pushUnique(monitoring_plan, "Renal function every 3 months");
  }

  pushUnique(monitoring_plan, "BP and weight monitoring each visit");

  // ====================================
  // KEY SUMMARY
  // ====================================
  pushUnique(
    key_recommendations,
    `Patient with ${patient.conditions.join(", ")}`
  );

  if (hba1c && hba1c >= 8) {
    pushUnique(
      key_recommendations,
      "Poor glycemic control requiring escalation"
    );
  }

  if (eGFR && eGFR < 45) {
    pushUnique(
      key_recommendations,
      "Renal impairment affecting drug selection"
    );
  }

  if (isObese) {
    pushUnique(
      key_recommendations,
      "Obesity contributing to cardiometabolic risk"
    );
  }

  // ====================================
  // RETURN
  // ====================================
  return {
    patient_code: patient.patient_code,

    key_recommendations,
    diabetes_recommendations,
    renal_recommendations,
    cardiology_recommendations,
    lifestyle_recommendations,
    drug_safety_flags,
    cost_notes,
    monitoring_plan,
  };
}