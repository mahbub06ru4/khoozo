/* ================================================================
   Khoozo — js/training.js
   IT Training catalogue + checkout flow for a static site:
   training.html → course.html → pay.html → pay-gateway.html → pay-result.html

   Payments run in SANDBOX mode by default (simulated bKash / Nagad / card
   screens, nothing is charged). To take real payments, deploy a small backend
   that creates the payment with bKash Tokenized Checkout / Nagad / SSLCommerz
   and returns { redirectURL }, then set KHOOZO_PAY.apiBase below. Secret keys
   must never be placed in this file.
   ================================================================ */
"use strict";

const KHOOZO_PAY = {
  apiBase: "", // e.g. "https://api.khoozo.com" → POST {apiBase}/api/v1/shop/orders (khoozo_laravel)
  // Manual "Send Money" + WhatsApp confirmation — works on a static site with no backend.
  manual: {
    whatsapp: "8801818120900", // country code, no "+" or spaces
    wallets: [
      { id: "bKash", number: "01719023054", type: "Personal", color: "#e2136e" },
    ],
  },
};

const KHOOZO_COURSES = [
  {
    id: "flutter",
    image: "assets/training/flutter.jpg",
    price: 12500,
    originalPrice: 18000,
    weeks: 12,
    hours: 72,
    seats: 30,
    start: "2026-12-05",
    tools: ["Dart", "Flutter", "GetX", "Riverpod", "Dio", "Hive", "Firebase", "Android Studio", "Git"],
    en: {
      title: "Flutter App Development",
      track: "Mobile",
      tagline: "Build and publish Android & iOS apps from a single Dart codebase.",
      level: "Beginner → Job-ready",
      mode: "Hybrid (online + Dhaka)",
      outcomes: [
        "Write clean Dart with null safety",
        "Build responsive UIs, navigation and animations",
        "Manage state with GetX / Riverpod",
        "Call REST APIs with Dio and cache offline with Hive",
        "Add Firebase Auth, Firestore and push notifications",
        "Publish to Google Play and the App Store",
      ],
      modules: [
        { t: "Dart fundamentals", x: ["Variables & types", "Null safety", "OOP, mixins & generics", "Async/await & streams"] },
        { t: "Flutter UI", x: ["Widget tree", "Layouts & responsive design", "Navigation & routing", "Theming & animations"] },
        { t: "State & architecture", x: ["setState → GetX / Riverpod", "Clean architecture", "Dependency injection"] },
        { t: "Data & backend", x: ["REST with Dio", "Local storage with Hive", "Firebase Auth & Firestore", "Push notifications"] },
        { t: "Shipping", x: ["Testing", "CI builds", "Play Store & App Store release", "Capstone review"] },
      ],
      includes: ["72 hours of live classes", "Class recordings", "Capstone app project", "Certificate", "Portfolio & CV review", "Lifetime community access"],
    },
    bn: {
      title: "ফ্লাটার অ্যাপ ডেভেলপমেন্ট",
      track: "মোবাইল",
      tagline: "একটি Dart কোডবেস থেকে Android ও iOS অ্যাপ বানান ও পাবলিশ করুন।",
      level: "শুরু থেকে চাকরি-উপযোগী",
      mode: "হাইব্রিড (অনলাইন + ঢাকা)",
      outcomes: [
        "নাল সেফটিসহ পরিষ্কার Dart কোড লেখা",
        "রেসপন্সিভ UI, নেভিগেশন ও অ্যানিমেশন তৈরি",
        "GetX / Riverpod দিয়ে স্টেট ম্যানেজমেন্ট",
        "Dio দিয়ে REST API ও Hive দিয়ে অফলাইন ক্যাশ",
        "Firebase Auth, Firestore ও পুশ নোটিফিকেশন",
        "Google Play ও App Store-এ অ্যাপ পাবলিশ",
      ],
      modules: [
        { t: "Dart-এর মূল বিষয়", x: ["ভেরিয়েবল ও টাইপ", "নাল সেফটি", "OOP, মিক্সিন ও জেনেরিক্স", "Async/await ও স্ট্রিম"] },
        { t: "ফ্লাটার UI", x: ["উইজেট ট্রি", "লেআউট ও রেসপন্সিভ ডিজাইন", "নেভিগেশন ও রাউটিং", "থিম ও অ্যানিমেশন"] },
        { t: "স্টেট ও আর্কিটেকচার", x: ["setState → GetX / Riverpod", "ক্লিন আর্কিটেকচার", "ডিপেন্ডেন্সি ইনজেকশন"] },
        { t: "ডেটা ও ব্যাকএন্ড", x: ["Dio দিয়ে REST", "Hive লোকাল স্টোরেজ", "Firebase Auth ও Firestore", "পুশ নোটিফিকেশন"] },
        { t: "অ্যাপ রিলিজ", x: ["টেস্টিং", "CI বিল্ড", "Play Store ও App Store রিলিজ", "ক্যাপস্টোন রিভিউ"] },
      ],
      includes: ["৭২ ঘণ্টা লাইভ ক্লাস", "ক্লাস রেকর্ডিং", "ক্যাপস্টোন অ্যাপ প্রজেক্ট", "সার্টিফিকেট", "পোর্টফোলিও ও সিভি রিভিউ", "আজীবন কমিউনিটি অ্যাক্সেস"],
    },
  },
  {
    id: "web",
    image: "assets/training/web.jpg",
    price: 15000,
    originalPrice: 22000,
    weeks: 16,
    hours: 96,
    seats: 40,
    start: "2026-12-12",
    tools: ["HTML", "CSS", "Tailwind", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Docker"],
    en: {
      title: "Full-Stack Web Development",
      track: "Web",
      tagline: "From HTML to production: React, Next.js, Node.js and databases.",
      level: "Beginner → Job-ready",
      mode: "Online live",
      outcomes: [
        "Build responsive, accessible pages with HTML, CSS and Tailwind",
        "Write modern JavaScript and TypeScript",
        "Create apps with React and Next.js",
        "Design REST APIs with Node.js and PostgreSQL",
        "Add authentication and payment gateways",
        "Deploy with Docker and CI/CD",
      ],
      modules: [
        { t: "Web foundations", x: ["HTML semantics", "CSS Flexbox & Grid", "Tailwind CSS", "Git & GitHub"] },
        { t: "JavaScript & TypeScript", x: ["Modern JS", "DOM & fetch", "TypeScript types", "Tooling"] },
        { t: "React & Next.js", x: ["Components & hooks", "App Router", "Server components", "Forms & validation"] },
        { t: "Backend", x: ["Node.js REST APIs", "PostgreSQL & Prisma", "Auth & sessions", "bKash / SSLCommerz integration"] },
        { t: "Production", x: ["Testing", "Docker", "CI/CD", "Capstone deployment"] },
      ],
      includes: ["96 hours of live classes", "Class recordings", "3 portfolio projects", "Certificate", "Mock interviews", "Lifetime community access"],
    },
    bn: {
      title: "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট",
      track: "ওয়েব",
      tagline: "HTML থেকে প্রোডাকশন: React, Next.js, Node.js ও ডেটাবেস।",
      level: "শুরু থেকে চাকরি-উপযোগী",
      mode: "অনলাইন লাইভ",
      outcomes: [
        "HTML, CSS ও Tailwind দিয়ে রেসপন্সিভ পেজ তৈরি",
        "আধুনিক JavaScript ও TypeScript",
        "React ও Next.js দিয়ে অ্যাপ তৈরি",
        "Node.js ও PostgreSQL দিয়ে REST API",
        "অথেনটিকেশন ও পেমেন্ট গেটওয়ে যুক্ত করা",
        "Docker ও CI/CD দিয়ে ডিপ্লয়",
      ],
      modules: [
        { t: "ওয়েবের ভিত্তি", x: ["HTML সেমান্টিক্স", "CSS Flexbox ও Grid", "Tailwind CSS", "Git ও GitHub"] },
        { t: "JavaScript ও TypeScript", x: ["আধুনিক JS", "DOM ও fetch", "TypeScript টাইপ", "টুলিং"] },
        { t: "React ও Next.js", x: ["কম্পোনেন্ট ও হুকস", "App Router", "সার্ভার কম্পোনেন্ট", "ফর্ম ও ভ্যালিডেশন"] },
        { t: "ব্যাকএন্ড", x: ["Node.js REST API", "PostgreSQL ও Prisma", "অথ ও সেশন", "bKash / SSLCommerz ইন্টিগ্রেশন"] },
        { t: "প্রোডাকশন", x: ["টেস্টিং", "Docker", "CI/CD", "ক্যাপস্টোন ডিপ্লয়মেন্ট"] },
      ],
      includes: ["৯৬ ঘণ্টা লাইভ ক্লাস", "ক্লাস রেকর্ডিং", "৩টি পোর্টফোলিও প্রজেক্ট", "সার্টিফিকেট", "মক ইন্টারভিউ", "আজীবন কমিউনিটি অ্যাক্সেস"],
    },
  },
  {
    id: "visa",
    image: "assets/training/visa.jpg",
    price: 3000,
    originalPrice: 10000,
    weeks: 4,
    hours: 24,
    seats: 50,
    start: "2026-12-07",
    tools: ["VFS Global", "e-Visa portals", "Embassy checklists", "Appointment systems", "Document templates", "Google Workspace"],
    en: {
      title: "Visa Processing Professional",
      track: "Travel",
      tagline: "Learn to prepare, file and track tourist, business, work and student visa applications.",
      level: "Beginner",
      mode: "Online live",
      outcomes: [
        "Understand visa types, eligibility and common refusal reasons",
        "Build country-wise document checklists (Schengen, UK, USA, Canada, GCC, Asia)",
        "Fill online forms and book VFS / embassy appointments",
        "Prepare cover letters, itineraries and financial documents",
        "Handle student visas: CAS, I-20, LOA, CoE and proof of funds",
        "Run a visa desk: pricing, client handling and tracking",
      ],
      modules: [
        { t: "Visa fundamentals", x: ["Visa types & terms", "Eligibility & risk factors", "Refusal reasons", "Ethics & compliance"] },
        { t: "Documentation", x: ["Country-wise checklists", "Bank statements & solvency", "Cover letters", "Travel itineraries"] },
        { t: "Online filing", x: ["e-Visa portals", "VFS / embassy appointments", "Biometrics", "Application tracking"] },
        { t: "Student visas", x: ["UK CAS", "USA I-20 & SEVIS", "Canada LOA & PAL", "Australia CoE & GS"] },
        { t: "Running a visa desk", x: ["Service pricing", "Client communication", "Case management", "Live case practice"] },
      ],
      includes: ["24 hours of live classes", "Class recordings", "Country checklists & templates", "Live case practice", "Certificate", "Job placement support"],
    },
    bn: {
      title: "ভিসা প্রসেসিং প্রফেশনাল",
      track: "ট্রাভেল",
      tagline: "টুরিস্ট, বিজনেস, ওয়ার্ক ও স্টুডেন্ট ভিসার আবেদন তৈরি, জমা ও ট্র্যাক করা শিখুন।",
      level: "শুরু থেকে",
      mode: "অনলাইন লাইভ",
      outcomes: [
        "ভিসার ধরন, যোগ্যতা ও রিজেকশনের সাধারণ কারণ বোঝা",
        "দেশভিত্তিক ডকুমেন্ট চেকলিস্ট (শেনজেন, ইউকে, ইউএসএ, কানাডা, জিসিসি, এশিয়া)",
        "অনলাইন ফর্ম পূরণ ও VFS / দূতাবাস অ্যাপয়েন্টমেন্ট",
        "কভার লেটার, ইটিনেরারি ও আর্থিক ডকুমেন্ট তৈরি",
        "স্টুডেন্ট ভিসা: CAS, I-20, LOA, CoE ও প্রুফ অব ফান্ড",
        "ভিসা ডেস্ক পরিচালনা: মূল্য নির্ধারণ, ক্লায়েন্ট ও ট্র্যাকিং",
      ],
      modules: [
        { t: "ভিসার মৌলিক বিষয়", x: ["ভিসার ধরন ও পরিভাষা", "যোগ্যতা ও ঝুঁকি", "রিজেকশনের কারণ", "নৈতিকতা ও নিয়মনীতি"] },
        { t: "ডকুমেন্টেশন", x: ["দেশভিত্তিক চেকলিস্ট", "ব্যাংক স্টেটমেন্ট ও সলভেন্সি", "কভার লেটার", "ভ্রমণ ইটিনেরারি"] },
        { t: "অনলাইন আবেদন", x: ["ই-ভিসা পোর্টাল", "VFS / দূতাবাস অ্যাপয়েন্টমেন্ট", "বায়োমেট্রিক্স", "আবেদন ট্র্যাকিং"] },
        { t: "স্টুডেন্ট ভিসা", x: ["ইউকে CAS", "ইউএসএ I-20 ও SEVIS", "কানাডা LOA ও PAL", "অস্ট্রেলিয়া CoE ও GS"] },
        { t: "ভিসা ডেস্ক পরিচালনা", x: ["সার্ভিস প্রাইসিং", "ক্লায়েন্ট যোগাযোগ", "কেস ম্যানেজমেন্ট", "লাইভ কেস প্র্যাকটিস"] },
      ],
      includes: ["২৪ ঘণ্টা লাইভ ক্লাস", "ক্লাস রেকর্ডিং", "দেশভিত্তিক চেকলিস্ট ও টেমপ্লেট", "লাইভ কেস প্র্যাকটিস", "সার্টিফিকেট", "চাকরি প্লেসমেন্ট সহায়তা"],
    },
  },
  {
    id: "ticketing",
    image: "assets/training/ticketing.jpg",
    price: 4500,
    originalPrice: 15000,
    weeks: 6,
    hours: 36,
    seats: 40,
    start: "2026-12-14",
    tools: ["Sabre", "Amadeus", "Galileo (Travelport)", "IATA fare rules", "BSP basics", "Airline websites"],
    en: {
      title: "Air Ticketing with Sabre, Amadeus & Galileo",
      track: "Travel",
      tagline: "Master GDS reservations, fares and ticketing for a career in airlines and travel agencies.",
      level: "Beginner → Job-ready",
      mode: "Online live",
      outcomes: [
        "Understand airline, IATA and travel-agency fundamentals",
        "Check availability and build PNRs in Sabre, Amadeus and Galileo",
        "Read and apply fares, taxes and fare rules",
        "Issue, reissue, refund and void tickets",
        "Handle seats, special requests (SSR) and queues",
        "Work confidently at a travel-agency ticketing desk",
      ],
      modules: [
        { t: "Aviation basics", x: ["Airline & airport codes", "IATA & BSP basics", "Itinerary types", "Travel documents"] },
        { t: "Sabre", x: ["Availability & sell", "PNR creation", "Fare quote", "Ticket issue"] },
        { t: "Amadeus", x: ["Availability & booking", "PNR elements", "Pricing (FXP)", "Ticketing"] },
        { t: "Galileo (Travelport)", x: ["Availability & sell", "Booking file", "Fare quote", "Ticketing"] },
        { t: "After-sales", x: ["Reissue & exchange", "Refund & void", "SSR & seats", "Queues & practice"] },
      ],
      includes: ["36 hours of live classes", "GDS practice sessions", "Command cheat-sheets", "Certificate", "Interview preparation", "Job placement support"],
    },
    bn: {
      title: "সাবরে, অ্যামাডিউস ও গ্যালিলিও দিয়ে এয়ার টিকেটিং",
      track: "ট্রাভেল",
      tagline: "এয়ারলাইন ও ট্রাভেল এজেন্সিতে ক্যারিয়ারের জন্য GDS রিজার্ভেশন, ফেয়ার ও টিকেটিং শিখুন।",
      level: "শুরু থেকে চাকরি-উপযোগী",
      mode: "অনলাইন লাইভ",
      outcomes: [
        "এয়ারলাইন, IATA ও ট্রাভেল এজেন্সির মৌলিক বিষয়",
        "সাবরে, অ্যামাডিউস ও গ্যালিলিওতে অ্যাভেইলেবিলিটি ও PNR তৈরি",
        "ফেয়ার, ট্যাক্স ও ফেয়ার রুলস বোঝা ও প্রয়োগ",
        "টিকেট ইস্যু, রিইস্যু, রিফান্ড ও ভয়েড",
        "সিট, স্পেশাল রিকোয়েস্ট (SSR) ও কিউ ম্যানেজমেন্ট",
        "ট্রাভেল এজেন্সির টিকেটিং ডেস্কে আত্মবিশ্বাসের সাথে কাজ",
      ],
      modules: [
        { t: "এভিয়েশনের মৌলিক বিষয়", x: ["এয়ারলাইন ও এয়ারপোর্ট কোড", "IATA ও BSP", "ইটিনেরারির ধরন", "ভ্রমণ ডকুমেন্ট"] },
        { t: "সাবরে", x: ["অ্যাভেইলেবিলিটি ও সেল", "PNR তৈরি", "ফেয়ার কোট", "টিকেট ইস্যু"] },
        { t: "অ্যামাডিউস", x: ["অ্যাভেইলেবিলিটি ও বুকিং", "PNR এলিমেন্ট", "প্রাইসিং (FXP)", "টিকেটিং"] },
        { t: "গ্যালিলিও (ট্রাভেলপোর্ট)", x: ["অ্যাভেইলেবিলিটি ও সেল", "বুকিং ফাইল", "ফেয়ার কোট", "টিকেটিং"] },
        { t: "আফটার-সেলস", x: ["রিইস্যু ও এক্সচেঞ্জ", "রিফান্ড ও ভয়েড", "SSR ও সিট", "কিউ ও প্র্যাকটিস"] },
      ],
      includes: ["৩৬ ঘণ্টা লাইভ ক্লাস", "GDS প্র্যাকটিস সেশন", "কমান্ড চিট-শিট", "সার্টিফিকেট", "ইন্টারভিউ প্রস্তুতি", "চাকরি প্লেসমেন্ট সহায়তা"],
    },
  },
];

/* ---------- translations (merged into the site dictionary) ---------- */
const KHOOZO_TRAINING_I18N = {
  en: {
    "navbar.training": "Training",
    "tr.eyebrow": "Khoozo Training",
    "tr.h1": "Learn career-ready skills, <em>get hired.</em>",
    "tr.lede": "Instructor-led courses in Flutter, Web development, Visa processing and GDS air ticketing — with real practice, mentor support and a certificate.",
    "tr.perk1.t": "Live + recorded", "tr.perk1.d": "Join live classes and rewatch any session.",
    "tr.perk2.t": "Project based", "tr.perk2.d": "Ship real apps for your portfolio.",
    "tr.perk3.t": "Certificate", "tr.perk3.d": "Verified certificate on completion.",
    "tr.perk4.t": "Mentor support", "tr.perk4.d": "Weekly code reviews and Q&A.",
    "tr.courses.h": "Courses", "tr.courses.p": "New batches starting soon — limited seats.",
    "tr.back": "All courses", "tr.learn": "What you'll learn", "tr.curriculum": "Curriculum",
    "tr.tools": "Tools you'll use", "tr.includes": "This course includes", "tr.buy": "Buy now",
    "tr.onetime": "One-time payment · VAT inclusive", "tr.paywith": "Pay with bKash (Send Money)",
    "tr.details": "View details", "tr.weeks": "weeks", "tr.hours": "hours", "tr.starts": "Starts", "tr.seats": "seats",
    "tr.topics": "topics", "tr.off": "off", "tr.notfound": "Course not found",
    "pay.eyebrow": "Secure checkout", "pay.h1": "Complete your enrolment",
    "pay.s1": "1. Your details", "pay.s2": "2. Payment method",
    "pay.name": "Full name", "pay.email": "Email", "pay.phone": "Mobile number",
    "pay.name.ph": "As on certificate", "pay.email.ph": "you@example.com", "pay.phone.ph": "01XXXXXXXXX",
    "pay.bkash.sub": "Pay from your bKash account", "pay.nagad.sub": "Pay from your Nagad account", "pay.card.sub": "Visa · Mastercard · AMEX",
    "pay.redirect": "You'll be taken to the secure payment page, then brought back here.",
    "pay.fee": "Course fee", "pay.discount": "Early-bird discount", "pay.total": "Amount to pay",
    "pay.agree": "I agree to the course terms and refund policy.",
    "pay.payBtn": "Pay {amount} with {method}", "pay.back": "Back to course details", "pay.secure": "Secured payment",
    "pay.err.name": "Enter your full name", "pay.err.email": "Enter a valid email", "pay.err.phone": "Enter a valid BD mobile (01XXXXXXXXX)", "pay.err.agree": "Please accept the terms",
    "res.paid": "Payment successful!", "res.paid.p": "You're enrolled in {course}.",
    "res.failed": "Payment failed", "res.cancelled": "Payment cancelled", "res.cancelled.p": "No money was taken. You can try again anytime.",
    "res.amountPaid": "Amount paid", "res.amount": "Amount", "res.invoice": "Invoice", "res.course": "Course", "res.via": "Paid via",
    "res.trx": "Transaction ID", "res.name": "Name", "res.date": "Date",
    "res.note": "A receipt and class joining details will be sent to <b>{email}</b>.",
    "res.print": "Print receipt", "res.more": "Explore courses", "res.retry": "Try again", "res.details": "Course details",
    "res.missing": "Payment not found", "res.sandbox": "Sandbox payment",
    "pay.manual.sub": "Send Money, then confirm on WhatsApp",
    "pay.manual.how": "How to pay",
    "pay.manual.s1": "Open your {wallet} app and <b>Send Money</b> {amount} to the number below.",
    "pay.manual.s2": "Copy the Transaction ID (TrxID) from the confirmation SMS.",
    "pay.manual.s3": "Fill in the details below and confirm on WhatsApp — we'll verify and enrol you.",
    "pay.manual.wallet": "Paid with", "pay.manual.sender": "Your {wallet} number", "pay.manual.trx": "Transaction ID (TrxID)",
    "pay.manual.copy": "Copy", "pay.manual.copied": "Copied", "pay.manual.btn": "Confirm payment on WhatsApp",
    "pay.err.trx": "Enter the TrxID from your SMS (8–12 letters/digits)",
    "res.submitted": "Payment submitted", "res.submitted.p": "We'll verify your TrxID and confirm your seat on WhatsApp, usually within 1 hour.",
    "res.wa": "Open WhatsApp again", "res.status": "Status", "res.status.review": "Awaiting verification",
    "pay.h1.product": "Complete your purchase", "pay.price": "Price", "pay.discount.product": "Discount",
    "pay.agree.product": "I agree to the terms and refund policy.", "pay.back.product": "Back to product details",
    "pay.back.cart": "Back to cart",
    "res.product": "Product", "res.paid.product": "Your order for {course} is confirmed.",
    "res.note.product": "Download links for your PDFs and app will be sent to <b>{email}</b> and WhatsApp.",
    "res.submitted.product": "We'll verify your TrxID and send your download links on WhatsApp, usually within 1 hour.",
    "res.more.product": "More digital products", "res.details.product": "Product details",
    "res.note.mixed": "Your receipt, class details and any download links will be sent to <b>{email}</b> and WhatsApp.",
    "res.details.cart": "Back to cart",
  },
  bn: {
    "navbar.training": "ট্রেনিং",
    "tr.eyebrow": "খুঁজো ট্রেনিং",
    "tr.h1": "ক্যারিয়ার-উপযোগী স্কিল শিখুন, <em>চাকরি পান।</em>",
    "tr.lede": "ফ্লাটার, ওয়েব ডেভেলপমেন্ট, ভিসা প্রসেসিং ও GDS এয়ার টিকেটিং — অভিজ্ঞ ইনস্ট্রাক্টর, হাতে-কলমে প্র্যাকটিস, মেন্টর সাপোর্ট ও সার্টিফিকেটসহ।",
    "tr.perk1.t": "লাইভ + রেকর্ডেড", "tr.perk1.d": "লাইভ ক্লাস করুন, যেকোনো সেশন আবার দেখুন।",
    "tr.perk2.t": "প্রজেক্টভিত্তিক", "tr.perk2.d": "পোর্টফোলিওর জন্য রিয়েল অ্যাপ বানান।",
    "tr.perk3.t": "সার্টিফিকেট", "tr.perk3.d": "কোর্স শেষে ভেরিফায়েড সার্টিফিকেট।",
    "tr.perk4.t": "মেন্টর সাপোর্ট", "tr.perk4.d": "সাপ্তাহিক কোড রিভিউ ও প্রশ্নোত্তর।",
    "tr.courses.h": "কোর্সসমূহ", "tr.courses.p": "নতুন ব্যাচ শীঘ্রই শুরু — সিট সীমিত।",
    "tr.back": "সব কোর্স", "tr.learn": "যা শিখবেন", "tr.curriculum": "কারিকুলাম",
    "tr.tools": "যে টুলস ব্যবহার করবেন", "tr.includes": "এই কোর্সে যা পাচ্ছেন", "tr.buy": "এখনই কিনুন",
    "tr.onetime": "এককালীন পেমেন্ট · ভ্যাটসহ", "tr.paywith": "বিকাশে পেমেন্ট (সেন্ড মানি)",
    "tr.details": "বিস্তারিত দেখুন", "tr.weeks": "সপ্তাহ", "tr.hours": "ঘণ্টা", "tr.starts": "শুরু", "tr.seats": "সিট",
    "tr.topics": "টপিক", "tr.off": "ছাড়", "tr.notfound": "কোর্সটি পাওয়া যায়নি",
    "pay.eyebrow": "নিরাপদ চেকআউট", "pay.h1": "এনরোলমেন্ট সম্পন্ন করুন",
    "pay.s1": "১. আপনার তথ্য", "pay.s2": "২. পেমেন্ট পদ্ধতি",
    "pay.name": "পূর্ণ নাম", "pay.email": "ইমেইল", "pay.phone": "মোবাইল নম্বর",
    "pay.name.ph": "সার্টিফিকেটে যেমন থাকবে", "pay.email.ph": "you@example.com", "pay.phone.ph": "01XXXXXXXXX",
    "pay.bkash.sub": "আপনার বিকাশ অ্যাকাউন্ট থেকে", "pay.nagad.sub": "আপনার নগদ অ্যাকাউন্ট থেকে", "pay.card.sub": "ভিসা · মাস্টারকার্ড · অ্যামেক্স",
    "pay.redirect": "আপনাকে নিরাপদ পেমেন্ট পেজে নেওয়া হবে, তারপর এখানে ফিরিয়ে আনা হবে।",
    "pay.fee": "কোর্স ফি", "pay.discount": "আর্লি-বার্ড ছাড়", "pay.total": "মোট পরিশোধযোগ্য",
    "pay.agree": "আমি কোর্সের শর্তাবলি ও রিফান্ড নীতিতে সম্মত।",
    "pay.payBtn": "{method} দিয়ে {amount} পরিশোধ করুন", "pay.back": "কোর্সের বিস্তারিতে ফিরুন", "pay.secure": "নিরাপদ পেমেন্ট",
    "pay.err.name": "আপনার পূর্ণ নাম লিখুন", "pay.err.email": "সঠিক ইমেইল দিন", "pay.err.phone": "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)", "pay.err.agree": "শর্তাবলিতে সম্মতি দিন",
    "res.paid": "পেমেন্ট সফল হয়েছে!", "res.paid.p": "আপনি {course} কোর্সে এনরোল হয়েছেন।",
    "res.failed": "পেমেন্ট ব্যর্থ হয়েছে", "res.cancelled": "পেমেন্ট বাতিল হয়েছে", "res.cancelled.p": "কোনো টাকা কাটা হয়নি। যেকোনো সময় আবার চেষ্টা করুন।",
    "res.amountPaid": "পরিশোধিত", "res.amount": "পরিমাণ", "res.invoice": "ইনভয়েস", "res.course": "কোর্স", "res.via": "পেমেন্ট মাধ্যম",
    "res.trx": "ট্রানজেকশন আইডি", "res.name": "নাম", "res.date": "তারিখ",
    "res.note": "রসিদ ও ক্লাসে যোগদানের তথ্য <b>{email}</b> ঠিকানায় পাঠানো হবে।",
    "res.print": "রসিদ প্রিন্ট করুন", "res.more": "আরও কোর্স দেখুন", "res.retry": "আবার চেষ্টা করুন", "res.details": "কোর্সের বিস্তারিত",
    "res.missing": "পেমেন্ট পাওয়া যায়নি", "res.sandbox": "স্যান্ডবক্স পেমেন্ট",
    "pay.manual.sub": "সেন্ড মানি করে হোয়াটসঅ্যাপে কনফার্ম করুন",
    "pay.manual.how": "যেভাবে পেমেন্ট করবেন",
    "pay.manual.s1": "আপনার {wallet} অ্যাপ থেকে নিচের নম্বরে {amount} <b>সেন্ড মানি</b> করুন।",
    "pay.manual.s2": "কনফার্মেশন SMS থেকে ট্রানজেকশন আইডি (TrxID) কপি করুন।",
    "pay.manual.s3": "নিচের তথ্য পূরণ করে হোয়াটসঅ্যাপে কনফার্ম করুন — আমরা যাচাই করে এনরোল করে দেব।",
    "pay.manual.wallet": "যে মাধ্যমে পাঠিয়েছেন", "pay.manual.sender": "আপনার {wallet} নম্বর", "pay.manual.trx": "ট্রানজেকশন আইডি (TrxID)",
    "pay.manual.copy": "কপি", "pay.manual.copied": "কপি হয়েছে", "pay.manual.btn": "হোয়াটসঅ্যাপে পেমেন্ট কনফার্ম করুন",
    "pay.err.trx": "SMS-এর TrxID দিন (৮–১২ অক্ষর/সংখ্যা)",
    "res.submitted": "পেমেন্ট জমা হয়েছে", "res.submitted.p": "আমরা আপনার TrxID যাচাই করে হোয়াটসঅ্যাপে সিট কনফার্ম করব, সাধারণত ১ ঘণ্টার মধ্যে।",
    "res.wa": "আবার হোয়াটসঅ্যাপ খুলুন", "res.status": "অবস্থা", "res.status.review": "যাচাইয়ের অপেক্ষায়",
    "pay.h1.product": "ক্রয় সম্পন্ন করুন", "pay.price": "মূল্য", "pay.discount.product": "ছাড়",
    "pay.agree.product": "আমি শর্তাবলি ও রিফান্ড নীতিতে সম্মত।", "pay.back.product": "পণ্যের বিস্তারিতে ফিরুন",
    "pay.back.cart": "কার্টে ফিরুন",
    "res.product": "পণ্য", "res.paid.product": "{course} — আপনার অর্ডার নিশ্চিত হয়েছে।",
    "res.note.product": "PDF ও অ্যাপের ডাউনলোড লিংক <b>{email}</b> ঠিকানায় ও হোয়াটসঅ্যাপে পাঠানো হবে।",
    "res.submitted.product": "আমরা আপনার TrxID যাচাই করে হোয়াটসঅ্যাপে ডাউনলোড লিংক পাঠাব, সাধারণত ১ ঘণ্টার মধ্যে।",
    "res.more.product": "আরও ডিজিটাল পণ্য", "res.details.product": "পণ্যের বিস্তারিত",
    "res.note.mixed": "রসিদ, ক্লাসের তথ্য ও ডাউনলোড লিংক <b>{email}</b> ঠিকানায় ও হোয়াটসঅ্যাপে পাঠানো হবে।",
    "res.details.cart": "কার্টে ফিরুন",
  },
};

if (typeof KHOOZO_I18N_DICT !== "undefined") {
  Object.assign(KHOOZO_I18N_DICT.en, KHOOZO_TRAINING_I18N.en);
  Object.assign(KHOOZO_I18N_DICT.bn, KHOOZO_TRAINING_I18N.bn);
}

(function () {
  const ORDERS_KEY = "khoozo-training-orders";
  const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
  const METHOD_LABEL = {
    bkash: { en: "bKash", bn: "বিকাশ" },
    nagad: { en: "Nagad", bn: "নগদ" },
    card: { en: "Card", bn: "কার্ড" },
    manual: { en: "Send Money", bn: "সেন্ড মানি" },
  };

  const lang = () => (document.documentElement.getAttribute("lang") === "bn" ? "bn" : "en");
  const t = (key, vars) => {
    let s = (KHOOZO_TRAINING_I18N[lang()] || {})[key] ?? KHOOZO_TRAINING_I18N.en[key] ?? key;
    if (vars) Object.keys(vars).forEach((k) => (s = s.replace(`{${k}}`, vars[k])));
    return s;
  };
  const digits = (s) => (lang() === "bn" ? String(s).replace(/\d/g, (d) => BN_DIGITS[d]) : String(s));
  const taka = (n) => "৳" + digits(Number(n).toLocaleString("en-IN"));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const date = (iso, opts) => new Date(iso).toLocaleDateString(lang() === "bn" ? "bn-BD" : "en-GB", opts || { day: "numeric", month: "short", year: "numeric" });
  const params = new URLSearchParams(location.search);
  const course = (id) => KHOOZO_COURSES.find((c) => c.id === id);
  const copy = (c) => c[lang()];
  const offPct = (c) => Math.round((1 - c.price / c.originalPrice) * 100);
  const methodName = (m) => (METHOD_LABEL[m] ? METHOD_LABEL[m][lang()] : m);

  /* What is being bought: a course (pay.html?course=<id>) or a digital
     product package from js/products.js (pay.html?product=<id>&plan=pack|combo). */
  const PLAN_LABEL = {
    pack: { en: "Digital pack", bn: "ডিজিটাল প্যাক" },
    combo: { en: "Combo with live course", bn: "লাইভ কোর্সসহ কম্বো" },
    course: { en: "Training course", bn: "ট্রেনিং কোর্স" },
  };
  /* Cart checkout (pay.html?cart=1) — aggregates everything in
     localStorage via js/cart.js into one multi-item "it". */
  function itemForCart() {
    if (!window.KhoozoCart) return null;
    const items = window.KhoozoCart.enrich(window.KhoozoCart.readCart());
    if (!items.length) return null;
    const price = items.reduce((s, x) => s + x.lineTotal, 0);
    const originalPrice = items.reduce((s, x) => s + x.unitOriginal * x.qty, 0);
    const summary = (l) =>
      items.length === 1
        ? `${items[0].product[l].title}${items[0].qty > 1 ? ` × ${items[0].qty}` : ""}`
        : l === "bn"
        ? `${items.length}টি পণ্য`
        : `${items.length} items`;
    return {
      kind: "cart", id: "cart", items, price, originalPrice,
      title: summary, name: summary, planName: () => "",
      icon: "fa-solid fa-cart-shopping", colors: ["#7f1d1d", "#9E1B1B"],
      back: "cart.html", retry: "pay.html?cart=1", list: "index.html#products",
      methods: ["manual"], wallets: ["bKash"], merchant: "Khoozo Digital",
    };
  }

  function itemFor(courseId, productId, planId) {
    if (productId) {
      const p = typeof KHOOZO_PRODUCTS !== "undefined" ? KHOOZO_PRODUCTS.find((x) => x.id === productId) : null;
      if (!p || p.software || p.landshare) return null; // contact-only items have no online payment
      const plan = planId === "combo" ? "combo" : "pack";
      return {
        kind: "product", id: p.id, plan, icon: p.icon, colors: p.colors,
        price: p[plan].price, originalPrice: p[plan].originalPrice || p[plan].price,
        title: (l) => `${p[l].title} — ${PLAN_LABEL[plan][l]}`, name: (l) => p[l].title, planName: (l) => PLAN_LABEL[plan][l],
        back: `product.html?id=${p.id}&plan=${plan}`, retry: `pay.html?product=${p.id}&plan=${plan}`, list: "index.html#products",
        methods: ["manual"], wallets: ["bKash"], merchant: "Khoozo Digital",
      };
    }
    const c = course(courseId);
    if (!c) return null;
    return {
      kind: "course", id: c.id, image: c.image, price: c.price, originalPrice: c.originalPrice,
      title: (l) => c[l].title,
      back: `course.html?id=${c.id}`, retry: `pay.html?course=${c.id}`, list: "training.html",
      methods: ["manual"], wallets: ["bKash"], merchant: "Khoozo Training",
    };
  }
  const itemFromParams = () => (params.get("cart") === "1" ? itemForCart() : itemFor(params.get("course"), params.get("product"), params.get("plan")));
  function itemFromOrder(o) {
    if (o.items) {
      const items = o.items
        .map((row) => {
          const p = typeof KHOOZO_PRODUCTS !== "undefined" ? KHOOZO_PRODUCTS.find((x) => x.id === row.id) : null;
          if (!p) return null;
          const plan = row.plan === "combo" ? "combo" : "pack";
          return { id: p.id, plan, qty: row.qty, unitPrice: p[plan].price, lineTotal: p[plan].price * row.qty, product: p };
        })
        .filter(Boolean);
      const summary = (l) =>
        items.length === 1
          ? `${items[0].product[l].title}${items[0].qty > 1 ? ` × ${items[0].qty}` : ""}`
          : l === "bn"
          ? `${items.length}টি পণ্য`
          : `${items.length} items`;
      return {
        kind: "cart", id: "cart", items,
        title: summary, name: summary, planName: () => "",
        icon: "fa-solid fa-cart-shopping", colors: ["#7f1d1d", "#9E1B1B"],
        back: "cart.html", retry: "pay.html?cart=1", list: "index.html#products", merchant: "Khoozo Digital",
      };
    }
    return itemFor(o.courseId, o.productId, o.plan);
  }
  /* Product and cart checkouts use their own wording where the course text says "course" or "enrol". */
  const tk = (it, key, vars) => {
    if (!it) return t(key, vars);
    if (it.kind === "cart" && KHOOZO_TRAINING_I18N.en[key + ".cart"]) return t(key + ".cart", vars);
    if ((it.kind === "cart" || it.kind === "product") && KHOOZO_TRAINING_I18N.en[key + ".product"]) return t(key + ".product", vars);
    return t(key, vars);
  };

  function readOrders() {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "{}"); } catch (e) { return {}; }
  }
  function saveOrder(o) {
    const all = readOrders();
    all[o.ref] = o;
    try { localStorage.setItem(ORDERS_KEY, JSON.stringify(all)); } catch (e) { /* storage blocked */ }
  }
  function randomId(prefix, len) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const buf = new Uint32Array(len);
    crypto.getRandomValues(buf);
    return prefix + Array.from(buf, (n) => chars[n % chars.length]).join("");
  }

  /* ---------------- training.html ---------------- */
  function renderList() {
    const grid = document.getElementById("courseGrid");
    if (!grid) return;
    grid.innerHTML = KHOOZO_COURSES.map((c) => {
      const k = copy(c);
      return `
      <a class="tr-card" href="course.html?id=${c.id}">
        <div class="tr-card-media">
          <img src="${c.image}" alt="" loading="lazy">
          <span class="tr-tag tr-tag-track">${esc(k.track)}</span>
          <span class="tr-tag tr-tag-off">${digits(offPct(c))}% ${t("tr.off")}</span>
          <h3>${esc(k.title)}</h3>
        </div>
        <div class="tr-card-body">
          <p>${esc(k.tagline)}</p>
          <div class="tr-facts">
            ${c.weeks ? `<span><i class="fa-regular fa-clock"></i>${digits(c.weeks)} ${t("tr.weeks")} · ${digits(c.hours)} ${t("tr.hours")}</span>` : ""}
            ${c.start ? `<span><i class="fa-regular fa-calendar"></i>${t("tr.starts")} ${date(c.start, { day: "numeric", month: "short" })}</span>` : ""}
            ${k.mode ? `<span><i class="fa-solid fa-laptop"></i>${esc(k.mode)}</span>` : ""}
          </div>
          <div class="tr-price-row">
            <div><span class="tr-price-old">${taka(c.originalPrice)}</span><span class="tr-price">${taka(c.price)}</span></div>
            <span class="tr-link">${t("tr.details")} <i class="fa-solid fa-arrow-right"></i></span>
          </div>
          <div class="tr-card-actions">
            ${window.KhoozoFav ? window.KhoozoFav.button("course:" + c.id) : ""}
            <button type="button" class="btn btn-sm btn-outline" data-add-to-cart="${c.id}" data-cart-plan="course"><span class="add-label"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i> ${lang() === "bn" ? "কার্টে যোগ করুন" : "Add to Cart"}</span></button>
          </div>
        </div>
      </a>`;
    }).join("");
  }

  /* ---------------- course.html ---------------- */
  function renderCourse() {
    const root = document.getElementById("courseRoot");
    if (!root) return;
    const c = course(params.get("id"));
    if (!c) {
      root.innerHTML = `<section class="section"><div class="container" style="text-align:center"><h1>${t("tr.notfound")}</h1><p style="margin:12px 0 24px"><a class="btn btn-primary" href="training.html">${t("tr.back")}</a></p></div></section>`;
      return;
    }
    const k = copy(c);
    document.title = `${k.title} | Khoozo Training`;
    root.innerHTML = `
    <section class="tr-hero">
      <img class="tr-hero-bg" src="${c.image}" alt="">
      <div class="container">
        <a class="tr-back" href="training.html"><i class="fa-solid fa-arrow-left"></i> ${t("tr.back")}</a>
        <p class="eyebrow">${esc(k.track)} · Khoozo Training</p>
        <h1>${esc(k.title)}</h1>
        <p>${esc(k.tagline)}</p>
        <div class="tr-meta">
          ${k.level ? `<span><i class="fa-solid fa-signal"></i>${esc(k.level)}</span>` : ""}
          ${c.weeks ? `<span><i class="fa-regular fa-clock"></i>${digits(c.weeks)} ${t("tr.weeks")} · ${digits(c.hours)} ${t("tr.hours")}</span>` : ""}
          ${k.mode ? `<span><i class="fa-solid fa-laptop"></i>${esc(k.mode)}</span>` : ""}
          ${c.start ? `<span><i class="fa-regular fa-calendar"></i>${t("tr.starts")} ${date(c.start)}</span>` : ""}
          ${c.seats ? `<span><i class="fa-solid fa-users"></i>${digits(c.seats)} ${t("tr.seats")}</span>` : ""}
        </div>
      </div>
    </section>
    <section class="section" style="padding-top:48px">
      <div class="container tr-layout">
        <div>
          <div class="tr-panel">
            <h2>${t("tr.learn")}</h2>
            <ul class="tr-checks">${k.outcomes.map((o) => `<li><i class="fa-solid fa-check"></i>${esc(o)}</li>`).join("")}</ul>
          </div>
          <div class="tr-panel">
            <h2>${t("tr.curriculum")}</h2>
            ${k.modules.map((m, i) => `
              <details class="tr-module"${i === 0 ? " open" : ""}>
                <summary><span class="tr-module-num">${digits(i + 1)}</span>${esc(m.t)}<span class="count">${digits(m.x.length)} ${t("tr.topics")}</span><i class="fa-solid fa-chevron-right"></i></summary>
                <ul>${m.x.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
              </details>`).join("")}
          </div>
          <div class="tr-panel">
            <h2>${t("tr.tools")}</h2>
            <div class="tr-chips">${c.tools.map((x) => `<span class="tr-chip">${esc(x)}</span>`).join("")}</div>
          </div>
        </div>
        <aside class="tr-panel tr-buy">
          <div class="tr-buy-top">
            <div class="tr-buy-price">
              <span class="tr-price">${taka(c.price)}</span>
              <span class="tr-price-old" style="margin:0 0 6px">${taka(c.originalPrice)}</span>
              <span class="tr-off">${digits(offPct(c))}% ${t("tr.off")}</span>
            </div>
            <p class="tr-note">${t("tr.onetime")}</p>
            <a class="btn btn-primary btn-block" href="pay.html?course=${c.id}"><i class="fa-solid fa-cart-shopping"></i> ${t("tr.buy")}</a>
            <div class="tr-buy-secondary">
              <button type="button" class="btn btn-outline" data-add-to-cart="${c.id}" data-cart-plan="course"><span class="add-label"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i> ${lang() === "bn" ? "কার্টে যোগ করুন" : "Add to Cart"}</span></button>
              ${window.KhoozoFav ? window.KhoozoFav.button("course:" + c.id, "dp-fav-inline") : ""}
            </div>
            <p class="tr-secure"><i class="fa-solid fa-shield-halved"></i> ${t("tr.paywith")}</p>
            <div class="tr-pay-logos"><span style="color:#e2136e">bKash</span></div>
          </div>
          <div class="tr-includes">
            <h4>${t("tr.includes")}</h4>
            <ul>${k.includes.map((x) => `<li><i class="fa-solid fa-circle-check"></i>${esc(x)}</li>`).join("")}</ul>
          </div>
        </aside>
      </div>
    </section>`;
  }

  /* ---------------- pay.html ---------------- */
  let payState = {
    method: "manual", name: "", email: "", phone: "", agree: false, errors: {}, busy: false, serverError: "",
    wallet: KHOOZO_PAY.manual.wallets[0].id, sender: "", trx: "", copied: false,
  };

  function manualPanel(it) {
    const s = payState;
    const wallets = KHOOZO_PAY.manual.wallets.filter((x) => !it.wallets || it.wallets.includes(x.id));
    const w = wallets.find((x) => x.id === s.wallet) || wallets[0];
    const err = (f) => (s.errors[f] ? `<span class="pay-err">${t(s.errors[f])}</span>` : "");
    return `
      <div class="pay-manual" style="--w:${w.color}">
        <p class="pay-manual-h"><i class="fa-solid fa-circle-info"></i> ${t("pay.manual.how")}</p>
        <div class="pay-wallets" role="radiogroup">
          ${wallets.map((x) => `<button type="button" class="pay-wallet${x.id === s.wallet ? " is-active" : ""}" data-wallet="${x.id}" style="--w:${x.color}">${x.id}</button>`).join("")}
        </div>
        <div class="pay-number">
          <div><small>${esc(w.id)} ${esc(w.type)} · Send Money</small><b>${digits(w.number)}</b></div>
          <button type="button" class="btn btn-outline btn-sm" data-copy="${w.number}"><i class="fa-regular ${s.copied ? "fa-circle-check" : "fa-copy"}"></i> ${t(s.copied ? "pay.manual.copied" : "pay.manual.copy")}</button>
        </div>
        <ol class="pay-steps">
          <li>${t("pay.manual.s1", { wallet: esc(w.id), amount: `<b>${taka(it.price)}</b>` })}</li>
          <li>${t("pay.manual.s2")}</li>
          <li>${t("pay.manual.s3")}</li>
        </ol>
        <div class="pay-grid-2">
          <label class="field"><span>${t("pay.manual.sender", { wallet: esc(w.id) })}</span>
            <input class="pay-input${s.errors.sender ? " is-error" : ""}" data-field="sender" type="tel" inputmode="numeric" maxlength="11" placeholder="01XXXXXXXXX" value="${esc(s.sender)}">${err("sender")}</label>
          <label class="field"><span>${t("pay.manual.trx")}</span>
            <input class="pay-input${s.errors.trx ? " is-error" : ""}" data-field="trx" type="text" autocomplete="off" maxlength="12" placeholder="e.g. 9JK4XQ2M7P" style="text-transform:uppercase" value="${esc(s.trx)}">${err("trx")}</label>
        </div>
      </div>`;
  }

  function renderPay() {
    const root = document.getElementById("payRoot");
    if (!root) return;
    const it = itemFromParams();
    if (!it) {
      root.innerHTML = `<div style="text-align:center;padding:60px 0"><h1>${t("tr.notfound")}</h1><p style="margin:12px 0 24px"><a class="btn btn-primary" href="training.html">${t("tr.back")}</a></p></div>`;
      return;
    }
    if (it.kind === "product") document.title = "Payment | Khoozo Digital Products";
    const s = payState;
    const authUser = window.KhoozoAuth && window.KhoozoAuth.isLoggedIn() ? window.KhoozoAuth.currentUser() : null;
    if (authUser && !s.prefilled) {
      s.prefilled = true;
      s.name = s.name || authUser.fullName || authUser.displayName || "";
      if (!s.phone && authUser.mobileNumber) s.phone = "0" + authUser.mobileNumber.slice(-10);
      s.email = s.email || authUser.email || "";
    }
    if (!it.methods.includes(s.method)) s.method = it.methods[0];
    if (it.wallets && !it.wallets.includes(s.wallet)) s.wallet = it.wallets[0];
    const err = (f) => (s.errors[f] ? `<span class="pay-err">${t(s.errors[f])}</span>` : "");
    const field = (f, type, ac) => `
      <label class="field"><span>${t("pay." + f)}</span>
        <input class="pay-input${s.errors[f] ? " is-error" : ""}" data-field="${f}" type="${type}" autocomplete="${ac}" placeholder="${t("pay." + f + ".ph")}" value="${esc(s[f])}">
        ${err(f)}
      </label>`;
    const methods = it.methods.map((m) => `
      <button type="button" class="pay-method${s.method === m ? " is-active" : ""}" data-method="${m}" role="radio" aria-checked="${s.method === m}">
        <span class="radio"></span><b>${m === "manual" ? 'bKash · Send Money' : m === "card" ? "Card" : METHOD_LABEL[m].en}</b><small>${t("pay." + m + ".sub")}</small>
      </button>`).join("");
    const isManual = s.method === "manual";

    root.innerHTML = `
    <p class="eyebrow">${t("pay.eyebrow")}</p>
    <h1 style="font-size:clamp(1.8rem,3.6vw,2.5rem);margin-bottom:28px">${tk(it, "pay.h1")}</h1>
    <form id="payForm" class="pay-layout pay-form" novalidate>
      <div>
        <div class="tr-panel">
          <h2>${t("pay.s1")}</h2>
          ${field("name", "text", "name")}
          <div class="pay-grid-2">${field("email", "email", "email")}${field("phone", "tel", "tel")}</div>
        </div>
        <div class="tr-panel">
          <h2>${t("pay.s2")}</h2>
          <div class="pay-methods" role="radiogroup">${methods}</div>
          ${isManual ? manualPanel(it) : `<p class="tr-note" style="margin-top:14px">${t("pay.redirect")}</p>`}
        </div>
      </div>
      <aside class="tr-panel tr-buy">
        ${it.kind === "cart"
          ? `<div class="pay-cart-items">${it.items
              .map(
                (ci) => `
              <div class="pay-cart-item">
                <span class="pay-cart-icon" style="--dp1:${ci.product.colors[0]};--dp2:${ci.product.colors[1]}"><i class="${ci.product.icon}"></i></span>
                <div class="pay-cart-info"><b>${esc(ci.product[lang()].title)}</b><small>${esc(PLAN_LABEL[ci.plan][lang()])} × ${digits(ci.qty)}</small></div>
                <span class="pay-cart-price">${taka(ci.lineTotal)}</span>
              </div>`,
              )
              .join("")}</div>`
          : it.kind === "product"
          ? `<div class="pay-summary-media is-product" style="--dp1:${it.colors[0]};--dp2:${it.colors[1]}"><i class="${it.icon}"></i><strong>${esc(it.name(lang()))}<span class="pay-summary-plan">${esc(it.planName(lang()))}</span></strong></div>`
          : `<div class="pay-summary-media"><img src="${it.image}" alt=""><strong>${esc(it.title(lang()))}</strong></div>`}
        <div class="pay-lines">
          ${it.originalPrice > it.price ? `<div class="pay-line"><span>${it.kind === "product" || it.kind === "cart" ? t("pay.price") : t("pay.fee")}</span><span style="text-decoration:line-through">${taka(it.originalPrice)}</span></div>
          <div class="pay-line discount"><span>${tk(it, "pay.discount")}</span><span>– ${taka(it.originalPrice - it.price)}</span></div>` : ""}
          <div class="pay-total"><span style="font-weight:700">${t("pay.total")}</span><b>${taka(it.price)}</b></div>
          <label class="pay-agree"><input type="checkbox" data-field="agree"${s.agree ? " checked" : ""}><span>${tk(it, "pay.agree")}${err("agree")}</span></label>
          ${s.serverError ? `<p class="pay-err">${esc(s.serverError)}</p>` : ""}
          <button type="submit" class="btn pay-btn" data-method="${s.method}"${s.busy ? " disabled" : ""}>
            <i class="${s.busy ? "fa-solid fa-spinner fa-spin" : isManual ? "fa-brands fa-whatsapp" : "fa-solid fa-lock"}"></i> ${isManual ? t("pay.manual.btn") : t("pay.payBtn", { amount: taka(it.price), method: methodName(s.method) })}
          </button>
          <p class="tr-secure"><i class="fa-solid fa-shield-halved"></i> ${t("pay.secure")}</p>
          <p style="text-align:center;margin-top:8px"><a class="tr-link" style="font-size:.85rem" href="${it.back}">${tk(it, "pay.back")}</a></p>
        </div>
      </aside>
    </form>`;

    root.querySelectorAll("[data-field]").forEach((el) => {
      el.addEventListener("input", () => {
        const f = el.getAttribute("data-field");
        payState[f] = el.type === "checkbox" ? el.checked : el.value;
      });
      if (el.type === "checkbox") el.addEventListener("change", () => (payState.agree = el.checked));
    });
    root.querySelectorAll(".pay-method").forEach((b) =>
      b.addEventListener("click", () => {
        payState.method = b.getAttribute("data-method");
        payState.errors = {};
        renderPay();
      }),
    );
    root.querySelectorAll("[data-wallet]").forEach((b) =>
      b.addEventListener("click", () => {
        payState.wallet = b.getAttribute("data-wallet");
        payState.copied = false;
        renderPay();
      }),
    );
    root.querySelectorAll("[data-copy]").forEach((b) =>
      b.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(b.getAttribute("data-copy"));
          payState.copied = true;
          renderPay();
        } catch (e) { /* clipboard blocked */ }
      }),
    );
    document.getElementById("payForm").addEventListener("submit", (e) => {
      e.preventDefault();
      submitPay(it);
    });
  }

  async function submitPay(it) {
    const s = payState;
    const errors = {};
    const phone = s.phone.replace(/[\s-]/g, "");
    if (s.name.trim().length < 2) errors.name = "pay.err.name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.email.trim())) errors.email = "pay.err.email";
    if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(phone)) errors.phone = "pay.err.phone";
    if (!s.agree) errors.agree = "pay.err.agree";
    const trx = s.trx.trim().toUpperCase();
    if (s.method === "manual") {
      if (!/^01[3-9]\d{8}$/.test(s.sender.replace(/[\s-]/g, ""))) errors.sender = "pay.err.phone";
      if (!/^[A-Z0-9]{8,12}$/.test(trx)) errors.trx = "pay.err.trx";
    }
    s.errors = errors;
    s.serverError = "";
    if (Object.keys(errors).length) {
      renderPay();
      const first = document.querySelector(".pay-input.is-error, .pay-agree .pay-err");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const customer = { name: s.name.trim(), email: s.email.trim().toLowerCase(), phone: phone.replace(/^\+?88/, "") };

    const what =
      it.kind === "cart"
        ? { items: it.items.map((ci) => ({ id: ci.id, plan: ci.plan, qty: ci.qty })) }
        : it.kind === "product"
        ? { items: [{ id: it.id, plan: it.plan, qty: 1 }] }
        : { courseId: it.id };
    const kindLabel = it.kind === "cart" ? "digital product" : it.kind === "product" ? "digital product" : "course";
    const itemLines = it.kind === "cart" ? it.items.map((ci) => `• ${ci.product.en.title} (${PLAN_LABEL[ci.plan].en}) × ${ci.qty} — ${ci.lineTotal} BDT`).join("\n") : `*${it.kind === "product" ? "Product" : "Course"}:* ${it.title("en")}`;
    if (s.method === "manual") {
      const order = {
        ref: randomId("KZT-", 8),
        ...what,
        amount: it.price,
        method: "manual",
        wallet: s.wallet,
        payer: s.sender.replace(/[\s-]/g, ""),
        trxID: trx,
        customer,
        status: "submitted",
        mode: "manual",
        createdAt: new Date().toISOString(),
      };
      order.updatedAt = order.createdAt;
      saveOrder(order);
      if (it.kind === "cart" && window.KhoozoCart) window.KhoozoCart.clearCart();
      const msg = [
        `Hello Khoozo, I want to confirm my ${kindLabel} payment.`,
        "",
        itemLines,
        `*Invoice:* ${order.ref}`,
        `*Amount:* ${it.price} BDT`,
        `*Paid with:* ${s.wallet} (Send Money)`,
        `*Sender number:* ${order.payer}`,
        `*Transaction ID:* ${trx}`,
        "",
        `*Name:* ${customer.name}`,
        `*Email:* ${customer.email}`,
        `*Mobile:* ${customer.phone}`,
      ].join("\n");
      const wa = `https://wa.me/${KHOOZO_PAY.manual.whatsapp}?text=${encodeURIComponent(msg)}`;
      try { sessionStorage.setItem("khoozo-wa-" + order.ref, wa); } catch (e) { /* ignore */ }
      window.open(wa, "_blank", "noopener");
      location.assign(`pay-result.html?ref=${encodeURIComponent(order.ref)}`);
      return;
    }

    s.busy = true;
    renderPay();

    if (KHOOZO_PAY.apiBase) {
      try {
        const res = await fetch(`${KHOOZO_PAY.apiBase}/api/v1/shop/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...what, method: s.method, customer }),
        });
        const json = await res.json();
        if (!res.ok || !json.redirectURL) throw new Error(json.error || "Could not start payment");
        location.assign(json.redirectURL);
      } catch (e) {
        s.busy = false;
        s.serverError = e.message;
        renderPay();
      }
      return;
    }

    const order = {
      ref: randomId("KZT-", 8),
      ...what,
      amount: it.price,
      method: s.method,
      customer,
      status: "pending",
      mode: "sandbox",
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);
    if (it.kind === "cart" && window.KhoozoCart) window.KhoozoCart.clearCart();
    setTimeout(() => location.assign(`pay-gateway.html?method=${order.method}&ref=${encodeURIComponent(order.ref)}`), 500);
  }

  /* ---------------- pay-gateway.html (sandbox) ---------------- */
  const GW = {
    bkash: { brand: "bKash", pin: 5 },
    nagad: { brand: "Nagad", pin: 4 },
    card: { brand: "Card payment", pin: 0 },
  };
  let gwState = { step: "account", wallet: "", otp: "", pin: "", card: { number: "", expiry: "", cvv: "", name: "" }, error: "", busy: false };

  function renderGateway() {
    const root = document.getElementById("gwRoot");
    if (!root) return;
    const method = params.get("method");
    const order = readOrders()[params.get("ref") || ""];
    const cfg = GW[method];
    if (!cfg || !order || order.method !== method) {
      root.innerHTML = `<div class="gw"><div class="gw-busy">${t("res.missing")}<a class="btn btn-primary" href="training.html">${t("tr.back")}</a></div></div>`;
      return;
    }
    if (order.status !== "pending") return location.replace(`pay-result.html?ref=${encodeURIComponent(order.ref)}`);
    const it = itemFromOrder(order);
    const g = gwState;
    const amount = "৳" + Number(order.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 });

    const head = `
      <div class="gw-head"><span class="gw-brand">${cfg.brand}</span><span class="gw-sandbox">Sandbox</span>
        <button type="button" data-gw="cancel" aria-label="Cancel"><i class="fa-solid fa-xmark"></i></button></div>
      <div class="gw-merchant"><img src="assets/logo.png" alt=""><div class="who"><b>${it ? it.merchant : "Khoozo"}</b><small>Invoice: ${esc(order.ref)}</small></div><div class="amt" style="color:var(--gw)">${amount}</div></div>`;

    let main;
    if (g.busy) {
      main = `<div class="gw-busy"><div class="gw-spinner"></div>Processing payment…</div>`;
    } else if (method === "card") {
      main = `
        <form class="gw-main" id="gwForm" novalidate>
          <input class="gw-input left" data-card="number" inputmode="numeric" autocomplete="cc-number" placeholder="Card number" value="${esc(g.card.number)}">
          <div class="gw-row">
            <input class="gw-input left" data-card="expiry" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" value="${esc(g.card.expiry)}">
            <input class="gw-input left" data-card="cvv" type="password" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="CVV" value="${esc(g.card.cvv)}">
          </div>
          <input class="gw-input left" style="margin-top:12px;text-transform:uppercase" data-card="name" autocomplete="cc-name" placeholder="Name on card" value="${esc(g.card.name)}">
          <p class="gw-error">${esc(g.error)}</p>
          <button class="gw-full gw-go" type="submit"><i class="fa-solid fa-lock"></i> Pay ${amount}</button>
          <p class="gw-hint">Sandbox: 4242 4242 4242 4242 · any future expiry · any CVV<br>4000 0000 0000 0002 simulates a decline</p>
        </form>`;
    } else {
      const steps = ["account", "otp", "pin"];
      const idx = steps.indexOf(g.step);
      const stepper = `<ol class="gw-steps">${["Account", "Verify", "PIN"].map((l, i) => `<li class="${i <= idx ? "is-on" : ""}"><span class="dot" style="${i <= idx ? "background:var(--gw)" : ""}">${i + 1}</span>${l}</li>`).join("")}</ol>`;
      const masked = g.wallet ? g.wallet.slice(0, 3) + "****" + g.wallet.slice(-3) : "";
      const input = {
        account: `<label class="gw-label">Your ${cfg.brand} account number</label><input class="gw-input" id="gwIn" inputmode="numeric" maxlength="11" placeholder="e.g 01XXXXXXXXX" value="${esc(g.wallet)}">`,
        otp: `<label class="gw-label">Enter the verification code sent to ${masked}</label><input class="gw-input code" id="gwIn" inputmode="numeric" maxlength="6" placeholder="••••••" value="${esc(g.otp)}">`,
        pin: `<label class="gw-label">Enter your ${cfg.brand} PIN</label><input class="gw-input code" id="gwIn" type="password" inputmode="numeric" maxlength="${cfg.pin}" placeholder="${"•".repeat(cfg.pin)}" value="">`,
      }[g.step];
      main = `
        <form class="gw-main" id="gwForm" novalidate>
          ${stepper}${input}
          <p class="gw-error">${esc(g.error)}</p>
          <div class="gw-actions"><button type="button" class="gw-ghost" data-gw="cancel">Close</button><button type="submit" class="gw-go">${g.step === "pin" ? "Confirm" : "Proceed"}</button></div>
          <p class="gw-hint">Sandbox: any valid number · code <b>123456</b> · any ${cfg.pin}-digit PIN (${"0".repeat(cfg.pin)} = wrong PIN)</p>
        </form>`;
    }

    root.innerHTML = `<div class="gw" data-method="${method}">${head}${main}<div class="gw-foot"><i class="fa-solid fa-lock"></i> ${esc(it ? it.title("en") : "")} · secured connection</div></div>`;

    root.querySelectorAll('[data-gw="cancel"]').forEach((b) => b.addEventListener("click", () => finish(order, "cancelled", { reason: "Cancelled by customer" })));
    const inEl = document.getElementById("gwIn");
    if (inEl) {
      inEl.focus();
      inEl.addEventListener("input", () => {
        inEl.value = inEl.value.replace(/\D/g, "");
        if (g.step === "account") g.wallet = inEl.value;
        else if (g.step === "otp") g.otp = inEl.value;
        else g.pin = inEl.value;
      });
    }
    root.querySelectorAll("[data-card]").forEach((el) =>
      el.addEventListener("input", () => {
        const f = el.getAttribute("data-card");
        if (f === "number") el.value = el.value.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
        if (f === "expiry") {
          const d = el.value.replace(/\D/g, "").slice(0, 4);
          el.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
        }
        if (f === "cvv") el.value = el.value.replace(/\D/g, "");
        g.card[f] = el.value;
      }),
    );
    const form = document.getElementById("gwForm");
    if (form) form.addEventListener("submit", (e) => { e.preventDefault(); gwSubmit(order, method, cfg); });
  }

  function luhn(num) {
    let sum = 0, dbl = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let d = Number(num[i]);
      if (dbl) { d *= 2; if (d > 9) d -= 9; }
      sum += d; dbl = !dbl;
    }
    return num.length >= 13 && sum % 10 === 0;
  }

  function gwSubmit(order, method, cfg) {
    const g = gwState;
    g.error = "";
    if (method === "card") {
      const n = g.card.number.replace(/\s/g, "");
      const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(g.card.expiry);
      if (!luhn(n)) g.error = "Enter a valid card number";
      else if (!m || new Date(2000 + Number(m[2]), Number(m[1]), 0, 23, 59) < new Date()) g.error = "Card expiry is invalid";
      else if (!/^\d{3,4}$/.test(g.card.cvv)) g.error = "Enter the CVV";
      else if (g.card.name.trim().length < 2) g.error = "Enter the name on card";
      if (g.error) return renderGateway();
      if (n === "4000000000000002") return finish(order, "failed", { reason: "Card declined by issuer" });
      return finish(order, "paid", { payer: "•••• " + n.slice(-4) });
    }
    if (g.step === "account") {
      if (!/^01[3-9]\d{8}$/.test(g.wallet)) g.error = `Enter a valid ${cfg.brand} account number`;
      else g.step = "otp";
      return renderGateway();
    }
    if (g.step === "otp") {
      if (g.otp !== "123456") g.error = "Incorrect verification code";
      else g.step = "pin";
      return renderGateway();
    }
    if (!new RegExp(`^\\d{${cfg.pin}}$`).test(g.pin)) { g.error = `Enter your ${cfg.pin}-digit PIN`; return renderGateway(); }
    if (/^0+$/.test(g.pin)) return finish(order, "failed", { reason: "Wrong PIN" });
    finish(order, "paid", { payer: g.wallet.slice(0, 3) + "****" + g.wallet.slice(-4) });
  }

  function finish(order, status, extra) {
    gwState.busy = true;
    renderGateway();
    const prefix = { bkash: "BK", nagad: "NG", card: "CD" }[order.method];
    const updated = Object.assign({}, order, {
      status,
      trxID: status === "paid" ? randomId(prefix, 10) : undefined,
      payer: extra.payer,
      reason: extra.reason,
      updatedAt: new Date().toISOString(),
    });
    saveOrder(updated);
    const cb = status === "paid" ? "success" : status === "cancelled" ? "cancel" : "failure";
    setTimeout(() => location.replace(`pay-result.html?ref=${encodeURIComponent(order.ref)}&status=${cb}`), 1400);
  }

  /* ---------------- pay-result.html ---------------- */
  function renderResult() {
    const root = document.getElementById("resRoot");
    if (!root) return;
    const order = readOrders()[params.get("ref") || ""];
    if (!order) {
      root.innerHTML = `<div class="tr-panel res is-failed"><div class="res-head"><i class="fa-solid fa-circle-xmark"></i><h1>${t("res.missing")}</h1></div><div class="res-body"><div class="res-actions"><a class="btn btn-primary" href="training.html">${t("res.more")}</a></div></div></div>`;
      return;
    }
    const it = itemFromOrder(order);
    const isGoods = it && (it.kind === "product" || it.kind === "cart");
    if (isGoods) document.title = "Payment status | Khoozo Digital Products";
    const title0 = it ? it.title(lang()) : order.courseId || order.productId;
    const paid = order.status === "paid";
    const submitted = order.status === "submitted";
    const cls = paid ? "is-paid" : submitted ? "is-submitted" : order.status === "cancelled" ? "is-cancelled" : "is-failed";
    const icon = paid ? "fa-circle-check" : submitted ? "fa-hourglass-half" : "fa-circle-xmark";
    const title = paid ? t("res.paid") : submitted ? t("res.submitted") : order.status === "cancelled" ? t("res.cancelled") : t("res.failed");
    const sub = paid
      ? (isGoods ? t("res.paid.product", { course: esc(title0) }) : t("res.paid.p", { course: esc(title0) }))
      : submitted ? (isGoods ? t("res.submitted.product") : t("res.submitted.p")) : order.status === "cancelled" ? t("res.cancelled.p") : esc(order.reason || "");
    const via = order.method === "manual" ? `${order.wallet} · ${methodName("manual")}` : methodName(order.method);
    let wa = "";
    try { wa = sessionStorage.getItem("khoozo-wa-" + order.ref) || ""; } catch (e) { /* ignore */ }
    const itemsRow = it && it.kind === "cart"
      ? [t("res.product"), it.items.map((ci) => `${esc(ci.product[lang()].title)} × ${digits(ci.qty)}`).join(", ")]
      : [isGoods ? t("res.product") : t("res.course"), title0];
    const rows = [
      [t("res.invoice"), order.ref],
      itemsRow,
      [t("res.via"), via + (order.payer ? " · " + order.payer : "")],
      order.trxID ? [t("res.trx"), order.trxID] : null,
      submitted ? [t("res.status"), t("res.status.review")] : null,
      [t("res.name"), order.customer.name],
      [t("res.date"), new Date(order.updatedAt || order.createdAt).toLocaleString(lang() === "bn" ? "bn-BD" : "en-GB", { dateStyle: "medium", timeStyle: "short" })],
    ].filter(Boolean);

    root.innerHTML = `
    <div class="tr-panel res ${cls}">
      <div class="res-head"><i class="fa-solid ${icon}"></i><h1>${title}</h1><p>${sub}</p>${order.mode === "sandbox" ? `<span class="res-badge">${t("res.sandbox")}</span>` : ""}</div>
      <div class="res-body">
        <div class="res-amount"><span style="font-weight:600;color:var(--ink-soft)">${paid ? t("res.amountPaid") : t("res.amount")}</span><b>${taka(order.amount)}</b></div>
        <dl class="res-rows">${rows.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>
        ${paid ? `<p class="res-note">${it.kind === "cart" && it.items.some((ci) => ci.plan === "course") ? t("res.note.mixed", { email: esc(order.customer.email) }) : tk(it, "res.note", { email: esc(order.customer.email) })}</p>` : ""}
        <div class="res-actions">
          ${submitted
            ? `${wa ? `<a class="btn res-wa" href="${esc(wa)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> ${t("res.wa")}</a>` : ""}<button type="button" class="btn btn-outline" onclick="window.print()"><i class="fa-solid fa-print"></i> ${t("res.print")}</button>`
            : paid
            ? `<button type="button" class="btn btn-outline" onclick="window.print()"><i class="fa-solid fa-print"></i> ${t("res.print")}</button><a class="btn btn-primary" href="${it ? it.list : "training.html"}">${tk(it, "res.more")}</a>`
            : it ? `<a class="btn btn-outline" href="${it.back}">${tk(it, "res.details")}</a><a class="btn btn-primary" href="${it.retry}"><i class="fa-solid fa-rotate-right"></i> ${t("res.retry")}</a>`
            : `<a class="btn btn-primary" href="training.html">${t("res.more")}</a>`}
        </div>
      </div>
    </div>`;
  }

  function renderAll() {
    renderList();
    renderCourse();
    renderPay();
    renderGateway();
    renderResult();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAll();
    new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  });
})();
