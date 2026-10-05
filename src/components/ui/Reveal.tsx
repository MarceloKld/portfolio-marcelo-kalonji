"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  delay?: number; // délai en ms — clé de l'effet "échelonné"
  className?: string;
};

/**
 * Enveloppe n'importe quel élément pour le faire apparaître en douceur
 * (fondu + léger glissement) quand il entre dans l'écran.
 *
 * Pour un effet "Staggered Reveal", donne des délais croissants :
 * <Reveal delay={0}>...</Reveal>
 * <Reveal delay={150}>...</Reveal>
 * <Reveal delay={300}>...</Reveal>
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}