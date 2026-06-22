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
} from "@/lib/store";
import { ADMIN_EMAIL, CATEGORY_LABELS } from "@/lib/config";
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
};

export default function AdminClient() {
  const { user, signIn, isDemo } = useAuth();
  const { showToast } = useUI();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [draft, setDraft] = useState<Product>(BLANK);
  const [variantsText, setVariantsText] = useState("");
  const [tab, setTab] = useState<"products" | "orders">("products");

  const allowed =
    !!user && (isDemo || (!!ADMIN_EMAIL && user.email?.toLowerCase() === ADMIN_EMAIL));

  const load = useCallback(() => {
    getProducts().then(setProducts);
    getOrders().then(setOrders);
  }, []);

  useEffect(() => {
    if (allowed) load();
  }, [allowed, load]);

  if (!user) {
    return (
      <Shell>
        <Center>
          <p className="text-muted mb-6">Sign in to manage your store.</p>
          <button
            onClick={() => signIn()}
            className="rounded-xl px-6 py-3 bg-blush text-ink font-medium shadow-soft hover:bg-rose hover:text-shell transition-colors"
          >
            Sign in
          </button>
        </Center>
      </Shell>
    );
  }

  if (!allowed) {
    return (
      <Shell>
        <Center>
          <p className="font-serif italic text-2xl text-muted">
            This account isn&apos;t the store admin.
          </p>
          <p className="text-sm text-muted mt-2">
            Set NEXT_PUBLIC_ADMIN_EMAIL to {user.email} to gain access.
          </p>
        </Center>
      </Shell>
    );
  }

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
        "-" +
        Date.now().toString().slice(-4);
    const variants = variantsText
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
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

  const input =
    "w-full rounded-xl border border-rose/45 bg-cream px-3 py-2 text-sm focus:outline-none focus:border-rose";

  return (
    <Shell>
      {isDemo && (
        <p className="text-center text-xs text-muted mb-6 bg-blush/40 rounded-pill py-2 px-4 inline-block mx-auto">
          Demo mode — changes are saved in this browser only. Add Firebase to go
          live.
        </p>
      )}

      <div className="flex justify-center gap-2 mb-8">
        {(["products", "orders"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-pill px-5 py-2 text-sm capitalize transition-colors ${
              tab === t ? "bg-rose text-shell" : "bg-shell border border-rose/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "products" ? (
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
          {/* editor */}
          <div className="bg-shell rounded-card p-6 shadow-soft lg:sticky lg:top-28">
            <h3 className="font-serif text-2xl mb-4">
              {draft.id ? "Edit piece" : "Add a piece"}
            </h3>
            <div className="space-y-3">
              <input
                className={input}
                placeholder="Name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
              <textarea
                className={input}
                placeholder="Description"
                rows={3}
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className={input}
                  type="number"
                  placeholder="Price (₹)"
                  value={draft.price || ""}
                  onChange={(e) =>
                    setDraft({ ...draft, price: Number(e.target.value) })
                  }
                />
                <input
                  className={input}
                  placeholder="Icon (emoji)"
                  value={draft.icon}
                  onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  className={input}
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value as Category })
                  }
                >
                  {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
                <select
                  className={input}
                  value={draft.collection}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      collection: e.target.value as Collection,
                    })
                  }
                >
                  <option value="pastel">Pastel Beach</option>
                  <option value="gold">Gold Beach</option>
                </select>
              </div>
              <input
                className={input}
                placeholder="Variants, comma separated (e.g. S, M, L)"
                value={variantsText}
                onChange={(e) => setVariantsText(e.target.value)}
              />
              <div className="flex gap-2 pt-1">
                <button
                  onClick={save}
                  className="flex-1 rounded-xl py-2.5 bg-gold text-shell font-medium hover:bg-[#b8973f] transition-colors"
                >
                  Save
                </button>
                {draft.id && (
                  <button
                    onClick={() => {
                      setDraft(BLANK);
                      setVariantsText("");
                    }}
                    className="rounded-xl px-4 py-2.5 border border-rose hover:bg-blush transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <button
                onClick={async () => {
                  await seedProducts();
                  showToast("Sample catalogue loaded");
                  load();
                }}
                className="w-full text-xs text-muted underline hover:text-rose mt-2"
              >
                Seed 12 sample products
              </button>
            </div>
          </div>

          {/* list */}
          <div className="space-y-3">
            {products.length === 0 && (
              <p className="text-muted font-serif italic text-center py-10">
                No products yet — add one or seed the samples.
              </p>
            )}
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-shell rounded-card p-4 shadow-soft flex items-center gap-4"
              >
                <div
                  className={`w-14 h-14 rounded-xl grid place-items-center text-2xl shrink-0 ${
                    p.collection === "gold"
                      ? "bg-gradient-to-br from-gold-soft to-[#f7eed6]"
                      : "bg-gradient-to-br from-blush to-[#fbe3ec]"
                  }`}
                >
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-lg truncate">{p.name}</div>
                  <div className="text-xs text-muted">
                    {CATEGORY_LABELS[p.category]} · {p.collection} ·{" "}
                    {fmtINR(p.price)}
                  </div>
                </div>
                <button
                  onClick={() => edit(p)}
                  className="text-sm underline hover:text-rose"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="text-sm text-muted underline hover:text-rose"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-w-3xl mx-auto">
          {orders.length === 0 && (
            <p className="text-muted font-serif italic text-center py-10">
              No orders yet.
            </p>
          )}
          {orders.map((o) => (
            <div key={o.orderId} className="bg-shell rounded-card p-5 shadow-soft">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{o.orderId}</span>
                <span className="text-sm font-semibold">{fmtINR(o.total)}</span>
              </div>
              <div className="text-sm text-muted">
                {o.name} · {o.phone} · {o.address.city}, {o.address.state}
              </div>
              <div className="text-sm mt-2">
                {o.items
                  .map(
                    (i) =>
                      `${i.name}${i.variant ? ` (${i.variant})` : ""} ×${i.qty}`
                  )
                  .join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-28 pb-16 min-h-screen">
      <h2 className="text-center font-serif font-light text-[clamp(2.2rem,4vw,3rem)] tracking-wide mb-8">
        Store Admin
      </h2>
      {children}
    </section>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-shell rounded-card p-12 shadow-soft text-center max-w-md mx-auto">
      {children}
    </div>
  );
}
