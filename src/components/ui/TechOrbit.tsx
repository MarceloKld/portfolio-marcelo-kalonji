"use client";

import dynamic from "next/dynamic";

// On charge le Player uniquement côté client (évite l'erreur document is not defined)
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export function TechOrbit() {
  return (
    <div className="pointer-events-none absolute -right-4 top-1/2 z-0 hidden -translate-y-1/2 opacity-60 lg:block xl:-right-8">
      <div className="h-[200px] w-[200px] xl:h-[240px] xl:w-[240px]">
        <Player
          autoplay
          loop
          src="/animations/tech-orbit.json"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}