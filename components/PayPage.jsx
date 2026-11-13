/* ElementPay hosted checkout.
   Built to the hosted-checkout design flow (v1, Nov 2026). Hand-written —
   NOT generated from the design system.

   Shape of the card, top to bottom: merchant + country pill, amount with the
   USDC equivalent and a held rate, three tabs (Mobile money / Bank / Crypto),
   the method body, and a quiet secured line. Same card in every market — only
   the wallet chips, the dial prefix and the bank rail label change.

   What the payer can choose is still the backend's call: tabs come from the
   link's `methods` catalog, which is derived from `accepts`, so nothing is
   offered that cannot settle. The market registry in lib/checkout-brand only
   supplies local labelling for what the backend already allows. */
// @ts-nocheck
"use client";

import React from "react";
import QRCode from "qrcode";
import {
  BRAND, MARKETS, NETWORKS,
  chainSrc, composeMsisdn, detectCountry, dialFor, flagSrc, market,
} from "../lib/checkout-brand";

const BASE =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE) ||
  "http://localhost:8000/api/v1";

const ZERO_DP = ["KES", "NGN", "TZS", "UGX", "RWF", "XAF", "XOF", "MWK", "ZMW", "BWP"];
const money = (amount, currency) => {
  const n = Number(amount || 0);
  const dp = ZERO_DP.indexOf(String(currency || "").toUpperCase()) >= 0 ? 0 : 2;
  return n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
};
/* Approximations read at 2dp. The binding figure — what the payer must send
   to the chain, down to the last unit — is never rounded; it is shown raw
   wherever it is the actual instruction. */
const approxUsdc = (v) => Number(v || 0).toFixed(2);

const C = {
  ink: "#141a2e", muted: "#5b6478", faint: "#8b93a7",
  line: "#e7e9f0", card: "#ffffff", bg: "#f6f7fb",
  accent: "#4338ca", accentSoft: "#eef0fd", accentInk: "#3730a3",
  bad: "#c0272d", badBg: "#fdeced",
  warn: "#8a5a00", warnBg: "#fdf4e3",
  ok: "#0f8a4d", okBg: "#e8f7ee",
  chip: "#f1f3f9",
};
const SANS = "'Manrope', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

const TERMINAL = ["completed", "failed", "expired"];
const TAB_LABEL = { mobile_money: "Mobile money", bank_transfer: "Bank", stablecoin: "Crypto" };

/* Failure copy keyed the way the design names them: a code, a plain reason,
   and always the reassurance that nothing was taken. */
const FAILURES = {
  mobile_money: { code: "MM-1051", title: "Payment declined", why: "The wallet declined the request. Top up or use another wallet." },
  bank_transfer: { code: "BK-2204", title: "Transfer returned", why: "Your bank returned the transfer. Check the details and send it again." },
  stablecoin: { code: "CR-3002", title: "Deposit window closed", why: "No deposit was seen in time and the address is now closed. Nothing was sent from your wallet." },
};

const BrandMark = ({ id, size = 26 }) => {
  const b = BRAND[id];
  if (!b) return null;
  if (b.src) {
    return (
      <span style={{ width: size, height: size, borderRadius: 7, background: "#fff", display: "grid", placeItems: "center", flexShrink: 0, overflow: "hidden" }}>
        <img src={b.src} alt="" width={size - 4} height={size - 4} style={{ display: "block" }} />
      </span>
    );
  }
  /* Typographic stand-in until the official file lands — brand colour, never
     recoloured art. See lib/checkout-brand. */
  return (
    <span
      aria-hidden="true"
      style={{
        padding: "3px 7px", borderRadius: 6, background: b.bg, color: b.fg,
        border: b.bg === "#ffffff" ? "1px solid " + C.line : "none",
        fontSize: 10.5, fontWeight: 800, letterSpacing: "-0.01em",
        whiteSpace: "nowrap", flexShrink: 0, lineHeight: 1.5,
      }}
    >
      {b.label}
    </span>
  );
};

const Stages = ({ names, at }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(" + names.length + ", 1fr)", gap: 8 }}>
    {names.map((n, i) => (
      <div key={n} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ height: 3, borderRadius: 2, background: i <= at ? (i === at ? C.accent : C.ok) : C.line }} />
        <span style={{ fontSize: 10.5, fontWeight: i === at ? 700 : 600, color: i < at ? C.ok : i === at ? C.accent : C.faint }}>{n}</span>
      </div>
    ))}
  </div>
);

