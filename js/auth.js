/* Shared Khoozo accounts: Google sign-in only, with the same khoozo_laravel users
   and JWTs as the apps. The API decides staff roles from the Google email. */
(function () {
  // Web client ID from Firebase > Authentication > Google. It's public, not a secret.
  const GOOGLE_CLIENT_ID = "";

  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  const localPort = isLocal ? new URLSearchParams(location.search).get("apiPort") || sessionStorage.getItem("khoozo_api_port") || "3200" : "";
  if (isLocal) sessionStorage.setItem("khoozo_api_port", localPort);
  const API = (isLocal ? "http://localhost:" + localPort : "https://api.khoozo.com") + "/api/v1";
  const ACCESS = "khoozo_access_token";
  const REFRESH = "khoozo_refresh_token";
  const USER = "khoozo_user";

  const STR = {
    en: {
      login: "Log in", account: "My account",
      title: "Welcome to Khoozo", sub: "Sign in with Google. One account for this website and the Khoozo app.",
      notReady: "Google sign-in isn't set up yet.", failed: "Could not sign in. Please try again.",
      netErr: "Could not reach the Khoozo server. Please try again.",
      genericErr: "Something went wrong. Please try again.",
      mobile: "Phone or WhatsApp number", mobileHint: "Needed so requesters and providers can contact each other.",
      mobileErr: "Enter a valid Bangladeshi mobile number, e.g. 01712345678", saveMobile: "Save number", mobileSaved: "Number saved.",
      manage: "Manage website", logout: "Log out", shop: "Browse digital products",
      appNote: "This account also works in the Khoozo app.", noName: "Khoozo user",
    },
    bn: {
      login: "লগ ইন", account: "আমার অ্যাকাউন্ট",
      title: "খোঁজোতে স্বাগতম", sub: "Google দিয়ে সাইন ইন করুন। এই ওয়েবসাইট ও খোঁজো অ্যাপের জন্য একটিই অ্যাকাউন্ট।",
      notReady: "Google সাইন ইন এখনও চালু হয়নি।", failed: "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
      netErr: "সার্ভারে সংযোগ করা যায়নি। আবার চেষ্টা করুন।",
      genericErr: "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।",
      mobile: "ফোন বা হোয়াটসঅ্যাপ নম্বর", mobileHint: "অনুরোধকারী ও সেবাদাতা যেন একে অপরের সাথে যোগাযোগ করতে পারেন।",
      mobileErr: "সঠিক বাংলাদেশি মোবাইল নম্বর দিন, যেমন 01712345678", saveMobile: "নম্বর সেভ করুন", mobileSaved: "নম্বর সেভ হয়েছে।",
      manage: "ওয়েবসাইট পরিচালনা", logout: "লগ আউট", shop: "ডিজিটাল পণ্য দেখুন",
      appNote: "এই অ্যাকাউন্ট খোঁজো অ্যাপেও কাজ করবে।", noName: "খোঁজো ব্যবহারকারী",
    },
  };
  const t = (k) => STR[document.documentElement.lang === "bn" ? "bn" : "en"][k];

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
  function logout() {
    store(ACCESS, null); store(REFRESH, null); store(USER, null);
    if (window.google && google.accounts) google.accounts.id.disableAutoSelect();
    renderHeader();
  }

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
  const view = { error: "", notice: "" };
  const errorText = (err) => (!err.status ? t("netErr") : err.status >= 500 ? t("genericErr") : err.message || t("genericErr"));

  function setText(selector, value) {
    const el = root.querySelector(selector);
    if (el) el.textContent = value;
  }

  function nextUrl() {
    const n = new URLSearchParams(location.search).get("next");
    return n && /^[a-z-]+\.html(\?[\w=&-]*)?$/.test(n) ? n : null;
  }

  async function onGoogleCredential(response) {
    view.error = "";
    try {
      saveTokens(await api("/auth/google", { method: "POST", body: JSON.stringify({ idToken: response.credential }) }));
      await fetchMe();
      const next = nextUrl();
      if (next) location.href = next;
      else render();
    } catch (err) {
      store(ACCESS, null); store(REFRESH, null);
      view.error = err.status === 401 ? t("failed") : errorText(err);
      render();
    }
  }

  function showGoogleButton() {
    const host = root.querySelector("#googleButton");
    if (!host) return;
    if (!GOOGLE_CLIENT_ID) {
      setText(".auth-error", t("notReady"));
      return;
    }
    const draw = () => {
      google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: onGoogleCredential });
      google.accounts.id.renderButton(host, { theme: "outline", size: "large", text: "continue_with", width: 280 });
    };
    if (window.google && google.accounts) return draw();
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = draw;
    script.onerror = () => setText(".auth-error", t("netErr"));
    document.head.appendChild(script);
  }

  function render() {
    if (!root) return;
    if (isLoggedIn()) return renderAccount();
    root.innerHTML = `
      <div class="auth-card auth-google">
        <h1 class="auth-title">${t("title")}</h1>
        <p class="auth-sub">${t("sub")}</p>
        <div id="googleButton"></div>
        <p class="auth-error" role="alert"></p>
      </div>`;
    setText(".auth-error", view.error);
    showGoogleButton();
  }

  function renderAccount() {
    const u = currentUser() || {};
    root.innerHTML = `
      <div class="auth-card auth-account">
        <span class="auth-avatar"><i class="fa-solid fa-user" aria-hidden="true"></i></span>
        <p class="auth-notice"></p>
        <h1 class="auth-title" id="acctName"></h1>
        <p class="auth-mobile" id="acctEmail"></p>
        <p class="auth-sub">${t("appNote")}</p>
        ${u.role === "ADMIN" ? `<a class="btn btn-primary auth-submit auth-manage" href="admin.html">${t("manage")}</a>` : ""}
        <a class="btn btn-primary auth-submit" href="index.html#products">${t("shop")}</a>
        <form id="mobileForm" class="auth-email" novalidate>
          <label class="field"><span>${t("mobile")}</span><input class="pay-input" id="accountMobile" type="tel" inputmode="tel" autocomplete="tel" placeholder="01712345678"><small>${t("mobileHint")}</small></label>
          <p class="auth-error" role="alert"></p>
          <button class="btn auth-logout" type="submit">${t("saveMobile")}</button>
        </form>
        <button class="btn auth-logout" type="button" id="authLogout">${t("logout")}</button>
      </div>`;
    setText("#acctName", u.displayName || u.fullName || t("noName"));
    setText("#acctEmail", u.email || "");
    setText(".auth-notice", view.notice);
    root.querySelector("#accountMobile").value = u.mobileNumber ? "0" + u.mobileNumber.slice(-10) : "";
    root.querySelector("#mobileForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const mobileNumber = root.querySelector("#accountMobile").value.replace(/[\s-]/g, "");
      if (!/^(?:\+?880|0)?1[3-9]\d{8}$/.test(mobileNumber)) {
        form.querySelector(".auth-error").textContent = t("mobileErr");
        return;
      }
      try {
        store(USER, JSON.stringify(await api("/auth/me", { method: "PATCH", body: JSON.stringify({ mobileNumber }) })));
        form.querySelector(".auth-error").textContent = "";
        setText(".auth-notice", t("mobileSaved"));
      } catch (err) {
        form.querySelector(".auth-error").textContent = errorText(err);
      }
    });
    root.querySelector("#authLogout").addEventListener("click", () => {
      logout();
      view.notice = "";
      render();
    });
  }

  window.KhoozoAuth = { isLoggedIn, currentUser, logout, fetchMe, api, apiBase: API, token: () => read(ACCESS) };

  const prevHook = window.khoozoOnLangChange;
  window.khoozoOnLangChange = function () {
    if (prevHook) prevHook();
    renderHeader();
    if (root) render();
  };

  renderHeader();
  render();
  if (isLoggedIn()) fetchMe().then(() => { if (root) render(); }).catch(() => {});
})();
