/* Customer-facing checkout for a payment link.
   Hand-written — NOT generated from the design.

   Receipt-style layout: summary above the perforation, payment method below.

   Methods come from the link's `methods` catalog (build_methods_catalog in
   the aggregator), which is itself derived from `accepts` — so anything
   rendered here can actually settle. Three categories:

     mobile_money   country-keyed. Kenya rides native ElementPay STK; other
                    markets collect through Yellow Card and load their
                    provider list on country selection.
     bank_transfer  M-Pesa paybill: a per-session account reference the payer
                    sends the EXACT amount to.
     stablecoin     USDC on an allowlisted EVM chain (CCTP to the merchant
                    Stellar home) or directly on Stellar with a memo.

   Older backends send only `accepts`; the catalog falls back to that.
   Cards are never public, so this never offers one. */
// @ts-nocheck
"use client";

import React from "react";
import QRCode from "qrcode";

const BASE =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE) ||
  "http://localhost:8000/api/v1";

const ZERO_DP = ["KES", "NGN", "TZS", "UGX", "RWF", "XAF", "XOF", "MWK", "ZMW"];
const money = (amount, currency) => {
  const n = Number(amount || 0);
  const dp = ZERO_DP.indexOf(String(currency || "").toUpperCase()) >= 0 ? 0 : 2;
  return n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
};

const CHAIN_LABEL = {
  base: "Base", ethereum: "Ethereum", polygon: "Polygon",
  arbitrum: "Arbitrum", optimism: "Optimism", arc: "Arc", stellar: "Stellar",
};
const chainIcon = (c) => "/chains/chain-" + String(c || "").toLowerCase() + ".svg";

/* Kenya only — the native STK rail is KES/Safaricom. Other markets send the
   number straight through to Yellow Card, which validates per country. */
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

const TERMINAL = ["completed", "failed", "expired"];

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

const CopyField = ({ value, mono = true, big = false }) => {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    try { navigator.clipboard.writeText(String(value)); } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button
      type="button" onClick={copy}
      style={{
        display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "11px 12px",
        border: "1px solid " + C.line, borderRadius: 11, background: "#fbfaf8", cursor: "pointer",
        fontFamily: mono ? MONO : SANS, fontSize: big ? 16 : 11.5, fontWeight: big ? 700 : 400,
        color: C.ink, wordBreak: "break-all", textAlign: "left",
      }}
    >
      <span style={{ flex: 1, minWidth: 0 }}>{value}</span>
      <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: copied ? C.ok : C.accent, fontFamily: SANS }}>
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
};

