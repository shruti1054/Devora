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
    { href: "/", label: "Home" },
    { href: "/shop", label: "Collections" },
    { href: "/#about", label: "About" },
    { href: "/#footer", label: "Contact" },
  ];

  const initial = (user?.displayName || "D").charAt(0).toUpperCase();

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-8 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-cream/70 backdrop-blur-md border-b border-rose/40 shadow-[0_6px_20px_rgba(232,160,180,0.12)]"
          : "py-6 border-b border-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-2xl md:text-3xl tracking-[0.14em] text-ink"
      >
        {BRAND.name}
      </Link>

      {/* desktop links */}
      <ul className="hidden md:flex items-center gap-9 list-none m-0 p-0">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group relative text-sm tracking-wide text-ink hover:text-rose transition-colors"
            >
              {l.label}
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-rose transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* auth */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setAvatarOpen((v) => !v)}
              className="w-9 h-9 rounded-full border-2 border-blush overflow-hidden grid place-items-center bg-blush text-ink font-serif"
              aria-label="Account"
            >
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                initial
              )}
            </button>
            {avatarOpen && (
              <div className="absolute right-0 top-12 w-56 bg-shell rounded-card shadow-lift p-4">
                <div className="font-semibold">{user.displayName || "Guest"}</div>
                <div className="text-xs text-muted break-all mb-3">
                  {user.email}
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setAvatarOpen(false);
                  }}
                  className="w-full rounded-xl border border-rose px-4 py-2 text-sm hover:bg-blush transition-colors"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}

        {/* cart */}
        <button
          onClick={openCart}
          className="relative text-ink hover:scale-110 transition-transform p-1"
          aria-label="Open cart"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 bg-rose text-shell text-[0.68rem] font-semibold rounded-pill grid place-items-center">
              {count}
            </span>
          )}
        </button>

        {/* hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-ink rounded transition-transform ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-ink rounded transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-ink rounded transition-transform ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-cream/95 backdrop-blur-lg shadow-lift flex flex-col justify-center gap-7 px-10 transition-transform duration-400 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-ink"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
