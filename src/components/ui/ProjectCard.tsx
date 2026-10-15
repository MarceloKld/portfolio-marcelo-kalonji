"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ProjectDetailsModal } from "@/components/ui/ProjectDetailsModal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { ProjectMeta, ProjectContent } from "@/types";

type ProjectCardProps = {
  project: ProjectMeta;
  content: ProjectContent;
};

/**
 * Carte de projet affichée dans la grille.
 * Gère elle-même l'ouverture de sa propre modale.
 */
export function ProjectCard({ project, content }: ProjectCardProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const visibleTechs = content.modal.techStack.slice(0, 4);
  const extraTechCount = content.modal.techStack.length - visibleTechs.length;

  return (
    <>
      <SpotlightCard
        className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500
                   hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]"
      >
        {/* ===== Image de couverture ===== */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.cover}
            alt={content.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale brightness-95 transition-all duration-700 ease-out
                       group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
          />

          {/* Overlay gradient au hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Tag */}
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
            {content.tag}
          </span>
        </div>

        {/* ===== Contenu texte ===== */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-lg font-semibold leading-snug text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--foreground)] sm:text-xl">
            {content.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/60 transition-colors duration-300 group-hover:text-[var(--foreground)]/75">
            {content.shortDescription}
          </p>

          {/* Badges technologies */}
          <div className="mt-4 flex flex-wrap gap-2">
            {visibleTechs.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border-color)] px-2.5 py-1 text-xs text-[var(--foreground)]/70 transition-all duration-300
                           group-hover:border-[var(--accent)]/30 group-hover:text-[var(--foreground)]/85"
              >
                {tech}
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="rounded-full border border-[var(--border-color)] px-2.5 py-1 text-xs text-[var(--foreground)]/50">
                +{extraTechCount}
              </span>
            )}
          </div>

          {/* Pied de carte */}
          <div className="mt-6 flex items-center justify-between border-t border-[var(--border-color)] pt-5 transition-colors duration-300 group-hover:border-[var(--accent)]/20">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--foreground)]/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {content.status}
            </span>

            <button
              onClick={() => setIsOpen(true)}
              className="group/btn flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[var(--foreground)] transition-all duration-300 hover:text-[var(--accent)]"
            >
              <Maximize2
                size={14}
                className="transition-transform duration-300 group-hover/btn:scale-110"
              />
              {t.projects.viewMore}
            </button>
          </div>
        </div>
      </SpotlightCard>

      <ProjectDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        project={project}
        content={content}
      />
    </>
  );
}