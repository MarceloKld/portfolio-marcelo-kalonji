import type { ReactNode } from "react";

/**
 * Badge avec point vert pulsant (disponibilité).
 */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]/30">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
      </span>
      {children}
    </div>
  );
}