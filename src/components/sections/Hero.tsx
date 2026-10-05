"use client";

import Image from "next/image";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Button } from "@/components/ui/Button";
import { EntranceReveal } from "@/components/ui/EntranceReveal"; // remplace Reveal pour le Hero
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialPill } from "@/components/ui/SocialPill";
import { SOCIAL_LINKS } from "@/data/socials";
import { useFitText } from "@/lib/useFitText";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES — Nom & Photo
   ════════════════════════════════════════════════════════════════ */

// Taille MINIMALE du nom (en pixels) — jamais plus petit que ça,
// même sur le plus petit écran mobile.
const NAME_MIN_FONT = 30;

// Taille MAXIMALE du nom (en pixels) — jamais plus grand que ça,
// même sur un très grand écran. Le hook choisira automatiquement
// une valeur entre les deux pour remplir parfaitement la largeur.
const NAME_MAX_FONT = 180;

// Position du nom depuis le haut du bloc (niveau de la tête)
const NAME_TOP = "top-0";

// Hauteur / largeur de la photo (inchangé, toujours ajustable ici)
const PHOTO_HEIGHT = "h-[95%] sm:h-[96%]";
const PHOTO_WIDTH =
  "w-[56%] sm:w-[42%] md:w-[36%] max-w-[280px] sm:max-w-[320px] md:max-w-[360px]";
const BLOCK_MIN_HEIGHT = "min-h-[260px] sm:min-h-[340px]";

/* ════════════════════════════════════════════════════════════════ */

export function Hero() {
  const { t } = useLanguage();

  // Le hook retourne 2 références à poser dans le JSX, et la taille calculée
  const { containerRef, textRef, fontSize } = useFitText({
    minFontSize: NAME_MIN_FONT,
    maxFontSize: NAME_MAX_FONT,
  });

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

        {/* === LIGNE 2 — Nom (auto-adaptatif) + Photo === */}
        <EntranceReveal delay={150} className={`relative flex-1 ${BLOCK_MIN_HEIGHT}`}>
          {/* 
            containerRef posé ICI : c'est la largeur de CE conteneur
            que le hook utilise comme référence pour calculer la taille
            du texte. "group" active l'effet hover sur la photo.
          */}
          <div ref={containerRef} className="group relative mx-auto h-full w-full">
            {/* 
              NOM — fontSize vient maintenant du hook useFitText (calculé
              en JavaScript), plus d'une estimation en vw. Garantit un
              texte toujours parfaitement ajusté, sans jamais déborder.
            */}
            <h1
              ref={textRef}
              className={`pointer-events-none absolute inset-x-0 ${NAME_TOP} select-none whitespace-nowrap text-center font-extrabold uppercase leading-none tracking-tighter`}
              style={{ fontSize: `${fontSize}px` }}
            >
              <span className="text-transparent [-webkit-text-stroke:1.3px_var(--foreground)]">
                Marcelo&nbsp;
              </span>
              <span className="text-[var(--foreground)]">Kalonji</span>
            </h1>

            {/* 
              Halo flouté — s'intensifie légèrement au survol
              (opacity 10% → 20%) pour accompagner l'animation de la photo
            */}
            <div className="absolute bottom-0 left-1/2 z-[1] h-[60%] w-[50%] max-w-[300px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl transition-all duration-700 group-hover:bg-[var(--accent)]/20" />

            {/* 
              PHOTO — ajout de l'animation au survol :
              - grayscale → couleur (déjà en place)
              - scale-105 : léger zoom avant
              - drop-shadow plus marqué : effet de "décollement"
              cursor-pointer : indique que la zone est interactive
            */}
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