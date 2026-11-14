/* Maps aggregator API responses into the shapes the ported design consumes.
   Hand-written integration layer — NOT generated from the design. */
/* eslint-disable */
// @ts-nocheck

import api from "./api";

/* ---------- helpers ---------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtWhen(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return String(iso).slice(0, 16);
  return MONTHS[d.getMonth()] + " " + d.getDate() + ", " +
    String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}
function fmtDay(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return String(iso).slice(0, 10);
  return MONTHS[d.getMonth()] + " " + d.getDate();
}
function fmtTime(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "—";
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") + ":" + String(d.getSeconds()).padStart(2, "0");
}
function num(n) { return Number(n || 0).toLocaleString("en-US"); }
function shortHash(h) {
  if (!h || h === "—") return "—";
  const s = String(h);
  return s.length > 12 ? s.slice(0, 6) + "…" + s.slice(-4) : s;
}

/* ---------- per-resource mappers (backend DTO -> design mock shape) ---------- */

/* The API serialises order_type as a numeric enum (0 = OnRamp, 1 = OffRamp) and
   older payloads use the strings. 0 is falsy, so this must not be written as
   `o.order_type || o.type` — that silently turns every on-ramp into an off-ramp. */
function isOnRamp(o) {
  const raw = o.order_type != null ? o.order_type : o.type;
  if (typeof raw === "number") return raw === 0;
  const s = String(raw == null ? "" : raw).toLowerCase();
  if (s === "0") return true;
  if (s === "1") return false;
  return s.includes("on") && !s.includes("off");
}

/* Design order: { id, flow, fiat, crypto, status, recipient, mpesa, hash, ref, rate, created, wa } */
export function mapOrder(o) {
  const flow = isOnRamp(o) ? "On-ramp" : "Off-ramp";
  const fiatAmt = o.amount_fiat != null ? o.amount_fiat : (o.fiat_amount != null ? o.fiat_amount : o.amount);
  const cur = o.currency || o.fiat_currency || "KES";
  const tokAmt = o.amount_crypto != null ? o.amount_crypto : o.token_amount;
  const token = o.token || o.symbol || "USDC";
  return {
    id: o.order_id || o.id || "—",
    flow,
    fiat: num(fiatAmt) + " " + cur,
    crypto: (tokAmt != null ? Number(tokAmt).toLocaleString("en-US", { maximumFractionDigits: 4 }) : "—") + " " + token,
    status: (o.status || "pending").toString().toLowerCase(),
    recipient: o.phone_number || o.recipient || o.user_address || o.wallet_address || "—",
    mpesa: o.mpesa_receipt_number || o.receipt || "—",
    hash: shortHash(o.settlement_transaction_hash || o.transaction_hash || o.tx_hash),
    ref: o.client_ref || o.reference || "—",
    rate: o.exchange_rate != null ? String(o.exchange_rate) : "—",
    created: fmtWhen(o.created_at || o.created),
  };
}

/* Design link: { id, name, prod, st, created, expiry, reusable, amtLabel } */
export function mapLink(l) {
  return {
    id: String(l.id != null ? l.id : l.link_slug),
    _slug: l.link_slug,
    _publicPath: l.public_path,
    name: l.title || l.link_slug,
    prod: null,
    amtLabel: l.amount ? (l.currency + " " + num(l.amount)) : ("Open amount · " + (l.currency || "KES")),
    st: (l.status || "active") === "active" ? "Active" : "Inactive",
    created: fmtDay(l.created_at) === "—" ? "" : fmtDay(l.created_at),
    expiry: l.expires_at ? fmtDay(l.expires_at) : "None",
    reusable: (l.kind || "reusable") === "reusable",
    paidCount: l.paid_count || 0,
  };
}

