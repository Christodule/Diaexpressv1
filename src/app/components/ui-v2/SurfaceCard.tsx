import { type ReactNode } from "react";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
  soft?: boolean;
};

export function SurfaceCard({ children, className = "", soft = false }: SurfaceCardProps) {
  const baseClass = soft ? "dx-surface-soft" : "dx-surface";
  return <div className={`${baseClass} ${className}`}>{children}</div>;
}
