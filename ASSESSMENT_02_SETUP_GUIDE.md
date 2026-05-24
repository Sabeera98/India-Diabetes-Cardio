# SETUP GUIDE: Build Option C for India
## India Diabetes + Cardiovascular: Environment Setup + AI Starter Prompt

---

## ENVIRONMENT SETUP

### What You Need Installed

| Tool | Why |
|------|-----|
| Node.js (v18+) | Runtime |
| Git | Version control + submission |
| VS Code (recommended) | Code editor |
| Supabase account (free) | PostgreSQL database |
| LLM API key | AI responses — free tier credits sufficient |
| Web browser | For researching Indian guidelines + drug prices |

### Mac Setup

```bash
brew install node  # if needed

# Create project
mkdir brahmo-india-clinical
cd brahmo-india-clinical && git init

npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-import-alias

npm install @supabase/supabase-js

# Create .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=your_url" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key" >> .env.local
echo "LLM_API_KEY=your_key" >> .env.local

npm run dev   # → http://localhost:3000
```

### Windows Setup

```powershell
# Install Node.js from https://nodejs.org (LTS)
# Install Git from https://git-scm.com

mkdir brahmo-india-clinical
cd brahmo-india-clinical
git init

npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-import-alias

npm install @supabase/supabase-js

# Create .env.local with your keys
npm run dev
```

### Supabase Setup

```
1. supabase.com → Sign up → Create project: "brahmo-india-clinical"
2. Settings → API → Copy URL + anon key → .env.local
3. SQL Editor → Create your tables (schema is YOUR design — part of the assessment)
4. Load YOUR researched data (Indian drugs, guidelines, interactions)
```

---

## AI STARTER PROMPT

**IMPORTANT:** This prompt scaffolds the TECHNICAL architecture. The CLINICAL DATA (Indian guidelines, drug brands, ₹ prices) is YOUR responsibility to research and add. Do not rely on the AI to make up Indian drug prices — verify against real sources.

```
I'm building a complete "Option C" clinical AI system for India covering 
Type 2 Diabetes AND Cardiovascular Disease. The system makes Claude 
dramatically better than generic AI by injecting Indian-specific clinical context.

TECH STACK: Next.js + TypeScript + Supabase + Claude API + Tailwind CSS

DATABASE (Supabase) — design these tables:

1. "drugs" — ALL drugs (diabetes AND cardiac) in ONE table:
   id, generic_name, generic_name_normalized, drug_class, drug_subclass,
   indian_brand_name, manufacturer, mrp_price (text: "₹180/strip"),
   nlem_status (boolean), renal_dosing (JSONB), 
   hf_safe (boolean — safe in heart failure?),
   weight_effect ("gain"/"neutral"/"loss"),
   hypoglycemia_risk ("low"/"moderate"/"high"),
   condition_tags (JSONB array: ["diabetes","cardiovascular","both"])

2. "drug_interactions" — ALL interactions in ONE table:
   drug_a_id, drug_b_id, severity, mechanism, clinical_effect, management
   NOTE: Must include CROSS-CONDITION interactions 
   (e.g., diabetes drug + cardiac drug)

3. "indian_guidelines" — ALL guidelines in ONE table:
   source_id ("RSSDI", "CSI", "MoHFW_STG"), condition, section,
   recommendation (TEXT), evidence_level,
   condition_tags (JSONB: ["diabetes"] or ["cardiovascular"] or ["diabetes","heart_failure"])

4. "hospital_formulary" — drug availability at Apollo Chennai:
   drug_id, in_stock, stock_level, pharmacy_notes

SAFETY ENGINE:
- eGFR auto-computation (CKD-EPI 2021)
- DDI check across ALL medications (diabetes + cardiac)
- Renal dosing flags
- Heart failure contraindication flags (Pioglitazone, Saxagliptin)
- Hypoglycemia risk assessment (SU + elderly, SU + CKD, SU + beta-blocker)
- CHA₂DS₂-VASc computation for AF patients

PROMPT COMPOSER:
India-specific template that:
- Cites RSSDI (not ADA) for diabetes
- Cites CSI (not ACC/AHA) for cardiovascular
- Uses Indian drug brands with ₹ MRP
- Considers insurance + income
- Includes Apollo Chennai hospital contacts
- For overlap patients: pulls guidelines from BOTH conditions

FRONTEND:
- Patient selector (6 patients: 3 diabetes, 2 cardiac, 1 overlap)
- Side-by-side: "Generic Claude" vs "India Option C"
- Safety alerts panel
- Formulary status display
- Active guideline sources shown

CRITICAL ARCHITECTURE REQUIREMENT:
ONE set of tables serves BOTH conditions. NO separate diabetes_drugs 
vs cardiac_drugs tables. Adding a third condition (e.g., respiratory) 
should require ONLY new data rows, ZERO code changes.

Start with database schema design. I will separately research and load 
the Indian clinical data (guidelines, drug brands, prices).
DO NOT make up Indian drug prices — I will verify against 1mg.com.
```

