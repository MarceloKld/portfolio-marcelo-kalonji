"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { SkillBar } from "@/components/ui/SkillBar";
import { DEV_SKILLS, TECH_STACK } from "@/data/skills";

export function Skills() {
  const { t } = useLanguage();

  const half = Math.ceil(TECH_STACK.length / 2);
  const firstRow = TECH_STACK.slice(0, half);
  const secondRow = TECH_STACK.slice(half);

  return (
    <section
      id="competences"
      className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      {/* ===== EN-TÊTE ===== */}
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.skills.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
            {t.skills.title}
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--foreground)]/60 sm:text-base">
            {t.skills.subtitle}
          </p>
        </Reveal>
      </div>

      {/* ===== CONTENU ===== */}
      <div className="mx-auto mt-12 max-w-6xl space-y-14 sm:mt-14 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-16 lg:space-y-0">
        
        {/* ----- Barres de progression ----- */}
        <div>
          <Reveal>
            <h3 className="mb-5 text-base font-bold sm:text-lg">
              {t.skills.devTitle}
            </h3>
          </Reveal>

          <div className="space-y-5">
            {DEV_SKILLS.map((skill, index) => (
              <Reveal key={skill.name} delay={index * 60}>
                <SkillBar
                  name={skill.name}
                  percentage={skill.percentage}
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ----- Tech Stack ----- */}
        <div>
          <Reveal delay={100}>
            <h3 className="mb-5 text-base font-bold sm:text-lg">
              {t.skills.techTitle}
            </h3>
          </Reveal>

          <div className="space-y-4">
            {/* Ligne 1 */}
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--background)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--background)] to-transparent" />
              
              <Marquee speed={100} repeat={8}>
                {firstRow.map((tech) => (
                  <TechBadge key={tech.name} tech={tech} />
                ))}
              </Marquee>
            </div>

            {/* Ligne 2 */}
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--background)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--background)] to-transparent" />
              
              <Marquee speed={90} reverse repeat={8}>
                {secondRow.map((tech) => (
                  <TechBadge key={tech.name} tech={tech} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechBadge({ tech }: { tech: (typeof TECH_STACK)[number] }) {
  const Icon = tech.icon;

  return (
    <div
      className="mx-1.5 flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--surface)",
      }}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
      <span className="whitespace-nowrap">{tech.name}</span>
    </div>
  );
}