"use client";

/**
 * Footer.tsx
 * ----------
 * Pied de page global : identité + navigation rapide + réseaux + copyright.
 * "use client" nécessaire uniquement pour useLanguage() (traductions).
 */
import { useLanguage } from "@/components/providers/LanguageProvider";
import { NAV_LINKS } from "@/data/navigation";
import { SOCIAL_LINKS } from "@/data/socials";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t px-5 py-14 sm:px-8 lg:px-16" style={{ borderColor: "var(--border-color)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">

        {/* Identité */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--foreground)] text-sm font-bold text-[var(--background)]">
              MK
            </span>
            <span className="text-lg font-bold">Marcelo K.</span>
          </div>
          <p className="mt-4 text-sm text-[var(--foreground)]/60">{t.footer.tagline}</p>

          {/* Petit détail vert, cohérent avec le badge du Hero */}
          <div className="mt-4 flex items-center gap-2 text-xs text-[var(--foreground)]/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            {t.footer.availability}
          </div>
        </div>

        {/* Navigation rapide */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)]/40">
            {t.footer.navTitle}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <a href={link.href} className="text-[var(--foreground)]/70 transition-colors hover:text-[var(--accent)]">
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)]/40">
            {t.footer.socialTitle}
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[var(--foreground)]/70 transition-colors hover:text-[var(--accent)]"
                >
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ligne de copyright */}
      <div
        className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-[var(--foreground)]/40 sm:flex-row"
        style={{ borderColor: "var(--border-color)" }}
      >
        <p>© {year} Marcelo Kalonji Kashala. {t.footer.rights}</p>
        <a href="#accueil" className="transition-colors hover:text-[var(--accent)]">
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}