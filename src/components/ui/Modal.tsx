"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string; // permet de contrôler la largeur max depuis l'appelant
};

/**
 * Fenêtre modale générique et réutilisable, affichée via un "Portail" React
 * (createPortal) : le contenu est injecté directement dans <body>, en dehors
 * de la hiérarchie normale du DOM. Avantage : aucun conflit de z-index ou
 * d'overflow avec les sections parentes, peu importe où la modale est appelée.
 *
 * Fonctionnalités :
 * - Fermeture via la touche Échap
 * - Fermeture en cliquant sur le fond sombre (backdrop)
 * - Blocage du scroll de la page pendant l'ouverture
 * - Bouton de fermeture TOUJOURS visible (position fixed sur l'écran,
 *   indépendant du défilement interne du contenu de la modale)
 */
export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6">
      {/* Fond sombre flouté, cliquable pour fermer */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ animation: "modal-backdrop-in 0.3s ease-out" }}
      />

      {/* 
        Bouton fermer : position "fixed" par rapport à TOUT L'ÉCRAN,
        et non à l'intérieur du panneau scrollable. Il reste donc
        visible en permanence, même si on défile dans un long contenu.
      */}
      <button
        onClick={onClose}
        aria-label="Fermer la fenêtre"
        className="fixed right-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-[var(--foreground)] shadow-lg transition-transform duration-200 hover:scale-110 sm:right-8 sm:top-8"
      >
        <X size={18} />
      </button>

      {/* Panneau de contenu, scrollable indépendamment */}
      <div
        role="dialog"
        aria-modal="true"
        style={{ animation: "modal-panel-in 0.45s cubic-bezier(0.16,1,0.3,1)" }}
        className={cn(
          "relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-3xl border border-[var(--border-color)] bg-[var(--background)] shadow-2xl",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}