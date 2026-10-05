"use client";

import Image from "next/image";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Button } from "@/components/ui/Button";
import { EntranceReveal } from "@/components/ui/EntranceReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialPill } from "@/components/ui/SocialPill";
import { SOCIAL_LINKS } from "@/data/socials";
import { Marquee } from "@/components/ui/Marquee";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES — Marquee du nom & Photo
   ════════════════════════════════════════════════════════════════ */

// Vitesse du défilement : plus petit = plus rapide (en secondes pour 1 boucle)
const MARQUEE_SPEED = 200;

// Nombre de répétitions du nom par groupe. Augmente si tu vois un "trou"
// vide dans la bande sur très grand écran (ultra-wide / 4K).
const MARQUEE_REPEAT = 5;

// Taille du texte du nom dans le marquee
const NAME_FONT_SIZE = "clamp(19rem, 8vw, 6.5rem)";

// Position verticale et hauteur de la bande de marquee dans le bloc
const NAME_BAND_TOP = "top-0";
const NAME_BAND_HEIGHT = "h-[34%] sm:h-[38%]";

// Taille / position de la photo (inchangé)
const PHOTO_HEIGHT = "h-[95%] sm:h-[96%]";
const PHOTO_WIDTH =
  "w-[56%] sm:w-[42%] md:w-[36%] max-w-[280px] sm:max-w-[320px] md:max-w-[360px]";
const BLOCK_MIN_HEIGHT = "min-h-[260px] sm:min-h-[340px]";

/* ════════════════════════════════════════════════════════════════ */

export function Hero() {
  const { t } = useLanguage();

  // Le contenu répété dans le marquee : "Marcelo" (contour) + "Kalonji"
  // (plein) + un point vert comme séparateur visuel entre chaque répétition
  const nameItem = (
    <span className="flex items-center gap-5 px-5 sm:gap-8 sm:px-8">
      <span
        className="font-extrabold uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.3px_var(--foreground)]"
        style={{ fontSize: NAME_FONT_SIZE }}
      >
        Marcelo
      </span>
      <span
        className="font-extrabold uppercase leading-none tracking-tighter text-[var(--foreground)]"
        style={{ fontSize: NAME_FONT_SIZE }}
      >
        Kalonji
      </span>
      {/* Petit point vert : séparateur esthétique, cohérent avec la charte
          "le vert uniquement en petit détail" */}
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
      />
    </span>
  );

  return (
    <section
      id="accueil"
      className="relative flex h-[100dvh] min-h-[640px] flex-col overflow-hidden px-4 pb-6 pt-24 sm:px-6 sm:pt-28 lg:px-10"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        {/* === LIGNE 1 — Badge === */}
        <EntranceReveal delay={0} className="flex justify-start">
          <Badge>{t.hero.badge}</Badge>
        </EntranceReveal>

        {/* === LIGNE 2 — Marquee du nom + Photo en overlap === */}
        <EntranceReveal delay={150} className={`relative flex-1 ${BLOCK_MIN_HEIGHT}`}>
          <div className="group relative mx-auto h-full w-full">
            {/* 
              Vrai titre SEO, invisible à l'écran (sr-only) mais lu par
              Google et les lecteurs d'écran. Indispensable maintenant que
              le marquee affiche un texte répété/décoratif plutôt qu'un
              <h1> classique.
            */}
            <h1 className="sr-only">
              Marcelo Kalonji Kashala — Concepteur &amp; Développeur Web
            </h1>

            {/* === BANDE DE MARQUEE === */}
            <div
              className={`absolute inset-x-0 z-0 flex items-center ${NAME_BAND_TOP} ${NAME_BAND_HEIGHT}`}
            >
              <Marquee speed={MARQUEE_SPEED} repeat={MARQUEE_REPEAT}>
                {nameItem}
              </Marquee>
            </div>

            {/* Halo flouté derrière la photo */}
            <div className="absolute bottom-0 left-1/2 z-[1] h-[60%] w-[50%] max-w-[300px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl transition-all duration-700 group-hover:bg-[var(--accent)]/20" />

            {/* === PHOTO === */}
            <div
              className={`absolute inset-x-0 bottom-0 z-10 mx-auto cursor-pointer ${PHOTO_HEIGHT} ${PHOTO_WIDTH} [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]`}
            >
              <Image
                src="/images/profile/marcelo.webp"
                alt="Portrait de Marcelo Kalonji Kashala, Concepteur et Développeur Web"
                fill
                priority
                sizes="(max-width: 640px) 56vw, (max-width: 768px) 42vw, 360px"
                className="object-contain object-bottom grayscale brightness-95 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 group-hover:drop-shadow-2xl"
              />
            </div>
          </div>
        </EntranceReveal>

        {/* === LIGNE 3 — Titre + accroche + CTA / Réseaux === */}
        <EntranceReveal
          delay={300}
          className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] sm:text-sm">
              {t.hero.title}
            </p>

            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/70 sm:text-base">
              {t.hero.accrocheBefore}{" "}
              <span className="font-semibold text-[var(--foreground)]">
                <TypewriterText words={t.hero.rotatingWords} />
              </span>{" "}
              {t.hero.accrocheAfter}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <Button href="#contact" variant="primary">
                  {t.hero.ctaPrimary}
                  <ArrowRight size={15} />
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button href="#projets" variant="secondary">
                  <FolderGit2 size={15} />
                  {t.hero.ctaSecondary}
                </Button>
              </Magnetic>
            </div>

            <div className="mt-4 flex items-center gap-2 sm:hidden">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--foreground)]/70"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden flex-col gap-2.5 sm:flex">
            {SOCIAL_LINKS.map((social) => (
              <SocialPill key={social.label} {...social} />
            ))}
          </div>
        </EntranceReveal>
      </div>
    </section>
  );
}