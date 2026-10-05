"use client";

import type { ReactNode } from "react";
import { usePreloader } from "@/components/providers/PreloaderProvider";
import { cn } from "@/lib/utils";

type EntranceRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Comme "Reveal", mais se déclenche à la fin du Preloader
 * (et non au scroll). Réservé aux éléments visibles dès le chargement,
 * comme le Hero.
 */
export function EntranceReveal({ children, delay = 0, className }: EntranceRevealProps) {
  const { isLoaded } = usePreloader();

  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}