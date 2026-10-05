"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Enveloppe n'importe quelle carte pour lui ajouter un halo lumineux
 * qui suit le curseur au survol (effet "Spotlight", très utilisé
 * sur les portfolios primés Awwwards).
 *
 * Choix technique important : on modifie directement le style du DOM
 * via el.style.setProperty(), SANS passer par useState. 
 * Pourquoi ? Parce que useState déclencherait un RE-RENDU React à
 * chaque micro-mouvement de souris (des dizaines de fois par seconde) —
 * ce qui serait lourd et contraire à notre exigence de performance.
 * Manipuler directement le style est la技 technique recommandée pour
 * les animations suivant la souris en continu.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Position du curseur RELATIVE au coin supérieur gauche de la carte
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--spotlight-x", `${x}px`);
    el.style.setProperty("--spotlight-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("spotlight-card", className)}
    >
      {children}
    </div>
  );
}