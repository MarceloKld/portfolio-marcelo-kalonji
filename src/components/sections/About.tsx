"use client";

/**
 * About.tsx — Section "À propos"
 * --------------------------------
 * Photo avec 3 badges flottants positionnés en absolute (projets livrés,
 * années d'expérience, technologies), chacun avec un compteur animé.
 */
import Image from "next/image";
import { Check, FolderGit2, Briefcase, Layers } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { StatBadge } from "@/components/ui/StatBadge";
import { TECH_STACK } from "@/data/skills";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="apropos" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

        {/* Colonne photo + badges flottants */}
        <Reveal>
          {/* mx-6 sur mobile : réserve de l'espace pour que les badges
              en négatif (-right-4, -left-4) ne provoquent jamais
              de débordement horizontal (overflow-x) */}
          <div className="relative mx-6 max-w-sm sm:mx-auto">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border"
              style={{ borderColor: "var(--border-color)" }}
            >
              {/*
                ============================================
                📸 POUR CHANGER CETTE PHOTO :
                Remplace uniquement la valeur de "src" ci-dessous.
                1. Dépose ta nouvelle image dans : public/images/profile/
                2. Mets son nom ici, ex : "/images/profile/marcelo-about.webp"
                ============================================
              */}
              <Image
                src="/images/profile/marcelo3.webp"
                alt="Marcelo Kalonji Kashala en présentation"
                fill
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                sizes="(max-width: 1024px) 80vw, 420px"
              />
            </div>

            <StatBadge
              icon={FolderGit2}
              value={5}
              label={t.about.stats.projects}
              className="-right-4 top-8 sm:-right-8"
            />
            <StatBadge
              icon={Briefcase}
              value={3}
              label={t.about.stats.experience}
              className="-left-4 top-1/2 -translate-y-1/2 sm:-left-8"
            />
            <StatBadge
              icon={Layers}
              value={TECH_STACK.length}
              label={t.about.stats.tech}
              className="-right-4 bottom-8 sm:-right-8"
            />
          </div>
        </Reveal>

        {/* Colonne texte */}
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t.about.title}</h2>
            <p className="mt-5 leading-relaxed text-[var(--foreground)]/70">
              {t.about.paragraph}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.about.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="shrink-0 text-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}