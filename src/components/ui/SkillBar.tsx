"use client";

/**
 * SkillBar.tsx
 * ------------
 * Barre de progression dont la largeur ne s'anime QUE lorsqu'elle entre
 * dans le viewport (useInView, déjà existant dans le projet). Ça évite
 * un effet "statique" et donne une impression de chargement au scroll.
 */
import { useInView } from "@/lib/useInView";

type SkillBarProps = {
  name: string;
  percentage: number;
};

export function SkillBar({ name, percentage }: SkillBarProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-[var(--foreground)]/80">{name}</span>
        <span className="font-semibold text-[var(--accent)]">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-color)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-1000 ease-out"
          style={{ width: isInView ? `${percentage}%` : "0%" }}
        />
      </div>
    </div>
  );
}