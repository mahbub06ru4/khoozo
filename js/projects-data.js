/* ================================================================
   Khoozo — js/projects-data.js
   Data for the shareable detail pages:
     project.html?id=<IT project id>    (KHOOZO_IT_PROJECTS)
     property.html?id=<property id>     (KHOOZO_PROPERTIES)
   Loaded by js/detail.js. To add a page, add an entry here and a card
   on index.html that links to it — no other code changes needed.
   ================================================================ */
"use strict";

/* IT project text lives in KHOOZO_I18N_DICT (js/i18n.js) so the page
   renders in the current language; titleKey/descKey double as the
   English fallback. Screenshots come from assets/it/gallery.js, keyed
   by project id (or by `gallery` when the folder name differs). */
const KHOOZO_IT_PROJECTS = {
  dokanbondhu: {
    icon: "fa-solid fa-cash-register",
    titleKey: "it.proj.dokanbondhu.title",
    descKey: "it.proj.dokanbondhu.modal.desc",
    cardKey: "it.proj.dokanbondhu.card.desc",
    tech: ["Laravel 13", "Livewire", "MySQL", "Flutter App", "SQLite (offline)"],
    featureKeys: [
      "it.proj.dokanbondhu.f1",
      "it.proj.dokanbondhu.f2",
      "it.proj.dokanbondhu.f3",
      "it.proj.dokanbondhu.f4",
      "it.proj.dokanbondhu.f5",
      "it.proj.dokanbondhu.f6",
      "it.proj.dokanbondhu.f7",
      "it.proj.dokanbondhu.f8"
    ]
  },
  "khoozo-ota": {
    icon: "fa-solid fa-plane-departure",
    titleKey: "it.proj.khoozo-ota.title",
    descKey: "it.proj.khoozo-ota.modal.desc",
    cardKey: "it.proj.khoozo-ota.card.desc",
    tech: ["NestJS", "PostgreSQL", "Flutter App"],
    web: true,
    featureKeys: [
      "it.proj.khoozo-ota.f1",
      "it.proj.khoozo-ota.f2",
      "it.proj.khoozo-ota.f3",
      "it.proj.khoozo-ota.f4",
      "it.proj.khoozo-ota.f5",
      "it.proj.khoozo-ota.f6",
      "it.proj.khoozo-ota.f7"
    ]
  },
  khoozo: {
    icon: "fa-solid fa-magnifying-glass-location",
    titleKey: "it.proj.khoozo.title",
    descKey: "it.proj.khoozo.modal.desc",
    cardKey: "it.proj.khoozo.card.desc",
    tech: ["NestJS", "PostgreSQL", "Flutter App"]
  },
  dorkari: {
    icon: "fa-solid fa-mosque",
    titleKey: "it.proj.dorkari.title",
    descKey: "it.proj.dorkari.desc",
    tech: ["NestJS", "PostgreSQL", "Flutter App"]
  },
  office: {
    icon: "fa-solid fa-building",
    titleKey: "it.proj.office.title",
    descKey: "it.proj.office.desc",
    tech: ["NestJS", "PostgreSQL", "Flutter App"]
  },
  "realestate-saas": {
    icon: "fa-solid fa-city",
    titleKey: "it.proj.realestate-saas.title",
    descKey: "it.proj.realestate-saas.desc",
    tech: ["NestJS", "PostgreSQL", "Flutter App"]
  },
  "travel-saas": {
    icon: "fa-solid fa-plane",
    titleKey: "it.proj.travel-saas.title",
    descKey: "it.proj.travel-saas.desc",
    tech: ["NestJS", "PostgreSQL", "Flutter App"]
  },
  fintrack: {
    icon: "fa-solid fa-sack-dollar",
    titleKey: "it.proj.fintrack.title",
    descKey: "it.proj.fintrack.desc",
    tech: ["NestJS", "PostgreSQL", "Flutter App"]
  },
  "multivendor-ecommerce": {
    icon: "fa-solid fa-cart-shopping",
    titleKey: "it.proj.multivendor-ecommerce.title",
    descKey: "it.proj.multivendor-ecommerce.desc",
    gallery: "ecommerce",
    tech: ["NestJS", "PostgreSQL", "Flutter App"]
  }
};

