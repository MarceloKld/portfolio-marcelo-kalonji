"use client";

import { ExternalLink, Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { ProjectMeta, ProjectContent } from "@/types";

type ProjectDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectMeta;
  content: ProjectContent;
};

/**
 * Contenu complet affiché dans la modale d'un projet.
 */
export function ProjectDetailsModal({
  isOpen,
  onClose,
  project,
  content,
}: ProjectDetailsModalProps) {
  const { t } = useLanguage();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ===== COLONNE GAUCHE : Galerie ===== */}
        <div className="p-5 sm:p-6 md:sticky md:top-0 md:self-start">
          <ImageCarousel
            images={[project.cover, ...project.gallery]}
            alt={content.title}
          />
        </div>

        {/* ===== COLONNE DROITE : Contenu ===== */}
        <div className="flex flex-col gap-7 p-5 pt-0 sm:p-6 md:pt-6">
          {/* En-tête */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--border-color)] px-3 py-1 text-xs font-medium text-[var(--foreground)]/70">
                {content.tag}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--border-color)] px-3 py-1 text-xs font-medium text-[var(--foreground)]/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {content.status}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-[var(--foreground)] sm:text-2xl">
              {content.title}
            </h2>
          </div>

          {/* Vue d'ensemble */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
              {t.projects.modalOverviewTitle}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--foreground)]/70">
              {content.modal.overview}
            </p>
          </div>

          {/* Statistiques */}
          {content.modal.stats && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {content.modal.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 p-3.5 text-center transition-colors duration-300 hover:border-[var(--accent)]/30"
                >
                  <p className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase leading-tight tracking-wide text-[var(--foreground)]/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Fonctionnalités clés */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
              {t.projects.modalFeaturesTitle}
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {content.modal.features.map((feature) => (
                <div
                  key={feature.title}
                  className="group/feature rounded-2xl border border-[var(--border-color)] p-4 transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/[0.03]"
                >
                  <p className="flex items-start gap-2 text-sm font-semibold text-[var(--foreground)]">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover/feature:scale-110"
                      strokeWidth={2.5}
                    />
                    {feature.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--foreground)]/60">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rôles & sécurité */}
          {content.modal.roles && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
                {t.projects.modalRolesTitle}
              </h3>

              {/* Tableau desktop */}
              <div className="mt-3 hidden overflow-hidden rounded-2xl border border-[var(--border-color)] md:block">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--surface)] text-[var(--foreground)]/60">
                    <tr>
                      <th className="px-4 py-3 font-medium">
                        {t.projects.modalRoleColumns.role}
                      </th>
                      <th className="px-4 py-3 font-medium">
                        {t.projects.modalRoleColumns.scope}
                      </th>
                      <th className="px-4 py-3 font-medium">
                        {t.projects.modalRoleColumns.auth}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.modal.roles.map((r) => (
                      <tr
                        key={r.role}
                        className="border-t border-[var(--border-color)] transition-colors duration-200 hover:bg-[var(--accent)]/[0.03]"
                      >
                        <td className="px-4 py-3 font-medium text-[var(--foreground)]">
                          {r.role}
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground)]/70">
                          {r.scope}
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground)]/50">
                          {r.auth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cartes mobile */}
              <div className="mt-3 flex flex-col gap-3 md:hidden">
                {content.modal.roles.map((r) => (
                  <div
                    key={r.role}
                    className="rounded-2xl border border-[var(--border-color)] p-4"
                  >
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {r.role}
                    </p>
                    <p className="mt-1 text-xs text-[var(--foreground)]/60">
                      {r.scope}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-wide text-[var(--foreground)]/40">
                      {r.auth}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stack technique */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
              {t.projects.modalTechTitle}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.modal.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]/80 transition-colors duration-300 hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Liens externes */}
          {project.links && project.links.length > 0 && (
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              {project.links.map((link, i) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                    i === 0
                      ? "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black"
                      : "border border-[var(--border-color)] text-[var(--foreground)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  {t.projects[link.labelKey]}
                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}