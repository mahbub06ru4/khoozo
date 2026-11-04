/* ================================================================
   Khoozo — js/main.js
   Core UI logic: navigation, theme, scroll progress, contact form.
   Scroll-reveal, counters, typing effect and cursor live in animation.js.
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

form.querySelectorAll(".field").forEach(field => {
  const control = field.querySelector("input, textarea, select");
  control.addEventListener("blur", () => validateField(field));
  control.addEventListener("input", () => field.classList.remove("has-error"));
  control.addEventListener("change", () => field.classList.remove("has-error"));
});

form.addEventListener("submit", e => {
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
   8. Homepage app screenshot slider
   --------------------------------------------------------------- */
const appShowcase = document.getElementById("appShowcase");
if (appShowcase) {
  const slides = [...appShowcase.querySelectorAll(".app-slide")];
  const dotsWrap = document.getElementById("appDots");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const AUTOPLAY_MS = 4500;
  let current = 0;
  let timer = null;

  dotsWrap.innerHTML = slides.map((_, i) => `<button type="button" class="app-slider-dot" aria-label="Show screenshot ${i + 1}"></button>`).join("");
  const dots = [...dotsWrap.children];

  function show(i, dir) {
    const newCurrent = (i + slides.length) % slides.length;
    if (newCurrent === current) return;
    const direction = dir || (newCurrent > current ? 1 : -1);
    const oldSlide = slides[current];
    const newSlide = slides[newCurrent];

    /* Position the incoming slide off to the entry side with no transition,
       force a reflow, then animate it to centre — a reliable "FLIP" so the
       slide direction is always correct regardless of this slide's history. */
    newSlide.style.transition = "none";
    newSlide.style.setProperty("--pos", direction > 0 ? 1 : -1);
    void newSlide.offsetWidth;
    newSlide.style.transition = "";

    oldSlide.classList.remove("is-active");
    oldSlide.setAttribute("aria-hidden", "true");
    oldSlide.style.setProperty("--pos", direction > 0 ? -1 : 1);

    newSlide.classList.add("is-active");
    newSlide.setAttribute("aria-hidden", "false");
    newSlide.style.setProperty("--pos", 0);

    current = newCurrent;
    dots.forEach((d, di) => d.classList.toggle("is-active", di === current));
  }

  function stop() { clearInterval(timer); timer = null; }
  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(() => show(current + 1, 1), AUTOPLAY_MS);
  }
  function restart() { stop(); start(); }

  document.getElementById("appPrev").addEventListener("click", () => { show(current - 1, -1); restart(); });
  document.getElementById("appNext").addEventListener("click", () => { show(current + 1, 1); restart(); });
  dots.forEach((d, di) => d.addEventListener("click", () => { show(di); restart(); }));

  appShowcase.addEventListener("mouseenter", stop);
  appShowcase.addEventListener("mouseleave", start);
  appShowcase.addEventListener("focusin", stop);
  appShowcase.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  let touchX = null;
  appShowcase.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; stop(); }, { passive: true });
  appShowcase.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    touchX = null;
    start();
  });

  show(0);
  start();
}
