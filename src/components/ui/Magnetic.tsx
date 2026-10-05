"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number; // 0.1 = très subtil, 0.5 = très marqué
};

/**
 * Donne un effet "aimant" à un élément : il suit légèrement le curseur
 * quand la souris passe dessus, puis revient en douceur à sa place.
 *
 * Implémentation en JS natif (pas de librairie) : on calcule la distance
 * entre le curseur et le centre de l'élément, et on applique un léger
 * déplacement via CSS transform. Très performant (transform = accéléré GPU).
 */
export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${offsetX * strength}px, ${offsetY * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)"; // retour à la position initiale
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}