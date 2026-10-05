"use client";
// Client Component obligatoire : gère l'état du menu mobile + le scroll

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();

  // État : le menu mobile est-il ouvert ?
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // État : a-t-on scrollé la page ? (pour ajouter un fond glassmorphism)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Dès qu'on dépasse 20px de scroll, on active le fond flouté
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    // Nettoyage : on retire l'écouteur quand le composant est démonté
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-30 transition-all duration-300",
          // Petite marge + centrage, comme une barre "flottante" façon Richard
          "px-4 pt-4"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300",
            isScrolled
              ? "glass border border-[var(--border-color)] shadow-sm" // fond flouté au scroll
              : "bg-transparent"
          )}
        >
          {/* === LOGO === */}
          <Link href="#accueil" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--foreground)] text-sm font-bold text-[var(--background)]">
              MK
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-[var(--foreground)] sm:block">
              Marcelo K.
            </span>
          </Link>

          {/* === LIENS DE NAVIGATION (visibles uniquement sur desktop) === */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-[var(--foreground)]/70 transition-colors hover:text-[var(--foreground)]"
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </Link>
            ))}
          </nav>

          {/* === ZONE DROITE : toggles + CTA + burger === */}
          <div className="flex items-center gap-3">
            {/* Toggles visibles uniquement sur desktop */}
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Bouton CTA visible uniquement sur desktop */}
            <Link
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-transform hover:scale-[1.03] lg:flex"
            >
              {t.nav.startProject}
              <ArrowRight size={14} />
            </Link>

            {/* Bouton burger, visible uniquement sur mobile/tablette */}
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

      {/* Le menu mobile est un composant séparé, contrôlé depuis ici */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}