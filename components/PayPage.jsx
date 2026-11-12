/* Customer-facing checkout for a payment link.
   Hand-written — NOT generated from the design.

   Receipt-style layout: summary above the perforation, payment method below.
   Methods come from the link's `accepts` (build_accepts() in the aggregator):
   M-Pesa when allowed, USDC when CCTP collect is on and source chains exist.
   Cards are never public there, so this never offers one. */
// @ts-nocheck
"use client";

import React from "react";
import QRCode from "qrcode";

const BASE =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE) ||
  "http://localhost:8000/api/v1";

const ZERO_DP = ["KES", "NGN", "TZS", "UGX", "RWF", "XAF", "XOF"];
const money = (amount, currency) => {
  const n = Number(amount || 0);
  const dp = ZERO_DP.indexOf(String(currency || "").toUpperCase()) >= 0 ? 0 : 2;
  return n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
};

const CHAIN_LABEL = {
  base: "Base", ethereum: "Ethereum", polygon: "Polygon",
  arbitrum: "Arbitrum", optimism: "Optimism", arc: "Arc",
};
const chainIcon = (c) => "/chains/chain-" + String(c || "").toLowerCase() + ".svg";

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
  ink: "#14181c", muted: "#5e656d", faint: "#8b9199",
  line: "#e9e7e2", card: "#ffffff", bg: "#f3f1ec",
  accent: "#4339ca", accentSoft: "#eef0fb",
  bad: "#a12020", badBg: "#fdecec",
  warn: "#8a5a00", warnBg: "#fdf3e3",
  ok: "#1b7a3d", okBg: "#e7f6ec",
};
const SANS = "'Manrope', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

const Row = ({ label, children, dashed = true }) => (
  <div
    style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 14, padding: "13px 0",
      borderBottom: dashed ? "1px dashed " + C.line : "none",
    }}
  >
    <span style={{ fontSize: 13, color: C.muted, flexShrink: 0 }}>{label}</span>
    <span style={{ textAlign: "right", minWidth: 0 }}>{children}</span>
  </div>
);

