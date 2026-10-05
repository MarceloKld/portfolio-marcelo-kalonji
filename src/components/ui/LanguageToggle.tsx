"use client"; // Utilise le hook useLanguage (interactif)

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * Petit switch textuel FR / EN.
 * On met en évidence (couleur pleine) la langue active.
 */
export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--border-color)] p-1 text-xs font-medium">
      <button
        onClick={() => setLocale("fr")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "fr"
            ? "bg-[var(--foreground)] text-[var(--background)]" // actif
            : "text-[var(--foreground)]/50 hover:text-[var(--foreground)]" // inactif
        )}
      >
        FR
      </button>
      <button
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en"
            ? "bg-[var(--foreground)] text-[var(--background)]"
            : "text-[var(--foreground)]/50 hover:text-[var(--foreground)]"
        )}
      >
        EN
      </button>
    </div>
  );
}