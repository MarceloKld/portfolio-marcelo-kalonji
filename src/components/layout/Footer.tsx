"use client";

/**
 * Footer.tsx
 * ----------
 * Pied de page global : identité + navigation rapide + réseaux + copyright.
 */
import { useLanguage } from "@/components/providers/LanguageProvider";
import { NAV_LINKS } from "@/data/navigation";
import { SOCIAL_LINKS } from "@/data/socials";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t px-4 py-16 sm:px-6 lg:px-10"
      style={{ borderColor: "var(--border-color)" }}
    >
      {/* Soft glow très discret */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.03] blur-[80px]"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        {/* ===== Identité ===== */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--foreground)] text-sm font-bold text-[var(--background)] transition-transform duration-300 hover:scale-105">
              MK
            </span>
            <span className="text-lg font-bold tracking-tight">Marcelo K.</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/60">
            {t.footer.tagline}
          </p>

          {/* Disponibilité */}
          <div className="mt-5 flex items-center gap-2.5 text-xs text-[var(--foreground)]/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            {t.footer.availability}
          </div>
        </div>

        {/* ===== Navigation ===== */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/40">
            {t.footer.navTitle}
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className="text-[var(--foreground)]/70 transition-all duration-300 hover:text-[var(--accent)] hover:translate-x-0.5 inline-block"
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Réseaux sociaux ===== */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/40">
            {t.footer.socialTitle}
          </p>
          <div className="mt-5 flex flex-col gap-3.5">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-[var(--foreground)]/70 transition-all duration-300 hover:text-[var(--accent)]"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== Copyright ===== */}
      <div
        className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-7 text-xs text-[var(--foreground)]/40 sm:flex-row"
        style={{ borderColor: "var(--border-color)" }}
      >
        <p>
          © {year} Marcelo Kalonji Kashala. {t.footer.rights}
        </p>
        <a
          href="#accueil"
          className="group flex items-center gap-1.5 transition-all duration-300 hover:text-[var(--accent)]"
        >
          {t.footer.backToTop}
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}