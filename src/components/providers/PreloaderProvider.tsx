"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type PreloaderContextType = {
  isLoaded: boolean;    // devient true quand le Preloader commence à sortir
  setLoaded: () => void;
};

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

/**
 * Fournit un signal global "isLoaded" à toute l'application.
 * Le Preloader l'active au moment où il commence à glisser vers le haut.
 * Le Hero écoute ce signal pour démarrer son animation d'entrée
 * EXACTEMENT au même moment — d'où l'effet synchronisé "rideau qui
 * s'ouvre + contenu qui monte".
 */
export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const setLoaded = () => setIsLoaded(true);

  return (
    <PreloaderContext.Provider value={{ isLoaded, setLoaded }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader doit être utilisé dans PreloaderProvider");
  }
  return context;
}