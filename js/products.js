/* ================================================================
   Khoozo — js/products.js
   Digital products: PDF guides + a mobile app, sold on their own
   ("pack") or together with the live course ("combo").
     index.html#products        → product cards (#productGrid)
     product.html?id=<id>       → product details (#productRoot)
     pay.html?product=<id>&plan=pack|combo → checkout (js/training.js)
   Edit prices and contents in KHOOZO_PRODUCTS below — every page reads
   from here. Prices are in BDT.
   ================================================================ */
"use strict";

const KHOOZO_PRODUCTS = [
  {
    id: "air-ticketing",
    icon: "fa-solid fa-plane-departure",
    colors: ["#0b1f4b", "#2563eb"],
    courseId: "ticketing",            // links the combo to course.html?id=ticketing
    course: { weeks: 6, hours: 36 },
    pack: { price: 799, originalPrice: 1500 },
    combo: { price: 4999, originalPrice: 16500 },
    en: {
      title: "Air Ticketing Pro Kit",
      tagline: "Sabre, Amadeus & Galileo — guides, cheat-sheets and a GDS practice app.",
      desc: "Everything you need to practise airline reservations and ticketing on your own: step-by-step PDF guides for all three major GDSs and a mobile simulator to practise real-style commands, even offline.",
      pdfs: ["Sabre, Amadeus & Galileo command cheat-sheets", "PNR creation step-by-step guide", "Fare quote, taxes & fare rules handbook", "Reissue, refund & void workbook", "Airline & airport code lists", "Interview questions for ticketing jobs"],
      app: ["GDS Training Simulator (Android)", "Practise Sabre, Amadeus and Galileo commands with a built-in tutor that explains mistakes."],
      course: "Air Ticketing with Sabre, Amadeus & Galileo — live online classes",
      courseMode: "Online live",
      audience: ["Travel & tourism students", "Travel-agency job seekers", "New ticketing staff", "Anyone starting a ticketing business"],
    },
    bn: {
      title: "এয়ার টিকেটিং প্রো কিট",
      tagline: "Sabre, Amadeus ও Galileo — গাইড, চিট-শিট আর GDS প্র্যাকটিস অ্যাপ।",
      desc: "নিজে নিজে এয়ারলাইন রিজার্ভেশন ও টিকেটিং প্র্যাকটিসের জন্য যা দরকার সব: তিনটি GDS-এর ধাপে ধাপে PDF গাইড আর আসল টার্মিনালের মতো কমান্ড প্র্যাকটিসের মোবাইল সিমুলেটর — ইন্টারনেট ছাড়াও চলে।",
      pdfs: ["Sabre, Amadeus ও Galileo কমান্ড চিট-শিট", "PNR তৈরির ধাপে ধাপে গাইড", "ফেয়ার কোট, ট্যাক্স ও ফেয়ার রুল হ্যান্ডবুক", "রিইস্যু, রিফান্ড ও ভয়েড ওয়ার্কবুক", "এয়ারলাইন ও এয়ারপোর্ট কোড তালিকা", "টিকেটিং চাকরির ইন্টারভিউ প্রশ্ন"],
      app: ["GDS ট্রেনিং সিমুলেটর (অ্যান্ড্রয়েড)", "বিল্ট-ইন টিউটরসহ Sabre, Amadeus ও Galileo কমান্ড প্র্যাকটিস — ভুল হলেই বলে দেবে।"],
      course: "সাবরে, অ্যামাডিউস ও গ্যালিলিও দিয়ে এয়ার টিকেটিং — অনলাইন লাইভ ক্লাস",
      courseMode: "অনলাইন লাইভ",
      audience: ["ট্রাভেল অ্যান্ড ট্যুরিজমের শিক্ষার্থী", "ট্রাভেল এজেন্সিতে চাকরিপ্রার্থী", "নতুন টিকেটিং স্টাফ", "যারা নিজে টিকেটিং ব্যবসা শুরু করতে চান"],
    },
  },
  {
    id: "visa-processing",
    icon: "fa-solid fa-passport",
    colors: ["#7f1d1d", "#d97706"],
    courseId: "visa",
    course: { weeks: 4, hours: 24 },
    pack: { price: 699, originalPrice: 1500 },
    combo: { price: 3499, originalPrice: 11500 },
    en: {
      title: "Visa Processing Toolkit",
      tagline: "Country-wise checklists, ready templates and a visa checklist app.",
      desc: "Prepare tourist, business, work and student visa files with confidence: country-wise document checklists, ready-to-edit templates and a companion app to track each client's file.",
      pdfs: ["Country-wise checklists — Schengen, UK, USA, Canada, GCC, Asia", "Cover letter & sponsor letter templates", "Travel itinerary templates", "Bank statement & solvency guide", "Student visa guide — CAS, I-20, LOA, CoE", "Common refusal reasons & how to avoid them"],
      app: ["Visa Checklist app (Android)", "Pick a country and visa type, tick off documents and keep every client's file in order."],
      course: "Visa Processing Professional — live online classes",
      courseMode: "Online live",
      audience: ["Travel-agency staff", "Visa consultancy starters", "Students handling their own file", "Job seekers in the travel sector"],
    },
    bn: {
      title: "ভিসা প্রসেসিং টুলকিট",
      tagline: "দেশভিত্তিক চেকলিস্ট, রেডি টেমপ্লেট আর ভিসা চেকলিস্ট অ্যাপ।",
      desc: "টুরিস্ট, বিজনেস, ওয়ার্ক ও স্টুডেন্ট ভিসার ফাইল আত্মবিশ্বাসের সাথে তৈরি করুন: দেশভিত্তিক ডকুমেন্ট চেকলিস্ট, এডিট করার উপযোগী টেমপ্লেট আর প্রতিটি ক্লায়েন্টের ফাইল ট্র্যাক করার অ্যাপ।",
      pdfs: ["দেশভিত্তিক চেকলিস্ট — শেনজেন, UK, USA, কানাডা, GCC, এশিয়া", "কভার লেটার ও স্পন্সর লেটার টেমপ্লেট", "ভ্রমণ ইটিনেরারি টেমপ্লেট", "ব্যাংক স্টেটমেন্ট ও সলভেন্সি গাইড", "স্টুডেন্ট ভিসা গাইড — CAS, I-20, LOA, CoE", "রিজেকশনের সাধারণ কারণ ও এড়ানোর উপায়"],
      app: ["ভিসা চেকলিস্ট অ্যাপ (অ্যান্ড্রয়েড)", "দেশ ও ভিসার ধরন বেছে নিন, ডকুমেন্ট টিক দিন, প্রতিটি ক্লায়েন্টের ফাইল গুছিয়ে রাখুন।"],
      course: "ভিসা প্রসেসিং প্রফেশনাল — অনলাইন লাইভ ক্লাস",
      courseMode: "অনলাইন লাইভ",
      audience: ["ট্রাভেল এজেন্সির স্টাফ", "যারা ভিসা কনসালটেন্সি শুরু করতে চান", "নিজের ফাইল নিজে করতে চান এমন শিক্ষার্থী", "ট্রাভেল সেক্টরে চাকরিপ্রার্থী"],
    },
  },
  {
    id: "pharmacy",
    icon: "fa-solid fa-prescription-bottle-medical",
    colors: ["#065f46", "#0891b2"],
    course: { weeks: 6, hours: 30 },
    pack: { price: 799, originalPrice: 1500 },
    combo: { price: 3999, originalPrice: 10000 },
    en: {
      title: "Pharmacy Practice Guide",
      tagline: "Medicine, dose and first-aid references for pharmacy staff — in Bangla.",
      desc: "A practical reference set for pharmacy owners and counter staff: common conditions with generic medicines and adult/child doses, drug groups, and safe-dispensing notes — plus a quick-search app for the counter.",
      pdfs: ["100 common conditions — generic medicines & doses", "Child dose chart by weight and age", "Drug groups & common brand-to-generic list", "Safe dispensing & when to refer to a doctor", "First-aid basics for the pharmacy counter", "Stock, expiry & storage checklist"],
      app: ["Pharmacy Quick Reference app (Android)", "Search a condition or generic name and see doses and cautions in seconds."],
      course: "Pharmacy Practice — live online classes",
      courseMode: "Online live",
      audience: ["Pharmacy owners", "Pharmacy counter staff", "Pharmacy course students", "Anyone opening a new pharmacy"],
    },
    bn: {
      title: "ফার্মেসি প্র্যাকটিস গাইড",
      tagline: "ফার্মেসি স্টাফদের জন্য ওষুধ, ডোজ ও প্রাথমিক চিকিৎসার রেফারেন্স — বাংলায়।",
      desc: "ফার্মেসি মালিক ও কাউন্টার স্টাফদের জন্য ব্যবহারিক রেফারেন্স: সাধারণ রোগ, জেনেরিক ওষুধ ও প্রাপ্তবয়স্ক/শিশুর ডোজ, ওষুধের গ্রুপ আর নিরাপদে ওষুধ দেওয়ার নিয়ম — সাথে কাউন্টারে দ্রুত খোঁজার অ্যাপ।",
      pdfs: ["১০০টি সাধারণ রোগ — জেনেরিক ওষুধ ও ডোজ", "ওজন ও বয়স অনুযায়ী শিশুর ডোজ চার্ট", "ওষুধের গ্রুপ ও ব্র্যান্ড থেকে জেনেরিক তালিকা", "নিরাপদে ওষুধ দেওয়া ও কখন ডাক্তারের কাছে পাঠাবেন", "ফার্মেসি কাউন্টারের প্রাথমিক চিকিৎসা", "স্টক, মেয়াদ ও সংরক্ষণ চেকলিস্ট"],
      app: ["ফার্মেসি কুইক রেফারেন্স অ্যাপ (অ্যান্ড্রয়েড)", "রোগ বা জেনেরিক নাম লিখে সেকেন্ডেই ডোজ ও সতর্কতা দেখুন।"],
      course: "ফার্মেসি প্র্যাকটিস — অনলাইন লাইভ ক্লাস",
      courseMode: "অনলাইন লাইভ",
      audience: ["ফার্মেসি মালিক", "ফার্মেসির কাউন্টার স্টাফ", "ফার্মেসি কোর্সের শিক্ষার্থী", "নতুন ফার্মেসি খুলতে চান এমন যে কেউ"],
    },
  },
  {
    id: "ielts-spoken-english",
    icon: "fa-solid fa-language",
    colors: ["#4c1d95", "#db2777"],
    course: { weeks: 8, hours: 40 },
    pack: { price: 999, originalPrice: 2000 },
    combo: { price: 5499, originalPrice: 14000 },
    en: {
      title: "IELTS & Spoken English Kit",
      tagline: "Band-7+ writing templates, speaking practice and daily spoken English.",
      desc: "Prepare for IELTS and speak English with confidence: writing templates and model answers, speaking cue-card practice, a grammar workbook and everyday spoken-English phrases — plus a practice app for vocabulary and speaking.",
      pdfs: ["Writing Task 1 & 2 templates with model answers", "Band-7+ vocabulary & linking words", "Speaking Part 1–3 cue-card practice", "Grammar workbook for writing & speaking", "Listening & reading strategy guide", "1,000 everyday spoken-English phrases"],
      app: ["IELTS & Spoken English practice app (Android)", "Daily vocabulary, flashcards and speaking prompts you can practise anywhere."],
      course: "IELTS & Spoken English — live online classes",
      courseMode: "Online live",
      audience: ["IELTS candidates (Academic & General)", "Students planning to study abroad", "Job seekers who need spoken English", "Anyone building English confidence"],
    },
    bn: {
      title: "IELTS ও স্পোকেন ইংলিশ কিট",
      tagline: "ব্যান্ড ৭+ রাইটিং টেমপ্লেট, স্পিকিং প্র্যাকটিস ও প্রতিদিনের স্পোকেন ইংলিশ।",
      desc: "IELTS প্রস্তুতি নিন আর আত্মবিশ্বাসের সাথে ইংরেজি বলুন: রাইটিং টেমপ্লেট ও মডেল উত্তর, স্পিকিং কিউ-কার্ড প্র্যাকটিস, গ্রামার ওয়ার্কবুক আর প্রতিদিনের স্পোকেন ইংলিশ ফ্রেজ — সাথে ভোকাবুলারি ও স্পিকিং প্র্যাকটিসের অ্যাপ।",
      pdfs: ["রাইটিং টাস্ক ১ ও ২ টেমপ্লেট ও মডেল উত্তর", "ব্যান্ড ৭+ ভোকাবুলারি ও লিংকিং ওয়ার্ড", "স্পিকিং পার্ট ১–৩ কিউ-কার্ড প্র্যাকটিস", "রাইটিং ও স্পিকিংয়ের গ্রামার ওয়ার্কবুক", "লিসেনিং ও রিডিং কৌশল গাইড", "প্রতিদিনের ১,০০০ স্পোকেন ইংলিশ ফ্রেজ"],
      app: ["IELTS ও স্পোকেন ইংলিশ প্র্যাকটিস অ্যাপ (অ্যান্ড্রয়েড)", "প্রতিদিনের ভোকাবুলারি, ফ্ল্যাশকার্ড আর স্পিকিং প্রম্পট — যেকোনো জায়গায় প্র্যাকটিস করুন।"],
      course: "IELTS ও স্পোকেন ইংলিশ — অনলাইন লাইভ ক্লাস",
      courseMode: "অনলাইন লাইভ",
      audience: ["IELTS পরীক্ষার্থী (একাডেমিক ও জেনারেল)", "বিদেশে পড়তে যেতে চান এমন শিক্ষার্থী", "স্পোকেন ইংলিশ দরকার এমন চাকরিপ্রার্থী", "ইংরেজিতে আত্মবিশ্বাস বাড়াতে চান এমন যে কেউ"],
    },
  },
];

