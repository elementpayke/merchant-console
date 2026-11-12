/* Customer-facing checkout for a payment link.
   Hand-written — NOT generated from the design.

   Resolves the link through the public (unauthenticated) API and renders a
   payable page. Every failure state is shown as the backend reports it: an
   inactive link, an expired one, or a merchant who cannot receive yet.

   Methods come from the link's `accepts`, which the backend derives in
   build_accepts(): M-Pesa when allowed, USDC when CCTP collect is enabled and
   source chains are configured. Cards are deliberately never public there, so
   this page never offers one. */
// @ts-nocheck
"use client";

import React from "react";

const BASE =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE) ||
  "http://localhost:8000/api/v1";

const ZERO_DP = ["KES", "NGN", "TZS", "UGX", "RWF", "XAF", "XOF"];

const money = (amount, currency) => {
  const n = Number(amount || 0);
  const dp = ZERO_DP.indexOf(String(currency || "").toUpperCase()) >= 0 ? 0 : 2;
  return n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
};

/* Keyed by the method ids the API returns. */
const METHODS = {
  mpesa: { label: "M-Pesa", note: "Pay by phone prompt", icon: "/methods/method-mpesa.svg" },
  usdc_evm: { label: "USDC", note: "Pay from a crypto wallet", icon: "/methods/method-usdc.svg" },
  card: { label: "Card", note: "Visa or Mastercard", icon: "/methods/method-card.svg" },
};
const methodInfo = (id) =>
  METHODS[id] || { label: String(id || "").toUpperCase(), note: "", icon: "/methods/method-card.svg" };

/* Accept the ways a Kenyan customer actually types their number and normalise to
   the 254XXXXXXXXX the API wants. The backend already takes +254…, 0 7/1…, and
   254… (app/services/collect_profiles/stk_phone.py); this mirrors that and also
   handles a bare 9-digit entry, which is the most common way people type it. */
export function normalizeKePhone(raw) {
  const s = String(raw == null ? "" : raw).replace(/[\s()\-.]/g, "");
  const digits = s.replace(/^\+/, "");
  if (!/^\d+$/.test(digits)) return null;
  if (/^254[17]\d{8}$/.test(digits)) return digits;
  if (/^0[17]\d{8}$/.test(digits)) return "254" + digits.slice(1);
  if (/^[17]\d{8}$/.test(digits)) return "254" + digits;
  return null;
}

const C = {
  ink: "var(--ink, #14181c)",
  muted: "var(--muted, #5e656d)",
  faint: "var(--faint, #808891)",
  line: "var(--border, #e3e5e8)",
  strong: "var(--border-strong, #c8ccd1)",
  panel: "var(--panel-solid, #fff)",
  surface: "var(--surface, #f6f7f9)",
  indigo: "var(--indigo, #4339ca)",
  indigoTint: "var(--indigo-tint, #eef0fb)",
  indigoText: "var(--indigo-text, #4339ca)",
  onIndigo: "var(--on-indigo, #fff)",
  badBg: "var(--bad-bg, #fdecec)",
  badText: "var(--bad-text, #a12020)",
  warnBg: "var(--warn-bg, #fdf3e3)",
  warnText: "var(--warn-text, #8a5a00)",
  okBg: "var(--ok-bg, #e7f6ec)",
  okText: "var(--ok-text, #1b7a3d)",
};

const SANS = "'Manrope', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

