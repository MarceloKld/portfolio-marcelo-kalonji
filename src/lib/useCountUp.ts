"use client";

/**
 * useCountUp
 * ----------
 * Anime un chiffre de 0 jusqu'à sa valeur finale, UNE SEULE FOIS,
 * déclenché dès que l'élément entre dans le viewport.
 * 100% JS natif : requestAnimationFrame + IntersectionObserver (via useInView).
 * Aucune librairie d'animation nécessaire.
 */
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";

export function useCountUp(target: number, duration = 1500) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [value, setValue] = useState(0);
  const hasRun = useRef(false); // empêche de relancer le compteur à chaque scroll

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutQuad : l'animation ralentit naturellement en fin de course
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return { ref, value };
}