"use client";

/**
 * useCountUp
 * ----------
 * Anime un chiffre de 0 jusqu'à sa valeur finale, UNE SEULE FOIS,
 * dès que l'élément entre dans le viewport.
 * 100% JS natif (requestAnimationFrame + IntersectionObserver).
 */
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";

export function useCountUp(target: number, duration = 1600) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    // Sécurité : on ne lance qu'une seule fois et seulement si la cible est valide
    if (!isInView || hasRun.current || !Number.isFinite(target) || target < 0) {
      return;
    }

    hasRun.current = true;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo → très fluide et premium
      const eased =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return { ref, value };
}