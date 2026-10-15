"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Enveloppe n'importe quelle carte pour lui ajouter un halo lumineux
 * qui suit le curseur au survol (effet "Spotlight").
 *
 * Technique : modification directe du style via el.style.setProperty()
 * → pas de re-render React à chaque mouvement de souris.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--spotlight-x", `${x}px`);
    el.style.setProperty("--spotlight-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    // Optionnel : recentrer doucement le spotlight à la sortie
    // (tu peux commenter ces 2 lignes si tu préfères qu'il reste où il était)
    el.style.setProperty("--spotlight-x", "50%");
    el.style.setProperty("--spotlight-y", "50%");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "spotlight-card relative overflow-hidden", // overflow-hidden important pour le halo
        className
      )}
    >
      {children}
    </div>
  );
}