/* Real estate portfolio (English copy, as on the homepage). */
const KHOOZO_PROPERTIES = {
  landshare: {
    badge: "Ongoing", badgeClass: "b-ongoing",
    title: "Premium Land Share Project",
    location: "Sector 17, Uttara, Dhaka",
    desc: "A joint land-development opportunity in one of Uttara's most connected sectors — planned for modern residential use with transparent share ownership and full legal documentation.",
    specs: [["Location", "Sector 17, Uttara"], ["Project Type", "Land Share / Residential"], ["Status", "Ongoing — Booking Open"], ["Investment", "Flexible share sizes"]],
    features: ["Clear land title & legal verification", "Flexible share-based ownership", "Prime Uttara location, close to major roads", "Dedicated project consultant throughout"],
    image: "assets/realestate/landshare-project.jpg"
  },
  greennest: {
    badge: "Completed", badgeClass: "b-completed",
    title: "Green Nest Residency",
    location: "Sector 11, Uttara, Dhaka",
    desc: "A 10-storey residential building with 24 modern apartments, completed and fully occupied. Delivered on schedule with premium finishes, dedicated parking, backup power and a landscaped rooftop.",
    specs: [["Type", "Residential Apartment"], ["Units", "24 Apartments"], ["Storeys", "10 Floors"], ["Completed", "2023"]],
    features: ["Premium interior finishes throughout", "Dedicated covered parking", "24/7 backup power & security", "Landscaped rooftop community space"],
    image: "assets/realestate/greennest-residency.jpg"
  },
  skyline: {
    badge: "Completed", badgeClass: "b-completed",
    title: "Skyline Commercial Plaza",
    location: "Mirpur DOHS, Dhaka",
    desc: "A mixed-use commercial complex with ground-floor retail and premium office suites above. Built to code with high-speed lifts, dedicated parking floors and round-the-clock security infrastructure.",
    specs: [["Type", "Commercial / Mixed-use"], ["Area", "42,000 sq ft"], ["Floors", "8 Levels"], ["Completed", "2022"]],
    features: ["Ground-floor retail & upper office suites", "High-speed passenger & service lifts", "Multi-level covered parking", "24/7 security & CCTV coverage"],
    image: "assets/realestate/skyline-plaza.jpg"
  },
  horizon: {
    badge: "Ongoing", badgeClass: "b-ongoing",
    title: "Horizon Heights",
    location: "Bashundhara R/A, Dhaka",
    desc: "A premium 14-storey apartment tower currently under construction. Structural work is in progress with limited early-bird bookings now open — reserve a unit at pre-launch pricing with a flexible payment plan.",
    specs: [["Type", "Residential Apartment"], ["Units", "36 Apartments"], ["Storeys", "14 Floors"], ["Handover", "Est. 2026"]],
    features: ["Early-bird pre-launch pricing", "Flexible instalment payment plans", "Modern amenities — gym & community hall", "Transparent construction milestones"],
    image: "assets/realestate/horizon-heights.jpg"
  },
  serene: {
    badge: "Handed Over", badgeClass: "b-handover",
    title: "Serene Villas",
    location: "Purbachal New Town, Dhaka",
    desc: "A gated community of 8 luxury duplex villas — fully built, keys handed over, and now home to their proud owners. All ownership documentation has been transferred and titles registered.",
    specs: [["Type", "Duplex Villas"], ["Units", "8 Villas"], ["Community", "Gated & Secured"], ["Handed Over", "2024"]],
    features: ["Private duplex layout with garden", "Gated community with controlled access", "Full title & documentation transferred", "Move-in ready, owner-occupied"],
    image: "assets/realestate/serene-villas.jpg"
  }
};
