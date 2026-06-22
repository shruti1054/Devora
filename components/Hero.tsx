"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/config";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<
    { left: string; size: number; dur: number; delay: number; op: number }[]
  >([]);

  useEffect(() => {
    const count = window.innerWidth < 600 ? 16 : 30;
    setParticles(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100 + "%",
        size: 3 + Math.random() * 7,
        dur: 9 + Math.random() * 12,
        delay: -Math.random() * 15,
        op: 0.3 + Math.random() * 0.5,
      }))
    );

    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const ratio = Math.min(Math.max(1 - window.scrollY / (window.innerHeight * 0.7), 0), 1);
      el.style.opacity = String(ratio);
      el.style.transform = `translateY(${(1 - ratio) * 40}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="hero-gradient relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* glow vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(255,250,247,0.35),transparent_60%)]" />

      {/* particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.op,
            }}
          />
        ))}
      </div>

      <div ref={contentRef} className="relative z-10 px-6">
        <h1 className="font-serif font-light leading-none tracking-[0.15em] text-ink text-[clamp(3.5rem,11vw,6.5rem)] mb-5">
          {BRAND.name}
        </h1>
        <p className="font-sans italic text-ink/85 tracking-wide text-[clamp(1.1rem,2.5vw,1.5rem)] mb-10">
          {BRAND.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop?c=pastel"
            className="rounded-xl px-8 py-3.5 font-medium tracking-wide bg-blush text-ink shadow-soft hover:bg-rose hover:text-shell transition-all hover:scale-[1.02]"
          >
            Shop Pastel Collection
          </Link>
          <Link
            href="/shop?c=gold"
            className="rounded-xl px-8 py-3.5 font-medium tracking-wide bg-gold text-shell shadow-soft hover:bg-[#b8973f] transition-all hover:scale-[1.02]"
          >
            Shop Gold Collection
          </Link>
        </div>
      </div>

      <Link
        href="/#collections"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-ink/60 animate-bob"
        aria-label="Scroll down"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>
    </header>
  );
}
