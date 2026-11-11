/* ================================================================
   Khoozo — js/review-toast.js
   A small pop-up (bottom-left) that takes turns showing:
   - real recent purchases: paid orders from the Khoozo backend
     (GET /api/v1/shop/recent-purchases — first name + last initial only),
     e.g. "Rahim K. bought ATS CV Vault · 2 hours ago";
   - real customer reviews: the same list as the homepage review section
     (js/reviews-data.js plus the admin app's reviews).
   With no purchases and no reviews it shows nothing. It never invents
   purchases, names or times.
   ================================================================ */
"use strict";

(function () {
  const FIRST_DELAY = 7000;   // ms before the first pop-up
  const SHOW_FOR = 7000;      // ms each pop-up stays
  const GAP = 20000;          // ms between pop-ups
  const MAX_PER_VISIT = 4;
  const CLOSED_KEY = "khoozo_review_toast_closed";
  const SOURCES = { FACEBOOK: ["fa-brands fa-facebook-f", "Facebook"], WHATSAPP: ["fa-brands fa-whatsapp", "WhatsApp"], GOOGLE: ["fa-brands fa-google", "Google"] };

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const bn = () => document.documentElement.getAttribute("lang") === "bn";
  const tr = (key, fallback, vars) => (window.khoozoT ? window.khoozoT(key, fallback, vars) : fallback);
  const short = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  let port = "3200";
  try { port = (isLocal && sessionStorage.getItem("khoozo_api_port")) || "3200"; } catch (e) { /* storage blocked */ }
  const API = (isLocal ? "http://localhost:" + port : "https://api.khoozo.com") + "/api/v1/shop/recent-purchases";

  let reviews = [];
  let purchases = [];
  let turn = 0;           // even turns prefer a purchase, odd turns a review
  let ri = 0;
  let pi = 0;
  let shown = 0;
  let timer = null;
  let box = null;

  function closedForSession() {
    try { return sessionStorage.getItem(CLOSED_KEY) === "1"; } catch (e) { return false; }
  }

  /* ---------- purchases ---------- */

  /* Finds the product/course an order row points to, in the visitor's language. */
  function lookup(id, isCourse) {
    const lists = isCourse
      ? [typeof KHOOZO_COURSES !== "undefined" ? KHOOZO_COURSES : []]
      : [typeof KHOOZO_PRODUCTS !== "undefined" ? KHOOZO_PRODUCTS : [], typeof KHOOZO_COURSES !== "undefined" ? KHOOZO_COURSES : []];
    for (const list of lists) {
      const item = list.find((x) => x && x.id === id);
      if (item) {
        const lang = (bn() && item.bn) || item.en || {};
        const title = lang.title || (item.en && item.en.title);
        if (!title) return null;
        const course = isCourse || list !== lists[0];
        return { title, href: (course ? "course.html?id=" : "product.html?id=") + encodeURIComponent(id) };
      }
    }
    return null;
  }

  /* Turns the API's rows into pop-up entries; drops rows we can't name. */
  function toEntries(rows) {
    return rows.map((row) => {
      if (!row || !row.name || !row.at || isNaN(Date.parse(row.at))) return null;
      const found = Array.isArray(row.items) && row.items.length
        ? row.items.map((it) => lookup(it && it.id, false)).filter(Boolean)
        : row.courseId ? [lookup(row.courseId, true)].filter(Boolean) : [];
      if (!found.length) return null;
      return { kind: "purchase", name: String(row.name), first: found[0], more: found.length - 1, at: Date.parse(row.at) };
    }).filter(Boolean);
  }

  function ago(time) {
    const secs = Math.max(0, (Date.now() - time) / 1000);
    if (secs < 60) return tr("rp.justNow", "just now");
    const [value, unit] = secs < 3600 ? [secs / 60, "minute"] : secs < 86400 ? [secs / 3600, "hour"] : secs < 604800 ? [secs / 86400, "day"] : [secs / 604800, "week"];
    try {
      return new Intl.RelativeTimeFormat(bn() ? "bn-BD" : "en", { numeric: "auto" }).format(-Math.floor(value), unit);
    } catch (e) {
      return Math.floor(value) + " " + unit + "(s) ago";
    }
  }

  function renderPurchase(p) {
    const product = `<a href="${esc(p.first.href)}">${esc(p.first.title)}</a>`;
    const more = p.more > 0 ? " " + tr("rp.more", "and {n} more", { n: p.more }) : "";
    box.innerHTML = `
      <span class="review-toast-avatar is-purchase" aria-hidden="true"><i class="fa-solid fa-bag-shopping"></i></span>
      <div class="review-toast-body">
        <p class="review-toast-head"><strong>${esc(p.name)}</strong></p>
        <p class="review-toast-text is-purchase">${tr("rp.bought", "bought {product}").replace("{product}", product)}${more}</p>
        <p class="review-toast-meta"><i class="fa-regular fa-clock" aria-hidden="true"></i> ${esc(ago(p.at))}
          · <span class="review-toast-verified"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> ${tr("rp.verified", "Verified purchase")}</span></p>
      </div>
      ${closeBtn()}`;
  }

  /* ---------- reviews ---------- */

  function renderReview(r) {
    const source = SOURCES[r.source];
    const text = (bn() && r.textBn) || r.textEn || r.textBn || "";
    const service = (bn() && r.serviceBn) || r.serviceEn || r.serviceBn || "";
    const initial = esc(String(r.customerName).trim().charAt(0).toUpperCase());
    box.innerHTML = `
      <span class="review-toast-avatar" aria-hidden="true">${initial}</span>
      <div class="review-toast-body">
        <p class="review-toast-head"><strong>${esc(r.customerName)}</strong>
          <span class="review-toast-stars" role="img" aria-label="${r.rating} / 5">${'<i class="fa-solid fa-star" aria-hidden="true"></i>'.repeat(Math.min(5, r.rating))}</span></p>
        ${text ? `<p class="review-toast-text">“${esc(short(text, 110))}”</p>` : ""}
        <p class="review-toast-meta">${service ? `${esc(service)}` : ""}${source ? `${service ? " · " : ""}<i class="${source[0]}" aria-hidden="true"></i> ${tr("rv.via", "via {source}", { source: source[1] })}` : ""}</p>
        <a class="review-toast-link" href="index.html#reviews">${tr("rv.all", "See all reviews")}</a>
      </div>
      ${closeBtn()}`;
  }

  /* ---------- shared ---------- */

  function closeBtn() {
    return `<button type="button" class="review-toast-close" aria-label="${tr("rv.close", "Close")}"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>`;
  }

  function build() {
    if (box) return;
    box = document.createElement("aside");
    box.className = "review-toast";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    box.addEventListener("click", (e) => {
      if (!e.target.closest(".review-toast-close")) return;
      try { sessionStorage.setItem(CLOSED_KEY, "1"); } catch (err) { /* storage blocked */ }
      hide();
      clearTimeout(timer);
    });
    document.body.appendChild(box);
  }

  function hide() { if (box) box.classList.remove("is-open"); }

  /* Purchases and reviews take turns; if one list is empty the other fills in. */
  function pick() {
    const wantPurchase = turn % 2 === 0;
    turn += 1;
    if ((wantPurchase || !reviews.length) && purchases.length) return purchases[pi++ % purchases.length];
    if (reviews.length) return reviews[ri++ % reviews.length];
    return null;
  }

  function next() {
    if (closedForSession() || shown >= MAX_PER_VISIT) return;
    /* In a background tab, wait until the visitor comes back. */
    if (document.hidden) {
      document.addEventListener("visibilitychange", () => { timer = setTimeout(next, 1500); }, { once: true });
      return;
    }
    const entry = pick();
    if (!entry) return;
    if (entry.kind === "purchase") renderPurchase(entry); else renderReview(entry);
    shown += 1;
    requestAnimationFrame(() => box.classList.add("is-open"));
    timer = setTimeout(() => {
      hide();
      timer = setTimeout(next, GAP);
    }, SHOW_FOR);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled || closedForSession() || (!reviews.length && !purchases.length)) return;
    scheduled = true;
    build();
    timer = setTimeout(next, FIRST_DELAY);
  }

  function addReviews(list) {
    if (reviews.length || !list || !list.length) return;
    /* Newest first, so returning visitors see fresh reviews. */
    reviews = list.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    schedule();
  }
  document.addEventListener("khoozo:reviews", (e) => addReviews(e.detail));
  addReviews(window.khoozoReviewList); // the list may already be there

  /* Recent purchases, on pages that show the review section or the pop-up. */
  if (!document.getElementById("reviewSlider") && !document.body.hasAttribute("data-review-toast")) return;
  if (closedForSession()) return;
  fetch(API, { headers: { Accept: "application/json" } })
    .then((res) => (res.ok ? res.json() : []))
    .then((rows) => {
      /* Product lists are loaded by later scripts — read them once the page is ready. */
      const go = () => {
        purchases = toEntries(Array.isArray(rows) ? rows : []).sort((a, b) => b.at - a.at);
        schedule();
      };
      if (document.readyState === "complete") go(); else addEventListener("load", go, { once: true });
    })
    .catch(() => { /* API offline — reviews alone, or nothing */ });
})();
