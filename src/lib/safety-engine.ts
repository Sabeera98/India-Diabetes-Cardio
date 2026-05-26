import type {
  SafetyAlert,
  FormularyItem,
  GuidelineSource,
} from "./types";

const HF_CONTRAINDICATED = [
  "pioglitazone",
  "saxagliptin",
];

const SU_DRUGS = [
  "glimepiride",
  "glipizide",
  "gliclazide",
  "glyburide",
  "tolbutamide",
];

// ----------------------
// HELPERS
// ----------------------

function parseNumericLab(value: unknown) {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const cleaned = value.replace(
      /[^0-9.\-]/g,
      ""
    );

    const parsed = Number(cleaned);

    return Number.isFinite(parsed)
      ? parsed
      : undefined;
  }

  return undefined;
}

function getLabValue(
  patient: any,
  key: string
) {
  if (patient?.[key] !== undefined) {
    return patient[key];
  }

  const patientKey = Object.keys(
    patient || {}
  ).find(
    (k) =>
      k.toLowerCase() ===
      key.toLowerCase()
  );

  if (
    patientKey &&
    patient[patientKey] !== undefined
  ) {
    return patient[patientKey];
  }

  const labKey = Object.keys(
    patient?.labs || {}
  ).find(
    (k) =>
      k.toLowerCase() ===
      key.toLowerCase()
  );

  return labKey
    ? patient.labs[labKey]
    : undefined;
}

function normalizeMedications(
  patient: any
) {
  return (
    patient.medications || []
  ).map((med: any) => {
    const name =
      typeof med === "string"
        ? med
        : med.name || "";

    return name.toLowerCase();
  });
}

function buildSafetyAlert(
  severity: SafetyAlert["severity"],
  title: string,
  description: string
): SafetyAlert {
  return {
    severity,
    title,
    description,
  };
}

function buildPatientContext(
  patient: any
) {
  const eGFR = parseNumericLab(
    getLabValue(patient, "eGFR")
  );

  const HbA1c =
    parseNumericLab(
      getLabValue(patient, "HbA1c")
    ) ??
    parseNumericLab(
      getLabValue(patient, "hba1c")
    );

  const potassium =
    parseNumericLab(
      getLabValue(patient, "K")
    ) ??
    parseNumericLab(
      getLabValue(
        patient,
        "Potassium"
      )
    );

  return {
    age: patient.age,

    sex:
      patient.sex || "unknown",

    conditions:
      patient.conditions || [],

    medications:
      normalizeMedications(
        patient
      ),

    eGFR,
    HbA1c,
    potassium,

    labs: patient.labs || {},
  };
}

function buildGenericSummary(
  patient: any
) {
  const context =
    buildPatientContext(patient);

  const ageLabel = context.age
    ? `${context.age}-year-old`
    : "adult";

  const sexLabel =
    context.sex === "M"
      ? "male"
      : context.sex === "F"
        ? "female"
        : "patient";

  return [
    `Patient: ${ageLabel} ${sexLabel}`,

    `Conditions: ${context.conditions.length
      ? context.conditions.join(
        ", "
      )
      : "none"
    }`,

    `Medications: ${context.medications.length
      ? context.medications.join(
        ", "
      )
      : "none"
    }`,

    `Labs: eGFR ${context.eGFR !== undefined
      ? context.eGFR
      : "unknown"
    }, HbA1c ${context.HbA1c !== undefined
      ? context.HbA1c
      : "unknown"
    }`,

    "Clinical summary should focus on evidence-based international guidelines.",
  ].join("\n");
}

// ----------------------
// MAIN ENGINE
// ----------------------

