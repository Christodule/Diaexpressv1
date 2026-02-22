import { type ReactNode } from "react";

type StatusBadgeProps = {
  label: ReactNode;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
  className?: string;
};

const toneMap: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  info: "border-cyan-200 bg-cyan-50 text-cyan-700",
  success: "border-green-200 bg-green-50 text-green-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
};

export function StatusBadge({ label, tone = "neutral", className = "" }: StatusBadgeProps) {
  return <span className={`dx-pill ${toneMap[tone]} ${className}`}>{label}</span>;
}