/* Design invoice: { id, client, cur, lines: [[desc, amount]], st, due } */
const INV_STATUS = { draft: "Draft", open: "Sent", sent: "Sent", viewed: "Viewed", paid: "Paid", overdue: "Overdue", void: "Void", voided: "Void" };
export function mapInvoice(i) {
  const lines = (i.items || i.line_items || []).map((it) => [
    it.description || it.name || "Item",
    Number(it.amount != null ? it.amount : (it.unit_price || 0) * (it.quantity || 1)),
  ]);
  return {
    id: i.number || i.invoice_number || String(i.id),
    _id: i.id,
    client: i.customer_name || i.client || "—",
    cur: i.currency || "KES",
    lines: lines.length ? lines : [["—", Number(i.total || i.amount || 0)]],
    st: INV_STATUS[(i.status || "draft").toString().toLowerCase()] || "Draft",
    due: i.due_at ? fmtDay(i.due_at) : "—",
  };
}

/* Design beneficiary (benNew): { name, cc, countryName, cur, rail, acct, status, match, type, email, nick }
   NOTE: the contacts *list* endpoint returns only `destination_count` — the
   `destinations` array exists solely on the single-contact GET. loadConsoleData
   therefore hydrates contacts that have destinations before calling this. */
const RAIL_LABEL = { bank: "Bank", mobile_money: "Mobile money", stablecoin: "Stablecoin" };
export function mapContactToBen(c) {
  const dest = (c.destinations || [])[0] || null;
  return {
    _id: c.id,
    name: c.display_name,
    cc: (c.country || "ke").toLowerCase(),
    countryName: c.country || "—",
    cur: (dest && dest.currency) || "",
    rail: dest ? (RAIL_LABEL[dest.kind] || dest.kind || "—") : (c.destination_count ? "—" : "No payout details"),
    acct: dest ? (dest.identifier_masked || dest.masked_identifier || "••••") : "—",
    /* `status` is the contact's record state, not a name-check verdict. Only say
       "Verified" when a destination actually passed a name check. */
    status: dest && dest.name_check_result ? "Verified" : (c.status === "blocked" ? "Blocked" : "Pending"),
    match: (dest && dest.name_check_result) || "Not checked",
    type: "Business",
    email: c.email || "",
    nick: "",
  };
}

/* Design client (clientsNew): { name, email, phone, cc, country } */
export function mapContactToClient(c) {
  return {
    _id: c.id,
    name: c.display_name,
    email: c.email || "",
    phone: c.phone || "",
    cc: (c.country || "ke").toLowerCase(),
    country: c.country || "—",
  };
}

/* Design webhook row: { url, events, act, err, last, ok, _id }
   The backend nests delivery health under `health`, not `stats`, and exposes a
   consecutive-failure count rather than an error rate — so report what it gives
   instead of inventing a 0.0%. */
export function mapWebhookEndpoint(w) {
  const h = w.health || {};
  const fails = Number(h.consecutive_failures || 0);
  const lastStatus = h.last_http_status;
  return {
    _id: w.id,
    url: w.url,
    events: Array.isArray(w.event_types) && w.event_types.length ? w.event_types.join(", ") : "*",
    act: h.last_delivery_at ? "—" : "0",
    err: fails ? fails + " failing" : (h.last_delivery_at ? "OK" : "—"),
    last: h.last_delivery_at ? ((lastStatus != null ? lastStatus + " · " : "") + fmtWhen(h.last_delivery_at)) : "No deliveries yet",
    ok: w.enabled !== false && fails === 0,
  };
}

/* Design delivery tuple: [eventType, objectId, httpCode, attempts, time, _endpointId, _deliveryId] */
export function mapDelivery(d) {
  return [
    d.event_type || "event",
    d.event_id || d.order_id || String(d.id || ""),
    Number(d.last_http_status || d.http_status || (d.status === "delivered" ? 200 : 503)),
    Number(d.attempts || 1),
    fmtWhen(d.created_at || d.updated_at),
    d.endpoint_id,
    d.id,
  ];
}

/* Design request-log tuple: [method, path, code, ms, idemKey, reqBody, resBody] */
export function mapRequestLog(l) {
  return [
    l.method || "GET",
    l.endpoint || l.path || "/",
    Number(l.status_code || 0),
    Number(l.latency_ms || 0),
    l.idempotency_key || "",
    l.request_id ? "request_id: " + l.request_id : "",
    "",
  ];
}

