import type { FormularyItem } from "@/lib/types";

type Props = {
  formulary: FormularyItem[];
};

function getStatusStyles(status: string) {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("contraindicated")
  ) {
    return {
      badge:
        "bg-red-100 text-red-700",
      border:
        "border-red-200",
    };
  }

  if (
    normalized.includes("caution")
  ) {
    return {
      badge:
        "bg-amber-100 text-amber-700",
      border:
        "border-amber-200",
    };
  }

  return {
    badge:
      "bg-emerald-100 text-emerald-700",
    border:
      "border-slate-200",
  };
}

export default function FormularyPanel({
  formulary,
}: Props) {
  if (!formulary || formulary.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
        No formulary data available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {formulary.map((item, idx) => {
        const styles = getStatusStyles(
          item.status
        );

        return (
          <div
            key={`${item.name}-${idx}`}
            className={`rounded-2xl border bg-white p-4 shadow-sm ${styles.border}`}
          >
            <div className="flex items-start justify-between gap-4">
              
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.name}
                </h3>

                {item.note && (
                  <p className="mt-2 text-sm text-slate-500">
                    {item.note}
                  </p>
                )}
              </div>

              <div className="text-right">
                <div
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
                >
                  {item.status}
                </div>

                {item.price && (
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {item.price}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}