import type { GuidelineSource } from "@/lib/types";

export default function GuidelineSources({
  sources,
}: {
  sources: GuidelineSource[];
}) {
  return (
    <div className="space-y-2">
      {sources?.length ? (
        sources.map((g, idx) => (
          <div
            key={idx}
            className="rounded-lg border bg-slate-50 p-2 text-xs"
          >
            {/* HEADER ROW */}
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-800">
                {g.source}
              </div>

              {/* TAG BADGE */}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {g.tag}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-1 text-slate-600">
              {g.note}
            </div>
          </div>
        ))
      ) : (
        <p className="text-slate-500">No guideline data available</p>
      )}
    </div>
  );
}