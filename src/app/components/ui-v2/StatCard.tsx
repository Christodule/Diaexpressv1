import { type ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: ReactNode;
  tone?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
};

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "border-slate-200 bg-white text-slate-800",
  primary: "border-orange-200 bg-orange-50 text-orange-700",
  secondary: "border-cyan-200 bg-cyan-50 text-cyan-700",
  success: "border-green-200 bg-green-50 text-green-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
};

export function StatCard({ label, value, tone = "default" }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-4 ${toneClasses[tone]}`}>
      <p className="text-xs font-medium opacity-90">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
