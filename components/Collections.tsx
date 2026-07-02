"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const PREVIEW_PIECES = [
  { href: "/shop?c=gold", image: "/products/1.jpg", label: "Golden Heart Ring" },
  { href: "/shop?c=gold", image: "/products/3.jpg", label: "Shell Earring" },
];

export default function Collections() {
  return (
    <section id="collections" className="py-14 md:py-20 bg-surface-container-low overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
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
              className="inline-flex items-center min-h-[44px] font-sans text-label-sm text-primary border-b border-primary hover:border-secondary transition-all uppercase tracking-widest font-semibold py-2"
            >
              VIEW ALL PIECES
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Link href="/shop?c=gold" className="relative block group cursor-pointer overflow-hidden rounded-2xl shadow-soft">
            <div
              className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] w-full bg-cover bg-center transition-transform duration-[12s] group-hover:scale-105"
              style={{ backgroundImage: "url('/products/4.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 sm:right-auto">
              <div className="lustre-badge px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-2 sm:mb-4 inline-block">
                <span className="text-on-surface font-sans text-[10px] tracking-widest font-semibold uppercase">
                  LIMITED EDITION
                </span>
              </div>
              <h3 className="font-serif text-white text-xl sm:text-[24px] md:text-headline-md tracking-wide leading-tight">
                Treasures of the Tides
              </h3>
            </div>
          </Link>
        </Reveal>

        {/* Side-by-side product previews on all screen sizes */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {PREVIEW_PIECES.map((piece, i) => (
            <Reveal key={piece.label} delay={0.2 + i * 0.05}>
              <Link
                href={piece.href}
                className="group relative block overflow-hidden rounded-xl aspect-[4/5] border border-outline-variant/20 shadow-soft hover-lift"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${piece.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-serif text-white text-xs sm:text-sm tracking-wide">{piece.label}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