export default function PayPage({ business, link }) {
  const [state, setState] = React.useState({ phase: "loading" });
  const [method, setMethod] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [paying, setPaying] = React.useState(false);
  const [payError, setPayError] = React.useState("");
  const [done, setDone] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          BASE + "/public/merchants/" + encodeURIComponent(business) + "/l/" + encodeURIComponent(link),
        );
        const body = await res.json().catch(() => null);
        if (cancelled) return;
        if (!res.ok) {
          setState({ phase: "error", message: (body && body.message) || "This payment link could not be found." });
          return;
        }
        const data = (body && body.data) || body;
        setState({ phase: "ready", data });
        const first = (data.accepts || [])[0];
        if (first) setMethod(first);
      } catch (e) {
        if (!cancelled) setState({ phase: "error", message: "Could not reach the payment service." });
      }
    })();
    return () => { cancelled = true; };
  }, [business, link]);

  const pay = async () => {
    setPayError("");
    const normalised = normalizeKePhone(phone);
    if (!normalised) {
      setPayError("That does not look like a Kenyan M-Pesa number. Try 0712 345 678.");
      return;
    }
    setPaying(true);
    try {
      const res = await fetch(
        BASE + "/public/merchants/" + encodeURIComponent(business) + "/l/" + encodeURIComponent(link) + "/pay",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "mpesa", payer_phone: normalised }),
        },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setPayError((body && body.message) || "The payment could not be started.");
        return;
      }
      setDone((body && body.data) || {});
    } catch (e) {
      setPayError("Could not reach the payment service.");
    } finally {
      setPaying(false);
    }
  };

  const shell = (children, wide) => (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "28px 20px",
        background: C.indigoTint,
        backgroundImage: "radial-gradient(rgba(67,57,202,0.07) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        fontFamily: SANS,
        color: C.ink,
      }}
    >
      <div style={{ width: "min(" + (wide || 440) + "px, 100%)", display: "flex", flexDirection: "column", gap: 14 }}>
        <section
          style={{
            background: C.panel,
            border: "1px solid " + C.line,
            borderRadius: 18,
            padding: 26,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            boxShadow: "0 28px 70px -28px rgba(20,24,28,0.34)",
          }}
        >
          {children}
        </section>
        <p style={{ margin: 0, textAlign: "center", fontSize: 11.5, color: C.faint, letterSpacing: "0.01em" }}>
          Payments secured by ElementPay
        </p>
      </div>
    </main>
  );

  if (state.phase === "loading")
    return shell(
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[64, 92, 48].map((h, i) => (
          <div key={i} style={{ height: h, borderRadius: 12, background: C.surface }} />
        ))}
      </div>,
    );

  if (state.phase === "error")
    return shell(
      <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "center" }}>
        <span style={{ fontSize: 30 }} aria-hidden="true">·</span>
        <h1 style={{ fontSize: 19, margin: 0, letterSpacing: "-0.01em" }}>Link unavailable</h1>
        <p style={{ margin: 0, fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{state.message}</p>
      </div>,
    );

  const d = state.data || {};
  const accepts = Array.isArray(d.accepts) ? d.accepts : [];
  const inactive = String(d.status || "active") !== "active";
  const expired = d.expires_at ? new Date(d.expires_at) < new Date() : false;
  const blocked = inactive || expired || accepts.length === 0;
  const initials = String(d.business_name || "?")
    .split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  const merchant = (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <span
        style={{
          width: 38, height: 38, flexShrink: 0, borderRadius: 11,
          background: C.indigoTint, color: C.indigoText,
          display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800,
        }}
      >
        {initials}
      </span>
      <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <strong style={{ fontSize: 14.5, letterSpacing: "-0.01em" }}>{d.business_name}</strong>
        <span style={{ fontSize: 12, color: C.muted }}>is requesting a payment</span>
      </span>
    </div>
  );

  if (done)
    return shell(
      <>
        {merchant}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "8px 0 4px" }}>
          <span style={{ width: 52, height: 52, borderRadius: 999, background: C.okBg, color: C.okText, display: "grid", placeItems: "center", fontSize: 24, fontWeight: 800 }}>✓</span>
          <h1 style={{ fontSize: 19, margin: 0, letterSpacing: "-0.01em" }}>Check your phone</h1>
          <p style={{ margin: 0, fontSize: 13.5, color: C.muted, lineHeight: 1.6, textAlign: "center" }}>
            We sent an M-Pesa prompt to{" "}
            <strong style={{ fontFamily: MONO, color: C.ink }}>{normalizeKePhone(phone) || phone}</strong>.
            <br />Approve it to pay {d.currency} {money(d.amount, d.currency)}.
          </p>
        </div>
        {done.order_id ? (
          <div style={{ padding: "10px 12px", borderRadius: 10, background: C.surface, display: "flex", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 12, color: C.muted }}>Reference</span>
            <code style={{ fontFamily: MONO, fontSize: 12, wordBreak: "break-all" }}>{done.order_id}</code>
          </div>
        ) : null}
      </>,
    );

  return shell(
    <>
      {merchant}

      <div style={{ padding: "18px 18px 16px", borderRadius: 14, background: C.surface, display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.faint }}>
          {d.title || "Amount due"}
        </span>
        <span style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: C.muted, fontFamily: MONO }}>{d.currency}</span>
          <strong style={{ fontSize: 32, fontFamily: MONO, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {money(d.amount, d.currency)}
          </strong>
        </span>
        {d.description ? (
          <p style={{ margin: "6px 0 0", fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>{d.description}</p>
        ) : null}
      </div>

      {blocked ? (
        <p style={{ margin: 0, padding: "12px 14px", borderRadius: 11, background: C.warnBg, color: C.warnText, fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>
          {expired
            ? "This link has expired."
            : inactive
              ? "This link is no longer active."
              : d.business_name + " has not switched on a way to be paid here yet."}{" "}
          {expired || inactive ? "Ask " + d.business_name + " for a new one." : ""}
        </p>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.faint }}>
              {accepts.length > 1 ? "Choose how to pay" : "Paying with"}
            </span>
            <div style={{ display: "grid", gap: 8 }}>
              {accepts.map((id) => {
                const info = methodInfo(id);
                const on = method === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMethod(id)}
                    aria-pressed={on}
                    style={{
                      display: "flex", alignItems: "center", gap: 11, width: "100%",
                      padding: "11px 13px", borderRadius: 12, cursor: accepts.length > 1 ? "pointer" : "default",
                      textAlign: "left", fontFamily: "inherit", color: C.ink,
                      border: "1.5px solid " + (on ? C.indigo : C.strong),
                      background: on ? C.indigoTint : C.panel,
                      transition: "border-color .15s, background .15s",
                    }}
                  >
                    <img src={info.icon} alt="" width="28" height="28" style={{ display: "block", borderRadius: 8, flexShrink: 0 }} />
                    <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                      <strong style={{ fontSize: 13.5 }}>{info.label}</strong>
                      {info.note ? <span style={{ fontSize: 11.5, color: C.muted }}>{info.note}</span> : null}
                    </span>
                    {accepts.length > 1 ? (
                      <span
                        style={{
                          width: 16, height: 16, flexShrink: 0, borderRadius: 999,
                          boxSizing: "border-box",
                          border: on ? "5px solid " + C.indigo : "1.5px solid " + C.strong,
                        }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {method === "mpesa" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, fontWeight: 600, color: C.muted }}>
                <span>
                  Your M-Pesa number
                  {normalizeKePhone(phone) &&
                  normalizeKePhone(phone) !== phone.replace(/[\s()\-.]/g, "").replace(/^\+/, "") ? (
                    <span style={{ fontWeight: 500, color: C.faint }}>
                      {" "}· we will charge {normalizeKePhone(phone)}
                    </span>
                  ) : null}
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="0712 345 678"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setPayError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter" && !paying) pay(); }}
                  style={{
                    padding: "12px 13px", border: "1px solid " + C.strong, borderRadius: 10,
                    background: C.panel, fontSize: 15.5, fontFamily: MONO, color: C.ink,
                    letterSpacing: "0.02em",
                  }}
                />
              </label>

              {payError ? (
                <p style={{ margin: 0, padding: "10px 12px", borderRadius: 10, background: C.badBg, color: C.badText, fontSize: 12.5, fontWeight: 600, lineHeight: 1.5 }}>
                  {payError}
                </p>
              ) : null}

              <button
                type="button"
                onClick={pay}
                disabled={paying}
                style={{
                  padding: 14, borderRadius: 11, border: 0, background: C.indigo, color: C.onIndigo,
                  fontSize: 14.5, fontWeight: 700, fontFamily: "inherit",
                  cursor: paying ? "default" : "pointer", opacity: paying ? 0.6 : 1,
                }}
              >
                {paying ? "Sending prompt…" : "Pay " + d.currency + " " + money(d.amount, d.currency)}
              </button>
              <p style={{ margin: 0, fontSize: 11.5, color: C.faint, textAlign: "center", lineHeight: 1.5 }}>
                You will get an M-Pesa prompt on your phone to approve.
              </p>
            </div>
          ) : method ? (
            <p style={{ margin: 0, padding: "12px 14px", borderRadius: 11, background: C.surface, color: C.muted, fontSize: 12.5, lineHeight: 1.55 }}>
              {methodInfo(method).label} checkout is not available on this page yet. Choose another method or ask{" "}
              {d.business_name} for an alternative.
            </p>
          ) : null}
        </>
      )}
    </>,
  );
}
