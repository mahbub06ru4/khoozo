/* Website content manager. Never linked for normal users, and the API rejects
   every write unless the signed-in account is an ADMIN. */
(function () {
  const root = document.getElementById("adminRoot");
  const Auth = window.KhoozoAuth;
  const CATEGORIES = [["COURSE", "Training"], ["IT_PROJECT", "IT Products"], ["PRODUCT", "Digital Products"], ["PROPERTY", "Real Estate Products"]];
  const SOURCES = [["FACEBOOK", "Facebook"], ["WHATSAPP", "WhatsApp"], ["GOOGLE", "Google"], ["OTHER", "Other"]];
  const SOLD = ["COURSE", "PRODUCT"];
  const state = { tab: "items", filter: "", items: [], reviews: [], editing: null, error: "", notice: "", busy: false };

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const label = (list, value) => (list.find((x) => x[0] === value) || [, value])[1];
  const isImage = (url) => /^(https?:|assets\/)/.test(url);

  async function upload(path, form) {
    const res = await fetch(Auth.apiBase + path, {
      method: "POST",
      headers: { Accept: "application/json", Authorization: "Bearer " + Auth.token() },
      body: form,
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) throw Object.assign(new Error((body && body.message) || "Upload failed"), { status: res.status });
    return body;
  }

  async function load() {
    state.busy = true;
    render();
    try {
      const [items, reviews] = await Promise.all([Auth.api("/admin/catalog"), Auth.api("/admin/customer-reviews")]);
      state.items = items;
      state.reviews = reviews;
    } catch (e) {
      if (e.status === 401 || e.status === 403) return denied();
      state.error = "Could not load content. Please try again.";
    }
    state.busy = false;
    render();
  }

  function denied() {
    location.replace("login.html?next=admin.html");
  }

  function attempt(fn) {
    return async (...args) => {
      state.error = "";
      state.notice = "";
      state.busy = true;
      render(true);
      try {
        await fn(...args);
      } catch (e) {
        if (e.status === 401) return denied();
        state.error = e.status && e.status < 500 ? e.message : "Something went wrong. Please try again.";
      }
      state.busy = false;
      render();
    };
  }

  const field = (name, text, value, attrs) => `<label class="field"><span>${text}</span><input class="pay-input" name="${name}" value="${esc(value)}" ${attrs || ""}></label>`;
  const area = (name, text, value, rows) => `<label class="field"><span>${text}</span><textarea class="pay-input" name="${name}" rows="${rows || 3}">${esc(value)}</textarea></label>`;
  const publish = (checked) => `<label class="admin-check"><input type="checkbox" name="isPublished" ${checked ? "checked" : ""}> Show on website</label>`;
  const select = (name, text, list, value, attrs) => `<label class="field"><span>${text}</span><select class="pay-input" name="${name}" ${attrs || ""}>${list.map(([v, l]) => `<option value="${v}" ${v === value ? "selected" : ""}>${l}</option>`).join("")}</select></label>`;

  function itemForm(it) {
    const type = it.type || "COURSE";
    const sold = SOLD.includes(type);
    return `<form class="auth-card admin-form" id="itemForm" novalidate>
      <h2>${it.id ? "Edit item" : "Add item"}</h2>
      ${select("type", "Category", CATEGORIES, type, it.id ? "disabled" : "")}
      ${field("titleEn", "Title (English)", it.titleEn, "required")}
      ${field("titleBn", "Title (Bangla)", it.titleBn)}
      ${area("summaryEn", "Short summary (English)", it.summaryEn, 2)}
      ${area("summaryBn", "Short summary (Bangla)", it.summaryBn, 2)}
      ${area("descriptionEn", "Description (English)", it.descriptionEn, 4)}
      ${area("descriptionBn", "Description (Bangla)", it.descriptionBn, 4)}
      ${sold ? field("price", "Price (৳)", it.price, 'type="number" min="0" required') + field("originalPrice", "Original price (৳)", it.originalPrice, 'type="number" min="0"') : ""}
      ${type === "PRODUCT" ? field("comboPrice", "Combo price (৳)", it.comboPrice, 'type="number" min="0"') + field("comboOriginalPrice", "Combo original price (৳)", it.comboOriginalPrice, 'type="number" min="0"') : ""}
      <div class="field"><span>Images</span>
        <div class="admin-images">${(it.images || []).map((im) => `<div class="admin-thumb">${isImage(im.url) ? `<img src="${esc(im.url)}" alt="">` : ""}<button type="button" data-remove-image="${esc(im.id)}" aria-label="Remove image">×</button></div>`).join("")}</div>
        <input type="file" name="images" accept="image/jpeg,image/png,image/webp" multiple>
        <small>Up to 10 at a time. Large images are resized automatically.</small>
      </div>
      ${publish(it.isPublished !== false)}
      <p class="auth-error" role="alert"></p>
      <div class="admin-actions"><button class="btn btn-primary" type="submit">Save</button><button class="btn btn-outline" type="button" data-cancel>Cancel</button></div>
    </form>`;
  }

  function reviewForm(r) {
    return `<form class="auth-card admin-form" id="reviewForm" novalidate>
      <h2>${r.id ? "Edit review" : "Add review"}</h2>
      <p class="auth-sub">Only publish real reviews, with the customer's permission. Hide phone numbers in screenshots.</p>
      ${field("customerName", "Customer name", r.customerName, "required")}
      ${select("source", "Source", SOURCES, r.source || "FACEBOOK")}
      ${field("serviceEn", "Service (English)", r.serviceEn)}
      ${field("serviceBn", "Service (Bangla)", r.serviceBn)}
      ${area("textEn", "Review (English)", r.textEn)}
      ${area("textBn", "Review (Bangla)", r.textBn)}
      ${select("rating", "Rating", [5, 4, 3, 2, 1].map((n) => [String(n), n + " stars"]), String(r.rating || 5))}
      <div class="field"><span>Screenshot (optional)</span>
        ${r.image ? `<div class="admin-images"><div class="admin-thumb"><img src="${esc(r.image)}" alt=""></div></div>` : ""}
        <input type="file" name="image" accept="image/jpeg,image/png,image/webp">
      </div>
      ${publish(r.isPublished !== false)}
      <p class="auth-error" role="alert"></p>
      <div class="admin-actions"><button class="btn btn-primary" type="submit">Save</button><button class="btn btn-outline" type="button" data-cancel>Cancel</button></div>
    </form>`;
  }

  function values(form) {
    const body = {};
    new FormData(form).forEach((v, k) => { if (typeof v === "string") body[k] = v.trim() === "" ? null : v.trim(); });
    ["price", "originalPrice", "comboPrice", "comboOriginalPrice", "rating"].forEach((k) => { if (body[k] != null) body[k] = Number(body[k]); });
    body.isPublished = form.elements.isPublished.checked;
    return body;
  }

  const saveItem = attempt(async (form, editing) => {
    const body = values(form);
    if (editing.id) delete body.type;
    const saved = await Auth.api(editing.id ? `/admin/catalog/${editing.id}` : "/admin/catalog", { method: editing.id ? "PATCH" : "POST", body: JSON.stringify(body) });
    state.editing = { ...editing, ...saved };
    const files = form.elements.images.files;
    if (files.length) {
      const data = new FormData();
      Array.from(files).forEach((f) => data.append("images[]", f));
      await upload(`/admin/catalog/${saved.id}/images`, data);
    }
    state.editing = null;
    state.notice = "Saved. The website is updated.";
    await load();
  });

  const saveReview = attempt(async (form, editing) => {
    const body = values(form);
    const saved = await Auth.api(editing.id ? `/admin/customer-reviews/${editing.id}` : "/admin/customer-reviews", { method: editing.id ? "PATCH" : "POST", body: JSON.stringify(body) });
    state.editing = { ...editing, ...saved };
    const file = form.elements.image.files[0];
    if (file) {
      const data = new FormData();
      data.append("image", file);
      await upload(`/admin/customer-reviews/${saved.id}/image`, data);
    }
    state.editing = null;
    state.notice = "Saved. The website is updated.";
    await load();
  });

  const removeImage = attempt(async (imageId) => {
    state.editing = await Auth.api(`/admin/catalog/${state.editing.id}/images/${imageId}`, { method: "DELETE" });
  });

  const removeRow = attempt(async (path, title) => {
    if (!confirm(`Permanently delete "${title}" and its images? This can't be undone.`)) return;
    await Auth.api(path, { method: "DELETE" });
    state.notice = "Deleted.";
    await load();
  });

  function listView() {
    if (state.tab === "reviews") {
      return `<button class="btn btn-primary" data-add>Add review</button>
        <div class="admin-list">${state.reviews.map((r) => `
          <div class="admin-row">
            <div><b>${esc(r.customerName)}</b><small>${label(SOURCES, r.source)} · ${r.rating}★${r.isPublished ? "" : " · Hidden"}</small></div>
            <button class="btn btn-sm btn-outline" data-edit="${esc(r.id)}">Edit</button>
            <button class="btn btn-sm btn-outline" data-delete="${esc(r.id)}">Delete</button>
          </div>`).join("") || `<p class="auth-sub">No reviews yet. The Home page hides the review section until you add one.</p>`}</div>`;
    }
    const rows = state.items.filter((i) => !state.filter || i.type === state.filter);
    return `<div class="admin-toolbar">
        <label class="field"><span>Category</span><select class="pay-input" id="adminFilter"><option value="">All</option>${CATEGORIES.map(([v, l]) => `<option value="${v}" ${v === state.filter ? "selected" : ""}>${l}</option>`).join("")}</select></label>
        <button class="btn btn-primary" data-add>Add item</button>
      </div>
      <div class="admin-list">${rows.map((i) => `
        <div class="admin-row">
          <div><b>${esc(i.titleEn)}</b><small>${label(CATEGORIES, i.type)}${i.price != null ? " · ৳" + i.price : ""} · ${i.images.length} images${i.isPublished ? "" : " · Hidden"}</small></div>
          <button class="btn btn-sm btn-outline" data-edit="${esc(i.id)}">Edit</button>
          <button class="btn btn-sm btn-outline" data-delete="${esc(i.id)}">Delete</button>
        </div>`).join("") || `<p class="auth-sub">No items here yet.</p>`}</div>`;
  }

  function render(keepForm) {
    if (keepForm && state.editing) {
      const btn = root.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      return;
    }
    const e = state.editing;
    const content = e ? (state.tab === "reviews" ? reviewForm(e) : itemForm(e)) : state.busy ? `<p class="auth-sub">Loading…</p>` : listView();
    root.innerHTML = `
      <div class="admin-head"><h1 class="cart-h1">Website admin</h1><button class="btn btn-sm btn-outline" id="adminLogout">Log out</button></div>
      <div class="auth-tabs admin-tabs" role="tablist">
        <button type="button" data-tab="items" class="${state.tab === "items" ? "is-active" : ""}">Items</button>
        <button type="button" data-tab="reviews" class="${state.tab === "reviews" ? "is-active" : ""}">Reviews</button>
      </div>
      <p class="admin-notice"></p><p class="admin-error auth-error" role="alert"></p>
      ${content}`;
    root.querySelector(".admin-notice").textContent = state.notice;
    root.querySelector(".admin-error").textContent = state.error;
    wire();
  }

  function wire() {
    root.querySelector("#adminLogout").addEventListener("click", () => { Auth.logout(); location.replace("login.html"); });
    root.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => {
      state.tab = b.getAttribute("data-tab");
      state.editing = null;
      state.notice = state.error = "";
      render();
    }));
    const filter = root.querySelector("#adminFilter");
    if (filter) filter.addEventListener("change", () => { state.filter = filter.value; render(); });
    const add = root.querySelector("[data-add]");
    if (add) add.addEventListener("click", () => { state.editing = state.tab === "items" ? { type: state.filter || "COURSE" } : {}; render(); });
    const list = () => (state.tab === "items" ? state.items : state.reviews);
    root.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => {
      state.editing = list().find((x) => x.id === b.getAttribute("data-edit"));
      render();
    }));
    root.querySelectorAll("[data-delete]").forEach((b) => b.addEventListener("click", () => {
      const row = list().find((x) => x.id === b.getAttribute("data-delete"));
      const path = state.tab === "items" ? `/admin/catalog/${row.id}` : `/admin/customer-reviews/${row.id}`;
      removeRow(path, row.titleEn || row.customerName);
    }));
    root.querySelectorAll("[data-remove-image]").forEach((b) => b.addEventListener("click", () => removeImage(b.getAttribute("data-remove-image"))));
    const cancel = root.querySelector("[data-cancel]");
    if (cancel) cancel.addEventListener("click", () => { state.editing = null; state.error = ""; render(); });

    const itemF = root.querySelector("#itemForm");
    if (itemF) {
      itemF.elements.type.addEventListener("change", () => {
        state.editing = { ...state.editing, ...values(itemF), type: itemF.elements.type.value };
        render();
      });
      itemF.addEventListener("submit", (ev) => { ev.preventDefault(); if (itemF.reportValidity()) saveItem(itemF, state.editing); });
    }
    const reviewF = root.querySelector("#reviewForm");
    if (reviewF) reviewF.addEventListener("submit", (ev) => { ev.preventDefault(); if (reviewF.reportValidity()) saveReview(reviewF, state.editing); });
  }

  document.addEventListener("DOMContentLoaded", async () => {
    if (!Auth.isLoggedIn()) return denied();
    try {
      const me = await Auth.fetchMe();
      if (me.role !== "ADMIN") {
        root.innerHTML = `<div class="auth-card"><h1 class="auth-title">Page not found</h1><a class="btn btn-primary" href="index.html">Home</a></div>`;
        return;
      }
    } catch (e) {
      return denied();
    }
    load();
  });
})();
