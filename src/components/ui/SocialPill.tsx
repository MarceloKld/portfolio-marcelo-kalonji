import Link from "next/link";
import type { SocialLink } from "@/data/socials";

/**
 * Pilule de lien social, façon Julien (icône + libellé, fond plein léger).
 */
export function SocialPill({ label, href, icon: Icon }: SocialLink) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--foreground)] transition-all duration-200 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5"
    >
      <Icon className="h-3.5 w-3.5 text-[var(--foreground)]/70 transition-colors group-hover:text-[var(--accent)]" />
      {label}
    </Link>
  );
}