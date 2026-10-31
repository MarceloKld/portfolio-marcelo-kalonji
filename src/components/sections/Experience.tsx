"use client";


import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { EXPERIENCE_META } from "@/data/experience";
import { ExperienceGallery } from "@/components/ui/ExperienceGallery";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES
   ════════════════════════════════════════════════════════════════ */

const STAGGER_DELAY = 140;



/* ════════════════════════════════════════════════════════════════ */

export function Experience() {
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-10"
    >
      {/* Glow de fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px]"
      />

      <div className="mx-auto max-w-4xl">
        {/* === EN-TÊTE === */}
        <div className="mb-16 sm:mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              <span className="h-px w-8 bg-[var(--accent)]/70" />
              {t.experience.sectionLabel}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]">
              {t.experience.sectionTitle}
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--foreground)]/55 sm:text-base">
              {t.experience.sectionSubtitle}
            </p>
          </Reveal>
        </div>

        {/* === TIMELINE === */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-5 top-6 w-[2px] bg-gradient-to-b from-transparent via-[var(--accent)]/50 to-transparent sm:left-6"
          />

          <div className="flex flex-col gap-10 sm:gap-12">
            {EXPERIENCE_META.map((exp, index) => {
              const content = t.experience.items[exp.id];

              return (
                <Reveal key={exp.id} delay={index * STAGGER_DELAY}>
                  <div className="group relative">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-4 rounded-2xl bg-[var(--accent)]/0 opacity-0 blur-xl transition-all duration-500 group-hover:bg-[var(--accent)]/5 group-hover:opacity-100"
                    />
                    <div className="relative transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01]">
                      <TimelineItem
                        icon={exp.icon}
                        role={content.role}
                        company={content.company}
                        period={content.period}
                        missions={content.missions}
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

       {/* === ALBUM PHOTO (Cover Flow) === */}
<div className="mt-20 sm:mt-24">
  <Reveal>
    <h3 className="text-center text-lg font-semibold text-[var(--foreground)] sm:text-xl">
      {t.experience.galleryTitle}
    </h3>
    <p className="mt-2 text-center text-sm text-[var(--foreground)]/55">
      {t.experience.gallerySubtitle}
    </p>
  </Reveal>

  <div className="mt-10">
    <Reveal delay={100}>
      <ExperienceGallery />
    </Reveal>
  </div>
</div>
      </div>
    </section>
  );
}