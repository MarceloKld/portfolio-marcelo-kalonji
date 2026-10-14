"use client";

/**
 * About.tsx — Section "À propos"
 * --------------------------------
 * Layout 2 colonnes sur desktop :
 *  - gauche : photo de Marcelo (réutilisée, même fichier que le Hero)
 *  - droite : texte de présentation + highlights + stats chiffrées
 * Sur mobile, tout s'empile en 1 colonne (photo au-dessus).
 */

import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="apropos" className="relative px-5 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

        {/* Colonne photo */}
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border"
               style={{ borderColor: "var(--border-color)" }}>
            <Image
              src="/images/profile/marcelo.webp"
              alt="Portrait de Marcelo Kalonji Kashala"
              fill
              className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              sizes="(max-width: 1024px) 80vw, 400px"
            />
          </div>
        </Reveal>

        {/* Colonne texte */}
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              {t.about.title}
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--foreground)]/70">
              {t.about.paragraph}
            </p>
          </Reveal>

          {/* Liste des points forts, avec icône check verte (petit détail, respecte la charte) */}
          <Reveal delay={150}>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.about.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="shrink-0 text-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Stats chiffrées */}
          <Reveal delay={250}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-6"
                 style={{ borderColor: "var(--border-color)" }}>
              {t.about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-[var(--foreground)]/60 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}