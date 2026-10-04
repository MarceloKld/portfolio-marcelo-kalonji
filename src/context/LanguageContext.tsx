"use client";
import React, { createContext, useContext, useState } from 'react';
import { Language } from '@/constants/translations';

// 1. On définit ce que notre "station radio" va diffuser
type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 2. Le "Provider" est l'antenne qui diffuse l'information
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('fr');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Le "Hook" est le petit récepteur que chaque composant utilisera
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur de LanguageProvider');
  }
  return context;
}