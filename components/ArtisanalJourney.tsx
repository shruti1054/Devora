"use client";

import Reveal from "./Reveal";

export default function ArtisanalJourney() {
  return (
    <section className="py-32 bg-primary-container/20 relative overflow-hidden">
      {/* Blurred glow background nodes */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto text-center px-margin-mobile relative z-10">
        <Reveal>
          <span className="material-symbols-outlined text-secondary text-4xl mb-6 select-none" style={{ fontVariationSettings: "'FILL' 0" }}>
            waves
          </span>
          <h2 className="font-serif text-headline-lg-mobile md:text-[48px] text-primary mb-8 tracking-wide font-medium">
            Our Artisanal Journey
          </h2>
          <p className="font-serif italic text-body-lg text-on-surface-variant mb-12 leading-loose">
            &quot;Every curve and texture in our coastal series is hand-modeled to reflect the unique imperfections found in nature. We believe in jewelry that breathes with you, carrying the warmth of the sun and the whisper of the waves wherever you go.&quot;
          </p>
          <button className="btn-pill btn-pill-primary shadow-lift active:scale-95 transition-all">
            LEARN OUR STORY
          </button>
        </Reveal>
      </div>
    </section>
  );
}
