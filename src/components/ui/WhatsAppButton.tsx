"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TypewriterText } from "@/components/ui/TypewriterText";

const PHONE_NUMBER = "243817655587";
const PREFILLED_MESSAGE = encodeURIComponent(
  "Bonjour M. Kalonji K., j'ai un projet à discuter !"
);

export function WhatsAppButton() {
  // On récupère "locale" en plus de "t", pour forcer le remontage
  // du Typewriter à chaque changement de langue (voir explication Hero.tsx)
  const { t, locale } = useLanguage();
  const [showBubble, setShowBubble] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {showBubble && (
        <div className="animate-fade-up relative max-w-[200px] rounded-2xl rounded-br-sm border border-[var(--border-color)] bg-[var(--surface)] px-4 py-3 text-xs font-medium leading-snug text-[var(--foreground)] shadow-lg sm:max-w-[240px] sm:text-sm">
          <button
            onClick={() => setShowBubble(false)}
            aria-label="Fermer le message"
            className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)]/60"
          >
            <X size={10} />
          </button>

          <TypewriterText
            key={locale}
            words={t.whatsapp.messages}
            typingSpeed={35}
            deletingSpeed={20}
            pauseDuration={2200}
          />
        </div>
      )}

      <a
        href={`https://wa.me/${PHONE_NUMBER}?text=${PREFILLED_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Me contacter sur WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}