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
      className={`fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm grid place-items-center p-6 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {p && (
        <div
          className={`bg-shell rounded-card max-w-3xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2 transition-transform duration-300 ${
            open ? "scale-100" : "scale-95"
          }`}
        >
          <div
            className={`aspect-square grid place-items-center text-7xl text-ink/30 ${
              isGold
                ? "bg-gradient-to-br from-gold-soft to-[#f7eed6]"
                : "bg-gradient-to-br from-blush to-[#fbe3ec]"
            }`}
          >
            {p.icon}
          </div>

          <div className="p-8 relative">
            <button
              onClick={closeProduct}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream grid place-items-center text-xl hover:bg-blush hover:rotate-90 transition-all"
              aria-label="Close"
            >
              ×
            </button>

            <span
              className={`inline-block rounded-pill px-4 py-1 text-xs tracking-wide mb-4 ${
                isGold ? "bg-gold-soft" : "bg-blush"
              }`}
            >
              {COLLECTION_LABELS[p.collection]} Collection
            </span>

            <h2 className="font-serif text-4xl font-light mb-1">{p.name}</h2>
            <div className="font-serif italic text-rose mb-3">
              {CATEGORY_LABELS[p.category]}
            </div>
            <div className="text-2xl font-semibold mb-4">{fmtINR(p.price)}</div>
            <p className="text-ink/80 mb-6">{p.description}</p>

            {p.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm text-muted mb-2">
                  Select size / variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {p.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`rounded-pill px-4 py-1.5 text-sm border transition-colors ${
                        variant === v
                          ? "bg-rose text-shell border-rose"
                          : "bg-cream border-rose/50 hover:border-rose"
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
                className={`flex-1 min-w-[140px] rounded-xl py-3 font-medium transition-transform hover:scale-[1.02] ${
                  isGold
                    ? "bg-gold text-shell shadow-soft hover:bg-[#b8973f]"
                    : "bg-blush text-ink shadow-soft hover:bg-rose hover:text-shell"
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  add(p, variant);
                  closeProduct();
                  router.push("/checkout");
                }}
                className="flex-1 min-w-[140px] rounded-xl py-3 font-medium border border-rose hover:bg-blush transition-colors"
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
