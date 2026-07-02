"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/config";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative min-h-[85dvh] md:min-h-[95dvh] w-full overflow-hidden pt-16">
      {/* Background Image with parallax-ready zoom scale */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-105 hover:scale-100"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApeyjwcglvldtjuOU6J6B6s-WyGPn7d2cancXbF1da1an7oRUjQ667lHqCK3bkc7Mp3o1hUiCW5vwxOc5yXbPzXhyBQuPP79x9cq4p4b4dmnbPVnlkTqjrxLtwueqsZGcKnPL6UGhYBp9Mv6gMitlj6O7wR1Nu7sAa9cMDy7BChmhmfAVyF0TKSLUBu5au1hyhXFJzYSL08uok4F67ZML6ICop9T8mFd3cGV8aUttV21bKEX2wIWQVdAipe6yYHOiRH8M_Q6PCk4k')",
        }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-surface/50" />

      {/* Center content */}
      <div className="relative flex flex-col items-center justify-center text-center px-margin-mobile min-h-[calc(85dvh-4rem)] md:min-h-[calc(95dvh-4rem)] py-12">
        <span
          className={`font-sans text-[0.65rem] sm:text-[0.72rem] font-semibold tracking-[0.3em] sm:tracking-[0.4em] text-white/90 mb-2 sm:mb-3 uppercase ${
            mounted ? "animate-fade-in" : "opacity-0"
          }`}
        >
          {BRAND.name} · {BRAND.tagline}
        </span>
        <h1 className="font-serif text-[1.75rem] sm:text-4xl md:text-display-lg text-white text-glow mb-3 sm:mb-4 leading-tight tracking-wide font-medium max-w-[92vw] sm:max-w-none px-2">
          THE COASTAL ELEGANCE
        </h1>
        <p className="font-sans text-sm sm:text-base text-white/80 max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
          Hand-crafted coastal jewellery — where golden shores meet timeless design.
        </p>
        <Link
          href="/shop"
          className="group relative inline-flex items-center justify-center min-h-[48px] px-8 sm:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-sans text-xs font-semibold tracking-widest hover:bg-white hover:text-primary transition-all duration-500 uppercase active:scale-95"
        >
          <span className="relative z-10">Explore Collection</span>
        </Link>
      </div>
    </header>
  );
}
