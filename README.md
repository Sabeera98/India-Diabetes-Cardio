# Overview

This project is a rule-based Clinical Decision Support System (CDSS) designed for Indian healthcare context, focusing on:

- 🩺 Type 2 Diabetes Management  
- ❤️ Cardiovascular Disease Management  
- 🧠 CKD-aware drug safety adjustments  
- 💊 Indian drug pricing & affordability logic  

It generates patient-specific clinical recommendations (Option C Engine) using real-world Indian guidelines.

---

## ⚙️ Key Features

### 🧠 Option C Engine (Core Logic)
- Patient-specific recommendation generation  
- Multi-condition handling (Diabetes + CKD + HF + AF)  
- Dynamic treatment escalation logic  

---

### 🩸 Diabetes Module (RSSDI-Based)
- HbA1c-based therapy escalation  
- Second-line drug suggestions  
- Renal-safe drug selection  
- Cost-aware prescribing  

---

### ❤️ Cardiovascular Module (CSI-Based)
- STEMI emergency workflow logic  
- Post-MI anticoagulation guidance  
- Heart failure medication safety checks  
- AF stroke prevention logic (CHA₂DS₂-VASc aware)  

---

### ⚠️ Safety Engine
- 🚫 Pioglitazone contraindicated in HF  
- 🚫 Sulfonylurea risk in CKD/Elderly  
- ⚠️ ACEi/ARB → hyperkalemia monitoring  
- ⚠️ Renal dosing alerts (eGFR-based)  

---

### 💊 Indian Drug Intelligence
- NLEM 2022-based affordability system  
- Indian brand awareness (real-world prescribing logic)  
- Cost-sensitive therapy recommendations  

---

## 🧱 System Architecture

Frontend (UI)  
↓  
Option C Engine (TypeScript Rules Engine)  
↓  
Safety Engine (Risk + Contraindication Layer)  
↓  
Clinical Recommendation Generator  
↓  
Output: Patient-Specific Report  

---

## 📊 Data Sources

This system is built using Indian clinical and regulatory references:

- 📘 RSSDI 2022 Guidelines (Diabetes Management)  
- ❤️ Cardiological Society of India (CSI) Guidelines  
- 💊 NLEM 2022 (Government of India)  
- 🏛 CDSCO – Drug regulatory framework  
- 💰 Real-world Indian drug pricing (MRP-based estimates)  

