-- Seed data for the patients table in the India Diabetes + Cardiovascular assessment.
-- These INSERT statements are ready to run after the patients table exists.

INSERT INTO patients (
  patient_code,
  case_label,
  age,
  sex,
  bmi,
  conditions,
  medications,
  labs,
  vitals,
  diagnosis_summary,
  risk_level,
  insurance,
  income_level,
  visit_type,
  notes
)
VALUES

(
  'PATIENT_1',
  'Metformin Failure Case',
  48,
  'M',
  31.1,
  '["T2DM","HTN"]'::jsonb,
  '[{"name":"Metformin","dose":"1g BD"},{"name":"Telmisartan","dose":"40mg OD"}]'::jsonb,
  '{"hba1c":8.4,"fbs":168,"cr":0.9,"egfr":92}'::jsonb,
  '{"bp":"134/86","hr":78}'::jsonb,
  'Uncontrolled T2DM on metformin',
  'high',
  '{"provider":"Star Health Gold","monthly_cap":5000}'::jsonb,
  'medium',
  'OPD',
  'Second-line diabetes escalation case'
),

(
  'PATIENT_2',
  'CKD Complicated Diabetes',
  62,
  'F',
  27.2,
  '["T2DM","CKD Stage 3","HTN","Neuropathy","Retinopathy"]'::jsonb,
  '[{"name":"Metformin","dose":"500mg BD"},{"name":"Glimepiride","dose":"2mg OD"}]'::jsonb,
  '{"hba1c":9.2,"cr":1.8,"egfr":32,"k":4.9}'::jsonb,
  '{}'::jsonb,
  'Advanced CKD diabetic patient',
  'high',
  '{"provider":"New India Assurance","monthly_cap":3000}'::jsonb,
  'medium',
  'OPD',
  'Insulin transition required'
),

(
  'PATIENT_3',
  'Obesity Diabetes Case',
  34,
  'M',
  35.3,
  '["T2DM","Obesity","NAFLD"]'::jsonb,
  '[{"name":"Metformin","dose":"500mg BD"}]'::jsonb,
  '{"hba1c":8.8,"fbs":186,"alt":68,"egfr":108}'::jsonb,
  '{}'::jsonb,
  'Newly diagnosed metabolic syndrome',
  'moderate',
  '{"provider":"None"}'::jsonb,
  'low',
  'OPD',
  'Cost sensitive patient'
),

(
  'PATIENT_4',
  'Acute STEMI',
  52,
  'M',
  26.8,
  '["STEMI","Smoker"]'::jsonb,
  '[]'::jsonb,
  '{"troponin":12.4,"cr":1.0,"egfr":84}'::jsonb,
  '{"bp":"95/62","hr":108,"spo2":93}'::jsonb,
  'Acute myocardial infarction',
  'critical',
  '{"provider":"ESI"}'::jsonb,
  'unknown',
  'Emergency',
  'Primary PCI required'
),

(
  'PATIENT_5',
  'Post MI + AF',
  66,
  'M',
  28.4,
  '["Post-MI","AF","T2DM","HTN"]'::jsonb,
  '[{"name":"Aspirin","dose":"75mg"},{"name":"Ticagrelor","dose":"90mg BD"}]'::jsonb,
  '{"hba1c":7.4,"cr":1.1,"egfr":68}'::jsonb,
  '{"bp":"128/78","hr":88}'::jsonb,
  'Post MI with atrial fibrillation',
  'high',
  '{"provider":"CGHS"}'::jsonb,
  'medium',
  'OPD',
  'Triple therapy evaluation'
),

(
  'PATIENT_6',
  'HF + Diabetes + CKD',
  58,
  'F',
  30.2,
  '["T2DM","Heart Failure","CKD Stage 3"]'::jsonb,
  '[{"name":"Metformin","dose":"500mg BD"},{"name":"Glimepiride","dose":"1mg OD"}]'::jsonb,
  '{"hba1c":8.6,"cr":1.4,"egfr":48,"k":5.1,"bnp":850}'::jsonb,
  '{"bp":"110/68","hr":72,"spo2":94}'::jsonb,
  'Complex cardio-metabolic patient',
  'high',
  '{"provider":"Star Health"}'::jsonb,
  'medium',
  'OPD',
  'HF + CKD overlap risk'
);


