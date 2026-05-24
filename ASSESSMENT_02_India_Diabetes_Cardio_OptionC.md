# DEVELOPER ASSESSMENT: Build Option C for India — Diabetes + Cardiovascular
## Two Clinical Areas. Source the Data. Prove It Scales.
### Doctor BRAHMO — Full-Stack Developer Assessment

**Time:** 5-8 hours | **Demo:** 20-25 minutes | **Deadline:** 72 hours
**Stack:** Supabase + Python/Node.js + React + any LLM API (Claude/GPT/Gemini)
**Tools:** Use ANY AI tool — no paid subscriptions required (see Setup Guide)
**Deliverables:** Working demo + source code + architecture notes + **data_sources.md**

---

## WHAT YOU'RE BUILDING (2-minute read)

A doctor at Apollo Hospitals, Chennai asks AI about a diabetic patient. Generic AI cites ADA (American) guidelines, uses US drug names, no ₹ pricing, no awareness of what's in the hospital pharmacy. Useless for an Indian doctor.

**Your job:** Build a complete Option C system for TWO clinical areas — diabetes AND cardiovascular — in India. YOU must research and source ALL clinical data: Indian guidelines (RSSDI for diabetes, CSI for cardiology), Indian drug brands with ₹ MRP prices, drug interactions, and dietary context.

**Why two conditions:** If your architecture handles diabetes AND cardiology using the SAME tables, SAME engine, SAME prompt composer — then adding 48 more conditions is just more Supabase rows. That's the scalability proof.

**What we provide:** 6 patient profiles and hospital contact details (in Setup Guide). Nothing clinical — you source that yourself.

