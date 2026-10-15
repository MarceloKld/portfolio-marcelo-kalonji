import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type ServiceCardProps = {
  icon: LucideIcon;
  index: number;
  title: string;
  description: string;
  features: string[];
};

/**
 * Carte de service individuelle.
 * - Glassmorphism + Spotlight
 * - Numérotation élégante
 * - Hover fluide (scale, glow, icône, checkmarks)
 */
export function ServiceCard({
  icon: Icon,
  index,
  title,
  description,
  features,
}: ServiceCardProps) {
  return (
    <SpotlightCard
      className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all duration-500
                 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)]
                 sm:p-8"
    >
      {/* Légère lumière en haut au hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* En-tête : icône + numéro */}
      <div className="flex items-center justify-between">
        <div
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]
                     transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent)]/40 group-hover:shadow-[0_0_20px_-4px_var(--accent)]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-10"
          />
          <Icon className="relative h-5 w-5 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110" />
        </div>

        <span className="text-xs font-semibold tracking-wider text-[var(--foreground)]/30 transition-colors duration-300 group-hover:text-[var(--accent)]/60">
          0{index + 1}
        </span>
      </div>

      {/* Titre + description */}
      <h3 className="mt-6 text-lg font-semibold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--foreground)] sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/60 transition-colors duration-300 group-hover:text-[var(--foreground)]/75">
        {description}
      </p>

      {/* Liste de fonctionnalités */}
      <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--border-color)] pt-6 transition-colors duration-300 group-hover:border-[var(--accent)]/20">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-[var(--foreground)]/80 transition-colors duration-300 group-hover:text-[var(--foreground)]/90"
          >
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
              <Check
                className="h-4 w-4 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110"
                strokeWidth={2.5}
              />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}