---

## DATA RESEARCH GUIDE

**This assessment requires you to research and source REAL Indian clinical data — not use pre-provided datasets.**

### Where to Find Indian Diabetes Data

| Data Needed | Where to Look |
|---|---|
| RSSDI guidelines | Search: "RSSDI clinical practice recommendations type 2 diabetes" — published in Indian journals |
| Indian diabetes drug brands | 1mg.com → search each drug (e.g., "Teneligliptin") → see brands + prices |
| Drug MRP pricing | 1mg.com, PharmEasy.in, Netmeds.com — actual retail prices shown |
| NLEM 2022 status | Search: "National List of Essential Medicines India 2022 PDF" — government publication |
| FDCs (fixed-dose combos) | 1mg.com → search "Metformin Glimepiride combination" → see Glycomet-GP etc. |
| Indian dietary considerations | Search: "South Indian diet glycemic index" or "RSSDI dietary recommendations" |

### Where to Find Indian Cardiovascular Data

| Data Needed | Where to Look |
|---|---|
| CSI ACS guidelines | Search: "Cardiological Society of India ACS guidelines" or "CSI STEMI management India" |
| Antiplatelet brands India | 1mg.com → search "Clopidogrel" or "Ticagrelor" → Indian brands + prices |
| Streptokinase vs Tenecteplase pricing | Key Indian reality: Streptokinase ~₹5,000-8,000 vs Tenecteplase ~₹25,000-35,000 |
| Indian Heart Rhythm Society | Search: "IHRS atrial fibrillation guidelines India" |
| Rheumatic Heart Disease | Very common in India (unlike US/UK) — search: "RHD India prevalence guidelines" |

### Tips for Data Research

```
✅ DO: Cross-check prices across 2-3 pharmacy websites
✅ DO: Note the date of the guideline version you're using
✅ DO: Include NLEM status — it affects pricing and availability
✅ DO: Look for Indian FDCs — they're huge in India and barely exist elsewhere
✅ DO: Include Teneligliptin — India's most-prescribed DPP4i (rare in US/UK)

❌ DON'T: Use ADA guidelines and call them "Indian guidelines"
❌ DON'T: Make up ₹ prices — they're easily verifiable
❌ DON'T: Assume US drug availability = Indian availability
❌ DON'T: Skip Streptokinase for ACS — it's first-line at non-PCI hospitals in India
❌ DON'T: Forget Rheumatic Heart Disease — common in India, rare in West
```

---

## PROJECT STRUCTURE

