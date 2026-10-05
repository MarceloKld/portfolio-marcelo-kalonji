import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type ServiceCardProps = {
  icon: LucideIcon;
  index: number;       // utilisé pour la numérotation "01", "02", "03"
  title: string;
  description: string;
  features: string[];
};

/**
 * Carte de service individuelle.
 * - Glassmorphism léger via la classe ".glass" (déjà définie Phase 1)
 * - Numérotation élégante en haut à droite (façon étude de cas premium)
 * - Liste de fonctionnalités avec puces "Check" en vert accent
 * - Légère élévation au survol (-translate-y-1) combinée au Spotlight
 */
export function ServiceCard({
  icon: Icon,
  index,
  title,
  description,
  features,
}: ServiceCardProps) {
  return (
    <SpotlightCard className="glass flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
      {/* En-tête : icône + numéro */}
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
          <Icon className="h-5 w-5 text-[var(--accent)]" />
        </div>
        <span className="text-xs font-semibold text-[var(--foreground)]/30">
          0{index + 1}
        </span>
      </div>

      {/* Titre + description */}
      <h3 className="mt-6 text-lg font-semibold text-[var(--foreground)] sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/60">
        {description}
      </p>

      {/* Liste de fonctionnalités, séparée par une ligne fine */}
      <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--border-color)] pt-6">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-[var(--foreground)]/80"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}