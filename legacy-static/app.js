/* =========================================================
   De'Vora — app.js
   Product data · cart · Firebase Google auth · UPI checkout
   Pure vanilla JS. Shared across index.html & products.html.
   ========================================================= */

/* =========================================================
   1. CONFIG — owner edits these
   ========================================================= */

// --- UPI: replace with the brand's real UPI ID ---
const UPI_ID = "devora.payments@upi";
const UPI_PAYEE_NAME = "DeVora";

// --- Firebase: replace with your own Firebase project config ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/* =========================================================
   2. PRODUCT DATA — owner edits this array
   category: rings | earrings | neckpieces | bangles | armcuffs
   collection: pastel | gold
   ========================================================= */
const products = [
  // ---- Pastel Beach Collection ----
  { id: 1,  name: "Pearl Shore Ring",     category: "rings",      collection: "pastel", price: 899,
    description: "A delicate ring inspired by pearls kissed by sea foam. Soft, luminous, and made to catch the light.",
    variants: ["5", "6", "7", "8"], icon: "💍" },
  { id: 2,  name: "Blush Tide Earrings",  category: "earrings",   collection: "pastel", price: 749,
    description: "Featherlight drops in the softest blush, like the first pink of a coastal dawn.",
    variants: [], icon: "🌸" },
  { id: 3,  name: "Lavender Wave Necklace", category: "neckpieces", collection: "pastel", price: 1299,
    description: "A flowing neckpiece carrying the calm of lavender waves at dusk.",
    variants: ["16\"", "18\"", "20\""], icon: "📿" },
  { id: 4,  name: "Mint Seafoam Bangle",  category: "bangles",    collection: "pastel", price: 1099,
    description: "A bold hand bangle in cool mint — substantial, sculptural, and endlessly summery.",
    variants: ["S", "M", "L"], icon: "🪸" },
  { id: 5,  name: "Pastel Dune Arm Cuff", category: "armcuffs",   collection: "pastel", price: 1499,
    description: "An adjustable arm cuff that wraps the upper arm like a soft dune ridge.",
    variants: ["Adjustable"], icon: "🐚" },
  { id: 6,  name: "Coral Whisper Ring",   category: "rings",      collection: "pastel", price: 829,
    description: "A whisper-thin band brushed with the palest coral — barely there, never forgotten.",
    variants: ["5", "6", "7", "8"], icon: "💍" },

  // ---- Gold Beach Collection ----
  { id: 7,  name: "Golden Hour Ring",     category: "rings",      collection: "gold",   price: 1199,
    description: "Warm gold that glows like the last light over the water. A keepsake of golden hour.",
    variants: ["5", "6", "7", "8"], icon: "💍" },
  { id: 8,  name: "Sunlit Shell Earrings", category: "earrings",  collection: "gold",   price: 999,
    description: "Shell-form studs cast in warm gold — a sunlit souvenir for the ears.",
    variants: [], icon: "🐚" },
  { id: 9,  name: "Amber Coast Necklace", category: "neckpieces", collection: "gold",   price: 1799,
    description: "A statement neckpiece in amber-gold, echoing sand warmed by the afternoon sun.",
    variants: ["16\"", "18\"", "20\""], icon: "📿" },
  { id: 10, name: "Gilded Surf Bangle",   category: "bangles",    collection: "gold",   price: 1599,
    description: "A bold gold hand bangle with the rolling curve of a breaking wave.",
    variants: ["S", "M", "L"], icon: "🌊" },
  { id: 11, name: "Sandbar Arm Cuff",     category: "armcuffs",   collection: "gold",   price: 1999,
    description: "A sculpted gold arm cuff inspired by the smooth lines of a tidal sandbar.",
    variants: ["Adjustable"], icon: "✨" },
  { id: 12, name: "Driftwood Gold Ring",  category: "rings",      collection: "gold",   price: 1049,
    description: "Organic, textured gold band shaped like sea-smoothed driftwood.",
    variants: ["5", "6", "7", "8"], icon: "💍" }
];

const CATEGORY_LABELS = {
  rings: "Rings", earrings: "Earrings", neckpieces: "Neckpieces",
  bangles: "Hand Bangles", armcuffs: "Arm Cuffs"
};

const fmtINR = (n) => "₹" + n.toLocaleString("en-IN");

/* =========================================================
   3. CART STATE (localStorage)
   ========================================================= */
