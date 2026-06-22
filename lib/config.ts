import type { Category } from "./types";

// Store-wide settings. Values come from env (.env.local) with safe defaults.
export const UPI_ID =
  process.env.NEXT_PUBLIC_UPI_ID || "devora.payments@upi";

export const UPI_PAYEE_NAME = "DeVora";

// WhatsApp number that receives orders (digits only, country code first).
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917249044809";

// Google account allowed to manage products at /admin.
export const ADMIN_EMAIL =
  (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase();

export const BRAND = {
  name: "De'Vora",
  tagline: "Wear the shore.",
};

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
