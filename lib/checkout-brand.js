/* Checkout market registry and brand marks.
   Mirrors "Methods by country" and "Brand kit" in the hosted-checkout design
   flow (v1, Nov 2026).

   Two things live here so the checkout component stays presentational:

   1. MARKETS — dial prefix, wallets, bank rail label and which tab leads, per
      country. The backend still decides what is *payable* (the `methods`
      catalog derived from `accepts`); this only supplies the local labelling
      the design calls for. A market listed here that the backend does not
      advertise is never shown.

   2. BRAND — how each wallet is drawn. Where an official SVG exists under
      /public/methods it is used as supplied, on a white tile, never
      recoloured (brand-kit rule). Everything else renders a typographic chip
      in the brand's colour, which is what the design deck itself uses as a
      stand-in. `official: false` marks the ones still waiting on files from
      the brand owner — see "Logo files we need" in the deck. Swapping one in
      is a one-line change here, no component edits. */

export const DEFAULT_COUNTRY = "KE";

/* Wallet marks. `src` wins when present; otherwise the chip is drawn from
   `label` + `bg`/`fg`. Colours are each brand's own, used only as a holding
   pattern until the official file lands. */
export const BRAND = {
  mpesa: { name: "M-Pesa", src: "/methods/method-mpesa.svg", official: false, bg: "#ffffff", fg: "#19a84c" },
  airtel: { name: "Airtel Money", label: "airtel", bg: "#ffffff", fg: "#e8192c", official: false },
  mtn: { name: "MTN MoMo", label: "MoMo", bg: "#ffcb05", fg: "#1a1a1a", official: false },
  orange: { name: "Orange Money", label: "Orange", bg: "#ff7900", fg: "#ffffff", official: false },
  wave: { name: "Wave", label: "wave", bg: "#1ed6f5", fg: "#0a2540", official: false },
  moov: { name: "Moov Money", label: "Moov", bg: "#ffffff", fg: "#f58220", official: false },
  mixx: { name: "Mixx by Yas", label: "MIXX", bg: "#ffd100", fg: "#1a1a1a", official: false },
  halopesa: { name: "Halopesa", label: "halopesa", bg: "#ffffff", fg: "#e2231a", official: false },
  opay: { name: "OPay", label: "OPay", bg: "#1dd3a7", fg: "#0a2540", official: false },
  palmpay: { name: "PalmPay", label: "palm", bg: "#7b3fe4", fg: "#ffffff", official: false },
  momopsb: { name: "MoMo PSB", label: "MoMo", bg: "#ffcb05", fg: "#1a1a1a", official: false },
  telecel: { name: "Telecel Cash", label: "telecel", bg: "#ffffff", fg: "#e2231a", official: false },
  atmoney: { name: "AT Money", label: "at", bg: "#ffffff", fg: "#e2231a", official: false },
  payshap: { name: "PayShap", label: "PayShap", bg: "#5b2d8e", fg: "#ffffff", official: false },
  capitec: { name: "Capitec Pay", label: "Capitec", bg: "#0a4d9c", fg: "#ffffff", official: false },
  tnm: { name: "TNM Mpamba", label: "tnm", bg: "#ffffff", fg: "#6cb33f", official: false },
};

/* Crypto networks offered in every market (deck p7). Chain icons under
   /public/chains are network marks, not wallet brands. */
export const NETWORKS = [
  { chain: "stellar", asset: "USDC", label: "USDC", sub: "Stellar" },
  { chain: "base", asset: "USDC", label: "USDC", sub: "Base" },
  { chain: "polygon", asset: "USDC", label: "USDC", sub: "Polygon" },
  { chain: "ethereum", asset: "USDC", label: "USDC", sub: "Ethereum" },
  { chain: "arbitrum", asset: "USDC", label: "USDC", sub: "Arbitrum" },
  { chain: "optimism", asset: "USDC", label: "USDC", sub: "Optimism" },
  { chain: "arc", asset: "USDC", label: "USDC", sub: "Arc" },
];

