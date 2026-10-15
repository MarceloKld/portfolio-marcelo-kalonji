"use client";

/**
 * Marquee.tsx
 * -----------
 * Bande de défilement horizontal infini.
 * TECHNIQUE "duplication x2" + animation CSS pure.
 */
import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Durée d'un cycle complet en secondes (plus petit = plus rapide) */
  speed?: number;
  /** Nombre de répétitions du contenu À L'INTÉRIEUR d'un groupe */
  repeat?: number;
  /** Inverse le sens du défilement */
  reverse?: boolean;
  /** true = déborde plein écran (Hero) / false = reste dans son conteneur */
  fullBleed?: boolean;
  className?: string;
};

export function Marquee({
  children,
  speed = 28,
  repeat = 8, // ↑ augmenté pour éviter les trous sur mobile
  reverse = false,
  fullBleed = false,
  className,
}: MarqueeProps) {
  const group = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center">
      {children}
    </span>
  ));

  return (
    <div
      className={cn(
        "overflow-hidden",
        fullBleed && "relative left-1/2 w-screen -translate-x-1/2"
      )}
    >
      <div
        className={cn(
          "marquee-track flex w-max items-center whitespace-nowrap will-change-transform",
          className
        )}
        style={
          {
            "--marquee-duration": `${speed}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        {/* Groupe visible */}
        <div className="flex shrink-0 items-center">{group}</div>

        {/* Groupe dupliqué (accessibilité) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {group}
        </div>
      </div>
    </div>
  );
}