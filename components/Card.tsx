import { ReactNode } from "react";

type Props = { title?: string; subtitle?: string; right?: ReactNode; children?: ReactNode; className?: string };
export function Card({ title, subtitle, right, children, className }: Props) {
  return (
    <div className={`card p-5 ${className || ""}`}>
      {(title || right || subtitle) && (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
