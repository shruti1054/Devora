"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./auth/AuthContext";
import { useUI } from "./ui/UIContext";
import {
  getProducts,
  saveProduct,
  deleteProduct,
  seedProducts,
  getOrders,
  updateOrderStatus,
} from "@/lib/store";
import { ADMIN_EMAILS, CATEGORY_LABELS } from "@/lib/config";
import { fmtINR } from "@/lib/format";
import type { Product, Order, Category, Collection } from "@/lib/types";

const BLANK: Product = {
  id: "",
  name: "",
  category: "rings",
  collection: "pastel",
  price: 0,
  description: "",
  variants: [],
  icon: "💍",
  image: "",
};

const STATUS_STYLES: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  paid:    "bg-emerald-100 text-emerald-800 border-emerald-200",
  shipped: "bg-sky-100 text-sky-800 border-sky-200",
};

const STATUS_ICONS: Record<Order["status"], string> = {
  pending: "schedule",
  paid:    "check_circle",
  shipped: "local_shipping",
};

function fmt(ts: number) {
  return new Date(ts).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminClient() {
  const { user, signIn, isDemo } = useAuth();
  const { showToast } = useUI();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders,   setOrders]   = useState<Order[]>([]);
  const [draft,    setDraft]    = useState<Product>(BLANK);
  const [variantsText, setVariantsText] = useState("");
  const [tab,      setTab]      = useState<"orders" | "products">("orders");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const allowed =
    !!user &&
    (isDemo || ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? ""));

  const load = useCallback(() => {
    getProducts().then(setProducts);
    getOrders().then(setOrders);
  }, []);

  useEffect(() => {
    if (allowed) load();
  }, [allowed, load]);

  // ---- Stats ----
  const pendingCount  = orders.filter((o) => o.status === "pending").length;
  const totalRevenue  = orders.filter((o) => o.status !== "pending").reduce((s, o) => s + o.total, 0);
  const filteredOrders = orders.filter((o) => statusFilter === "all" || o.status === statusFilter);

  // ---- Auth gate ----
  if (!user) {
    return (
      <Shell>
        <Center>
          <div className="text-5xl mb-4">🏪</div>
          <h3 className="font-serif text-2xl text-on-surface mb-2">Store Admin</h3>
          <p className="text-on-surface-variant mb-6 font-sans text-sm">
            Sign in with your Google account to manage De&#39;VORA.
          </p>
          <button onClick={() => signIn()} className="btn-pill btn-pill-primary shimmer-btn">
            Sign in with Google
          </button>
        </Center>
      </Shell>
    );
  }

  if (!allowed) {
    return (
      <Shell>
        <Center>
          <div className="text-4xl mb-4">🔒</div>
          <p className="font-serif italic text-2xl text-on-surface-variant mb-2">
            Access denied
          </p>
          <p className="text-sm text-on-surface-variant font-sans">
            {user.email} is not an admin account.
          </p>
        </Center>
      </Shell>
    );
  }

  // ---- Product helpers ----
  const edit = (p: Product) => {
    setDraft(p);
    setVariantsText(p.variants.join(", "));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async () => {
    if (!draft.name || draft.price <= 0) {
      showToast("Name and a price are required.");
      return;
    }
    const id =
      draft.id ||
      draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24) +
        "-" + Date.now().toString().slice(-4);
    const variants = variantsText.split(",").map((v) => v.trim()).filter(Boolean);
    await saveProduct({ ...draft, id, variants });
    showToast("Product saved ✦");
    setDraft(BLANK);
    setVariantsText("");
    load();
  };

  const remove = async (id: string) => {
    await deleteProduct(id);
    showToast("Product removed");
    load();
  };

  const changeStatus = async (orderId: string, status: Order["status"]) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, status);
    showToast(`Order marked as ${status} ✦`);
    load();
    setUpdatingId(null);
  };

  const waLink = (phone: string, orderId: string, total: number) => {
    const msg = `Hi! Your De'Vora order ${orderId} of ${fmtINR(total)} has been confirmed. Thank you for shopping with us 🐚`;
    return `https://api.whatsapp.com/send/?phone=91${phone.replace(/\D/g, "")}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`;
  };

  const input =
    "w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/15 transition";

  return (
    <Shell>
      {/* ---- Demo banner ---- */}
      {isDemo && (
        <div className="text-center text-xs text-on-surface-variant mb-6 bg-primary-container rounded-pill py-2 px-5 inline-block mx-auto">
          Demo mode — data saved in this browser only. Add Firebase to go live.
        </div>
      )}

      {/* ---- Who's logged in ---- */}
      <div className="text-center text-xs text-on-surface-variant mb-8">
        Signed in as <span className="font-semibold text-on-surface">{user.displayName || user.email}</span>
        {user.email === "satyashivthare13@gmail.com" && (
          <span className="ml-2 lustre-badge px-2 py-0.5 rounded-full text-secondary text-[0.65rem] tracking-wider uppercase">Co-founder</span>
        )}
      </div>

      {/* ---- Stats row ---- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Orders",   value: orders.length,   icon: "receipt_long" },
          { label: "Pending",        value: pendingCount,    icon: "schedule" },
          { label: "Products",       value: products.length, icon: "inventory_2" },
          { label: "Revenue",        value: fmtINR(totalRevenue), icon: "payments" },
        ].map((s) => (
          <div key={s.label} className="glass-morphism rounded-card p-4 shadow-soft flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-2xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
              {s.icon}
            </span>
            <div>
              <div className="font-serif text-lg text-on-surface font-medium leading-tight">{s.value}</div>
              <div className="text-[0.68rem] text-on-surface-variant uppercase tracking-wider">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Tabs ---- */}
      <div className="flex justify-center gap-2 mb-8">
        {(["orders", "products"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-pill px-6 py-2.5 text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${
              tab === t
                ? "bg-secondary text-on-secondary border-secondary shadow-soft"
                : "bg-surface border-outline-variant text-on-surface-variant hover:border-secondary hover:text-on-surface"
            }`}
          >
            {t === "orders" ? `Orders${pendingCount > 0 ? ` (${pendingCount} pending)` : ""}` : "Products"}
          </button>
        ))}
      </div>

      {/* ======== ORDERS TAB ======== */}
      {tab === "orders" && (
        <div className="max-w-4xl mx-auto">
          {/* Status filter pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {(["all", "pending", "paid", "shipped"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-pill px-4 py-1.5 text-xs font-semibold tracking-wider uppercase border transition-all ${
                  statusFilter === s
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface border-outline-variant text-on-surface-variant hover:border-primary"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {filteredOrders.length === 0 ? (
            <p className="text-on-surface-variant font-serif italic text-center py-16 text-xl">
              {statusFilter === "all" ? "No orders yet." : `No ${statusFilter} orders.`}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((o) => (
                <div key={o.orderId} className="glass-morphism rounded-card p-5 shadow-soft border border-outline-variant/20">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-on-surface bg-primary-container px-3 py-1 rounded-full">
                        {o.orderId}
                      </span>
                      <span className={`inline-flex items-center gap-1 border rounded-full px-3 py-0.5 text-xs font-semibold ${STATUS_STYLES[o.status]}`}>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {STATUS_ICONS[o.status]}
                        </span>
                        {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-xs text-on-surface-variant">{fmt(o.createdAt)}</div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Customer info */}
                    <div className="bg-surface-low rounded-xl p-4 border border-outline-variant/20">
                      <div className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-2 font-semibold">Customer</div>
                      <div className="font-serif text-base text-on-surface">{o.name}</div>
                      <div className="text-sm text-on-surface-variant mt-0.5">{o.phone}</div>
                      <div className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        {o.address.street}, {o.address.city}, {o.address.state} — {o.address.pincode}
                      </div>
                    </div>

                    {/* Items + total */}
                    <div className="bg-surface-low rounded-xl p-4 border border-outline-variant/20">
                      <div className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-2 font-semibold">Items</div>
                      <div className="space-y-1">
                        {o.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-on-surface-variant">
                              {item.name}{item.variant ? ` (${item.variant})` : ""} ×{item.qty}
                            </span>
                            <span className="text-on-surface font-medium">{fmtINR(item.price * item.qty)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between pt-2 mt-2 border-t border-outline-variant/40 font-semibold text-on-surface">
                        <span>Total</span>
                        <span>{fmtINR(o.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-outline-variant/20">
                    {/* Status updaters */}
                    {o.status === "pending" && (
                      <button
                        onClick={() => changeStatus(o.orderId, "paid")}
                        disabled={updatingId === o.orderId}
                        className="inline-flex items-center gap-1.5 rounded-pill bg-emerald-600 text-white px-4 py-2 text-xs font-semibold tracking-wider uppercase hover:bg-emerald-700 transition-colors disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        Mark Paid
                      </button>
                    )}
                    {o.status === "paid" && (
                      <button
                        onClick={() => changeStatus(o.orderId, "shipped")}
                        disabled={updatingId === o.orderId}
                        className="inline-flex items-center gap-1.5 rounded-pill bg-sky-600 text-white px-4 py-2 text-xs font-semibold tracking-wider uppercase hover:bg-sky-700 transition-colors disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                        Mark Shipped
                      </button>
                    )}
                    {o.status === "shipped" && (
                      <span className="text-xs text-on-surface-variant font-sans italic">Order complete ✦</span>
                    )}

                    {/* WhatsApp button */}
                    <a
                      href={waLink(o.phone, o.orderId, o.total)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1.5 rounded-pill bg-[#25D366] text-white px-4 py-2 text-xs font-semibold tracking-wider uppercase hover:brightness-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======== PRODUCTS TAB ======== */}
      {tab === "products" && (
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
          {/* editor */}
          <div className="glass-morphism rounded-card p-6 shadow-soft lg:sticky lg:top-28">
            <h3 className="font-serif text-2xl font-medium text-on-surface mb-4">
              {draft.id ? "Edit piece" : "Add a piece"}
            </h3>
            <div className="space-y-3">
              <input className={input} placeholder="Name" value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              <textarea className={input} placeholder="Description" rows={3} value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input className={input} type="number" placeholder="Price (₹)" value={draft.price || ""}
                  onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
                <input className={input} placeholder="Icon (emoji)" value={draft.icon}
                  onChange={(e) => setDraft({ ...draft, icon: e.target.value })} />
              </div>
              <input className={input} placeholder="Image Path (e.g. /products/1.jpg)" value={draft.image || ""}
                onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <select className={input} value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value as Category })}>
                  {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
                <select className={input} value={draft.collection}
                  onChange={(e) => setDraft({ ...draft, collection: e.target.value as Collection })}>
                  <option value="pastel">Pastel Beach</option>
                  <option value="gold">Gold Beach</option>
                </select>
              </div>
              <input className={input} placeholder="Variants, comma separated (e.g. S, M, L)"
                value={variantsText} onChange={(e) => setVariantsText(e.target.value)} />
              <div className="flex gap-2 pt-2">
                <button onClick={save} className="btn-pill btn-pill-secondary shimmer-btn flex-1">Save</button>
                {draft.id && (
                  <button onClick={() => { setDraft(BLANK); setVariantsText(""); }}
                    className="rounded-pill px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border border-outline-variant hover:bg-primary-container text-on-surface transition-colors">
                    Cancel
                  </button>
                )}
              </div>
              <button onClick={async () => { await seedProducts(); showToast("Sample catalogue loaded"); load(); }}
                className="w-full text-xs text-on-surface-variant underline hover:text-primary mt-2 transition-colors">
                Seed sample products
              </button>
            </div>
          </div>

          {/* product list */}
          <div className="space-y-3">
            {products.length === 0 && (
              <p className="text-on-surface-variant font-serif italic text-center py-10">
                No products yet — add one or seed the samples.
              </p>
            )}
            {products.map((p) => (
              <div key={p.id} className="bg-surface-low rounded-card p-4 shadow-soft flex items-center gap-4 border border-outline-variant/30 hover-lift">
                {p.image ? (
                  <div
                    className="w-14 h-14 rounded-card shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                ) : (
                  <div className={`w-14 h-14 rounded-card grid place-items-center text-2xl shrink-0 ${
                    p.collection === "gold"
                      ? "bg-gradient-to-br from-secondary-fixed to-[#f7eed6]"
                      : "bg-gradient-to-br from-primary-container to-[#fbe3ec]"
                  }`}>
                    {p.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-lg text-on-surface truncate">{p.name}</div>
                  <div className="text-xs text-on-surface-variant">
                    {CATEGORY_LABELS[p.category]} · {p.collection} · {fmtINR(p.price)}
                  </div>
                </div>
                <button onClick={() => edit(p)}
                  className="text-sm text-on-surface-variant underline hover:text-primary transition-colors">Edit</button>
                <button onClick={() => remove(p.id)}
                  className="text-sm text-on-surface-variant underline hover:text-primary transition-colors">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-container mx-auto px-6 pt-28 pb-16 min-h-screen">
      <span className="block text-center font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-primary mb-2">
        store management
      </span>
      <h2 className="text-center font-serif font-medium text-[clamp(2.2rem,4vw,3rem)] tracking-wide text-on-surface mb-8">
        De&#39;VORA Admin
      </h2>
      <div className="flex justify-center mb-8">{/* spacer */}</div>
      {children}
    </section>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-morphism rounded-card p-12 shadow-soft text-center max-w-md mx-auto">
      {children}
    </div>
  );
}
