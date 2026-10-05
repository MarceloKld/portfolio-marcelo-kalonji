"use client";

import { useEffect, useState } from "react";

// Ta signature, affichée lettre par lettre au chargement
const SIGNATURE = "CRAFTING DIGITAL SOLUTIONS";

/**
 * Écran de chargement affiché au premier accès au site.
 * Déroulement :
 * 1. La signature apparaît lettre par lettre (effet "stagger")
 * 2. Après une pause, l'écran se floute et s'efface en fondu
 * 3. Le composant se retire complètement du DOM (plus aucun impact sur les performances)
 */
export function Preloader() {
  const [isVisible, setIsVisible] = useState(true); // le preloader existe-t-il encore dans le DOM ?
  const [isExiting, setIsExiting] = useState(false); // est-il en train de disparaître ?

  useEffect(() => {
    // On bloque le scroll de la page tant que le preloader est visible
    document.body.style.overflow = "hidden";

    // Après 1.8s, on déclenche l'animation de sortie (fondu + flou + zoom)
    const exitTimer = setTimeout(() => setIsExiting(true), 1800);

    // Après 2.3s (le temps que le fondu se termine), on retire le composant
    // du DOM et on réactive le scroll de la page
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "auto";
    }, 2300);

    // Nettoyage : si le composant est démonté avant la fin, on annule les minuteurs
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  // Une fois la sortie terminée, on ne rend plus rien du tout (0 coût en performance)
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)] transition-all duration-500 ease-in-out ${
        isExiting
          ? "pointer-events-none scale-105 opacity-0 backdrop-blur-2xl"
          : "opacity-100"
      }`}
    >
      {/* Halo flouté en fond, pour une touche moderne */}
      <div className="absolute h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-[100px]" />

      {/* La signature, découpée mot par mot puis lettre par lettre */}
      <div className="relative flex flex-wrap items-center justify-center gap-x-3 px-6 text-center">
        {SIGNATURE.split(" ").map((word, wordIndex) => (
          <span key={word} className="flex">
            {word.split("").map((letter, letterIndex) => (
              <span
                key={letterIndex}
                // Chaque lettre a un délai croissant : c'est ça qui crée
                // l'effet "d'écriture progressive" de la signature
                style={{
                  animationDelay: `${(wordIndex * 10 + letterIndex) * 35}ms`,
                }}
                className="inline-block animate-letterIn text-sm font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-0 sm:text-lg"
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}