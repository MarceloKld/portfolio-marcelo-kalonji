"use client";

/**
 * StatBadge.tsx
 * -------------
 * Petite carte flottante autour de la photo (About).
 * Effet verre + compteur animé + hover fluide.
 */
import type { LucideIcon } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";
import { cn } from "@/lib/utils";

type StatBadgeProps = {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
  className?: string;
};

export function StatBadge({
  icon: Icon,
  value,
  suffix = "+",
  label,
  className = "",
}: StatBadgeProps) {
  const { ref, value: animatedValue } = useCountUp(value);

  return (
    <div
      ref={ref}
      className={cn(
        "glass group/badge absolute z-20 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)]",
        "hover:border-[var(--accent)]/30",
        className
      )}
    >
      {/* Icône avec glow au hover */}
      <span
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 transition-all duration-300
                   group-hover/badge:bg-[var(--accent)]/25 group-hover/badge:scale-110"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-0 blur-md transition-opacity duration-300 group-hover/badge:opacity-20"
        />
        <Icon
          size={16}
          className="relative text-[var(--accent)] transition-transform duration-300 group-hover/badge:scale-110"
        />
      </span>

      <div>
        <p className="text-lg font-extrabold leading-none text-[var(--foreground)] transition-colors duration-300">
          {animatedValue}
          {suffix}
        </p>
        <p className="mt-1 whitespace-nowrap text-[11px] text-[var(--foreground)]/60 transition-colors duration-300 group-hover/badge:text-[var(--foreground)]/80">
          {label}
        </p>
      </div>
    </div>
  );
}