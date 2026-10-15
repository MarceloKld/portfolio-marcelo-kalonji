"use client";

import { useState, useEffect, useMemo } from "react";

type TypewriterTextProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

/**
 * Effet machine à écrire en boucle.
 * Utiliser avec key={locale} pour éviter les blocages au changement de langue.
 */
export function TypewriterText({
  words,
  typingSpeed = 65,
  deletingSpeed = 38,
  pauseDuration = 1600,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
  }, [
    charCount,
    isDeleting,
    wordIndex,
    charactersPerWord,
    words.length,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  const displayedText = charactersPerWord[wordIndex]
    .slice(0, charCount)
    .join("");

  return (
    <span className="inline-block text-left">
      {displayedText}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] animate-blink bg-[var(--accent)]" />
    </span>
  );
}