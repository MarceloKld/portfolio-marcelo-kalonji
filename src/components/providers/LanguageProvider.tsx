"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { Locale } from "@/types";
import fr from "@/i18n/fr.json";
import en from "@/i18n/en.json";
import { subscribe, getSnapshot, getServerSnapshot, setStoredLocale } from "@/i18n/localeStore";

const translations = { fr, en };

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof fr;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore lit directement localStorage et se met à jour
  // automatiquement quand setStoredLocale() appelle emitChange().
  // Plus besoin de useState + useEffect → plus de warning.
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = (l: Locale) => {
    setStoredLocale(l);
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé à l'intérieur de LanguageProvider");
  }
  return context;
}