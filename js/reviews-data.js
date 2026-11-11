/* ================================================================
   Khoozo — js/reviews-data.js
   Real customer reviews shown in the homepage "What our clients say"
   section and in the small review pop-up. Reviews from the admin app
   (api.khoozo.com) are added after these when the API is live.

   ONLY ADD REAL REVIEWS — copied from a customer's Facebook comment,
   Facebook page review, WhatsApp message or Google review, with their
   permission. Never write reviews yourself: fake reviews mislead
   customers and break consumer-protection rules and Facebook/Google
   policies.

   How to add one:
   1. (Optional) save a screenshot of the comment/message, crop out the
      phone number and anything private, and put it in assets/reviews/.
   2. Copy the block below, fill it in, and paste it inside the list.

   {
     customerName: "Rafiul Islam",          // as shown on Facebook / WhatsApp; first name + initial is fine
     rating: 5,                              // 1–5 (use 5 if they didn't give stars but were clearly happy)
     source: "FACEBOOK",                     // FACEBOOK, WHATSAPP or GOOGLE
     textBn: "পেমেন্টের সাথে সাথেই ফাইল পেয়ে গেছি।",   // their words, in the language they wrote
     textEn: "",                             // optional translation
     serviceEn: "ATS CV & Career Success Vault",          // what they bought or used
     serviceBn: "ATS সিভি ও ক্যারিয়ার সাকসেস ভল্ট",
     image: "assets/reviews/rafiul-facebook.jpg",          // optional screenshot
     date: "2026-11-10",                     // when they wrote it
   },
   ================================================================ */
"use strict";

const KHOOZO_REVIEWS = [
  // Paste real reviews here.
];
