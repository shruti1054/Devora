"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { getProducts } from "@/lib/store";
import { CATEGORY_LABELS } from "@/lib/config";
import type { Product, Category, Collection } from "@/lib/types";

const CATS: { value: Category | "all"; label: string }[] = [
  { value: "all",        label: "All Items" },
  { value: "rings",      label: CATEGORY_LABELS.rings },
  { value: "earrings",   label: CATEGORY_LABELS.earrings },
  { value: "neckpieces", label: CATEGORY_LABELS.neckpieces },
  { value: "bangles",    label: CATEGORY_LABELS.bangles },
  { value: "armcuffs",   label: CATEGORY_LABELS.armcuffs },
];
const COLS: { value: Collection | "all"; label: string }[] = [
  { value: "all",    label: "All Collections" },
  { value: "pastel", label: "Pastel Beach" },
  { value: "gold",   label: "Golden Beach" },
];

export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [cat, setCat]           = useState<Category | "all">("all");
  const [col, setCol]           = useState<Collection | "all">("all");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c === "pastel" || c === "gold") setCol(c);
    getProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (p) =>
      (cat === "all" || p.category === cat) &&
      (col === "all" || p.collection === col)
  );

  return (
    <section className="w-full">
      {/* 1. Shop Page Hero Section (matching golden_beach_collection template) */}
      <div className="relative h-[530px] flex items-center justify-center overflow-hidden mb-20 px-margin-mobile">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100" 
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmHsByRA1jsL6e1E5WZh9-sTEMVfOB8vohI3ELHiWVf5o5rNXh7VUMoj-zNpuiBP6peoQIzJEb6vOlQw-JSlbi_AyLrbi9cq1SIsjC1vqvRdEg8iAz1etFlJND8UF77-Rb8NB7DPNz2Lvh9SYFvvMo-CITfLKMoPpauPhS2-cqb5M5TTTbaI2vD1mKbHKWneYWTeVNeZltHds_YGhhEKvpCcfM0V2ls_pDineUuVQlZT8BaUe-70dPB45DjXEnCc8epAc4ugcZoz4')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/80"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-6 max-w-2xl">
          <div className="inline-block px-4 py-1.5 lustre-badge rounded-full text-label-sm text-secondary uppercase tracking-[0.2em] mb-4">
            New Arrivals
          </div>
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface leading-tight font-medium">
            {col === "gold" ? "Golden Beach" : col === "pastel" ? "Pastel Beach" : "The Collections"}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Hand-crafted artifacts inspired by the rhythm of the tides and the soft textures of the shoreline.
          </p>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12">
        {/* 2. Collection Filters */}
        <div className="flex justify-center gap-4 mb-8">
          {COLS.map((c) => (
            <button
              key={c.value}
              onClick={() => setCol(c.value)}
              className={`font-sans text-label-sm pb-1 tracking-widest uppercase transition-all ${
                col === c.value
                  ? "text-secondary border-b border-secondary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 3. Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-6 pb-4 border-b border-outline-variant/30">
          {CATS.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={`font-sans text-label-sm pb-1 tracking-widest uppercase transition-all ${
                cat === c.value
                  ? "text-secondary border-b border-secondary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 4. Product Listings Grid */}
        {loading ? (
          <p className="text-center text-on-surface-variant font-serif italic text-xl py-20">
            Gathering treasures…
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-on-surface-variant font-serif italic text-xl py-20">
            No pieces match — try another tide.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-gutter mt-16">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
