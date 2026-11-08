/* ================================================================
   Khoozo — js/main.js
   Core UI logic: navigation, theme, scroll progress, contact form.
   Scroll-reveal, counters, typing effect live in animation.js.
   Vanilla JS only — no dependencies.
   ================================================================ */
"use strict";

/* ---------------------------------------------------------------
   1. Sticky nav: glass background after scrolling
   --------------------------------------------------------------- */
const header = document.getElementById("siteHeader");
function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}
window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

/* ---------------------------------------------------------------
   2. Scroll progress bar
   --------------------------------------------------------------- */
const progressFill = document.getElementById("scrollProgressFill");
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = pct + "%";
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

/* ---------------------------------------------------------------
   3. Active-section nav tracking (scrollspy)
   --------------------------------------------------------------- */
const navAnchors = Array.from(document.querySelectorAll("[data-nav]"));
const sections = navAnchors
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = "#" + entry.target.id;
    navAnchors.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => spy.observe(s));

/* ---------------------------------------------------------------
   4. Mobile burger menu
   --------------------------------------------------------------- */
const burger = document.getElementById("burger");
const mainNav = document.getElementById("mainNav");

function closeMobileNav() {
  mainNav.classList.remove("is-open");
  burger.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Open menu");
}
burger.addEventListener("click", () => {
  const open = mainNav.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
mainNav.addEventListener("click", e => { if (e.target.tagName === "A") closeMobileNav(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
    closeMobileNav();
    burger.focus();
  }
});

/* ---------------------------------------------------------------
   5. Dark / light mode toggle (persisted in localStorage)
   One in the header, one in the footer — both share the
   .theme-toggle class so either can flip the theme.
   --------------------------------------------------------------- */
const themeToggles = document.querySelectorAll(".theme-toggle");
const root = document.documentElement;
const THEME_KEY = "khoozo-theme";

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggles.forEach(btn => {
    btn.setAttribute("aria-pressed", String(theme === "dark"));
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  });
}

/* Light by default, regardless of OS preference — only an explicit
   in-page toggle (saved below) switches to dark. */
const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggles.forEach(btn => btn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}));

/* ---------------------------------------------------------------
   6. Back-to-top button
   --------------------------------------------------------------- */
const backToTop = document.getElementById("backToTop");
function updateBackToTop() {
  backToTop.classList.toggle("is-visible", window.scrollY > 500);
}
window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------------------------------------------------------
   7. Contact form validation (static site — no backend)
   --------------------------------------------------------------- */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function validateField(field) {
  const control = field.querySelector("input, textarea, select");
  if (!control.hasAttribute("required")) return true; /* optional fields (e.g. phone) always pass */
  let ok = control.value.trim() !== "";
  if (ok && control.type === "email") {
    ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value.trim());
  }
  field.classList.toggle("has-error", !ok);
  return ok;
}

form?.querySelectorAll(".field").forEach(field => {
  const control = field.querySelector("input, textarea, select");
  control.addEventListener("blur", () => validateField(field));
  control.addEventListener("input", () => field.classList.remove("has-error"));
  control.addEventListener("change", () => field.classList.remove("has-error"));
});

form?.addEventListener("submit", e => {
  e.preventDefault();
  const fields = Array.from(form.querySelectorAll(".field"));
  const allValid = fields.map(validateField).every(Boolean);
  if (!allValid) {
    statusEl.textContent = "";
    form.querySelector(".has-error input, .has-error textarea, .has-error select")?.focus();
    return;
  }

  /* Static site: hand off to the visitor's email client with a prefilled message.
     To use a form backend instead (e.g. Formspree, Getform), replace this block
     with a fetch() POST to your form endpoint. */
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`[Website Inquiry] ${service} — ${name}`);
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Interested in: ${service}`,
    "",
    message
  ].filter(Boolean);
  const body = encodeURIComponent(bodyLines.join("\n"));

  window.location.href = `mailto:support.khoozo@gmail.com?subject=${subject}&body=${body}`;
  statusEl.textContent = "Opening your email app… If nothing happens, email us directly at support.khoozo@gmail.com.";
  form.reset();
});

/* ---------------------------------------------------------------
   8. Homepage promo banner slider
   Cross-fades the banners with a slow zoom, autoplays with a progress
   bar, and pauses on hover/focus or when the tab is hidden. Each banner
   has a wide (desktop) and a tall (phone) image per language.
   --------------------------------------------------------------- */
const promo = document.getElementById("promoSlider");
if (promo) {
  const slides = [...promo.querySelectorAll(".promo-slide")];
  const dotsWrap = document.getElementById("promoDots");
  const bar = document.getElementById("promoBar");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DURATION = 5500;
  let current = 0;
  let timer = null;

  dotsWrap.innerHTML = slides.map((_, i) => `<button type="button" class="promo-dot${i ? "" : " is-active"}" aria-label="Show banner ${i + 1}"></button>`).join("");
  const dots = [...dotsWrap.children];

  /* Banner text is baked into the images, so swap to the current language. */
  function applyLang() {
    const lang = document.documentElement.getAttribute("lang") === "bn" ? "bn" : "en";
    slides.forEach(sl => {
      const n = sl.dataset.slide;
      sl.querySelector("source").srcset = `assets/promo/${n}-${lang}-tall.jpg`;
      sl.querySelector("img").src = `assets/promo/${n}-${lang}-wide.jpg`;
    });
  }
  new MutationObserver(applyLang).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  applyLang();

  function restartBar() {
    if (reduceMotion) return;
    bar.style.transition = "none";
    bar.style.width = "0%";
    void bar.offsetWidth;
    bar.style.transition = `width ${DURATION}ms linear`;
    bar.style.width = "100%";
  }

  function show(i) {
    const next = (i + slides.length) % slides.length;
    if (next === current) return;
    slides[current].classList.remove("is-active");
    slides[current].setAttribute("aria-hidden", "true");
    slides[current].tabIndex = -1;
    slides[next].classList.add("is-active");
    slides[next].setAttribute("aria-hidden", "false");
    slides[next].removeAttribute("tabindex");
    current = next;
    dots.forEach((d, di) => d.classList.toggle("is-active", di === current));
    if (timer) restartBar();
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    bar.style.transition = "none";
    bar.style.width = "0%";
  }
  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(() => show(current + 1), DURATION);
    restartBar();
  }
  function restart() { stop(); start(); }

  document.getElementById("promoPrev").addEventListener("click", () => { show(current - 1); restart(); });
  document.getElementById("promoNext").addEventListener("click", () => { show(current + 1); restart(); });
  dots.forEach((d, di) => d.addEventListener("click", () => { show(di); restart(); }));
  promo.addEventListener("mouseenter", stop);
  promo.addEventListener("mouseleave", start);
  promo.addEventListener("focusin", stop);
  promo.addEventListener("focusout", start);
  promo.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { show(current - 1); restart(); }
    if (e.key === "ArrowRight") { show(current + 1); restart(); }
  });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  /* Swipe on touch screens; a swipe must not also follow the banner link. */
  let touchX = null, swiped = false;
  promo.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; swiped = false; stop(); }, { passive: true });
  promo.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { swiped = true; show(current + (dx < 0 ? 1 : -1)); }
    touchX = null;
    start();
  });
  promo.addEventListener("click", e => { if (swiped && e.target.closest(".promo-slide")) { e.preventDefault(); swiped = false; } }, true);

  start();
}
