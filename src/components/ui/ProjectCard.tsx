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
 * Carte de projet affichée dans la grille. Gère elle-même l'ouverture
 * de sa propre modale (état local "isOpen") — architecture simple et
 * autonome, pas besoin de faire remonter l'état au composant parent.
 *
 * Réutilise SpotlightCard (créé en Phase 4) pour le halo au survol,
 * et le même effet "grayscale → couleur" que la photo du Hero,
 * pour une cohérence visuelle sur tout le site.
 */
export function ProjectCard({ project, content }: ProjectCardProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // On n'affiche que les 4 premières technologies sur la carte,
  // le reste est résumé par un badge "+N" (la liste complète est dans la modale)
  const visibleTechs = content.modal.techStack.slice(0, 4);
  const extraTechCount = content.modal.techStack.length - visibleTechs.length;

  return (
    <>
      <SpotlightCard className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1">
        {/* Image de couverture */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.cover}
            alt={content.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale brightness-95 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
          />
          {/* Tag superposé sur l'image */}
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {content.tag}
          </span>
        </div>

        {/* Contenu texte */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-lg font-semibold leading-snug text-[var(--foreground)] sm:text-xl">
            {content.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/60">
            {content.shortDescription}
          </p>

          {/* Badges de technologies */}
          <div className="mt-4 flex flex-wrap gap-2">
            {visibleTechs.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border-color)] px-2.5 py-1 text-xs text-[var(--foreground)]/70"
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

          {/* Pied de carte : statut + bouton d'ouverture de la modale */}
          <div className="mt-6 flex items-center justify-between border-t border-[var(--border-color)] pt-5">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--foreground)]/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {content.status}
            </span>

            <button
              onClick={() => setIsOpen(true)}
              className="cursor-pointer flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
            >
              <Maximize2 size={14} />
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