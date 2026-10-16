/* ================================================================
   Khoozo — js/i18n.js
   Minimal EN/BN localization. No build step: elements marked with
   data-i18n="key" get their text swapped from DICT[lang][key] on
   toggle. Falls back to the English markup already in the HTML if
   a key is missing, so the page is never blank.
   ================================================================ */
"use strict";

const KHOOZO_I18N_DICT = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.it": "Khoozo IT",
    "nav.realestate": "Khoozo Real Estate",
    "nav.visa": "Khoozo Visa Solutions",
    "nav.travel": "Khoozo Travel & Holiday",
    "nav.contact": "Contact",
    "brand.tagline": "For Your Each Solution",

    "hero.eyebrow": "Dhaka, Bangladesh · Four Divisions, One Brand",
    "hero.h1": "Khoozo, For Your",
    "hero.lede": "Whatever you need next — a product built, a property found, a visa processed, or a holiday planned — Khoozo brings the same discipline and a single accountable team to every solution.",
    "hero.cta1": "Explore Our Divisions",
    "hero.cta2": "Get In Touch",
    "hero.stat1": "Solution Divisions",
    "hero.stat2": "Projects Delivered",
    "hero.stat3": "Client Satisfaction",
    "hero.hublabel": "For Your Each Solution",
    "hero.node.it": "Khoozo IT",
    "hero.node.travel": "Travel & Holiday",
    "hero.node.visa": "Visa Solutions",
    "hero.node.realestate": "Real Estate",

    "app.eyebrow": "From Khoozo IT",
    "app.h2": "Meet the Khoozo app",
    "app.p": "Before you explore our four divisions, say hello to our own product: a neighbourhood task & service marketplace app, built and run by Khoozo IT. One account to post a task, offer help, or sell in the Online Shop.",
    "app.getiton": "Get it on",
    "app.googleplay": "Google Play",
    "app.note": "Launching soon on the Play Store — the link above will go live with our first public release.",

    "about.eyebrow": "About Khoozo",
    "about.h2": "One brand. Four solutions, run with the same discipline.",
    "about.p1": "Khoozo started as a software team and grew into four divisions — IT, Real Estate, Visa Solutions, and Travel & Holiday — because the same question kept coming up: why does a software sprint get a clearer plan than a property investment or a visa application?",
    "about.p2": "So every division works the same way: a documented scope, an honest timeline, and a single accountable contact from first consultation to delivery — whichever solution you came for.",
    "about.cta": "Talk to Us",
    "about.mission.title": "Our Mission",
    "about.mission.body": "To deliver honest, tech-enabled solutions across IT, real estate, visas, and travel — replacing guesswork with clear guidance at every step.",
    "about.vision.title": "Our Vision",
    "about.vision.body": "To be the first call for anyone building a business, a career abroad, a home, or a holiday — for your each solution.",
    "about.commitment.title": "Our Commitment",
    "about.commitment.body": "100% transparent pricing, documented timelines, and a direct line to a real specialist — never a call centre, never a black box.",

    "it.eyebrow": "Khoozo IT",
    "it.h2": "Software, built and shipped with engineering discipline",
    "it.p": "From marketing sites to full platforms — the same team that runs Khoozo's other divisions builds the software behind them.",
    "it.card1.title": "Website Development",
    "it.card1.body": "Fast, modern, SEO-ready websites — from marketing sites to full web applications.",
    "it.card2.title": "Mobile App Development",
    "it.card2.body": "Cross-platform Android & iOS apps built with Flutter, shipped to both app stores.",
    "it.card3.title": "Custom Software",
    "it.card3.body": "Bespoke business systems — inventory, CRM, automation — built around your workflow.",

    "realestate.eyebrow": "Khoozo Real Estate",
    "realestate.h2": "Property decisions, handled with full transparency",
    "realestate.p": "Land share, apartment buying, and advisory for builders — see our live portfolio further down this page.",
    "realestate.card1.title": "Land Share Project",
    "realestate.card1.body": "Vetted joint land-development opportunities with transparent ownership share.",
    "realestate.card2.title": "Apartment Consultancy",
    "realestate.card2.body": "End-to-end apartment buying guidance — legal check, pricing, and negotiation.",
    "realestate.card3.title": "Builders Consultancy",
    "realestate.card3.body": "Advisory for builders and developers on planning, compliance and sales strategy.",
    "realestate.cta": "See our property portfolio",

    "visa.eyebrow": "Khoozo Visa Solutions",
    "visa.h2": "Study-abroad visas, handled start to finish",
    "visa.p": "Application, documentation, and interview preparation — explained in advance, every step of the way.",
    "visa.card1.title": "Student Visa",
    "visa.card1.body": "Application, documentation and interview preparation for study-abroad visas.",
    "visa.card2.title": "University Admission",
    "visa.card2.body": "University shortlisting, application support and scholarship guidance overseas.",
    "visa.card3.title": "Visa Documentation",
    "visa.card3.body": "Document checklists, embassy forms and interview coaching, reviewed by a specialist.",

    "travel.eyebrow": "Khoozo Travel & Holiday",
    "travel.h2": "Trips planned end-to-end, not just booked",
    "travel.p": "Best-fare tickets and custom holiday packages, with 24/7 support before and during your trip.",
    "travel.card1.title": "Air Ticket",
    "travel.card1.body": "Best-fare domestic & international air ticketing with 24/7 booking support.",
    "travel.card2.title": "Tour Package",
    "travel.card2.body": "Custom holiday & group tour packages — visa, hotel and itinerary handled end-to-end.",
    "travel.card3.title": "Holiday Planning",
    "travel.card3.body": "Hotel booking, itinerary design and on-trip support for family and group holidays.",

    "contact.eyebrow": "Get In Touch",
    "contact.h2": "Let's start with a free consultation",
    "contact.p": "Tell us what you're planning — a product, a trip, a visa, or an investment — and a specialist will respond within one business day.",
    "contact.phone.label": "Phone",
    "contact.email.label": "Email",
    "contact.website.label": "Website",
    "contact.office.label": "Office",
    "contact.office.value": "Dhaka, Bangladesh",
    "contact.form.name": "Your name",
    "contact.form.email": "Email address",
    "contact.form.phone": "Phone number (optional)",
    "contact.form.service": "I'm interested in…",
    "contact.form.message": "Your message",
    "contact.form.submit": "Send Message",

    "footer.tagline": "Khoozo — For Your Each Solution. Four divisions, one accountable team: IT, Real Estate, Visa Solutions, and Travel & Holiday.",
    "footer.quicklinks": "Quick Links",
    "footer.solutions": "Our Solutions",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "footer.ourteam": "Our Team",
    "footer.ourteamfounder": "Our Team & Founder",
    "footer.testimonials": "Testimonials",
    "footer.getapp": "Get the App",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "© 2026 Khoozo. All rights reserved.",
    "footer.backtotop": "Back to top",
    "footer.language": "Language",
  },
  bn: {
    "nav.home": "হোম",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.it": "খুঁজো আইটি",
    "nav.realestate": "খুঁজো রিয়েল এস্টেট",
    "nav.visa": "খুঁজো ভিসা সলিউশন",
    "nav.travel": "খুঁজো ট্রাভেল অ্যান্ড হলিডে",
    "nav.contact": "যোগাযোগ",
    "brand.tagline": "আপনার প্রতিটি সমাধানের জন্য",

    "hero.eyebrow": "ঢাকা, বাংলাদেশ · চারটি বিভাগ, একটি ব্র্যান্ড",
    "hero.h1": "খুঁজো, আপনার",
    "hero.lede": "পরবর্তী প্রয়োজন যাই হোক না কেন — একটি প্রোডাক্ট তৈরি, একটি সম্পত্তি খোঁজা, একটি ভিসা প্রসেস করা, বা একটি ছুটি পরিকল্পনা — খুঁজো প্রতিটি সমাধানে একই নিষ্ঠা এবং একটি দায়বদ্ধ টিম নিয়ে আসে।",
    "hero.cta1": "আমাদের বিভাগসমূহ দেখুন",
    "hero.cta2": "যোগাযোগ করুন",
    "hero.stat1": "সমাধান বিভাগ",
    "hero.stat2": "সম্পন্ন প্রজেক্ট",
    "hero.stat3": "ক্লায়েন্ট সন্তুষ্টি",
    "hero.hublabel": "আপনার প্রতিটি সমাধানের জন্য",
    "hero.node.it": "খুঁজো আইটি",
    "hero.node.travel": "ট্রাভেল অ্যান্ড হলিডে",
    "hero.node.visa": "ভিসা সলিউশন",
    "hero.node.realestate": "রিয়েল এস্টেট",

    "app.eyebrow": "খুঁজো আইটি থেকে",
    "app.h2": "খুঁজো অ্যাপের সাথে পরিচিত হোন",
    "app.p": "আমাদের চারটি বিভাগ দেখার আগে, আমাদের নিজস্ব প্রোডাক্টের সাথে পরিচিত হোন — খুঁজো আইটি দ্বারা তৈরি ও পরিচালিত একটি প্রতিবেশী-ভিত্তিক টাস্ক ও সার্ভিস মার্কেটপ্লেস অ্যাপ। একটি অ্যাকাউন্ট দিয়ে টাস্ক পোস্ট করুন, সাহায্য অফার করুন, অথবা অনলাইন শপে বিক্রি করুন।",
    "app.getiton": "পাওয়া যাচ্ছে",
    "app.googleplay": "গুগল প্লে",
    "app.note": "প্লে স্টোরে শীঘ্রই আসছে — আমাদের প্রথম পাবলিক রিলিজের সাথে উপরের লিংকটি সক্রিয় হবে।",

    "about.eyebrow": "খুঁজো সম্পর্কে",
    "about.h2": "একটি ব্র্যান্ড। একই নিষ্ঠায় পরিচালিত চারটি সমাধান।",
    "about.p1": "খুঁজো একটি সফটওয়্যার টিম হিসেবে শুরু হয়ে চারটি বিভাগে পরিণত হয়েছে — আইটি, রিয়েল এস্টেট, ভিসা সলিউশন এবং ট্রাভেল অ্যান্ড হলিডে — কারণ একই প্রশ্ন বারবার উঠে আসত: কেন একটি সফটওয়্যার প্রজেক্টের পরিকল্পনা একটি সম্পত্তি বিনিয়োগ বা ভিসা আবেদনের চেয়ে স্পষ্ট হবে?",
    "about.p2": "তাই প্রতিটি বিভাগ একই নিয়মে কাজ করে: একটি লিখিত স্কোপ, সৎ সময়সীমা, এবং প্রথম পরামর্শ থেকে ডেলিভারি পর্যন্ত একজন দায়বদ্ধ যোগাযোগকারী — আপনি যে সমাধানের জন্যই এসেছেন না কেন।",
    "about.cta": "আমাদের সাথে কথা বলুন",
    "about.mission.title": "আমাদের লক্ষ্য",
    "about.mission.body": "আইটি, রিয়েল এস্টেট, ভিসা এবং ভ্রমণ জুড়ে সৎ ও প্রযুক্তি-নির্ভর সমাধান প্রদান করা — প্রতিটি ধাপে অনুমানের জায়গায় স্পষ্ট দিকনির্দেশনা দেওয়া।",
    "about.vision.title": "আমাদের ভিশন",
    "about.vision.body": "যে কেউ ব্যবসা গড়তে, বিদেশে ক্যারিয়ার গড়তে, বাড়ি কিনতে, বা ছুটি কাটাতে চান — তাদের প্রথম যোগাযোগ হতে চাই — আপনার প্রতিটি সমাধানের জন্য।",
    "about.commitment.title": "আমাদের অঙ্গীকার",
    "about.commitment.body": "১০০% স্বচ্ছ মূল্য, লিখিত সময়সীমা, এবং একজন প্রকৃত বিশেষজ্ঞের সরাসরি যোগাযোগ — কখনো কল সেন্টার নয়, কখনো অস্পষ্টতা নয়।",

    "it.eyebrow": "খুঁজো আইটি",
    "it.h2": "প্রকৌশলগত নিষ্ঠার সাথে তৈরি ও ডেলিভার করা সফটওয়্যার",
    "it.p": "মার্কেটিং ওয়েবসাইট থেকে শুরু করে পূর্ণাঙ্গ প্ল্যাটফর্ম পর্যন্ত — যে টিম খুঁজোর অন্যান্য বিভাগ পরিচালনা করে, তারাই এর পেছনের সফটওয়্যার তৈরি করে।",
    "it.card1.title": "ওয়েবসাইট ডেভেলপমেন্ট",
    "it.card1.body": "দ্রুত, আধুনিক, SEO-প্রস্তুত ওয়েবসাইট — মার্কেটিং সাইট থেকে পূর্ণাঙ্গ ওয়েব অ্যাপ্লিকেশন পর্যন্ত।",
    "it.card2.title": "মোবাইল অ্যাপ ডেভেলপমেন্ট",
    "it.card2.body": "Flutter দিয়ে তৈরি ক্রস-প্ল্যাটফর্ম অ্যান্ড্রয়েড ও iOS অ্যাপ, উভয় অ্যাপ স্টোরে প্রকাশিত।",
    "it.card3.title": "কাস্টম সফটওয়্যার",
    "it.card3.body": "আপনার কর্মপ্রবাহ অনুযায়ী তৈরি ব্যবসায়িক সিস্টেম — ইনভেন্টরি, CRM, অটোমেশন।",

    "realestate.eyebrow": "খুঁজো রিয়েল এস্টেট",
    "realestate.h2": "সম্পূর্ণ স্বচ্ছতার সাথে সম্পত্তি সংক্রান্ত সিদ্ধান্ত",
    "realestate.p": "ল্যান্ড শেয়ার, অ্যাপার্টমেন্ট ক্রয়, এবং বিল্ডারদের পরামর্শ — এই পাতার নিচে আমাদের লাইভ পোর্টফোলিও দেখুন।",
    "realestate.card1.title": "ল্যান্ড শেয়ার প্রজেক্ট",
    "realestate.card1.body": "স্বচ্ছ মালিকানা শেয়ারসহ যাচাইকৃত যৌথ জমি-উন্নয়ন সুযোগ।",
    "realestate.card2.title": "অ্যাপার্টমেন্ট পরামর্শ",
    "realestate.card2.body": "সম্পূর্ণ অ্যাপার্টমেন্ট ক্রয় নির্দেশনা — আইনি যাচাই, মূল্য নির্ধারণ এবং দরকষাকষি।",
    "realestate.card3.title": "বিল্ডার্স কনসালটেন্সি",
    "realestate.card3.body": "পরিকল্পনা, কমপ্লায়েন্স এবং বিক্রয় কৌশলে বিল্ডার ও ডেভেলপারদের পরামর্শ।",
    "realestate.cta": "আমাদের সম্পত্তি পোর্টফোলিও দেখুন",

    "visa.eyebrow": "খুঁজো ভিসা সলিউশন",
    "visa.h2": "শুরু থেকে শেষ পর্যন্ত বিদেশে পড়াশোনার ভিসা",
    "visa.p": "আবেদন, ডকুমেন্টেশন এবং ইন্টারভিউ প্রস্তুতি — প্রতিটি ধাপ আগে থেকেই ব্যাখ্যা করা হয়।",
    "visa.card1.title": "স্টুডেন্ট ভিসা",
    "visa.card1.body": "বিদেশে পড়াশোনার ভিসার জন্য আবেদন, ডকুমেন্টেশন এবং ইন্টারভিউ প্রস্তুতি।",
    "visa.card2.title": "বিশ্ববিদ্যালয়ে ভর্তি",
    "visa.card2.body": "বিশ্ববিদ্যালয় বাছাই, আবেদন সহায়তা এবং বিদেশে স্কলারশিপের নির্দেশনা।",
    "visa.card3.title": "ভিসা ডকুমেন্টেশন",
    "visa.card3.body": "ডকুমেন্ট চেকলিস্ট, দূতাবাসের ফর্ম এবং একজন বিশেষজ্ঞের ইন্টারভিউ কোচিং।",

    "travel.eyebrow": "খুঁজো ট্রাভেল অ্যান্ড হলিডে",
    "travel.h2": "শুধু বুকিং নয়, সম্পূর্ণ পরিকল্পিত ভ্রমণ",
    "travel.p": "সেরা মূল্যের টিকিট এবং কাস্টম হলিডে প্যাকেজ, ভ্রমণের আগে ও সময়ে ২৪/৭ সহায়তাসহ।",
    "travel.card1.title": "এয়ার টিকিট",
    "travel.card1.body": "২৪/৭ বুকিং সহায়তাসহ সেরা মূল্যের দেশীয় ও আন্তর্জাতিক এয়ার টিকিট।",
    "travel.card2.title": "ট্যুর প্যাকেজ",
    "travel.card2.body": "কাস্টম হলিডে ও গ্রুপ ট্যুর প্যাকেজ — ভিসা, হোটেল এবং ভ্রমণসূচি সম্পূর্ণভাবে পরিচালিত।",
    "travel.card3.title": "হলিডে প্ল্যানিং",
    "travel.card3.body": "পারিবারিক ও গ্রুপ ছুটির জন্য হোটেল বুকিং, ভ্রমণসূচি তৈরি এবং ভ্রমণকালীন সহায়তা।",

    "contact.eyebrow": "যোগাযোগ করুন",
    "contact.h2": "একটি ফ্রি পরামর্শ দিয়ে শুরু করা যাক",
    "contact.p": "আপনি কী পরিকল্পনা করছেন বলুন — একটি প্রোডাক্ট, একটি ভ্রমণ, একটি ভিসা, বা একটি বিনিয়োগ — একজন বিশেষজ্ঞ এক কর্মদিবসের মধ্যে সাড়া দেবেন।",
    "contact.phone.label": "ফোন",
    "contact.email.label": "ইমেইল",
    "contact.website.label": "ওয়েবসাইট",
    "contact.office.label": "অফিস",
    "contact.office.value": "ঢাকা, বাংলাদেশ",
    "contact.form.name": "আপনার নাম",
    "contact.form.email": "ইমেইল ঠিকানা",
    "contact.form.phone": "ফোন নম্বর (ঐচ্ছিক)",
    "contact.form.service": "আমি আগ্রহী…",
    "contact.form.message": "আপনার বার্তা",
    "contact.form.submit": "বার্তা পাঠান",

    "footer.tagline": "খুঁজো — আপনার প্রতিটি সমাধানের জন্য। চারটি বিভাগ, একটি দায়বদ্ধ টিম: আইটি, রিয়েল এস্টেট, ভিসা সলিউশন এবং ট্রাভেল অ্যান্ড হলিডে।",
    "footer.quicklinks": "প্রয়োজনীয় লিংক",
    "footer.solutions": "আমাদের সমাধান",
    "footer.company": "কোম্পানি",
    "footer.contact": "যোগাযোগ",
    "footer.ourteam": "আমাদের টিম",
    "footer.ourteamfounder": "আমাদের টিম ও প্রতিষ্ঠাতা",
    "footer.testimonials": "প্রশংসাপত্র",
    "footer.getapp": "অ্যাপ নিন",
    "footer.terms": "সেবার শর্তাবলী",
    "footer.privacy": "গোপনীয়তা নীতি",
    "footer.rights": "© ২০২৬ খুঁজো। সর্বস্বত্ব সংরক্ষিত।",
    "footer.backtotop": "উপরে ফিরুন",
    "footer.language": "ভাষা",
  }
};

