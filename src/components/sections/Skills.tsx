"use client";

/**
 * Skills.tsx — Section "Compétences"
 * -----------------------------------
 * Affiche 3 cartes de catégories (Front-end, Back-end, Outils) puis,
 * en dessous, un petit bloc "Langues parlées".
 *
 * On réutilise EXACTEMENT le même langage visuel que Services.tsx
 * (carte = bg-[var(--surface)] + bordure fine + icône dans un rond)
 * pour garder une cohérence visuelle entre les sections du site.
 */

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SKILL_CATEGORIES } from "@/data/skills";
import type { SkillCategoryId } from "@/types";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="competences" className="relative px-5 py-24 sm:px-8 lg:px-16">
      {/* En-tête de section, structure identique aux autres sections */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
          {t.skills.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          {t.skills.title}
        </h2>
        <p className="mt-4 text-[var(--foreground)]/60">
          {t.skills.subtitle}
        </p>
      </Reveal>

      {/* Grille des catégories — 1 colonne mobile, 3 colonnes desktop */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category, index) => {
          const Icon = category.icon;
          // On va chercher le texte traduit correspondant à cette catégorie
          const meta = t.skills.categories[category.id as SkillCategoryId];

          return (
            // delay en cascade : chaque carte apparaît 100ms après la précédente
            <Reveal key={category.id} delay={index * 100}>
              <div
                className="h-full rounded-2xl border p-6 transition-colors hover:border-[var(--accent)]/40"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--accent)/10" } as React.CSSProperties}
                >
                  <Icon size={20} className="text-[var(--accent)]" />
                </div>

                <h3 className="mt-5 text-lg font-bold">{meta.title}</h3>
                <p className="mt-1 text-sm text-[var(--foreground)]/60">
                  {meta.description}
                </p>

                {/* Liste des technologies sous forme de badges (pills) */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: "var(--border-color)",
                        color: "var(--foreground)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Bloc Langues parlées — séparé car ce n'est pas une techno */}
      <Reveal delay={300} className="mx-auto mt-10 max-w-6xl">
        <div
          className="flex flex-col items-start gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-color)" }}
        >
          <h3 className="text-base font-bold">{t.skills.languagesTitle}</h3>
          <div className="flex flex-wrap gap-3">
            {t.skills.languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
                style={{ borderColor: "var(--border-color)" }}
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--foreground)]/60">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}