import type { SafetyAlert } from "@/lib/types";

type Props = {
  alerts: SafetyAlert[];
};

function getAlertStyles(severity: string) {
  switch (severity) {
    case "HIGH":
      return {
        container:
          "border-red-200 bg-red-50",
        badge:
          "bg-red-100 text-red-700",
        title:
          "text-red-800",
      };

    case "MODERATE":
      return {
        container:
          "border-amber-200 bg-amber-50",
        badge:
          "bg-amber-100 text-amber-700",
        title:
          "text-amber-800",
      };

    default:
      return {
        container:
          "border-cyan-200 bg-cyan-50",
        badge:
          "bg-cyan-100 text-cyan-700",
        title:
          "text-cyan-800",
      };
  }
}

export default function SafetyAlerts({
  alerts,
}: Props) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
        No active safety alerts.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, idx) => {
        const styles = getAlertStyles(
          alert.severity
        );

        return (
          <div
            key={`${alert.title}-${idx}`}
            className={`rounded-2xl border p-4 shadow-sm ${styles.container}`}
          >
            <div className="flex items-start justify-between gap-3">
              
              <div className="flex-1">
                <h3
                  className={`text-sm font-semibold ${styles.title}`}
                >
                  {alert.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {alert.description}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
              >
                {alert.severity}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}