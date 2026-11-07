/* Shared Khoozo accounts: same khoozo_laravel users and JWTs as the User App. */
(function () {
  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  const localPort = isLocal ? new URLSearchParams(location.search).get("apiPort") || sessionStorage.getItem("khoozo_api_port") || "3200" : "";
  if (isLocal) sessionStorage.setItem("khoozo_api_port", localPort);
  const API = (isLocal ? "http://localhost:" + localPort : "https://api.khoozo.com") + "/api/v1";
  const ACCESS = "khoozo_access_token";
  const REFRESH = "khoozo_refresh_token";
  const USER = "khoozo_user";

  const STR = {
    en: {
      login: "Log in", register: "Register", account: "My account",
      loginTitle: "Welcome back", loginSub: "Use the same mobile number as your Khoozo app.",
      registerTitle: "Create your account", registerSub: "One account for this website and the Khoozo app.",
      name: "Full name", namePh: "Your name", mobile: "Mobile number",
      mobileErr: "Enter a valid Bangladeshi mobile number, e.g. 01712345678",
      password: "Password", passwordHint: "This account needs its password.", passwordErr: "Please enter your password", manage: "Manage website",
      nameErr: "Please enter your name", netErr: "Could not reach the Khoozo server. Please try again.",
      genericErr: "Something went wrong. Please try again.", busy: "Please wait…",
      saveName: "Save and continue", nameStepTitle: "What should we call you?", nameStepSub: "Your account is ready. Add your name to finish.",
      existing: "This number already has an account, so you are now logged in.",
      logout: "Log out", shop: "Browse digital products", appNote: "This account also works in the Khoozo app.",
      noName: "Khoozo user",
    },
    bn: {
      login: "লগ ইন", register: "রেজিস্টার", account: "আমার অ্যাকাউন্ট",
      loginTitle: "আবার স্বাগতম", loginSub: "আপনার খোঁজো অ্যাপের মোবাইল নম্বরটিই ব্যবহার করুন।",
      registerTitle: "অ্যাকাউন্ট তৈরি করুন", registerSub: "এই ওয়েবসাইট ও খোঁজো অ্যাপের জন্য একটিই অ্যাকাউন্ট।",
      name: "পুরো নাম", namePh: "আপনার নাম", mobile: "মোবাইল নম্বর",
      mobileErr: "সঠিক বাংলাদেশি মোবাইল নম্বর দিন, যেমন 01712345678",
      password: "পাসওয়ার্ড", passwordHint: "এই অ্যাকাউন্টে পাসওয়ার্ড প্রয়োজন।", passwordErr: "পাসওয়ার্ড লিখুন", manage: "ওয়েবসাইট পরিচালনা",
      nameErr: "অনুগ্রহ করে আপনার নাম লিখুন", netErr: "সার্ভারে সংযোগ করা যায়নি। আবার চেষ্টা করুন।",
      genericErr: "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।", busy: "অপেক্ষা করুন…",
      saveName: "সেভ করে এগিয়ে যান", nameStepTitle: "আপনাকে কী নামে ডাকব?", nameStepSub: "অ্যাকাউন্ট তৈরি হয়েছে। শেষ করতে নাম যোগ করুন।",
      existing: "এই নম্বরে আগে থেকেই অ্যাকাউন্ট আছে, তাই আপনি লগ ইন হয়ে গেছেন।",
      logout: "লগ আউট", shop: "ডিজিটাল পণ্য দেখুন", appNote: "এই অ্যাকাউন্ট খোঁজো অ্যাপেও কাজ করবে।",
      noName: "খোঁজো ব্যবহারকারী",
    },
  };
  const t = (k) => (STR[document.documentElement.lang === "bn" ? "bn" : "en"])[k];

  function store(key, value) {
    try {
      if (value == null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch (e) { /* storage blocked: session lasts for this page only */ }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function currentUser() {
    try { return JSON.parse(read(USER)); } catch (e) { return null; }
  }
  function isLoggedIn() { return !!read(ACCESS); }
  function saveTokens(d) { store(ACCESS, d.accessToken); store(REFRESH, d.refreshToken); }
  function logout() { store(ACCESS, null); store(REFRESH, null); store(USER, null); renderHeader(); }

  async function send(path, init) {
    const headers = { "Content-Type": "application/json", Accept: "application/json" };
    const token = read(ACCESS);
    if (token) headers.Authorization = "Bearer " + token;
    return fetch(API + path, { ...init, headers });
  }

  async function api(path, init) {
    let res = await send(path, init || {});
    if (res.status === 401 && read(REFRESH)) {
      const r = await fetch(API + "/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ refreshToken: read(REFRESH) }),
      });
      if (r.ok) {
        saveTokens(await r.json());
        res = await send(path, init || {});
      }
    }
    if (res.status === 401 && read(ACCESS)) logout();
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const err = new Error((body && body.message) || res.statusText);
      err.status = res.status;
      throw err;
    }
    return body;
  }

  async function fetchMe() {
    const me = await api("/auth/me");
    store(USER, JSON.stringify(me));
    renderHeader();
    return me;
  }

  // The User App's only sign-in: signs in if the number exists, else creates the account.
  async function phoneAuth(mobileNumber) {
    const data = await api("/auth/phone", { method: "POST", body: JSON.stringify({ mobileNumber }) });
    saveTokens(data);
    await fetchMe();
    return data;
  }

  async function passwordLogin(mobile, password) {
    const mobileNumber = "+880" + mobile.replace(/\D/g, "").slice(-10);
    saveTokens(await api("/auth/login", { method: "POST", body: JSON.stringify({ mobileNumber, password }) }));
    return fetchMe();
  }

  async function saveName(name) {
    const me = await api("/auth/me", { method: "PATCH", body: JSON.stringify({ fullName: name, displayName: name }) });
    store(USER, JSON.stringify(me));
    renderHeader();
    return me;
  }

  function renderHeader() {
    document.querySelectorAll(".account-toggle").forEach((a) => {
      const label = isLoggedIn() ? t("account") : t("login");
      a.setAttribute("aria-label", label);
      a.setAttribute("title", label);
      a.classList.toggle("is-signed-in", isLoggedIn());
    });
  }

  /* login.html */
  const root = document.getElementById("authRoot");
  const view = { tab: new URLSearchParams(location.search).get("tab") === "register" ? "register" : "login", step: "form", mobile: "", name: "", error: "", notice: "", busy: false };

  function nextUrl() {
    const n = new URLSearchParams(location.search).get("next");
    return n && /^[a-z-]+\.html(\?[\w=&-]*)?$/.test(n) ? n : null;
  }
  function finish() {
    const n = nextUrl();
    if (n) location.href = n;
    else { view.step = "form"; render(); }
  }

  function setText(selector, value) {
    const el = root.querySelector(selector);
    if (el) el.textContent = value;
  }

  function render() {
    if (!root) return;
    if (isLoggedIn() && view.step !== "name") return renderAccount();
    if (view.step === "name") return renderNameStep();
    if (view.step === "password") return renderPasswordStep();
    const reg = view.tab === "register";
    root.innerHTML = `
      <div class="auth-card">
        <div class="auth-tabs" role="tablist">
          <button type="button" role="tab" data-tab="login" aria-selected="${!reg}" class="${reg ? "" : "is-active"}">${t("login")}</button>
          <button type="button" role="tab" data-tab="register" aria-selected="${reg}" class="${reg ? "is-active" : ""}">${t("register")}</button>
        </div>
        <h1 class="auth-title">${t(reg ? "registerTitle" : "loginTitle")}</h1>
        <p class="auth-sub">${t(reg ? "registerSub" : "loginSub")}</p>
        <form id="authForm" novalidate>
          ${reg ? `<label class="field"><span>${t("name")}</span><input class="pay-input" id="authName" autocomplete="name" placeholder="${t("namePh")}"></label>` : ""}
          <label class="field"><span>${t("mobile")}</span><input class="pay-input" id="authMobile" type="tel" inputmode="tel" autocomplete="tel" placeholder="01712345678"></label>
          <p class="auth-error" role="alert"></p>
          <button class="btn btn-primary auth-submit" type="submit" ${view.busy ? "disabled" : ""}>${view.busy ? t("busy") : t(reg ? "register" : "login")}</button>
        </form>
      </div>`;
    root.querySelector("#authMobile").value = view.mobile;
    if (reg) root.querySelector("#authName").value = view.name;
    setText(".auth-error", view.error);
    root.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => {
      view.tab = b.getAttribute("data-tab");
      view.error = "";
      render();
    }));
    root.querySelector("#authForm").addEventListener("submit", submitForm);
  }

  async function submitForm(e) {
    e.preventDefault();
    const reg = view.tab === "register";
    view.mobile = root.querySelector("#authMobile").value.trim();
    view.name = reg ? root.querySelector("#authName").value.trim() : "";
    view.error = "";
    if (reg && !view.name) { view.error = t("nameErr"); return render(); }
    if (!/^(?:\+?880|0)?1[3-9]\d{8}$/.test(view.mobile.replace(/[\s-]/g, ""))) { view.error = t("mobileErr"); return render(); }
    view.busy = true;
    render();
    try {
      const data = await phoneAuth(view.mobile.replace(/[\s-]/g, ""));
      view.busy = false;
      const u = currentUser() || {};
      const nameless = !u.fullName && !u.displayName;
      if (reg && nameless) await saveName(view.name);
      else if (nameless) { view.step = "name"; return render(); }
      if (reg && !data.isNewAccount) view.notice = t("existing");
      finish();
    } catch (err) {
      view.busy = false;
      if (err.status === 403 && String(err.message) === "PASSWORD_REQUIRED") {
        view.step = "password";
        return render();
      }
      view.error = !err.status ? t("netErr") : err.status >= 500 ? t("genericErr") : err.message || t("genericErr");
      render();
    }
  }

  function renderPasswordStep() {
    root.innerHTML = `
      <div class="auth-card">
        <h1 class="auth-title">${t("loginTitle")}</h1>
        <p class="auth-sub">${t("passwordHint")}</p>
        <form id="passwordForm" novalidate>
          <label class="field"><span>${t("password")}</span><input class="pay-input" id="authPassword" type="password" autocomplete="current-password"></label>
          <p class="auth-error" role="alert"></p>
          <button class="btn btn-primary auth-submit" type="submit">${t("login")}</button>
        </form>
      </div>`;
    setText(".auth-error", view.error);
    root.querySelector("#passwordForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const password = root.querySelector("#authPassword").value;
      if (!password) { view.error = t("passwordErr"); return renderPasswordStep(); }
      try {
        await passwordLogin(view.mobile, password);
        view.error = "";
        view.step = "form";
        finish();
      } catch (err) {
        view.error = !err.status ? t("netErr") : err.status >= 500 ? t("genericErr") : err.message || t("genericErr");
        renderPasswordStep();
      }
    });
  }

  function renderNameStep() {
    root.innerHTML = `
      <div class="auth-card">
        <h1 class="auth-title">${t("nameStepTitle")}</h1>
        <p class="auth-sub">${t("nameStepSub")}</p>
        <form id="nameForm" novalidate>
          <label class="field"><span>${t("name")}</span><input class="pay-input" id="authName" autocomplete="name" placeholder="${t("namePh")}"></label>
          <p class="auth-error" role="alert"></p>
          <button class="btn btn-primary auth-submit" type="submit">${t("saveName")}</button>
        </form>
      </div>`;
    setText(".auth-error", view.error);
    root.querySelector("#nameForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = root.querySelector("#authName").value.trim();
      if (!name) { view.error = t("nameErr"); return renderNameStep(); }
      try {
        await saveName(name);
        view.error = "";
        view.step = "form";
        finish();
      } catch (err) {
        view.error = err.status ? t("genericErr") : t("netErr");
        renderNameStep();
      }
    });
  }

  function renderAccount() {
    root.innerHTML = `
      <div class="auth-card auth-account">
        <span class="auth-avatar"><i class="fa-solid fa-user" aria-hidden="true"></i></span>
        <p class="auth-notice"></p>
        <h1 class="auth-title" id="acctName"></h1>
        <p class="auth-mobile" id="acctMobile"></p>
        <p class="auth-sub">${t("appNote")}</p>
        ${(currentUser() || {}).role === "ADMIN" ? `<a class="btn btn-primary auth-submit auth-manage" href="admin.html">${t("manage")}</a>` : ""}
        <a class="btn btn-primary auth-submit" href="index.html#products">${t("shop")}</a>
        <button class="btn auth-logout" type="button" id="authLogout">${t("logout")}</button>
      </div>`;
    const u = currentUser() || {};
    setText("#acctName", u.displayName || u.fullName || t("noName"));
    setText("#acctMobile", u.mobileNumber || "");
    setText(".auth-notice", view.notice);
    root.querySelector("#authLogout").addEventListener("click", () => {
      logout();
      view.notice = "";
      view.tab = "login";
      render();
    });
  }

  window.KhoozoAuth = { isLoggedIn, currentUser, logout, fetchMe, api, apiBase: API, token: () => read(ACCESS) };

  const prevHook = window.khoozoOnLangChange;
  window.khoozoOnLangChange = function () {
    if (prevHook) prevHook();
    renderHeader();
    if (root && !view.busy) render();
  };

  renderHeader();
  render();
  if (isLoggedIn()) fetchMe().then(() => { if (root && view.step === "form") render(); }).catch(() => {});
})();
