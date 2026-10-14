"use client";

/**
 * Skills.tsx — Section "Compétences"
 * -----------------------------------
 * Layout 2 colonnes desktop (1 colonne mobile) :
 *  - gauche : barres de progression animées ("Développement")
 *  - droite : ticker défilant de technologies sur 2 lignes,
 *             chacune défilant dans un sens opposé ("Technologies")
 */
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { SkillBar } from "@/components/ui/SkillBar";
import { DEV_SKILLS, TECH_STACK } from "@/data/skills";

export function Skills() {
  const { t } = useLanguage();

  // On coupe le tableau en 2 pour avoir 2 lignes de ticker différentes
  const half = Math.ceil(TECH_STACK.length / 2);
  const firstRow = TECH_STACK.slice(0, half);
  const secondRow = TECH_STACK.slice(half);

  return (
    <section id="competences" className="relative px-5 py-24 sm:px-8 lg:px-16">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
          {t.skills.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t.skills.title}</h2>
        <p className="mt-4 text-[var(--foreground)]/60">{t.skills.subtitle}</p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-6xl gap-14 lg:grid-cols-2">
        {/* Colonne gauche : barres de progression */}
        <Reveal>
          <h3 className="mb-6 text-lg font-bold">{t.skills.devTitle}</h3>
          <div className="space-y-6">
            {DEV_SKILLS.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
            ))}
          </div>
        </Reveal>

        {/* Colonne droite : Tech Stack Ticker */}
        <Reveal delay={150}>
          <h3 className="mb-6 text-lg font-bold">{t.skills.techTitle}</h3>
          <div className="space-y-4 overflow-hidden">
            <Marquee speed={100}>
              {firstRow.map((tech) => (
                <TechBadge key={tech.name} tech={tech} />
              ))}
            </Marquee>
            <Marquee speed={90} reverse>
              {secondRow.map((tech) => (
                <TechBadge key={tech.name} tech={tech} />
              ))}
            </Marquee>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Petite pilule icône + nom, réutilisée dans les 2 lignes du ticker */
function TechBadge({ tech }: { tech: (typeof TECH_STACK)[number] }) {
  const Icon = tech.icon;
  return (
    <div
      className="mx-2 flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
      style={{ borderColor: "var(--border-color)", backgroundColor: "var(--surface)" }}
    >
      <Icon className="h-4 w-4 text-[var(--accent)]" />
      {tech.name}
    </div>
  );
}