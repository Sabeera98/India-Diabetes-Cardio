"use client";

import { useEffect, useMemo, useState } from "react";
import PatientSelector from "../components/PatientSelector";
import ResponseComparison from "../components/ResponseComparison";
import SafetyAlerts from "../components/SafetyAlerts";
import GuidelineSources from "../components/GuidelineSources";
import FormularyPanel from "../components/FormularyPanel";
import type { Patient, OptionC } from "../lib/types";

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [optionCList, setOptionCList] = useState<OptionC[]>([]);

  const selectedOptionC = useMemo(() => {
    return optionCList.find((item) => item.patient_code === selectedCode);
  }, [optionCList, selectedCode]);

  // LOAD PATIENTS
  useEffect(() => {
    async function fetchPatients() {
      const res = await fetch("/api/patients");
      const data = await res.json();

      setPatients(data);
      setSelectedCode(data?.[0]?.patient_code || "");
    }

    fetchPatients();
  }, []);

  // SELECTED PATIENT
  const selectedPatient = useMemo(() => {
    return patients.find((p) => p.patient_code === selectedCode);
  }, [patients, selectedCode]);

  // SAFETY ENGINE
  useEffect(() => {
    if (!selectedPatient) return;

    async function runSafety() {
      const res = await fetch("/api/safety-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient: selectedPatient }),
      });

      const data = await res.json();
      setAnalysis(data);
    }

    runSafety();
  }, [selectedPatient]);

  // OPTION C 
  useEffect(() => {
    async function loadOptionC() {
      const res = await fetch("/api/option-c");
      const data = await res.json();
      setOptionCList(data || []);
    }
    loadOptionC();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">

      {/* TOP HEADER */}
      <div className="h-14 flex items-center justify-between px-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-slate-900">
          Doctor BRAHMO — Option C UI
        </h1>

        <div className="text-xs text-slate-500">
          Clinical Decision Support System
        </div>
      </div>
      <main className="h-full grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)_420px] gap-4 p-4">

        {/* ================= LEFT ================= */}
        <section className="h-full flex flex-col overflow-hidden rounded-2xl bg-white border">
          <div className="flex-1 overflow-y-auto p-3">
            <PatientSelector
              patients={patients}
              selectedCode={selectedCode}
              onSelect={setSelectedCode}
            />
          </div>
        </section>

        {/* ================= MIDDLE ================= */}
        <section className="h-full flex flex-col overflow-hidden rounded-2xl bg-white border">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">

            {/* GENERIC + OPTION C */}
            {analysis ? (
              <ResponseComparison
                genericText={analysis.generic_summary || ""}
                optionC={selectedOptionC}
              />
            ) : (
              <div className="text-sm text-slate-800">
                Select a patient to view analysis
              </div>
            )}

            {/* PROMPT COMPOSER */}
            <div className="rounded-2xl border bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">Prompt Composer</h3>
              <p className="text-sm text-slate-600 mt-2">
                India-specific clinical reasoning based on RSSDI + CSI guidelines,
                renal function, affordability, and safety rules.
              </p>
            </div>

          </div>
        </section>

        {/* ================= RIGHT ================= */}
        <section className="h-full flex flex-col overflow-hidden rounded-2xl bg-white border">

          <div className="flex-1 overflow-hidden p-3 space-y-4">

            {/* ================= SAFETY ALERTS ================= */}
            <div className="rounded-xl border bg-white p-3">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Safety Alerts
              </h3>

              <div className="space-y-2 text-xs">
                <SafetyAlerts alerts={analysis?.alerts || []} />
              </div>
            </div>

            {/* ================= FORMULARY ================= */}
            <div className="rounded-xl border bg-white p-3">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Hospital Formulary
              </h3>

              <div className="space-y-2 text-xs">
                <FormularyPanel formulary={analysis?.formulary || []} />
              </div>
            </div>

            {/* ================= GUIDELINES (SCROLLABLE ONLY HERE) ================= */}
            <div className="rounded-xl border bg-white p-3 flex flex-col">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Guidelines
              </h3>

              <div className="flex-1 overflow-y-auto pr-1 max-h-[180px] text-xs">
                <GuidelineSources sources={analysis?.guidelines || []} />
              </div>
            </div>

            {/* ================= HOSPITAL CONTACTS ================= */}
            <div className="rounded-xl border bg-white p-3">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Hospital Contacts
              </h3>

              <div className="text-xs text-slate-600 space-y-1">
                <p>Diabetes Educator: ext 3345</p>
                <p>Nephrology: ext 4420</p>
                <p>Cath Lab: ext 4455</p>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}