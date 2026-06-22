import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-gradient-to-b from-cream to-[#fbeef0]">
      <div className="max-w-[1280px] mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div>
              <span className="block font-serif italic text-rose tracking-[0.18em] mb-2">
                our story
              </span>
              <h2 className="font-serif font-light text-[clamp(2.2rem,4vw,3rem)] mb-6">
                Born at the shore
              </h2>
              <p className="text-ink/85 text-lg mb-5">
                De&apos;Vora was born from the feeling of standing barefoot at
                the shore, the gold light on the water, the salt in the air.
                Every piece is made to carry that feeling wherever you go.
              </p>
              <p className="text-ink/85 mb-5">
                We design slowly and softly — coastal jewellery that feels like
                a quiet morning by the ocean, made to be worn every day and
                remembered for a lifetime.
              </p>
              <p className="font-serif italic text-rose text-xl">
                — Shruti &amp; Co-founder
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="aspect-[4/5] rounded-card bg-gradient-to-br from-blush to-gold-soft grid place-items-center text-7xl text-shell/70 shadow-soft">
              🌊
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
