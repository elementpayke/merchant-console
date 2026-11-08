// Node check for the local QR renderer: run with `npm run check`.
import assert from "node:assert/strict";
import { qrDataUrl } from "../lib/qr.js";

const link = "https://pay.elementpay.net/acme/4163131";
const url = qrDataUrl(link, { size: 360 });
assert.ok(url.startsWith("data:image/svg+xml;charset=utf-8,"), "svg data url");
const svg = decodeURIComponent(url.slice("data:image/svg+xml;charset=utf-8,".length));
assert.ok(svg.includes('width="360"') && svg.includes('height="360"'), "requested size");
assert.ok(svg.includes('fill="#1b1650"'), "brand colour by default");
assert.ok(/<path d="M\d+ \d+h1v1h-1z/.test(svg), "modules rendered as path");
assert.ok(!svg.includes("<script"), "no script in svg");
assert.equal(qrDataUrl(link, { size: 360 }), url, "cached and deterministic");
assert.notEqual(qrDataUrl(link + "x", { size: 360 }), url, "payload changes output");
const small = qrDataUrl("A", { size: 100, color: "#000", margin: 4, ecc: "H" });
assert.ok(small.includes("viewBox%3D%220%200%2029%2029%22") || decodeURIComponent(small).includes('viewBox="0 0 29 29"'), "version 1 + quiet zone = 29 modules");
assert.ok(decodeURIComponent(qrDataUrl("x", { color: "javascript:alert(1)" })).includes('fill="#1b1650"'), "bad colour falls back");
console.log("qr ok");
