"use client";
// Obligatoire : ce composant utilise useState + useEffect pour l'animation

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type RotatingTextProps = {
  words: string[];      // Liste des mots à faire défiler
  interval?: number;    // Temps entre chaque mot (en millisecondes)
};

/**
 * Affiche une liste de mots les uns après les autres, en boucle,
 * avec une transition douce (fondu + léger glissement vertical).
 *
 * Technique utilisée : tous les mots sont empilés dans LA MÊME
 * cellule de grille CSS (col-start-1 row-start-1). Seul le mot actif
 * est visible (opacity-100), les autres sont invisibles (opacity-0).
 * Avantage : le conteneur garde toujours la largeur du mot le plus long,
 * donc AUCUN saut de mise en page (layout shift) pendant l'animation.
 */
export function RotatingText({ words, interval = 2200 }: RotatingTextProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // setInterval appelle setState de façon ASYNCHRONE (après un délai),
    // donc ceci ne déclenche PAS le warning vu en Phase 2
    // (qui ne concernait que les appels synchrones immédiats dans l'effet).
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, interval);

    // Nettoyage : on arrête le minuteur si le composant disparaît
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid text-left">
      {words.map((word, index) => (
        <span
          key={word}
          // Toutes les spans occupent la même cellule de grille (superposées)
          className={cn(
            "col-start-1 row-start-1 transition-all duration-500 ease-out",
            index === activeIndex
              ? "translate-y-0 opacity-100"   // mot actif : visible, en place
              : "translate-y-2 opacity-0"     // mots inactifs : invisibles, décalés
          )}
          aria-hidden={index !== activeIndex} // masque les mots inactifs aux lecteurs d'écran
        >
          {word}
        </span>
      ))}
    </span>
  );
}