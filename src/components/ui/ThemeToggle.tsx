"use client";
// Nécessaire : on utilise useState/useEffect + le hook useTheme (interactif)

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"; // Icônes SVG, aucune image lourde
import { useHasMounted } from "@/lib/useHasMounted"; // Notre nouveau hook

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Remplace l'ancien useState+useEffect : plus aucun warning
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    // Pendant le chargement initial, on affiche un espace vide
    // de la même taille pour éviter un "saut" visuel (layout shift)
    return <div className="h-9 w-9 shrink-0" />;
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