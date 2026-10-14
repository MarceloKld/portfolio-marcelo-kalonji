"use client";

/**
 * StatBadge.tsx
 * -------------
 * La petite carte flottante "5+ Projets Livrés" etc., positionnée en
 * absolute autour de la photo dans About.tsx. Utilise la classe .glass
 * déjà définie dans globals.css pour l'effet verre dépoli.
 */
import type { LucideIcon } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";

type StatBadgeProps = {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
  className?: string; // positionnement absolu (top/left/right/bottom)
};

export function StatBadge({ icon: Icon, value, suffix = "+", label, className = "" }: StatBadgeProps) {
  const { ref, value: animatedValue } = useCountUp(value);

  return (
    <div
      ref={ref}
      className={`glass absolute flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15">
        <Icon size={16} className="text-[var(--accent)]" />
      </span>
      <div>
        <p className="text-lg font-extrabold leading-none text-[var(--foreground)]">
          {animatedValue}{suffix}
        </p>
        <p className="mt-1 whitespace-nowrap text-[11px] text-[var(--foreground)]/60">
          {label}
        </p>
      </div>
    </div>
  );
}