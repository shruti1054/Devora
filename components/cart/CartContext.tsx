"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product, Collection } from "@/lib/types";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  icon: string;
  collection: Collection;
  variant: string | null;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (p: Product, variant?: string | null, qty?: number) => void;
  remove: (id: string, variant: string | null) => void;
  changeQty: (id: string, variant: string | null, delta: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const CART_KEY = "devora_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // load once
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // persist on change
  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback(
    (p: Product, variant: string | null = null, qty = 1) => {
      setLines((prev) => {
        const i = prev.findIndex(
          (l) => l.id === p.id && l.variant === variant
        );
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }
        return [
          ...prev,
          {
            id: p.id,
            name: p.name,
            price: p.price,
            icon: p.icon,
            collection: p.collection,
            variant,
            qty,
          },
        ];
      });
    },
    []
  );

  const remove = useCallback((id: string, variant: string | null) => {
    setLines((prev) =>
      prev.filter((l) => !(l.id === id && l.variant === variant))
    );
  }, []);

  const changeQty = useCallback(
    (id: string, variant: string | null, delta: number) => {
      setLines((prev) =>
        prev
          .map((l) =>
            l.id === id && l.variant === variant
              ? { ...l, qty: l.qty + delta }
              : l
          )
          .filter((l) => l.qty > 0)
      );
    },
    []
  );

  const clear = useCallback(() => setLines([]), []);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <Ctx.Provider
      value={{ lines, count, subtotal, add, remove, changeQty, clear }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
