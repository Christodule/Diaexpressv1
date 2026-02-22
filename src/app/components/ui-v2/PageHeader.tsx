import { type ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  kicker?: string;
};

export function PageHeader({ title, subtitle, action, kicker }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        {kicker && <span className="dx-kicker">{kicker}</span>}
        <h1 className="dx-title">{title}</h1>
        {subtitle && <p className="dx-subtitle">{subtitle}</p>}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