**What you figure out:** Which Indian guidelines exist and where to find them. Which drugs Indian doctors prescribe (hint: Teneligliptin is India's most-prescribed DPP4 inhibitor — it barely exists in US/UK). Real ₹ prices from 1mg.com/PharmEasy. How to structure all of this so the AI becomes dramatically better than generic.

---

## YOUR 6 DEMO SCENARIOS

### DIABETES (3 scenarios):

**Scenario 1: "Which second-line drug?"**
Patient: 48M, HbA1c 8.4%, on Metformin 2g, BMI 31, insurance caps ₹5K/month on meds
- Cite RSSDI (not ADA). List Indian options with brands + ₹ MRP.
- Factor insurance cap. Flag sulfonamide allergy if relevant.
- Include dietitian referral for carb-heavy South Indian diet.

**Scenario 2: "Insulin transition with CKD"**
Patient: 62F, HbA1c 9.2%, eGFR 32, on Metformin + Glimepiride, insurance mostly exhausted
- Auto-compute eGFR → CKD 3b. Flag: Metformin borderline, Glimepiride STOP (hypoglycemia in CKD).
- Recommend insulin with Indian brand + ₹ price.
- Refer: diabetes educator Sister Lakshmi ext 3345, nephrology ext 4420, ophthalmology ext 4410.

**Scenario 3: "The auto-driver who can't afford expensive drugs"**
Patient: 34M, newly diagnosed, HbA1c 8.8%, BMI 35, daily wage ₹800-1000, NO insurance
- THIS is where Indian context matters most. Empagliflozin ≈₹500/month vs Teneligliptin ≈₹200/month vs Metformin ≈₹50/month.
- NLEM drugs are cheapest — flag which options are on NLEM.
- Pioglitazone for NAFLD (cheap + beneficial for fatty liver).

### CARDIOVASCULAR (2 scenarios):

**Scenario 4: "Acute STEMI — immediate management"**
Patient: 52M, ST elevation V1-V4, HR 108, BP 95/62, penicillin ANAPHYLAXIS
- CSI ACS guidelines, not ACC/AHA. Time-stamped protocol: MINUTE 0, MINUTE 5, MINUTE 10.
- Which antiplatelet? Indian brand + ₹ price. Cath lab available → primary PCI.
- What if NO cath lab? Streptokinase (₹5-8K) vs Tenecteplase (₹25-35K) — real Indian decision.
- Penicillin anaphylaxis → HARD BLOCK if antibiotics needed during admission.
- Contacts: Dr. Venkat ext 4455, CCU 3322, blood bank O-neg available.

**Scenario 5: "Post-MI + new AF — triple therapy dilemma"**
Patient: 66M, on Aspirin + Ticagrelor (3 months post-MI), now needs anticoagulation for AF
- Auto-compute CHA₂DS₂-VASc → determines anticoagulation need.
- Triple therapy = HIGH bleeding risk. CSI/IHRS recommendation for duration.
- Which DOAC in India? Brand + ₹ price. Interactions with current medications.

### OVERLAP (1 scenario — the scalability proof):

**Scenario 6: "Diabetes + Heart Failure — which drugs help vs harm?"**
Patient: 58F, T2DM (HbA1c 8.6%) + Heart Failure (EF 30%) + CKD 3a, K+ 5.1
- **MUST CATCH:** Pioglitazone CONTRAINDICATED in HF (fluid retention)
- **MUST CATCH:** Glimepiride risky (hypoglycemia → cardiac events in HF)
- **MUST RECOMMEND:** SGLT2 inhibitor — dual benefit for diabetes AND heart failure
- **MUST CATCH:** Spironolactone + Ramipril → hyperkalemia (K+ already 5.1)
- Pull guidelines from BOTH RSSDI and CSI into ONE prompt
- This scenario proves your architecture handles multi-condition patients

---

## TECHNICAL REQUIREMENTS

### Architecture — The Scalability Rule

```
CRITICAL: ONE set of tables for BOTH conditions.

NOT THIS:  diabetes_drugs, cardiology_drugs  ← WRONG
THIS:      drugs (all drugs, tagged by condition)  ← RIGHT

NOT THIS:  diabetes_guidelines, cardiology_guidelines  ← WRONG  
THIS:      indian_guidelines (all guidelines, filtered by condition tag)  ← RIGHT

If adding a 3rd condition requires new tables or code changes, 
your architecture doesn't scale.
```

### What You Build

1. **Drug database** (Supabase) — unified tables for BOTH conditions:
   - `drugs`: generic_name, drug_class, indian_brand, manufacturer, mrp_price, nlem_status, renal_dosing, hf_safe, condition_tags
   - `drug_interactions`: cross-condition pairs (diabetes drug + cardiac drug interactions)
   - `indian_guidelines`: source_id (RSSDI/CSI/MoHFW), condition, recommendation, evidence_level
   - `hospital_formulary`: drug availability at Apollo Chennai

2. **Safety engine** — works across BOTH conditions:
   - DDI check (including cross-condition: diabetes drug vs cardiac drug)
   - eGFR auto-computation + renal dosing flags
   - Heart failure contraindication flags
   - Hypoglycemia risk assessment
   - CHA₂DS₂-VASc for AF patients

3. **India-specific prompt composer:**
   - Cites RSSDI for diabetes, CSI for cardiology (NOT ADA/ACC-AHA)
   - Indian drug brands with ₹ MRP
   - Cost + insurance awareness
   - Hospital contacts for relevant departments
   - For overlap patients: pulls from BOTH guideline sets

4. **Demo UI** — patient selector (6 patients), side-by-side generic AI vs Option C, safety alerts panel

### Data You Must Source (The Real Test)

| Data | Where to Look | Minimum Required |
|---|---|:---:|
| RSSDI diabetes guidelines | "RSSDI clinical practice recommendations" in medical journals | 8 guideline nodes |
| CSI cardiology guidelines | "CSI ACS guidelines India" | 8 guideline nodes |
| Overlap guidelines (diabetes in HF) | RSSDI + CSI intersection | 3 guideline nodes |
| Diabetes drugs (Indian brands + ₹) | 1mg.com, PharmEasy.in | 15 drugs |
| Cardiac drugs (Indian brands + ₹) | 1mg.com, PharmEasy.in | 15 drugs |
| Cross-condition drug interactions | Medical references | 20 interaction pairs |
| NLEM 2022 status | Government of India publication | Flag for each drug |

**Verify prices against real pharmacy websites. Do NOT make them up.**

---

## SURPRISE TEST (CRITICAL)

After your 6 demos, we give you **2-3 NEW patients live**. Same clinical domains (diabetes/cardiac), DIFFERENT issues than your demos.

Examples of what we might test:
- A diabetic with gout (tests: is Teneligliptin in your DB? cost comparison for uninsured farmer?)
- A patient with Rheumatic Heart Disease + AF (tests: does your cardiac data go beyond ACS? RHD is common in India, rare in US)
- A diabetes + unstable angina overlap with CKD and Metformin intolerance (tests: multi-condition merging with drug constraints)

**If your system only has data for the 6 demo patients, surprise patients break it.** Load enough drugs and guidelines that a RANDOM Indian diabetic or cardiac patient gets meaningful guidance.

### The Scalability Question (Asked at End of Demo)
"If I asked you to add Respiratory Medicine (Asthma + COPD) tomorrow, walk me through exactly what you'd do."

**Right answer:** "Research Indian Chest Society guidelines. Source inhaler brands + ₹ from 1mg.com. Add drug rows + guideline rows + interactions to EXISTING tables. Zero code changes. 3-4 hours of research + data loading."

**Wrong answer:** "I'd need to create new tables and modify the engine..."

---

## EVALUATION CRITERIA

| Criteria | Weight | 10/10 looks like |
|----------|:------:|-----------------|
| **Data quality + sourcing** | 30% | Real RSSDI + CSI guidelines. Verified Indian drug brands + ₹ MRP. Teneligliptin included. data_sources.md is thorough. |
| **6 scenarios correct** | 25% | India-specific responses. CKD patient gets renal flags. Poor patient gets affordable options. Elderly gets relaxed HbA1c target. Overlap merges both guideline sets. |
| **Scalable architecture** | 20% | ONE set of tables for both conditions. Adding condition #3 = data only, zero code. |
| **Demo impact** | 10% | Generic AI vs Option C is dramatically different. Indian doctor would say "finally." |
| **Innovation** | 15% | FDCs? Jan Aushadhi pricing? Fasting guidance? Streptokinase vs Tenecteplase comparison? |

---

## REQUIRED DELIVERABLE: data_sources.md

You MUST submit documentation of where every piece of clinical data came from:

```markdown
# Data Sources
## Guidelines: RSSDI [year] — [URL]. CSI [year] — [URL]. MoHFW STG — [URL].
## Drug prices: Verified on 1mg.com / PharmEasy on [date].
## NLEM status: From National List of Essential Medicines 2022.
## Interactions: From [source — Stockley's / Indian Pharmacopoeia / papers].
```

---

## COMMON PITFALLS

- Using ADA instead of RSSDI → wrong guidelines for India
- Making up ₹ prices → verifiable on 1mg.com in 10 seconds
- Not knowing Teneligliptin → India's #1 DPP4i, you didn't research
- Same safety alerts for every patient → eGFR 92 and eGFR 32 need DIFFERENT alerts
- Separate tables per condition → architecture doesn't scale
- Over-treating elderly diabetic (Patient 4 if applicable) → RSSDI recommends relaxed HbA1c 7.5-8.0% for elderly with comorbidities

---

## DEMO STRUCTURE (20-25 minutes)

1. **[2 min]** Architecture: one set of tables serving both conditions
2. **[2 min]** Data sourcing: what you found, where from (data_sources.md highlights)
3. **[3 min]** Diabetes scenario: generic AI vs your Option C — Indian brands, ₹ prices, RSSDI
4. **[3 min]** STEMI scenario: time-critical CSI protocol, hospital contacts, drug availability
5. **[5 min]** OVERLAP scenario (Patient 6): the MONEY demo — guidelines from BOTH conditions, Pioglitazone blocked, SGLT2i recommended, hyperkalemia flagged
6. **[3 min]** Scalability proof: "here's what adding respiratory would take"
7. **[5 min]** Innovations + surprise test + our questions

---

*Version: 4.0 | Doctor BRAHMO Healthcare Vertical — India*
*Patient profiles, hospital contacts, and setup instructions are in the separate Setup Guide document.*
