import Link from "next/link";
import { BRAND } from "@/lib/config";

export default function Footer() {
  return (
    <footer id="footer" className="bg-ink text-cream pt-16 pb-8 px-6">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-[2fr_1fr_1fr] gap-10">
        <div>
          <div className="font-serif text-3xl tracking-[0.14em] mb-1">
            {BRAND.name}
          </div>
          <div className="italic opacity-70">{BRAND.tagline}</div>
          <div className="flex gap-4 mt-6">
            {["Instagram", "Pinterest", "TikTok"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-9 h-9 rounded-full border border-cream/30 grid place-items-center hover:bg-blush hover:text-ink transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.1em] uppercase opacity-60 mb-4">
            Explore
          </h4>
          <ul className="list-none p-0 m-0 space-y-2">
            <li><Link href="/" className="opacity-85 hover:opacity-100 hover:text-blush transition">Home</Link></li>
            <li><Link href="/shop?c=pastel" className="opacity-85 hover:opacity-100 hover:text-blush transition">Pastel Beach</Link></li>
            <li><Link href="/shop?c=gold" className="opacity-85 hover:opacity-100 hover:text-blush transition">Gold Beach</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.1em] uppercase opacity-60 mb-4">
            Brand
          </h4>
          <ul className="list-none p-0 m-0 space-y-2">
            <li><Link href="/#about" className="opacity-85 hover:opacity-100 hover:text-blush transition">About</Link></li>
            <li><Link href="/#footer" className="opacity-85 hover:opacity-100 hover:text-blush transition">Contact</Link></li>
          </ul>
          <div className="inline-flex items-center gap-2 mt-5 bg-cream/10 rounded-pill px-4 py-2 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m6 18 6-12 6 12M9 13h6" />
            </svg>
            We accept UPI payments
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto mt-12 pt-6 border-t border-cream/15 text-center text-sm opacity-60">
        © 2025 {BRAND.name}. All rights reserved.
      </div>
    </footer>
  );
}
