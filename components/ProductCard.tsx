"use client";

import { useState } from "react";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { fmtINR } from "@/lib/format";
import { CATEGORY_LABELS } from "@/lib/config";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { openProduct, openCart, showToast } = useUI();
  const [wished, setWished] = useState(false);
  const isGold = product.collection === "gold";

  return (
    <article className="group bg-shell rounded-card overflow-hidden shadow-soft flex flex-col transition-all duration-400 hover:-translate-y-2 hover:shadow-lift">
      <div
        onClick={() => openProduct(product)}
        className={`relative aspect-square grid place-items-center text-6xl text-ink/35 cursor-pointer ${
          isGold
            ? "bg-gradient-to-br from-gold-soft to-[#f7eed6]"
            : "bg-gradient-to-br from-blush to-[#fbe3ec]"
        }`}
      >
        <span>{product.icon}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWished((w) => !w);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-shell/85 grid place-items-center transition-all ${
            wished
              ? "text-rose opacity-100"
              : "text-muted opacity-0 group-hover:opacity-100"
          }`}
          aria-label="Wishlist"
        >
          ♥
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="font-serif italic text-sm text-rose tracking-wide">
          {CATEGORY_LABELS[product.category]}
        </span>
        <h3
          onClick={() => openProduct(product)}
          className="font-serif text-2xl cursor-pointer mb-1"
        >
          {product.name}
        </h3>
        <span className="font-semibold mb-4">{fmtINR(product.price)}</span>
        <button
          onClick={() => {
            add(product, product.variants[0] ?? null);
            showToast("Added to your shore 🐚");
            openCart();
          }}
          className={`mt-auto rounded-xl py-3 font-medium transition-transform hover:scale-[1.02] ${
            isGold
              ? "bg-gold text-shell shadow-soft hover:bg-[#b8973f]"
              : "bg-blush text-ink shadow-soft hover:bg-rose hover:text-shell"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
