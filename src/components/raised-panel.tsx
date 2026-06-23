import type { ReactNode } from "react";

export function RaisedPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-2 border-black bg-neutral-50 shadow-[8px_8px_0_0_#000] ${className} `}
    >
      {children}
    </div>
  );
}
