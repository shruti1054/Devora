"use client";

import Link from "next/link";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { fmtINR } from "@/lib/format";
import { DELIVERY_FEE, FREE_DELIVERY_ABOVE } from "@/lib/config";

/**
 * De'VORA Cart Drawer
 * – Glass-morphism drawer panel
 * – primary-container / secondary-fixed item thumbnails
 * – Pill quantity controls
 * – Lustre-styled checkout CTA
 */
export default function CartDrawer() {
  const { lines, subtotal, changeQty, remove } = useCart();
  const { cartOpen, closeCart } = useUI();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-on-surface/30 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[90vw] bg-surface z-[70] shadow-lift flex flex-col transition-transform duration-500 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-outline-variant/40">
          <h3 className="font-serif text-2xl text-on-surface">Your Bag</h3>
          <button
            onClick={closeCart}
            className="touch-target w-10 h-10 rounded-pill grid place-items-center text-2xl text-on-surface-variant hover:bg-primary-container hover:text-on-surface transition-all active:scale-95"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {lines.length === 0 ? (
            <p className="text-center text-on-surface-variant font-serif italic text-xl mt-12">
              Your bag is as empty as a quiet shore.
            </p>
          ) : (
            lines.map((l) => (
              <div
                key={l.id + (l.variant ?? "")}
                className="flex gap-4 py-4 border-b border-outline-variant/30"
              >
                {/* Thumbnail */}
                {l.image ? (
                  <div
                    className="w-[70px] h-[70px] rounded-card shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${l.image}')` }}
                  />
                ) : (
                  <div
                    className={`w-[70px] h-[70px] rounded-card shrink-0 grid place-items-center text-2xl ${
                      l.collection === "gold"
                        ? "bg-gradient-to-br from-secondary-fixed to-[#f7eed6]"
                        : "bg-gradient-to-br from-primary-container to-[#fbe3ec]"
                    }`}
                  >
                    {l.icon}
                  </div>
                )}

                {/* Info */}
                <div className="flex-1">
                  <div className="font-serif text-lg leading-tight text-on-surface">{l.name}</div>
                  {l.variant && (
                    <div className="text-xs text-on-surface-variant mb-1">{l.variant}</div>
                  )}
                  <div className="font-semibold text-sm text-on-surface">{fmtINR(l.price)}</div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => changeQty(l.id, l.variant, -1)}
                      className="w-6 h-6 rounded-pill border border-outline-variant bg-surface grid place-items-center hover:bg-primary-container transition-colors"
                      aria-label="Decrease"
                    >−</button>
                    <span className="min-w-[22px] text-center font-medium text-on-surface">{l.qty}</span>
                    <button
                      onClick={() => changeQty(l.id, l.variant, 1)}
                      className="w-6 h-6 rounded-pill border border-outline-variant bg-surface grid place-items-center hover:bg-primary-container transition-colors"
                      aria-label="Increase"
                    >+</button>
                    <button
                      onClick={() => remove(l.id, l.variant)}
                      className="ml-auto text-xs text-on-surface-variant underline hover:text-primary transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-6 border-t border-outline-variant/30 bg-surface-low">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-on-surface-variant font-sans">Subtotal</span>
            <span className="text-on-surface">{fmtINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-on-surface-variant font-sans">Delivery</span>
            <span className="text-on-surface">
              {subtotal >= FREE_DELIVERY_ABOVE ? "Free" : fmtINR(DELIVERY_FEE)}
            </span>
          </div>
          <div className="flex justify-between text-lg mb-4 border-t border-outline-variant/30 pt-4">
            <span className="text-on-surface font-sans font-medium">Total</span>
            <strong className="font-semibold text-on-surface">
              {fmtINR(subtotal + (subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE))}
            </strong>
          </div>
          <Link
            href="/checkout"
            onClick={closeCart}
            className={`btn-pill w-full shimmer-btn text-center ${
              lines.length === 0
                ? "bg-surface-high text-on-surface-variant pointer-events-none"
                : "btn-pill-primary"
            }`}
          >
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