-- Seed data for hospital contacts at Apollo Chennai.
INSERT INTO hospital_contacts (department, role, name, extension, languages, notes)
VALUES
('Endocrinology', 'Diabetes Educator', 'Sister Lakshmi', '3345', 'Hindi/Tamil/English', NULL),
('Endocrinology', 'Dietitian', 'Ms. Priya Raman', '3350', NULL, 'South Indian diet specialist'),
('Endocrinology', 'Podiatrist', 'Dr. Suresh', '3360', NULL, 'Mon/Wed/Fri'),
('Endocrinology', 'Ophthalmology', 'Dr. Iyer', '4410', NULL, 'Retinal screening'),
('Endocrinology', 'Nephrology', 'Dr. Ramachandran', '4420', NULL, NULL),
('Cardiology', 'Interventional', 'Dr. Venkat', '4455', NULL, 'Cath lab contact'),
('Cardiology', 'Electrophysiology', 'Dr. Anand', '4460', NULL, NULL),
('Cardiology', 'Heart Failure Clinic', 'Dr. Meena', '4465', NULL, 'Tue/Thu'),
('Cardiology', 'Cardiac Rehab', 'Sister Priya', '4470', NULL, NULL),
('Cardiology', 'CCU Nurse Station', 'CCU Nurse Station', '3322', NULL, NULL),
('Cardiology', 'Code STEMI', 'Call 4455 + alert CCU 3322', NULL, NULL, 'STEMI activation instructions');


