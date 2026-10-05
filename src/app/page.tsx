import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Section temporaire pour tester le défilement du scroll de la Navbar.
          On la remplacera par le vrai Hero à la Phase 3. */}
      <section id="accueil" className="flex h-[150vh] items-center justify-center">
        <p className="text-[var(--foreground)]/40">
          Prochaine étape : Hero Section
        </p>
      </section>
    </main>
  );
}