/* ================================================================
   Khoozo — js/cart.js
   Client-side shopping cart for digital products. Fully static: the
   cart lives in localStorage on the customer's own device — there is
   no server, so there is nothing to see from the business side until
   checkout, where js/training.js turns it into an order (manual
   bKash/Nagad "Send Money" + WhatsApp confirmation, same as a single
   product purchase).
     Any page            → cart badge (".cart-badge") + "Add to Cart"
                            buttons (any [data-add-to-cart] element)
     cart.html            → cart page (#cartRoot)
     pay.html?cart=1      → checkout for everything in the cart
   Load order: js/i18n.js, js/products.js, js/cart.js, js/training.js
   (cart.js reads KHOOZO_PRODUCTS; training.js reads the cart).
   ================================================================ */
"use strict";

const KHOOZO_CART_KEY = "khoozo-cart";

const KHOOZO_CART_I18N = {
  en: {
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty.",
    "cart.empty.cta": "Browse digital products",
    "cart.qty": "Qty", "cart.subtotal": "Subtotal",
    "cart.remove": "Remove item",
    "cart.checkout": "Proceed to Checkout",
    "cart.continue": "Continue shopping",
    "cart.added": "Added ✓",
    "cart.addtocart": "Add to Cart",
    "cart.plan.pack": "Digital pack",
    "cart.plan.combo": "Combo with live course",
    "cart.plan.course": "Training course",
    "cart.note": "One-time payment per item",
  },
  bn: {
    "cart.title": "আপনার কার্ট",
    "cart.empty": "আপনার কার্ট খালি।",
    "cart.empty.cta": "ডিজিটাল পণ্য দেখুন",
    "cart.qty": "পরিমাণ", "cart.subtotal": "সাবটোটাল",
    "cart.remove": "বাদ দিন",
    "cart.checkout": "চেকআউট করুন",
    "cart.continue": "আরও কেনাকাটা করুন",
    "cart.added": "যোগ হয়েছে ✓",
    "cart.addtocart": "কার্টে যোগ করুন",
    "cart.plan.pack": "ডিজিটাল প্যাক",
    "cart.plan.combo": "লাইভ কোর্সসহ কম্বো",
    "cart.plan.course": "ট্রেনিং কোর্স",
    "cart.note": "প্রতিটি পণ্যের জন্য এককালীন পেমেন্ট",
  },
};
if (typeof KHOOZO_I18N_DICT !== "undefined") {
  Object.assign(KHOOZO_I18N_DICT.en, KHOOZO_CART_I18N.en);
  Object.assign(KHOOZO_I18N_DICT.bn, KHOOZO_CART_I18N.bn);
}

