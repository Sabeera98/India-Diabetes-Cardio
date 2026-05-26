import { useState, useMemo } from "react";
import type { Patient } from "@/lib/types";

type PatientSelectorProps = {
  patients: Patient[];
  selectedCode: string;
  onSelect: (code: string) => void;
};

const PAGE_SIZE = 10;

export default function PatientSelector({
  patients,
  selectedCode,
  onSelect,
}: PatientSelectorProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  // -------------------------
  // SAFE NORMALIZER
  // -------------------------
  const getConditionsArray = (conditions: any) => {
    if (!conditions) return [];

    if (Array.isArray(conditions)) return conditions;

    if (typeof conditions === "string") {
      try {
        const parsed = JSON.parse(conditions);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return conditions.split(",").map((c) => c.trim());
      }
    }

    return [];
  };

  // -------------------------
  // SEARCH + FILTER
  // -------------------------
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const conditions = getConditionsArray(p.conditions);

      const searchText = search.toLowerCase();

      const matchSearch =
        p.case_label?.toLowerCase().includes(searchText) ||
        p.patient_code?.toLowerCase().includes(searchText) ||
        conditions.join(" ").toLowerCase().includes(searchText) ||
        (p.medications || [])
          .map((m) => m.name.toLowerCase())
          .join(" ")
          .includes(searchText);

      const matchFilter =
        filter === "ALL"
          ? true
          : filter === "DIABETES"
          ? conditions.some((c) =>
              /(diabetes|t2dm|dm)/i.test(c.toLowerCase())
            )
          : filter === "CKD"
          ? conditions.some((c) =>
              /(ckd|chronic kidney)/i.test(c.toLowerCase())
            )
          : filter === "HF"
          ? conditions.some((c) =>
              /(heart failure|hf)/i.test(c.toLowerCase())
            )
          : filter === "HTN"
          ? conditions.some((c) =>
              /(htn|hypertension)/i.test(c.toLowerCase())
            )
          : filter === "AF"
          ? conditions.some((c) =>
              /(af|atrial fibrillation)/i.test(c.toLowerCase())
            )
          : true;

      return matchSearch && matchFilter;
    });
  }, [patients, search, filter]);

  // -------------------------
  // PAGINATION (FIXED → uses filteredPatients)
  // -------------------------
  const totalPages = Math.ceil(filteredPatients.length / PAGE_SIZE);

  const paginatedPatients = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredPatients.slice(start, start + PAGE_SIZE);
  }, [filteredPatients, page]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Patient selector
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Choose an assessment scenario.
      </p>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search patient, condition, drug..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mt-3 w-full rounded-xl border px-3 py-2 text-sm"
      />

      {/* FILTERS */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {["ALL", "DIABETES", "CKD", "HF", "HTN", "AF"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setPage(1);
            }}
            className={`px-3 py-1 rounded-full border ${
              filter === f
                ? "bg-cyan-100 border-cyan-400"
                : "bg-white border-slate-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="mt-4 space-y-3">
        {paginatedPatients.length === 0 ? (
          <p className="text-sm text-slate-500">
            No patients found for this filter
          </p>
        ) : (
          paginatedPatients.map((patient) => (
            <button
              key={patient.patient_code}
              onClick={() => onSelect(patient.patient_code)}
              className={`w-full rounded-2xl border px-4 py-3 text-left ${
                selectedCode === patient.patient_code
                  ? "border-sky-500 bg-sky-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{patient.case_label}</p>
                  <p className="text-sm text-slate-500">
                    {getConditionsArray(patient.conditions).join(" · ")}
                  </p>
                </div>

                <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                  {patient.age} yrs
                </span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}