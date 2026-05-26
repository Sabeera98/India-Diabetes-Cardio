import type { Patient, SafetyResult } from "./types";

type PatientContext = {
  age?: number;
  sex: string;
  conditions: string[];
  medications: string[];
  eGFR?: number;
  HbA1c?: number;
  labs: Record<string, any>;
};

function parseNumericLab(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.\-]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function getPatientLab(patient: Patient, key: string) {
  const direct = (patient as any)[key];
  if (direct !== undefined) return direct;

  const labKey = Object.keys(patient.labs || {}).find(
    (k) => k.toLowerCase() === key.toLowerCase()
  );
  return labKey ? patient.labs?.[labKey] : undefined;
}

function buildPatientContext(patient: Patient): PatientContext {
  const rawEgf = getPatientLab(patient, "eGFR");
  const rawHbA1c =
    getPatientLab(patient, "HbA1c") ?? getPatientLab(patient, "hba1c");

  return {
    age: patient.age,
    sex: patient.sex || "unknown",
    conditions: patient.conditions || [],
    medications: (patient.medications || []).map((med: any) =>
      typeof med === "string" ? med : med.name || ""
    ),
    eGFR: parseNumericLab(rawEgf),
    HbA1c: parseNumericLab(rawHbA1c),
    labs: patient.labs || {},
  };
}

export function buildGenericSummary(patient: Patient) {
  const context = buildPatientContext(patient);
  const ageLabel = context.age ? `${context.age}-year-old` : "adult";
  const sexLabel = context.sex === "M" ? "male" : context.sex === "F" ? "female" : "patient";

  return [
    `Patient: ${ageLabel} ${sexLabel}`,
    `Conditions: ${
      context.conditions.length ? context.conditions.join(", ") : "none"
    }`,
    `Medications: ${
      context.medications.length ? context.medications.join(", ") : "none"
    }`,
    `Labs: eGFR ${
      context.eGFR !== undefined ? context.eGFR : "unknown"
    }, HbA1c ${
      context.HbA1c !== undefined ? context.HbA1c : "unknown"
    }`,
    "Clinical summary should focus on evidence-based international guidelines.",
  ].join("\n");
}

export function buildIndiaOptionC(patient: Patient) {
  const context = buildPatientContext(patient);
  const advice: string[] = [];

  if (context.eGFR !== undefined && context.eGFR < 45) {
    advice.push("Avoid metformin or dose reduce in CKD");
    advice.push("Prefer insulin or dose-adjusted DPP4 inhibitors in CKD");
  }

  if (context.HbA1c !== undefined && context.HbA1c > 9) {
    advice.push("Consider insulin initiation due to uncontrolled diabetes");
  }

  if (context.conditions.some((c) => /ckd/i.test(c))) {
    advice.push("Avoid sulfonylureas in CKD patients");
    advice.push("Monitor renal function every 3–6 months");
  }

  if (context.conditions.some((c) => /stemi|mi|infarction/i.test(c))) {
    advice.push("Prioritize cardioprotective therapy and avoid fluid overload");
  }

  if (context.conditions.some((c) => /htn/i.test(c))) {
    advice.push("Optimize blood pressure control with RAS blockade when appropriate");
  }

  if (context.age !== undefined && context.age >= 65) {
    advice.push("Avoid high-risk hypoglycemia drugs in elderly patients");
  }

  const baseAdvice = [
    "Prefer low-cost Indian generics",
    "Adjust dosing for CKD",
    "Apply RSSDI and CSI principles to the selected patient",
  ];

  const merged = [...new Set([...advice, ...baseAdvice])];
  if (!merged.length) {
    merged.push(
      "Follow RSSDI and CSI guidance, individualizing therapy by age, labs, and comorbidities"
    );
  }

  return `INDIA OPTION C (RSSDI + CSI aligned):\n- ${merged.join("\n- ")}`;
}

export function composePrompt(
  patient: Patient,
  safety: SafetyResult
) {
  const context = buildPatientContext(patient);
  const genericSummary = buildGenericSummary(patient);
  const indiaOptionC = buildIndiaOptionC(patient);

  return `
You are a clinical decision support system.

Use Indian guidelines (RSSDI for diabetes, CSI for cardiology).

PATIENT CONTEXT:
Age: ${context.age ?? "unknown"}
Sex: ${context.sex}
Conditions: ${context.conditions.join(", ")}
Medications: ${context.medications.join(", ")}
eGFR: ${context.eGFR ?? "unknown"}
HbA1c: ${context.HbA1c ?? "unknown"}

GENERIC SUMMARY:
${genericSummary}

INDIA OPTION C:
${indiaOptionC}

SAFETY ENGINE OUTPUT:
- Renal Flags: ${safety.renal_flags.join(", ")}
- HF Flags: ${safety.hf_flags.join(", ")}
- Hypoglycemia Risk: ${safety.hypoglycemia_risk}
- Interaction Risk: ${safety.interaction_risk}

TASK:
1. Suggest safe medications
2. Avoid risky drugs
3. Consider Indian pricing (₹)
4. Consider hospital availability (Apollo Chennai)
5. Provide alternatives if needed

FORMAT:
- Risk summary
- Drug recommendations
- Warnings
- Alternatives
`;
}

