"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  autoPlayInterval?: number; // en ms, mettre 0 pour désactiver le défilement auto
};

/**
 * Carrousel d'images avec défilement automatique, flèches, indicateurs
 * et visionneuse plein écran (lightbox) au clic sur une image.
 *
 * - Les images sont affichées en entier (object-contain) avec un fond flouté
 *   pour gérer les deux formats : captures PC (horizontales) et téléphone
 *   (verticales, façon TikTok).
 * - La lightbox est rendue via un "portal" dans document.body : la modale
 *   utilise des transform/animations, qui piègent les éléments "fixed"
 *   dans leur propre cadre. Le portal évite ce problème.
 */
export function ImageCarousel({ images, alt, autoPlayInterval = 4500 }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Défilement automatique (en pause au survol ou quand la lightbox est ouverte)
  useEffect(() => {
    if (!autoPlayInterval || isPaused || isLightboxOpen || images.length <= 1) return;
    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, isPaused, isLightboxOpen, goNext, images.length]);

  // Clavier dans la lightbox : Échap ferme UNIQUEMENT la lightbox, flèches naviguent.
  // Écoute en phase "capture" + stopPropagation pour que la modale parente
  // (qui écoute aussi Échap) ne se ferme pas en même temps.
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isLightboxOpen, goNext, goPrev]);

  return (
    <>
      <div
        className="group relative h-[55vh] min-h-[320px] w-full overflow-hidden rounded-2xl bg-[var(--surface)] md:h-[65vh] md:max-h-[640px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Le "rail" qui contient toutes les images côte à côte */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              onClick={() => setIsLightboxOpen(true)}
              className="relative h-full w-full shrink-0 cursor-zoom-in"
            >
              {/* Fond flouté : remplit les bandes vides autour de l'image */}
              <Image
                src={src}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="scale-110 object-cover opacity-40 blur-2xl"
              />
              {/* Image principale : affichée en entier, jamais coupée */}
              <Image
                src={src}
                alt={`${alt} — visuel ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Petite icône "agrandir" : indique que l'image est cliquable */}
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-70 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Maximize2 size={14} />
        </span>

        {/* Flèches de navigation — affichées seulement s'il y a plus d'1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/60"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/60"
            >
              <ChevronRight size={18} />
            </button>

            {/* Indicateurs (points) */}
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Aller à l'image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Compteur */}
            <span className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* ===== LIGHTBOX : image en grand ===== */}
      {isLightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          >
            {/* Fermer */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              aria-label="Fermer l'image"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={18} />
            </button>

            {/* Image en grand (cliquer dessus ou à côté ferme la lightbox) */}
            <div className="relative h-full w-full max-w-6xl">
              <Image
                key={images[index]}
                src={images[index]}
                alt={`${alt} — visuel ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Image précédente"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Image suivante"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                  {index + 1} / {images.length}
                </span>
              </>
            )}
          </div>,
          document.body
        )}
    </>
  );
}