export default function PayPage({ business, link }) {
  const [state, setState] = React.useState({ phase: "loading" });
  const [tab, setTab] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [paying, setPaying] = React.useState(false);
  const [payError, setPayError] = React.useState("");
  const [done, setDone] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [qr, setQr] = React.useState("");
  const [left, setLeft] = React.useState(null);

  React.useEffect(() => {
    let off = false;
    (async () => {
      try {
        const res = await fetch(
          BASE + "/public/merchants/" + encodeURIComponent(business) + "/l/" + encodeURIComponent(link),
        );
        const body = await res.json().catch(() => null);
        if (off) return;
        if (!res.ok) {
          setState({ phase: "error", message: (body && body.message) || "This payment link could not be found." });
          return;
        }
        setState({ phase: "ready", data: (body && body.data) || body });
      } catch (e) {
        if (!off) setState({ phase: "error", message: "Could not reach the payment service." });
      }
    })();
    return () => { off = true; };
  }, [business, link]);

  const d = state.data || {};
  const cur = String(d.currency || "").toUpperCase();
  const accepts = Array.isArray(d.accepts) ? d.accepts : [];
  /* `accepts` is built from the merchant's toggles and ignores the link's
     currency, so it lists methods /pay then refuses. Only offer what can
     actually settle for this link. */
  const canMpesa = accepts.indexOf("mpesa") >= 0 && cur === "KES";
  const canCrypto = (accepts.indexOf("usdc_evm") >= 0 || accepts.indexOf("stable_usdc") >= 0) && cur === "USDC";
  const tabs = [canCrypto ? "crypto" : null, canMpesa ? "mpesa" : null].filter(Boolean);
  const active = tab && tabs.indexOf(tab) >= 0 ? tab : tabs[0];
  const chains = (d.source_chains || []).map((c) => (typeof c === "string" ? c : c.chain)).filter(Boolean);
  const depositAddress = d.deposit_address || (d.stable || {}).deposit_address || "";

  /* Expiry countdown, when the link carries one. */
  React.useEffect(() => {
    if (!d.expires_at) return;
    const tick = () => {
      const ms = new Date(d.expires_at).getTime() - Date.now();
      setLeft(ms > 0 ? ms : 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [d.expires_at]);

  React.useEffect(() => {
    if (!depositAddress) { setQr(""); return; }
    QRCode.toDataURL(depositAddress, { margin: 1, width: 320, color: { dark: "#14181c", light: "#ffffff" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, [depositAddress]);

  const pay = async () => {
    setPayError("");
    const normalised = normalizeKePhone(phone);
    if (!normalised) { setPayError("That does not look like a Kenyan M-Pesa number. Try 0712 345 678."); return; }
    setPaying(true);
    try {
      const res = await fetch(
        BASE + "/public/merchants/" + encodeURIComponent(business) + "/l/" + encodeURIComponent(link) + "/pay",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ method: "mpesa", payer_phone: normalised }) },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) { setPayError((body && body.message) || "The payment could not be started."); return; }
      setDone((body && body.data) || {});
    } catch (e) {
      setPayError("Could not reach the payment service.");
    } finally { setPaying(false); }
  };

  const copy = () => {
    try { navigator.clipboard.writeText(depositAddress); } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const mmss = (ms) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  };

  /* The notch is what makes it read as a receipt rather than a panel. */
  const notch = (side) => ({
    position: "absolute", top: "50%", [side]: -11, width: 22, height: 22,
    marginTop: -11, borderRadius: 999, background: C.bg,
  });

  const page = (children) => (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "32px 18px", background: C.bg, fontFamily: SANS, color: C.ink }}>
      <div style={{ width: "min(420px, 100%)", display: "flex", flexDirection: "column", gap: 14 }}>
        {children}
        <p style={{ margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: C.faint }}>
          <span aria-hidden="true">🔒</span> Secured by <strong style={{ color: C.muted }}>ElementPay</strong>
        </p>
      </div>
    </main>
  );

  if (state.phase === "loading")
    return page(
      <div style={{ background: C.card, borderRadius: 22, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        {[46, 70, 150].map((h, i) => <div key={i} style={{ height: h, borderRadius: 12, background: "#f3f1ec" }} />)}
      </div>,
    );

  if (state.phase === "error")
    return page(
      <div style={{ background: C.card, borderRadius: 22, padding: 28, textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}>
        <h1 style={{ fontSize: 18, margin: 0 }}>Link unavailable</h1>
        <p style={{ margin: 0, fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{state.message}</p>
      </div>,
    );

  const initial = String(d.business_name || "?").trim().charAt(0).toUpperCase();
  const inactive = String(d.status || "active") !== "active";
  const expired = d.expires_at ? new Date(d.expires_at) < new Date() : false;

  if (done)
    return page(
      <div style={{ background: C.card, borderRadius: 22, padding: 28, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", textAlign: "center" }}>
        <span style={{ width: 54, height: 54, borderRadius: 999, background: C.okBg, color: C.ok, display: "grid", placeItems: "center", fontSize: 25, fontWeight: 800 }}>✓</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <h1 style={{ fontSize: 19, margin: 0 }}>Check your phone</h1>
          <p style={{ margin: 0, fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>
            Approve the M-Pesa prompt sent to{" "}
            <strong style={{ fontFamily: MONO, color: C.ink }}>{normalizeKePhone(phone) || phone}</strong>{" "}
            to pay {cur} {money(d.amount, cur)} to {d.business_name}.
          </p>
        </div>
        {done.order_id ? (
          <code style={{ fontFamily: MONO, fontSize: 11.5, color: C.faint, wordBreak: "break-all" }}>{done.order_id}</code>
        ) : null}
      </div>,
    );

  return page(
    <div style={{ position: "relative", background: C.card, borderRadius: 22, boxShadow: "0 18px 50px -24px rgba(20,24,28,0.25)" }}>
      {/* summary */}
      <div style={{ padding: "20px 24px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 32, height: 32, borderRadius: 9, background: C.accentSoft, color: C.accent, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800 }}>
            {initial}
          </span>
          <strong style={{ fontSize: 15, flex: 1, minWidth: 0 }}>{d.business_name}</strong>
          {left != null ? (
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: left < 60000 ? C.bad : C.muted, fontFamily: MONO }}>
              <span aria-hidden="true">◷</span>{mmss(left)}
            </span>
          ) : null}
        </div>

        <div style={{ marginTop: 6 }}>
          <Row label="You send">
            <strong style={{ fontSize: 27, fontFamily: MONO, letterSpacing: "-0.02em" }}>
              {money(d.amount, cur)}
            </strong>
            <span style={{ fontSize: 13, color: C.muted, marginLeft: 6 }}>{cur}</span>
          </Row>
          <Row label={(d.business_name || "Merchant") + " receives"}>
            <span style={{ fontSize: 14.5, fontFamily: MONO }}>{money(d.amount, cur)} {cur}</span>
          </Row>
          <Row label="For" dashed={false}>
            <span style={{ fontSize: 13.5, color: C.ink }}>{d.title}</span>
          </Row>
        </div>
      </div>

      {/* perforation */}
      <div style={{ position: "relative", height: 1, background: "transparent" }}>
        <span style={notch("left")} />
        <span style={notch("right")} />
        <span style={{ position: "absolute", left: 18, right: 18, top: 0, borderTop: "1px dashed " + C.line }} />
      </div>

      {/* method */}
      <div style={{ padding: "16px 24px 24px" }}>
        {inactive || expired || tabs.length === 0 ? (
          <p style={{ margin: 0, padding: "13px 15px", borderRadius: 12, background: C.warnBg, color: C.warn, fontSize: 13, fontWeight: 600, lineHeight: 1.55 }}>
            {expired
              ? "This link has expired."
              : inactive
                ? "This link is no longer active."
                : d.business_name + " has not switched on a way to be paid here yet."}
          </p>
        ) : (
          <>
            <div role="tablist" style={{ display: "flex", gap: 22, borderBottom: "1px solid " + C.line, marginBottom: 18 }}>
              {tabs.map((t) => {
                const on = active === t;
                return (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={on}
                    type="button"
                    onClick={() => setTab(t)}
                    style={{
                      padding: "0 0 10px", border: 0, background: "none", cursor: "pointer",
                      fontFamily: "inherit", fontSize: 14, fontWeight: on ? 700 : 600,
                      color: on ? C.ink : C.faint,
                      borderBottom: "2px solid " + (on ? C.ink : "transparent"),
                      marginBottom: -1,
                    }}
                  >
                    {t === "crypto" ? "Crypto" : "M-Pesa"}
                  </button>
                );
              })}
            </div>

            {active === "crypto" ? (
              depositAddress ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  {qr ? (
                    <img src={qr} alt="Deposit address QR code" width="168" height="168" style={{ display: "block", borderRadius: 10 }} />
                  ) : (
                    <div style={{ width: 168, height: 168, borderRadius: 10, background: "#f3f1ec" }} />
                  )}
                  <p style={{ margin: 0, fontSize: 13, color: C.muted, textAlign: "center", lineHeight: 1.6 }}>
                    Send exactly <strong style={{ color: C.ink, fontFamily: MONO }}>{money(d.amount, cur)}</strong> USDC
                    {chains.length ? <> on <strong style={{ color: C.ink }}>{CHAIN_LABEL[chains[0]] || chains[0]}</strong></> : null} to
                  </p>
                  <button
                    type="button"
                    onClick={copy}
                    style={{
                      display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "11px 12px",
                      border: "1px solid " + C.line, borderRadius: 11, background: "#fbfaf8", cursor: "pointer",
                      fontFamily: MONO, fontSize: 11.5, color: C.ink, wordBreak: "break-all", textAlign: "left",
                    }}
                  >
                    <span style={{ flex: 1, minWidth: 0 }}>{depositAddress}</span>
                    <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: copied ? C.ok : C.accent, fontFamily: SANS }}>
                      {copied ? "Copied" : "Copy"}
                    </span>
                  </button>
                  {chains.length ? (
                    <div style={{ width: "100%", borderTop: "1px dashed " + C.line, paddingTop: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
                      <span style={{ fontSize: 12, color: C.muted }}>Supported networks</span>
                      <div style={{ display: "flex", gap: 9, flexWrap: "wrap", justifyContent: "center" }}>
                        {chains.map((c) => (
                          <img key={c} src={chainIcon(c)} alt={CHAIN_LABEL[c] || c} title={CHAIN_LABEL[c] || c}
                               width="26" height="26" style={{ display: "block", borderRadius: 999 }} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  <p style={{ margin: 0, padding: "13px 15px", borderRadius: 12, background: C.warnBg, color: C.warn, fontSize: 13, fontWeight: 600, lineHeight: 1.55 }}>
                    This link has no deposit address yet, so crypto payment cannot be completed.
                  </p>
                  {chains.length ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, paddingTop: 4 }}>
                      <span style={{ fontSize: 12, color: C.muted }}>Networks this merchant can receive on</span>
                      <div style={{ display: "flex", gap: 9, flexWrap: "wrap", justifyContent: "center" }}>
                        {chains.map((c) => (
                          <img key={c} src={chainIcon(c)} alt={CHAIN_LABEL[c] || c} title={CHAIN_LABEL[c] || c}
                               width="26" height="26" style={{ display: "block", borderRadius: 999 }} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: C.muted }}>
                  <span>
                    Phone number
                    {normalizeKePhone(phone) && normalizeKePhone(phone) !== phone.replace(/[\s()\-.]/g, "").replace(/^\+/, "") ? (
                      <span style={{ color: C.faint }}> · charging {normalizeKePhone(phone)}</span>
                    ) : null}
                  </span>
                  <input
                    type="tel" inputMode="numeric" autoComplete="tel" placeholder="0712 345 678"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setPayError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter" && !paying) pay(); }}
                    style={{
                      padding: "13px 14px", border: "1px solid " + C.line, borderRadius: 12,
                      background: "#fbfaf8", fontSize: 15.5, fontFamily: MONO, color: C.ink,
                    }}
                  />
                </label>

                <img src="/methods/method-mpesa.svg" alt="M-Pesa" width="30" height="30"
                     style={{ display: "block", borderRadius: 8 }} />

                {payError ? (
                  <p style={{ margin: 0, padding: "11px 13px", borderRadius: 11, background: C.badBg, color: C.bad, fontSize: 12.5, fontWeight: 600, lineHeight: 1.5 }}>
                    {payError}
                  </p>
                ) : null}

                <button
                  type="button" onClick={pay} disabled={paying}
                  style={{
                    marginTop: 2, padding: "15px 18px", borderRadius: 999, border: 0,
                    background: C.accent, color: "#fff", fontSize: 15, fontWeight: 700,
                    fontFamily: "inherit", cursor: paying ? "default" : "pointer", opacity: paying ? 0.6 : 1,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  {paying ? "Sending prompt…" : <>Pay {cur} {money(d.amount, cur)} <span aria-hidden="true">→</span></>}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>,
  );
}
