import type { OptionC } from "@/lib/types";

type ResponseComparisonProps = {
  genericText: string;
  optionC?: OptionC;
};

function Section({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>

      <ul className="mt-3 space-y-2">
        {items.map((item, idx) => (
          <li
            key={`${title}-${idx}`}
            className="flex gap-2 text-sm leading-6 text-slate-700"
          >
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResponseComparison({
  genericText,
  optionC,
}: ResponseComparisonProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      
      {/* HEADER */}
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Response Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Generic AI vs India Option C clinical reasoning
          </p>
        </div>

        {/* <div className="rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold text-cyan-700">
          RSSDI + CSI + KDIGO
        </div> */}
      </div>

      {/* CONTENT GRID SAME HEIGHT */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2 items-stretch">

        {/* GENERIC AI (NO SCROLL) */}
        <article className="rounded-3xl border border-slate-200 bg-white p-6 h-[700px] flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Generic AI
            </h3>

            <div className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
              Standard Guidance
            </div>
          </div>

          {/* fixed area */}
          <div className="mt-5 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {genericText}
          </div>
        </article>

        {/* INDIA OPTION C (ONLY SCROLL HERE) */}
        <article className="rounded-3xl border border-slate-200 bg-white p-6 h-[700px] flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              India Option C
            </h3>

            <div className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
              Personalized
            </div>
          </div>

          {optionC ? (
            <div className="mt-5 flex-1 overflow-y-auto space-y-4 pr-2">
              
              <Section
                title="Key Recommendations"
                items={optionC.key_recommendations}
              />

              <Section
                title="Diabetes Management"
                items={optionC.diabetes_recommendations}
              />

              <Section
                title="Renal Safety"
                items={optionC.renal_recommendations}
              />

              <Section
                title="Cardiovascular Management"
                items={optionC.cardiology_recommendations}
              />

              <Section
                title="Lifestyle Recommendations"
                items={optionC.lifestyle_recommendations}
              />

              <Section
                title="Drug Safety Alerts"
                items={optionC.drug_safety_flags}
              />

              <Section
                title="Cost & Formulary Guidance"
                items={optionC.cost_notes}
              />

              <Section
                title="Monitoring Plan"
                items={optionC.monitoring_plan}
              />
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
              Option C recommendations are loading...
            </div>
          )}
        </article>
      </div>
    </section>
  );
}