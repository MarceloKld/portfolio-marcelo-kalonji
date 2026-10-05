"use client";

import { useState, useEffect, useMemo } from "react";

type TypewriterTextProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

/**
 * Effet "machine à écrire" : tape un mot lettre par lettre, fait une pause,
 * l'efface, puis enchaîne avec le mot suivant — en boucle.
 *
 * ⚠️ IMPORTANT : ce composant ne réserve PLUS d'espace minimum (suppression
 * de l'ancien "reserveSpace"/"minWidth"). Le texte s'affiche à sa largeur
 * naturelle, et la phrase qui l'entoure se réorganise fluidement selon
 * la longueur réelle du mot — exactement le comportement demandé.
 *
 * ⚠️ Pour que l'animation ne se bloque JAMAIS en changeant de langue,
 * ce composant doit être utilisé avec une prop React "key={locale}"
 * à l'endroit où on l'appelle (voir Hero.tsx et WhatsAppButton.tsx).
 * Cela force React à recréer le composant à zéro à chaque changement
 * de langue, plutôt que de réutiliser un état interne devenu incohérent.
 */
export function TypewriterText({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1500,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Array.from() découpe le texte en "vrais" caractères visuels,
  // emojis compris (contrairement à word.split("") qui peut les casser)
  const charactersPerWord = useMemo(
    () => words.map((w) => Array.from(w)),
    [words]
  );

  useEffect(() => {
    const currentWordChars = charactersPerWord[wordIndex];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charCount === currentWordChars.length) {
      delay = pauseDuration;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charCount === currentWordChars.length) {
        setIsDeleting(true);
      } else if (isDeleting && charCount === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCharCount((prev) => (isDeleting ? prev - 1 : prev + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, wordIndex, charactersPerWord, words.length, typingSpeed, deletingSpeed, pauseDuration]);

  const displayedText = charactersPerWord[wordIndex].slice(0, charCount).join("");

  // Plus de "minWidth" : le span prend uniquement la largeur dont il a
  // réellement besoin, donc plus aucun grand vide pour les mots courts.
  return (
    <span className="inline-block text-left">
      {displayedText}
      <span className="animate-blink ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-[var(--accent)]" />
    </span>
  );
}