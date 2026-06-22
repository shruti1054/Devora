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
    <header className="relative h-[90vh] md:h-[95vh] w-full overflow-hidden">
      {/* Background Image with parallax-ready zoom scale */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-105 hover:scale-100" 
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApeyjwcglvldtjuOU6J6B6s-WyGPn7d2cancXbF1da1an7oRUjQ667lHqCK3bkc7Mp3o1hUiCW5vwxOc5yXbPzXhyBQuPP79x9cq4p4b4dmnbPVnlkTqjrxLtwueqsZGcKnPL6UGhYBp9Mv6gMitlj6O7wR1Nu7sAa9cMDy7BChmhmfAVyF0TKSLUBu5au1hyhXFJzYSL08uok4F67ZML6ICop9T8mFd3cGV8aUttV21bKEX2wIWQVdAipe6yYHOiRH8M_Q6PCk4k')",
        }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/40" />
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-margin-mobile">
        <span className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] text-white/90 mb-4 animate-fade-in uppercase">
          Aesthetic Harmony
        </span>
        <h1 className="font-serif text-[42px] md:text-display-lg text-white text-glow mb-8 leading-tight tracking-wide font-medium">
          THE COASTAL ELEGANCE
        </h1>
        <Link 
          href="#collections" 
          className="group relative px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-sans text-xs font-semibold tracking-widest hover:bg-white hover:text-primary transition-all duration-500 overflow-hidden uppercase"
        >
          <span className="relative z-10">Explore Collection</span>
        </Link>
      </div>
    </header>
  );
}
