"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./auth/AuthContext";
import { CartProvider } from "./cart/CartContext";
import { UIProvider } from "./ui/UIContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>{children}</UIProvider>
      </CartProvider>
    </AuthProvider>
  );
}
