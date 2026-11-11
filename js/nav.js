/* Menu (mega menu where present, active link) and the Home review slider. */
(function () {
  const group = document.querySelector(".nav-group");
  if (group) {
    const btn = group.querySelector(".nav-group-btn");
    const setOpen = (open) => {
      group.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    };
    btn.addEventListener("click", () => setOpen(!group.classList.contains("is-open")));
    document.addEventListener("click", (e) => { if (!group.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    group.querySelectorAll(".mega-item").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  /* Highlight the menu item for pages that don't use the homepage scrollspy. */
  const page = location.pathname.split("/").pop();
  const active = { "product.html": "[data-nav-shop]", "cart.html": "[data-nav-shop]", "favorites.html": "[data-nav-shop]" }[page]
    || (page === "project.html" && new URLSearchParams(location.search).get("id") === "khoozo" ? "[data-nav-app]" : null);
  if (active) {
    const el = document.querySelector(".nav " + active);
    if (el) el.classList.add("is-active");
  }

  const slider = document.getElementById("reviewSlider");
  /* Real reviews from js/reviews-data.js come first; the admin app's reviews
     are added when the API answers. Pages with the review pop-up
     (<body data-review-toast>) use the same list (js/review-toast.js). */
  const builtin = typeof KHOOZO_REVIEWS !== "undefined" ? KHOOZO_REVIEWS : [];
  if (!slider && !document.body.hasAttribute("data-review-toast")) return;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  const port = isLocal ? sessionStorage.getItem("khoozo_api_port") || "3200" : "";
  const api = (isLocal ? "http://localhost:" + port : "https://api.khoozo.com") + "/api/v1/customer-reviews";
  const sources = { FACEBOOK: ["fa-facebook-f", "Facebook"], WHATSAPP: ["fa-whatsapp", "WhatsApp"], GOOGLE: ["fa-google", "Google"] };
  const bn = () => document.documentElement.getAttribute("lang") === "bn";
  let reviews = [];
  let started = false;

  function drawSlides() {
    slider.querySelector(".review-track").innerHTML = reviews.map((r) => {
      const source = sources[r.source];
      const text = (bn() && r.textBn) || r.textEn || r.textBn;
      const service = (bn() && r.serviceBn) || r.serviceEn || r.serviceBn;
      return `<figure class="quote-card review-slide">
        <div class="quote-stars" role="img" aria-label="${r.rating} out of 5 stars">${'<i class="fa-solid fa-star" aria-hidden="true"></i>'.repeat(r.rating)}</div>
        ${r.image ? `<img class="review-image" src="${esc(r.image)}" alt="" loading="lazy">` : ""}
        ${text ? `<blockquote>${esc(text)}</blockquote>` : ""}
        <figcaption><strong>${esc(r.customerName)}</strong>${service ? `<span>${esc(service)}</span>` : ""}${source ? `<span class="review-source"><i class="fa-brands ${source[0]}" aria-hidden="true"></i> ${source[1]}</span>` : ""}</figcaption>
      </figure>`;
    }).join("");
  }

  if (slider) new MutationObserver(() => { if (reviews.length) drawSlides(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  /* Shows the section (only once there is at least one real review) and
     hands the list to the pop-up. */
  function publish(list) {
    reviews = list.filter((r) => r && r.customerName && r.rating);
    if (!reviews.length) return;
    /* Kept on window too: the pop-up script may load after this runs. */
    window.khoozoReviewList = reviews;
    document.dispatchEvent(new CustomEvent("khoozo:reviews", { detail: reviews }));
    if (!slider || started) return;
    started = true;
    drawSlides();
    document.getElementById("reviews").hidden = false;
    startSlider();
  }

  fetch(api, { headers: { Accept: "application/json" } })
    .then((res) => (res.ok ? res.json() : []))
    .then((list) => publish(builtin.concat(Array.isArray(list) ? list : [])))
    .catch(() => publish(builtin));

  function startSlider() {
  const track = slider.querySelector(".review-track");
  const slides = Array.from(track.children);
  if (slides.length < 2) slider.classList.add("is-single");
  const dots = slider.querySelector(".review-dots");
  let index = 0;

  dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="${i + 1} / ${slides.length}"></button>`).join("");
  const dotBtns = Array.from(dots.children);
  const mark = () => dotBtns.forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[index].offsetLeft - track.offsetLeft, behavior: "smooth" });
    mark();
  };
  dotBtns.forEach((d, i) => d.addEventListener("click", () => go(i)));
  slider.querySelector("[data-review-prev]").addEventListener("click", () => go(index - 1));
  slider.querySelector("[data-review-next]").addEventListener("click", () => go(index + 1));
  track.addEventListener("scroll", () => {
    const w = track.clientWidth;
    if (!w) return;
    index = Math.round(track.scrollLeft / w);
    mark();
  }, { passive: true });
  mark();

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let paused = false;
  ["mouseenter", "focusin", "touchstart"].forEach((ev) => slider.addEventListener(ev, () => { paused = true; }, { passive: true }));
  ["mouseleave", "focusout"].forEach((ev) => slider.addEventListener(ev, () => { paused = false; }));
  setInterval(() => {
    const r = slider.getBoundingClientRect();
    if (!paused && !document.hidden && r.top < innerHeight && r.bottom > 0) go(index + 1);
  }, 7000);
  }
})();
