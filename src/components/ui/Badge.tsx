import type { ReactNode } from "react";

/**
 * Badge avec un point vert pulsant.
 * Utilisé ici pour la disponibilité, mais réutilisable partout
 * où on veut signaler un statut actif (ex: "En ligne" plus tard).
 *
 * Le vert est ici utilisé EXACTEMENT comme demandé :
 * uniquement pour un petit détail (présence/disponibilité),
 * jamais comme couleur de fond ou de texte principal.
 */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)]">
      {/* 
        Le point vert : on superpose 2 ronds.
        - Le rond du dessous (absolute) est animé avec "animate-ping" 
          (classe Tailwind native, aucune lib externe) : il grandit et s'efface en boucle.
        - Le rond du dessus (relative) reste fixe et visible en permanence.
        Résultat : un effet de "pulsation radar" léger et élégant.
      */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
      </span>
      {children}
    </div>
  );
}