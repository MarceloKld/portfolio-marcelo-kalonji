import type { LucideIcon } from "lucide-react";

type TimelineItemProps = {
  icon: LucideIcon;
  role: string;
  company: string;
  period: string;
  missions: string[];
};

/**
 * Une "étape" de la timeline : un cercle-icône (positionné sur la ligne
 * verticale) + une carte de contenu (glassmorphism) à droite.
 *
 * Point technique important : le cercle-icône a un fond PLEIN
 * (bg-[var(--surface)]) et un z-index supérieur (z-10) à la ligne
 * verticale dessinée dans le composant parent (Experience.tsx).
 * Résultat : la ligne semble "passer derrière" chaque icône,
 * comme une vraie timeline continue.
 */
export function TimelineItem({ icon: Icon, role, company, period, missions }: TimelineItemProps) {
  return (
    <div className="relative flex gap-5 sm:gap-6">
      {/* Marqueur circulaire sur la ligne verticale */}
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] sm:h-12 sm:w-12">
        <Icon className="h-4 w-4 text-[var(--accent)] sm:h-5 sm:w-5" />
      </div>

      {/* Carte de contenu */}
      <div className="glass flex-1 rounded-2xl p-5 sm:p-6">
        {/* En-tête : rôle à gauche, période à droite (wrap si l'espace manque) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-[var(--foreground)] sm:text-lg">
            {role}
          </h3>
          <span className="shrink-0 rounded-full border border-[var(--border-color)] px-3 py-1 text-xs font-medium text-[var(--foreground)]/60">
            {period}
          </span>
        </div>

        {/* Entreprise, en vert accent — seul petit détail vert de la carte */}
        <p className="mt-1 text-sm font-medium text-[var(--accent)]">{company}</p>

        {/* Liste des missions, puces discrètes */}
        <ul className="mt-4 flex flex-col gap-2">
          {missions.map((mission) => (
            <li
              key={mission}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--foreground)]/70"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--foreground)]/40" />
              <span>{mission}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}