(function () {
  const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
  const lang = () => (document.documentElement.getAttribute("lang") === "bn" ? "bn" : "en");
  const t = (key) => (KHOOZO_CART_I18N[lang()] || {})[key] ?? KHOOZO_CART_I18N.en[key] ?? key;
  const digits = (s) => (lang() === "bn" ? String(s).replace(/\d/g, (d) => BN_DIGITS[d]) : String(s));
  const taka = (n) => "৳" + digits(Number(n).toLocaleString("en-IN"));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function readCart() {
    try { return JSON.parse(localStorage.getItem(KHOOZO_CART_KEY) || "[]"); } catch (e) { return []; }
  }
  function writeCart(cart) {
    try { localStorage.setItem(KHOOZO_CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage blocked */ }
    renderBadge();
  }
  const findIndex = (cart, id, plan) => cart.findIndex((it) => it.id === id && it.plan === plan);

  function addToCart(id, plan, qty) {
    qty = Math.max(1, qty || 1);
    const cart = readCart();
    const i = findIndex(cart, id, plan);
    if (i > -1) cart[i].qty += qty;
    else cart.push({ id, plan, qty });
    writeCart(cart);
    return cart;
  }
  function removeFromCart(id, plan) {
    const cart = readCart().filter((it) => !(it.id === id && it.plan === plan));
    writeCart(cart);
    return cart;
  }
  function setQty(id, plan, qty) {
    const cart = readCart();
    const i = findIndex(cart, id, plan);
    if (i > -1) {
      if (qty <= 0) cart.splice(i, 1);
      else cart[i].qty = qty;
    }
    writeCart(cart);
    return cart;
  }
  function clearCart() { writeCart([]); }

  /* Attaches product data to each cart row; silently drops any entry
     whose product id no longer exists in the catalogue. */
  function enrich(cart) {
    return cart
      .map((it) => {
        if (it.plan === "course") {
          const c = typeof KHOOZO_COURSES !== "undefined" ? KHOOZO_COURSES.find((x) => x.id === it.id) : null;
          if (!c) return null;
          const product = { ...c, icon: "fa-solid fa-graduation-cap", colors: ["#7f1d1d", "#9E1B1B"] };
          return { id: c.id, plan: "course", qty: it.qty, unitPrice: c.price, unitOriginal: c.originalPrice, lineTotal: c.price * it.qty, product };
        }
        const p = typeof KHOOZO_PRODUCTS !== "undefined" ? KHOOZO_PRODUCTS.find((x) => x.id === it.id) : null;
        if (!p) return null;
        const plan = it.plan === "combo" ? "combo" : "pack";
        const o = p[plan];
        return { id: p.id, plan, qty: it.qty, unitPrice: o.price, unitOriginal: o.originalPrice, lineTotal: o.price * it.qty, product: p };
      })
      .filter(Boolean);
  }
  const cartCount = () => readCart().reduce((n, it) => n + it.qty, 0);
  const cartTotal = () => enrich(readCart()).reduce((s, it) => s + it.lineTotal, 0);

  function renderBadge() {
    const n = cartCount();
    document.querySelectorAll(".cart-badge").forEach((el) => {
      el.textContent = digits(n);
      el.classList.toggle("is-hidden", n === 0);
    });
  }

  /* Any element with [data-add-to-cart="<productId>"] (optionally
     [data-cart-plan="pack|combo"] and [data-qty-input] to read quantity
     from a sibling stepper) becomes an "Add to Cart" button. Deliberately
     NOT named "data-plan" — product.html already uses that attribute for
     its pack/combo plan-switcher radios, and sharing the name would make
     this button trigger that handler too. */
  function wireAddButtons(scope) {
    (scope || document).querySelectorAll("[data-add-to-cart]").forEach((btn) => {
      if (btn.__cartWired) return;
      btn.__cartWired = true;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute("data-add-to-cart");
        const plan = btn.getAttribute("data-cart-plan") || "pack";
        const qtyInput = btn.getAttribute("data-qty-input");
        const qtyEl = qtyInput ? document.getElementById(qtyInput) : null;
        const qty = qtyEl ? Math.max(1, parseInt(qtyEl.textContent || qtyEl.value, 10) || 1) : 1;
        addToCart(id, plan, qty);
        const label = btn.querySelector(".add-label") || btn;
        const prev = label.textContent;
        btn.classList.add("is-added");
        label.textContent = t("cart.added");
        setTimeout(() => {
          btn.classList.remove("is-added");
          label.textContent = prev;
        }, 1400);
      });
    });
  }

  /* ---------------- cart.html ---------------- */
  function renderCartPage() {
    const root = document.getElementById("cartRoot");
    if (!root) return;
    const items = enrich(readCart());
    if (!items.length) {
      root.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
          <p>${t("cart.empty")}</p>
          <a class="btn btn-primary" href="index.html#products">${t("cart.empty.cta")}</a>
        </div>`;
      return;
    }
    const planLabel = (plan) => t("cart.plan." + plan);
    const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);

    root.innerHTML = `
      <h1 class="cart-h1">${t("cart.title")}</h1>
      <div class="cart-layout">
        <div class="cart-lines">
          ${items
            .map(
              (it) => `
            <div class="cart-line" data-id="${it.id}" data-plan="${it.plan}">
              <span class="cart-line-icon" style="--dp1:${it.product.colors[0]};--dp2:${it.product.colors[1]}"><i class="${it.product.icon}" aria-hidden="true"></i></span>
              <div class="cart-line-info">
                <a href="${it.plan === "course" ? "course" : "product"}.html?id=${it.id}">${esc(it.product[lang()].title)}</a>
                <span class="cart-line-plan">${planLabel(it.plan)}</span>
                <span class="cart-line-unit">${taka(it.unitPrice)} × ${digits(it.qty)}</span>
              </div>
              <div class="cart-line-qty">
                <button type="button" data-qty="dec" aria-label="Decrease quantity">−</button>
                <span>${digits(it.qty)}</span>
                <button type="button" data-qty="inc" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-line-price">${taka(it.lineTotal)}</div>
              <button type="button" class="cart-line-remove" data-remove aria-label="${t("cart.remove")}"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
            </div>`,
            )
            .join("")}
        </div>
        <aside class="tr-panel cart-summary">
          <div class="cart-summary-row"><span>${t("cart.subtotal")}</span><b>${taka(subtotal)}</b></div>
          <a class="btn btn-primary btn-block" href="pay.html?cart=1"><i class="fa-solid fa-lock" aria-hidden="true"></i> ${t("cart.checkout")}</a>
          <p class="tr-note" style="margin-top:10px">${t("cart.note")}</p>
          <a class="tr-link" style="margin-top:10px;justify-content:center" href="index.html#products">${t("cart.continue")}</a>
        </aside>
      </div>`;

    root.querySelectorAll(".cart-line").forEach((line) => {
      const id = line.getAttribute("data-id");
      const plan = line.getAttribute("data-plan");
      const current = () => (enrich(readCart()).find((x) => x.id === id && x.plan === plan) || { qty: 1 }).qty;
      line.querySelector('[data-qty="inc"]').addEventListener("click", () => { setQty(id, plan, current() + 1); renderCartPage(); });
      line.querySelector('[data-qty="dec"]').addEventListener("click", () => { setQty(id, plan, current() - 1); renderCartPage(); });
      line.querySelector("[data-remove]").addEventListener("click", () => { removeFromCart(id, plan); renderCartPage(); });
    });
  }

  window.KhoozoCart = { readCart, addToCart, removeFromCart, setQty, clearCart, cartCount, cartTotal, enrich, wireAddButtons };

  function renderAll() {
    renderBadge();
    wireAddButtons();
    renderCartPage();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAll();
    new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  });
})();
