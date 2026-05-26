# System Architecture Documentation

## 1. Overview

The Option C Clinical Decision Support System is a rule-based AI simulation platform designed to assist clinical decision-making using structured patient data and Indian clinical guidelines.

It is NOT a machine learning system. It is a deterministic rule-engine-based system.

---

## 2. High-Level Architecture
Patient Data (Supabase DB)
↓
API Layer (/api/patients, /api/safety-check, /api/option-c)
↓
Rule Engine (Option C Engine - TypeScript)
↓
Clinical Logic Processing
↓
Structured Output (Recommendations, Alerts, Formulary)
↓
Frontend UI (Next.js React Components)


---

## 3. System Components

### 3.1 Frontend (Next.js)
- PatientSelector
- ResponseComparison
- SafetyAlerts
- FormularyPanel
- GuidelineSources

Responsibilities:
- Display patient data
- Handle user interaction
- Render clinical outputs

---

### 3.2 API Layer
- `/api/patients` → fetch patient list from DB
- `/api/safety-check` → runs safety engine
- `/api/option-c` → runs clinical reasoning engine

Responsibilities:
- Connect frontend to backend logic
- Normalize data flow

---

### 3.3 Clinical Rule Engine (Option C Engine)

Core logic implemented in TypeScript.

Handles:
- Diabetes management rules (RSSDI-based)
- Cardiology rules (CSI-based)
- CKD staging (KDIGO-based)
- Drug safety validation
- Cost optimization (NLEM-based)
- Multi-condition overlap reasoning

---

## 4. Data Layer (Supabase)

Tables:
- patients
- drugs
- interactions
- guidelines

Responsibilities:
- Store structured clinical data
- Enable scalable patient simulation
- Support dynamic scenario testing

---

## 5. Safety Engine

The safety engine evaluates:
- Renal function risk
- Hypoglycemia risk
- Heart failure contraindications
- Drug-drug interactions
- Electrolyte abnormalities

Output:
- ALERT / WARNING / INFO classification

---

## 6. Design Philosophy

### Indian Clinical Context First
- RSSDI over ADA
- CSI over ACC/AHA
- NLEM-based affordability logic

---

## 7. Scalability Approach

The system is designed to scale without code changes:

To add new domains (e.g., Respiratory medicine):
- Add new guideline rules
- Add drug entries to DB
- Extend rule engine mappings

No UI rewrite required.

---

## 8. Limitations

- Not a real clinical EMR system
- Not AI/ML based
- Rule-based deterministic logic only
- Requires manual data updates

---

## 9. Summary

This system demonstrates:
- Clinical reasoning simulation
- Indian healthcare prioritization
- Multi-condition decision logic
- Safety-aware prescribing simulation