/* Design event tuple: [type, objectId, time] */
export function mapEvent(e) {
  return [e.event_type || e.type || "event", e.event_id || String(e.id || ""), fmtTime(e.created_at)];
}

/* Design API key row is built in logic.js (needs badge()); normalize fields here. */
export function mapApiKey(k) {
  /* The list endpoint does not return any form of the key — not even a preview.
     Show the key id rather than a fabricated mask that is identical for every row. */
  const preview = k.masked_key || k.key_preview;
  return {
    _id: k.id,
    name: k.name || "API key",
    masked: preview || ("key #" + k.id + " · secret shown only at creation"),
    env: (k.environment || "sandbox") === "production" ? "Live" : "Sandbox",
    lastUsed: k.last_used_at ? fmtWhen(k.last_used_at) : "Never",
    webhook: k.webhook_url ? "Configured" : "Not set",
    revoked: !!k.revoked,
  };
}

/* Merchant transactions row (pre-shape; logic.js adds styles/handlers):
   { id, dirIn, amt, cur, st, date, time, day, who, method } */
export function mapOrderToTx(o) {
  const dirIn = isOnRamp(o);
  const created = new Date(o.created_at || o.created || Date.now());
  const daysAgo = isNaN(created) ? 0 : Math.max(0, Math.floor((Date.now() - created.getTime()) / 86400000));
  const stRaw = (o.status || "pending").toString().toLowerCase();
  const st = stRaw === "settled" || stRaw === "completed" || stRaw === "settled_unverified" ? "Paid"
    : stRaw === "failed" ? "Failed" : stRaw === "refunded" ? "Refunded" : "Pending";
  return {
    id: o.order_id || String(o.id || "—"),
    dirIn,
    amt: Number(o.amount_fiat != null ? o.amount_fiat : (o.fiat_amount != null ? o.fiat_amount : o.amount) || 0),
    cur: o.currency || o.fiat_currency || "KES",
    st,
    date: fmtDay(o.created_at || o.created),
    time: isNaN(created) ? "—" : String(created.getHours()).padStart(2, "0") + ":" + String(created.getMinutes()).padStart(2, "0"),
    day: 38 - daysAgo,
    who: o.phone_number || o.recipient || o.user_address || o.client_ref || "—",
    method: o.psp_name || (dirIn ? "Collection" : "Payout"),
  };
}

/* Notification: { id, title, body, read, when } */
export function mapNotification(n) {
  return {
    id: n.id,
    title: n.title || n.kind || "Notification",
    body: n.body || n.message || "",
    read: !!(n.read_at || n.read),
    when: fmtWhen(n.created_at),
  };
}

/* ---------- the big loader ---------- */

async function quiet(p, fallback) {
  try { return await p; } catch (e) { return fallback; }
}

/* An expired or revoked session must not look like an empty account. `quiet`
   swallows every failure, so the caller needs an explicit signal: probe /auth/me
   first and let an auth error propagate. This backend answers 403 (not 401) for
   a dead token, so both are treated as "signed out". */
export class AuthExpiredError extends Error {
  constructor(status) { super("Session expired"); this.name = "AuthExpiredError"; this.status = status; }
}

/* Loads everything the console renders. Individual failures degrade to empty
   lists so one missing profile doesn't blank the whole dashboard. */
