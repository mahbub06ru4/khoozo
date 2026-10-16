/* ================================================================
   Solution 360 Consultancy — js/animation.js
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
  const words = (typingEl.dataset.words || "").split(",").map(w => w.trim()).filter(Boolean);
  if (reduceMotion || words.length <= 1) {
    typingEl.textContent = words[0] || typingEl.textContent;
  } else {
    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = false;
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
          window.setTimeout(typeTick, HOLD_MS);
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
      window.setTimeout(typeTick, deleting ? DELETE_SPEED : TYPE_SPEED);
    }
    /* start after the initial word has held on screen for a moment */
    window.setTimeout(() => { deleting = true; typeTick(); }, HOLD_MS);
  }
}

/* ---------------------------------------------------------------
   5. Custom cursor (fine-pointer devices only; see animation.css)
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
