"use client";

/**
 * Marquee.tsx
 * -----------
 * Bande de défilement horizontal infini, réutilisable pour n'importe quel
 * contenu : le nom dans le Hero (full-bleed, plein écran) OU une liste
 * de technologies dans une colonne de section (contenu, pas full-bleed).
 *
 * TECHNIQUE "duplication x2" :
 * On crée deux groupes de contenu RIGOUREUSEMENT identiques, placés l'un
 * à côté de l'autre, puis on anime un déplacement continu de 0% à -50%.
 * Comme les deux groupes sont identiques, au moment où le groupe 1 sort
 * complètement de l'écran, le groupe 2 (identique) est pile à sa place
 * initiale → l'œil ne voit jamais la "couture", la boucle paraît infinie.
 */
import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  speed?: number;       // durée d'un cycle complet en secondes (plus petit = plus rapide)
  repeat?: number;      // nombre de répétitions du contenu À L'INTÉRIEUR d'un groupe
  reverse?: boolean;    // NOUVEAU — inverse le sens du défilement (droite → gauche devient gauche → droite)
  fullBleed?: boolean;  // NOUVEAU — true = déborde plein écran (Hero) / false = reste dans son conteneur (Skills)
  className?: string;   // classes additionnelles pour la bande (gap, alignement...)
};

export function Marquee({
  children,
  speed = 25,
  repeat = 6,
  reverse = false,
  fullBleed = false,
  className,
}: MarqueeProps) {
  // On répète le contenu "repeat" fois à l'intérieur d'UN SEUL groupe,
  // pour que la bande soit assez large (sinon sur un écran très large,
  // on verrait un espace vide avant que la boucle ne recommence).
  const group = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center">
      {children}
    </span>
  ));

  return (
    <div
      className={cn(
        "overflow-hidden",
        // Le "full-bleed" casse le conteneur parent pour toucher les 2 bords
        // de l'écran — uniquement activé quand on le demande explicitement.
        fullBleed && "relative left-1/2 w-screen -translate-x-1/2"
      )}
    >
      <div
        className={cn("marquee-track flex w-max items-center whitespace-nowrap", className)}
        style={{
          // Variable CSS lue par @keyframes marquee-scroll dans globals.css
          "--marquee-duration": `${speed}s`,
          // "reverse" inverse simplement le sens de lecture de l'animation CSS,
          // aucune nouvelle @keyframes n'est nécessaire.
          animationDirection: reverse ? "reverse" : "normal",
        } as CSSProperties}
      >
        {/* Groupe réel (lu par les lecteurs d'écran) */}
        <div className="flex shrink-0 items-center">{group}</div>

        {/* Groupe dupliqué à l'identique, caché aux technologies d'accessibilité
            pour éviter que le contenu soit "lu" deux fois par un lecteur d'écran */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {group}
        </div>
      </div>
    </div>
  );
}