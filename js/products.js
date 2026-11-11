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
  {
    id: "kids-brain-booster",
    icon: "fa-solid fa-brain",
    colors: ["#0f766e", "#84cc16"],
    pack: { price: 200, originalPrice: 500 },
    combo: null,
    en: {
      title: "Kids Brain Booster",
      tagline: "A fun offline puzzle game that grows logic, vocabulary and observation in children aged 6–12.",
      desc: "Four brain games, school lessons from Play Group to Class 5 in English and Bangla, stars, badges and a parent report. No ads, no accounts, and no internet needed while playing.",
      packSub: "Android app (APK) · lifetime use",
      cardFacts: [["fa-solid fa-gamepad", "4 brain games + school lessons"], ["fa-solid fa-language", "English & Bangla"], ["fa-solid fa-wifi", "Works offline, no ads"]],
      how3: "After payment we send you a Google Drive link to download the APK, on WhatsApp and email. Install it on any Android phone or tablet.",
      pdfs: [],
      app: ["Kids Brain Booster (Android)", "Matrix Master, Jumble Words, Picture Perception and Logic Lab, plus Learn & Play for Play Group to Class 5. Ollie the owl cheers your child on with confetti, hints and stars."],
      stats: [
        ["fa-solid fa-puzzle-piece", "2,000", "Brain-game questions in 4 games, 5 levels and 100 stages each"],
        ["fa-solid fa-school", "2,922", "Learn & Play questions: Maths, English, Bangla and My World"],
        ["fa-solid fa-language", "EN + বাং", "Play in English, Bangla or both together"],
        ["fa-solid fa-wifi", "Offline", "Plays without internet: no ads, no accounts"],
        ["fa-solid fa-star", "16", "Achievement badges, plus a daily challenge and day streak"],
        ["fa-solid fa-user-shield", "Parents", "A parent area with accuracy, stars and a progress report"],
      ],
      features: [
        ["fa-solid fa-table-cells", "Matrix Master", "Spot the rule in grids and sequences — non-verbal IQ practice."],
        ["fa-solid fa-spell-check", "Jumble Words", "Unscramble letter tiles to build vocabulary and spelling."],
        ["fa-solid fa-eye", "Picture Perception", "Count, compare and tell stories from picture scenes (PPDT style)."],
        ["fa-solid fa-flask", "Logic Lab", "Number and letter series, analogies, clocks, directions and codes."],
        ["fa-solid fa-book-open", "Learn & Play", "School-style Maths, English, Bangla and My World, Play Group to Class 5."],
        ["fa-solid fa-calendar-day", "Daily Brain Challenge", "12 fresh mixed questions every day, plus Mistake Review."],
        ["fa-solid fa-lightbulb", "Gentle hints", "\"Good try! Let's think again.\" Two hints, then the answer explained."],
        ["fa-solid fa-chart-line", "Parent report", "Accuracy, first-try rate, points and stars behind a maths gate."],
      ],
      course: "",
      courseMode: "",
      audience: ["Children aged 6–12", "Parents who want screen time that teaches", "Kids preparing for school or cadet admission tests", "Schools and coaching centres"],
    },
    bn: {
      title: "কিডস ব্রেইন বুস্টার",
      tagline: "৬–১২ বছরের শিশুদের যুক্তি, শব্দভান্ডার ও পর্যবেক্ষণ বাড়ানোর মজার অফলাইন পাজল গেম।",
      desc: "চারটি ব্রেইন গেম, প্লে গ্রুপ থেকে ক্লাস ৫ পর্যন্ত ইংরেজি ও বাংলায় স্কুলের পাঠ, স্টার, ব্যাজ আর প্যারেন্ট রিপোর্ট। কোনো বিজ্ঞাপন নেই, অ্যাকাউন্ট লাগে না, খেলতে ইন্টারনেটও লাগে না।",
      packSub: "অ্যান্ড্রয়েড অ্যাপ (APK) · আজীবন ব্যবহার",
      cardFacts: [["fa-solid fa-gamepad", "৪টি ব্রেইন গেম + স্কুলের পাঠ"], ["fa-solid fa-language", "ইংরেজি ও বাংলা"], ["fa-solid fa-wifi", "অফলাইনে চলে, বিজ্ঞাপন নেই"]],
      how3: "পেমেন্টের পর হোয়াটসঅ্যাপ ও ইমেইলে APK ডাউনলোডের Google Drive লিংক পাঠানো হবে। যেকোনো অ্যান্ড্রয়েড ফোন বা ট্যাবে ইনস্টল করুন।",
      pdfs: [],
      app: ["কিডস ব্রেইন বুস্টার (অ্যান্ড্রয়েড)", "ম্যাট্রিক্স মাস্টার, জাম্বল ওয়ার্ডস, পিকচার পারসেপশন ও লজিক ল্যাব, সাথে প্লে গ্রুপ থেকে ক্লাস ৫-এর লার্ন অ্যান্ড প্লে। কনফেটি, হিন্ট আর স্টার দিয়ে উৎসাহ দেয় পেঁচা অলি।"],
      stats: [
        ["fa-solid fa-puzzle-piece", "২,০০০", "৪টি গেমে ব্রেইন গেমের প্রশ্ন, প্রতিটিতে ৫ লেভেল ও ১০০ স্টেজ"],
        ["fa-solid fa-school", "২,৯২২", "লার্ন অ্যান্ড প্লে প্রশ্ন: গণিত, ইংরেজি, বাংলা ও আমার পৃথিবী"],
        ["fa-solid fa-language", "EN + বাং", "ইংরেজি, বাংলা বা দুটো একসাথে"],
        ["fa-solid fa-wifi", "অফলাইন", "খেলতে ইন্টারনেট লাগে না: বিজ্ঞাপন বা অ্যাকাউন্ট নেই"],
        ["fa-solid fa-star", "১৬", "অর্জনের ব্যাজ, সাথে ডেইলি চ্যালেঞ্জ ও স্ট্রিক"],
        ["fa-solid fa-user-shield", "অভিভাবক", "নির্ভুলতা, স্টার ও অগ্রগতিসহ প্যারেন্ট এরিয়া"],
      ],
      features: [
        ["fa-solid fa-table-cells", "ম্যাট্রিক্স মাস্টার", "গ্রিড ও সিরিজে নিয়ম খুঁজে বের করা — নন-ভার্বাল IQ প্র্যাকটিস।"],
        ["fa-solid fa-spell-check", "জাম্বল ওয়ার্ডস", "এলোমেলো অক্ষর সাজিয়ে শব্দভান্ডার ও বানান শেখা।"],
        ["fa-solid fa-eye", "পিকচার পারসেপশন", "ছবির দৃশ্য থেকে গোনা, তুলনা ও গল্প বলা (PPDT ধাঁচে)।"],
        ["fa-solid fa-flask", "লজিক ল্যাব", "সংখ্যা ও অক্ষরের সিরিজ, অ্যানালজি, ঘড়ি, দিক ও কোড।"],
        ["fa-solid fa-book-open", "লার্ন অ্যান্ড প্লে", "প্লে গ্রুপ থেকে ক্লাস ৫: গণিত, ইংরেজি, বাংলা ও আমার পৃথিবী।"],
        ["fa-solid fa-calendar-day", "ডেইলি ব্রেইন চ্যালেঞ্জ", "প্রতিদিন ১২টি নতুন প্রশ্ন, সাথে ভুলগুলো আবার দেখার সুযোগ।"],
        ["fa-solid fa-lightbulb", "সহজ হিন্ট", "ভুল হলে উৎসাহ, দুটি হিন্ট, তারপর ব্যাখ্যাসহ উত্তর।"],
        ["fa-solid fa-chart-line", "প্যারেন্ট রিপোর্ট", "নির্ভুলতা, প্রথম চেষ্টায় সঠিক, পয়েন্ট ও স্টার।"],
      ],
      course: "",
      courseMode: "",
      audience: ["৬–১২ বছরের শিশু", "যে অভিভাবকরা শেখার মতো স্ক্রিন টাইম চান", "স্কুল বা ক্যাডেট ভর্তি পরীক্ষার প্রস্তুতি নেওয়া শিশু", "স্কুল ও কোচিং সেন্টার"],
    },
  },
  {
    id: "english-booster",
    icon: "fa-solid fa-comments",
    colors: ["#1e3a8a", "#06b6d4"],
    pack: { price: 499, originalPrice: 1000 },
    combo: null,
    en: {
      title: "English Booster: Spoken English & IELTS",
      tagline: "Speak English with confidence and prepare for all four IELTS modules — fully offline.",
      desc: "Vocabulary, grammar, real-life phrases and dialogues for spoken English, plus IELTS Speaking, Reading, Listening and Writing practice with timers and band estimates. Explanations in Bangla, voices from your phone, no account and no internet needed.",
      packSub: "Android app (APK) · lifetime use",
      cardFacts: [["fa-solid fa-microphone-lines", "Spoken English + all 4 IELTS modules"], ["fa-solid fa-language", "Bangla explanations"], ["fa-solid fa-wifi", "Works offline, no ads"]],
      how3: "After payment we send you a Google Drive link to download the APK, on WhatsApp and email. Install it on any Android phone or tablet.",
      stats: [
        ["fa-solid fa-book", "360+", "Words from A1 to C1 with Bangla meanings and flashcards"],
        ["fa-solid fa-spell-check", "39", "Grammar units with about 366 practice questions"],
        ["fa-solid fa-microphone", "47", "IELTS Speaking topics, cue cards and Part 3 sets"],
        ["fa-solid fa-pen-nib", "18", "IELTS Writing tasks with outlines and model answers"],
        ["fa-solid fa-headphones", "12", "Timed IELTS Reading passages and Listening recordings"],
        ["fa-solid fa-wifi", "Offline", "No account, no internet: recordings stay on your phone"],
      ],
      pdfs: [],
      app: ["English Booster (Android)", "Spoken English and IELTS preparation in one app: learn words and grammar, practise real conversations, record yourself, and sit timed IELTS practice tests."],
      features: [
        ["fa-solid fa-layer-group", "Vocabulary & flashcards", "Topics, phrasal verbs, idioms and IELTS academic words, with spaced-repetition flashcards and 4 quiz types."],
        ["fa-solid fa-comment-dots", "Phrase Lab", "16 real-life situations with useful phrases in Bangla; listen, slow down and record yourself."],
        ["fa-solid fa-people-arrows", "Dialogues", "12 conversations where the phone speaks your partner and you pick the best reply."],
        ["fa-solid fa-volume-high", "Pronunciation", "Minimal pairs, word stress and tips made for Bengali speakers."],
        ["fa-solid fa-user-tie", "IELTS Speaking", "Parts 1–3, cue cards with a 1 + 2 minute timer, a mock interview and self-rating."],
        ["fa-solid fa-book-open-reader", "IELTS Reading & Listening", "Timed passages and two-voice recordings with every question type."],
        ["fa-solid fa-chart-column", "IELTS Writing", "Task 1 charts and Task 2 essays with model answers and a structure checker."],
        ["fa-solid fa-fire", "Progress & streaks", "XP, levels, daily goals, per-skill accuracy and practice band estimates."],
      ],
      course: "",
      courseMode: "",
      audience: ["IELTS candidates for study or work abroad", "Students and job seekers improving spoken English", "Bengali speakers who want Bangla explanations", "Anyone practising English without internet"],
    },
    bn: {
      title: "ইংলিশ বুস্টার: স্পোকেন ইংলিশ ও IELTS",
      tagline: "আত্মবিশ্বাসের সাথে ইংরেজি বলুন আর IELTS-এর চারটি মডিউলের প্রস্তুতি নিন — পুরোপুরি অফলাইনে।",
      desc: "স্পোকেন ইংলিশের জন্য শব্দভান্ডার, গ্রামার, বাস্তব জীবনের ফ্রেজ ও ডায়ালগ, সাথে টাইমার ও ব্যান্ড অনুমানসহ IELTS স্পিকিং, রিডিং, লিসেনিং ও রাইটিং প্র্যাকটিস। বাংলায় ব্যাখ্যা, ফোনের নিজের ভয়েস, অ্যাকাউন্ট বা ইন্টারনেট লাগে না।",
      packSub: "অ্যান্ড্রয়েড অ্যাপ (APK) · আজীবন ব্যবহার",
      cardFacts: [["fa-solid fa-microphone-lines", "স্পোকেন ইংলিশ + IELTS-এর ৪ মডিউল"], ["fa-solid fa-language", "বাংলায় ব্যাখ্যা"], ["fa-solid fa-wifi", "অফলাইনে চলে, বিজ্ঞাপন নেই"]],
      how3: "পেমেন্টের পর হোয়াটসঅ্যাপ ও ইমেইলে APK ডাউনলোডের Google Drive লিংক পাঠানো হবে। যেকোনো অ্যান্ড্রয়েড ফোন বা ট্যাবে ইনস্টল করুন।",
      stats: [
        ["fa-solid fa-book", "৩৬০+", "A1 থেকে C1 পর্যন্ত শব্দ, বাংলা অর্থ ও ফ্ল্যাশকার্ডসহ"],
        ["fa-solid fa-spell-check", "৩৯", "গ্রামার ইউনিট, প্রায় ৩৬৬টি প্র্যাকটিস প্রশ্ন"],
        ["fa-solid fa-microphone", "৪৭", "IELTS স্পিকিং টপিক, কিউ কার্ড ও পার্ট ৩ সেট"],
        ["fa-solid fa-pen-nib", "১৮", "IELTS রাইটিং টাস্ক, আউটলাইন ও মডেল উত্তরসহ"],
        ["fa-solid fa-headphones", "১২", "টাইমারসহ IELTS রিডিং প্যাসেজ ও লিসেনিং রেকর্ডিং"],
        ["fa-solid fa-wifi", "অফলাইন", "অ্যাকাউন্ট বা ইন্টারনেট লাগে না, রেকর্ডিং ফোনেই থাকে"],
      ],
      pdfs: [],
      app: ["ইংলিশ বুস্টার (অ্যান্ড্রয়েড)", "এক অ্যাপে স্পোকেন ইংলিশ ও IELTS প্রস্তুতি: শব্দ ও গ্রামার শিখুন, বাস্তব কথোপকথন প্র্যাকটিস করুন, নিজের কণ্ঠ রেকর্ড করুন আর টাইমারসহ IELTS প্র্যাকটিস টেস্ট দিন।"],
      features: [
        ["fa-solid fa-layer-group", "শব্দভান্ডার ও ফ্ল্যাশকার্ড", "টপিক, ফ্রেজাল ভার্ব, ইডিয়ম ও IELTS একাডেমিক শব্দ, ফ্ল্যাশকার্ড ও ৪ ধরনের কুইজ।"],
        ["fa-solid fa-comment-dots", "ফ্রেজ ল্যাব", "১৬টি বাস্তব পরিস্থিতির দরকারি ফ্রেজ, বাংলাসহ; শুনুন, ধীরে শুনুন, নিজে রেকর্ড করুন।"],
        ["fa-solid fa-people-arrows", "ডায়ালগ", "১২টি কথোপকথন — ফোন আপনার সঙ্গীর কথা বলে, আপনি সঠিক উত্তর বেছে নেন।"],
        ["fa-solid fa-volume-high", "উচ্চারণ", "মিনিমাল পেয়ার, শব্দের স্ট্রেস আর বাংলাভাষীদের জন্য টিপস।"],
        ["fa-solid fa-user-tie", "IELTS স্পিকিং", "পার্ট ১–৩, ১ + ২ মিনিট টাইমারসহ কিউ কার্ড, মক ইন্টারভিউ ও সেলফ-রেটিং।"],
        ["fa-solid fa-book-open-reader", "IELTS রিডিং ও লিসেনিং", "সব ধরনের প্রশ্নসহ টাইমার দেওয়া প্যাসেজ ও দুই কণ্ঠের রেকর্ডিং।"],
        ["fa-solid fa-chart-column", "IELTS রাইটিং", "মডেল উত্তর ও স্ট্রাকচার চেকারসহ টাস্ক ১ চার্ট ও টাস্ক ২ রচনা।"],
        ["fa-solid fa-fire", "অগ্রগতি ও স্ট্রিক", "XP, লেভেল, দৈনিক লক্ষ্য, স্কিলভিত্তিক নির্ভুলতা ও ব্যান্ড অনুমান।"],
      ],
      course: "",
      courseMode: "",
      audience: ["বিদেশে পড়াশোনা বা চাকরির জন্য IELTS পরীক্ষার্থী", "স্পোকেন ইংলিশ উন্নত করতে চান এমন শিক্ষার্থী ও চাকরিপ্রার্থী", "যারা বাংলায় ব্যাখ্যা চান", "ইন্টারনেট ছাড়াই ইংরেজি প্র্যাকটিস করতে চান যারা"],
    },
  },
  {
    "id": "ats-cv-vault",
    "icon": "fa-solid fa-file-lines",
    "colors": [
      "#0F1E3A",
      "#1E3A5F"
    ],
    "cover": "assets/shop/ats-cv/cover.jpg",
    "gallery": [
      {
        "src": "assets/shop/ats-cv/01-senior-professional-sample.jpg",
        "en": "Sample CV — Senior professional",
        "bn": "নমুনা সিভি — সিনিয়র প্রফেশনাল"
      },
      {
        "src": "assets/shop/ats-cv/02-fresh-graduate-sample.jpg",
        "en": "Sample CV — Fresh graduate",
        "bn": "নমুনা সিভি — ফ্রেশ গ্র্যাজুয়েট"
      },
      {
        "src": "assets/shop/ats-cv/03-international-remote-sample.jpg",
        "en": "Sample CV — International / remote",
        "bn": "নমুনা সিভি — আন্তর্জাতিক / রিমোট"
      },
      {
        "src": "assets/shop/ats-cv/04-business-graduate-template.jpg",
        "en": "Blank template — Business graduate",
        "bn": "ফাঁকা টেমপ্লেট — বিজনেস গ্র্যাজুয়েট"
      },
      {
        "src": "assets/shop/ats-cv/05-mid-level-template.jpg",
        "en": "Blank template — Mid-level professional",
        "bn": "ফাঁকা টেমপ্লেট — মিড-লেভেল প্রফেশনাল"
      },
      {
        "src": "assets/shop/ats-cv/06-bangladesh-cover-letter.jpg",
        "en": "Cover letter — Bangladesh",
        "bn": "কভার লেটার — বাংলাদেশ"
      },
      {
        "src": "assets/shop/ats-cv/07-linkedin-outreach.jpg",
        "en": "LinkedIn outreach templates",
        "bn": "লিংকডইন আউটরিচ টেমপ্লেট"
      },
      {
        "src": "assets/shop/ats-cv/08-ats-master-guide.jpg",
        "en": "ATS Master Guide",
        "bn": "ATS মাস্টার গাইড"
      },
      {
        "src": "assets/shop/ats-cv/09-achievement-bullets.jpg",
        "en": "Achievement Bullet Library",
        "bn": "অ্যাচিভমেন্ট বুলেট লাইব্রেরি"
      },
      {
        "src": "assets/shop/ats-cv/10-customization-workbook.jpg",
        "en": "CV Customization Workbook",
        "bn": "সিভি কাস্টমাইজেশন ওয়ার্কবুক"
      },
      {
        "src": "assets/shop/ats-cv/11-interview-guide.jpg",
        "en": "Interview Preparation Guide",
        "bn": "ইন্টারভিউ প্রস্তুতি গাইড"
      },
      {
        "src": "assets/shop/ats-cv/12-ats-checklist.jpg",
        "en": "ATS Compatibility Checklist",
        "bn": "ATS কম্প্যাটিবিলিটি চেকলিস্ট"
      }
    ],
    "pack": {
      "price": 200,
      "originalPrice": 500
    },
    "combo": null,
    "en": {
      "title": "ATS CV & Career Success Vault",
      "tagline": "42 ready-to-use files: ATS-friendly CV templates, sample CVs, cover letters and career guides — for jobs in Bangladesh and abroad.",
      "desc": "Everything you need for a CV that gets past applicant tracking systems and impresses recruiters: 8 editable Word CV templates, 8 filled-in sample CVs, cover letters for Bangladesh and international jobs, LinkedIn and email templates, and step-by-step career guides.",
      "packSub": "42 files · Word, PDF & Excel · lifetime use",
      "heroMeta": [
        [
          "fa-solid fa-folder-open",
          "42 files"
        ],
        [
          "fa-solid fa-file-word",
          "Word, PDF & Excel"
        ],
        [
          "fa-solid fa-infinity",
          "Lifetime use"
        ]
      ],
      "cardFacts": [
        [
          "fa-solid fa-file-word",
          "8 ATS-friendly Word CV templates"
        ],
        [
          "fa-solid fa-user-check",
          "8 filled-in sample CVs"
        ],
        [
          "fa-solid fa-envelope-open-text",
          "Cover letters, LinkedIn & email templates"
        ]
      ],
      "how3": "After payment we send you a Google Drive link to download the full pack (ZIP) on WhatsApp and email. Open the files in Microsoft Word, Google Docs or any PDF reader.",
      "stats": [
        [
          "fa-solid fa-folder-open",
          "42",
          "Ready-to-use files in one organised pack"
        ],
        [
          "fa-solid fa-file-word",
          "8",
          "Blank CV templates, from internship to senior level"
        ],
        [
          "fa-solid fa-user-check",
          "8",
          "Filled-in sample CVs to learn from"
        ],
        [
          "fa-solid fa-envelope-open-text",
          "4",
          "Cover letter, LinkedIn and email template files"
        ],
        [
          "fa-solid fa-list-check",
          "180",
          "Achievement bullets across 15 industries"
        ],
        [
          "fa-solid fa-robot",
          "ATS",
          "Formatting that applicant tracking systems can read"
        ]
      ],
      "pdfsTitle": "Files in the pack",
      "pdfs": [
        "8 blank CV templates (Word): fresh graduate, internship, business graduate, entry-level technical, mid-level, senior, career transition and international / remote",
        "8 filled-in sample CVs (Word, with PDF previews)",
        "Cover letters for Bangladesh and international jobs",
        "LinkedIn outreach and professional email templates",
        "ATS Master Guide and ATS Compatibility Checklist",
        "Achievement Bullet, Action Verbs and Professional Summary libraries",
        "CV Customization Workbook",
        "Interview Preparation Guide and LinkedIn Optimization Guide",
        "Job Application Tracker (Excel)"
      ],
      "app": [],
      "features": [
        [
          "fa-solid fa-robot",
          "ATS-friendly design",
          "Clean single-column layouts, standard headings and fonts that applicant tracking systems read correctly."
        ],
        [
          "fa-solid fa-pen-to-square",
          "Easy to edit",
          "Replace the [BRACKETS] with your details in Word or Google Docs — no design skills needed."
        ],
        [
          "fa-solid fa-earth-asia",
          "Bangladesh & abroad",
          "Templates and cover letters for local employers and for international or remote roles."
        ],
        [
          "fa-solid fa-graduation-cap",
          "Every career stage",
          "From internships and fresh graduates to senior professionals and career changers."
        ],
        [
          "fa-solid fa-lightbulb",
          "Stronger content",
          "180 achievement bullets, action verbs and summaries show you what good looks like."
        ],
        [
          "fa-solid fa-briefcase",
          "Beyond the CV",
          "Interview preparation, LinkedIn optimisation and a tracker for your applications."
        ]
      ],
      "course": "",
      "courseMode": "",
      "audience": [
        "Fresh graduates and students applying for their first job",
        "Professionals aiming for a better role",
        "Job seekers applying abroad or for remote jobs",
        "Anyone whose CV isn't getting interview calls"
      ]
    },
    "bn": {
      "title": "ATS সিভি ও ক্যারিয়ার সাকসেস ভল্ট",
      "tagline": "৪২টি রেডি-টু-ইউজ ফাইল: ATS-ফ্রেন্ডলি সিভি টেমপ্লেট, নমুনা সিভি, কভার লেটার ও ক্যারিয়ার গাইড — দেশে ও বিদেশে চাকরির জন্য।",
      "desc": "এমন সিভি তৈরির জন্য যা লাগে সব, যা অ্যাপ্লিকেন্ট ট্র্যাকিং সিস্টেম পার হয়ে রিক্রুটারের নজর কাড়ে: ৮টি এডিটযোগ্য ওয়ার্ড সিভি টেমপ্লেট, ৮টি পূরণ করা নমুনা সিভি, বাংলাদেশ ও বিদেশের চাকরির কভার লেটার, লিংকডইন ও ইমেইল টেমপ্লেট, আর ধাপে ধাপে ক্যারিয়ার গাইড।",
      "packSub": "৪২টি ফাইল · ওয়ার্ড, PDF ও এক্সেল · আজীবন ব্যবহার",
      "heroMeta": [
        [
          "fa-solid fa-folder-open",
          "৪২টি ফাইল"
        ],
        [
          "fa-solid fa-file-word",
          "ওয়ার্ড, PDF ও এক্সেল"
        ],
        [
          "fa-solid fa-infinity",
          "আজীবন ব্যবহার"
        ]
      ],
      "cardFacts": [
        [
          "fa-solid fa-file-word",
          "৮টি ATS-ফ্রেন্ডলি ওয়ার্ড সিভি টেমপ্লেট"
        ],
        [
          "fa-solid fa-user-check",
          "৮টি পূরণ করা নমুনা সিভি"
        ],
        [
          "fa-solid fa-envelope-open-text",
          "কভার লেটার, লিংকডইন ও ইমেইল টেমপ্লেট"
        ]
      ],
      "how3": "পেমেন্টের পর হোয়াটসঅ্যাপ ও ইমেইলে পুরো প্যাক (ZIP) ডাউনলোডের Google Drive লিংক পাঠানো হবে। ফাইলগুলো Microsoft Word, Google Docs বা যেকোনো PDF রিডারে খুলুন।",
      "stats": [
        [
          "fa-solid fa-folder-open",
          "৪২",
          "একটি গোছানো প্যাকে রেডি-টু-ইউজ ফাইল"
        ],
        [
          "fa-solid fa-file-word",
          "৮",
          "ইন্টার্নশিপ থেকে সিনিয়র লেভেল পর্যন্ত ফাঁকা সিভি টেমপ্লেট"
        ],
        [
          "fa-solid fa-user-check",
          "৮",
          "দেখে শেখার জন্য পূরণ করা নমুনা সিভি"
        ],
        [
          "fa-solid fa-envelope-open-text",
          "৪",
          "কভার লেটার, লিংকডইন ও ইমেইল টেমপ্লেট ফাইল"
        ],
        [
          "fa-solid fa-list-check",
          "১৮০",
          "১৫টি ইন্ডাস্ট্রির অ্যাচিভমেন্ট বুলেট"
        ],
        [
          "fa-solid fa-robot",
          "ATS",
          "অ্যাপ্লিকেন্ট ট্র্যাকিং সিস্টেম পড়তে পারে এমন ফরম্যাট"
        ]
      ],
      "pdfsTitle": "প্যাকে যে ফাইলগুলো আছে",
      "pdfs": [
        "৮টি ফাঁকা সিভি টেমপ্লেট (ওয়ার্ড): ফ্রেশ গ্র্যাজুয়েট, ইন্টার্নশিপ, বিজনেস গ্র্যাজুয়েট, এন্ট্রি-লেভেল টেকনিক্যাল, মিড-লেভেল, সিনিয়র, ক্যারিয়ার পরিবর্তন ও আন্তর্জাতিক / রিমোট",
        "৮টি পূরণ করা নমুনা সিভি (ওয়ার্ড, PDF প্রিভিউসহ)",
        "বাংলাদেশ ও আন্তর্জাতিক চাকরির কভার লেটার",
        "লিংকডইন আউটরিচ ও প্রফেশনাল ইমেইল টেমপ্লেট",
        "ATS মাস্টার গাইড ও ATS কম্প্যাটিবিলিটি চেকলিস্ট",
        "অ্যাচিভমেন্ট বুলেট, অ্যাকশন ভার্ব ও প্রফেশনাল সামারি লাইব্রেরি",
        "সিভি কাস্টমাইজেশন ওয়ার্কবুক",
        "ইন্টারভিউ প্রস্তুতি গাইড ও লিংকডইন অপটিমাইজেশন গাইড",
        "জব অ্যাপ্লিকেশন ট্র্যাকার (এক্সেল)"
      ],
      "app": [],
      "features": [
        [
          "fa-solid fa-robot",
          "ATS-ফ্রেন্ডলি ডিজাইন",
          "এক কলামের পরিষ্কার লেআউট, স্ট্যান্ডার্ড হেডিং ও ফন্ট, যা অ্যাপ্লিকেন্ট ট্র্যাকিং সিস্টেম সঠিকভাবে পড়ে।"
        ],
        [
          "fa-solid fa-pen-to-square",
          "সহজে এডিট",
          "ওয়ার্ড বা Google Docs-এ [ব্র্যাকেট] এর জায়গায় নিজের তথ্য বসান — ডিজাইন জানার দরকার নেই।"
        ],
        [
          "fa-solid fa-earth-asia",
          "দেশে ও বিদেশে",
          "দেশের প্রতিষ্ঠান আর আন্তর্জাতিক বা রিমোট চাকরির জন্য টেমপ্লেট ও কভার লেটার।"
        ],
        [
          "fa-solid fa-graduation-cap",
          "ক্যারিয়ারের প্রতিটি ধাপে",
          "ইন্টার্নশিপ ও ফ্রেশ গ্র্যাজুয়েট থেকে সিনিয়র প্রফেশনাল ও ক্যারিয়ার পরিবর্তনকারী পর্যন্ত।"
        ],
        [
          "fa-solid fa-lightbulb",
          "আরও শক্তিশালী লেখা",
          "১৮০টি অ্যাচিভমেন্ট বুলেট, অ্যাকশন ভার্ব ও সামারি দেখায় ভালো সিভি কেমন হয়।"
        ],
        [
          "fa-solid fa-briefcase",
          "সিভির বাইরেও",
          "ইন্টারভিউ প্রস্তুতি, লিংকডইন অপটিমাইজেশন আর আবেদন সামলানোর ট্র্যাকার।"
        ]
      ],
      "course": "",
      "courseMode": "",
      "audience": [
        "প্রথম চাকরির জন্য আবেদন করা ফ্রেশ গ্র্যাজুয়েট ও শিক্ষার্থী",
        "আরও ভালো পদে যেতে চান এমন প্রফেশনাল",
        "বিদেশে বা রিমোট চাকরিতে আবেদনকারী",
        "যাদের সিভিতে ইন্টারভিউ কল আসছে না"
      ]
    }
  },
  {
    id: "fcommerce-business-toolkit",
    icon: "fa-solid fa-store",
    colors: ["#0B3B2E", "#0F5132"],
    cover: "assets/shop/fc-toolkit/cover.jpg",
    gallery: [
      { src: "assets/shop/fc-toolkit/01-tracker-dashboard.jpg", en: "Order & Inventory Tracker — dashboard (sample data)", bn: "অর্ডার ও ইনভেন্টরি ট্র্যাকার — ড্যাশবোর্ড (নমুনা ডেটা)" },
      { src: "assets/shop/fc-toolkit/02-tracker-orders.jpg", en: "Tracker — Orders sheet", bn: "ট্র্যাকার — অর্ডার শিট" },
      { src: "assets/shop/fc-toolkit/03-tracker-products.jpg", en: "Tracker — Products & stock sheet", bn: "ট্র্যাকার — পণ্য ও স্টক শিট" },
      { src: "assets/shop/fc-toolkit/04-social-square.jpg", en: "Social media — square posts (1080×1080)", bn: "সোশ্যাল মিডিয়া — স্কয়ার পোস্ট (১০৮০×১০৮০)" },
      { src: "assets/shop/fc-toolkit/05-social-portrait.jpg", en: "Social media — portrait posts (1080×1350)", bn: "সোশ্যাল মিডিয়া — পোর্ট্রেট পোস্ট (১০৮০×১৩৫০)" },
      { src: "assets/shop/fc-toolkit/06-social-story.jpg", en: "Social media — story / reel covers (1080×1920)", bn: "সোশ্যাল মিডিয়া — স্টোরি / রিল কভার (১০৮০×১৯২০)" },
      { src: "assets/shop/fc-toolkit/07-social-landscape.jpg", en: "Social media — Facebook landscape posts (1200×630)", bn: "সোশ্যাল মিডিয়া — ফেসবুক ল্যান্ডস্কেপ পোস্ট (১২০০×৬৩০)" },
      { src: "assets/shop/fc-toolkit/08-social-page-cover.jpg", en: "Social media — Facebook page covers (1640×624)", bn: "সোশ্যাল মিডিয়া — ফেসবুক পেজ কভার (১৬৪০×৬২৪)" },
      { src: "assets/shop/fc-toolkit/09-appointment-letter.jpg", en: "Appointment letter (Word)", bn: "নিয়োগপত্র (ওয়ার্ড)" },
      { src: "assets/shop/fc-toolkit/10-mutual-nda.jpg", en: "Mutual NDA (Word)", bn: "মিউচুয়াল NDA (ওয়ার্ড)" },
      { src: "assets/shop/fc-toolkit/11-freelance-agreement.jpg", en: "Freelance service agreement (Word)", bn: "ফ্রিল্যান্স সার্ভিস চুক্তি (ওয়ার্ড)" },
      { src: "assets/shop/fc-toolkit/12-invoice-generator.jpg", en: "Invoice generator (Excel)", bn: "ইনভয়েস জেনারেটর (এক্সেল)" },
    ],
    pack: { price: 200 },
    combo: null,
    en: {
      title: "F-Commerce & Small Business Toolkits",
      tagline: "3 toolkits in one pack: an order & inventory tracker, 46 Bangla & English social media designs, and business legal & HR templates.",
      desc: "Run your Facebook / Instagram shop and small business with ready-made files: an Excel tracker for orders, stock, couriers, COD and profit in Taka; 46 editable social media designs for sales, Eid and Pohela Boishakh; and editable appointment letter, NDA, freelance agreement and invoice templates.",
      packSub: "3 toolkits · Excel, PowerPoint & Word · lifetime use",
      heroMeta: [["fa-solid fa-layer-group", "3 toolkits"], ["fa-solid fa-file-excel", "Excel, PowerPoint & Word"], ["fa-solid fa-infinity", "Lifetime use"]],
      cardFacts: [
        ["fa-solid fa-chart-line", "Order, stock & profit tracker (Excel)"],
        ["fa-solid fa-hashtag", "46 Bangla & English social media designs"],
        ["fa-solid fa-file-signature", "Appointment letter, NDA, agreement & invoice"],
      ],
      how3: "After payment we send you a Google Drive link to download the three toolkits (ZIP) on WhatsApp and email. Open them in Microsoft Excel, PowerPoint and Word, or in Google Sheets, Slides and Docs.",
      stats: [
        ["fa-solid fa-layer-group", "3", "Toolkits in one pack"],
        ["fa-solid fa-table", "7", "Sheets in the order & inventory tracker"],
        ["fa-solid fa-hashtag", "46", "Editable social media designs"],
        ["fa-solid fa-ruler-combined", "5", "Post, story and cover sizes, set to exact pixels"],
        ["fa-solid fa-file-signature", "4", "Business, legal & HR templates"],
        ["fa-solid fa-language", "BN + EN", "Bangla and English versions"],
      ],
      pdfsTitle: "What's in the three toolkits",
      pdfs: [
        "F-Commerce Order & Inventory Tracker (Excel / Google Sheets): orders, stock, customers, couriers, COD, returns and net profit in Taka, with a dashboard and charts",
        "Low-stock alerts, courier performance, repeat-customer and return-risk flags",
        "Social Media Template Pack: 46 editable PowerPoint designs — sale, Eid, Pohela Boishakh, product showcase and free delivery, in Bangla and English",
        "Sizes: square post, portrait post, story / reel cover, Facebook landscape post and Facebook page cover, plus PNG previews of every design",
        "Business Legal & HR Kit (Word): appointment letter, mutual NDA, freelance service agreement with schedules, and a how-to guide",
        "Invoice generator (Excel): VAT, discount, advance, amount in words in Taka, PAID/DUE/OVERDUE status and an invoice log",
        "The legal templates are general templates, not legal advice — have a lawyer review them before anyone signs",
      ],
      app: [],
      features: [
        ["fa-solid fa-truck-fast", "Made for F-Commerce", "Track Pathao, Steadfast, RedX and other courier orders, COD and returns, and see your real profit."],
        ["fa-solid fa-calculator", "Automatic sums", "Type an order and the tracker works out totals, charges, profit and stock for you."],
        ["fa-solid fa-palette", "Ready-made designs", "Change the shop name, offer, price and photo, then export a PNG for Facebook or Instagram."],
        ["fa-solid fa-language", "Bangla & English", "Social posts in both languages and a Bangla quick guide for the tracker."],
        ["fa-solid fa-file-signature", "Business paperwork", "Editable letters, agreements and invoices for hiring staff and working with clients."],
        ["fa-solid fa-laptop", "Free tools work too", "Works in Excel, PowerPoint and Word, or free in Google Sheets, Slides and Docs."],
      ],
      course: "",
      courseMode: "",
      audience: [
        "Facebook and Instagram shop owners",
        "Small businesses, startups and agencies",
        "Freelancers who need agreements and invoices",
        "Anyone who wants to post better offers on social media",
      ],
    },
    bn: {
      title: "এফ-কমার্স ও স্মল বিজনেস টুলকিট",
      tagline: "এক প্যাকে ৩টি টুলকিট: অর্ডার ও ইনভেন্টরি ট্র্যাকার, বাংলা ও ইংরেজিতে ৪৬টি সোশ্যাল মিডিয়া ডিজাইন, আর বিজনেস লিগ্যাল ও এইচআর টেমপ্লেট।",
      desc: "রেডিমেড ফাইল দিয়ে আপনার ফেসবুক / ইনস্টাগ্রাম শপ ও ছোট ব্যবসা চালান: টাকায় অর্ডার, স্টক, কুরিয়ার, COD ও প্রফিট হিসাবের এক্সেল ট্র্যাকার; সেল, ঈদ ও পহেলা বৈশাখের ৪৬টি এডিটযোগ্য সোশ্যাল মিডিয়া ডিজাইন; আর এডিটযোগ্য নিয়োগপত্র, NDA, ফ্রিল্যান্স চুক্তি ও ইনভয়েস টেমপ্লেট।",
      packSub: "৩টি টুলকিট · এক্সেল, পাওয়ারপয়েন্ট ও ওয়ার্ড · আজীবন ব্যবহার",
      heroMeta: [["fa-solid fa-layer-group", "৩টি টুলকিট"], ["fa-solid fa-file-excel", "এক্সেল, পাওয়ারপয়েন্ট ও ওয়ার্ড"], ["fa-solid fa-infinity", "আজীবন ব্যবহার"]],
      cardFacts: [
        ["fa-solid fa-chart-line", "অর্ডার, স্টক ও প্রফিট ট্র্যাকার (এক্সেল)"],
        ["fa-solid fa-hashtag", "বাংলা ও ইংরেজিতে ৪৬টি সোশ্যাল মিডিয়া ডিজাইন"],
        ["fa-solid fa-file-signature", "নিয়োগপত্র, NDA, চুক্তি ও ইনভয়েস"],
      ],
      how3: "পেমেন্টের পর হোয়াটসঅ্যাপ ও ইমেইলে তিনটি টুলকিট (ZIP) ডাউনলোডের Google Drive লিংক পাঠানো হবে। Microsoft Excel, PowerPoint ও Word, অথবা Google Sheets, Slides ও Docs-এ খুলুন।",
      stats: [
        ["fa-solid fa-layer-group", "৩", "এক প্যাকে টুলকিট"],
        ["fa-solid fa-table", "৭", "অর্ডার ও ইনভেন্টরি ট্র্যাকারের শিট"],
        ["fa-solid fa-hashtag", "৪৬", "এডিটযোগ্য সোশ্যাল মিডিয়া ডিজাইন"],
        ["fa-solid fa-ruler-combined", "৫", "পোস্ট, স্টোরি ও কভারের সঠিক পিক্সেল সাইজ"],
        ["fa-solid fa-file-signature", "৪", "বিজনেস, লিগ্যাল ও এইচআর টেমপ্লেট"],
        ["fa-solid fa-language", "বাং + EN", "বাংলা ও ইংরেজি ভার্সন"],
      ],
      pdfsTitle: "তিনটি টুলকিটে যা আছে",
      pdfs: [
        "এফ-কমার্স অর্ডার ও ইনভেন্টরি ট্র্যাকার (এক্সেল / Google Sheets): টাকায় অর্ডার, স্টক, কাস্টমার, কুরিয়ার, COD, রিটার্ন ও নেট প্রফিট, ড্যাশবোর্ড ও চার্টসহ",
        "লো-স্টক অ্যালার্ট, কুরিয়ার পারফরম্যান্স, রিপিট কাস্টমার ও রিটার্ন-ঝুঁকির চিহ্ন",
        "সোশ্যাল মিডিয়া টেমপ্লেট প্যাক: ৪৬টি এডিটযোগ্য পাওয়ারপয়েন্ট ডিজাইন — সেল, ঈদ, পহেলা বৈশাখ, প্রোডাক্ট শোকেস ও ফ্রি ডেলিভারি, বাংলা ও ইংরেজিতে",
        "সাইজ: স্কয়ার পোস্ট, পোর্ট্রেট পোস্ট, স্টোরি / রিল কভার, ফেসবুক ল্যান্ডস্কেপ পোস্ট ও ফেসবুক পেজ কভার, প্রতিটি ডিজাইনের PNG প্রিভিউসহ",
        "বিজনেস লিগ্যাল ও এইচআর কিট (ওয়ার্ড): নিয়োগপত্র, মিউচুয়াল NDA, শিডিউলসহ ফ্রিল্যান্স সার্ভিস চুক্তি, আর ব্যবহারের গাইড",
        "ইনভয়েস জেনারেটর (এক্সেল): ভ্যাট, ডিসকাউন্ট, অ্যাডভান্স, কথায় টাকার অঙ্ক, PAID/DUE/OVERDUE স্ট্যাটাস ও ইনভয়েস লগ",
        "লিগ্যাল টেমপ্লেটগুলো সাধারণ টেমপ্লেট, আইনি পরামর্শ নয় — সই করার আগে আইনজীবীকে দিয়ে দেখিয়ে নিন",
      ],
      app: [],
      features: [
        ["fa-solid fa-truck-fast", "এফ-কমার্সের জন্য তৈরি", "Pathao, Steadfast, RedX সহ অন্যান্য কুরিয়ারের অর্ডার, COD ও রিটার্ন ট্র্যাক করুন, আসল প্রফিট দেখুন।"],
        ["fa-solid fa-calculator", "অটোমেটিক হিসাব", "অর্ডার লিখলেই ট্র্যাকার মোট টাকা, চার্জ, প্রফিট ও স্টক হিসাব করে দেয়।"],
        ["fa-solid fa-palette", "রেডিমেড ডিজাইন", "শপের নাম, অফার, দাম ও ছবি বদলে PNG এক্সপোর্ট করে ফেসবুক বা ইনস্টাগ্রামে দিন।"],
        ["fa-solid fa-language", "বাংলা ও ইংরেজি", "দুই ভাষাতেই সোশ্যাল পোস্ট, আর ট্র্যাকারের বাংলা কুইক গাইড।"],
        ["fa-solid fa-file-signature", "ব্যবসার কাগজপত্র", "কর্মী নিয়োগ ও ক্লায়েন্টের সাথে কাজের জন্য এডিটযোগ্য চিঠি, চুক্তি ও ইনভয়েস।"],
        ["fa-solid fa-laptop", "ফ্রি টুলেও চলে", "এক্সেল, পাওয়ারপয়েন্ট ও ওয়ার্ডে, অথবা বিনামূল্যে Google Sheets, Slides ও Docs-এ চলে।"],
      ],
      course: "",
      courseMode: "",
      audience: [
        "ফেসবুক ও ইনস্টাগ্রাম শপের মালিক",
        "ছোট ব্যবসা, স্টার্টআপ ও এজেন্সি",
        "চুক্তি ও ইনভয়েস দরকার এমন ফ্রিল্যান্সার",
        "সোশ্যাল মিডিয়ায় আরও সুন্দর অফার পোস্ট করতে চান যারা",
      ],
    },
  },
  {
    id: "cnf-backoffice-system",
    icon: "fa-solid fa-ship",
    colors: ["#0B2545", "#13315C"],
    cover: "assets/shop/cnf-backoffice/cover.jpg",
    gallery: [
      { src: "assets/shop/cnf-backoffice/01-input-form.jpg", en: "Input form, item table and duty calculation (sample data)", bn: "ইনপুট ফর্ম, আইটেম টেবিল ও শুল্ক হিসাব (নমুনা ডেটা)" },
      { src: "assets/shop/cnf-backoffice/02-shipment-tracker.jpg", en: "Shipment tracker with status and dashboard", bn: "স্ট্যাটাস ও ড্যাশবোর্ডসহ শিপমেন্ট ট্র্যাকার" },
      { src: "assets/shop/cnf-backoffice/03-discrepancy-check.jpg", en: "L/C discrepancy check and document checklist", bn: "এলসি ডিস্ক্রিপেন্সি চেক ও ডকুমেন্ট চেকলিস্ট" },
      { src: "assets/shop/cnf-backoffice/04-generated-documents.jpg", en: "Generated commercial invoice and the files it saves", bn: "তৈরি হওয়া কমার্শিয়াল ইনভয়েস ও সেভ হওয়া ফাইল" },
    ],
    pack: { price: 300, originalPrice: 1000 },
    combo: null,
    en: {
      title: "C&F Import-Export Back-Office System",
      tagline: "A Google Sheets system for C&F agents and importers: L/C documents in one click, customs duty estimates, discrepancy checks and shipment tracking.",
      desc: "Fill in one form per shipment and the system makes the Commercial Invoice, Packing List and Bill of Exchange as PDF, Google Doc and Excel, estimates CD, RD, SD, VAT, AIT and AT in Taka, checks the L/C for discrepancies, logs every shipment in a tracker and drafts your client emails. It runs free in your own Google account.",
      packSub: "Google Sheets + Apps Script · setup guide · lifetime use",
      heroMeta: [["fa-brands fa-google-drive", "Google Sheets, Docs & Drive"], ["fa-solid fa-wand-magic-sparkles", "No coding needed"], ["fa-solid fa-infinity", "Lifetime use"]],
      cardFacts: [
        ["fa-solid fa-file-invoice", "Invoice, packing list & bill of exchange in one click"],
        ["fa-solid fa-calculator", "Customs duty estimate: CD, RD, SD, VAT, AIT, AT"],
        ["fa-solid fa-list-check", "L/C discrepancy check & shipment tracker"],
      ],
      how3: "After payment we send you the script and the step-by-step setup guide on WhatsApp and email. Open a blank Google Sheet, paste the script, and click Setup: the tabs, templates and Drive folder are created for you in about a minute.",
      stats: [
        ["fa-solid fa-file-invoice", "3", "Documents made at once: invoice, packing list, bill of exchange"],
        ["fa-solid fa-table", "6", "Ready-made tabs, from input form to tracker"],
        ["fa-solid fa-percent", "6", "Duty and tax heads calculated: CD, RD, SD, VAT, AIT, AT"],
        ["fa-solid fa-envelope", "5", "Professional email templates"],
        ["fa-solid fa-scale-balanced", "UCP 600", "Rule-based L/C discrepancy checks"],
        ["fa-solid fa-clock", "1 min", "Automatic setup, no IDs to copy"],
      ],
      pdfsTitle: "What you get",
      pdfs: [
        "Apps Script for Google Sheets: one paste, then Setup builds the Input_Form, Shipment_Tracker, Email_Templates, HS_Codes, Doc_Check and Settings tabs",
        "Generate All Documents: Commercial Invoice, Packing List and Bill of Exchange (1st and 2nd) as PDF and Google Doc, plus an Excel workbook, saved in a Drive folder for each L/C",
        "Customs duty estimate per item: assessable value in Taka with CD, RD, SD, VAT, AIT and AT, and the total in words (lakh / crore)",
        "Find HS Code: search by product name; the rates fill in from the HS_Codes tab",
        "Discrepancy check: late shipment, L/C expiry, 21-day presentation period, invoice over the L/C amount, weights, missing HS code / IRC / BIN, plus a document checklist",
        "Shipment tracker with status (LC Opened → Delivered), last-updated time, Drive folder link and a dashboard",
        "5 email templates for the importer, duty payment, delivery update, bank and shipping line, with Gmail drafts and PDFs attached",
        "Setup guide in English with a Bangla summary",
        "Duty rates in HS_Codes are samples — check them against the current NBR tariff; the final duty is what Customs assesses",
      ],
      app: [],
      features: [
        ["fa-solid fa-bolt", "One click, three documents", "Type the shipment once; the invoice, packing list and bill of exchange are made and saved for you."],
        ["fa-solid fa-calculator", "Duty in Taka", "Assessable value and every tax head worked out per item, with the total in words."],
        ["fa-solid fa-shield-halved", "Fewer bank discrepancies", "Catch late dates, over-amounts and missing details before you present the documents."],
        ["fa-solid fa-route", "Every shipment in one place", "Track each L/C from opening to delivery and reload any old shipment."],
        ["fa-solid fa-envelope-open-text", "Emails in seconds", "Ready-to-send emails to clients, banks and shipping lines, with the PDFs attached."],
        ["fa-brands fa-google", "Free to run", "Works in your own free Google account. Your data stays in your Drive."],
      ],
      course: "",
      courseMode: "",
      audience: [
        "C&F agents and their back-office staff",
        "Importers and exporters handling L/C shipments",
        "Commercial and documentation officers",
        "Freelancers offering import-export back-office support",
      ],
    },
    bn: {
      title: "সিএন্ডএফ ইম্পোর্ট-এক্সপোর্ট ব্যাক-অফিস সিস্টেম",
      tagline: "সিএন্ডএফ এজেন্ট ও ইম্পোর্টারদের জন্য Google Sheets সিস্টেম: এক ক্লিকে এলসি ডকুমেন্ট, শুল্কের হিসাব, ডিস্ক্রিপেন্সি চেক আর শিপমেন্ট ট্র্যাকিং।",
      desc: "প্রতি শিপমেন্টে একটি ফর্ম পূরণ করুন, সিস্টেম কমার্শিয়াল ইনভয়েস, প্যাকিং লিস্ট ও বিল অব এক্সচেঞ্জ PDF, Google Doc ও এক্সেলে তৈরি করবে, টাকায় CD, RD, SD, VAT, AIT ও AT হিসাব করবে, এলসির গরমিল ধরবে, প্রতিটি শিপমেন্ট ট্র্যাকারে রাখবে আর ক্লায়েন্টের ইমেইল লিখে দেবে। আপনার নিজের Google অ্যাকাউন্টে বিনা খরচে চলে।",
      packSub: "Google Sheets + Apps Script · সেটআপ গাইড · আজীবন ব্যবহার",
      heroMeta: [["fa-brands fa-google-drive", "Google Sheets, Docs ও Drive"], ["fa-solid fa-wand-magic-sparkles", "কোডিং জানার দরকার নেই"], ["fa-solid fa-infinity", "আজীবন ব্যবহার"]],
      cardFacts: [
        ["fa-solid fa-file-invoice", "এক ক্লিকে ইনভয়েস, প্যাকিং লিস্ট ও বিল অব এক্সচেঞ্জ"],
        ["fa-solid fa-calculator", "শুল্কের হিসাব: CD, RD, SD, VAT, AIT, AT"],
        ["fa-solid fa-list-check", "এলসি ডিস্ক্রিপেন্সি চেক ও শিপমেন্ট ট্র্যাকার"],
      ],
      how3: "পেমেন্টের পর হোয়াটসঅ্যাপ ও ইমেইলে স্ক্রিপ্ট আর ধাপে ধাপে সেটআপ গাইড পাঠানো হবে। একটি ফাঁকা Google Sheet খুলে স্ক্রিপ্ট পেস্ট করুন, তারপর Setup চাপুন: প্রায় এক মিনিটে সব ট্যাব, টেমপ্লেট ও ড্রাইভ ফোল্ডার তৈরি হয়ে যাবে।",
      stats: [
        ["fa-solid fa-file-invoice", "৩", "একসাথে তৈরি ডকুমেন্ট: ইনভয়েস, প্যাকিং লিস্ট, বিল অব এক্সচেঞ্জ"],
        ["fa-solid fa-table", "৬", "ইনপুট ফর্ম থেকে ট্র্যাকার পর্যন্ত রেডিমেড ট্যাব"],
        ["fa-solid fa-percent", "৬", "শুল্ক ও করের খাত: CD, RD, SD, VAT, AIT, AT"],
        ["fa-solid fa-envelope", "৫", "প্রফেশনাল ইমেইল টেমপ্লেট"],
        ["fa-solid fa-scale-balanced", "UCP 600", "নিয়মভিত্তিক এলসি ডিস্ক্রিপেন্সি চেক"],
        ["fa-solid fa-clock", "১ মিনিট", "অটোমেটিক সেটআপ, কোনো ID কপি করতে হয় না"],
      ],
      pdfsTitle: "যা পাবেন",
      pdfs: [
        "Google Sheets-এর Apps Script: একবার পেস্ট করে Setup চাপলেই Input_Form, Shipment_Tracker, Email_Templates, HS_Codes, Doc_Check ও Settings ট্যাব তৈরি হয়",
        "Generate All Documents: কমার্শিয়াল ইনভয়েস, প্যাকিং লিস্ট ও বিল অব এক্সচেঞ্জ (১ম ও ২য় কপি) PDF ও Google Doc-এ, সাথে এক্সেল ওয়ার্কবুক, প্রতিটি এলসির আলাদা ড্রাইভ ফোল্ডারে",
        "প্রতি আইটেমে শুল্কের হিসাব: টাকায় অ্যাসেসেবল ভ্যালু, CD, RD, SD, VAT, AIT ও AT, আর কথায় মোট অঙ্ক (লাখ / কোটি)",
        "Find HS Code: পণ্যের নাম লিখে খুঁজুন; HS_Codes ট্যাব থেকে রেট নিজে বসে যায়",
        "ডিস্ক্রিপেন্সি চেক: দেরিতে শিপমেন্ট, এলসির মেয়াদ, ২১ দিনের প্রেজেন্টেশন সময়, এলসির চেয়ে বেশি ইনভয়েস, ওজন, HS কোড / IRC / BIN না থাকা, সাথে ডকুমেন্ট চেকলিস্ট",
        "স্ট্যাটাস (LC Opened → Delivered), শেষ আপডেটের সময়, ড্রাইভ ফোল্ডার লিংক ও ড্যাশবোর্ডসহ শিপমেন্ট ট্র্যাকার",
        "ইম্পোর্টার, শুল্ক পরিশোধ, ডেলিভারি আপডেট, ব্যাংক ও শিপিং লাইনের জন্য ৫টি ইমেইল টেমপ্লেট, PDF সংযুক্ত Gmail ড্রাফটসহ",
        "ইংরেজি সেটআপ গাইড, বাংলা সংক্ষেপসহ",
        "HS_Codes-এর শুল্ক হার নমুনা মাত্র — বর্তমান NBR ট্যারিফের সাথে মিলিয়ে নিন; চূড়ান্ত শুল্ক কাস্টমস যা নির্ধারণ করে তা-ই",
      ],
      app: [],
      features: [
        ["fa-solid fa-bolt", "এক ক্লিকে তিন ডকুমেন্ট", "শিপমেন্টের তথ্য একবার লিখুন; ইনভয়েস, প্যাকিং লিস্ট ও বিল অব এক্সচেঞ্জ তৈরি ও সেভ হয়ে যাবে।"],
        ["fa-solid fa-calculator", "টাকায় শুল্ক", "প্রতি আইটেমে অ্যাসেসেবল ভ্যালু ও প্রতিটি করের হিসাব, কথায় মোট অঙ্কসহ।"],
        ["fa-solid fa-shield-halved", "ব্যাংকে কম গরমিল", "ডকুমেন্ট জমার আগেই ভুল তারিখ, বেশি অঙ্ক বা বাদ পড়া তথ্য ধরুন।"],
        ["fa-solid fa-route", "সব শিপমেন্ট এক জায়গায়", "এলসি খোলা থেকে ডেলিভারি পর্যন্ত ট্র্যাক করুন, পুরনো যেকোনো শিপমেন্ট আবার খুলুন।"],
        ["fa-solid fa-envelope-open-text", "মুহূর্তেই ইমেইল", "ক্লায়েন্ট, ব্যাংক ও শিপিং লাইনের জন্য রেডি ইমেইল, PDF সংযুক্তসহ।"],
        ["fa-brands fa-google", "বিনা খরচে চলে", "আপনার নিজের ফ্রি Google অ্যাকাউন্টে চলে। ডেটা থাকে আপনার ড্রাইভে।"],
      ],
      course: "",
      courseMode: "",
      audience: [
        "সিএন্ডএফ এজেন্ট ও তাদের ব্যাক-অফিস কর্মী",
        "এলসি শিপমেন্ট সামলান এমন ইম্পোর্টার ও এক্সপোর্টার",
        "কমার্শিয়াল ও ডকুমেন্টেশন অফিসার",
        "ইম্পোর্ট-এক্সপোর্ট ব্যাক-অফিস সাপোর্ট দেন এমন ফ্রিল্যান্সার",
      ],
    },
  },
];

