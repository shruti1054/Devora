import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";
import ProductModal from "@/components/ProductModal";
import Toast from "@/components/Toast";
import { BRAND } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// DM Sans is a variable font — omit `weight` (passing it would throw at build).
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description:
    "De'Vora — dreamy coastal jewellery. Pastel Beach & Gold Beach collections. Wear the shore.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans">
        <Providers>
          <Nav />
          {children}
          <CartDrawer />
          <ProductModal />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
