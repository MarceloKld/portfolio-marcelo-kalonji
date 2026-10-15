import type { LucideIcon } from "lucide-react";

type TimelineItemProps = {
  icon: LucideIcon;
  role: string;
  company: string;
  period: string;
  missions: string[];
};

export function TimelineItem({
  icon: Icon,
  role,
  company,
  period,
  missions,
}: TimelineItemProps) {
  return (
    <div className="group relative flex gap-5 sm:gap-6">
      {/* ========== CERCLE ICÔNE ========== */}
      <div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] transition-all duration-300 ease-out sm:h-12 sm:w-12
                   group-hover:scale-110 group-hover:border-[var(--accent)]/60 group-hover:shadow-[0_0_20px_-4px_var(--accent)]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-10"
        />
        <Icon className="relative h-4 w-4 text-[var(--accent)] transition-all duration-300 group-hover:scale-110 sm:h-5 sm:w-5" />
      </div>

      {/* ========== CARTE CONTENU ========== */}
      <div
        className="glass relative flex-1 overflow-hidden rounded-2xl p-5 transition-all duration-300 ease-out sm:p-6
                   group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]
                   group-hover:border-[var(--accent)]/20"
      >
        {/* Lumière au hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* En-tête avec animation d'apparition */}
        <div className="relative flex flex-wrap items-center justify-between gap-2">
          <h3
            className="text-base font-semibold text-[var(--foreground)] sm:text-lg
                       animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
          >
            {role}
          </h3>

          <span
            className="shrink-0 rounded-full border border-[var(--border-color)] px-3 py-1 text-xs font-medium text-[var(--foreground)]/60 transition-all duration-300
                       group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent)]
                       animate-in fade-in slide-in-from-right-2 duration-500 fill-mode-both"
            style={{ animationDelay: "80ms" }}
          >
            {period}
          </span>
        </div>

        {/* Entreprise */}
        <p
          className="relative mt-1 text-sm font-medium text-[var(--accent)] transition-all duration-300 group-hover:tracking-wide
                     animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
          style={{ animationDelay: "120ms" }}
        >
          {company}
        </p>

        {/* Missions avec stagger */}
        <ul className="relative mt-4 flex flex-col gap-2.5">
          {missions.map((mission, index) => (
            <li
              key={mission}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--foreground)]/70 transition-colors duration-300 group-hover:text-[var(--foreground)]/85
                         animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
              style={{ animationDelay: `${180 + index * 70}ms` }}
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--foreground)]/40 transition-all duration-300
                           group-hover:scale-125 group-hover:bg-[var(--accent)]"
              />
              <span>{mission}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}