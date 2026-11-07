/* Favorites for shop products, courses ("course:<id>") and IT projects
   ("project:<id>"). Saved on this device only, in localStorage. */
(function () {
  const KEY = "khoozo_favorites";
  const STR = {
    en: { label: "Favorites", empty: "You have no favorites yet.", browse: "Browse our services", add: "Add to Cart", view: "View details", product: "Digital product", course: "Training course", project: "IT project" },
    bn: { label: "পছন্দের তালিকা", empty: "এখনও পছন্দের তালিকায় কিছু নেই।", browse: "আমাদের সেবাগুলো দেখুন", add: "কার্টে যোগ করুন", view: "বিস্তারিত দেখুন", product: "ডিজিটাল পণ্য", course: "ট্রেনিং কোর্স", project: "আইটি প্রজেক্ট" },
  };
  const lang = () => (document.documentElement.getAttribute("lang") === "bn" ? "bn" : "en");
  const t = (k) => STR[lang()][k];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const digits = (n) => (lang() === "bn" ? String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]) : String(n));
  const taka = (n) => "৳" + digits(Number(n).toLocaleString("en-IN"));

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }
  const icon = (on) => `fa-${on ? "solid" : "regular"} fa-heart`;

  function button(key, extra) {
    const on = read().includes(key);
    return `<button type="button" class="dp-fav${on ? " is-on" : ""} ${extra || ""}" data-fav="${esc(key)}" aria-pressed="${on}" aria-label="${t("label")}" title="${t("label")}"><i class="${icon(on)}" aria-hidden="true"></i></button>`;
  }

  function sync() {
    const favs = read();
    document.querySelectorAll("[data-fav]").forEach((b) => {
      const on = favs.includes(b.getAttribute("data-fav"));
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
      b.setAttribute("aria-label", t("label"));
      b.querySelector("i").className = icon(on);
    });
    document.querySelectorAll(".fav-badge").forEach((el) => {
      el.textContent = digits(favs.length);
      el.classList.toggle("is-hidden", favs.length === 0);
    });
  }

  function describe(key) {
    const [kind, id] = key.includes(":") ? key.split(":") : ["product", key];
    const l = lang();
    if (kind === "course" && typeof KHOOZO_COURSES !== "undefined") {
      const c = KHOOZO_COURSES.find((x) => x.id === id);
      return c && { kind, title: c[l].title, desc: c[l].tagline, iconClass: "fa-solid fa-graduation-cap", price: c.price, href: `course.html?id=${id}`, cart: [id, "course"] };
    }
    if (kind === "project" && typeof KHOOZO_IT_PROJECTS !== "undefined") {
      const p = KHOOZO_IT_PROJECTS[id];
      if (!p) return null;
      const dict = typeof KHOOZO_I18N_DICT !== "undefined" ? KHOOZO_I18N_DICT[l] : {};
      return { kind, title: dict[p.titleKey] || p.titleKey, desc: dict[p.descKey] || "", iconClass: p.icon, href: `project.html?id=${id}` };
    }
    if (kind === "product" && typeof KHOOZO_PRODUCTS !== "undefined") {
      const p = KHOOZO_PRODUCTS.find((x) => x.id === id);
      return p && { kind, title: p[l].title, desc: p[l].tagline, iconClass: p.icon, price: p.pack.price, href: `product.html?id=${id}`, cart: [id, "pack"] };
    }
    return null;
  }

  function renderPage() {
    const root = document.getElementById("favRoot");
    if (!root) return;
    const rows = read().map((key) => ({ key, item: describe(key) })).filter((r) => r.item);
    root.innerHTML = `<h1 class="cart-h1">${t("label")}</h1>` + (rows.length
      ? `<div class="fav-grid">${rows.map(({ key, item }) => `
        <article class="service-card fav-card">
          ${button(key, "fav-card-heart")}
          <span class="service-icon"><i class="${esc(item.iconClass)}" aria-hidden="true"></i></span>
          <small class="fav-kind">${t(item.kind)}</small>
          <h4></h4>
          <p></p>
          ${item.price ? `<b class="fav-price">${taka(item.price)}</b>` : ""}
          <div class="fav-actions">
            ${item.cart ? `<button type="button" class="btn btn-sm btn-primary" data-add-to-cart="${esc(item.cart[0])}" data-cart-plan="${item.cart[1]}"><span class="add-label">${t("add")}</span></button>` : ""}
            <a class="tr-link" href="${esc(item.href)}">${t("view")} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
          </div>
        </article>`).join("")}</div>`
      : `<div class="cart-empty"><i class="fa-regular fa-heart" aria-hidden="true"></i><p>${t("empty")}</p><a class="btn btn-primary" href="index.html#services">${t("browse")}</a></div>`);
    root.querySelectorAll(".fav-card").forEach((card, i) => {
      card.querySelector("h4").textContent = rows[i].item.title;
      card.querySelector("p").textContent = rows[i].item.desc;
    });
    if (window.KhoozoCart) window.KhoozoCart.wireAddButtons(root);
  }

  // Capture phase: some hearts sit inside a link that would otherwise navigate.
  document.addEventListener("click", (e) => {
    const btn = e.target.closest && e.target.closest("[data-fav]");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const key = btn.getAttribute("data-fav");
    const favs = read();
    const next = favs.includes(key) ? favs.filter((x) => x !== key) : [...favs, key];
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (err) { /* storage blocked */ }
    sync();
    renderPage();
  }, true);

  window.KhoozoFav = { button, sync };

  function renderAll() { renderPage(); sync(); }
  document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    // Hearts rendered later by other scripts, and language switches.
    new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    setTimeout(sync, 0);
  });
})();
