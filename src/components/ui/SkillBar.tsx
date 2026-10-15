"use client";

import { useInView } from "@/lib/useInView";

type SkillBarProps = {
  name: string;
  percentage: number;
};

export function SkillBar({ name, percentage }: SkillBarProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm sm:mb-2">
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