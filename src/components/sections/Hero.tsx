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
import { TechOrbit } from "@/components/ui/TechOrbit";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES — Marquee du nom & Photo
   ════════════════════════════════════════════════════════════════ */

const MARQUEE_SPEED = 180;          // un peu plus rapide = plus dynamique
const MARQUEE_REPEAT = 6;
const NAME_FONT_SIZE = "clamp(4.5rem, 12vw, 7.5rem)"; // mieux calibré
const NAME_BAND_TOP = "top-0";
const NAME_BAND_HEIGHT = "h-[32%] sm:h-[36%]";
const PHOTO_HEIGHT = "h-[94%] sm:h-[96%]";
const PHOTO_WIDTH =
  "w-[58%] sm:w-[44%] md:w-[38%] max-w-[300px] sm:max-w-[340px] md:max-w-[380px]";
const BLOCK_MIN_HEIGHT = "min-h-[280px] sm:min-h-[360px]";
const TITLE_FONT_SIZE = "text-sm sm:text-base md:text-lg";

/* ════════════════════════════════════════════════════════════════ */

export function Hero() {
  const { t, locale } = useLanguage();

  const nameItem = (
    <span className="flex items-center gap-4 px-4 sm:gap-7 sm:px-7">
      <span
        className="font-extrabold uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.4px_var(--foreground)]"
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
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]"
      />
    </span>
  );

  return (
    <section
      id="accueil"
      className="relative flex h-[100dvh] min-h-[680px] flex-col overflow-hidden px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:px-10"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[120px]"
      />

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        {/* === Badge === */}
        <EntranceReveal delay={0} className="flex justify-start">
          <Badge>{t.hero.badge}</Badge>
        </EntranceReveal>

        {/* === Marquee + Photo === */}
        <EntranceReveal
          delay={120}
          className={`relative flex-1 ${BLOCK_MIN_HEIGHT}`}
        >
          <div className="group relative mx-auto h-full w-full">
            <h1 className="sr-only">
              Marcelo Kalonji Kashala — Concepteur &amp; Développeur Web
            </h1>

            {/* Bande de marquee */}
            <div
              className={`absolute inset-x-0 z-0 flex items-center ${NAME_BAND_TOP} ${NAME_BAND_HEIGHT}`}
            >
              <Marquee speed={MARQUEE_SPEED} repeat={MARQUEE_REPEAT} fullBleed>
                {nameItem}
              </Marquee>
            </div>

            {/* Halo derrière la photo */}
            <div className="absolute bottom-0 left-1/2 z-[1] h-[55%] w-[48%] max-w-[320px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl transition-all duration-700 group-hover:bg-[var(--accent)]/25 group-hover:scale-110" />

            {/* Photo */}
            <div
              className={`absolute inset-x-0 bottom-0 z-10 mx-auto cursor-pointer ${PHOTO_HEIGHT} ${PHOTO_WIDTH} [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]`}
            >
              <Image
                src="/images/profile/marcelo.webp"
                alt="Portrait de Marcelo Kalonji Kashala, Concepteur et Développeur Web"
                fill
                priority
                sizes="(max-width: 640px) 58vw, (max-width: 768px) 44vw, 380px"
                className="object-contain object-bottom grayscale brightness-95 transition-all duration-700 ease-out
                           group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 group-hover:drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)]"
              />
            </div>
            {/* ===== AJOUT ICI ===== */}
    <TechOrbit />
          </div>
        </EntranceReveal>

        {/* === Titre + CTA + Réseaux === */}
        <EntranceReveal
          delay={280}
          className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <p
              className={`${TITLE_FONT_SIZE} font-semibold uppercase tracking-[0.18em] text-[var(--accent)]`}
            >
              {t.hero.title}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/70 sm:text-base">
              {t.hero.accrocheBefore}{" "}
              <span className="font-semibold text-[var(--foreground)]">
                <TypewriterText key={locale} words={t.hero.rotatingWords} />
              </span>{" "}
              {t.hero.accrocheAfter}
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.22}>
                <Button href="#contact" variant="primary">
                  {t.hero.ctaPrimary}
                  <ArrowRight size={15} />
                </Button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <Button href="#projets" variant="secondary">
                  <FolderGit2 size={15} />
                  {t.hero.ctaSecondary}
                </Button>
              </Magnetic>
            </div>

            {/* Réseaux mobile */}
            <div className="mt-5 flex items-center gap-2.5 sm:hidden">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--foreground)]/70 transition-all duration-300 hover:scale-110 hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Réseaux desktop */}
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