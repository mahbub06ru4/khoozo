/* ================================================================
   Khoozo — js/review-toast.js
   A small pop-up (bottom-left) that shows real customer reviews, one at a
   time. It uses the same list as the homepage review section: built-in
   reviews from js/reviews-data.js plus the admin app's reviews. With no
   reviews it shows nothing. It never invents purchases or names.
   ================================================================ */
"use strict";

(function () {
  const FIRST_DELAY = 7000;   // ms before the first pop-up
  const SHOW_FOR = 7000;      // ms each pop-up stays
  const GAP = 22000;          // ms between pop-ups
  const MAX_PER_VISIT = 3;
  const CLOSED_KEY = "khoozo_review_toast_closed";
  const SOURCES = { FACEBOOK: ["fa-brands fa-facebook-f", "Facebook"], WHATSAPP: ["fa-brands fa-whatsapp", "WhatsApp"], GOOGLE: ["fa-brands fa-google", "Google"] };

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const bn = () => document.documentElement.getAttribute("lang") === "bn";
  const tr = (key, fallback, vars) => (window.khoozoT ? window.khoozoT(key, fallback, vars) : fallback);
  const short = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

  let list = [];
  let index = 0;
  let shown = 0;
  let timer = null;
  let box = null;

  function closedForSession() {
    try { return sessionStorage.getItem(CLOSED_KEY) === "1"; } catch (e) { return false; }
  }

  function build() {
    box = document.createElement("aside");
    box.className = "review-toast";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }

  function render(r) {
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
      <button type="button" class="review-toast-close" aria-label="${tr("rv.close", "Close")}"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>`;
    box.querySelector(".review-toast-close").addEventListener("click", () => {
      try { sessionStorage.setItem(CLOSED_KEY, "1"); } catch (e) { /* storage blocked */ }
      hide();
      clearTimeout(timer);
    });
  }

  function hide() { if (box) box.classList.remove("is-open"); }

  function next() {
    if (closedForSession() || shown >= MAX_PER_VISIT || !list.length) return;
    /* In a background tab, wait until the visitor comes back. */
    if (document.hidden) {
      document.addEventListener("visibilitychange", () => { timer = setTimeout(next, 1500); }, { once: true });
      return;
    }
    render(list[index % list.length]);
    index += 1;
    shown += 1;
    requestAnimationFrame(() => box.classList.add("is-open"));
    timer = setTimeout(() => {
      hide();
      timer = setTimeout(next, GAP);
    }, SHOW_FOR);
  }

  function start(reviews) {
    if (list.length || closedForSession() || !reviews || !reviews.length) return;
    /* Newest first, so returning visitors see fresh reviews. */
    list = reviews.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    build();
    timer = setTimeout(next, FIRST_DELAY);
  }
  document.addEventListener("khoozo:reviews", (e) => start(e.detail));
  start(window.khoozoReviewList); // the list may already be there
})();
