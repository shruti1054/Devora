"use client";

import Link from "next/link";
import { BRAND } from "@/lib/config";


/**
 * De'VORA Footer
 * – inverse-surface (dark) background
 * – Social icon pill buttons
 * – Label-sm uppercase section headers
 * – Newsletter input + pill subscribe button
 */
export default function Footer() {
  return (
    <footer id="footer" className="bg-inverse-surface text-inverse-on-surface pt-16 pb-8 px-6">
      <div className="max-w-container mx-auto grid md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10">
        {/* Brand */}
        <div>
          <div className="font-serif text-3xl tracking-[0.14em] mb-1 text-inverse-on-surface">
            {BRAND.name}
          </div>
          <div className="font-sans italic text-sm opacity-70 mb-6">{BRAND.tagline}</div>

          {/* Social icons */}
          <div className="flex gap-3">
            {["Instagram", "Pinterest", "TikTok"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-9 h-9 rounded-pill border border-inverse-on-surface/25 grid place-items-center hover:bg-primary-container hover:text-on-surface hover:border-primary-container transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Explore links */}
        <div>
          <h4 className="font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase opacity-55 mb-4">
            Explore
          </h4>
          <ul className="list-none p-0 m-0 space-y-2 text-sm">
            <li><Link href="/"          className="opacity-80 hover:opacity-100 hover:text-secondary-container transition">Home</Link></li>
            <li><Link href="/shop?c=pastel" className="opacity-80 hover:opacity-100 hover:text-secondary-container transition">Pastel Beach</Link></li>
            <li><Link href="/shop?c=gold"   className="opacity-80 hover:opacity-100 hover:text-secondary-container transition">Gold Beach</Link></li>
          </ul>
        </div>

        {/* Brand links */}
        <div>
          <h4 className="font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase opacity-55 mb-4">
            Brand
          </h4>
          <ul className="list-none p-0 m-0 space-y-2 text-sm mb-5">
            <li><Link href="/#about"  className="opacity-80 hover:opacity-100 hover:text-secondary-container transition">About</Link></li>
            <li><Link href="/#footer" className="opacity-80 hover:opacity-100 hover:text-secondary-container transition">Contact</Link></li>
          </ul>
          <div className="inline-flex items-center gap-2 bg-inverse-on-surface/10 rounded-pill px-4 py-2 text-xs tracking-wide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m6 18 6-12 6 12M9 13h6" />
            </svg>
            UPI payments accepted
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase opacity-55 mb-4">
            Stay in the tide
          </h4>
          <p className="text-sm opacity-70 mb-4">
            New arrivals, collections &amp; coastal stories.
          </p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Email for newsletter"
              className="newsletter-input bg-inverse-on-surface/10 border-inverse-on-surface/20 text-inverse-on-surface placeholder:text-inverse-on-surface/40 focus:border-[#d4af37]"
            />
            <button
              type="submit"
              className="btn-pill btn-pill-secondary shimmer-btn w-full"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-container mx-auto mt-12 pt-6 border-t border-inverse-on-surface/15 text-center text-xs opacity-55 tracking-wide">
        © 2025 {BRAND.name}. All rights reserved.
      </div>
    </footer>
  );
}
