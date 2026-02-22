import { type ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: ReactNode;
  tone?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  icon?: ReactNode;
  hint?: string;
};

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "border-slate-200 bg-white text-slate-800",
  primary: "border-orange-200 bg-orange-50 text-orange-700",
  secondary: "border-cyan-200 bg-cyan-50 text-cyan-700",
  success: "border-green-200 bg-green-50 text-green-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
};

export function StatCard({ label, value, tone = "default", icon, hint }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide opacity-90">{label}</p>
        {icon ? <span className="opacity-70">{icon}</span> : null}
      </div>
      <p className="mt-2 text-2xl font-bold leading-none">{value}</p>
      {hint ? <p className="mt-2 text-xs opacity-80">{hint}</p> : null}
    </div>
  );
}
