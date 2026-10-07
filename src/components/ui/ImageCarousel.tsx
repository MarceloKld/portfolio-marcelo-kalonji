"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  autoPlayInterval?: number; // en ms, mettre 0 pour désactiver le défilement auto
};

/**
 * Carrousel d'images horizontal avec défilement automatique, flèches de
 * navigation et indicateurs (points) cliquables.
 *
 * Technique de glissement : toutes les images sont alignées côte à côte
 * dans un conteneur flex très large ("track"), puis on déplace ce track
 * via "transform: translateX()" — animation fluide, accélérée par le GPU,
 * donc performante même avec de nombreuses images (17 pour KIN ALERT ici).
 *
 * Le défilement automatique se met en pause dès que la souris survole
 * le carrousel, pour laisser le temps de regarder une image en détail.
 */
export function ImageCarousel({ images, alt, autoPlayInterval = 4500 }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!autoPlayInterval || isPaused || images.length <= 1) return;
    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, isPaused, goNext, images.length]);

  return (
    <div
      className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-[var(--surface)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Le "rail" qui contient toutes les images côte à côte */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0">
            <Image
              src={src}
              alt={`${alt} — visuel ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Flèches de navigation — affichées seulement s'il y a plus d'1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goNext}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110"
          >
            <ChevronRight size={18} />
          </button>

          {/* Indicateurs (points) — le point actif s'étire en pilule */}
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

          {/* Compteur discret en haut à droite */}
          <span className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}