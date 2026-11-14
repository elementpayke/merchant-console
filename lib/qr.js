/* Local QR rendering. No third-party service ever sees a merchant's payment link. */
// @ts-nocheck
import qrcode from "qrcode-generator";

const CACHE = new Map();
const CACHE_LIMIT = 64;

/**
 * Render `text` as an SVG data URL.
 *
 * @param {string} text        The payload (a URL in our case).
 * @param {object} [opts]
 * @param {number} [opts.size=360]     Rendered edge in CSS px (the SVG scales anyway).
 * @param {string} [opts.color="#1b1650"] Module colour (brand indigo).
 * @param {number} [opts.margin=0]     Quiet zone in modules. 0 matches the poster design.
 * @param {"L"|"M"|"Q"|"H"} [opts.ecc="M"]
 */
export function qrDataUrl(text, opts = {}) {
  const size = Number(opts.size) > 0 ? Number(opts.size) : 360;
  const color = typeof opts.color === "string" && /^#[0-9a-fA-F]{3,8}$/.test(opts.color) ? opts.color : "#1b1650";
  const margin = Number.isFinite(opts.margin) ? Math.max(0, Math.floor(opts.margin)) : 0;
  const ecc = ["L", "M", "Q", "H"].includes(opts.ecc) ? opts.ecc : "M";
  const payload = String(text || "");
  const key = [payload, size, color, margin, ecc].join("\u0000");
  const hit = CACHE.get(key);
  if (hit) return hit;

  // Version 0 lets the library pick the smallest version that fits.
  const qr = qrcode(0, ecc);
  qr.addData(payload, "Byte");
  qr.make();
  const n = qr.getModuleCount();
  const total = n + margin * 2;
  let path = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) path += `M${c + margin} ${r + margin}h1v1h-1z`;
    }
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${size}" height="${size}" shape-rendering="crispEdges" role="img" aria-label="QR code">` +
    `<rect width="${total}" height="${total}" fill="#ffffff"/>` +
    `<path d="${path}" fill="${color}"/></svg>`;
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  if (CACHE.size >= CACHE_LIMIT) CACHE.delete(CACHE.keys().next().value);
  CACHE.set(key, url);
  return url;
}
