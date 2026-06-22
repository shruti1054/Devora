import type { Product } from "./types";

// Seed catalogue. Used directly in demo mode, and as the one-click
// seed for Firestore when you click "Seed sample products" in /admin.
// Edit freely — or manage everything from /admin once Firebase is set up.
export const SEED_PRODUCTS: Product[] = [
  // ---------- Pastel Beach Collection ----------
  {
    id: "p1",
    name: "Pearl Shore Ring",
    category: "rings",
    collection: "pastel",
    price: 899,
    description:
      "A delicate ring inspired by pearls kissed by sea foam. Soft, luminous, and made to catch the light.",
    variants: ["5", "6", "7", "8"],
    icon: "💍",
  },
  {
    id: "p2",
    name: "Blush Tide Earrings",
    category: "earrings",
    collection: "pastel",
    price: 749,
    description:
      "Featherlight drops in the softest blush, like the first pink of a coastal dawn.",
    variants: [],
    icon: "🌸",
  },
  {
    id: "p3",
    name: "Lavender Wave Necklace",
    category: "neckpieces",
    collection: "pastel",
    price: 1299,
    description:
      "A flowing neckpiece carrying the calm of lavender waves at dusk.",
    variants: ['16"', '18"', '20"'],
    icon: "📿",
  },
  {
    id: "p4",
    name: "Mint Seafoam Bangle",
    category: "bangles",
    collection: "pastel",
    price: 1099,
    description:
      "A bold hand bangle in cool mint — substantial, sculptural, and endlessly summery.",
    variants: ["S", "M", "L"],
    icon: "🪸",
  },
  {
    id: "p5",
    name: "Pastel Dune Arm Cuff",
    category: "armcuffs",
    collection: "pastel",
    price: 1499,
    description:
      "An adjustable arm cuff that wraps the upper arm like a soft dune ridge.",
    variants: ["Adjustable"],
    icon: "🐚",
  },
  {
    id: "p6",
    name: "Coral Whisper Ring",
    category: "rings",
    collection: "pastel",
    price: 829,
    description:
      "A whisper-thin band brushed with the palest coral — barely there, never forgotten.",
    variants: ["5", "6", "7", "8"],
    icon: "💍",
  },
  // ---------- Gold Beach Collection ----------
  {
    id: "g1",
    name: "Golden Hour Ring",
    category: "rings",
    collection: "gold",
    price: 1199,
    description:
      "Warm gold that glows like the last light over the water. A keepsake of golden hour.",
    variants: ["5", "6", "7", "8"],
    icon: "💍",
  },
  {
    id: "g2",
    name: "Sunlit Shell Earrings",
    category: "earrings",
    collection: "gold",
    price: 999,
    description:
      "Shell-form studs cast in warm gold — a sunlit souvenir for the ears.",
    variants: [],
    icon: "🐚",
  },
  {
    id: "g3",
    name: "Amber Coast Necklace",
    category: "neckpieces",
    collection: "gold",
    price: 1799,
    description:
      "A statement neckpiece in amber-gold, echoing sand warmed by the afternoon sun.",
    variants: ['16"', '18"', '20"'],
    icon: "📿",
  },
  {
    id: "g4",
    name: "Gilded Surf Bangle",
    category: "bangles",
    collection: "gold",
    price: 1599,
    description:
      "A bold gold hand bangle with the rolling curve of a breaking wave.",
    variants: ["S", "M", "L"],
    icon: "🌊",
  },
  {
    id: "g5",
    name: "Sandbar Arm Cuff",
    category: "armcuffs",
    collection: "gold",
    price: 1999,
    description:
      "A sculpted gold arm cuff inspired by the smooth lines of a tidal sandbar.",
    variants: ["Adjustable"],
    icon: "✨",
  },
  {
    id: "g6",
    name: "Driftwood Gold Ring",
    category: "rings",
    collection: "gold",
    price: 1049,
    description:
      "Organic, textured gold band shaped like sea-smoothed driftwood.",
    variants: ["5", "6", "7", "8"],
    icon: "💍",
  },
];
