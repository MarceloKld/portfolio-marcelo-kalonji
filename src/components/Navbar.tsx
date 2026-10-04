"use client"; // Indique à Next.js que ce composant est interactif (boutons, état)

import { useTheme } from "next-themes";
import { Moon, Sun, Globe } from "lucide-react"; // Import des icônes SVG
import { useLanguage } from "@/context/LanguageContext"; // ON IMPORTE NOTRE HOOK ICI
import { translations } from "@/constants/translations"; // ON IMPORTE LE DICTIONNAIRE

export default function Navbar() {
  // On récupère le thème actuel et la fonction pour le changer
  const { theme, setTheme } = useTheme();
  
  // On récupère la langue actuelle et la fonction pour la changer depuis notre Context global
  const { lang, setLang } = useLanguage();

  // On extrait les textes correspondant à la langue actuelle pour la barre de navigation
  const t = translations[lang].nav;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="bg-white/70 dark:bg-black/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl">
        
        {/* Logo / Nom - Style minimaliste moderne */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-bold text-lg">
            M
          </div>
          <span className="font-bold tracking-tight hidden sm:block text-black dark:text-white">
            MARCELO
          </span>
        </div>

        {/* Liens de navigation - Ils utilisent les traductions dynamiques */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
          <a href="#work" className="hover:text-black dark:hover:text-white transition-colors">
            {t.work}
          </a>
          <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">
            {t.about}
          </a>
          <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">
            {t.contact}
          </a>
        </div>

        {/* Actions à droite */}
        <div className="flex items-center gap-4">
          {/* Bouton changement de langue */}
          <button 
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center gap-1 text-xs font-bold text-black dark:text-white"
            title="Changer de langue"
          >
            <Globe size={18} className="text-gray-600 dark:text-gray-400" />
            {lang.toUpperCase()}
          </button>

          {/* Bouton changement de thème (Clair/Sombre) */}
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-black dark:text-white"
            title="Changer de thème"
          >
            {/* On affiche l'icône Soleil si on est en mode sombre, et inversement */}
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Bouton d'action principal (Call to Action) */}
          <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform active:scale-95">
            {t.hire}
          </button>
        </div>
      </div>
    </nav>
  );
}