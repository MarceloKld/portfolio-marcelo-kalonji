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
 * Apparition douce après le Preloader (réservé au Hero).
 */
export function EntranceReveal({
  children,
  delay = 0,
  className,
}: EntranceRevealProps) {
  const { isLoaded } = usePreloader();

  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-800 ease-out will-change-transform",
        isLoaded
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}