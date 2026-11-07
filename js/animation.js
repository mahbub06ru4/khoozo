/* ================================================================
   Khoozo — js/animation.js
   Animation-only logic: preloader, scroll reveal, counters,
   typing effect. No layout/state logic here —
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
