"use client";

import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  isOpen: boolean;       // Le menu est-il affiché ?
  onClose: () => void;   // Fonction pour le fermer
};

/**
 * Menu plein écran qui apparaît sur mobile quand on clique sur le burger.
 * On utilise une transition CSS pure (translate-x) : léger et performant.
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* === OVERLAY (fond sombre derrière le menu) === */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* === PANNEAU DU MENU (slide depuis la droite) === */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-[var(--background)] shadow-2xl transition-transform duration-300 ease-out md:hidden",
          // Translation CSS : en dehors de l'écran si fermé, visible si ouvert
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-6">
          {/* En-tête du menu avec bouton fermer */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
              MENU
            </span>
            <button
              onClick={onClose}
              aria-label="Fermer le menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Liens de navigation, un par ligne */}
          <nav className="mt-10 flex flex-1 flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={onClose} // ferme le menu quand on clique un lien
                className="text-2xl font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </Link>
            ))}
          </nav>

          {/* Pied du menu : toggles + CTA */}
          <div className="flex flex-col gap-4 border-t border-[var(--border-color)] pt-6">
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            <Link
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)]"
            >
              {t.nav.startProject}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}