(function () {
  const KEY = "khoozo-lang";

  function translate(lang) {
    const dict = KHOOZO_I18N_DICT[lang] || KHOOZO_I18N_DICT.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });

    // Hero typing-text words rotate through a localized list too.
    const typingEl = document.getElementById("typingText");
    if (typingEl) {
      const words = lang === "bn"
        ? "আইটি সলিউশন,রিয়েল এস্টেট,ভিসা সলিউশন,ট্রাভেল অ্যান্ড হলিডে"
        : "IT Solutions,Real Estate,Visa Solutions,Travel & Holiday";
      typingEl.setAttribute("data-words", words);
      typingEl.textContent = words.split(",")[0];
      if (window.khoozoRestartTyping) window.khoozoRestartTyping();
    }

    document.documentElement.setAttribute("lang", lang === "bn" ? "bn" : "en");
    document.documentElement.classList.toggle("lang-bn", lang === "bn");
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang-btn") === lang);
    });
  }

  function applyLang(lang) {
    translate(lang);
    localStorage.setItem(KEY, lang);
  }
  window.khoozoApplyLang = applyLang;

  document.addEventListener("DOMContentLoaded", function () {
    const saved = localStorage.getItem(KEY) === "bn" ? "bn" : "en";
    translate(saved);
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang-btn"));
      });
    });
  });
})();
