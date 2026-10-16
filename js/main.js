/* ================================================================
   Solution 360 Consultancy — js/main.js
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
   --------------------------------------------------------------- */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const THEME_KEY = "solution360-theme";

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

const savedTheme = localStorage.getItem(THEME_KEY);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

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

  window.location.href = `mailto:mahbub06ru4@gmail.com?subject=${subject}&body=${body}`;
  statusEl.textContent = "Opening your email app… If nothing happens, email us directly at mahbub06ru4@gmail.com.";
  form.reset();
});

/* ---------------------------------------------------------------
   8. Project details modal (common popup for all projects)
   --------------------------------------------------------------- */
/* A reusable scene generator so every project shows an illustrated
   "image" in the popup. Swap the returned string with an <img> tag
   once real photographs are available, e.g. `<img src="images/x.jpg" alt="">`. */
function scene(front, accent) {
  return `<svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0d4aad"/><stop offset="1" stop-color="#071F4D"/>
      </linearGradient>
    </defs>
    <rect width="600" height="360" fill="url(#sky)"/>
    <circle cx="500" cy="70" r="42" fill="${accent}" opacity="0.28"/>
    ${front}
    <rect y="320" width="600" height="40" fill="rgba(255,255,255,0.05)"/>
  </svg>`;
}
const win = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}"/>`;
function grid(x, y, cols, rows, cw, ch, gap, c) {
  let out = "";
  for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++)
    out += win(x + col * (cw + gap), y + r * (ch + gap), cw, ch, c);
  return out;
}
const GREEN = "rgba(38,166,91,0.7)";

