import Hero from "@/components/Hero";
import CharactersSection from "@/components/CharactersSection";
import MemoryGallery from "@/components/MemoryGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <CharactersSection />
      <MemoryGallery />
      <Footer />
    </main>
  );
}
