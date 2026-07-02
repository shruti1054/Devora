"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { useAuth } from "./auth/AuthContext";
import { BRAND, CONTACT_MAILTO } from "@/lib/config";

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
    { href: "/",                          label: "Boutique",       icon: "home" },
    { href: "/shop",                      label: "All Jewellery",  icon: "grid_view" },
    { href: "/shop?category=rings",       label: "Rings",          icon: "radio_button_unchecked" },
    { href: "/shop?category=earrings",    label: "Earrings",       icon: "diamond" },
    { href: "/shop?category=neckpieces",  label: "Neckpieces",     icon: "favorite" },
    { href: "/shop?category=bangles",     label: "Bangles",        icon: "circle" },
    { href: "/shop?category=armcuffs",    label: "Arm Cuffs",      icon: "auto_awesome" },
    { href: "/#about",                    label: "About",          icon: "info" },
    { href: CONTACT_MAILTO,               label: "Contact",        icon: "mail" },
  ];

  // Desktop top nav links (just the main pages, not every category)
  const desktopLinks = [
    { href: "/",       label: "Boutique" },
    { href: "/shop",   label: "Collections" },
    { href: "/#about", label: "About" },
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
        <div className="relative flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-container-max mx-auto">

          {/* LEFT: menu + desktop logo & links */}
          <div className="flex items-center gap-3 z-10">
            {/* Logo — tapping opens menu on mobile, navigates home on desktop */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden touch-target flex items-center justify-center active:scale-95 transition-transform duration-200 cursor-pointer shrink-0 p-1 bg-transparent border-none rounded-full"
              aria-label="Menu"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_clean.jpg"
                alt={BRAND.name}
                className="h-9 w-9 object-cover rounded-full border border-primary/20 shadow-sm"
              />
            </button>

            {/* Desktop: logo as home link */}
            <Link href="/" className="hidden md:flex items-center cursor-pointer shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_clean.jpg"
                alt={BRAND.name}
                className="h-10 w-10 object-cover rounded-full border border-primary/20 shadow-sm"
              />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0 ml-2">
              {desktopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand — centered on all screen sizes */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-2xl text-primary uppercase tracking-[0.12em] md:tracking-widest leading-none cursor-pointer z-10"
          >
            {BRAND.name}
          </Link>

          {/* RIGHT: search, cart, user */}
          <div className="flex items-center gap-2 sm:gap-4 z-10">
            <Link
              href="/shop"
              className="touch-target flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors duration-300"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-2xl select-none" style={{ fontVariationSettings: "'FILL' 0" }}>
                search
              </span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative touch-target flex items-center justify-center text-primary hover:scale-110 transition-transform active:scale-95 duration-200"
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
                  className="touch-target w-9 h-9 rounded-full border border-primary-container overflow-hidden grid place-items-center bg-primary-container text-on-surface font-serif text-[11px]"
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
              className="touch-target flex items-center justify-center text-primary active:scale-90 transition-transform rounded-full"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 text-on-surface font-sans text-sm font-medium tracking-wide group hover:translate-x-2 hover:text-primary transition-all duration-200 py-3 px-3 rounded-xl hover:bg-primary-container/40 min-h-[44px]"
              >
                <span className="material-symbols-outlined text-secondary text-[1.1rem] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {link.icon}
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