const PROJECTS = {
  landshare: {
    badge: "Ongoing", badgeClass: "b-ongoing",
    title: "Premium Land Share Project",
    location: "Sector 17, Uttara, Dhaka",
    desc: "A joint land-development opportunity in one of Uttara's most connected sectors — planned for modern residential use with transparent share ownership and full legal documentation.",
    specs: [["Location", "Sector 17, Uttara"], ["Project Type", "Land Share / Residential"], ["Status", "Ongoing — Booking Open"], ["Investment", "Flexible share sizes"]],
    features: ["Clear land title & legal verification", "Flexible share-based ownership", "Prime Uttara location, close to major roads", "Dedicated project consultant throughout"],
    image: scene(`<rect x="120" y="180" width="360" height="140" fill="#26A65B" opacity="0.5"/>
      <path d="M120 180 h360 M180 180 v140 M240 180 v140 M300 180 v140 M360 180 v140 M420 180 v140" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
      <path d="M300 120 v70 M280 140 l20 -20 l20 20" stroke="#fff" stroke-width="3" fill="none"/>`, "#26A65B")
  },
  greennest: {
    badge: "Completed", badgeClass: "b-completed",
    title: "Green Nest Residency",
    location: "Sector 11, Uttara, Dhaka",
    desc: "A 10-storey residential building with 24 modern apartments, completed and fully occupied. Delivered on schedule with premium finishes, dedicated parking, backup power and a landscaped rooftop.",
    specs: [["Type", "Residential Apartment"], ["Units", "24 Apartments"], ["Storeys", "10 Floors"], ["Completed", "2023"]],
    features: ["Premium interior finishes throughout", "Dedicated covered parking", "24/7 backup power & security", "Landscaped rooftop community space"],
    image: scene(`<rect x="120" y="60" width="150" height="260" rx="6" fill="#0A3D91"/>
      <rect x="300" y="30" width="170" height="290" rx="6" fill="#0d4aad"/>
      ${grid(138, 82, 3, 6, 26, 26, 12, GREEN)}
      ${grid(320, 52, 3, 7, 30, 26, 14, GREEN)}`, "#26A65B")
  },
  skyline: {
    badge: "Completed", badgeClass: "b-completed",
    title: "Skyline Commercial Plaza",
    location: "Mirpur DOHS, Dhaka",
    desc: "A mixed-use commercial complex with ground-floor retail and premium office suites above. Built to code with high-speed lifts, dedicated parking floors and round-the-clock security infrastructure.",
    specs: [["Type", "Commercial / Mixed-use"], ["Area", "42,000 sq ft"], ["Floors", "8 Levels"], ["Completed", "2022"]],
    features: ["Ground-floor retail & upper office suites", "High-speed passenger & service lifts", "Multi-level covered parking", "24/7 security & CCTV coverage"],
    image: scene(`<rect x="80" y="120" width="150" height="200" rx="6" fill="#0A3D91"/>
      <rect x="240" y="60" width="130" height="260" rx="6" fill="#0d4aad"/>
      <rect x="380" y="150" width="140" height="170" rx="6" fill="#0A3D91"/>
      ${grid(96, 138, 3, 4, 26, 26, 14, GREEN)}
      ${grid(254, 80, 3, 6, 24, 24, 12, GREEN)}
      ${grid(396, 168, 3, 3, 26, 26, 14, GREEN)}`, "#26A65B")
  },
  horizon: {
    badge: "Ongoing", badgeClass: "b-ongoing",
    title: "Horizon Heights",
    location: "Bashundhara R/A, Dhaka",
    desc: "A premium 14-storey apartment tower currently under construction. Structural work is in progress with limited early-bird bookings now open — reserve a unit at pre-launch pricing with a flexible payment plan.",
    specs: [["Type", "Residential Apartment"], ["Units", "36 Apartments"], ["Storeys", "14 Floors"], ["Handover", "Est. 2026"]],
    features: ["Early-bird pre-launch pricing", "Flexible instalment payment plans", "Modern amenities — gym & community hall", "Transparent construction milestones"],
    image: scene(`<rect x="200" y="50" width="200" height="270" rx="6" fill="#0A3D91"/>
      <rect x="200" y="50" width="200" height="34" rx="6" fill="#0d4aad"/>
      ${grid(220, 100, 4, 6, 30, 26, 12, "rgba(38,166,91,0.55)")}
      <rect x="420" y="46" width="6" height="274" fill="#0d4aad"/>
      <path d="M423 46 l60 -20 v20 z" fill="#26A65B"/>`, "#26A65B")
  },
  serene: {
    badge: "Handed Over", badgeClass: "b-handover",
    title: "Serene Villas",
    location: "Purbachal New Town, Dhaka",
    desc: "A gated community of 8 luxury duplex villas — fully built, keys handed over, and now home to their proud owners. All ownership documentation has been transferred and titles registered.",
    specs: [["Type", "Duplex Villas"], ["Units", "8 Villas"], ["Community", "Gated & Secured"], ["Handed Over", "2024"]],
    features: ["Private duplex layout with garden", "Gated community with controlled access", "Full title & documentation transferred", "Move-in ready, owner-occupied"],
    image: scene(`<rect x="130" y="150" width="340" height="170" rx="8" fill="#0A3D91"/>
      <path d="M110 150 L300 60 L490 150 Z" fill="#0d4aad"/>
      <rect x="270" y="230" width="60" height="90" rx="4" fill="#26A65B"/>
      ${grid(160, 180, 2, 2, 34, 34, 18, GREEN)}
      ${grid(360, 180, 2, 2, 34, 34, 18, GREEN)}`, "#26A65B")
  }
};

const modal = document.getElementById("projectModal");
if (modal) {
  const pmImage = document.getElementById("pmImage");
  const pmBadge = document.getElementById("pmBadge");
  const pmTitle = document.getElementById("pmTitle");
  const pmLocation = document.getElementById("pmLocation");
  const pmDesc = document.getElementById("pmDesc");
  const pmSpecs = document.getElementById("pmSpecs");
  const pmFeatures = document.getElementById("pmFeatures");
  let lastFocus = null;

  function openModal(id) {
    const p = PROJECTS[id];
    if (!p) return;
    pmImage.innerHTML = p.image;
    pmBadge.textContent = p.badge;
    pmBadge.className = "pcard-badge " + p.badgeClass;
    pmTitle.textContent = p.title;
    pmLocation.textContent = p.location;
    pmDesc.textContent = p.desc;
    pmSpecs.innerHTML = p.specs.map(([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join("");
    pmFeatures.innerHTML = p.features.map(f => `<li><i class="fa-solid fa-check" aria-hidden="true"></i> ${f}</li>`).join("");

    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".pmodal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll("[data-project-open]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.getAttribute("data-project-open")));
  });
  modal.querySelectorAll("[data-modal-close]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
}