-- Seed data for drugs from the provided India drug dataset.
INSERT INTO drugs (generic_name, generic_name_normalized, drug_class, drug_subclass, indian_brand, manufacturer, strength, dosage_form, pack_size, pricing, lowest_price_website, mrp_price, monthly_cost, nlem_status, renal_safety, hf_safe, hypoglycemia_risk, weight_effect, condition_tags, renal_dosing, common_uses, contraindications, important_notes)
VALUES
('Metformin', 'metformin', 'Biguanide', 'Insulin sensitizer', 'Glycomet 500 SR', 'USV Private Limited', '500mg', 'Tablet', '20', '{"apollo": 41.5, "pharmeasy": 41.97, "1mg": 40.7}'::jsonb, '1mg', 40.7, 61, TRUE, 'caution', 'true', 'low', 'weight_loss', '["diabetes"]'::jsonb, '{"category":"dose_adjustment_required"}'::jsonb, '["Type 2 Diabetes","Prediabetes","Insulin resistance"]'::jsonb, '["Severe CKD","Metabolic acidosis","Severe liver disease"]'::jsonb, '["First-line therapy for Type 2 Diabetes","Low-cost and NLEM-listed medication","Low risk of hypoglycemia","Use cautiously in renal impairment"]'::jsonb),
('Glimepiride', 'glimepiride', 'Sulfonylurea', 'Second-generation sulfonylurea', 'Amaryl 1mg', 'Sanofi India Ltd', '1mg', 'Tablet', '30', '{"apollo": 118, "pharmeasy": 118.44, "1mg": 118}'::jsonb, '1mg', 118, 118, TRUE, 'caution', 'caution', 'high', 'weight_gain', '["diabetes"]'::jsonb, '{"category":"avoid_in_severe_ckd"}'::jsonb, '["Type 2 Diabetes"]'::jsonb, '["Type 1 Diabetes","Severe CKD","Recurrent hypoglycemia"]'::jsonb, '["Higher risk of hypoglycemia in elderly patients","Low-cost option for uninsured patients","Use cautiously in renal impairment"]'::jsonb),
('Teneligliptin', 'teneligliptin', 'DPP-4 Inhibitor', 'Gliptin', 'Tenepure 20', 'Torrent Pharmaceuticals Ltd', '20mg', 'Tablet', '30', '{"apollo": 355, "pharmeasy": 355.30, "1mg": 349}'::jsonb, '1mg', 349, 349, TRUE, 'safe', 'true', 'low', 'weight_neutral', '["diabetes"]'::jsonb, '{"category":"caution"}'::jsonb, '["Type 2 Diabetes"]'::jsonb, '["Type 1 Diabetes","Diabetic ketoacidosis","Severe hypersensitivity reaction"]'::jsonb, '["One of the most commonly prescribed DPP-4 inhibitors in India","Low hypoglycemia risk","Generally safe in CKD patients","Weight-neutral antidiabetic medication"]'::jsonb),
('Sitagliptin', 'sitagliptin', 'DPP-4 Inhibitor', 'Gliptin', 'Januvia 100', 'MSD Pharmaceuticals Pvt Ltd', '100mg', 'Tablet', '7', '{"apollo": 276.5, "pharmeasy": 276.56, "1mg": 304}'::jsonb, 'Apollo Pharmacy', 276.5, 1185, FALSE, 'caution', 'true', 'low', 'weight_neutral', '["diabetes"]'::jsonb, '{"category":"dose_reduction_required"}'::jsonb, '["Type 2 Diabetes"]'::jsonb, '["Type 1 Diabetes","Diabetic ketoacidosis","Severe hypersensitivity reaction"]'::jsonb, '["Low hypoglycemia risk","Weight-neutral antidiabetic medication","Requires dose adjustment in CKD"]'::jsonb),
('Vildagliptin', 'vildagliptin', 'DPP-4 Inhibitor', 'Gliptin', 'Galvus 50', 'Novartis India Ltd', '50mg', 'Tablet', '15', '{"apollo": 371, "pharmeasy": 371.25, "1mg": 371.25}'::jsonb, 'Apollo Pharmacy', 371, 742, FALSE, 'caution', 'true', 'low', 'weight_neutral', '["diabetes"]'::jsonb, '{"category":"caution"}'::jsonb, '["Type 2 Diabetes"]'::jsonb, '["Type 1 Diabetes","Diabetic ketoacidosis","Severe hypersensitivity reaction"]'::jsonb, '["Low hypoglycemia risk","Weight-neutral antidiabetic medication","Use cautiously in moderate to severe CKD"]'::jsonb),
('Empagliflozin', 'empagliflozin', 'SGLT2 Inhibitor', 'Gliflozin', 'Jardiance 10', 'Boehringer Ingelheim India Pvt Ltd', '10mg', 'Tablet', '10', '{"apollo": 384, "pharmeasy": 384.35, "1mg": 459.3}'::jsonb, 'Apollo Pharmacy', 384, 1152, FALSE, 'caution', 'true', 'low', 'weight_loss', '["diabetes","cardiovascular"]'::jsonb, '{"category":"dose_reduction_required"}'::jsonb, '["Type 2 Diabetes","Heart Failure","Chronic Kidney Disease"]'::jsonb, '["Type 1 Diabetes","Diabetic ketoacidosis","Severe dehydration"]'::jsonb, '["Provides cardiovascular benefit","Helpful in heart failure patients","May reduce hospitalization in HF","Use cautiously in renal impairment"]'::jsonb),
('Dapagliflozin', 'dapagliflozin', 'SGLT2 Inhibitor', 'Gliflozin', 'Forxiga 10', 'AstraZeneca Pharma India Ltd', '10mg', 'Tablet', '14', '{"apollo": 566, "pharmeasy": 424.69, "1mg": 566.25}'::jsonb, 'PharmEasy', 424.69, 910, FALSE, 'caution', 'beneficial', 'low', 'weight_loss', '["diabetes","cardiovascular"]'::jsonb, '{"category":"dose_reduction_required"}'::jsonb, '["Type 2 Diabetes","Heart Failure (HFrEF & HFpEF)","Chronic Kidney Disease"]'::jsonb, '["Type 1 Diabetes","Diabetic ketoacidosis","Severe dehydration"]'::jsonb, '["Reduces heart failure hospitalization","Cardiovascular mortality benefit proven","Renal protective effects","Useful in CKD and HF patients even without diabetes"]'::jsonb),
('Pioglitazone', 'pioglitazone', 'Thiazolidinedione', 'Insulin Sensitizer', 'Pioz 15', 'USV Pvt Ltd', '15mg', 'Tablet', '10', '{"apollo": 78.5, "pharmeasy": 58.99, "1mg": 78.2}'::jsonb, 'PharmEasy', 58.99, 177, TRUE, 'safe_with_caution', 'false', 'low', 'weight_gain', '["diabetes"]'::jsonb, '{"category":"no_adjustment"}'::jsonb, '["Type 2 Diabetes Mellitus"]'::jsonb, '["Heart Failure (NYHA Class III-IV)","Active bladder cancer","Severe hepatic impairment"]'::jsonb, '["Improves insulin sensitivity","May cause weight gain and fluid retention","Avoid in heart failure patients","Slower onset compared to SGLT2/GLP1 drugs"]'::jsonb),
('Insulin Glargine', 'insulin glargine', 'Insulin Analog', 'Long-acting Basal Insulin', 'Lantus', 'Sanofi India Ltd', '100 IU/ml', 'Injection (Cartridge)', '1 cartridge (3 ml × 5 doses)', '{"apollo": 651.5, "pharmeasy": 651.98, "1mg": 651.98}'::jsonb, 'Apollo Pharmacy', 651.5, 652, TRUE, 'safe_with_caution', 'true', 'high', 'weight_gain', '["diabetes"]'::jsonb, '{"category":"dose_reduction_required"}'::jsonb, '["Type 1 Diabetes","Type 2 Diabetes (basal insulin therapy)"]'::jsonb, '["Hypoglycemia episodes","Insulin allergy"]'::jsonb, '["Long-acting basal insulin with 24-hour coverage","Low peak effect reduces hypoglycemia risk vs older insulins","Requires dose titration based on fasting glucose","Do not mix with other insulins in same syringe"]'::jsonb),
('Acarbose', 'acarbose', 'Alpha Glucosidase Inhibitor', 'Carbohydrate Absorption Inhibitor', 'Glucobay 50', 'Bayer Zydus Pharma Pvt Ltd', '50 mg', 'Tablet', '10', '{"apollo": 180, "pharmeasy": 180, "1mg": 166}'::jsonb, '1mg', 166, 498, FALSE, 'caution', 'true', 'low', 'neutral', '["diabetes"]'::jsonb, '{"category":"caution"}'::jsonb, '["Type 2 Diabetes","Postprandial hyperglycemia control"]'::jsonb, '["Inflammatory bowel disease","Intestinal obstruction","Chronic malabsorption syndromes"]'::jsonb, '["Works by delaying carbohydrate digestion in intestine","Best for post-meal sugar spikes","Does not cause hypoglycemia alone","Common GI side effects: gas, bloating, diarrhea"]'::jsonb),
('Repaglinide', 'repaglinide', 'Meglitinide', 'Short-acting insulin secretagogue', 'Novonorm', 'Novo Nordisk India Pvt Ltd', '0.5 mg', 'Tablet', '15', '{"apollo": 136, "1mg": 272.25}'::jsonb, 'Apollo Pharmacy', 136, 816, FALSE, 'caution', 'true', 'high', 'weight_gain', '["diabetes"]'::jsonb, '{"category":"no_adjustment"}'::jsonb, '["Type 2 Diabetes","Postprandial glucose control"]'::jsonb, '["Severe liver impairment","Type 1 diabetes","Diabetic ketoacidosis"]'::jsonb, '["Short-acting insulin secretagogue taken before meals","Useful in post-meal glucose spikes","Risk of hypoglycemia especially in liver disease","Rapid onset and short duration of action"]'::jsonb),
('Aspirin', 'aspirin', 'Antiplatelet', 'Salicylate', 'Ecosprin 75', 'USV Pvt Ltd', '75mg', 'Tablet', '14', '{"1mg": 5.29, "apollo": 5, "pharmeasy": 4.23}'::jsonb, 'PharmEasy', 4.23, 9, TRUE, 'caution', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"caution"}'::jsonb, '["Acute coronary syndrome","Myocardial infarction prevention","Stroke prevention"]'::jsonb, '["Active bleeding","Peptic ulcer disease","Aspirin allergy"]'::jsonb, '["Reduces platelet aggregation","Used in secondary prevention of ASCVD","Monitor bleeding risk","Body weight may influence aspirin effectiveness"]'::jsonb),
('Clopidogrel', 'clopidogrel', 'Antiplatelet', 'P2Y12 Inhibitor', 'Clopitab 75', 'Lupin Ltd', '75mg', 'Tablet', '15', '{"1mg": 106.59, "apollo": 106.5, "pharmeasy": 106.59}'::jsonb, 'Apollo Pharmacy', 106.5, 213, TRUE, 'no_adjustment', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"no_adjustment"}'::jsonb, '["Acute coronary syndrome","Post-PCI antiplatelet therapy","Stroke prevention"]'::jsonb, '["Active bleeding","Severe liver disease"]'::jsonb, '["Used with aspirin as dual antiplatelet therapy","Reduces risk of recurrent myocardial infarction","Monitor for bleeding complications"]'::jsonb),
('Ticagrelor', 'ticagrelor', 'Antiplatelet', 'P2Y12 Inhibitor', 'Brilinta 90', 'AstraZeneca Pharma India Ltd', '90mg', 'Tablet', '14', '{"1mg": 609.25, "apollo": 609, "pharmeasy": 609.25}'::jsonb, 'Apollo Pharmacy', 609, 1305, FALSE, 'caution', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"caution"}'::jsonb, '["Acute coronary syndrome","Post-myocardial infarction","Dual antiplatelet therapy after PCI"]'::jsonb, '["Active bleeding","History of intracranial hemorrhage","Severe hepatic impairment"]'::jsonb, '["Preferred over clopidogrel in many ACS patients","Used together with low-dose aspirin","Higher bleeding risk compared to clopidogrel","Improves cardiovascular outcomes after ACS","Prevention of heart attack and stroke"]'::jsonb),
('Atorvastatin', 'atorvastatin', 'Statin', 'HMG-CoA Reductase Inhibitor', 'Atorva 20', 'Zydus Cadila', '20mg', 'Tablet', '15', '{"1mg": 79.63, "apollo": 79.5, "pharmeasy": 79.63}'::jsonb, 'Apollo Pharmacy', 79.5, 159, TRUE, 'no_adjustment', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"no_adjustment"}'::jsonb, '["Hyperlipidemia","ASCVD prevention","Post-myocardial infarction therapy","Stroke prevention"]'::jsonb, '["Severe statin intolerance"]'::jsonb, '["Commonly used statin for secondary prevention","Effective for LDL reduction","Often used in diabetics with cardiovascular risk"]'::jsonb),
('Rosuvastatin', 'rosuvastatin', 'Statin', 'HMG-CoA Reductase Inhibitor', 'Rosuvas 10', 'Sun Pharmaceutical Industries Ltd', '10mg', 'Tablet', '15', '{"pharmeasy": 375}'::jsonb, '1mg', 375, 750, FALSE, 'caution', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"caution"}'::jsonb, '["High LDL cholesterol"]'::jsonb, '["Severe statin intolerance"]'::jsonb, '["Used for high-risk lipid lowering","Requires monitoring of liver enzymes and CPK"]'::jsonb),
('Ramipril', 'ramipril', 'ACE Inhibitor', 'Renin-Angiotensin System Inhibitor', 'Cardace 5', 'Sanofi India Ltd', '5mg', 'Tablet', '15', '{"pharmeasy": 131.04}'::jsonb, 'Apollo Pharmacy', 130.5, 261, TRUE, 'caution', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"no_adjustment"}'::jsonb, '["Hypertension","Diabetic nephropathy"]'::jsonb, '["Bilateral renal artery stenosis"]'::jsonb, '["ACE inhibitor preferred in diabetic kidney disease","Monitor potassium and renal function"]'::jsonb),
('Telmisartan', 'telmisartan', 'ARB', 'Angiotensin Receptor Blocker', 'Telma 40', 'Glenmark Pharmaceuticals Ltd', '40mg', 'Tablet', '30', '{"pharmeasy": 212.94}'::jsonb, 'PharmEasy', 212.94, 213, TRUE, 'caution', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"no_adjustment"}'::jsonb, '["Cardiovascular risk reduction"]'::jsonb, '["Severe bilateral renal artery stenosis"]'::jsonb, '["Preferred as ARB for hypertension in diabetes","Monitor renal function and potassium"]'::jsonb),
('Spironolactone', 'spironolactone', 'Diuretic', 'Mineralocorticoid Receptor Antagonist', 'Aldactone 25', 'RPG Life Sciences Ltd', '25mg', 'Tablet', '15', '{"pharmeasy": 34.9}'::jsonb, 'Apollo Pharmacy', 34.5, 69, TRUE, 'caution', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"caution"}'::jsonb, '["Hyperaldosteronism"]'::jsonb, '["Addison''s disease"]'::jsonb, '["Used in heart failure for morbidity and mortality benefit","Monitor potassium carefully"]'::jsonb),
('Apixaban', 'apixaban', 'Anticoagulant', 'Factor Xa Inhibitor', 'Eliquis 5', 'Pfizer Ltd', '5mg', 'Tablet', '10', '{"pharmeasy": 509.06}'::jsonb, 'Apollo Pharmacy', 509, 1527, FALSE, 'caution', 'true', 'none', 'neutral', '["cardiovascular"]'::jsonb, '{"category":"caution"}'::jsonb, '["Pulmonary embolism"]'::jsonb, '["Hypersensitivity to apixaban"]'::jsonb, '["Do not use in active bleeding","Preferred DOAC for AF in many settings"]'::jsonb),
('Metoprolol', 'metoprolol', 'Beta Blocker', 'Cardioselective Beta-1 Blocker', 'Betaloc 25', 'AstraZeneca', '25mg', 'Tablet', '20', '{"pharmeasy": 76.12}'::jsonb, 'Apollo Pharmacy', 76, 114, TRUE, 'safe', 'true', 'none', 'weight_gain', '["cardiovascular"]'::jsonb, '{"category":"no_adjustment"}'::jsonb, '["Atrial fibrillation"]'::jsonb, '["Advanced heart block"]'::jsonb, '["Used for rate control and post-MI therapy","Monitor blood pressure and heart rate"]'::jsonb),
('Furosemide', 'furosemide', 'Diuretic', 'Loop Diuretic', 'Lasix Injection', 'Sanofi India Ltd', '40mg/4ml', 'Injection', '1 ampoule (4ml)', '{"pharmeasy": 12.76}'::jsonb, '1mg', 12.76, 383, TRUE, 'caution', 'true', 'none', 'weight_loss', '["cardiovascular"]'::jsonb, '{"category":"caution"}'::jsonb, '["Hypertension"]'::jsonb, '["Severe electrolyte depletion"]'::jsonb, '["Rapid diuresis for acute decompensated HF","Requires monitoring of volume status and electrolytes"]'::jsonb),
('Pregabalin', 'pregabalin', 'Neuropathic Pain Agent', 'Gabapentinoid', 'Pregabel 75', 'Sun Pharmaceutical Industries Ltd', '75mg', 'Capsule', '10', '{"pharmeasy": 164}'::jsonb, 'Apollo Pharmacy', 164, 492, FALSE, 'caution', 'false', 'low', 'weight_gain', '["diabetes"]'::jsonb, '{"category":"caution"}'::jsonb, '["Partial seizures"]'::jsonb, '["Hypersensitivity to pregabalin"]'::jsonb, '["Used for diabetic neuropathy pain","Monitor for dizziness and somnolence"]'::jsonb);