const KHOOZO_PRODUCTS_I18N = {
  en: {
    "navbar.products": "Digital Products",
    "dp.eyebrow": "Khoozo Digital Products",
    "dp.h": "Guides, apps, software and courses",
    "dp.p": "Download practical PDF guides and practice apps, get ready-made software for your business, or take a combo with a live course. Pay with bKash or card.",
    "dp.tab.all": "All", "dp.tab.products": "Digital products", "dp.tab.software": "Software",
    "dp.software": "Software", "dp.askprice": "Ask for price", "dp.freeapp": "Free app", "dp.price": "Price",
    "dp.custom.badge": "Custom software", "dp.custom.h": "Need software made for you?",
    "dp.custom.p": "We build any software, or customise our ready-made software to fit your needs and your business.",
    "dp.custom.pt1": "Web, mobile and desktop apps", "dp.custom.pt2": "Changes to fit how you work", "dp.custom.pt3": "Free consultation and quote",
    "dp.custom.wa": "Chat on WhatsApp", "dp.custom.quote": "Get a free quote",
    "dp.custom.msg": "Hi Khoozo, I need custom software for my business.",
    "dp.pdfs": "{n} PDF guides", "dp.app": "Mobile app", "dp.courseopt": "Optional live course",
    "dp.from": "From", "dp.view": "View details", "dp.back": "All digital products",
    "dp.inside": "What's inside", "dp.preview": "Preview", "dp.preview.hint": "Tap a page to see it larger", "dp.features": "Features you'll love", "dp.pdfs.h": "PDF guides", "dp.app.h": "Mobile app",
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
    "dp.h": "গাইড, অ্যাপ, সফটওয়্যার ও কোর্স",
    "dp.p": "কাজের PDF গাইড ও প্র্যাকটিস অ্যাপ ডাউনলোড করুন, ব্যবসার জন্য রেডিমেড সফটওয়্যার নিন, অথবা লাইভ কোর্সসহ কম্বো নিন। বিকাশ বা কার্ডে পেমেন্ট।",
    "dp.tab.all": "সব", "dp.tab.products": "ডিজিটাল পণ্য", "dp.tab.software": "সফটওয়্যার",
    "dp.software": "সফটওয়্যার", "dp.askprice": "দাম জানতে যোগাযোগ করুন", "dp.freeapp": "ফ্রি অ্যাপ", "dp.price": "দাম",
    "dp.custom.badge": "কাস্টম সফটওয়্যার", "dp.custom.h": "আপনার জন্য আলাদা সফটওয়্যার দরকার?",
    "dp.custom.p": "আমরা যেকোনো সফটওয়্যার তৈরি করি, অথবা আপনার প্রয়োজন ও ব্যবসা অনুযায়ী আমাদের রেডিমেড সফটওয়্যার কাস্টমাইজ করে দিই।",
    "dp.custom.pt1": "ওয়েব, মোবাইল ও ডেস্কটপ অ্যাপ", "dp.custom.pt2": "আপনার কাজের ধরন অনুযায়ী পরিবর্তন", "dp.custom.pt3": "ফ্রি পরামর্শ ও কোটেশন",
    "dp.custom.wa": "হোয়াটসঅ্যাপে কথা বলুন", "dp.custom.quote": "ফ্রি কোটেশন নিন",
    "dp.custom.msg": "হ্যালো খুঁজো, আমার ব্যবসার জন্য কাস্টম সফটওয়্যার দরকার।",
    "dp.pdfs": "{n}টি PDF গাইড", "dp.app": "মোবাইল অ্যাপ", "dp.courseopt": "চাইলে লাইভ কোর্স",
    "dp.from": "শুরু", "dp.view": "বিস্তারিত দেখুন", "dp.back": "সব ডিজিটাল পণ্য",
    "dp.inside": "যা পাচ্ছেন", "dp.preview": "প্রিভিউ", "dp.preview.hint": "বড় করে দেখতে পাতায় ট্যাপ করুন", "dp.features": "যে ফিচারগুলো আপনার ভালো লাগবে", "dp.pdfs.h": "PDF গাইড", "dp.app.h": "মোবাইল অ্যাপ",
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
  const hasOff = (o) => o && o.originalPrice > o.price;

  const favBtn = (id, extra) => (window.KhoozoFav ? window.KhoozoFav.button(id, extra) : "");

  function card(p) {
    const k = p[lang()];
    return `
      <a class="dp-card" href="product.html?id=${p.id}" style="${grad(p)}">
        <div class="dp-card-head${p.cover ? " has-cover" : ""}"${p.cover ? ` style="--cover:url('${new URL(p.cover, location.href).href}')"` : ""}>
          <span class="dp-card-icon"><i class="${p.icon}" aria-hidden="true"></i></span>
          ${favBtn(p.id)}
          ${hasOff(p.pack) ? `<span class="dp-card-off">${digits(offPct(p.pack))}% ${lang() === "bn" ? "ছাড়" : "off"}</span>` : ""}
          <h3>${esc(k.title)}</h3>
        </div>
        <div class="dp-card-body">
          <p>${esc(k.tagline)}</p>
          <ul class="dp-card-facts">
            ${(k.cardFacts || []).map(([ic, x]) => `<li><i class="${esc(ic)}" aria-hidden="true"></i>${esc(x)}</li>`).join("")}
            ${k.cardFacts ? "" : k.pdfs.length ? `<li><i class="fa-solid fa-file-pdf" aria-hidden="true"></i>${t("dp.pdfs", { n: digits(k.pdfs.length) })}</li>` : ""}
            ${k.cardFacts ? "" : k.app.length ? `<li><i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>${t("dp.app")}</li>` : ""}
            ${k.cardFacts ? "" : k.course ? `<li><i class="fa-solid fa-chalkboard-user" aria-hidden="true"></i>${t("dp.courseopt")}</li>` : ""}
          </ul>
          <div class="dp-card-foot">
            <div><small>${t("dp.from")}</small><b>${taka(p.pack.price)}</b>${hasOff(p.pack) ? `<s>${taka(p.pack.originalPrice)}</s>` : ""}</div>
            <div class="dp-card-actions">
              <button type="button" class="dp-add-btn" data-add-to-cart="${p.id}" data-cart-plan="pack" title="${t("cart.addtocart")}" aria-label="${t("cart.addtocart")}"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i></button>
              <span class="tr-link">${t("dp.view")} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
            </div>
          </div>
        </div>
      </a>`;
  }

  /* Software in the Shop: every IT project (KHOOZO_IT_PROJECTS from
     js/projects-data.js, or the admin catalog's IT_PROJECT rows) gets a card
     that opens its project page. A price shows when the admin sets one. */
  const SOFTWARE_COLORS = [["#0F172A", "#1E40AF"], ["#7A1012", "#C01417"], ["#064E3B", "#0E7490"], ["#4C1D95", "#9D174D"], ["#1E293B", "#B45309"]];
  const it = (key, fallback) => {
    const dict = typeof KHOOZO_I18N_DICT !== "undefined" ? KHOOZO_I18N_DICT : null;
    return (dict && ((dict[lang()] && dict[lang()][key]) || (dict.en && dict.en[key]))) || fallback || "";
  };

  function softwareCard([id, p], i) {
    const [c1, c2] = SOFTWARE_COLORS[i % SOFTWARE_COLORS.length];
    const title = it(p.titleKey, id);
    const blurb = it(p.cardKey || p.descKey, "");
    const price = p.playStore ? `<b class="dp-card-free">${t("dp.freeapp")}</b>`
      : p.price != null ? `<small>${t("dp.price")}</small><b>${taka(p.price)}</b>${p.originalPrice > p.price ? `<s>${taka(p.originalPrice)}</s>` : ""}`
      : `<b class="dp-card-ask">${t("dp.askprice")}</b>`;
    return `
      <a class="dp-card dp-card-software" href="project.html?id=${encodeURIComponent(id)}" style="--dp1:${c1};--dp2:${c2}">
        <div class="dp-card-head">
          <span class="dp-card-icon"><i class="${esc(p.icon || "fa-solid fa-laptop-code")}" aria-hidden="true"></i></span>
          ${favBtn("project:" + id)}
          <span class="dp-card-off">${t("dp.software")}</span>
          <h3>${esc(title)}</h3>
        </div>
        <div class="dp-card-body">
          <p>${esc(blurb)}</p>
          <ul class="dp-card-facts">${(p.tech || []).slice(0, 3).map((x) =>
            `<li><i class="fa-solid ${/flutter|app/i.test(x) ? "fa-mobile-screen-button" : "fa-code"}" aria-hidden="true"></i>${esc(x)}</li>`).join("")}</ul>
          <div class="dp-card-foot">
            <div>${price}</div>
            <div class="dp-card-actions"><span class="tr-link">${t("dp.view")} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span></div>
          </div>
        </div>
      </a>`;
  }

  /* Closing card of the software list: we build or customise software on request. */
  function customCard() {
    const wa = `https://wa.me/8801818120900?text=${encodeURIComponent(t("dp.custom.msg"))}`;
    return `
      <div class="dp-card dp-card-custom">
        <div class="dp-card-head">
          <span class="dp-card-icon"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></span>
          <span class="dp-card-off">${t("dp.custom.badge")}</span>
          <h3>${t("dp.custom.h")}</h3>
        </div>
        <div class="dp-card-body">
          <p>${t("dp.custom.p")}</p>
          <ul class="dp-card-facts">
            <li><i class="fa-solid fa-laptop-code" aria-hidden="true"></i>${t("dp.custom.pt1")}</li>
            <li><i class="fa-solid fa-sliders" aria-hidden="true"></i>${t("dp.custom.pt2")}</li>
            <li><i class="fa-solid fa-comments" aria-hidden="true"></i>${t("dp.custom.pt3")}</li>
          </ul>
          <div class="dp-custom-actions">
            <a class="btn btn-primary btn-sm" href="${wa}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> ${t("dp.custom.wa")}</a>
            <a class="btn btn-outline btn-sm" href="#contact" data-custom-quote>${t("dp.custom.quote")}</a>
          </div>
        </div>
      </div>`;
  }

  /* (The cover URL is made absolute: a relative url() inside a CSS variable
     would resolve against css/products.css, not the page.) */
  /* ---------------- index.html#products ---------------- */
  let shopTab = "all";
  function renderGrid() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    const software = typeof KHOOZO_IT_PROJECTS !== "undefined" ? Object.entries(KHOOZO_IT_PROJECTS) : [];
    let tabs = document.getElementById("shopTabs");
    if (!tabs && software.length) {
      tabs = document.createElement("div");
      tabs.id = "shopTabs";
      tabs.className = "dp-tabs";
      tabs.setAttribute("role", "tablist");
      grid.before(tabs);
      tabs.addEventListener("click", (e) => {
        const b = e.target.closest("[data-shop-tab]");
        if (!b) return;
        shopTab = b.getAttribute("data-shop-tab");
        renderGrid();
      });
    }
    if (tabs) {
      tabs.innerHTML = [["all", KHOOZO_PRODUCTS.length + software.length], ["products", KHOOZO_PRODUCTS.length], ["software", software.length]]
        .map(([id, n]) => `<button type="button" role="tab" class="dp-tab${shopTab === id ? " is-active" : ""}" aria-selected="${shopTab === id}" data-shop-tab="${id}">${t("dp.tab." + id)} <span>${digits(n)}</span></button>`).join("");
    }
    grid.innerHTML = (shopTab !== "software" ? KHOOZO_PRODUCTS.map(card).join("") : "")
      + (shopTab !== "products" ? software.map(softwareCard).join("") + customCard() : "");
    /* "Get a free quote" pre-selects Custom software in the contact form. */
    grid.querySelectorAll("[data-custom-quote]").forEach((a) => a.addEventListener("click", () => {
      const select = document.getElementById("f-service");
      if (select) { select.value = "Custom software"; select.dispatchEvent(new Event("change")); }
    }));
    if (window.KhoozoCart) window.KhoozoCart.wireAddButtons(grid);
    if (window.KhoozoFav) window.KhoozoFav.sync();
  }

  /* Page previews: a large viewer plus thumbnails. Works with the built-in
     gallery ({src, en, bn}) and with plain image URLs from the admin catalog.
     The inner .catalog-gallery class stops catalog.js adding a second strip. */
  function preview(p) {
    const items = (p.gallery || []).map((g) => (typeof g === "string" ? { src: g } : g));
    if (p.cover) items.unshift({ src: p.cover, en: p.en.title, bn: p.bn.title });
    if (!items.length) return "";
    const cap = (g) => esc(g[lang()] || g.en || "");
    return `<div class="tr-panel dp-preview">
      <h2>${t("dp.preview")}</h2>
      <figure class="dp-preview-main"><img id="dpPreviewImg" src="${esc(items[0].src)}" alt="${cap(items[0])}"><figcaption id="dpPreviewCap">${cap(items[0])}</figcaption></figure>
      <p class="dp-muted dp-preview-hint">${t("dp.preview.hint")}</p>
      <div class="catalog-gallery dp-preview-thumbs">${items.map((g, i) =>
        `<button type="button" class="${i ? "" : "is-active"}" data-preview="${esc(g.src)}" data-caption="${cap(g)}" aria-label="${cap(g)}"><img src="${esc(g.src)}" alt="" loading="lazy"></button>`).join("")}</div>
    </div>`;
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
    const save = course && p.combo ? p.pack.price + course.price - p.combo.price : 0;
    if (!p.combo) plan = "pack";
    document.title = `${k.title} | Khoozo Digital Products`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", k.tagline);

    const option = (id, title, sub, o, extra) => `
      <button type="button" class="dp-plan${plan === id ? " is-active" : ""}" data-plan="${id}" role="radio" aria-checked="${plan === id}">
        <span class="radio"></span>
        <span class="dp-plan-text"><b>${title}</b><small>${sub}</small>${extra || ""}</span>
        <span class="dp-plan-price"><b>${taka(o.price)}</b>${hasOff(o) ? `<s>${taka(o.originalPrice)}</s>` : ""}</span>
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
          ${k.heroMeta ? k.heroMeta.map(([ic, x]) => `<span><i class="${esc(ic)}" aria-hidden="true"></i>${esc(x)}</span>`).join("") : `
          ${k.pdfs.length ? `<span><i class="fa-solid fa-file-pdf" aria-hidden="true"></i>${t("dp.pdfs", { n: digits(k.pdfs.length) })}</span>` : ""}
          ${k.app.length ? `<span><i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>${t("dp.app")}</span>` : ""}
          ${k.course ? `<span><i class="fa-solid fa-chalkboard-user" aria-hidden="true"></i>${t("dp.courseopt")}</span>` : ""}`}
        </div>
        ${k.stats ? `<div class="dp-stats">${k.stats.map(([ic, n, x]) => `<div class="dp-stat"><i class="${esc(ic)}" aria-hidden="true"></i><b>${esc(n)}</b><span>${esc(x)}</span></div>`).join("")}</div>` : ""}
      </div>
    </section>
    <section class="section" style="padding-top:48px">
      <div class="container tr-layout dp-layout">
        <div>
${preview(p)}
${k.pdfs.length || k.app.length ? `
          <div class="tr-panel">
            <h2>${t("dp.inside")}</h2>
            ${k.pdfs.length ? `<h3 class="dp-sub"><i class="fa-solid ${k.pdfsTitle ? "fa-folder-open" : "fa-file-pdf"}" aria-hidden="true"></i> ${k.pdfsTitle ? esc(k.pdfsTitle) : t("dp.pdfs.h")}</h3>
            <ul class="tr-checks">${k.pdfs.map((x) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i>${esc(x)}</li>`).join("")}</ul>` : ""}
            ${k.app.length ? `<h3 class="dp-sub"><i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i> ${t("dp.app.h")}</h3>
            <div class="dp-app" style="${grad(p)}">
              <span class="dp-app-icon"><i class="${p.icon}" aria-hidden="true"></i></span>
              <div><b>${esc(k.app[0] || "")}</b><p>${esc(k.app[1] || "")}</p></div>
            </div>` : ""}
            ${k.features && k.features.length ? `<h3 class="dp-sub"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> ${t("dp.features")}</h3>
            <div class="dp-features" style="${grad(p)}">${k.features.map(([ic, h, x]) => `<div class="dp-feature"><span><i class="${esc(ic)}" aria-hidden="true"></i></span><div><b>${esc(h)}</b><p>${esc(x)}</p></div></div>`).join("")}</div>` : ""}
          </div>
` : ""}
${k.course && p.course ? `
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
` : ""}
          <div class="tr-panel">
            <h2>${t("dp.for")}</h2>
            <ul class="tr-checks">${k.audience.map((x) => `<li><i class="fa-solid fa-user-check" aria-hidden="true"></i>${esc(x)}</li>`).join("")}</ul>
          </div>
          <div class="tr-panel">
            <h2>${t("dp.how")}</h2>
            <ol class="dp-steps">${["dp.how1", "dp.how2", "dp.how3"].map((s, i) => `<li><span>${digits(i + 1)}</span>${s === "dp.how3" && k.how3 ? esc(k.how3) : t(s)}</li>`).join("")}</ol>
          </div>
        </div>
        <aside class="tr-panel tr-buy dp-buy">
          <div class="tr-buy-top">
            <h3 class="dp-buy-h">${t("dp.plan")}</h3>
            <div class="dp-plans" role="radiogroup">
              ${option("pack", t("dp.pack"), k.packSub ? esc(k.packSub) : t("dp.pack.sub"), p.pack)}
              ${p.combo ? option("combo", t("dp.combo"), t("dp.combo.sub"), p.combo, `<em class="dp-best">${t("dp.best")}${save > 0 ? " · " + t("dp.save", { amount: taka(save) }) : ""}</em>`) : ""}
            </div>
            <div class="tr-buy-price">
              <span class="tr-price">${taka(chosen.price)}</span>
              ${hasOff(chosen) ? `<span class="tr-price-old" style="margin:0 0 6px">${taka(chosen.originalPrice)}</span>
              <span class="tr-off">${digits(offPct(chosen))}% ${lang() === "bn" ? "ছাড়" : "off"}</span>` : ""}
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
              ${favBtn(p.id, "dp-fav-inline")}
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

    root.querySelectorAll("[data-preview]").forEach((b) =>
      b.addEventListener("click", () => {
        const img = document.getElementById("dpPreviewImg");
        img.src = b.getAttribute("data-preview");
        img.alt = b.getAttribute("data-caption");
        document.getElementById("dpPreviewCap").textContent = b.getAttribute("data-caption");
        root.querySelectorAll("[data-preview]").forEach((x) => x.classList.toggle("is-active", x === b));
      }),
    );
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
