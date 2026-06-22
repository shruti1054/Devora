# De'Vora — *Wear the shore.*

A full-stack coastal jewellery store. **Next.js + React + TypeScript + Tailwind**, with **Firebase** Google login + Firestore database, **WhatsApp** order notifications, and **UPI** checkout. Everything runs on free tiers — total cost ₹0 until you add a custom domain.

It also works **immediately in demo mode** (local data + one-click demo login) so you can see the whole flow before setting up any accounts.

---

## Quick start

You need [Node.js](https://nodejs.org) 18+ installed. Then, in this folder:

```bash
npm install        # one time — installs dependencies (~1–2 min)
npm run dev        # starts the site at http://localhost:3000
```

Open http://localhost:3000. That's it — browse, add to cart, sign in (demo), and checkout all work out of the box.

> A `.npmcache` folder may be present from an earlier setup attempt — you can delete it, it isn't needed.

---

## Pages

| Route | What it is |
|---|---|
| `/` | Home — hero, collections, about, footer |
| `/shop` | Product listing with category + collection filters, product detail modal |
| `/checkout` | Google sign-in gate → delivery form → UPI QR + WhatsApp |
| `/admin` | Manage products & view orders (you only) |

Cart lives in the browser (localStorage). The cart drawer, product modal, sign-in and toasts work on every page.

---

## Going live — 3 free steps

### 1. Firebase (free Spark plan) — login + database

1. Go to [console.firebase.google.com](https://console.firebase.google.com), create a project (no card needed).
2. Add a **Web app** → copy the config values.
3. **Build → Authentication → Sign-in method → enable Google.** Under *Settings → Authorized domains*, add `localhost` (and later your live domain).
4. **Build → Firestore Database → Create database** (start in *production mode*).
5. Copy `.env.local.example` to `.env.local` and paste your values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_ADMIN_EMAIL=your-google-email@gmail.com
```

Restart `npm run dev`. The site now uses **real Google login + Firestore**. Open `/admin`, sign in with the admin email, and click **"Seed 12 sample products"** to load the starter catalogue into Firestore.

Suggested Firestore security rules (Firestore → Rules) — products are public to read, only the admin can write, and orders can be created by anyone but read only by the admin:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{id} {
      allow read: if true;
      allow write: if request.auth.token.email == "your-google-email@gmail.com";
    }
    match /orders/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth.token.email == "your-google-email@gmail.com";
    }
  }
}
```

### 2. UPI ID — where money goes (free, no gateway)

In `.env.local` set:

```
NEXT_PUBLIC_UPI_ID=yourname@okhdfcbank
```

The checkout "Place Order via UPI" button opens the customer's UPI app pre-filled and shows a scannable **QR code** + copyable ID. Money lands directly in your bank — no fees, no gateway. You'll confirm payment manually in your own UPI app before shipping (there's no automatic confirmation with the free method).

### 3. WhatsApp — order notifications (free)

Already set to **+91 7249044809** (`NEXT_PUBLIC_WHATSAPP_NUMBER=917249044809`). Change it in `.env.local` if needed. On checkout, a "Send order details on WhatsApp" button opens WhatsApp with the full order (items, total, address) pre-filled to your number — the customer taps send and it lands in your chat.

---

## Managing products

Open `/admin` (sign in with your admin email). You can add, edit and delete pieces, set price, category, collection, variants and an emoji icon, and view all orders. Changes save to Firestore (or to your browser in demo mode).

Prefer editing in code? The starter catalogue lives in `lib/data.ts`.

---

## Deploy for free

Push the folder to GitHub, then import it on [Vercel](https://vercel.com) (free Hobby plan, made for Next.js). Add the same `.env.local` values in Vercel's *Environment Variables*, and add your Vercel domain to Firebase *Authorized domains*. Netlify works too.

---

## Project structure

```
app/            routes (home, shop, checkout, admin) + layout + global styles
components/     UI: Nav, Hero, Collections, ProductCard, CartDrawer, modals…
  auth/         Google login context (Firebase + demo fallback)
  cart/         cart state (localStorage)
  ui/           cart drawer / modal / toast state
lib/            firebase init, data layer, seed products, types, config
legacy-static/  the earlier plain-HTML version (kept for reference)
```

## Tech

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Firebase 10 (Auth + Firestore) · qrcode.react

Colours, fonts and spacing are defined once in `tailwind.config.ts` and `app/globals.css`.

© 2025 De'Vora. All rights reserved.
