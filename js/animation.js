/* ================================================================
   Khoozo — js/animation.js
   Animation-only logic: preloader, scroll reveal, counters,
   typing effect, custom cursor. No layout/state logic here —
   see main.js for nav, theme, and form handling.
   ================================================================ */
"use strict";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------
   1. Preloader — hide once the page has fully loaded
   --------------------------------------------------------------- */
const preloader = document.getElementById("preloader");
function hidePreloader() {
  preloader.classList.add("is-hidden");
  window.setTimeout(() => preloader.remove(), 600);
}
if (document.readyState === "complete") {
  hidePreloader();
} else {
  window.addEventListener("load", () => {
    /* small minimum-display time so the preloader doesn't just flash */
    window.setTimeout(hidePreloader, reduceMotion ? 0 : 350);
  });
}

/* ---------------------------------------------------------------
   2. Scroll reveal — fade/rise elements into view
   --------------------------------------------------------------- */
const revealTargets = Array.from(document.querySelectorAll(".reveal"));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

revealTargets.forEach(el => {
  /* elements inside .hero already animate on load via CSS; skip re-observing them */
  if (el.closest(".hero")) { el.classList.add("is-visible"); return; }
  revealObserver.observe(el);
});

/* ---------------------------------------------------------------
   3. Animated counters (About, hero stats, counter band)
   --------------------------------------------------------------- */
const counters = Array.from(document.querySelectorAll(".counter"));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  if (reduceMotion) { el.textContent = target + suffix; return; }
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
counters.forEach(c => counterObserver.observe(c));

/* ---------------------------------------------------------------
   4. Typing effect (hero headline)
   --------------------------------------------------------------- */
const typingEl = document.getElementById("typingText");
if (typingEl) {
  let words = [];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let typingTimer = null;
  const TYPE_SPEED = 65;
  const DELETE_SPEED = 40;
  const HOLD_MS = 1600;

  function typeTick() {
    const currentWord = words[wordIndex];
    if (!deleting) {
      charIndex++;
      typingEl.textContent = currentWord.slice(0, charIndex);
      if (charIndex === currentWord.length) {
        deleting = true;
        typingTimer = window.setTimeout(typeTick, HOLD_MS);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = currentWord.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    typingTimer = window.setTimeout(typeTick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }

  /* (Re)reads data-words fresh — called on load, and again whenever
     the language toggle swaps in a localized word list. */
  function restartTyping() {
    if (typingTimer) window.clearTimeout(typingTimer);
    words = (typingEl.dataset.words || "").split(",").map(w => w.trim()).filter(Boolean);
    wordIndex = 0;
    charIndex = words[0] ? words[0].length : 0;
    deleting = false;
    typingEl.textContent = words[0] || typingEl.textContent;
    if (reduceMotion || words.length <= 1) return;
    typingTimer = window.setTimeout(() => { deleting = true; typeTick(); }, HOLD_MS);
  }
  window.khoozoRestartTyping = restartTyping;
  restartTyping();
}

/* ---------------------------------------------------------------
   5. Hero app journey slider
   --------------------------------------------------------------- */
const appSlider = document.getElementById("appSlider");
if (appSlider) {
  const slides = Array.from(document.querySelectorAll("#appSliderTrack img"));
  const dots = Array.from(document.querySelectorAll("#appSliderDots button"));
  const captionEl = document.getElementById("appSliderCaption");
  const badges = {
    poster: document.querySelector(".app-badge-poster"),
    admin: document.querySelector(".app-badge-admin"),
    bidder: document.querySelector(".app-badge-bidder")
  };
  const SCREENS = [
    { captionKey: "hero.slider.caption1", caption: "Home", role: "poster" },
    { captionKey: "hero.slider.caption2", caption: "Create a Task", role: "poster" },
    { captionKey: "hero.slider.caption3", caption: "Admin Review", role: "admin" },
    { captionKey: "hero.slider.caption4", caption: "Live Marketplace", role: "bidder" },
    { captionKey: "hero.slider.caption5", caption: "Review Offers", role: "poster" },
    { captionKey: "hero.slider.caption6", caption: "My Dashboard", role: "bidder" }
  ];
  const AUTOPLAY_MS = 3200;
  let active = 0;
  let timer = null;

  function showSlide(i) {
    active = (i + slides.length) % slides.length;
    const screen = SCREENS[active];
    slides.forEach((img, di) => img.classList.toggle("is-active", di === active));
    dots.forEach((dot, di) => {
      dot.classList.toggle("is-active", di === active);
      dot.setAttribute("aria-selected", di === active ? "true" : "false");
    });
    Object.entries(badges).forEach(([role, el]) => {
      if (el) el.classList.toggle("is-active", role === screen.role);
    });
    const lang = window.khoozoCurrentLang || "en";
    const dict = typeof KHOOZO_I18N_DICT !== "undefined" ? KHOOZO_I18N_DICT[lang] : null;
    captionEl.textContent = (dict && dict[screen.captionKey]) || screen.caption;
  }
  window.khoozoRefreshAppSlider = () => showSlide(active);

  function startAutoplay() {
    if (reduceMotion) return;
    stopAutoplay();
    timer = window.setInterval(() => showSlide(active + 1), AUTOPLAY_MS);
  }
  function stopAutoplay() { if (timer) window.clearInterval(timer); }

  dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); startAutoplay(); }));
  appSlider.addEventListener("mouseenter", stopAutoplay);
  appSlider.addEventListener("mouseleave", startAutoplay);

  showSlide(0);
  startAutoplay();
}

/* ---------------------------------------------------------------
   6. Custom cursor (fine-pointer devices only; see animation.css)
   --------------------------------------------------------------- */
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  let dotX = 0, dotY = 0, ringX = 0, ringY = 0;

  window.addEventListener("mousemove", e => {
    dotX = e.clientX; dotY = e.clientY;
  });

  function renderCursor() {
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    /* ring eases toward the pointer for a soft trailing feel */
    ringX += (dotX - ringX) * 0.18;
    ringY += (dotY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const interactiveSelector = "a, button, input, textarea, select, .fab, .back-to-top";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(interactiveSelector)) cursorRing.classList.add("is-active");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(interactiveSelector)) cursorRing.classList.remove("is-active");
  });
}
