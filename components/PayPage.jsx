/* Customer-facing checkout for a payment link.
   Hand-written — NOT generated from the design.

   Resolves the link through the public (unauthenticated) API and renders a
   payable page. Every failure state is shown as the backend reports it: an
   inactive link, an expired one, or a merchant who cannot receive yet. */
// @ts-nocheck
"use client";

import React from "react";

const BASE =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE) ||
  "http://localhost:8000/api/v1";

const money = (amount, currency) => {
  const n = Number(amount || 0);
  const dp = ["KES", "NGN", "TZS", "UGX", "RWF"].indexOf(String(currency || "")) >= 0 ? 0 : 2;
  return (
    (currency || "") +
    " " +
    n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp })
  );
};

const METHOD_LABEL = { mpesa: "M-Pesa", card: "Card", stable: "Stablecoin" };

/* Accept the ways a Kenyan customer actually types their number and normalise to
   the 254XXXXXXXXX the API wants. The backend already takes +254…, 0 7/1…, and
   254… (app/services/collect_profiles/stk_phone.py); this mirrors that and also
   handles a bare 9-digit entry, which is the most common way people type it.
   Returns null when it is not a Kenyan mobile number. */
export function normalizeKePhone(raw) {
  const s = String(raw == null ? "" : raw).replace(/[\s()\-.]/g, "");
  const digits = s.replace(/^\+/, "");
  if (!/^\d+$/.test(digits)) return null;
  if (/^254[17]\d{8}$/.test(digits)) return digits;          // 254712345678
  if (/^0[17]\d{8}$/.test(digits)) return "254" + digits.slice(1); // 0712345678
  if (/^[17]\d{8}$/.test(digits)) return "254" + digits;      // 712345678 / 110919165
  return null;
}

export default function PayPage({ business, link }) {
  const [state, setState] = React.useState({ phase: "loading" });
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
        setState({ phase: "ready", data: (body && body.data) || body });
      } catch (e) {
        if (!cancelled) setState({ phase: "error", message: "Could not reach the payment service." });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [business, link]);

  const pay = async () => {
    setPayError("");
    const trimmed = normalizeKePhone(phone);
    if (!trimmed) {
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
          body: JSON.stringify({ method: "mpesa", payer_phone: trimmed }),
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

  const shell = (children) => (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "var(--indigo-tint, #eef0fb)",
        fontFamily: "'Manrope', system-ui, sans-serif",
        color: "var(--ink, #14181c)",
      }}
    >
      <section
        style={{
          width: "min(460px, 100%)",
          background: "var(--panel-solid, #fff)",
          border: "1px solid var(--border, #e3e5e8)",
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 24px 60px -24px rgba(20,24,28,0.3)",
        }}
      >
        {children}
      </section>
    </main>
  );

  if (state.phase === "loading") return shell(<span style={{ color: "var(--muted, #5e656d)" }}>Loading…</span>);

  if (state.phase === "error")
    return shell(
      <>
        <h1 style={{ fontSize: 19, margin: 0 }}>Link unavailable</h1>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted, #5e656d)", lineHeight: 1.55 }}>{state.message}</p>
      </>,
    );

  const d = state.data || {};
  const accepts = Array.isArray(d.accepts) ? d.accepts : [];
  const inactive = String(d.status || "active") !== "active";
  const expired = d.expires_at ? new Date(d.expires_at) < new Date() : false;
  const canPay = !inactive && !expired && accepts.indexOf("mpesa") >= 0;

  if (done)
    return shell(
      <>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--indigo-text, #4339ca)" }}>{d.business_name}</span>
        <h1 style={{ fontSize: 20, margin: 0 }}>Check your phone</h1>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted, #5e656d)", lineHeight: 1.55 }}>
          We sent an M-Pesa prompt to {normalizeKePhone(phone) || phone}. Approve it to pay {money(d.amount, d.currency)}.
        </p>
        {done.order_id ? (
          <code style={{ fontSize: 12, color: "var(--muted, #5e656d)", wordBreak: "break-all" }}>
            Reference {done.order_id}
          </code>
        ) : null}
      </>,
    );

  return shell(
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--indigo-text, #4339ca)" }}>{d.business_name}</span>
        <h1 style={{ fontSize: 20, margin: 0 }}>{d.title}</h1>
        {d.description ? (
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted, #5e656d)", lineHeight: 1.5 }}>
            {d.description}
          </p>
        ) : null}
      </div>

      <div
        style={{
          padding: "14px 16px",
          borderRadius: 12,
          background: "var(--surface, #f6f7f9)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted, #5e656d)" }}>
          Amount
        </span>
        <strong style={{ fontSize: 26, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
          {money(d.amount, d.currency)}
        </strong>
      </div>

      {inactive || expired ? (
        <p style={{ margin: 0, padding: "11px 13px", borderRadius: 10, background: "var(--warn-bg, #fdf3e3)", color: "var(--warn-text, #8a5a00)", fontSize: 13, fontWeight: 600 }}>
          {expired ? "This link has expired." : "This link is no longer active."} Ask {d.business_name} for a new one.
        </p>
      ) : !canPay ? (
        <p style={{ margin: 0, padding: "11px 13px", borderRadius: 10, background: "var(--warn-bg, #fdf3e3)", color: "var(--warn-text, #8a5a00)", fontSize: 13, fontWeight: 600 }}>
          {d.business_name} has not enabled a payment method that can be used here yet.
        </p>
      ) : (
        <>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--muted, #5e656d)" }}>
            Your M-Pesa number
            {normalizeKePhone(phone) && normalizeKePhone(phone) !== phone.replace(/[\s()\-.]/g, "").replace(/^\+/, "") ? (
              <span style={{ fontWeight: 500, color: "var(--faint, #808891)" }}>
                {" "}· we will charge {normalizeKePhone(phone)}
              </span>
            ) : null}
            <input
              type="tel"
              inputMode="numeric"
              placeholder="254712345678"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setPayError(""); }}
              autoComplete="tel"
              style={{
                padding: "11px 12px",
                border: "1px solid var(--border-strong, #c8ccd1)",
                borderRadius: 8,
                background: "var(--panel, #fff)",
                fontSize: 15,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                color: "var(--ink, #14181c)",
              }}
            />
          </label>

          {payError ? (
            <p style={{ margin: 0, padding: "9px 12px", borderRadius: 8, background: "var(--bad-bg, #fdecec)", color: "var(--bad-text, #a12020)", fontSize: 12.5, fontWeight: 600 }}>
              {payError}
            </p>
          ) : null}

          <button
            type="button"
            onClick={pay}
            disabled={paying}
            style={{
              padding: 13,
              borderRadius: 9,
              border: 0,
              background: "var(--indigo, #4339ca)",
              color: "var(--on-indigo, #fff)",
              fontSize: 14,
              fontWeight: 700,
              cursor: paying ? "default" : "pointer",
              opacity: paying ? 0.6 : 1,
            }}
          >
            {paying ? "Sending prompt…" : "Pay " + money(d.amount, d.currency)}
          </button>
        </>
      )}

      <span style={{ fontSize: 11.5, color: "var(--faint, #808891)", textAlign: "center" }}>
        Secured by ElementPay{accepts.length ? " · " + accepts.map((a) => METHOD_LABEL[a] || a).join(", ") : ""}
      </span>
    </>,
  );
}
