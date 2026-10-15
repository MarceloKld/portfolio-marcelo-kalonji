import Link from "next/link";
import type { SocialLink } from "@/data/socials";

/**
 * Pilule de lien social (icône + libellé).
 */
export function SocialPill({ label, href, icon: Icon }: SocialLink) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2.5 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--foreground)]
                 transition-all duration-300
                 hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/8 hover:shadow-md"
    >
      <Icon className="h-3.5 w-3.5 text-[var(--foreground)]/70 transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--accent)]" />
      <span className="transition-colors duration-300 group-hover:text-[var(--foreground)]">
        {label}
      </span>
    </Link>
  );
}