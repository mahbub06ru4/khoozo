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

  window.location.href = `mailto:mahbub06ru4@gmail.com?subject=${subject}&body=${body}`;
  statusEl.textContent = "Opening your email app… If nothing happens, email us directly at mahbub06ru4@gmail.com.";
  form.reset();
});

/* ---------------------------------------------------------------
   8. Project details modal (common popup for all projects)
   --------------------------------------------------------------- */
const PROJECTS = {
  landshare: {
    badge: "Ongoing", badgeClass: "b-ongoing",
    title: "Premium Land Share Project",
    location: "Sector 17, Uttara, Dhaka",
    desc: "A joint land-development opportunity in one of Uttara's most connected sectors — planned for modern residential use with transparent share ownership and full legal documentation.",
    specs: [["Location", "Sector 17, Uttara"], ["Project Type", "Land Share / Residential"], ["Status", "Ongoing — Booking Open"], ["Investment", "Flexible share sizes"]],
    features: ["Clear land title & legal verification", "Flexible share-based ownership", "Prime Uttara location, close to major roads", "Dedicated project consultant throughout"],
    image: `<img src="assets/realestate/landshare-project.jpg" alt="Premium Land Share Project — Sector 17, Uttara, Dhaka">`
  },
  greennest: {
    badge: "Completed", badgeClass: "b-completed",
    title: "Green Nest Residency",
    location: "Sector 11, Uttara, Dhaka",
    desc: "A 10-storey residential building with 24 modern apartments, completed and fully occupied. Delivered on schedule with premium finishes, dedicated parking, backup power and a landscaped rooftop.",
    specs: [["Type", "Residential Apartment"], ["Units", "24 Apartments"], ["Storeys", "10 Floors"], ["Completed", "2023"]],
    features: ["Premium interior finishes throughout", "Dedicated covered parking", "24/7 backup power & security", "Landscaped rooftop community space"],
    image: `<img src="assets/realestate/greennest-residency.jpg" alt="Green Nest Residency — Sector 11, Uttara, Dhaka">`
  },
  skyline: {
    badge: "Completed", badgeClass: "b-completed",
    title: "Skyline Commercial Plaza",
    location: "Mirpur DOHS, Dhaka",
    desc: "A mixed-use commercial complex with ground-floor retail and premium office suites above. Built to code with high-speed lifts, dedicated parking floors and round-the-clock security infrastructure.",
    specs: [["Type", "Commercial / Mixed-use"], ["Area", "42,000 sq ft"], ["Floors", "8 Levels"], ["Completed", "2022"]],
    features: ["Ground-floor retail & upper office suites", "High-speed passenger & service lifts", "Multi-level covered parking", "24/7 security & CCTV coverage"],
    image: `<img src="assets/realestate/skyline-plaza.jpg" alt="Skyline Commercial Plaza — Mirpur DOHS, Dhaka">`
  },
  horizon: {
    badge: "Ongoing", badgeClass: "b-ongoing",
    title: "Horizon Heights",
    location: "Bashundhara R/A, Dhaka",
    desc: "A premium 14-storey apartment tower currently under construction. Structural work is in progress with limited early-bird bookings now open — reserve a unit at pre-launch pricing with a flexible payment plan.",
    specs: [["Type", "Residential Apartment"], ["Units", "36 Apartments"], ["Storeys", "14 Floors"], ["Handover", "Est. 2026"]],
    features: ["Early-bird pre-launch pricing", "Flexible instalment payment plans", "Modern amenities — gym & community hall", "Transparent construction milestones"],
    image: `<img src="assets/realestate/horizon-heights.jpg" alt="Horizon Heights — Bashundhara R/A, Dhaka">`
  },
  serene: {
    badge: "Handed Over", badgeClass: "b-handover",
    title: "Serene Villas",
    location: "Purbachal New Town, Dhaka",
    desc: "A gated community of 8 luxury duplex villas — fully built, keys handed over, and now home to their proud owners. All ownership documentation has been transferred and titles registered.",
    specs: [["Type", "Duplex Villas"], ["Units", "8 Villas"], ["Community", "Gated & Secured"], ["Handed Over", "2024"]],
    features: ["Private duplex layout with garden", "Gated community with controlled access", "Full title & documentation transferred", "Move-in ready, owner-occupied"],
    image: `<img src="assets/realestate/serene-villas.jpg" alt="Serene Villas — Purbachal New Town, Dhaka">`
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