export async function runSafetyEngine(
  patient: any,
  drugs: any[],
  formularyMaster: any[]
) {
  const alerts: SafetyAlert[] = [];

  const renal_flags: string[] = [];

  const hf_flags: string[] = [];

  let hypoglycemia_risk:
    | "low"
    | "moderate"
    | "high" = "low";

  let interaction_risk:
    | "low"
    | "moderate"
    | "severe" = "low";

  const context =
    buildPatientContext(patient);

  const medications =
    context.medications;

  // ----------------------
  // HF FLAGS
  // ----------------------

  if (
    context.conditions.some(
      (c: string) =>
        /heart failure/i.test(c)
    )
  ) {
    hf_flags.push(
      "Heart failure present"
    );
  }

  medications.forEach(
    (name: string) => {
      if (
        HF_CONTRAINDICATED.includes(
          name
        )
      ) {
        hf_flags.push(
          `${name} contraindicated in HF`
        );

        alerts.push(
          buildSafetyAlert(
            "HIGH",
            "HF contraindication",
            `Avoid ${name} in heart failure.`
          )
        );
      }
    }
  );

  // ----------------------
  // RENAL
  // ----------------------

  if (
    context.eGFR !== undefined &&
    context.eGFR < 30
  ) {
    renal_flags.push(
      "Severe CKD (eGFR <30)"
    );

    alerts.push(
      buildSafetyAlert(
        "HIGH",
        "Severe CKD",
        "Avoid metformin and review renal dosing."
      )
    );
  } else if (
    context.eGFR !== undefined &&
    context.eGFR < 45
  ) {
    renal_flags.push(
      "Moderate CKD (eGFR 30–45)"
    );

    alerts.push(
      buildSafetyAlert(
        "MODERATE",
        "Moderate CKD",
        "Review renal dosing carefully."
      )
    );
  } else if (
    context.eGFR !== undefined
  ) {
    alerts.push(
      buildSafetyAlert(
        "INFO",
        "Renal Function",
        `eGFR ${context.eGFR} — renal dosing acceptable.`
      )
    );
  }

  // ----------------------
  // HYPOGLYCEMIA
  // ----------------------

  const hasSU =
    medications.some(
      (name: string) =>
        SU_DRUGS.includes(name)
    );

  if (
    hasSU &&
    context.age > 60
  ) {
    hypoglycemia_risk =
      "high";

    alerts.push(
      buildSafetyAlert(
        "HIGH",
        "Hypoglycemia Risk",
        "Sulfonylurea use in elderly patient increases hypoglycemia risk."
      )
    );
  } else if (hasSU) {
    hypoglycemia_risk =
      "moderate";

    alerts.push(
      buildSafetyAlert(
        "MODERATE",
        "Hypoglycemia Risk",
        "Sulfonylurea therapy may increase hypoglycemia risk."
      )
    );
  }

  // ----------------------
  // HYPERKALEMIA
  // ----------------------

  if (
    context.potassium !==
    undefined &&
    context.potassium >= 5.0 &&
    medications.some(
      (name: string) =>
        /telmisartan|losartan|valsartan|ramipril|enalapril|lisinopril/.test(
          name
        )
    )
  ) {
    alerts.push(
      buildSafetyAlert(
        "MODERATE",
        "Hyperkalemia Risk",
        "Elevated potassium with ACEi/ARB therapy requires monitoring."
      )
    );
  }

  // ----------------------
  // POLYPHARMACY
  // ----------------------

  if (medications.length >= 3) {
    interaction_risk =
      "moderate";

    alerts.push(
      buildSafetyAlert(
        "MODERATE",
        "Polypharmacy",
        "Multiple medications present — review interactions."
      )
    );
  }

  // ----------------------
  // ALLERGY
  // ----------------------

  if (
    typeof patient.allergy ===
    "string" &&
    /sulfonamide|sulfa/i.test(
      patient.allergy
    )
  ) {
    alerts.push(
      buildSafetyAlert(
        "HIGH",
        "Sulfonamide Allergy",
        "Avoid sulfonylureas and sulfa-containing drugs."
      )
    );
  }

  // ----------------------
  // REAL DATABASE FORMULARY
  // ----------------------

  const formulary: FormularyItem[] =
    [];

  (
    patient.medications || []
  ).forEach((m: any) => {
    const medName =
      typeof m === "string"
        ? m
        : m.name || "";

    const normalized =
      medName.toLowerCase();

    // MATCH DRUG TABLE

    const matchedDrug =
      drugs.find(
        (drug: any) =>
          drug.generic_name?.toLowerCase() ===
          normalized
      );

    // MATCH FORMULARY TABLE

    const matchedFormulary =
      formularyMaster.find(
        (item: any) =>
          item.generic_name?.toLowerCase() ===
          normalized
      );

    const status =
      matchedFormulary
        ?.availability ||
      "Available";

    const notes: string[] = [];

    if (
      matchedDrug?.hf_safe ===
      false
    ) {
      notes.push(
        "HF caution"
      );
    }

    if (
      matchedDrug?.renal_safety ===
      "caution"
    ) {
      notes.push(
        "Renal caution"
      );
    }

    if (
      matchedDrug?.hypoglycemia_risk ===
      "high"
    ) {
      notes.push(
        "High hypoglycemia risk"
      );
    }

    formulary.push({
      name: medName,

      status,

      price:
        matchedDrug?.monthly_cost
          ? `₹${matchedDrug.monthly_cost}/month`
          : undefined,

      note:
        notes.length > 0
          ? notes.join(
            " • "
          )
          : "Generic available",
    });
  });

  // ----------------------
  // GUIDELINES
  // ----------------------

  const guidelines: GuidelineSource[] = [];

  // ----------------------
  // CONDITIONS
  // ----------------------

  const hasDiabetes = context.conditions.some((c: string) =>
    /t2dm|diabetes/i.test(c)
  );

  const hasHTN = context.conditions.some((c: string) =>
    /htn|hypertension/i.test(c)
  );

  const hasCKD =
    context.conditions.some((c: string) =>
      /ckd|chronic kidney disease/i.test(c)
    ) || (context.eGFR !== undefined && context.eGFR < 60);

  const hasSTEMI = context.conditions.some((c: string) =>
    /stemi|mi|infarction|acs/i.test(c)
  );

  const hasHF = context.conditions.some((c: string) =>
    /heart failure|hf/i.test(c)
  );

  const hasAF = context.conditions.some((c: string) =>
    /af|atrial fibrillation/i.test(c)
  );

  // ----------------------
  // DIABETES GUIDELINES
  // ----------------------

  if (hasDiabetes) {
    guidelines.push({
      source: "RSSDI",
      tag: "Diabetes",
      note: "RSSDI diabetes management",
    });
  }

  // ----------------------
  // CKD GUIDELINES
  // ----------------------

  if (
    hasCKD ||
    (context.eGFR !== undefined &&
      context.eGFR < 60)
  ) {
    guidelines.push({
      source: "RSSDI",
      tag: "Renal",
      note: "Renal dosing considerations in diabetes (India context)",
    });
  }

  // ----------------------
  // CARDIOVASCULAR (CSI ONLY)
  // ----------------------

  if (hasHTN || hasHF || hasSTEMI || hasAF) {
    guidelines.push({
      source: "CSI",
      tag: "Cardiology",
      note: "CSI cardiovascular risk and heart failure management",
    });
  }

  if (alerts.length === 0) {
    alerts.push(
      buildSafetyAlert(
        "INFO",
        "No urgent safety alerts",
        "Continue routine monitoring."
      )
    );
  }

  return {
    generic_summary:
      buildGenericSummary(
        patient
      ),

    alerts,

    renal_flags,

    hf_flags,

    hypoglycemia_risk,

    interaction_risk,

    formulary,

    guidelines,
  };
}