```
brahmo-india-clinical/
├── README.md
├── .env.local
├── .env.local.example
├── package.json
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── api/
│   │       ├── safety-check/route.ts
│   │       ├── compose-prompt/route.ts
│   │       └── claude/route.ts
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── safety-engine.ts
│   │   ├── calculators.ts
│   │   ├── prompt-composer.ts
│   │   └── types.ts
│   └── components/
│       ├── PatientCard.tsx
│       ├── SafetyAlerts.tsx
│       ├── ResponseComparison.tsx
│       └── GuidelineSources.tsx
├── supabase/
│   ├── schema.sql
│   └── seed.sql                  ← YOUR RESEARCHED DATA
├── docs/
│   ├── architecture.md
│   └── data_sources.md           ← REQUIRED: where you got every piece of data
└── research/                     ← Optional: save your source screenshots/PDFs
```

## TIME MANAGEMENT (8 hours)

| Phase | Hours | Focus |
|-------|:-----:|-------|
| Setup + read assessment thoroughly | 0.5 | Environment, understand requirements |
| Research Indian guidelines (RSSDI + CSI) | 1.0 | Find real guidelines, extract key recommendations |
| Research Indian drug brands + ₹ prices | 1.0 | 1mg.com, PharmEasy — verify each drug |
| Database schema + load researched data | 1.0 | Design tables, load drugs + guidelines + interactions |
| Safety engine (DDI, renal, HF flags) | 1.5 | Must work across diabetes AND cardiac drugs |
| Prompt composer (India-specific template) | 1.0 | RSSDI + CSI citations, Indian brands, cost awareness |
| Frontend + demo flow | 1.0 | Patient selector, side-by-side, safety alerts |
| Test all 6 scenarios + surprise-readiness | 0.5 | Verify system works for patients beyond the demo set |
| Innovation + write data_sources.md | 0.5 | Your additions + document every data source |

---

## SUBMISSION CHECKLIST

```
□ README.md with setup instructions
□ .env.local.example
□ supabase/schema.sql — ONE set of tables for BOTH conditions
□ supabase/seed.sql — YOUR researched Indian data (real brands, real prices)
□ docs/data_sources.md — WHERE you got every piece of data (REQUIRED)
□ All 6 demo scenarios work
□ Overlap patient (Patient 6) pulls guidelines from BOTH conditions
□ System handles NEW patients not in demo (surprise-ready)
□ Drug database has 30+ drugs with real Indian brands and ₹ MRP
□ Guideline nodes cite RSSDI and CSI (not ADA/ACC-AHA)
□ Safety engine works across diabetes + cardiac medications
□ Clean git history
□ docs/architecture.md explains scalability approach
```

*Setup Guide v1.0 — Build Option C for India*

---

## FREE TIER API OPTIONS (No Cost Required)

You do NOT need paid subscriptions. Here are free options:

| Provider | Free Tier | How to Get |
|---|---|---|
| **Anthropic (Claude)** | $5 free credit on new account | console.anthropic.com |
| **OpenAI (GPT)** | $5 free credit on new account | platform.openai.com |
| **Google (Gemini)** | Free tier available | ai.google.dev |

For AI-assisted research (finding Indian guidelines):
- Perplexity.ai (free — great for finding medical guidelines)
- ChatGPT free (for summarizing long medical documents)
- Claude.ai free (for help structuring guideline data)

For AI-assisted coding: Claude.ai free, ChatGPT free, Cursor free, Copilot free

For drug price research: 1mg.com, PharmEasy.in, Netmeds.com (all free, no account needed)

**Total cost to complete this assessment: $0**

---

## SEED DATA — 6 PATIENTS

### Diabetes Patients

