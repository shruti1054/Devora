"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { CONTACT_MAILTO } from "@/lib/config";

export default function MobileNavAndFAB() {
  const { openCart } = useUI();
  const { count } = useCart();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: "storefront", filled: true, isLink: true },
    { href: "/shop", label: "Shop", icon: "grid_view", filled: false, isLink: true },
    { href: CONTACT_MAILTO, label: "Contact", icon: "mail", filled: false, isLink: false },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface/95 backdrop-blur-2xl border-t border-outline-variant/20 shadow-[0_-4px_20px_rgba(212,175,55,0.08)] safe-bottom">
        <div className="flex justify-around items-stretch px-1 pt-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/shop"
                  ? pathname === "/shop"
                  : false;

            const className = `flex flex-col items-center justify-center min-w-[56px] min-h-[52px] py-2 px-2 rounded-xl transition-all active:scale-95 ${
              isActive ? "text-primary" : "text-on-surface-variant/70"
            }`;

            const inner = (
              <>
                <span
                  className="material-symbols-outlined select-none text-[22px]"
                  style={{ fontVariationSettings: `'FILL' ${item.filled && isActive ? 1 : 0}` }}
                >
                  {item.icon}
                </span>
                <span className="font-sans text-[9px] tracking-wider uppercase mt-0.5">
                  {item.label}
                </span>
              </>
            );

            return item.isLink ? (
              <Link key={item.href} href={item.href} className={className}>
                {inner}
              </Link>
            ) : (
              <a key={item.href} href={item.href} className={className}>
                {inner}
              </a>
            );
          })}

          <button
            onClick={openCart}
            className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[52px] py-2 px-2 rounded-xl text-on-surface-variant/70 active:scale-95 transition-all"
            aria-label="Open bag"
          >
            <span className="material-symbols-outlined select-none text-[22px]">
              shopping_bag
            </span>
            <span className="font-sans text-[9px] tracking-wider uppercase mt-0.5">Bag</span>
            {count > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-primary text-on-primary text-[0.55rem] font-bold rounded-full grid place-items-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      <button
        onClick={openCart}
        className="hidden md:flex fixed bottom-8 right-8 z-50 lustre-badge min-w-[56px] min-h-[56px] p-4 rounded-full shadow-lg active:scale-90 transition-transform items-center justify-center"
        aria-label="Open bag"
      >
        <span
          className="material-symbols-outlined text-primary text-2xl select-none"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          shopping_bag
        </span>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-primary text-on-primary text-[0.6rem] font-bold rounded-full grid place-items-center">
            {count}
          </span>
        )}
      </button>
    </>
  );
}
