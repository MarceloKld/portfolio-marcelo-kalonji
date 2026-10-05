"use client";
// Obligatoire : ce composant utilise useState et le Context,
// donc il doit tourner côté navigateur (client), pas côté serveur.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Locale } from "@/types";
import fr from "@/i18n/fr.json";
import en from "@/i18n/en.json";

// On regroupe les deux dictionnaires dans un seul objet,
// accessible via translations["fr"] ou translations["en"]
const translations = { fr, en };

// Définition de la forme de notre "boîte" (le Context)
type LanguageContextType = {
  locale: Locale;              // la langue actuelle
  setLocale: (l: Locale) => void; // la fonction pour la changer
  t: typeof fr;                 // le dictionnaire de traduction actif
};

// Création du Context. La valeur "undefined" par défaut sert
// juste à détecter une erreur si on oublie d'envelopper l'app avec le Provider.
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/**
 * LanguageProvider enveloppe toute l'application.
 * Il fournit la langue active à tous les composants enfants.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // État local : langue par défaut = français
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Au premier chargement, on regarde si une langue a été
  // sauvegardée précédemment dans le navigateur (localStorage)
  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "fr" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  // Fonction pour changer la langue ET la sauvegarder dans le navigateur
  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  };

  // Le dictionnaire correspondant à la langue active
  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook personnalisé : useLanguage()
 * Permet à n'importe quel composant d'accéder facilement
 * à { locale, setLocale, t } sans répéter le useContext partout.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé à l'intérieur de LanguageProvider");
  }
  return context;
}