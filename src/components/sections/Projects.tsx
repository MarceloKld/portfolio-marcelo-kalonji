"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS_META } from "@/data/projects";
import type { ProjectContent } from "@/types";

const STAGGER_DELAY = 130;

export function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="projets"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Soft glow discret */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[420px] w-[500px] rounded-full bg-[var(--accent)] opacity-[0.035] blur-[110px]"
      />

      <div className="mx-auto max-w-7xl">
        {/* === EN-TÊTE === */}
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-px w-6 bg-[var(--accent)]/60" />
              {t.projects.sectionLabel}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              {t.projects.sectionTitle}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--foreground)]/60 sm:text-base">
              {t.projects.sectionSubtitle}
            </p>
          </Reveal>
        </div>

        {/* === GRILLE DES PROJETS === */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:gap-10">
          {PROJECTS_META.map((project, index) => {
            const content = t.projects.items[project.id] as ProjectContent;

            return (
              <Reveal key={project.id} delay={index * STAGGER_DELAY}>
                <ProjectCard project={project} content={content} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}