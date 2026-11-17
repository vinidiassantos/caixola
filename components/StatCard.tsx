interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  variant?: "default" | "positive" | "negative";
}

export function StatCard({ label, value, hint, variant = "default" }: StatCardProps) {
  const color =
    variant === "positive" ? "text-green-600" : variant === "negative" ? "text-red-600" : "text-blue-900";
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex-1">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
