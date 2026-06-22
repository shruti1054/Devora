"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { getProducts } from "@/lib/store";
import { CATEGORY_LABELS } from "@/lib/config";
import type { Product, Category, Collection } from "@/lib/types";

const CATS: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "rings", label: CATEGORY_LABELS.rings },
  { value: "earrings", label: CATEGORY_LABELS.earrings },
  { value: "neckpieces", label: CATEGORY_LABELS.neckpieces },
  { value: "bangles", label: CATEGORY_LABELS.bangles },
  { value: "armcuffs", label: CATEGORY_LABELS.armcuffs },
];
const COLS: { value: Collection | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pastel", label: "Pastel Beach" },
  { value: "gold", label: "Gold Beach" },
];

export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<Category | "all">("all");
  const [col, setCol] = useState<Collection | "all">("all");

  useEffect(() => {
    // preselect collection from ?c=pastel / ?c=gold
    const c = new URLSearchParams(window.location.search).get("c");
    if (c === "pastel" || c === "gold") setCol(c);

    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (p) =>
      (cat === "all" || p.category === cat) &&
      (col === "all" || p.collection === col)
  );

  const chip = (active: boolean) =>
    `rounded-pill px-4 py-2 text-sm tracking-wide border transition-all hover:-translate-y-0.5 ${
      active
        ? "bg-rose text-shell border-rose"
        : "bg-shell border-rose/40 hover:border-rose"
    }`;

  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-28 pb-12">
      <span className="block text-center font-serif italic text-rose tracking-[0.18em] mb-2">
        treasures from the tide
      </span>
      <h2 className="text-center font-serif font-light text-[clamp(2.4rem,5vw,3.6rem)] tracking-wide">
        Shop the Collections
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
        <div className="flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={chip(cat === c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:ml-6 md:pl-6 md:border-l md:border-muted/30">
          {COLS.map((c) => (
            <button
              key={c.value}
              onClick={() => setCol(c.value)}
              className={chip(col === c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-muted font-serif italic text-xl py-20">
          Gathering treasures…
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted font-serif italic text-xl py-20">
          No pieces match — try another tide.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
