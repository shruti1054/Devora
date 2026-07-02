"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { BRAND } from "@/lib/config";

const MOSAIC = [
  { src: "/products/4.jpg", alt: "Golden pendant collection", span: "col-span-2 row-span-1 aspect-[16/10]" },
  { src: "/products/3.jpg", alt: "Shell earring", span: "col-span-1 aspect-square" },
  { src: "/products/6.jpg", alt: "Spiral arm cuff", span: "col-span-1 aspect-square" },
];

export default function About() {
  return (
    <section id="about" className="py-12 md:py-24 px-margin-mobile max-w-container-max mx-auto overflow-hidden">
      <div className="relative rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary-container/40 via-surface to-secondary-fixed/25 p-5 sm:p-8 md:p-12 border border-outline-variant/25 shadow-soft overflow-hidden">
        {/* Soft ambient glow */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary-container/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-w-0">
          {/* Copy — first on mobile */}
          <div className="order-1 md:order-2 min-w-0">
            <Reveal>
              <span className="font-sans text-label-sm text-secondary tracking-[0.2em] uppercase block mb-3">
                Our Story
              </span>
              <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary mb-4 md:mb-5 leading-tight break-words">
                Inspired by the Golden Horizon
              </h2>
              <p className="font-sans text-body-md md:text-body-lg text-on-surface-variant mb-6 md:mb-8 leading-relaxed break-words">
                {BRAND.name} captures fleeting moments where sun meets sea — organic shorelines shaped into fine coastal jewellery you can wear every day.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Hand-crafted", "Sustainable Gold", "Artisanal Process"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-2 bg-surface/80 backdrop-blur-sm border border-outline-variant/30 text-primary rounded-full font-sans text-[10px] font-semibold tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center min-h-[44px] mt-6 px-6 py-2.5 bg-primary text-on-primary rounded-full font-sans text-xs font-semibold tracking-widest uppercase shadow-md hover:bg-primary/90 active:scale-95 transition-all"
              >
                Shop the Collection
              </Link>
            </Reveal>
          </div>

          {/* Coastal product mosaic */}
          <div className="order-2 md:order-1 min-w-0">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-[340px] mx-auto md:max-w-none">
                {MOSAIC.map((item) => (
                  <div
                    key={item.src}
                    className={`${item.span} relative rounded-xl overflow-hidden border border-white/60 shadow-soft group`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${item.src}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
