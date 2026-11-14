/* ElementPay aggregator API client for the merchant console.
   Hand-written integration layer — NOT generated from the design.
   Base URL comes from NEXT_PUBLIC_API_BASE (defaults to local aggregator). */
/* eslint-disable */
// @ts-nocheck

const BASE =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE) ||
  "http://localhost:8000/api/v1";

const LS_ACCESS = "ep_access_token";
const LS_REFRESH = "ep_refresh_token";

export function getAccessToken() {
  try { return window.localStorage.getItem(LS_ACCESS) || ""; } catch (e) { return ""; }
}
export function getRefreshToken() {
  try { return window.localStorage.getItem(LS_REFRESH) || ""; } catch (e) { return ""; }
}
export function setTokens(access, refresh) {
  try {
    if (access) window.localStorage.setItem(LS_ACCESS, access);
    if (refresh) window.localStorage.setItem(LS_REFRESH, refresh);
  } catch (e) {}
}
export function clearTokens() {
  try {
    window.localStorage.removeItem(LS_ACCESS);
    window.localStorage.removeItem(LS_REFRESH);
  } catch (e) {}
}

/* One in-flight refresh at a time; concurrent 401s share it. */
let refreshing = null;
async function refreshTokens() {
  if (!refreshing) {
    refreshing = (async () => {
      const rt = getRefreshToken();
      if (!rt) throw new ApiError(401, "No refresh token");
      const res = await fetch(BASE + "/auth/token/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: rt }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) { clearTokens(); throw new ApiError(res.status, pickMessage(body) || "Session expired"); }
      const d = body.data || body;
      setTokens(d.access_token, d.refresh_token);
      return d.access_token;
    })().finally(() => { refreshing = null; });
  }
  return refreshing;
}

export class ApiError extends Error {
  constructor(status, message, body) {
    super(message || "Request failed");
    this.status = status;
    this.body = body || null;
  }
}

function pickMessage(body) {
  if (!body) return "";
  /* The generic wrapper says "Request error" and hides the reason in data.msg, so
     prefer the specific message when there is one. */
  if (body.data && typeof body.data.msg === "string" && body.data.msg) return body.data.msg;
  if (typeof body.message === "string" && body.message) return body.message;
  if (typeof body.detail === "string" && body.detail) return body.detail;
  if (body.data && Array.isArray(body.data.errors) && body.data.errors.length) {
    const e = body.data.errors[0];
    return (e.loc ? e.loc.join(".") + ": " : "") + (e.msg || "invalid");
  }
  return "";
}

function redactBody(body) {
  if (!body || typeof body !== "object") return body;
  try {
    const clone = JSON.parse(JSON.stringify(body));
    const errs = clone.data && clone.data.errors;
    if (Array.isArray(errs)) errs.forEach((e) => { if (e && "input" in e) delete e.input; });
    return clone;
  } catch (e) { return null; }
}

async function request(method, path, body, opts) {
  opts = opts || {};
  const doFetch = async () => {
    const headers = { "Content-Type": "application/json" };
    const tok = getAccessToken();
    if (tok && !opts.noAuth) headers["Authorization"] = "Bearer " + tok;
    const res = await fetch(BASE + path, {
      method,
      headers,
      body: body == null ? undefined : JSON.stringify(body),
    });
    return res;
  };

  let res = await doFetch();
  /* This backend answers 403 for an expired/invalid token (app/utils/user_access.py),
     not 401 — retrying only on 401 would make the refresh path dead code. */
  if ((res.status === 401 || res.status === 403) && !opts.noAuth && !opts.noRetry && getRefreshToken()) {
    try { await refreshTokens(); res = await doFetch(); } catch (e) { /* fall through with the original status */ }
  }

  const text = await res.text();
  let parsed = null;
  try { parsed = text ? JSON.parse(text) : null; } catch (e) { parsed = null; }

  /* 422 bodies echo the submitted field values, including the password. Keep the
     messages, drop the inputs, so nothing downstream can log a credential. */
  if (!res.ok) throw new ApiError(res.status, pickMessage(parsed) || res.statusText, redactBody(parsed));
  /* Aggregator envelope: { status, message, data } — unwrap to data when present. */
  if (parsed && typeof parsed === "object" && "data" in parsed && "status" in parsed) return parsed.data;
  return parsed;
}

export const api = {
  base: BASE,
  get: (p) => request("GET", p),
  post: (p, b) => request("POST", p, b),
  patch: (p, b) => request("PATCH", p, b),
  del: (p) => request("DELETE", p),

  /* ---- auth ---- */
  register: (email, password, firstName, lastName) =>
    request("POST", "/auth/register", {
      email, password,
      first_name: firstName || "Merchant",
      last_name: lastName || "User",
      role: "merchant",
    }, { noAuth: true }),
  verifyEmail: (email, code) =>
    request("POST", "/auth/verify-email", { email, verification_code: code }, { noAuth: true }),
  resendVerification: (email) =>
    request("POST", "/auth/resend-verification", { email }, { noAuth: true }),
  /* login returns either tokens or an MFA challenge: { mfa_required, mfa_token, methods } */
  login: (email, password) =>
    request("POST", "/auth/login", { email, password }, { noAuth: true }),
  mfaVerify: (mfaToken, code, method) =>
    request("POST", "/auth/mfa/verify", { mfa_token: mfaToken, code, method }, { noAuth: true }),
  me: () => request("GET", "/auth/me"),
  mfaStatus: () => request("GET", "/auth/mfa/status"),
  mfaEnrolTotp: () => request("POST", "/auth/mfa/totp/enrol", {}),
  mfaActivateTotp: (code, password) => request("POST", "/auth/mfa/totp/activate", { code, password }),
  mfaDisable: (code) => request("POST", "/auth/mfa/disable", { code }),

  /* ---- business / collect profile ---- */
  business: () => request("GET", "/businesses/me"),
  createBusiness: (slug, displayName, kind, legalName) =>
    request("POST", "/businesses", {
      slug, display_name: displayName,
      kind: kind || "company",
      legal_name: legalName || displayName,
    }),

  /* ---- data feeds ---- */
  orders: (limit, offset) =>
    request("GET", "/users/me/orders?limit=" + (limit || 50) + "&offset=" + (offset || 0)),
  dashboard: () => request("GET", "/users/me/dashboard"),
  paymentLinks: () => request("GET", "/businesses/me/payment-requests"),
  createPaymentLink: (payload) => request("POST", "/businesses/me/payment-requests", payload),
  updatePaymentLink: (id, payload) => request("PATCH", "/businesses/me/payment-requests/" + id, payload),
  invoices: () => request("GET", "/businesses/me/invoices"),
  invoiceSummary: () => request("GET", "/businesses/me/invoices/summary"),
  createInvoice: (payload) => request("POST", "/businesses/me/invoices", payload),
  sendInvoice: (id) => request("POST", "/businesses/me/invoices/" + id + "/send", {}),
  voidInvoice: (id) => request("POST", "/businesses/me/invoices/" + id + "/void", {}),
  contacts: () => request("GET", "/businesses/me/contacts"),
  createContact: (payload) => request("POST", "/businesses/me/contacts", payload),
  contactHistory: (id) => request("GET", "/businesses/me/contacts/" + id + "/history"),
  addDestination: (contactId, payload) =>
    request("POST", "/businesses/me/contacts/" + contactId + "/destinations", payload),
  nameCheck: (contactId, destId) =>
    request("POST", "/businesses/me/contacts/" + contactId + "/destinations/" + destId + "/name-check", {}),
  recentDestinations: () => request("GET", "/businesses/me/destinations/recent"),

  /* ---- developer surface ---- */
  apiKeys: () => request("GET", "/users/me/api-keys"),
  createApiKey: (name) => request("POST", "/api-keys", { name }),
  revokeApiKey: (id) => request("DELETE", "/api-keys/" + id),
  webhookEndpoints: () => request("GET", "/developer/webhook-endpoints"),
  createWebhookEndpoint: (url, eventTypes) =>
    request("POST", "/developer/webhook-endpoints", { url, event_types: eventTypes || ["*"] }),
  deleteWebhookEndpoint: (id) => request("DELETE", "/developer/webhook-endpoints/" + id),
  webhookDeliveries: (endpointId) =>
    request("GET", "/developer/webhook-endpoints/" + endpointId + "/deliveries"),
  replayDelivery: (endpointId, deliveryId) =>
    request("POST", "/developer/webhook-endpoints/" + endpointId + "/deliveries/" + deliveryId + "/replay", {}),
  replayAll: (endpointId) =>
    request("POST", "/developer/webhook-endpoints/" + endpointId + "/replay-all", {}),
  requestLogs: (limit) => request("GET", "/developer/request-logs?limit=" + (limit || 50)),
  devEvents: (limit) => request("GET", "/developer/events?limit=" + (limit || 50)),
  eventTypes: () => request("GET", "/developer/event-types"),

  /* ---- notifications / referral / reports ---- */
  notifications: () => request("GET", "/users/me/notifications"),
  notificationsUnread: () => request("GET", "/users/me/notifications/unread-count"),
  markNotificationRead: (id) => request("POST", "/users/me/notifications/" + id + "/read", {}),
  markAllNotificationsRead: () => request("POST", "/users/me/notifications/read-all", {}),
  referral: () => request("GET", "/users/me/referral"),
  referralRewards: () => request("GET", "/users/me/referral/rewards"),
  reportsSummary: () => request("GET", "/users/me/reports/summary"),
  reportsReconciliation: () => request("GET", "/users/me/reports/reconciliation"),
};

export default api;