const KHOOZO_PRODUCTS_I18N = {
  en: {
    "navbar.products": "Digital Products",
    "dp.eyebrow": "Khoozo Digital Products",
    "dp.h": "Learn at your own pace — guides, apps and courses",
    "dp.p": "Download practical PDF guides and a mobile practice app, or take the combo with a live course. Pay with bKash or card.",
    "dp.pdfs": "{n} PDF guides", "dp.app": "Mobile app", "dp.courseopt": "Optional live course",
    "dp.from": "From", "dp.view": "View details", "dp.back": "All digital products",
    "dp.inside": "What's inside", "dp.pdfs.h": "PDF guides", "dp.app.h": "Mobile app",
    "dp.course.h": "Add the live course", "dp.course.p": "Take the combo and join live online classes with an instructor, recordings and a certificate.",
    "dp.course.link": "See the full course curriculum",
    "dp.weeks": "weeks", "dp.hours": "hours of live classes", "dp.cert": "Certificate on completion",
    "dp.for": "Who it's for", "dp.how": "How you'll receive it",
    "dp.how1": "Choose the pack or the combo and pay with bKash or card.",
    "dp.how2": "We confirm your payment, usually within 1 hour.",
    "dp.how3": "You get the PDF download links and the app on WhatsApp and email. Combo buyers also get the class schedule.",
    "dp.plan": "Choose your package",
    "dp.pack": "Digital pack", "dp.pack.sub": "PDF guides + mobile app",
    "dp.combo": "Combo with live course", "dp.combo.sub": "PDF guides + mobile app + live course",
    "dp.best": "Best value", "dp.save": "Save {amount}",
    "dp.buy": "Buy now", "dp.paywith": "Pay with bKash or card", "dp.onetime": "One-time payment · lifetime access to the files",
    "dp.more": "More digital products", "dp.notfound": "Product not found",
    "cart.addtocart": "Add to Cart", "cart.qty": "Qty",
  },
  bn: {
    "navbar.products": "ডিজিটাল পণ্য",
    "dp.eyebrow": "খুঁজো ডিজিটাল পণ্য",
    "dp.h": "নিজের গতিতে শিখুন — গাইড, অ্যাপ ও কোর্স",
    "dp.p": "ব্যবহারিক PDF গাইড আর মোবাইল প্র্যাকটিস অ্যাপ ডাউনলোড করুন, অথবা লাইভ কোর্সসহ কম্বো নিন। বিকাশ বা কার্ডে পেমেন্ট।",
    "dp.pdfs": "{n}টি PDF গাইড", "dp.app": "মোবাইল অ্যাপ", "dp.courseopt": "চাইলে লাইভ কোর্স",
    "dp.from": "শুরু", "dp.view": "বিস্তারিত দেখুন", "dp.back": "সব ডিজিটাল পণ্য",
    "dp.inside": "যা পাচ্ছেন", "dp.pdfs.h": "PDF গাইড", "dp.app.h": "মোবাইল অ্যাপ",
    "dp.course.h": "লাইভ কোর্স যোগ করুন", "dp.course.p": "কম্বো নিন আর ইনস্ট্রাক্টরের সাথে অনলাইন লাইভ ক্লাসে যোগ দিন — রেকর্ডিং ও সার্টিফিকেটসহ।",
    "dp.course.link": "কোর্সের পূর্ণ কারিকুলাম দেখুন",
    "dp.weeks": "সপ্তাহ", "dp.hours": "ঘণ্টা লাইভ ক্লাস", "dp.cert": "কোর্স শেষে সার্টিফিকেট",
    "dp.for": "কাদের জন্য", "dp.how": "যেভাবে পাবেন",
    "dp.how1": "প্যাক বা কম্বো বেছে নিয়ে বিকাশ বা কার্ডে পেমেন্ট করুন।",
    "dp.how2": "আমরা পেমেন্ট নিশ্চিত করব, সাধারণত ১ ঘণ্টার মধ্যে।",
    "dp.how3": "হোয়াটসঅ্যাপ ও ইমেইলে PDF ডাউনলোড লিংক ও অ্যাপ পাবেন। কম্বো নিলে ক্লাসের সময়সূচিও পাবেন।",
    "dp.plan": "প্যাকেজ বেছে নিন",
    "dp.pack": "ডিজিটাল প্যাক", "dp.pack.sub": "PDF গাইড + মোবাইল অ্যাপ",
    "dp.combo": "লাইভ কোর্সসহ কম্বো", "dp.combo.sub": "PDF গাইড + মোবাইল অ্যাপ + লাইভ কোর্স",
    "dp.best": "সেরা ভ্যালু", "dp.save": "{amount} সাশ্রয়",
    "dp.buy": "এখনই কিনুন", "dp.paywith": "বিকাশ বা কার্ডে পেমেন্ট", "dp.onetime": "এককালীন পেমেন্ট · ফাইলগুলো আজীবন আপনার",
    "dp.more": "আরও ডিজিটাল পণ্য", "dp.notfound": "পণ্যটি পাওয়া যায়নি",
    "cart.addtocart": "কার্টে যোগ করুন", "cart.qty": "পরিমাণ",
  },
};