export default function PayPage({ business, link }) {
  const [state, setState] = React.useState({ phase: "loading" });
  const [tab, setTab] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [paying, setPaying] = React.useState(false);
  const [payError, setPayError] = React.useState("");
  const [qr, setQr] = React.useState("");
  const [left, setLeft] = React.useState(null);
  const [chain, setChain] = React.useState("");
  /* One session object for every rail — whatever POST /pay returned. */
  const [session, setSession] = React.useState(null);
  const [liveStatus, setLiveStatus] = React.useState("");
  /* Mobile money country + provider (YC markets only). */
  const [country, setCountry] = React.useState("");
  const [providers, setProviders] = React.useState(null);
  const [providerErr, setProviderErr] = React.useState("");
  const [networkId, setNetworkId] = React.useState("");

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

  /* Prefer the structured catalog; fall back to accepts for older backends. */
  const catalog = React.useMemo(() => {
    if (Array.isArray(d.methods) && d.methods.length) return d.methods;
    const out = [];
    if (accepts.indexOf("mpesa") >= 0) {
      out.push({
        key: "mobile_money", label: "Mobile Money",
        countries: [{ code: "KE", name: "Kenya", currency: "KES", native: true }],
      });
    }
    if (accepts.indexOf("paybill") >= 0) out.push({ key: "bank_transfer", label: "Bank & Paybill", countries: [] });
    if (accepts.indexOf("usdc_evm") >= 0 || accepts.indexOf("stable_usdc") >= 0) {
      out.push({ key: "stablecoin", label: "Stablecoin (USDC)", chains: d.source_chains || [] });
    }
    return out;
  }, [d.methods, d.accepts, d.source_chains]);

  const tabs = catalog.map((m) => m.key);
  const active = tab && tabs.indexOf(tab) >= 0 ? tab : tabs[0];
  const activeMethod = catalog.find((m) => m.key === active) || {};

  const momoCountries = (catalog.find((m) => m.key === "mobile_money") || {}).countries || [];
  const activeCountry =
    momoCountries.find((c) => c.code === country) || momoCountries[0] || null;
  const isNativeCountry = Boolean(activeCountry && activeCountry.native);

  const chains = (activeMethod.chains || d.source_chains || [])
    .map((c) => (typeof c === "string" ? { chain: c } : c))
    .filter((c) => c && c.chain);
  const activeChain = chains.find((c) => c.chain === chain) || chains[0] || null;
  const isStellar = Boolean(activeChain && activeChain.chain === "stellar");

  const priceFor = (k) => ((d.pricing || {}).methods || {})[k] || null;
  /* What the customer sends on the selected rail. Mobile money outside Kenya
     is quoted by the provider at checkout, so there is no figure to show yet. */
  const charge = React.useMemo(() => {
    let p = null;
    if (active === "bank_transfer") p = priceFor("paybill");
    else if (active === "stablecoin") p = priceFor(isStellar ? "stellar" : "usdc_evm");
    else if (active === "mobile_money" && isNativeCountry) p = priceFor("mpesa");
    if (p) {
      return {
        amount: p.charge_amount, currency: p.charge_currency,
        rate: p.rate, converted: Boolean(p.converted), known: true,
      };
    }
    if (active === "mobile_money" && !isNativeCountry) {
      return { amount: null, currency: activeCountry ? activeCountry.currency : "", known: false };
    }
    return { amount: d.amount, currency: cur, rate: null, converted: false, known: true };
  }, [active, isStellar, isNativeCountry, activeCountry, d.pricing, d.amount, cur]);

  /* Expiry countdown, when the link carries one. */
  React.useEffect(() => {
    if (!d.expires_at) return;
    const tick = () => setLeft(Math.max(0, new Date(d.expires_at).getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [d.expires_at]);

  /* QR for whatever address the session handed us. */
  const depositAddress = (session && session.deposit_address) || "";
  React.useEffect(() => {
    if (!depositAddress) { setQr(""); return; }
    let off = false;
    QRCode.toDataURL(depositAddress, { margin: 1, width: 336 })
      .then((url) => { if (!off) setQr(url); })
      .catch(() => {});
    return () => { off = true; };
  }, [depositAddress]);

  /* Load mobile-money providers when a Yellow Card country is picked. The
     backend returns 503 (not an empty list) on an upstream hiccup, so an
     outage reads as "try again", never as "no providers here". */
  React.useEffect(() => {
    if (active !== "mobile_money" || !activeCountry || activeCountry.native) return;
    let off = false;
    setProviders(null);
    setProviderErr("");
    setNetworkId("");
    (async () => {
      try {
        const res = await fetch(BASE + "/public/collect/momo-providers/" + activeCountry.code);
        const body = await res.json().catch(() => null);
        if (off) return;
        if (!res.ok) {
          setProviderErr((body && (body.message || body.detail)) || "Could not load providers.");
          return;
        }
        const list = (body && body.data) || [];
        setProviders(list);
        if (list.length === 1) setNetworkId(list[0].network_id);
      } catch (e) {
        if (!off) setProviderErr("Could not load providers.");
      }
    })();
    return () => { off = true; };
  }, [active, activeCountry && activeCountry.code]);

  /* Poll the session until it settles. Without this nothing on this page
     ever learns a payment completed — sessions only advance when read. */
  React.useEffect(() => {
    const id = session && session.public_id;
    if (!id) return;
    if (TERMINAL.indexOf(liveStatus) >= 0) return;
    let off = false;
    const tick = async () => {
      try {
        const res = await fetch(BASE + "/public/pay-sessions/" + encodeURIComponent(id));
        const body = await res.json().catch(() => null);
        if (off || !res.ok) return;
        const next = (body && body.data) || {};
        if (next.status) setLiveStatus(next.status);
        if (next.status === "completed" && next.success_url) {
          setTimeout(() => { try { window.location.href = next.success_url; } catch (e) {} }, 1800);
        }
      } catch (e) { /* transient — keep polling */ }
    };
    tick();
    const h = setInterval(tick, 4000);
    return () => { off = true; clearInterval(h); };
  }, [session && session.public_id, liveStatus]);

  const startPay = async (payload) => {
    setPayError("");
    setPaying(true);
    try {
      const res = await fetch(
        BASE + "/public/merchants/" + encodeURIComponent(business) + "/l/" + encodeURIComponent(link) + "/pay",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) { setPayError((body && body.message) || "The payment could not be started."); return null; }
      const data = (body && body.data) || {};
      setSession(data);
      setLiveStatus(data.status || "pending");
      return data;
    } catch (e) {
      setPayError("Could not reach the payment service.");
      return null;
    } finally { setPaying(false); }
  };

  const payMobileMoney = () => {
    if (isNativeCountry) {
      const normalised = normalizeKePhone(phone);
      if (!normalised) { setPayError("That does not look like a Kenyan M-Pesa number. Try 0712 345 678."); return; }
      return startPay({ method: "mpesa", payer_phone: normalised });
    }
    if (!networkId) { setPayError("Pick your mobile money provider."); return; }
    if (!phone.trim()) { setPayError("Enter the phone number to charge."); return; }
    return startPay({
      method: "momo",
      payer_phone: phone.trim(),
      country: activeCountry.code,
      network_id: networkId,
    });
  };

  const mmss = (ms) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  };

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

  /* Terminal states own the whole card — nothing else is actionable. */
  if (liveStatus === "completed")
    return page(
      <div style={{ background: C.card, borderRadius: 22, padding: 28, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", textAlign: "center" }}>
        <span style={{ width: 54, height: 54, borderRadius: 999, background: C.okBg, color: C.ok, display: "grid", placeItems: "center", fontSize: 25, fontWeight: 800 }}>✓</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <h1 style={{ fontSize: 19, margin: 0 }}>Payment received</h1>
          <p style={{ margin: 0, fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>
            {money(d.amount, cur)} {cur} paid to {d.business_name}.
          </p>
        </div>
        {session && session.public_id ? (
          <code style={{ fontFamily: MONO, fontSize: 11.5, color: C.faint, wordBreak: "break-all" }}>{session.public_id}</code>
        ) : null}
      </div>,
    );

  if (liveStatus === "failed" || liveStatus === "expired")
    return page(
      <div style={{ background: C.card, borderRadius: 22, padding: 28, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", textAlign: "center" }}>
        <span style={{ width: 54, height: 54, borderRadius: 999, background: C.badBg, color: C.bad, display: "grid", placeItems: "center", fontSize: 25, fontWeight: 800 }}>!</span>
        <h1 style={{ fontSize: 19, margin: 0 }}>{liveStatus === "expired" ? "Payment expired" : "Payment did not go through"}</h1>
        <p style={{ margin: 0, fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>Nothing was charged. You can try again.</p>
        <button
          type="button"
          onClick={() => { setSession(null); setLiveStatus(""); setPayError(""); }}
          style={{ padding: "13px 20px", borderRadius: 999, border: 0, background: C.accent, color: "#fff", fontSize: 14.5, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}
        >
          Try again
        </button>
      </div>,
    );

  const waiting = session && TERMINAL.indexOf(liveStatus) < 0;
  const waitingBanner = (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 13px", borderRadius: 11, background: C.accentSoft, color: C.accent, fontSize: 12.5, fontWeight: 600 }}>
      <span aria-hidden="true">◷</span>
      <span>{(session && session.next_step) || "Waiting for your payment…"}</span>
    </div>
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
            {charge.known ? (
              <>
                <strong style={{ fontSize: 27, fontFamily: MONO, letterSpacing: "-0.02em" }}>
                  {money(charge.amount, charge.currency)}
                </strong>
                <span style={{ fontSize: 13, color: C.muted, marginLeft: 6 }}>{charge.currency}</span>
              </>
            ) : (
              <span style={{ fontSize: 13, color: C.muted }}>
                Quoted in {charge.currency || "your currency"} at checkout
              </span>
            )}
          </Row>
          {charge.converted && charge.rate ? (
            <Row label="Rate">
              <span style={{ fontSize: 13, color: C.muted, fontFamily: MONO }}>
                1 USDC ≈ {money(charge.rate, "KES")} KES
              </span>
            </Row>
          ) : null}
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
            <div role="tablist" style={{ display: "flex", gap: 20, borderBottom: "1px solid " + C.line, marginBottom: 18, overflowX: "auto" }}>
              {catalog.map((m) => {
                const on = active === m.key;
                return (
                  <button
                    key={m.key} role="tab" aria-selected={on} type="button"
                    onClick={() => { setTab(m.key); setPayError(""); }}
                    style={{
                      padding: "0 0 10px", border: 0, background: "none", cursor: "pointer",
                      fontFamily: "inherit", fontSize: 13.5, fontWeight: on ? 700 : 600,
                      color: on ? C.ink : C.faint, whiteSpace: "nowrap",
                      borderBottom: "2px solid " + (on ? C.ink : "transparent"), marginBottom: -1,
                    }}
                  >
                    {m.key === "mobile_money" ? "Mobile money" : m.key === "bank_transfer" ? "Bank & Paybill" : "Crypto"}
                  </button>
                );
              })}
            </div>

            {/* ---------------------------------------------- mobile money */}
            {active === "mobile_money" ? (
              waiting ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{waitingBanner}</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {momoCountries.length > 1 ? (
                    <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: C.muted }}>
                      <span>Your country</span>
                      <select
                        value={activeCountry ? activeCountry.code : ""}
                        onChange={(e) => { setCountry(e.target.value); setPayError(""); }}
                        style={{
                          padding: "13px 14px", border: "1px solid " + C.line, borderRadius: 12,
                          background: "#fbfaf8", fontSize: 14.5, fontFamily: "inherit", color: C.ink,
                        }}
                      >
                        {momoCountries.map((c) => (
                          <option key={c.code} value={c.code}>{c.name} · {c.currency}</option>
                        ))}
                      </select>
                    </label>
                  ) : null}

                  {!isNativeCountry ? (
                    providerErr ? (
                      <p style={{ margin: 0, padding: "11px 13px", borderRadius: 11, background: C.warnBg, color: C.warn, fontSize: 12.5, fontWeight: 600 }}>
                        {providerErr}
                      </p>
                    ) : providers === null ? (
                      <div style={{ height: 44, borderRadius: 12, background: "#f3f1ec" }} />
                    ) : providers.length === 0 ? (
                      <p style={{ margin: 0, fontSize: 12.5, color: C.muted }}>
                        No mobile money provider is available in {activeCountry && activeCountry.name} yet.
                      </p>
                    ) : (
                      <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: C.muted }}>
                        <span>Provider</span>
                        <select
                          value={networkId}
                          onChange={(e) => { setNetworkId(e.target.value); setPayError(""); }}
                          style={{
                            padding: "13px 14px", border: "1px solid " + C.line, borderRadius: 12,
                            background: "#fbfaf8", fontSize: 14.5, fontFamily: "inherit", color: C.ink,
                          }}
                        >
                          <option value="">Choose your provider…</option>
                          {providers.map((p) => (
                            <option key={p.network_id} value={p.network_id}>{p.name}</option>
                          ))}
                        </select>
                      </label>
                    )
                  ) : null}

                  <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: C.muted }}>
                    <span>
                      Phone number
                      {isNativeCountry && normalizeKePhone(phone) &&
                        normalizeKePhone(phone) !== phone.replace(/[\s()\-.]/g, "").replace(/^\+/, "") ? (
                        <span style={{ color: C.faint }}> · charging {normalizeKePhone(phone)}</span>
                      ) : null}
                    </span>
                    <input
                      type="tel" inputMode="tel" autoComplete="tel"
                      placeholder={isNativeCountry ? "0712 345 678" : "+255 700 000 000"}
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setPayError(""); }}
                      onKeyDown={(e) => { if (e.key === "Enter" && !paying) payMobileMoney(); }}
                      style={{
                        padding: "13px 14px", border: "1px solid " + C.line, borderRadius: 12,
                        background: "#fbfaf8", fontSize: 15.5, fontFamily: MONO, color: C.ink,
                      }}
                    />
                  </label>

                  {isNativeCountry ? (
                    <img src="/methods/method-mpesa.svg" alt="M-Pesa" width="30" height="30"
                         style={{ display: "block", borderRadius: 8 }} />
                  ) : null}

                  {payError ? (
                    <p style={{ margin: 0, padding: "11px 13px", borderRadius: 11, background: C.badBg, color: C.bad, fontSize: 12.5, fontWeight: 600, lineHeight: 1.5 }}>
                      {payError}
                    </p>
                  ) : null}

                  <button
                    type="button" onClick={payMobileMoney} disabled={paying}
                    style={{
                      marginTop: 2, padding: "15px 18px", borderRadius: 999, border: 0,
                      background: C.accent, color: "#fff", fontSize: 15, fontWeight: 700,
                      fontFamily: "inherit", cursor: paying ? "default" : "pointer", opacity: paying ? 0.6 : 1,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                  >
                    {paying
                      ? "Sending prompt…"
                      : charge.known
                        ? <>Pay {charge.currency} {money(charge.amount, charge.currency)} <span aria-hidden="true">→</span></>
                        : <>Continue <span aria-hidden="true">→</span></>}
                  </button>
                </div>
              )
            ) : null}

            {/* --------------------------------------------- bank & paybill */}
            {active === "bank_transfer" ? (
              session && session.account_number ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                    From M-Pesa choose <strong style={{ color: C.ink }}>Lipa na M-Pesa → Pay Bill</strong>, or pay to
                    paybill from your bank app.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    <span style={{ fontSize: 12, color: C.muted }}>Business number</span>
                    <CopyField value={session.paybill_number} big />
                    <span style={{ fontSize: 12, color: C.muted }}>Account number</span>
                    <CopyField value={session.account_number} big />
                    <span style={{ fontSize: 12, color: C.muted }}>Amount</span>
                    <CopyField value={session.charge_amount} big />
                  </div>
                  <p style={{ margin: 0, padding: "11px 13px", borderRadius: 11, background: C.warnBg, color: C.warn, fontSize: 12.5, fontWeight: 600, lineHeight: 1.5 }}>
                    Pay exactly {session.charge_currency} {money(session.charge_amount, session.charge_currency)}. A
                    different amount will not complete this payment automatically.
                  </p>
                  {waitingBanner}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                    Pay from M-Pesa or a bank app using a paybill business number and a one-time account reference.
                  </p>
                  {payError ? (
                    <p style={{ margin: 0, fontSize: 12.5, color: C.bad, fontWeight: 600 }}>{payError}</p>
                  ) : null}
                  <button
                    type="button" onClick={() => startPay({ method: "paybill" })} disabled={paying}
                    style={{
                      marginTop: 2, padding: "15px 18px", borderRadius: 999, border: 0,
                      background: C.accent, color: "#fff", fontSize: 15, fontWeight: 700,
                      fontFamily: "inherit", cursor: paying ? "default" : "pointer", opacity: paying ? 0.6 : 1,
                    }}
                  >
                    {paying ? "Preparing…" : "Get payment details →"}
                  </button>
                </div>
              )
            ) : null}

            {/* ------------------------------------------------- stablecoin */}
            {active === "stablecoin" ? (
              depositAddress ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  {qr ? (
                    <img src={qr} alt="Deposit address QR code" width="168" height="168" style={{ display: "block", borderRadius: 10 }} />
                  ) : (
                    <div style={{ width: 168, height: 168, borderRadius: 10, background: "#f3f1ec" }} />
                  )}
                  <p style={{ margin: 0, fontSize: 13, color: C.muted, textAlign: "center", lineHeight: 1.6 }}>
                    Send exactly{" "}
                    <strong style={{ color: C.ink, fontFamily: MONO }}>
                      {session.customer_total_usdc || session.charge_amount}
                    </strong>{" "}
                    USDC on{" "}
                    <strong style={{ color: C.ink }}>
                      {CHAIN_LABEL[session.source_chain] || session.source_chain}
                    </strong>{" "}
                    to
                  </p>
                  <CopyField value={depositAddress} />

                  {session.deposit_memo ? (
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                      <p style={{ margin: 0, padding: "11px 13px", borderRadius: 11, background: C.warnBg, color: C.warn, fontSize: 12.5, fontWeight: 700, lineHeight: 1.5 }}>
                        ⚠ The memo below is required. A Stellar payment without it cannot be matched to this
                        checkout and will need manual recovery.
                      </p>
                      <CopyField value={session.deposit_memo} big />
                    </div>
                  ) : null}

                  {session.bridge_fee_usdc && Number(session.bridge_fee_usdc) > 0 ? (
                    <p style={{ margin: 0, fontSize: 11.5, color: C.faint, textAlign: "center" }}>
                      Includes {session.bridge_fee_usdc} USDC bridge fee
                    </p>
                  ) : null}
                  {waitingBanner}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {chains.length ? (
                    <>
                      <span style={{ fontSize: 13, color: C.muted }}>Pay USDC from</span>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {chains.map((c) => {
                          const on = activeChain && activeChain.chain === c.chain;
                          return (
                            <button
                              key={c.chain} type="button" onClick={() => { setChain(c.chain); setPayError(""); }}
                              aria-pressed={Boolean(on)}
                              style={{
                                display: "flex", alignItems: "center", gap: 7, padding: "9px 12px",
                                borderRadius: 11, cursor: "pointer", fontFamily: "inherit", fontSize: 13,
                                border: "1px solid " + (on ? C.accent : C.line),
                                background: on ? "#fbfaf8" : "#fff",
                                color: C.ink, fontWeight: on ? 700 : 500,
                              }}
                            >
                              <img src={chainIcon(c.chain)} alt="" width="20" height="20" style={{ display: "block", borderRadius: 999 }} />
                              {CHAIN_LABEL[c.chain] || c.chain}
                            </button>
                          );
                        })}
                      </div>
                      {isStellar ? (
                        <p style={{ margin: 0, fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>
                          Paying on Stellar settles directly — no bridge fee. You will need to attach a memo.
                        </p>
                      ) : null}
                      {payError ? (
                        <p style={{ margin: 0, fontSize: 12.5, color: C.bad, fontWeight: 600 }}>{payError}</p>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => startPay({
                          method: "stable_usdc",
                          source_chain: (activeChain && activeChain.chain) || chains[0].chain,
                        })}
                        disabled={paying}
                        style={{
                          marginTop: 2, padding: "15px 18px", borderRadius: 999, border: 0,
                          background: C.accent, color: "#fff", fontSize: 15, fontWeight: 700,
                          fontFamily: "inherit", cursor: paying ? "default" : "pointer", opacity: paying ? 0.6 : 1,
                        }}
                      >
                        {paying ? "Preparing…" : "Continue to deposit address →"}
                      </button>
                    </>
                  ) : (
                    <p style={{ margin: 0, padding: "13px 15px", borderRadius: 12, background: C.warnBg, color: C.warn, fontSize: 13, fontWeight: 600, lineHeight: 1.55 }}>
                      No USDC network is enabled for this merchant yet.
                    </p>
                  )}
                </div>
              )
            ) : null}
          </>
        )}
      </div>
    </div>,
  );
}
