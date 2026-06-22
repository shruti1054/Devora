"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { useAuth } from "./auth/AuthContext";
import { BRAND } from "@/lib/config";

export default function Nav() {
  const { count } = useCart();
  const { openCart } = useUI();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/",       label: "Boutique" },
    { href: "/shop",   label: "Collections" },
    { href: "/#about", label: "About" },
    { href: "/#footer",label: "Contact" },
  ];

  const initial = (user?.displayName || "D").charAt(0).toUpperCase();

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 bg-surface/70 backdrop-blur-xl ${
          scrolled 
            ? "shadow-[0_4px_20px_0_rgba(212,175,55,0.05)] bg-surface/90" 
            : "border-b border-transparent"
        }`}
      >
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-container-max mx-auto">
          
          {/* Mobile hamburger menu (hidden on desktop for a cleaner desktop navbar) */}
          <button 
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden active:scale-95 transition-transform duration-200 text-primary p-1 flex items-center justify-center"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined select-none text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>
              menu
            </span>
          </button>

          {/* Desktop Direct Links (visible only on desktop md+) */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-xs font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Logo brand wordmark */}
          <Link
            href="/"
            className="font-serif text-2xl md:text-headline-md text-primary uppercase tracking-widest leading-none cursor-pointer"
          >
            {BRAND.name}
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            <Link 
              href="/shop" 
              className="flex items-center text-on-surface-variant hover:text-primary transition-colors duration-300"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-2xl select-none" style={{ fontVariationSettings: "'FILL' 0" }}>
                search
              </span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative text-primary hover:scale-110 transition-transform p-1 flex items-center justify-center active:scale-95 duration-200"
              aria-label="Open cart"
            >
              <span className="material-symbols-outlined text-2xl select-none" style={{ fontVariationSettings: "'FILL' 0" }}>
                shopping_bag
              </span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 bg-primary text-on-primary text-[0.55rem] font-bold rounded-full grid place-items-center">
                  {count}
                </span>
              )}
            </button>

            {/* User Profile / Auth block */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setAvatarOpen((v) => !v)}
                  className="w-7 h-7 rounded-full border border-primary-container overflow-hidden grid place-items-center bg-primary-container text-on-surface font-serif text-[11px]"
                  aria-label="Account"
                >
                  {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.photoURL} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    initial
                  )}
                </button>
                {avatarOpen && (
                  <div className="absolute right-0 top-10 w-56 glass-morphism rounded-card shadow-lift p-4 animate-slide-up">
                    <div className="font-serif text-base text-on-surface font-medium">
                      {user.displayName || "Guest"}
                    </div>
                    <div className="text-xs text-on-surface-variant break-all mb-3">
                      {user.email}
                    </div>
                    <button
                      onClick={() => { signOut(); setAvatarOpen(false); }}
                      className="w-full rounded-pill border border-outline-variant px-4 py-2 text-xs tracking-widest uppercase font-semibold hover:bg-primary-container transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile side-drawer (rendered only if open or on mobile screen) */}
      <div 
        className={`fixed inset-0 bg-black/25 backdrop-blur-sm z-[100] transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className={`h-full w-80 bg-surface shadow-2xl rounded-l-3xl ml-auto flex flex-col p-8 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif text-2xl text-primary uppercase tracking-widest">Collections</span>
            <button 
              className="text-primary active:scale-90 transition-transform" 
              onClick={() => setMenuOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 text-primary font-serif text-lg group hover:translate-x-2 transition-transform duration-200"
              >
                <span className="material-symbols-outlined text-secondary text-xl">
                  auto_awesome
                </span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
