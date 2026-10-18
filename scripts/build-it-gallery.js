#!/usr/bin/env node
/*
 * Scans assets/it/<project-id>/ for screenshots and writes assets/it/gallery.json,
 * which js/main.js loads at runtime to populate each IT project's "View Details"
 * screenshot slider.
 *
 * Usage: drop screenshots into assets/it/<project-id>/ (project ids match the
 * IT_PROJECTS keys in js/main.js, e.g. dorkari, office, realestate-saas,
 * travel-saas) then run:
 *
 *   node scripts/build-it-gallery.js
 *
 * and commit the updated assets/it/gallery.json along with the images.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IT_DIR = path.join(ROOT, "assets", "it");
const OUT_FILE = path.join(IT_DIR, "gallery.json");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function titleCase(id) {
  return id.replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function toAlt(filename, projectId) {
  const base = filename.replace(path.extname(filename), "");
  const words = base
    .replace(/^\d+[-_]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  const label = words ? words.replace(/\b\w/g, c => c.toUpperCase()) : "Screenshot";
  return `${titleCase(projectId)} — ${label}`;
}

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

const gallery = {};

for (const entry of fs.readdirSync(IT_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const projectId = entry.name;
  const dir = path.join(IT_DIR, projectId);
  const files = fs
    .readdirSync(dir)
    .filter(f => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort(naturalSort);

  gallery[projectId] = files.map(f => ({
    src: `assets/it/${projectId}/${f}`.replace(/\\/g, "/"),
    alt: toAlt(f, projectId)
  }));
}

fs.writeFileSync(OUT_FILE, JSON.stringify(gallery, null, 2) + "\n");

for (const [id, images] of Object.entries(gallery)) {
  console.log(`${id}: ${images.length} screenshot${images.length === 1 ? "" : "s"}`);
}
console.log(`\nWrote ${path.relative(ROOT, OUT_FILE)}`);
