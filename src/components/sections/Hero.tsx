"use client";

import Image from "next/image";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialPill } from "@/components/ui/SocialPill";
import { SOCIAL_LINKS } from "@/data/socials";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="accueil"
      // h-[100dvh] : hauteur = 100% de la hauteur visible réelle du navigateur
      // (dvh = "dynamic viewport height", gère correctement la barre d'adresse
      // qui apparaît/disparaît sur mobile, contrairement à 100vh classique)
      // min-h-[640px] : garde-fou pour ne jamais devenir trop compressé
      className="relative flex h-[100dvh] min-h-[640px] flex-col overflow-hidden px-4 pb-6 pt-24 sm:px-6 sm:pt-28 lg:px-10"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        {/* ============================================
            LIGNE 1 — Badge de disponibilité (aligné à GAUCHE, pas centré)
            ============================================ */}
        <Reveal delay={0} className="flex justify-start">
          <Badge>{t.hero.badge}</Badge>
        </Reveal>

        {/* ============================================
            LIGNE 2 — Nom (une seule ligne) + Photo en overlap
            flex-1 : occupe tout l'espace vertical restant
            min-h-0 : autorise cette zone à rétrécir si l'écran est petit
            ============================================ */}
        <Reveal delay={150} className="relative min-h-0 flex-1">
          {/* "group" permet au group-hover de l'image ci-dessous de réagir
    au survol de TOUT ce bloc (nom + photo), pas seulement de l'image */}
          <div className="group relative mx-auto flex h-full w-full items-center justify-center">
            {/* 
              NOM SUR UNE SEULE LIGNE.
              clamp(min, préféré, max) : la taille du texte s'adapte à la largeur
              de l'écran (vw) tout en restant toujours lisible, sans jamais
              dépasser les bords (ce qui évite tout scroll horizontal).
            */}
            <h1
              className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center whitespace-nowrap text-center font-extrabold uppercase leading-none tracking-tighter"
              style={{ fontSize: "clamp(1.9rem, 9.5vw, 6.5rem)" }}
            >
              {/* "Marcelo" : contour uniquement */}
              <span className="text-transparent [-webkit-text-stroke:1.3px_var(--foreground)]">
                Marcelo&nbsp;
              </span>
              {/* "Kalonji" : texte plein, s'inverse automatiquement avec le thème */}
              <span className="text-[var(--foreground)]">Kalonji</span>
            </h1>

            {/* Halo flouté derrière la photo, pour la profondeur */}
            <div className="absolute bottom-0 left-1/2 z-[1] h-[70%] w-[55%] max-w-[320px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            {/* 
              PHOTO agrandie, centrée sur la jonction des deux mots,
              avec un dégradé en bas (mask-image) pour éviter l'effet "coupé".
              La largeur est responsive : plus petite sur mobile, plus grande sur desktop.
            */}
            <div className="absolute bottom-0 z-10 h-[92%] w-[58%] max-w-[300px] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] sm:w-[46%] sm:max-w-[340px] md:w-[40%] md:max-w-[380px]">
              <Image
  src="/images/profile/marcelo.png"
  alt="Portrait de Marcelo Kalonji Kashala, Concepteur et Développeur Web"
  fill
  priority
  sizes="(max-width: 640px) 58vw, (max-width: 768px) 46vw, 380px"
  // AVANT : className="object-contain object-bottom"
  // APRÈS :
  className="object-contain object-bottom grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
/>
            </div>
          </div>
        </Reveal>

        {/* ============================================
            LIGNE 3 — Titre + accroche + CTA (gauche) / Réseaux (droite)
            ============================================ */}
        <Reveal
          delay={300}
          className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          {/* --- Bloc gauche : titre, accroche typewriter, CTA --- */}
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

            {/* 
              Réseaux sociaux en version ICÔNES SEULES, visibles UNIQUEMENT
              sur mobile/tablette (sous les CTA, pour ne pas surcharger). 
            */}
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

          {/* --- Bloc droite : pilules sociales complètes, DESKTOP uniquement --- */}
          <div className="hidden flex-col gap-2.5 sm:flex">
            {SOCIAL_LINKS.map((social) => (
              <SocialPill key={social.label} {...social} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}