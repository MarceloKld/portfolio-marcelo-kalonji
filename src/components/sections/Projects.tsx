"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS_META } from "@/data/projects";
import type { ProjectContent } from "@/types";

const STAGGER_DELAY = 130;
const INITIAL_VISIBLE = 6;

export function Projects() {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const projectsT = t.projects as typeof t.projects & {
    showMoreProjects: string;
    showLessProjects: string;
    projectsCount: string;
  };

  const total = PROJECTS_META.length;
  const visibleProjects = PROJECTS_META.slice(0, visibleCount);
  const hasMore = visibleCount < total;

  const countLabel = (projectsT.projectsCount ?? "{shown} / {total}")
    .replace("{shown}", String(Math.min(visibleCount, total)))
    .replace("{total}", String(total));

  return (
    <section
      id="projets"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[420px] w-[500px] rounded-full bg-[var(--accent)] opacity-[0.035] blur-[110px]"
      />

      <div className="mx-auto max-w-7xl">
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

        {/* DEBUG — à supprimer ensuite */}
      
        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:gap-10">
          {visibleProjects.map((project, index) => {
            const content = t.projects.items[project.id] as ProjectContent;
            return (
              <Reveal key={project.id} delay={index * STAGGER_DELAY}>
                <ProjectCard project={project} content={content} />
              </Reveal>
            );
          })}
        </div>

        {total > INITIAL_VISIBLE && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-sm text-[var(--foreground)]/50">{countLabel}</p>

            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisibleCount(total)}
                className="cursor-pointer rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-6 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                {projectsT.showMoreProjects ?? "Voir plus"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setVisibleCount(INITIAL_VISIBLE)}
                className="cursor-pointer rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-6 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              >
                {projectsT.showLessProjects ?? "Voir moins"}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}