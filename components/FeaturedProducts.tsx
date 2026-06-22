"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { getProducts } from "@/lib/store";
import type { Product } from "@/lib/types";
import { useCart } from "./cart/CartContext";
import { useUI } from "./ui/UIContext";
import { fmtINR } from "@/lib/format";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { add } = useCart();
  const { openProduct, openCart, showToast } = useUI();

  useEffect(() => {
    getProducts().then((all) => {
      setProducts(all);
    });
  }, []);

  if (products.length === 0) return null;

  // Let's grab some products to map to the bento slots
  const p1 = products.find(p => p.id.includes("cuff") || p.id.includes("bangle")) || products[0];
  const p2 = products.find(p => p.id.includes("earring") || p.id.includes("stud")) || products[1] || products[0];
  const p3 = products.find(p => p.id.includes("pearl") || p.id.includes("drop") || p.id.includes("pendant")) || products[2] || products[0];
  const p4 = products.find(p => p.id.includes("ring") || p.id.includes("stack")) || products[3] || products[0];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    add(product, product.variants[0] ?? null);
    showToast(`Added ${product.name} to bag 🐚`);
    openCart();
  };

  return (
    <section className="py-20 md:py-32 max-w-container-max mx-auto px-margin-mobile">
      <Reveal>
        <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-primary mb-16 text-center">
          Current Bestsellers
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
        {/* Item 1 - Large Bento (Col span 2, Row span 2) */}
        {p1 && (
          <div 
            onClick={() => openProduct(p1)}
            className="col-span-2 row-span-1 md:row-span-2 group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-auto md:h-full bg-surface-container hover-lift">
              {/* Image using provided bento asset URL */}
              <div 
                className="w-full h-full min-h-[300px] md:min-h-[500px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3Hg0BK35F4WiiWATsyYw9SmQVOJX7wYP39E0mxqSm0_8KBnT7NnG_wqps1GrclTh6NOTrMHrZrKlG2mpU8QoEp2NZkH7Mvwdt57keKmFnuU3Ks9j9UPkny6-u_5GwZfRSOfLUuZKeYF5AtXgmreMtpOuE_pAvqQvXExrlHVIZNXBIABi9ej2VAEEnrArtaO91-sp7VZyntok9qYAh2xFZ1UvXodNy1R70fujBt8ITR9NImLQJnfYqexn0-FuT_TPQDzRQcFLeSLw')" }}
              />
              <div className="absolute top-4 right-4 lustre-badge p-2 rounded-full shadow">
                <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 duration-300">
                <button 
                  onClick={(e) => handleQuickAdd(e, p1)}
                  className="w-full bg-white text-primary py-3 rounded-full font-sans text-xs font-semibold tracking-widest uppercase shadow-lg active:scale-95 transition-all"
                >
                  Quick Add
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="font-sans text-xs font-semibold tracking-wider text-primary uppercase">{p1.name}</p>
              <p className="font-sans text-sm text-on-surface-variant font-medium mt-1">{fmtINR(p1.price)}</p>
            </div>
          </div>
        )}

        {/* Item 2 - Square Bento */}
        {p2 && (
          <div 
            onClick={() => openProduct(p2)}
            className="col-span-1 group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl aspect-square bg-surface-container hover-lift">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-N7w3vjU8-UX_vNoND_XAqRh4xiI-4Yc-98Lmt94txMZAfAtDU-_c_S6sDM1HDJbshMgaToSF2zAQJ1f-IXr9vibBDdY0tPsVlCwWvMbuGbQLZuiAL_y2o9zmUL7z2rVzIgzOSbm0c6q1P5yNftAwUe73o--6dxuH3INt8adeJToaqJLoCqJzWrkrdRosGj2PcRoIIvGyBIJ7sDZtJLczd-O8WH_ulDuX1wAgolnxgTX0N6tzljp1gjkCKlnuZ3A_joIOcMFmCIE')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 duration-300">
                <button 
                  onClick={(e) => handleQuickAdd(e, p2)}
                  className="w-full bg-white text-primary py-2 rounded-full font-sans text-[10px] font-semibold tracking-widest uppercase shadow active:scale-95 transition-all"
                >
                  Quick Add
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="font-sans text-xs font-semibold tracking-wider text-primary uppercase">{p2.name}</p>
              <p className="font-sans text-sm text-on-surface-variant font-medium mt-1">{fmtINR(p2.price)}</p>
            </div>
          </div>
        )}

        {/* Item 3 - Square Bento */}
        {p3 && (
          <div 
            onClick={() => openProduct(p3)}
            className="col-span-1 group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl aspect-square bg-surface-container hover-lift">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABFlBDJ0QW9y4r7mmHWzsmIxWJ0IQflEZdDqwJR1QMHuC_8iKBs1Wm3t9D6V43ZtEyOFJQ9kftDuIWPhrrEjeEHBshekJ3bH049iUpoxVObcmp5HJYoOqm6dHFV1rkSrNp5o1TDd-vQmFFsrtnvuCRep9oqIyPF1k6D36d05ziMTY89gZC6hz4ZenZDwLvjoFXlmfJ6c6y2VTd6DK_T7-poDit7AdFZMn56YmwRHOq5loLjG4-_KUxbTHf1HC9K_BgUm8GrERtz-g')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 duration-300">
                <button 
                  onClick={(e) => handleQuickAdd(e, p3)}
                  className="w-full bg-white text-primary py-2 rounded-full font-sans text-[10px] font-semibold tracking-widest uppercase shadow active:scale-95 transition-all"
                >
                  Quick Add
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="font-sans text-xs font-semibold tracking-wider text-primary uppercase">{p3.name}</p>
              <p className="font-sans text-sm text-on-surface-variant font-medium mt-1">{fmtINR(p3.price)}</p>
            </div>
          </div>
        )}

        {/* Item 4 - Wide Bento (Col span 2) */}
        {p4 && (
          <div 
            onClick={() => openProduct(p4)}
            className="col-span-2 group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-surface-container hover-lift">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsJy0FDp4wKpo4FYkA1MGh0WYFtM1x-Yhi4isMvaT67ueVv3Q8DhaX8dng04tV6k6yeyxN64_y7Mqie7wqHeX8f55MNoCz8fLActBInFR4sJJDHlYFqHh9IkCqy9-CLdNlIR1MgnRMpuzT-T--9Q2vD_wuGMriMfgt8MqlQIk2fNeW0uU13F6UvsPiRvHDcJW1bAmLxRaOeLdU-gZfSTlcbFbQdvWk8gerYxiLDAppz19kaPj_G0cJUB6AEKqDFE0uIKBCL4-pBEc')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 duration-300">
                <button 
                  onClick={(e) => handleQuickAdd(e, p4)}
                  className="w-full bg-white text-primary py-3 rounded-full font-sans text-xs font-semibold tracking-widest uppercase shadow active:scale-95 transition-all"
                >
                  Quick Add
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="font-sans text-xs font-semibold tracking-wider text-primary uppercase">{p4.name}</p>
              <p className="font-sans text-sm text-on-surface-variant font-medium mt-1">{fmtINR(p4.price)}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
