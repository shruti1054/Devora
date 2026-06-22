"use client";

import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-margin-mobile max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Column: Round Image Frame */}
        <div className="order-2 md:order-1 flex justify-center">
          <Reveal>
            <div className="relative w-full max-w-[400px] aspect-square rounded-full border border-secondary/20 p-8 flex items-center justify-center group overflow-hidden bg-surface-low">
              {/* Soft decorative background illustration/logo styling */}
              <span className="text-8xl select-none transition-transform duration-700 group-hover:scale-110">🐚</span>
              <div className="absolute inset-0 border-[0.5px] border-secondary/10 rounded-full scale-110 opacity-50 pointer-events-none"></div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Copywriting */}
        <div className="order-1 md:order-2">
          <Reveal delay={0.1}>
            <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary mb-6">
              Inspired by the Golden Horizon
            </h2>
            <p className="font-sans text-body-lg text-on-surface-variant mb-8 leading-relaxed max-w-lg">
              Our pieces are crafted to capture the fleeting moments of beauty where the sun meets the sea. Each jewel is a testament to the organic fluidity of the shore and the structured brilliance of fine artistry.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-primary-container text-on-primary-container rounded-full font-sans text-[10px] font-semibold tracking-wider uppercase">
                HAND-CRAFTED
              </span>
              <span className="px-4 py-2 bg-surface-container-high text-primary rounded-full font-sans text-[10px] font-semibold tracking-wider uppercase">
                SUSTAINABLE GOLD
              </span>
              <span className="px-4 py-2 bg-surface-container-high text-primary rounded-full font-sans text-[10px] font-semibold tracking-wider uppercase">
                ARTISANAL PROCESS
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
