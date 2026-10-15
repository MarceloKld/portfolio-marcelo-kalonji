"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES_META } from "@/data/services";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES
   ════════════════════════════════════════════════════════════════ */

const STAGGER_DELAY = 130; // légèrement plus rapide pour un feeling plus fluide

/* ════════════════════════════════════════════════════════════════ */

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Soft glow discret */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.035] blur-[110px]"
      />

      <div className="mx-auto max-w-7xl">
        {/* === EN-TÊTE DE SECTION === */}
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-px w-6 bg-[var(--accent)]/60" />
              {t.nav.services}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              {t.services.sectionTitle}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--foreground)]/60 sm:text-base">
              {t.services.sectionSubtitle}{" "}
              <span className="text-[var(--foreground)]/40">
                {t.services.sectionDescription}
              </span>
            </p>
          </Reveal>
        </div>

        {/* === GRILLE DES CARTES === */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {SERVICES_META.map((service, index) => {
            const content = t.services.items[service.id];

            return (
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