export async function loadConsoleData() {
  /* Probe identity first and let an auth failure throw, so a dead session is
     never rendered as a signed-in console full of empty lists. */
  let me = null;
  try {
    me = await api.me();
  } catch (e) {
    if (e && (e.status === 401 || e.status === 403)) throw new AuthExpiredError(e.status);
    throw e;
  }

  const [
    business, ordersRes, linksRes, invoicesRes, contactsRes,
    whRes, logsRes, eventsRes, notifsRes, referralRes, keysRes, mfaRes, notifPrefsRes, walletsRes,
  ] = await Promise.all([
    quiet(api.business(), null),
    quiet(api.orders(50, 0), null),
    quiet(api.paymentLinks(), null),
    quiet(api.invoices(), null),
    quiet(api.contacts(), null),
    quiet(api.webhookEndpoints(), null),
    quiet(api.requestLogs(50), null),
    quiet(api.devEvents(50), null),
    quiet(api.notifications(), null),
    quiet(api.referral(), null),
    quiet(api.apiKeys(), null),
    quiet(api.mfaStatus(), null),
    quiet(api.get("/users/me/notification-preferences"), null),
    quiet(api.get("/auth/wallets"), null),
  ]);

  const rawOrders = (ordersRes && (ordersRes.orders || ordersRes)) || [];
  const rawLinks = (linksRes && (linksRes.links || linksRes.items || linksRes)) || [];
  const rawInvoices = (invoicesRes && (invoicesRes.invoices || invoicesRes.items || invoicesRes)) || [];
  const rawContacts = (contactsRes && (contactsRes.contacts || contactsRes.items || contactsRes)) || [];
  const rawEndpoints = (whRes && (whRes.endpoints || [])) || [];
  const rawLogs = (logsRes && (logsRes.items || [])) || [];
  const rawEvents = (eventsRes && (eventsRes.items || [])) || [];
  const rawNotifs = (notifsRes && (notifsRes.notifications || [])) || [];
  const rawKeys = Array.isArray(keysRes) ? keysRes : ((keysRes && keysRes.keys) || []);

  const endpoints = rawEndpoints.map(mapWebhookEndpoint);

  /* Deliveries per endpoint, aligned by index with the endpoints list. */
  const deliveries = await Promise.all(
    rawEndpoints.map((w) =>
      quiet(api.webhookDeliveries(w.id).then((r) => ((r && (r.deliveries || r.items)) || []).map(mapDelivery)), [])
    )
  );

  /* The contacts list omits `destinations`; only the single-contact GET has them.
     Hydrate just the contacts that actually have one so the Recipients table can
     show a real rail and masked account instead of placeholders. */
  const hydrated = await Promise.all(
    rawContacts.map((c) =>
      Number(c.destination_count || 0) > 0
        ? quiet(api.get("/businesses/me/contacts/" + c.id).then((full) => full || c), c)
        : Promise.resolve(c)
    )
  );

  return {
    user: me,
    business,
    mfa: mfaRes,
    referral: referralRes,
    state: {
      realOrders: Array.isArray(rawOrders) ? rawOrders.map(mapOrder) : [],
      realTx: Array.isArray(rawOrders) ? rawOrders.map(mapOrderToTx) : [],
      realLinks: Array.isArray(rawLinks) ? rawLinks.map(mapLink) : [],
      realInvoices: Array.isArray(rawInvoices) ? rawInvoices.map(mapInvoice) : [],
      realBens: hydrated.filter((c) => c.role !== "pays_you").map(mapContactToBen),
      realClients: hydrated.filter((c) => c.role !== "you_pay").map(mapContactToClient),
      realWebhooks: endpoints,
      realWhDeliveries: deliveries,
      realLogs: rawLogs.map(mapRequestLog),
      realEvents: rawEvents.map(mapEvent),
      realApiKeys: rawKeys.map(mapApiKey),
      realNotifs: rawNotifs.map(mapNotification),
      realUnread: (notifsRes && notifsRes.unread_count) || 0,
      realReferral: referralRes || null,
      realMfa: mfaRes || null,
      realNotifPrefs: notifPrefsRes || null,
      /* A payment link resolves publicly and looks "Active" even when the
         merchant has no payout wallet — the collect call only fails once a
         customer tries to pay. Carry the wallet count so we can warn first. */
      realWalletCount: Array.isArray(walletsRes) ? walletsRes.length : ((walletsRes && (walletsRes.wallets || []).length) || 0),
      realUserEmail: (me && me.email) || "",
      realUserRole: (me && me.role) ? String(me.role).charAt(0).toUpperCase() + String(me.role).slice(1) : "",
      realBizName: (business && (business.display_name || business.legal_name)) || "",
      realBizSlug: (business && business.slug) || "",
      hasBusiness: !!business,
    },
  };
}

export default loadConsoleData;
