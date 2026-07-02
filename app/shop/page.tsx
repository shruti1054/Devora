import ShopClient from "@/components/ShopClient";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function ShopPage() {
  return (
    <main className="pb-nav-mobile md:pb-0">
      <Suspense fallback={
        <div className="min-h-screen grid place-items-center font-serif italic text-on-surface-variant text-xl">
          Loading boutique...
        </div>
      }>
        <ShopClient />
      </Suspense>
      <Footer />
    </main>
  );
}
