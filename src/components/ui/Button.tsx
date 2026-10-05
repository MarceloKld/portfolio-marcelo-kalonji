import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

// On définit les variantes visuelles possibles du bouton
type ButtonProps = {
  children: ReactNode;
  href?: string;                    // si présent → c'est un lien
  onClick?: () => void;             // si présent → c'est une action (ex: ouvrir menu)
  variant?: "primary" | "secondary"; // style du bouton
  className?: string;               // classes additionnelles optionnelles
};

/**
 * Bouton réutilisable dans tout le site.
 * - variant="primary"   → fond plein (noir en light mode / blanc en dark mode)
 * - variant="secondary" → contour fin, transparent
 *
 * S'il reçoit un "href", il se comporte comme un lien (Next.js <Link>).
 * Sinon, il se comporte comme un vrai <button>.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) {
  // Classes communes à tous les boutons
  const baseStyles =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]";

  // Classes spécifiques selon la variante choisie
  const variants = {
    primary:
      "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90",
    secondary:
      "border border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--surface)]",
  };

  const combinedClassName = cn(baseStyles, variants[variant], className);

  // Cas 1 : c'est un lien de navigation
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // Cas 2 : c'est un bouton d'action classique
  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}