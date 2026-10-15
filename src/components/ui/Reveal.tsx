"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Apparition douce (fade + slide) au scroll.
 * Utilise des délais croissants pour un effet staggered.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        isInView
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}