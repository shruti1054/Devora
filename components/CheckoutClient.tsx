"use client";

import { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useCart } from "./cart/CartContext";
import { useAuth } from "./auth/AuthContext";
import { useUI } from "./ui/UIContext";
import { fmtINR } from "@/lib/format";
import { UPI_ID, UPI_PAYEE_NAME, WHATSAPP_NUMBER } from "@/lib/config";
import { createOrder } from "@/lib/store";
import type { Order } from "@/lib/types";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="20" height="20">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22 22-9.8 22-22c0-1.5-.2-2.6-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 16 2 9.1 6.6 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 46c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5C29.6 36.6 26.9 37.5 24 37.5c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9 41.4 15.9 46 24 46z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.5 5.5C39.9 36 44 30.6 44 24c0-1.5-.2-2.6-.4-3.5z" />
  </svg>
);

export default function CheckoutClient() {
  const { lines, subtotal, clear } = useCart();
  const { user, signIn, isDemo } = useAuth();
  const { showToast } = useUI();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [placed, setPlaced] = useState<{
    order: Order;
    upiLink: string;
    waLink: string;
  } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // ---- Empty cart ----
  if (lines.length === 0 && !placed) {
    return (
      <Wrapper>
        <div className="text-center py-10">
          <p className="font-serif italic text-2xl text-on-surface-variant mb-6">
            Your bag is empty.
          </p>
          <Link
            href="/shop"
            className="btn-pill btn-pill-primary shimmer-btn"
          >
            Browse the collections
          </Link>
        </div>
      </Wrapper>
    );
  }

  // ---- Not signed in ----
  if (!user && !placed) {
    return (
      <Wrapper>
        <div className="glass-morphism rounded-card p-12 shadow-soft text-center max-w-md mx-auto">
          <h3 className="font-serif font-medium text-3xl text-on-surface mb-2">
            Sign in to continue
          </h3>
          <p className="text-on-surface-variant mb-7">
            Browse freely — we only ask you to sign in when you&apos;re ready to
            check out.
          </p>
          <button
            onClick={() => signIn().catch(() => showToast("Sign-in failed."))}
            className="inline-flex items-center gap-3 bg-surface border border-outline-variant rounded-pill px-6 py-3.5 font-sans text-xs tracking-wider uppercase font-semibold hover:shadow-lift hover:scale-[1.02] transition-all"
          >
            <GoogleIcon /> Continue with Google
          </button>
          {isDemo && (
            <p className="text-xs text-on-surface-variant mt-4">
              Demo mode — one click signs you in. Add Firebase keys for real
              Google login.
            </p>
          )}
        </div>
      </Wrapper>
    );
  }

  // ---- Order placed: payment panel ----
  if (placed) {
    return (
      <Wrapper>
        <div className="glass-morphism rounded-card p-8 md:p-12 shadow-soft max-w-xl mx-auto text-center">
          <div className="text-5xl mb-3">🐚</div>
          <h3 className="font-serif font-medium text-3xl text-on-surface mb-1">
            Order {placed.order.orderId} placed
          </h3>
          <p className="text-on-surface-variant mb-7">
            Complete payment to confirm. We&apos;ll ship once payment is
            received.
          </p>

          <div className="bg-surface-low rounded-card p-6 inline-block mb-6 border border-outline-variant/30 shadow-soft">
            <QRCodeSVG
              value={placed.upiLink}
              size={180}
              bgColor="#fff8f5"
              fgColor="#1e1b18"
            />
            <p className="text-xs text-on-surface-variant mt-3">Scan with any UPI app</p>
          </div>

          <div className="text-lg font-semibold text-on-surface mb-6">
            Pay {fmtINR(placed.order.total)}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={placed.upiLink}
              className="btn-pill btn-pill-secondary shimmer-btn w-full text-center"
            >
              Pay in UPI App
            </a>
            <a
              href={placed.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center h-12 rounded-pill font-sans text-xs tracking-wider uppercase font-semibold bg-[#25D366] text-white shadow-soft hover:brightness-95 transition-all"
            >
              Send order details on WhatsApp
            </a>
          </div>

          <div className="mt-6 bg-surface-low rounded-card px-4 py-3 border border-outline-variant/30">
            <p className="text-xs text-on-surface-variant">
              Can&apos;t open a UPI app? Pay manually to:
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="font-semibold text-on-surface">{UPI_ID}</span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(UPI_ID);
                  showToast("UPI ID copied ✦");
                }}
                className="rounded-pill bg-primary-container px-3 py-1 text-xs text-on-surface font-medium hover:bg-primary hover:text-on-primary transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          <Link
            href="/shop"
            className="inline-block mt-7 text-sm underline text-on-surface-variant hover:text-primary transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </Wrapper>
    );
  }

  // ---- Checkout form ----
  const placeOrder = async () => {
    const { name, phone, street, city, pincode, state } = form;
    if (!name || !phone || !street || !city || !pincode || !state) {
      showToast("Please complete your delivery details.");
      return;
    }
    const orderId = "DV" + Date.now().toString().slice(-8);
    const order: Order = {
      orderId,
      name,
      phone,
      address: { street, city, pincode, state },
      items: lines.map((l) => ({
        id: l.id,
        name: l.name,
        variant: l.variant,
        qty: l.qty,
        price: l.price,
      })),
      total: subtotal,
      userEmail: user?.email ?? null,
      createdAt: Date.now(),
      status: "pending",
    };

    try {
      await createOrder(order);
    } catch {
      // even if saving fails, let the customer pay + send via WhatsApp
    }

    const upiLink =
      `upi://pay?pa=${encodeURIComponent(UPI_ID)}` +
      `&pn=${encodeURIComponent(UPI_PAYEE_NAME)}` +
      `&am=${order.total}&cu=INR&tn=${encodeURIComponent(orderId)}`;

    const itemsText = order.items
      .map(
        (i) =>
          `• ${i.name}${i.variant ? ` (${i.variant})` : ""} ×${i.qty} — ${fmtINR(
            i.price * i.qty
          )}`
      )
      .join("\n");
    const message =
      `*New De'Vora order ${orderId}*\n\n${itemsText}\n\n` +
      `*Total: ${fmtINR(order.total)}*\n\n` +
      `Name: ${name}\nPhone: ${phone}\n` +
      `Address: ${street}, ${city}, ${state} - ${pincode}\n\n` +
      `Paid via UPI to ${UPI_ID}`;
    const waLink =
      `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}` +
      `&text=${encodeURIComponent(message)}` +
      `&type=phone_number&app_absent=0`;

    clear();
    setPlaced({ order, upiLink, waLink });
  };

  const field = (
    key: keyof typeof form,
    label: string,
    placeholder: string,
    type = "text"
  ) => (
    <div>
      <label className="block font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-on-surface-variant mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/15 transition"
      />
    </div>
  );

  return (
    <Wrapper>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <div className="glass-morphism rounded-card p-8 shadow-soft">
          <h3 className="font-serif font-medium text-2xl text-on-surface mb-6">
            Delivery details
          </h3>
          <div className="space-y-4">
            {field("name", "Full Name", "Your full name")}
            {field("phone", "Phone Number", "+91 ...", "tel")}
            {field("street", "Street Address", "House no, street, area")}
            <div className="grid sm:grid-cols-2 gap-4">
              {field("city", "City", "City")}
              {field("pincode", "Pincode", "6-digit PIN")}
            </div>
            {field("state", "State", "State")}
          </div>
        </div>

        <div className="glass-morphism rounded-card p-8 shadow-soft lg:sticky lg:top-28">
          <h3 className="font-serif font-medium text-2xl text-on-surface mb-5">Order Summary</h3>
          {lines.map((l) => (
            <div
              key={l.id + (l.variant ?? "")}
              className="flex justify-between text-sm py-2 text-on-surface-variant"
            >
              <span>
                {l.name}
                {l.variant ? ` (${l.variant})` : ""} × {l.qty}
              </span>
              <span className="text-on-surface font-medium">{fmtINR(l.price * l.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-4 mt-2 border-t border-outline-variant/40 text-lg font-semibold text-on-surface">
            <span>Total</span>
            <span>{fmtINR(subtotal)}</span>
          </div>
          <button
            onClick={placeOrder}
            className="btn-pill btn-pill-secondary shimmer-btn w-full mt-6"
          >
            Place Order via UPI
          </button>
          <p className="text-xs text-on-surface-variant text-center mt-3">
            Pay by UPI &amp; we get your order on WhatsApp instantly.
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-container mx-auto px-6 pt-28 pb-16 min-h-screen">
      <span className="block text-center font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-primary mb-2">
        almost yours
      </span>
      <h2 className="text-center font-serif font-medium text-[clamp(2.4rem,5vw,3.6rem)] tracking-wide text-on-surface mb-10">
        Checkout
      </h2>
      {children}
    </section>
  );
}
