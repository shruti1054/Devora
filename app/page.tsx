import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import About from "@/components/About";
import Collections from "@/components/Collections";
import ArtisanalJourney from "@/components/ArtisanalJourney";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="pb-24">
      {/* 1. Hero Full Bleed Image */}
      <Hero />
      
      {/* 2. Feature announcement marquee */}
      <FeatureStrip />
      
      {/* 3. Brand Identity (Inspired by the Golden Horizon) */}
      <About />
      
      {/* 4. The Golden Hour Collection banner */}
      <Collections />
      
      {/* 5. Our Artisanal Journey statement */}
      <ArtisanalJourney />
      
      {/* 6. Bestsellers Bento Grid */}
      <FeaturedProducts />
      
      {/* 7. Newsletter + Footer (Join the Inner Circle) */}
      <Footer />
    </main>
  );
}
