import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  variant?: "default" | "positive" | "negative";
  icon?: LucideIcon;
}

export function StatCard({ label, value, hint, variant = "default", icon: Icon }: StatCardProps) {
  const color =
    variant === "positive" ? "text-emerald-600" : variant === "negative" ? "text-rose-600" : "text-slate-900";
  const iconBg =
    variant === "positive" ? "bg-emerald-50 text-emerald-600" : variant === "negative" ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600";
  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-sm shadow-slate-900/[0.02]">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        {Icon && (
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <p className={`text-2xl font-bold mt-2 tabular-nums tracking-tight ${color}`}>{value}</p>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}
