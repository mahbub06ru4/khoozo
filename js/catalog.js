/* Loads website items from khoozo_laravel (managed in the Admin App) over the
   built-in lists. If the API can't be reached, the built-in lists stay. */
(function () {
  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  const localPort = isLocal ? sessionStorage.getItem("khoozo_api_port") || "3200" : "";
  const API = (isLocal ? "http://localhost:" + localPort : "https://api.khoozo.com") + "/api/v1/catalog";
  const CACHE = "khoozo_catalog";

  const lang = () => (document.documentElement.getAttribute("lang") === "bn" ? "bn" : "en");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const urls = (row) => row.images.map((i) => i.url);
  let rows = null;

  function fill(target, values) {
    if (Array.isArray(target)) target.splice(0, target.length, ...values);
    else {
      Object.keys(target).forEach((k) => delete target[k]);
      values.forEach(([k, v]) => { target[k] = v; });
    }
  }

  function copyFor(row, l) {
    const d = row.details || {};
    const fallback = d.en || {};
    const own = d[l] || {};
    const suffix = l === "bn" ? "Bn" : "En";
    return {
      ...fallback,
      ...own,
      title: row["title" + suffix] || row.titleEn,
      tagline: row["summary" + suffix] || row.summaryEn || "",
      desc: row["description" + suffix] || row.descriptionEn || own.desc || fallback.desc || "",
    };
  }

  function toProduct(row) {
    const d = row.details || {};
    const withLists = (c) => ({ pdfs: [], app: [], audience: [], course: "", courseMode: "", ...c });
    return {
      colors: ["#7f1d1d", "#9E1B1B"],
      course: { weeks: 0, hours: 0 },
      ...d,
      id: row.slug,
      icon: row.icon || "fa-solid fa-box-open",
      image: urls(row)[0] || null,
      gallery: urls(row),
      pack: { price: row.price, originalPrice: row.originalPrice || row.price },
      combo: row.comboPrice != null ? { price: row.comboPrice, originalPrice: row.comboOriginalPrice || row.comboPrice } : null,
      en: withLists(copyFor(row, "en")),
      bn: withLists(copyFor(row, "bn")),
    };
  }

  function toCourse(row) {
    const d = row.details || {};
    const withLists = (c, l) => ({ track: l === "bn" ? "ট্রেনিং" : "Training", level: "", mode: "", outcomes: [], modules: [], includes: [], ...c });
    return {
      tools: [],
      ...d,
      id: row.slug,
      image: urls(row)[0] || "assets/logo.png",
      gallery: urls(row),
      price: row.price,
      originalPrice: row.originalPrice || row.price,
      en: withLists(copyFor(row, "en"), "en"),
      bn: withLists(copyFor(row, "bn"), "bn"),
    };
  }

  function addProject(row) {
    const d = row.details || {};
    const key = (name) => `catalog.it.${row.slug}.${name}`;
    const put = (l, name, value) => { KHOOZO_I18N_DICT[l][key(name)] = value; };
    ["en", "bn"].forEach((l) => {
      const suffix = l === "bn" ? "Bn" : "En";
      put(l, "title", row["title" + suffix] || row.titleEn);
      put(l, "card", row["summary" + suffix] || row.summaryEn || "");
      put(l, "desc", row["description" + suffix] || row.descriptionEn || row["summary" + suffix] || row.summaryEn || row["title" + suffix] || row.titleEn);
      (d["features_" + l] || []).forEach((f, i) => put(l, "f" + i, f));
    });
    return {
      ...d,
      icon: row.icon || "fa-solid fa-laptop-code",
      titleKey: key("title"), descKey: key("desc"), cardKey: key("card"),
      featureKeys: (d.features_en || []).map((_, i) => key("f" + i)),
      tech: d.tech || [],
      gallery: row.slug,
      price: row.price, originalPrice: row.originalPrice,
    };
  }

  function toProperty(row) {
    const d = row.details || {};
    return {
      badge: "", badgeClass: "", specs: [], features: [],
      ...d,
      title: row.titleEn,
      location: d.location || row.summaryEn || "",
      desc: row.descriptionEn || "",
      image: urls(row)[0] || "assets/logo.png",
      gallery: urls(row),
    };
  }

  function applyData() {
    const of = (type) => rows.filter((r) => r.type === type);
    if (typeof KHOOZO_PRODUCTS !== "undefined") fill(KHOOZO_PRODUCTS, of("PRODUCT").map(toProduct));
    if (typeof KHOOZO_COURSES !== "undefined") fill(KHOOZO_COURSES, of("COURSE").map(toCourse));
    if (typeof KHOOZO_IT_PROJECTS !== "undefined") {
      fill(KHOOZO_IT_PROJECTS, of("IT_PROJECT").map((r) => [r.slug, addProject(r)]));
      window.IT_GALLERY = window.IT_GALLERY || {};
      of("IT_PROJECT").forEach((r) => { window.IT_GALLERY[r.slug] = urls(r).map((src) => ({ src, alt: r.titleEn })); });
    }
    if (typeof KHOOZO_PROPERTIES !== "undefined") fill(KHOOZO_PROPERTIES, of("PROPERTY").map((r) => [r.slug, toProperty(r)]));
  }

  function priceHtml(r) {
    if (r.price == null) return "";
    const num = (n) => "৳" + Number(n).toLocaleString("en-IN");
    return `<p class="catalog-price"><b>${num(r.price)}</b>${r.originalPrice > r.price ? ` <s>${num(r.originalPrice)}</s>` : ""}</p>`;
  }

  function renderItGrid() {
    const grid = document.querySelector(".it-project-grid");
    if (!grid) return;
    const bn = lang() === "bn";
    grid.innerHTML = rows.filter((r) => r.type === "IT_PROJECT").map((r) => {
      const d = r.details || {};
      return `
        <article class="service-card it-project-card">
          ${window.KhoozoFav ? window.KhoozoFav.button("project:" + r.slug) : ""}
          <span class="service-icon"><i class="${esc(r.icon || "fa-solid fa-laptop-code")}" aria-hidden="true"></i></span>
          <h4>${esc((bn && r.titleBn) || r.titleEn)}</h4>
          <p>${esc((bn && r.summaryBn) || r.summaryEn)}</p>
          ${priceHtml(r)}
          <div class="it-project-tags">${(d.tech || []).slice(0, 3).map((x) => `<span class="it-tag">${esc(x)}</span>`).join("")}</div>
          <a class="btn btn-outline it-project-btn" href="project.html?id=${encodeURIComponent(r.slug)}"><span>${bn ? "বিস্তারিত দেখুন" : "View Details"}</span> <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
        </article>`;
    }).join("");
  }

  function renderProperties() {
    const grid = document.querySelector(".portfolio-grid");
    if (!grid) return;
    const feature = document.querySelector(".project-feature");
    const items = rows.filter((r) => r.type === "PROPERTY");
    const [first, ...others] = items;
    const view = (r) => ({ r, p: toProperty(r), href: `property.html?id=${encodeURIComponent(r.slug)}` });
    if (feature) {
      if (!first) feature.remove();
      else {
        const { p, href } = view(first);
        feature.classList.remove("reveal");
        feature.innerHTML = `
          <div class="project-media"><img src="${esc(p.image)}" alt="${esc(p.title)}" class="project-photo" loading="lazy">${p.badge ? `<span class="project-badge">${esc(p.badge)}</span>` : ""}</div>
          <div class="project-body">
            <h3>${esc(p.title)}</h3>
            <p class="project-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${esc(p.location)}</p>
            <p class="project-desc">${esc(p.desc)}</p>
            ${priceHtml(first)}
            <div class="project-specs">${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</div>
            ${p.features.length ? `<h4 class="project-features-title">Key Features</h4><ul class="project-features">${p.features.map((f) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i> ${esc(f)}</li>`).join("")}</ul>` : ""}
            <div class="project-actions"><a class="btn btn-outline" href="${href}">View Details</a><a class="btn btn-primary" href="index.html#contact">Inquire About This Project <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div>
          </div>`;
      }
    }
    grid.innerHTML = others.map(view).map(({ r, p, href }) => `
      <article class="pcard" data-project="${esc(r.slug)}">
        <div class="pcard-media"><img src="${esc(p.image)}" alt="${esc(p.title)}" class="pcard-photo" loading="lazy">${p.badge ? `<span class="pcard-badge ${esc(p.badgeClass)}">${esc(p.badge)}</span>` : ""}</div>
        <div class="pcard-body">
          <h3>${esc(p.title)}</h3>
          <p class="project-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${esc(p.location)}</p>
          <p class="pcard-desc">${esc(p.desc)}</p>
          ${priceHtml(r)}
          <ul class="pcard-meta">${p.specs.slice(0, 3).map(([k, v]) => `<li><span>${esc(k)}</span> ${esc(v)}</li>`).join("")}</ul>
          <a class="btn btn-outline pcard-btn" href="${href}">View Details <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      </article>`).join("");
  }

  // Extra uploaded images on a course, shop product or property page.
  function renderDetailGallery() {
    const id = new URLSearchParams(location.search).get("id");
    const page = location.pathname.split("/").pop();
    const type = { "course.html": "COURSE", "product.html": "PRODUCT", "property.html": "PROPERTY", "project.html": "IT_PROJECT" }[page];
    const row = type && rows.find((r) => r.type === type && r.slug === id);
    // Items added in the app may not have every section filled in yet.
    document.querySelectorAll(".tr-layout > div:first-child > .tr-panel:not(.catalog-gallery):not(.catalog-desc)").forEach((panel) => {
      const heading = panel.querySelector("h2");
      if (heading && !panel.querySelector("li, details, dd, img, .tr-chip, .dp-app, .dp-course") && panel.textContent.trim() === heading.textContent.trim()) panel.remove();
    });
    if (row && type !== "PROPERTY") {
      const text = (lang() === "bn" && row.descriptionBn) || row.descriptionEn;
      const left = document.querySelector(".tr-layout > div:first-child");
      if (text && left && !left.querySelector(".catalog-desc") && !left.textContent.includes(text)) {
        const panel = document.createElement("div");
        panel.className = "tr-panel catalog-desc";
        panel.textContent = text;
        left.prepend(panel);
      }
    }
    if (row && (type === "PROPERTY" || type === "IT_PROJECT") && row.price != null && !document.querySelector(".tr-layout .catalog-price")) {
      const left = document.querySelector(".tr-layout > div:first-child");
      if (left) left.insertAdjacentHTML("afterbegin", `<div class="tr-panel">${priceHtml(row)}</div>`);
    }
    if (type === "IT_PROJECT") return;
    const host = document.querySelector("main .tr-layout > div:first-child, #productRoot .tr-layout > div:first-child");
    if (!row || !host || host.querySelector(".catalog-gallery")) return;
    const list = type === "PRODUCT" ? urls(row) : urls(row).slice(1);
    if (!list.length) return;
    const strip = document.createElement("div");
    strip.className = "tr-panel catalog-gallery";
    strip.innerHTML = list.map((u) => `<a href="${esc(u)}" target="_blank" rel="noopener"><img src="${esc(u)}" alt="${esc(row.titleEn)}" loading="lazy"></a>`).join("");
    host.prepend(strip);
  }

  function renderPages() {
    renderItGrid();
    renderProperties();
    setTimeout(renderDetailGallery, 0);
    if (window.KhoozoFav) window.KhoozoFav.sync();
  }

  // Applying the current language makes every page script redraw from the new data.
  function redraw() {
    if (window.khoozoApplyLang) window.khoozoApplyLang(lang());
    renderPages();
  }

  function use(next) {
    rows = next;
    applyData();
    redraw();
  }

  const prevHook = window.khoozoOnLangChange;
  window.khoozoOnLangChange = function () {
    if (prevHook) prevHook();
    if (rows) renderPages();
  };

  document.addEventListener("DOMContentLoaded", () => {
    let cached = null;
    try { cached = localStorage.getItem(CACHE); } catch (e) { /* storage blocked */ }
    if (cached) {
      try { use(JSON.parse(cached)); } catch (e) { cached = null; }
    }
    fetch(API, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(res.statusText))))
      .then((text) => {
        if (text === cached) return;
        try { localStorage.setItem(CACHE, text); } catch (e) { /* storage blocked */ }
        use(JSON.parse(text));
      })
      .catch(() => { /* keep the cached or built-in items */ });
  });
})();
