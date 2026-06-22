"use client";

import Link from "next/link";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { fmtINR } from "@/lib/format";

export default function CartDrawer() {
  const { lines, subtotal, changeQty, remove } = useCart();
  const { cartOpen, closeCart } = useUI();

  return (
    <>
      {/* overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-ink/35 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[90vw] bg-cream z-[70] shadow-lift flex flex-col transition-transform duration-500 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-7 py-6 border-b border-rose/30">
          <h3 className="font-serif text-2xl">Your Bag</h3>
          <button
            onClick={closeCart}
            className="text-2xl leading-none hover:rotate-90 transition-transform"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-5">
          {lines.length === 0 ? (
            <p className="text-center text-muted font-serif italic text-xl mt-12">
              Your bag is as empty as a quiet shore.
            </p>
          ) : (
            lines.map((l) => (
              <div
                key={l.id + (l.variant ?? "")}
                className="flex gap-4 py-4 border-b border-rose/25"
              >
                <div
                  className={`w-[70px] h-[70px] rounded-xl shrink-0 grid place-items-center text-2xl text-ink/35 ${
                    l.collection === "gold"
                      ? "bg-gradient-to-br from-gold-soft to-[#f7eed6]"
                      : "bg-gradient-to-br from-blush to-[#fbe3ec]"
                  }`}
                >
                  {l.icon}
                </div>
                <div className="flex-1">
                  <div className="font-serif text-lg leading-tight">{l.name}</div>
                  {l.variant && (
                    <div className="text-xs text-muted mb-1">{l.variant}</div>
                  )}
                  <div className="font-semibold text-sm">{fmtINR(l.price)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => changeQty(l.id, l.variant, -1)}
                      className="w-6 h-6 rounded-full border border-rose/60 bg-shell grid place-items-center hover:bg-blush"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="min-w-[22px] text-center font-medium">
                      {l.qty}
                    </span>
                    <button
                      onClick={() => changeQty(l.id, l.variant, 1)}
                      className="w-6 h-6 rounded-full border border-rose/60 bg-shell grid place-items-center hover:bg-blush"
                      aria-label="Increase"
                    >
                      +
                    </button>
                    <button
                      onClick={() => remove(l.id, l.variant)}
                      className="ml-auto text-xs text-muted underline hover:text-rose"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-7 py-6 border-t border-rose/30 bg-shell">
          <div className="flex justify-between text-lg mb-4">
            <span>Subtotal</span>
            <strong className="font-semibold">{fmtINR(subtotal)}</strong>
          </div>
          <Link
            href="/checkout"
            onClick={closeCart}
            className={`block text-center rounded-xl py-3 font-medium tracking-wide transition-transform hover:scale-[1.02] ${
              lines.length === 0
                ? "bg-blush/50 text-ink/50 pointer-events-none"
                : "bg-blush text-ink shadow-soft hover:bg-rose hover:text-shell"
            }`}
          >
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
