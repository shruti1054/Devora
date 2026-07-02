// Data layer. Talks to Firestore when configured, otherwise falls back to
// localStorage / seed data so the whole app works in demo mode.

import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  runTransaction,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { SEED_PRODUCTS } from "./data";
import type { Product, Order } from "./types";

const DEMO_PRODUCTS_KEY = "devora_demo_products";
const DEMO_ORDERS_KEY = "devora_demo_orders";

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeLocal<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

/* ---------------- Products ---------------- */

export async function getProducts(): Promise<Product[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, "products"));
    if (snap.empty) return SEED_PRODUCTS; // show seed until catalogue is seeded
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
  }
  // demo: seed merged with any local edits
  return readLocal<Product[]>(DEMO_PRODUCTS_KEY, SEED_PRODUCTS);
}

export async function saveProduct(p: Product): Promise<void> {
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, "products", p.id), { ...p });
    return;
  }
  const list = readLocal<Product[]>(DEMO_PRODUCTS_KEY, SEED_PRODUCTS);
  const idx = list.findIndex((x) => x.id === p.id);
  if (idx >= 0) list[idx] = p;
  else list.push(p);
  writeLocal(DEMO_PRODUCTS_KEY, list);
}

export async function deleteProduct(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "products", id));
    return;
  }
  const list = readLocal<Product[]>(DEMO_PRODUCTS_KEY, SEED_PRODUCTS).filter(
    (x) => x.id !== id
  );
  writeLocal(DEMO_PRODUCTS_KEY, list);
}

export async function seedProducts(): Promise<void> {
  if (isFirebaseConfigured && db) {
    await Promise.all(
      SEED_PRODUCTS.map((p) => setDoc(doc(db!, "products", p.id), { ...p }))
    );
    return;
  }
  writeLocal(DEMO_PRODUCTS_KEY, SEED_PRODUCTS);
}

/* ---------------- Orders ---------------- */

export async function getNextOrderId(): Promise<string> {
  if (isFirebaseConfigured && db) {
    const counterRef = doc(db, "metadata", "orderCounter");
    try {
      return await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(counterRef);
        let currentNum = 1000;
        if (sfDoc.exists()) {
          currentNum = sfDoc.data().current;
        }
        const nextNum = currentNum + 1;
        transaction.set(counterRef, { current: nextNum });
        return `DV-${nextNum}`;
      });
    } catch (e) {
      console.warn("Transaction failed, falling back to timestamp", e);
      return `DV-${Date.now().toString().slice(-4)}`;
    }
  }
  const counter = readLocal<number>("devora_demo_counter", 1000);
  const next = counter + 1;
  writeLocal("devora_demo_counter", next);
  return `DV-${next}`;
}

export async function createOrder(order: Order): Promise<void> {
  if (isFirebaseConfigured && db) {
    await addDoc(collection(db, "orders"), { ...order });
    return;
  }
  const list = readLocal<Order[]>(DEMO_ORDERS_KEY, []);
  list.unshift(order);
  writeLocal(DEMO_ORDERS_KEY, list);
}

export async function getOrders(): Promise<Order[]> {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...d.data(), _docId: d.id }) as Order);
  }
  return readLocal<Order[]>(DEMO_ORDERS_KEY, []);
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<void> {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const docSnap = snap.docs.find((d) => d.data().orderId === orderId);
    if (docSnap) await updateDoc(doc(db, "orders", docSnap.id), { status });
    return;
  }
  const list = readLocal<Order[]>(DEMO_ORDERS_KEY, []);
  const idx = list.findIndex((o) => o.orderId === orderId);
  if (idx >= 0) list[idx] = { ...list[idx], status };
  writeLocal(DEMO_ORDERS_KEY, list);
}
