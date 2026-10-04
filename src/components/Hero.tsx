"use client"; // Important car on utilise un Hook
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/constants/translations";
import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react'; // Icônes SVG uniquement
import { HERO_DATA } from '@/constants';

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero; // On récupère les textes selon la langue choisie
 return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 py-10 overflow-hidden">
      <div className="flex-1 z-10 animate-fade-in-up">
        {/* Badge Statut */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-[14px] font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {t.status}
        </div>

        {/* Nom */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-4">
          {t.nameFirst} <br />
          <span className="text-blue-600">{t.nameLast}</span>
        </h1>

        <h2 className="text-xl md:text-2xl font-light text-gray-500 mb-6">
          {t.title}
        </h2>

        {/* Rôles tournants */}
        <div className="h-8 overflow-hidden mb-8 text-lg font-medium">
            <div className="animate-text-slide">
                {t.roles.map((role) => (
                    <div key={role} className="h-8 text-blue-500">{role}</div>
                ))}
            </div>
        </div>

        <p className="max-w-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
          {t.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full hover:bg-blue-600 transition-all font-bold">
            {t.btnPrimary} <ArrowRight size={18} />
          </button>
          <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-800 px-6 py-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-all font-bold">
            {t.btnSecondary}
          </button>
        </div>
      </div>

      {/* Image avec effet Overlap (Portrait) */}
      <div className="flex-1 relative mt-12 md:mt-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] mx-auto">
            {/* Forme géométrique en arrière-plan */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-blue-600 rounded-2xl z-0"></div>
            
            {/* Conteneur Image */}
            <div className="relative w-full h-full bg-gray-200 rounded-2xl overflow-hidden z-10 shadow-2xl">
                {/* Remplace 'portrait.png' par ton image réelle dans /public */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 italic">
                    [Photo de Marcelo]
                    {/* <Image src="/marcelo.png" alt="Marcelo" fill className="object-cover" /> */}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}