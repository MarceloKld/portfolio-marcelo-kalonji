"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

/**
 * Fenêtre modale générique via Portal.
 * - Fermeture Échap + clic backdrop
 * - Blocage du scroll
 * - Bouton fermer toujours visible
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-black/65 backdrop-blur-md animate-in fade-in duration-300"
      />

      {/* Bouton fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer la fenêtre"
        className="fixed right-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-[var(--foreground)] shadow-lg transition-all duration-300 hover:scale-110 hover:border-[var(--accent)]/40 hover:text-[var(--accent)] sm:right-8 sm:top-8"
      >
        <X size={18} />
      </button>

      {/* Panneau */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-3xl border border-[var(--border-color)] bg-[var(--background)] shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-400",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}