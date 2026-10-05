"use client";

import { useEffect, useState } from "react";
import { usePreloader } from "@/components/providers/PreloaderProvider";

const SIGNATURE = "CRAFTING DIGITAL SOLUTIONS";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const { setLoaded } = usePreloader(); // signal partagé avec le Hero

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setIsExiting(true); // déclenche le glissement du rideau
      setLoaded();         // déclenche SIMULTANÉMENT l'entrée du Hero
    }, 2200);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "auto";
    }, 3100); // un peu plus long que la durée de la transition (900ms)

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "auto";
    };
  }, [setLoaded]);

  if (!isVisible) return null;

  const letters = SIGNATURE.split("");

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-[var(--background)] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "pointer-events-none -translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="absolute h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-[100px]" />

      <div
        style={{ animation: "letter-in 0.6s ease-out forwards" }}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-color)] text-lg font-bold text-[var(--foreground)] opacity-0"
      >
        MK
      </div>

      <div className="relative flex flex-wrap items-center justify-center px-6 text-center">
        {letters.map((letter, index) => (
          <span
            key={index}
            style={{
              animation: "letter-in 0.5s ease-out forwards",
              animationDelay: `${300 + index * 40}ms`,
            }}
            className="inline-block whitespace-pre text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)] opacity-0 sm:text-base"
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="relative mt-1 h-[2px] w-40 overflow-hidden rounded-full bg-[var(--border-color)]">
        <div
          style={{ animation: "progress-line 2s ease-in-out forwards" }}
          className="h-full bg-[var(--accent)]"
        />
      </div>
    </div>
  );
}