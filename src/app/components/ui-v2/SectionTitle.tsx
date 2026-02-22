import { type ReactNode } from "react";

type SectionTitleProps = {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-5">
      <h2 className="dx-section-title">
        {icon ? <span className="text-[#f1580c]">{icon}</span> : null}
        <span>{title}</span>
      </h2>
      {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
