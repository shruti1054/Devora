"use client";

import Link from "next/link";
import { useUI } from "./ui/UIContext";

export default function MobileNavAndFAB() {
  const { openCart } = useUI();

  return (
    <>
      {/* 1. Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 w-full z-[40] bg-surface/80 backdrop-blur-2xl rounded-t-full shadow-[0_-4px_15px_rgba(212,175,55,0.08)]">
        <div className="flex justify-around items-center py-3 px-4">
          <Link 
            href="/" 
            className="flex flex-col items-center justify-center text-primary transition-all active:scale-90"
          >
            <span className="material-symbols-outlined select-none text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              storefront
            </span>
            <span className="font-sans text-[10px] tracking-wider uppercase mt-1">Boutique</span>
          </Link>
          <Link 
            href="/shop" 
            className="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-primary transition-all active:scale-90"
          >
            <span className="material-symbols-outlined select-none text-xl">
              search
            </span>
            <span className="font-sans text-[10px] tracking-wider uppercase mt-1">Search</span>
          </Link>
          <button 
            onClick={openCart}
            className="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-primary transition-all active:scale-90"
          >
            <span className="material-symbols-outlined select-none text-xl">
              shopping_basket
            </span>
            <span className="font-sans text-[10px] tracking-wider uppercase mt-1">Bag</span>
          </button>
        </div>
      </nav>

      {/* 2. Floating Action Button (FAB) with auto_awesome icon */}
      <button 
        onClick={() => openCart()}
        className="fixed bottom-24 right-6 md:bottom-12 md:right-12 z-40 lustre-badge p-4 rounded-full shadow-lg active:scale-90 transition-transform group flex items-center justify-center"
        aria-label="Aesthetic Quick Action"
      >
        <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform text-2xl select-none" style={{ fontVariationSettings: "'FILL' 0" }}>
          auto_awesome
        </span>
      </button>
    </>
  );
}
