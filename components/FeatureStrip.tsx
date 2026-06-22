const ITEMS = [
  "✦ Handmade by the shore",
  "✦ UPI payments accepted",
  "✦ Free shipping over ₹2000",
  "✦ Pastel & Gold collections",
  "✦ Coastal jewellery, every day",
  "✦ Wear the shore",
];

/**
 * De'VORA Feature Strip
 * – secondary-container (gold) background
 * – DM Sans label-sm uppercase
 */
export default function FeatureStrip() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-pause bg-secondary-container py-3.5 overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {loop.map((t, i) => (
          <span
            key={i}
            className="font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-on-surface px-6"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
