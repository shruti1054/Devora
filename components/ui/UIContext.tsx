"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/types";

interface UICtx {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  modalProduct: Product | null;
  openProduct: (p: Product) => void;
  closeProduct: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const Ctx = createContext<UICtx | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openProduct = useCallback((p: Product) => setModalProduct(p), []);
  const closeProduct = useCallback(() => setModalProduct(null), []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <Ctx.Provider
      value={{
        cartOpen,
        openCart,
        closeCart,
        modalProduct,
        openProduct,
        closeProduct,
        toast,
        showToast,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useUI() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useUI must be used within UIProvider");
  return c;
}
