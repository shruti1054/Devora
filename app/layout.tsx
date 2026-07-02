import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";
import ProductModal from "@/components/ProductModal";
import Toast from "@/components/Toast";
import MobileNavAndFAB from "@/components/MobileNavAndFAB";
import { BRAND } from "@/lib/config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description:
    "De'Vora — luxury coastal jewellery. Pastel Beach & Gold Beach collections. Wear the shore.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-background text-on-surface">
        <Providers>
          <Nav />
          {children}
          <CartDrawer />
          <ProductModal />
          <Toast />
          <MobileNavAndFAB />
        </Providers>
      </body>
    </html>
  );
}
