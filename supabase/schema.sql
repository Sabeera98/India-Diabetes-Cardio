-- Supabase schema for the India Diabetes + Cardiovascular assessment.
-- This file defines the patients table, hospital contacts, drugs, and guidelines tables.

CREATE TABLE patients (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- Identity
  patient_code text NOT NULL UNIQUE,
  case_label text NOT NULL,

  -- Demographics (FLAT — IMPORTANT)
  age integer,
  sex text,
  bmi numeric(5,2),

  -- Clinical conditions
  conditions jsonb NOT NULL DEFAULT '{}'::jsonb,

  -- Medications
  medications jsonb NOT NULL DEFAULT '[]'::jsonb,

  -- Labs & vitals (kept JSON because flexible)
  labs jsonb NOT NULL DEFAULT '{}'::jsonb,
  vitals jsonb NOT NULL DEFAULT '{}'::jsonb,

  -- AI / clinical outputs
  diagnosis_summary text,
  risk_level text, -- low | moderate | high | critical

  -- Social + insurance
  insurance jsonb,
  income_level text,

  -- Workflow
  visit_type text, -- OPD | Emergency | Follow-up

  -- Notes
  notes text,

  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hospital_contacts (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  department text NOT NULL,
  role text NOT NULL,
  name text NOT NULL,
  extension text,
  languages text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE drugs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  generic_name text NOT NULL,
  generic_name_normalized text NOT NULL,

  drug_class text,
  drug_subclass text,

  indian_brand text,
  manufacturer text,

  strength text,
  dosage_form text,
  pack_size text,

  mrp_price numeric,
  monthly_cost numeric,

  pricing jsonb,

  nlem_status boolean DEFAULT false,

  renal_safety text,  -- safe | caution | avoid | dose_adjustment_required

  hf_safe boolean DEFAULT false,

  hypoglycemia_risk text, -- low | moderate | high | none

  weight_effect text, -- gain | loss | neutral

  condition_tags jsonb, -- ["diabetes","cardiovascular"]

  renal_dosing jsonb,

  common_uses jsonb,
  contraindications jsonb,
  important_notes jsonb,

  created_at timestamptz DEFAULT now(),

  -- prevents duplicates
  UNIQUE(generic_name_normalized)
);

CREATE TABLE IF NOT EXISTS indian_guidelines (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_id text NOT NULL,
  condition text,
  category text,
  section text,
  recommendation text,
  evidence_level text,
  condition_tags jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE drug_interactions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  drug_a_id bigint NOT NULL,
  drug_b_id bigint NOT NULL,

  interaction_type text,

  severity text NOT NULL
    CHECK (severity IN ('mild', 'moderate', 'severe', 'contraindicated')),

  mechanism text,
  clinical_effect text,
  management text,

  monitoring_required boolean DEFAULT false,

  onset text,
  evidence_level text,

  created_at timestamptz DEFAULT now(),

  UNIQUE (drug_a_id, drug_b_id)
);

CREATE TABLE hospital_formulary (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  drug_id bigint NOT NULL,   -- links to drugs table

  in_stock boolean DEFAULT true,

  stock_level text,          -- low | medium | high | out_of_stock

  pharmacy_notes text,

  location text DEFAULT 'Apollo Chennai',

  last_updated timestamptz DEFAULT now()
);