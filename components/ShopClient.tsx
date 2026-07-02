"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  useEffect(() => {
    const catParam = searchParams.get("category") as Category | null;
    const colParam = searchParams.get("c");

    if (catParam && CATS.some((c) => c.value === catParam)) {
      setCat(catParam);
    } else {
      setCat("all");
    }

    if (colParam === "pastel" || colParam === "gold") {
      setCol(colParam);
    } else {
      setCol("all");
    }
  }, [searchParams]);

  useEffect(() => {
    getProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (p) =>
      (cat === "all" || p.category === cat) &&
      (col === "all" || p.collection === col)
  );

  const filterBtnClass = (active: boolean) =>
    `shrink-0 font-sans text-label-sm px-3 py-2.5 min-h-[44px] tracking-widest uppercase transition-all rounded-full ${
      active
        ? "text-secondary bg-secondary-fixed/30 border border-secondary/30"
        : "text-on-surface-variant hover:text-primary hover:bg-primary-container/30"
    }`;

  return (
    <section className="w-full">
      {/* Shop Hero */}
      <div className="relative min-h-[45vh] max-h-[420px] sm:min-h-[50vh] sm:max-h-[530px] flex items-center justify-center overflow-hidden mb-12 sm:mb-20 px-margin-mobile pt-20">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmHsByRA1jsL6e1E5WZh9-sTEMVfOB8vohI3ELHiWVf5o5rNXh7VUMoj-zNpuiBP6peoQIzJEb6vOlQw-JSlbi_AyLrbi9cq1SIsjC1vqvRdEg8iAz1etFlJND8UF77-Rb8NB7DPNz2Lvh9SYFvvMo-CITfLKMoPpauPhS2-cqb5M5TTTbaI2vD1mKbHKWneYWTeVNeZltHds_YGhhEKvpCcfM0V2ls_pDineUuVQlZT8BaUe-70dPB45DjXEnCc8epAc4ugcZoz4')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-surface/90" />
        </div>

        <div className="relative z-10 text-center space-y-4 sm:space-y-6 max-w-2xl px-2">
          <div className="inline-block px-4 py-1.5 lustre-badge rounded-full text-label-sm text-secondary uppercase tracking-[0.2em]">
            New Arrivals
          </div>
          <h1 className="font-serif text-headline-lg-mobile sm:text-headline-lg md:text-display-lg text-on-surface leading-tight font-medium">
            {col === "gold" ? "Golden Beach" : col === "pastel" ? "Pastel Beach" : "The Collections"}
          </h1>
          <p className="font-sans text-body-md sm:text-body-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            Hand-crafted artifacts inspired by the rhythm of the tides and the soft textures of the shoreline.
          </p>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12">
        {/* Collection Filters — horizontal scroll on mobile */}
        <div className="flex overflow-x-auto no-scrollbar justify-start sm:justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 pb-2 -mx-1 px-1">
          {COLS.map((c) => (
            <button
              key={c.value}
              onClick={() => setCol(c.value)}
              className={filterBtnClass(col === c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Category Filters — horizontal scroll on mobile */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 sm:flex-wrap sm:justify-center pb-4 border-b border-outline-variant/30 -mx-1 px-1">
          {CATS.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={filterBtnClass(cat === c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center text-on-surface-variant font-serif italic text-lg sm:text-xl py-16 sm:py-20">
            Gathering treasures…
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-on-surface-variant font-serif italic text-lg sm:text-xl py-16 sm:py-20">
            No pieces match — try another tide.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-4 md:gap-x-gutter md:gap-y-16 mt-10 sm:mt-16">
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
