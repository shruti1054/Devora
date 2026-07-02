import type { Category } from "./types";

// Store-wide settings. Values come from env (.env.local) with safe defaults.
export const UPI_ID =
  process.env.NEXT_PUBLIC_UPI_ID || "devora.payments@upi";

export const UPI_PAYEE_NAME = "DeVora";

// WhatsApp number that receives orders (digits only, country code first).
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917249044809";

// Google accounts allowed to manage products at /admin.
// Multiple admins supported — comma-separated in env or hardcoded below.
const envAdmins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const ADMIN_EMAILS: string[] =
  envAdmins.length > 0
    ? envAdmins
    : ["shrutite22comp@student.mes.ac.in", "satyashivthare13@gmail.com"];

// Legacy compat
export const ADMIN_EMAIL = ADMIN_EMAILS[0];

// Handling / delivery fee
export const DELIVERY_FEE = 60;            // ₹60 flat
export const FREE_DELIVERY_ABOVE = 499;    // free if subtotal >= this

export const BRAND = {
  name: "De'Vora",
  tagline: "Wear the shore.",
};

export const CONTACT_EMAIL = "devoraaa45@gmail.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const CATEGORY_LABELS: Record<Category, string> = {
  rings: "Rings",
  earrings: "Earrings",
  neckpieces: "Neckpieces",
  bangles: "Hand Bangles",
  armcuffs: "Arm Cuffs",
};

export const COLLECTION_LABELS: Record<string, string> = {
  pastel: "Pastel Beach",
  gold: "Gold Beach",
};
