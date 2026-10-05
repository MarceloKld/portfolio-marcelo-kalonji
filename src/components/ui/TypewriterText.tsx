"use client";

import { useState, useEffect, useMemo } from "react";

type TypewriterTextProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  /** 
   * Si true (par défaut), réserve l'espace du mot le plus long pour éviter
   * que le texte autour ne bouge. À mettre à false dans un conteneur
   * qui doit pouvoir s'adapter librement (ex: une bulle de chat).
   */
  reserveSpace?: boolean;
};

export function TypewriterText({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1500,
  reserveSpace = true,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Array.from() découpe le texte en "vrais" caractères visuels,
  // emojis compris, contrairement à word.split("") qui peut les casser.
  const charactersPerWord = useMemo(
    () => words.map((w) => Array.from(w)),
    [words]
  );

  const maxWordLength = useMemo(
    () => Math.max(...charactersPerWord.map((w) => w.length)),
    [charactersPerWord]
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

  // On reconstruit le texte à partir du tableau de caractères (join)
  const displayedText = charactersPerWord[wordIndex].slice(0, charCount).join("");

  return (
    <span
      style={reserveSpace ? { minWidth: `${maxWordLength}ch` } : undefined}
      className="inline-block text-left"
    >
      {displayedText}
      <span className="animate-blink ml-0.5 inline-block w-[2px] h-[0.9em] translate-y-[0.1em] bg-[var(--accent)]" />
    </span>
  );
}