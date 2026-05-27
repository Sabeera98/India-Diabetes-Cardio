# Data Sources Documentation

## Overview
This document explains all clinical, pharmaceutical, and guideline sources used in the Option C Clinical Decision Support System.

The system is designed specifically for Indian clinical practice context, prioritizing RSSDI, CSI, KDIGO, and NLEM (2022) guidelines over Western guidelines.

---

## 1. Diabetes Guidelines

### RSSDI (Research Society for the Study of Diabetes in India)
- Source: RSSDI Clinical Practice Recommendations (2022–2024)
- Used for:
  - HbA1c targets in Indian population
  - Oral anti-diabetic drug selection
  - Insulin initiation criteria
  - Lifestyle modification guidance specific to Indian diet patterns

- Official Reference:
  https://rssdi.in

---

## 2. Cardiology Guidelines

### CSI (Cardiological Society of India)
- Source: CSI Clinical Practice Guidelines for ACS & Heart Failure
- Used for:
  - STEMI management pathway in Indian hospitals
  - Antiplatelet and anticoagulation decisions
  - Heart failure drug contraindications
  - Post-MI management strategies

- Official Reference:
  https://www.csi.org.in

---

## 3. Kidney Disease Guidelines

### KDIGO (Kidney Disease: Improving Global Outcomes)
- Source: KDIGO Clinical Practice Guidelines
- Used for:
  - CKD staging (eGFR-based classification)
  - Drug dose adjustment in renal impairment
  - Metformin safety thresholds
  - Monitoring frequency in CKD patients

- Official Reference:
  https://kdigo.org

---

## 4. Drug Pricing & Essential Medicines

### NLEM (National List of Essential Medicines 2022)
-Source:
  -Central Drugs Standard Control Organization (CDSCO)
  -Directorate General of Health Services (DGHS)
  -Ministry of Health & Family Welfare (India)
-Document:
  National List of Essential Medicines (NLEM 2022)
-Purpose:
  -To define a list of essential medicines required to meet the priority healthcare needs of the population of India.
-Key Objectives:
  -Promote rational use of medicines
  -Improve accessibility of essential drugs
  -Support affordability in healthcare delivery
  -Guide national procurement and treatment standards
-Key Principles for Inclusion:
  Medicines in NLEM 2022 are selected based on:
    -Efficacy
    -Safety
    -Clinical effectiveness
    -Public health relevance in India
    -Cost-effectiveness (considered indirectly during selection)
-System Usage (in this project):
  -Prefer NLEM-listed medicines when multiple therapeutic options exist
  -Support rational prescribing aligned with Indian healthcare system
  -Flag non-essential or high-cost alternatives where appropriate
  -Enable cost-aware clinical decision support logic
-Important Clarification:
  -NLEM does NOT directly define drug prices
  -Drug price regulation is implemented separately under DPCO 2013 by NPPA
  -NLEM drugs are eligible for government price ceiling control
Official Reference:
https://cdsco.gov.in

---

## 5. Pharmaceutical Pricing Data

Drug pricing and brand mapping were referenced from:

- 1mg (Tata 1mg platform)
- PharmEasy listings
- Apollo Pharmacy

Used for:
- Approximate ₹ monthly cost estimation
- Indian brand identification
- Generic vs branded comparison in real-world prescribing

---

## 6. Clinical Safety Rules

Safety rules were derived from:

- Standard clinical pharmacology references
- Indian hospital prescribing practices
- Nephrology and cardiology safety protocols
- NLEM safety considerations

Used for:
- Drug interaction detection
- CKD dose adjustment warnings
- Heart failure contraindication alerts
- Hypoglycemia risk assessment

---

## 7. System Design Note

This system is NOT connected to real hospital EMR systems.

It is a rule-based clinical decision support simulation designed for:
- Educational purposes
- Indian healthcare scenario modeling
- Multi-condition clinical reasoning training

---

## 8. Summary

This system integrates:

- RSSDI → Diabetes management (India-specific)
- CSI → Cardiology management (India-specific)
- NLEM 2022 → essential medicines (India)

The goal is to simulate real-world Indian clinical decision-making under constraints of:
- affordability
- comorbidities
- drug safety
- guideline prioritization