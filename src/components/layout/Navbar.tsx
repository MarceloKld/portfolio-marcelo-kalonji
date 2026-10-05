"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/data/navigation";

export function Navbar() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 
        Conteneur extérieur : fixe en haut de l'écran, avec un padding
        qui crée la "marge flottante" visible sur les captures de Richard.
      */}
      <header className="fixed left-0 right-0 top-0 z-30 px-4 pt-4 sm:px-6">
        {/* 
          La "pilule" elle-même : TOUJOURS visible avec fond plein,
          bordure arrondie complète (rounded-full) et ombre légère.
          Ce n'est plus conditionné au scroll — c'est permanent, comme demandé.
        */}
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-5 py-3 shadow-sm shadow-black/5 transition-colors duration-300">
          {/* === LOGO === */}
          <Link href="#accueil" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--foreground)] text-sm font-bold text-[var(--background)]">
              MK
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-[var(--foreground)] sm:block">
              Marcelo K.
            </span>
          </Link>

          {/* === LIENS DE NAVIGATION (desktop uniquement) === */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
                            <Link
                key={link.key}
                href={link.href}
                className="group relative text-sm font-medium text-[var(--foreground)]/70 transition-colors hover:text-[var(--foreground)]"
              >
                {t.nav[link.key as keyof typeof t.nav]}
                {/* Trait qui se dessine de gauche à droite au survol (scaleX) */}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* === ZONE DROITE : toggles + CTA + burger === */}
          <div className="flex items-center gap-3">
            {/* Toggle thème : TOUJOURS visible, même sur mobile, 
                comme sur la capture (il est présent à droite peu importe la taille) */}
            <ThemeToggle />

            {/* Toggle langue : visible uniquement sur desktop pour ne pas surcharger le mobile */}
            <div className="hidden lg:block">
              <LanguageToggle />
            </div>

            {/* Bouton CTA : visible uniquement sur desktop */}
            <Link
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-transform hover:scale-[1.03] lg:flex"
            >
              {t.nav.startProject}
              <ArrowRight size={14} />
            </Link>

            {/* Burger : visible uniquement sur mobile/tablette */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}