import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 px-4"> {/* pt-24 pour ne pas être caché sous la Navbar */}
        <Hero />
      </div>
    </main>
  );
}