# De'Vora — *Wear the shore.*

A dreamy, coastal e-commerce site for a beach-aesthetic jewellery brand. Pure HTML + CSS + vanilla JavaScript with Firebase Google Auth and UPI checkout. **No build step, no server, no npm.** Just open `index.html` in a browser.

## Files

| File | What it holds |
|---|---|
| `index.html` | Home — hero, collections, about, footer, cart drawer |
| `products.html` | Product listing + filters, product modal, checkout, cart drawer |
| `style.css` | All styles, colors, animations, responsive layout |
| `app.js` | Product data, cart logic, Firebase auth, UPI checkout |
| `README.md` | This guide |

## Running it

Double-click `index.html`, or for the smoothest experience (so the Firebase popup and ES modules behave) serve the folder locally:

```bash
# from inside the De'Vora folder
python -m http.server 8000
# then open http://localhost:8000
```

The site works **without** Firebase too — if you haven't added your config yet, checkout uses a one-click "demo" sign-in so you can test the full flow.

## 1. Add your Firebase config

Open `app.js` and replace the placeholder values near the top:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Get these from the [Firebase console](https://console.firebase.google.com): create a project → add a Web app → copy the config. Then enable **Authentication → Sign-in method → Google**. Add your domain (e.g. `localhost`) under **Authorized domains**.

Once a real `apiKey` is present, the site automatically switches from demo sign-in to real Google sign-in. No other code changes needed.

## 2. Update the UPI ID

In `app.js`, change:

```javascript
const UPI_ID = "devora.payments@upi";   // ← your real UPI ID
const UPI_PAYEE_NAME = "DeVora";
```

The "Place Order via UPI" button opens `upi://pay?pa=<UPI_ID>&pn=<name>&am=<amount>&cu=INR&tn=<orderId>`, which launches the customer's UPI app (GPay / PhonePe / Paytm). A copy-able fallback UPI ID is shown for anyone who can't deep-link. Update the fallback text in `products.html` (the `.upi-id` span) to match.

## 3. Add or edit products

All products live in the `products` array in `app.js`. Copy an entry and edit:

```javascript
{
  id: 13,                       // unique number
  name: "Seaglass Drop Earrings",
  category: "earrings",         // rings | earrings | neckpieces | bangles | armcuffs
  collection: "pastel",         // pastel | gold
  price: 950,                   // INR, number only
  description: "Short, dreamy product description.",
  variants: ["S", "M", "L"],    // [] if none
  icon: "🌸"                     // emoji shown on the placeholder image
}
```

Filters, the grid, the modal and the cart all read from this array automatically.

## Notes

- **Cart & wishlist** are stored in the browser via `localStorage` — they persist between visits, no database needed.
- **Images** are CSS gradient placeholders styled per collection (no external image URLs). Swap the `.product-image` / `.modal-image` styling in `style.css` if you later add real photos.
- **Colors & fonts** are defined as CSS variables at the top of `style.css` — change them in one place.
- Founders line in the About section (`index.html`) currently reads *"Shruti & Co-founder"* — update with your co-founder's name.

© 2025 De'Vora. All rights reserved.
