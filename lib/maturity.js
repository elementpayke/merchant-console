/* Live / Pilot / Roadmap tags for currencies and corridors, from one map instead of scattered "KES ? Live : Pilot" checks. */
// @ts-nocheck

const DEFAULTS = { KES: "Live" };
const TAGS = ["Live", "Pilot", "Roadmap"];
const FROM_API = { live: "Live", pilot: "Pilot", roadmap: "Roadmap" };

let MAP = Object.assign({}, DEFAULTS);

function normalise(value) {
  const v = String(value || "").trim().toLowerCase();
  return FROM_API[v] || null;
}

/* Optional build-time override, e.g. NEXT_PUBLIC_CATALOG_MATURITY='{"NGN":"Live","EUR":"Roadmap"}' */
(function loadEnvOverride() {
  try {
    const raw = typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_CATALOG_MATURITY;
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data && typeof data === "object" && !Array.isArray(data)) {
      Object.keys(data).forEach(k => { const t = normalise(data[k]); if (t) MAP[String(k).toUpperCase()] = t; });
    }
  } catch (e) {
    /* a bad override must never break the console; defaults stay */
  }
})();

/** Tag for a currency code: "Live" | "Pilot" | "Roadmap". Unknown currencies are "Pilot". */
export function maturityTag(currency) {
  const t = MAP[String(currency || "").toUpperCase()];
  return TAGS.includes(t) ? t : "Pilot";
}

/** A corridor is Live only when its home currency is Live and the base corridor was Live. */
export function corridorTag(homeCurrency, baseTag) {
  return maturityTag(homeCurrency) === "Live" && baseTag === "Live" ? "Live" : "Pilot";
}

/** " · Pilot" style suffix; empty for Live so the common case stays clean. */
export function maturitySuffix(currency) {
  const t = maturityTag(currency);
  return t === "Live" ? "" : " · " + t;
}

/**
 * Feed the backend catalog (`GET /partner/catalog`) into the map once the console is wired:
 * rows carry `maturity: "live" | "pilot" | "roadmap"` per country (keyed by currency here).
 */
export function applyCatalogMaturity(payload) {
  const next = Object.assign({}, DEFAULTS);
  const visit = countries => {
    if (!countries || typeof countries !== "object") return;
    Object.keys(countries).forEach(cc => {
      const row = countries[cc] || {};
      const t = normalise(row.maturity);
      if (t && row.currency) next[String(row.currency).toUpperCase()] = t;
    });
  };
  if (payload && typeof payload === "object") {
    visit(payload.onramp && payload.onramp.countries);
    visit(payload.offramp && payload.offramp.countries);
    const bank = payload.international_bank && payload.international_bank.currencies;
    if (bank && typeof bank === "object") {
      Object.keys(bank).forEach(cur => { const t = normalise((bank[cur] || {}).maturity); if (t) next[cur.toUpperCase()] = t; });
    }
  }
  MAP = next;
  return Object.assign({}, MAP);
}

export function _resetMaturityForTests() {
  MAP = Object.assign({}, DEFAULTS);
}