const CART_KEY = "devora_cart";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}
function addToCart(productId, variant = null, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.variant === variant);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, variant, qty });
  saveCart(cart);
  showToast("Added to your shore 🐚");
}
function removeFromCart(productId, variant) {
  saveCart(getCart().filter(i => !(i.id === productId && i.variant === variant)));
}
function changeQty(productId, variant, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.variant === variant);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(productId, variant);
  saveCart(cart);
}
function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
function cartSubtotal() {
  return getCart().reduce((s, i) => {
    const p = products.find(p => p.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
}

/* =========================================================
   4. RENDER — products grid + filters
   ========================================================= */
let activeCategory = "all";
let activeCollection = "all";

function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const filtered = products.filter(p =>
    (activeCategory === "all" || p.category === activeCategory) &&
    (activeCollection === "all" || p.collection === activeCollection)
  );

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state">No pieces match — try another tide.</div>`;
    return;
  }

  const wishlist = getWishlist();
  grid.innerHTML = filtered.map(p => `
    <article class="product-card reveal" data-id="${p.id}">
      <div class="product-image ${p.collection}" data-open="${p.id}">
        <span>${p.icon}</span>
        <button class="wishlist ${wishlist.includes(p.id) ? "active" : ""}"
                data-wish="${p.id}" aria-label="Add to wishlist">♥</button>
      </div>
      <div class="product-info">
        <span class="product-cat">${CATEGORY_LABELS[p.category]}</span>
        <h3 class="product-name" data-open="${p.id}">${p.name}</h3>
        <span class="product-price">${fmtINR(p.price)}</span>
        <button class="btn ${p.collection === "gold" ? "btn-gold" : "btn-pastel"}"
                data-add="${p.id}">Add to Cart</button>
      </div>
    </article>
  `).join("");

  observeReveals();
}

function buildFilters() {
  const catBar = document.getElementById("filter-categories");
  const colBar = document.getElementById("filter-collections");
  if (!catBar || !colBar) return;

  const cats = [["all", "All"], ...Object.entries(CATEGORY_LABELS)];
  catBar.innerHTML = cats.map(([v, l]) =>
    `<button class="chip ${v === activeCategory ? "active" : ""}" data-cat="${v}">${l}</button>`
  ).join("");

  const cols = [["all", "All"], ["pastel", "Pastel Beach"], ["gold", "Gold Beach"]];
  colBar.innerHTML = cols.map(([v, l]) =>
    `<button class="chip ${v === activeCollection ? "active" : ""}" data-col="${v}">${l}</button>`
  ).join("");
}

/* =========================================================
   5. WISHLIST (localStorage, light touch)
   ========================================================= */
const WISH_KEY = "devora_wishlist";
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }
  catch { return []; }
}
function toggleWishlist(id) {
  let w = getWishlist();
  w = w.includes(id) ? w.filter(x => x !== id) : [...w, id];
  localStorage.setItem(WISH_KEY, JSON.stringify(w));
}

/* =========================================================
   6. PRODUCT MODAL
   ========================================================= */
let modalProduct = null;
let modalVariant = null;

function openModal(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  modalProduct = p;
  modalVariant = p.variants.length ? p.variants[0] : null;

  const overlay = document.getElementById("modal-overlay");
  if (!overlay) return;

  overlay.querySelector(".modal-image").className = `modal-image ${p.collection}`;
  overlay.querySelector(".modal-image").innerHTML = `<span>${p.icon}</span>`;
  overlay.querySelector("#modal-badge").className = `badge ${p.collection}`;
  overlay.querySelector("#modal-badge").textContent =
    p.collection === "gold" ? "Gold Beach Collection" : "Pastel Beach Collection";
  overlay.querySelector("#modal-cat").textContent = CATEGORY_LABELS[p.category];
  overlay.querySelector("#modal-name").textContent = p.name;
  overlay.querySelector("#modal-price").textContent = fmtINR(p.price);
  overlay.querySelector("#modal-desc").textContent = p.description;

  const variantRow = overlay.querySelector("#modal-variant-row");
  if (p.variants.length) {
    variantRow.classList.remove("hidden");
    variantRow.querySelector(".variant-options").innerHTML = p.variants.map((v, i) =>
      `<button class="variant-opt ${i === 0 ? "active" : ""}" data-variant="${v}">${v}</button>`
    ).join("");
  } else {
    variantRow.classList.add("hidden");
  }

  const addBtn = overlay.querySelector("#modal-add");
  const buyBtn = overlay.querySelector("#modal-buy");
  addBtn.className = `btn ${p.collection === "gold" ? "btn-gold" : "btn-pastel"}`;
  buyBtn.className = "btn btn-outline";

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
  modalProduct = null;
}

