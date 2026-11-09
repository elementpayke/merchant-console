// Ports the design's state machine (.design/logic.raw.js) into lib/logic.js.
//
// The design script is kept verbatim apart from asset URLs, which are rewritten
// to local /public routes. Every rewrite is asserted so a format change in a
// future design export fails loudly instead of silently shipping broken images.
//
// Run: node scripts/port-logic.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, ".design/logic.raw.js");
const DEST = path.join(ROOT, "lib/logic.js");

if (!fs.existsSync(SRC)) {
  console.error("missing .design/logic.raw.js — run scripts/extract-design.mjs first");
  process.exit(1);
}

let s = fs.readFileSync(SRC, "utf8");
const fail = [];
const count = (re) => (s.match(re) || []).length;
const check = (label, before, min = 1) => {
  const n = before - count.last;
  console.log(`  ${n >= min ? "ok  " : "FAIL"} ${label}: ${n} replaced`);
  if (n < min) fail.push(label);
};

console.log("=== rewrites ===");

// The design bundles only ke/tz/ug/ng locally; route every flag through our
// helper so anything we actually ship resolves from /public.
const FLAG_RE = /^const FLAG = c => .*$/m;
if (!FLAG_RE.test(s)) fail.push("FLAG const not found");
s = s.replace(FLAG_RE, 'const FLAG = c => "display: block; flex-shrink: 0; width: 20px; height: 14px; border-radius: 2px; background: center/cover no-repeat url(" + EP_FLAG_URL(c) + ")";');
console.log("  ok   FLAG const routed through EP_FLAG_URL");

let b = count(/flagcdn\.com/g);
s = s.replace(/https:\/\/flagcdn\.com\/w80\/" \+ ([\s\S]*?) \+ "\.png/g, '" + EP_FLAG_URL($1) + "');
count.last = count(/flagcdn\.com/g); check("flagcdn interpolations", b);

b = count(/public\/elementpay-logo\.png/g);
s = s.replace(/public\/elementpay-logo\.png/g, "/elementpay-logo.png");
count.last = count(/public\/elementpay-logo\.png/g); check("logo path", b);

b = count(/public\/chain-/g);
s = s.replace(/public\/chain-/g, "/chains/chain-");
count.last = count(/public\/chain-/g); check("chain paths", b);

b = count(/public\/brand-/g);
s = s.replace(/public\/brand-/g, "/brand/brand-");
count.last = count(/public\/brand-/g); check("brand paths", b, 0);

b = count(/public\/flag-/g);
s = s.replace(/public\/flag-([a-z]{2})\.svg/g, "/flags/flag-$1.svg");
count.last = count(/public\/flag-/g); check("stray flag paths", b, 0);

const leftover = [...new Set(s.match(/"public\/[^"]*"/g) || [])];
if (leftover.length) { console.error("  FAIL leftover public/ refs:", leftover); fail.push("leftover public/"); }

// DEVIATION FROM THE DESIGN: its COUNTRIES list omits six of the nine home
// markets, so onboarding's country search can't find them ("Kenya" -> "No
// country matches that search") and the "Local rails" group lists 3 of 9.
// Re-insert them in alphabetical position. Self-healing: once the design is
// fixed upstream this adds nothing and reports "none".
const HOME_MARKETS = [["GH", "Ghana"], ["KE", "Kenya"], ["NG", "Nigeria"], ["RW", "Rwanda"], ["TZ", "Tanzania"], ["UG", "Uganda"]];
const cm = /^const COUNTRIES = "([^"]+)"/m.exec(s);
if (!cm) {
  fail.push("COUNTRIES const not found");
} else {
  const entries = cm[1].split("|");
  const added = [];
  for (const [cc, name] of HOME_MARKETS) {
    if (entries.some((e) => e.slice(0, 2) === cc)) continue;
    const at = entries.findIndex((e) => e.slice(3).localeCompare(name) > 0);
    entries.splice(at === -1 ? entries.length : at, 0, `${cc} ${name}`);
    added.push(cc);
  }
  if (added.length) s = s.replace(cm[0], `const COUNTRIES = "${entries.join("|")}"`);
  console.log(`  ok   COUNTRIES home markets: ${added.length ? "re-added " + added.join(" ") : "none missing (design fixed upstream)"}`);
}

// Flags shipped under public/flags. The design's picker can surface any ISO
// country, so unbundled codes fall back to flagcdn.
const LOCAL = fs.readdirSync(path.join(ROOT, "public/flags"))
  .map((f) => f.replace(/^flag-|\.svg$/g, ""))
  .filter((c) => /^[a-z]{2}$/.test(c))
  .sort();

const HEADER = `/* Ported from the Claude Design project "Dev console redesign kickoff"
   (artboard: ElementPay Merchant V3). Verbatim apart from asset URLs.
   Regenerate with scripts/port-logic.mjs — do not edit by hand. */
/* eslint-disable */
// @ts-nocheck
import React from "react";
const DCLogic = React.Component;

/* Flags bundled under /public/flags; the design's country picker can surface
   any ISO country, so unbundled codes fall back to flagcdn. */
const EP_LOCAL_FLAGS = new Set(${JSON.stringify(LOCAL)});
const EP_FLAG_URL = (c) => {
  const k = String(c == null ? "" : c).toLowerCase();
  return EP_LOCAL_FLAGS.has(k) ? "/flags/flag-" + k + ".svg" : "https://flagcdn.com/w80/" + k + ".png";
};
`;

if (fail.length) { console.error("\nABORTED — failed rewrites:", fail); process.exit(1); }

fs.writeFileSync(DEST, HEADER + s.trimEnd() + "\n\nexport default Component;\n");
console.log("\nbundled flags:", LOCAL.join(" "));
console.log("wrote lib/logic.js", fs.statSync(DEST).size, "bytes");
