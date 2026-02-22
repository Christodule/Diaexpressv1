import { type ReactNode } from "react";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
  soft?: boolean;
  hover?: boolean;
};

export function SurfaceCard({
  children,
  className = "",
  soft = false,
  hover = false,
}: SurfaceCardProps) {
  const baseClass = soft ? "dx-surface-soft" : "dx-surface";
  return <div className={`${baseClass} ${hover ? "dx-card-hover" : ""} ${className}`}>{children}</div>;
}