/* =========================================================
   7. CART DRAWER + BADGE
   ========================================================= */
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const c = cartCount();
  badge.textContent = c;
  badge.classList.toggle("show", c > 0);
}
function openCart() {
  document.getElementById("cart-drawer")?.classList.add("open");
  document.getElementById("drawer-overlay")?.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cart-drawer")?.classList.remove("open");
  document.getElementById("drawer-overlay")?.classList.remove("open");
  document.body.style.overflow = "";
}
function renderCart() {
  const wrap = document.getElementById("cart-items");
  if (!wrap) return;
  const cart = getCart();

  if (!cart.length) {
    wrap.innerHTML = `<p class="cart-empty">Your bag is as empty as a quiet shore.</p>`;
  } else {
    wrap.innerHTML = cart.map(i => {
      const p = products.find(p => p.id === i.id);
      if (!p) return "";
      return `
        <div class="cart-item">
          <div class="cart-item-img ${p.collection}">${p.icon}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-meta">${CATEGORY_LABELS[p.category]}${i.variant ? " · " + i.variant : ""}</div>
            <div class="cart-item-price">${fmtINR(p.price)}</div>
            <div class="qty-controls">
              <button class="qty-btn" data-dec='${JSON.stringify({id:i.id,v:i.variant})}'>−</button>
              <span class="qty-val">${i.qty}</span>
              <button class="qty-btn" data-inc='${JSON.stringify({id:i.id,v:i.variant})}'>+</button>
              <button class="remove-btn" data-remove='${JSON.stringify({id:i.id,v:i.variant})}'>Remove</button>
            </div>
          </div>
        </div>`;
    }).join("");
  }

  const sub = document.getElementById("cart-subtotal-val");
  if (sub) sub.textContent = fmtINR(cartSubtotal());
}

/* =========================================================
   8. FIREBASE GOOGLE AUTH (v9 modular, loaded as module)
   We expose auth helpers on window so this non-module file can call them.
   See the <script type="module"> block in the HTML.
   ========================================================= */
let currentUser = null;

function onAuthChange(user) {
  currentUser = user;
  renderAuthArea();
  // If we were mid-checkout and just logged in, reveal the form.
  if (user) revealCheckoutForm();
}

function renderAuthArea() {
  const area = document.getElementById("auth-area");
  if (!area) return;

  if (currentUser) {
    const photo = currentUser.photoURL || "";
    area.innerHTML = `
      <div class="avatar-wrap">
        <img class="avatar" id="nav-avatar"
             src="${photo || avatarFallback(currentUser.displayName)}" alt="profile" />
        <div class="avatar-menu" id="avatar-menu">
          <div class="menu-name">${currentUser.displayName || "Guest"}</div>
          <div class="menu-email">${currentUser.email || ""}</div>
          <button class="btn btn-outline btn-block" id="logout-btn">Log out</button>
        </div>
      </div>`;
    document.getElementById("nav-avatar").addEventListener("click", () =>
      document.getElementById("avatar-menu").classList.toggle("open"));
    document.getElementById("logout-btn").addEventListener("click", () => {
      if (window.devoraLogout) window.devoraLogout();
      document.getElementById("avatar-menu").classList.remove("open");
    });
  } else {
    area.innerHTML = "";
  }
}