export const MARKETS = {
  KE: { name: "Kenya", currency: "KES", dial: "+254", wallets: ["mpesa", "airtel"], bankRail: "PesaLink", lead: "mobile_money" },
  TZ: { name: "Tanzania", currency: "TZS", dial: "+255", wallets: ["mpesa", "mixx", "airtel", "halopesa"], bankRail: "TIPS", lead: "mobile_money" },
  NG: { name: "Nigeria", currency: "NGN", dial: "+234", wallets: ["opay", "palmpay", "momopsb"], bankRail: "NIP", lead: "bank_transfer" },
  UG: { name: "Uganda", currency: "UGX", dial: "+256", wallets: ["mtn", "airtel"], bankRail: "Bank EFT", lead: "mobile_money" },
  CI: { name: "Côte d'Ivoire", currency: "XOF", dial: "+225", wallets: ["wave", "orange", "mtn", "moov"], bankRail: "GIM-UEMOA", lead: "mobile_money" },
  CM: { name: "Cameroon", currency: "XAF", dial: "+237", wallets: ["mtn", "orange"], bankRail: "GIMAC", lead: "mobile_money" },
  GH: { name: "Ghana", currency: "GHS", dial: "+233", wallets: ["mtn", "telecel", "atmoney"], bankRail: "GhIPSS", lead: "mobile_money" },
  RW: { name: "Rwanda", currency: "RWF", dial: "+250", wallets: ["mtn", "airtel"], bankRail: "RIPPS", lead: "mobile_money" },
  ZA: { name: "South Africa", currency: "ZAR", dial: "+27", wallets: ["payshap", "capitec"], bankRail: "PayShap", lead: "mobile_money" },
  MW: { name: "Malawi", currency: "MWK", dial: "+265", wallets: ["airtel", "tnm"], bankRail: "RTGS", lead: "mobile_money" },
  ZM: { name: "Zambia", currency: "ZMW", dial: "+260", wallets: ["mtn", "airtel"], bankRail: "RTGS", lead: "mobile_money" },
  BW: { name: "Botswana", currency: "BWP", dial: "+267", wallets: ["orange", "mtn"], bankRail: "RTGS", lead: "mobile_money" },
  SN: { name: "Senegal", currency: "XOF", dial: "+221", wallets: ["wave", "orange", "mtn"], bankRail: "GIM-UEMOA", lead: "mobile_money" },
  TG: { name: "Togo", currency: "XOF", dial: "+228", wallets: ["moov", "mtn"], bankRail: "GIM-UEMOA", lead: "mobile_money" },
  BJ: { name: "Benin", currency: "XOF", dial: "+229", wallets: ["mtn", "moov"], bankRail: "GIM-UEMOA", lead: "mobile_money" },
};

/* IANA zone → country. Timezone is the most reliable signal that costs
   nothing: no permission prompt, no IP lookup, no third-party request, and it
   is already resolved by the browser. navigator.language backs it up. */
const TZ_COUNTRY = {
  "Africa/Nairobi": "KE", "Africa/Dar_es_Salaam": "TZ", "Africa/Kampala": "UG",
  "Africa/Kigali": "RW", "Africa/Lagos": "NG", "Africa/Accra": "GH",
  "Africa/Abidjan": "CI", "Africa/Douala": "CM", "Africa/Johannesburg": "ZA",
  "Africa/Blantyre": "MW", "Africa/Lusaka": "ZM", "Africa/Gaborone": "BW",
  "Africa/Dakar": "SN", "Africa/Lome": "TG", "Africa/Porto-Novo": "BJ",
  "Africa/Mogadishu": "KE", "Africa/Addis_Ababa": "KE",
};

/**
 * Best guess at the payer's market, constrained to what this link accepts.
 *
 * Order: timezone, then locale region, then the link's own lead market, then
 * the first country offered. Never throws and never blocks — a wrong guess
 * costs one tap on the country pill, so it must not cost a permission prompt
 * or a network round-trip.
 */
export function detectCountry(available) {
  const allowed = Array.isArray(available) && available.length ? available : null;
  const ok = (code) => code && (!allowed || allowed.indexOf(code) >= 0) && code;

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const byZone = ok(TZ_COUNTRY[tz]);
    if (byZone) return byZone;
  } catch (e) { /* older browser — fall through */ }

  try {
    const langs = [].concat(navigator.languages || [], [navigator.language || ""]);
    for (const tag of langs) {
      const m = String(tag).match(/[-_]([A-Za-z]{2})$/);
      const byLocale = m && ok(m[1].toUpperCase());
      if (byLocale) return byLocale;
    }
  } catch (e) { /* no navigator — fall through */ }

  return (allowed && allowed[0]) || DEFAULT_COUNTRY;
}

export const market = (code) => MARKETS[String(code || "").toUpperCase()] || null;
export const dialFor = (code) => (market(code) || {}).dial || "";
export const flagSrc = (code) => "/flags/flag-" + String(code || "").toLowerCase() + ".svg";
export const chainSrc = (chain) => "/chains/chain-" + String(chain || "").toLowerCase() + ".svg";

/** Strip the dial prefix and separators; returns E.164 without the leading +. */
export function composeMsisdn(country, local) {
  const dial = dialFor(country).replace("+", "");
  const digits = String(local || "").replace(/\D/g, "").replace(/^0+/, "");
  if (!dial || !digits) return "";
  return digits.indexOf(dial) === 0 ? digits : dial + digits;
}
