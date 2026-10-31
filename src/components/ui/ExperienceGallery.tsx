"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const EXPERIENCE_PHOTOS = [
  "/images/projects/experience/Experience1.webp",
  "/images/projects/experience/Experience2.webp",
  "/images/projects/experience/Experience3.webp",
  "/images/projects/experience/Experience4.webp",
  "/images/projects/experience/Experience6.webp",
  "/images/projects/experience/Experience7.webp",
  "/images/projects/experience/Experience8.webp",
];

export function ExperienceGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        spaceBetween={-40}
        coverflowEffect={{
          rotate: 28,
          stretch: 0,
          depth: 180,
          modifier: 1.2,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
        className="experience-coverflow !pb-10"
      >
        {EXPERIENCE_PHOTOS.map((src, index) => (
          <SwiperSlide
            key={src}
            className="!w-[260px] sm:!w-[300px] md:!w-[340px]"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl border transition-all duration-500 ${
                activeIndex === index
                  ? "border-[var(--accent)]/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] scale-100"
                  : "border-[var(--border-color)] opacity-70 scale-95"
              }`}
            >
              <Image
                src={src}
                alt={`Experience photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, 340px"
                className="object-cover"
                priority={index < 3}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Indicateurs (points) */}
      <div className="mt-2 flex justify-center gap-2">
        {EXPERIENCE_PHOTOS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              // On laisse Swiper gérer via le re-render, 
              // mais pour un contrôle plus précis on peut utiliser une ref
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-6 bg-[var(--accent)]"
                : "w-1.5 bg-[var(--foreground)]/25"
            }`}
            aria-label={`Photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}