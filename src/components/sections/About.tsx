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
    <section
      id="apropos"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Soft glow de fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-[400px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* ===== COLONNE PHOTO ===== */}
        <Reveal>
          <div className="relative mx-auto max-w-[340px] sm:max-w-sm">
            {/* Conteneur photo avec effet de groupe */}
            <div className="group relative">
              {/* Ombre / glow derrière la photo */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2.2rem] bg-[var(--accent)]/10 opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100"
              />

              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border transition-all duration-500
                           group-hover:scale-[1.02] group-hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Image
                  src="/images/profile/marcelo3.webp"
                  alt="Marcelo Kalonji Kashala en présentation"
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 1024px) 80vw, 420px"
                  priority
                />

                {/* Overlay gradient subtil en bas */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40"
                />
              </div>
            </div>

            {/* Badges flottants */}
            <StatBadge
              icon={FolderGit2}
              value={5}
              label={t.about.stats.projects}
              className="-right-3 top-6 sm:-right-6 sm:top-8"
            />
            <StatBadge
              icon={Briefcase}
              value={3}
              label={t.about.stats.experience}
              className="-left-3 top-1/2 -translate-y-1/2 sm:-left-6"
            />
            <StatBadge
              icon={Layers}
              value={TECH_STACK.length}
              label={t.about.stats.tech}
              className="-right-3 bottom-6 sm:-right-6 sm:bottom-8"
            />
          </div>
        </Reveal>

        {/* ===== COLONNE TEXTE ===== */}
        <div className="max-w-xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] sm:text-sm">
              {t.about.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              {t.about.title}
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--foreground)]/65 sm:text-base">
              {t.about.paragraph}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {t.about.highlights.map((item) => (
                <li
                  key={item}
                  className="group/item flex items-center gap-2.5 text-sm text-[var(--foreground)]/80 transition-colors duration-300 hover:text-[var(--foreground)]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 transition-all duration-300 group-hover/item:bg-[var(--accent)]/20">
                    <Check
                      size={12}
                      className="text-[var(--accent)]"
                      strokeWidth={2.5}
                    />
                  </span>
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