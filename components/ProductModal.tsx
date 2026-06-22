"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { fmtINR } from "@/lib/format";
import { CATEGORY_LABELS, COLLECTION_LABELS } from "@/lib/config";

export default function ProductModal() {
  const { modalProduct, closeProduct, openCart, showToast } = useUI();
  const { add } = useCart();
  const router = useRouter();
  const [variant, setVariant] = useState<string | null>(null);

  useEffect(() => {
    setVariant(
      modalProduct && modalProduct.variants.length
        ? modalProduct.variants[0]
        : null
    );
  }, [modalProduct]);

  const open = Boolean(modalProduct);
  const p = modalProduct;
  const isGold = p?.collection === "gold";

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProduct();
      }}
      className={`fixed inset-0 z-[80] bg-on-surface/35 backdrop-blur-sm grid place-items-center p-6 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {p && (
        <div
          className={`bg-surface rounded-card max-w-3xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2 transition-transform duration-300 ${
            open ? "scale-100" : "scale-95"
          }`}
        >
          {/* Image Area */}
          <div
            className={`aspect-square grid place-items-center text-7xl text-on-surface/20 relative overflow-hidden ${
              isGold
                ? "bg-gradient-to-br from-secondary-fixed to-[#f7eed6]"
                : "bg-gradient-to-br from-primary-container to-[#fbe3ec]"
            }`}
          >
            {/* Soft highlight overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_55%)]" />
            {/* Decorative ring frame */}
            <div className="absolute w-[62%] aspect-square rounded-full border border-white/35" />
            <span className="relative z-10">{p.icon}</span>
          </div>

          <div className="p-8 relative">
            <button
              onClick={closeProduct}
              className="absolute top-4 right-4 w-9 h-9 rounded-pill glass-morphism grid place-items-center text-xl hover:bg-primary-container hover:rotate-90 transition-all duration-200"
              aria-label="Close"
            >
              ×
            </button>

            {/* Collection Badge */}
            <span
              className="inline-block lustre-badge text-[0.65rem] font-semibold tracking-[0.1em] uppercase rounded-pill px-4 py-1.5 mb-4 text-on-surface"
            >
              {COLLECTION_LABELS[p.collection]} Collection
            </span>

            {/* Product Name */}
            <h2 className="font-serif text-3xl font-semibold mb-1 text-on-surface">{p.name}</h2>
            {/* Category label */}
            <div className="font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-primary mb-3">
              {CATEGORY_LABELS[p.category]}
            </div>
            {/* Price */}
            <div className="text-2xl font-serif font-semibold mb-4 text-on-surface">{fmtINR(p.price)}</div>
            {/* Description */}
            <p className="text-on-surface-variant mb-6">{p.description}</p>

            {/* Subtle specs from details template */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/30 mb-6">
              <div>
                <p className="font-sans text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-on-surface-variant opacity-60 mb-1">Material</p>
                <p className="font-sans text-xs font-semibold text-on-surface">18k Gold Plated Brass</p>
              </div>
              <div>
                <p className="font-sans text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-on-surface-variant opacity-60 mb-1">Origin</p>
                <p className="font-sans text-xs font-semibold text-on-surface">Handcrafted Artisanal</p>
              </div>
            </div>


            {p.variants.length > 0 && (
              <div className="mb-6">
                <label className="block font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-on-surface-variant mb-2">
                  Select size / variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {p.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`rounded-pill px-4 py-1.5 text-xs font-semibold tracking-wide border transition-all duration-200 ${
                        variant === v
                          ? "bg-secondary text-on-secondary border-secondary shadow-soft"
                          : "bg-surface border-outline-variant text-on-surface-variant hover:border-secondary hover:text-on-surface"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  add(p, variant);
                  showToast("Added to your shore 🐚");
                  closeProduct();
                  openCart();
                }}
                className="btn-pill btn-pill-primary shimmer-btn flex-1 min-w-[140px]"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  add(p, variant);
                  closeProduct();
                  router.push("/checkout");
                }}
                className="btn-pill shimmer-btn flex-1 min-w-[140px] border border-outline text-on-surface hover:bg-primary-container transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
