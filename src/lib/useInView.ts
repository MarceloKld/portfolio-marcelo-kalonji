"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook qui détecte quand un élément entre dans la zone visible de l'écran.
 * Basé sur IntersectionObserver (API native du navigateur, très performante).
 */
export function useInView<T extends HTMLElement>(
  options: { threshold?: number; triggerOnce?: boolean } = {}
) {
  const { threshold = 0.15, triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Ce callback s'exécute de façon asynchrone (déclenché par le navigateur),
        // donc aucun warning de "setState synchrone dans un effet"
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isInView };
}