-- Seed data for Indian guideline statements.
INSERT INTO indian_guidelines (source_id, condition, category, section, recommendation, evidence_level, condition_tags)
VALUES
('RSSDI_2022', 'diabetes', 'clinical', 'glycemic_target_general_adults', 'HbA1c target <7% for most non-pregnant adults', 'medium', '["diabetes"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'glycemic_target_elderly', 'Less stringent HbA1c targets may be appropriate in elderly patients with comorbidities', 'medium', '["diabetes","elderly"]'::jsonb),
('RSSDI_2022', 'diabetes', 'diet', 'diet_low_carb', 'Low carbohydrate diets improve glycemic control and weight reduction', 'medium', '["diabetes","nutrition","obesity"]'::jsonb),
('RSSDI_2022', 'diabetes', 'diet', 'diet_time_restricted_feeding', 'Time restricted feeding and calorie reduction may improve metabolic control', 'low', '["diabetes","nutrition"]'::jsonb),
('RSSDI_2022', 'diabetes', 'diet', 'diet_high_fiber', 'Whole grains and high fiber foods are recommended in diabetic patients', 'medium', '["diabetes","nutrition"]'::jsonb),
('RSSDI_2022', 'diabetes', 'diet', 'diet_south_indian_high_carb', 'Dietary counseling should consider Indian carbohydrate-heavy dietary patterns', 'medium', '["diabetes","nutrition","south_indian"]'::jsonb),
('RSSDI_2022', 'diabetes', 'lifestyle', 'exercise_physical_activity', 'Regular physical activity improves insulin sensitivity and glycemic control', 'high', '["diabetes","exercise"]'::jsonb),
('RSSDI_2022', 'diabetes', 'lifestyle', 'lifestyle_weight_loss', 'Weight reduction improves insulin resistance and diabetes outcomes', 'high', '["diabetes","obesity"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'monitoring_hba1c', 'Regular HbA1c monitoring is recommended to assess glycemic control', 'medium', '["diabetes","monitoring"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'ckd_renal_function', 'Renal function should be assessed before initiating or escalating therapy', 'high', '["diabetes","ckd"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'ckd_metformin', 'Metformin should be used cautiously in reduced eGFR', 'high', '["diabetes","ckd"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'ckd_sulfonylureas', 'Sulfonylureas increase hypoglycemia risk in CKD patients', 'high', '["diabetes","ckd","hypoglycemia"]'::jsonb),
('RSSDI_2022', 'overlap', 'overlap', 'heart_failure_sglt2', 'SGLT2 inhibitors are beneficial in T2DM patients with heart failure', 'high', '["diabetes","heart_failure","cardiovascular"]'::jsonb),
('RSSDI_2022', 'overlap', 'overlap', 'heart_failure_pioglitazone', 'Pioglitazone should be avoided in symptomatic heart failure', 'high', '["diabetes","heart_failure","cardiovascular"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'cardiovascular_risk_assessment', 'Cardiovascular risk assessment should be part of routine diabetes management', 'high', '["diabetes","cardiovascular"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'hypertension_bp_control', 'Blood pressure control reduces cardiovascular and renal complications', 'high', '["diabetes","hypertension"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'hypertension_ace_arb', 'ACE inhibitors or ARBs are preferred in diabetic patients with albuminuria', 'high', '["diabetes","hypertension","ckd"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'lipids_statins', 'Statin therapy is recommended in diabetic patients with elevated cardiovascular risk', 'high', '["diabetes","cardiovascular","lipids"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'insulin_uncontrolled_diabetes', 'Insulin therapy should be considered in severe uncontrolled hyperglycemia', 'high', '["diabetes","insulin"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'hypoglycemia_high_risk', 'Patients at high risk of hypoglycemia require individualized treatment selection', 'high', '["diabetes","hypoglycemia"]'::jsonb),
('RSSDI_2022', 'diabetes', 'clinical', 'retinopathy_screening', 'Annual retinal screening is recommended in diabetic patients', 'medium', '["diabetes","retinopathy"]'::jsonb),
('CSI_ACS_2023', 'cardiology', 'clinical', 'stemi_primary_pci', 'Primary PCI is preferred in STEMI patients when available within recommended timelines', 'high', '["cardiovascular","stemi"]'::jsonb),
('CSI_ACS_2023', 'cardiology', 'clinical', 'stemi_fibrinolysis', 'Fibrinolytic therapy should be initiated early if PCI is unavailable', 'high', '["cardiovascular","stemi"]'::jsonb),
('CSI_ACS_2023', 'cardiology', 'clinical', 'acs_dual_antiplatelet', 'Dual antiplatelet therapy with aspirin and a P2Y12 inhibitor is recommended in ACS', 'high', '["cardiovascular","acs"]'::jsonb),
('CSI_ACS_2023', 'cardiology', 'clinical', 'acs_ticagrelor', 'Ticagrelor is preferred over clopidogrel in many ACS patients unless contraindicated', 'high', '["cardiovascular","acs"]'::jsonb),
('CSI_HF_2023', 'overlap', 'overlap', 'heart_failure_sglt2_cardiac_benefit', 'SGLT2 inhibitors reduce hospitalization and mortality in heart failure patients', 'high', '["cardiovascular","heart_failure","diabetes"]'::jsonb),
('CSI_HF_2023', 'cardiology', 'clinical', 'heart_failure_hyperkalemia', 'ACE inhibitors combined with mineralocorticoid receptor antagonists increase hyperkalemia risk', 'medium', '["cardiovascular","heart_failure","ckd"]'::jsonb),
('IHRS_AF_2023', 'cardiology', 'clinical', 'af_cha2ds2_vasc', 'CHA2DS2-VASc scoring should guide anticoagulation decisions in atrial fibrillation', 'high', '["cardiovascular","atrial_fibrillation"]'::jsonb),
('IHRS_AF_2023', 'cardiology', 'clinical', 'af_triple_therapy', 'Triple antithrombotic therapy duration should be minimized due to bleeding risk', 'high', '["cardiovascular","atrial_fibrillation"]'::jsonb),
('CSI_2023', 'cardiology', 'clinical', 'hypertension_bp_control_cardiology', 'Blood pressure control reduces cardiovascular morbidity and mortality', 'high', '["cardiovascular","hypertension"]'::jsonb);


-- Seed data for drug interactions table.
INSERT INTO drug_interactions (
  drug_a_id,
  drug_b_id,
  interaction_type,
  severity,
  mechanism,
  clinical_effect,
  management,
  monitoring_required,
  onset,
  evidence_level
)
VALUES

-- 1
(22, 28, 'pharmacodynamic', 'moderate',
 'Additive dehydration risk via SGLT2 + antiplatelet bleeding risk in dehydration state',
 '↑ risk of AKI and bleeding in acute illness',
 'Monitor hydration, renal function',
 true, 'acute', 'high'),

-- 2
(22, 35, 'pharmacodynamic', 'moderate',
 'SGLT2 + spironolactone → volume depletion + hyperkalemia risk imbalance',
 'Hypotension, electrolyte imbalance',
 'Monitor BP, potassium',
 true, 'days', 'moderate'),

-- 3
(23, 33, 'pharmacodynamic', 'moderate',
 'ACE/ARB + SGLT2 → additive renal hemodynamic effect',
 'Initial eGFR drop',
 'Monitor creatinine 1–2 weeks',
 true, 'early', 'high'),

-- 4
(24, 37, 'pharmacodynamic', 'moderate',
 'Pioglitazone + beta blocker masks hypoglycemia symptoms',
 'Delayed hypoglycemia detection',
 'Monitor glucose regularly',
 true, 'chronic', 'moderate'),

-- 5
(18, 37, 'pharmacodynamic', 'severe',
 'Sulfonylurea + beta blocker masks hypoglycemia warning signs',
 'Severe unrecognized hypoglycemia',
 'Avoid or strict monitoring',
 true, 'acute', 'high'),

-- 6
(18, 35, 'pharmacodynamic', 'moderate',
 'Sulfonylurea + spironolactone → fluid/electrolyte instability',
 'Hypoglycemia risk increased in CKD',
 'Dose reduction in CKD',
 true, 'variable', 'moderate'),

-- 7
(25, 34, 'pharmacodynamic', 'moderate',
 'Insulin + ARB → increased insulin sensitivity',
 'Hypoglycemia risk',
 'Dose adjust insulin',
 true, 'acute', 'high'),

-- 8
(25, 37, 'pharmacodynamic', 'moderate',
 'Insulin + beta blocker masks hypoglycemia',
 'Delayed recognition of hypoglycemia',
 'Frequent glucose monitoring',
 true, 'acute', 'high'),

-- 9
(29, 36, 'pharmacodynamic', 'moderate',
 'Clopidogrel + apixaban → additive bleeding risk',
 'GI bleed / intracranial bleed risk',
 'Avoid combination or monitor INR-like clinical bleeding',
 true, 'acute', 'high'),

-- 10
(28, 36, 'pharmacodynamic', 'severe',
 'Aspirin + apixaban → strong anticoagulation synergy',
 'Major bleeding risk',
 'Avoid unless essential',
 true, 'immediate', 'high'),

-- 11
(31, 34, 'pharmacokinetic', 'moderate',
 'Statin + ARB → renal protective synergy but rare myopathy risk',
 'Muscle toxicity (rare)',
 'Monitor CK if symptomatic',
 false, 'chronic', 'moderate'),

-- 12
(31, 33, 'pharmacodynamic', 'moderate',
 'Statin + ACE inhibitor → cardiovascular protective synergy',
 'Additive BP + lipid control',
 'Safe combination',
 false, 'chronic', 'high'),

-- 13
(19, 25, 'pharmacodynamic', 'moderate',
 'DPP4 inhibitor + insulin → hypoglycemia risk',
 'Low but present hypoglycemia',
 'Reduce insulin dose',
 true, 'chronic', 'high'),

-- 14
(20, 18, 'pharmacodynamic', 'moderate',
 'DPP4 inhibitor + sulfonylurea → hypoglycemia risk',
 'Low glucose episodes',
 'Monitor sugars',
 true, 'chronic', 'moderate'),

-- 15
(33, 35, 'pharmacodynamic', 'severe',
 'ACE inhibitor + spironolactone → hyperkalemia',
 'Life-threatening hyperkalemia',
 'Monitor K+ closely',
 true, 'early', 'high'),

-- 16
(34, 35, 'pharmacodynamic', 'severe',
 'ARB + spironolactone → severe hyperkalemia risk',
 'Cardiac arrhythmia risk',
 'Avoid combination or strict monitoring',
 true, 'early', 'high'),

-- 17
(37, 36, 'pharmacodynamic', 'moderate',
 'Beta blocker + apixaban → bleeding + bradycardia risk masking',
 'Clinical deterioration hidden',
 'Monitor vitals & bleeding',
 true, 'chronic', 'moderate'),

-- 18
(23, 31, 'pharmacodynamic', 'moderate',
 'SGLT2 + statin → cardiovascular synergy',
 'Improved CV outcomes',
 'Safe combination',
 false, 'chronic', 'high'),

-- 19
(22, 31, 'pharmacodynamic', 'moderate',
 'SGLT2 + statin → additive CV protection',
 'Reduced MI risk',
 'Monitor renal function',
 false, 'chronic', 'high'),

-- 20
(25, 28, 'pharmacodynamic', 'moderate',
 'Insulin + aspirin → no direct interaction but bleeding risk context',
 'Bleeding + hypoglycemia confusion risk',
 'Monitor clinically',
 false, 'chronic', 'moderate');

-- Seed data for Hospital Formulary data.

 INSERT INTO hospital_formulary (
  drug_id,
  in_stock,
  stock_level,
  pharmacy_notes
)
VALUES

-- Diabetes drugs
(17, true, 'high', 'Commonly used first-line drug. Always available'),
(18, true, 'medium', 'Stock fluctuates based on demand'),
(19, true, 'high', 'Frequent outpatient dispensing'),
(20, true, 'medium', 'Limited stock, reorder weekly'),
(21, true, 'medium', 'Available in endocrinology pharmacy'),
(22, true, 'high', 'Cardio-diabetes dual benefit drug'),
(23, true, 'high', 'High demand due to HF + CKD use'),
(24, true, 'medium', 'Restricted use in HF patients'),
(25, true, 'high', 'Insulin available in cold storage'),

-- GI / other diabetes drugs
(26, true, 'low', 'Occasional stock shortage'),
(27, true, 'medium', 'Used in postprandial control'),

-- Cardiac antiplatelets
(28, true, 'high', 'Emergency ACS protocol drug'),
(29, true, 'high', 'Standard post-PCI therapy'),
(30, true, 'medium', 'High-cost drug, limited stock'),

-- Statins
(31, true, 'high', 'Core cardiology medication'),
(32, true, 'medium', 'Used when atorvastatin intolerance'),

-- BP / HF drugs
(33, true, 'high', 'Essential HF + HTN drug'),
(34, true, 'high', 'First-line ARB in hospital formulary'),
(35, true, 'medium', 'Monitor potassium before dispensing'),

-- Anticoagulant
(36, true, 'medium', 'Restricted use, specialist approval required'),

-- Cardiac support drugs
(37, true, 'high', 'Common in CCU and OPD'),
(38, true, 'high', 'Emergency diuretic for pulmonary edema'),

-- Neuro / pain
(39, true, 'medium', 'Used in diabetic neuropathy cases');