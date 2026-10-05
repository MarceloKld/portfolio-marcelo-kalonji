"use client";

import type { ReactNode, CSSProperties } from "react";

type MarqueeProps = {
  children: ReactNode; // Le contenu à répéter en boucle
  speed?: number;      // Durée d'un cycle complet en secondes (plus petit = plus rapide)
  repeat?: number;     // Nombre de répétitions par groupe
  className?: string;  // Classes additionnelles pour la bande (gap, alignement...)
};

/**
 * Bande de défilement horizontal infini, réutilisable pour n'importe quel
 * contenu : le nom dans le Hero aujourd'hui, des logos de technologies
 * dans la section Compétences plus tard.
 *
 * TECHNIQUE "duplication x2" :
 * On crée deux groupes de contenu RIGOUREUSEMENT identiques, placés l'un
 * à côté de l'autre. On anime ensuite un déplacement continu de 0% à -50%.
 * Comme les deux groupes sont identiques, au moment où le groupe 1 sort
 * complètement de l'écran, le groupe 2 (identique) est pile à sa place
 * initiale → l'œil ne voit jamais la "couture", la boucle paraît infinie.
 */
export function Marquee({ children, speed = 25, repeat = 6, className }: MarqueeProps) {
  // On répète le contenu "repeat" fois à l'intérieur d'UN SEUL groupe,
  // pour que la bande soit assez large (sinon sur un écran très large,
  // on verrait un espace vide avant que la boucle ne recommence)
  const group = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center">
      {children}
    </span>
  ));

  return (
    // "full-bleed" : fait sortir la bande de son conteneur parent (qui a
    // peut-être un padding latéral) pour qu'elle touche les 2 bords de
    // l'écran. Technique : left-1/2 + -translate-x-1/2 + w-screen.
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <div
        className={`marquee-track flex w-max items-center whitespace-nowrap ${className ?? ""}`}
        // La variable CSS --marquee-duration est lue par l'animation
        // définie dans globals.css (voir "var(--marquee-duration, 25s)")
        style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
      >
        {/* Groupe réel (lu par les lecteurs d'écran) */}
        <div className="flex shrink-0 items-center">{group}</div>
        {/* Groupe dupliqué à l'identique, caché aux technologies d'accessibilité
            pour éviter que le nom soit "lu" deux fois par un lecteur d'écran */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {group}
        </div>
      </div>
    </div>
  );
}