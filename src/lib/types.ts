export type Medication = {
  name: string;
  dose: string;
};

export type LabValues = Record<string, number | string>;
export type Vitals = Record<string, number | string>;

export type InsuranceInfo = {
  provider: string;
  coverage: string;
  monthly_cap?: string;
};

export type Patient = {
  patient_code: string;
  case_label: string;

  age: number;
  sex?: "M" | "F";

  bmi?: number;
  conditions: string[];

  medications: Medication[];

  allergy?: string;

  labs?: Record<string, number>;
  vitals?: Record<string, any>;
  insurance?: Record<string, any>;
  income?: string | null;
  notes?: string;
};

export type SafetyResult = {
  renal_flags: string[];
  hf_flags: string[];

  hypoglycemia_risk: "low" | "moderate" | "high";
  interaction_risk: "low" | "moderate" | "severe";

  alerts: SafetyAlert[];
  formulary: FormularyItem[];
  guidelines: GuidelineSource[];
};

export type GuidelineSource = {
  source: string;
  tag: string;
  note: string;
};

export type SafetyAlert = {
  severity: "HIGH" | "MODERATE" | "INFO";
  title: string;
  description: string;
};

export type FormularyItem = {
  name: string;
  status: string;
  price?: string;
  note?: string;
};

export type OptionC = {
  patient_code: string;
  key_recommendations: string[];
  diabetes_recommendations: string[];
  renal_recommendations: string[];
  cardiology_recommendations: string[];
  lifestyle_recommendations: string[];
  drug_safety_flags: string[];
  cost_notes: string[];
  monitoring_plan: string[];
}; 