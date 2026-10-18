# Khoozo — Website

A premium, single-page consultancy website for **Khoozo**
(IT & Software · Travel & Student Visa · Real Estate · Business Consultancy),
built with pure HTML5, CSS3 and vanilla JavaScript — no frameworks, no build
step, no backend. Designed to be hosted directly on **GitHub Pages**.

---

## 🗂 Project structure

```
/
├── index.html          Main single-page site
├── 404.html             Branded "page not found" fallback
├── manifest.json        Web app manifest (PWA metadata)
├── robots.txt            Search-engine crawl rules
├── sitemap.xml           Sitemap for search engines
├── README.md             This file
│
├── css/
│   ├── style.css         Design tokens, typography, all component styles, dark mode
│   ├── responsive.css    Tablet & mobile breakpoint overrides
│   └── animation.css     Keyframes, scroll reveal, cursor, preloader, reduced-motion
│
├── js/
│   ├── main.js           Nav, scrollspy, theme toggle, back-to-top, contact form
│   └── animation.js      Preloader, scroll reveal, counters, typing effect, cursor
│
├── images/               (empty — add real photography here)
├── icons/
│   └── favicon.svg       Brand monogram favicon (SVG, scalable)
└── assets/               (empty — add any additional media here)
```

---

## 🚀 Deploying to GitHub Pages

1. Create a new repository (e.g. `khoozo` for a project site).
2. Push all files in this folder to the repository root.
3. In **Settings → Pages**, set the source branch (usually `main`) and folder
   (`/root`).
4. Your site will be live at `https://mahbub06ru4.github.io/khoozo/`.

No build step, no `npm install`, no server — just static files.

---

## 🖼 Adding IT project screenshots

Each IT project's "View Details" popup shows a screenshot slider, generated
from whatever files sit in `assets/it/<project-id>/`. Project ids: `khoozo`,
`dorkari`, `office`, `realestate-saas`, `travel-saas`, `fintrack`.

1. Drop screenshots (`.png`/`.jpg`/`.jpeg`/`.webp`) into the matching
   `assets/it/<project-id>/` folder — any filenames work, they sort naturally.
2. Rebuild the manifest: `node scripts/build-it-gallery.js`
3. Commit `assets/it/gallery.json` along with the new images, and push.

No HTML/JS editing needed — `js/main.js` loads `assets/it/gallery.json` at
runtime, so the slider picks up whatever the script finds.

---

## ✏️ Things to customize before launch

These are placeholder values used to complete the design — **replace them
with real information before publishing:**

| Item | Location | Notes |
|---|---|---|
| Testimonials | `index.html` → `#testimonials` | Currently generic placeholder quotes labeled "Client Testimonial" — swap in real client feedback |
| Team/company photos | `index.html` → `.chairman-avatar` | Currently an initials placeholder (`MR`) — replace with a real `<img>` if you have a photo |
| Social links | Header, footer, Chairman section | Facebook is linked to `khoozo`. Update LinkedIn and GitHub to your real profile URLs |
| WhatsApp / Messenger links | Footer, floating action buttons | WhatsApp is linked to `+8801818120900`. Update `m.me/` with your real Messenger username |
| Google Maps embeds | Projects section, Contact section | Currently placeholder `<div>`s — replace with a real `<iframe>` using your Google Maps "Embed a map" URL |
| OG image | `<meta property="og:image">` in `<head>` | Points to `images/og-image.jpg`, which doesn't exist yet — add a 1200×630 social preview image |
| Domain in meta tags | `<head>` (`canonical`, `og:url`, JSON-LD, sitemap.xml, robots.txt) | Currently `https://mahbub06ru4.github.io/khoozo/` — update if you use a custom domain |
| Statistics | Hero stats, Counter section | Currently illustrative figures (150+ projects, 320+ clients, etc.) — replace with your real numbers |

---

## 🎨 Design system reference

All design tokens live at the top of `css/style.css` as CSS custom
properties on `:root` (and overridden under `[data-theme="dark"]` for dark
mode). Key tokens:

- **Colors:** `--navy` (#0A3D91), `--green` (#26A65B), plus soft tints and
  dark-mode equivalents
- **Type:** `--font-display` (Fraunces), `--font-body` (Inter),
  `--font-mono` (IBM Plex Mono, used for stats/data)
- **Radius/shadow/motion:** `--radius`, `--shadow-md`, `--ease`, etc.

Changing a brand color, font, or corner radius sitewide only requires
editing the relevant variable once.

---

## ♿ Accessibility & performance notes

- Skip-to-content link, visible focus rings, and semantic landmarks throughout
- All decorative SVGs/icons marked `aria-hidden="true"`; interactive icons have `aria-label`s
- Full `prefers-reduced-motion` support — disables the orbit animation, floating shapes, plane path, preloader animation, and scroll-reveal transitions for users who've requested reduced motion
- Custom cursor only activates on fine-pointer (mouse/trackpad) devices — automatically disabled on touch
- No external dependencies besides Google Fonts and Font Awesome (both CDN-hosted, both optional to swap for self-hosted versions if you want a fully offline-capable build)

---

## 📬 Contact form behavior

This is a fully static site with **no backend and no database**, as
specified. The contact form validates input in the browser, then opens the
visitor's email client with a pre-filled message via a `mailto:` link.

The current recipient is `mahbub06ru4@gmail.com`. If you'd prefer true in-page submission (no email client popup), swap the
`mailto:` logic in `js/main.js` (see the comment above the `form.addEventListener("submit", ...)` block) for a `fetch()` POST to a form backend
service such as Formspree, Getform, or a custom serverless function.

---

© 2026 Khoozo. Built with pure HTML5, CSS3 & vanilla JavaScript.
# khoozo