const Field = ({ label, value, mono = true }) => {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      type="button"
      onClick={() => { try { navigator.clipboard.writeText(String(value)); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
        width: "100%", padding: "10px 12px", border: "1px solid " + C.line, borderRadius: 10,
        background: "#fbfcfe", cursor: "pointer", textAlign: "left", fontFamily: SANS,
      }}
    >
      <span style={{ fontSize: 11.5, color: C.muted, flexShrink: 0 }}>{label}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span style={{ fontFamily: mono ? MONO : SANS, fontSize: 12.5, fontWeight: 700, color: C.ink, wordBreak: "break-all", textAlign: "right" }}>{value}</span>
        <span style={{ fontSize: 10, fontWeight: 800, color: copied ? C.ok : C.accent, flexShrink: 0 }}>{copied ? "✓" : "COPY"}</span>
      </span>
    </button>
  );
};

const Check = ({ children }) => (
  <li style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>
    <span style={{ color: C.ok, fontWeight: 800, flexShrink: 0 }}>✓</span>
    <span>{children}</span>
  </li>
);

export default function PayPage({ business, link }) {
  const [state, setState] = React.useState({ phase: "loading" });
  const [tab, setTab] = React.useState(null);
  const [country, setCountry] = React.useState("");
  const [countryOpen, setCountryOpen] = React.useState(false);
  const [wallet, setWallet] = React.useState("");
  const [localPhone, setLocalPhone] = React.useState("");
  const [netChain, setNetChain] = React.useState("");
  const [paying, setPaying] = React.useState(false);
  const [payError, setPayError] = React.useState("");
  const [session, setSession] = React.useState(null);
  const [liveStatus, setLiveStatus] = React.useState("");
  const [qr, setQr] = React.useState("");
  const [held, setHeld] = React.useState(null);
  const [providers, setProviders] = React.useState(null);
  const [providerErr, setProviderErr] = React.useState("");
  /* Per-chain fee breakdown. The customer pays the CCTP bridge fee, so it has
     to be visible before they commit, not first seen on the deposit screen. */
  const [stableQuote, setStableQuote] = React.useState(null);
  const [quoting, setQuoting] = React.useState(false);

  React.useEffect(() => {
    let off = false;
    (async () => {
      try {
        const res = await fetch(BASE + "/public/merchants/" + encodeURIComponent(business) + "/l/" + encodeURIComponent(link));
        const body = await res.json().catch(() => null);
        if (off) return;
        if (!res.ok) { setState({ phase: "error", message: (body && body.message) || "This payment link could not be found." }); return; }
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

  const catalog = React.useMemo(() => {
    if (Array.isArray(d.methods) && d.methods.length) return d.methods;
    const out = [];
    if (accepts.indexOf("mpesa") >= 0) out.push({ key: "mobile_money", countries: [{ code: "KE", native: true }] });
    if (accepts.indexOf("paybill") >= 0) out.push({ key: "bank_transfer" });
    if (accepts.indexOf("usdc_evm") >= 0) out.push({ key: "stablecoin", chains: d.source_chains || [] });
    return out;
  }, [d.methods, d.accepts, d.source_chains]);

  const momoEntry = catalog.find((m) => m.key === "mobile_money") || {};
  const offeredCountries = (momoEntry.countries || []).map((c) => c.code).filter((c) => MARKETS[c]);

  /* Country first: detected from the device, changeable in one tap. */
  React.useEffect(() => {
    if (country || state.phase !== "ready") return;
    setCountry(detectCountry(offeredCountries.length ? offeredCountries : null));
  }, [state.phase, offeredCountries.length]);

  const mk = market(country) || market("KE");
  const countryRow = (momoEntry.countries || []).find((c) => c.code === country) || null;
  const isNative = Boolean(countryRow && countryRow.native);

  /* A method only applies where it can collect. Bank is M-Pesa paybill, i.e.
     Kenya — offering it to a Nigerian payer would hand them a Kenyan business
     number they cannot pay into. Crypto carries no country list and is
     global. The catalog already states each method's countries; honour it. */
  const servesCountry = (m) => {
    if (!Array.isArray(m.countries) || !m.countries.length) return true;
    return m.countries.some((c) => c.code === country);
  };
  const usable = country ? catalog.filter(servesCountry) : catalog;
  const tabs = usable.map((m) => m.key);
  /* The market decides which tab leads (Nigeria opens on Bank where it can). */
  const defaultTab = tabs.indexOf(mk && mk.lead) >= 0 ? mk.lead : tabs[0];
  const active = tab && tabs.indexOf(tab) >= 0 ? tab : defaultTab;

  const chainsAvailable = ((catalog.find((m) => m.key === "stablecoin") || {}).chains || d.source_chains || [])
    .map((c) => (typeof c === "string" ? c : c.chain)).filter(Boolean);
  const networks = NETWORKS.filter((n) => chainsAvailable.indexOf(n.chain) >= 0);
  const activeNet = networks.find((n) => n.chain === netChain) || networks[0] || null;

  const priceFor = (k) => ((d.pricing || {}).methods || {})[k] || null;
  const usdcPrice = priceFor(activeNet && activeNet.chain === "stellar" ? "stellar" : "usdc_evm");
  const localPrice =
    active === "bank_transfer" ? priceFor("paybill") : isNative ? priceFor("mpesa") : null;

  /* Headline is what THIS payer sends, in the currency they hold.
     Crypto is USDC. Kenya's rails are priced in KES up front. Other markets
     are quoted in local currency by the wallet provider when the prompt is
     raised, so we show the USDC equivalent — a number that is actually true —
     rather than the merchant's KES sticker, which a Nigerian payer would have
     no way to act on. */
  const head =
    active === "stablecoin"
      ? { amount: (stableQuote && stableQuote.customer_total_usdc) || (usdcPrice && usdcPrice.charge_amount) || d.amount, currency: "USDC" }
      : localPrice
        ? { amount: localPrice.charge_amount, currency: localPrice.charge_currency }
        : usdcPrice
          ? { amount: usdcPrice.charge_amount, currency: "USDC", pending: true }
          : { amount: d.amount, currency: cur };

  /* Rate hold — the number must not move while the payer is deciding. */
  React.useEffect(() => {
    if (state.phase !== "ready") return;
    setHeld(90);
    const h = setInterval(() => setHeld((v) => (v == null ? v : Math.max(0, v - 1))), 1000);
    return () => clearInterval(h);
  }, [state.phase]);

  React.useEffect(() => {
    if (mk && mk.wallets && mk.wallets.length && !mk.wallets.includes(wallet)) setWallet(mk.wallets[0]);
  }, [country]);

  const depositAddress = (session && session.deposit_address) || "";
  React.useEffect(() => {
    if (!depositAddress) { setQr(""); return; }
    let off = false;
    QRCode.toDataURL(depositAddress, { margin: 1, width: 320 }).then((u) => { if (!off) setQr(u); }).catch(() => {});
    return () => { off = true; };
  }, [depositAddress]);

  /* Provider list for Yellow Card markets, loaded on country selection. */
  React.useEffect(() => {
    if (active !== "mobile_money" || !country || isNative || !countryRow) return;
    let off = false;
    setProviders(null); setProviderErr("");
    (async () => {
      try {
        const res = await fetch(BASE + "/public/collect/momo-providers/" + country);
        const body = await res.json().catch(() => null);
        if (off) return;
        if (!res.ok) { setProviderErr("Wallet list is temporarily unavailable."); return; }
        setProviders((body && body.data) || []);
      } catch (e) { if (!off) setProviderErr("Wallet list is temporarily unavailable."); }
    })();
    return () => { off = true; };
  }, [active, country, isNative]);

  /* Quote the chosen chain so the bridge fee is on screen before the payer
     commits. One call per selection — not seven at resolve. */
  React.useEffect(() => {
    if (active !== "stablecoin" || !activeNet || session) return;
    let off = false;
    setQuoting(true); setStableQuote(null);
    (async () => {
      try {
        const res = await fetch(
          BASE + "/public/merchants/" + encodeURIComponent(business) + "/l/" +
          encodeURIComponent(link) + "/stable-quote?source_chain=" + encodeURIComponent(activeNet.chain),
        );
        const body = await res.json().catch(() => null);
        if (off || !res.ok) return;
        setStableQuote((body && body.data) || null);
      } catch (e) { /* fall back to the resolve-time figure */ }
      finally { if (!off) setQuoting(false); }
    })();
    return () => { off = true; };
  }, [active, activeNet && activeNet.chain, session]);

  /* Sessions only advance when read, so without this nothing here ever learns
     a payment completed. Drives every rail to the same result screen. */
  React.useEffect(() => {
    const id = session && session.public_id;
    if (!id || TERMINAL.indexOf(liveStatus) >= 0) return;
    let off = false;
    const tick = async () => {
      try {
        const res = await fetch(BASE + "/public/pay-sessions/" + encodeURIComponent(id));
        const body = await res.json().catch(() => null);
        if (off || !res.ok) return;
        const next = (body && body.data) || {};
        if (next.status) setLiveStatus(next.status);
        if (next.status === "completed" && next.success_url)
          setTimeout(() => { try { window.location.href = next.success_url; } catch (e) {} }, 2200);
      } catch (e) { /* transient — keep polling */ }
    };
    tick();
    const h = setInterval(tick, 4000);
    return () => { off = true; clearInterval(h); };
  }, [session && session.public_id, liveStatus]);

  const startPay = async (payload) => {
    setPayError(""); setPaying(true);
    try {
      const res = await fetch(
        BASE + "/public/merchants/" + encodeURIComponent(business) + "/l/" + encodeURIComponent(link) + "/pay",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) { setPayError((body && body.message) || "The payment could not be started."); return null; }
      const data = (body && body.data) || {};
      setSession(data); setLiveStatus(data.status || "pending");
      return data;
    } catch (e) { setPayError("Could not reach the payment service."); return null; }
    finally { setPaying(false); }
  };

  const payMobile = () => {
    const msisdn = composeMsisdn(country, localPhone);
    if (!msisdn) { setPayError("Enter the mobile number to charge."); return; }
    if (isNative) return startPay({ method: "mpesa", payer_phone: msisdn });
    const net = (providers || []).find((p) => p.name && wallet && p.name.toLowerCase().indexOf(String(BRAND[wallet] && BRAND[wallet].name || "").split(" ")[0].toLowerCase()) >= 0);
    const networkId = (net && net.network_id) || (providers && providers[0] && providers[0].network_id);
    if (!networkId) { setPayError("Pick a wallet to continue."); return; }
    return startPay({ method: "momo", payer_phone: msisdn, country, network_id: networkId });
  };

  const reset = () => { setSession(null); setLiveStatus(""); setPayError(""); };

  /* ---------------------------------------------------------- chrome */
  const shell = (children, below = true) => (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "28px 16px", background: C.bg, fontFamily: SANS, color: C.ink }}>
      <div style={{ width: "min(412px, 100%)" }}>
        <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px -28px rgba(20,26,46,0.35)", background: C.card }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "#f2f3f8", borderBottom: "1px solid " + C.line }}>
            <span aria-hidden="true" style={{ fontSize: 9, color: C.faint }}>🔒</span>
            <span style={{ fontFamily: MONO, fontSize: 10, color: C.faint }}>
              pay.elementpay.net/c/{business}
            </span>
          </div>
          {children}
        </div>
        {below ? (
          <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 11, color: C.faint }}>
            Refunds within 24 h · support@{business}.co
          </p>
        ) : null}
      </div>
    </main>
  );

  const securedFooter = (
    <p style={{ margin: "12px 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 10.5, color: C.faint }}>
      <span aria-hidden="true">🔒</span> Secured by <strong style={{ color: C.muted, fontWeight: 700 }}>ElementPay</strong>
    </p>
  );

  if (state.phase === "loading")
    return shell(
      <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
        {[38, 64, 44, 140].map((h, i) => <div key={i} style={{ height: h, borderRadius: 10, background: "#f1f3f9" }} />)}
      </div>, false);

  if (state.phase === "error")
    return shell(
      <div style={{ padding: 30, textAlign: "center" }}>
        <h1 style={{ fontSize: 17, margin: "0 0 6px" }}>Link unavailable</h1>
        <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{state.message}</p>
      </div>, false);

  const initial = String(d.business_name || "?").trim().charAt(0).toUpperCase();
  const inactive = String(d.status || "active") !== "active";

  /* -------------------------------------------------------- result states */
  if (liveStatus === "completed")
    return shell(
      <div style={{ padding: "30px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ width: 56, height: 56, borderRadius: 999, border: "2.5px solid " + C.ok, color: C.ok, display: "grid", placeItems: "center", fontSize: 26, fontWeight: 700 }}>✓</span>
        <h1 style={{ fontSize: 19, margin: "12px 0 0" }}>Payment received</h1>
        <p style={{ margin: 0, fontSize: 12.5, color: C.muted }}>A receipt has been sent to you.</p>
        <div style={{ width: "100%", marginTop: 16, display: "flex", flexDirection: "column" }}>
          {[
            ["Paid", money(d.amount, cur) + " " + cur],
            ["Method", TAB_LABEL[active] + (session && session.account_number ? " · " + session.account_number : "")],
            ["Reference", (session && session.public_id ? session.public_id.slice(0, 8).toUpperCase() : "—")],
            ["Time", "Just now"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "11px 0", borderBottom: "1px dashed " + C.line }}>
              <span style={{ fontSize: 12, color: C.muted }}>{k}</span>
              <span style={{ fontSize: 12.5, fontFamily: MONO, color: C.ink, wordBreak: "break-all", textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => { if (d.success_url) window.location.href = d.success_url; }}
          style={{ marginTop: 18, width: "100%", padding: "13px 18px", borderRadius: 10, border: 0, background: C.accent, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}
        >
          Back to {d.business_name}
        </button>
        {securedFooter}
      </div>);

  if (liveStatus === "failed" || liveStatus === "expired") {
    const f = FAILURES[active] || FAILURES.mobile_money;
    return shell(
      <div style={{ padding: "30px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ width: 56, height: 56, borderRadius: 999, background: C.badBg, color: C.bad, display: "grid", placeItems: "center", fontSize: 24, fontWeight: 700 }}>✕</span>
        <h1 style={{ fontSize: 19, margin: "12px 0 0", textAlign: "center" }}>{f.title}</h1>
        <p style={{ margin: 0, fontSize: 12.5, color: C.muted, textAlign: "center", lineHeight: 1.6 }}>{f.why}</p>
        <p style={{ margin: "12px 0 0", padding: "7px 10px", borderRadius: 7, background: C.badBg, fontFamily: MONO, fontSize: 10.5, color: C.bad, fontWeight: 700 }}>
          {f.code} · You were not charged
        </p>
        <button type="button" onClick={reset}
          style={{ marginTop: 16, width: "100%", padding: "13px 18px", borderRadius: 10, border: 0, background: C.accent, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
          Try again
        </button>
        <button type="button" onClick={() => { reset(); setTab(null); }}
          style={{ marginTop: 8, width: "100%", padding: "12px 18px", borderRadius: 10, border: "1px solid " + C.line, background: "#fff", color: C.ink, fontSize: 13.5, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
          Use another method
        </button>
        {securedFooter}
      </div>);
  }

  const waiting = session && TERMINAL.indexOf(liveStatus) < 0;

  /* ------------------------------------------------------------- the card */
  return shell(
    <div style={{ padding: "16px 20px 20px" }}>
      {/* merchant + country */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: C.accent, color: "#fff", display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 800 }}>{initial}</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <strong style={{ display: "block", fontSize: 13.5, lineHeight: 1.3 }}>{d.business_name}</strong>
          <span style={{ fontSize: 11, color: C.faint }}>{d.title}</span>
        </span>
        {offeredCountries.length > 1 ? (
          <span style={{ position: "relative" }}>
            <button type="button" onClick={() => setCountryOpen((v) => !v)} disabled={Boolean(waiting)}
              aria-haspopup="listbox" aria-expanded={countryOpen}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", borderRadius: 8, border: "1px solid " + C.line, background: "#fff", cursor: waiting ? "default" : "pointer", fontFamily: "inherit", fontSize: 11.5, fontWeight: 600, color: C.ink }}>
              <img src={flagSrc(country)} alt="" width="16" height="11" style={{ display: "block", borderRadius: 2 }} />
              {mk ? mk.name : country}
              <span aria-hidden="true" style={{ color: C.faint, fontSize: 9 }}>▾</span>
            </button>
            {countryOpen ? (
              <div role="listbox" style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 20, width: 184, maxHeight: 248, overflowY: "auto", background: "#fff", border: "1px solid " + C.line, borderRadius: 10, boxShadow: "0 16px 40px -18px rgba(20,26,46,0.4)", padding: 4 }}>
                {offeredCountries.map((code) => (
                  <button key={code} type="button" role="option" aria-selected={code === country}
                    onClick={() => { setCountry(code); setCountryOpen(false); setTab(null); setLocalPhone(""); setPayError(""); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 9px", border: 0, borderRadius: 7, background: code === country ? C.accentSoft : "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, color: C.ink, textAlign: "left" }}>
                    <img src={flagSrc(code)} alt="" width="17" height="12" style={{ display: "block", borderRadius: 2 }} />
                    <span style={{ flex: 1 }}>{MARKETS[code].name}</span>
                    <span style={{ fontSize: 10.5, color: C.faint, fontFamily: MONO }}>{MARKETS[code].currency}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </span>
        ) : null}
      </div>

      {/* amount + rate hold */}
      <div style={{ marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.muted, fontFamily: MONO }}>{head.currency}</span>
          <strong style={{ fontSize: 34, letterSpacing: "-0.03em", lineHeight: 1 }}>{money(head.amount, head.currency)}</strong>
        </div>
        <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: C.muted }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: held > 0 ? C.ok : C.faint, flexShrink: 0 }} />
          {/* Redundant when the headline is already USDC. */}
          {usdcPrice && head.currency !== "USDC" ? (
            <span style={{ fontFamily: MONO }}>≈ {approxUsdc(usdcPrice.charge_amount)} USDC</span>
          ) : null}
          {held != null ? (
            <span style={{ color: C.faint }}>
              · rate held {Math.floor(held / 60)}:{String(held % 60).padStart(2, "0")}
            </span>
          ) : null}
        </div>
        {head.currency !== cur ? (
          <p style={{ margin: "6px 0 0", fontSize: 11.5, color: C.faint }}>
            ≈ {money(d.amount, cur)} {cur} to {d.business_name}
          </p>
        ) : null}
        {head.pending && mk ? (
          /* The wallet provider quotes the local figure when the prompt is
             raised, so we cannot state it yet. Say so rather than show the
             merchant's sticker currency, which this payer cannot act on. */
          <p style={{ margin: "4px 0 0", fontSize: 11.5, color: C.faint }}>
            Charged in {mk.currency} at today’s rate — shown before you approve.
          </p>
        ) : null}
      </div>

      {/* tabs */}
      {inactive || tabs.length === 0 ? (
        <p style={{ margin: "16px 0 0", padding: "12px 14px", borderRadius: 10, background: C.warnBg, color: C.warn, fontSize: 12.5, fontWeight: 600, lineHeight: 1.55 }}>
          {inactive ? "This link is no longer active." : d.business_name + " has not switched on a way to be paid here yet."}
        </p>
      ) : (
        <>
          <div role="tablist" style={{ display: "grid", gridTemplateColumns: "repeat(" + tabs.length + ", 1fr)", gap: 3, padding: 3, marginTop: 15, background: C.chip, borderRadius: 10 }}>
            {tabs.map((k) => {
              const on = active === k;
              return (
                <button key={k} role="tab" aria-selected={on} type="button" disabled={Boolean(waiting)}
                  onClick={() => { setTab(k); setPayError(""); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    padding: "8px 6px", borderRadius: 8, border: 0, cursor: waiting ? "default" : "pointer",
                    fontFamily: "inherit", fontSize: 12, fontWeight: on ? 700 : 600,
                    background: on ? "#fff" : "transparent", color: on ? C.ink : C.muted,
                    boxShadow: on ? "0 1px 3px rgba(20,26,46,0.12)" : "none",
                  }}>
                  {TAB_LABEL[k]}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 16 }}>
            {/* ------------------------------------------- mobile money */}
            {active === "mobile_money" ? (
              waiting ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Stages names={["Request sent", "Approve on phone", "Confirmed"]} at={1} />
                  <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: 16, margin: "4px 0 6px" }}>Check your phone</h2>
                    <p style={{ margin: 0, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
                      Enter your PIN on the prompt to approve {money(head.amount, head.currency)} {head.currency} to {d.business_name}.
                    </p>
                  </div>
                  <button type="button" onClick={reset}
                    style={{ padding: "11px 16px", borderRadius: 10, border: "1px solid " + C.line, background: "#fff", color: C.ink, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
                    Cancel payment
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: C.muted }}>Choose your wallet</span>
                  {!isNative && providerErr ? (
                    <p style={{ margin: 0, padding: "10px 12px", borderRadius: 9, background: C.warnBg, color: C.warn, fontSize: 12, fontWeight: 600 }}>{providerErr}</p>
                  ) : null}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {(mk ? mk.wallets : []).map((w) => {
                      const on = wallet === w;
                      return (
                        <button key={w} type="button" onClick={() => { setWallet(w); setPayError(""); }} aria-pressed={on}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                            padding: "13px 10px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
                            border: "1.5px solid " + (on ? C.accent : C.line), background: "#fff",
                            boxShadow: on ? "0 0 0 3px " + C.accentSoft : "none",
                          }}>
                          <BrandMark id={w} />
                          <span style={{ fontSize: 11.5, fontWeight: 600, color: C.ink }}>{BRAND[w] ? BRAND[w].name : w}</span>
                        </button>
                      );
                    })}
                  </div>

                  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: C.muted }}>Mobile number</span>
                    <span style={{ display: "flex", alignItems: "stretch", border: "1px solid " + C.line, borderRadius: 10, overflow: "hidden", background: "#fbfcfe" }}>
                      <span style={{ display: "grid", placeItems: "center", padding: "0 11px", background: C.chip, fontFamily: MONO, fontSize: 13, fontWeight: 700, color: C.muted, borderRight: "1px solid " + C.line }}>
                        {dialFor(country)}
                      </span>
                      <input type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="712 345 678"
                        value={localPhone}
                        onChange={(e) => { setLocalPhone(e.target.value); setPayError(""); }}
                        onKeyDown={(e) => { if (e.key === "Enter" && !paying) payMobile(); }}
                        style={{ flex: 1, minWidth: 0, padding: "12px 12px", border: 0, outline: "none", background: "transparent", fontFamily: MONO, fontSize: 14.5, color: C.ink }} />
                    </span>
                  </label>
                  <p style={{ margin: "-4px 0 0", fontSize: 11, color: C.faint, lineHeight: 1.5 }}>
                    We send a payment prompt to this number. Approve it with your PIN.
                  </p>

                  {payError ? (
                    <p style={{ margin: 0, padding: "10px 12px", borderRadius: 9, background: C.badBg, color: C.bad, fontSize: 12, fontWeight: 600, lineHeight: 1.5 }}>{payError}</p>
                  ) : null}

                  <button type="button" onClick={payMobile} disabled={paying}
                    style={{ padding: "14px 18px", borderRadius: 10, border: 0, background: C.accent, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: paying ? "default" : "pointer", opacity: paying ? 0.6 : 1 }}>
                    {paying
                      ? "Sending prompt…"
                      : "Pay with " + (BRAND[wallet] ? BRAND[wallet].name : "mobile money") +
                        (head.pending ? "" : " · " + head.currency + " " + money(head.amount, head.currency))}
                  </button>
                </div>
              )
            ) : null}

            {/* --------------------------------------------------- bank */}
            {active === "bank_transfer" ? (
              session && session.account_number ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <Stages names={["Details ready", "Awaiting transfer", "Matched"]} at={1} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <Field label="Business number" value={session.paybill_number} />
                    <Field label="Account no." value={session.account_number} />
                    <Field label="Amount" value={money(session.charge_amount, session.charge_currency) + " " + session.charge_currency} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: 15.5, margin: "2px 0 6px" }}>Waiting for your transfer</h2>
                    <p style={{ margin: 0, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
                      Send exactly {money(session.charge_amount, session.charge_currency)} {session.charge_currency} from
                      M-Pesa or your banking app. A different amount will not match.
                    </p>
                  </div>
                  <button type="button" onClick={reset}
                    style={{ padding: "11px 16px", borderRadius: 10, border: "1px solid " + C.line, background: "#fff", color: C.ink, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
                    Cancel payment
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: 13, borderRadius: 11, background: "#fbfcfe", border: "1px solid " + C.line }}>
                    <span style={{ width: 34, height: 34, borderRadius: 9, background: C.chip, display: "grid", placeItems: "center", fontSize: 15, flexShrink: 0 }} aria-hidden="true">🏦</span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ display: "block", fontSize: 13 }}>Pay by bank transfer</strong>
                      <span style={{ fontSize: 11.5, color: C.muted }}>
                        Send {mk ? mk.currency : cur} from any {mk ? mk.name : ""} banking app.
                      </span>
                    </span>
                    {mk && mk.bankRail ? (
                      <span style={{ padding: "3px 8px", borderRadius: 999, background: C.accentSoft, color: C.accentInk, fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
                        {mk.bankRail}
                      </span>
                    ) : null}
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                    <Check>One-time account number for this payment</Check>
                    <Check>Use the reference so we can match it</Check>
                    <Check>Confirms in seconds on {mk ? mk.bankRail : "the bank rail"}</Check>
                  </ul>
                  {payError ? (
                    <p style={{ margin: 0, padding: "10px 12px", borderRadius: 9, background: C.badBg, color: C.bad, fontSize: 12, fontWeight: 600 }}>{payError}</p>
                  ) : null}
                  <button type="button" onClick={() => startPay({ method: "paybill" })} disabled={paying}
                    style={{ padding: "14px 18px", borderRadius: 10, border: 0, background: C.accent, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: paying ? "default" : "pointer", opacity: paying ? 0.6 : 1 }}>
                    {paying ? "Preparing…" : "Get transfer details · " + head.currency + " " + money(head.amount, head.currency)}
                  </button>
                </div>
              )
            ) : null}

            {/* ------------------------------------------------- crypto */}
            {active === "stablecoin" ? (
              depositAddress ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
                  <Stages names={["Address ready", "Deposit seen", "Confirmed"]} at={1} />
                  {qr ? (
                    <img src={qr} alt="Deposit address QR code" width="156" height="156" style={{ display: "block", borderRadius: 10 }} />
                  ) : <div style={{ width: 156, height: 156, borderRadius: 10, background: C.chip }} />}
                  <Field label="Address" value={depositAddress} />
                  {session.deposit_memo ? (
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 7 }}>
                      <Field label="Memo (required)" value={session.deposit_memo} />
                      <p style={{ margin: 0, padding: "9px 11px", borderRadius: 9, background: C.warnBg, color: C.warn, fontSize: 11.5, fontWeight: 700, lineHeight: 1.5 }}>
                        A Stellar payment without this memo cannot be matched and needs manual recovery.
                      </p>
                    </div>
                  ) : null}
                  <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: 15.5, margin: "2px 0 6px" }}>Waiting for your deposit</h2>
                    <p style={{ margin: 0, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
                      Send {session.customer_total_usdc || session.charge_amount} USDC on{" "}
                      {activeNet ? activeNet.sub : session.source_chain}. Do not use another network.
                    </p>
                  </div>
                  <button type="button" onClick={reset}
                    style={{ width: "100%", padding: "11px 16px", borderRadius: 10, border: "1px solid " + C.line, background: "#fff", color: C.ink, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
                    Cancel payment
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: C.muted }}>Choose a network</span>
                  {networks.length ? (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
                        {networks.map((n) => {
                          const on = activeNet && activeNet.chain === n.chain;
                          return (
                            <button key={n.chain} type="button" onClick={() => { setNetChain(n.chain); setPayError(""); }} aria-pressed={Boolean(on)}
                              style={{
                                display: "flex", alignItems: "center", gap: 6, padding: "9px 8px", borderRadius: 10,
                                cursor: "pointer", fontFamily: "inherit", background: "#fff",
                                border: "1.5px solid " + (on ? C.accent : C.line),
                                boxShadow: on ? "0 0 0 3px " + C.accentSoft : "none",
                              }}>
                              <img src={chainSrc(n.chain)} alt="" width="18" height="18" style={{ display: "block", borderRadius: 999, flexShrink: 0 }} />
                              <span style={{ minWidth: 0, textAlign: "left" }}>
                                <span style={{ display: "block", fontSize: 11, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>{n.label}</span>
                                <span style={{ display: "block", fontSize: 9.5, color: C.faint, lineHeight: 1.3 }}>{n.sub}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {/* Fee breakdown. The bridge fee is charged to the
                          customer, so every line of it is shown. */}
                      <div style={{ padding: "4px 12px 11px", borderRadius: 10, background: "#fbfcfe", border: "1px solid " + C.line }}>
                        {stableQuote ? (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 12, color: C.muted }}>
                              <span>Merchant receives</span>
                              <span style={{ fontFamily: MONO, color: C.ink }}>{stableQuote.amount_usdc} USDC</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 12, color: C.muted, borderBottom: "1px dashed " + C.line }}>
                              <span>
                                Network fee
                                {Number(stableQuote.bridge_fee_usdc) === 0 ? (
                                  <span style={{ color: C.ok, fontWeight: 700 }}> · none on {activeNet.sub}</span>
                                ) : null}
                              </span>
                              <span style={{ fontFamily: MONO, color: C.ink }}>{stableQuote.bridge_fee_usdc} USDC</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10 }}>
                              <span style={{ fontSize: 12.5, fontWeight: 700 }}>You send</span>
                              <strong style={{ fontSize: 15, fontFamily: MONO }}>{stableQuote.customer_total_usdc} USDC</strong>
                            </div>
                          </>
                        ) : (
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 11 }}>
                            <span style={{ fontSize: 12, color: C.muted }}>You send</span>
                            <strong style={{ fontSize: 15, fontFamily: MONO, color: quoting ? C.faint : C.ink }}>
                              {quoting ? "quoting…" : (usdcPrice ? usdcPrice.charge_amount + " USDC" : "—")}
                            </strong>
                          </div>
                        )}
                      </div>
                      {activeNet && activeNet.chain === "stellar" ? (
                        <p style={{ margin: 0, fontSize: 11.5, color: C.muted, lineHeight: 1.5 }}>
                          Stellar settles directly — no bridge fee. You will need to attach a memo.
                        </p>
                      ) : null}
                      {payError ? (
                        <p style={{ margin: 0, padding: "10px 12px", borderRadius: 9, background: C.badBg, color: C.bad, fontSize: 12, fontWeight: 600 }}>{payError}</p>
                      ) : null}
                      <button type="button" disabled={paying}
                        onClick={() => startPay({ method: "stable_usdc", source_chain: (activeNet && activeNet.chain) || networks[0].chain })}
                        style={{ padding: "14px 18px", borderRadius: 10, border: 0, background: C.accent, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: paying ? "default" : "pointer", opacity: paying ? 0.6 : 1 }}>
                        {paying
                          ? "Preparing…"
                          : "Pay with USDC · " + ((stableQuote && stableQuote.customer_total_usdc) || (usdcPrice && usdcPrice.charge_amount) || "") + " USDC"}
                      </button>
                    </>
                  ) : (
                    <p style={{ margin: 0, padding: "12px 14px", borderRadius: 10, background: C.warnBg, color: C.warn, fontSize: 12.5, fontWeight: 600 }}>
                      No network is enabled for this merchant yet.
                    </p>
                  )}
                </div>
              )
            ) : null}
          </div>
        </>
      )}
      {securedFooter}
    </div>);
}
