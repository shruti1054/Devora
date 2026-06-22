"use client";

import Link from "next/link";
import Reveal from "./Reveal";

export default function Collections() {
  return (
    <section id="collections" className="py-20 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-margin-mobile">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <Reveal>
            <div>
              <span className="font-sans text-label-sm text-secondary tracking-widest uppercase block">
                New Arrivals
              </span>
              <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary mt-2">
                The Golden Hour Collection
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link 
              href="/shop" 
              className="font-sans text-label-sm text-primary border-b border-primary hover:pb-1 transition-all uppercase tracking-widest font-semibold"
            >
              VIEW ALL PIECES
            </Link>
          </Reveal>
        </div>

        {/* Full-width interactive hero card */}
        <Reveal delay={0.2}>
          <Link href="/shop?c=gold" className="relative block group cursor-pointer overflow-hidden rounded-xl">
            <div 
              className="aspect-[16/9] md:aspect-[21/9] w-full bg-cover bg-center transition-transform duration-[12s] group-hover:scale-105" 
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkbIocf3Ii7AdPC7J1eDEa2tfCtm4S7yOzVsSOXgyhsrzqylXyr3SspoFK8d86JdYwqeu2gCSmnczd6kH3K3m8tbySRgjcSEUDPETD3HDzss9hDl0cVS4Rcyf_9FYfQHZ-LWVLyUgUhQGtlTc6vYM5QJxlBJ67M2uglaWqrAWrPITVaWcvB4ZLDRcNW-C0uhqE076J-T203LUhZtCnbL20L7JnN50PMZ-JRiFharrfAq4tpxkmUWGztRPM1uyoLn75-9Z2BrZeM8o')",
              }}
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            
            {/* Overlay texts */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <div className="lustre-badge px-6 py-2 rounded-full mb-4 inline-block">
                <span className="text-on-surface font-sans text-[10px] tracking-widest font-semibold uppercase">
                  LIMITED EDITION
                </span>
              </div>
              <h3 className="font-serif text-white text-[24px] md:text-headline-md tracking-wide">
                Treasures of the Tides
              </h3>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
