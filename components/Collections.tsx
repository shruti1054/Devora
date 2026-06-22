import Link from "next/link";
import Reveal from "./Reveal";

export default function Collections() {
  return (
    <section id="collections" className="max-w-[1280px] mx-auto px-6 py-28">
      <Reveal>
        <span className="block text-center font-serif italic text-rose tracking-[0.18em] mb-2">
          curated by the sea
        </span>
        <h2 className="text-center font-serif font-light text-[clamp(2.4rem,5vw,3.6rem)] tracking-wide">
          Our Collections
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8 mt-14">
        <Reveal>
          <Link
            href="/shop?c=pastel"
            className="group block rounded-card p-12 min-h-[420px] flex flex-col justify-end relative overflow-hidden bg-gradient-to-br from-blush to-[#fbe0e8] transition-all duration-500 hover:-translate-y-2.5 hover:shadow-lift"
          >
            <span className="absolute top-8 right-8 text-5xl opacity-50">🐚</span>
            <span className="font-serif italic tracking-[0.14em] text-muted mb-1">
              Soft &amp; dreamy
            </span>
            <h3 className="font-serif font-light text-4xl mb-1">Pastel Beach</h3>
            <p className="text-ink/70 mb-6 text-sm">
              Pinks, lavender, mint &amp; pearl
            </p>
            <span className="self-start rounded-xl px-7 py-3 font-medium bg-blush text-ink shadow-soft group-hover:bg-rose group-hover:text-shell transition-colors">
              Explore
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/shop?c=gold"
            className="group block rounded-card p-12 min-h-[420px] flex flex-col justify-end relative overflow-hidden bg-gradient-to-br from-gold-soft to-[#f6ecd2] transition-all duration-500 hover:-translate-y-2.5 hover:shadow-lift"
          >
            <span className="absolute top-8 right-8 text-5xl opacity-50">✨</span>
            <span className="font-serif italic tracking-[0.14em] text-muted mb-1">
              Warm &amp; golden
            </span>
            <h3 className="font-serif font-light text-4xl mb-1">Gold Beach</h3>
            <p className="text-ink/70 mb-6 text-sm">Warm gold coastal tones</p>
            <span className="self-start rounded-xl px-7 py-3 font-medium bg-gold text-shell shadow-soft group-hover:bg-[#b8973f] transition-colors">
              Explore
            </span>
          </Link>
        </Reveal>
      </div>

      <Reveal>
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block rounded-xl px-8 py-3.5 font-medium border border-rose hover:bg-blush transition-colors"
          >
            View All Pieces
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
