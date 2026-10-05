"use client";
// Nécessaire : on utilise useState/useEffect + le hook useTheme (interactif)

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"; // Icônes SVG, aucune image lourde

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Astuce anti-bug d'hydratation :
  // next-themes ne connaît le vrai thème qu'une fois le JS chargé côté client.
  // On attend le "mount" avant d'afficher l'icône pour éviter un décalage visuel.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Pendant le chargement, on affiche un espace vide de la même taille
    return <div className="h-9 w-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Changer de thème"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
    >
      {/* Si on est en mode sombre, on propose l'icône soleil (pour repasser en clair) */}
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}