function avatarFallback(name) {
  const letter = (name || "D").charAt(0).toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='38' height='38'>
    <rect width='38' height='38' fill='%23F7C5D5'/>
    <text x='50%' y='55%' font-size='18' fill='%233A2A2A'
      font-family='serif' text-anchor='middle' dominant-baseline='middle'>${letter}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

function startGoogleLogin() {
  if (window.devoraLogin) {
    window.devoraLogin();
  } else {
    showToast("Connect Firebase config to enable sign-in.");
  }
}

/* =========================================================
   9. CHECKOUT + UPI
   ========================================================= */
function goToCheckout() {
  closeCart();
  if (!getCart().length) { showToast("Add a piece before checkout 🐚"); return; }
  // On index page, jump to products page checkout.
  if (!document.getElementById("checkout-section")) {
    window.location.href = "products.html#checkout";
    return;
  }
  document.getElementById("checkout-section").scrollIntoView({ behavior: "smooth" });
  toggleCheckoutGate();
}

function toggleCheckoutGate() {
  const gate = document.getElementById("login-gate");
  const form = document.getElementById("checkout-content");
  if (!gate || !form) return;
  if (currentUser) { gate.classList.add("hidden"); form.classList.remove("hidden"); revealCheckoutForm(); }
  else { gate.classList.remove("hidden"); form.classList.add("hidden"); }
}

function revealCheckoutForm() {
  const gate = document.getElementById("login-gate");
  const form = document.getElementById("checkout-content");
  if (gate && form && currentUser) {
    gate.classList.add("hidden");
    form.classList.remove("hidden");
    // Prefill name from Google profile
    const nameInput = document.getElementById("co-name");
    if (nameInput && !nameInput.value && currentUser.displayName)
      nameInput.value = currentUser.displayName;
    renderCheckoutSummary();
  }
}

function renderCheckoutSummary() {
  const wrap = document.getElementById("summary-lines");
  if (!wrap) return;
  const cart = getCart();
  wrap.innerHTML = cart.map(i => {
    const p = products.find(p => p.id === i.id);
    if (!p) return "";
    return `<div class="summary-line">
      <span>${p.name}${i.variant ? " (" + i.variant + ")" : ""} × ${i.qty}</span>
      <span>${fmtINR(p.price * i.qty)}</span></div>`;
  }).join("");
  const total = document.getElementById("summary-total-val");
  if (total) total.textContent = fmtINR(cartSubtotal());
}

function placeOrderUPI() {
  const name = document.getElementById("co-name")?.value.trim();
  const phone = document.getElementById("co-phone")?.value.trim();
  const street = document.getElementById("co-street")?.value.trim();
  const city = document.getElementById("co-city")?.value.trim();
  const pincode = document.getElementById("co-pincode")?.value.trim();
  const state = document.getElementById("co-state")?.value.trim();

  if (!name || !phone || !street || !city || !pincode || !state) {
    showToast("Please complete your delivery details.");
    return;
  }

  const amount = cartSubtotal();
  const orderId = "DV" + Date.now().toString().slice(-8);

  // Order summary text
  const items = getCart().map(i => {
    const p = products.find(p => p.id === i.id);
    return `${p.name}${i.variant ? " (" + i.variant + ")" : ""} x${i.qty}`;
  }).join(", ");
  const note = `${orderId}`;

  // UPI deep link
  const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}` +
    `&pn=${encodeURIComponent(UPI_PAYEE_NAME)}` +
    `&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  console.log("De'Vora order", { orderId, name, phone, address: { street, city, pincode, state }, items, amount });

  // Try to open the UPI app
  window.location.href = upiLink;

  // Show fallback regardless
  const fb = document.getElementById("upi-fallback");
  if (fb) fb.classList.remove("hidden");
  showToast(`Order ${orderId} ready — complete payment via UPI.`);
}

/* =========================================================
   10. TOAST
   ========================================================= */
let toastTimer;
function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast"; t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* =========================================================
   11. SCROLL FX — nav frost, reveal, hero fade, particles
   ========================================================= */
function initNavScroll() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

let revealObserver;
function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => revealObserver.observe(el));
}

function initHeroFade() {
  const hero = document.getElementById("hero");
  const content = document.getElementById("hero-content");
  if (!hero || !content || !("IntersectionObserver" in window)) return;
  // Gracefully fade hero content as it leaves the viewport.
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const h = hero.offsetHeight;
    const ratio = Math.min(Math.max(1 - y / (h * 0.7), 0), 1);
    content.style.opacity = ratio;
    content.style.transform = `translateY(${(1 - ratio) * 40}px)`;
  }, { passive: true });
}

function makeParticles() {
  const layer = document.getElementById("particles");
  if (!layer) return;
  const count = window.innerWidth < 600 ? 16 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const size = 3 + Math.random() * 7;
    p.style.left = Math.random() * 100 + "%";
    p.style.width = p.style.height = size + "px";
    p.style.animationDuration = 9 + Math.random() * 12 + "s";
    p.style.animationDelay = -Math.random() * 15 + "s";
    p.style.opacity = 0.3 + Math.random() * 0.5;
    layer.appendChild(p);
  }
}

