/* ================================================================
   Khoozo — js/detail.js
   Renders the shareable detail pages from js/projects-data.js:
     project.html?id=dokanbondhu   → IT project (screenshots, features, tech)
     property.html?id=horizon      → real estate project
   The page type comes from <body data-detail="it|property">.
   ================================================================ */
"use strict";

(function () {
  const root = document.getElementById("detailRoot");
  if (!root) return;

  const kind = document.body.getAttribute("data-detail");
  const id = new URLSearchParams(location.search).get("id");
  const GALLERY = window.IT_GALLERY || {};
  const PHONE = "+8801818120900";

  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  function t(key, fallback) {
    const lang = window.khoozoCurrentLang || "en";
    const dict = typeof KHOOZO_I18N_DICT !== "undefined" ? KHOOZO_I18N_DICT[lang] : null;
    return (dict && dict[key]) || (KHOOZO_I18N_DICT.en && KHOOZO_I18N_DICT.en[key]) || fallback;
  }

  /* Title, description and social-preview tags follow the page content.
     (Crawlers that don't run JS still see the static defaults in <head>.) */
  function setMeta(title, desc, image) {
    document.title = `${title} | Khoozo`;
    const abs = new URL(image || "assets/logo.png", location.href).href;
    const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
    set('meta[name="description"]', "content", desc);
    set('meta[property="og:title"]', "content", `${title} | Khoozo`);
    set('meta[property="og:description"]', "content", desc);
    set('meta[property="og:image"]', "content", abs);
    set('meta[property="og:url"]', "content", location.href);
    set('link[rel="canonical"]', "href", location.href.split("#")[0]);
  }

  function notFound(backHref) {
    setMeta(t("dt.notfound", "Project not found"), "", null);
    root.innerHTML = `<section class="section"><div class="container dt-notfound">
      <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      <h1>${t("dt.notfound", "Project not found")}</h1>
      <a class="btn btn-primary" href="${backHref}">${t("dt.home", "Back to home")}</a></div></section>`;
  }

  function ctaPanel(title, textKey) {
    const msg = encodeURIComponent(`Hi Khoozo, I'm interested in "${title}". ${location.href}`);
    return `<aside class="tr-panel dt-cta">
      <h3>${t("dt.cta.title", "Interested in this project?")}</h3>
      <p>${t(textKey, "")}</p>
      <a class="btn btn-primary btn-block" href="https://wa.me/${PHONE.slice(1)}?text=${msg}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> ${t("dt.whatsapp", "Chat on WhatsApp")}</a>
      <a class="btn btn-outline btn-block" href="tel:${PHONE}"><i class="fa-solid fa-phone" aria-hidden="true"></i> ${t("dt.call", "Call")} +88 01818-120900</a>
      <a class="btn btn-outline btn-block" href="index.html#contact"><i class="fa-solid fa-envelope" aria-hidden="true"></i> ${t("dt.inquire", "Send an inquiry")}</a>
      <button type="button" class="dt-share" id="dtShare"><i class="fa-solid fa-share-nodes" aria-hidden="true"></i> <span>${t("dt.share", "Share this page")}</span></button>
    </aside>`;
  }

  function wireShare(title) {
    const btn = document.getElementById("dtShare");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      const url = location.href;
      if (navigator.share) {
        try { await navigator.share({ title, url }); return; } catch (e) { if (e.name === "AbortError") return; }
      }
      try {
        await navigator.clipboard.writeText(url);
        btn.querySelector("span").textContent = t("dt.copied", "Link copied!");
        setTimeout(() => { btn.querySelector("span").textContent = t("dt.share", "Share this page"); }, 2200);
      } catch (e) {
        window.prompt(t("dt.share", "Share this page"), url);
      }
    });
  }

  /* ---------------- Screenshot gallery (IT projects) ---------------- */
  let slide = 0;
  let goTo = null;
  document.addEventListener("keydown", e => {
    if (!goTo || (e.target.closest && e.target.closest("input, textarea"))) return;
    if (e.key === "ArrowLeft") goTo(slide - 1);
    if (e.key === "ArrowRight") goTo(slide + 1);
  });
  function gallery(images, web) {
    if (!images.length) {
      return `<div class="dt-gallery dt-gallery-empty"><p><i class="fa-solid fa-image" aria-hidden="true"></i>${t("it.modal.comingsoon", "Screenshots coming soon")}</p></div>`;
    }
    return `<div class="dt-gallery${web ? " is-web" : ""}">
      <div class="dt-stage">
        <div class="dt-track" id="dtTrack">${images.map(({ src, alt }, i) =>
          `<div class="dt-slide"><img src="${esc(src)}" alt="${esc(alt)}" ${i ? 'loading="lazy"' : ""}></div>`).join("")}</div>
        ${images.length > 1 ? `
        <button type="button" class="dt-nav dt-prev" id="dtPrev" aria-label="Previous screenshot"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
        <button type="button" class="dt-nav dt-next" id="dtNext" aria-label="Next screenshot"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
        <span class="dt-count" id="dtCount"></span>` : ""}
      </div>
      ${images.length > 1 ? `<div class="dt-thumbs" id="dtThumbs">${images.map(({ src }, i) =>
        `<button type="button" aria-label="Screenshot ${i + 1}"><img src="${esc(src)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
    </div>`;
  }

  function wireGallery(count) {
    goTo = null;
    const track = document.getElementById("dtTrack");
    if (!track || count < 2) return;
    const thumbs = [...document.querySelectorAll("#dtThumbs button")];
    const counter = document.getElementById("dtCount");
    function go(i) {
      slide = (i + count) % count;
      track.style.transform = `translateX(-${slide * 100}%)`;
      thumbs.forEach((b, bi) => b.classList.toggle("is-active", bi === slide));
      const th = thumbs[slide], strip = th && th.parentElement;
      if (th) strip.scrollTo({ left: th.offsetLeft - (strip.clientWidth - th.clientWidth) / 2, behavior: "smooth" });
      counter.textContent = `${slide + 1} / ${count}`;
    }
    document.getElementById("dtPrev").addEventListener("click", () => go(slide - 1));
    document.getElementById("dtNext").addEventListener("click", () => go(slide + 1));
    thumbs.forEach((b, bi) => b.addEventListener("click", () => go(bi)));
    goTo = go;
    let x = null;
    track.addEventListener("touchstart", e => { x = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", e => {
      if (x === null) return;
      const dx = e.changedTouches[0].clientX - x;
      if (Math.abs(dx) > 40) go(slide + (dx < 0 ? 1 : -1));
      x = null;
    });
    go(Math.min(slide, count - 1));
  }

  /* ---------------- project.html ---------------- */
  function renderIt() {
    const p = KHOOZO_IT_PROJECTS[id];
    if (!p) return notFound("it.html");
    const title = t(p.titleKey, p.titleKey);
    const desc = t(p.descKey, p.descKey);
    const images = GALLERY[p.gallery || id] || [];
    setMeta(title, desc, images[0] && images[0].src);

    const others = Object.keys(KHOOZO_IT_PROJECTS).filter(k => k !== id);
    root.innerHTML = `
    <section class="tr-hero dt-hero">
      <div class="container">
        <a class="tr-back" href="it.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ${t("dt.back.it", "Back to IT projects")}</a>
        <div class="dt-hero-head">
          <span class="dt-hero-icon"><i class="${p.icon}" aria-hidden="true"></i></span>
          <div>
            <p class="eyebrow">Khoozo IT</p>
            <h1>${esc(title)}</h1>
          </div>
          ${window.KhoozoFav ? window.KhoozoFav.button("project:" + id, "dp-fav-inline") : ""}
        </div>
        <p>${esc(desc)}</p>
        <div class="tr-meta">${p.tech.map(x => `<span><i class="fa-solid ${x.includes("Flutter") ? "fa-mobile-screen-button" : "fa-code"}" aria-hidden="true"></i>${esc(x)}</span>`).join("")}</div>
      </div>
    </section>
    <section class="section dt-body">
      <div class="container tr-layout">
        <div>
          <div class="tr-panel">
            <h2>${t("dt.screens", "Screenshots")}</h2>
            ${gallery(images, p.web)}
          </div>
          ${p.featureKeys ? `<div class="tr-panel">
            <h2>${t("it.modal.features", "Key Features")}</h2>
            <ul class="tr-checks">${p.featureKeys.map(k => `<li><i class="fa-solid fa-check" aria-hidden="true"></i>${esc(t(k, k))}</li>`).join("")}</ul>
          </div>` : ""}
          <div class="tr-panel">
            <h2>${t("it.modal.tech", "Technology Used")}</h2>
            <div class="tr-chips">${p.tech.map(x => `<span class="tr-chip">${esc(x)}</span>`).join("")}</div>
          </div>
        </div>
        ${ctaPanel(title, "dt.cta.text.it")}
      </div>
    </section>
    <section class="section section-tint dt-more">
      <div class="container">
        <h2>${t("dt.more.it", "More IT projects")}</h2>
        <div class="dt-more-grid">${others.map(k => {
          const o = KHOOZO_IT_PROJECTS[k];
          return `<a class="service-card dt-more-card" href="project.html?id=${k}">
            <span class="service-icon"><i class="${o.icon}" aria-hidden="true"></i></span>
            <h4>${esc(t(o.titleKey, o.titleKey))}</h4>
            <p>${esc(t(o.cardKey || o.descKey, ""))}</p>
            <span class="tr-link">${t("it.viewdetails", "View Details")} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
          </a>`;
        }).join("")}</div>
      </div>
    </section>`;
    wireGallery(images.length);
    wireShare(title);
  }

  /* ---------------- property.html ---------------- */
  function renderProperty() {
    const p = KHOOZO_PROPERTIES[id];
    if (!p) return notFound("realestate.html#realestate-portfolio");
    setMeta(p.title, p.desc, p.image);

    const others = Object.keys(KHOOZO_PROPERTIES).filter(k => k !== id);
    root.innerHTML = `
    <section class="tr-hero dt-hero dt-hero-photo">
      <img class="tr-hero-bg" src="${esc(p.image)}" alt="">
      <div class="container">
        <a class="tr-back" href="realestate.html#realestate-portfolio"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ${t("dt.back.re", "Back to real estate")}</a>
        <p class="eyebrow">Khoozo Real Estate</p>
        <h1>${esc(p.title)}</h1>
        <p><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${esc(p.location)}</p>
        <div class="tr-meta"><span class="dt-status ${p.badgeClass}">${esc(p.badge)}</span>${p.specs.slice(1).map(([, v]) => `<span>${esc(v)}</span>`).join("")}</div>
      </div>
    </section>
    <section class="section dt-body">
      <div class="container tr-layout">
        <div>
          <div class="tr-panel dt-photo"><img src="${esc(p.image)}" alt="${esc(p.title)} — ${esc(p.location)}"></div>
          <div class="tr-panel">
            <h2>${t("dt.overview", "Overview")}</h2>
            <p class="dt-desc">${esc(p.desc)}</p>
            <dl class="project-specs dt-specs">${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
          </div>
          <div class="tr-panel">
            <h2>${t("it.modal.features", "Key Features")}</h2>
            <ul class="tr-checks">${p.features.map(f => `<li><i class="fa-solid fa-check" aria-hidden="true"></i>${esc(f)}</li>`).join("")}</ul>
          </div>
        </div>
        ${ctaPanel(p.title, "dt.cta.text.re")}
      </div>
    </section>
    <section class="section section-tint dt-more">
      <div class="container">
        <h2>${t("dt.more.re", "More real estate projects")}</h2>
        <div class="dt-more-grid">${others.map(k => {
          const o = KHOOZO_PROPERTIES[k];
          return `<a class="pcard dt-more-card dt-more-property" href="property.html?id=${k}">
            <div class="pcard-media"><img src="${esc(o.image)}" alt="" class="pcard-photo" loading="lazy"><span class="pcard-badge ${o.badgeClass}">${esc(o.badge)}</span></div>
            <div class="pcard-body"><h3>${esc(o.title)}</h3>
              <p class="project-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${esc(o.location)}</p>
              <span class="tr-link">${t("it.viewdetails", "View Details")} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span></div>
          </a>`;
        }).join("")}</div>
      </div>
    </section>`;
    wireShare(p.title);
  }

  const render = kind === "property" ? renderProperty : renderIt;
  /* js/i18n.js calls this after switching language. */
  window.khoozoOnLangChange = render;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