if (typeof KHOOZO_I18N_DICT !== "undefined") {
  Object.assign(KHOOZO_I18N_DICT.en, KHOOZO_PRODUCTS_I18N.en);
  Object.assign(KHOOZO_I18N_DICT.bn, KHOOZO_PRODUCTS_I18N.bn);
}

(function () {
  const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
  const lang = () => (document.documentElement.getAttribute("lang") === "bn" ? "bn" : "en");
  const t = (key, vars) => {
    let s = (KHOOZO_PRODUCTS_I18N[lang()] || {})[key] ?? KHOOZO_PRODUCTS_I18N.en[key] ?? key;
    if (vars) Object.keys(vars).forEach((k) => (s = s.replace(`{${k}}`, vars[k])));
    return s;
  };
  const digits = (s) => (lang() === "bn" ? String(s).replace(/\d/g, (d) => BN_DIGITS[d]) : String(s));
  const taka = (n) => "৳" + digits(Number(n).toLocaleString("en-IN"));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const params = new URLSearchParams(location.search);
  const product = (id) => KHOOZO_PRODUCTS.find((p) => p.id === id);
  const grad = (p) => `--dp1:${p.colors[0]};--dp2:${p.colors[1]}`;
  const offPct = (o) => Math.round((1 - o.price / o.originalPrice) * 100);

  function card(p) {
    const k = p[lang()];
    return `
      <a class="dp-card" href="product.html?id=${p.id}" style="${grad(p)}">
        <div class="dp-card-head">
          <span class="dp-card-icon"><i class="${p.icon}" aria-hidden="true"></i></span>
          <span class="dp-card-off">${digits(offPct(p.pack))}% ${lang() === "bn" ? "ছাড়" : "off"}</span>
          <h3>${esc(k.title)}</h3>
        </div>
        <div class="dp-card-body">
          <p>${esc(k.tagline)}</p>
          <ul class="dp-card-facts">
            <li><i class="fa-solid fa-file-pdf" aria-hidden="true"></i>${t("dp.pdfs", { n: digits(k.pdfs.length) })}</li>
            <li><i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>${t("dp.app")}</li>
            <li><i class="fa-solid fa-chalkboard-user" aria-hidden="true"></i>${t("dp.courseopt")}</li>
          </ul>
          <div class="dp-card-foot">
            <div><small>${t("dp.from")}</small><b>${taka(p.pack.price)}</b><s>${taka(p.pack.originalPrice)}</s></div>
            <div class="dp-card-actions">
              <button type="button" class="dp-add-btn" data-add-to-cart="${p.id}" data-cart-plan="pack" title="${t("cart.addtocart")}" aria-label="${t("cart.addtocart")}"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i></button>
              <span class="tr-link">${t("dp.view")} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
            </div>
          </div>
        </div>
      </a>`;
  }

  /* ---------------- index.html#products ---------------- */
  function renderGrid() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = KHOOZO_PRODUCTS.map(card).join("");
    if (window.KhoozoCart) window.KhoozoCart.wireAddButtons(grid);
  }

  /* ---------------- product.html ---------------- */
  let plan = params.get("plan") === "combo" ? "combo" : "pack";

  function renderProduct() {
    const root = document.getElementById("productRoot");
    if (!root) return;
    const p = product(params.get("id"));
    if (!p) {
      document.title = `${t("dp.notfound")} | Khoozo`;
      root.innerHTML = `<section class="section"><div class="container" style="text-align:center"><h1>${t("dp.notfound")}</h1><p style="margin:16px 0 24px"><a class="btn btn-primary" href="index.html#products">${t("dp.back")}</a></p></div></section>`;
      return;
    }
    const k = p[lang()];
    const course = typeof KHOOZO_COURSES !== "undefined" && p.courseId ? KHOOZO_COURSES.find((c) => c.id === p.courseId) : null;
    // Combo saving against buying the pack and the course separately; only shown when the course is also sold on its own.
    const save = course ? p.pack.price + course.price - p.combo.price : 0;
    document.title = `${k.title} | Khoozo Digital Products`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", k.tagline);

    const option = (id, title, sub, o, extra) => `
      <button type="button" class="dp-plan${plan === id ? " is-active" : ""}" data-plan="${id}" role="radio" aria-checked="${plan === id}">
        <span class="radio"></span>
        <span class="dp-plan-text"><b>${title}</b><small>${sub}</small>${extra || ""}</span>
        <span class="dp-plan-price"><b>${taka(o.price)}</b><s>${taka(o.originalPrice)}</s></span>
      </button>`;
    const chosen = p[plan];

    root.innerHTML = `
    <section class="tr-hero dp-hero" style="${grad(p)}">
      <div class="container">
        <a class="tr-back" href="index.html#products"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ${t("dp.back")}</a>
        <div class="dp-hero-head">
          <span class="dp-hero-icon"><i class="${p.icon}" aria-hidden="true"></i></span>
          <div><p class="eyebrow">${t("dp.eyebrow")}</p><h1>${esc(k.title)}</h1></div>
        </div>
        <p>${esc(k.desc)}</p>
        <div class="tr-meta">
          <span><i class="fa-solid fa-file-pdf" aria-hidden="true"></i>${t("dp.pdfs", { n: digits(k.pdfs.length) })}</span>
          <span><i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>${t("dp.app")}</span>
          <span><i class="fa-solid fa-chalkboard-user" aria-hidden="true"></i>${t("dp.courseopt")}</span>
        </div>
      </div>
    </section>
    <section class="section" style="padding-top:48px">
      <div class="container tr-layout dp-layout">
        <div>
          <div class="tr-panel">
            <h2>${t("dp.inside")}</h2>
            <h3 class="dp-sub"><i class="fa-solid fa-file-pdf" aria-hidden="true"></i> ${t("dp.pdfs.h")}</h3>
            <ul class="tr-checks">${k.pdfs.map((x) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i>${esc(x)}</li>`).join("")}</ul>
            <h3 class="dp-sub"><i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i> ${t("dp.app.h")}</h3>
            <div class="dp-app" style="${grad(p)}">
              <span class="dp-app-icon"><i class="${p.icon}" aria-hidden="true"></i></span>
              <div><b>${esc(k.app[0])}</b><p>${esc(k.app[1])}</p></div>
            </div>
          </div>
          <div class="tr-panel">
            <h2>${t("dp.course.h")}</h2>
            <p class="dp-muted">${t("dp.course.p")}</p>
            <div class="dp-course">
              <b>${esc(k.course)}</b>
              <div class="tr-chips">
                <span class="tr-chip"><i class="fa-regular fa-clock" aria-hidden="true"></i> ${digits(p.course.weeks)} ${t("dp.weeks")}</span>
                <span class="tr-chip"><i class="fa-solid fa-video" aria-hidden="true"></i> ${digits(p.course.hours)} ${t("dp.hours")}</span>
                <span class="tr-chip"><i class="fa-solid fa-laptop" aria-hidden="true"></i> ${esc(k.courseMode)}</span>
                <span class="tr-chip"><i class="fa-solid fa-certificate" aria-hidden="true"></i> ${t("dp.cert")}</span>
              </div>
              ${course ? `<a class="tr-link" href="course.html?id=${course.id}">${t("dp.course.link")} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>` : ""}
            </div>
          </div>
          <div class="tr-panel">
            <h2>${t("dp.for")}</h2>
            <ul class="tr-checks">${k.audience.map((x) => `<li><i class="fa-solid fa-user-check" aria-hidden="true"></i>${esc(x)}</li>`).join("")}</ul>
          </div>
          <div class="tr-panel">
            <h2>${t("dp.how")}</h2>
            <ol class="dp-steps">${["dp.how1", "dp.how2", "dp.how3"].map((s, i) => `<li><span>${digits(i + 1)}</span>${t(s)}</li>`).join("")}</ol>
          </div>
        </div>
        <aside class="tr-panel tr-buy dp-buy">
          <div class="tr-buy-top">
            <h3 class="dp-buy-h">${t("dp.plan")}</h3>
            <div class="dp-plans" role="radiogroup">
              ${option("pack", t("dp.pack"), t("dp.pack.sub"), p.pack)}
              ${option("combo", t("dp.combo"), t("dp.combo.sub"), p.combo, `<em class="dp-best">${t("dp.best")}${save > 0 ? " · " + t("dp.save", { amount: taka(save) }) : ""}</em>`)}
            </div>
            <div class="tr-buy-price">
              <span class="tr-price">${taka(chosen.price)}</span>
              <span class="tr-price-old" style="margin:0 0 6px">${taka(chosen.originalPrice)}</span>
              <span class="tr-off">${digits(offPct(chosen))}% ${lang() === "bn" ? "ছাড়" : "off"}</span>
            </div>
            <p class="tr-note">${t("dp.onetime")}</p>
            <div class="dp-qty">
              <span>${t("cart.qty")}</span>
              <div class="dp-qty-stepper">
                <button type="button" data-qty="dec" aria-label="Decrease quantity">−</button>
                <span id="dpQty">${digits(1)}</span>
                <button type="button" data-qty="inc" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <div class="dp-buy-actions">
              <a class="btn btn-primary" href="pay.html?product=${p.id}&plan=${plan}"><i class="fa-solid fa-bolt" aria-hidden="true"></i> ${t("dp.buy")}</a>
              <button type="button" class="btn btn-outline" data-add-to-cart="${p.id}" data-cart-plan="${plan}" data-qty-input="dpQty"><span class="add-label"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i> ${t("cart.addtocart")}</span></button>
            </div>
            <p class="tr-secure"><i class="fa-solid fa-shield-halved" aria-hidden="true"></i> ${t("dp.paywith")}</p>
            <div class="tr-pay-logos"><span style="color:#e2136e">bKash</span><span style="color:#ec1c24">Nagad</span><span style="color:#1a1f71">VISA</span><span style="color:#eb001b">Mastercard</span></div>
          </div>
        </aside>
      </div>
    </section>
    <section class="section section-tint">
      <div class="container">
        <h2 class="dp-more-h">${t("dp.more")}</h2>
        <div class="dp-grid">${KHOOZO_PRODUCTS.filter((x) => x.id !== p.id).map(card).join("")}</div>
      </div>
    </section>`;

    root.querySelectorAll("[data-plan]").forEach((b) =>
      b.addEventListener("click", () => {
        plan = b.getAttribute("data-plan");
        // Keep the choice in the URL so a shared link opens on the same package.
        const url = new URL(location.href);
        url.searchParams.set("plan", plan);
        history.replaceState(null, "", url);
        renderProduct();
      }),
    );

    const qtyEl = root.querySelector("#dpQty");
    if (qtyEl) {
      let qty = 1;
      const setQty = (n) => { qty = Math.max(1, n); qtyEl.textContent = digits(qty); };
      root.querySelector('[data-qty="inc"]').addEventListener("click", () => setQty(qty + 1));
      root.querySelector('[data-qty="dec"]').addEventListener("click", () => setQty(qty - 1));
    }
    if (window.KhoozoCart) window.KhoozoCart.wireAddButtons(root);
  }

  function renderAll() {
    renderGrid();
    renderProduct();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAll();
    new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  });
})();
