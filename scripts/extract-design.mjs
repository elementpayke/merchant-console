// Unpacks a Claude Design "saved page" export into the raw design source.
//
// The browser-saved .html wraps the real .dc.html in a __bundler/template JSON
// string and replaces every asset reference with an opaque UUID. This restores
// both, mapping UUIDs back to the design's own public/ names by content hash.
//
// Run: node scripts/extract-design.mjs "<saved page>.html"
// Out: .design/{design.dc.html, logic.raw.js, style<n>.css, props.json, assets/}
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";

const SRC = process.argv[2];
if (!SRC) { console.error("usage: node scripts/extract-design.mjs <saved-page.html>"); process.exit(1); }

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, ".design");
const ASSETS = path.join(OUT, "assets");
fs.mkdirSync(ASSETS, { recursive: true });

const lines = fs.readFileSync(SRC, "utf8").split("\n");
const block = (type) => {
  const i = lines.findIndex((l) => l.includes(`<script type="__bundler/${type}">`));
  if (i === -1) throw new Error(`not a Claude Design saved page (missing __bundler/${type})`);
  return lines[i + 1];
};

const manifest = JSON.parse(block("manifest"));
let template = JSON.parse(block("template"));

const EXT = {
  "image/png": "png", "image/jpeg": "jpg", "image/svg+xml": "svg", "image/gif": "gif",
  "image/webp": "webp", "image/x-icon": "ico", "font/woff2": "woff2", "font/woff": "woff",
  "font/ttf": "ttf", "application/javascript": "js", "text/javascript": "js",
  "text/css": "css", "text/html": "html", "application/json": "json",
};

// Index committed public/ assets by content hash so UUIDs can be resolved.
const md5 = (b) => crypto.createHash("md5").update(b).digest("hex");
const byHash = new Map();
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else byHash.set(md5(fs.readFileSync(p)), path.basename(p));
  }
})(PUBLIC);

let fonts = 0;
console.log("=== assets ===");
for (const [uuid, e] of Object.entries(manifest)) {
  let buf = Buffer.from(e.data, "base64");
  if (e.compressed) {
    try { buf = zlib.gunzipSync(buf); }
    catch { try { buf = zlib.inflateSync(buf); } catch { buf = zlib.inflateRawSync(buf); } }
  }
  fs.writeFileSync(path.join(ASSETS, `${uuid}.${EXT[e.mime] || "bin"}`), buf);
  if (e.mime.startsWith("font/")) { fonts++; continue; }

  const hit = byHash.get(md5(buf));
  if (hit && template.includes(uuid)) {
    const n = (template.match(new RegExp(uuid, "g")) || []).length;
    template = template.split(uuid).join("public/" + hit);
    console.log(`  ${uuid} -> public/${hit} (${n} refs)`);
  }
}
console.log(`  ${fonts} fonts unpacked (unused — fonts load from the Google Fonts CDN)`);

// Anything still UUID-referenced in the markup would render as a broken image.
const markup = template.slice(template.indexOf("<x-dc>"), template.indexOf("</x-dc>"));
const stray = [...new Set(markup.match(/(?:src|href)="[0-9a-f-]{36}"/g) || [])];
if (stray.length) { console.error("  UNRESOLVED asset refs:", stray.join(", ")); process.exitCode = 1; }
else console.log("  no unresolved asset refs");

fs.writeFileSync(path.join(OUT, "design.dc.html"), template);

// --- split out the logic script, its default props, and the style blocks ---
const dec = (x) => x.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");

const lm = /<script([^>]*data-dc-script[^>]*)>([\s\S]*?)<\/script>/.exec(template);
if (!lm) throw new Error("design logic script not found");
fs.writeFileSync(path.join(OUT, "logic.raw.js"), lm[2]);

const pm = /data-props="([^"]*)"/.exec(lm[1]);
if (pm) fs.writeFileSync(path.join(OUT, "props.json"), JSON.stringify(JSON.parse(dec(pm[1])), null, 2));

const re = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m, i = 0;
while ((m = re.exec(template))) fs.writeFileSync(path.join(OUT, `style${++i}.css`), m[1]);

console.log(`\ndesign.dc.html ${template.length} B | logic.raw.js ${lm[2].length} B | ${i} style blocks`);
console.log("next: node scripts/port-logic.mjs && node scripts/transpile.mjs .design/design.dc.html");
