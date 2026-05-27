## 🏥 India Diabetes + Cardiovascular Clinical Decision Support System

## 📌 Overview

This project is a rule-based Clinical Decision Support System (CDSS) designed for Indian healthcare context, focusing on:

- 🩺 Type 2 Diabetes Management  
- ❤️ Cardiovascular Disease Management  
- 🧠 CKD-aware drug safety adjustments  
- 💊 Indian drug pricing & affordability logic  

It generates patient-specific clinical recommendations using an Option C recommendation engine based on Indian clinical guidelines and safety logic.

---

## ⚙️ Key Features

### 🧠 Option C Engine (Core Logic)

- Patient-specific recommendation generation
- Multi-condition handling (Diabetes + CKD + HF + AF)
- Dynamic treatment escalation logic
- Clinical recommendation prioritization
- Drug safety-aware decision generation

---

### 🩸 Diabetes Module (RSSDI-Based)

- HbA1c-based therapy escalation
- Second-line drug suggestions
- Renal-safe drug selection
- Cost-aware prescribing logic
- Indian formulary-focused recommendations

---

### ❤️ Cardiovascular Module (CSI-Based)

- STEMI emergency workflow logic
- Post-MI anticoagulation guidance
- Heart failure medication safety checks
- AF stroke prevention considerations
- Cardiovascular risk-focused recommendations

---

### ⚠️ Safety Engine

- CKD-aware renal dose adjustment recommendations
- Sulfonylurea hypoglycemia risk detection in CKD/Elderly patients
- Pioglitazone contraindication alerts in Heart Failure
- Hyperkalemia monitoring alerts (ACEi/ARB + elevated potassium)
- Drug safety checks across Diabetes + Cardiovascular therapies
- Heart Failure fluid-retention risk detection
- Medication safety warnings integrated into Option C recommendations

---

### 💊 Indian Drug Intelligence

- NLEM 2022-based affordability system
- Indian brand awareness (real-world prescribing logic)
- Cost-sensitive therapy recommendations
- Generic-focused prescribing support
- Indian healthcare affordability considerations

---

## 🧱 System Architecture

```text
Frontend (React / Next.js UI)
        ↓
Option C Engine (TypeScript Rules Engine)
        ↓
Safety Engine (Risk + Contraindication Layer)
        ↓
Clinical Recommendation Generator
        ↓
Patient-Specific Clinical Report
```

---

## 📁 Project Structure

```text
brahmo_india_clinical/
│
├── docs/
│   ├── architecture.md
│   └── data_sources.md
│
├── supabase/
│   ├── schema.sql
│   └── seed.sql
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── PatientSelector.tsx
│   │   ├── OptionCPanel.tsx
│   │   ├── SafetyAlerts.tsx
│   │   └── GenericAI.tsx
│   │
│   ├── lib/
│   │   ├── types.ts
│   │   ├── supabase.ts
│   │   └── utils.ts
│   │
│   └── engine/
│       ├── optionCEngine.ts
│       ├── safetyEngine.ts
│       └── recommendationEngine.ts
│
├── .env.local.example
├── README.md
├── package.json
└── tsconfig.json
```

---

## 🧠 Folder Responsibilities

### `src/engine`

Contains the core clinical decision-making logic:

- Option C recommendation generation
- Drug safety validation
- Renal dosing adjustments
- Multi-condition rule handling

---

### `src/components`

Frontend UI components responsible for:

- Patient selection
- Clinical recommendation display
- Safety alerts
- Generic AI summary panel

---

### `src/lib`

Shared utilities and helper functions:

- Type definitions
- Supabase connection
- Utility/helper functions

---

### `supabase`

Database layer:

- SQL schema definitions
- Seeded demo clinical data
- Drug, guideline, and patient records

---

### `docs`

Project documentation:

- System architecture
- Clinical data sources
- Research references

---

## 📊 Data Sources

This system is built using Indian clinical and regulatory references:

- 📘 RSSDI 2022 Guidelines (Diabetes Management)
- ❤️ Cardiological Society of India (CSI) Guidelines
- 💊 NLEM 2022 (Government of India)
- 🏛 CDSCO – Drug regulatory framework
- 💰 Real-world Indian drug pricing references (MRP-based estimates)

Detailed references are documented in:

```text
docs/data_sources.md
```

---

## 🛡 Safety Highlights

- Renal function-aware therapy recommendations
- CKD-based hypoglycemia prevention logic
- Heart Failure contraindication alerts
- Hyperkalemia monitoring integration
- Multi-condition medication safety validation
- Drug safety recommendations integrated into Option C output

---

## 🚀 Local Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd brahmo_india_clinical
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create `.env.local` using `.env.local.example`

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
LLM_API_KEY=your_openai_api_key
```

---

### 4. Run Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:3000
```

---

