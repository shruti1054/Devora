"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { getProducts } from "@/lib/store";
import type { Product } from "@/lib/types";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { fmtINR } from "@/lib/format";

function ProductTile({
  product,
  onOpen,
  onQuickAdd,
}: {
  product: Product;
  onOpen: () => void;
  onQuickAdd: (e: React.MouseEvent) => void;
}) {
  return (
    <div onClick={onOpen} className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-surface-container hover-lift aspect-[4/5] border border-outline-variant/15">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        {product.collection === "gold" && (
          <div className="absolute top-2 left-2 lustre-badge px-2 py-0.5 rounded-full text-[9px] font-bold text-secondary uppercase tracking-tighter">
            Gold
          </div>
        )}
        <div className="quick-add-overlay absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-transparent flex items-end p-2 sm:p-3 transition-opacity duration-300">
          <button
            onClick={onQuickAdd}
            className="w-full min-h-[40px] sm:min-h-[44px] py-2 bg-white text-primary rounded-full font-sans text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase shadow-lg active:scale-95 transition-all"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="mt-2 sm:mt-3 text-center px-0.5">
        <p className="font-serif text-[11px] sm:text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {product.name}
        </p>
        <p className="font-sans text-[11px] sm:text-sm text-secondary tracking-wide font-semibold mt-0.5">
          {fmtINR(product.price)}
        </p>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { add } = useCart();
  const { openProduct, openCart, showToast } = useUI();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  if (products.length === 0) return null;

  const featured = products.slice(0, 4);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    add(product, product.variants[0] ?? null);
    showToast(`Added ${product.name} to bag 🐚`);
    openCart();
  };

  return (
    <section className="pt-10 pb-20 md:pt-12 md:pb-32 max-w-container-max mx-auto px-margin-mobile">
      <Reveal>
        <div className="text-center mb-8 md:mb-12">
          <span className="font-sans text-label-sm text-secondary tracking-[0.2em] uppercase block mb-2">
            Curated for You
          </span>
          <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary">
            Current Bestsellers
          </h2>
        </div>
      </Reveal>

      {/* Always 2 columns on mobile — products side by side */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-gutter">
        {featured.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.05}>
            <ProductTile
              product={product}
              onOpen={() => openProduct(product)}
              onQuickAdd={(e) => handleQuickAdd(e, product)}
            />
          </Reveal>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/shop"
          className="inline-flex items-center min-h-[48px] px-8 py-3 border border-primary text-primary rounded-full font-sans text-xs font-semibold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all active:scale-95"
        >
          View All Pieces
        </Link>
      </div>
    </section>
  );
}
