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
 * Contenu complet affiché dans la modale d'un projet :
 * - Colonne gauche : carrousel photo (couverture + galerie), "collé" (sticky)
 *   pendant que la colonne droite défile, pour garder les visuels à l'œil
 * - Colonne droite : audit détaillé (vue d'ensemble, stats, fonctionnalités,
 *   rôles & sécurité si disponible, stack technique, lien démo si disponible)
 *
 * Sur mobile : les 2 colonnes s'empilent naturellement (grid-cols-1).
 */
export function ProjectDetailsModal({ isOpen, onClose, project, content }: ProjectDetailsModalProps) {
  const { t } = useLanguage();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ===== COLONNE GAUCHE : Galerie ===== */}
        <div className="p-5 sm:p-6 md:sticky md:top-0 md:self-start">
          {/* La couverture est incluse en première position de la galerie */}
          <ImageCarousel images={[project.cover, ...project.gallery]} alt={content.title} />
        </div>

        {/* ===== COLONNE DROITE : Audit détaillé ===== */}
        <div className="flex flex-col gap-6 p-5 pt-0 sm:p-6 md:pt-6">
          {/* En-tête : tags + titre */}
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
            <h2 className="mt-3 text-xl font-bold leading-snug text-[var(--foreground)] sm:text-2xl">
              {content.title}
            </h2>
          </div>

          {/* Vue d'ensemble */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              {t.projects.modalOverviewTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/70">
              {content.modal.overview}
            </p>
          </div>

          {/* Statistiques chiffrées (optionnel — pas tous les projets en ont) */}
          {content.modal.stats && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {content.modal.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border-color)] p-3 text-center"
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              {t.projects.modalFeaturesTitle}
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {content.modal.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[var(--border-color)] p-4"
                >
                  <p className="flex items-start gap-2 text-sm font-semibold text-[var(--foreground)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {feature.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--foreground)]/60">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rôles & sécurité (optionnel — uniquement KIN ALERT et KIM.IA) */}
          {content.modal.roles && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {t.projects.modalRolesTitle}
              </h3>

              {/* Version TABLEAU : visible uniquement à partir de "md" (tablette+) */}
              <div className="mt-3 hidden overflow-x-auto rounded-2xl border border-[var(--border-color)] md:block">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--surface)] text-[var(--foreground)]/60">
                    <tr>
                      <th className="px-4 py-3 font-medium">{t.projects.modalRoleColumns.role}</th>
                      <th className="px-4 py-3 font-medium">{t.projects.modalRoleColumns.scope}</th>
                      <th className="px-4 py-3 font-medium">{t.projects.modalRoleColumns.auth}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.modal.roles.map((r) => (
                      <tr key={r.role} className="border-t border-[var(--border-color)]">
                        <td className="px-4 py-3 font-medium text-[var(--foreground)]">{r.role}</td>
                        <td className="px-4 py-3 text-[var(--foreground)]/70">{r.scope}</td>
                        <td className="px-4 py-3 text-[var(--foreground)]/50">{r.auth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Version CARTES EMPILÉES : visible uniquement sur mobile
                  (un tableau large serait illisible sur petit écran, même
                  avec un scroll horizontal) */}
              <div className="mt-3 flex flex-col gap-3 md:hidden">
                {content.modal.roles.map((r) => (
                  <div key={r.role} className="rounded-2xl border border-[var(--border-color)] p-4">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{r.role}</p>
                    <p className="mt-1 text-xs text-[var(--foreground)]/60">{r.scope}</p>
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              {t.projects.modalTechTitle}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.modal.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Lien démo externe (optionnel — uniquement Jolka) */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:scale-[1.02]"
            >
              {t.projects.viewDemo}
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}