```
PATIENT 1: "Failing Metformin" — 48M, BMI 31.1
Conditions: T2DM (3yr), HTN (1yr)
Meds: Metformin 1g BD, Telmisartan 40mg OD
Allergy: Sulfonamide (rash)
Labs: HbA1c 8.4%, FBS 168, Cr 0.9, eGFR 92, TC 220, LDL 142, HDL 38, TG 280
Vitals: BP 134/86, HR 78
Insurance: Star Health Gold — generic covered, branded need pre-auth, ₹5K/month cap
Income: Middle-class salaried

PATIENT 2: "Complex with CKD" — 62F, BMI 27.2
Conditions: T2DM (12yr), CKD 3b, HTN, Proliferative Retinopathy, Neuropathy
Meds: Metformin 500mg BD, Glimepiride 2mg OD, Atorvastatin 20mg HS, Telmisartan 80mg OD, Aspirin 75mg OD, Pregabalin 75mg BD
Allergy: NKDA
Labs: HbA1c 9.2%, Cr 1.8, eGFR 32, K+ 4.9, Urine ACR 380
Insurance: New India Assurance — ₹3L cap, mostly exhausted

PATIENT 3: "Auto-Driver" — 34M, BMI 35.3
Conditions: T2DM (2 months, newly diagnosed), Obesity, NAFLD
Meds: Metformin 500mg BD (just started)
Allergy: NKDA
Labs: HbA1c 8.8%, FBS 186, ALT 68, Cr 0.8, eGFR 108, TG 320, HDL 32
Insurance: NONE — auto-rickshaw driver, daily wage ₹800-1000
```

### Cardiovascular Patients

```
PATIENT 4: "Acute STEMI" — 52M, BMI 26.8
Conditions: Acute chest pain × 2hrs, smoker 20 pack-years, family hx: father MI at 50
Meds: None prior
Allergy: Penicillin (ANAPHYLAXIS — 2020)
Labs: Troponin 12.4↑, Cr 1.0, eGFR 84, K+ 4.2, Glucose 142
Vitals: HR 108, BP 95/62, SpO2 93%, RR 24
ECG: ST elevation V1-V4 (anterior STEMI)
Insurance: ESI — covers emergency

PATIENT 5: "Post-MI + New AF" — 66M, BMI 28.4
Conditions: Anterior MI (3mo ago, DES to LAD), T2DM, HTN, newly detected AF
Meds: Aspirin 75mg, Ticagrelor 90mg BD, Atorvastatin 80mg, Ramipril 5mg, Metoprolol 25mg BD, Metformin 1g BD
Allergy: NKDA
Labs: HbA1c 7.4%, Cr 1.1, eGFR 68, K+ 4.4
Vitals: HR 88 (irregularly irregular), BP 128/78
Insurance: CGHS — covers most drugs
```

### Overlap Patient

```
PATIENT 6: "Diabetes + Heart Failure" — 58F, BMI 30.2
Conditions: T2DM (8yr), Heart Failure (EF 30%), HTN, CKD 3a
Meds: Metformin 500mg BD, Glimepiride 1mg OD, Ramipril 10mg OD, Carvedilol 12.5mg BD, Furosemide 40mg BD, Spironolactone 25mg OD, Atorvastatin 40mg HS
Allergy: NKDA
Labs: HbA1c 8.6%, Cr 1.4, eGFR 48, K+ 5.1, BNP 850, Na+ 134
Vitals: HR 72, BP 110/68, SpO2 94%
Insurance: Star Health — ₹5K/month cap
```

## HOSPITAL CONTACTS — Apollo Chennai

```
ENDOCRINOLOGY:
  Diabetes Educator: Sister Lakshmi, ext 3345 (Hindi/Tamil/English)
  Dietitian: Ms. Priya Raman, ext 3350 (South Indian diet specialist)
  Podiatrist: Dr. Suresh, ext 3360 (Mon/Wed/Fri)
  Ophthalmology: Dr. Iyer, ext 4410 (retinal screening)
  Nephrology: Dr. Ramachandran, ext 4420

CARDIOLOGY:
  Interventional: Dr. Venkat, ext 4455 (cath lab)
  Electrophysiology: Dr. Anand, ext 4460
  Heart Failure Clinic: Dr. Meena, ext 4465 (Tue/Thu)
  Cardiac Rehab: Sister Priya, ext 4470
  CCU Nurse Station: ext 3322
  Code STEMI: Call 4455 + alert CCU 3322

PHARMACY: [YOU determine what drugs to track — part of the assessment]
Blood bank: O-negative available (2 units standby)
```
