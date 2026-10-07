"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS_META } from "@/data/projects";
import type { ProjectContent } from "@/types";

const STAGGER_DELAY = 120;

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projets" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* === EN-TÊTE DE SECTION === */}
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.projects.sectionLabel}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
            {t.projects.sectionTitle}
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-xl text-sm text-[var(--foreground)]/60 sm:text-base">
            {t.projects.sectionSubtitle}
          </p>
        </Reveal>

        {/* 
          Grille à 2 colonnes (desktop) plutôt que 3 : les cartes de projets
          contiennent une image + beaucoup de texte, 2 colonnes larges
          restent plus lisibles que 3 colonnes trop resserrées.
        */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROJECTS_META.map((project, index) => {
            // "as ProjectContent" : chaque projet a une forme de contenu
            // légèrement différente (stats/roles optionnels selon le projet),
            // ce cast indique simplement à TypeScript de faire confiance
            // à la structure définie dans nos fichiers de traduction.
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