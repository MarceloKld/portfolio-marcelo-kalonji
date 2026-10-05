import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Section temporaire pour vérifier qu'on peut scroller sous le Hero.
          Sera remplacée par "Services" à la Phase 4. */}
      <section id="services" className="flex h-screen items-center justify-center">
        <p className="text-[var(--foreground)]/40">Prochaine étape : Services</p>
      </section>
    </main>
  );
}