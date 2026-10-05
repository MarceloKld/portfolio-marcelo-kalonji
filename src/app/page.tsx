import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Experience />

      {/* Section temporaire, remplacée à la prochaine phase */}
      <section id="projets" className="flex h-screen items-center justify-center">
        <p className="text-[var(--foreground)]/40">Prochaine étape : Projets</p>
      </section>
    </main>
  );
}