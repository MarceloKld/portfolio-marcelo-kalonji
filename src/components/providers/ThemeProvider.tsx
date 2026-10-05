"use client"; // Composant client car next-themes utilise des hooks React

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Ce composant enveloppe toute l'application pour lui donner
 * la capacité de basculer entre thème clair et sombre.
 *
 * attribute="class"   → ajoute la classe "dark" sur le <html> (voir Tailwind config)
 * defaultTheme="system" → respecte le thème du système au premier chargement
 * enableSystem        → autorise la détection automatique
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange // évite un flash moche lors du switch
    >
      {children}
    </NextThemesProvider>
  );
}