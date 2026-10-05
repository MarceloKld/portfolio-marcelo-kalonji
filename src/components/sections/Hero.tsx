"use client";
// Nécessaire : useLanguage() utilise un hook React (useSyncExternalStore),
// donc tout composant qui l'appelle doit être un Client Component.
// Le coût est minime : le fichier de traduction ne pèse que quelques Ko.

import Image from "next/image";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { RotatingText } from "@/components/ui/RotatingText";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="accueil"
      // overflow-hidden est important : le texte en contour est très large
      // et pourrait créer un débordement horizontal sans cette ligne
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-32 sm:px-6"
    >
      {/* === BADGE DE DISPONIBILITÉ === */}
      <Badge>{t.hero.badge}</Badge>

      {/* 
        === BLOC NOM + PORTRAIT EN OVERLAP ===
        Conteneur à hauteur fixe en vh pour que le texte et la photo
        se redimensionnent ensemble, proportionnellement, sur tous les écrans.
      */}
      <div className="relative mx-auto mt-8 h-[48vh] min-h-[300px] w-full max-w-4xl sm:h-[56vh]">
        {/* 
          Texte en CONTOUR SEUL (outline), en arrière-plan.
          [-webkit-text-stroke] dessine uniquement le contour des lettres.
          text-transparent rend l'intérieur des lettres invisible.
          La couleur du contour suit var(--foreground) : 
          donc noir en mode clair, blanc en mode sombre, automatiquement.
        */}
        <h1
          aria-hidden // décoratif : le vrai nom est déjà lisible ailleurs sur la page
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center text-[15vw] font-extrabold uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_var(--foreground)] sm:text-[7vw]"
        >
          MARCELO K.
        </h1>

        {/* 
          Portrait détouré, positionné PAR-DESSUS le texte (z-10).
          "fill" fait occuper à l'image tout l'espace de son conteneur parent,
          qui doit donc être en position relative avec une taille définie.
        */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[95%] w-[65%] max-w-[300px] sm:w-[38%] sm:max-w-[360px]">
          <Image
            src="/images/profile/marcelo.webp"
            alt="Portrait de Marcelo Kalonji Kashala, Concepteur et Développeur Web"
            fill
            priority // charge cette image en PRIORITÉ (elle est visible immédiatement = LCP)
            sizes="(max-width: 640px) 65vw, 360px" // optimise le poids selon la taille d'écran
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>

      {/* === TITRE PROFESSIONNEL === */}
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        {t.hero.title}
      </p>

      {/* === ACCROCHE AVEC TEXTE ROTATIF === */}
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[var(--foreground)]/70 sm:text-lg">
        {t.hero.accrocheBefore}{" "}
        <span className="font-semibold text-[var(--foreground)]">
          <RotatingText words={t.hero.rotatingWords} />
        </span>{" "}
        {t.hero.accrocheAfter}
      </p>

      {/* === BOUTONS D'ACTION (CTA) === */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button href="#contact" variant="primary">
          {t.hero.ctaPrimary}
          <ArrowRight size={16} />
        </Button>
        <Button href="#projets" variant="secondary">
          <FolderGit2 size={16} />
          {t.hero.ctaSecondary}
        </Button>
      </div>
    </section>
  );
}