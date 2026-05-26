import type { OptionC } from "@/lib/types";

type OptionCPanelProps = {
  optionC: OptionC | undefined;
};

function Section({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <div className="mb-4">
      <p className="font-semibold text-sm text-slate-900">{title}</p>
      <ul className="list-disc ml-5 mt-2 text-sm text-slate-600 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function OptionCPanel({ optionC }: OptionCPanelProps) {
  if (!optionC) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm shadow-amber-200/30">
        <h2 className="text-xl font-semibold text-amber-900">India Option C</h2>
        <p className="mt-2 text-sm text-amber-700">Select a patient to view structured Option C guidance.</p>
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">India Option C</h2>
          <p className="mt-2 text-sm text-slate-600">Structured recommendations for the selected patient.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Section title="Recommendations" items={optionC.key_recommendations} />
        <Section title="Renal Adjustments" items={optionC.renal_adjustments} />
        <Section title="Cardiology Flags" items={optionC.cardiology_flags} />
        <Section title="Drug Safety Flags" items={optionC.drug_safety_flags} />
        <Section title="Cost Guidance" items={optionC.cost_notes} />
      </div>
    </section>
  );
}
