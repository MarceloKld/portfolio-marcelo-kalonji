"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal"; // scroll-based : section sous le Hero
import { TimelineItem } from "@/components/ui/TimelineItem";
import { EXPERIENCE_META } from "@/data/experience";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES
   ════════════════════════════════════════════════════════════════ */

// Délai entre l'apparition de chaque étape de la timeline (Staggered Reveal)
const STAGGER_DELAY = 150; // millisecondes

/* ════════════════════════════════════════════════════════════════ */

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      {/* max-w-4xl (plus étroit que Services) : une timeline est plus
          lisible dans une colonne resserrée qu'étalée sur toute la largeur */}
      <div className="mx-auto max-w-4xl">
        {/* === EN-TÊTE DE SECTION === */}
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.experience.sectionLabel}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
            {t.experience.sectionTitle}
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-xl text-sm text-[var(--foreground)]/60 sm:text-base">
            {t.experience.sectionSubtitle}
          </p>
        </Reveal>

        {/* === TIMELINE === */}
        <div className="relative mt-14">
          {/* 
            Ligne verticale continue, positionnée pour passer EXACTEMENT
            au centre des cercles-icônes :
            - cercle mobile : 40px (h-10 w-10) → centre à 20px → left-5 (1.25rem = 20px)
            - cercle desktop : 48px (sm:h-12 sm:w-12) → centre à 24px → sm:left-6 (1.5rem = 24px)
            top-2 / bottom-2 : petite marge pour ne pas dépasser la 1ère/dernière icône
          */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-5 top-2 w-px bg-[var(--border-color)] sm:left-6"
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE_META.map((exp, index) => {
              // Récupère le texte traduit correspondant à cet id
              const content = t.experience.items[exp.id];

              return (
                <Reveal key={exp.id} delay={index * STAGGER_DELAY}>
                  <TimelineItem
                    icon={exp.icon}
                    role={content.role}
                    company={content.company}
                    period={content.period}
                    missions={content.missions}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}