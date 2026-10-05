"use client";
// Nécessaire : useLanguage() utilise un Context React

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal"; // scroll-based, PAS EntranceReveal (section sous le Hero)
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES_META } from "@/data/services";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES
   ════════════════════════════════════════════════════════════════ */

// Délai entre l'apparition de chaque carte (effet "Staggered Reveal")
const STAGGER_DELAY = 150; // en millisecondes

/* ════════════════════════════════════════════════════════════════ */

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* === EN-TÊTE DE SECTION === */}
        <Reveal>
          {/* On réutilise la traduction "nav.services" (déjà existante)
              pour éviter de dupliquer le mot "Services" dans les 2 langues */}
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.nav.services}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
            {t.services.sectionTitle}
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-xl text-sm text-[var(--foreground)]/60 sm:text-base">
            {t.services.sectionSubtitle}{" "}
            <span className="text-[var(--foreground)]/40">
              {t.services.sectionDescription}
            </span>
          </p>
        </Reveal>

        {/* === GRILLE DES 3 CARTES === */}
        {/* grid-cols-1 sur mobile → md:grid-cols-3 sur tablette/desktop,
            exactement la consigne "1 col mobile, 2-3 cols desktop" */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES_META.map((service, index) => {
            // On récupère le texte traduit correspondant à cet id de service
            const content = t.services.items[service.id];

            return (
              // Chaque carte a un délai croissant (index * STAGGER_DELAY)
              // → c'est exactement le "Staggered Reveal" demandé en Phase 3
              <Reveal key={service.id} delay={index * STAGGER_DELAY}>
                <ServiceCard
                  icon={service.icon}
                  index={index}
                  title={content.title}
                  description={content.description}
                  features={content.features}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}