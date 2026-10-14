"use client";

/**
 * Button.tsx
 * -----------
 * Composant polymorphe :
 *  - si on lui donne une prop "href" → il devient un <Link> Next.js (navigation)
 *  - sinon → il devient un vrai <button> HTML natif (formulaires, actions JS)
 *
 * AVANT : ButtonProps ne gérait que quelques props custom → TypeScript
 * refusait "type", "disabled", etc. dans Contact.tsx.
 * MAINTENANT : on étend directement les types HTML officiels de React
 * (AnchorHTMLAttributes / ButtonHTMLAttributes) → TOUTES les props natives
 * sont acceptées automatiquement, sans jamais avoir à les lister nous-mêmes.
 */
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type BaseProps = {
  variant?: "primary" | "secondary";
  className?: string;
};

// Cas "lien" : href est obligatoire, on hérite des attributs d'un <a>
type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// Cas "bouton" : pas de href, on hérite des attributs d'un <button>
// (c'est ICI que "type", "disabled" deviennent disponibles)
type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = LinkProps | NativeButtonProps;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary:
    "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black",
  secondary:
    "border border-[var(--border-color)] text-[var(--foreground)] hover:border-[var(--accent)]",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], className);

  // Branche "lien" : si href est présent et non vide
  if ("href" in props && props.href) {
    const { href, children, ...rest } = props as LinkProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // Branche "bouton natif" : type="submit" fonctionne maintenant nativement
  const { children, ...rest } = props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}