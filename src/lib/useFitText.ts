"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Sur le serveur (SSR), useLayoutEffect n'existe pas vraiment et génère un
// avertissement. Cette petite astuce bascule automatiquement sur useEffect
// côté serveur, et useLayoutEffect côté navigateur (où il s'exécute AVANT
// l'affichage à l'écran, évitant un flash de mauvaise taille).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseFitTextOptions = {
  minFontSize?: number; // taille minimale autorisée, en pixels
  maxFontSize?: number; // taille maximale autorisée, en pixels
};

/**
 * Hook qui calcule automatiquement la taille de police idéale pour
 * qu'un texte remplisse EXACTEMENT la largeur de son conteneur,
 * sans jamais la dépasser — quel que soit l'écran.
 *
 * Fonctionnement :
 * 1. On force temporairement le texte à "maxFontSize" pour mesurer
 *    sa largeur naturelle réelle (scrollWidth).
 * 2. On calcule le ratio entre la largeur du conteneur et celle du texte.
 * 3. On applique ce ratio à "maxFontSize" pour obtenir la taille parfaite.
 * 4. On surveille le conteneur avec ResizeObserver : si l'écran change
 *    de taille (rotation mobile, redimensionnement fenêtre), on recalcule.
 */
export function useFitText({
  minFontSize = 24,
  maxFontSize = 140,
}: UseFitTextOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null); // l'espace disponible
  const textRef = useRef<HTMLHeadingElement>(null);  // le texte à ajuster
  const [fontSize, setFontSize] = useState(maxFontSize);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const recalculate = () => {
      // Étape 1 : on mesure à la taille max pour avoir une référence fiable
      text.style.fontSize = `${maxFontSize}px`;
      const containerWidth = container.offsetWidth;
      const naturalTextWidth = text.scrollWidth;

      if (naturalTextWidth === 0) return;

      // Étape 2 et 3 : calcul du ratio puis de la taille finale
      const ratio = containerWidth / naturalTextWidth;
      const idealSize = maxFontSize * ratio;

      // On borne le résultat entre min et max pour éviter les extrêmes
      const finalSize = Math.min(maxFontSize, Math.max(minFontSize, idealSize));
      setFontSize(finalSize);
    };

    recalculate();

    // Recalcule si la taille du conteneur change (resize, rotation mobile)
    const observer = new ResizeObserver(recalculate);
    observer.observe(container);

    // Recalcule aussi quand les polices web finissent de charger
    // (une police peut être légèrement plus large/étroite qu'une police système)
    if (document.fonts) {
      document.fonts.ready.then(recalculate);
    }

    return () => observer.disconnect();
  }, [minFontSize, maxFontSize]);

  return { containerRef, textRef, fontSize };
}