/* =========================================================
   12. MOBILE NAV
   ========================================================= */
function initMobileNav() {
  const burger = document.getElementById("hamburger");
  const links = document.getElementById("nav-links");
  if (!burger || !links) return;
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    burger.classList.remove("active");
    links.classList.remove("open");
  }));
}

/* =========================================================
   13. GLOBAL EVENT DELEGATION
   ========================================================= */
function initDelegation() {
  document.addEventListener("click", (e) => {
    const t = e.target;

    // Add to cart (grid)
    if (t.dataset.add) { addToCart(Number(t.dataset.add)); return; }
    // Open modal
    if (t.dataset.open) { openModal(Number(t.dataset.open)); return; }
    // Wishlist
    if (t.dataset.wish) {
      toggleWishlist(Number(t.dataset.wish));
      t.classList.toggle("active");
      return;
    }
    // Filters
    if (t.dataset.cat) {
      activeCategory = t.dataset.cat; buildFilters(); renderProducts(); return;
    }
    if (t.dataset.col) {
      activeCollection = t.dataset.col; buildFilters(); renderProducts(); return;
    }
    // Cart qty controls
    if (t.dataset.inc) { const d = JSON.parse(t.dataset.inc); changeQty(d.id, d.v, 1); return; }
    if (t.dataset.dec) { const d = JSON.parse(t.dataset.dec); changeQty(d.id, d.v, -1); return; }
    if (t.dataset.remove) { const d = JSON.parse(t.dataset.remove); removeFromCart(d.id, d.v); return; }

    // Modal variant select
    if (t.dataset.variant) {
      modalVariant = t.dataset.variant;
      document.querySelectorAll("#modal-variant-row .variant-opt")
        .forEach(o => o.classList.toggle("active", o === t));
      return;
    }

    // Close avatar menu when clicking outside
    const menu = document.getElementById("avatar-menu");
    if (menu && menu.classList.contains("open") &&
        !t.closest(".avatar-wrap")) menu.classList.remove("open");
  });

  // Buttons by id
  bind("cart-open", "click", openCart);
  bind("cart-close", "click", closeCart);
  bind("drawer-overlay", "click", closeCart);
  bind("modal-close", "click", closeModal);
  bind("modal-overlay", "click", (e) => { if (e.target.id === "modal-overlay") closeModal(); });
  bind("cart-checkout", "click", goToCheckout);
  bind("place-order", "click", placeOrderUPI);
  bind("google-login", "click", startGoogleLogin);
  bind("copy-upi", "click", () => {
    navigator.clipboard?.writeText(UPI_ID);
    showToast("UPI ID copied ✦");
  });

  // Modal add / buy
  bind("modal-add", "click", () => {
    if (modalProduct) { addToCart(modalProduct.id, modalVariant); closeModal(); openCart(); }
  });
  bind("modal-buy", "click", () => {
    if (modalProduct) { addToCart(modalProduct.id, modalVariant); closeModal(); goToCheckout(); }
  });

  // Escape closes overlays
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeModal(); closeCart(); }
  });
}
function bind(id, evt, fn) {
  const el = document.getElementById(id);
  if (el) el.addEventListener(evt, fn);
}

/* =========================================================
   14. SET UPI FALLBACK TEXT
   ========================================================= */
function initUpiText() {
  document.querySelectorAll(".upi-id").forEach(el => el.textContent = UPI_ID);
}

/* =========================================================
   15. INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Preselect collection from URL (?c=pastel / ?c=gold)
  const params = new URLSearchParams(window.location.search);
  const c = params.get("c");
  if (c === "pastel" || c === "gold") activeCollection = c;

  buildFilters();
  renderProducts();
  renderCart();
  updateCartBadge();
  renderCheckoutSummary();
  initNavScroll();
  initMobileNav();
  initHeroFade();
  makeParticles();
  observeReveals();
  initDelegation();
  initUpiText();

  // Deep-link to checkout (e.g. coming from index "Buy Now")
  if (window.location.hash === "#checkout") {
    setTimeout(() => {
      document.getElementById("checkout-section")?.scrollIntoView();
      toggleCheckoutGate();
    }, 300);
  }
});

// Expose for the Firebase module script
window.devoraOnAuthChange = onAuthChange;
window.devoraFirebaseConfig = firebaseConfig;
