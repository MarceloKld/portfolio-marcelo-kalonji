import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />

      {/* Section temporaire, remplacée à la prochaine phase */}
      <section id="experience" className="flex h-screen items-center justify-center">
        <p className="text-[var(--foreground)]/40">Prochaine étape : Expérience</p>
      </section>
    </main>
  );
}