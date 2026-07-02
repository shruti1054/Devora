"use client";

import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { fmtINR } from "@/lib/format";
import type { Product } from "@/lib/types";

// Map default icon products to background images from stitch screen templates
const PRODUCT_IMAGES: Record<string, string> = {
  "Sea Foam Cuff": "https://lh3.googleusercontent.com/aida-public/AB6AXuA3Hg0BK35F4WiiWATsyYw9SmQVOJX7wYP39E0mxqSm0_8KBnT7NnG_wqps1GrclTh6NOTrMHrZrKlG2mpU8QoEp2NZkH7Mvwdt57keKmFnuU3Ks9j9UPkny6-u_5GwZfRSOfLUuZKeYF5AtXgmreMtpOuE_pAvqQvXExrlHVIZNXBIABi9ej2VAEEnrArtaO91-sp7VZyntok9qYAh2xFZ1UvXodNy1R70fujBt8ITR9NImLQJnfYqexn0-FuT_TPQDzRQcFLeSLw",
  "Aura Arm Cuff": "https://lh3.googleusercontent.com/aida-public/AB6AXuCTXl92LjbVhN4Jb32701t3HVerVQMzQejxNUo52hZCK_qyrQg7O7Vf2_dlXFEz2PkpEwzJ_9IroXdPybgeJBw3zRPsi9qVGsmYYrTgRrfncpTyn-djj5YGW3JXeB9op8UsQFX7GSn6I8f-ZD5IWZjqbIl6rdewd0e4Gpp1OYD3SCoiNPNoVcGd6XayH-dAfRscGf6vlBdNbIfnfR4puMOvgDqZLSMuM1w5KzWx7U7IDLFRKtlGJMes9XPD2oZlVUmB4wfDC1n3IKU",
  "Aurelia Shell Pendant": "https://lh3.googleusercontent.com/aida-public/AB6AXuBiq-r-L7pSmeeocg3DHzO4bbHZOGcI_uPFVG-odRwMbsUsippeqthhcfXTvLwOOHv6NmpFFlsxXRcbhz0zJrtyuSFNGSGYdor8-JME3Q7rTFu3Gw4_yaLQk2hCWgnj2vug0qMqQfhvzOYCQ5gxnX3WleODN5CaV6jpYzWxmB0F47gPoAYzDieWEJtiOfChqt51FSECJz4e3aB-wSpsngqfZAPcNOigyCaaN63VA_Vr_xouVnYII_RdqB7VP9MLYd57r2HRkyAQUUw",
  "Stella Maris Drops": "https://lh3.googleusercontent.com/aida-public/AB6AXuAVyFxIfoxtCfvzan270pIbjvXip18O61FJ6TZyOlG25pQgUrBUePJaTCWymGqGx-X82G3EYxezbGLMQ2BHKS8arSVUzWwAtdaMiGpic5FbxeNqqOPtsFLB9BaabiavIQYAWp8ruGSONQZuvqN-fT1H90JbMcW_X7HuE1319f2-QkdgIHFHi9HSz2zHLlk7CcK0mZ0TqFSk_zqm0s-HL9FaOagw3-c-MqiFj4B5QKaQHePBw9u2k8b_UT6v7DXMHv7CGa1CrkX2fTM",
  "Dune Sculpted Cuff": "https://lh3.googleusercontent.com/aida-public/AB6AXuBi4qidYYzlLb4jzrSO9WtG6p_ibh0OxHF6810D6T5hxx6qf4FAxeHce_TuMqS7UsusxF2kwHIc2ya3sjSuEmQGy23CxFYRWhKCaDDY-7DUVBbv0Nrjfr5bPVw9D0w0dUWe1rvg6BhTga6-zdZeicwk8DzeZzX6U5hNN9y3p34BqEre-tWUABwAJgBU7xYzF8f8DIzDtUHcm7RI5SrwWgPd57FSyjS8PYckEomxfoYt8SXJ3bF6u6NXNQkc2tFSKEwcoDR8lvGZWyg",
  "Shell Studs": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-N7w3vjU8-UX_vNoND_XAqRh4xiI-4Yc-98Lmt94txMZAfAtDU-_c_S6sDM1HDJbshMgaToSF2zAQJ1f-IXr9vibBDdY0tPsVlCwWvMbuGbQLZuiAL_y2o9zmUL7z2rVzIgzOSbm0c6q1P5yNftAwUe73o--6dxuH3INt8adeJToaqJLoCqJzWrkrdRosGj2PcRoIIvGyBIJ7sDZtJLczd-O8WH_ulDuX1wAgolnxgTX0N6tzljp1gjkCKlnuZ3A_joIOcMFmCIE",
  "Pearl Drop": "https://lh3.googleusercontent.com/aida-public/AB6AXuABFlBDJ0QW9y4r7mmHWzsmIxWJ0IQflEZdDqwJR1QMHuC_8iKBs1Wm3t9D6V43ZtEyOFJQ9kftDuIWPhrrEjeEHBshekJ3bH049iUpoxVObcmp5HJYoOqm6dHFV1rkSrNp5o1TDd-vQmFFsrtnvuCRep9oqIyPF1k6D36d05ziMTY89gZC6hz4ZenZDwLvjoFXlmfJ6c6y2VTd6DK_T7-poDit7AdFZMn56YmwRHOq5loLjG4-_KUxbTHf1HC9K_BgUm8GrERtz-g",
  "Tidepool Stack": "https://lh3.googleusercontent.com/aida-public/AB6AXuCsJy0FDp4wKpo4FYkA1MGh0WYFtM1x-Yhi4isMvaT67ueVv3Q8DhaX8dng04tV6k6yeyxN64_y7Mqie7wqHeX8f55MNoCz8fLActBInFR4sJJDHlYFqHh9IkCqy9-CLdNlIR1MgnRMpuzT-T--9Q2vD_wuGMriMfgt8MqlQIk2fNeW0uU13F6UvsPiRvHDcJW1bAmLxRaOeLdU-gZfSTlcbFbQdvWk8gerYxiLDAppz19kaPj_G0cJUB6AEKqDFE0uIKBCL4-pBEc",
};

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { openProduct, openCart, showToast } = useUI();
  const isGold = product.collection === "gold";

  // Match corresponding high-end beach thumbnail or fallback to brand gradient
  const bgImg = product.image || PRODUCT_IMAGES[product.name];

  return (
    <div 
      onClick={() => openProduct(product)}
      className="group cursor-pointer"
    >
      <div className="aspect-[4/5] bg-surface-container-low rounded-lg overflow-hidden relative mb-6 hover-lift">
        {bgImg ? (
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style={{ backgroundImage: `url('${bgImg}')` }}
          />
        ) : (
          <div 
            className={`w-full h-full grid place-items-center text-5xl transition-transform duration-700 group-hover:scale-110 ${
              isGold
                ? "bg-gradient-to-br from-secondary-fixed to-[#f7eed6]"
                : "bg-gradient-to-br from-primary-container to-[#fbe3ec]"
            }`}
          >
            {/* Soft highlight overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_55%)]" />
            <div className="absolute w-[70%] h-[75%] rounded-xl border border-white/30" />
            <span className="relative z-10">{product.icon}</span>
          </div>
        )}

        {isGold && (
          <div className="absolute top-4 left-4 lustre-badge px-3 py-1 rounded-full text-[10px] font-bold text-secondary uppercase tracking-tighter shadow-sm">
            Gold Beach
          </div>
        )}

        {/* Quick Add — always visible on touch devices */}
        <div className="quick-add-overlay absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              add(product, product.variants[0] ?? null);
              showToast(`Added ${product.name} to bag 🐚`);
              openCart();
            }}
            className="w-full min-h-[44px] py-2.5 sm:py-3 bg-inverse-surface text-inverse-on-surface text-[10px] sm:text-xs font-semibold tracking-widest uppercase rounded-md shadow-md hover:bg-primary active:scale-95 transition-all shimmer-btn"
          >
            Quick Add
          </button>
        </div>
      </div>

      <div className="text-center space-y-1 sm:space-y-2 px-1 sm:px-4">
        <h3 className="font-serif text-sm sm:text-body-lg text-on-surface group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="font-sans text-label-sm text-secondary tracking-widest font-semibold">
          {fmtINR(product.price)}
        </p>
      </div>
    </div>
  );
}
