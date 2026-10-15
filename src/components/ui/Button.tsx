"use client";

/**
 * Button.tsx
 * -----------
 * Composant polymorphe :
 *  - si on lui donne une prop "href" → il devient un <Link> Next.js
 *  - sinon → il devient un vrai <button> HTML natif
 */
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type BaseProps = {
  variant?: "primary" | "secondary";
  className?: string;
};

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = LinkProps | NativeButtonProps;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100";

const variants = {
  primary: cn(
    "bg-[var(--foreground)] text-[var(--background)]",
    "hover:bg-[var(--accent)] hover:text-black hover:scale-[1.03] hover:shadow-[0_8px_25px_-6px_var(--accent)]",
    "active:scale-[0.98]"
  ),
  secondary: cn(
    "border border-[var(--border-color)] text-[var(--foreground)] bg-transparent",
    "hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 hover:scale-[1.03]",
    "active:scale-[0.98]"
  ),
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], className);

  // Branche "lien"
  if ("href" in props && props.href) {
    const { href, children, ...rest } = props as LinkProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // Branche "bouton natif"
  const { children, ...rest } = props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}