"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  autoPlayInterval?: number;
};

/**
 * Carrousel avec autoplay, flèches, indicateurs et lightbox plein écran.
 */
export function ImageCarousel({
  images,
  alt,
  autoPlayInterval = 4500,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Autoplay
  useEffect(() => {
    if (!autoPlayInterval || isPaused || isLightboxOpen || images.length <= 1)
      return;
    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, isPaused, isLightboxOpen, goNext, images.length]);

  // Clavier lightbox
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
        {/* Rail d'images */}
        <div
          className="flex h-full w-full transition-transform duration-600 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              onClick={() => setIsLightboxOpen(true)}
              className="relative h-full w-full shrink-0 cursor-zoom-in"
            >
              <Image
                src={src}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="scale-110 object-cover opacity-40 blur-2xl"
              />
              <Image
                src={src}
                alt={`${alt} — visuel ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>

        {/* Icône agrandir */}
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <Maximize2 size={14} />
        </span>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70"
            >
              <ChevronRight size={18} />
            </button>

            {/* Indicateurs */}
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Aller à l'image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Compteur */}
            <span className="absolute right-3 top-3 z-10 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* ===== LIGHTBOX ===== */}
      {isLightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md animate-in fade-in duration-300 sm:p-8"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              aria-label="Fermer l'image"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
            >
              <X size={18} />
            </button>

            <div
              className="relative h-full w-full max-w-6xl animate-in zoom-in-95 duration-400"
              onClick={(e) => e.stopPropagation()}
            >
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
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Image suivante"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>

                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
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