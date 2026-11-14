/* Ported verbatim from "ElementPay Merchant V3 frozen 2026-11-08.dc.html" (Claude Design project). */
/* eslint-disable */
// @ts-nocheck
import React from "react";
import { qrDataUrl } from "./qr.js";
const DCLogic = React.Component;
const INDIGO = "var(--indigo)";
const TINT = "var(--indigo-tint)";


const GKE = { KES: 1, NGN: 129.2 / 1540, USD: 129.2, UGX: 129.2 / 3700, TZS: 129.2 / 2585 };
const GMON = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const GP = [
  ["Kisumu Cold Chain Ltd", "ke", "Kenya", "KES", "Live", "Jun 4", 0, 38000], ["Eldoret Agro Exports", "ke", "Kenya", "KES", "Live", "Jun 22", 1, 52000],
  ["Lekki Freight Brokers", "ng", "Nigeria", "NGN", "Live", "Jul 3", 1, 410000], ["Kampala Remit Hub", "ug", "Uganda", "USD", "Live", "Aug 11", 3, 620],
  ["Accra Trade Desk", "gh", "Ghana", "USD", "Lapsed", "Jun 15", 1, 300], ["Mombasa Port Agents", "ke", "Kenya", "KES", "Verified", "Sep 5", -1, 0],
  ["Ibadan Textile Exports", "ng", "Nigeria", "NGN", "Verified", "Sep 18", -1, 0], ["Nakuru Print Works", "ke", "Kenya", "KES", "Signed up", "Oct 2", -1, 0],
  ["Dar Clearing House", "tz", "Tanzania", "USD", "Signed up", "Oct 14", -1, 0], ["Kumasi Cocoa Traders", "gh", "Ghana", "USD", "Signed up", "Oct 21", -1, 0],
  ["Jinja Remit Services", "ug", "Uganda", "USD", "Invited", "Nov 2", -1, 0], ["Abuja Money Desk", "ng", "Nigeria", "NGN", "Invited", "Nov 3", -1, 0],
  ["Thika Wholesale", "ke", "Kenya", "KES", "Invited", "Nov 5", -1, 0], ["Mwanza Remit", "tz", "Tanzania", "USD", "Invited", "Nov 6", -1, 0]
].map(([name, cc, country, cur, st, on, start, base], i) => ({ id: "ref_" + (101 + i), name, cc, country, cur, st, on, start, base,
  fees: GMON.map((m, k) => start < 0 || k < start || (st === "Lapsed" && k > 3) ? 0 : Math.round(base * (1 + 0.12 * (k - start)))) }));
const CN = [
  ["Acme Commerce Uganda Ltd", "Own entity", "ug", "Uganda", "Active", "Collect, Pay out", "UGX, USD"], ["Acme Imports Tanzania Ltd", "Own entity", "tz", "Tanzania", "Active", "Collect, Pay out", "TZS, USD"],
  ["Acme Nairobi CBD branch", "Own entity", "ke", "Kenya", "Active", "Collect, Pay out", "KES"], ["Acme Lagos office", "Own entity", "ng", "Nigeria", "In review", "Collect", "NGN"],
  ["Kibera Agent Network", "Partner", "ke", "Kenya", "Active", "Collect, Pay out", "KES"], ["Eastleigh Remit Agents", "Partner", "ke", "Kenya", "Restricted", "Collect", "KES, USD"],
  ["Kisii Traders Collective", "Partner", "ke", "Kenya", "Information needed", "Collect", "KES"], ["Machakos Market Sellers", "Partner", "ke", "Kenya", "Invited", "Collect", "KES"],
  ["Garissa Agents Ltd", "Partner", "ke", "Kenya", "Restricted", "Collect, Pay out", "KES"]
].map(([name, type, cc, country, st, caps, curs], i) => ({ id: "acct_" + (201 + i), name, type, cc, country, st, caps, curs, created: ["Mar 2026", "Apr 2026", "May 2026", "Oct 2026", "Jun 2026", "Jul 2026", "Oct 2026", "Nov 2026", "Aug 2026"][i] }));
const CNPAY = Array.from({ length: 40 }, (_, i) => { const acc = [0, 1, 2, 4, 5, 8][i % 6]; const gross = [100000, 42500, 18200, 250000, 7800, 64000, 12500, 33000][i % 8]; const day = 38 - Math.floor(i * 29 / 39); return { id: "rp_" + (5400 - i), acc, gross, day, date: day > 31 ? "Nov " + (day - 31) : "Oct " + day, st: i === 7 || i === 23 ? "Failed" : i === 3 ? "Refunded" : "Settled", fx: CN[acc].cc === "ke" ? 0 : Math.round(gross * 0.006) }; });
const CNOUT = [[0, "Nov 6", 412300, "Paid"], [1, "Nov 6", 188900, "Paid"], [2, "Nov 6", 96400, "Paid"], [4, "Nov 6", 61200, "Failed"], [5, "Nov 5", 22000, "Failed"], [8, "Oct 30", 47800, "Failed"], [0, "Oct 30", 389100, "Paid"], [4, "Oct 30", 58900, "Paid"]];
const BPL = [["pl_1", "Starter retainer", "KES", 15000, "Monthly", 14], ["pl_2", "Growth retainer", "KES", 45000, "Monthly", 0], ["pl_3", "Export desk", "USD", 350, "Monthly", 7], ["pl_4", "Quarterly compliance pack", "NGN", 450000, "Quarterly", 0], ["pl_5", "Annual platform licence", "USD", 3600, "Yearly", 30]].map(([id, name, cur, price, iv, trial]) => ({ id, name, cur, price, iv, trial }));
const BCUST = ["Kilimani Dental Clinic", "Westlands Logistics", "Ruaka Hardware", "Lagos Bay Imports", "Kampala Print Co", "Ngong Road Motors", "Karen Vet Centre", "Thika Road Pharmacy", "Ikoyi Design Studio", "Mombasa Spice Co", "Nyeri Coffee Mill", "Kitengela Feeds", "Abuja Office Supplies", "Juja Farm Inputs", "Kisumu Water Works", "Ota Plastics", "Embu Agro Dealers", "Eldoret Tyres", "Kigali Tech Hub", "Malindi Resorts", "Naivasha Flowers", "Arusha Tours", "Enugu Builders", "Machakos Grains", "Nanyuki Outfitters", "Kakamega Mills", "Kericho Tea Packers", "Yaba Code School", "Lamu Dhow Trips", "Voi Transport", "Kilifi Salt Works", "Meru Dairy", "Bungoma Sugar", "Kitale Seeds", "Garissa Camel Milk", "Isiolo Traders", "Kajiado Ranchers", "Narok Lodges"];
const BST8 = ["Active", "Active", "Active", "Active", "Active", "Trialing", "Active", "Past due", "Active", "Paused", "Active", "Active", "Unpaid", "Active", "Canceled", "Active", "Trialing", "Active", "Past due", "Active", "Active", "Paused", "Active", "Active", "Trialing", "Past due", "Active", "Canceled", "Active", "Active", "Unpaid", "Active", "Paused", "Trialing", "Active", "Past due", "Canceled", "Active"];
const BSUB = BCUST.map((cust, i) => ({ id: "sub_" + (3100 + i), cust, pl: ["pl_1", "pl_2", "pl_3", "pl_1", "pl_4", "pl_2", "pl_1", "pl_3", "pl_5", "pl_1", "pl_2", "pl_1"][i % 12], st: BST8[i], start: i % 6, rail: ["Mobile money prompt", "Card on file", "Hosted link"][i % 3], nextDay: 8 + (i * 5) % 22 }));

const XUSD = { KES: 129.2, CNY: 7.17, GBP: 0.788, EUR: 0.924, NGN: 1540, TZS: 2585, UGX: 3700, RWF: 1390, GHS: 15.6, USDC: 1 };
const XCOR = {
  "KE-CN": { from: "KES", to: "CNY", fc: "ke", tc: "cn", name: "Kenya to China", rate: 0.05512, mid: 0.05545, flat: 150, rail: "Bank transfer, CNAPS", eta: "Same business day if funded before 15:00 China time", tag: "Pilot", median: "37 min" },
  "KE-GB": { from: "KES", to: "GBP", fc: "ke", tc: "gb", name: "Kenya to United Kingdom", rate: 0.006062, mid: 0.006098, flat: 150, rail: "Faster Payments", eta: "Under 2 hours", tag: "Pilot", median: "48 min" },
  "KE-EU": { from: "KES", to: "EUR", fc: "ke", tc: "eu", name: "Kenya to euro area", rate: 0.007105, mid: 0.007148, flat: 150, rail: "SEPA credit transfer", eta: "Next business day", tag: "Pilot", median: "19 h" },
  "KE-NG": { from: "KES", to: "NGN", fc: "ke", tc: "ng", name: "Kenya to Nigeria", rate: 11.86, mid: 11.93, flat: 150, rail: "NIP bank transfer", eta: "Under 30 minutes", tag: "Pilot", median: "14 min" },
  "KE-TZ": { from: "KES", to: "TZS", fc: "ke", tc: "tz", name: "Kenya to Tanzania", rate: 20.05, mid: 20.16, flat: 150, rail: "M-Pesa Tanzania or bank", eta: "Under 30 minutes", tag: "Pilot", median: "9 min" },
  "USDC-KE": { from: "USDC", to: "KES", fc: "usdc", tc: "ke", name: "USDC to Kenya", rate: 129.04, mid: 129.2, flat: 0.5, rail: "M-Pesa or bank", eta: "Under 2 minutes on M-Pesa", tag: "Live", median: "1 min 40 s" },
  "KE-USDC": { from: "KES", to: "USDC", fc: "ke", tc: "usdc", name: "KES to USDC", rate: 0.007712, mid: 0.00774, flat: 0, rail: "Internal conversion", eta: "Instant", tag: "Pilot", median: "Instant" },
  "NG-KE": { from: "NGN", to: "KES", fc: "ng", tc: "ke", name: "Nigeria to Kenya", rate: 0.0838, mid: 0.0843, flat: 1500, rail: "Credited to KES balance", eta: "Under 1 hour", tag: "Pilot", median: "22 min" },
  "TZ-KE": { from: "TZS", to: "KES", fc: "tz", tc: "ke", name: "Tanzania to Kenya", rate: 0.0497, mid: 0.04998, flat: 2500, rail: "Credited to KES balance", eta: "Under 1 hour", tag: "Pilot", median: "18 min" }
};
XCOR["KE-CN"].cutoff = "Funded before 15:00 China time (10:00 Nairobi) pays out the same business day. Later pays out the next business day.";
XCOR["KE-GB"].cutoff = "Funded before 16:30 UK time pays out the same day. Weekends and UK bank holidays move to the next business day.";
XCOR["KE-EU"].cutoff = "Funded before 14:00 CET pays out the next business day.";
["KE-NG", "KE-TZ", "USDC-KE", "KE-USDC", "NG-KE", "TZ-KE"].forEach(id => { XCOR[id].cutoff = "No cutoff. Runs 24/7, including public holidays."; });
XCOR["LOCAL"] = { from: "KES", to: "KES", fc: "ke", tc: "ke", name: "Local payout in Kenya", rate: 1, mid: 1, flat: 30, rail: "M-Pesa or bank", eta: "Under 2 minutes on mobile money", tag: "Live", median: "1 min 10 s", cutoff: "No cutoff. Runs 24/7, including public holidays." };
const CUR2COR = { CNY: "KE-CN", GBP: "KE-GB", EUR: "KE-EU", NGN: "KE-NG", TZS: "KE-TZ" };
const xfmt = (n, c) => { const d = c === "KES" || c === "NGN" || c === "TZS" ? 0 : 2; return c + " " + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }); };
const xrate = r => r >= 100 ? r.toFixed(2) : r >= 1 ? r.toFixed(4) : r.toPrecision(4);
const xcalc = (corr, send, j) => { const c = XCOR[corr]; const sp = Math.round((c.mid - c.rate) / c.mid * 10000) / 100; const rate = c.mid * (1 - sp / 100) * (1 + (j || 0)); const fee = Math.round((send * 0.005 + c.flat) * 100) / 100; return { c, rate, fee, sp, recv: Math.max(0, (send - fee) * rate), spread: sp / 100, spreadCost: Math.round(send * sp) / 100 }; };
const XST = {
  "Awaiting approval": { bg: "var(--indigo-tint)", fg: "var(--indigo-text)", icon: "◔", note: "Waiting for the second approver. Funding opens once approved." },
  "Awaiting funds": { bg: "var(--warn-bg)", fg: "var(--warn-text)", icon: "◷", note: "Waiting for your funds. If the quote expires first, we requote when the funds land." },
  "Converting": { bg: "var(--indigo-tint)", fg: "var(--indigo-text)", icon: "⇄", note: "Funds received. Converting at the locked rate." },
  "Settling": { bg: "var(--indigo-tint)", fg: "var(--indigo-text)", icon: "→", note: "Paying out on the local rail." },
  "Settled": { bg: "var(--ok-bg)", fg: "var(--ok-text)", icon: "✓", note: "Delivered to the beneficiary. Proof of payment is ready." },
  "Failed": { bg: "var(--bad-bg)", fg: "var(--bad-text)", icon: "✕", note: "The receiving bank rejected the payout. The full amount returns to your balance." },
  "Refunded": { bg: "var(--surface)", fg: "var(--muted)", icon: "↺", note: "Returned to your balance. The fee was waived." },
  "On hold": { bg: "var(--warn-bg)", fg: "var(--warn-text)", icon: "‖", note: "Compliance needs a document before we convert." }
};
const XBENS = [
  ["Shenzhen Hengda Packaging Co", "cn", "China", "CNY", "Bank · CNAPS", "6222 •••• 4410", "Verified", "Exact match"],
  ["Guangzhou Lumen Electronics", "cn", "China", "CNY", "Bank · CNAPS", "6217 •••• 0932", "Verified", "Exact match"],
  ["Ningbo Coastline Textiles", "cn", "China", "CNY", "Bank · CNAPS", "6228 •••• 7715", "Pending", "Running"],
  ["Yiwu Brightway Trading", "cn", "China", "CNY", "Bank · CNAPS", "6230 •••• 2258", "Verified", "Exact match"],
  ["Harrow Fold Machinery Ltd", "gb", "United Kingdom", "GBP", "Faster Payments", "20-41-77 ••••5512", "Verified", "Exact match"],
  ["Calder & Pike Supplies", "gb", "United Kingdom", "GBP", "Faster Payments", "40-12-09 ••••8830", "Verified", "Close match: Calder and Pike Supplies Ltd"],
  ["Northwick Labels Ltd", "gb", "United Kingdom", "GBP", "Faster Payments", "60-83-01 ••••1147", "Blocked", "Exact match"],
  ["Onitsha Parts Depot", "ng", "Nigeria", "NGN", "NIP bank transfer", "NUBAN ••••4471", "Verified", "Exact match"],
  ["Mbeya Coffee Growers", "tz", "Tanzania", "TZS", "M-Pesa Tanzania", "+255 7•• ••• 318", "Verified", "Exact match"],
  ["Dar Coastal Freight", "tz", "Tanzania", "TZS", "Bank transfer", "••••6620", "Pending", "Running"],
  ["Lagos Harbour Agents", "ng", "Nigeria", "NGN", "NIP bank transfer", "NUBAN ••••0193", "Verified", "Exact match"],
  ["Rhein Valve GmbH", "de", "Germany", "EUR", "SEPA · IBAN", "DE89 •••• •••• 3000", "Verified", "Exact match"]
].map(([name, cc, countryName, cur, rail, acct, status, match]) => ({ name, cc, countryName, cur, rail, acct, status, match }));
const XREM = [
  ["Ikeja Retail Collective", "ng", "Nigeria", "NGN", 14, 21800000, "Nov 6", "Feb 2026"],
  ["Arusha Agro Supplies", "tz", "Tanzania", "TZS", 9, 96400000, "Nov 5", "Mar 2026"],
  ["Kano Textile House", "ng", "Nigeria", "NGN", 6, 11300000, "Nov 4", "Apr 2026"],
  ["Mwanza Fisheries Co-op", "tz", "Tanzania", "TZS", 11, 58200000, "Nov 2", "Jan 2026"],
  ["Abuja Office Mart", "ng", "Nigeria", "NGN", 3, 4900000, "Oct 30", "Aug 2026"],
  ["Zanzibar Spice Traders", "tz", "Tanzania", "TZS", 5, 31700000, "Oct 28", "Jun 2026"],
  ["Enugu Hardware Hub", "ng", "Nigeria", "NGN", 8, 15600000, "Oct 25", "May 2026"],
  ["Dodoma Build Mart", "tz", "Tanzania", "TZS", 2, 7400000, "Oct 12", "Sep 2026"]
].map(([name, cc, countryName, cur, pays, total, last, created]) => ({ name, cc, countryName, cur, pays, total, last, created }));
const XGUEST = [
  ["Guest · t.adebayo@…", "ng", "Nigeria", "NGN", 1, 185000, "Nov 6", "Nov 2026"],
  ["Guest · m.kimaro@…", "tz", "Tanzania", "TZS", 1, 640000, "Nov 3", "Nov 2026"],
  ["Guest · c.eze@…", "ng", "Nigeria", "NGN", 2, 410000, "Oct 29", "Oct 2026"],
  ["Guest · +255 7•• ••• 902", "tz", "Tanzania", "TZS", 1, 220000, "Oct 21", "Oct 2026"]
].map(([name, cc, countryName, cur, pays, total, last, created]) => ({ name, cc, countryName, cur, pays, total, last, created }));
const XPAY = [
  ["XB-24119", 4, "KE-GB", 2400000, "Awaiting approval", "Nov 7", "10:05"], ["XB-24117", 0, "KE-CN", 1850000, "Settling", "Nov 7", "09:42"], ["XB-24116", 4, "KE-GB", 920000, "Awaiting funds", "Nov 7", "09:10"],
  ["XB-24115", "r0", "NG-KE", 4200000, "Converting", "Nov 7", "08:55"], ["XB-24114", 1, "KE-CN", 640000, "On hold", "Nov 6", "17:20"],
  ["XB-24113", "own", "USDC-KE", 12000, "Settled", "Nov 6", "15:02"], ["XB-24112", 5, "KE-GB", 310000, "Failed", "Nov 6", "11:48"],
  ["XB-24111", 11, "KE-EU", 780000, "Settled", "Nov 6", "10:05"], ["XB-24110", "r1", "TZ-KE", 18500000, "Settled", "Nov 5", "16:40"],
  ["XB-24109", 3, "KE-CN", 1220000, "Refunded", "Nov 5", "13:12"], ["XB-24108", "own", "USDC-KE", 3400, "Settled", "Nov 5", "11:30"],
  ["XB-24107", 0, "KE-CN", 2100000, "Settled", "Nov 4", "10:18"], ["XB-24106", "r2", "NG-KE", 2650000, "Settled", "Nov 4", "09:02"],
  ["XB-24105", 4, "KE-GB", 1480000, "Settled", "Nov 3", "15:55"], ["XB-24104", "own", "USDC-KE", 5200, "Settled", "Nov 3", "12:20"],
  ["XB-24103", 2, "KE-CN", 560000, "Awaiting funds", "Nov 3", "10:44"], ["XB-24102", "r3", "TZ-KE", 9200000, "Settled", "Nov 2", "17:31"],
  ["XB-24101", 10, "KE-NG", 450000, "Settled", "Nov 2", "11:09"], ["XB-24100", 9, "KE-TZ", 280000, "Settled", "Nov 1", "14:26"],
  ["XB-24099", 1, "KE-CN", 1730000, "Settled", "Oct 31", "09:50"], ["XB-24098", "own", "KE-USDC", 2500000, "Settled", "Oct 31", "08:15"],
  ["XB-24097", 5, "KE-GB", 620000, "Settled", "Oct 30", "16:02"], ["XB-24096", "r4", "NG-KE", 1880000, "Failed", "Oct 30", "12:47"],
  ["XB-24095", 3, "KE-CN", 990000, "Settled", "Oct 29", "10:33"], ["XB-24094", 7, "KE-NG", 620000, "Settled", "Oct 29", "09:12"],
  ["XB-24093", 11, "KE-EU", 1150000, "Settled", "Oct 28", "15:40"], ["XB-24092", "r5", "TZ-KE", 12400000, "Settled", "Oct 28", "11:21"],
  ["XB-24091", 0, "KE-CN", 1640000, "Settled", "Oct 27", "10:02"], ["XB-24090", 4, "KE-GB", 870000, "Settled", "Oct 27", "09:30"],
  ["XB-24089", 8, "KE-TZ", 180000, "Settled", "Oct 26", "14:14"], ["XB-24088", "r6", "NG-KE", 3150000, "Settled", "Oct 25", "13:05"]
].map(([id, party, corr, send, status, date, time]) => ({ id, party, corr, send, status, date, time, j: 0 }));

const HOMES = {
  KES: { cc: "ke", country: "Kenya", city: "Nairobi", curName: "Kenyan shilling", names: ["Kilimo Fresh Wholesalers", "Mwangaza Logistics", "Ruiru Packaging Works"], rails: ["M-Pesa Paybill", "Bank transfer", "M-Pesa Till"], accts: ["Paybill 522533 · KF-22", "•••• 4410", "Till 832909"], dial: "+254 7", mobile: "M-Pesa", dest: "M-Pesa Paybill 247247 · ACME" },
  TZS: { cc: "tz", country: "Tanzania", city: "Dar es Salaam", curName: "Tanzanian shilling", names: ["Kariakoo Wholesalers", "Pugu Logistics", "Mbezi Packaging"], rails: ["M-Pesa Lipa Namba", "Bank transfer", "Tigo Pesa"], accts: ["Lipa Namba 57412203", "•••• 2210", "+255 7•• ••• 318"], dial: "+255 7", mobile: "M-Pesa", dest: "M-Pesa Lipa Namba 57412203" },
  UGX: { cc: "ug", country: "Uganda", city: "Kampala", curName: "Ugandan shilling", names: ["Owino Market Traders", "Nakawa Logistics", "Mukono Packaging"], rails: ["MTN MoMoPay", "Bank transfer", "Airtel Money"], accts: ["MoMoPay 416313", "•••• 7781", "+256 7•• ••• 902"], dial: "+256 7", mobile: "MTN MoMo", dest: "MTN MoMoPay 416313" },
  RWF: { cc: "rw", country: "Rwanda", city: "Kigali", curName: "Rwandan franc", names: ["Kimironko Wholesale", "Gikondo Logistics", "Remera Packaging"], rails: ["MTN MoMoPay", "Bank transfer", "Airtel Money"], accts: ["MoMoPay 416313", "•••• 3304", "+250 7•• ••• 551"], dial: "+250 7", mobile: "MTN MoMo", dest: "MTN MoMoPay 416313" },
  GHS: { cc: "gh", country: "Ghana", city: "Accra", curName: "Ghanaian cedi", names: ["Makola Wholesalers", "Tema Logistics", "Kaneshie Packaging"], rails: ["MTN MoMo", "Bank transfer", "Telecel Cash"], accts: ["MoMo merchant 416313", "•••• 9120", "+233 2•• ••• 447"], dial: "+233 2", mobile: "MTN MoMo", dest: "MTN MoMo merchant 416313" },
  NGN: { cc: "ng", country: "Nigeria", city: "Lagos", curName: "Nigerian naira", names: ["Balogun Wholesalers", "Apapa Logistics", "Ikeja Packaging"], rails: ["Bank transfer (NIP)", "Bank transfer (NIP)", "OPay"], accts: ["NUBAN ••••4471", "NUBAN ••••0193", "OPay +234 8•• ••• 206"], dial: "+234 8", mobile: "OPay", dest: "OPay wallet +234 8•• ••• 206" }
};
const LOCALRAIL = { KES: "M-Pesa or bank", TZS: "M-Pesa Tanzania or bank", UGX: "MTN MoMo or bank", RWF: "MTN MoMo or bank", GHS: "MTN MoMo or bank", NGN: "NIP bank transfer", CNY: "Bank transfer, CNAPS", GBP: "Faster Payments", EUR: "SEPA credit transfer" };
const HOME = { cur: "KES", cc: "ke", country: "Kenya", city: "Nairobi", curName: "Kenyan shilling", f: 1, thr: 1e6, per: 1e7, day: 5e7, dial: "+254 7", mobile: "M-Pesa", dest: "M-Pesa Paybill 247247 · ACME" };
XBENS.push.apply(XBENS, [0, 1, 2].map(i => ({ name: HOMES.KES.names[i], cc: "ke", countryName: "Kenya", cur: "KES", rail: HOMES.KES.rails[i], acct: ["Paybill 522533 · KF-22", "•••• 4410", "Till 832909"][i], status: "Verified", match: "Exact match", local: true })));
[["LP-8821", 12, 184000, "Settled", "Nov 7", "11:20"], ["LP-8819", 14, 42300, "Settling", "Nov 7", "12:02"], ["LP-8820", 13, 96500, "Settled", "Nov 6", "16:05"], ["LP-8818", 12, 210000, "Settled", "Nov 4", "10:10"], ["LP-8817", 13, 75000, "Failed", "Nov 3", "09:41"], ["LP-8816", 14, 58800, "Settled", "Oct 30", "15:22"]].forEach(([id, party, send, status, date, time]) => XPAY.push({ id, party, corr: "LOCAL", send, status, date, time, j: 0 }));
{ const dOf = d => d.indexOf("Nov") === 0 ? 31 + +d.slice(4) : +d.slice(4); XPAY.sort((a, b) => dOf(b.date) - dOf(a.date) || (b.time > a.time ? 1 : b.time < a.time ? -1 : 0)); }
const XCOR0 = JSON.parse(JSON.stringify(XCOR)), XPAY0 = JSON.parse(JSON.stringify(XPAY)), XBENS0 = JSON.parse(JSON.stringify(XBENS)), XREM0 = JSON.parse(JSON.stringify(XREM)), CUR2COR0 = Object.assign({}, CUR2COR);
function xApplyHome(H) {
  const hm = HOMES[H] || HOMES.KES; const K = "KES";
  const sw = c => c === K ? H : c === H ? K : c;
  const swc = c => c === "ke" ? hm.cc : c === hm.cc ? "ke" : c;
  const swn = n => n === "Kenya" ? hm.country : n === hm.country ? "Kenya" : n;
  const swText = t => t.replace(/Kenya|KES|Tanzania|Uganda|Rwanda|Ghana|Nigeria|TZS|UGX|RWF|GHS|NGN/g, m => /^[A-Z]{3}$/.test(m) ? sw(m) : swn(m));
  Object.keys(XCOR).forEach(k => delete XCOR[k]);
  Object.keys(XCOR0).forEach(id => { const b = XCOR0[id]; const from = sw(b.from), to = sw(b.to); const sp0 = (b.mid - b.rate) / b.mid; const mid = id === "LOCAL" ? 1 : XUSD[to] / XUSD[from];
    XCOR[id] = Object.assign({}, b, { from, to, fc: swc(b.fc), tc: swc(b.tc), name: id === "LOCAL" ? "Local payout in " + hm.country : swText(b.name), mid, rate: mid * (1 - sp0), flat: Math.round(b.flat * XUSD[from] / XUSD[b.from] * 100) / 100,
      rail: id === "LOCAL" ? LOCALRAIL[H] : to === "USDC" ? "Internal conversion" : to === H && from !== "USDC" ? "Credited to " + H + " balance" : (LOCALRAIL[to] || b.rail),
      tag: H === "KES" && b.tag === "Live" ? "Live" : "Pilot" }); });
  XPAY.splice(0, XPAY.length); XPAY0.forEach(p => { const b = XCOR0[p.corr]; const v = p.send * XUSD[sw(b.from)] / XUSD[b.from]; const r = v > 100000 ? 1000 : v > 1000 ? 10 : 0.01; XPAY.push(Object.assign({}, p, { send: Math.round(v / r) * r })); });
  XBENS.splice(0, XBENS.length); XBENS0.forEach((b, i) => { const local = !!b.local; const cur = local ? H : sw(b.cur); XBENS.push(Object.assign({}, b, { acct: local ? hm.accts[i - 12] : b.acct, name: local ? hm.names[i - 12] : b.name, cc: local ? hm.cc : swc(b.cc), countryName: local ? hm.country : swn(b.countryName), cur, rail: local ? hm.rails[i - 12] : cur !== b.cur ? (LOCALRAIL[cur] || b.rail) : b.rail })); });
  XREM.splice(0, XREM.length); XREM0.forEach(x => XREM.push(Object.assign({}, x, { cc: swc(x.cc), countryName: swn(x.countryName), cur: sw(x.cur) })));
  Object.keys(CUR2COR).forEach(k => delete CUR2COR[k]); Object.keys(XCOR).forEach(id => { const c = XCOR[id]; if (id !== "LOCAL" && c.from === H && c.to !== "USDC" && c.to !== H) CUR2COR[c.to] = id; }); CUR2COR[H] = "LOCAL";
  const nice = n => { const p = Math.pow(10, Math.floor(Math.log10(n)) - 1); return Math.round(n / p) * p; };
  Object.assign(HOME, { dial: hm.dial, mobile: hm.mobile, dest: hm.dest, cur: H, cc: hm.cc, country: hm.country, city: hm.city, curName: hm.curName, f: XUSD[H] / XUSD.KES, thr: nice(1e6 * XUSD[H] / XUSD.KES), per: nice(1e7 * XUSD[H] / XUSD.KES), day: nice(5e7 * XUSD[H] / XUSD.KES) });
}


const CAT = [
  ["Bulk packaging cartons (100)", "PKG-100", "Goods", "One-time", "Active", "Fixed", [["KES", 18500], ["USD", 143], ["NGN", 220000]], 30, "Mar 2026", 4],
  ["Shipping consolidation", "SRV-SHIP", "Services", "One-time", "Active", "Converted", [["KES", 42000]], 0, "Feb 2026", 0],
  ["Customs clearance fee", "SRV-CUST", "Services", "One-time", "Active", "Fixed", [["KES", 15000], ["TZS", 300000]], 0, "Jan 2026", 0],
  ["Export desk retainer", "RET-EXP", "Services", "Recurring", "Active", "Fixed", [["KES", 45000], ["USD", 350]], 0, "Apr 2026", 0],
  ["Solar lantern (case of 20)", "SOL-20", "Goods", "One-time", "Active", "Converted", [["KES", 64000]], 6, "May 2026", 0],
  ["Warehouse storage, per pallet", "WH-PAL", "Services", "Recurring", "Active", "Fixed", [["KES", 7500], ["NGN", 90000]], 0, "Jun 2026", 0],
  ["Phone accessories bundle", "ACC-BND", "Goods", "One-time", "Active", "Converted", [["KES", 3200]], 140, "Jul 2026", 0],
  ["Textile sample kit", "TXT-KIT", "Goods", "One-time", "Draft", "Fixed", [["KES", 5800], ["USD", 45]], 0, "Oct 2026", 0],
  ["Quarterly compliance pack", "CMP-Q", "Services", "Recurring", "Draft", "Fixed", [["KES", 38000], ["NGN", 450000]], 0, "Oct 2026", 0],
  ["Trade fair booth share", "EVT-BTH", "Services", "One-time", "Draft", "Fixed", [["USD", 600]], 0, "Nov 2026", 0],
  ["Legacy freight insurance", "INS-OLD", "Services", "Recurring", "Archived", "Fixed", [["KES", 12000]], 0, "Dec 2025", 0],
  ["Old carton size (50)", "PKG-050", "Goods", "One-time", "Archived", "Fixed", [["KES", 9800]], 0, "Nov 2025", 0]
].map(([name, sku, cat, type, st, mode, prices, stock, created], i) => ({ id: "prod_" + (701 + i), name, sku, cat, type, st, mode, prices, stock, created, interval: type === "Recurring" ? "Monthly" : "" }));
const CATPAY = Array.from({ length: 60 }, (_, i) => { const pi = [0, 1, 2, 3, 4, 5, 6, 0, 1, 4, 6, 0, 2, 6, 10, 11][i % 16]; const p = CAT[pi]; const pr = p.prices[i % p.prices.length]; const day = 38 - Math.floor(i * 37 / 59); return { id: "pp_" + (8800 - i), pi, cur: pr[0], amt: pr[1], day, date: day > 31 ? "Nov " + (day - 31) : day > 0 ? "Oct " + day : "Sep 30", m: day > 31 ? 5 : day > 0 ? 4 : 3, st: [7, 19, 33, 44, 52].indexOf(i) >= 0 ? "Refunded" : "Paid", cust: ["Ikeja Retail Collective", "Arusha Agro Supplies", "Kilimani Dental Clinic", "Westlands Logistics", "Kano Textile House", "Ruaka Hardware"][i % 6] }; });

const KYB0 = { type: "Registered business", legalName: "Acme Commerce Ltd", tradingName: "Acme Imports", regNo: "PVT-7XQ2LM9", country: "Kenya", incDate: "2019-03-14", regAddress: "Mombasa Road, Nairobi", bizAddress: "Godown 14, Industrial Area, Nairobi", industry: "Wholesale of electronics and packaging", website: "https://acme.co", band: "KES 10M to 50M", corr: ["cn", "gb", "ng", "tz"], source: "Trading revenue", purpose: "Pay suppliers in China and the UK. Collect from customers in Nigeria and Tanzania." };
const KYB_PEOPLE = [
  { name: "Achieng Odhiambo", role: "Director and UBO", own: "60", nat: "Kenyan", idType: "National ID", idNo: "2841••07", res: "Kenya" },
  { name: "James Otieno", role: "Director and UBO", own: "40", nat: "Kenyan", idType: "Passport", idNo: "", res: "Kenya" }
];
const KYB_DOCS = [
  ["Certificate of incorporation", "Issued by the business registry", "Accepted"],
  ["CR12 or equivalent", "Dated within the last 12 months", "Rejected", "Dated March 2024. Upload one issued in the last 12 months."],
  ["Tax PIN certificate", "Company tax PIN", "Accepted"],
  ["Proof of business address", "Utility bill or lease, under 3 months old", "In review"],
  ["Directors' IDs", "Front and back for each director", "Uploaded"],
  ["Bank reference letter", "On bank letterhead, under 3 months old", "Uploaded"],
  ["Licences", "Only where your industry needs one. Wholesale trade does not.", "Not required"]
].map(([name, note, status, reason]) => ({ name, note, status, reason: reason || "" }));

const OK = { bg: "var(--ok-bg)", text: "var(--ok-text)" };
const WARN = { bg: "var(--warn-bg)", text: "var(--warn-text)" };
const BAD = { bg: "var(--bad-bg)", text: "var(--bad-text)" };
const NEUTRAL = { bg: "var(--surface)", text: "var(--muted)" };

const badge = p =>
  "display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 700; background: " +
  p.bg + "; color: " + p.text;


const JARVIS_TOPICS = [{ prompt: "", answer: "", code: "" }];


const FLAG = c => "display: block; flex-shrink: 0; width: 20px; height: 14px; border-radius: 2px; background: center/cover no-repeat url(/flags/flag-" + c + ".svg)";
const LOGO = (c, n) => "display: block; flex-shrink: 0; width: " + n + "px; height: " + n + "px; border-radius: 999px; background: center/cover no-repeat url(" + CHAIN_LOGO[c] + ")";

const CHAIN_LOGO = {
  Base: "/chains/chain-base.svg", Stellar: "/chains/chain-stellar.svg", Solana: "/chains/chain-solana.svg",
  Polygon: "/chains/chain-polygon.svg", BSC: "/chains/chain-bnb.svg", BNB: "/chains/chain-bnb.svg"
};
const BASE_ACCOUNTS = [
  { chain: "Base", asset: "USDC", balance: "48,204.18", fiat: "≈ KES 6.27M", address: "0x8f21c4b0a7d9…0913", fee: "0.0004 ETH ≈ $1.20", eta: "~10 s" },
  { chain: "Stellar", asset: "USDC", balance: "12,880.00", fiat: "≈ KES 1.67M", address: "GDQP2K…4XZT", fee: "0.00001 XLM", eta: "~5 s" },
  { chain: "Solana", asset: "USDC", balance: "6,412.55", fiat: "≈ KES 834k", address: "7xKq9…mR4p", fee: "0.00025 SOL", eta: "~2 s" },
  { chain: "Polygon", asset: "USDT", balance: "2,918.40", fiat: "≈ KES 379k", address: "0x1c9a44f0…b812", fee: "0.02 POL", eta: "~8 s" },
  { chain: "BSC", asset: "USDT", balance: "940.00", fiat: "≈ KES 122k", address: "0x77e1c0a8…3fd2", fee: "0.0005 BNB", eta: "~6 s" }
];

const MARKETS = {
  KES: { collectShort: "Paybill", collectLabel: "Paybill business number", collectNo: "4163131", pathTop: "Lipa na M-Pesa", pathPay: "Pay Bill", posterTop: "LIPA NA M-PESA", posterTitle: "PAY BILL", noLabel: "BUSINESS NUMBER", curNoun: "shillings", curLong: "Kenya Shilling", bank: "PesaLink bank transfer", iso: "ke", country: "Kenya", dial: "+254", sample: "712 934 118", rate: 129.2, wallet: "M-Pesa", mark: "M-PESA", wallets: "M-Pesa, Airtel Money", second: "Airtel Money" },
  TZS: { collectShort: "Lipa Namba", collectLabel: "M-Pesa Lipa Namba", collectNo: "57412203", pathTop: "Lipa kwa M-Pesa", pathPay: "Lipa Namba", posterTop: "LIPA KWA M-PESA", posterTitle: "LIPA NAMBA", noLabel: "LIPA NAMBA", curNoun: "shillings", curLong: "Tanzanian Shilling", bank: "TIPS bank transfer", iso: "tz", country: "Tanzania", dial: "+255", sample: "754 210 883", rate: 2515, wallet: "M-Pesa", mark: "M-PESA", wallets: "M-Pesa, Tigo Pesa, Airtel", second: "Tigo Pesa" },
  UGX: { collectShort: "MoMoPay", collectLabel: "MTN MoMoPay merchant code", collectNo: "416313", pathTop: "*165# · Payments", pathPay: "MoMoPay", posterTop: "PAY WITH MTN MOMO", posterTitle: "MOMOPAY", noLabel: "MERCHANT CODE", curNoun: "shillings", curLong: "Ugandan Shilling", bank: "EFT bank transfer", iso: "ug", country: "Uganda", dial: "+256", sample: "772 418 905", rate: 3640, wallet: "MTN MoMo", mark: "MTN", wallets: "MTN MoMo, Airtel Money", second: "Airtel Money" },
  RWF: { collectShort: "MoMoPay", collectLabel: "MTN MoMoPay code", collectNo: "416313", pathTop: "*182# · Pay", pathPay: "MoMoPay", posterTop: "PAY WITH MTN MOMO", posterTitle: "MOMOPAY", noLabel: "MERCHANT CODE", curNoun: "francs", curLong: "Rwandan Franc", bank: "RIPPS bank transfer", iso: "rw", country: "Rwanda", dial: "+250", sample: "788 301 442", rate: 1415, wallet: "MTN MoMo", mark: "MTN", wallets: "MTN MoMo, Airtel Money", second: "Airtel Money" },
  GHS: { collectShort: "MoMoPay", collectLabel: "MTN MoMo merchant ID", collectNo: "416313", pathTop: "*170# · MoMoPay", pathPay: "Pay merchant", posterTop: "PAY WITH MTN MOMO", posterTitle: "MOMOPAY", noLabel: "MERCHANT ID", curNoun: "cedis", curLong: "Ghanaian Cedi", bank: "GhIPSS instant transfer", iso: "gh", country: "Ghana", dial: "+233", sample: "244 718 330", rate: 12.4, wallet: "MTN MoMo", mark: "MTN", wallets: "MTN MoMo, Telecel Cash", second: "Telecel Cash" },
  NGN: { collectShort: "Pay-in account", collectLabel: "Dedicated bank account · Wema Bank", collectNo: "8241631310", pathTop: "your bank app", pathPay: "Transfer", posterTop: "PAY BY BANK TRANSFER", posterTitle: "TRANSFER TO", noLabel: "WEMA BANK ACCOUNT", curNoun: "naira", curLong: "Nigerian Naira", bank: "NIP bank transfer", iso: "ng", country: "Nigeria", dial: "+234", sample: "803 551 2097", rate: 1545, wallet: "OPay", mark: "OPAY", wallets: "OPay, PalmPay, bank USSD", second: "PalmPay" }
};

const GEO_TZ = { "Africa/Nairobi": "KES", "Africa/Dar_es_Salaam": "TZS", "Africa/Kampala": "UGX", "Africa/Kigali": "RWF", "Africa/Accra": "GHS", "Africa/Lagos": "NGN" };
const GEO_REGION = { KE: "KES", TZ: "TZS", UG: "UGX", RW: "RWF", GH: "GHS", NG: "NGN" };

const ORDERS = [
  { id: "ord_a1b2c3d4e5", flow: "Off-ramp", fiat: "5,000 KES", crypto: "38.42 USDC", status: "settled", recipient: "+2547••••4192", mpesa: "SJ42XQ8LP1", hash: "0x4a1f…9c3e", ref: "acme-inv-1042", rate: "130.14", created: "Sep 17, 11:42", wa: true },
  { id: "ord_9f8e7d6c5b", flow: "On-ramp", fiat: "12,500 KES", crypto: "96.05 USDC", status: "processing", recipient: "0x8335…0913", mpesa: "SJ42XN7KK9", hash: "—", ref: "bot-swap-88", rate: "130.14", created: "Sep 17, 11:38" },
  { id: "ord_44ab19cc02", flow: "Off-ramp", fiat: "900 KES", crypto: "6.92 USDC", status: "pending", recipient: "+2547••••7730", mpesa: "—", hash: "—", ref: "acme-inv-1041", rate: "130.06", created: "Sep 17, 11:31", wa: true },
  { id: "ord_7c1d02ff31", flow: "Off-ramp", fiat: "63,000 KES", crypto: "484.1 USDC", status: "failed", recipient: "+2547••••2218", mpesa: "—", hash: "—", ref: "payroll-batch-3", rate: "130.14", created: "Sep 17, 11:20" },
  { id: "ord_b20c4a7e18", flow: "On-ramp", fiat: "2,400 KES", crypto: "18.44 USDC", status: "settled", recipient: "0x1c9a…44f0", mpesa: "SJ41MP2QT4", hash: "0x91bc…21da", ref: "store-ck-771", rate: "130.11", created: "Sep 17, 11:04" },
  { id: "ord_e51f77b9a3", flow: "Off-ramp", fiat: "7,450 KES", crypto: "57.25 USDC", status: "refunded", recipient: "+2547••••9004", mpesa: "SJ41LL9XB2", hash: "0x77e1…c0a8", ref: "acme-inv-1038", rate: "130.09", created: "Sep 17, 10:52" },
  { id: "ord_0d9930ac47", flow: "Off-ramp", fiat: "15,000 KES", crypto: "115.26 USDC", status: "settled", recipient: "+2547••••3311", mpesa: "SJ41KD4RR7", hash: "0x2fa0…b41c", ref: "acme-inv-1037", rate: "130.14", created: "Sep 17, 10:39", wa: true }
];

const STATUS_PALETTE = {
  settled: OK, completed: OK, settled_unverified: OK,
  pending: WARN, processing: WARN,
  failed: BAD, refunded: BAD
};

const ENDPOINTS = [
  {
    method: "POST", path: "/orders", auth: "x-api-key",
    desc: "Collect or pay out money.",
    request: 'curl https://api.elementpay.net/api/v1/orders \\\n  -H "x-api-key: $ELEMENTPAY_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "user_address": "0xAbc...123",\n    "token": "USDC",\n    "order_type": 1,\n    "client_ref": "acme-inv-1042",\n    "fiat_payload": {\n      "amount": 5000,\n      "currency": "KES",\n      "destination_type": "PHONE",\n      "phone_number": "+2547XXXXXXXX"\n    }\n  }\'',
    response: '{\n  "status": "success",\n  "message": "Order created",\n  "data": {\n    "order_id": "ord_a1b2c3d4e5",\n    "status": "pending",\n    "amount_crypto": 38.42,\n    "amount_fiat": 5000,\n    "currency": "KES"\n  }\n}'
  },
  {
    method: "GET", path: "/orders/{order_id}", auth: "x-api-key",
    desc: "Poll a single order. Prefer webhooks; poll only as a reconciliation fallback.",
    request: 'curl https://api.elementpay.net/api/v1/orders/ord_a1b2c3d4e5 \\\n  -H "x-api-key: $ELEMENTPAY_API_KEY"',
    response: '{\n  "status": "success",\n  "message": "Order fetched successfully",\n  "data": {\n    "order_id": "ord_a1b2c3d4e5",\n    "status": "settled",\n    "mpesa_receipt_number": "SJ42XQ8LP1",\n    "settlement_transaction_hash": "0x4a1f...9c3e"\n  }\n}'
  },
  {
    method: "GET", path: "/quote", auth: "public",
    desc: "Preview the rate. No money moves.",
    request: 'curl "https://api.elementpay.net/api/v1/quote?order_type=offramp&amount_fiat=5000&token=USDC"',
    response: '{\n  "rate": 130.14,\n  "token_amount": 38.42,\n  "fiat_paid": 5000,\n  "symbol": "USDC",\n  "decimals": 6\n}'
  },
  {
    method: "GET", path: "/meta/tokens", auth: "public",
    desc: "Supported tokens and chains for the current environment. Cache this at deploy time.",
    request: 'curl "https://api.elementpay.net/api/v1/meta/tokens"',
    response: '{\n  "status": "success",\n  "message": "Tokens fetched (2)",\n  "data": [\n    { "symbol": "USDC", "chain_name": "Base Sepolia", "chain_id": 84532, "decimals": 6 },\n    { "symbol": "USDT", "chain_name": "Base Sepolia", "chain_id": 84532, "decimals": 6 }\n  ]\n}'
  },
  {
    method: "GET", path: "/orders/me", auth: "Bearer",
    desc: "List your orders with filters — the same feed the Transactions monitor reads.",
    request: 'curl "https://api.elementpay.net/api/v1/orders/me?status_filter=settled&limit=50" \\\n  -H "Authorization: Bearer $ACCESS_TOKEN"',
    response: '{\n  "status": "success",\n  "message": "Orders fetched (12)",\n  "data": [\n    { "order_id": "ord_a1b2c3d4e5", "status": "settled", "token": "USDC" }\n  ]\n}'
  }
];

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      view: props.defaultView || "overview",
      env: "live",
      acct: "live", demoSandbox: false, xEmpty: false, demoMenu: false, gsMenu: false, palette: false, palQ: "",
      wiz: null, xqTtl: 30, xqJ: 0, xqCount: 0, xpNew: [], xpOver: {}, xpFilter: "All", xpQ: "", xpSel: null, popOpen: false,
      benQ: "", benFilter: "All", benAdd: false, benDraft: { country: "cn", name: "", acct: "" }, benCheck: "", benNew: [],
      bulkStage: "start", bulkProg: 0, showGuests: false, remQ: "", repFmt: {}, repSched: {}, recon: {},
      devTab: "webhooks", whSel: 1, replayed: {}, evSel: 0, simEvents: [], logSel: 0, ipList: ["41.90.64.0/24", "102.68.12.17"], ipDraft: "",
      ptInvite: "", ptInvited: [], apprDone: false, xMetricsOff: ["spread", "time", "new"], xCustomize: false, gsInvited: false,
      kybOpen: false, kybStage: 1, kybSaved: "All changes saved", kyb: JSON.parse(JSON.stringify(KYB0)), kybPeople: JSON.parse(JSON.stringify(KYB_PEOPLE)), kybDocs: JSON.parse(JSON.stringify(KYB_DOCS)), kybId: "todo", kybConfirm: false,
      toast: null,
      liveApproved: true,
      goLiveConfirmed: true,
      amount: "5000",
      currency: "KES",
      token: "USDC",
      clientRef: "acme-inv-1042",
      settleMode: "fiat",
      settleFiat: "KES",
      linkType: "Reusable",
      invite: "",
      inviteRole: "Developer",
      copied: false,
      agentTool: 0,
      agentPaused: ["ak_live_read_44c"],
      copiedKey: "",
      refunded: {},
      credits: {},
      lastTopUp: null,
      flow: null,
      pay: "select",
      payMethod: "mpesa",
      emailedReceipt: false,
      plain: false,
      explain: "",
      goal: 0,
      modalGoLive: false,
      goLiveAck: false,
      goLiveConfirmed: false,
      firstLiveSeen: false,
      rotated: [],
      fixMoved: false,
      fixDone: false,
      theme: props.theme === "dark" ? "dark" : "light",
      screen: props.startScreen === "console" ? "console" : "auth",
      authMode: "signup",
      authStep: 1,
      authEnv: "sandbox",
      askLive: false,
      chainsSnapshot: null,
      authVia: null,
      remember: true,
      builder: 0,
      chains: ["Base", "Stellar"],
      account: -1,
      accountAction: "topup",
      sendAmount: "250.00",
      sendTo: "",
      liveApproved: true,
      showLiveRequest: false,
      liveRequested: false,
      reqCompany: "Acme Commerce Ltd",
      reqVolume: "KES 4M / month",
      reqUse: "Hosted checkout for our storefront, settling to USDC on Base.",
      modal: null,
      scopes: ["orders:read", "orders:write"],
      bizName: "Acme Commerce Ltd",
      bizSupport: "support@acme.co",
      bizWebsite: "https://acme.co",
      tagline: "",
      settingsFocus: "business",
      settingsTab: "identity",
      railOpen: true,
      linkStep: 1,
      topUpSource: "mpesa",
      payoutTarget: "phone",
      transferTo: "external",
      transferMode: "withdraw",
      refundOrder: "ord_a1b2c3d4e5",
      refundAmount: "5000",
      refundReason: "",
      refundKind: "full",
      invoiceClient: "",
      invoiceEmail: "",
      invoiceItem: "",
      invoiceTerms: "14 days",
      slackHook: "",
      alerts: ["payout", "webhook", "dispute"],
      linkMethods: ["momo", "card", "stable"],
      homeCountry: "KES", homeMenuOpen: false, fresh: false, freshDone: {}, devTools: true,
      otcSide: "buy", otcAsset: "USDC", otcChain: "Base", otcFiat: "KES", otcAmount: "50,000", otcSettle: "bank",
      otcStage: "form", otcTtl: 60, otcBooked: null, otcCopied: false,
      otcTrades: [
        { id: "OTC-2417", side: "buy", asset: "USDC", usd: 120000, fiat: "KES", rate: 129.65, status: "Settled", date: "Sep 22" },
        { id: "OTC-2412", side: "sell", asset: "USDT", usd: 45000, fiat: "KES", rate: 128.74, status: "Settled", date: "Sep 18" },
        { id: "OTC-2398", side: "buy", asset: "USDC", usd: 250000, fiat: "NGN", rate: 1550.41, status: "Settled", date: "Sep 9" }
      ],
      pbLabel: "", pbType: "reusable", pbAmount: "", pbNew: null, pbCopied: "", pbFlash: null,
      pbAccounts: [
        { acc: "ACME01", label: "Walk-in customers", type: "reusable", collected: 184300, last: "Today, 10:42", active: true },
        { acc: "ACME02", label: "Kesho Foods Ltd", type: "reusable", collected: 96000, last: "Yesterday", active: true },
        { acc: "ACME1042", label: "Invoice 1042 · KES 6,540", type: "onetime", amount: 6540, collected: 6540, last: "Sep 17", active: false, paid: true }
      ],
      waOn: true,
      geoAuto: true,
      geoFound: null,
      marketMenuOpen: false,
      waBizNumber: "+254 712 000 145",
      waBizVerified: "+254 712 000 145",
      waPhone: "+254 712 934 118",
      waMpesa: "",
      waMpesaEdited: false,
      waStage: "chat",
      waRail: "crypto",
      waLock: 298,
      waPinTimedOut: false,
      waDelivery: "ok",
      waSent: false,
      payoutChannel: "mpesa",
      payoutCurrency: "KES — Kenya Shilling",
      payoutMethod: "M-Pesa (Mobile)",
      accountName: "",
      payoutPhone: "",
      mpesaType: "paybill",
      mpesaNumber: "247247",
      mpesaAccount: "ACME-1042",
      settleChain: "Base",
      settleAsset: "USDC",
      settleAddress: "0x8f21c4b0a7d3e91ac4410913",
      checkoutMode: "link",
      jarvisOpen: false,
      jarvisTopic: 0,
      jarvisInput: "",
      method: 0,
      query: "",
      filter: "All",
      sel: 0,
      ep: 0
    };
  }

  chromeEnv(state) {
    return state.screen === "console" ? state.env : "live";
  }

  onKeyDown = e => {
    const k = (e.key || "").toLowerCase();
    if ((e.metaKey || e.ctrlKey) && k === "k") { e.preventDefault(); this.setState(st => ({ palette: !st.palette, palQ: "" })); return; }
    if (k === "escape") { this.setState({ modal: "", showLiveRequest: false, flow: null, palette: false, gsMenu: false, demoMenu: false, popOpen: false }); return; }
  };

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    clearInterval(this._xqI); clearInterval(this._bulkI); clearTimeout(this._toT);
    clearInterval(this._otcI); clearTimeout(this._otcT); clearTimeout(this._pbF);
    clearInterval(this._slideT);
  }

  detectMarket() {
    let code = null;
    try { code = GEO_TZ[Intl.DateTimeFormat().resolvedOptions().timeZone] || null; } catch (e) {}
    if (!code) {
      const langs = navigator.languages || [navigator.language || ""];
      for (const l of langs) { const r = (l.split("-")[1] || "").toUpperCase(); if (GEO_REGION[r]) { code = GEO_REGION[r]; break; } }
    }
    this.setState({ geoFound: code || "none" });
    if (code) {
      this.applyMarket(code);
      const r = MARKETS[code].rate / MARKETS.KES.rate;
      const sc = v => { const n = parseFloat(String(v || "").replace(/[^0-9.]/g, "")); if (!n) return v; const x = n * r; return String(x >= 1000 ? Math.round(x / 10) * 10 : Math.round(x)); };
      if (!this.state.homeSet && code !== (this.state.homeCountry || "KES")) this.setState(st => ({ homeCountry: code, otcFiat: code, sendAmount: sc(st.sendAmount), refundAmount: sc(st.refundAmount), payoutCurrency: code + " — " + MARKETS[code].curLong, payoutMethod: this.payoutMethodsFor(code)[0] }));
    }
  }

  applyMarket(code) {
    this.setState(st => {
      const from = MARKETS[st.currency] || MARKETS.KES, to = MARKETS[code] || MARKETS.KES;
      const swap = v => (v || "").startsWith(from.dial) ? to.dial + " " + to.sample : v;
      return { currency: code, copied: false, marketMenuOpen: false, waPhone: swap(st.waPhone), waMpesa: swap(st.waMpesa) };
    });
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
    if (window.innerWidth <= 860) this.setState({ railOpen: false });
    this._slideT = setInterval(() => {
      if (this.state.screen !== "auth") return;
      this.setState(st => ({ simStep: ((st.simStep || 0) + 1) % 7 }));
    }, 1700);
    if (this.state.geoAuto) setTimeout(() => this.detectMarket(), 0);
    let saved = null;
    try { saved = window.localStorage.getItem("ep-console-theme"); } catch (e) {}
    const theme = saved === "dark" || saved === "light" ? saved : this.state.theme;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-env", this.chromeEnv(this.state));
    if (theme !== this.state.theme) this.setState({ theme });
  }

  componentDidUpdate() {
    const el = document.documentElement;
    const want = this.chromeEnv(this.state);
    if (el.getAttribute("data-env") !== want) el.setAttribute("data-env", want);
  }

  setEnv(env) {
    if (env === "live" && !this.state.liveApproved) {
      this.setState({ showLiveRequest: true });
      return;
    }
    if (env === "live" && !this.state.goLiveConfirmed) {
      this.setState({ modalGoLive: true, goLiveAck: false });
      return;
    }
    this.setState({ env });
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { window.localStorage.setItem("ep-console-theme", theme); } catch (e) {}
    this.setState({ theme });
  }

  payoutLine(s) {
    return s.payoutChannel === "mpesa"
      ? s.payoutMethod + " · " + (s.payoutPhone || s.mpesaNumber)
      : "your " + s.settleAsset + " wallet on " + s.settleChain;
  }

  payoutDetailLine(s) {
    return s.payoutChannel === "mpesa"
      ? s.payoutCurrency.split(" ")[0] + " · " + (s.accountName || s.bizName)
      : s.settleAddress.slice(0, 10) + "…" + s.settleAddress.slice(-4);
  }

  navBtn(active, stacked, groupStart) {
    return [
      groupStart ? "margin-top: 9px" : "",
      "display: flex; align-items: center; gap: 11px; min-width: 0; height: 36px; box-sizing: border-box; text-align: left; cursor: pointer; font-family: inherit; transition: background 0.15s, color 0.15s",
      stacked ? "flex: 0 0 auto; width: 100%" : "flex: 1 1 100%",
      this.state.railOpen ? "padding: 0 10px" : "justify-content: center; padding: 0",
      "border: 0; border-radius: 9px; font-size: 13.5px",
      active
        ? "background: var(--indigo-tint); color: var(--indigo-text); font-weight: 650; box-shadow: inset 0 0 0 1px rgba(67,57,202,0.14)"
        : "background: transparent; color: var(--rail-muted); font-weight: 500"
    ].join("; ");
  }

  railTab(active) {
    return [
      "padding: 7px 10px; border: 0; border-radius: 7px; font-size: 12.5px; cursor: pointer",
      active
        ? "background: var(--indigo); color: var(--on-indigo); font-weight: 700"
        : "background: transparent; color: var(--rail-muted); font-weight: 600"
    ].join("; ");
  }

  tabBtn(active) {
    return [
      "padding: 7px 10px; border: 0; border-radius: 7px; font-size: 12.5px; cursor: pointer",
      active ? "background: var(--panel); color: var(--ink); font-weight: 700; box-shadow: 0 1px 2px var(--border-strong)" : "background: transparent; color: var(--muted); font-weight: 600"
    ].join("; ");
  }

  methodColor(m) {
    const c = m === "GET" ? "oklch(0.5 0.14 152)" : m === "POST" ? "var(--indigo-text)" : "var(--muted)";
    return "font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10.5px; font-weight: 500; width: 34px; flex-shrink: 0; color: " + c;
  }

  copyKey(k) {
    this.setState({ copiedKey: k });
    setTimeout(() => { if (this.state.copiedKey === k) this.setState({ copiedKey: "" }); }, 1800);
  }


  waVals(s, fmtFiat) {
    const rails = [
      { id: "momo", key: "mpesa", label: (MARKETS[s.currency] || MARKETS.KES).wallet, bg: "#4a5560" },
      { id: "stable", key: "crypto", label: "Crypto", bg: "#4a5560" },
      { id: "card", key: "card", label: "Card", bg: "#1a1f71" }
    ].filter(r => s.linkMethods.includes(r.id)).slice(0, 3);
    const mkt = (MARKETS[s.currency] || MARKETS.KES);
    const bad = (s.waPhone || "").replace(/[^0-9]/g, "").length < mkt.dial.length + 7;
    const armTimeout = () => {
      clearTimeout(this._waPinT);
      this._waPinT = setTimeout(() => this.setState(st => st.waStage === "pin" ? { waPinTimedOut: true } : {}), 9000);
    };
    const tap = key => {
      if (key === "mpesa") {
        this.setState({ waStage: "pin", waPinTimedOut: false });
        armTimeout();
      } else {
        this.setState({ waStage: "hosted", waRail: key, waLock: 298 });
        clearInterval(this._waLockI);
        this._waLockI = setInterval(() => this.setState(st => {
          if (st.waStage !== "hosted") { clearInterval(this._waLockI); return {}; }
          return { waLock: Math.max(0, st.waLock - 1) };
        }), 1000);
      }
    };
    const settle = () => {
      clearTimeout(this._waPinT);
      clearInterval(this._waLockI);
      this.setState({ waStage: "paid", waPinTimedOut: false });
    };
    const lock = Math.max(0, s.waLock || 0);
    return {
      waOn: s.waOn,
      waToggle: () => this.setState({ waOn: !s.waOn }),
      waSwitchStyle: "margin-left: auto; flex-shrink: 0; width: 42px; height: 24px; padding: 2px; border-radius: 999px; border: 0; cursor: pointer; display: flex; align-items: center; justify-content: " +
        (s.waOn ? "flex-end" : "flex-start") + "; background: " + (s.waOn ? "#4a5560" : "var(--border-strong)"),
      waKnobStyle: "width: 20px; height: 20px; border-radius: 999px; background: #fff; box-shadow: 0 1px 3px rgba(10,9,23,0.3)",
      waPhone: s.waPhone,
      setWaPhone: e => this.setState({ waPhone: e.target.value }),
      waMpesaValue: s.waMpesaEdited ? s.waMpesa : s.waPhone,
      setWaMpesa: e => this.setState({ waMpesa: e.target.value, waMpesaEdited: true }),
      waMpesaEditTap: () => { if (!s.waMpesaEdited) this.setState({ waMpesaEdited: true, waMpesa: s.waPhone }); },
      waMpesaNote: s.waMpesaEdited ? "Set separately from the chat number" : "Matches the WhatsApp number · tap to change",
      waMpesaPlaceholder: (MARKETS[s.currency] || MARKETS.KES).dial + " " + (MARKETS[s.currency] || MARKETS.KES).sample.replace(/[0-9]/g, "•"),
      waBadNumber: bad,
      waRailPills: rails.map(r => ({
        label: r.label,
        onClick: () => tap(r.key),
        style: "display: inline-flex; align-items: center; gap: 6px; padding: 8px 13px; border-radius: 999px; border: 1px solid var(--border-strong); background: var(--panel-solid); color: var(--ink); font-family: inherit; font-size: 12px; font-weight: 700; cursor: pointer",
        dotStyle: "width: 7px; height: 7px; border-radius: 999px; flex-shrink: 0; background: " + r.bg
      })),
      waItem: s.clientRef || "Your item",
      waAmount: fmtFiat,
      waShowBubble: s.waStage !== "hosted",
      waStagePin: s.waStage === "pin",
      waStageHosted: s.waStage === "hosted",
      waStagePaid: s.waStage === "paid",
      waPinTimedOut: s.waStage === "pin" && s.waPinTimedOut,
      waPinAsk: "Pay " + fmtFiat + " to " + (s.bizName || "this business"),
      waWalletMark: mkt.mark,
      waPinTitle: "Enter your " + mkt.wallet + " PIN",
      waWalletLabel: mkt.wallet + " number",
      waDialPlaceholder: mkt.dial + " " + mkt.sample.replace(/[0-9]/g, "•"),
      waMarketNote: mkt.country + " · " + mkt.wallet + " prompt in chat",
      waPinConfirm: settle,
      waPinCancel: () => { clearTimeout(this._waPinT); this.setState({ waStage: "chat", waPinTimedOut: false }); },
      waResend: () => { this.setState({ waPinTimedOut: false }); armTimeout(); },
      waSendLinkInstead: () => { clearTimeout(this._waPinT); this.setState({ waStage: "chat", waPinTimedOut: false }); },
      waHostedCrypto: s.waStage === "hosted" && s.waRail === "crypto",
      waHostedCard: s.waStage === "hosted" && s.waRail === "card",
      waHostedTitle: (s.waRail === "card" ? "Card · " : "USDC · ") + fmtFiat,
      waHostedNote: s.waRail === "card"
        ? "Preselected to card. 3-D Secure runs on the bank's page."
        : "Preselected to USDC. Scan it, or open a wallet on this phone.",
      waLockLabel: "Rate locked " + Math.floor(lock / 60) + ":" + String(lock % 60).padStart(2, "0"),
      waHostedCta: s.waRail === "card" ? "Pay " + fmtFiat : "I have sent it",
      waHostedPay: settle,
      waBackToChat: () => { clearInterval(this._waLockI); this.setState({ waStage: "chat" }); },
      waReset: () => this.setState({ waStage: "chat", waPinTimedOut: false }),
      waPaidMeta: "Receipt in the chat · settles to " + (s.payoutChannel === "mpesa" ? "M-Pesa " + s.mpesaNumber : s.settleAsset + " on " + s.settleChain),
      waDeliveryStamp: s.waDelivery === "undelivered" ? "Not delivered" : s.waSent ? "Delivered · read" : "Preview",
      waHasNote: s.waDelivery !== "ok",
      waNote: s.waDelivery === "undelivered"
        ? "Not delivered. Check the number — the buyer may not use WhatsApp on it."
        : s.waDelivery === "window"
        ? "Last chat was over 24 h ago, so we'll send it as a template message."
        : "",
      waDeliveryPicks: [["ok", "Delivered"], ["undelivered", "Not delivered"], ["window", "Outside 24 h"]].map(([id, label]) => ({
        label,
        onClick: () => this.setState({ waDelivery: id }),
        style: "padding: 5px 10px; border-radius: 8px; border: 0; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 600; background: " +
          (s.waDelivery === id ? "var(--panel-solid)" : "transparent") + "; color: " + (s.waDelivery === id ? "var(--ink)" : "var(--muted)") +
          (s.waDelivery === id ? "; box-shadow: 0 1px 3px rgba(10,9,23,0.12)" : ""),
      })),
      waPreviewMeta: s.waSent ? "Sent · live" : "Live preview",
      waBizNumber: s.waBizNumber,
      setWaBizNumber: e => this.setState({ waBizNumber: e.target.value }),
      waBizStatus: s.waBizNumber === s.waBizVerified ? "Verified business" : "Not verified yet",
      waBizStatusStyle: "display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; white-space: nowrap; background: " +
        (s.waBizNumber === s.waBizVerified ? "var(--ok-bg); color: var(--ok-text)" : "var(--surface); color: var(--muted)"),
      waBizActionLabel: s.waBizNumber === s.waBizVerified ? "Disconnect" : "Verify number",
      waBizAction: () => this.setState(st => st.waBizNumber === st.waBizVerified
        ? { waBizNumber: "", waBizVerified: "—" }
        : { waBizVerified: st.waBizNumber }),
      waQrCells: (() => {
        const N = 21, out = [];
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const fx = x > N - 8 ? x - (N - 7) : x, fy = y > N - 8 ? y - (N - 7) : y;
          const finder = (x < 7 && y < 7) || (x > N - 8 && y < 7) || (x < 7 && y > N - 8);
          let on;
          if (finder) { const r = Math.max(Math.abs(fx - 3), Math.abs(fy - 3)); on = r === 3 || r <= 1; }
          else on = ((x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0);
          out.push({ style: "border-radius: 1px; background: " + (on ? "#12102a" : "transparent") });
        }
        return out;
      })(),
      linkPrimaryLabel: s.waOn ? (s.waSent ? "Send again" : "Send on WhatsApp") : "Create link",
      linkPrimaryAction: s.waOn
        ? () => this.setState({ waSent: true, waStage: "chat", waDelivery: bad ? "undelivered" : s.waDelivery })
        : () => this.setState({ linkStep: 2 })
    };
  }

  localize(o) {
    const code = this.state.homeCountry || "KES";
    const K = MARKETS.KES, M = MARKETS[code] || K;
    const ratio = M.rate / K.rate;
    const fmtN = (v, dec) => v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    const tr = str => {
      if (code === "KES" || !str || str.indexOf("{") === 0) return str;
      return str
        .replace(/KES\s?([\d,]+(?:\.\d+)?)(M)?/g, (m, num, big) => {
          let v = parseFloat(num.replace(/,/g, "")) * (big ? 1e6 : 1) * ratio;
          if (big || v >= 1e7) return code + " " + fmtN(v / 1e6, 2) + "M";
          const dec = num.includes(".") ? 2 : 0;
          if (!dec) v = v >= 1000 ? Math.round(v / 10) * 10 : Math.round(v);
          return code + " " + fmtN(v, dec);
        })
        .replace(/Lipa na M-Pesa/g, M.pathTop).replace(/Pay Bill/g, M.pathPay)
        .replace(/Business no\. 4163131/g, M.collectLabel + " " + M.collectNo)
        .replace(/M-Pesa Paybill/g, M.collectShort).replace(/Paybill/g, M.collectShort).replace(/4163131/g, M.collectNo)
        .replace(/M-PESA/g, M.mark).replace(/M-Pesa/g, M.wallet)
        .replace(/Kenya Shilling/g, M.curLong).replace(/Kenya/g, M.country).replace(/shillings/g, M.curNoun)
        .replace(/\+254/g, M.dial).replace(/\bKES\b/g, code)
        .replace(/\bEAT\b/g, ({ RWF: "CAT", GHS: "GMT", NGN: "WAT" })[code] || "EAT")
        .replace(/Send STK push/g, "Send payment prompt").replace(/STK push/g, "payment prompt");
    };
    const SKIP = { payoutCurrencyOpts: 1, payoutMethodOpts: 1, payoutMethod: 1, payoutCurrency: 1, otcRates: 1, marketOptions: 1, homeOptions: 1, posterQr: 1, rates: 1, homeSnippet: 1 };
    const walk = (v, k) => {
      if (typeof v === "string") return (k && (/[Ss]tyle$/.test(k) || SKIP[k])) ? v : tr(v);
      if (Array.isArray(v)) return SKIP[k] ? v : v.map(x => walk(x));
      if (v && typeof v === "object" && v.constructor === Object) {
        if (SKIP[k] || v.$$typeof || "current" in v) return v;
        const out = {}; for (const kk in v) out[kk] = walk(v[kk], kk); return out;
      }
      return v;
    };
    const res = code === "KES" ? o : walk(o);
    const NG = code === "NGN";
    const view = this.state.view;
    if (view === "paybill" && code !== "KES") { res.isPaybill = false; res.isCheckout = true; res.viewTitle = "Checkout"; }
    if (code !== "KES" && res.posterLink) {
      res.posterLink = res.posterLink.replace(/\/[^/]*$/, "");
      res.posterQr = qrDataUrl("https://" + res.posterLink, { size: 360 });
    }
    if (NG) {
      const toNuban = a => { const m = /^[A-Z]{2,5}(\d+)$/.exec(a || ""); return m ? "824163" + m[1].slice(-4).padStart(4, "0") : a; };
      if (Array.isArray(res.pbRows)) res.pbRows = res.pbRows.map(r => Object.assign({}, r, { acc: toNuban(r.acc) }));
      ["pbNewAcc", "pbMainAcc", "posterAcc"].forEach(k => { if (res[k]) res[k] = toNuban(res[k]); });
      if (Array.isArray(res.posterPicks)) res.posterPicks = res.posterPicks.map(p => Object.assign({}, p, { label: p.label.replace(/^[A-Z]{2,5}\d+/, m => toNuban(m)) }));
      res.pbSteps = [
        { n: "1", text: "Open any bank app or dial USSD", code: "" },
        { n: "2", text: "Choose", code: "Transfer" },
        { n: "3", text: "Bank", code: "Wema Bank" },
        { n: "4", text: "Account number", code: res.pbNewAcc || res.pbMainAcc || "8241630001" },
        { n: "5", text: "Amount, then confirm", code: "" }
      ];
      if (res.pbShareText) res.pbShareText = "Pay by bank transfer: Wema Bank · Account " + res.pbNewAcc + " · " + (this.state.bizName || "ACME") + ". Thank you!";
      res.pbTypeNote = (res.pbTypeNote || "").replace("account number", "account");
    }
    res.posterQrSmallStyle = "display: block; width: 84px; height: 84px; flex-shrink: 0; border-radius: 6px; background: #ffffff url(" + res.posterQr + ") center/contain no-repeat; -webkit-print-color-adjust: exact; print-color-adjust: exact";
    res.posterQrBigStyle = "display: block; width: 190px; height: 190px; max-width: 100%; border-radius: 8px; box-sizing: border-box; background: #ffffff url(" + res.posterQr + ") center/174px no-repeat; -webkit-print-color-adjust: exact; print-color-adjust: exact";
    const bg = u => u ? "url(" + u + ")" : "none";
    res.mktFlagBg = bg(res.mktFlag);
    if (Array.isArray(res.marketOptions)) res.marketOptions = res.marketOptions.map(m => Object.assign({}, m, { flagBg: bg(m.flag) }));
    const posterDigits = NG ? String(res.posterAcc || M.collectNo) : M.collectNo;
    const mainNo = NG ? String(res.pbMainAcc || M.collectNo) : M.collectNo;
    const flag = c => "/flags/flag-" + MARKETS[c].iso + ".svg";
    return Object.assign(res, {
      locCur: code, locWallet: M.wallet, locWalletMark: NG ? "WEMA" : M.mark,
      locScanTitle: NG ? "Prefer card or USDC? Scan to pay" : "No " + M.wallet + "? Scan to pay",
      locCollectShort: code === "KES" ? "Paybill" : "Print QR", locCollectLabel: NG ? "Main pay-in account · Wema Bank" : M.collectLabel, locCollectNo: mainNo,
      locCollectDigits: posterDigits.split(""),
      locShowAccNo: !NG, locNoAccNo: NG,
      locIsKE: code === "KES", locNotKE: code !== "KES",
      locCollectAction: code === "KES" ? res.goPaybill : res.openPoster,
      locCollectSub: code === "KES" ? "Give out account numbers or print a counter poster." : "Customers scan it and pay with " + M.wallets.split(",")[0] + ", card or USDC.",
      locPosterModalTitle: code === "KES" ? "Print a Paybill poster" : "Print a scan-to-pay poster",
      locPosterSub: code === "KES" ? "For your counter, shop window or delivery bag." : "One QR for every walk-in customer. Stick it anywhere.",
      locPosterRails: M.wallets.replace(/, ([^,]*)$/, " or $1") + ", card or USDC",
      locPosterChips: [M.wallets.split(",")[0].trim(), "Card", "USDC"],
      locCollectPitch: code === "KES" ? "Walk-in customers? Use M-Pesa Paybill 4163131" : "Walk-in customers? Print a scan-to-pay QR poster",
      locCollectNote: code === "NGN"
        ? "Your main Wema Bank account. Each customer can also get their own. Any bank or USSD transfer lands in your NGN wallet."
        : "Permanent and shared by every ElementPay business in " + M.country + ". The account number tells us the money is yours, and it lands in your " + code + " wallet.",
      locPosterTop: code === "KES" ? M.posterTop : "PAY WITH YOUR PHONE",
      bizNameUpper: (this.state.bizName || "Acme Commerce Ltd").toUpperCase(),
      posterBandStyle: "padding: 16px 20px 15px; display: flex; flex-direction: column; gap: 3px; text-align: center; color: #ffffff; background: " + (code === "KES" ? "#00a651" : "#4339ca"),
      posterStepNumStyle: "width: 18px; height: 18px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 10px; font-weight: 800; color: #ffffff; background: " + (code === "KES" ? "#00a651" : "#4339ca"),
      posterSteps: (code === "KES"
        ? ["Open M-Pesa", "Lipa na M-Pesa", "Pay Bill", "Business no. " + mainNo, "Account no. " + (this.state.posterAcc || "your order"), "Amount, then PIN"]
        : ["Open your camera", "Scan the code", "Pick how to pay", "Confirm the name", "Approve on phone", "Get a receipt"]).map((t, i) => ({ n: String(i + 1), t })), locPosterTitle: code === "KES" ? M.posterTitle : "SCAN TO PAY", locNoLabel: M.noLabel,
      locPosterSteps: code === "NGN"
        ? "Open your bank app → Transfer → Wema Bank → enter the account number and amount."
        : M.wallet + " → " + M.pathTop + " → " + M.pathPay + " → enter both numbers, the amount and your PIN.",
      locAmt5k: tr("KES 5,000"),
      homeCode: code, homeFlag: flag(code), homeFlagBg: "url(" + flag(code) + ")", homeCountryName: M.country,
      homeMenuOpen: !!this.state.homeMenuOpen,
      toggleHomeMenu: () => this.setState(st => ({ homeMenuOpen: !st.homeMenuOpen })),
      homeOptions: Object.keys(MARKETS).map(c => ({
        code: c, country: MARKETS[c].country, rails: MARKETS[c].wallets + " · " + MARKETS[c].bank, flag: flag(c), flagBg: "url(" + flag(c) + ")", tag: c === code ? "✓" : "",
        onClick: () => {
          const r = (MARKETS[c].rate / M.rate);
          const sc = v => { const n = parseFloat(String(v || "").replace(/[^0-9.]/g, "")); if (!n) return v; const x = n * r; return String(x >= 1000 ? Math.round(x / 10) * 10 : Math.round(x)); };
          this.setState(st => ({ homeCountry: c, homeMenuOpen: false, otcFiat: c, sendAmount: sc(st.sendAmount), refundAmount: sc(st.refundAmount), payoutCurrency: c + " — " + MARKETS[c].curLong, payoutMethod: this.payoutMethodsFor(c)[0], payoutPhone: "" }));
          this.applyMarket(c);
        },
        style: "display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 10px; border: 0; border-radius: 8px; cursor: pointer; text-align: left; font-family: inherit; color: var(--ink); background: " + (c === code ? "var(--indigo-tint)" : "transparent")
      }))
    });
  }

  payoutMethodsFor(c) {
    const m = MARKETS[c] || MARKETS.KES;
    if (c === "KES") return ["M-Pesa (Mobile)", "Paybill", "Till number", "Bank transfer"];
    if (c === "NGN") return ["Bank transfer", "OPay wallet", "PalmPay wallet"];
    return [m.wallet + " (Mobile)", m.second + " (Mobile)", "Bank transfer"];
  }

  segOpts(opts, cur, key) {
    return opts.map(([id, label]) => ({
      label,
      onClick: () => this.setState({ [key]: id }),
      style: "flex: 1 1 auto; padding: 8px 12px; border-radius: 8px; border: 0; cursor: pointer; font-family: inherit; font-size: 12.5px; font-weight: 700; white-space: nowrap; background: " +
        (cur === id ? "var(--panel-solid)" : "transparent") + "; color: " + (cur === id ? "var(--ink)" : "var(--muted)") + (cur === id ? "; box-shadow: 0 1px 3px rgba(20,24,28,0.14)" : "")
    }));
  }

  otcVals(s) {
    const MIN = 20000;
    const mkt = MARKETS[s.otcFiat] || MARKETS.KES;
    const buy = s.otcSide === "buy";
    const usd = parseFloat(String(s.otcAmount).replace(/[^0-9.]/g, "")) || 0;
    const ok = usd >= MIN;
    const rate = mkt.rate * (buy ? 1.0035 : 0.9965);
    const dp = mkt.rate > 100 ? 2 : 4;
    const n2 = (v, d) => v.toLocaleString("en-US", { minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d });
    const fiatAmt = s.otcFiat + " " + n2(usd * rate);
    const coinAmt = n2(usd) + " " + s.otcAsset;
    const val = (label, value, strong) => ({ label, value, valueStyle: "margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: " + (strong ? "13.5px" : "12.5px") + "; font-weight: " + (strong ? "700" : "500") + "; color: var(--ink); text-align: right; overflow-wrap: anywhere" });
    const stopTimers = () => { clearInterval(this._otcI); clearTimeout(this._otcT); };
    const request = () => {
      if (!ok) return;
      stopTimers();
      this.setState({ otcStage: "pricing" });
      this._otcT = setTimeout(() => {
        this.setState({ otcStage: "quote", otcTtl: 60 });
        this._otcI = setInterval(() => this.setState(st => {
          if (st.otcStage !== "quote") { clearInterval(this._otcI); return {}; }
          if (st.otcTtl <= 1) { clearInterval(this._otcI); return { otcStage: "expired", otcTtl: 0 }; }
          return { otcTtl: st.otcTtl - 1 };
        }), 1000);
      }, 1600);
    };
    const bk = s.otcBooked;
    const PILL = { "Settled": ["var(--ok-bg)", "var(--ok-text)"], "Awaiting funds": ["var(--warn-bg)", "var(--warn-text)"], "Settling": ["var(--indigo-tint)", "var(--indigo-text)"] };
    const instr = !bk ? [] : bk.side === "buy"
      ? (bk.settle === "bank"
        ? [val("Send", bk.fiatAmt, true), val("Bank", "Stanbic Bank Kenya"), val("Account name", "ElementPay Ltd · OTC"), val("Account no.", "0100 4412 7781"), val("Reference", bk.id, true)]
        : [val("From", s.otcFiat + " wallet"), val("Amount", bk.fiatAmt, true), val("Reference", bk.id, true)])
      : (bk.settle === "bank"
        ? [val("Send", bk.coinAmt, true), val("Network", bk.chain), val("To address", "0x8f3a…c21e"), val("You receive", bk.fiatAmt + " to your bank")]
        : [val("From", bk.asset + " wallet · " + bk.chain), val("Amount", bk.coinAmt, true), val("You receive", bk.fiatAmt + " in your " + s.otcFiat + " wallet")]);
    return {
      otcCardTitle: ({ form: "Request a quote", pricing: "Request a quote", quote: "Your firm quote", expired: "Quote expired", booked: "Trade booked" })[s.otcStage],
      otcCardMeta: s.otcStage === "quote" ? "Firm · " + s.otcTtl + "s" : "Min $20,000",
      otcIsForm: s.otcStage === "form", otcIsPricing: s.otcStage === "pricing", otcIsQuote: s.otcStage === "quote",
      otcIsExpired: s.otcStage === "expired", otcIsBooked: s.otcStage === "booked",
      otcSides: this.segOpts([["buy", "Buy stablecoin"], ["sell", "Sell stablecoin"]], s.otcSide, "otcSide"),
      otcAssets: this.segOpts([["USDC", "USDC"], ["USDT", "USDT"]], s.otcAsset, "otcAsset"),
      otcSettles: this.segOpts(buy ? [["bank", "Bank transfer"], ["wallet", "My wallet"]] : [["bank", "To my bank"], ["wallet", "To my wallet"]], s.otcSettle, "otcSettle"),
      otcChain: s.otcChain, setOtcChain: e => this.setState({ otcChain: e.target.value }),
      otcFiat: s.otcFiat, setOtcFiat: e => this.setState({ otcFiat: e.target.value }),
      otcFiatLabel: buy ? "Pay with" : "Receive in",
      otcSettleLabel: buy ? "Fund from" : "Pay out",
      otcAmount: s.otcAmount,
      setOtcAmount: e => { const d = e.target.value.replace(/[^0-9.]/g, ""); this.setState({ otcAmount: d ? Number(d.split(".")[0]).toLocaleString("en-US") + (d.includes(".") ? "." + d.split(".")[1].slice(0, 2) : "") : "" }); },
      otcAmountNote: !usd ? "Minimum order is $20,000" : ok ? (usd >= 1000000 ? "Above $1M the desk may call you to confirm" : "Minimum met") : "Minimum order is $20,000 · add $" + n2(MIN - usd, 0),
      otcAmountNoteStyle: "font-size: 11.5px; font-weight: 600; color: " + (!usd ? "var(--faint)" : ok ? "var(--ok-text)" : "var(--bad-text)"),
      otcChips: [20000, 50000, 100000, 250000].map(v => ({
        label: "$" + (v >= 1000 ? v / 1000 + "k" : v),
        onClick: () => this.setState({ otcAmount: v.toLocaleString("en-US") }),
        style: "padding: 6px 11px; border-radius: 999px; cursor: pointer; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; font-weight: 600; border: 1px solid " +
          (usd === v ? "var(--indigo)" : "var(--border-strong)") + "; background: " + (usd === v ? "var(--indigo-tint)" : "transparent") + "; color: " + (usd === v ? "var(--indigo-text)" : "var(--ink)")
      })),
      otcPreviewRows: [
        val("Rate", "1 " + s.otcAsset + " ≈ " + n2(rate, dp) + " " + s.otcFiat),
        val(buy ? "You pay about" : "You get about", ok ? fiatAmt : "—", true),
        val(buy ? "You get" : "You send", ok ? coinAmt + " on " + s.otcChain : "—")
      ],
      otcRequest: request,
      otcRequestStyle: "padding: 13px; border-radius: 8px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 14px; font-weight: 700; " + (ok ? "cursor: pointer" : "opacity: 0.45; cursor: not-allowed"),
      otcPricingNote: (buy ? "Buying " : "Selling ") + coinAmt + " for " + s.otcFiat,
      otcGetLabel: buy ? "You get" : "You get",
      otcGetValue: buy ? coinAmt : fiatAmt,
      otcGiveLine: (buy ? "You pay " + fiatAmt : "You send " + coinAmt) + " · " + s.otcChain,
      otcQuoteRows: [
        val("Rate", "1 " + s.otcAsset + " = " + n2(rate, dp) + " " + s.otcFiat, true),
        val("Spread", "0.35% · included"),
        val("Other fees", "None"),
        val(buy ? "Fund from" : "Pay out to", s.otcSettle === "bank" ? "Bank transfer" : s.otcFiat + " wallet")
      ],
      otcTtlLabel: "0:" + String(s.otcTtl).padStart(2, "0"),
      otcTtlBarStyle: "display: block; height: 100%; border-radius: 999px; transition: width 1s linear; width: " + (s.otcTtl / 60 * 100) + "%; background: " + (s.otcTtl <= 10 ? "var(--warn-text)" : "var(--indigo)"),
      otcDecline: () => { stopTimers(); this.setState({ otcStage: "form" }); },
      otcEdit: () => { stopTimers(); this.setState({ otcStage: "form", otcCopied: false }); },
      otcAccept: () => {
        stopTimers();
        const id = "OTC-" + (2418 + s.otcTrades.length - 3);
        const status = buy && s.otcSettle === "bank" ? "Awaiting funds" : "Settling";
        this.setState({
          otcStage: "booked", otcCopied: false,
          otcBooked: { id, side: s.otcSide, settle: s.otcSettle, chain: s.otcChain, asset: s.otcAsset, fiatAmt, coinAmt },
          otcTrades: [{ id, side: s.otcSide, asset: s.otcAsset, usd, fiat: s.otcFiat, rate, status, date: "Today" }].concat(s.otcTrades)
        });
      },
      otcBookedId: bk ? bk.id : "",
      otcBookedNote: !bk ? "" : bk.side === "buy"
        ? (bk.settle === "bank" ? "Send the funds below. " + bk.coinAmt + " lands in your wallet as soon as they clear." : "We take it from your wallet now. " + bk.coinAmt + " arrives in a few minutes.")
        : "Send the stablecoin below. " + bk.fiatAmt + " goes out once it confirms.",
      otcInstrTitle: bk && bk.settle === "bank" && bk.side === "buy" ? "Bank transfer details" : "Settlement",
      otcInstrRows: instr,
      otcCopyLabel: s.otcCopied ? "Copied" : "Copy details",
      otcCopyInstr: () => { try { navigator.clipboard.writeText(instr.map(r => r.label + ": " + r.value).join("\n")); } catch (e) {} this.setState({ otcCopied: true }); },
      otcRates: Object.keys(MARKETS).map(c => {
        const m = MARKETS[c], d = m.rate > 100 ? 2 : 4;
        return { pair: "USDC/" + c, bid: n2(m.rate * 0.9965, d), ask: n2(m.rate * 1.0035, d) };
      }),
      otcTradeRows: s.otcTrades.map(t => {
        const pc = PILL[t.status] || PILL.Settling, d = t.rate > 100 ? 2 : 4;
        return {
          id: t.id, date: t.date, status: t.status,
          title: (t.side === "buy" ? "Bought " : "Sold ") + t.asset,
          usd: "$" + n2(t.usd, 0),
          fiat: t.fiat + " " + n2(t.usd * t.rate, 0),
          rate: n2(t.rate, d),
          pillStyle: "padding: 4px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 700; white-space: nowrap; background: " + pc[0] + "; color: " + pc[1]
        };
      })
    };
  }

  paybillVals(s) {
    const prefix = ((s.bizName || "ACME").replace(/[^A-Za-z]/g, "").slice(0, 4) || "ACME").toUpperCase();
    const one = s.pbType === "onetime";
    const amt = parseInt(String(s.pbAmount).replace(/[^0-9]/g, ""), 10) || 0;
    const canGen = s.pbLabel.trim().length > 1 && (!one || amt > 0);
    const kes = v => "KES " + v.toLocaleString("en-US");
    const copy = (txt, key) => { try { navigator.clipboard.writeText(txt); } catch (e) {} this.setState({ pbCopied: key }); };
    const nw = s.pbNew;
    const share = nw ? "Pay via M-Pesa: Lipa na M-Pesa → Pay Bill → Business no. 4163131 → Account no. " + nw.acc + (nw.amount ? " → Amount " + kes(nw.amount) : "") + ". Thank you!" : "";
    const pay = acc => {
      const a = s.pbAccounts.find(x => x.acc === acc);
      if (!a || !a.active) return;
      const v = a.type === "onetime" ? a.amount : [500, 1200, 2500, 3800][s.pbAccounts.length % 4];
      clearTimeout(this._pbF);
      this.setState({
        pbAccounts: s.pbAccounts.map(x => x.acc !== acc ? x : Object.assign({}, x, { collected: x.collected + v, last: "Just now", paid: x.type === "onetime" ? true : x.paid, active: x.type === "onetime" ? false : x.active })),
        pbFlash: { acc, text: "✓ " + kes(v) + " received" }
      });
      this._pbF = setTimeout(() => this.setState({ pbFlash: null }), 3200);
    };
    const total = s.pbAccounts.reduce((t, a) => t + a.collected, 0);
    return {
      pbCopyBiz: () => copy("4163131", "biz"),
      pbCopyBizLabel: s.pbCopied === "biz" ? "Copied" : "Copy",
      pbStats: [
        { label: "Active numbers", value: String(s.pbAccounts.filter(a => a.active).length) },
        { label: "Collected", value: kes(total) },
        { label: "Lands in", value: "KES wallet" }
      ],
      pbSteps: [
        { n: "1", text: "Open M-Pesa, tap", code: "Lipa na M-Pesa" },
        { n: "2", text: "Choose", code: "Pay Bill" },
        { n: "3", text: "Business number", code: "4163131" },
        { n: "4", text: "Account number", code: nw ? nw.acc : prefix + "01" },
        { n: "5", text: "Amount, then their M-Pesa PIN", code: "" }
      ],
      pbLabel: s.pbLabel, setPbLabel: e => this.setState({ pbLabel: e.target.value }),
      pbTypes: this.segOpts([["reusable", "Reusable"], ["onetime", "One-time"]], s.pbType, "pbType"),
      pbTypeNote: one ? "For a single invoice. It closes after one payment of the exact amount." : "Give one to each customer or branch. It takes any amount, any number of times.",
      pbIsOneTime: one,
      pbAmount: s.pbAmount, setPbAmount: e => { const d = e.target.value.replace(/[^0-9]/g, ""); this.setState({ pbAmount: d ? Number(d).toLocaleString("en-US") : "" }); },
      pbGenerateStyle: "padding: 12px 16px; border-radius: 8px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 13.5px; font-weight: 700; " + (canGen ? "cursor: pointer" : "opacity: 0.45; cursor: not-allowed"),
      pbGenerate: () => {
        if (!canGen) return;
        const n = one ? String(1043 + s.pbAccounts.filter(a => a.type === "onetime").length) : String(s.pbAccounts.filter(a => a.type === "reusable").length + 1).padStart(2, "0");
        const acc = prefix + n;
        const rec = { acc, label: s.pbLabel.trim() + (one ? " · " + kes(amt) : ""), type: s.pbType, amount: one ? amt : 0, collected: 0, last: "No payments yet", active: true };
        this.setState({ pbAccounts: [rec].concat(s.pbAccounts), pbNew: rec, pbLabel: "", pbAmount: "", pbCopied: "" });
      },
      pbHasNew: !!nw, pbNoNew: !nw,
      pbNewAcc: nw ? nw.acc : "", pbNewLabel: nw ? nw.label : "",
      pbShareText: share,
      pbCopyShare: () => copy(share, "share"),
      pbCopyShareLabel: s.pbCopied === "share" ? "Message copied" : "Copy message",
      pbTestNew: () => nw && pay(nw.acc),
      pbCountLabel: s.pbAccounts.length + " numbers",
      pbRows: s.pbAccounts.map(a => ({
        acc: a.acc, label: a.label,
        typeLabel: a.type === "onetime" ? (a.paid ? "One-time · paid" : "One-time") : "Reusable",
        typeStyle: "padding: 4px 9px; border-radius: 6px; font-size: 11px; font-weight: 700; white-space: nowrap; background: " + (a.type === "onetime" && a.paid ? "var(--ok-bg)" : "var(--surface)") + "; color: " + (a.type === "onetime" && a.paid ? "var(--ok-text)" : "var(--muted)"),
        collected: kes(a.collected), last: a.active || a.paid ? a.last : "Paused",
        flash: !!(s.pbFlash && s.pbFlash.acc === a.acc), flashText: s.pbFlash ? s.pbFlash.text : "",
        onTest: () => pay(a.acc),
        testStyle: "padding: 7px 11px; border-radius: 8px; border: 1px solid var(--border-strong); background: var(--panel); color: var(--ink); font-size: 12px; font-weight: 600; " + (a.active ? "cursor: pointer" : "opacity: 0.4; cursor: not-allowed"),
        toggleLabel: a.paid ? "Closed" : a.active ? "Pause" : "Resume",
        onToggle: () => { if (a.paid) return; this.setState({ pbAccounts: s.pbAccounts.map(x => x.acc === a.acc ? Object.assign({}, x, { active: !x.active }) : x) }); }
      }))
    };
  }

  guideVals(s, live) {
    const TERMS = {
      "webhook": "We call your server the moment something happens, so you never have to keep asking us.",
      "off-ramp": "Turning stablecoin into cash in someone's mobile wallet or bank account. An on-ramp is the reverse.",
      "settled": "The money actually arrived and the transfer is final. Before that a payment is only promised.",
      "client_ref": "A name you invent for a payment before you send it. If your code retries, we return the same payment instead of charging twice.",
      "idempotency": "The property that repeating a request has no extra effect. It is why a request retried ten times still only pays once.",
      "webhook secret": "The password we sign every callback with, so your server can tell a real ElementPay call from a fake one."
    };
    const perView = {
      overview: ["settled", "webhook", "client_ref"],
      transactions: ["off-ramp", "settled", "client_ref"],
      checkout: ["off-ramp", "settled", "client_ref"],
      keys: ["webhook", "webhook secret", "client_ref"],
      reference: ["client_ref", "idempotency", "off-ramp"],
      team: ["webhook", "webhook secret", "client_ref"]
    };
    const terms = perView[s.view] || perView.overview;
    const failing = (s.agentPaused.indexOf("ak_live_pay_1b9") >= 0 || s.fixDone) ? 0 : 3;
    const bad = failing > 0 && !s.fixMoved;
    const parked = failing > 0 && s.fixMoved;

    const GOALS = [
      ["Get paid", "cash in, stablecoin out",
        "let a customer pay me 500 KES from their mobile wallet and settle it as USDC in my Base account. Print the order id and the webhook you expect.",
        "POST /v1/orders", "+254 700 000 001",
        "When it works you will see one order reach settled on the Payments screen, and one order.settled callback on the Keys screen."],
      ["Send money out", "stablecoin in, cash out",
        "pay 1,000 KES to a phone number out of my USDC balance, with a client_ref so a retry cannot pay twice.",
        "POST /v1/orders", "+254 700 000 009",
        "Use the failing test number first: you want to see the rejection handled before you ever do this with real money."],
      ["Hold funds", "keep a balance per chain",
        "open a USDC account on Base for me, show its deposit address, and tell me the balance.",
        "GET /v1/accounts", "0x0000…dead",
        "You will see a new account card on the Accounts screen with its own address and balance."]
    ];
    const g = GOALS[s.goal] || GOALS[0];

    return {
      explainTerms: terms.map(term => ({
        term,
        onClick: () => this.setState({ explain: s.explain === term ? "" : term }),
        style: "padding: 4px 10px; border-radius: 999px; cursor: pointer; font-size: 11.5px; font-weight: 600; border: 1px " +
          (s.explain === term ? "solid var(--indigo)" : "dashed var(--border-strong)") +
          "; background: " + (s.explain === term ? "var(--indigo-tint)" : "transparent") +
          "; color: " + (s.explain === term ? "var(--indigo-text)" : "var(--muted)")
      })),
      explainOpen: !!s.explain && terms.indexOf(s.explain) >= 0,
      explainText: TERMS[s.explain] || "",

      statusBad: bad,
      statusCardStyle: "border-radius: 12px; backdrop-filter: var(--glass-blur); box-shadow: var(--glass-shadow); padding: 20px; display: flex; flex-direction: column; gap: 16px; border: 1px solid " +
        (bad ? "var(--bad-text)" : "var(--border)") + "; background: " + (bad ? "var(--bad-bg)" : "var(--panel)"),
      statusDotStyle: "width: 13px; height: 13px; border-radius: 999px; margin-top: 7px; flex: none; background: " +
        (bad ? "var(--bad-text)" : "oklch(0.62 0.15 152)"),
      statusHeadline: bad
        ? failing + " calls failed in the last hour — all the same cause"
        : parked
          ? "Fix copied — waiting on you to ship it"
          : "Everything is working",
      statusDetail: bad
        ? "PAYBILL payouts are missing account_number. No money left."
        : parked
          ? "The " + failing + " failed payouts moved to Keys & callbacks with the corrected payload and a retry button. Nothing else needs you here."
          : "All good. Nothing needs you.",
      statusFix: 'The ElementPay payout calls are failing with invalid_fiat_payload.\nWhen destination_type is "PAYBILL" the payload must also carry account_number.\nFix my payout code to send:\n\n{\n  "destination_type": "PAYBILL",\n  "destination": "247247",\n  "account_number": "0712345678"\n}\n\nThen retry the three failed orders with their original client_ref values.',
      statusFixLabel: s.copiedKey === "statusfix" ? "Copied" : "Copy the fix",
      copyStatusFix: () => {
        this.copyKey("statusfix");
        this.setState({ fixMoved: true });
      },
      showPendingFix: parked,
      pendingFixTitle: failing + " payouts are waiting on this fix",
      pendingFixPayload: '{\n  "destination_type": "PAYBILL",\n  "destination": "247247",\n  "account_number": "0712345678"\n}',
      retryPendingFix: () => this.setState({ fixDone: true, fixMoved: false }),

      awaySince: "since you closed this tab, 3 hours ago",
      awayItems: [
        { what: "142 payments settled", who: "your app, live key", dotStyle: "width: 7px; height: 7px; border-radius: 999px; margin-top: 6px; flex: none; background: oklch(0.62 0.15 152)" }
      ].concat(parked ? [
        { what: failing + " payouts parked for your fix", who: "waiting in Keys & callbacks", dotStyle: "width: 7px; height: 7px; border-radius: 999px; margin-top: 6px; flex: none; background: var(--warn-text)" }
      ] : bad ? [
        { what: failing + " payouts failed the same way", who: "ak_live_pay_1b9 · payout key", dotStyle: "width: 7px; height: 7px; border-radius: 999px; margin-top: 6px; flex: none; background: var(--bad-text)" },
        { what: "A key was used from a new machine", who: "ak_live_pay_1b9 · Frankfurt", dotStyle: "width: 7px; height: 7px; border-radius: 999px; margin-top: 6px; flex: none; background: var(--warn-text)" }
      ] : [
        { what: "The failing payout key is killed", who: "you killed ak_live_pay_1b9 — nothing has failed since", dotStyle: "width: 7px; height: 7px; border-radius: 999px; margin-top: 6px; flex: none; background: oklch(0.62 0.15 152)" }
      ]),

      showFirstLive: live && !s.firstLiveSeen,
      dismissFirstLive: () => this.setState({ firstLiveSeen: true }),

      goals: GOALS.map(([label, note], i) => ({
        label, note,
        onClick: () => this.setState({ goal: i }),
        style: "display: flex; flex-direction: column; gap: 3px; text-align: left; padding: 11px 15px; border-radius: 8px; cursor: pointer; border: 1px solid " +
          (i === s.goal ? "var(--indigo)" : "var(--border-strong)") + "; background: " + (i === s.goal ? "var(--indigo-tint)" : "var(--panel)") +
          "; color: " + (i === s.goal ? "var(--indigo-text)" : "var(--ink)")
      })),
      goalPrompt: g[2],
      goalEndpoint: g[3],
      goalTest: g[4],
      goalProof: g[5],
      goalCopyLabel: s.copiedKey === "goal" + s.goal ? "Copied" : "Copy this prompt",
      copyGoalPrompt: () => this.copyKey("goal" + s.goal),

      modalGoLive: s.modalGoLive,
      goLiveAck: s.goLiveAck,
      toggleGoLiveAck: () => this.setState({ goLiveAck: !s.goLiveAck }),
      goLiveFacts: [
        { title: "Customers pay you for real", body: "Payment links, WhatsApp and QR codes now collect real money." },
        { title: "Payouts can't be undone", body: "Once money reaches someone, only they can send it back." },
        { title: "Your test data stays separate", body: "Test payments won't mix with your live ones." },
        { title: "Developers need live keys", body: "If you use the API, swap your test keys for live ones." }
      ],
      goLiveConfirmStyle: "flex: 1 1 180px; padding: 12px; border-radius: 8px; border: 0; font-size: 13px; font-weight: 700; cursor: " +
        (s.goLiveAck ? "pointer" : "not-allowed") + "; opacity: " + (s.goLiveAck ? "1" : "0.45") +
        "; background: var(--indigo); color: var(--on-indigo)",
      confirmGoLive: () => {
        if (!s.goLiveAck) return;
        document.documentElement.setAttribute("data-env", "live");
        this.setState({ modalGoLive: false, goLiveConfirmed: true, env: "live", firstLiveSeen: false });
      },
      cancelGoLive: () => this.setState({ modalGoLive: false })
    };
  }


  runFlow(kind, ms, onDone) {
    this.setState({ flow: { kind: kind, step: "pending" } });
    clearTimeout(this._flowT);
    this._flowT = setTimeout(() => {
      this.setState(st => {
        if (!st.flow || st.flow.kind !== kind) return {};
        return Object.assign({ flow: { kind: kind, step: "done" } }, onDone ? onDone(st) : {});
      });
    }, ms || 1500);
  }

  printReceipt(o) {
    const esc = v => String(v == null ? "" : v).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
    const has = v => v && v !== "—";
    const biz = this.state.bizName || "Acme Commerce Ltd";
    const rows = [["Date", o.created], [o.flow === "Off-ramp" ? "Recipient" : "Customer", o.recipient], ["Amount", o.fiat], ["Settled as", o.crypto], ["Rate", o.rate], ["Receipt no.", o.mpesa], ["Reference", o.ref], ["Order ID", o.id]].filter(r => has(r[1]));
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>Receipt ' + esc(o.ref || o.id) + '</title><style>@page{size:A5;margin:14mm}body{font-family:Manrope,system-ui,sans-serif;color:#15142a;margin:0}h1{font-size:18px;margin:0}.m{color:#6b6a80;font-size:12px}.amt{font-family:"JetBrains Mono",monospace;font-size:28px;font-weight:600;margin:18px 0 4px}table{width:100%;border-collapse:collapse;margin-top:18px;font-size:12.5px}td{padding:8px 0;border-top:1px dashed #ddd}td:last-child{text-align:right;font-family:"JetBrains Mono",monospace}.ok{display:inline-block;padding:3px 8px;border-radius:6px;background:#e3f4ea;color:#1c6b3f;font-size:11px;font-weight:700}.f{margin-top:28px;padding-top:12px;border-top:1px dashed #ddd;text-align:center;font-size:11px;color:#8a899c}.top{display:flex;flex-direction:column;align-items:flex-end;gap:8px;padding-bottom:14px;margin-bottom:18px;border-bottom:1px dashed #ddd}.ep{display:flex;align-items:center;gap:8px;font-size:15px}.ep img{border-radius:5px}.ad{text-align:right;font-size:11px;line-height:1.5;color:#6b6a80}.ad b{color:#15142a}</style></head><body>' +
      '<div class="top"><div class="ep"><img src="' + new URL("/elementpay-logo.png", location.href).href + '" width="24" height="24" alt=""><b>ElementPay</b></div><div class="ad"><b>Elementpay Inc.</b><br>Fedha Plaza, Parklands Road<br>Nairobi, Kenya</div></div>' +
      '<h1>' + esc(biz) + '</h1><div class="m">Receipt · ' + esc(o.flow === "Off-ramp" ? "Payout" : "Payment") + '</div>' +
      '<div class="amt">' + esc(o.fiat) + '</div><span class="ok">' + esc(({ settled: "Paid", refunded: "Refunded", failed: "Failed" })[o.status] || "Pending") + '</span>' +
      '<table>' + rows.map(r => '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>').join("") + '</table>' +
      '<div class="f">elementpay.net</div></body></html>';
    const fr = document.createElement("iframe");
    fr.setAttribute("aria-hidden", "true");
    fr.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(fr);
    const d = fr.contentWindow.document; d.open(); d.write(html); d.close();
    setTimeout(() => { try { fr.contentWindow.focus(); fr.contentWindow.print(); } catch (e) {} setTimeout(() => fr.remove(), 1500); }, 250);
  }

  renderVals() {
    const hc0 = HOMES[this.state.homeCountry] ? this.state.homeCountry : "KES";
    if (this._home !== hc0) { xApplyHome(hc0); this._home = hc0; }
    const r = this.localize(this.renderVals0());
    Object.assign(r, this.xVals(r));
    Object.assign(r, this.xVals2(r));
    Object.assign(r, this.gVals(r));
    return Object.assign(r, this.lVals(r));
  }

  
  xToast(msg) { clearTimeout(this._toT); this.setState({ toast: msg }); this._toT = setTimeout(() => this.setState({ toast: null }), 4000); }

  xStartQuote() {
    clearInterval(this._xqI);
    this.setState({ xqTtl: 30 });
    this._xqI = setInterval(() => this.setState(st => {
      const lv = st.wiz && st.wiz.step >= 3 && st.wiz.step <= 6; const det = st.view === "xdetail" && (st.xpNew || []).some(p => p.id === st.xpSel && p.status === "Awaiting funds"); if (!lv && !det) return null;
      if (st.xqTtl <= 1) return { xqTtl: 30, xqJ: (st.xqJ || 0) + 1, xqCount: (st.xqCount || 0) + 1 };
      return { xqTtl: st.xqTtl - 1 };
    }), 1000);
  }

  xTrack(id) {
    [["Converting", 900], ["Settling", 2700], ["Settled", 4600]].forEach(([st, ms]) => setTimeout(() => this.setState(s0 => ({ xpNew: (s0.xpNew || []).map(p => p.id === id ? Object.assign({}, p, { status: st }) : p) })), ms));
  }

  xApprove(id) {
    this.setState(st => {
      const isNew = (st.xpNew || []).some(x => x.id === id);
      return isNew ? { xpNew: st.xpNew.map(x => x.id === id ? Object.assign({}, x, { status: "Awaiting funds" }) : x) } : { xpOver: Object.assign({}, st.xpOver, { [id]: "Awaiting funds" }) };
    });
    this.xToast(id + " approved by Achieng Odhiambo (Owner). Funding is open.");
  }

  xOpenWiz(preset) {
    this.setState({ wiz: Object.assign({ step: 1, dir: "pay", corr: "KE-CN", amt: "500,000", mode: "send", ben: null, purpose: "GDS · Payment for goods", inv: false, pin: "", fund: "bal" }, preset || {}), xqJ: 0, xqCount: 0, palette: false, gsMenu: false, demoMenu: false });
    if (preset && preset.step === 3) this.xStartQuote();
  }

  xKybSave() {
    this.setState({ kybSaved: "Saving…" });
    clearTimeout(this._kyT);
    this._kyT = setTimeout(() => { const d = new Date(); this.setState({ kybSaved: "All changes saved · " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") }); }, 700);
  }

  xBal(s) { const d = s.xDebit || {}; return { KES: Math.round(4812300 * HOME.f) - (d[HOME.cur] || 0), USDC: 68496.73 - (d.USDC || 0) }; }

  xLimits(s, all) { const sb = !!s.demoSandbox; const per = sb ? HOME.thr : HOME.per; const day = sb ? HOME.thr * 5 : HOME.day; const used = (all || []).filter(p => p.date === "Nov 7" && ["Failed", "Refunded"].indexOf(p.status) < 0 && (typeof p.party === "number" || p.party === "own")).reduce((t, p) => t + p.send / XUSD[XCOR[p.corr].from] * XUSD[HOME.cur], 0); return { per, day, used, tier: sb ? "Sandbox limits" : "Tier 2 · placeholder, editable in Settings" }; }




  xSales(s) {
    const acct = s.acct || "live"; const sbx = !!s.demoSandbox; const zero = !!s.xEmpty || (!(acct === "live" || acct === "paused") && !sbx); const mult = sbx ? 0.1 : 1;
    if (zero) return [];
    const LNK = id => "lnk_" + id;
    const base = CATPAY.map((x, i) => ({ id: x.id, prod: CAT[x.pi].id, pname: CAT[x.pi].name, cur: x.cur, amt: x.amt * mult, day: x.day, date: x.date, m: x.m, st: (s.salesOv || {})[x.id] || x.st, cust: x.cust, src: i % 10 === 4 ? "INV-" + (1031 + Math.floor(i / 10)) : LNK(CAT[x.pi].id), method: ["M-Pesa", "Card", "M-Pesa", "USDC", "Bank transfer"][i % 5] }));
    const custom = [["Walk-in counter", 2500], ["Walk-in counter", 7800], ["Deposit link", 50000], ["Walk-in counter", 1200], ["Deposit link", 25000], ["Walk-in counter", 4400], ["Deposit link", 80000], ["Walk-in counter", 3100]].map(([src, a], i) => { const day = 38 - i * 4; return { id: "cp_" + (9100 - i), prod: null, pname: "Custom amount", cur: "KES", amt: a * mult, day, date: day > 31 ? "Nov " + (day - 31) : "Oct " + day, m: day > 31 ? 5 : 4, st: (s.salesOv || {})["cp_" + (9100 - i)] || "Paid", cust: ["Walk-in", "Kibera Agent Network", "Guest payer"][i % 3], src: src === "Walk-in counter" ? "lnk_walkin" : "lnk_deposit", method: i % 2 ? "Card" : "M-Pesa" }; });
    return (s.salesNew || []).concat(base, custom);
  }

  lVals(r) {
    const s = this.state, V = s.view, out = {};
    const toast = m => this.xToast(m); const set = o => this.setState(o);
    const pill = (bg, fg) => "display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; background: " + bg + "; color: " + fg;
    const pl = k => ({ ok: pill("var(--ok-bg)", "var(--ok-text)"), warn: pill("var(--warn-bg)", "var(--warn-text)"), bad: pill("var(--bad-bg)", "var(--bad-text)"), ind: pill("var(--indigo-tint)", "var(--indigo-text)"), neu: pill("var(--surface)", "var(--muted)") })[k];
    const MONO = "font-family: 'JetBrains Mono', ui-monospace, monospace; ";
    const chipSt = on => "white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; cursor: pointer; font-size: 12px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    const btn1 = d => "padding: 9px 14px; border-radius: 8px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 13px; font-weight: 700; white-space: nowrap; " + (d ? "opacity: 0.45; cursor: not-allowed" : "cursor: pointer");
    const kv = (label, value, mono, strong) => ({ label, value: String(value), vStyle: (mono ? MONO + "white-space: nowrap; " : "") + "font-size: " + (mono ? "12.5px" : "13px") + "; text-align: right; font-weight: " + (strong ? "700" : "600") + "; color: var(--ink)" });
    const K = v => "KES " + Math.round(v).toLocaleString("en-US");
    const acct = s.acct || "live"; const sbx = !!s.demoSandbox; const verified = sbx || acct === "live" || acct === "paused"; const E = !!s.xEmpty;
    const sales = this.xSales(s); const keq = x => x.amt * (GKE[x.cur] || 1);
    const gt = s.gt || {};
    const T = (id, cols, rows, o) => { const st = gt[id] || {}; const q = (st.q || "").toLowerCase(); const ch = st.chip || "All"; const upd = x => this.setState(s0 => ({ gt: Object.assign({}, s0.gt, { [id]: Object.assign({}, (s0.gt || {})[id], x) }) })); let vis = rows.filter(r0 => (ch === "All" || r0.status === ch) && (!q || (r0.search || "").toLowerCase().includes(q))); if (st.sort) { const k = st.sort, d = st.dir === "desc" ? -1 : 1; vis = vis.slice().sort((a, b) => (a.v[k] > b.v[k] ? 1 : a.v[k] < b.v[k] ? -1 : 0) * d); }
      return { q: st.q || "", setQ: e => upd({ q: e.target.value }), chips: (o.chips || []).length ? ["All"].concat(o.chips).map(c => ({ label: c + " · " + (c === "All" ? rows.length : rows.filter(r0 => r0.status === c).length), onClick: () => upd({ chip: c }), style: chipSt(ch === c) })) : [], cols: cols.map(([k, label, al]) => ({ label: label + (st.sort === k ? (st.dir === "desc" ? " ↓" : " ↑") : ""), onClick: () => upd({ sort: k, dir: st.sort === k && st.dir !== "desc" ? "desc" : "asc" }), style: "text-align: " + (al || "left") + "; padding: 10px 14px; font-size: 11.5px; font-weight: 700; color: var(--faint); background: var(--surface-soft); white-space: nowrap; cursor: pointer" })), rows: vis.map(r0 => ({ onClick: r0.onClick || (() => {}), cells: cols.map(([k, , al]) => { const c = r0.c[k] || {}; return { text: c.t != null ? String(c.t) : "", flag: "display: none", span: c.p ? c.p : ((c.m ? MONO + "font-size: 12.5px; " : "font-size: 13px; ") + (c.b ? "font-weight: 700; " : "") + (c.mu ? "color: var(--muted); " : "") + "white-space: nowrap"), td: "padding: 11px 14px; border-top: 1px solid var(--line); vertical-align: middle; text-align: " + (al || "left"), isBtn: !!c.btn, btn: c.btn || "", bStyle: "padding: 5px 10px; border-radius: 8px; border: 1px solid var(--border-strong); background: var(--panel); color: var(--ink); font-size: 12px; font-weight: 600; cursor: pointer; margin-left: 6px", act: e => { if (e && e.stopPropagation) e.stopPropagation(); c.act && c.act(); } }; }) })), has: vis.length > 0, empty: vis.length === 0, emptyTitle: rows.length ? "Nothing matches" : o.emptyTitle, emptyNote: rows.length ? "Clear the search or pick another filter." : o.emptyNote, footer: vis.length + " of " + rows.length + " " + o.noun, exportCsv: () => toast(o.file + ".csv exported · " + vis.length + " rows") }; };
    const go = (view, extra) => () => this.setState(Object.assign({ view }, extra || {}));
    out.navLinksClick = go("plinks"); out.navInvoicesClick = go("pinv");
    out.navLinksStyle = this.navBtn(V === "plinks", false, false); out.navLinksCurrent = V === "plinks" ? "page" : "false";
    out.navInvoicesStyle = this.navBtn(V === "pinv", false, false); out.navInvoicesCurrent = V === "pinv" ? "page" : "false";
    if (V === "plinks" || V === "pinv") { out.navEmbedStyle = this.navBtn(false, false, false); }
    const cats = CAT.concat(s.catNew || []);
    const prodOf = id => cats.find(p => p.id === id);
    /* links */
    out.isPL = V === "plinks";
    const LINKS = E ? [] : CAT.filter((p, i) => sales.some(x => x.prod === p.id) || p.st === "Active").map(p => ({ id: "lnk_" + p.id, name: p.name, prod: p.id, st: p.st === "Archived" ? (p.sku === "PKG-050" ? "Active" : "Inactive") : "Active", created: p.created, expiry: p.type === "Recurring" ? "None" : "Dec 31, 2026", reusable: true })).concat([{ id: "lnk_walkin", name: "Walk-in counter", prod: null, amtLabel: "Open amount · KES", st: "Active", created: "Feb 2026", expiry: "None", reusable: true }, { id: "lnk_deposit", name: "Deposit link", prod: null, amtLabel: "Open amount · KES", st: "Active", created: "May 2026", expiry: "None", reusable: true }]).concat(s.linksNew || []).map(l => Object.assign({}, l, { st: (s.linkSt || {})[l.id] || l.st }));
    const lpays = l => sales.filter(x => x.src === l.id);
    const lvol = l => lpays(l).filter(x => x.st === "Paid").reduce((t, x) => t + keq(x), 0);
    const priceLabel = l => { if (!l.prod) return l.amtLabel || "Custom amount"; const p = prodOf(l.prod); return p ? p.name + " · " + xfmt(p.prices[0][1], p.prices[0][0]) + (p.prices.length > 1 ? " +" + (p.prices.length - 1) : "") : "Product"; };
    const totL = LINKS.reduce((t, l) => t + lvol(l), 0);
    out.plKpis = [["Active links", String(LINKS.filter(l => l.st === "Active").length), LINKS.length + " total"], ["Payments", String(sales.filter(x => x.src.indexOf("lnk_") === 0).length), "From links"], ["Volume", K(totL), "Paid, KES equivalent"], ["From catalog products", String(LINKS.filter(l => l.prod).length), "Links tied to a product"]].map(([label, value, note]) => ({ label, value, note }));
    out.plT = T("plT", [["name", "Name"], ["pricing", "Pricing"], ["st", "Status"], ["pays", "Payments", "right"], ["vol", "Volume", "right"], ["link", "Link"], ["created", "Created"], ["exp", "Expiry"]], LINKS.map(l => ({ status: l.st, search: l.name + " " + priceLabel(l), v: { name: l.name, pricing: priceLabel(l), st: l.st, pays: lpays(l).length, vol: lvol(l), link: l.id, created: l.created, exp: l.expiry }, onClick: () => set({ plSel: l.id }), c: { name: { t: l.name, b: 1 }, pricing: { t: priceLabel(l), mu: 1 }, st: { t: l.st, p: pl(l.st === "Active" ? "ok" : "neu") }, pays: { t: lpays(l).length, m: 1 }, vol: { t: lvol(l) ? K(lvol(l)) : "None", m: 1 }, link: { t: "pay.elementpay.net/" + l.id.slice(4, 14), m: 1, mu: 1, btn: "Copy", act: () => { try { navigator.clipboard.writeText("https://pay.elementpay.net/" + l.id); } catch (e) {} toast("Link copied"); } }, created: { t: l.created, mu: 1 }, exp: { t: l.expiry, mu: 1 } } })), { chips: ["Active", "Inactive"], noun: "links", file: "payment-links", emptyTitle: "No payment links", emptyNote: "Create a link for a catalog product or a custom amount and share it anywhere." });
    const L = LINKS.find(l => l.id === s.plSel);
    out.plDOpen = !!L; out.plDClose = () => set({ plSel: null });
    if (L) { const lp = lpays(L); out.plD = { name: L.name, pricing: priceLabel(L), st: L.st, stStyle: pl(L.st === "Active" ? "ok" : "neu"), url: "pay.elementpay.net/" + L.id, vol: K(lvol(L)), n: lp.length + " payments", deact: L.st === "Active" ? "Deactivate" : "Activate" }; out.plDPays = lp.slice(0, 8).map(x => ({ t: x.date + " · " + x.cust, a: xfmt(x.amt, x.cur), st: x.st, sts: pl(x.st === "Paid" ? "ok" : "neu") })); out.plDPaysHas = lp.length > 0; out.plDDeact = () => { set({ linkSt: Object.assign({}, s.linkSt, { [L.id]: L.st === "Active" ? "Inactive" : "Active" }) }); toast(L.st === "Active" ? "Link deactivated" : "Link active"); }; out.plDPay = () => { const p = prodOf(L.prod); const id = "sp_" + Date.now().toString().slice(-6); set({ salesNew: [{ id, prod: L.prod, pname: p ? p.name : "Custom amount", cur: p ? p.prices[0][0] : "KES", amt: p ? p.prices[0][1] : 5000, day: 38, date: "Nov 8", m: 5, st: "Paid", cust: "Test payer", src: L.id, method: "M-Pesa" }].concat(s.salesNew || []) }); toast("Test payment recorded. It now shows in Transactions, Catalog and Reports."); }; }
    const LF = s.plF; out.plFOpen = !!LF; out.plFClose = () => set({ plF: null });
    out.plNewStyle = btn1(!verified); out.plNew = () => { if (!verified) { toast("Verification required"); return; } set({ plF: { kind: "product", prod: (cats.find(p => p.st === "Active") || {}).id, name: "", amt: "", cur: "KES", reuse: "Reusable", lock: "30 seconds", exp: "No expiry", payerCur: ["KES"] } }); };
    if (LF) { const fs = o => set({ plF: Object.assign({}, LF, o) }); out.plf = LF; out.plfSet = e => fs({ [e.target.dataset.k]: e.target.value });
      out.plfKinds = [["product", "Catalog product"], ["custom", "Custom amount"]].map(([k, l]) => ({ label: l, style: chipSt(LF.kind === k), onClick: () => fs({ kind: k }) })); out.plfIsProd = LF.kind === "product"; out.plfIsCustom = LF.kind === "custom";
      out.plfProds = cats.filter(p => p.st === "Active").map(p => ({ label: p.name, style: chipSt(LF.prod === p.id), onClick: () => fs({ prod: p.id }) }));
      const p = prodOf(LF.prod); out.plfProdPrices = p ? p.prices.map(x => kv(x[0] + (x[0] === "KES" ? " · Live" : " · Pilot"), xfmt(x[1], x[0]), true)) : [];
      out.plfReuse = ["Reusable", "Single use"].map(x => ({ label: x, style: chipSt(LF.reuse === x), onClick: () => fs({ reuse: x }) })); out.plfLock = ["30 seconds", "5 minutes", "15 minutes"].map(x => ({ label: x, style: chipSt(LF.lock === x), onClick: () => fs({ lock: x }) })); out.plfExp = ["No expiry", "7 days", "30 days"].map(x => ({ label: x, style: chipSt(LF.exp === x), onClick: () => fs({ exp: x }) })); out.plfPayer = ["KES", "NGN", "TZS", "USD"].map(x => ({ label: x + (x === "KES" ? "" : " · Pilot"), style: chipSt(LF.payerCur.indexOf(x) >= 0), onClick: () => fs({ payerCur: LF.payerCur.indexOf(x) >= 0 ? LF.payerCur.filter(y => y !== x) : LF.payerCur.concat([x]) }) }));
      const ok = LF.kind === "product" ? !!p : !!LF.name; out.plfStyle = btn1(!ok) + "; flex: 1";
      out.plfSave = () => { if (!ok) { toast("Pick a product or name the link"); return; } const id = "lnk_n" + (s.linksNew || []).length; set({ plF: null, linksNew: (s.linksNew || []).concat([{ id, name: LF.kind === "product" ? p.name : LF.name, prod: LF.kind === "product" ? p.id : null, amtLabel: LF.amt ? xfmt(Number(LF.amt) || 0, LF.cur) : "Open amount · " + LF.cur, st: "Active", created: "Nov 2026", expiry: LF.exp === "No expiry" ? "None" : LF.exp, reusable: LF.reuse === "Reusable" }]) }); toast("Link created. It is in the list with the product name."); }; }
    /* invoices */
    out.isPI = V === "pinv";
    const paidInv = {}; sales.filter(x => x.src.indexOf("INV-") === 0).forEach(x => { (paidInv[x.src] = paidInv[x.src] || []).push(x); });
    const INV = E ? [] : Object.keys(paidInv).map(k => { const xs = paidInv[k]; return { id: k, client: xs[0].cust, cur: xs[0].cur, lines: xs.map(x => [x.pname, x.amt]), st: xs.every(x => x.st === "Refunded") ? "Void" : "Paid", due: xs[0].date, paidOn: xs[0].date }; }).concat([{ id: "INV-1040", client: "Westlands Logistics", cur: "KES", lines: [["Shipping consolidation", 42000], ["Customs clearance fee", 15000]], st: "Sent", due: "Nov 20" }, { id: "INV-1041", client: "Kano Textile House", cur: "NGN", lines: [["Bulk packaging cartons (100)", 220000]], st: "Viewed", due: "Nov 15" }, { id: "INV-1042", client: "Ruaka Hardware", cur: "KES", lines: [["Solar lantern (case of 20)", 64000]], st: "Overdue", due: "Nov 1" }, { id: "INV-1043", client: "Ikeja Retail Collective", cur: "USD", lines: [["Export desk retainer", 350]], st: "Draft", due: "Dec 1" }]).concat(s.invNew || []).map(i => Object.assign({}, i, { st: (s.invSt || {})[i.id] || i.st, total: i.lines.reduce((t, l) => t + Number(l[1]), 0) }));
    const IS = { Draft: "neu", Sent: "ind", Viewed: "ind", Paid: "ok", Overdue: "bad", Void: "neu" };
    const out_ = INV.filter(i => ["Sent", "Viewed", "Overdue"].indexOf(i.st) >= 0);
    out.piKpis = [["Outstanding", K(out_.reduce((t, i) => t + i.total * (GKE[i.cur] || 1), 0)), out_.length + " invoices"], ["Overdue", String(INV.filter(i => i.st === "Overdue").length), "Past the due date"], ["Paid", K(INV.filter(i => i.st === "Paid").reduce((t, i) => t + i.total * (GKE[i.cur] || 1), 0)), INV.filter(i => i.st === "Paid").length + " invoices, in Transactions"], ["Drafts", String(INV.filter(i => i.st === "Draft").length), ""]].map(([label, value, note]) => ({ label, value, note }));
    out.piT = T("piT", [["id", "Invoice"], ["client", "Client"], ["amt", "Amount", "right"], ["st", "Status"], ["due", "Due"], ["lines", "Line items"]], INV.map(i => ({ status: i.st, search: i.id + " " + i.client, v: { id: i.id, client: i.client, amt: i.total * (GKE[i.cur] || 1), st: i.st, due: i.due, lines: i.lines.length }, onClick: () => set({ piSel: i.id }), c: { id: { t: i.id, m: 1 }, client: { t: i.client, b: 1 }, amt: { t: xfmt(i.total, i.cur), m: 1 }, st: { t: i.st, p: pl(IS[i.st]) }, due: { t: i.due, mu: 1 }, lines: { t: i.lines.map(l => l[0]).join(", "), mu: 1 } } })), { chips: ["Draft", "Sent", "Viewed", "Paid", "Overdue", "Void"], noun: "invoices", file: "invoices", emptyTitle: "No invoices", emptyNote: "Create an invoice from catalog products or free text. Each one carries a pay link." });
    const I = INV.find(i => i.id === s.piSel);
    out.piDOpen = !!I; out.piDClose = () => set({ piSel: null });
    if (I) { out.piD = { id: I.id, client: I.client, st: I.st, stStyle: pl(IS[I.st]), total: xfmt(I.total, I.cur), link: "pay.elementpay.net/i/" + I.id, canPay: ["Sent", "Viewed", "Overdue"].indexOf(I.st) >= 0 }; out.piDLines = I.lines.map(l => kv(l[0], xfmt(Number(l[1]), I.cur), true)); out.piDTimeline = ["Created", I.st !== "Draft" ? "Sent to " + I.client : "", ["Viewed", "Paid", "Overdue"].indexOf(I.st) >= 0 ? "Viewed by payer" : "", I.st === "Paid" ? "Paid " + (I.paidOn || "") : I.st === "Overdue" ? "Overdue since " + I.due : ""].filter(Boolean).map(t => ({ t }));
      out.piDSim = () => { const id = "sp_" + Date.now().toString().slice(-6); set({ invSt: Object.assign({}, s.invSt, { [I.id]: "Paid" }), salesNew: I.lines.map((l, j) => { const p = cats.find(c => c.name === l[0]); return { id: id + j, prod: p ? p.id : null, pname: l[0], cur: I.cur, amt: Number(l[1]), day: 38, date: "Nov 8", m: 5, st: "Paid", cust: I.client, src: I.id, method: "Bank transfer" }; }).concat(s.salesNew || []) }); toast(I.id + " paid. Transactions, Catalog and Reports updated."); };
      out.piDSend = () => { set({ invSt: Object.assign({}, s.invSt, { [I.id]: "Sent" }) }); toast("Invoice sent to " + I.client); }; out.piDIsDraft = I.st === "Draft"; }
    const IF = s.piF; out.piFOpen = !!IF; out.piFClose = () => set({ piF: null });
    out.piNewStyle = btn1(!verified); out.piNew = () => { if (!verified) { toast("Verification required"); return; } set({ piF: { client: "", cur: "KES", due: "Nov 30", lines: [["", ""]] } }); };
    if (IF) { const fs = o => set({ piF: Object.assign({}, IF, o) }); out.pif = IF; out.pifSet = e => fs({ [e.target.dataset.k]: e.target.value });
      out.pifLines = IF.lines.map((l, i) => ({ d: l[0], a: l[1], setD: e => fs({ lines: IF.lines.map((x, j) => j === i ? [e.target.value, x[1]] : x) }), setA: e => fs({ lines: IF.lines.map((x, j) => j === i ? [x[0], e.target.value] : x) }), rm: () => fs({ lines: IF.lines.filter((x, j) => j !== i) }), canRm: IF.lines.length > 1 }));
      out.pifAdd = () => fs({ lines: IF.lines.concat([["", ""]]) });
      out.pifPick = cats.filter(p => p.st === "Active").slice(0, 7).map(p => ({ label: p.name, style: chipSt(false), onClick: () => { const pr = p.prices.find(x => x[0] === IF.cur) || p.prices[0]; fs({ cur: IF.lines.some(l => l[0]) ? IF.cur : pr[0], lines: IF.lines.filter(l => l[0]).concat([[p.name, String(pr[1])]]) }); } }));
      const tot = IF.lines.reduce((t, l) => t + (Number(String(l[1]).replace(/[^0-9.]/g, "")) || 0), 0); out.pifTotal = xfmt(tot, IF.cur);
      const ok = !!IF.client && tot > 0; out.pifStyle = btn1(!ok) + "; flex: 1";
      out.pifSave = st => () => { if (!ok) { toast("Add a client and at least one priced line"); return; } const id = "INV-" + (1044 + (s.invNew || []).length); set({ piF: null, invNew: (s.invNew || []).concat([{ id, client: IF.client, cur: IF.cur, due: IF.due, lines: IF.lines.filter(l => l[0]).map(l => [l[0], Number(String(l[1]).replace(/[^0-9.]/g, "")) || 0]), st }]) }); toast(id + (st === "Sent" ? " sent" : " saved as draft")); };
      out.pifSend = out.pifSave("Sent"); out.pifDraft = out.pifSave("Draft"); }
    if (V === "plinks") { out.viewTitle = "Payment links"; out.hasHeaderAction = false; }
    if (V === "pinv") { out.viewTitle = "Invoices"; out.hasHeaderAction = false; }
    return out;
  }

  gVals(r) {
    const s = this.state, V = s.view, out = {};
    const toast = m => this.xToast(m);
    const close = { palette: false, gsMenu: false, demoMenu: false, bellOpen: false, fbOpen: false, wsOpen: false };
    const set = o => this.setState(o);
    const pill = (bg, fg) => "display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; background: " + bg + "; color: " + fg;
    const PP = { ok: ["var(--ok-bg)", "var(--ok-text)"], warn: ["var(--warn-bg)", "var(--warn-text)"], bad: ["var(--bad-bg)", "var(--bad-text)"], ind: ["var(--indigo-tint)", "var(--indigo-text)"], neu: ["var(--surface)", "var(--muted)"] };
    const pl = k => pill(PP[k][0], PP[k][1]);
    const MONO = "font-family: 'JetBrains Mono', ui-monospace, monospace; ";
    const flagSt = c => "display: inline-block; flex-shrink: 0; width: 20px; height: 14px; border-radius: 3px; box-shadow: 0 0 0 1px rgba(20,24,28,0.1); background: center/cover no-repeat var(--surface); background-image: url(/flags/flag-" + c + ".svg)";
    const kv = (label, value, mono, strong) => ({ label, value: String(value), vStyle: (mono ? MONO + "white-space: nowrap; " : "") + "font-size: " + (mono ? "12.5px" : "13px") + "; text-align: right; overflow-wrap: anywhere; font-weight: " + (strong ? "700" : "600") + "; color: var(--ink)" });
    const tabSt = on => "display: inline-flex; align-items: center; gap: 7px; padding: 7px 11px; border-radius: 8px; cursor: pointer; white-space: nowrap; font-size: 12.5px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    const chipSt = on => "display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; cursor: pointer; white-space: nowrap; font-size: 12px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    const btn1 = dis => "padding: 9px 14px; border-radius: 8px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 13px; font-weight: 700; white-space: nowrap; " + (dis ? "opacity: 0.45; cursor: not-allowed" : "cursor: pointer");
    const btn2 = dis => "padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-strong); background: var(--panel); color: var(--ink); font-size: 12.5px; font-weight: 600; white-space: nowrap; " + (dis ? "opacity: 0.45; cursor: not-allowed" : "cursor: pointer");
    const K = n => "KES " + Math.round(n).toLocaleString("en-US");
    const KM = n => Math.abs(n) >= 1e6 ? "KES " + (n / 1e6).toFixed(2) + "M" : K(n);
    const acct = s.acct || "live"; const sbx = !!s.demoSandbox; const E = !!s.xEmpty;
    const verified = sbx || acct === "live" || acct === "paused"; const paused = acct === "paused" && !sbx; const mult = sbx ? 0.1 : 1;
    const gateT = verified ? "" : "Verification required";
    const TB = (key, list, def) => { const cur = s[key] || def; return { cur, tabs: list.map(([id, l]) => ({ label: l, onClick: () => set({ [key]: id }), style: tabSt(cur === id) })) }; };
    const BARS = (vals, labels, color, fmtF) => { const mx = Math.max(1, ...vals); return vals.map((v, i) => ({ label: labels[i], title: labels[i] + " · " + fmtF(v), style: "display: block; width: 100%; border-radius: 4px 4px 0 0; min-height: 2px; background: " + (i === vals.length - 1 ? "var(--indigo)" : color) + "; height: " + Math.round(v / mx * 100) + "%" })); };
    const gt = s.gt || {};
    const T = (id, cols, rows, o) => {
      const st = gt[id] || {}; const q = (st.q || "").toLowerCase(); const ch = st.chip || "All";
      const upd = x => this.setState(s0 => ({ gt: Object.assign({}, s0.gt, { [id]: Object.assign({}, (s0.gt || {})[id], x) }) }));
      let vis = rows.filter(r0 => (ch === "All" || r0.status === ch) && (!q || (r0.search || "").toLowerCase().includes(q)));
      if (st.sort) { const k = st.sort, d = st.dir === "desc" ? -1 : 1; vis = vis.slice().sort((a, b) => { const x = a.v[k], y = b.v[k]; return (x > y ? 1 : x < y ? -1 : 0) * d; }); }
      const chips = o.chips || [];
      return {
        q: st.q || "", setQ: e => upd({ q: e.target.value }),
        chips: chips.length ? ["All"].concat(chips).map(c => ({ label: c + " · " + (c === "All" ? rows.length : rows.filter(r0 => r0.status === c).length), onClick: () => upd({ chip: c }), style: chipSt(ch === c) })) : [],
        cols: cols.map(([k, label, al]) => ({ label: label + (st.sort === k ? (st.dir === "desc" ? " ↓" : " ↑") : ""), onClick: () => upd({ sort: k, dir: st.sort === k && st.dir !== "desc" ? "desc" : "asc" }), style: "text-align: " + (al || "left") + "; padding: 10px 14px; font-size: 11.5px; font-weight: 700; color: var(--faint); background: var(--surface-soft); white-space: nowrap; cursor: pointer; user-select: none" })),
        rows: vis.map(r0 => ({ onClick: r0.onClick || (() => {}), cells: cols.map(([k, , al]) => { const c = r0.c[k] || {}; return { text: c.t != null ? String(c.t) : "", flag: c.f ? flagSt(c.f) : "display: none", span: c.p ? c.p : ((c.m ? MONO + "font-size: 12.5px; " : "font-size: 13px; ") + (c.b ? "font-weight: 700; " : "") + (c.mu ? "color: var(--muted); " : "") + "white-space: nowrap"), td: "padding: 11px 14px; border-top: 1px solid var(--line); vertical-align: middle; text-align: " + (al || "left"), isBtn: !!c.btn, btn: c.btn || "", bStyle: btn2(!!c.dis) + "; padding: 5px 10px; font-size: 12px; margin-left: 6px", act: e => { if (e && e.stopPropagation) e.stopPropagation(); if (!c.dis && c.act) c.act(); } }; }) })),
        has: vis.length > 0, empty: vis.length === 0,
        emptyTitle: rows.length ? "Nothing matches" : o.emptyTitle, emptyNote: rows.length ? "Clear the search or pick another filter." : o.emptyNote,
        footer: vis.length + " of " + rows.length + " " + o.noun, exportCsv: () => toast(o.file + ".csv exported · " + vis.length + " rows")
      };
    };

    /* shared page states */
    const growView = ["partners", "connect", "billing", "catalog"].indexOf(V) >= 0;
    if (growView && this._glv !== V) { this._glv = V; setTimeout(() => this.setState({ gLoad: true }), 0); setTimeout(() => this.setState({ gLoad: false }), 650); }
    if (!growView) this._glv = null;
    const net = s.net || "ok";
    out.gSkel = (!!s.gLoad || net === "slow") && net !== "error"; out.gErr = net === "error"; out.gOk = !out.gSkel && !out.gErr;
    out.gRetry = () => { this.setState({ net: "ok", gLoad: true }); setTimeout(() => this.setState({ gLoad: false }), 650); };
    out.gSbxShow = sbx; out.gGateShow = !verified; out.gPausedShow = paused;
    const segSt = on => "white-space: nowrap; padding: 6px 9px; border-radius: 7px; cursor: pointer; font-size: 12px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    out.demoGroups = (r.demoGroups || []).concat([
      { label: "Partner status", opts: [["none", "Not applied"], ["pending", "Pending"], ["approved", "Approved"], ["suspended", "Suspended"]].map(([v, l]) => ({ label: l, style: segSt((s.ptStatus || "approved") === v), onClick: () => set({ ptStatus: v }) })) },
      { label: "Network (Grow pages)", opts: [["ok", "Normal"], ["slow", "Loading"], ["error", "Error"]].map(([v, l]) => ({ label: l, style: segSt(net === v), onClick: () => set({ net: v }) })) }
    ]);
    const G = (k, label, badge) => { const on = V === k; out["nav" + label + "Style"] = this.navBtn(on, false, false); out["nav" + label + "Current"] = on ? "page" : "false"; out["nav" + label + "Click"] = () => this.setState(Object.assign({ view: k, cnSel: null, bsSel: null, catSel: null }, close)); out["nav" + label + "Badge"] = badge; out["nav" + label + "BadgeStyle"] = "margin-left: auto; font-size: 10.5px; font-weight: 700; padding: " + (badge ? "2px 7px" : "0") + "; border-radius: 999px; background: var(--surface); color: var(--rail-dim)"; };
    G("partners", "Partners", ""); G("connect", "Connect", "Roadmap"); G("billing", "Billing", "Roadmap");
    out.isPartners = false; out.isConnectV = false; out.isBillingV = false;
    out.gConfirmOpen = !!s.gcf; out.gConfirm = s.gcf || {}; out.gConfirmClose = () => set({ gcf: null });
    out.gConfirmGo = () => { const c = s.gcf; set({ gcf: null }); if (c && c.act) c.act(); };
    const confirm = (title, body, cta, act) => set({ gcf: { title, body, cta, act } });

    /* ============ PARTNERS ============ */
    out.isGP = V === "partners";
    const pst = s.ptStatus || "approved";
    out.gpNot = pst === "none"; out.gpPend = pst === "pending"; out.gpAppr = pst === "approved" || pst === "suspended"; out.gpSusp = pst === "suspended";
    out.gpIntro = out.isGP && pst === "none" && !s.ptIntroSeen && out.gOk; out.gpIntroClose = () => set({ ptIntroSeen: true });
    const ap = s.ap || { name: "Acme Commerce Ltd", country: "Kenya", link: "https://acme.co", how: ["Clients"], band: "1 to 5", cur: "KES", tax: "", terms: false };
    out.ap = ap; out.apOpen = !!s.apOpen;
    out.apOpenAct = () => set({ apOpen: true, ptIntroSeen: true }); out.apClose = () => set({ apOpen: false });
    const apSet = o => { this.setState(st => ({ ap: Object.assign({}, st.ap || ap, o), apSaved: "Saving…" })); clearTimeout(this._apT); this._apT = setTimeout(() => set({ apSaved: "Draft saved" }), 600); };
    out.apSaved = s.apSaved || "Draft saved";
    out.apSetF = e => apSet({ [e.target.dataset.k]: e.target.value });
    out.apHow = ["Clients", "Community", "Agency", "Developer", "Other"].map(x => ({ label: x, style: chipSt(ap.how.indexOf(x) >= 0), onClick: () => apSet({ how: ap.how.indexOf(x) >= 0 ? ap.how.filter(y => y !== x) : ap.how.concat([x]) }) }));
    out.apBands = ["1 to 5", "6 to 20", "21 to 50", "Over 50"].map(x => ({ label: x, style: chipSt(ap.band === x), onClick: () => apSet({ band: x }) }));
    out.apTermsToggle = () => apSet({ terms: !ap.terms });
    const apErr = !ap.name ? "Add your name or business name" : !ap.link ? "Add a website or social link" : !ap.how.length ? "Pick at least one way you plan to refer" : !ap.terms ? "Accept the partner terms" : "";
    out.apErr = apErr; out.apErrShow = !!apErr; out.apSubmitStyle = btn1(!!apErr);
    out.apSubmit = () => { if (apErr) return; set({ apOpen: false, ptStatus: "pending", ptIntroSeen: true }); toast("Application submitted. We reply by email."); };
    out.gpPendNote = "Submitted Nov 8, 2026 as " + ap.name + ". We review the application and reply by email. Your referral link activates on approval.";
    const rate = Number(String(s.ptRate || "20").replace(/[^0-9.]/g, "")) || 0;
    out.ptRate = s.ptRate || "20"; out.setPtRate = e => set({ ptRate: e.target.value });
    const refs = E ? [] : GP.concat((s.ptInv || []).map((em, i) => ({ id: "ref_n" + i, name: em, cc: "ke", country: "Kenya", cur: "KES", st: "Invited", on: "Nov 8", start: -1, fees: [0, 0, 0, 0, 0, 0] }))).filter(x => (s.ptRevoked || []).indexOf(x.id) < 0);
    const pcur = s.ptCur || "All";
    const conv = (v, c) => pcur === "All" ? v * GKE[c] : (c === pcur ? v : 0);
    const fm = v => pcur === "All" ? K(v) : xfmt(v, pcur);
    const feeM = GMON.map((m, k) => refs.reduce((t, x) => t + conv(x.fees[k] * mult, x.cur), 0));
    const earnM = feeM.map(v => v * rate / 100);
    const LED = [];
    ["KES", "NGN", "USD"].forEach(c => { for (let k = 0; k < 5; k++) { const f = refs.filter(x => x.cur === c).reduce((t, x) => t + x.fees[k] * mult, 0); if (f) LED.push({ d: k + 1, date: GMON[k + 1] + " 1", desc: "Commission on " + GMON[k] + " fees", ty: "Commission", c, amt: f * rate / 100 }); } });
    if (!E) { LED.push({ d: 4.6, date: "Sep 18", desc: "Clawback · refund at Lekki Freight Brokers", ty: "Clawback", c: "NGN", amt: -6200 * mult }); LED.push({ d: 5.6, date: "Oct 20", desc: "Adjustment · late attribution, Eldoret Agro Exports", ty: "Adjustment", c: "KES", amt: 1800 * mult }); [[3.2, "Aug 5", 12000], [4.2, "Sep 5", 15000], [5.2, "Oct 5", 18000]].forEach(([d, date, a]) => LED.push({ d, date, desc: "Payout to Bank ••••8841", ty: "Payout", c: "KES", amt: -a * mult })); }
    (s.ptPaid || []).forEach(p => LED.push({ d: 7, date: "Nov 8", desc: "Payout to " + (s.ptMethod || "Bank ••••8841"), ty: "Payout", c: p.c, amt: -p.amt }));
    LED.sort((a, b) => a.d - b.d);
    const balc = {}; LED.forEach(e => { balc[e.c] = (balc[e.c] || 0) + e.amt; e.after = balc[e.c]; });
    const paidK = LED.filter(e => e.ty === "Payout").reduce((t, e) => t - e.amt * GKE[e.c], 0);
    const payK = Object.keys(balc).reduce((t, c) => t + balc[c] * GKE[c], 0);
    const pendK = refs.reduce((t, x) => t + x.fees[5] * mult * GKE[x.cur], 0) * rate / 100;
    const minK = 5000;
    const cnt = st => refs.filter(x => x.st === st).length;
    const live = cnt("Live") + cnt("Lapsed"), ver = cnt("Verified") + live, sign = cnt("Signed up") + ver;
    out.gpRateBanner = "Your share of fees: Rate to be confirmed. Figures below use a placeholder rate of " + rate + "% for this prototype.";
    out.gpCurs = ["All", "KES", "NGN", "USD"].map(c => ({ label: c === "All" ? "All, KES equivalent" : c, style: chipSt(pcur === c), onClick: () => set({ ptCur: c }) }));
    out.gpKpis = [["Referred businesses", String(refs.length), cnt("Invited") + " invited, not signed up"], ["Verified", String(ver), "Passed business verification"], ["Live", String(live), "Sent at least one payment"], ["Fees generated", fm(feeM.reduce((a, b) => a + b, 0)), "Jun to Nov"], ["Your earnings", K(payK), "Payable · " + K(pendK) + " pending · " + K(paidK) + " paid"]].map(([label, value, note]) => ({ label, value, note }));
    const fun = [["Invited", refs.length], ["Signed up", sign], ["Verified", ver], ["Live", live]];
    out.gpFunnel = fun.map(([l, n], i) => ({ label: l, n: String(n), drop: i === 0 ? "" : fun[i - 1][1] ? Math.round((1 - n / fun[i - 1][1]) * 100) + "% drop-off" : "", bar: "display: block; height: 100%; border-radius: 6px; background: " + (i === 3 ? "var(--indigo)" : "var(--indigo-soft)") + "; width: " + (refs.length ? Math.max(2, n / refs.length * 100) : 0) + "%" }));
    const pch = s.ptChart || "fees";
    out.gpChartTabs = [["fees", "Fees generated"], ["earn", "Your earnings"]].map(([k, l]) => ({ label: l, style: chipSt(pch === k), onClick: () => set({ ptChart: k }) }));
    const cv = pch === "fees" ? feeM : earnM;
    out.gpChart = BARS(cv, GMON, "var(--indigo-soft)", fm); out.gpChartTotal = fm(cv.reduce((a, b) => a + b, 0)); out.gpChartEmpty = cv.every(v => !v); out.gpChartHas = !out.gpChartEmpty;
    const canPayout = verified && !paused && pst === "approved" && payK >= minK && !E;
    out.gpNext = { amt: K(Math.max(0, payK)), date: "Dec 5, 2026", method: s.ptMethod || "Bank ••••8841", st: paused ? "Paused" : payK < minK ? "Below minimum" : "Scheduled" };
    out.gpNextSt = paused ? pl("bad") : payK < minK ? pl("warn") : pl("ok");
    out.gpReqStyle = btn1(!canPayout); out.gpReqTitle = !verified ? "Verification required" : paused ? "Payouts paused" : payK < minK ? "Below the minimum of " + K(minK) + " (placeholder, editable in Settings)" : "";
    out.gpReq = () => { if (!canPayout) { toast(out.gpReqTitle || "Not available"); return; } set({ ptPaid: (s.ptPaid || []).concat(Object.keys(balc).filter(c => balc[c] > 0).map(c => ({ c, amt: balc[c] }))) }); toast("Payout requested: " + K(payK) + " equivalent to " + (s.ptMethod || "Bank ••••8841")); };
    out.gpMethods = [["Bank ••••8841", "Bank account · KES", "Verified"], ["M-Pesa 0722 ••• 412", "Mobile money · KES", "Verified"], ["USDC · Stellar GBEP…M7QXK", "Stablecoin wallet", "Pending verification"]].map(([n, k, st]) => ({ name: n, kind: k, st, stStyle: st === "Verified" ? pl("ok") : pl("warn"), style: "display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 10px; text-align: left; cursor: pointer; color: var(--ink); border: 1px solid " + ((s.ptMethod || "Bank ••••8841") === n ? INDIGO : "var(--border-strong)") + "; background: " + ((s.ptMethod || "Bank ••••8841") === n ? TINT : "var(--panel)"), onClick: () => { if (st !== "Verified") { toast("Finish wallet verification first"); return; } set({ ptMethod: n }); } }));
    out.gpStmt = () => toast("partner-statement-oct-2026.pdf downloaded");
    const linkOk = pst === "approved";
    const utm = s.ptUtm || "";
    out.gpLink = "https://elementpay.net/r/acme-7k2" + (utm ? "?utm_source=" + encodeURIComponent(utm) : "");
    out.gpUtm = utm; out.setGpUtm = e => set({ ptUtm: e.target.value });
    out.gpCopyStyle = btn2(!linkOk); out.gpCopy = () => { if (!linkOk) { toast(pst === "suspended" ? "Link is off while the account is suspended" : "Link activates on approval"); return; } try { navigator.clipboard.writeText(out.gpLink); } catch (e) {} toast("Referral link copied"); };
    out.gpShare = [["Email", "Subject: Pay suppliers abroad from Kenya\n\nWe use ElementPay to pay suppliers and collect from customers across Africa. Sign up with this link: "], ["WhatsApp", "We pay suppliers abroad and collect regionally with ElementPay. Join with my link: "], ["LinkedIn", "Cross-border payments for African businesses, settled on stablecoin rails. Try ElementPay: "]].map(([l, t]) => ({ label: l, style: btn2(!linkOk) + "; padding: 5px 10px; font-size: 12px", onClick: () => { if (!linkOk) { toast("Link activates on approval"); return; } try { navigator.clipboard.writeText(t + out.gpLink); } catch (e) {} toast(l + " message copied"); } }));
    let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    out.gpQr = Array.from({ length: 289 }, (_, i) => { const x = i % 17, y = Math.floor(i / 17); const fin = (a, b) => x >= a && x < a + 5 && y >= b && y < b + 5 && (x === a || x === a + 4 || y === b || y === b + 4 || (x === a + 2 && y === b + 2)); const inF = (a, b) => x >= a && x < a + 5 && y >= b && y < b + 5; const on = fin(0, 0) || fin(12, 0) || fin(0, 12) || (!inF(0, 0) && !inF(12, 0) && !inF(0, 12) && rnd() > 0.52); return { style: "display: block; aspect-ratio: 1; background: " + (on && linkOk ? "#1f2226" : on ? "#c9ccd1" : "transparent") }; });
    out.gpInviteStyle = btn1(!verified || pst !== "approved"); out.gpInviteTitle = !verified ? "Verification required" : pst !== "approved" ? "Not available while suspended" : "";
    out.gpInvOpen = !!s.ptInvOpen; out.gpInvClose = () => set({ ptInvOpen: false });
    out.gpInviteAct = () => { if (!verified || pst !== "approved") { toast(out.gpInviteTitle); return; } set({ ptInvOpen: true }); };
    out.gpEmails = s.ptEmails || ""; out.setGpEmails = e => set({ ptEmails: e.target.value });
    out.gpNote = s.ptNote != null ? s.ptNote : "We moved our supplier payments to ElementPay this year. Worth a look."; out.setGpNote = e => set({ ptNote: e.target.value });
    const ems = (s.ptEmails || "").split(/[\s,;]+/).filter(x => /.+@.+\..+/.test(x));
    out.gpEmailCount = ems.length ? ems.length + " valid email" + (ems.length === 1 ? "" : "s") : "Add one or more emails, separated by commas or new lines";
    out.gpSendStyle = btn1(!ems.length);
    out.gpSend = () => { if (!ems.length) return; set({ ptInv: (s.ptInv || []).concat(ems), ptInvOpen: false, ptEmails: "" }); toast("Invites sent to " + ems.length + " business" + (ems.length === 1 ? "" : "es")); };
    const gpTB = TB("ptTab", [["overview", "Overview"], ["refs", "Referred businesses"], ["earn", "Earnings and payouts"], ["assets", "Assets"], ["terms", "Terms"]], "overview");
    out.gpTabs = gpTB.tabs; ["overview", "refs", "earn", "assets", "terms"].forEach(t => { out["gpT_" + t] = gpTB.cur === t; });
    const SP = { Invited: "neu", "Signed up": "ind", Verified: "ind", Live: "ok", Lapsed: "warn" };
    const fRef = x => x.start >= 0 ? GMON[x.start] + " 2026" : "None";
    out.gpRefT = T("gpRef", [["name", "Business"], ["country", "Country"], ["st", "Status"], ["on", "Referred"], ["first", "First payment"], ["fees", "Fees generated", "right"], ["earn", "Your earnings", "right"], ["act", ""]], refs.map(x => { const f = x.fees.reduce((a, b) => a + b, 0) * mult; return { status: x.st, search: x.name + " " + x.country, v: { name: x.name, country: x.country, st: x.st, on: x.on, first: x.start, fees: f * GKE[x.cur], earn: f * GKE[x.cur] }, onClick: () => set({ ptSel: x.id }), c: { name: { t: x.name, b: 1 }, country: { t: x.country, f: x.cc, mu: 1 }, st: { t: x.st, p: pl(SP[x.st]) }, on: { t: x.on, mu: 1 }, first: { t: fRef(x), mu: 1 }, fees: { t: f ? xfmt(f, x.cur) : "None", m: 1 }, earn: { t: f ? xfmt(f * rate / 100, x.cur) : "None", m: 1 }, act: x.st === "Invited" ? { btn: "Resend", act: () => toast("Invite resent to " + x.name) } : {} } }; }), { chips: ["Invited", "Signed up", "Verified", "Live", "Lapsed"], noun: "businesses", file: "referred-businesses", emptyTitle: "No referrals yet", emptyNote: "Share your referral link or invite a business by email. Each signup appears here." });
    const sel = refs.find(x => x.id === s.ptSel);
    out.gpDetOpen = !!sel; out.gpDetClose = () => set({ ptSel: null });
    if (sel) {
      const rank = { Invited: 0, "Signed up": 1, Verified: 2, Live: 3, Lapsed: 3 }[sel.st];
      out.gpDet = { name: sel.name, country: sel.country, flag: flagSt(sel.cc), st: sel.st, stStyle: pl(SP[sel.st]), invited: sel.st === "Invited" };
      out.gpDetTimeline = [["Invited", sel.on], ["Signed up", rank >= 1 ? "Within a week" : ""], ["Verified", rank >= 2 ? "Business verification passed" : ""], ["First payment", rank >= 3 ? fRef(sel) : ""]].map(([l, n], i) => ({ label: l, note: i <= rank ? n : "Not yet", dot: "width: 12px; height: 12px; margin-top: 3px; flex-shrink: 0; border-radius: 999px; " + (i <= rank ? "background: var(--indigo)" : "border: 2px solid var(--border-strong)") }));
      out.gpDetBars = BARS(sel.fees.map(v => v * mult), GMON, "var(--indigo-soft)", v => xfmt(v, sel.cur));
      out.gpDetEarn = GMON.map((m, k) => kv(m + " 2026", xfmt(sel.fees[k] * mult * rate / 100, sel.cur), true)).filter((x, k) => sel.fees[k]);
      out.gpDetEarnHas = out.gpDetEarn.length > 0; out.gpDetEarnEmpty = !out.gpDetEarnHas;
      out.gpResend = () => toast("Invite resent to " + sel.name);
      out.gpRevoke = () => confirm("Revoke invite", "The link in the email stops working. You can invite " + sel.name + " again later.", "Revoke invite", () => { set({ ptRevoked: (s.ptRevoked || []).concat([sel.id]), ptSel: null }); toast("Invite revoked"); });
    }
    out.gpLedT = T("gpLed", [["date", "Date"], ["desc", "Description"], ["ty", "Type"], ["c", "Currency"], ["amt", "Amount", "right"], ["after", "Balance after", "right"]], LED.slice().reverse().map(e => ({ status: e.ty, search: e.desc + " " + e.ty, v: { date: e.d, desc: e.desc, ty: e.ty, c: e.c, amt: e.amt * GKE[e.c], after: e.after * GKE[e.c] }, c: { date: { t: e.date, mu: 1 }, desc: { t: e.desc }, ty: { t: e.ty, p: pl(e.ty === "Commission" ? "ok" : e.ty === "Payout" ? "ind" : e.ty === "Clawback" ? "bad" : "neu") }, c: { t: e.c, m: 1 }, amt: { t: (e.amt >= 0 ? "+ " : "− ") + xfmt(Math.abs(e.amt), e.c), m: 1, b: 1 }, after: { t: xfmt(e.after, e.c), m: 1 } } })), { chips: ["Commission", "Adjustment", "Clawback", "Payout"], noun: "entries", file: "partner-ledger", emptyTitle: "No earnings yet", emptyNote: "Commission posts on the 1st of each month for fees your referrals generated the month before." });
    out.gpAssets = [["Message templates", "Email, WhatsApp and LinkedIn text", "Copy"], ["Logo pack", "SVG and PNG, light and dark", "Download"], ["One-page explainer", "PDF for referred businesses", "Download"], ["FAQ for referred businesses", "Fees, verification, corridors", "Download"]].map(([n, d, a]) => ({ name: n, desc: d, cta: a, onClick: () => toast(n + (a === "Copy" ? " copied" : " downloaded")) }));
    out.gpTerms = [kv("Your share", "Rate to be confirmed"), kv("Eligible fees", "Transfer fees and FX spread ElementPay earns on referred accounts"), kv("Attribution window", "90 days from click (placeholder, editable in Settings)"), kv("Refunds and reversals", "Commission on refunded fees is clawed back in the next statement"), kv("Payout schedule", "Monthly on the 5th (placeholder, editable in Settings)"), kv("Minimum payout", K(minK) + " equivalent (placeholder, editable in Settings)"), kv("Contact", "partners@elementpay.net")];

    /* ============ CONNECT ============ */
    out.isGC = V === "connect" && !s.cnSel; out.isGCD = V === "connect" && !!s.cnSel;
    out.cnListShow = !s.cnList; out.cnOnList = !!s.cnList;
    out.cnJoinOpen = !!s.cnJoin; out.cnJoinAct = () => set({ cnJoin: { company: "Acme Commerce Ltd", use: "Own entities", n: "1 to 10", email: "achieng@acme.co" } }); out.cnJoinClose = () => set({ cnJoin: null });
    out.cnJ = s.cnJoin || {}; out.cnJSet = e => set({ cnJoin: Object.assign({}, s.cnJoin, { [e.target.dataset.k]: e.target.value }) });
    out.cnJoinGo = () => { set({ cnJoin: null, cnList: true }); toast("You are on the design partner list for Connect"); };
    out.bJoinOpen = !!s.bJoin; out.bJoinAct = () => set({ bJoin: { company: "Acme Commerce Ltd", use: "Monthly retainers", n: "11 to 50", email: "achieng@acme.co" } }); out.bJoinClose = () => set({ bJoin: null });
    out.bJ = s.bJoin || {}; out.bJSet = e => set({ bJoin: Object.assign({}, s.bJoin, { [e.target.dataset.k]: e.target.value }) });
    out.bJoinGo = () => { set({ bJoin: null, bList: true }); toast("You are on the design partner list for Billing"); };
    out.bListShow = !s.bList; out.bOnList = !!s.bList;
    const defPct = Number(String(s.cnDefPct || "2").replace(/[^0-9.]/g, "")) || 0;
    const fees = s.cnFee || {};
    const accs = E ? [] : CN.concat(s.cnNew || []).filter(a => (s.cnRm || []).indexOf(a.id) < 0).map(a => Object.assign({}, a, { st: (s.cnSt || {})[a.id] || a.st, pct: fees[a.id] != null ? Number(fees[a.id]) || 0 : defPct }));
    const pays = E ? [] : CNPAY.map(p => { const a = accs.find(x => x.id === CN[p.acc].id); if (!a) return null; const g = p.gross * mult; const plat = Math.round(g * a.pct / 100); const epf = Math.round(g * 0.01 + 30); const ok = p.st === "Settled"; return Object.assign({}, p, { a, g, plat, epf, fx: p.fx * mult, net: ok ? g - p.fx * mult - plat - epf : 0 }); }).filter(Boolean);
    const ccur = s.cnCur || "All";
    const cf = v => ccur === "USD" ? xfmt(v / 129.2, "USD") : K(v);
    out.cnCurs = ["All", "USD"].map(c => ({ label: c === "All" ? "KES" : "USD", style: chipSt(ccur === c), onClick: () => set({ cnCur: c }) }));
    const vol = pays.filter(p => p.st === "Settled").reduce((t, p) => t + p.g, 0);
    const platF = pays.filter(p => p.st === "Settled").reduce((t, p) => t + p.plat, 0);
    const await_ = accs.filter(a => ["Invited", "Information needed", "In review"].indexOf(a.st) >= 0).length;
    out.cnKpis = [["Connected accounts", String(accs.length), accs.filter(a => a.st === "Active").length + " active"], ["Volume routed · 30 days", cf(vol), pays.length + " payments"], ["Platform fees earned", cf(platF), "Default " + defPct + "%"], ["Awaiting onboarding", String(await_), "Invited, information needed or in review"]].map(([label, value, note]) => ({ label, value, note }));
    const ctype = s.cnType || "All";
    out.cnUse = [["Own entity", "Your own entities", "Subsidiaries, branches and regional teams. Each gets its own balances and payouts."], ["Partner", "Your platform", "Sellers, agents and partners who each get an account. You take a platform fee."]].map(([k, l, d]) => ({ label: l, desc: d, style: "display: flex; flex-direction: column; gap: 4px; align-items: flex-start; padding: 14px 16px; border-radius: 12px; text-align: left; cursor: pointer; color: var(--ink); border: 1px solid " + (ctype === k ? INDIGO : "var(--border)") + "; background: " + (ctype === k ? TINT : "var(--panel)"), onClick: () => set({ cnType: ctype === k ? "All" : k }) }));
    const CS = { Invited: "neu", "Information needed": "warn", "In review": "ind", Active: "ok", Restricted: "bad" };
    const vOf = a => pays.filter(p => p.a.id === a.id && p.st === "Settled");
    const openAcc = (id, tab) => () => set({ cnSel: id, cnTab: tab || "overview", cnViewAs: false });
    out.cnAccT = T("cnAcc", [["name", "Name"], ["type", "Type"], ["st", "Onboarding"], ["caps", "Capabilities"], ["curs", "Currencies"], ["vol", "Volume 30 days", "right"], ["fee", "Fees earned", "right"], ["created", "Created"]], accs.filter(a => ctype === "All" || a.type === ctype).map(a => { const vv = vOf(a); const vs = vv.reduce((t, p) => t + p.g, 0), fs = vv.reduce((t, p) => t + p.plat, 0); return { status: a.st, search: a.name + " " + a.country + " " + a.type, v: { name: a.name, type: a.type, st: a.st, caps: a.caps, curs: a.curs, vol: vs, fee: fs, created: a.created }, onClick: openAcc(a.id), c: { name: { t: a.name, b: 1, f: a.cc }, type: { t: a.type, mu: 1 }, st: { t: a.st, p: pl(CS[a.st]) }, caps: { t: a.caps, mu: 1 }, curs: { t: a.curs, m: 1 }, vol: { t: vs ? cf(vs) : "None", m: 1 }, fee: { t: fs ? cf(fs) : "None", m: 1 }, created: { t: a.created, mu: 1 } } }; }), { chips: ["Invited", "Information needed", "In review", "Active", "Restricted"], noun: "accounts", file: "connected-accounts", emptyTitle: "No connected accounts", emptyNote: "Create one for a branch or subsidiary, or invite a partner to onboard." });
    const retried = s.cnRetried || {};
    const att = [];
    accs.filter(a => a.st === "Information needed").forEach(a => att.push(["Onboarding stuck", a.name + " · director ID rejected: image unreadable", "Open", openAcc(a.id, "onboarding")]));
    accs.filter(a => a.st === "In review").forEach(a => att.push(["In review", a.name + " · documents submitted Nov 3", "Open", openAcc(a.id, "onboarding")]));
    CNOUT.forEach(([ai, date, amt, st], i) => { const a = accs.find(x => x.id === CN[ai].id); if (a && st === "Failed" && !retried[i]) att.push(["Payout failed", a.name + " · " + K(amt * mult) + " on " + date, "Retry", openAcc(a.id, "payouts")]); });
    accs.filter(a => a.st === "Restricted").forEach(a => att.push(["Restricted", a.name + " · payouts held pending review", "Open", openAcc(a.id, "settings")]));
    out.cnAtt = att.map(([k, t, c, act]) => ({ kind: k, text: t, cta: c, onClick: act, dot: "width: 8px; height: 8px; margin-top: 6px; flex-shrink: 0; border-radius: 999px; background: " + (k === "Payout failed" || k === "Restricted" ? "var(--bad-text)" : k === "In review" ? "var(--indigo)" : "var(--warn-text)") }));
    out.cnAttHas = att.length > 0; out.cnAttEmpty = !out.cnAttHas;
    out.cnHowOpen = !!s.cnHow; out.cnHowAct = () => set({ cnHow: true }); out.cnHowClose = () => set({ cnHow: false });
    out.cnHowRows = [kv("Customer pays", K(100000), true, true), kv("Platform fee · 2%", "− " + K(2000), true), kv("ElementPay fee · 1% + KES 30 (illustrative)", "− " + K(1030), true), kv("Net to connected account", K(96970), true, true)];
    const cTB = TB("cnPage", [["overview", "Overview"], ["routing", "Routing and fees"], ["dev", "Developer"]], "overview");
    out.cnPageTabs = cTB.tabs; out.cnP_overview = cTB.cur === "overview"; out.cnP_routing = cTB.cur === "routing"; out.cnP_dev = cTB.cur === "dev";
    out.cnCreateStyle = btn1(!verified); out.cnCreateTitle = gateT;
    const W = s.cnWiz;
    out.cnWizOpen = !!W;
    out.cnCreate = () => { if (!verified) { toast("Verification required"); return; } set({ cnWiz: { step: 1, type: "Own entity", name: "", country: "Kenya", reg: "", contact: "", email: "", web: "", method: "Invite by email", caps: ["Collect"], curs: ["KES"], dest: "Bank account", pct: String(defPct), fixed: "0", min: "0", max: "", payer: "Connected account" } }); };
    out.cnWizClose = () => set({ cnWiz: null });
    if (W) {
      const ws = o => set({ cnWiz: Object.assign({}, W, o) });
      out.cw = W; out.cwSet = e => ws({ [e.target.dataset.k]: e.target.value });
      const names = ["Type", "Business details", "Onboarding", "Capabilities", "Payout destination", "Platform fee", "Review"];
      out.cwSteps = names.map((n, i) => ({ style: "flex: 1; height: 4px; border-radius: 999px; background: " + (i < W.step ? "var(--indigo)" : "var(--surface)") }));
      out.cwLabel = "Step " + W.step + " of 7 · " + names[W.step - 1];
      for (let i = 1; i <= 7; i++) out["cw" + i] = W.step === i;
      out.cwTypes = [["Own entity", "A subsidiary, branch or regional team you control"], ["Partner", "A seller, agent or partner on your platform"]].map(([k, d]) => ({ label: k, desc: d, style: "display: flex; flex-direction: column; gap: 4px; align-items: flex-start; width: 100%; padding: 13px 14px; border-radius: 10px; text-align: left; cursor: pointer; color: var(--ink); border: 1px solid " + (W.type === k ? INDIGO : "var(--border-strong)") + "; background: " + (W.type === k ? TINT : "var(--panel)"), onClick: () => ws({ type: k, method: k === "Partner" && W.method === "Fill in on their behalf" ? "Invite by email" : W.method }) }));
      out.cwMethods = ["Invite by email", "Hosted onboarding link", "Fill in on their behalf"].map(m => { const dis = m === "Fill in on their behalf" && W.type !== "Own entity"; return { label: m + (dis ? " · own entities only" : ""), style: chipSt(W.method === m) + (dis ? "; opacity: 0.45; cursor: not-allowed" : ""), onClick: () => { if (!dis) ws({ method: m }); } }; });
      out.cwLinkShow = W.method !== "Fill in on their behalf";
      out.cwCaps = ["Collect", "Pay out"].map(c => ({ label: c, style: chipSt(W.caps.indexOf(c) >= 0), onClick: () => ws({ caps: W.caps.indexOf(c) >= 0 ? W.caps.filter(x => x !== c) : W.caps.concat([c]) }) }));
      out.cwCurs = [["KES", "ke", "Live"], ["UGX", "ug", "Pilot"], ["TZS", "tz", "Pilot"], ["NGN", "ng", "Pilot"], ["USD", "us", "Roadmap"]].map(([c, cc, tag]) => ({ label: c + " · " + tag, flag: flagSt(cc), style: chipSt(W.curs.indexOf(c) >= 0), onClick: () => ws({ curs: W.curs.indexOf(c) >= 0 ? W.curs.filter(x => x !== c) : W.curs.concat([c]) }) }));
      out.cwDests = ["Bank account", "Mobile money", "Stablecoin wallet"].map(d => ({ label: d, style: chipSt(W.dest === d), onClick: () => ws({ dest: d }) }));
      out.cwPayers = ["Payer", "Platform", "Connected account"].map(d => ({ label: d, style: chipSt(W.payer === d), onClick: () => ws({ payer: d }) }));
      const g = 100000, pp = Number(W.pct) || 0, fx = Number(W.fixed) || 0;
      let pf = g * pp / 100 + fx; if (Number(W.min)) pf = Math.max(pf, Number(W.min)); if (Number(W.max)) pf = Math.min(pf, Number(W.max));
      const ep = g * 0.01 + 30;
      out.cwSplit = [kv("Sample payment", K(W.payer === "Payer" ? g + pf : g), true, true), kv("Platform fee to you", K(pf), true), kv("ElementPay fee (illustrative)", "− " + K(ep), true), kv("Net to connected account", K(W.payer === "Connected account" ? g - pf - ep : W.payer === "Platform" ? g - ep : g - ep), true, true)];
      out.cwReview = [kv("Type", W.type), kv("Legal name", W.name || "Not set"), kv("Country", W.country), kv("Registration number", W.reg || "Not set", true), kv("Contact", (W.contact || "Not set") + (W.email ? " · " + W.email : "")), kv("Onboarding", W.method), kv("Capabilities", W.caps.join(", ") || "None"), kv("Currencies", W.curs.join(", ")), kv("Payout destination", W.dest), kv("Platform fee", W.pct + "% + " + K(Number(W.fixed) || 0) + " · paid by " + W.payer)];
      const ok = W.step === 2 ? !!(W.name && W.email) : W.step === 4 ? W.caps.length > 0 && W.curs.length > 0 : true;
      out.cwErr = W.step === 2 && !ok ? "Add the legal name and a contact email" : W.step === 4 && !ok ? "Pick at least one capability and currency" : ""; out.cwErrShow = !!out.cwErr;
      out.cwBackShow = W.step > 1; out.cwBack = () => ws({ step: W.step - 1 });
      out.cwNextLabel = W.step === 7 ? "Create connected account" : "Continue"; out.cwNextStyle = btn1(!ok) + "; flex: 1 1 200px";
      out.cwNext = () => { if (!ok) return; if (W.step < 7) { ws({ step: W.step + 1 }); return; } const id = "acct_" + (210 + (s.cnNew || []).length); const ccMap = { Kenya: "ke", Uganda: "ug", Tanzania: "tz", Nigeria: "ng", Rwanda: "rw" }; set({ cnWiz: null, cnNew: (s.cnNew || []).concat([{ id, name: W.name, type: W.type, cc: ccMap[W.country] || "ke", country: W.country, st: W.method === "Fill in on their behalf" ? "In review" : "Invited", caps: W.caps.join(", "), curs: W.curs.join(", "), created: "Nov 2026" }]), cnFee: Object.assign({}, s.cnFee, { [id]: W.pct }) }); toast(W.name + " created. " + (W.method === "Invite by email" ? "Invite sent to " + W.email + "." : W.method === "Hosted onboarding link" ? "Onboarding link copied." : "Submitted for review.")); };
    }
    const A = accs.find(a => a.id === s.cnSel);
    if (s.cnSel && !A && V === "connect") out.isGCD = false, out.isGC = true;
    if (A) {
      const dTB = TB("cnTab", [["overview", "Overview"], ["payments", "Payments"], ["balances", "Balances"], ["payouts", "Payouts"], ["onboarding", "Onboarding"], ["settings", "Settings"]], "overview");
      out.cdTabs = dTB.tabs; ["overview", "payments", "balances", "payouts", "onboarding", "settings"].forEach(t => { out["cd_" + t] = dTB.cur === t; });
      out.cd = { name: A.name, flag: flagSt(A.cc), type: A.type, st: A.st, stStyle: pl(CS[A.st]), caps: A.caps, curs: A.curs, country: A.country };
      out.cdBack = () => set({ cnSel: null });
      out.cdViewAs = !!s.cnViewAs; out.cdViewAsToggle = () => set({ cnViewAs: !s.cnViewAs });
      const ap2 = pays.filter(p => p.a.id === A.id);
      const vs = ap2.filter(p => p.st === "Settled");
      const outs = CNOUT.map((x, i) => ({ i, ai: x[0], date: x[1], amt: x[2] * mult, st: retried[i] ? "Paid" : x[3] })).filter(x => CN[x.ai].id === A.id);
      const netIn = vs.reduce((t, p) => t + p.net, 0), paidOut = outs.filter(x => x.st === "Paid").reduce((t, x) => t + x.amt, 0);
      out.cdKpis = [["Volume 30 days", K(vs.reduce((t, p) => t + p.g, 0))], ["Platform fees", K(vs.reduce((t, p) => t + p.plat, 0))], ["Net to account", K(netIn)], ["Platform fee", A.pct + "%"]].map(([label, value]) => ({ label, value, note: "" }));
      out.cdRecent = ap2.slice(0, 4).map(p => ({ text: p.id + " · " + K(p.g), note: p.date + " · " + p.st }));
      out.cdRecentHas = out.cdRecent.length > 0; out.cdRecentEmpty = !out.cdRecentHas;
      out.cdPayT = T("cdPay", [["id", "Payment"], ["date", "Date"], ["g", "Gross", "right"], ["fx", "FX", "right"], ["plat", "Platform fee", "right"], ["epf", "ElementPay fee", "right"], ["net", "Net to account", "right"], ["st", "Status"]], ap2.map(p => ({ status: p.st, search: p.id, v: { id: p.id, date: p.day, g: p.g, fx: p.fx, plat: p.plat, epf: p.epf, net: p.net, st: p.st }, c: { id: { t: p.id, m: 1 }, date: { t: p.date, mu: 1 }, g: { t: K(p.g), m: 1 }, fx: { t: p.fx ? "− " + K(p.fx) : "None", m: 1, mu: 1 }, plat: { t: "− " + K(p.plat), m: 1 }, epf: { t: "− " + K(p.epf), m: 1 }, net: { t: K(p.net), m: 1, b: 1 }, st: { t: p.st, p: pl(p.st === "Settled" ? "ok" : p.st === "Failed" ? "bad" : "neu") } } })), { chips: ["Settled", "Failed", "Refunded"], noun: "payments", file: "routed-payments", emptyTitle: "No routed payments", emptyNote: "Payments routed to this account by link, reference or customer appear here with the split." });
      const bl = []; let run = 0; vs.slice().reverse().forEach(p => { run += p.net; bl.push({ d: p.date, t: "Routed " + p.id, a: p.net, after: run }); }); outs.filter(x => x.st === "Paid").forEach(x => { run -= x.amt; bl.push({ d: x.date, t: "Payout", a: -x.amt, after: run }); });
      out.cdBal = [{ cur: "KES", avail: K(Math.max(0, netIn - paidOut)), note: "Available" }].concat(A.curs.indexOf("USD") >= 0 ? [{ cur: "USD", avail: xfmt(0, "USD"), note: "Roadmap" }] : []);
      out.cdLed = bl.slice(-8).reverse().map(x => ({ d: x.d, t: x.t, a: (x.a >= 0 ? "+ " : "− ") + K(Math.abs(x.a)), after: K(x.after) }));
      out.cdLedHas = out.cdLed.length > 0; out.cdLedEmpty = !out.cdLedHas;
      const pausedA = !!(s.cnPaused || {})[A.id];
      out.cdSched = pausedA ? "Paused by you" : A.st === "Restricted" ? "Held while restricted" : paused ? "Paused on your account" : "Daily at 16:00 EAT (placeholder, editable)";
      out.cdOuts = outs.map(x => ({ date: x.date, amt: K(x.amt), st: x.st, stStyle: pl(x.st === "Paid" ? "ok" : "bad"), canRetry: x.st === "Failed", retryStyle: btn2(paused) + "; padding: 5px 10px; font-size: 12px", retry: () => { if (paused) { toast("Payouts paused"); return; } set({ cnRetried: Object.assign({}, retried, { [x.i]: true }) }); toast("Payout retried · " + K(x.amt)); } }));
      out.cdOutsHas = out.cdOuts.length > 0; out.cdOutsEmpty = !out.cdOutsHas;
      const docSt = (s.cnDocs || {})[A.id] || {};
      const base = A.st === "Active" || A.st === "Restricted" ? "Accepted" : A.st === "In review" ? "In review" : A.st === "Information needed" ? "Uploaded" : "Missing";
      out.cdDocs = [["Certificate of incorporation"], ["Director ID"], ["Proof of address"], ["Bank or wallet letter"], ["Tax PIN"]].map(([n], i) => { let st = docSt[n] || (A.st === "Information needed" && i === 1 ? "Rejected" : base); return { name: n, st, stStyle: pl(st === "Accepted" ? "ok" : st === "Rejected" ? "bad" : st === "Missing" ? "neu" : st === "In review" ? "warn" : "ind"), reason: st === "Rejected" ? "Image unreadable. Upload a clearer photo of both sides." : "", hasReason: st === "Rejected", canUp: st === "Missing" || st === "Rejected", up: () => { set({ cnDocs: Object.assign({}, s.cnDocs, { [A.id]: Object.assign({}, docSt, { [n]: "Uploaded" }) }) }); toast(n + " uploaded"); } }; });
      out.cdFee = fees[A.id] != null ? String(fees[A.id]) : String(defPct);
      out.setCdFee = e => set({ cnFee: Object.assign({}, s.cnFee, { [A.id]: e.target.value }) });
      out.cdFeePreview = "On " + K(100000) + ": platform fee " + K(100000 * (Number(out.cdFee) || 0) / 100) + ", net to account " + K(100000 - 100000 * (Number(out.cdFee) || 0) / 100 - 1030) + ".";
      out.cdPauseLabel = pausedA ? "Resume payouts" : "Pause payouts";
      out.cdPause = () => { set({ cnPaused: Object.assign({}, s.cnPaused, { [A.id]: !pausedA }) }); toast(pausedA ? "Payouts resumed" : "Payouts paused for " + A.name); };
      out.cdRestrictLabel = A.st === "Restricted" ? "Lift restriction" : "Restrict account";
      out.cdRestrict = () => A.st === "Restricted" ? (set({ cnSt: Object.assign({}, s.cnSt, { [A.id]: "Active" }) }), toast("Restriction lifted")) : confirm("Restrict " + A.name, "Collections stop and payouts are held until you lift the restriction.", "Restrict account", () => { set({ cnSt: Object.assign({}, s.cnSt, { [A.id]: "Restricted" }) }); toast(A.name + " restricted"); });
      out.cdRemove = () => confirm("Remove " + A.name, "The account disconnects from your platform. Its payment history stays in your reports.", "Remove account", () => { set({ cnRm: (s.cnRm || []).concat([A.id]), cnSel: null }); toast(A.name + " removed"); });
    }
    out.cnDefPct = s.cnDefPct || "2"; out.setCnDefPct = e => set({ cnDefPct: e.target.value });
    const ov = s.cnOv || {};
    out.cnOvRows = [["KES → KES", "2"], ["KES → UGX", "2.5"], ["KES → TZS", "2.5"], ["USDC → KES", "1.5"]].map(([c, d]) => ({ c, val: ov[c] != null ? ov[c] : d, tag: c === "USDC → KES" || c === "KES → KES" ? "Live" : "Pilot", tagStyle: c === "USDC → KES" || c === "KES → KES" ? pl("ok") : pl("neu"), set: e => set({ cnOv: Object.assign({}, ov, { [c]: e.target.value }) }) }));
    out.cnCalcAmt = s.cnCalcAmt || "100000"; out.setCnCalcAmt = e => set({ cnCalcAmt: e.target.value });
    out.cnCalcCor = s.cnCalcCor || "KES → KES"; out.setCnCalcCor = e => set({ cnCalcCor: e.target.value });
    { const g = Number(String(out.cnCalcAmt).replace(/[^0-9.]/g, "")) || 0; const row = out.cnOvRows.find(x => x.c === out.cnCalcCor); const pp = Number(row ? row.val : defPct) || 0; const fx = out.cnCalcCor === "KES → KES" ? 0 : g * 0.006; const pf = g * pp / 100; const ep = g * 0.01 + 30; out.cnCalc = [kv("Gross", K(g), true, true), kv("FX spread", fx ? "− " + K(fx) : "None", true), kv("Platform fee · " + pp + "%", "− " + K(pf), true), kv("ElementPay fee (illustrative)", "− " + K(ep), true), kv("Net to connected account", K(g - fx - pf - ep), true, true)]; }
    out.cnRules = [["Payment link", "Links created for a connected account route to it"], ["Reference prefix", "References starting KIB- route to Kibera Agent Network"], ["Customer", "Customers assigned to a branch route to that branch"]].map(([a, b]) => ({ k: a, v: b }));
    out.cnDevOpen = !!s.cnDevOpen; out.cnDevToggle = () => set({ cnDevOpen: !s.cnDevOpen });
    out.cnSnips = [["Create connected account", "POST /v1/connected_accounts\n{ \"type\": \"partner\", \"country\": \"KE\", \"email\": \"ops@kibera.co\" }"], ["Create routed payment", "POST /v1/payments\n{ \"amount\": 100000, \"currency\": \"KES\",\n  \"route_to\": \"acct_205\", \"platform_fee_pct\": 2 }"], ["Get balances", "GET /v1/connected_accounts/acct_205/balances"]].map(([t, c]) => ({ title: t, code: c }));

    /* ============ BILLING ============ */
    out.isGB = V === "billing" && !s.bsSel; out.isGBD = V === "billing" && !!s.bsSel;
    const plans = E ? [] : BPL.concat(s.bpNew || []).map(p => Object.assign({}, p, { arch: (s.bpArch || []).indexOf(p.id) >= 0 }));
    const pById = id => plans.find(p => p.id === id) || BPL[0];
    const mrrOf = p => (p.iv === "Monthly" ? p.price : p.iv === "Quarterly" ? p.price / 3 : p.iv === "Weekly" ? p.price * 4.33 : p.price / 12) * mult;
    const subs = E ? [] : BSUB.concat(s.bsNew || []).map(x => Object.assign({}, x, { st: (s.bsOv || {})[x.id] || x.st, pl: (s.bsPlan || {})[x.id] || x.pl, cancelEnd: !!(s.bsEnd || {})[x.id] }));
    const bcur = s.bCur || "All";
    const bconv = (v, c) => bcur === "All" ? v * GKE[c] : (c === bcur ? v : 0);
    const bf = v => bcur === "All" ? K(v) : xfmt(v, bcur);
    const counted = x => x.st === "Active" || x.st === "Past due";
    const mrrNow = subs.filter(counted).reduce((t, x) => { const p = pById(x.pl); return t + bconv(mrrOf(p), p.cur); }, 0);
    const mrrMonth = k => subs.filter(x => x.start <= k && (x.st === "Active" || x.st === "Past due" || ((x.st === "Canceled" || x.st === "Unpaid") && k < 5) || (x.st === "Paused" && k < 4))).reduce((t, x) => { const p = pById(x.pl); return t + bconv(mrrOf(p), p.cur); }, 0);
    const mm = GMON.map((m, k) => mrrMonth(k));
    const newM = GMON.map((m, k) => subs.filter(x => x.start === k && x.st !== "Trialing").reduce((t, x) => { const p = pById(x.pl); return t + bconv(mrrOf(p), p.cur); }, 0));
    const failedAtt = subs.filter(x => x.st === "Past due").length * 2 + subs.filter(x => x.st === "Unpaid").length * 3;
    const scount = st => subs.filter(x => x.st === st).length;
    const needs = scount("Past due") + scount("Unpaid") + scount("Trialing");
    out.bCurs = ["All", "KES", "USD", "NGN"].map(c => ({ label: c === "All" ? "All, KES equivalent" : c, style: chipSt(bcur === c), onClick: () => set({ bCur: c }) }));
    out.bKpis = [["Active subscriptions", String(scount("Active")), scount("Past due") + " past due"], ["Trialing", String(scount("Trialing")), "Converts at trial end"], ["Needs attention", String(needs), "Failed, unpaid or trial ending"], ["Estimated MRR", bf(mrrNow), "Active and past due"], ["Failed collections · 30 days", String(failedAtt), "Payment attempts"], ["Churn · 30 days", subs.length ? (scount("Canceled") / Math.max(1, subs.length) * 100).toFixed(1) + "%" : "0%", scount("Canceled") + " canceled"]].map(([label, value, note]) => ({ label, value, note }));
    out.bMrr = BARS(mm, GMON, "var(--indigo-soft)", bf); out.bMrrTotal = bf(mm[5]); out.bMrrHas = mm.some(v => v > 0); out.bMrrEmpty = !out.bMrrHas;
    out.bMrrLegend = GMON.map((m, k) => ({ m, n: newM[k] ? "+" + bf(newM[k]).replace("KES ", "") : "0" }));
    const sts = ["Active", "Trialing", "Past due", "Unpaid", "Paused", "Canceled"];
    const SB = { Active: "ok", Trialing: "ind", "Past due": "warn", Unpaid: "bad", Paused: "neu", Canceled: "neu" };
    out.bStatus = sts.map(st => ({ label: st, n: String(scount(st)), pill: pl(SB[st]), bar: "display: block; height: 100%; border-radius: 999px; background: " + PP[SB[st]][1] + "; width: " + (subs.length ? scount(st) / subs.length * 100 : 0) + "%" }));
    const openSub = id => () => set({ bsSel: id, bsChg: null });
    const bAtt = [];
    subs.filter(x => x.st === "Past due").forEach(x => bAtt.push(["Failed charge", x.cust + " · " + pById(x.pl).name, "Retry", () => { set({ bsOv: Object.assign({}, s.bsOv, { [x.id]: "Active" }) }); toast("Retry succeeded for " + x.cust); }]));
    subs.filter(x => x.st === "Unpaid").forEach(x => bAtt.push(["Unpaid after 3 attempts", x.cust, "Send reminder", () => toast("Reminder sent to " + x.cust)]));
    subs.filter(x => x.st === "Trialing").slice(0, 2).forEach(x => bAtt.push(["Trial ending Nov 12", x.cust, "Contact payer", () => toast("Email draft opened for " + x.cust)]));
    if (subs.length) { bAtt.push(["Payer approval pending", subs[0].cust + " · mobile money prompt sent Nov 7", "Send reminder", () => toast("Prompt resent to " + subs[0].cust)]); bAtt.push(["Card expiring", subs[1].cust + " · card ends 11/26", "Contact payer", () => toast("Update link sent to " + subs[1].cust)]); bAtt.push(["Rate change", "Export desk is priced in USD and charged in KES. Rate moved 0.8% this month", "Review", () => set({ bTab: "plans" })]); }
    out.bAtt = bAtt.map(([k, t, c, act]) => ({ kind: k, text: t, cta: c, onClick: act }));
    out.bAttHas = bAtt.length > 0; out.bAttEmpty = !out.bAttHas;
    const RT = { "Mobile money prompt": "Pilot", "Card on file": "Roadmap", "Hosted link": "Pilot", "Bank direct debit": "Roadmap" };
    out.bUpT = T("bUp", [["day", "Date"], ["cust", "Customer"], ["plan", "Plan"], ["amt", "Amount", "right"], ["rail", "Method"]], subs.filter(x => x.st === "Active" && x.nextDay <= 22).map(x => { const p = pById(x.pl); return { status: x.st, search: x.cust, v: { day: x.nextDay, cust: x.cust, plan: p.name, amt: p.price * GKE[p.cur], rail: x.rail }, onClick: openSub(x.id), c: { day: { t: "Nov " + x.nextDay, mu: 1 }, cust: { t: x.cust, b: 1 }, plan: { t: p.name, mu: 1 }, amt: { t: xfmt(p.price * mult, p.cur), m: 1 }, rail: { t: x.rail + " · " + RT[x.rail], mu: 1 } } }; }), { noun: "charges", file: "upcoming-charges", emptyTitle: "No charges in the next 14 days", emptyNote: "Charges for active subscriptions show here two weeks ahead." });
    const bTB = TB("bTab", [["overview", "Overview"], ["plans", "Plans"], ["subs", "Subscriptions"], ["invoices", "Invoices"], ["settings", "Settings"]], "overview");
    out.bTabs = bTB.tabs; ["overview", "plans", "subs", "invoices", "settings"].forEach(t => { out["bT_" + t] = bTB.cur === t; });
    out.bPlanT = T("bPlan", [["name", "Plan"], ["price", "Price", "right"], ["iv", "Interval"], ["trial", "Trial"], ["st", "Status"], ["subs", "Subscribers", "right"], ["mrr", "MRR", "right"]], plans.map(p => { const n = subs.filter(x => x.pl === p.id && counted(x)).length; return { status: p.arch ? "Archived" : "Active", search: p.name, v: { name: p.name, price: p.price * GKE[p.cur], iv: p.iv, trial: p.trial, st: p.arch ? 1 : 0, subs: n, mrr: n * mrrOf(p) * GKE[p.cur] }, onClick: () => set({ bpSel: p.id }), c: { name: { t: p.name, b: 1 }, price: { t: xfmt(p.price * mult, p.cur), m: 1 }, iv: { t: p.iv, mu: 1 }, trial: { t: p.trial ? p.trial + " days" : "None", mu: 1 }, st: { t: p.arch ? "Archived" : "Active", p: pl(p.arch ? "neu" : "ok") }, subs: { t: n, m: 1 }, mrr: { t: xfmt(n * mrrOf(p), p.cur), m: 1 } } }; }), { chips: ["Active", "Archived"], noun: "plans", file: "plans", emptyTitle: "No plans yet", emptyNote: "Create a plan with a price, interval and trial. Subscriptions use plans." });
    out.bSubT = T("bSub", [["cust", "Customer"], ["plan", "Plan"], ["amt", "Amount", "right"], ["iv", "Interval"], ["st", "Status"], ["next", "Next charge"], ["rail", "Payment method"], ["mrr", "MRR", "right"]], subs.map(x => { const p = pById(x.pl); return { status: x.st, search: x.cust + " " + p.name, v: { cust: x.cust, plan: p.name, amt: p.price * GKE[p.cur], iv: p.iv, st: x.st, next: counted(x) || x.st === "Trialing" ? x.nextDay : 99, rail: x.rail, mrr: counted(x) ? mrrOf(p) * GKE[p.cur] : 0 }, onClick: openSub(x.id), c: { cust: { t: x.cust, b: 1 }, plan: { t: p.name, mu: 1 }, amt: { t: xfmt(p.price * mult, p.cur), m: 1 }, iv: { t: p.iv, mu: 1 }, st: { t: x.st + (x.cancelEnd ? " · ends" : ""), p: pl(SB[x.st]) }, next: { t: x.st === "Past due" || x.st === "Unpaid" ? "Retry pending" : counted(x) || x.st === "Trialing" ? "Nov " + x.nextDay : "None", mu: 1 }, rail: { t: x.rail + " · " + RT[x.rail], mu: 1 }, mrr: { t: counted(x) ? xfmt(mrrOf(p), p.cur) : "None", m: 1 } } }; }), { chips: sts, noun: "subscriptions", file: "subscriptions", emptyTitle: "No subscriptions", emptyNote: "Create a subscription for a customer on a plan. They approve the payment method once." });
    const INV = []; let ic = 0;
    subs.forEach(x => { const p = pById(x.pl); for (let k = x.start; k <= 5; k++) { if ((x.st === "Canceled" || x.st === "Unpaid") && k === 5) { INV.push({ x, p, k, st: x.st === "Canceled" ? "Void" : "Past due", att: x.st === "Unpaid" ? 3 : 0 }); continue; } if (x.st === "Trialing") break; if (x.st === "Paused" && k >= 4) break; INV.push({ x, p, k, st: k < 5 ? "Paid" : x.st === "Past due" ? "Past due" : "Open", att: k < 5 ? 1 : x.st === "Past due" ? 2 : 0 }); } });
    if ((s.bsNew || []).length) INV.push({ x: subs[subs.length - 1], p: pById(subs[subs.length - 1].pl), k: 5, st: "Draft", att: 0 });
    const inv = INV.slice(-120).reverse().map(o => Object.assign(o, { id: "inv_" + (9000 + (++ic)) }));
    out.bInvT = T("bInv", [["id", "Invoice"], ["cust", "Customer"], ["amt", "Amount", "right"], ["cur", "Currency"], ["st", "Status"], ["due", "Due date"], ["att", "Attempts", "right"]], inv.map(o => ({ status: o.st, search: o.id + " " + o.x.cust, v: { id: o.id, cust: o.x.cust, amt: o.p.price * GKE[o.p.cur], cur: o.p.cur, st: o.st, due: o.k, att: o.att }, onClick: () => set({ biSel: o.id }), c: { id: { t: o.id, m: 1 }, cust: { t: o.x.cust, b: 1 }, amt: { t: xfmt(o.p.price * mult, o.p.cur), m: 1 }, cur: { t: o.p.cur, m: 1, mu: 1 }, st: { t: o.st, p: pl(o.st === "Paid" ? "ok" : o.st === "Past due" ? "bad" : o.st === "Open" ? "ind" : "neu") }, due: { t: GMON[o.k] + " " + (o.k === 5 && (o.st === "Past due") ? Math.min(6, Math.max(1, o.x.nextDay - 14)) : o.x.nextDay), mu: 1 }, att: { t: o.att, m: 1 } } })), { chips: ["Draft", "Open", "Paid", "Past due", "Void"], noun: "invoices", file: "subscription-invoices", emptyTitle: "No invoices", emptyNote: "Each billing cycle creates an invoice with a pay-by-link block." });
    const fq = subs.filter(x => x.st === "Past due" || x.st === "Unpaid"); const fsel = s.bFsel || [];
    out.bFail = fq.map(x => ({ cust: x.cust, plan: pById(x.pl).name, why: x.st === "Unpaid" ? "3 failed attempts · insufficient funds" : "Attempt 2 failed · payer did not approve the prompt", st: x.st, stStyle: pl(SB[x.st]), on: fsel.indexOf(x.id) >= 0, toggle: () => set({ bFsel: fsel.indexOf(x.id) >= 0 ? fsel.filter(y => y !== x.id) : fsel.concat([x.id]) }) }));
    out.bFailHas = fq.length > 0; out.bFailEmpty = !out.bFailHas; out.bFailSel = fsel.length + " selected";
    out.bBulkRetry = () => { if (!fsel.length) { toast("Select at least one"); return; } const o = Object.assign({}, s.bsOv); fsel.forEach(id => { o[id] = "Active"; }); set({ bsOv: o, bFsel: [] }); toast(fsel.length + " retried. All succeeded in this demo."); };
    out.bBulkRemind = () => { if (!fsel.length) { toast("Select at least one"); return; } set({ bFsel: [] }); toast("Reminders sent to " + fsel.length + " payers"); };
    const I = inv.find(o => o.id === s.biSel);
    out.biOpen = !!I; out.biClose = () => set({ biSel: null });
    if (I) { const fxLine = I.p.cur !== "KES"; out.bi = { id: I.id, cust: I.x.cust, st: I.st, stStyle: pl(I.st === "Paid" ? "ok" : I.st === "Past due" ? "bad" : "ind") }; out.biLines = [kv(I.p.name + " · " + I.p.iv, xfmt(I.p.price * mult, I.p.cur), true)].concat(fxLine ? [kv("Charged in KES at " + xrate(GKE[I.p.cur]) + " per " + I.p.cur, K(I.p.price * mult * GKE[I.p.cur]), true)] : [], [kv("Total", xfmt(I.p.price * mult, I.p.cur), true, true)]); out.biAtt = Array.from({ length: I.att }, (_, i) => ({ text: "Attempt " + (i + 1) + " · " + GMON[I.k] + " " + (I.k === 5 ? Math.min(7, 1 + i * 3) : Math.min(28, I.x.nextDay + i * 3)), res: I.st === "Paid" ? "Paid" : "Failed · payer did not approve", style: "font-size: 12px; font-weight: 600; color: " + (I.st === "Paid" ? "var(--ok-text)" : "var(--bad-text)") })); out.biAttHas = I.att > 0; out.biLink = "pay.elementpay.net/i/" + I.id; out.biCopy = () => toast("Pay link copied"); }
    const S = subs.find(x => x.id === s.bsSel);
    if (s.bsSel && !S && V === "billing") out.isGBD = false, out.isGB = true;
    if (S) {
      const p = pById(S.pl);
      out.bd = { cust: S.cust, plan: p.name, amt: xfmt(p.price * mult, p.cur) + " / " + p.iv.toLowerCase(), st: S.st + (S.cancelEnd ? " · cancels at period end" : ""), stStyle: pl(SB[S.st]), next: S.st === "Past due" || S.st === "Unpaid" ? "Retry pending" : counted(S) || S.st === "Trialing" ? "Nov " + S.nextDay : "None", rail: S.rail + " · " + RT[S.rail] };
      out.bdBack = () => set({ bsSel: null });
      const tl = [["Created", GMON[S.start] + " 2026"]]; if (p.trial) tl.push(["Trial started", p.trial + " days"]); if (S.st !== "Trialing") tl.push(["First charge", GMON[Math.min(5, S.start + (p.trial ? 1 : 0))] + " · paid"]); if (S.st === "Past due" || S.st === "Unpaid") { tl.push(["Charge failed", "Nov " + Math.max(1, Math.min(6, S.nextDay - 14)) + " · payer did not approve"]); tl.push(["Retry scheduled", "In 3 days (placeholder schedule)"]); } if (S.st === "Paused") tl.push(["Paused", "Oct 2026"]); if (S.st === "Canceled") tl.push(["Canceled", "Oct 2026"]);
      out.bdTimeline = tl.map(([l, n]) => ({ label: l, note: n }));
      out.bdInv = inv.filter(o => o.x.id === S.id).slice(0, 6).map(o => ({ id: o.id, when: GMON[o.k], amt: xfmt(o.p.price * mult, o.p.cur), st: o.st, stStyle: pl(o.st === "Paid" ? "ok" : o.st === "Past due" ? "bad" : "ind"), open: () => set({ biSel: o.id }) }));
      out.bdInvHas = out.bdInv.length > 0; out.bdInvEmpty = !out.bdInvHas;
      out.bdFailed = S.st === "Past due" || S.st === "Unpaid";
      out.bdReminders = "Reminders sent Nov " + Math.min(7, Math.max(1, Math.min(6, S.nextDay - 14)) + 1) + " and Nov " + Math.min(8, Math.max(1, Math.min(6, S.nextDay - 14)) + 2) + ". Retry schedule: day 3, day 5, day 7 (placeholder).";
      out.bdRetry = () => { set({ bsOv: Object.assign({}, s.bsOv, { [S.id]: "Active" }) }); toast("Retry succeeded. " + S.cust + " is active."); };
      out.bdPauseLabel = S.st === "Paused" ? "Resume" : "Pause"; out.bdPauseShow = S.st !== "Canceled";
      out.bdPause = () => { set({ bsOv: Object.assign({}, s.bsOv, { [S.id]: S.st === "Paused" ? "Active" : "Paused" }) }); toast(S.st === "Paused" ? "Subscription resumed" : "Subscription paused"); };
      out.bdEnd = () => { set({ bsEnd: Object.assign({}, s.bsEnd, { [S.id]: true }) }); toast("Cancels at the end of the current period"); };
      out.bdNow = () => confirm("Cancel now", S.cust + " loses access today. No refund for the current period in this demo.", "Cancel subscription", () => { set({ bsOv: Object.assign({}, s.bsOv, { [S.id]: "Canceled" }) }); toast("Subscription canceled"); });
      out.bdChg = () => set({ bsChg: { plan: S.pl } }); out.bdChgOpen = !!s.bsChg; out.bdChgClose = () => set({ bsChg: null });
      if (s.bsChg) { const np = pById(s.bsChg.plan); const daysLeft = Math.max(1, S.nextDay - 8); const cyc = 30; const credit = p.price * (daysLeft / cyc) * GKE[p.cur]; const charge = np.price * (daysLeft / cyc) * GKE[np.cur]; out.bdChgPlans = plans.filter(x => !x.arch).map(x => ({ label: x.name + " · " + xfmt(x.price, x.cur), style: chipSt(s.bsChg.plan === x.id), onClick: () => set({ bsChg: { plan: x.id } }) })); out.bdPror = [kv("Days left in cycle", daysLeft + " of " + cyc), kv("Credit for unused " + p.name, "− " + K(credit), true), kv("Charge for " + np.name, K(charge), true), kv("Due today", K(Math.max(0, charge - credit)), true, true), kv("Next full charge", "Nov " + S.nextDay + " · " + xfmt(np.price, np.cur), true)]; out.bdChgGo = () => { set({ bsPlan: Object.assign({}, s.bsPlan, { [S.id]: np.id }), bsChg: null }); toast("Plan changed to " + np.name); }; }
    }
    const bp = plans.find(x => x.id === s.bpSel);
    out.bpOpen = !!bp; out.bpClose = () => set({ bpSel: null });
    if (bp) { out.bpD = { name: bp.name, price: xfmt(bp.price * mult, bp.cur) + " / " + bp.iv.toLowerCase(), arch: bp.arch }; out.bpSubs = subs.filter(x => x.pl === bp.id).slice(0, 8).map(x => ({ cust: x.cust, st: x.st, stStyle: pl(SB[x.st]) })); out.bpHist = [kv("Nov 2026", xfmt(bp.price, bp.cur), true), kv("Mar 2026", xfmt(Math.round(bp.price * 0.9), bp.cur), true)]; out.bpArchLabel = bp.arch ? "Restore" : "Archive"; out.bpArch = () => { set({ bpArch: bp.arch ? (s.bpArch || []).filter(x => x !== bp.id) : (s.bpArch || []).concat([bp.id]), bpSel: null }); toast(bp.name + (bp.arch ? " restored" : " archived. Existing subscribers keep it.")); }; }
    out.bGateStyle = btn1(!verified); out.bGateTitle = gateT;
    const PF = s.bpForm;
    out.bpfOpen = !!PF;
    out.bpCreate = () => { if (!verified) { toast("Verification required"); return; } set({ bpForm: { name: "", desc: "", iv: "Monthly", mode: "Fixed in one currency", cur: "KES", price: "", trial: "0", setup: "0", tax: "" }, bTab: "plans" }); };
    out.bpfClose = () => set({ bpForm: null });
    if (PF) { const fs = o => set({ bpForm: Object.assign({}, PF, o) }); out.bpf = PF; out.bpfSet = e => fs({ [e.target.dataset.k]: e.target.value }); out.bpfIvs = ["Weekly", "Monthly", "Quarterly", "Yearly"].map(x => ({ label: x, style: chipSt(PF.iv === x), onClick: () => fs({ iv: x }) })); out.bpfModes = ["Fixed in one currency", "Fixed per currency", "Priced in KES, converted at charge"].map(x => ({ label: x, style: chipSt(PF.mode === x), onClick: () => fs({ mode: x }) })); const pr = Number(String(PF.price).replace(/[^0-9.]/g, "")) || 0; out.bpfPrev = { name: PF.name || "Plan name", price: pr ? xfmt(pr, PF.cur) + " / " + PF.iv.toLowerCase() : "Set a price", trial: Number(PF.trial) ? PF.trial + "-day free trial" : "No trial", setup: Number(PF.setup) ? "Setup fee " + xfmt(Number(PF.setup), PF.cur) : "" }; const ok = !!(PF.name && pr); out.bpfStyle = btn1(!ok); out.bpfSave = () => { if (!ok) { toast("Add a name and a price"); return; } set({ bpNew: (s.bpNew || []).concat([{ id: "pl_n" + (s.bpNew || []).length, name: PF.name, cur: PF.cur, price: pr, iv: PF.iv, trial: Number(PF.trial) || 0 }]), bpForm: null }); toast(PF.name + " created"); }; }
    const SF = s.bsForm;
    out.bsfOpen = !!SF;
    out.bsCreate = () => { if (!verified) { toast("Verification required"); return; } set({ bsForm: { step: 1, cust: "", plan: "pl_1", start: "Today", trial: "Plan default", collect: "Send a hosted link" }, bTab: "subs" }); };
    out.bsfClose = () => set({ bsForm: null });
    if (SF) { const fs = o => set({ bsForm: Object.assign({}, SF, o) }); out.bsf = SF; out.bsfSet = e => fs({ [e.target.dataset.k]: e.target.value }); const nm = ["Customer", "Plan", "Start and trial", "Payment method", "Review"]; out.bsfLabel = "Step " + SF.step + " of 5 · " + nm[SF.step - 1]; out.bsfSteps = nm.map((n, i) => ({ style: "flex: 1; height: 4px; border-radius: 999px; background: " + (i < SF.step ? "var(--indigo)" : "var(--surface)") })); for (let i = 1; i <= 5; i++) out["bsf" + i] = SF.step === i; out.bsfCusts = BCUST.slice(0, 6).map(c => ({ label: c, style: chipSt(SF.cust === c), onClick: () => fs({ cust: c }) })); out.bsfPlans = plans.filter(x => !x.arch).map(x => ({ label: x.name + " · " + xfmt(x.price, x.cur) + " / " + x.iv.toLowerCase(), style: chipSt(SF.plan === x.id), onClick: () => fs({ plan: x.id }) })); out.bsfStarts = ["Today", "Dec 1, 2026", "Jan 1, 2027"].map(x => ({ label: x, style: chipSt(SF.start === x), onClick: () => fs({ start: x }) })); out.bsfTrials = ["Plan default", "No trial", "14 days", "30 days"].map(x => ({ label: x, style: chipSt(SF.trial === x), onClick: () => fs({ trial: x }) })); out.bsfCollects = [["Send a hosted link", "Pilot"], ["Payer approves on mobile money each cycle", "Pilot"], ["Card on file", "Roadmap"]].map(([x, t]) => ({ label: x + " · " + t, style: chipSt(SF.collect === x), onClick: () => fs({ collect: x }) })); const np = pById(SF.plan); out.bsfReview = [kv("Customer", SF.cust || "Not set"), kv("Plan", np.name), kv("Price", xfmt(np.price, np.cur) + " / " + np.iv.toLowerCase(), true), kv("Start", SF.start), kv("Trial", SF.trial === "Plan default" ? (np.trial ? np.trial + " days" : "None") : SF.trial), kv("Payment method", SF.collect)]; const ok = SF.step === 1 ? !!SF.cust : true; out.bsfBackShow = SF.step > 1; out.bsfBack = () => fs({ step: SF.step - 1 }); out.bsfNextLabel = SF.step === 5 ? "Send to customer" : "Continue"; out.bsfNextStyle = btn1(!ok) + "; flex: 1 1 200px"; out.bsfNext = () => { if (!ok) return; if (SF.step < 5) { fs({ step: SF.step + 1 }); return; } const id = "sub_n" + (s.bsNew || []).length; const tr = SF.trial === "No trial" ? 0 : SF.trial === "Plan default" ? np.trial : 1; set({ bsForm: null, bsNew: (s.bsNew || []).concat([{ id, cust: SF.cust, pl: SF.plan, st: tr ? "Trialing" : "Active", start: 5, rail: SF.collect.indexOf("Card") === 0 ? "Card on file" : SF.collect.indexOf("Payer") === 0 ? "Mobile money prompt" : "Hosted link", nextDay: 22 }]) }); toast("Subscription created. " + SF.cust + " gets a link to approve the payment method."); }; }
    const bs = s.bSet || {};
    out.bSetRows = [["retry", "Retry schedule", "Day 3, day 5, day 7"], ["remind", "Reminder emails", "1 day before charge, on failure"], ["grace", "Grace period", "7 days"], ["cancelN", "Cancel after failed attempts", "4"], ["fx", "FX handling", "Convert at charge time, rate shown on invoice"], ["tax", "Tax lines", "None"], ["brand", "Invoice and portal branding", "Uses Settings > Branding"]].map(([k, l, d]) => ({ label: l, val: bs[k] != null ? bs[k] : d, set: e => set({ bSet: Object.assign({}, bs, { [k]: e.target.value }) }) }));
    out.bSetSave = () => toast("Billing settings saved. Values are placeholders.");
    out.bPortalOpen = !!s.bPortal; out.bPortalAct = () => set({ bPortal: true }); out.bPortalClose = () => set({ bPortal: false });
    out.bRails = [["Mobile money prompt each cycle", "The payer approves a prompt every cycle. No silent pulls.", "Pilot"], ["Hosted pay link", "We email and SMS a link each cycle.", "Pilot"], ["Card on file", "Charged automatically on the cycle date.", "Roadmap"], ["Bank direct debit", "Where a market supports mandates.", "Roadmap"]].map(([n, d, t]) => ({ name: n, desc: d, tag: t, tagStyle: t === "Pilot" ? pl("neu") : pl("neu") }));


    /* ============ CATALOG ============ */
    out.isCat = V === "catalog" && !s.catSel; out.isCatD = V === "catalog" && !!s.catSel;
    const ctag = s.catTag == null ? "Roadmap" : s.catTag;
    out.catTagShow = !!ctag; out.catTagText = ctag;
    G("catalog", "Cat", ctag);
    const kats = E ? [] : CAT.concat(s.catNew || []).filter(p => (s.catDel || []).indexOf(p.id) < 0).map(p => Object.assign({}, p, { st: (s.catSt || {})[p.id] || p.st, prices: (s.catPr || {})[p.id] || p.prices }));
    const kpay = this.xSales(s).filter(x => x.prod).map(x => Object.assign({}, x, { p: kats.find(c => c.id === x.prod) })).filter(x => x.p);
    const curTag = c => c === "KES" ? "Live" : c === "USD" ? "Roadmap" : "Pilot";
    const kcur = s.catCur || "All";
    const kconv = (v, c) => kcur === "All" ? v * (GKE[c] || 1) : (c === kcur ? v : 0);
    const kf = v => kcur === "All" ? K(v) : xfmt(v, kcur);
    const rev = p => kpay.filter(x => x.p.id === p.id && x.st === "Paid" && x.day >= 9).reduce((t, x) => t + kconv(x.amt, x.cur), 0);
    const pays30 = p => kpay.filter(x => x.p.id === p.id && x.day >= 9).length;
    const totRev = kats.reduce((t, p) => t + rev(p), 0);
    const top = kats.slice().sort((a, b) => rev(b) - rev(a))[0];
    out.catCurs = ["All", "KES", "USD", "NGN", "TZS"].map(c => ({ label: c === "All" ? "All, KES equivalent" : c, style: chipSt(kcur === c), onClick: () => set({ catCur: c }) }));
    out.catKpis = [["Active products", String(kats.filter(p => p.st === "Active").length), kats.length + " in catalog"], ["Payments · 30 days", String(kats.reduce((t, p) => t + pays30(p), 0)), kpay.filter(x => x.st === "Refunded").length + " refunded"], ["Revenue · 30 days", kf(totRev), "Paid, net of refunds"], ["Top product", top && rev(top) ? top.name : "None", top && rev(top) ? kf(rev(top)) : ""]].map(([label, value, note]) => ({ label, value, note }));
    const ftype = s.catType || "Any", fcur = s.catFCur || "Any", fcat = s.catCat || "Any";
    out.catType = ftype; out.setCatType = e => set({ catType: e.target.value }); out.catFCur = fcur; out.setCatFCur = e => set({ catFCur: e.target.value }); out.catCat = fcat; out.setCatCat = e => set({ catCat: e.target.value });
    const canEdit = verified;
    const SPC = { Active: "ok", Draft: "neu", Archived: "warn" };
    const thumbC = ["#4339ca", "#0f766e", "#b45309", "#be123c", "#475569"];
    const linkOf = p => ["Storefront checkout", "Wholesale link"].filter((x, i) => (p.id.charCodeAt(7) + i) % 2 === 0 || p.st === "Active").slice(0, p.st === "Active" ? 2 : 0);
    out.catT = T("cat", [["name", "Name"], ["pricing", "Pricing"], ["type", "Type"], ["st", "Status"], ["pays", "Payments", "right"], ["rev", "Revenue", "right"], ["created", "Created"], ["act", ""]], kats.filter(p => (ftype === "Any" || p.type === ftype) && (fcur === "Any" || p.prices.some(x => x[0] === fcur)) && (fcat === "Any" || p.cat === fcat)).map(p => ({ status: p.st, search: p.name + " " + p.sku, v: { name: p.name, pricing: p.prices[0][1] * (GKE[p.prices[0][0]] || 1), type: p.type, st: p.st, pays: pays30(p), rev: rev(p), created: p.created }, onClick: () => set({ catSel: p.id, catTab: "overview" }), c: { name: { t: p.name + " · " + p.sku, b: 1 }, pricing: { t: xfmt(p.prices[0][1], p.prices[0][0]) + (p.prices.length > 1 ? " +" + (p.prices.length - 1) + " currenc" + (p.prices.length > 2 ? "ies" : "y") : "") + (p.mode === "Converted" ? " · converted" : ""), m: 1 }, type: { t: p.type, mu: 1 }, st: { t: p.st, p: pl(SPC[p.st]) }, pays: { t: pays30(p), m: 1 }, rev: { t: rev(p) ? kf(rev(p)) : "None", m: 1 }, created: { t: p.created, mu: 1 }, act: p.st === "Active" ? { btn: "Create link", act: () => { if (!canEdit) { toast("Verification required"); return; } this.setState({ modal: "newlink", linkStep: 1 }); toast("Payment link started from " + p.name); } } : {} } })), { chips: ["Active", "Draft", "Archived"], noun: "products", file: "catalog", emptyTitle: "No products yet", emptyNote: "Create your first product to start selling, or import a CSV of your catalog." });
    out.catCreateStyle = btn1(!canEdit); out.catCreateTitle = gateT;
    const blankF = { name: "", desc: "", sku: "", cat: "Goods", type: "One-time", interval: "Monthly", mode: "Fixed", prices: [["KES", ""]], fxPayer: "Merchant", tax: "", taxPct: "", setup: "", avail: "All supported", inv: false, stock: "", low: "5", fields: ["Payer name", "Email"], st: "Draft", imgs: 0 };
    out.catNew = () => { if (!canEdit) { toast("Verification required"); return; } set({ catF: Object.assign({}, blankF), catDone: null }); };
    const F2 = s.catF;
    out.catFOpen = !!F2 || !!s.catDone; out.catFClose = () => set({ catF: null, catDone: null });
    out.catDoneShow = !!s.catDone; out.catFormShow = !!F2;
    if (s.catDone) { out.catDoneName = s.catDone; out.catDoneLink = () => { set({ catDone: null, modal: "newlink", linkStep: 1 }); }; out.catDoneInv = () => { set({ catDone: null, modal: "invoice" }); toast("Invoice started with " + s.catDone + " as a line item"); }; out.catDoneEmbed = () => { try { navigator.clipboard.writeText('<script src="https://js.elementpay.net/v1/checkout.js" data-product="prod_new"><\/script>'); } catch (e) {} toast("Embed code copied"); }; }
    if (F2) {
      const fs = o => { this.setState(st => ({ catF: Object.assign({}, st.catF, o), catSaved: "Saving draft…" })); clearTimeout(this._cfT); this._cfT = setTimeout(() => set({ catSaved: "Draft saved" }), 600); };
      out.cf = F2; out.cfSet = e => fs({ [e.target.dataset.k]: e.target.value }); out.catSaved = s.catSaved || "Draft not saved yet";
      out.cfCats = ["Goods", "Services", "Digital"].map(x => ({ label: x, style: chipSt(F2.cat === x), onClick: () => fs({ cat: x }) }));
      out.cfTypes = ["One-time", "Recurring"].map(x => ({ label: x, style: chipSt(F2.type === x), onClick: () => fs({ type: x }) }));
      out.cfRec = F2.type === "Recurring";
      out.cfIvs = ["Weekly", "Monthly", "Quarterly", "Yearly"].map(x => ({ label: x, style: chipSt(F2.interval === x), onClick: () => fs({ interval: x }) }));
      out.cfModes = [["Fixed", "Fixed per currency"], ["Converted", "Priced in KES, converted at checkout"]].map(([k2, l]) => ({ label: l, style: chipSt(F2.mode === k2), onClick: () => fs({ mode: k2, prices: k2 === "Converted" ? [["KES", (F2.prices[0] || [])[1] || ""]] : F2.prices }) }));
      out.cfFixed = F2.mode === "Fixed"; out.cfConv = F2.mode === "Converted";
      out.cfImgs = [0, 1, 2, 3].map(i => ({ label: i < F2.imgs ? "Image " + (i + 1) : "+", style: "display: grid; place-items: center; aspect-ratio: 1; border-radius: 10px; cursor: pointer; font-size: 11px; font-weight: 700; border: 1px " + (i < F2.imgs ? "solid transparent; color: #fff; background: " + thumbC[i] : "dashed var(--border-strong); color: var(--muted); background: var(--surface-soft)"), onClick: () => fs({ imgs: Math.max(F2.imgs, i + 1) }) }));
      out.cfRows = F2.prices.map((pr, i) => ({ i, cur: pr[0], amt: pr[1], tag: curTag(pr[0]), tagStyle: curTag(pr[0]) === "Live" ? pl("ok") : pl("neu"), setCur: e => fs({ prices: F2.prices.map((x, j) => j === i ? [e.target.value, x[1]] : x) }), setAmt: e => fs({ prices: F2.prices.map((x, j) => j === i ? [x[0], e.target.value] : x) }), canRm: F2.prices.length > 1, rm: () => fs({ prices: F2.prices.filter((x, j) => j !== i) }) }));
      out.cfAddRow = () => { const used = F2.prices.map(x => x[0]); const nx = ["KES", "USD", "NGN", "TZS"].find(c => used.indexOf(c) < 0); if (nx) fs({ prices: F2.prices.concat([[nx, ""]]) }); else toast("All supported currencies added"); };
      const base = Number(String((F2.prices[0] || [])[1] || "").replace(/[^0-9.]/g, "")) || 0;
      out.cfPreview = F2.prices.filter(x => Number(String(x[1]).replace(/[^0-9.]/g, ""))).map(x => xfmt(Number(String(x[1]).replace(/[^0-9.]/g, "")), x[0])).join(" · ") || "Set a price";
      out.cfFx = [["Merchant", "You absorb the spread"], ["Payer", "Added to the payer price"]].map(([k2, l]) => ({ label: l, style: chipSt(F2.fxPayer === k2), onClick: () => fs({ fxPayer: k2 }) }));
      const sp = 0.006; const pay = v => F2.fxPayer === "Payer" ? v * (1 + sp) : v;
      out.cfConvRows = [["NGN", 1540 / 129.2], ["TZS", 2585 / 129.2], ["USD", 1 / 129.2]].map(([c, r]) => kv("Payer in " + c, base ? xfmt(pay(base * r), c) : "Set a KES price", true));
      out.cfAvail = ["All supported", "Kenya", "Nigeria", "Tanzania", "Uganda", "Ghana"].map(x => ({ label: x, style: chipSt(F2.avail === x || (Array.isArray(F2.avail) && F2.avail.indexOf(x) >= 0)), onClick: () => fs({ avail: x }) }));
      out.cfInvLabel = F2.inv ? "On" : "Off"; out.cfInvToggle = () => fs({ inv: !F2.inv }); out.cfInv = !!F2.inv;
      out.cfInvTrack = "position: relative; width: 34px; height: 20px; flex-shrink: 0; border-radius: 999px; background: " + (F2.inv ? "var(--indigo)" : "var(--border-strong)"); out.cfInvKnob = "position: absolute; top: 2px; left: " + (F2.inv ? "16px" : "2px") + "; width: 16px; height: 16px; border-radius: 999px; background: #fff";
      out.cfFields = ["Payer name", "Email", "Phone", "Country", "Shipping address", "Custom field 1", "Custom field 2", "Custom field 3"].map(x => ({ label: x, style: chipSt(F2.fields.indexOf(x) >= 0), onClick: () => fs({ fields: F2.fields.indexOf(x) >= 0 ? F2.fields.filter(y => y !== x) : F2.fields.concat([x]) }) }));
      out.cfSts = ["Draft", "Active"].map(x => ({ label: x, style: chipSt(F2.st === x), onClick: () => fs({ st: x }) }));
      out.cfThumb = "width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0; background: " + (F2.imgs ? thumbC[0] : "var(--surface)");
      const err = !F2.name ? "Add a product name" : !base ? "Add a price in the first currency" : "";
      out.cfErr = err; out.cfErrShow = !!err; out.cfSaveStyle = btn1(!!err) + "; flex: 1";
      out.cfSave = () => { if (err) return; const id = "prod_n" + (s.catNew || []).length; set({ catNew: (s.catNew || []).concat([{ id, name: F2.name, sku: F2.sku || "NEW-" + (100 + (s.catNew || []).length), cat: F2.cat, type: F2.type, st: F2.st, mode: F2.mode, prices: F2.prices.filter(x => Number(String(x[1]).replace(/[^0-9.]/g, ""))).map(x => [x[0], Number(String(x[1]).replace(/[^0-9.]/g, ""))]), stock: F2.inv ? Number(F2.stock) || 0 : 0, created: "Nov 2026", interval: F2.type === "Recurring" ? F2.interval : "" }]), catF: null, catDone: F2.name }); };
    }
    out.catImpOpen = !!s.catImp; out.catImpAct = () => { if (!canEdit) { toast("Verification required"); return; } set({ catImp: "start" }); }; out.catImpClose = () => set({ catImp: null });
    out.catImpStart = s.catImp === "start"; out.catImpVal = s.catImp === "validated";
    out.catImpTpl = () => toast("catalog-template.csv downloaded · columns: name, sku, type, price_kes, price_usd, price_ngn, price_tzs");
    out.catImpUse = () => set({ catImp: "validated" });
    const IMP = [["Ceramic mug (box of 12)", "MUG-12", "4800", "38", "", ""], ["Logo embroidery", "SRV-EMB", "2500", "", "", ""], ["Tote bag", "", "900", "7", "", ""], ["Freight quote review", "SRV-FQR", "6000", "", "72000", ""]];
    out.catImpRows = IMP.map(([n, sku, k, u, ng]) => ({ n, sku: sku || "Missing", prices: ["KES " + k, u ? "USD " + u : "", ng ? "NGN " + ng : ""].filter(Boolean).join(" · "), ok: !!sku, msg: sku ? "Ready" : "SKU is required", style: sku ? pl("ok") : pl("bad") }));
    out.catImpSum = "4 rows · 3 ready · 1 error";
    out.catImpErr = () => toast("catalog-import-errors.csv downloaded · 1 row");
    out.catImpGo = () => { set({ catImp: null, catNew: (s.catNew || []).concat(IMP.filter(x => x[1]).map(([n, sku, k, u, ng], i) => ({ id: "prod_i" + i + (s.catNew || []).length, name: n, sku, cat: "Goods", type: "One-time", st: "Draft", mode: "Fixed", prices: [["KES", +k]].concat(u ? [["USD", +u]] : [], ng ? [["NGN", +ng]] : []), stock: 0, created: "Nov 2026", interval: "" }))) }); toast("3 products imported as drafts. 1 row skipped."); };
    out.catExport = () => toast("catalog.csv exported · " + kats.length + " products");
    const P = kats.find(p => p.id === s.catSel);
    if (s.catSel && !P && V === "catalog") out.isCatD = false, out.isCat = true;
    if (P) {
      const ptb = TB("catTab", [["overview", "Overview"], ["pricing", "Pricing"], ["payments", "Payments"], ["links", "Links and invoices"], ["settings", "Settings"]], "overview");
      out.cdpTabs = ptb.tabs; ["overview", "pricing", "payments", "links", "settings"].forEach(t => { out["cp_" + t] = ptb.cur === t; });
      const pp = kpay.filter(x => x.p.id === P.id); const paid = pp.filter(x => x.st === "Paid");
      out.cp = { name: P.name, sku: P.sku, st: P.st, stStyle: pl(SPC[P.st]), type: P.type + (P.interval ? " · " + P.interval.toLowerCase() : ""), thumb: "width: 56px; height: 56px; border-radius: 12px; flex-shrink: 0; background: " + thumbC[P.name.length % 5], price: P.prices.map(x => xfmt(x[1], x[0])).join(" · "), rec: P.type === "Recurring", mode: P.mode === "Converted" ? "Priced in KES, converted at checkout" : "Fixed per currency" };
      out.cpBack = () => set({ catSel: null });
      const pr = paid.reduce((t, x) => t + kconv(x.amt, x.cur), 0);
      out.cpKpis = [["Payments", String(pp.length), "All time"], ["Revenue", kf(pr), "Paid"], ["Average order", paid.length ? kf(pr / paid.length) : "None", ""], ["Refund rate", pp.length ? Math.round(pp.filter(x => x.st === "Refunded").length / pp.length * 100) + "%" : "0%", ""]].map(([label, value, note]) => ({ label, value, note }));
      const pm = GMON.map((m, k) => paid.filter(x => x.m === k).reduce((t, x) => t + kconv(x.amt, x.cur), 0));
      out.cpChart = BARS(pm, GMON, "var(--indigo-soft)", kf); out.cpChartTotal = kf(pm.reduce((a, b) => a + b, 0)); out.cpChartHas = pm.some(v => v > 0); out.cpChartEmpty = !out.cpChartHas;
      out.cpPrices = P.prices.map(x => ({ cur: x[0], amt: xfmt(x[1], x[0]), tag: curTag(x[0]), tagStyle: curTag(x[0]) === "Live" ? pl("ok") : pl("neu") }));
      const sched = (s.catSched || {})[P.id] || (P.sku === "PKG-100" ? "KES 19,500 from Dec 1, 2026" : P.sku === "RET-EXP" ? "KES 48,000 from Jan 1, 2027" : "");
      out.cpSched = sched; out.cpSchedShow = !!sched; out.cpSchedNone = !sched;
      out.cpSchedAmt = s.cpSchedAmt || ""; out.setCpSchedAmt = e => set({ cpSchedAmt: e.target.value });
      out.cpSchedGo = () => { const v = Number(String(s.cpSchedAmt || "").replace(/[^0-9.]/g, "")); if (!v) { toast("Enter the new KES price"); return; } if (!canEdit) { toast("Verification required"); return; } set({ catSched: Object.assign({}, s.catSched, { [P.id]: xfmt(v, P.prices[0][0]) + " from Dec 1, 2026" }), cpSchedAmt: "" }); toast("Price change scheduled"); };
      out.cpHist = [["Nov 2, 2026", "Grace Wanjiru", "Added NGN price"], ["Aug 14, 2026", "Achieng Odhiambo", "Changed KES price"], [P.created, "Achieng Odhiambo", "Created product"]].map(([d, w, a]) => ({ d, w, a }));
      out.cpEditPrice = s.cpEditPrice != null ? s.cpEditPrice : String(P.prices[0][1]); out.setCpEditPrice = e => set({ cpEditPrice: e.target.value });
      out.cpEditGo = () => { if (!canEdit) { toast("Verification required"); return; } const v = Number(String(s.cpEditPrice || "").replace(/[^0-9.]/g, "")); if (!v) return; set({ catPr: Object.assign({}, s.catPr, { [P.id]: [[P.prices[0][0], v]].concat(P.prices.slice(1)) }), cpEditPrice: null }); toast("Price updated. Open links show the new price."); };
      out.cpPayT = T("cpPay", [["date", "Date"], ["cust", "Customer"], ["amt", "Amount paid", "right"], ["cur", "Currency"], ["set", "Settlement amount", "right"], ["st", "Status"]], pp.map(x => ({ status: x.st, search: x.id + " " + x.cust, v: { date: x.day, cust: x.cust, amt: x.amt * (GKE[x.cur] || 1), cur: x.cur, set: x.amt, st: x.st }, onClick: () => toast(x.id + " · " + x.cust + " · " + xfmt(x.amt, x.cur)), c: { date: { t: x.date, mu: 1 }, cust: { t: x.cust, b: 1 }, amt: { t: xfmt(x.amt, x.cur), m: 1 }, cur: { t: x.cur, m: 1, mu: 1 }, set: { t: x.st === "Paid" ? xfmt(Math.round(x.amt * 0.99), x.cur) : "None", m: 1 }, st: { t: x.st, p: pl(x.st === "Paid" ? "ok" : "neu") } } })), { chips: ["Paid", "Refunded"], noun: "payments", file: "product-payments", emptyTitle: "No payments yet", emptyNote: "Payments from links and invoices that use this product appear here." });
      const lk = P.st === "Archived" ? [] : linkOf(P);
      out.cpLinks = lk.map(n => ({ name: n, kind: "Payment link · active", count: pp.length + " payments" })).concat(pp.length ? [{ name: "Invoice INV-10" + (P.id.slice(-2)), kind: "Invoice · paid", count: "1 line item" }] : []);
      out.cpLinksHas = out.cpLinks.length > 0; out.cpLinksEmpty = !out.cpLinksHas;
      out.cpNewLink = () => { if (!canEdit) { toast("Verification required"); return; } set({ modal: "newlink", linkStep: 1 }); };
      out.cpNewInv = () => { if (!canEdit) { toast("Verification required"); return; } set({ modal: "invoice" }); toast(P.name + " added as a line item"); };
      out.cpDup = () => { if (!canEdit) { toast("Verification required"); return; } set({ catNew: (s.catNew || []).concat([Object.assign({}, P, { id: "prod_d" + (s.catNew || []).length, name: P.name + " (copy)", st: "Draft", created: "Nov 2026" })]) }); toast("Duplicated as a draft"); };
      out.cpArchLabel = P.st === "Archived" ? "Restore" : "Archive";
      out.cpArch = () => P.st === "Archived" ? (set({ catSt: Object.assign({}, s.catSt, { [P.id]: "Active" }) }), toast("Restored")) : confirm("Archive " + P.name, lk.length ? lk.length + " active payment link" + (lk.length > 1 ? "s use" : " uses") + " this product. They stop accepting payments when you archive it." : "It disappears from checkout. Payment history stays.", "Archive product", () => { set({ catSt: Object.assign({}, s.catSt, { [P.id]: "Archived" }) }); toast(P.name + " archived"); });
      out.cpCanDel = pp.length === 0; out.cpDelNote = pp.length ? "This product has payments. Archive it instead of deleting." : "";
      out.cpDel = () => confirm("Delete " + P.name, "This cannot be undone.", "Delete product", () => { set({ catDel: (s.catDel || []).concat([P.id]), catSel: null }); toast("Product deleted"); });
      out.cpDevOpen = !!s.cpDevOpen; out.cpDevToggle = () => set({ cpDevOpen: !s.cpDevOpen });
      out.cpSnips = [["Create product", "POST /v1/products\n{ \"name\": \"" + P.name + "\", \"sku\": \"" + P.sku + "\",\n  \"prices\": [{ \"currency\": \"KES\", \"amount\": " + P.prices[0][1] + " }] }"], ["List products", "GET /v1/products?status=active"], ["Create payment link from product", "POST /v1/payment_links\n{ \"product_id\": \"" + P.id + "\" }"]].map(([t, c]) => ({ title: t, code: c }));
      out.cpLow = P.stock > 0 && P.stock <= 10; out.cpStock = P.stock ? P.stock + " in stock" + (P.stock <= 10 ? " · low" : "") : "";
    }
    out.repCards = (r.repCards || []).concat([{ name: "Product sales", note: "Revenue by product and currency", fmts: ["CSV", "XLSX", "PDF"].map(x => ({ label: x, onClick: () => set({ catRepF: x }), style: "padding: 5px 10px; border: 0; border-radius: 6px; cursor: pointer; font-size: 11.5px; font-weight: 700; background: " + ((s.catRepF || "CSV") === x ? "var(--panel)" : "transparent") + "; color: " + ((s.catRepF || "CSV") === x ? "var(--ink)" : "var(--muted)") })), generate: () => toast("product-sales-oct-2026." + (s.catRepF || "CSV").toLowerCase() + " is ready · " + kf(totRev)), schedLabel: s.catRepS ? "✓ Emailed every Monday 07:00 to finance@acme.co" : "+ Schedule email delivery", schedStyle: "padding: 0; border: 0; background: transparent; cursor: pointer; text-align: left; font-size: 12px; font-weight: 600; color: " + (s.catRepS ? "var(--ok-text)" : "var(--indigo-text)"), sched: () => set({ catRepS: !s.catRepS }) }]);
    out.demoGroups = (out.demoGroups || []).concat([{ label: "Catalog tag", opts: [["Roadmap", "Roadmap"], ["Pilot", "Pilot"], ["", "None"]].map(([v, l]) => ({ label: l, style: segSt(ctag === v), onClick: () => set({ catTag: v }) })) }]);
    /* titles + header */
    const TT = { partners: ["Refer and earn", pst === "approved" ? "Copy referral link" : "", pst === "approved" ? out.gpCopy : null], catalog: [P ? P.name : "Catalog", P ? "" : "Import CSV", P ? null : out.catImpAct], connect: [A ? A.name : "Linked accounts", A ? "" : "How it works", A ? null : out.cnHowAct], billing: [S ? S.cust : "Subscriptions", S ? "" : "Payer portal preview", S ? null : out.bPortalAct] }[V];
    if (TT) { out.viewTitle = TT[0]; out.hasHeaderAction = !!TT[2]; out.headerActionLabel = TT[1]; out.headerAction = TT[2] || (() => {}); }
    return out;
  }

  xVals2(r) {
    const s = this.state; const V = s.view; const out = {};
    const toast = m => this.xToast(m);
    const close = { palette: false, gsMenu: false, demoMenu: false, bellOpen: false, fbOpen: false, wsOpen: false, txColsOpen: false };
    const go = (view, extra) => () => this.setState(Object.assign({ view }, close, extra || {}));
    const pill = (bg, fg) => "display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; background: " + bg + "; color: " + fg;
    const tagSt = t => t === "Live" ? pill("var(--ok-bg)", "var(--ok-text)") : pill("var(--surface)", "var(--muted)");
    const flagSt = c => c === "usdc" ? "display: inline-grid; place-items: center; flex-shrink: 0; width: 20px; height: 14px; border-radius: 3px; background: #2775ca; color: #fff; font-size: 9px; font-weight: 800; line-height: 1" : "display: inline-block; flex-shrink: 0; width: 20px; height: 14px; border-radius: 3px; box-shadow: 0 0 0 1px rgba(20,24,28,0.1); background: center/cover no-repeat var(--surface); background-image: url(/flags/flag-" + c + ".svg)";
    const MONO = "font-family: 'JetBrains Mono', ui-monospace, monospace; ";
    const kv = (label, value, mono, strong) => ({ label, value: String(value), vStyle: (mono ? MONO + "white-space: nowrap; " : "") + "font-size: " + (mono ? "12.5px" : "13px") + "; text-align: right; overflow-wrap: anywhere; font-weight: " + (strong ? "700" : "600") + "; color: var(--ink)" });
    const tabSt = on => "display: inline-flex; align-items: center; gap: 7px; padding: 7px 11px; border-radius: 8px; cursor: pointer; white-space: nowrap; font-size: 12.5px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    const cntSt = on => "font-size: 11px; font-weight: 700; padding: 1px 6px; border-radius: 999px; background: " + (on ? "rgba(67,57,202,0.14)" : "var(--surface)") + "; color: " + (on ? "var(--indigo-text)" : "var(--muted)");
    const chipSt = on => "white-space: nowrap; display: inline-flex; align-items: center; gap: 7px; padding: 6px 11px; border-radius: 999px; cursor: pointer; font-size: 12.5px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    const kes = n => HOME.cur + " " + Math.round(n).toLocaleString("en-US");
    const kesM = n => Math.abs(n) >= 1e6 ? HOME.cur + " " + (n / 1e6).toFixed(2) + "M" : kes(n);
    const btn1 = dis => "padding: 10px 15px; border-radius: 8px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 13px; font-weight: 700; white-space: nowrap; " + (dis ? "opacity: 0.45; cursor: not-allowed" : "cursor: pointer");
    const btn2 = dis => "padding: 9px 13px; border-radius: 8px; border: 1px solid var(--border-strong); background: var(--panel); color: var(--ink); font-size: 12.5px; font-weight: 600; white-space: nowrap; " + (dis ? "opacity: 0.45; cursor: not-allowed" : "cursor: pointer");
    const noop = () => {};
    const acct = s.acct || "live"; const sbx = !!s.demoSandbox; const liveOk = acct === "live" || acct === "paused"; const E = !!s.xEmpty;
    const payOk = sbx || acct === "live"; const inOk = sbx || liveOk; const zero = E || (!liveOk && !sbx);
    const blockMsg = acct === "paused" ? "Payouts paused" : "Verification required";
    const all = r.__all || []; const party = r.__party || (() => ""); const allBens = r.__bens || []; const row = r.__row;
    const openKyb = st => () => this.setState(Object.assign({ kybOpen: true, kybStage: st || s.kybStage || 1 }, close));
    const openAppeal = () => this.setState(Object.assign({ appealOpen: true }, close));

    if (this._lv !== V) { const first = this._lv === undefined; this._lv = V; if (!first) setTimeout(() => { try { window.scrollTo(0, 0); document.querySelectorAll("[data-ep-main]").forEach(el => { el.scrollTop = 0; }); } catch (e) {} this.setState(Object.assign({ toast: null, settingsDirty: false, catF: null, catDone: null, catImp: null, coinSel: null, ptSel: null }, V !== "catalog" ? { catSel: null } : {}, close)); }, 0); }

    /* menus */
    out.gsCount = String(r.gsLabel || "").split("· ")[1] || "";
    out.anyMenu = !!(s.demoMenu || s.gsMenu || s.bellOpen || s.fbOpen || s.wsOpen || s.txColsOpen);
    out.closeMenus = () => this.setState(close);
    out.demoToggle = () => this.setState(Object.assign({}, close, { demoMenu: !s.demoMenu }));
    out.gsToggle = () => this.setState(Object.assign({}, close, { gsMenu: !s.gsMenu }));

    /* global new payment */
    out.npDisabled = !payOk; out.npTitle = payOk ? "New payment" : blockMsg;
    out.npStyle = btn1(!payOk);
    out.npClick = payOk ? () => this.xOpenWiz() : () => toast(blockMsg + ". " + (acct === "paused" ? "Collections keep working." : "Switch the demo to sandbox to test payments."));
    out.openWizard = out.npClick;

    /* developers merge */
    const devOn = V === "keys" || V === "devtools";
    const failing = !(s.replayed || {}).all && !E;
    out.labelKeys = "Developers"; out.navKeysStyle = this.navBtn(devOn, false, false); out.navKeysCurrent = devOn ? "page" : "false"; out.navKeysClick = go("keys");
    out.navKeysBadge = failing ? "1" : ""; out.navKeysBadgeStyle = "margin-left: auto; font-size: 10.5px; font-weight: 700; padding: " + (failing ? "2px 7px" : "0") + "; border-radius: 999px; background: " + (failing ? "var(--bad-bg)" : "transparent") + "; color: var(--bad-text)";
    const dt = s.devTab || "webhooks";
    out.devTabs = [["keys", "API keys"], ["webhooks", "Webhooks"], ["events", "Events"], ["logs", "Logs"], ["sandbox", "Sandbox tools"], ["apps", "Connected apps"], ["limits", "IP allowlist and limits"]].map(([id, l]) => { const on = id === "keys" ? V === "keys" : V === "devtools" && dt === id; return { label: l, onClick: id === "keys" ? go("keys") : go("devtools", { devTab: id }), style: tabSt(on) }; });
    out.dev_apps = V === "devtools" && dt === "apps";
    out.devTabs = out.devTabs.concat([{ label: "API reference", onClick: go("reference"), style: tabSt(V === "reference") }]);
    if (V === "reference") { out.navKeysStyle = this.navBtn(true, false, false); out.navKeysCurrent = "page"; }
    out.navKybShow = acct !== "live";
    out.gsShow = (r.gsItems || []).some(g => !g.mark);
    out.goBulk = go("bulk"); out.goPartners = go("partners"); out.goBilling = go("billing");
    out.whHas = !E; out.whEmpty = E;
    if (E) { out.whRows = []; out.whDeliveries = []; out.whFailing = false; out.logRows = []; out.evRows = (r.evRows || []).slice(0, (s.simEvents || []).length); }
    out.evHas = (out.evRows || r.evRows || []).length > 0; out.evEmpty = !out.evHas;
    out.logHas = (out.logRows || r.logRows || []).length > 0; out.logEmpty = !out.logHas;

    /* status card + banner overrides */
    if (acct === "review") { out.ovActNote = "Submitted Nov 6, 2026. Expected decision by Nov 10, 2026. Live payouts open when the review passes."; out.banNote = "Submitted Nov 6, 2026. Expected decision by Nov 10, 2026. Payouts stay off until then. Sandbox works as normal."; }
    if (acct === "moreinfo") { out.ovActTitle = "More information required · 2 items"; out.ovActNote = "CR12 is older than 12 months. ID number for director James Otieno is missing."; out.ovActCta = "Fix 2 items"; }
    if (acct === "rejected") { out.ovActNote = "The registered address does not match the certificate of incorporation. Appeal within 30 days with corrected documents."; out.ovActCta = "Start appeal"; out.banAct = openAppeal; }
    out.ovActAct = acct === "rejected" ? openAppeal : acct === "moreinfo" ? openKyb(3) : acct === "review" ? openKyb(5) : openKyb();
    out.ovMetaLabel = sbx ? "Sandbox data" : !liveOk ? "Sandbox data · live volume shows after verification" : "All currencies in " + HOME.cur + " equivalent";

    /* appeal */
    out.appealOpen = !!s.appealOpen; out.appealClose = () => this.setState({ appealOpen: false });
    out.appealDocLabel = s.appealDoc ? "✓ certificate-of-incorporation-2026.pdf" : "+ Upload corrected document";
    out.appealDocStyle = chipSt(!!s.appealDoc); out.appealDocToggle = () => this.setState({ appealDoc: !s.appealDoc });
    out.appealNote = s.appealNote || ""; out.setAppealNote = e => this.setState({ appealNote: e.target.value });
    out.appealOk = !!s.appealDoc; out.appealStyle = btn1(!s.appealDoc);
    out.appealSubmit = () => { if (!s.appealDoc) return; this.setState({ appealOpen: false, acct: "review", appealDoc: false, appealNote: "" }); toast("Appeal submitted. Status: in review."); };

    /* overview: chart, next payout, recent */
    const dayOf = d => d.indexOf("Nov") === 0 ? 31 + +d.slice(4) : +d.slice(4);
    const days = Array.from({ length: 14 }, (_, i) => 25 + i);
    const vol = days.map(d => all.filter(p => p.status === "Settled" && dayOf(p.date) === d).reduce((t, p) => t + p.send / XUSD[XCOR[p.corr].from] * XUSD[HOME.cur], 0));
    const mx = Math.max(1, ...vol);
    out.ovChart = days.map((d, i) => ({ label: d > 31 ? "Nov " + (d - 31) : "Oct " + d, title: (d > 31 ? "Nov " + (d - 31) : "Oct " + d) + " · " + kesM(vol[i]) + " settled", style: "display: block; width: 100%; border-radius: 4px 4px 0 0; min-height: 2px; background: " + (i === 13 ? "var(--indigo)" : "var(--indigo-soft)") + "; height: " + Math.round(vol[i] / mx * 100) + "%" }));
    out.ovChartTotal = kesM(vol.reduce((a, b) => a + b, 0));
    out.ovChartEmpty = vol.every(v => v === 0); out.ovChartHas = !out.ovChartEmpty;
    const bal = this.xBal(s);
    const thr = Number(String(s.awThreshold || HOME.thr.toLocaleString("en-US")).replace(/[^0-9]/g, "")) || 0;
    const nextAmt = Math.max(0, (zero ? 0 : bal.KES) - thr);
    out.nextPayHas = !zero && s.awOn !== false; out.nextPayEmpty = !out.nextPayHas;
    out.nextPayAmt = acct === "paused" ? "Paused" : kes(nextAmt);
    out.nextPayNote = acct === "paused" ? "Automatic withdrawals resume when payouts resume." : "Balance above " + kes(thr) + " goes to " + (s.awDest || "Bank ••••8841") + ".";
    out.nextPayWhen = (s.awSchedule || "Weekly, Monday") + " · next run Mon, Nov 9 07:00";
    out.nextPayEdit = go("wallets");
    out.ovRecent = row ? all.slice(0, 5).map(row) : []; out.ovRecentHas = out.ovRecent.length > 0; out.ovRecentEmpty = !out.ovRecentHas;
    out.goXb = go("xborder");

    /* transactions (unified) */
    const CK = this.xSales(s).map(x => ({ id: x.id, src: x.src.indexOf("INV-") === 0 ? "Invoice " + x.src : x.pname + " · link", payer: x.cust, m: x.method, amt: x.amt, fee: Math.round(x.amt * (x.method === "Card" ? 0.029 : 0.01)), st: x.st, date: x.date, time: "1" + (x.day % 8) + ":" + String((x.day * 7) % 60).padStart(2, "0"), day: x.day, cur: x.cur }));
    const CK_OLD = false ? [] : Array.from({ length: 0 }, (_, i) => {
      const day = 38 - Math.floor(i * 13 / 23); const m = [HOME.mobile, "Card", HOME.mobile, "USDC", HOME.mobile, "Bank transfer"][i % 6];
      const amt = Math.round([5000, 12500, 2400, 64000, 7450, 15000, 3200, 28000][i % 8] * HOME.f / (sbx ? 10 : 1)); const fee = Math.round(amt * (m === "Card" ? 0.029 : m === "USDC" ? 0.005 : 0.01));
      const id = (sbx ? "CT-" : "CK-") + (8841 - i);
      const st = (s.ckOver || {})[id] || (i === 2 ? "Pending" : i === 9 ? "Failed" : i === 15 ? "Refunded" : "Paid");
      return { id, src: ["Storefront checkout", "Invoice INV-" + (1042 - i), "Wholesale link", "Storefront checkout"][i % 4], payer: HOME.dial + "•• ••" + String(4192 + i * 37).slice(-4), m, amt, fee, st, date: day > 31 ? "Nov " + (day - 31) : "Oct " + day, time: String(9 + (i % 9)).padStart(2, "0") + ":" + String((i * 7) % 60).padStart(2, "0"), day };
    });
    const CKP = { Paid: ["var(--ok-bg)", "var(--ok-text)", "✓"], Pending: ["var(--warn-bg)", "var(--warn-text)", "◷"], Failed: ["var(--bad-bg)", "var(--bad-text)", "✕"], Refunded: ["var(--surface)", "var(--muted)", "↺"] };
    const TX = all.map(p => { const k = xcalc(p.corr, p.send, p.j); const c = k.c; const own = p.party === "own"; const st = XST[p.status];
      return { id: p.id, ty: own ? (p.corr === "USDC-KE" ? "Withdrawal" : "Conversion") : p.corr === "LOCAL" ? "Local payout" : "Cross-border", abroad: p.corr !== "LOCAL", dir: typeof p.party === "string" && p.party[0] === "r" ? "In" : "Out", who: party(p), method: c.rail, corr: c.from + " → " + c.to, corrName: c.name, sent: xfmt(p.send, c.from), recv: xfmt(k.recv, c.to), rate: xrate(k.rate), fee: xfmt(k.fee, c.from), settle: xfmt(k.recv, c.to), cur: c.from, cur2: c.to, st: p.status, icon: st.icon, pillStyle: pill(st.bg, st.fg), date: p.date, time: p.time, day: dayOf(p.date), open: go("xdetail", { xpSel: p.id }) }; })
      .concat(CK.map(x => ({ id: x.id, ty: "Checkout", abroad: false, dir: "In", who: x.payer + " · " + x.src, method: x.m, corr: "None", corrName: "", sent: xfmt(x.amt, x.cur), recv: xfmt(x.amt, x.cur), rate: "None", fee: xfmt(x.fee, x.cur), settle: xfmt(x.amt - x.fee, x.cur), cur: x.cur, cur2: x.cur, st: x.st, icon: CKP[x.st][2], pillStyle: pill(CKP[x.st][0], CKP[x.st][1]), date: x.date, time: x.time, day: x.day, open: () => this.setState({ ckSel: x.id }) })))
      .sort((a, b) => b.day - a.day || (b.time > a.time ? 1 : b.time < a.time ? -1 : 0));
    out.isTransactions = false; out.isTxX = V === "transactions";
    out.navTransactionsBadge = TX.length ? String(TX.length) : "";
    out.navTransactionsBadgeStyle = "margin-left: auto; font-size: 10.5px; font-weight: 700; padding: " + (TX.length ? "2px 7px" : "0") + "; border-radius: 999px; background: " + (TX.length ? (V === "transactions" ? "rgba(67,57,202,0.12)" : "var(--surface)") : "transparent") + "; color: " + (V === "transactions" ? "var(--indigo-text)" : "var(--rail-dim)");
    const tv = s.txView || "all"; const tt = s.txType || "All"; const tr = s.txRange || "Last 30 days";
    const fS = s.txStatus || "Any", fD = s.txDir || "Any", fC = s.txCur || "Any", fK = s.txCorr || "Any", fM = s.txMethod || "Any";
    const tq = (s.txQ || "").trim().toLowerCase();
    const txVis = TX.filter(t => (tv !== "abroad" || t.abroad) && (tt === "All" || t.ty === tt) && (tr === "Today" ? t.day === 38 : tr === "Last 7 days" ? t.day >= 32 : true) && (fS === "Any" || t.st === fS) && (fD === "Any" || t.dir === fD) && (fC === "Any" || t.cur === fC || t.cur2 === fC) && (fK === "Any" || t.corrName === fK) && (fM === "Any" || t.method.indexOf(fM) >= 0) && (!tq || (t.id + " " + t.who).toLowerCase().includes(tq)));
    out.txTypes = ["All", "Cross-border", "Local payout", "Checkout", "Withdrawal", "Conversion"].filter(t => (s.scope || "both") === "both" || (s.scope === "local" ? t !== "Cross-border" : t !== "Local payout")).map(t => ({ label: t, count: t === "All" ? TX.length : TX.filter(x => x.ty === t).length, onClick: () => this.setState({ txType: t, txView: "all" }), style: tabSt(tt === t && tv === "all"), countStyle: cntSt(tt === t && tv === "all") }));
    out.txRanges = ["Today", "Last 7 days", "Last 30 days", "Last 3 months", "Custom"].map(t => ({ label: t, onClick: t === "Custom" ? () => toast("Pick a start and end date. Custom ranges run up to 13 months.") : () => this.setState({ txRange: t }), style: chipSt(tr === t) }));
    const sv = [["All transactions", { txView: "all", txType: "All", txStatus: "Any" }], ["International payouts", { txView: "abroad", txType: "All", txStatus: "Any" }], ["Checkout collections", { txView: "all", txType: "Checkout", txStatus: "Any" }], ["Failed", { txView: "all", txType: "All", txStatus: "Failed" }]].filter(v => !((s.scope || "both") === "local" && v[0] === "International payouts")).concat((s.txSaved || []).map(v => [v.name, v.f]));
    out.txViews = sv.map(([name, f]) => ({ label: name, onClick: () => this.setState(f), style: chipSt(Object.keys(f).every(k2 => (s[k2] || (k2 === "txView" ? "all" : k2 === "txType" ? "All" : "Any")) === f[k2])) }));
    out.txSaveView = () => { const n = (s.txSaved || []).length + 1; this.setState({ txSaved: (s.txSaved || []).concat([{ name: "My view " + n, f: { txView: tv, txType: tt, txStatus: fS, txRange: tr } }]) }); toast("Saved as My view " + n); };
    ["Status", "Dir", "Cur", "Corr", "Method"].forEach(k2 => { out["tx" + k2] = s["tx" + k2] || "Any"; out["setTx" + k2] = e => this.setState({ ["tx" + k2]: e.target.value }); });
    out.txQ = s.txQ || ""; out.setTxQ = e => this.setState({ txQ: e.target.value });
    const hid = s.txHidden || [];
    ["method", "corr", "rate", "fee", "settle"].forEach(c => { out["col_" + c] = hid.indexOf(c) < 0; });
    out.txColsToggle = () => this.setState(Object.assign({}, close, { txColsOpen: !s.txColsOpen })); out.txColsOpen = !!s.txColsOpen;
    out.txColChips = [["method", "Method"], ["corr", "Corridor"], ["rate", "FX rate"], ["fee", "Fee"], ["settle", "Settlement amount"]].map(([c, l]) => ({ label: (hid.indexOf(c) < 0 ? "✓ " : "+ ") + l, style: chipSt(hid.indexOf(c) < 0), onClick: () => this.setState({ txHidden: hid.indexOf(c) < 0 ? hid.concat([c]) : hid.filter(x => x !== c) }) }));
    out.txRows = txVis; out.txHas = txVis.length > 0; out.txEmpty = !out.txHas;
    out.txEmptyTitle = TX.length ? "No transactions match" : "No transactions yet"; out.txEmptyNote = TX.length ? "Clear a filter or pick another view." : zero && !E ? "Live transactions show here after verification. Switch the demo to sandbox to see test data." : "Collections, payments abroad, withdrawals and conversions all land here.";
    out.txFooter = txVis.length + " of " + TX.length + " transactions"; out.txExport = () => toast("transactions-nov-2026.csv exported · " + txVis.length + " rows");
    out.txReset = () => this.setState({ txView: "all", txType: "All", txStatus: "Any", txDir: "Any", txCur: "Any", txCorr: "Any", txMethod: "Any", txQ: "", txRange: "Last 30 days" });
    out.xbNote = "Saved view of Transactions: " + all.length + " of " + TX.length + " transactions are international payouts, withdrawals and conversions.";
    out.goTxAbroad = go("transactions", { txView: "abroad", txType: "All" });
    out.xbCutoffNote = "Bank payouts to China funded after 15:00 China time pay out the next business day. " + (HOME.cur === "KES" ? "Corridors other than USDC to Kenya are in pilot." : "All corridors from " + HOME.country + " are in pilot.");
    out.xbShow = (s.scope || "both") !== "local";
    const ck = CK.find(x => x.id === s.ckSel);
    out.ckOpen = !!ck; out.ckClose = () => this.setState({ ckSel: null });
    if (ck) { out.ckTitle = ck.id + " · " + ck.src; out.ckRows = [kv("Status", ck.st), kv("Payer", ck.payer), kv("Method", ck.m), kv("Amount", xfmt(ck.amt, ck.cur), true, true), kv("Fee", xfmt(ck.fee, ck.cur), true), kv("Settlement amount", xfmt(ck.amt - ck.fee, ck.cur), true, true), kv("Date", ck.date + ", " + ck.time)]; out.ckCanRefund = ck.st === "Paid"; out.ckRefund = () => this.setState({ ckSel: null, rf: { kind: "ck", id: ck.id, mode: "full", amt: "", reason: "Customer request", max: ck.amt, cur: ck.cur } }); }

    /* refund / return */
    const rf = s.rf;
    out.rfOpen = !!rf; out.rfClose = () => this.setState({ rf: null });
    if (rf) {
      out.rfTitle = rf.kind === "ck" ? "Refund customer" : rf.col ? "Refund remitter" : "Request return from beneficiary bank";
      out.rfNote = rf.kind === "ck" ? "Goes back to the payer on the method they used." : rf.col ? "Sent back to the remitter's account in their currency at today's rate." : "We ask the receiving bank to return the funds. It can take up to 10 business days and needs the beneficiary's consent.";
      out.rfModes = [["full", "Full"], ["partial", "Partial"]].map(([m, l]) => ({ label: l, onClick: () => this.setState({ rf: Object.assign({}, rf, { mode: m }) }), style: "flex: 1; padding: 8px 12px; border: 0; border-radius: 7px; cursor: pointer; font-size: 12.5px; font-weight: 700; background: " + (rf.mode === m ? "var(--panel)" : "transparent") + "; color: " + (rf.mode === m ? "var(--ink)" : "var(--muted)") }));
      out.rfPartial = rf.mode === "partial"; out.rfAmt = rf.amt || ""; out.setRfAmt = e => this.setState({ rf: Object.assign({}, rf, { amt: e.target.value }) });
      out.rfMax = "Up to " + xfmt(rf.max || 0, rf.cur || "KES");
      out.rfReason = rf.reason; out.setRfReason = e => this.setState({ rf: Object.assign({}, rf, { reason: e.target.value }) });
      const ok = rf.mode === "full" || (Number(String(rf.amt).replace(/[^0-9.]/g, "")) > 0 && Number(String(rf.amt).replace(/[^0-9.]/g, "")) <= (rf.max || 0));
      out.rfStyle = btn1(!ok); out.rfCta = rf.kind === "xb" && !rf.col ? "Send return request" : "Confirm refund";
      out.rfConfirm = () => { if (!ok) return; if (rf.kind === "ck") this.setState(st => ({ rf: null, salesOv: Object.assign({}, st.salesOv, { [rf.id]: "Refunded" }) })); else if (rf.col) this.setState(st => ({ rf: null, xpOver: Object.assign({}, st.xpOver, { [rf.id]: "Refunded" }) })); else this.setState({ rf: null }); toast(rf.kind === "xb" && !rf.col ? "Return request sent for " + rf.id + ". We update the payment when the bank responds." : rf.id + " refunded" + (rf.mode === "partial" ? " in part" : "") + ". Reason: " + rf.reason + "."); };
    }

    /* detail extras */
    const sel = all.find(p => p.id === s.xpSel) || all[0];
    if (sel) {
      const isNew = (s.xpNew || []).some(p => p.id === sel.id); const c = XCOR[sel.corr]; const k = xcalc(sel.corr, sel.send, sel.j);
      const isCol = typeof sel.party === "string" && sel.party[0] === "r"; const outb = typeof sel.party === "number";
      out.xdCanFund = isNew && sel.status === "Awaiting funds" && payOk;
      out.xdFund = () => this.setState({ wiz: { step: 6, dir: sel.dir || (outb ? "pay" : sel.corr === "USDC-KE" ? "withdraw" : "convert"), corr: sel.corr, amt: String(sel.send), mode: "send", ben: outb ? sel.party : null, purpose: "GDS · Payment for goods", inv: true, pin: "", fund: "bal", id: sel.id } });
      out.xdCanApprove = sel.status === "Awaiting approval"; out.xdApprove = () => this.xApprove(sel.id);
      out.xdCanRefund = sel.status === "Settled" && (outb || isCol);
      out.xdRefundLabel = isCol ? "Refund remitter" : "Request return";
      out.xdRefund = () => this.setState({ rf: { kind: "xb", id: sel.id, mode: "full", amt: "", reason: isCol ? "Duplicate payment" : "Paid to wrong account", col: isCol, max: isCol ? k.recv : sel.send, cur: isCol ? c.to : c.from } });
      const ttl = s.xqTtl == null ? 30 : s.xqTtl;
      out.xdLockShow = isNew && sel.status === "Awaiting funds"; out.xdLockLabel = "Quote locked · 0:" + String(ttl).padStart(2, "0");
      out.xdCutoff = c.cutoff; out.xdFormula = "Received = (Sent − Fee) × Rate. Total cost = Fee + Spread (" + k.sp.toFixed(2) + "% of sent).";
      if (sel.status === "Settled") out.popRows = (r.popRows || []).concat([kv("Delivered", sel.date + ", 2026 · " + ((r.xdLegs || [])[4] || {}).time + " EAT", true)]);
    }
    out.xdActions = !!sel;

    /* wizard extras */
    const W = s.wiz;
    if (W) {
      const np = (s.xpNew || []).find(p => p.id === W.id);
      out.wz6Wait = W.step === 6 && !!np && np.status === "Awaiting approval"; out.wz6Fund = W.step === 6 && !out.wz6Wait;
      if (out.wz6Wait) { out.wzPrimLabel = "Done"; out.wzPrim = () => this.setState({ wiz: null }); out.wzPrimDisabled = false; out.wzPrimStyle = btn1(false) + "; flex: 1 1 200px"; out.wzLockShow = false; out.wzTitle = W.id; }
      out.wzLimitShow = W.step === 2 || W.step === 5; out.wzLimitErrShow = !!r.wzLimitErr && (W.step === 2 || W.step === 5);
    }

    /* beneficiaries */
    out.benRows = (r.benRows || []).map(b => Object.assign({}, b, { canPay: b.canPay && payOk && b.cur !== "USDC", pay: e => { if (e && e.stopPropagation) e.stopPropagation(); b.pay(); } }));
    out.awCur = "KES"; out.setAwCur = () => {};
    out.isBenD = V === "bendetail" && allBens[s.benSel] != null;
    if (out.isBenD) {
      const b = allBens[s.benSel]; const st = b.status;
      out.bd = { name: b.name, flag: flagSt(b.cc), country: b.countryName, status: st, pillStyle: st === "Verified" ? pill("var(--ok-bg)", "var(--ok-text)") : st === "Pending" ? pill("var(--warn-bg)", "var(--warn-text)") : pill("var(--bad-bg)", "var(--bad-text)") };
      out.bdRows = [kv("Rail", b.rail), kv("Account", b.acct, true), kv("Currency", b.cur, true), kv("Name check", b.match), kv("Added", "Mar 2026")];
      out.bdBlocked = st === "Blocked"; out.bdPending = st === "Pending";
      const hist = all.filter(p => p.party === s.benSel);
      out.bdHist = row ? hist.map(row) : []; out.bdHistHas = hist.length > 0; out.bdHistEmpty = !out.bdHistHas;
      out.bdCanPay = st !== "Blocked" && payOk && !!CUR2COR[b.cur];
      out.bdPay = () => this.xOpenWiz({ step: 2, dir: b.cur === HOME.cur ? "local" : "pay", corr: CUR2COR[b.cur], ben: s.benSel });
      out.bdBack = go("bens");
    }

    /* wallets */
    out.isWallets = false; out.isWalletsGated = false; out.isWalletsX = V === "wallets";
    const inc = all.filter(p => XCOR[p.corr].to === HOME.cur && p.corr !== "LOCAL" && (p.status === "Converting" || p.status === "Settling")).reduce((t, p) => t + xcalc(p.corr, p.send, p.j).recv, 0);
    const held = all.filter(p => XCOR[p.corr].from === HOME.cur && (p.status === "On hold" || p.status === "Awaiting approval")).reduce((t, p) => t + p.send, 0);
    out.fiatRows = [[HOME.cur, HOME.cc, bal.KES, inc, held, HOME.cur === "KES" ? "Live" : "Pilot", HOME.curName]].concat([["KES", "ke", 4812300, "Kenyan shilling"], ["NGN", "ng", 3418200, "Nigerian naira"], ["TZS", "tz", 12904000, "Tanzanian shilling"], ["USD", "us", 18250, "US dollar"]].filter(x => x[0] !== HOME.cur).slice(0, (s.scope || "both") === "local" ? 0 : 3).map(([c, cc, v, n]) => [c, cc, c === "KES" ? Math.round(v * 0.2) : v, 0, 0, "Pilot", n])).map(([cur, cc, av, i2, h2, tag, name]) => ({ cur, name, flag: flagSt(cc), avail: xfmt(zero ? 0 : av / (sbx && cur !== "KES" ? 10 : 1), cur), inc: xfmt(zero ? 0 : i2, cur), held: xfmt(zero ? 0 : h2, cur), tag: sbx ? "Sandbox" : tag, tagStyle: tagSt(sbx ? "Sandbox" : tag), auto: cur === HOME.cur ? (s.awOn === false ? "Off" : acct === "paused" ? "Paused" : "Above " + kes(thr) + " · " + (s.awSchedule || "Weekly, Monday")) : "Not set up", stmt: () => toast(cur + " statement for October 2026 downloaded (PDF)"), pof: () => toast("Proof of funds letter for " + cur + " generated (PDF)") }));
    out.coinRows = [["USDC", "Base", 48204.18], ["USDC", "Stellar", 20292.55 - ((s.xDebit || {}).USDC || 0)], ["USDT", "Polygon", 3858.4]].map(([asset, chain, v]) => ({ asset, chain, bal: xfmt(zero ? 0 : v, asset), addr: chain === "Stellar" ? "GBEPX4Q2…M7QXK" : "0x8335…0913", deposit: () => toast("Deposit address copied. Send " + asset + " on " + chain + " only."), cashout: payOk ? () => this.xOpenWiz({ step: 2, dir: "withdraw", corr: "USDC-KE", amt: "5,000" }) : () => toast(blockMsg), cashStyle: btn2(!payOk) }));
    out.wTopUpStyle = btn1(!inOk); out.wTopUp = inOk ? (r.openTopUp || noop) : () => toast("Verification required");
    out.wSendStyle = btn2(!payOk); out.wSend = payOk ? (r.openSend || noop) : () => toast(blockMsg);
    out.wTransferStyle = btn2(!payOk); out.wTransfer = payOk ? (r.openTransfer || r.openSend || noop) : () => toast(blockMsg);
    out.wWithdrawStyle = btn2(!payOk); out.wWithdraw = payOk ? () => this.xOpenWiz({ step: 2, dir: "withdraw", corr: "USDC-KE", amt: "5,000" }) : () => toast(blockMsg);
    out.wTitle = payOk ? "" : blockMsg;
    out.wPaused = acct === "paused" && !sbx; out.wZero = zero && !E;
    const LG = [];
    all.forEach(p => { const k = xcalc(p.corr, p.send, p.j); const c = k.c; const fin = ["Settled", "Converting", "Settling"].indexOf(p.status) >= 0;
      const ty = typeof p.party === "number" ? "Payouts" : p.party === "own" ? (p.corr === "USDC-KE" ? "Withdrawals" : "Conversions") : "Payments";
      if (ty === "Payments") LG.push({ date: p.date, time: p.time, desc: "Collection from " + party(p), ty, cur: HOME.cur, amt: fin ? k.recv : 0, st: p.status, id: p.id });
      else { LG.push({ date: p.date, time: p.time, desc: (ty === "Payouts" ? "Payout to " : ty === "Withdrawals" ? "Withdrawal · " : "Conversion · ") + party(p), ty, cur: c.from, amt: fin ? -(p.send - k.fee) : 0, st: p.status, id: p.id }); if (fin) LG.push({ date: p.date, time: p.time, desc: "Fee · " + p.id, ty: "Fees", cur: c.from, amt: -k.fee, st: p.status, id: p.id }); }
    });
    const run = { [HOME.cur]: zero ? 0 : bal.KES, USDC: zero ? 0 : bal.USDC };
    LG.forEach(e => { e.after = run[e.cur] || 0; run[e.cur] = (run[e.cur] || 0) - e.amt; });
    const lm = s.lgMonth || "Nov", lc = s.lgCur || "All", lt = s.lgType || "All";
    const lgVis = LG.filter(e => (lm === "All" || e.date.indexOf(lm) === 0) && (lc === "All" || e.cur === lc) && (lt === "All" || e.ty === lt));
    out.lgMonths = [["Nov", "November 2026"], ["Oct", "October 2026"], ["All", "All time"]].map(([m, l]) => ({ label: l, onClick: () => this.setState({ lgMonth: m }), style: chipSt(lm === m) }));
    out.lgCurs = ["All", HOME.cur, "USDC"].map(c => ({ label: c, onClick: () => this.setState({ lgCur: c }), style: chipSt(lc === c) }));
    out.lgTypes = ["All", "Payments", "Payouts", "Conversions", "Fees", "Withdrawals"].map(t => ({ label: t, onClick: () => this.setState({ lgType: t }), style: tabSt(lt === t) }));
    out.lgRows = lgVis.map(e => { const stp = XST[e.st]; const done = e.amt !== 0; return { date: e.date + ", " + e.time, desc: e.desc, ty: e.ty, amt: done ? (e.amt > 0 ? "+ " : "− ") + xfmt(Math.abs(e.amt), e.cur) : "Not moved", amtStyle: MONO + "font-size: 12.5px; font-weight: 600; text-align: right; white-space: nowrap; color: " + (!done ? "var(--faint)" : e.amt > 0 ? "var(--ok-text)" : "var(--ink)"), after: xfmt(e.after, e.cur), st: e.st, pillStyle: pill(stp.bg, stp.fg), open: go("xdetail", { xpSel: e.id }) }; });
    out.lgHas = lgVis.length > 0; out.lgEmpty = !out.lgHas; out.lgFooter = lgVis.length + " of " + LG.length + " movements";
    out.lgExport = f => () => toast("ledger-" + lm.toLowerCase() + "-2026." + f + " exported");
    out.lgCsv = out.lgExport("csv"); out.lgXlsx = out.lgExport("xlsx"); out.lgPdf = out.lgExport("pdf");
    out.awThreshold = s.awThreshold || HOME.thr.toLocaleString("en-US"); out.setAwThreshold = e => this.setState({ awThreshold: e.target.value });
    out.awSchedule = s.awSchedule || "Weekly, Monday"; out.setAwSchedule = e => this.setState({ awSchedule: e.target.value });
    out.awDest = s.awDest || "Bank ••••8841"; out.setAwDest = e => this.setState({ awDest: e.target.value });
    out.awOnLabel = s.awOn === false ? "Off" : "On"; out.awToggle = () => this.setState({ awOn: s.awOn === false });
    out.awTrack = "position: relative; width: 34px; height: 20px; flex-shrink: 0; border-radius: 999px; background: " + (s.awOn === false ? "var(--border-strong)" : "var(--indigo)");
    out.awKnob = "position: absolute; top: 2px; left: " + (s.awOn === false ? "2px" : "16px") + "; width: 16px; height: 16px; border-radius: 999px; background: #fff";
    out.awSave = () => toast("Automatic withdrawal saved: above KES " + (s.awThreshold || "1,000,000") + ", " + (s.awSchedule || "Weekly, Monday") + ", to " + (s.awDest || "Bank ••••8841"));
    out.homeCur = HOME.cur; out.homeDest = HOME.dest;
    out.destRows = [["Bank ••••8841", "Bank account · " + HOME.cur, "Verified"], [HOME.dest, "Mobile money · " + HOME.cur, "Verified"], ["USDC · Stellar GBEP…M7QXK", "Crypto address · allowlisted", "Verified"]].concat((s.destNew || []).map(d => [d, "Bank account · " + HOME.cur, "Cooling off"])).map(([name, kind, st]) => ({ name, kind, st, style: st === "Verified" ? pill("var(--ok-bg)", "var(--ok-text)") : pill("var(--warn-bg)", "var(--warn-text)"), note: st === "Verified" ? "" : "Usable from Nov 9, 2026 10:00. New destinations wait 24 hours (placeholder, editable in Settings)." }));
    out.destAdd = () => { this.setState({ destNew: (s.destNew || []).concat(["Bank ••••" + (2210 + (s.destNew || []).length)]) }); toast("Destination added. It can receive payouts after the 24-hour cooling-off."); };

    /* bell + feedback + workspace */
    const NT = [];
    if (acct !== "live") NT.push(["Verification", r.banTitle || "Verification", r.banNote || "", openKyb()]);
    all.filter(p => p.status === "Awaiting approval").forEach(p => NT.push(["Approvals", "Approval needed · " + p.id, xfmt(p.send, XCOR[p.corr].from) + " to " + party(p), go("xdetail", { xpSel: p.id })]));
    all.filter(p => p.status === "Awaiting funds").forEach(p => NT.push(["Quotes", "Quote expired · " + p.id, "We requote when funds land", go("xdetail", { xpSel: p.id })]));
    all.filter(p => p.status === "Failed").slice(0, 2).forEach(p => NT.push(["Payments", p.id + " failed", "Rejected by the receiving bank", go("xdetail", { xpSel: p.id })]));
    all.filter(p => p.status === "Settled").slice(0, 3).forEach(p => NT.push(["Payments", p.id + " delivered", xfmt(xcalc(p.corr, p.send, p.j).recv, XCOR[p.corr].to) + " to " + party(p), go("xdetail", { xpSel: p.id })]));
    if (failing) NT.push(["Webhooks", "Webhook failing · erp.acme.co", "18.2% errors in 24 h", go("devtools", { devTab: "webhooks", whSel: 1 })]);
    if (!E) { NT.push(["Partners", "Kampala Remit Hub sent its first payment", "Referral is live. Commission accrues from Aug.", go("partners", { ptTab: "refs" })]); NT.push(["Partners", "Mombasa Port Agents verified", "Referral passed business verification", go("partners", { ptTab: "refs" })]); NT.push(["Connect", "Payout failed · Kibera Agent Network", "KES 61,200 on Nov 6 · Roadmap module", go("connect", { cnSel: "acct_205", cnTab: "payouts" })]); NT.push(["Catalog", "Low stock · Solar lantern (case of 20)", "6 left. Selling stops at zero.", go("catalog", { catSel: "prod_705" })]); NT.push(["Catalog", "Product archived while a link is active", "Old carton size (50) · Wholesale link", go("catalog", { catSel: "prod_712" })]); NT.push(["Billing", "Charge failed · Thika Road Pharmacy", "Payer did not approve the prompt · Roadmap module", go("billing", { bsSel: "sub_3107" })]); }
    const rd = s.nRead || []; const nf = s.nFilter || "All";
    const unread = NT.filter(n => rd.indexOf(n[1]) < 0).length;
    out.bellCount = unread ? String(unread) : ""; out.bellHasCount = unread > 0;
    out.bellToggle = () => this.setState(Object.assign({}, close, { bellOpen: !s.bellOpen })); out.bellOpen = !!s.bellOpen;
    out.bellFilters = ["All", "Payments", "Approvals", "Quotes", "Verification", "Webhooks", "Partners", "Connect", "Billing"].map(f => ({ label: f, onClick: () => this.setState({ nFilter: f }), style: chipSt(nf === f).replace("padding: 6px 11px", "padding: 4px 9px") }));
    const NV = NT.filter(n => nf === "All" || n[0] === nf);
    out.bellItems = NV.map(([kind, title, note, act]) => ({ kind, title, note, dotStyle: "width: 8px; height: 8px; margin-top: 6px; flex-shrink: 0; border-radius: 999px; background: " + (rd.indexOf(title) < 0 ? "var(--indigo)" : "transparent"), onClick: () => { this.setState({ nRead: rd.concat([title]) }); act(); } }));
    out.bellEmpty = NV.length === 0;
    out.bellReadAll = () => this.setState({ nRead: NT.map(n => n[1]) });
    out.fbToggle = () => this.setState(Object.assign({}, close, { fbOpen: !s.fbOpen })); out.fbOpen = !!s.fbOpen;
    out.fbText = s.fbText || ""; out.setFbText = e => this.setState({ fbText: e.target.value });
    out.fbSend = () => { if (!(s.fbText || "").trim()) { toast("Write a line first"); return; } this.setState({ fbOpen: false, fbText: "" }); toast("Sent to the product team. Thank you."); };
    out.wsToggle = () => this.setState(Object.assign({}, close, { wsOpen: !s.wsOpen })); out.wsOpen = !!s.wsOpen;
    out.wsAdd = go("connect");

    /* settings */
    const stb = s.settingsTab || "identity";
    out.settingsTabs = [["identity", "Identity"], ["money", "Money"], ["methods", "Payment methods"], ["team", "Team and roles"], ["security", "Security"], ["alerts", "Notifications"], ["branding", "Branding"], ["fees", "Fee schedule"], ["data", "Data and exports"], ["compliance", "Compliance"], ["activity", "Activity log"]].map(([id, label]) => ({ label, onClick: () => this.setState({ settingsTab: id, settingsDirty: false }), style: "flex-shrink: 0; padding: 10px 12px; border: 0; border-bottom: 2px solid " + (stb === id ? "var(--indigo)" : "transparent") + "; background: transparent; cursor: pointer; font-size: 13px; white-space: nowrap; font-weight: " + (stb === id ? "700" : "500") + "; color: " + (stb === id ? "var(--ink)" : "var(--muted)") }));
    out.tabTeam = false; out.tabAlerts = false;
    ["team", "security", "alerts", "branding", "fees", "data"].forEach(t => { out["st_" + t] = V === "settings" && stb === t; });
    out.settingsDirty = !!s.settingsDirty && ["identity", "money", "methods", "alerts", "branding", "team", "security"].indexOf(stb) >= 0;
    out.markSettingsDirty = () => { if (!s.settingsDirty) this.setState({ settingsDirty: true }); };
    out.settingsBarClick = e => { const t = e.target && e.target.closest ? e.target.closest("button") : null; if (!t) return; this.setState({ settingsDirty: false }); toast(/save/i.test(t.textContent) ? "Changes saved. They apply to new payments only." : "Changes discarded"); };
    const ROLES = ["Owner", "Admin", "Finance", "Operations", "Developer", "Read-only"];
    out.roleHead = ROLES.map(x => ({ label: x }));
    out.permRows = [["View payments", [1, 1, 1, 1, 1, 1]], ["Create payments", [1, 1, 1, 1, 0, 0]], ["Approve payments", [1, 1, 1, 0, 0, 0]], ["Manage beneficiaries", [1, 1, 1, 1, 0, 0]], ["API keys and webhooks", [1, 1, 0, 0, 1, 0]], ["Manage team", [1, 1, 0, 0, 0, 0]], ["Change settings", [1, 1, 0, 0, 0, 0]]].map(([label, v]) => ({ label, cells: v.map(x => ({ mark: x ? "✓" : "–", style: "text-align: center; padding: 9px 8px; border-top: 1px solid var(--line); font-size: 13px; font-weight: 700; color: " + (x ? "var(--ok-text)" : "var(--faint)") })) }));
    out.members = (E ? [["Achieng Odhiambo", "achieng@acme.co", "Owner", "Active"]] : [["Achieng Odhiambo", "achieng@acme.co", "Owner", "Active"], ["Grace Wanjiru", "grace@acme.co", "Finance", "Active"], ["Brian Mutua", "brian@acme.co", "Operations", "Active"], ["Dev team", "dev@acme.co", "Developer", "Active"], ["Wanjiku Kamau", "wanjiku@acme.co", "Read-only", "Invite pending"]]).map(([name, email, role, st]) => ({ name, email, role, st, stStyle: st === "Active" ? pill("var(--ok-bg)", "var(--ok-text)") : pill("var(--warn-bg)", "var(--warn-text)") }));
    out.inviteMember = () => this.setState({ modal: "invite" });
    out.apprThr = s.apprThrTxt != null ? s.apprThrTxt : HOME.thr.toLocaleString("en-US");
    out.setApprThr = e => { const v = e.target.value; const n = Number(v.replace(/[^0-9]/g, "")); this.setState({ apprThrTxt: v, apprThreshold: n || 1e6, settingsDirty: true }); };
    out.apprWho = s.apprWho || "Owner"; out.setApprWho = e => this.setState({ apprWho: e.target.value, settingsDirty: true });
    out.apprBulkLabel = s.apprBulk === false ? "Off" : "On"; out.apprBulkToggle = () => this.setState({ apprBulk: s.apprBulk === false, settingsDirty: true });
    out.apprBulkTrack = "position: relative; width: 34px; height: 20px; flex-shrink: 0; border-radius: 999px; background: " + (s.apprBulk === false ? "var(--border-strong)" : "var(--indigo)");
    out.apprBulkKnob = "position: absolute; top: 2px; left: " + (s.apprBulk === false ? "2px" : "16px") + "; width: 16px; height: 16px; border-radius: 999px; background: #fff";
    const rm = s.sessRemoved || [];
    out.sessions = [["Chrome on macOS", "Nairobi · 41.90.64.12", "This device"], ["Safari on iPhone", "Nairobi · 102.68.12.17", "2 hours ago"], ["Firefox on Windows", "Mombasa · 196.201.214.9", "Nov 3"]].filter(x => rm.indexOf(x[0]) < 0).map(([dev, where, when]) => ({ dev, where, when, canRemove: when !== "This device", remove: () => { this.setState({ sessRemoved: rm.concat([dev]) }); toast(dev + " signed out"); } }));
    out.logins = [["Nov 8, 08:41", "Chrome on macOS", "Success"], ["Nov 7, 21:03", "Safari on iPhone", "Success"], ["Nov 7, 20:59", "Unknown device · Lagos", "Blocked: wrong password, 3 attempts"], ["Nov 6, 09:12", "Chrome on macOS", "Success"]].map(([when, dev, res]) => ({ when, dev, res, resStyle: "font-size: 12px; font-weight: 600; color: " + (res === "Success" ? "var(--ok-text)" : "var(--bad-text)") }));
    out.passkeyAdd = () => toast("Passkey added for this device");
    const NOTE = s.notif || {};
    out.notifRows = ["Payment delivered", "Payment failed", "Approval needed", "Quote expiring", "Verification update", "Webhook failing", "Payouts paused"].map(ev => ({ ev, cells: ["email", "app"].map(ch => { const key = ev + ":" + ch; const on = NOTE[key] !== false; return { label: on ? "On" : "Off", style: chipSt(on).replace("padding: 6px 11px", "padding: 4px 10px"), onClick: () => this.setState({ notif: Object.assign({}, NOTE, { [key]: !on }), settingsDirty: true }) }; }) }));
    const bc = s.brandColor || "#4339ca";
    out.brandSwatches = ["#4339ca", "#0f766e", "#b45309", "#be123c"].map(c => ({ style: "width: 30px; height: 30px; border-radius: 8px; cursor: pointer; background: " + c + "; border: 2px solid " + (bc === c ? "var(--ink)" : "transparent") + "; box-shadow: 0 0 0 2px var(--panel) inset", onClick: () => this.setState({ brandColor: c, settingsDirty: true }) }));
    out.brandName = s.brandName != null ? s.brandName : "Acme Commerce"; out.setBrandName = e => this.setState({ brandName: e.target.value, settingsDirty: true });
    out.brandSupport = s.brandSupport != null ? s.brandSupport : "support@acme.co"; out.setBrandSupport = e => this.setState({ brandSupport: e.target.value, settingsDirty: true });
    out.brandMark = (out.brandName || "A").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    out.brandMarkStyle = "width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; color: #fff; font-size: 11.5px; font-weight: 800; background: " + bc;
    out.brandPayStyle = "display: block; text-align: center; padding: 11px; border-radius: 10px; color: #fff; font-size: 13px; font-weight: 700; background: " + bc;
    out.dataExports = [["All transactions", "CSV · every money event since you joined"], ["Statements", "PDF · one per currency per month"], ["Audit log", "CSV · every sign-in, approval and settings change"], ["Beneficiaries and customers", "CSV"]].map(([label, note]) => ({ label, note, run: () => toast(label + " export started. We email a download link to achieng@acme.co.") }));

    /* reference: quickstart + try it */
    out.refQuick = [["Authenticate", "curl https://api.elementpay.net/v1/balances \\\n  -H \"Authorization: Bearer $EP_SECRET_KEY\""], ["Create a quote", "curl https://api.elementpay.net/v1/quotes \\\n  -H \"Authorization: Bearer $EP_SECRET_KEY\" \\\n  -d corridor=KES-CNY -d send_amount=500000"], ["Create an order", "curl https://api.elementpay.net/v1/orders \\\n  -H \"Authorization: Bearer $EP_SECRET_KEY\" \\\n  -H \"Idempotency-Key: acme-po-5521\" \\\n  -d quote_id=Q-24120-A -d beneficiary_id=ben_01"], ["Get status", "curl https://api.elementpay.net/v1/orders/XB-24120 \\\n  -H \"Authorization: Bearer $EP_SECRET_KEY\""]].map(([title, code]) => ({ title, code, copy: () => { try { navigator.clipboard.writeText(code); } catch (e) {} toast(title + " copied"); } }));
    out.tryCorr = s.tryCorr || "KE-CN"; out.setTryCorr = e => this.setState({ tryCorr: e.target.value, tryRes: "" });
    out.tryAmt = s.tryAmt || "500000"; out.setTryAmt = e => this.setState({ tryAmt: e.target.value, tryRes: "" });
    out.tryRes = s.tryRes || "Send the request to see a firm quote."; 
    out.trySend = () => { const amt = Number(String(s.tryAmt || "500000").replace(/[^0-9.]/g, "")) || 0; const cid = s.tryCorr || "KE-CN"; const k = xcalc(cid, amt, 0); this.setState({ tryRes: "200 OK · 128 ms\n\n" + JSON.stringify({ id: "Q-" + Math.floor(24120 + Math.random() * 80) + "-A", corridor: k.c.from + "-" + k.c.to, send_amount: amt, send_currency: k.c.from, rate: Number(k.rate.toPrecision(6)), mid_market_rate: k.c.mid, spread_pct: k.sp, fee: k.fee, receive_amount: Math.round(k.recv * 100) / 100, receive_currency: k.c.to, expires_in: 30, status: k.c.tag === "Live" ? "live" : "pilot" }, null, 2) }); };

    /* bulk gating */
    const bs = s.bulkStage || "start";
    if (!payOk && (bs === "validated" || bs === "approved")) { out.bulkCtaStyle = btn1(true); out.bulkCtaAct = () => toast(blockMsg); out.bulkNote = blockMsg + ". You can upload and validate a file. Sending opens " + (acct === "paused" ? "when payouts resume." : "after verification, or in sandbox."); }


    /* wallets v2 + tx v2 + reports + settings */
    const segS = on => "padding: 6px 11px; border: 0; border-radius: 7px; cursor: pointer; white-space: nowrap; font-size: 12.5px; font-weight: " + (on ? "700" : "600") + "; background: " + (on ? "var(--panel)" : "transparent") + "; color: " + (on ? "var(--ink)" : "var(--muted)") + (on ? "; box-shadow: 0 1px 2px rgba(20,24,28,0.12)" : "");
    out.txViews = out.txViews.map(v => Object.assign({}, v, { seg: segS(v.style.indexOf("var(--indigo-text)") >= 0) }));
    out.txTypes = out.txTypes.map(t => Object.assign({}, t, { value: t.label }));
    out.txTypeVal = s.txType || "All"; out.setTxTypeSel = e => this.setState({ txType: e.target.value, txView: "all" });
    out.txRangeVal = s.txRange || "Last 30 days"; out.setTxRangeSel = e => this.setState({ txRange: e.target.value });
    const nF = ["txStatus", "txDir", "txCur", "txCorr", "txMethod"].filter(k2 => s[k2] && s[k2] !== "Any").length;
    out.txFiltOpen = !!s.txFiltOpen; out.txFiltToggle = () => this.setState({ txFiltOpen: !s.txFiltOpen });
    out.txFiltLabel = "Filters" + (nF ? " · " + nF : ""); out.txFiltStyle = chipSt(!!s.txFiltOpen || nF > 0).replace("padding: 6px 11px", "padding: 7px 12px; border-radius: 8px");
    out.txCorrOpts = ["Any"].concat(Object.keys(XCOR).map(k2 => XCOR[k2].name)).map(label => ({ label }));
    const hk = v => xfmt(v, HOME.cur);
    const coins = [["USDC", "Base", 48204.18, "0x8335a9f2c41b7d0e6a3c15f7b2e94d1c8a7e0913"], ["USDC", "Stellar", 20292.55 - ((s.xDebit || {}).USDC || 0), "GBEPX4Q2ZL6TQK3N7WDRVHJ5Y2C4M8A1F9S0E6U3P7BKM7QXK"], ["USDT", "Polygon", 3858.4, "0x1c9a77e3d0b4f2a5c6e81d9b3f07a24c5e6d44f0"]];
    const fiats = (out.fiatRows || []);
    const totK = (zero ? 0 : bal.KES) + coins.reduce((t, c) => t + (zero ? 0 : c[2]) * XUSD[HOME.cur], 0);
    out.wTotal = hk(totK); out.wTotalNote = HOME.cur + " equivalent across " + (fiats.length + coins.length) + " accounts";
    const flagI = c => "display: inline-block; flex-shrink: 0; width: 26px; height: 18px; border-radius: 4px; box-shadow: 0 0 0 1px rgba(20,24,28,0.1); background: center/cover no-repeat var(--surface); background-image: url(/flags/flag-" + c + ".svg)";
    const coinI = a => "display: inline-grid; place-items: center; flex-shrink: 0; width: 26px; height: 26px; border-radius: 999px; color: #fff; font-size: 10px; font-weight: 800; background: " + (a === "USDT" ? "#26a17b" : "#2775ca");
    out.acctRows = fiats.map((f, i) => ({ title: f.cur, sub: f.name, icon: f.flag.replace("width: 20px; height: 14px", "width: 26px; height: 18px"), iconTx: "", avail: f.avail, inc: f.inc, held: f.held, tag: f.tag, tagStyle: f.tagStyle, open: () => this.setState({ coinSel: "f" + i }) })).concat(coins.map((c, i) => ({ title: c[0] + " · " + c[1], sub: c[3].slice(0, 6) + "…" + c[3].slice(-5), icon: coinI(c[0]), iconTx: c[0] === "USDT" ? "₮" : "$", avail: xfmt(zero ? 0 : c[2], c[0]), inc: xfmt(0, c[0]), held: xfmt(0, c[0]), tag: sbx ? "Sandbox" : "Live", tagStyle: pill(sbx ? "var(--surface)" : "var(--ok-bg)", sbx ? "var(--muted)" : "var(--ok-text)"), open: () => this.setState({ coinSel: "c" + i }) })));
    const cs = s.coinSel;
    out.coinOpen = !!cs; out.coinClose = () => this.setState({ coinSel: null });
    if (cs) {
      const isC = cs[0] === "c"; const idx = +cs.slice(1);
      if (isC) { const c = coins[idx] || coins[0]; out.coin = { isCoin: true, title: c[0] + " · " + c[1], sub: "Stablecoin wallet", icon: coinI(c[0]), iconTx: c[0] === "USDT" ? "₮" : "$", avail: xfmt(zero ? 0 : c[2], c[0]), chain: c[1], asset: c[0], addrFull: c[3] };
        let sd = idx * 13 + 5; const rn = () => { sd = (sd * 9301 + 49297) % 233280; return sd / 233280; };
        out.coinQr = Array.from({ length: 289 }, (_, i) => { const x = i % 17, y = Math.floor(i / 17); const fin = (a, b) => x >= a && x < a + 5 && y >= b && y < b + 5 && (x === a || x === a + 4 || y === b || y === b + 4 || (x === a + 2 && y === b + 2)); const inF = (a, b) => x >= a && x < a + 5 && y >= b && y < b + 5; const on = fin(0, 0) || fin(12, 0) || fin(0, 12) || (!inF(0, 0) && !inF(12, 0) && !inF(0, 12) && rn() > 0.52); return { style: "display: block; aspect-ratio: 1; background: " + (on ? "#1f2226" : "transparent") }; });
        out.coinActs = [["Copy address", () => { try { navigator.clipboard.writeText(c[3]); } catch (e) {} toast("Address copied. " + c[0] + " on " + c[1] + " only."); }, false], ["Cash out to " + HOME.cur, () => { this.setState({ coinSel: null }); out.wWithdraw(); }, !payOk], ["Convert from " + HOME.cur, () => { this.setState({ coinSel: null }); if (payOk) this.xOpenWiz({ step: 2, dir: "convert", corr: "KE-USDC" }); else toast(blockMsg); }, !payOk]].map(([label, fn, dis]) => ({ label, onClick: fn, style: btn2(dis) }));
        const mv = LG.filter(e => e.cur === "USDC").slice(0, 6);
        const off = (zero ? 0 : c[2]) - (mv.length ? mv[0].after : 0);
        out.coinMoves = (c[1] === "Stellar" ? mv : []).map(e => ({ desc: e.desc, date: e.date + ", " + e.time, amt: (e.amt > 0 ? "+ " : "− ") + xfmt(Math.abs(e.amt), "USDC"), after: xfmt(Math.max(0, e.after + off), "USDC") }));
        if (c[1] !== "Stellar" && !zero) out.coinMoves = [{ desc: "Deposit from 0x4a1f…9c3e", date: "Nov 5, 14:12", amt: "+ " + xfmt(c[2] * 0.12, c[0]), after: xfmt(c[2], c[0]) }, { desc: "Conversion to " + HOME.cur, date: "Oct 28, 10:40", amt: "− " + xfmt(c[2] * 0.08, c[0]), after: xfmt(c[2] * 0.88, c[0]) }];
      } else { const f = fiats[idx] || fiats[0] || {}; out.coin = { isCoin: false, title: f.cur, sub: f.name + " · " + f.tag, icon: (f.flag || "").replace("width: 20px; height: 14px", "width: 26px; height: 18px"), iconTx: "", avail: f.avail };
        out.coinActs = [["Statement", f.stmt, false], ["Proof of funds", f.pof, false], ["Top up", out.wTopUp, !inOk]].map(([label, fn, dis]) => ({ label, onClick: fn || (() => {}), style: btn2(dis) }));
        out.coinMoves = LG.filter(e => e.cur === f.cur).slice(0, 6).map(e => ({ desc: e.desc, date: e.date + ", " + e.time, amt: e.amt ? (e.amt > 0 ? "+ " : "− ") + xfmt(Math.abs(e.amt), e.cur) : "Not moved", after: xfmt(e.after, e.cur) }));
      }
      out.coinMovesEmpty = !(out.coinMoves || []).length;
    }
    out.lgMonthVal = s.lgMonth || "Nov"; out.setLgMonth = e => this.setState({ lgMonth: e.target.value });
    out.lgCurVal = s.lgCur || "All"; out.setLgCur = e => this.setState({ lgCur: e.target.value });
    out.lgTypes = out.lgTypes.map(t => Object.assign({}, t, { seg: segS(t.style.indexOf("var(--indigo-text)") >= 0) }));
    const rt = s.repTab || "list";
    out.repTabs = [["list", "Reports"], ["rec", "Reconciliation"], ["perf", "Performance"], ["fee", "Fee schedule"]].map(([k2, l]) => ({ label: l, seg: segS(rt === k2), onClick: () => this.setState({ repTab: k2 }) }));
    ["list", "rec", "perf", "fee"].forEach(k2 => { out["rep_" + k2] = rt === k2; });
    const sgroups = [["Business", [["identity", "Identity"], ["branding", "Branding"]]], ["Money", [["money", "Money"], ["methods", "Payment methods"], ["fees", "Fee schedule"]]], ["Access", [["team", "Team and roles"], ["security", "Security"]]], ["Records", [["alerts", "Notifications"], ["compliance", "Compliance"], ["data", "Data and exports"], ["activity", "Activity log"]]]];
    const stb2 = s.settingsTab || "identity";
    out.settingsTabs = []; sgroups.forEach(([g, items]) => { out.settingsTabs.push({ isHead: true, isTab: false, head: g }); items.forEach(([id, label]) => out.settingsTabs.push({ isHead: false, isTab: true, label, onClick: () => this.setState({ settingsTab: id, settingsDirty: false }), style: "display: block; width: 100%; text-align: left; flex-shrink: 0; padding: 8px 12px; border: 0; border-radius: 8px; cursor: pointer; white-space: nowrap; font-size: 13px; font-weight: " + (stb2 === id ? "700" : "500") + "; background: " + (stb2 === id ? "var(--surface)" : "transparent") + "; color: " + (stb2 === id ? "var(--ink)" : "var(--muted)") })); });
    /* titles */
    const T2 = { transactions: ["Transactions", "Export CSV", out.txExport], wallets: ["Wallets", "Top up", out.wTopUp], keys: ["Developers", null], devtools: ["Developers", null], bendetail: [out.isBenD ? allBens[s.benSel].name : "Beneficiary", "", null] }[V];
    if (T2) { out.viewTitle = T2[0]; if (T2[1] !== null) { out.hasHeaderAction = !!T2[2]; out.headerActionLabel = T2[1]; out.headerAction = T2[2] || noop; } }
    return out;
  }

  xVals(r) {
    const s = this.state;
    const V = s.view;
    const out = {};
    const go = (view, extra) => () => this.setState(Object.assign({ view, palette: false, gsMenu: false, demoMenu: false }, extra || {}));
    const pill = (bg, fg) => "display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; background: " + bg + "; color: " + fg;
    const tagSt = t => t === "Live" ? pill("var(--ok-bg)", "var(--ok-text)") : pill("var(--surface)", "var(--muted)");
    const flagSt = c => c === "usdc"
      ? "display: inline-grid; place-items: center; flex-shrink: 0; width: 20px; height: 14px; border-radius: 3px; background: #2775ca; color: #fff; font-size: 9px; font-weight: 800; line-height: 1"
      : "display: inline-block; flex-shrink: 0; width: 20px; height: 14px; border-radius: 3px; box-shadow: 0 0 0 1px rgba(20,24,28,0.1); background: center/cover no-repeat var(--surface); background-image: url(/flags/flag-" + c + ".svg)";
    const flagTx = c => c === "usdc" ? "$" : "";
    const MONO = "font-family: 'JetBrains Mono', ui-monospace, monospace; ";
    const kv = (label, value, mono, strong) => ({ label, value: String(value), vStyle: (mono ? MONO + "white-space: nowrap; " : "") + "font-size: " + (mono ? "12.5px" : "13px") + "; text-align: right; overflow-wrap: anywhere; font-weight: " + (strong ? "700" : "600") + "; color: var(--ink)" });
    const tabSt = on => "display: inline-flex; align-items: center; gap: 7px; padding: 7px 11px; border-radius: 8px; cursor: pointer; white-space: nowrap; font-size: 12.5px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    const cntSt = on => "font-size: 11px; font-weight: 700; padding: 1px 6px; border-radius: 999px; background: " + (on ? "rgba(67,57,202,0.14)" : "var(--surface)") + "; color: " + (on ? "var(--indigo-text)" : "var(--muted)");
    const toast = m => this.xToast(m);
    const toK = (n, c) => n / XUSD[c] * XUSD[HOME.cur];
    const kes = n => HOME.cur + " " + Math.round(n).toLocaleString("en-US");
    const kesM = n => Math.abs(n) >= 1e6 ? HOME.cur + " " + (n / 1e6).toFixed(2) + "M" : kes(n);
    const btn1 = dis => "padding: 10px 15px; border-radius: 8px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 13px; font-weight: 700; white-space: nowrap; " + (dis ? "opacity: 0.45; cursor: not-allowed" : "cursor: pointer");
    const cardSt = (on, dis) => "display: flex; flex-direction: column; align-items: flex-start; gap: 4px; width: 100%; padding: 13px 14px; border-radius: 10px; text-align: left; color: var(--ink); cursor: " + (dis ? "not-allowed; opacity: 0.5" : "pointer") + "; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + (on ? "; box-shadow: 0 0 0 1px var(--indigo) inset" : "");
    const chipSt = on => "white-space: nowrap; display: inline-flex; align-items: center; gap: 7px; padding: 7px 11px; border-radius: 999px; cursor: pointer; font-size: 12.5px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    const dotSt = (kind, pulse) => "width: 14px; height: 14px; margin-top: 2px; flex-shrink: 0; border-radius: 999px; box-sizing: border-box; " +
      (kind === "done" ? "background: var(--indigo)" : kind === "fail" ? "background: var(--bad-text)" : kind === "hold" ? "background: var(--warn-text)" : kind === "ok" ? "background: var(--ok-text)" : kind === "cur" ? "background: var(--panel); border: 2px solid var(--indigo)" : "background: var(--panel); border: 2px solid var(--border-strong)") +
      (pulse ? "; animation: ep-pulse 1.6s ease-in-out infinite" : "");
    const legLbl = (strong, faint) => "font-size: 13px; font-weight: " + (strong ? "700" : "500") + "; color: " + (faint ? "var(--faint)" : "var(--ink)");
    const acct = s.acct || "live";
    const blocked = acct !== "live" && !s.demoSandbox;

    /* nav */
    [["Xb", "xborder", ""], ["Bens", "bens", ""], ["Bulk", "bulk", ""], ["Rem", "remitters", ""], ["Reports", "reports", ""], ["Dev", "devtools", (s.replayed || {}).all ? "" : "1"], ["Partners", "partners", ""], ["Connect", "connect", "Roadmap"], ["Billing", "billing", "Roadmap"]].forEach(([k, id, b]) => {
      const on = V === id || (id === "xborder" && V === "xdetail");
      const alert = b === "1";
      out["nav" + k + "Click"] = go(id);
      out["nav" + k + "Style"] = this.navBtn(on, false, false);
      out["nav" + k + "Current"] = on ? "page" : "false";
      out["nav" + k + "Badge"] = b;
      out["nav" + k + "BadgeStyle"] = "margin-left: auto; font-size: 10.5px; font-weight: 700; padding: " + (b ? "2px 7px" : "0") + "; border-radius: 999px; background: " + (alert ? "var(--bad-bg)" : b ? "var(--surface)" : "transparent") + "; color: " + (alert ? "var(--bad-text)" : on ? "var(--indigo-text)" : "var(--rail-dim)");
    });

    /* KYB completeness */
    const kd = s.kyb || KYB0; const people = s.kybPeople || []; const docs = s.kybDocs || [];
    const stOv = ["live", "paused", "review"].indexOf(acct) >= 0;
    const c1 = stOv || (acct !== "rejected" && !!(kd.legalName && kd.regNo && kd.country && (kd.corr || []).length));
    const c2 = stOv || (people.length > 0 && people.every(p => p.name && p.idNo));
    const c3 = stOv || docs.every(d => d.status !== "Missing" && d.status !== "Rejected");
    const c4 = stOv || acct === "moreinfo" || acct === "rejected" || s.kybId === "done";
    const kybDone = [c1, c2, c3, c4].filter(Boolean).length;
    const openKyb = st => () => this.setState({ kybOpen: true, kybStage: st || s.kybStage || 1, palette: false, gsMenu: false, demoMenu: false });
    out.openKyb = openKyb();
    out.navKybClick = openKyb(acct === "moreinfo" ? 3 : null);
    out.navKybStyle = this.navBtn(false, true, false);
    const verified = acct === "live" || acct === "paused";
    out.navKybBadge = verified ? "Verified" : acct === "review" ? "In review" : acct === "rejected" ? "Rejected" : acct === "moreinfo" ? "Action needed" : kybDone + " of 4";
    out.navKybBadgeStyle = "margin-left: auto; font-size: 10.5px; font-weight: 700; padding: 2px 7px; border-radius: 999px; background: " + (verified ? "var(--ok-bg)" : acct === "review" ? "var(--surface)" : acct === "rejected" ? "var(--bad-bg)" : "var(--warn-bg)") + "; color: " + (verified ? "var(--ok-text)" : acct === "review" ? "var(--muted)" : acct === "rejected" ? "var(--bad-text)" : "var(--warn-text)");

    /* payments */
    const allBens = XBENS.concat(s.benNew || []);
    const party = p => typeof p.party === "number" ? (allBens[p.party] || {}).name : p.party === "own" ? (p.corr === "USDC-KE" ? "Acme Commerce Ltd · bank ••••8841" : "Acme Commerce Ltd · USDC wallet") : XREM[+p.party.slice(1)].name;
    const dirOf = p => typeof p.party === "number" ? (p.corr === "LOCAL" ? "Local payout" : "Supplier payment") : p.party === "own" ? (p.corr === "USDC-KE" ? "Withdrawal" : "Conversion") : "Collection";
    const over = s.xpOver || {};
    const sbx = !!s.demoSandbox; const liveOk = acct === "live" || acct === "paused";
    const baseList = s.xEmpty ? [] : sbx ? XPAY.slice(0, 14).map(p => Object.assign({}, p, { id: p.id.replace("XB", "XT"), send: Math.round(p.send / 10) })) : liveOk ? XPAY : [];
    const scope = s.scope || "both";
    const all = (s.xpNew || []).filter(p => !!p.sbx === sbx).concat(baseList).map(p => over[p.id] ? Object.assign({}, p, { status: over[p.id] }) : p).filter(p => scope === "both" || (scope === "local" ? p.corr === "LOCAL" || p.party === "own" : p.corr !== "LOCAL"));
    out.__all = all; out.__party = party; out.__bens = allBens;
    const row = p => {
      const k = xcalc(p.corr, p.send, p.j); const st = XST[p.status];
      return { id: p.id, when: p.date + ", " + p.time, party: party(p), dir: dirOf(p), fromFlag: flagSt(k.c.fc), fromTx: flagTx(k.c.fc), toFlag: flagSt(k.c.tc), toTx: flagTx(k.c.tc), pair: k.c.from + " → " + k.c.to,
        sent: xfmt(p.send, k.c.from), recv: xfmt(k.recv, k.c.to), rate: xrate(k.rate), fee: xfmt(k.fee, k.c.from), rail: k.c.rail, status: p.status, icon: st.icon, pillStyle: pill(st.bg, st.fg), open: go("xdetail", { xpSel: p.id }) };
    };
    const ORDER = ["All", "Awaiting approval", "Awaiting funds", "Converting", "Settling", "Settled", "Failed", "Refunded", "On hold"];
    const flt = s.xpFilter || "All"; const q = (s.xpQ || "").trim().toLowerCase();
    const vis = all.filter(p => (flt === "All" || p.status === flt) && (!q || (p.id + " " + party(p) + " " + XCOR[p.corr].from + " " + XCOR[p.corr].to).toLowerCase().includes(q)));
    out.xpTabs = ORDER.map(t => { const on = t === flt; return { label: t, count: t === "All" ? all.length : all.filter(p => p.status === t).length, onClick: () => this.setState({ xpFilter: t }), style: tabSt(on), countStyle: cntSt(on) }; });
    out.xpQ = s.xpQ || ""; out.setXpQ = e => this.setState({ xpQ: e.target.value });
    out.xpRows = vis.map(row); out.__row = row; out.xpHasRows = vis.length > 0; out.xpEmpty = vis.length === 0;
    out.xpEmptyTitle = all.length ? "No payments match" : "No payments yet";
    out.xpEmptyNote = all.length ? "Clear the search or pick another status." : "Pay a supplier abroad or convert between balances. Each payment shows its quote, settlement legs and proof of payment.";
    out.xpEmptyCta = all.length ? "Clear filters" : "New payment";
    out.xpEmptyAct = all.length ? () => this.setState({ xpFilter: "All", xpQ: "" }) : () => this.xOpenWiz();
    out.xpFooter = vis.length + " of " + all.length + " payments";
    out.xpExport = () => toast("payments-abroad-nov-2026.csv exported · " + vis.length + " rows");
    out.isXb = V === "xborder";

    /* detail */
    const sel = all.find(p => p.id === s.xpSel) || all[0] || null;
    out.isXd = V === "xdetail" && !!sel;
    out.xd = {}; out.xdLegs = []; out.xdAmounts = []; out.xdFx = []; out.xdParties = []; out.xdRefs = []; out.xdAudit = []; out.popRows = [];
    if (sel) {
      const k = xcalc(sel.corr, sel.send, sel.j); const c = k.c; const st = XST[sel.status];
      const hm = sel.time.split(":").map(Number);
      const at = m => { const t = hm[0] * 60 + hm[1] + m; return String(Math.floor(t / 60) % 24).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0"); };
      const off = sel.corr === "KE-CN" ? [0, 3, 5, 34, 37] : [0, 3, 5, 9, 12];
      const reach = { "Awaiting approval": 1, "Awaiting funds": 1, "On hold": 1, "Converting": 2, "Settling": 3, "Settled": 5, "Failed": 3, "Refunded": 3 }[sel.status];
      const failAt = sel.status === "Failed" || sel.status === "Refunded" ? 3 : -1;
      const holdAt = sel.status === "On hold" || sel.status === "Awaiting approval" ? 1 : -1;
      const isCol = typeof sel.party === "string" && sel.party[0] === "r";
      const legNames = [isCol ? "Paid by remitter" : "Created, quote locked", "Funds received", c.from === "USDC" || c.to === "USDC" ? "Converted" : "Converted via USDC", isCol ? "Credited to KES balance" : "Paid out on " + c.rail, isCol ? "Available to spend" : "Delivered to beneficiary"];
      out.xdLegs = legNames.map((label, i) => {
        const done = i < reach && i !== failAt; const fail = i === failAt; const hold = i === holdAt; const cur = i === reach && reach < 5 && !fail && !hold;
        const after = failAt >= 0 && i > failAt;
        return { label, time: done || fail || hold ? at(off[i]) : "",
          note: fail ? "Rejected by the receiving bank: account closed." : hold ? (sel.status === "On hold" ? "On hold. Purpose of payment document requested." : "Waiting for the second approver.") : cur ? "In progress" : after ? "Not reached" : "",
          dotStyle: dotSt(fail ? "fail" : hold ? "hold" : done ? "done" : cur ? "cur" : "todo", cur), labelStyle: legLbl(done || cur || fail || hold, i > reach || after) };
      });
      if (sel.status === "Refunded") out.xdLegs.push({ label: "Refunded to balance", time: at(off[3] + 6), note: xfmt(sel.send, c.from) + " returned, fee waived", dotStyle: dotSt("ok"), labelStyle: legLbl(true) });
      if (sel.status === "Failed") out.xdLegs.push({ label: "Refund to balance", time: "", note: "In progress. Lands within 1 hour.", dotStyle: dotSt("cur", true), labelStyle: legLbl(true) });
      const usdc = k.recv / XUSD[c.to];
      out.xdAmounts = [kv("Sent", xfmt(sel.send, c.from), true, true), kv("Fee", "− " + xfmt(k.fee, c.from), true), kv("Converted", c.from === "USDC" || c.to === "USDC" ? "Direct" : xfmt(usdc, "USDC"), true), kv("Received", xfmt(k.recv, c.to), true, true)];
      out.xdFx = [kv("Our rate", "1 " + c.from + " = " + xrate(k.rate) + " " + c.to, true, true), kv("Mid-market reference", xrate(c.mid), true), kv("Spread", (k.spread * 100).toFixed(2) + "% · " + xfmt(k.spreadCost, c.from), true), kv("Rate locked", sel.date + ", " + sel.time + " for 30 s", true), kv("Transfer fee", "0.50% + " + xfmt(c.flat, c.from), true), kv("Total cost", xfmt(k.fee + k.spreadCost, c.from), true, true)];
      const ben = typeof sel.party === "number" ? allBens[sel.party] : null;
      out.xdParties = [kv("Remitter", isCol ? party(sel) : "Acme Commerce Ltd, " + HOME.city), kv("Beneficiary", isCol ? "Acme Commerce Ltd · " + HOME.cur + " balance" : party(sel)), kv("Account", ben ? ben.rail + " · " + ben.acct : isCol ? HOME.cur + " balance" : sel.corr === "USDC-KE" ? "Bank ••••8841" : "USDC wallet, Stellar", true), kv("Corridor", c.name + " · " + c.tag), kv("Purpose code", ben ? "GDS · Payment for goods" : isCol ? "Customer payment" : "Own-account transfer"), kv("Value date", sel.date + ", 2026")];
      const n = sel.id.replace(/\D/g, "");
      out.xdRefs = [kv("Payment ID", sel.id, true), kv("Quote ID", "Q-" + n + "-A", true), kv("Idempotency key", "idem_" + n + "f3a9c1", true)];
      if (reach >= 2 || failAt >= 0) out.xdRefs.push(kv("On-chain tx", "a3f9" + n + "…c21e", true));
      const mp = c.rail.indexOf("M-Pesa") >= 0;
      if (reach >= 4) out.xdRefs.push(kv(mp ? "M-Pesa receipt" : "Bank reference", mp ? "SKF" + n + "QL" : (c.to === "CNY" ? "CNAPS" : c.to === "GBP" ? "FPS" : c.to === "EUR" ? "SEPA" : "NIP") + "-1107-" + n, true));
      out.xdTxShow = reach >= 2 || failAt >= 0;
      let aud = isCol ? [[0, "System", "Payment link paid by " + party(sel)]] : [[0, "Grace Wanjiru · Finance", "Created payment and locked quote"], [1, "Grace Wanjiru · Finance", "Approved with PIN"]];
      if (!isCol && toK(sel.send, c.from) > 1e6) aud.push([2, "Achieng Odhiambo · Owner", "Second approval, above KES 1,000,000"]);
      if (reach >= 2 || holdAt >= 0) aud.push([off[1], "System", "Funds matched to reference EP-" + sel.id]);
      if (holdAt >= 0) aud.push([off[1] + 1, "Compliance", "Requested commercial invoice"]);
      if (over[sel.id] && sel.status !== "On hold" && sel.id === "XB-24114") aud.push([off[1] + 40, "Grace Wanjiru · Finance", "Uploaded INV-0931.pdf, hold released"]);
      if (failAt >= 0) aud.push([off[3], "System", "Payout rejected, refund started"]);
      if (reach >= 5) aud.push([off[4], "System", "Delivery confirmed, proof of payment issued"]);
      out.xdAudit = aud.map(([m, who, what]) => ({ time: at(m), who, what }));
      out.xd = { id: sel.id, status: sel.status, icon: st.icon, pillStyle: pill(st.bg, st.fg), tag: c.tag, tagStyle: tagSt(c.tag), stNote: st.note, recv: xfmt(k.recv, c.to), sent: xfmt(sel.send, c.from), party: isCol ? "Acme Commerce Ltd" : party(sel), pairLong: c.name, when: sel.date + ", 2026 · " + sel.time + " EAT", popCta: sel.status === "Settled" ? "Download proof of payment" : "Download payment advice" };
      out.xdHold = sel.status === "On hold"; out.xdFail = sel.status === "Failed";
      out.xdFailNote = xfmt(sel.send, c.from) + " is on its way back to your balance. Update the beneficiary's account, then repeat the payment.";
      out.popTitle = sel.status === "Settled" ? "Proof of payment" : "Payment advice";
      out.popSub = sel.status === "Settled" ? "Funds delivered to the beneficiary account below." : "Issued before delivery. Status at time of issue: " + sel.status + ".";
      out.popRows = [kv("Payment ID", sel.id, true), kv("Status", sel.status)].concat(out.xdParties, [kv("Amount sent", xfmt(sel.send, c.from), true, true), kv("FX rate", "1 " + c.from + " = " + xrate(k.rate) + " " + c.to, true), kv("Fees", xfmt(k.fee, c.from), true), kv("Amount received", xfmt(k.recv, c.to), true, true)], out.xdRefs.slice(3));
      out.xdResolve = () => { this.setState(st => ({ xpOver: Object.assign({}, st.xpOver, { [sel.id]: "Converting" }) })); toast("INV-0931.pdf uploaded. Hold released, converting now."); };
      out.xdRepeat = () => this.xOpenWiz({ step: 3, dir: isCol ? "pay" : sel.corr === "LOCAL" ? "local" : sel.party === "own" ? (sel.corr === "USDC-KE" ? "withdraw" : "convert") : "pay", corr: isCol ? "KE-CN" : sel.corr, amt: sel.send.toLocaleString("en-US"), ben: typeof sel.party === "number" ? sel.party : null });
      out.xdDispute = () => toast("Dispute opened for " + sel.id + ". Support will contact you by email.");
    }
    out.xdBack = go("xborder");
    out.xdPop = () => this.setState({ popOpen: true });
    out.popShow = !!s.popOpen && !!sel;
    out.popClose = () => this.setState({ popOpen: false });
    out.popPrint = () => window.print();
    out.popEmail = () => toast("Sent to finance@acme.co and the beneficiary's email on file");
    out.xdEditBen = go("bens");

    /* wizard */
    const W = s.wiz;
    out.wizOpen = !!W;
    const DIRS = [
      { id: "local", label: "Pay someone in " + HOME.country, note: LOCALRAIL[HOME.cur] + " in " + HOME.country, corrs: ["LOCAL"] },
      { id: "pay", label: "Pay a supplier abroad", note: HOME.cur + " out to a bank or wallet in another country", corrs: ["KE-CN", "KE-GB", "KE-EU", "KE-NG", "KE-TZ"] },
      { id: "collect", label: "Collect from a customer abroad", note: "Send a payment link. They pay in their currency.", corrs: [] },
      { id: "convert", label: "Convert", note: HOME.cur + " to USDC at a firm rate", corrs: ["KE-USDC"] },
      { id: "withdraw", label: "Withdraw", note: "USDC to your " + HOME.cur + " account or mobile money", corrs: ["USDC-KE"] }
    ].filter(d => (s.scope || "both") === "both" || ((s.scope === "local") ? ["local", "convert", "withdraw"].indexOf(d.id) >= 0 : d.id !== "local"));
    out.wizClose = () => this.setState({ wiz: null });
    if (W) {
      const set = o => this.setState(st => ({ wiz: Object.assign({}, st.wiz, o) }));
      const dd = DIRS.find(d => d.id === W.dir) || DIRS[0]; const ALLD = { local: ["LOCAL"], pay: ["KE-CN", "KE-GB", "KE-EU", "KE-NG", "KE-TZ"], convert: ["KE-USDC"], withdraw: ["USDC-KE"] };
      const corr = dd.corrs.indexOf(W.corr) >= 0 ? W.corr : dd.corrs[0];
      const c = XCOR[corr];
      const needBen = W.dir === "pay" || W.dir === "local";
      const j = ((((s.xqJ || 0) * 7) % 5) - 2) * 0.0004;
      const amtN = Number(String(W.amt || "").replace(/[^0-9.]/g, "")) || 0;
      const send = W.mode === "recv" ? (amtN / (c.rate * (1 + j)) + c.flat) / 0.995 : amtN;
      const k = xcalc(corr, send, j);
      const big = toK(send, c.from) > (s.apprThreshold || HOME.thr);
      const steps = needBen ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 5, 6, 7];
      const names = { 1: "Direction", 2: "Amount", 3: "Quote", 4: "Beneficiary", 5: "Review and approve", 6: "Fund", 7: "Track" };
      const pos = steps.indexOf(W.step);
      out.wzSteps = steps.map((x, i) => ({ style: "flex: 1; height: 4px; border-radius: 999px; background: " + (i <= pos ? "var(--indigo)" : "var(--surface)") }));
      out.wzStepLabel = "Step " + (pos + 1) + " of " + steps.length + " · " + names[W.step];
      out.wzTitle = W.step === 1 ? "New payment" : W.step >= 6 ? (W.id || "New payment") : dd.label;
      for (let i = 1; i <= 7; i++) out["wz" + i] = W.step === i;
      const ttl = s.xqTtl == null ? 30 : s.xqTtl;
      out.wzLockShow = W.step >= 3 && W.step <= 6;
      out.wzLockLabel = "Rate locked · 0:" + String(ttl).padStart(2, "0");
      out.wzLockStyle = pill(ttl <= 8 ? "var(--warn-bg)" : "var(--indigo-tint)", ttl <= 8 ? "var(--warn-text)" : "var(--indigo-text)");
      out.wzLockBar = "display: block; height: 100%; border-radius: 999px; transition: width 1s linear; width: " + (ttl / 30 * 100) + "%; background: " + (ttl <= 8 ? "var(--warn-text)" : "var(--indigo)");
      out.wzLockNote = "Requotes automatically at 0:00." + (s.xqCount ? " Requoted " + s.xqCount + (s.xqCount === 1 ? " time." : " times.") : "");
      out.wzDirs = DIRS.map(d => ({ label: d.label, note: d.note, tag: (d.id === "withdraw" || d.id === "local") && HOME.cur === "KES" ? "Live" : d.id === "collect" ? "Payment link" : "Pilot", tagStyle: tagSt((d.id === "withdraw" || d.id === "local") && HOME.cur === "KES" ? "Live" : "Pilot"), style: cardSt(W.dir === d.id),
        onClick: () => { if (d.id === "collect") { this.setState({ wiz: null, modal: "newlink", linkStep: 1 }); return; } set({ dir: d.id, step: 2, corr: d.corrs[0], amt: d.id === "withdraw" ? "5,000" : d.id === "convert" ? "1,000,000" : W.amt, ben: d.id === "pay" ? W.ben : null }); } }));
      out.wzCorrs = dd.corrs.map(id => { const x = XCOR[id]; return { name: x.name, pair: x.from + " → " + x.to, tag: x.tag, tagStyle: tagSt(x.tag), fromFlag: flagSt(x.fc), fromTx: flagTx(x.fc), toFlag: flagSt(x.tc), toTx: flagTx(x.tc), style: "display: flex; align-items: center; gap: 9px; width: 100%; padding: 10px 12px; border-radius: 10px; cursor: pointer; text-align: left; color: var(--ink); border: 1px solid " + (id === corr ? INDIGO : "var(--border-strong)") + "; background: " + (id === corr ? TINT : "var(--panel)"), onClick: () => set({ corr: id, ben: null }) }; });
      out.wzModes = [["send", "You send"], ["recv", "They receive"]].map(([m, l]) => ({ label: l, onClick: () => set({ mode: m }), style: "flex: 1; padding: 8px 12px; border: 0; border-radius: 7px; cursor: pointer; font-size: 12.5px; font-weight: 700; background: " + ((W.mode || "send") === m ? "var(--panel)" : "transparent") + "; color: " + ((W.mode || "send") === m ? "var(--ink)" : "var(--muted)") + ((W.mode || "send") === m ? "; box-shadow: 0 1px 2px rgba(20,24,28,0.12)" : "") }));
      out.wzAmt = W.amt || ""; out.setWzAmt = e => set({ amt: e.target.value });
      out.wzAmtCur = W.mode === "recv" ? c.to : c.from;
      out.wzAmtLabel = W.mode === "recv" ? "Amount the beneficiary receives" : "Amount you send";
      out.wzPreview = W.mode === "recv" ? "You send about " + xfmt(send, c.from) : "They receive about " + xfmt(k.recv, c.to);
      out.wzPreviewNote = "Fee " + xfmt(k.fee, c.from) + " · indicative rate 1 " + c.from + " = " + xrate(k.rate) + " " + c.to + " · " + c.eta;
      out.wzRecv = xfmt(k.recv, c.to);
      const jp = (((Math.max(0, (s.xqJ || 0) - 1) * 7) % 5) - 2) * 0.0004;
      out.wzRequoteNote = s.xqCount ? "Rate updated on requote: " + xrate(c.mid * (1 - k.sp / 100) * (1 + jp)) + " → " + xrate(k.rate) : ""; out.wzRequoteShow = !!s.xqCount;
      out.wzCutoff = c.cutoff; out.wzFormula = "Received = (Sent − Fee) × Rate. Total cost = Fee + Spread (" + k.sp.toFixed(2) + "% of sent).";
      out.wzQuote = [kv("Mid-market reference", "1 " + c.from + " = " + xrate(c.mid) + " " + c.to, true), kv("Your rate", "1 " + c.from + " = " + xrate(k.rate) + " " + c.to, true, true), kv("Spread", (k.spread * 100).toFixed(2) + "% · " + xfmt(k.spreadCost, c.from), true), kv("Fee", xfmt(k.fee, c.from), true), kv("You send", xfmt(send, c.from), true, true), kv("Total cost", xfmt(k.fee + k.spreadCost, c.from), true), kv("Delivery", c.eta), kv("Rail", c.rail)];
      out.wzPilot = c.tag !== "Live";
      out.wzRequote = () => { this.setState({ xqJ: (s.xqJ || 0) + 1, xqCount: (s.xqCount || 0) + 1 }); this.xStartQuote(); };
      const bensFor = allBens.map((b, i) => ({ b, i })).filter(x => x.b.cur === c.to);
      out.wzBens = bensFor.map(({ b, i }) => ({ name: b.name, sub: b.rail + " · " + b.acct, flag: flagSt(b.cc), status: b.status, statusStyle: b.status === "Verified" ? pill("var(--ok-bg)", "var(--ok-text)") : b.status === "Pending" ? pill("var(--warn-bg)", "var(--warn-text)") : pill("var(--bad-bg)", "var(--bad-text)"), style: "display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 12px; border-radius: 10px; text-align: left; color: var(--ink); border: 1px solid " + (W.ben === i ? INDIGO : "var(--border-strong)") + "; background: " + (W.ben === i ? TINT : "var(--panel)") + "; cursor: " + (b.status === "Blocked" ? "not-allowed; opacity: 0.55" : "pointer"), onClick: () => { if (b.status !== "Blocked") set({ ben: i }); } }));
      out.wzNoBens = bensFor.length === 0;
      const selBen = W.ben != null ? allBens[W.ben] : null;
      out.wzBenNote = selBen && selBen.status === "Pending" ? "Name check is still running for this beneficiary. The payment holds until it passes." : "";
      out.wzBenNoteShow = !!out.wzBenNote;
      out.wzAddBen = () => { clearInterval(this._xqI); this.setState({ wiz: null, view: "bens", benAdd: true }); };
      out.wzPurpose = W.purpose; out.setWzPurpose = e => set({ purpose: e.target.value });
      out.wzInvLabel = W.inv ? "✓ INV-0931.pdf attached" : "+ Attach invoice (PDF)";
      out.wzInvStyle = chipSt(!!W.inv); out.wzInvToggle = () => set({ inv: !W.inv });
      out.wzReview = [kv("Direction", dd.label), kv("Corridor", c.name + " · " + c.tag)].concat(needBen ? [kv("Beneficiary", selBen ? selBen.name : "None"), kv("Purpose", W.purpose), kv("Invoice", W.inv ? "INV-0931.pdf" : "Not attached")] : [], [kv("You send", xfmt(send, c.from), true, true), kv("Rate", "1 " + c.from + " = " + xrate(k.rate) + " " + c.to, true), kv("Fee", xfmt(k.fee, c.from), true), kv("They receive", xfmt(k.recv, c.to), true, true), kv("Delivery", c.eta)]);
      out.wzBig = big; out.wzBigNote = "Above " + kes(s.apprThreshold || HOME.thr) + ". Your approval policy adds a second approver: Achieng Odhiambo (Owner). The payment waits in Awaiting approval until she approves.";
      out.wzBlocked = blocked;
      out.wzBlockedNote = acct === "paused" ? "Payouts are paused on this account. You can review the quote. Approval opens when payouts resume." : "Real payouts open after business verification. Switch the demo to sandbox to run this flow with test money.";
      out.wzPin = W.pin || ""; out.setWzPin = e => set({ pin: e.target.value.replace(/\D/g, "").slice(0, 6) });
      const fromUsdc = c.from === "USDC";
      out.wzFundOpts = (fromUsdc ? [["bal", "Pay from USDC balance", "Available " + xfmt(this.xBal(s).USDC, "USDC")], ["dep", "Deposit USDC", "Stellar network, memo required"]] : [["bal", "Pay from KES balance", "Available " + kes(this.xBal(s).KES)], ["bank", "Bank transfer", "Pay into the collection account"]]).map(([id, label, note]) => ({ label, note, style: cardSt((W.fund || "bal") === id), onClick: () => set({ fund: id }) }));
      const pid = W.id || "XB-…";
      out.wzId = pid;
      out.wzFundRowsShow = (W.fund || "bal") !== "bal";
      out.wzFundRows = (fromUsdc ? [["Network", "Stellar"], ["Address", "GBEPX4Q2…M7QXK"], ["Memo", pid.replace(/\D/g, "")], ["Amount", xfmt(send, "USDC")]] : [["Account name", "ElementPay Ltd · client funds"], ["Account number", "0120457781300"], ["Reference", "EP-" + pid], ["Amount", xfmt(send, c.from)]]).map(([label, value]) => ({ label, value, copy: () => { try { navigator.clipboard.writeText(value); } catch (e) {} toast(label + " copied"); } }));
      out.wzFundNote = (W.fund || "bal") === "bal" ? "Moves from your balance now. The locked rate applies." : "Fund within 30 minutes. After that we requote at the rate when the funds land. Quote the reference exactly.";
      const np = (s.xpNew || []).find(p => p.id === W.id);
      const trk = { "Awaiting funds": 0, "Converting": 1, "Settling": 2, "Settled": 4 }[np ? np.status : "Awaiting funds"];
      out.wzTrack = ["Funds received", "Converted", "Paid out on " + c.rail, "Delivered"].map((label, i) => ({ label, note: i < trk ? "Done" : i === trk ? "In progress" : "", dotStyle: dotSt(i < trk ? "done" : i === trk ? "cur" : "todo", i === trk), labelStyle: legLbl(i <= trk, i > trk), time: "" }));
      out.wzTrackStatus = np ? np.status : ""; out.wzTrackPill = np ? pill(XST[np.status].bg, XST[np.status].fg) : "";
      out.wzBackShow = W.step > 1 && W.step < 6;
      out.wzBack = () => set({ step: W.step === 5 && !needBen ? 3 : W.step - 1 });
      const lim = this.xLimits(s, all); const kAmt = toK(send, c.from); const overLim = kAmt > lim.per || kAmt + lim.used > lim.day;
      out.wzLimitErr = overLim ? (kAmt > lim.per ? "Above your per-payment limit of " + kes(lim.per) + "." : "Above your remaining daily limit of " + kes(Math.max(0, lim.day - lim.used)) + ".") : "";
      out.wzLimitRows = [kv("Per payment", kes(lim.per), true), kv("Remaining today", kes(Math.max(0, lim.day - lim.used)), true)]; out.wzLimitTier = lim.tier;
      const canNext = W.step === 2 ? amtN > 0 && !overLim : W.step === 4 ? W.ben != null : W.step === 5 ? (W.pin || "").length >= 4 && !blocked && !W.approving && !overLim : true;
      out.wzPrimShow = W.step > 1;
      out.wzPrimLabel = ({ 2: "Get firm quote", 3: needBen ? "Lock and choose beneficiary" : "Lock and review", 4: "Review", 5: W.approving ? "Approving…" : "Approve payment", 6: (W.fund || "bal") === "bal" ? "Pay " + xfmt(send, c.from) + " from balance" : "I have paid", 7: "View payment" })[W.step] || "Continue";
      out.wzPrimDisabled = !canNext; out.wzPrimStyle = btn1(!canNext) + "; flex: 1 1 200px";
      out.wzSecShow = W.step === 7; out.wzSecLabel = "Done"; out.wzSec = out.wizClose;
      out.wzPrim = () => {
        if (!canNext) return;
        if (W.step === 2) { set({ step: 3, corr }); this.xStartQuote(); return; }
        if (W.step === 3) { set({ step: needBen ? 4 : 5 }); return; }
        if (W.step === 4) { set({ step: 5 }); return; }
        if (W.step === 5) {
          set({ approving: true });
          setTimeout(() => this.setState(s0 => {
            if (!s0.wiz) return null;
            const id = (s0.demoSandbox ? "XT-" : "XB-") + (24120 + (s0.xpNew || []).length);
            const d = new Date(); const time = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
            const p = { id, party: needBen ? W.ben : "own", corr, send: Math.round(send * 100) / 100, status: big ? "Awaiting approval" : "Awaiting funds", date: "Nov 7", time, j, sbx: !!s0.demoSandbox, dir: W.dir };
            return { xpNew: [p].concat(s0.xpNew || []), wiz: Object.assign({}, s0.wiz, { step: 6, approving: false, id }) };
          }), 1300);
          return;
        }
        if (W.step === 6) { if ((W.fund || "bal") === "bal") this.setState(st => ({ xDebit: Object.assign({}, st.xDebit, { [c.from]: ((st.xDebit || {})[c.from] || 0) + send }) })); set({ step: 7 }); this.xTrack(W.id); return; }
        if (W.step === 7) { this.setState({ wiz: null, view: "xdetail", xpSel: W.id }); }
      };
    }
    out.openWizard = () => this.xOpenWiz();

    /* beneficiaries */
    const BST = { Verified: ["var(--ok-bg)", "var(--ok-text)", "✓"], Pending: ["var(--warn-bg)", "var(--warn-text)", "◷"], Blocked: ["var(--bad-bg)", "var(--bad-text)", "✕"] };
    const benList = s.xEmpty ? [] : allBens.map((b, i) => ({ b, i })).filter(({ b }) => (s.scope || "both") === "both" || ((s.scope === "local") === (b.cur === HOME.cur)));
    const bf = s.benFilter || "All"; const bq = (s.benQ || "").trim().toLowerCase();
    const benVis = benList.filter(({ b }) => (bf === "All" || b.status === bf) && (!bq || (b.name + " " + b.countryName + " " + b.cur).toLowerCase().includes(bq)));
    out.isBens = V === "bens";
    out.benTabs = ["All", "Verified", "Pending", "Blocked"].map(t => { const on = bf === t; return { label: t, count: t === "All" ? benList.length : benList.filter(x => x.b.status === t).length, onClick: () => this.setState({ benFilter: t }), style: tabSt(on), countStyle: cntSt(on) }; });
    out.benRows = benVis.map(({ b, i }) => {
      const paid = all.filter(p => p.party === i && p.status === "Settled");
      const tot = paid.reduce((t, p) => t + xcalc(p.corr, p.send, p.j).recv, 0);
      const st = BST[b.status];
      return { name: b.name, flag: flagSt(b.cc), country: b.countryName, rail: b.rail, acct: b.acct, cur: b.cur, status: b.status, icon: st[2], pillStyle: pill(st[0], st[1]), match: b.match, matchStyle: "font-size: 12px; font-weight: 600; color: " + (b.match.indexOf("Close") === 0 ? "var(--warn-text)" : b.match === "Running" ? "var(--muted)" : "var(--ok-text)"), last: paid.length ? paid[0].date : "Never", total: paid.length ? xfmt(tot, b.cur) : "None", open: go("bendetail", { benSel: i }), canPay: b.status !== "Blocked", pay: () => this.xOpenWiz({ step: 2, dir: b.cur === HOME.cur ? "local" : "pay", corr: CUR2COR[b.cur], ben: i }) };
    });
    out.benHas = benVis.length > 0; out.benEmpty = !out.benHas;
    out.benEmptyTitle = benList.length ? "No beneficiaries match" : "No beneficiaries yet";
    out.benEmptyNote = benList.length ? "Clear the search or pick another status." : "Add the suppliers you pay abroad. We run a name check against the receiving account before the first payout.";
    out.benFooter = benVis.length + " of " + benList.length + " recipients";
    out.benQ = s.benQ || ""; out.setBenQ = e => this.setState({ benQ: e.target.value });
    out.benImport = () => toast("beneficiaries-template.csv downloaded. Import takes name, country, currency, rail and account.");
    const bd = s.benDraft || { country: "cn", name: "", acct: "" };
    const BC = { cn: ["China", "CNY", "Bank · CNAPS", "Bank card or account number", "6222 0000 0000 0000"], gb: ["United Kingdom", "GBP", "Faster Payments", "Sort code and account number", "20-00-00 12345678"], de: ["Germany", "EUR", "SEPA · IBAN", "IBAN", "DE89 3704 0044 0532 0130 00"], ng: ["Nigeria", "NGN", "NIP bank transfer", "NUBAN account number", "0123456789"], tz: ["Tanzania", "TZS", "M-Pesa Tanzania", "Phone number", "+255 7XX XXX XXX"], usdc: ["Stablecoin wallet", "USDC", "USDC wallet · Stellar", "Wallet address", "G… or 0x…"] };
    const bc = BC[bd.country] || BC.cn;
    out.benAddOpen = !!s.benAdd; out.benDraft = bd;
    out.benAddToggle = () => this.setState({ benAdd: !s.benAdd });
    out.benDraftSet = e => { const k = e.target.dataset.k; const v = e.target.value; this.setState(st => ({ benDraft: Object.assign({}, st.benDraft, { [k]: v }), benCheck: "" })); };
    out.benAcctLabel = bc[3]; out.benAcctPh = bc[4];
    out.benCheckShow = !!s.benCheck;
    out.benCheckText = s.benCheck === "running" ? "Checking the name with the receiving institution…" : "✓ Exact match. The account is registered to " + (bd.name || "this name") + ".";
    out.benCheckStyle = "font-size: 12.5px; font-weight: 600; color: " + (s.benCheck === "running" ? "var(--muted)" : "var(--ok-text)");
    out.benCheckCta = s.benCheck === "done" ? "Check again" : "Run name check";
    out.benRunCheck = () => { if (!bd.name || !bd.acct) { toast("Add the registered name and account first"); return; } this.setState({ benCheck: "running" }); setTimeout(() => this.setState({ benCheck: "done" }), 1200); };
    const canSave = s.benCheck === "done";
    out.benSaveDisabled = !canSave; out.benSaveStyle = btn1(!canSave);
    out.benSave = () => { if (!canSave) return; const nb = { name: bd.name, cc: bd.country, countryName: bc[0], cur: bc[1], rail: bc[2], acct: "••••" + bd.acct.replace(/\s/g, "").slice(-4), status: "Pending", match: "Exact match" }; this.setState(st => ({ benNew: (st.benNew || []).concat([nb]), benAdd: false, benDraft: { country: "cn", name: "", acct: "" }, benCheck: "" })); toast(bd.name + " added. First payout opens after a 24-hour cooling-off period."); };

    /* bulk */
    const BULK = [["Shenzhen Hengda Packaging Co", "cn", "CNY", 48200, "PO-5521", ""], ["Guangzhou Lumen Electronics", "cn", "CNY", 31750, "PO-5522", ""], ["Harrow Fold Machinery Ltd", "gb", "GBP", 6400, "PO-5523", ""], ["Northwick Labels Ltd", "gb", "GBP", 1850, "PO-5524", "Beneficiary is blocked"], ["Rhein Valve GmbH", "de", "EUR", 9200, "PO-5525", "IBAN check digits do not match"], ["Lagos Harbour Agents", "ng", "NGN", 2400000, "PO-5526", ""], ["Dar Coastal Freight", "tz", "TZS", 3100000, "PO-5527", ""], ["Calder & Pike Supplies", "gb", "GBP", 2275, "PO-5528", ""]];
    const bs = s.bulkStage || "start";
    const bfx = s.bulkFixed || {}; const BL = BULK.map((b, i) => bfx[i] ? b.slice(0, 5).concat(["", bfx[i]]) : b); const okRows = BL.filter(b => !b[5] && b[6] !== "removed");
    const debit = okRows.reduce((t, b) => t + toK(b[3], b[2]) * 1.011 + 150, 0);
    out.isBulk = V === "bulk"; out.bulkStart = bs === "start"; out.bulkHasFile = bs !== "start";
    const stIdx = { start: 0, validated: 1, approving: 2, approved: 2, running: 3, done: 4 }[bs];
    out.bulkSteps = ["Upload", "Validate", "Approve", "Send"].map((l, i) => ({ label: (i < stIdx ? "✓ " : (i + 1) + ". ") + l, style: pill(i <= stIdx ? "var(--indigo-tint)" : "var(--surface)", i <= stIdx ? "var(--indigo-text)" : "var(--muted)") }));
    out.bulkUseSample = () => { this.setState({ bulkStage: "validated" }); toast("payouts-nov.csv validated · 8 rows, 2 errors"); };
    out.bulkTemplate = () => toast("payouts-template.csv downloaded");
    out.bulkStats = [["Rows", String(BULK.length)], ["Ready", String(okRows.length)], ["Errors", String(BL.filter(b => b[5]).length)], ["Debit from KES balance", kesM(debit)]].map(([label, value]) => ({ label, value }));
    let okSeen = 0;
    out.bulkRows = BL.map((b, i) => {
      const err = !!b[5] || b[6] === "removed"; let st, tone;
      if (b[6] === "removed") { st = "Removed"; tone = "neutral"; }
      else if (err) { st = bs === "running" || bs === "done" ? "Skipped" : "Error"; tone = "bad"; }
      else { okSeen++; const sent = bs === "done" || (bs === "running" && okSeen <= (s.bulkProg || 0)); st = sent ? "Sent" : "Ready"; tone = sent ? "ok" : "neutral"; }
      return { n: String(i + 1), name: b[0], flag: flagSt(b[1]), amt: xfmt(b[3], b[2]), ref: b[4], msg: b[6] === "removed" ? "Removed from this batch" : b[6] === "fixed" ? "IBAN corrected to DE89 3704 0044 0532 0130 00" : b[5] || (st === "Sent" ? "Quote locked, payout started" : "Beneficiary verified"), st, pillStyle: tone === "bad" ? pill("var(--bad-bg)", "var(--bad-text)") : tone === "ok" ? pill("var(--ok-bg)", "var(--ok-text)") : pill("var(--surface)", "var(--muted)"), msgStyle: "font-size: 12px; color: " + (b[5] ? "var(--bad-text)" : "var(--muted)"), canFix: !!b[5] && bs === "validated", fixLabel: i === 3 ? "Remove row" : "Fix IBAN", fix: () => { this.setState(st2 => ({ bulkFixed: Object.assign({}, st2.bulkFixed, { [i]: i === 3 ? "removed" : "fixed" }) })); toast(i === 3 ? "Row 4 removed from the batch" : "Row 5 IBAN corrected and revalidated"); } };
    });
    const tots = {}; okRows.forEach(b => { tots[b[2]] = (tots[b[2]] || 0) + b[3]; });
    out.bulkTotals = Object.keys(tots).map(c => ({ label: c, value: xfmt(tots[c], c) }));
    const bcta = { validated: ["Send for approval", () => { this.setState({ bulkStage: "approving" }); setTimeout(() => this.setState({ bulkStage: "approved" }), 1600); }], approving: ["Waiting for second approver…", null], approved: ["Start payouts", () => { this.setState({ bulkStage: "running", bulkProg: 0 }); clearInterval(this._bulkI); this._bulkI = setInterval(() => this.setState(st => { const n = (st.bulkProg || 0) + 1; if (n >= okRows.length) { clearInterval(this._bulkI); return { bulkProg: n, bulkStage: "done" }; } return { bulkProg: n }; }), 650); }], running: ["Sending…", null], done: ["Upload another file", () => this.setState({ bulkStage: "start", bulkProg: 0 })] }[bs];
    out.bulkCtaShow = !!bcta; out.bulkCta = bcta ? bcta[0] : ""; out.bulkCtaAct = bcta && bcta[1] ? bcta[1] : () => {}; out.bulkCtaStyle = btn1(!(bcta && bcta[1]));
    out.bulkNote = ({ validated: BL.filter(b => b[5]).length ? BL.filter(b => b[5]).length + " rows have errors and will be skipped. Fix them inline or in the file." : "All rows pass validation.", approving: "Batches above KES 1,000,000 need a second approver. Waiting for Achieng Odhiambo (Owner).", approved: "Approved by Achieng Odhiambo (Owner). Each row locks its own quote when sending starts.", running: "Sending " + Math.min(s.bulkProg || 0, okRows.length) + " of " + okRows.length + " payouts.", done: okRows.length + " payouts sent, " + (BULK.length - okRows.length) + " skipped or removed. Each one has its own proof of payment." })[bs] || "";
    out.bulkProgShow = bs === "running" || bs === "done";
    out.bulkProgStyle = "display: block; height: 100%; border-radius: 999px; background: var(--indigo); transition: width 0.5s; width: " + (bs === "done" ? 100 : Math.round((s.bulkProg || 0) / okRows.length * 100)) + "%";
    out.bulkErrReport = () => toast("payouts-nov-errors.csv downloaded · 2 rows");
    out.bulkDone = bs === "done"; out.bulkViewPayments = go("xborder");

    /* customers / remitters */
    const rq = (s.remQ || "").trim().toLowerCase();
    const remAll = s.xEmpty ? [] : XREM.map(x => Object.assign({ type: "Remitter" }, x)).concat(s.showGuests ? XGUEST.map(x => Object.assign({ type: "Guest payer" }, x)) : []);
    const remList = remAll.filter(x => !rq || (x.name + " " + x.countryName).toLowerCase().includes(rq));
    out.isRem = V === "remitters";
    out.remRows = remList.map(x => ({ name: x.name, flag: flagSt(x.cc), country: x.countryName, type: x.type, typeStyle: x.type === "Remitter" ? pill("var(--indigo-tint)", "var(--indigo-text)") : pill("var(--surface)", "var(--muted)"), pays: String(x.pays), total: xfmt(x.total, x.cur), last: x.last, created: x.created }));
    out.remHas = remList.length > 0; out.remEmpty = !out.remHas;
    out.remEmptyTitle = remAll.length ? "No customers match" : "No customers yet";
    out.remEmptyNote = remAll.length ? "Clear the search." : "Send your first payment link abroad. Each business that pays you appears here with its payment history.";
    out.remQ = s.remQ || ""; out.setRemQ = e => this.setState({ remQ: e.target.value });
    out.remGuestToggle = () => this.setState({ showGuests: !s.showGuests });
    out.remGuestTrack = "position: relative; width: 34px; height: 20px; flex-shrink: 0; border-radius: 999px; transition: background 0.2s; background: " + (s.showGuests ? "var(--indigo)" : "var(--border-strong)");
    out.remGuestKnob = "position: absolute; top: 2px; left: " + (s.showGuests ? "16px" : "2px") + "; width: 16px; height: 16px; border-radius: 999px; background: #fff; transition: left 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.2)";
    out.remFooter = remList.length + " of " + remAll.length + " customers" + (s.showGuests || s.xEmpty ? "" : " · " + XGUEST.length + " guest payers hidden");
    out.remExport = () => toast("customers-nov-2026.csv exported");

    /* reports */
    out.isReports = V === "reports";
    const REPS = [["tx", "Transactions", "Every payment with legs, rates, fees and references"], ["set", "Settlements", "Payouts delivered per rail and value date"], ["fee", "Fees", "Transfer fees and FX spread paid, per payment"], ["fx", "FX", "Locked rate against mid-market for each conversion"], ["bal", "Balances", "Opening, movement and closing per currency"], ["stm", "Statements", "Monthly account statement per currency"]];
    out.repCards = REPS.map(([id, name, note]) => {
      const f = (s.repFmt || {})[id] || (id === "stm" ? "PDF" : "CSV"); const sch = !!(s.repSched || {})[id];
      return { name, note, fmts: ["CSV", "XLSX", "PDF"].map(x => ({ label: x, onClick: () => this.setState(st => ({ repFmt: Object.assign({}, st.repFmt, { [id]: x }) })), style: "padding: 5px 10px; border: 0; border-radius: 6px; cursor: pointer; font-size: 11.5px; font-weight: 700; background: " + (x === f ? "var(--panel)" : "transparent") + "; color: " + (x === f ? "var(--ink)" : "var(--muted)") + (x === f ? "; box-shadow: 0 1px 2px rgba(20,24,28,0.12)" : "") })),
        generate: () => toast(name.toLowerCase() + "-oct-2026." + f.toLowerCase() + " is ready"),
        schedLabel: sch ? "✓ Emailed every Monday 07:00 to finance@acme.co" : "+ Schedule email delivery",
        schedStyle: "padding: 0; border: 0; background: transparent; cursor: pointer; text-align: left; font-size: 12px; font-weight: 600; color: " + (sch ? "var(--ok-text)" : "var(--indigo-text)"),
        sched: () => this.setState(st => ({ repSched: Object.assign({}, st.repSched, { [id]: !sch }) })) };
    });
    const REC = [["XB-24110", "INV-0412 · Arusha Agro Supplies", "TZS 18,500,000 · Nov 5", "Matched"], ["XB-24106", "INV-0409 · Kano Textile House", "NGN 2,650,000 · Nov 4", "Matched"], ["XB-24102", "INV-0405 · Mwanza Fisheries Co-op", "TZS 9,200,000 · Nov 2", "Suggested"], ["XB-24092", "INV-0398 · Zanzibar Spice Traders", "TZS 12,400,000 · Oct 28", "Matched"], ["XB-24088", "No invoice found", "NGN 3,150,000 · Oct 25", "Unmatched"], ["No payment", "INV-0415 · Ikeja Retail Collective", "NGN 980,000 · Nov 6", "Unmatched"]];
    const recSt = REC.map((x, i) => (s.recon || {})[i] || x[3]);
    out.reconStats = ["Matched", "Suggested", "Unmatched"].map(t => ({ label: t, count: String(recSt.filter(x => x === t).length), style: t === "Matched" ? pill("var(--ok-bg)", "var(--ok-text)") : t === "Suggested" ? pill("var(--indigo-tint)", "var(--indigo-text)") : pill("var(--warn-bg)", "var(--warn-text)") }));
    out.reconRows = REC.map((x, i) => { const t = recSt[i]; return { pay: x[0], inv: x[1], bank: x[2], status: t, style: t === "Matched" ? pill("var(--ok-bg)", "var(--ok-text)") : t === "Suggested" ? pill("var(--indigo-tint)", "var(--indigo-text)") : pill("var(--warn-bg)", "var(--warn-text)"), hasAct: t !== "Matched", act: t === "Suggested" ? "Accept match" : "Match manually", onAct: () => { if (t === "Suggested") { this.setState(st => ({ recon: Object.assign({}, st.recon, { [i]: "Matched" }) })); toast(x[0] + " matched to " + x[1].split(" · ")[0]); } else toast("Pick the payment or invoice to match from the side panel"); } }; });
    out.reconExport = () => toast("reconciliation-nov-2026.csv exported");
    out.feeRows = Object.keys(XCOR).map(id => { const c = XCOR[id]; return { name: c.name, fromFlag: flagSt(c.fc), fromTx: flagTx(c.fc), toFlag: flagSt(c.tc), toTx: flagTx(c.tc), rail: c.rail, fee: "0.50% + " + xfmt(c.flat, c.from), spread: ((c.mid - c.rate) / c.mid * 100).toFixed(2) + "%", cutoff: id === "KE-CN" ? "15:00 China time" : id === "KE-GB" ? "16:30 UK time" : id === "KE-EU" ? "14:00 CET" : "None", tag: c.tag, tagStyle: tagSt(c.tag) }; });

    /* developers */
    out.isDev = V === "devtools";
    const dt = s.devTab || "webhooks";
    out.devTabs = [["webhooks", "Webhooks"], ["events", "Events"], ["logs", "Logs"], ["sandbox", "Sandbox tools"], ["limits", "IP allowlist and limits"]].map(([id, l]) => ({ label: l, onClick: () => this.setState({ devTab: id }), style: tabSt(dt === id) }));
    ["webhooks", "events", "logs", "sandbox", "limits"].forEach(t => { out["dev_" + t] = dt === t; });
    const rp = s.replayed || {};
    const WH = [
      { url: "https://api.acme.co/hooks/elementpay", events: "payment.*, payout.*", act: "1,204", err: "0.2%", last: "200 · 2 min ago", ok: true },
      { url: "https://erp.acme.co/ep/settlements", events: "settlement.completed", act: "88", err: rp.all ? "0.0%" : "18.2%", last: rp.all ? "200 · just now" : "503 · 6 min ago", ok: !!rp.all }
    ];
    const whi = s.whSel == null ? 1 : s.whSel;
    out.whRows = WH.map((w, i) => ({ url: w.url, events: w.events, act: w.act, err: w.err, last: w.last, status: w.ok ? "Enabled" : "Failing", pillStyle: w.ok ? pill("var(--ok-bg)", "var(--ok-text)") : pill("var(--bad-bg)", "var(--bad-text)"), errStyle: MONO + "font-size: 12px; font-weight: 600; color: " + (w.ok ? "var(--ink)" : "var(--bad-text)"), rowStyle: "cursor: pointer; background: " + (i === whi ? "var(--surface-soft)" : "transparent"), onClick: () => this.setState({ whSel: i }) }));
    out.whUrl = WH[whi].url;
    const DLV = whi === 1 ? [["settlement.completed", "XB-24113", 503, 3, "15:08"], ["settlement.completed", "XB-24111", 503, 5, "10:11"], ["settlement.completed", "XB-24110", 200, 1, "16:44"], ["settlement.completed", "XB-24108", 200, 1, "11:33"]] : [["payout.settled", "XB-24113", 200, 1, "15:04"], ["payment.created", "XB-24117", 200, 1, "09:42"], ["quote.locked", "XB-24117", 200, 1, "09:42"], ["payout.failed", "XB-24112", 200, 1, "11:58"]];
    out.whDeliveries = DLV.map(([ev, obj, code, att, time], i) => { const key = whi + "-" + i; const c2 = rp[key] || rp.all ? 200 : code; return { ev, obj, code: String(c2), att: c2 === code ? "Attempt " + att : "Replayed", time, codeStyle: pill(c2 < 300 ? "var(--ok-bg)" : "var(--bad-bg)", c2 < 300 ? "var(--ok-text)" : "var(--bad-text)"), canReplay: c2 >= 300, replay: () => { this.setState(st => ({ replayed: Object.assign({}, st.replayed, { [key]: true }) })); toast(ev + " for " + obj + " replayed · 200 OK"); } }; });
    out.whReplayAll = () => { this.setState(st => ({ replayed: Object.assign({}, st.replayed, { all: true }) })); toast("Failed deliveries replayed · endpoint healthy"); };
    out.whFailing = whi === 1 && !rp.all;
    out.whAdd = () => toast("Add endpoint: URL, events and a signing secret. Secret is shown once.");
    const EV = (s.simEvents || []).concat([["payout.settled", "XB-24113", "15:04:12"], ["payment.created", "XB-24117", "09:42:03"], ["quote.locked", "XB-24117", "09:42:10"], ["funding.received", "XB-24115", "08:57:31"], ["payout.failed", "XB-24112", "11:58:40"], ["compliance.hold", "XB-24114", "17:23:02"], ["refund.completed", "XB-24109", "13:30:55"]]);
    const evi = Math.min(s.evSel || 0, EV.length - 1);
    out.evRows = EV.map(([type, obj, time], i) => ({ type, obj, time, style: "display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 10px; width: 100%; padding: 10px 12px; border: 0; border-top: 1px solid var(--line); text-align: left; cursor: pointer; color: var(--ink); background: " + (i === evi ? "var(--indigo-tint)" : "transparent"), onClick: () => this.setState({ evSel: i }) }));
    const ev = EV[evi];
    out.evPayload = JSON.stringify({ id: "evt_" + (9000 + evi * 37).toString(16) + "a2", type: ev[0], created: "2026-11-07T" + ev[2] + "+03:00", livemode: !s.demoSandbox, data: { object: "payment", id: ev[1], status: ev[0].split(".")[1] } }, null, 2);
    const LOGS = [["POST", "/v1/quotes", 201, 142, "idem_24118a", '{ "corridor": "KES-CNY", "send_amount": 500000 }', '{ "id": "Q-24118-A", "rate": 0.05512, "expires_in": 30 }'], ["POST", "/v1/payouts", 201, 188, "idem_24118b", '{ "quote_id": "Q-24118-A", "beneficiary_id": "ben_01" }', '{ "id": "XB-24118", "status": "awaiting_funds" }'], ["GET", "/v1/payouts/XB-24117", 200, 61, "", "", '{ "id": "XB-24117", "status": "settling" }'], ["POST", "/v1/payouts", 409, 44, "idem_24118b", '{ "quote_id": "Q-24118-B" }', '{ "error": "idempotency_key_reused", "message": "Key was used with a different body." }'], ["POST", "/v1/beneficiaries", 422, 73, "idem_ben_77", '{ "iban": "DE89 3704 0044 0532 0130 01" }', '{ "error": "invalid_iban", "message": "IBAN check digits do not match." }'], ["GET", "/v1/balances", 200, 38, "", "", '{ "KES": 4812300, "USDC": 68496.73 }']];
    const lgi = s.logSel || 0;
    out.logRows = LOGS.map(([m, path, code, ms, idem], i) => ({ m, path, code: String(code), ms: ms + " ms", idem: idem || "None", codeStyle: MONO + "font-size: 12px; font-weight: 700; color: " + (code < 300 ? "var(--ok-text)" : "var(--bad-text)"), rowStyle: "cursor: pointer; background: " + (i === lgi ? "var(--surface-soft)" : "transparent"), onClick: () => this.setState({ logSel: i }) }));
    out.logReq = (LOGS[lgi][0] + " " + LOGS[lgi][1] + "\nIdempotency-Key: " + (LOGS[lgi][4] || "none") + "\n\n" + (LOGS[lgi][5] || "(no body)"));
    out.logRes = (LOGS[lgi][2] + "\n\n" + LOGS[lgi][6]);
    const sim = (type, obj, msg) => () => { const d = new Date(); const t = [d.getHours(), d.getMinutes(), d.getSeconds()].map(x => String(x).padStart(2, "0")).join(":"); this.setState(st => ({ simEvents: [[type, obj, t]].concat(st.simEvents || []), evSel: 0 })); toast(msg); };
    out.sbTools = [["Simulate funds received", "Marks the newest awaiting-funds payment as funded", sim("funding.received", "XB-24116", "funding.received sent for XB-24116")], ["Simulate payout success", "Sends payout.settled for a test payout", sim("payout.settled", "XB-T0091", "payout.settled sent for XB-T0091")], ["Simulate payout failure", "Sends payout.failed with account_closed", sim("payout.failed", "XB-T0092", "payout.failed sent for XB-T0092")], ["Send test webhook", "Delivers a signed ping to every endpoint", sim("webhook.ping", "all endpoints", "Ping delivered to 2 endpoints")]].map(([label, note, onClick]) => ({ label, note, onClick }));
    out.sbBens = [["000123456789", "Bank account that always succeeds"], ["000999999999", "Bank account that fails with account_closed"], ["+254 700 000 001", "M-Pesa number that succeeds in 5 s"], ["+254 700 000 002", "M-Pesa number that times out"]].map(([n, note]) => ({ n, note }));
    out.quick = [["Authenticate", "curl https://api.elementpay.net/v1/balances \\\n  -H \"Authorization: Bearer $EP_SECRET_KEY\""], ["Create a quote", "curl https://api.elementpay.net/v1/quotes \\\n  -H \"Authorization: Bearer $EP_SECRET_KEY\" \\\n  -d corridor=KES-CNY -d send_amount=500000"], ["Create a payout", "curl https://api.elementpay.net/v1/payouts \\\n  -H \"Authorization: Bearer $EP_SECRET_KEY\" \\\n  -H \"Idempotency-Key: po_5521\" \\\n  -d quote_id=Q-24118-A -d beneficiary_id=ben_01"], ["Get status", "curl https://api.elementpay.net/v1/payouts/XB-24118 \\\n  -H \"Authorization: Bearer $EP_SECRET_KEY\""]].map(([title, code]) => ({ title, code, copy: () => { try { navigator.clipboard.writeText(code); } catch (e) {} toast(title + " snippet copied"); } }));
    out.ipChips = (s.ipList || []).map(ip => ({ ip, remove: () => this.setState(st => ({ ipList: st.ipList.filter(x => x !== ip) })) }));
    out.ipDraft = s.ipDraft || ""; out.setIpDraft = e => this.setState({ ipDraft: e.target.value });
    out.ipAdd = () => { const v = (s.ipDraft || "").trim(); if (!/^\d{1,3}(\.\d{1,3}){3}(\/\d{1,2})?$/.test(v)) { toast("Enter an IPv4 address or CIDR range"); return; } this.setState(st => ({ ipList: st.ipList.concat([v]), ipDraft: "" })); toast(v + " added. Keys only work from listed addresses."); };
    out.goKeys = go("keys");

    /* partners */
    out.isPartners = V === "partners"; out.isConnectV = V === "connect"; out.isBillingV = V === "billing";
    const PT = [["Kisumu Cold Chain Ltd", "Live", "Aug 2026", "KES 182,400"], ["Eldoret Agro Exports", "Verified", "Sep 2026", "KES 0"], ["Nakuru Print Works", "Signed up", "Oct 2026", "KES 0"]].concat((s.ptInvited || []).map(e => [e, "Invited", "Nov 2026", "KES 0"]));
    const ptPal = { Live: ["var(--ok-bg)", "var(--ok-text)"], Verified: ["var(--indigo-tint)", "var(--indigo-text)"], "Signed up": ["var(--surface)", "var(--muted)"], Invited: ["var(--surface)", "var(--faint)"] };
    out.ptRows = PT.map(([name, st, when, fees]) => ({ name, st, when, fees, style: pill(ptPal[st][0], ptPal[st][1]) }));
    out.ptInvite = s.ptInvite || ""; out.setPtInvite = e => this.setState({ ptInvite: e.target.value });
    out.ptSend = () => { const v = (s.ptInvite || "").trim(); if (v.indexOf("@") < 1) { toast("Enter a work email"); return; } this.setState(st => ({ ptInvited: (st.ptInvited || []).concat([v]), ptInvite: "" })); toast("Invite sent to " + v); };
    out.ptCopy = () => { try { navigator.clipboard.writeText("https://elementpay.net/r/acme-7k2"); } catch (e) {} toast("Referral link copied"); };

    /* overview additions */
    const ovMetricDefs = [["gross", "Gross volume", kesM(all.reduce((t, p) => t + toK(p.send, XCOR[p.corr].from), 0)), "30 days, " + HOME.cur + " equivalent"], ["net", "Net volume", kesM(all.filter(p => p.status === "Settled").reduce((t, p) => t + toK(p.send, XCOR[p.corr].from), 0)), "Settled only"], ["fees", "Fees paid", kesM(all.reduce((t, p) => t + toK(xcalc(p.corr, p.send).fee, XCOR[p.corr].from), 0)), "Transfer fees"], ["spread", "FX spread paid", kesM(all.reduce((t, p) => t + toK(p.send * xcalc(p.corr, p.send).spread, XCOR[p.corr].from), 0)), "Against mid-market"], ["time", "Avg settlement", all.length ? "24 min" : "None", "Funded to delivered"], ["succ", "Success rate", all.length ? (all.filter(p => p.status === "Settled").length / Math.max(1, all.filter(p => ["Settled", "Failed", "Refunded"].indexOf(p.status) >= 0).length) * 100).toFixed(1) + "%" : "None", "Settled of completed"], ["new", "New counterparties", all.length ? "3" : "0", "Beneficiaries and remitters"]];
    const off2 = s.xMetricsOff || [];
    out.ovMetrics = ovMetricDefs.filter(m => off2.indexOf(m[0]) < 0).map(([id, label, value, note]) => ({ label, value, note, tip: id === "succ" ? "Settled ÷ (Settled + Failed + Refunded), last 30 days" : id === "spread" ? "Sum of spread against mid-market, per payment" : note }));
    out.xMetricChips = ovMetricDefs.map(([id, label]) => ({ label: (off2.indexOf(id) < 0 ? "✓ " : "+ ") + label, style: chipSt(off2.indexOf(id) < 0), onClick: () => this.setState({ xMetricsOff: off2.indexOf(id) < 0 ? off2.concat([id]) : off2.filter(x => x !== id) }) }));
    out.xCustOpen = !!s.xCustomize; out.xCustToggle = () => this.setState({ xCustomize: !s.xCustomize }); out.xCustLabel = s.xCustomize ? "Done" : "Customize";
    out.ovActivation = acct !== "live" && acct !== "paused";
    out.ovActTitle = acct === "review" ? "Verification submitted · in review" : acct === "rejected" ? "Verification rejected" : "Finish business verification to move real money";
    out.ovActNote = acct === "review" ? "All 4 sections are in. Live payouts open when the review passes." : kybDone + " of 4 sections done. Collections and payouts stay in sandbox until we approve your business.";
    out.ovActBar = "display: block; height: 100%; border-radius: 999px; background: var(--indigo); width: " + (acct === "review" ? 100 : kybDone * 25) + "%";
    out.ovActCta = acct === "review" ? "View submission" : "Continue verification";
    out.ovSandbox = () => this.setState({ demoSandbox: true });
    const Q = [];
    all.filter(p => p.status === "Awaiting approval").forEach(p => Q.push({ title: "Approve " + p.id + " · " + xfmt(p.send, XCOR[p.corr].from), note: "To " + party(p) + ". Second approval, above " + kes(s.apprThreshold || HOME.thr) + ".", cta: "Approve", tone: "var(--indigo)", onClick: () => this.xApprove(p.id) }));
    all.filter(p => p.status === "Awaiting funds").slice(0, 2).forEach(p => Q.push({ title: p.id + " awaiting funds", note: xfmt(p.send, XCOR[p.corr].from) + " to " + party(p) + ". Quote expired, we requote when funds land.", cta: "Open", tone: "var(--warn-text)", onClick: go("xdetail", { xpSel: p.id }) }));
    all.filter(p => p.status === "On hold").forEach(p => Q.push({ title: p.id + " on hold", note: "Compliance needs the commercial invoice.", cta: "Upload", tone: "var(--warn-text)", onClick: go("xdetail", { xpSel: p.id }) }));
    if ((acct === "unverified" || acct === "moreinfo") && docs.some(d => d.status === "Rejected")) Q.push({ title: "CR12 rejected", note: "Upload one issued in the last 12 months.", cta: "Fix", tone: "var(--bad-text)", onClick: openKyb(3) });
    if (!rp.all && !s.xEmpty) Q.push({ title: "Webhook failing · erp.acme.co", note: "18.2% errors in 24 h. 2 settlement events undelivered.", cta: "Review", tone: "var(--bad-text)", onClick: go("devtools", { devTab: "webhooks", whSel: 1 }) });
    out.ovQueue = Q.map(x => Object.assign({}, x, { dotStyle: "width: 8px; height: 8px; margin-top: 6px; flex-shrink: 0; border-radius: 999px; background: " + x.tone }));
    out.ovQueueCount = String(Q.length); out.ovQueueEmpty = Q.length === 0; out.ovQueueHas = Q.length > 0;
    const byCor = {};
    all.forEach(p => { const b = byCor[p.corr] || (byCor[p.corr] = { v: 0, n: 0, ok: 0, done: 0 }); b.v += toK(p.send, XCOR[p.corr].from); b.n++; if (p.status === "Settled") b.ok++; if (["Settled", "Failed", "Refunded"].indexOf(p.status) >= 0) b.done++; });
    out.ovCorr = Object.keys(byCor).sort((a, b) => byCor[b].v - byCor[a].v).slice(0, 5).map(id => { const c = XCOR[id]; const b = byCor[id]; return { name: c.from + " → " + c.to, fromFlag: flagSt(c.fc), fromTx: flagTx(c.fc), toFlag: flagSt(c.tc), toTx: flagTx(c.tc), vol: kesM(b.v), succ: b.done ? Math.round(b.ok / b.done * 100) + "%" : "None", median: c.median, tag: c.tag === "Live" || sbx ? c.tag : "Sandbox volume", tagStyle: tagSt(c.tag) }; });
    out.ovCorrEmpty = out.ovCorr.length === 0; out.ovCorrHas = !out.ovCorrEmpty;
    out.ovRates = [["us", "ke", "USD → KES", "129.20", "+0.12%"], ["usdc", "ng", "USDC → NGN", "1,538.40", "−0.31%"], ["ke", "cn", "KES → CNY", "0.05545", "+0.08%"], ["gb", "ke", "GBP → KES", "163.95", "−0.05%"]].map(([a, b, pair, rate, ch]) => ({ fromFlag: flagSt(a), fromTx: flagTx(a), toFlag: flagSt(b), toTx: flagTx(b), pair, rate, ch, chStyle: "font-size: 11.5px; font-weight: 700; color: " + (ch[0] === "+" ? "var(--ok-text)" : "var(--bad-text)") }));
    const totK = all.reduce((t, p) => t + toK(p.send, XCOR[p.corr].from), 0) || 1;
    out.ovBreak = ORDER.slice(1).map(t => { const ps = all.filter(p => p.status === t); const v = ps.reduce((x, p) => x + toK(p.send, XCOR[p.corr].from), 0); const st = XST[t]; return { label: t, icon: st.icon, pillStyle: pill(st.bg, st.fg), count: ps.length + (ps.length === 1 ? " payment" : " payments"), amt: kesM(v), pct: (v / totK * 100).toFixed(1) + "%", barStyle: "display: block; height: 100%; border-radius: 999px; background: " + st.fg + "; width: " + Math.max(ps.length ? 2 : 0, v / totK * 100) + "%" }; });

    /* status banners */
    const BAN = {
      unverified: ["var(--warn-bg)", "var(--warn-text)", "!", "Verification required", kybDone + " of 4 sections done. Real payouts open once we approve your business.", "Continue verification", openKyb()],
      review: ["var(--indigo-tint)", "var(--indigo-text)", "◷", "Verification in review", "Payouts stay off until the review passes. You can keep building in sandbox.", "View submission", openKyb(5)],
      moreinfo: ["var(--warn-bg)", "var(--warn-text)", "!", "More information required", "2 items: the CR12 is older than 12 months, and the ID for director James Otieno is missing.", "Fix 2 items", openKyb(3)],
      rejected: ["var(--bad-bg)", "var(--bad-text)", "✕", "Verification rejected", "The registered address does not match the certificate of incorporation. Appeal within 30 days with corrected documents.", "Start appeal", openKyb(1)],
      paused: ["var(--bad-bg)", "var(--bad-text)", "‖", "Payouts paused", "We are reviewing a run of payouts to new beneficiaries. Nothing needed from you right now. Balances stay where they are and collections keep working.", "Contact compliance", () => { try { window.location.href = "mailto:compliance@elementpay.net"; } catch (e) {} }]
    }[acct];
    out.banShow = !!BAN;
    if (BAN) { out.banStyle = "display: flex; align-items: center; gap: 12px; padding: 12px 24px; border-bottom: 1px solid var(--border); flex-wrap: wrap; background: " + BAN[0] + "; color: " + BAN[1]; out.banIconStyle = "width: 24px; height: 24px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 12px; font-weight: 800; border: 1.5px solid currentColor"; out.banIcon = BAN[2]; out.banTitle = BAN[3]; out.banNote = BAN[4]; out.banCta = BAN[5]; out.banAct = BAN[6]; }
    out.sbShow = !!s.demoSandbox; out.sbOff = () => this.setState({ demoSandbox: false });

    /* header: search, get started, demo */
    out.palOpenAct = () => this.setState({ palette: true, palQ: "", gsMenu: false, demoMenu: false });
    const E0 = !s.xEmpty; const GS = [["Verify your business", E0 && verified, openKyb()], ["Add a funding source", E0, go("wallets")], ["Create a payment link", E0, go("checkout", { checkoutMode: "link" })], ["Create an API key", E0, go("keys")], ["Register a webhook", E0, go("devtools", { devTab: "webhooks" })], ["Invite a teammate", E0, go("settings", { settingsTab: "team" })]];
    const gsN = GS.filter(g => g[1]).length;
    out.gsLabel = "Get started · " + gsN + "/" + GS.length;
    out.gsToggle = () => this.setState({ gsMenu: !s.gsMenu, demoMenu: false });
    out.gsOpen = !!s.gsMenu;
    out.gsPillStyle = "display: inline-flex; align-items: center; gap: 7px; height: 34px; padding: 0 12px; border-radius: 999px; cursor: pointer; font-size: 12.5px; font-weight: 700; border: 1px solid var(--indigo-soft); background: var(--indigo-tint); color: var(--indigo-text)";
    out.gsBar = "display: block; height: 100%; border-radius: 999px; background: var(--indigo); width: " + Math.round(gsN / GS.length * 100) + "%";
    out.gsItems = GS.map(([label, done, act]) => ({ label, onClick: act, mark: done ? "✓" : "", markStyle: "width: 18px; height: 18px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 11px; font-weight: 800; " + (done ? "background: var(--indigo); color: var(--on-indigo)" : "border: 1.5px solid var(--border-strong)"), labelStyle: "font-weight: 600; color: " + (done ? "var(--muted)" : "var(--ink)") + (done ? "; text-decoration: line-through" : "") }));
    out.demoToggle = () => this.setState({ demoMenu: !s.demoMenu, gsMenu: false });
    out.demoOpen = !!s.demoMenu;
    const segSt = on => "white-space: nowrap; padding: 6px 9px; border-radius: 7px; cursor: pointer; font-size: 12px; font-weight: 600; border: 1px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)");
    out.demoGroups = [
      ["Account status", [["unverified", "Unverified"], ["review", "In review"], ["moreinfo", "More info"], ["rejected", "Rejected"], ["live", "Live"], ["paused", "Payouts paused"]].map(([v, l]) => ({ label: l, style: segSt(acct === v), onClick: () => this.setState({ acct: v }) }))],
      ["Mode", [[false, "Live"], [true, "Sandbox"]].map(([v, l]) => ({ label: l, style: segSt(!!s.demoSandbox === v), onClick: () => this.setState({ demoSandbox: v }) }))],
      ["Business scope", [["local", "Local only"], ["international", "International only"], ["both", "Both"]].map(([v, l]) => ({ label: l, style: segSt((s.scope || "both") === v), onClick: () => this.setState({ scope: v, view: v === "local" && (s.view === "xborder" || s.view === "xdetail") ? "overview" : s.view }) }))],
      ["Data", [[false, "Populated"], [true, "Empty"]].map(([v, l]) => ({ label: l, style: segSt(!!s.xEmpty === v), onClick: () => this.setState({ xEmpty: v }) }))]
    ].map(([label, opts]) => ({ label, opts }));

    /* palette */
    out.palOpen = !!s.palette; out.palClose = () => this.setState({ palette: false });
    out.palQ = s.palQ || ""; out.setPalQ = e => this.setState({ palQ: e.target.value });
    const pal = [];
    [["Overview", "overview"], ["International payouts", "xborder"], ["Recipients", "bens"], ["Bulk payouts", "bulk"], ["Transactions", "transactions"], ["Wallets", "wallets"], ["Payment links", "checkout"], ["Clients", "remitters"], ["Reports and reconciliation", "reports"], ["API keys", "keys"], ["Webhooks, events and logs", "devtools"], ["Refer and earn", "partners"], ["Settings", "settings"]].forEach(([l, v]) => pal.push(["Page", l, "Go to page", go(v)]));
    pal.push(["Page", "Business verification", "KYB wizard", openKyb()]);
    all.forEach(p => pal.push(["Payment", p.id + " · " + party(p), xfmt(p.send, XCOR[p.corr].from) + " · " + p.status, go("xdetail", { xpSel: p.id })]));
    allBens.forEach(b => pal.push(["Recipient", b.name, b.cur + " · " + b.rail, go("bens", { benQ: b.name, benFilter: "All" })]));
    XREM.forEach(c => pal.push(["Client", c.name, c.countryName, go("remitters", { remQ: c.name })]));
    [["Storefront checkout", "pay.elementpay.net/c/acme"], ["Invoice 1042", "pay.elementpay.net/i/1042"]].forEach(([l, sub]) => pal.push(["Link", l, sub, go("checkout", { checkoutMode: "link" })]));
    [["Production server", "ak_live_7c41…"], ["Payout bot", "ak_live_read_44c"]].forEach(([l, sub]) => pal.push(["API key", l, sub, go("keys")]));
    [["Create a quote", "POST /v1/quotes"], ["Create a payout", "POST /v1/payouts"], ["Verify webhook signatures", "Docs"]].forEach(([l, sub]) => pal.push(["Docs", l, sub, go("reference")]));
    GP.forEach(x => pal.push(["Referral", x.name, x.country + " · " + x.st, go("partners", { ptTab: "refs", ptSel: x.id })]));
    CN.forEach(x => pal.push(["Linked account", x.name, x.type + " · " + x.st + " · Roadmap", go("connect", { cnSel: x.id, cnTab: "overview" })]));
    BPL.forEach(x => pal.push(["Plan", x.name, x.cur + " " + x.price.toLocaleString("en-US") + " / " + x.iv.toLowerCase() + " · Roadmap", go("billing", { bTab: "plans", bpSel: x.id })]));
    CAT.forEach(x => pal.push(["Product", x.name, x.sku + " · " + x.st, go("catalog", { catSel: x.id, catTab: "overview" })]));
    BSUB.forEach(x => pal.push(["Subscription", x.cust, x.st + " · Roadmap", go("billing", { bsSel: x.id })]));
    const pq = (s.palQ || "").trim().toLowerCase();
    const pf = (pq ? pal.filter(x => (x[0] + " " + x[1] + " " + x[2]).toLowerCase().includes(pq)) : pal.filter(x => x[0] === "Page")).slice(0, 9);
    out.palItems = pf.map(([kind, label, sub, act], i) => ({ kind, label, sub, onClick: act, style: "display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 16px; border: 0; text-align: left; cursor: pointer; color: var(--ink); background: " + (i === 0 && pq ? "var(--indigo-tint)" : "transparent") }));
    out.palNone = pf.length === 0;
    out.palKey = e => { if (e.key === "Enter" && pf[0]) pf[0][3](); };

    /* KYB wizard */
    out.kybOpen = !!s.kybOpen;
    const ks = s.kybStage || 1;
    const setK = o => { this.setState(st => ({ kyb: Object.assign({}, st.kyb, o) })); this.xKybSave(); };
    out.kybD = kd;
    out.kybSet = e => setK({ [e.target.dataset.k]: e.target.value });
    out.kybClose = () => { this.setState({ kybOpen: false }); toast("Saved. Pick up where you left off from Verification."); };
    out.kybSaved = s.kybSaved || "All changes saved";
    const KST = [[1, "Your details", "Business and activity"], [2, "Ownership", "Directors, UBOs, signatories"], [3, "Documents", "Registry and tax papers"], [4, "Identity check", "Liveness for the representative"], [5, "Review and submit", "Confirm and send"]];
    const cdone = { 1: c1, 2: c2, 3: c3, 4: c4, 5: acct !== "unverified" };
    out.kybStages = KST.map(([n, label, sub]) => ({ label, sub, mark: cdone[n] && n !== ks ? "✓" : String(n), onClick: () => this.setState({ kybStage: n }), style: "display: flex; align-items: flex-start; gap: 11px; width: 100%; padding: 10px; border: 0; border-radius: 10px; text-align: left; cursor: pointer; color: var(--ink); background: " + (n === ks ? "var(--panel)" : "transparent") + (n === ks ? "; box-shadow: 0 0 0 1px var(--border)" : ""), numStyle: "width: 24px; height: 24px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 11.5px; font-weight: 800; " + (n === ks ? "background: var(--indigo); color: var(--on-indigo)" : cdone[n] ? "background: var(--ok-bg); color: var(--ok-text)" : "border: 1.5px solid var(--border-strong); color: var(--muted)") }));
    for (let i = 1; i <= 5; i++) out["kyb" + i] = ks === i;
    out.kybStepOf = "Step " + ks + " of 5";
    out.kybTitle = KST[ks - 1][1];
    out.kybSub = ({ 1: "Tell us about the business. Everything saves as you type. Nothing goes to review until you confirm on the last step.", 2: "List every director, every owner at or above 10 percent, and anyone who signs for the account.", 3: "Upload clear scans or photos. We check each one and tell you if anything needs replacing.", 4: "The account representative completes a short liveness and ID check. It takes about two minutes.", 5: "Check each section, finish anything outstanding, then submit for review." })[ks];
    out.kybStatusLabel = ({ unverified: "Not submitted", review: "In review", moreinfo: "More information required", rejected: "Rejected", live: "Approved", paused: "Approved" })[acct];
    out.kybStatusStyle = verified ? pill("var(--ok-bg)", "var(--ok-text)") : acct === "review" ? pill("var(--indigo-tint)", "var(--indigo-text)") : acct === "rejected" ? pill("var(--bad-bg)", "var(--bad-text)") : pill("var(--warn-bg)", "var(--warn-text)");
    out.kybTypes = [["Registered business", "Company or partnership on a business registry"], ["Sole proprietor", "Registered business name, one owner"], ["Individual", "Not registered. Lower limits apply."]].map(([label, note]) => ({ label, note, style: cardSt(kd.type === label), onClick: () => setK({ type: label }) }));
    out.kybBands = ["Under KES 1M", "KES 1M to 10M", "KES 10M to 50M", "Over KES 50M"].map(b => ({ label: b, style: chipSt(kd.band === b), onClick: () => setK({ band: b }) }));
    out.kybCorrs = [["cn", "China"], ["gb", "United Kingdom"], ["eu", "Euro area"], ["us", "United States"], ["ng", "Nigeria"], ["tz", "Tanzania"], ["rw", "Rwanda"], ["za", "South Africa"]].map(([cc, l]) => { const on = (kd.corr || []).indexOf(cc) >= 0; return { label: l, flag: flagSt(cc), style: chipSt(on), onClick: () => setK({ corr: on ? kd.corr.filter(x => x !== cc) : (kd.corr || []).concat([cc]) }) }; });
    out.kybPeopleRows = people.map((p, i) => Object.assign({}, p, { i, title: p.name || "New person", initial: (p.name || "?").slice(0, 1), flagNote: p.idNo || stOv ? "" : "ID number missing", flagStyle: p.idNo || stOv ? "display: none" : pill("var(--warn-bg)", "var(--warn-text)"), remove: () => { this.setState(st => ({ kybPeople: st.kybPeople.filter((x, n) => n !== i) })); this.xKybSave(); } }));
    out.kybPSet = e => { const i = +e.target.dataset.i; const k = e.target.dataset.k; const v = e.target.value; this.setState(st => ({ kybPeople: st.kybPeople.map((x, n) => n === i ? Object.assign({}, x, { [k]: v }) : x) })); this.xKybSave(); };
    out.kybAddPerson = () => { this.setState(st => ({ kybPeople: st.kybPeople.concat([{ name: "", role: "Authorized signatory", own: "0", nat: "", idType: "National ID", idNo: "", res: "" }]) })); this.xKybSave(); };
    const ownSum = people.reduce((t, p) => t + (Number(p.own) || 0), 0);
    out.kybOwnNote = "Ownership listed: " + ownSum + "%." + (ownSum < 100 ? " Add any owner at or above 10% who is missing." : "");
    const DP = { Accepted: ["var(--ok-bg)", "var(--ok-text)", "✓"], Rejected: ["var(--bad-bg)", "var(--bad-text)", "✕"], Missing: ["var(--surface)", "var(--muted)", "○"], Uploaded: ["var(--indigo-tint)", "var(--indigo-text)", "↑"], "In review": ["var(--warn-bg)", "var(--warn-text)", "◷"], "Not required": ["var(--surface)", "var(--faint)", "–"] };
    out.kybDocRows = docs.map(d0 => stOv ? Object.assign({}, d0, { status: d0.status === "Not required" ? d0.status : "Accepted", reason: "" }) : d0).map((d, i) => ({ name: d.name, note: d.note, reason: d.reason, hasReason: d.status === "Rejected" && !!d.reason, status: d.status, icon: DP[d.status][2], pillStyle: pill(DP[d.status][0], DP[d.status][1]), canUpload: !stOv && d.status !== "Not required" && d.status !== "Accepted", cta: d.status === "Missing" ? "Upload" : "Replace",
      upload: () => { this.setState(st => ({ kybDocs: st.kybDocs.map((x, n) => n === i ? Object.assign({}, x, { status: "Uploaded", reason: "" }) : x) })); this.xKybSave(); toast(d.name + " uploaded"); setTimeout(() => this.setState(st => ({ kybDocs: st.kybDocs.map((x, n) => n === i && x.status === "Uploaded" ? Object.assign({}, x, { status: "In review" }) : x) })), 1500); } }));
    const kid = c4 ? "done" : (s.kybId || "todo");
    out.kybIdTodo = kid === "todo"; out.kybIdRun = kid === "running"; out.kybIdSent = kid === "sent"; out.kybIdDone = kid === "done";
    out.kybIdStart = () => { this.setState({ kybId: "running" }); setTimeout(() => { this.setState({ kybId: "done" }); this.xKybSave(); }, 2200); };
    out.kybIdSms = () => { this.setState({ kybId: "sent" }); toast("Link sent by SMS to +254 7•• ••• 412"); };
    out.kybIdEmail = () => { this.setState({ kybId: "sent" }); toast("Link sent to achieng@acme.co"); };
    out.kybReview = [[1, "Your details", c1], [2, "Ownership", c2], [3, "Documents", c3], [4, "Identity check", c4]].map(([n, label, ok]) => ({ label, state: ok ? "Complete" : "Incomplete", style: ok ? pill("var(--ok-bg)", "var(--ok-text)") : pill("var(--warn-bg)", "var(--warn-text)"), onClick: () => this.setState({ kybStage: n }) }));
    const todo = [];
    if (!c1) todo.push([acct === "rejected" ? "Your details: registered address does not match the certificate of incorporation" : "Your details: fill legal name, registration number and corridors", 1]);
    if (!stOv && acct !== "rejected") people.forEach(p => { if (!p.name || !p.idNo) todo.push(["Ownership: add the ID number for " + (p.name || "the new person"), 2]); });
    if (!stOv && acct !== "rejected") docs.forEach(d => { if (d.status === "Missing" || d.status === "Rejected") todo.push(["Documents: " + (d.status === "Missing" ? "upload " : "replace ") + d.name, 3]); });
    if (!c4) todo.push(["Identity check: complete liveness for Achieng Odhiambo", 4]);
    out.kybTodo = todo.map(([label, n]) => ({ label, onClick: () => this.setState({ kybStage: n }) }));
    out.kybTodoShow = todo.length > 0;
    out.kybConfirm = !!s.kybConfirm; out.kybConfirmToggle = () => this.setState({ kybConfirm: !s.kybConfirm });
    const canSubmit = todo.length === 0 && !!s.kybConfirm && (acct === "unverified" || acct === "moreinfo" || acct === "rejected");
    out.kybSubmitDisabled = !canSubmit; out.kybSubmitStyle = btn1(!canSubmit);
    out.kybSubmitLabel = acct === "review" ? "Submitted" : verified ? "Approved" : "Submit for review";
    out.kybSubmit = () => { if (!canSubmit) return; this.setState({ acct: "review", kybOpen: false, kybConfirm: false }); toast("Submitted. Status: in review."); };
    out.kybBackShow = ks > 1; out.kybNextShow = ks < 5;
    out.kybBack = () => this.setState({ kybStage: ks - 1 }); out.kybNext = () => this.setState({ kybStage: ks + 1 });
    out.kybLimits = (verified ? [["Per payment", "KES 10,000,000"], ["Per day", "KES 50,000,000"], ["Per month", "KES 400,000,000"]] : [["Per payment", "Sandbox only"], ["Per day", "Sandbox only"], ["Per month", "Sandbox only"]]).map(([a, b]) => kv(a, b, true));
    out.kybTier = verified ? "Tier 2 · Verified business" : "Tier 0 · Not verified";
    out.kybNextTier = verified ? "Tier 3 raises per-payment limits for businesses with audited accounts and 6 months of history." : "Tier 1 opens on approval: live payouts up to KES 1,000,000 per payment and KES 5,000,000 per day.";

    /* toast + titles + header action */
    out.toastShow = !!s.toast; out.toastText = s.toast || "";
    const T = { xborder: ["International payouts", "Export CSV", out.xpExport], xdetail: ["Payment " + (sel ? sel.id : ""), "", null], bens: ["Recipients", s.benAdd ? "Close form" : "Add recipient", () => this.setState({ benAdd: !s.benAdd })], bulk: ["Bulk payouts", "Download template", () => toast("payouts-template.csv downloaded")], remitters: ["Clients", "Export CSV", () => toast("customers-nov-2026.csv exported")], reports: ["Reports", "Export", () => toast("accounting-export-oct-2026.csv is ready")], devtools: ["Developers", "Add endpoint", () => toast("Add endpoint: URL, events and a signing secret. The secret is shown once.")], partners: ["Partners", "Copy referral link", out.ptCopy], connect: ["Connect", "", null], billing: ["Billing", "", null] }[V];
    if (T) { out.viewTitle = T[0]; out.hasHeaderAction = !!T[2]; out.headerActionLabel = T[1]; out.headerAction = T[2] || (() => {}); }
    else if (V === "overview") { out.hasHeaderAction = false; }
    return out;
  }


  renderVals0() {
    const s = this.state;
    const live = true;
    const envPal = { bg: "var(--indigo-tint)", text: "var(--indigo-text)" };

    const nav = {};
    [["overview", "Overview", ""], ["wallets", "Wallets", ""], ["checkout", "Checkout", "new"], ["transactions", "Transactions", s.fresh ? "" : "1.2k"], ["keys", "Keys", "3"], ["settings", "Settings", ""], ["reference", "Reference", ""]]
      .forEach(([id, cap, b]) => {
        const on = s.view === id || (id === "checkout" && s.view === "paybill") || (id === "wallets" && s.view === "otc");
        nav["nav" + cap + "Click"] = () => this.setState(id === "checkout" ? { view: id, coSubOpen: true } : { view: id });
        nav["nav" + cap + "Style"] = this.navBtn(on, id === "settings" || id === "team", false);
        nav["nav" + cap + "Current"] = on ? "page" : "false";
        nav["nav" + cap + "Badge"] = b;
        nav["nav" + cap + "BadgeStyle"] = "margin-left: auto; font-size: 10.5px; font-weight: 700; padding: " +
          (b ? "2px 7px" : "0") + "; border-radius: 999px; background: " +
          (b ? (on ? "rgba(67,57,202,0.12)" : "var(--surface)") : "transparent") +
          "; color: " + (on ? "var(--indigo-text)" : "var(--rail-dim)");
      });

    [["Links", "link"], ["Invoices", "invoice"], ["Embed", "embed"]].forEach(([k, id]) => {
      const on = (s.view === "checkout" && (s.checkoutMode || "link") === id) || (id === "link" && s.view === "paybill");
      nav["nav" + k + "Click"] = () => this.setState({ view: "checkout", checkoutMode: id, railMobile: false, pay: "select" });
      nav["nav" + k + "Style"] = this.navBtn(on, false, false);
      nav["nav" + k + "Current"] = on ? "page" : "false";
      nav["nav" + k + "Badge"] = "";
      nav["nav" + k + "BadgeStyle"] = "display: none";
    });
    nav.railClosed = !s.railOpen;
    nav.coSubOpen = s.coSubOpen !== false;
    nav.toggleCoSub = e => { e.stopPropagation(); this.setState({ coSubOpen: s.coSubOpen === false }); };
    nav.coChevStyle = "display: grid; place-items: center; width: 22px; height: 22px; margin-left: 4px; flex-shrink: 0; border-radius: 6px; transition: transform 0.2s; transform: rotate(" + (s.coSubOpen === false ? "-90deg" : "0deg") + ")";
    [["Link", "link"], ["Invoice", "invoice"], ["Embed", "embed"]].forEach(([k, id]) => {
      const on = s.view === "checkout" && s.checkoutMode === id;
      nav["sub" + k + "Click"] = () => this.setState({ view: "checkout", checkoutMode: id, railMobile: false });
      nav["sub" + k + "Style"] = "display: flex; align-items: center; gap: 10px; width: 100%; padding: 7px 12px 7px 38px; border: 0; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 12.5px; text-align: left; font-weight: " + (on ? "700" : "500") + "; background: " + (on ? "var(--surface)" : "transparent") + "; color: " + (on ? "var(--ink)" : "var(--rail-dim)");
    });
    const heights = [14, 18, 15, 11, 9, 8, 12, 19, 27, 38, 47, 55, 62, 58, 67, 78, 72, 64, 57, 48, 37, 31, 26, 21];
    const bars = heights.map((h, i) => {
      const fail = i % 7 === 3 ? Math.max(4, Math.round(h * 0.12)) : 0;
      return {
        title: String(i).padStart(2, "0") + ":00 — " + Math.round(h * 4.2) + " settled" + (fail ? ", " + Math.round(fail * 4.2) + " failed" : ""),
        failStyle: "height: " + fail + "%; border-radius: 3px 3px 0 0; background: oklch(0.8 0.1 25)",
        okStyle: "height: " + h + "%; border-radius: " + (fail ? "0 0 3px 3px" : "3px 3px 0 0") + "; background: " + (i >= 22 ? INDIGO : "var(--indigo-soft)")
      };
    });

    const amountNum = Number(String(s.amount).replace(/[^0-9.]/g, "")) || 0;
    const rate = (MARKETS[s.currency] || MARKETS.KES).rate;
    const tokenAmount = (amountNum / rate).toFixed(2);
    const fmtFiat = amountNum.toLocaleString() + " " + s.currency;

    const methods = [
      [(MARKETS[s.currency] || MARKETS.KES).wallet, "Push prompt"],
      [(MARKETS[s.currency] || MARKETS.KES).second, "USSD"],
      ["Bank transfer", "1–2 h"]
    ].map(([label, note], i) => ({
      label, note,
      onClick: () => this.setState({ method: i }),
      style: [
        "display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 12px; cursor: pointer; text-align: left",
        "border-radius: 8px; color: var(--ink); border: 1px solid " + (s.method === i ? INDIGO : "var(--border-strong)"),
        "background: " + (s.method === i ? TINT : "var(--panel)")
      ].join("; "),
      radioStyle: "width: 15px; height: 15px; border-radius: 999px; flex-shrink: 0; border: " +
        (s.method === i ? "4.5px solid " + INDIGO : "1.5px solid var(--border-strong)")
    }));

    const nf = n => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const ACCOUNTS = BASE_ACCOUNTS.map(a => {
      const c = (s.credits || {})[a.chain] || 0;
      if (!c) return a;
      const n = Number(String(a.balance).replace(/,/g, "")) + c;
      return Object.assign({}, a, { balance: nf(n), fiat: "≈ " + (s.homeCountry || "KES") + " " + ((n * (MARKETS[s.homeCountry] || MARKETS.KES).rate * 1.0073) / 1e6).toFixed(2) + "M" });
    });

    const openIdx = ACCOUNTS.map((a, i) => i).filter(i => s.chains.length ? s.chains.indexOf(ACCOUNTS[i].chain) >= 0 : ACCOUNTS[i].chain === "Base");
    const ai = openIdx.indexOf(s.account) >= 0 ? s.account : (openIdx.length ? openIdx[0] : 0);
    const heldUsdc = openIdx.filter(i => ACCOUNTS[i].asset === "USDC").reduce((t, i) => t + Number(ACCOUNTS[i].balance.replace(/,/g, "")), 0);
    const heldUsdt = openIdx.filter(i => ACCOUNTS[i].asset === "USDT").reduce((t, i) => t + Number(ACCOUNTS[i].balance.replace(/,/g, "")), 0);
    const money = n => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const heldKes = (s.homeCountry || "KES") + " " + ((heldUsdc + heldUsdt) * (MARKETS[s.homeCountry] || MARKETS.KES).rate * 1.0073 / 1e6).toFixed(2) + "M";
    const heldNote = [heldUsdc ? money(heldUsdc) + " USDC" : null, heldUsdt ? money(heldUsdt) + " USDT" : null].filter(Boolean).join(" · ") || "No balance yet";

    const ACC = ACCOUNTS[ai];
    const CUR = s.homeCountry || "KES", HOME = MARKETS[CUR] || MARKETS.KES;
    const RATE = HOME.rate * 1.0073;
    const AMT = parseFloat(String(s.sendAmount).replace(/[^0-9.]/g, "")) || 0;
    const REF = "TU-" + String(7400 + Math.round(AMT % 900));
    const stageOf = k => (s.flow && s.flow.kind === k) ? s.flow.step : "";
    const fRow = (label, value, strong) => ({
      label, value,
      rowStyle: "display: flex; align-items: baseline; gap: 12px; padding: 11px 14px; border-top: 1px solid var(--line); flex-wrap: wrap",
      valueStyle: "margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: " + (strong ? "14px" : "12.5px") +
        "; font-weight: " + (strong ? "700" : "500") + "; color: var(--ink); text-align: right; overflow-wrap: anywhere"
    });
    const flowBlock = (kind, cfg) => {
      const st = stageOf(kind);
      const done = st === "done";
      const c = (done ? cfg.done : cfg.pending) || {};
      const o = {};
      o[kind + "Form"] = !st;
      o[kind + "Result"] = !!st;
      o[kind + "Title"] = c.title || "";
      o[kind + "Note"] = c.note || "";
      o[kind + "Rows"] = c.rows || [];
      o[kind + "Icon"] = done ? "✓" : "";
      o[kind + "IconStyle"] = done
        ? "width: 40px; height: 40px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 18px; font-weight: 700; background: " + OK.bg + "; color: " + OK.text + "; animation: ep-pop 0.4s cubic-bezier(0.2,1.5,0.4,1) both"
        : "width: 30px; height: 30px; margin: 5px; flex-shrink: 0; border-radius: 999px; box-sizing: border-box; border: 3px solid var(--surface); border-top-color: var(--indigo); animation: ep-spin 0.8s linear infinite";
      const SL = { topup: ["Amount", "Paying", "Funded"], send: ["Recipient", "Sending", "Delivered"], refund: ["Amount", "Refunding", "Refunded"], invoice: ["Details", "Sending", "Sent"], key: ["Scope", "Creating", "Ready"] }[kind] || ["Details", "Working", "Done"];
      const at = !st ? 0 : (done ? 2 : 1);
      o[kind + "Steps"] = SL.map((label, i) => ({
        label: (i < at || (done && i === 2) ? "✓ " : "") + label,
        barStyle: "display: block; height: 4px; border-radius: 999px; transition: background .3s; background: " + (i <= at ? (done ? OK.text : "var(--indigo)") : "var(--surface)"),
        labelStyle: "font-size: 11px; font-weight: " + (i === at ? "700" : "600") + "; color: " + (i === at ? "var(--ink)" : i < at ? "var(--muted)" : "var(--faint)") + "; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
      }));
      o[kind + "BtnLabel"] = !st ? cfg.formCta : (done ? (cfg.doneCta || "Done") : (cfg.pendingCta || "Waiting…"));
      o[kind + "BtnAction"] = !st ? cfg.run : (done ? (cfg.doneAction || (() => this.setState({ modal: null, flow: null }))) : (() => {}));
      o[kind + "BtnStyle"] = "flex: 1 1 190px; padding: 13px; border-radius: 12px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 13.5px; font-weight: 700; " +
        (st && !done ? "opacity: 0.55; cursor: progress" : "cursor: pointer");
      return o;
    };
    const creditWallet = () => ({
      credits: Object.assign({}, s.credits, { [ACC.chain]: ((s.credits || {})[ACC.chain] || 0) + AMT / RATE }),
      lastTopUp: { chain: ACC.chain, asset: ACC.asset, amount: AMT / RATE, source: s.topUpSource, ref: REF }
    });

    const filters = ["All", "Settled", "Processing", "Pending", "Failed", "Refunded"].map(label => ({
      label,
      onClick: () => this.setState({ filter: label, sel: 0 }),
      style: this.tabBtn(s.filter === label)
    }));

    const q = s.query.trim().toLowerCase();
    const ORD = (s.liveApproved ? ORDERS : (s.testOrders || [])).map(o => (s.refunded || {})[o.id]
      ? Object.assign({}, o, { status: "refunded", mpesa: (s.refunded || {})[o.id] })
      : o);
    const refundedCount = Object.keys(s.refunded || {}).length;
    const visible = ORD.filter(o => {
      const f = s.filter === "All" ? true : o.status === s.filter.toLowerCase();
      const m = !q || (o.id + o.recipient + o.ref + o.hash).toLowerCase().includes(q);
      return f && m;
    });

    const locWalletName = ((MARKETS[s.currency] || MARKETS.KES).wallet || "M-Pesa").split(" · ")[0].split(" / ")[0];
    const orders = visible.map((o, i) => ({
      ...o,
      onClick: () => this.setState({ sel: i, txOpen: true, drawerTech: false }),
      rowStyle: "cursor: pointer; background: " + (s.txOpen && s.sel === i ? TINT : "transparent"),
      who: o.recipient,
      kind: o.flow === "Off-ramp" ? "Payout" : "Payment",
      dirIn: o.flow !== "Off-ramp",
      dirOut: o.flow === "Off-ramp",
      dirLabel: o.flow === "Off-ramp" ? "Money out" : "Money in",
      dirStyle: "width: 30px; height: 30px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; " + (o.flow === "Off-ramp" ? "background: var(--bad-bg); color: var(--bad-text)" : "background: var(--ok-bg); color: var(--ok-text)") + (o.status === "failed" ? "; opacity: 0.5" : ""),
      method: /^0x/.test(o.recipient || "") ? "Crypto wallet" : (o.mpesa && o.mpesa !== "—") ? (o.wallet || locWalletName) : "Card",
      got: o.crypto && o.crypto !== "—" ? o.crypto : o.fiat,
      statusLabel: ({ settled: "Completed", processing: "In progress", pending: "Waiting", failed: "Failed", refunded: "Refunded" })[o.status] || o.status,
      download: e => { e && e.stopPropagation && e.stopPropagation(); this.printReceipt(o); },
      badgeStyle: badge(STATUS_PALETTE[o.status] || NEUTRAL)
    }));

    const order = visible[s.sel] || visible[0] || ORD[0] || ORDERS[0];
    const justRefunded = !!(s.refunded || {})[order.id];
    const isOut = order.flow === "Off-ramp";
    const GREY = "#c9c7d8", RED = "oklch(0.6 0.16 25)", GRN = "oklch(0.6 0.14 152)";
    const done = order.status === "settled";
    const has = v => v && v !== "—";
    const got = has(order.crypto) ? order.crypto : order.fiat;
    const tl = (isOut ? [
      ["Payout started", INDIGO],
      [order.status === "failed" ? "Payout failed. Your balance was not charged." : done || order.status === "refunded" ? "Sent to " + order.recipient : "Sending to " + order.recipient, order.status === "failed" ? RED : done ? GRN : GREY]
    ] : [
      ...(order.wa ? [["Link sent on WhatsApp", INDIGO], ["Customer opened it", INDIGO]] : [["Customer opened the checkout", INDIGO]]),
      [order.status === "pending" ? "Waiting for the customer to pay" : order.status === "failed" ? "Payment didn't go through" : "Customer paid " + order.fiat, order.status === "pending" ? GREY : order.status === "failed" ? RED : INDIGO],
      ...(order.status === "failed" || order.status === "pending" ? [] : [[done || order.status === "refunded" ? got + " added to your wallet" : "Adding " + got + " to your wallet", done || order.status === "refunded" ? GRN : GREY]])
    ]).concat(order.status === "refunded" || justRefunded ? [["Refunded to the customer", RED]] : [])
     .map(([label, c]) => ({
      label,
      dotStyle: "width: 9px; height: 9px; border-radius: 999px; margin-top: 4px; flex-shrink: 0; background: " + c
    }));

    const endpoints = ENDPOINTS.map((e, i) => ({
      method: e.method, path: e.path,
      onClick: () => this.setState({ ep: i }),
      methodStyle: this.methodColor(e.method),
      style: [
        "display: flex; align-items: center; gap: 8px; width: 100%; padding: 9px 10px; cursor: pointer; text-align: left",
        "border: 0; border-radius: 8px; background: " + (s.ep === i ? TINT : "transparent"),
        "color: var(--ink); font-weight: 600"
      ].join("; ")
    }));
    const ep = ENDPOINTS[s.ep];

    return {
      modalInvoice: s.modal === "invoice",
      invoiceNumber: "INV-1043",
      invoiceClient: s.invoiceClient,
      setInvoiceClient: e => this.setState({ invoiceClient: e.target.value }),
      invoiceEmail: s.invoiceEmail,
      setInvoiceEmail: e => this.setState({ invoiceEmail: e.target.value }),
      invoiceItem: s.invoiceItem,
      setInvoiceItem: e => this.setState({ invoiceItem: e.target.value }),
      invoiceTerms: s.invoiceTerms,
      setInvoiceTerms: e => this.setState({ invoiceTerms: e.target.value }),
      invoiceSummary: s.invoiceTerms === "On receipt"
        ? "Due as soon as they open it."
        : "Due " + s.invoiceTerms + " after sending — a reminder goes out two days before.",
      modalRefund: s.modal === "refund",
      refundOrder: s.refundOrder,
      refundAmount: s.refundAmount,
      setRefundAmount: e => this.setState({ refundAmount: e.target.value }),
      refundReason: s.refundReason,
      setRefundReason: e => this.setState({ refundReason: e.target.value }),
      refundKinds: [["full", "Full refund", "Return everything"], ["partial", "Partial", "Return some of it"]].map(([id, label, note]) => ({
        label, note,
        onClick: () => this.setState({ refundKind: id }),
        style: "flex: 1 1 150px; display: flex; flex-direction: column; gap: 2px; align-items: flex-start; text-align: left; padding: 12px 14px; border-radius: 12px; cursor: pointer; font-family: inherit; background: " +
          (s.refundKind === id ? TINT : "var(--panel-solid)") + "; border: 1px solid " + (s.refundKind === id ? INDIGO : "var(--border-strong)"),
        labelStyle: "font-size: 13px; font-weight: 700; color: " + (s.refundKind === id ? "var(--indigo-text)" : "var(--ink)")
      })),
      refundSummary: [
        ["Returned via", "M-Pesa · original number"],
        ["Fee refunded", "No · KES 55 retained"],
        ["Customer sees it in", "Up to 2 hours"]
      ].map(([label, value]) => ({
        label, value,
        rowStyle: "display: flex; align-items: baseline; gap: 12px; padding: 11px 14px; border-top: 1px solid var(--line); flex-wrap: wrap",
        valueStyle: "margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12.5px; font-weight: 500; text-align: right; overflow-wrap: anywhere"
      })),
      ...flowBlock("topup", {
        formCta: s.topUpSource === "mpesa" ? ((MARKETS[s.topUpCountry] ? s.topUpCountry : CUR) === "KES" ? "Send STK push" : "Send payment prompt") : s.topUpSource === "chain" ? "Show deposit address" : "Get transfer details",
        run: () => {
          if (s.topUpSource === "chain") { this.setState({ flow: { kind: "topup", step: "done" } }); return; }
          this.runFlow("topup", s.topUpSource === "bank" ? 4200 : 2000, creditWallet);
        },
        pendingCta: s.topUpSource === "mpesa" ? "Waiting for approval…" : "Waiting for the transfer…",
        pending: s.topUpSource === "mpesa" ? {
          title: "Check your handset",
          note: "Check your phone and approve with your " + (MARKETS[s.topUpCountry] || MARKETS[CUR] || MARKETS.KES).wallet + " PIN.",
          rows: [fRow("Paying in", (MARKETS[s.topUpCountry] ? s.topUpCountry : CUR) + " " + AMT.toLocaleString()), fRow("Into", ACC.chain + " · " + ACC.asset), fRow("Reference", REF)]
        } : {
          title: "Waiting for your transfer",
          note: "Send from your bank with this reference. Usually lands within the hour.",
          rows: [fRow("Bank", ({ KES: "Equity Bank Kenya", TZS: "CRDB Bank", UGX: "Stanbic Uganda", RWF: "Bank of Kigali", GHS: "GCB Bank", NGN: "Wema Bank" })[(MARKETS[s.topUpCountry] ? s.topUpCountry : CUR)] || "Equity Bank Kenya"), fRow("Account", (MARKETS[s.topUpCountry] ? s.topUpCountry : CUR) === "NGN" ? "0123 4567 89" : "0100 8841 2290"), fRow("Reference", REF, true)]
        },
        done: s.topUpSource === "chain" ? {
          title: "Send " + ACC.asset + " to this address",
          note: "Only " + ACC.asset + " on " + ACC.chain + ". Anything else is unrecoverable. We credit the wallet " + ACC.eta + " after the deposit confirms.",
          rows: [fRow("Address", ACC.address), fRow("Network", ACC.chain), fRow("Network fee", ACC.fee)]
        } : {
          title: "Wallet funded",
          note: "Your balance is updated.",
          rows: [
            fRow("Credited", "+" + (AMT / RATE).toFixed(2) + " " + ACC.asset, true),
            fRow("Into", ACC.chain + " · " + ACC.asset),
            fRow("New balance", ACC.balance + " " + ACC.asset),
            fRow("Reference", REF)
          ]
        }
      }),
      ...flowBlock("invoice", {
        formCta: "Send invoice",
        run: () => this.runFlow("invoice", 1400),
        pendingCta: "Sending…",
        pending: { title: "Sending the invoice", note: "Rendering the PDF and emailing it with a pay button." },
        done: {
          title: "Invoice sent",
          note: "Pending until they pay.",
          rows: [
            fRow("To", s.invoiceEmail || "accounts@kesho.co.ke"),
            fRow("Amount", s.currency + " " + (parseFloat(String(s.amount).replace(/[^0-9.]/g, "")) || 0).toLocaleString(), true),
            fRow("Due", s.invoiceTerms === "On receipt" ? "On receipt" : s.invoiceTerms + " from today"),
            fRow("Pay link", "pay.elementpay.net/i/1043")
          ]
        }
      }),
      ...flowBlock("refund", {
        formCta: "Issue refund",
        run: () => this.runFlow("refund", 1700, st => ({
          refunded: Object.assign({}, st.refunded, { [st.refundOrder]: "SJ42XR1MM8" })
        })),
        pendingCta: "Returning…",
        pending: { title: "Returning the money", note: "Reversing the settlement on-chain, then pushing the fiat back out." },
        done: {
          title: "Refund sent",
          note: "The order now reads refunded. The customer gets an SMS with the reason you typed.",
          rows: [
            fRow("Returned", CUR + " " + (parseFloat(String(s.refundAmount).replace(/[^0-9.]/g, "")) || 0).toLocaleString(), true),
            fRow("To", "+2547••••4192"),
            fRow("M-Pesa ref", "SJ42XR1MM8"),
            fRow("Order", s.refundOrder || "—")
          ]
        }
      }),
      ...flowBlock("send", {
        formCta: "Send payout",
        run: () => this.runFlow("send", 1800, () => ({
          credits: Object.assign({}, s.credits, { [ACC.chain]: ((s.credits || {})[ACC.chain] || 0) - AMT / RATE })
        })),
        pendingCta: "Sending…",
        pending: { title: "Sending the payout", note: "Debiting the wallet, then pushing to the rail." },
        done: {
          title: "Payout sent",
          note: "It shows in Recent movements, and the wallet balance above has already gone down.",
          rows: [
            fRow("Recipient gets", (MARKETS[s.sendCountry] ? s.sendCountry : CUR) + " " + Math.max(0, AMT - Math.round((MARKETS[s.sendCountry] && s.sendCountry !== CUR ? 25 : 15) * (MARKETS[s.sendCountry] || HOME).rate / 129.2)).toLocaleString(), true),
            fRow("To", (s.sendTo || ((MARKETS[s.sendCountry] || HOME).dial + " •••• " + (MARKETS[s.sendCountry] || HOME).sample.slice(-3))) + " · " + (MARKETS[s.sendCountry] || HOME).country),
            fRow("Reference", "SJ42XT6NN3"),
            fRow("Debited", "−" + (AMT / RATE).toFixed(2) + " " + ACC.asset + " · " + ACC.chain)
          ]
        }
      }),
      ...flowBlock("key", {
        formCta: "Generate key",
        run: () => this.runFlow("key", 1200),
        pendingCta: "Generating…",
        pending: { title: "Generating the key", note: "Minting the secret and hashing it for storage." },
        done: {
          title: "Key created",
          note: "Copy the secret now. We keep only a hash, so this is the only time it is shown.",
          rows: [
            fRow("Label", "Payout bot"),
                        fRow("Created", "just now · by dev@acme.co")
          ]
        },
        doneCta: "Done"
      }),
      keyRevealed: stageOf("key") === "done",
      keySecret: "sk_" + (live ? "live" : "test") + "_7c41a9d0f2b84e19aa03",
      keyCopyLabel: s.copiedKey === "secret" ? "Copied" : "Copy",
      copyKeySecret: () => this.copyKey("secret"),
      modalTopUp: s.modal === "topup",
      ...(() => {
        const acc = ACCOUNTS[ai];
        const amt = parseFloat(String(s.sendAmount).replace(/[^0-9.]/g, "")) || 0;
        const HOMEC = MARKETS[s.homeCountry] ? s.homeCountry : "KES";
        const cKey = s.modal === "topup" ? "topUpCountry" : "sendCountry";
        const CUR = MARKETS[s[cKey]] ? s[cKey] : HOMEC, HOME = MARKETS[CUR], KE = CUR === "KES", NG = CUR === "NGN";
        const CROSS = CUR !== HOMEC;
        const rate = HOME.rate * 1.0073, FEE = Math.round((CROSS ? 25 : 15) * HOME.rate / 129.2);
        const rateTxt = rate.toFixed(2) + " " + CUR + " / ";
        const tgtList = KE ? [
            { id: "phone", label: "Send money", note: "To a phone", mark: "M-PESA", bg: "#00a651" },
            { id: "paybill", label: "Paybill", note: "Business number", mark: "PAYBILL", bg: "#4a5560" },
            { id: "till", label: "Till", note: "Buy goods", mark: "TILL", bg: "#4a5560" },
            { id: "bank", label: "Bank", note: "1–2 hours", mark: "BANK", bg: "#4b5563" }
          ] : NG ? [
            { id: "bank", label: "Bank account", note: "Any Nigerian bank · instant", mark: "NIP", bg: "#4b5563" },
            { id: "phone", label: "Wallet", note: "OPay or PalmPay", mark: "OPAY", bg: "#1dcf9f" }
          ] : [
            { id: "phone", label: "Mobile money", note: HOME.wallets, mark: HOME.mark, bg: ({ "M-PESA": "#00a651", MTN: "#ffcb05", OPAY: "#1dcf9f", AIRTEL: "#e40000", MOMO: "#ffcb05" })[HOME.mark] || "#00a651" },
            { id: "bank", label: "Bank", note: HOME.bank, mark: "BANK", bg: "#4b5563" }
          ];
        const tgt = tgtList.some(t => t.id === s.payoutTarget) ? s.payoutTarget : tgtList[0].id;
        const pick = (id, cur, list) => list.map(o => {
          const on = cur === o.id;
          return {
            label: o.label, note: o.note, mark: o.mark,
            onClick: () => this.setState({ [id]: o.id }),
            style: "flex: 1 1 145px; display: flex; align-items: center; gap: 9px; padding: 11px 12px; border-radius: 12px; cursor: pointer; font-family: inherit; min-width: 0; text-align: left; background: " +
              (on ? TINT : "var(--panel-solid)") + "; border: 1px solid " + (on ? INDIGO : "var(--border-strong)"),
            markStyle: "flex-shrink: 0; padding: 4px 6px; border-radius: 5px; font-family: 'Manrope', system-ui, sans-serif; font-size: 8.5px; font-weight: 700; letter-spacing: 0.03em; background: " + o.bg + "; color: " + (["#ffcb05", "#ff7900", "#1dc8f2", "#1dcf9f"].includes(o.bg) ? "#1a1a1a" : "#fff"),
            labelStyle: "font-size: 12.5px; font-weight: 700; white-space: nowrap; color: " + (on ? "var(--indigo-text)" : "var(--ink)")
          };
        });
        const row = (label, value, strong) => ({
          label, value,
          rowStyle: "display: flex; align-items: baseline; gap: 12px; padding: 11px 14px; border-top: 1px solid var(--line); flex-wrap: wrap",
          valueStyle: "margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: " + (strong ? "14px" : "12.5px") +
            "; font-weight: " + (strong ? "700" : "500") + "; color: var(--ink); text-align: right; overflow-wrap: anywhere"
        });
        const fmt = n => n.toLocaleString(undefined, { maximumFractionDigits: 2 });
        const isChain = s.topUpSource === "chain";

        return {
          topUpTarget: acc.chain + " · " + acc.asset,
          topUpUnit: isChain ? acc.asset : CUR,
          sendUnit: CUR,
          topUpCta: s.topUpSource === "mpesa" ? (KE ? "Send STK push" : NG ? "Send payment prompt" : "Send payment prompt") : isChain ? "Show deposit address" : "Get transfer details",
          topUpSources: pick("topUpSource", s.topUpSource, [
            { id: "mpesa", label: NG ? "OPay" : HOME.wallet, note: HOME.dial + " •••• " + HOME.sample.slice(-3), mark: HOME.mark, bg: ({ "M-PESA": "#00a651", MTN: "#ffcb05", OPAY: "#1dcf9f", AIRTEL: "#e40000", MOMO: "#ffcb05" })[HOME.mark] || "#00a651" },
            { id: "bank", label: NG ? "Bank transfer" : "Bank", note: NG ? "Any bank or USSD" : "••••8841", mark: "BANK", bg: "#4b5563" },
            { id: "chain", label: "On-chain", note: acc.chain, mark: acc.asset, bg: "#4a5560" }
          ]),
          topUpSummary: isChain
            ? [row("Network", acc.chain), row("Network fee", acc.fee), row("Credited in", acc.eta)]
            : [row("Rate", rateTxt + acc.asset), row("Fee", CUR + " 0"),
               ...(CROSS ? [row("From", HOME.country)] : []),
               row("You receive", fmt(amt / rate) + " " + acc.asset, true)],

          payoutAvailable: acc.balance + " " + acc.asset,
          flowCountries: Object.keys(MARKETS).map(c => ({
            label: MARKETS[c].country,
            flagStyle: "width: 18px; height: 12px; flex-shrink: 0; border-radius: 2px; box-shadow: 0 0 0 1px rgba(20,24,28,0.1); background: center/cover no-repeat url(/flags/flag-" + MARKETS[c].iso + ".svg)",
            code: c,
            onClick: () => this.setState({ [cKey]: c, flowCountryOpen: false }),
            style: "display: flex; align-items: center; gap: 10px; min-width: 0; padding: 11px 12px; border-radius: 10px; cursor: pointer; font-family: inherit; text-align: left; color: var(--ink); border: " + (c === CUR ? "1.5px solid var(--indigo)" : "1px solid var(--border-strong)") + "; background: " + (c === CUR ? "var(--indigo-tint)" : "var(--panel-solid)")
          })).map(o => Object.assign(o, { flagStyle: o.flagStyle.replace("width: 18px; height: 12px", "width: 26px; height: 18px").replace("border-radius: 2px", "border-radius: 3px") })),
          flowCountryOpen: !!s.flowCountryOpen,
          toggleFlowCountry: () => this.setState({ flowCountryOpen: !s.flowCountryOpen }),
          flowCountryToggleLabel: s.flowCountryOpen ? "Close" : "Change",
          flowCurCountry: HOME.country + (CROSS ? "" : " · home"),
          flowCurCode: CUR,
          flowCurRails: HOME.wallets + " · " + HOME.bank,
          flowCurFlag: "width: 32px; height: 22px; flex-shrink: 0; border-radius: 4px; box-shadow: 0 0 0 1px rgba(20,24,28,0.12); background: center/cover no-repeat url(/flags/flag-" + HOME.cc + ".svg)",
          flowCross: CROSS,
          flowCrossNote: CROSS
            ? (s.modal === "topup" ? "Paying in from " + HOME.country + ". We convert " + CUR + " to " + acc.asset + " at the rate below." : "Sending to " + HOME.country + ". We convert from your " + acc.asset + " wallet and pay out in " + CUR + ".")
            : "",
          payoutTargets: pick("payoutTarget", tgt, tgtList),
          payoutFields: ({
            phone: [{ key: "sendTo", label: NG ? "Wallet phone number" : "Phone number", ph: HOME.dial + " " + HOME.sample, mono: true }],
            paybill: [
              { key: "sendTo", label: "Business number", ph: "247247", mono: true },
              { key: "sendAccount", label: "Account number", ph: "ACME-1042", mono: true }
            ],
            till: [{ key: "sendTo", label: "Till number", ph: "832 909", mono: true }],
            bank: [
              { key: "sendBank", label: "Bank", ph: ({ KES: "Equity Bank", TZS: "CRDB Bank", UGX: "Stanbic Uganda", RWF: "Bank of Kigali", GHS: "GCB Bank", NGN: "GTBank" })[CUR], mono: false },
              { key: "sendTo", label: NG ? "NUBAN account number" : "Account number", ph: NG ? "0123456789" : "0100 1234 5678", mono: true },
              { key: "sendAccount", label: "Account name", ph: "As registered", mono: false }
            ]
          })[tgt].map(fd => ({
            label: fd.label, ph: fd.ph, value: s[fd.key] || "",
            onChange: e => this.setState({ [fd.key]: e.target.value }),
            inputStyle: "padding: 12px 13px; border: 1px solid var(--border-strong); border-radius: 8px; background: var(--panel-solid); color: var(--ink); width: 100%; box-sizing: border-box; font-size: 13.5px" +
              (fd.mono ? "; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px" : "")
          })),
          payoutSummaryRows: [
            ...(CROSS ? [row("Destination", HOME.country + " · " + CUR), row("Arrives", "Usually within 30 minutes")] : []),
            row("Debited from", acc.chain + " · " + fmt(amt / rate) + " " + acc.asset),
            row("Rate", rateTxt + acc.asset),
            row(CROSS ? "Cross-border fee" : "Transfer fee", CUR + " " + FEE),
            row("Recipient gets", CUR + " " + fmt(Math.max(0, amt - FEE)), true)
          ],
          sendMax: () => this.setState({ sendAmount: String(Math.round(parseFloat(String(acc.balance).replace(/[^0-9.]/g, "")) * rate)) }),

          transferSubtitle: s.transferMode === "deposit"
            ? "Top up from an external wallet"
            : "Withdraw to an external wallet or move between your own",
          transferModes: [["withdraw", "Withdraw"], ["deposit", "Deposit"]].map(([id, label]) => ({
            label,
            onClick: () => this.setState({ transferMode: id }),
            style: "flex: 1; padding: 9px 14px; border-radius: 8px; border: 0; cursor: pointer; font-size: 12.5px; font-weight: 700; background: " +
              (s.transferMode === id ? "var(--indigo)" : "transparent") + "; color: " +
              (s.transferMode === id ? "var(--on-indigo)" : "var(--muted)")
          })),
          transferIsDeposit: s.transferMode === "deposit",
          transferIsWithdraw: s.transferMode !== "deposit",
          transferDepositAddress: acc.address,
          depositQrCells: (() => {
            const N = 21, out = [], seed = acc.chain.length + acc.asset.length;
            for (let y = 0; y < N; y++) for (let xx = 0; xx < N; xx++) {
              const fx = xx > N - 8 ? xx - (N - 7) : xx, fy = y > N - 8 ? y - (N - 7) : y;
              const finder = (xx < 7 && y < 7) || (xx > N - 8 && y < 7) || (xx < 7 && y > N - 8);
              let on;
              if (finder) { const r = Math.max(Math.abs(fx - 3), Math.abs(fy - 3)); on = r === 3 || r <= 1; }
              else on = ((xx * 11 + y * 5 + seed + ((xx * y) % 7)) % 3 === 0);
              out.push({ style: "border-radius: 1px; background: " + (on ? "#12102a" : "transparent") });
            }
            return out;
          })(),
          transferDepositWarning: "Only send " + acc.asset + " on " + acc.chain + ". Anything else is unrecoverable. Credited after " + acc.eta + ".",
          depositCopyLabel: s.copiedKey === "deposit" ? "Copied" : "Copy",
          copyDepositAddress: () => this.copyKey("deposit"),
          transferCta: s.transferMode === "deposit" ? "Done" : "Confirm withdrawal",
          transferFrom: acc.chain + " · " + acc.asset,
          transferFromLogo: LOGO(acc.chain, 26),
          transferFromBalance: acc.balance + " " + acc.asset,
          transferAsset: acc.asset,
          transferTo: s.transferTo,
          setTransferTo: e => this.setState({ transferTo: e.target.value }),
          transferOptions: [{ value: "external", label: "External wallet address" }]
            .concat(ACCOUNTS.filter(a => a.chain !== acc.chain).map(a => ({ value: a.chain, label: "My " + a.chain + " wallet · " + a.asset }))),
          transferIsExternal: s.transferMode !== "deposit" && s.transferTo === "external",
          transferSummary: s.transferMode === "deposit"
            ? [row("Network", acc.chain), row("Accepted asset", acc.asset), row("Credited after", acc.eta)]
            : [
                row("Route", s.transferTo === "external" ? "On-chain · " + acc.chain : acc.chain + " → " + s.transferTo),
                row("Network fee", s.transferTo === "external" ? acc.fee : "Free · internal"),
                row("Arrives in", s.transferTo === "external" ? acc.eta : "Instant")
              ]
        };
      })(),
      modalSend: s.modal === "send",
      modalTransfer: s.modal === "transfer",
      modalNewAccount: s.modal === "newaccount",
      modalNewLink: s.modal === "newlink",
      modalNewKey: s.modal === "newkey",
      modalInvite: s.modal === "invite",
      closeModal: () => this.setState({ modal: null, flow: null }),
      openTopUp: () => this.setState({ modal: "topup" }),
      openSend: () => this.setState({ modal: "send" }),
      openTransfer: () => this.setState({ modal: "transfer" }),
      openNewAccount: () => this.setState({ modal: "newaccount", chainsSnapshot: s.chains }),
      cancelNewAccount: () => this.setState({ modal: null, chains: s.chainsSnapshot || s.chains }),
      newAccountCta: (() => {
        const before = s.chainsSnapshot || s.chains;
        const added = s.chains.filter(c => before.indexOf(c) < 0);
        return added.length ? "Open " + added.join(", ") : "Done";
      })(),
      linkStepDetails: true,
      openNewLink: () => this.setState({ modal: "newlink", linkStep: 1 }),
      openNewKey: () => this.setState({ modal: "newkey" }),
      openInvite: () => this.setState({ modal: "invite" }),
      scopePicks: ["orders:read", "orders:write", "payouts:write", "webhooks:manage"].map(label => {
        const on = s.scopes.indexOf(label) >= 0;
        return {
          label,
          onClick: () => this.setState({ scopes: on ? s.scopes.filter(x => x !== label) : s.scopes.concat([label]) }),
          style: [
            "padding: 9px 12px; border-radius: 8px; cursor: pointer; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; font-weight: 500",
            "color: var(--ink)",
            "border: 1px solid " + (on ? INDIGO : "var(--border-strong)"),
            "background: " + (on ? TINT : "var(--panel)")
          ].join("; ")
        };
      }),
      totalHeld: heldKes,
      totalHeldFiat: heldNote,
      accountCount: openIdx.length,
      ...(() => {
        const t = (s.simStep || 0) % 7;
        const sel = t >= 1 ? 0 : -1;
        const M3 = [["M-Pesa", "Approve the prompt on your phone", "MP"], ["Card", "Visa or Mastercard", "CARD"], ["Stablecoin", "USDC or USDT · Base, Polygon", "USD"]];
        const LOGOS = [
          [{ style: "height: 20px; padding: 0 6px; border-radius: 5px; background: #fff; box-shadow: 0 0 0 1px #e3e5e8; display: inline-grid; place-items: center; white-space: nowrap; flex-shrink: 0; font-family: Arial, Helvetica, sans-serif; font-weight: 900; font-size: 8.5px; letter-spacing: 0.02em; color: #00A651", tx: "M-PESA" }],
          [{ style: "height: 20px; padding: 0 6px; border-radius: 5px; background: #fff; box-shadow: 0 0 0 1px #e3e5e8; display: inline-grid; place-items: center; white-space: nowrap; flex-shrink: 0; font-family: Arial, Helvetica, sans-serif; font-weight: 900; font-size: 9px; font-style: italic; letter-spacing: 0.02em; color: #1A1F71", tx: "VISA" }, { style: "height: 20px; padding: 0 6px; border-radius: 5px; background: #fff; box-shadow: 0 0 0 1px #e3e5e8; display: inline-grid; place-items: center; white-space: nowrap; flex-shrink: 0; font-family: Arial, Helvetica, sans-serif; font-weight: 900; width: 30px; padding: 0; margin-left: 4px; background: #fff radial-gradient(circle at 63% 50%, #F79E1B 0 5.5px, transparent 6px) , #fff; background-image: radial-gradient(circle at 37% 50%, rgba(235,0,27,0.92) 0 5.5px, transparent 6px), radial-gradient(circle at 63% 50%, #F79E1B 0 5.5px, transparent 6px)", tx: "" }],
          [{ style: "width: 22px; height: 22px; border-radius: 999px; background: #fff center/contain no-repeat url(/tokens/token-usdc.svg); box-shadow: 0 0 0 2px #fff", tx: "" }, { style: "width: 22px; height: 22px; border-radius: 999px; background: #fff center/contain no-repeat url(/tokens/token-usdt.svg); box-shadow: 0 0 0 2px #fff; margin-left: -6px", tx: "" }, { style: "width: 16px; height: 16px; border-radius: 4px; margin-left: 4px; background: center/contain no-repeat url(/chains/chain-base.svg)", tx: "" }]];
        const PAYL = ["Pay with M-Pesa", "Pay by card", "Pay with USDC"];
        
        const h = React.createElement;
        return {
          simPayLabel: PAYL[sel] || "Pay", simPick: t <= 2, simPrompt: t === 3 || t === 4, simDone: t >= 5,
          simPromptTitle: t === 3 ? "Check your phone" : "Confirming payment…",
          simPin: [0, 1, 2, 3].map(i => "width: 11px; height: 11px; border-radius: 999px; transition: background 0.3s; background: " + (t === 4 || i < 2 ? "#4339ca" : "#dcdfe3")),
          simMethods: M3.map((m, i) => ({
            name: m[0], note: m[1], mark: m[2], logos: LOGOS[i],
            style: "display: flex; align-items: center; gap: 10px; padding: 10px 11px; border-radius: 10px; transition: background 0.3s, border-color 0.3s; border: " + (i === sel ? "1.5px solid #4339ca" : "1px solid #e3e5e8") + "; background: " + (i === sel ? "#f0effc" : "#fff"),
            markStyle: "width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px; display: grid; place-items: center; font-family: 'Manrope', system-ui, sans-serif; font-size: " + (m[2].length > 2 ? "8.5px" : "10px") + "; font-weight: 800; background: " + (i === sel ? "#4339ca" : "#eceef0") + "; color: " + (i === sel ? "#fff" : "#4f5761"),
            dotStyle: "width: 14px; height: 14px; flex-shrink: 0; margin-left: auto; border-radius: 999px; box-sizing: border-box; transition: border 0.3s; border: " + (i === sel ? "4.5px solid #4339ca" : "1.5px solid #c8ccd1")
          })),
          simPayStyle: "margin-top: 4px; padding: 12px; border-radius: 10px; text-align: center; font-size: 13px; font-weight: 700; color: #fff; transition: transform 0.15s, background 0.3s; background: " + (t === 2 ? "#3a30b8" : "#4339ca") + "; transform: scale(" + (t === 2 ? "0.97" : "1") + ")",
          simCheck: h("span", { key: "c" + t, style: { width: 56, height: 56, borderRadius: 999, background: "#4339ca", display: "grid", placeItems: "center", animation: "epFeedIn 0.45s cubic-bezier(.2,.8,.2,1)" } },
            h("svg", { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" }, h("path", { d: "M5 12.5l4.5 4.5L19 7.5" }))),
          simLedDot: "width: 8px; height: 8px; flex-shrink: 0; border-radius: 999px; transition: background 0.3s; background: " + (t >= 5 ? "var(--indigo)" : "var(--border-strong)"),
          simLedText: t >= 5 ? "Settled to your KES wallet" : t >= 3 ? "Waiting for customer…" : "Your dashboard",
          simLedAmt: t >= 5 ? "+ KES 5,000" : "KES 0"
        };
      })(),
      isHome: s.screen === "home",
      isAuth: s.screen === "auth",
      isConsole: s.screen === "console",
      goHome: () => { try { window.open("https://elementpay.net", "_blank"); } catch (e) {} },
      goSignup: () => this.setState({ screen: "auth", authMode: "signup", authStep: 1 }),
      goLogin: () => this.setState({ screen: "auth", authMode: "login", authStep: 1 }),
      toggleAuthMode: () => this.setState({ authMode: s.authMode === "signup" ? "login" : "signup", authStep: 1 }),
      authSwitchPrompt: s.authMode === "signup" ? "Already have an account?" : "New here?",
      authSwitchCta: s.authMode === "signup" ? "Log in" : "Create an account",
      homeFacts: [
        { value: "5 chains", label: "Base · Stellar · Solana · Polygon · BSC" },
        { value: "99.98%", label: "Rolling 90-day API uptime" },
        { value: "42 s", label: "Median fiat-to-chain settlement" }
      ],
      homeSnippet: 'curl https://api.elementpay.net/api/v1/orders \\\n  -H "x-api-key: $ELEMENTPAY_API_KEY" \\\n  -d \'{\n    "order_type": 1,\n    "token": "USDC",\n    "chain": "base",\n    "hosted_checkout": true,\n    "fiat_payload": { "amount": 5000, "currency": "KES" }\n  }\'',
      agentEntry: [],
      railFlow: [
        { n: "1", step: "collect", label: "Mobile money push", note: "Customer approves on their handset. You get the order id straight away." },
        { n: "2", step: "convert", label: "Quote locks", note: "Shillings priced into USDC at accept time, held for 90 seconds." },
        { n: "3", step: "settle", label: "On-chain to your wallet", note: "Webhook fires the moment it lands, with the transaction hash." },
      ],
      homeCountries: [
        { code: "Kenya", cur: "KES", flagStyle: FLAG("ke") },
        { code: "Tanzania", cur: "TZS", flagStyle: FLAG("tz") },
        { code: "Uganda", cur: "UGX", flagStyle: FLAG("ug") },
        { code: "Rwanda", cur: "RWF", flagStyle: FLAG("rw") },
        { code: "Ghana", cur: "GHS", flagStyle: FLAG("gh") },
        { code: "Nigeria", cur: "NGN", flagStyle: FLAG("ng") }
      ],
      homeChains: [
        { name: "Base", assets: "USDC · USDT", logoStyle: LOGO("Base", 20) },
        { name: "Stellar", assets: "USDC", logoStyle: LOGO("Stellar", 20) },
        { name: "Solana", assets: "USDC · USDT", logoStyle: LOGO("Solana", 20) },
        { name: "Polygon", assets: "USDC · USDT", logoStyle: LOGO("Polygon", 20) },
        { name: "BSC", assets: "USDT", logoStyle: LOGO("BSC", 20) }
      ],
      authSteps: [1, 2].map(n => {
        const labels = { 1: "Account", 2: "Your business" };
        const on = s.authStep === n, done = s.authStep > n;
        return {
          label: labels[n],
          mark: done ? "✓" : String(n),
          style: [
            "display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 999px; font-size: 12.5px",
            "font-weight: " + (on ? "700" : "600"),
            "color: " + (on || done ? "var(--ink)" : "var(--muted)"),
            "border: 1px solid " + (on ? INDIGO : "var(--border)"),
            "background: " + (on ? TINT : "transparent")
          ].join("; "),
          markStyle: "width: 19px; height: 19px; border-radius: 999px; display: grid; place-items: center; font-size: 11px; font-weight: 700; background: " +
            (on || done ? INDIGO : "var(--surface)") + "; color: " + (on || done ? "var(--on-indigo)" : "var(--muted)")
        };
      }),
      authStep1: s.authMode === "signup" && s.authStep === 1,
      isLoginMode: s.authMode === "login",
      noop: e => e.preventDefault(),
      rememberMe: s.remember,
      toggleRemember: () => this.setState({ remember: !s.remember }),
      authVia: s.authVia,
      authViaNote: s.authVia === "github" ? "Signed in with GitHub as dev@acme.co" : "Signed in with Google as dev@acme.co",
      signupWithGithub: () => this.setState({ authVia: "github", authStep: 2 }),
      signupWithGoogle: () => this.setState({ authVia: "google", authStep: 2 }),
      chainProvisionNote: s.chains.length
        ? "We open " + s.chains.length + " wallet" + (s.chains.length === 1 ? "" : "s") + " now — " + s.chains.join(", ") + "."
        : "Pick at least one.",
      authStep2: s.authStep === 2, authStep1: s.authMode === "login" || s.authStep === 1,
      askLive: s.askLive,
      toggleAskLive: () => this.setState({ askLive: !s.askLive }),
      canGoBack: s.authStep > 1,
      prevAuthStep: () => this.setState({ authStep: Math.max(1, s.authStep - 1) }),
      nextAuthStep: () => {
        if (s.authMode === "login") { this.setState({ screen: "console", env: "live", liveApproved: true, fresh: false, devTools: true }); return; }
        const c = s.homeCountry || "KES";
        this.applyMarket(c);
        this.setState({ screen: "console", env: "live", view: "overview", fresh: false, freshDone: {}, liveApproved: true, liveRequested: false, modalGoLive: false, modal: null, devTools: s.builder === 2,
          chains: s.builder === 2 ? s.chains : (s.chains.length ? s.chains : ["Base"]), showLiveRequest: false,
          payoutCurrency: c + " — " + MARKETS[c].curLong, payoutMethod: this.payoutMethodsFor(c)[0] });
      },
      authTitle: s.authMode === "login" ? "Welcome back"
        : s.authStep === 1 ? "Create your account"
        : "About your business",
      authSub: s.authMode === "login" ? "Log in to your dashboard."
        : s.authStep === 1 ? "Free to start. No card needed."
        : "Three quick questions, then you're in.",
      showAuthSteps: false,
      authCta: s.authMode === "login" ? "Log in" : "Create account",
      authCtaOld: s.authMode === "login" ? "Log in"
        : s.authStep === 2 ? "Open my dashboard" : "Continue",
      authCtaDisabled: false,
      authCtaStyle: "flex: 1 1 200px; padding: 13px; border-radius: 8px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 14px; font-weight: 700; " +
        (s.authMode === "signup" && s.authStep === 2 && s.builder === 2 && !s.chains.length ? "opacity: 0.45; cursor: not-allowed" : "cursor: pointer"),
      chainPicks: ["Base", "Stellar", "Solana", "Polygon", "BSC"].map(label => {
        const on = s.chains.indexOf(label) >= 0;
        return {
          label,
          logoStyleSm: LOGO(label, 16),
          onClick: () => this.setState({
            chains: on ? s.chains.filter(c => c !== label) : s.chains.concat([label])
          }),
          style: [
            "display: inline-flex; align-items: center; gap: 8px",
            "padding: 8px 13px 8px 9px; border-radius: 8px; cursor: pointer; font-size: 12.5px; font-weight: 600",
            "color: var(--ink)",
            "border: 1px solid " + (on ? INDIGO : "var(--border-strong)"),
            "background: " + (on ? TINT : "var(--panel)")
          ].join("; ")
        };
      }),
      builderTypes: [
        ["↓", "Get paid", "Payment links, WhatsApp and walk-in QR"],
        ["↑", "Pay people", "Suppliers, staff and riders"],
        ["{ }", "Build with the API", "For developers"]
      ].map(([icon, label, note], i) => ({
        icon, label, note,
        onClick: () => this.setState({ builder: i }),
        iconStyle: "width: 28px; height: 28px; margin-bottom: 6px; border-radius: 8px; display: grid; place-items: center; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; font-weight: 700; background: " + (s.builder === i ? INDIGO : "var(--surface)") + "; color: " + (s.builder === i ? "var(--on-indigo)" : "var(--muted)"),
        style: [
          "display: flex; flex-direction: column; gap: 2px; padding: 12px 13px; cursor: pointer; text-align: left; font-family: inherit",
          "border-radius: 12px; color: var(--ink)",
          "border: 1.5px solid " + (s.builder === i ? INDIGO : "var(--border-strong)"),
          "background: " + (s.builder === i ? TINT : "var(--panel)")
        ].join("; ")
      })),
      signupIsApi: s.builder === 2,
      signupGeoNote: s.geoFound && s.geoFound !== "none" ? "Detected from your location" : "",
      signupCountries: Object.keys(MARKETS).map(c => {
        const on = (s.homeCountry || "KES") === c;
        return {
          country: MARKETS[c].country,
          flagStyle: "width: 18px; height: 12px; flex-shrink: 0; border-radius: 2px; box-shadow: 0 0 0 1px rgba(20,24,28,0.1); background: center/cover no-repeat url(/flags/flag-" + MARKETS[c].iso + ".svg)",
          onClick: () => this.setState({ homeCountry: c, otcFiat: c, homeSet: true, payoutCurrency: c + " — " + MARKETS[c].curLong, payoutMethod: this.payoutMethodsFor(c)[0] }),
          style: "display: inline-flex; align-items: center; gap: 7px; padding: 7px 12px 7px 9px; border-radius: 999px; cursor: pointer; font-family: inherit; font-size: 12.5px; font-weight: 600; color: var(--ink); border: 1.5px solid " + (on ? INDIGO : "var(--border-strong)") + "; background: " + (on ? TINT : "var(--panel)")
        };
      }),

      askLiveAccess: () => this.setState({ showLiveRequest: true }),
      kybAction: s.liveApproved ? () => this.setState({ modalGoLive: true, goLiveAck: false }) : () => this.setState({ showLiveRequest: true }),
      signOut: () => this.setState({ screen: "auth", authMode: "login", authStep: 1 }),
      showLiveRequest: s.showLiveRequest,
      closeLiveRequest: () => this.setState({ showLiveRequest: false }),
      liveRequestCta: s.liveRequested ? "Simulate approval (demo)" : "Send request",
      submitLiveRequest: () => {
        if (s.liveRequested) {
          this.setState({ liveApproved: true, fresh: false, showLiveRequest: false, modalGoLive: true, goLiveAck: false, view: "overview" });
        } else {
          this.setState({ liveRequested: true, liveApproved: false, showLiveRequest: false });
        }
      },
      liveRequestNote: s.liveRequested
        ? "Submitted. Reviews usually take under a day. In this demo you can simulate the approval."
        : "",
      liveRequestedYet: s.liveRequested,
      reqCompany: s.reqCompany,
      setReqCompany: e => this.setState({ reqCompany: e.target.value }),
      reqVolume: s.reqVolume,
      setReqVolume: e => this.setState({ reqVolume: e.target.value }),
      reqUse: s.reqUse,
      setReqUse: e => this.setState({ reqUse: e.target.value }),
      liveSteps: [
        ["1", "Tell us what you are building", "One paragraph."],
        ["2", "KYB documents", "Company docs and ID. Under 24 hours."],
        ["3", "Live keys issued", "Swap the key. Nothing else changes."]
      ].map(([mark, title, body]) => ({
        mark, title, body,
        markStyle: "width: 21px; height: 21px; border-radius: 999px; flex-shrink: 0; display: grid; place-items: center; font-size: 11px; font-weight: 700; background: " + TINT + "; color: var(--indigo-text)"
      })),

      jarvisOpen: s.jarvisOpen,
      jarvisClosed: !s.jarvisOpen,
      openJarvis: () => this.setState({ jarvisOpen: true }),
      closeJarvis: () => this.setState({ jarvisOpen: false }),
      jarvisAnswer: JARVIS_TOPICS[s.jarvisTopic].answer,
      jarvisCode: JARVIS_TOPICS[s.jarvisTopic].code,
      jarvisHasCode: !!JARVIS_TOPICS[s.jarvisTopic].code,
      jarvisPrompts: JARVIS_TOPICS.map((t, i) => ({
        label: t.prompt,
        onClick: () => this.setState({ jarvisTopic: i }),
        style: [
          "width: 100%; text-align: left; padding: 10px 12px; cursor: pointer; font-size: 12.5px; font-weight: 600",
          "border-radius: 8px; color: var(--ink)",
          "border: 1px solid " + (s.jarvisTopic === i ? INDIGO : "var(--border-strong)"),
          "background: " + (s.jarvisTopic === i ? TINT : "var(--panel)")
        ].join("; ")
      })),
      jarvisInput: s.jarvisInput,
      setJarvisInput: e => this.setState({ jarvisInput: e.target.value }),
      sendJarvis: () => this.setState({ jarvisTopic: 1, jarvisInput: "" }),

      ...nav,
      themeLabel: s.theme === "dark" ? "Light mode" : "Dark mode",
      toggleTheme: () => this.setTheme(s.theme === "dark" ? "light" : "dark"),
      useSandbox: () => this.setEnv("sandbox"),
      useLive: () => this.setEnv("live"),
      sandboxTabStyle: this.railTab(!live),
      liveTabStyle: this.railTab(live),
      envNote: s.plain
        ? (live
            ? "Live. Real money."
            : s.liveApproved
              ? "Test mode. Nothing here is real."
              : "Test mode. Nothing here is real.")
        : (live
            ? "Live. Real money."
            : s.liveApproved
              ? "Sandbox mints test fiat and testnet tokens. Safe to loop from a bot."
              : "Sandbox mints test fiat and testnet tokens. Live needs KYB."),
      envLabel: live ? "Live" : "Sandbox",
      liveTabLabel: s.liveApproved ? "Live" : "Live · locked",
      envStatusLabel: live ? "Live" : s.liveApproved ? "Verified · test mode" : s.liveRequested ? "Verification in review" : "Test mode",
      envDotStyle: "width: 8px; height: 8px; border-radius: 999px; flex-shrink: 0; background: " + (live ? "var(--ok-text)" : s.liveApproved ? "var(--indigo)" : "#f5a524"),
      envHasAction: !live,
      envShowCard: false,
      envActionLabel: s.liveApproved ? "Go live" : s.liveRequested ? "View request" : "Verify business",
      envAction: s.liveApproved ? () => this.setState({ modalGoLive: true, goLiveAck: false }) : () => this.setState({ showLiveRequest: true }),
      envRailNote: live ? "Real money. Every order settles for real."
        : s.liveApproved ? "You're verified. Go live whenever you're ready."
        : s.liveRequested ? "We're reviewing your business. Test mode stays open."
        : "Pretend money only. Verify your business to unlock wallets and checkout.",
      isSignupMode: s.authMode === "signup",
      stopBubble: e => e.stopPropagation(),
      liveLocked: !s.liveApproved,
      envPillStyle: "display: inline-flex; align-items: center; gap: 7px; padding: 6px 11px; border-radius: 999px; font-size: 12px; font-weight: 700; background: " + envPal.bg + "; color: " + envPal.text,
      envDotStyle: "width: 7px; height: 7px; border-radius: 999px; background: " + envPal.text,

      isOverview: s.view === "overview",
      isOverviewFresh: s.view === "overview" && !!s.fresh,
      isWalletsGated: false,
      isCheckoutGated: false,
      isSettingsGated: false,
      gateTitle: ({ wallets: "Verify your business to set up wallets", otc: "Verify your business to use the OTC desk", checkout: "Verify your business to set up checkout", paybill: "Verify your business to set up checkout", settings: s.settingsTab === "money" ? "Verify your business to set payouts" : "Verify your business to turn on payment methods" })[s.view] || "",
      gateNote: s.liveRequested ? "Thanks, we're reviewing your details. This unlocks as soon as you're approved." : "We need to know who we're moving money for. It takes a few minutes, and test mode stays open while we review.",
      gateCta: s.liveRequested ? "View my request" : "Start verification",
      gateAction: () => this.setState({ showLiveRequest: true }),
      isOverviewFull: s.view === "overview" && !s.fresh,
      showSampleData: () => this.setState({ fresh: false }),
      tryTestLink: () => this.setState({ modal: "testpay", tpStage: "form" }),
      ...(() => {
        const hc = MARKETS[s.homeCountry] ? s.homeCountry : "KES";
        const M = MARKETS[hc];
        const methods = [M.wallets.split(/[,·]/)[0].trim() || "Mobile money", "Card", "USDC"];
        const pick = s.tpMethod || methods[0];
        const amt = s.tpAmount == null ? "100" : s.tpAmount;
        return {
          modalTestPay: s.modal === "testpay",
          tpForm: (s.tpStage || "form") === "form",
          tpDone: s.tpStage === "done",
          tpCurrency: hc, tpAmount: amt, tpLastId: s.tpLastId || "",
          setTpAmount: e => this.setState({ tpAmount: e.target.value.replace(/[^0-9.,]/g, "") }),
          tpMethods: methods.map(m => ({ label: m, onClick: () => this.setState({ tpMethod: m }),
            style: "padding: 10px 6px; border-radius: 8px; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; border: 1px solid " + (m === pick ? "var(--indigo)" : "var(--border-strong)") + "; background: " + (m === pick ? "var(--indigo-tint)" : "var(--panel)") + "; color: " + (m === pick ? "var(--indigo-text)" : "var(--ink)") })),
          tpPay: () => {
            const id = "test_" + Math.random().toString(36).slice(2, 10);
            const now = new Date();
            const o = { id, flow: "Test · " + pick, fiat: (amt || "0") + " " + hc, crypto: "—", status: "settled", recipient: "Test customer", mpesa: "TEST" + id.slice(5, 9).toUpperCase(), hash: "—", ref: "test", rate: "—", created: now.toLocaleString("en-US", { month: "short", day: "numeric" }) + ", " + now.toTimeString().slice(0, 5) };
            this.setState({ testOrders: [o].concat(s.testOrders || []), tpStage: "done", tpLastId: id });
          },
          tpAgain: () => this.setState({ tpStage: "form" }),
          tpView: () => this.setState({ modal: null, tpStage: "form", view: "transactions", filter: "All", sel: 0, txOpen: true })
        };
      })(),
      showDevTools: true,
      showDevToggle: false,
      revealDevTools: () => this.setState({ devTools: true }),
      bizFirstName: (s.bizName || "there").replace(/\s+(Ltd|Limited|LLC|Inc|PLC)\.?$/i, ""),
      ...(() => {
        const done = Object.assign({}, s.freshDone || {});
        const mark = (id, fn) => () => { this.setState({ freshDone: Object.assign({}, done, { [id]: true }) }); fn(); };
        const G = [
          ["verify", "Verify your business", s.liveRequested ? "Submitted. We'll let you know when it's approved." : "Unlocks wallets, checkout and payouts.", s.liveRequested ? "View request" : "Start", () => this.setState({ showLiveRequest: true })],
          ["profile", "Add your business details", "Name, logo and support email your customers will see.", "Add details", () => this.setState({ view: "settings", settingsTab: "identity" })],
          ["team", "Invite your team", "Add the people who'll run payments with you.", "Invite", () => this.setState({ view: "settings", settingsTab: "team" })]
        ];
        if (s.liveRequested) done.verify = true;
        const n = G.filter(g => done[g[0]]).length;
        return {
          freshIntro: "Three quick steps to your first payment.",
          freshProgress: n + " of 3 done",
          freshBarStyle: "display: block; height: 100%; border-radius: 999px; transition: width .4s; background: var(--indigo); width: " + (n / 3 * 100) + "%",
          freshSteps: G.map(([id, title, note, cta, fn], i) => {
            const d = !!done[id];
            return {
              title, note, cta: d ? "Open again" : cta, onClick: mark(id, fn), mark: d ? "✓" : String(i + 1),
              markStyle: "width: 28px; height: 28px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 12px; font-weight: 800; " + (d ? "background: var(--ok-bg); color: var(--ok-text)" : "background: var(--indigo-tint); color: var(--indigo-text)"),
              titleStyle: "font-size: 13.5px; font-weight: 700; " + (d ? "color: var(--muted); text-decoration: line-through" : "color: var(--ink)"),
              ctaStyle: d ? "padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-strong); background: transparent; color: var(--muted); font-size: 12.5px; font-weight: 600; cursor: pointer"
                : "padding: 9px 14px; border-radius: 8px; border: 0; background: var(--indigo); color: var(--on-indigo); font-size: 12.5px; font-weight: 700; cursor: pointer"
            };
          }),
          goLiveSteps: [{ n: "1", text: "Business details" }, { n: "2", text: "Company documents and a director's ID" }, { n: "3", text: "We review, then Live unlocks" }]
        };
      })(),
      isCheckout: s.view === "checkout" && !!s.liveApproved,
      isWallets: s.view === "wallets" && !!s.liveApproved,
      isCustomers: false,
      customerStats: [
        { label: "Clients", value: "938", note: "+64 this month" },
        { label: "Repeat rate", value: "41%", note: "paid more than once" },
        { label: "Average order", value: "KES 6,540", note: "last 30 days" }
      ],
      customers: [
        ["Amina Njeri", "+2547••••4192", "23", "KES 184,200", "2 hrs ago", "Embed"],
        ["Brian Otieno", "+2547••••7730", "14", "KES 96,400", "Yesterday", "Payment link"],
        ["Kesho Foods Ltd", "acct ACME-1042", "11", "KES 88,100", "Yesterday", "Invoice"],
        ["0x1c9a…44f0", "Base wallet", "9", "612 USDC", "2 days ago", "API"],
        ["Grace Wambui", "+2547••••2218", "7", "KES 41,800", "3 days ago", "QR code"],
        ["Tesa Hardware", "till 832909", "5", "KES 33,600", "5 days ago", "Payment link"]
      ].map(([name, handle, orders, lifetime, last, source]) => ({
        name, handle, orders, lifetime, last, source,
        sourceStyle: "padding: 3px 9px; border-radius: 6px; font-size: 11px; font-weight: 600; white-space: nowrap; background: var(--surface); color: var(--muted)",
        initials: /^0x/i.test(name) ? "0x"
          : (name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase() || "—"),
        avatarStyle: "width: 30px; height: 30px; flex-shrink: 0; border-radius: 999px; background: var(--indigo-tint); color: var(--indigo-text); display: grid; place-items: center; font-size: 10.5px; font-weight: 700"
      })),
      feeBreakdown: [
        { label: "Gross", value: "KES 21.7M", note: "before fees" },
        { label: "ElementPay fees", value: "KES 238,400", note: "1.1% average" },
        { label: "Network fees", value: "KES 12,090", note: "on-chain gas" }
      ],
      statements: [
        { period: "September 2026", meta: "In progress · 1,284 orders", total: "KES 21.4M" },
        { period: "August 2026", meta: "Closed · 1,702 orders", total: "KES 27.9M" },
        { period: "July 2026", meta: "Closed · 1,488 orders", total: "KES 24.1M" },
        { period: "June 2026", meta: "Closed · 1,204 orders", total: "KES 19.6M" }
      ],
      disputeCount: "3 open",
      disputes: [
        ["Refund", "ord_7c1d02ff31", "Customer asked for a reversal", "KES 63,000", "Refund", "warn"],
        ["Payout", "ord_0f31aa7c29", "Payout failed — number not registered", "KES 4,200", "Retry", "bad"],
        ["Dispute", "ord_5a91cc0e77", "Card chargeback, evidence due Oct 2", "KES 12,400", "Respond", "bad"]
      ].map(([kind, id, reason, amount, action, tone]) => ({
        kind, id, reason, amount, action,
        onClick: kind === "Refund"
          ? () => this.setState({ modal: "refund", refundOrder: id, refundAmount: amount.replace(/[^0-9]/g, "") })
          : () => this.setState({ view: "transactions", query: id, sel: 0 }),
        badgeStyle: "flex-shrink: 0; padding: 4px 9px; border-radius: 6px; font-size: 11px; font-weight: 700; background: " +
          (tone === "bad" ? "var(--bad-bg)" : "var(--warn-bg)") + "; color: " + (tone === "bad" ? "var(--bad-text)" : "var(--warn-text)")
      })),
      isReports: false,
      isSettings: s.view === "settings",

      bizName: s.bizName,
      setBizName: e => this.setState({ bizName: e.target.value }),
      bizSupport: s.liveApproved || s.bizSupportEdited ? s.bizSupport : (s.authEmail || "dev@acme.co"),
      setBizSupport: e => this.setState({ bizSupport: e.target.value, bizSupportEdited: true }),
      bizInitials: s.bizName.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase(),

      bizWebsite: s.bizWebsite,
      setBizWebsite: e => this.setState({ bizWebsite: e.target.value }),
      tagline: s.tagline,
      setTagline: e => this.setState({ tagline: e.target.value.slice(0, 140) }),
      taglineCount: s.tagline.length + "/140",
      routeDestination: s.payoutChannel === "mpesa"
        ? s.payoutCurrency.split(" ")[0] + " in " + s.payoutMethod
        : s.settleAsset + " on " + s.settleChain,
      routeConversion: s.payoutChannel === "mpesa"
        ? "Converted at the locked rate, then paid out"
        : "No conversion — settles straight to your wallet",
      routeReference: this.payoutDetailLine(s),
      settingsTab: s.settingsTab,
      tabIdentity: s.settingsTab === "identity",
      tabMoney: s.settingsTab === "money" && !!s.liveApproved,
      tabMethods: s.settingsTab === "methods" && !!s.liveApproved,
      tabTeam: s.settingsTab === "team",
      tabAlerts: s.settingsTab === "alerts",
      tabCompliance: s.settingsTab === "compliance",
      tabActivity: s.settingsTab === "activity",
      settingsTabs: [["identity", "Identity"], ["money", "Money"], ["methods", "Payment methods"], ["team", "Team"], ["alerts", "Alerts"], ["compliance", "Compliance"], ["activity", "Activity log"]].map(([id, label]) => ({
        label,
        onClick: () => this.setState({ settingsTab: id }),
        style: "padding: 10px 14px; margin-bottom: -1px; border: 0; border-bottom: 2px solid " +
          (s.settingsTab === id ? "var(--indigo)" : "transparent") + "; background: transparent; cursor: pointer; font-size: 13px; font-weight: " +
          (s.settingsTab === id ? "700" : "500") + "; color: " + (s.settingsTab === id ? "var(--ink)" : "var(--muted)")
      })),
      showPayoutAccount: s.payoutMethod === "Paybill",
      slackHook: s.slackHook,
      setSlackHook: e => this.setState({ slackHook: e.target.value }),
      alertToggles: [
        { id: "payout", label: "Payout failed", note: "A settlement could not reach your destination" },
        { id: "webhook", label: "Webhook stopped delivering", note: "Three consecutive non-2xx responses" },
        { id: "dispute", label: "New dispute or chargeback", note: "Evidence deadline included" },
        { id: "digest", label: "Daily settlement digest", note: "One email at 18:00 EAT" }
      ].map(a => {
        const on = s.alerts.includes(a.id);
        return {
          label: a.label, note: a.note,
          rowStyle: "display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 12px; border: 1px solid " +
            (on ? "var(--border-strong)" : "var(--line)") + "; background: " + (on ? "var(--panel)" : "transparent") + "; opacity: " + (on ? "1" : "0.65"),
          onClick: () => this.setState({ alerts: on ? s.alerts.filter(x => x !== a.id) : s.alerts.concat(a.id) }),
          switchStyle: "margin-left: auto; flex-shrink: 0; width: 42px; height: 24px; padding: 2px; border-radius: 999px; border: 0; cursor: pointer; display: flex; justify-content: " +
            (on ? "flex-end" : "flex-start") + "; background: " + (on ? "var(--indigo)" : "var(--border-strong)"),
          knobStyle: "width: 20px; height: 20px; border-radius: 999px; background: #fff; display: block"
        };
      }),
      kybStatus: live ? "Verified · live" : s.liveApproved ? "Approved" : s.liveRequested ? "In review" : "Not started",
      kybNote: live ? "Live payments are on." : s.liveApproved ? "You can go live whenever you're ready." : s.liveRequested ? "We're checking your documents. Usually under a day." : "Send your business details to unlock live payments.",
      kybCta: s.liveApproved ? "Go live" : s.liveRequested ? "View request" : "Start verification",
      kybHasCta: !live,
      kybProgress: [["Account created", true], ["Details sent", !!s.liveRequested], ["Reviewed", !!s.liveApproved], ["Live", live]].map(([label, done], i, arr) => {
        const cur = !done && (i === 0 || arr[i - 1][1]);
        return { label, n: done ? "✓" : String(i + 1),
          dotStyle: "width: 24px; height: 24px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 11px; font-weight: 700; " + (done ? "background: var(--indigo); color: var(--on-indigo)" : cur ? "border: 2px solid var(--indigo); color: var(--indigo-text); background: var(--panel-solid)" : "border: 1.5px solid var(--border-strong); color: var(--faint)"),
          labelStyle: "font-size: 11.5px; font-weight: " + (cur ? 700 : 600) + "; color: " + (done || cur ? "var(--ink)" : "var(--faint)"),
          barStyle: "flex: 1; height: 2px; min-width: 12px; background: " + (done ? "var(--indigo)" : "var(--line)") + (i === arr.length - 1 ? "; visibility: hidden" : "") };
      }),
      kybItems: (s.liveApproved ? [
        ["Business registration", "Certificate of incorporation", "Approved", "ok"],
        ["Director ID", "National ID or passport", "Approved", "ok"],
        ["Proof of address", "Utility bill under 3 months", "Approved", "ok"],
        ["Settlement account", "Name must match the business", "Approved", "ok"]
      ] : ["Business registration|Certificate of incorporation", "Director ID|National ID or passport", "Proof of address|Utility bill under 3 months", "Settlement account|Name must match the business"]
        .map(x => x.split("|").concat(s.liveRequested ? ["In review", "warn"] : ["Not sent", "todo"]))
      ).map(([label, note, state, tone]) => ({
        label, note, state,
        mark: tone === "ok" ? "✓" : tone === "todo" ? "" : "…",
        markStyle: "width: 21px; height: 21px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 11px; font-weight: 700; background: " +
          (tone === "ok" ? "oklch(0.62 0.15 152)" : tone === "todo" ? "transparent; border: 1.5px dashed var(--border-strong)" : "var(--warn-bg)") + "; color: " + (tone === "ok" ? "#fff" : "var(--warn-text)"),
        badgeStyle: "flex-shrink: 0; padding: 4px 9px; border-radius: 6px; font-size: 11px; font-weight: 700; background: " +
          (tone === "ok" ? "var(--ok-bg)" : tone === "todo" ? "var(--surface-soft)" : "var(--warn-bg)") + "; color: " + (tone === "ok" ? "var(--ok-text)" : tone === "todo" ? "var(--muted)" : "var(--warn-text)")
      })),
      limits: !s.liveApproved ? [] : [
        { label: "Per transaction", value: "KES 150,000", note: "raises to 1M once verified" },
        { label: "Daily settlement", value: "KES 2.5M", note: "rolling 24 hours" }
      ],
      auditLog: (!s.liveApproved ? [["Account created", "You", "Just now"]].concat(s.liveRequested ? [["Verification request sent", "You", "Just now"]] : []) : [
        ["Payout destination changed to M-Pesa 247247", "Amina Njeri", "Today, 09:14"],
        ["Live key sk_live_9c…4e12 created", "Amina Njeri", "Yesterday, 17:02"],
        ["Webhook endpoint updated", "Brian Otieno", "Yesterday, 11:48"],
        ["Cards enabled at checkout", "Amina Njeri", "18 Sep, 15:30"],
        ["Brian Otieno invited as Developer", "Amina Njeri", "16 Sep, 10:05"],
        ["API key rotated", "System", "12 Sep, 04:00"]
      ]).map(([what, who, when]) => ({ what, who, when })),
      acceptToggles: [
        { id: "momo", label: "Mobile money", note: "M-Pesa, Airtel Money, MTN", mark: "M-PESA", bg: "#00a651" },
        { id: "card", label: "Cards", note: "Visa and Mastercard", mark: "VISA", bg: "#1a1f71" },
        { id: "stable", label: "Stablecoin", note: "USDC or USDT, any chain", mark: "USDC", bg: "#2775ca" }
      ].map(m => {
        const on = s.linkMethods.includes(m.id);
        return {
          label: m.label, note: m.note, mark: m.mark,
          rowStyle: "display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 12px; border: 1px solid " +
            (on ? "var(--border-strong)" : "var(--line)") + "; background: " + (on ? "var(--panel)" : "transparent") + "; opacity: " + (on ? "1" : "0.65"),
          markStyle: "flex-shrink: 0; padding: 4px 7px; border-radius: 5px; font-family: 'Manrope', system-ui, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.04em; background: " + m.bg + "; color: " + (["#ffcb05", "#ff7900", "#1dc8f2", "#1dcf9f"].includes(m.bg) ? "#1a1a1a" : "#fff"),
          onClick: () => this.setState({ linkMethods: on ? s.linkMethods.filter(x => x !== m.id) : s.linkMethods.concat(m.id) }),
          switchStyle: "margin-left: auto; flex-shrink: 0; width: 42px; height: 24px; padding: 2px; border-radius: 999px; border: 0; cursor: pointer; display: flex; justify-content: " +
            (on ? "flex-end" : "flex-start") + "; background: " + (on ? "var(--indigo)" : "var(--border-strong)"),
          knobStyle: "width: 20px; height: 20px; border-radius: 999px; background: #fff; display: block"
        };
      }),
      payoutSideNote: s.payoutChannel === "mpesa"
        ? "Where converted local currency lands. Payouts batch through the day."
        : "The wallet tokens are sent to as each order settles.",
      taglinePreview: s.tagline || "Add a tagline in Settings → Identity",
      taglineLocal: s.tagline || "Add a tagline below",
      settingsIndex: (() => {
        const done = {
          business: !!(s.bizName && s.bizSupport),
          branding: !!s.tagline,
          settlement: true,
          payout: s.payoutChannel === "mpesa" ? !!(s.accountName && s.payoutPhone) : !!s.settleAddress
        };
        return [
          ["01", "business", "Business", "Name, email, website"],
          ["02", "branding", "Branding", "Logo and tagline"],
          ["03", "settlement", "Settlement", "What you receive"],
          ["04", "payout", "Payout", "Where it lands"]
        ].map(([n, id, label, note]) => ({
          n, label, note,
          onClick: () => this.setState({ settingsFocus: id }),
          style: "display: flex; align-items: flex-start; gap: 10px; width: 100%; text-align: left; cursor: pointer; font-family: inherit; padding: 10px 11px; border-radius: 8px; border: 1px solid " +
            (s.settingsFocus === id ? "var(--indigo)" : "transparent") + "; background: " +
            (s.settingsFocus === id ? "var(--indigo-tint)" : "transparent"),
          markStyle: "width: 19px; height: 19px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px; font-weight: 700; margin-top: 1px; " +
            (done[id] ? "background: oklch(0.62 0.15 152); color: #fff; border: 0" : "background: transparent; color: var(--faint); border: 1px solid var(--border-strong)"),
          mark: done[id] ? "✓" : n,
          labelStyle: "font-size: 13px; font-weight: 600; color: " + (s.settingsFocus === id ? "var(--indigo-text)" : "var(--ink)")
        }));
      })(),
      settingsProgress: (() => {
        const done = [!!(s.bizName && s.bizSupport), !!s.tagline, true,
          s.payoutChannel === "mpesa" ? !!(s.accountName && s.payoutPhone) : !!s.settleAddress].filter(Boolean).length;
        return { text: done + " of 4 complete", fillStyle: "display: block; height: 100%; width: " + (done / 4 * 100) + "%; border-radius: 999px; background: var(--indigo)" };
      })(),

      settlementCards: [
        { id: "mpesa", name: "Local currency", note: "Converted and sent to your payout account." },
        { id: "stable", name: "Stablecoin in your wallet", note: "Stays as USDC or USDT in your ElementPay wallet." }
      ].map(c => ({
        name: c.name, note: c.note,
        onClick: () => this.setState({ payoutChannel: c.id }),
        style: "flex: 1 1 230px; display: flex; flex-direction: column; gap: 5px; align-items: flex-start; text-align: left; cursor: pointer; padding: 15px 16px; border-radius: 12px; font-family: inherit; background: " +
          (s.payoutChannel === c.id ? "var(--indigo-tint)" : "var(--panel)") + "; border: 1px solid " +
          (s.payoutChannel === c.id ? "var(--indigo)" : "var(--border-strong)"),
        nameStyle: "font-size: 13.5px; font-weight: 700; color: " + (s.payoutChannel === c.id ? "var(--indigo-text)" : "var(--ink)"),
        noteStyle: "font-size: 12px; color: var(--muted); line-height: 1.45",
        markStyle: "width: 15px; height: 15px; flex-shrink: 0; border-radius: 999px; border: 1px solid " +
          (s.payoutChannel === c.id ? "var(--indigo)" : "var(--border-strong)") + "; background: " +
          (s.payoutChannel === c.id ? "var(--indigo)" : "transparent") + "; box-shadow: " +
          (s.payoutChannel === c.id ? "inset 0 0 0 3px var(--panel)" : "none")
      })),
      isMpesaChannel: s.payoutChannel === "mpesa",
      isStableChannel: s.payoutChannel === "stable",

      payoutCurrency: s.payoutCurrency,
      setPayoutCurrency: e => { const v = e.target.value; this.setState({ payoutCurrency: v, payoutMethod: this.payoutMethodsFor(v.split(" ")[0])[0] }); },
      payoutCurrencyOpts: Object.keys(MARKETS).map(c => ({ value: c + " — " + MARKETS[c].curLong, label: c + " — " + MARKETS[c].curLong })),
      payoutMethodOpts: this.payoutMethodsFor(s.payoutCurrency.split(" ")[0]),
      showPayoutBank: s.payoutMethod === "Bank transfer",
      payoutBank: s.payoutBank || "",
      setPayoutBank: e => this.setState({ payoutBank: e.target.value }),
      payoutBankPlaceholder: ({ KES: "Equity Bank", TZS: "CRDB Bank", UGX: "Stanbic Uganda", RWF: "Bank of Kigali", GHS: "GCB Bank", NGN: "GTBank" })[s.payoutCurrency.split(" ")[0]] || "Bank name",
      payoutMethod: s.payoutMethod,
      payoutNumberLabel: s.payoutMethod === "Paybill" ? "Paybill number"
        : s.payoutMethod === "Till number" ? "Till number"
        : s.payoutMethod === "Bank transfer" ? "Account number" : "Phone number",
      payoutNumberPlaceholder: s.payoutMethod === "Paybill" ? "247247"
        : s.payoutMethod === "Till number" ? "5 or 6 digit till"
        : s.payoutMethod === "Bank transfer" ? (s.payoutCurrency.indexOf("NGN") === 0 ? "10-digit NUBAN" : "Bank account number") : ((MARKETS[s.payoutCurrency.split(" ")[0]] || MARKETS.KES).dial + " " + (MARKETS[s.payoutCurrency.split(" ")[0]] || MARKETS.KES).sample),
      setPayoutMethod: e => this.setState({ payoutMethod: e.target.value }),
      accountName: s.accountName,
      setAccountName: e => this.setState({ accountName: e.target.value }),
      payoutPhone: s.payoutPhone,
      setPayoutPhone: e => this.setState({ payoutPhone: e.target.value }),

      settleAddress: s.settleAddress,
      setSettleAddress: e => this.setState({ settleAddress: e.target.value }),
      assetPicks: ["USDC", "USDT"].map(a => ({
        label: a,
        onClick: () => this.setState({ settleAsset: a }),
        style: "padding: 8px 14px; border-radius: 8px; border: 0; cursor: pointer; font-size: 12.5px; font-weight: 600; background: " +
          (s.settleAsset === a ? "var(--indigo)" : "transparent") + "; color: " +
          (s.settleAsset === a ? "var(--on-indigo)" : "var(--muted)")
      })),
      chainPicksSettings: ["Base", "Stellar", "Solana", "Polygon", "BSC"].map(c => ({
        label: c,
        logoStyleSm: LOGO(c, 16),
        onClick: () => this.setState({ settleChain: c }),
        style: "display: inline-flex; align-items: center; gap: 7px; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 12.5px; font-weight: 600; color: var(--ink); background: " +
          (s.settleChain === c ? "var(--indigo-tint)" : "var(--panel)") + "; border: 1px solid " +
          (s.settleChain === c ? "var(--indigo)" : "var(--border-strong)")
      })),
      payoutSummary: s.payoutChannel === "mpesa"
        ? s.payoutMethod + " · " + (s.payoutPhone || s.mpesaNumber)
        : "your " + s.settleAsset + " wallet on " + s.settleChain,
      payoutSummaryDetail: s.payoutChannel === "mpesa"
        ? s.payoutCurrency.split(" ")[0] + " · " + (s.accountName || s.bizName)
        : s.settleAddress.slice(0, 10) + "…" + s.settleAddress.slice(-4),
      settlementSentence: s.payoutChannel === "mpesa"
        ? "Customers pay USDC or USDT — you receive " + s.payoutCurrency.split(" ")[0] + " via " + s.payoutMethod + "."
        : "Customers pay USDC or USDT — it stays as " + s.settleAsset + " in your " + s.settleChain + " wallet.",

      checkoutModes: [["link", "Payment links", "Share a link or QR. No website needed."], ["invoice", "Invoices", "Bill a client with a due date."], ["embed", "Embed on site", "Pop-up or inline on your website."]].map(([id, label, note]) => ({
        label, note, on: s.checkoutMode === id,
        onClick: () => this.setState({ checkoutMode: id, pay: "select" }),
        style: "display: flex; flex-direction: column; gap: 4px; padding: 13px 15px; border-radius: 12px; cursor: pointer; text-align: left; font-family: inherit; background: " +
          (s.checkoutMode === id ? "var(--indigo-tint)" : "var(--panel)") + "; border: " + (s.checkoutMode === id ? "1.5px solid var(--indigo)" : "1px solid var(--border)")
      })),
      ...(() => {
        const mode = s.checkoutMode;
        const et = s.embedType || "popup";
        const host = (s.embedDomains || ["acme.co", "shop.acme.co"])[0] || "yoursite.com";
        return {
          previewUrl: mode === "invoice" ? "pay.elementpay.net/i/" + (s.coPreviewInvNo || "INV-1042") : mode === "embed" ? (et === "redirect" ? "pay.elementpay.net/c/…" : host + "/checkout") : "pay.elementpay.net/c/acme-cart",
          previewKicker: s.coPreviewTitle && s.modal === "coPreview" ? s.coPreviewTitle : mode === "invoice" ? "Invoice INV-1042" : mode === "embed" ? "Checkout" : "Standard cart",
          previewInvoice: mode === "invoice",
          previewDue: s.coPreviewDue || "Due 12 Oct 2026",
          previewEmbedPage: mode === "embed" && et !== "redirect",
          previewSiteHost: host,
          previewEmbedLabel: et === "popup" ? "Pop-up over your page" : "Inside your page",
          previewStageStyle: "position: relative; border-radius: 12px; padding: " + (mode === "embed" && et !== "redirect" ? "58px 20px 26px" : "26px 20px") + "; border: 1px solid var(--border); display: flex; justify-content: center; overflow: hidden; background: " +
            (mode === "embed" && et === "popup" ? "color-mix(in oklab, var(--ink) 38%, var(--surface-soft))" : "var(--surface-soft)"),
          embedTypes: [["popup", "Pop-up", "A button opens checkout over your page."], ["inline", "Inline", "The form sits inside your page."], ["redirect", "Redirect", "Send buyers to our hosted page."]].map(([id, label, note]) => ({
            label, note,
            onClick: () => this.setState({ embedType: id }),
            style: "display: flex; flex-direction: column; gap: 3px; padding: 11px 12px; border-radius: 10px; cursor: pointer; text-align: left; font-family: inherit; background: " +
              (et === id ? "var(--indigo-tint)" : "var(--panel-solid)") + "; border: " + (et === id ? "1.5px solid var(--indigo)" : "1px solid var(--border-strong)")
          })),
          embedDomains: (s.embedDomains || ["acme.co", "shop.acme.co"]).map((h, i, arr) => ({ host: h, remove: () => this.setState({ embedDomains: arr.filter((_, j) => j !== i) }) })),
          embedDomainDraft: s.embedDomainDraft || "",
          setEmbedDomainDraft: e => this.setState({ embedDomainDraft: e.target.value }),
          embedDomainKey: e => {
            if (e.key !== "Enter") return;
            const v = (s.embedDomainDraft || "").trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
            if (v) this.setState({ embedDomains: (s.embedDomains || ["acme.co", "shop.acme.co"]).concat(v), embedDomainDraft: "" });
          }
        };
      })(),
      isEmbedMode: s.checkoutMode === "embed",
      modalCoPreview: s.modal === "coPreview",
      modalInvDoc: s.modal === "invDoc",
      printInvDoc: () => window.print(),
      openEmbedPreview: () => this.setState({ modal: "coPreview", pay: "select", payerMenuOpen: false, coPreviewTitle: "" }),
      isLinkMode: s.checkoutMode === "link",
      isInvoiceMode: s.checkoutMode === "invoice",
      isApiMode: s.checkoutMode === "__none",
      checkoutPreviewAsset: "≈ 38.42 " + s.settleAsset,
      openNewInvoice: () => this.setState({ modal: "invoice" }),
      invoiceStats: [
        { label: "Outstanding", value: "KES 184,500" },
        { label: "Past due", value: "KES 26,000" },
        { label: "Paid (30 days)", value: "KES 1.24M" }
      ],
      ...(() => {
        const ALL = [
          ["INV-1043", "Mara Safaris", "KES 18,200", "Not sent", "Draft"],
          ["INV-1042", "Kesho Foods Ltd", "KES 63,000", "Due in 6 days", "Open"],
          ["INV-1041", "Tesa Hardware", "KES 26,000", "3 days late", "Past due"],
          ["INV-1039", "Brian Otieno", "KES 95,500", "Due in 12 days", "Open"],
          ["INV-1036", "Amina Njeri", "KES 41,800", "Paid 18 Sep", "Paid"]
        ];
        const tone = { Draft: NEUTRAL, Open: WARN, "Past due": BAD, Paid: OK };
        const ft = s.invFilter || "All";
        const rows = ALL.filter(r => ft === "All" || r[4] === ft);
        const flash = s.invFlash || {};
        return {
          invoiceTabs: ["All", "Draft", "Open", "Past due", "Paid"].map(t => ({
            label: t, count: String(t === "All" ? ALL.length : ALL.filter(r => r[4] === t).length),
            onClick: () => this.setState({ invFilter: t }),
            style: "flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; border-radius: 8px; border: 0; cursor: pointer; font-family: inherit; font-size: 12px; font-weight: 600; background: " +
              (ft === t ? "var(--surface)" : "transparent") + "; color: " + (ft === t ? "var(--ink)" : "var(--muted)")
          })),
          invoicesEmpty: rows.length === 0,
          invoices: rows.map(([number, client, amount, due, state]) => ({
            number, client, amount, due, state,
            view: () => this.setState({ modal: "invDoc", invDocNo: number }),
            badgeStyle: "padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; white-space: nowrap; background: " + tone[state].bg + "; color: " + tone[state].text,
            actionLabel: flash[number] || (state === "Draft" ? "Send" : state === "Paid" ? "Receipt" : "Remind"),
            action: () => {
              if (state === "Paid") { this.printReceipt({ id: number, flow: "Payment", fiat: amount, status: "settled", recipient: client, ref: number, created: due.replace("Paid ", ""), crypto: "—", rate: "—", mpesa: "—" }); return; }
              this.setState({ invFlash: Object.assign({}, flash, { [number]: state === "Draft" ? "Sent ✓" : "Reminded ✓" }) });
            }
          })),
          toggleInvAuto: () => this.setState({ invAuto: s.invAuto === false }),
          invAutoTrack: "width: 36px; height: 21px; flex-shrink: 0; border-radius: 999px; padding: 2px; box-sizing: border-box; display: flex; transition: background 0.2s; background: " + (s.invAuto === false ? "var(--border-strong)" : "var(--indigo)") + "; justify-content: " + (s.invAuto === false ? "flex-start" : "flex-end"),
          invAutoKnob: "width: 17px; height: 17px; border-radius: 999px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.2)",
          ...(() => {
            const r = ALL.find(x => x[0] === (s.invDocNo || "INV-1042")) || ALL[1];
            const [number, client, amount, due, state] = r;
            const cur = amount.split(" ")[0], total = Number(amount.replace(/[^0-9]/g, "")) || 0;
            const fmt = n => cur + " " + Math.round(n).toLocaleString();
            const main = Math.round(total * 0.86 / 100) * 100, rest = total - main;
            const lines = [
              { item: "Catering service", unit: "40 plates at " + fmt(main / 40), qty: "40", total: fmt(main) },
              { item: "Delivery and setup", unit: "Flat rate", qty: "1", total: fmt(rest) }
            ];
            const paid = state === "Paid";
            const acts = s.invFlash || {};
            return {
              previewLines: lines.map(l => ({ label: l.item, value: l.total.replace(cur + " ", "") })),
              invDoc: {
                number, client, amount, state, lines,
                clientEmail: "accounts@" + client.toLowerCase().replace(/ ltd| hardware| foods| safaris/g, "").replace(/[^a-z]/g, "") + ".co.ke",
                issued: "28 Sep 2026",
                dueDate: paid ? "Paid 18 Sep 2026" : state === "Draft" ? "On receipt" : due,
                subtotal: fmt(total / 1.16), vat: fmt(total - total / 1.16),
                badgeStyle: "padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; background: " + tone[state].bg + "; color: " + tone[state].text,
                actionLabel: acts[number] || (state === "Draft" ? "Send" : paid ? "Receipt" : "Send reminder"),
                action: () => paid
                  ? this.printReceipt({ id: number, flow: "Payment", fiat: amount, status: "settled", recipient: client, ref: number, created: "18 Sep 2026", crypto: "—", rate: "—", mpesa: "—" })
                  : this.setState({ invFlash: Object.assign({}, acts, { [number]: state === "Draft" ? "Sent ✓" : "Reminded ✓" }) }),
                payHead: paid ? "This invoice is paid" : "Pay " + amount + " online",
                payCta: paid ? "View receipt" : "Pay invoice",
                pay: paid
                  ? () => this.printReceipt({ id: number, flow: "Payment", fiat: amount, status: "settled", recipient: client, ref: number, created: "18 Sep 2026", crypto: "—", rate: "—", mpesa: "—" })
                  : () => this.setState({ modal: "coPreview", checkoutMode: "invoice", pay: "select", amount: String(total), currency: cur, coPreviewTitle: "Invoice " + number, coPreviewInvNo: number, coPreviewDue: state === "Draft" ? "Due on receipt" : /^Due/.test(due) ? due : "Due · " + due })
              }
            };
          })()
        };
      })(),
      checkoutSteps: [
        { n: "1", title: "Pick how you collect", body: "Embed the widget, share a link, or call the API yourself." },
        { n: "2", title: "Money lands where you set it", body: "Every payment settles to your payout destination in Settings." },
        { n: "3", title: "You get the webhook", body: "order.settled fires with the receipt and transaction hash." }
      ],
      embedSnippet: (s.embedType || "popup") === "popup"
        ? '<script src="https://js.elementpay.net/v1.js"></' + 'script>\n<button id="pay">Pay now</button>\n<script>\n  document.getElementById("pay").onclick = () =>\n    ElementPay.open({\n      key: "pk_live_7c41a9d0",\n      amount: 5000,\n      currency: "' + s.currency + '",\n      reference: "order_1042"\n    });\n</' + 'script>'
        : (s.embedType === "redirect")
        ? '// On your server\nconst session = await elementpay.checkout.create({\n  amount: 5000,\n  currency: "' + s.currency + '",\n  success_url: "https://' + ((s.embedDomains || ["acme.co"])[0] || "acme.co") + '/thanks"\n});\n\n// Then send the buyer to\nres.redirect(session.url);'
        : '<script src="https://js.elementpay.net/v1.js"></' + 'script>\n<div id="ep-checkout"></div>\n<script>\n  ElementPay.mount("#ep-checkout", {\n    key: "pk_sandbox_7c41a9d0",\n    amount: 5000,\n    currency: "KES",\n    settle: { token: "' + s.settleAsset + '", chain: "' + s.settleChain + '" }\n  });\n</' + 'script>',
      embedCopyLabel: s.copiedKey === "embed" ? "Snippet copied" : "Copy snippet",
      copyEmbed: () => this.copyKey("embed"),
      checkoutSettings: [
        { label: "Settles to", value: "Base · USDC" },
        { label: "Success URL", value: "acme.co/thanks" },
        { label: "Mode", value: "sandbox" }
      ],
      isTransactions: s.view === "transactions",
      isKeys: s.view === "keys",
      isReference: s.view === "reference",
      copyContextLabel: s.copiedKey === "ctx" ? "Context copied" : "Copy context",
      copyContext: () => this.copyKey("ctx"),
      ...this.guideVals(s, live),
      ...this.otcVals(s),
      ...this.paybillVals(s),
      isOtc: s.view === "otc" && !!s.liveApproved,
      goOtc: () => this.setState({ view: "otc" }),
      goWallets: () => this.setState({ view: "wallets" }),
      goPaybill: () => this.setState({ view: "paybill" }),
      goCheckout: () => this.setState({ view: "checkout" }),
      modalPoster: s.modal === "poster",
      openPoster: () => this.setState({ modal: "poster", posterAcc: s.posterAcc || (s.pbAccounts.find(a => a.type === "reusable" && a.active) || {}).acc }),
      printPoster: () => window.print(),

      posterLink: "pay.elementpay.net/" + ((s.bizName || "acme").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "acme") + "/" + String(s.posterAcc || (s.pbAccounts.find(a => a.type === "reusable" && a.active) || { acc: "" }).acc).toLowerCase(),
      posterQr: qrDataUrl("https://pay.elementpay.net/" + ((s.bizName || "acme").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "acme") + "/" + String(s.posterAcc || (s.pbAccounts.find(a => a.type === "reusable" && a.active) || { acc: "" }).acc).toLowerCase(), { size: 240 }),
      pbMainAcc: (s.pbAccounts.find(a => a.type === "reusable" && a.active) || { acc: "—" }).acc,
      posterAcc: s.posterAcc || (s.pbAccounts.find(a => a.type === "reusable" && a.active) || { acc: "—" }).acc,
      posterPicks: s.pbAccounts.filter(a => a.type === "reusable" && a.active).map(a => {
        const on = (s.posterAcc || (s.pbAccounts.find(x => x.type === "reusable" && x.active) || {}).acc) === a.acc;
        return { label: a.acc + " · " + a.label, onClick: () => this.setState({ posterAcc: a.acc }),
          style: "padding: 7px 11px; border-radius: 999px; cursor: pointer; font-family: inherit; font-size: 12px; font-weight: 600; border: 1px solid " + (on ? "var(--indigo)" : "var(--border-strong)") + "; background: " + (on ? "var(--indigo-tint)" : "transparent") + "; color: " + (on ? "var(--indigo-text)" : "var(--ink)") };
      }),
      isPaybill: s.view === "paybill" && !!s.liveApproved,
      viewTitle: ({
        overview: "Overview", wallets: "Wallets", checkout: "Checkout", settings: "Settings",
        transactions: "Transactions", customers: "Customers", reports: "Reports", keys: "Keys & webhooks", reference: "API reference", otc: "OTC desk", paybill: "Paybill account numbers"
      })[s.view],
      labelCheckout: s.plain ? "Accept payments" : "Checkout",
      labelCustomers: s.plain ? "People who paid you" : "Customers",
      ...(() => {
        const a = ({
          overview: s.liveApproved ? ["New payment link", () => this.setState({ modal: "newlink", linkStep: 1 })] : null,
          wallets: ["Top up", () => this.setState({ modal: "topup" })],
          checkout: ["New payment link", () => this.setState({ modal: "newlink", linkStep: 1 })],
          transactions: ["Export CSV", () => {}],
          customers: ["Export list", () => {}],
          reports: ["Download statement", () => {}],
          keys: ["Create API key", () => this.setState({ modal: "newkey" })]
        })[s.view];
        const gated = !s.liveApproved && ["wallets", "checkout", "otc", "paybill"].indexOf(s.view) >= 0;
        return { hasHeaderAction: !!a && !gated, headerActionLabel: a ? a[0] : "", headerAction: a ? a[1] : () => {} };
      })(),
      labelPayWith: s.plain ? "How they pay" : "Pay with",
      labelPayoutCurrency: s.plain ? "Money they receive" : "Payout currency",
      labelNetwork: s.plain ? "Which chain to send on" : "Network",
      labelDestWallet: s.plain ? "Wallet address to send to" : "Destination wallet",
      labelLinkType: s.plain ? "How often it can be paid" : "Link type",
      labelClientRefShort: s.plain ? "Your name for this payment" : "client_ref",
      labelEnvironment: s.plain ? "Test money or real money" : "Environment",
      labelNetworkFee: s.plain ? "Cost to send" : "Network fee",
      labelErrors: s.plain ? "What can go wrong, and what to do" : "Errors you should handle",
      labelRequest: s.plain ? "What you send" : "Request",
      labelResponse: s.plain ? "What comes back" : "Response",
      labelKeys: s.plain ? "Keys & callbacks" : "API keys & webhooks",
      labelReference: s.plain ? "Copy-paste examples" : "API reference",
      labelTransactions: s.plain ? "Payments" : "Transactions",
      labelClientRef: s.plain ? "Your own name for this payment (stops double charges)" : "client_ref (idempotency)",
      labelScope: s.plain ? "What it may do" : "Scope",
      labelCap: s.plain ? "Spend limit" : "Cap",
      labelLastCall: s.plain ? "Last used" : "Last call",
      plainToggleLabel: s.plain ? "Plain English · on" : "Plain English · off",
      plainToggleStyle: "padding: 9px 12px; border-radius: 8px; cursor: pointer; font-size: 12.5px; font-weight: 600; border: 1px solid " +
        (s.plain ? "var(--indigo)" : "var(--border-strong)") + "; background: " + (s.plain ? "var(--indigo-tint)" : "var(--panel)") +
        "; color: " + (s.plain ? "var(--indigo-text)" : "var(--ink)"),
      togglePlain: () => this.setState({ plain: !s.plain }),
      viewSub: ({
        overview: live ? "Order flow and webhook health" : "Sandbox — test traffic, test money",
        wallets: "Balances, top-ups and payouts",
        checkout: "How you collect money",
        customers: "Everyone who has paid you, and how they arrived",
        settings: "Identity, money, methods, team and compliance",
        transactions: "On-ramp and off-ramp orders",
        reports: "Statements, fees and exports",
        keys: "Credentials and webhook endpoints",
        team: "Roles and access",
        reference: "Five core endpoints"
      })[s.view],

      stats: [
        { label: "Orders / 24h", value: "1,284", delta: "+6.2% vs. yesterday", deltaColor: "oklch(0.5 0.14 152)" },
        { label: "Settled rate", value: "98.3%", delta: "21 failed, 14 auto-refunded", deltaColor: "var(--muted)" },
        { label: "Median settle", value: "42 s", delta: "Wallet approval to on-chain proof", deltaColor: "var(--muted)" },
        { label: "Volume", value: "KES 8.4M", delta: "64,102 USDC · 21,480 USDT", deltaColor: "var(--muted)" }
      ],
      events: [
        { type: "order.settled", detail: "ord_a1b2c3d4e5 · 5,000 KES", time: "11:42:07", dotStyle: "width: 8px; height: 8px; border-radius: 999px; margin-top: 5px; background: oklch(0.7 0.17 152)" },
        { type: "webhook.delivered", detail: "200 from api.acme.co · 184 ms", time: "11:42:08", dotStyle: "width: 8px; height: 8px; border-radius: 999px; margin-top: 5px; background: var(--indigo-soft)" },
        { type: "order.processing", detail: "ord_9f8e7d6c5b · on-ramp", time: "11:38:55", dotStyle: "width: 8px; height: 8px; border-radius: 999px; margin-top: 5px; background: oklch(0.8 0.13 80)" },
        { type: "order.failed", detail: "ord_7c1d02ff31 · payout rejected", time: "11:20:31", dotStyle: "width: 8px; height: 8px; border-radius: 999px; margin-top: 5px; background: oklch(0.7 0.16 25)" },
        { type: "quote.requested", detail: "offramp · 900 KES → USDC", time: "11:19:02", dotStyle: "width: 8px; height: 8px; border-radius: 999px; margin-top: 5px; background: var(--faint)" }
      ],
      quickActions: [
        ["New payment link", () => this.setState({ view: "checkout", modal: "newlink", linkStep: 1 })],
        ["Top up", () => this.setState({ view: "wallets", modal: "topup" })],
        ["Create API key", () => this.setState({ modal: "newkey" })],
        ["Send test event", () => this.setState({ view: "keys" })]
      ].map(([label, onClick], i) => ({
        label, onClick,
        style: "padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 12.5px; font-weight: 600; border: 1px solid " +
          (i === 0 ? INDIGO : "var(--border-strong)") + "; background: " + (i === 0 ? TINT : "var(--panel)") +
          "; color: " + (i === 0 ? "var(--indigo-text)" : "var(--ink)")
      })),
      rates: (() => {
        const hc = s.homeCountry || "KES", hm = MARKETS[hc] || MARKETS.KES;
        const f2 = v => v.toLocaleString("en-US", { maximumFractionDigits: v > 100 ? 2 : 4 });
        const others = Object.keys(MARKETS).filter(c => c !== hc).slice(0, 2);
        return [["USDC / " + hc, f2(hm.rate * 1.0073), "+0.4%", hm.iso], ["USDT / " + hc, f2(hm.rate * 1.0064), "+0.3%", hm.iso]]
          .concat(others.map((c, i) => ["USDC / " + c, f2(MARKETS[c].rate * 1.0073), i ? "+1.2%" : "-0.1%", MARKETS[c].iso]));
      })().map(([pair, value, move, iso]) => ({
        pair, value, move,
        flagStyle: FLAG(iso),
        moveColor: move.startsWith("-") ? "oklch(0.55 0.16 25)" : "oklch(0.5 0.14 152)"
      })),
      goTransactions: () => this.setState({ view: "transactions" }),
      activity: ORDERS.slice(0, 5).map(o => {
        const pal = STATUS_PALETTE[o.status] || NEUTRAL;
        return {
          id: o.id, ref: o.ref, flow: o.flow, fiat: o.fiat, status: o.status,
          onClick: () => this.setState({ view: "transactions" }),
          badgeStyle: "display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; background: " + pal.bg + "; color: " + pal.text,
          dotStyle: "width: 6px; height: 6px; border-radius: 999px; background: " + pal.text
        };
      }),
      health: [
        ["Orders API", "operational", "142 ms p95"],
        ["Mobile money rails", "operational", "38 s median"],
        ["Base settlement", "operational", "2 blocks"],
        ["Webhook queue", "degraded", "1 endpoint retrying"]
      ].map(([label, state, value]) => ({
        label, value,
        dotStyle: "width: 8px; height: 8px; border-radius: 999px; flex-shrink: 0; background: " +
          (state === "operational" ? "oklch(0.6 0.14 152)" : "oklch(0.75 0.14 80)")
      })),
      moneyToday: live ? "KES 1.24M" : "4,120",
      moneyTodayNote: live ? "1,226 orders settled · median 42 s"
        : "2xx on 4,118 · p50 96 ms · p95 142 ms · no real money moved",
      heroLabel: live ? "Settled to you today" : "API calls today · sandbox",
      chartCaption: live ? "Daily settled volume · 14 days" : "Sandbox API calls per day · 14 days",
      recentOrdersTitle: live ? "Recent orders" : "Recent test orders",
      ...(() => {
        const SL = [
          ["Traders", "Hold dollars. Pay suppliers anywhere.", "Keep USDC for imports and shillings for home, in one place."],
          ["Freelancers", "Send a link. Get paid your way.", "Clients abroad pay by card or USDC. You cash out to M-Pesa."],
          ["Online sellers", "Sell in the chat. Get paid in the chat.", "WhatsApp and Instagram customers pay without leaving the conversation."],
          ["Platforms", "Pay riders, sellers and staff.", "Send payouts straight to their phones, in their currency."],
          ["Finance teams", "Every shilling, accounted for.", "Payments, refunds and fees in one list your accountant will like."]
        ];
        const n = s.slide || 0, go = i => this.setState({ slide: (i + SL.length) % SL.length });
        const out = {
          slideTitle: SL[n][1], slideLine: SL[n][2], slideTab: SL[n][0], slideSticker: ["✓ Supplier paid", "✓ Client paid", "✓ Paid in chat", "✓ Payouts sent", "✓ Reconciled"][n], slideCount: "0" + (n + 1) + " / 0" + SL.length,
          prevSlide: () => go(n - 1), nextSlide: () => go(n + 1),
          pauseSlides: () => { this._slidePause = true; }, resumeSlides: () => { this._slidePause = false; },
          slideTabs: SL.map((x, i) => ({ label: x[0], onClick: () => go(i),
            style: "padding: 8px 14px; border-radius: 999px; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 600; border: 1px solid " +
              (i === n ? "var(--indigo)" : "var(--hero-line)") + "; background: " + (i === n ? "var(--indigo)" : "transparent") + "; color: " + (i === n ? "var(--on-indigo)" : "var(--hero-muted)") })),
          slideDots: SL.map((x, i) => ({ onClick: () => go(i),
            style: "height: 6px; border: 0; padding: 0; cursor: pointer; border-radius: 999px; transition: width .3s; width: " + (i === n ? "22px" : "6px") + "; background: " + (i === n ? "var(--indigo)" : "var(--hero-line)") }))
        };
        SL.forEach((x, i) => { out["slide" + i] = i === n; });
        return out;
      })(),
      nextPayoutTitle: live ? "Your next payout" : "Simulated payout",
      ...(() => {
        const vals = [812, 905, 874, 1010, 962, 1104, 1038, 1147, 1092, 1210, 1156, 1088, 1112, 1240];
        const W = 720, H = 150, max = Math.max(...vals) * 1.12, min = Math.min(...vals) * 0.7;
        const pts = vals.map((v, i) => [
          (i / (vals.length - 1)) * W,
          H - ((v - min) / (max - min)) * H
        ]);
        const top = Math.max(...vals);
        return {
          chartBars: vals.map((v, i) => ({
            title: (live ? "KES " + (v * 1000).toLocaleString() : v * 4 + " calls"),
            style: "flex: 1 1 0; min-width: 0; border-radius: 4px 4px 0 0; height: " +
              ((v / top) * 100).toFixed(1) + "%; background: " +
              (i === vals.length - 1 ? "var(--indigo)" : "var(--indigo-soft)")
          })),
          chartTicks: ["Sep 7", "Sep 11", "Sep 15", "Sep 20"].map(label => ({ label }))
        };
      })(),
      kpis: (live ? [
        { label: "Volume", value: "KES 8.4M", delta: "+12.4% vs last week", up: true },
        { label: "Orders", value: "1,284", delta: "+96 today", up: true },
        { label: "Settled rate", value: "98.3%", delta: "21 failed · 14 refunded", up: false },
        { label: "Median settlement", value: "42 s", delta: "fiat to on-chain", up: null }
      ] : [
        { label: "Test orders", value: "1,284", delta: "+96 today", up: true },
        { label: "Settled rate", value: "98.3%", delta: "21 failed · 14 refunded", up: false },
        { label: "Webhooks delivered", value: "3,908", delta: "1 endpoint retrying", up: false },
        { label: "Median settlement", value: "42 s", delta: "simulated rail timing", up: null }
      ]).map(k => ({
        label: k.label, value: k.value, delta: k.delta,
        deltaStyle: "font-size: 11.5px; font-weight: 600; color: " +
          (k.up === null ? "var(--muted)" : k.up ? "oklch(0.55 0.14 152)" : "oklch(0.55 0.18 25)")
      })),
      moneyCompare: (live ? [
        { label: "Yesterday", value: "KES 1.11M", delta: "+11.7%", up: true },
        { label: "7-day average", value: "KES 1.06M", delta: "+17.0%", up: true },
        { label: "Month to date", value: "KES 21.4M", delta: "1,284 orders", up: null }
      ] : [
        { label: "Error rate", value: "0.05%", delta: "2 × 422, invalid phone", up: null },
        { label: "Webhook success", value: "99.7%", delta: "11 retried, 0 dropped", up: true },
        { label: "Rate limit", value: "612 / 1,000", delta: "rpm, storefront key", up: null }
      ]).map(m => ({
        label: m.label, value: m.value, delta: m.delta,
        deltaStyle: "font-size: 11.5px; font-weight: 600; color: " +
          (m.up === null ? "var(--muted)" : m.up ? "oklch(0.55 0.14 152)" : "oklch(0.55 0.18 25)")
      })),
      nextPayoutAmount: s.payoutChannel === "mpesa" ? "KES 842,100" : "6,470 " + s.settleAsset,
      nextPayoutWhen: s.payoutChannel === "mpesa" ? "Batches at 18:00 EAT, about 4 hours" : "Settles per order, usually under a minute",
      tokenRows: [
        ["USDC", "48,204", 100, "Base · Stellar · Solana · Polygon"],
        ["USDT", "15,898", 33, "Base · Solana · Polygon · BSC"]
      ].map(([token, value, pct, chains]) => ({
        token, value, chains,
        fillStyle: "display: block; height: 100%; width: " + pct + "%; border-radius: 999px; background: " + (pct === 100 ? INDIGO : "var(--indigo-soft)")
      })),
      showQuickstart: this.props.showQuickstart !== false,
      quickstartSub: [
        "Storefront path — four steps to your first settlement",
        "Platform path — four steps to your first settlement",
        "Explorer path — four steps to your first settlement"
      ][s.builder] || "Four steps to your first settlement",
      checklistProgress: "3 of 4 done",
      checklist: [
        ["API key issued", "Created 4 days ago.", true],
        ([
          ["First checkout link paid", "A hosted link returned a paid webhook.", true],
          ["First payout sent", "POST /orders returned 201 and the payout settled.", true],
          ["First order created", "POST /orders returned 201 with order_id.", true]
        ][s.builder] || ["First order created", "POST /orders returned 201 with order_id.", true]),
        ["Webhook verified", "Signature check passed on 3 deliveries.", true],
        ["First payment settled", "Money reached your wallet.", false]
      ].map(([title, body, done]) => ({
        title, body,
        mark: done ? "✓" : "4",
        cardStyle: "display: flex; flex-direction: column; gap: 6px; padding: 14px; border-radius: 12px; border: 1px solid " +
          (done ? "var(--line)" : INDIGO) + "; background: " + (done ? "var(--surface-soft)" : TINT),
        badgeStyle: "width: 19px; height: 19px; border-radius: 999px; display: grid; place-items: center; font-size: 11px; font-weight: 700; background: " +
          (done ? "oklch(0.7 0.14 152)" : INDIGO) + "; color: " + (done ? "#fff" : "var(--on-indigo)")
      })),

      amount: s.amount,
      setAmount: e => this.setState({ amount: e.target.value, copied: false }),
      currency: s.currency,
      setCurrency: e => this.applyMarket(e.target.value),
      mktFlag: "/flags/flag-" + (MARKETS[s.currency] || MARKETS.KES).iso + ".svg",
      marketMenuOpen: s.marketMenuOpen,
      toggleMarketMenu: () => this.setState({ marketMenuOpen: !s.marketMenuOpen }),
      marketOptions: Object.keys(MARKETS).map(code => {
        const m = MARKETS[code], on = s.currency === code;
        return {
          code, country: m.country, wallet: m.wallet,
          flag: "/flags/flag-" + m.iso + ".svg",
          tag: on ? "✓" : (s.geoFound === code ? "You" : ""),
          onClick: () => { this.applyMarket(code); if (s.geoFound !== code) this.setState({ geoAuto: false }); },
          style: "display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 9px; border: 0; border-radius: 8px; cursor: pointer; text-align: left; font-family: inherit; background: " + (on ? "var(--indigo-tint)" : "transparent")
        };
      }),
      geoNote: !s.geoAuto ? "Auto-detect off · picked by hand"
        : s.geoFound === null ? "Detecting your location…"
        : s.geoFound === "none" ? "Location not in a supported market · pick a country"
        : "Auto-detected " + MARKETS[s.geoFound].country + " from your location",
      toggleGeoAuto: () => { const on = !s.geoAuto; this.setState({ geoAuto: on }); if (on) this.detectMarket(); },
      geoSwitchStyle: "margin-left: auto; flex-shrink: 0; width: 34px; height: 20px; padding: 2px; border-radius: 999px; border: 0; cursor: pointer; display: flex; align-items: center; justify-content: " +
        (s.geoAuto ? "flex-end" : "flex-start") + "; background: " + (s.geoAuto ? "var(--indigo)" : "var(--border-strong)"),
      geoKnobStyle: "width: 16px; height: 16px; border-radius: 999px; background: #fff; box-shadow: 0 1px 3px rgba(10,9,23,0.3)",
      accounts: openIdx.map(i => ACCOUNTS[i]).map((a, n) => {
        const i = openIdx[n];
        return {
        chain: a.chain, asset: a.asset, balance: a.balance, fiat: a.fiat, logoStyle: LOGO(a.chain, 22),
        shortAddress: a.address.slice(0, 10) + "…" + a.address.slice(-4),
        fee: a.fee, eta: a.eta, address: a.address,
        expanded: s.account === i,
        onClick: () => this.setState({ account: s.account === i ? -1 : i }),
        rowStyle: [
          "display: flex; align-items: center; gap: 12px; width: 100%; padding: 13px 2px; cursor: pointer; text-align: left; font-family: inherit",
          "border: 0; border-bottom: 1px solid var(--line); color: var(--ink); min-width: 0",
          "background: " + (s.account === i ? TINT : "transparent")
        ].join("; "),
        dotStyle: "width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; background: " + (s.account === i ? INDIGO : "var(--indigo-soft)"),
        tagStyle: "margin-left: auto; padding: 2px 8px; border-radius: 999px; font-size: 10.5px; font-weight: 700; background: var(--surface); color: var(--muted)"
        };
      }),
      account: {
        title: ACCOUNTS[ai].chain + " · " + ACCOUNTS[ai].asset,
        chain: ACCOUNTS[ai].chain,
        asset: ACCOUNTS[ai].asset,
        address: ACCOUNTS[ai].address,
        fee: ACCOUNTS[ai].fee,
        eta: ACCOUNTS[ai].eta
      },
      sendAmount: s.sendAmount,
      setSendAmount: e => this.setState({ sendAmount: e.target.value }),
      sendTo: s.sendTo,
      setSendTo: e => this.setState({ sendTo: e.target.value }),
      topUpReceive: ((Number(String(s.sendAmount).replace(/[^0-9.]/g, "")) || 0) / ((MARKETS[s.homeCountry] || MARKETS.KES).rate * 1.0073)).toFixed(2) + " " + ACCOUNTS[ai].asset,
      topUpRate: ((MARKETS[s.homeCountry] || MARKETS.KES).rate * 1.0073).toFixed(2) + " " + (s.homeCountry || "KES") + " / " + ACCOUNTS[ai].asset,
      token: s.token,
      linkType: s.linkType,
      setLinkType: e => this.setState({ linkType: e.target.value }),
      useFiatSettle: () => this.setState({ settleMode: "fiat" }),
      useStableSettle: () => this.setState({ settleMode: "stable" }),
      fiatTabStyle: this.tabBtn(s.settleMode === "fiat"),
      stableTabStyle: this.tabBtn(s.settleMode === "stable"),
      settleNote: s.settleMode === "fiat"
        ? "Paid out to your mobile money or bank account"
        : "We provision the wallet — no custody work on your side",
      settleOptions: (s.settleMode === "fiat"
        ? [["KES", "Mobile money · bank"], ["TZS", "Mobile money"], ["UGX", "Mobile money"], ["NGN", "Bank transfer"]]
        : [["USDC", "Base · Stellar · Solana"], ["USDT", "Polygon · BSC"]]
      ).map(([code, detail]) => {
        const on = s.settleMode === "fiat" ? s.settleFiat === code : s.token === code;
        return {
          code, detail,
          onClick: () => this.setState(s.settleMode === "fiat" ? { settleFiat: code } : { token: code }),
          style: [
            "display: flex; flex-direction: column; gap: 1px; padding: 9px 12px; cursor: pointer; text-align: left",
            "border-radius: 8px; font-size: 12.5px; color: var(--ink)",
            "border: 1px solid " + (on ? INDIGO : "var(--border-strong)"),
            "background: " + (on ? TINT : "var(--panel)")
          ].join("; ")
        };
      }),
      walletShare: (() => {
        const tone = { Base: "#4a5560", Stellar: "#4b5563", Solana: "#7c5cd6", Polygon: "#8247e5", BSC: "#c9a227" };
        const vals = openIdx.map(i => parseFloat(String(ACCOUNTS[i].balance).replace(/[^0-9.]/g, "")) || 0);
        const total = vals.reduce((x, y) => x + y, 0) || 1;
        return openIdx.map(i => ACCOUNTS[i]).map((a, n) => {
          const pct = (vals[n] / total) * 100;
          const c = tone[a.chain] || "var(--indigo)";
          return {
            chain: a.chain, pct: Math.round(pct) + "%", title: a.chain + " " + Math.round(pct) + "%",
            style: "display: block; width: " + pct + "%; background: " + c,
            dotStyle: "width: 8px; height: 8px; border-radius: 2px; background: " + c
          };
        });
      })(),
      chainTabs: (() => {
        const all = { name: "All wallets", balance: heldKes, i: -1 };
        return [all].concat(openIdx.map(i => ({ name: ACCOUNTS[i].chain, balance: ACCOUNTS[i].balance + " " + ACCOUNTS[i].asset, i })))
          .map(t => {
            const on = s.account === t.i;
            return {
              name: t.name, balance: t.balance,
              logoStyle: t.i < 0
                ? "width: 18px; height: 18px; flex-shrink: 0; border-radius: 999px; background: var(--indigo)"
                : LOGO(ACCOUNTS[t.i].chain, 18),
              onClick: () => this.setState({ account: t.i }),
              style: "display: inline-flex; align-items: center; gap: 9px; padding: 9px 13px; border-radius: 12px; cursor: pointer; font-family: inherit; min-width: 0; background: " +
                (on ? TINT : "var(--panel)") + "; border: 1px solid " + (on ? INDIGO : "var(--border-strong)"),
              nameStyle: "font-size: 12.5px; font-weight: 700; white-space: nowrap; color: " + (on ? "var(--indigo-text)" : "var(--ink)")
            };
          });
      })(),
      walletHeroLabel: s.account < 0 ? "Total held" : ACCOUNTS[s.account].chain + " · " + ACCOUNTS[s.account].asset,
      walletHeroValue: s.account < 0 ? heldKes : ACCOUNTS[s.account].balance + " " + ACCOUNTS[s.account].asset,
      walletHeroNote: s.account < 0
        ? heldNote + " across " + openIdx.length + " open wallet" + (openIdx.length === 1 ? "" : "s")
        : "≈ " + ACCOUNTS[s.account].fiat + " at today's rate",
      closedChainsNote: ACCOUNTS.length - openIdx.length > 0
        ? (ACCOUNTS.length - openIdx.length) + " more chain" + (ACCOUNTS.length - openIdx.length === 1 ? "" : "s") + " available: " + ACCOUNTS.filter(a => openIdx.indexOf(ACCOUNTS.indexOf(a)) < 0).map(a => a.chain).join(", ") + "."
        : "All five settlement chains are open on this account.",
      walletSideTitle: s.account < 0 ? "Where money goes" : "Wallet details",
      walletFacts: (() => {
        const mono = "font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12.5px; overflow-wrap: anywhere";
        const plain = "font-size: 13px; overflow-wrap: anywhere";
        if (s.account < 0) return [
          { label: "Payout destination", value: this.payoutLine(s), valueStyle: plain },
          { label: "Reference", value: this.payoutDetailLine(s), valueStyle: mono },
          { label: "Next payout", value: s.payoutChannel === "mpesa" ? "KES 842,100 · 18:00 EAT" : "Per order, under a minute", valueStyle: plain },
          { label: "Settled this month", value: "KES 21.4M · 1,284 orders", valueStyle: plain }
        ];
        const a = ACCOUNTS[s.account];
        return [
          { label: "Deposit address", value: a.address, valueStyle: mono },
          { label: "Network fee", value: a.fee, valueStyle: mono },
          { label: "Arrives in", value: a.eta, valueStyle: mono },
          { label: "Payout destination", value: this.payoutLine(s), valueStyle: plain }
        ];
      })(),
      movementsTitle: s.account < 0 ? "Recent movements" : "Recent movements · " + ACCOUNTS[s.account].chain,
      movements: (s.lastTopUp ? [["in", "Top-up · " + (s.lastTopUp.source === "mpesa" ? "M-Pesa" : s.lastTopUp.source === "bank" ? "Bank transfer" : "On-chain"), s.lastTopUp.ref + " · " + s.lastTopUp.chain, "+" + s.lastTopUp.amount.toFixed(2) + " " + s.lastTopUp.asset]] : []).concat([
        ["in", "Settlement received", "ord_a1b2c3d4e5 · Base", "+38.42 USDC"],
        ["out", "Payout to M-Pesa", "SJ42XQ8LP1 · +2547••••4192", "−KES 4,985"],
        ["in", "Settlement received", "ord_b20c4a7e18 · Solana", "+18.44 USDC"],
        ["in", "Top up", "Bank transfer · Stellar", "+2,000.00 USDC"],
        ["out", "Transfer to Polygon", "Internal · 0x1c9a…44f0", "−1,200.00 USDT"]
      ]).map(([dir, label, note, amount]) => ({
        label, note, amount,
        icon: dir === "in" ? "↓" : "↑",
        iconStyle: "width: 26px; height: 26px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 12px; font-weight: 700; background: " +
          (dir === "in" ? "oklch(0.93 0.05 152)" : "var(--surface)") + "; color: " +
          (dir === "in" ? "oklch(0.42 0.12 152)" : "var(--muted)"),
        amountStyle: "margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; font-weight: 500; white-space: nowrap; color: " +
          (dir === "in" ? "oklch(0.45 0.13 152)" : "var(--ink)")
      })),
      accountFacts: [
        { label: "Balance", value: ACCOUNTS[ai].balance + " · " + ACCOUNTS[ai].fiat },
        { label: "Network fee", value: ACCOUNTS[ai].fee },
        { label: "Arrives in", value: ACCOUNTS[ai].eta },
        { label: "Payouts go to", value: s.payoutChannel === "mpesa"
            ? s.payoutMethod + " " + (s.payoutPhone || s.mpesaNumber)
            : s.settleAsset + " on " + s.settleChain }
      ],
      destinationLabel: s.settleMode === "fiat" ? "Payout account" : "Settlement wallet",
      destinationValue: s.settleMode === "fiat"
        ? (s.settleFiat === "KES" ? "M-Pesa · +2547••••4192 · Acme Commerce Ltd"
          : s.settleFiat === "NGN" ? "GTBank · ••••8841 · Acme Commerce Ltd"
          : "Mobile money · +255••••7730 · Acme Commerce Ltd")
        : "0x8f21c4b0" + (s.token === "USDC" ? "a7" : "e3") + "…0913 · auto-provisioned, yours to withdraw",
      destinationAction: s.settleMode === "fiat" ? "Change account" : "View wallet",
      useReusable: () => this.setState({ linkType: "Reusable" }),
      useOneOff: () => this.setState({ linkType: "One-off" }),
      reusableStyle: "padding: 7px 13px; border-radius: 8px; border: 0; cursor: pointer; font-size: 12px; font-weight: 600; background: " +
        (s.linkType === "Reusable" ? "var(--indigo)" : "transparent") + "; color: " + (s.linkType === "Reusable" ? "var(--on-indigo)" : "var(--muted)"),
      oneOffStyle: "padding: 7px 13px; border-radius: 8px; border: 0; cursor: pointer; font-size: 12px; font-weight: 600; background: " +
        (s.linkType === "One-off" ? "var(--indigo)" : "transparent") + "; color: " + (s.linkType === "One-off" ? "var(--on-indigo)" : "var(--muted)"),
      linkMethodToggles: [
        { id: "momo", label: "Mobile money", note: (MARKETS[s.currency] || MARKETS.KES).wallets, mark: (MARKETS[s.currency] || MARKETS.KES).mark, bg: ({ "M-PESA": "#00a651", MTN: "#ffcb05", OPAY: "#1dcf9f", AIRTEL: "#e40000", MOMO: "#ffcb05" })[(MARKETS[s.currency] || MARKETS.KES).mark] || "#00a651" },
        { id: "card", label: "Cards", note: "Visa and Mastercard", mark: "VISA", bg: "#1a1f71" },
        { id: "stable", label: "Stablecoin", note: "USDC or USDT", mark: "USDC", bg: "#2775ca" }
      ].map(m => {
        const on = s.linkMethods.includes(m.id);
        return {
          label: m.label, note: m.note, mark: m.mark,
          markStyle: "flex-shrink: 0; padding: 4px 7px; border-radius: 5px; font-family: 'Manrope', system-ui, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.04em; background: " + m.bg + "; color: " + (["#ffcb05", "#ff7900", "#1dc8f2", "#1dcf9f"].includes(m.bg) ? "#1a1a1a" : "#fff"),
          onClick: () => this.setState({
            linkMethods: on ? s.linkMethods.filter(x => x !== m.id) : s.linkMethods.concat(m.id)
          }),
          style: "flex: 1 1 190px; display: flex; align-items: center; gap: 9px; text-align: left; cursor: pointer; font-family: inherit; min-width: 0; padding: 12px 13px; border-radius: 12px; background: " +
            (on ? "var(--indigo-tint)" : "var(--panel)") + "; border: 1px solid " + (on ? "var(--indigo)" : "var(--border-strong)"),
          boxStyle: "width: 17px; height: 17px; flex-shrink: 0; border-radius: 5px; display: grid; place-items: center; font-size: 10px; font-weight: 700; " +
            (on ? "background: var(--indigo); color: var(--on-indigo); border: 0" : "background: transparent; color: transparent; border: 1px solid var(--border-strong)"),
          labelStyle: "font-size: 13px; font-weight: 600; color: " + (on ? "var(--indigo-text)" : "var(--ink)")
        };
      }),
      linkMethodRows: [
        { id: "momo", label: "Mobile money", mark: (MARKETS[s.currency] || MARKETS.KES).mark, bg: ({ "M-PESA": "#00a651", MTN: "#ffcb05", OPAY: "#1dcf9f", AIRTEL: "#e40000", MOMO: "#ffcb05" })[(MARKETS[s.currency] || MARKETS.KES).mark] || "#00a651" },
        { id: "card", label: "Card", mark: "VISA", bg: "#1a1f71" },
        { id: "stable", label: "Stablecoin", mark: "USDC", bg: "#2775ca" }
      ].filter(m => s.linkMethods.includes(m.id)).map((m, i) => ({
        label: m.label, mark: m.mark,
        markStyle: "flex-shrink: 0; padding: 3px 6px; border-radius: 4px; font-family: 'Manrope', system-ui, sans-serif; font-size: 8.5px; font-weight: 700; letter-spacing: 0.04em; background: " + m.bg + "; color: " + (["#ffcb05", "#ff7900", "#1dc8f2", "#1dcf9f"].includes(m.bg) ? "#1a1a1a" : "#fff"),
        style: "display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: 8px; border: 1px solid " +
          (i === 0 ? "var(--indigo)" : "var(--border-strong)") + "; background: " + (i === 0 ? "var(--indigo-tint)" : "transparent"),
        radioStyle: "width: 15px; height: 15px; flex-shrink: 0; border-radius: 999px; " +
          (i === 0 ? "background: var(--indigo); box-shadow: inset 0 0 0 3px var(--panel)" : "border: 1px solid var(--border-strong)"),
        labelStyle: "font-size: 12.5px; font-weight: " + (i === 0 ? "600" : "500") + "; color: " + (i === 0 ? "var(--ink)" : "var(--muted)")
      })),
      ...this.pmVals(s),
      ...this.waVals(s, fmtFiat),
      ...(() => {
        const st = s.linkStep || 1;
        const fixed = s.linkPriceType !== "open";
        const amt = Number(String(s.amount || "").replace(/[^0-9.]/g, "")) || 0;
        const ok1 = !!(s.clientRef || "").trim() && (!fixed || amt > 0);
        const ok2 = this.pmVals(s).pmOnTotal > 0;
        const can = st === 1 ? ok1 : st === 2 ? ok2 : true;
        const waLabel = s.waSent ? "Send again" : "Send on WhatsApp";
        return {
          linkStepDetails: st <= 3,
          linkStepShare: st === 4,
          linkS1: st === 1, linkS2: st === 2, linkS3: st === 3,
          linkShowSummary: st < 3 || !s.waOn || (s.pvTab || "checkout") === "checkout",
          linkShowWa: st === 3 && !!s.waOn && (s.pvTab || "checkout") === "chat",
          linkPvTabsOn: st === 3 && !!s.waOn,
          linkPvTabs: [["checkout", "Checkout page"], ["chat", "WhatsApp chat"]].map(([id, label]) => ({
            label, onClick: () => this.setState({ pvTab: id }),
            style: "padding: 6px 11px; border-radius: 7px; border: 0; cursor: pointer; font-family: inherit; font-size: 11.5px; font-weight: 600; white-space: nowrap; " + ((s.pvTab || "checkout") === id ? "background: var(--panel-solid); color: var(--ink); box-shadow: 0 1px 3px rgba(20,24,28,0.12)" : "background: transparent; color: var(--muted)")
          })),
          goLinkShare: () => this.setState({ linkStep: 4 }),
          goLinkDetails: () => this.setState({ linkStep: 3 }),
          linkSteps: ["Details", "Payment", "Send"].map((label, i) => {
            const n = i + 1, done = st > n || st === 4, on = st === n;
            return {
              label, mark: done ? "✓" : String(n), notLast: n < 3,
              dotStyle: "width: 20px; height: 20px; border-radius: 999px; display: grid; place-items: center; font-size: 10.5px; font-weight: 700; " + (done || on ? "background: var(--indigo); color: var(--on-indigo)" : "background: var(--surface); color: var(--muted)"),
              labelStyle: "font-size: 12px; font-weight: " + (on ? "700" : "600") + "; color: " + (on ? "var(--ink)" : "var(--muted)")
            };
          }),
          linkFixed: fixed,
          linkPriceTypes: [["fixed", "Fixed amount"], ["open", "Customer enters it"]].map(([id, label]) => ({
            label,
            onClick: () => this.setState({ linkPriceType: id }),
            style: "padding: 9px 10px; border-radius: 8px; border: 0; cursor: pointer; font-family: inherit; font-size: 12.5px; font-weight: 600; " + ((id === "open") === !fixed ? "background: var(--panel-solid); color: var(--ink); box-shadow: 0 1px 3px rgba(20,24,28,0.12)" : "background: transparent; color: var(--muted)")
          })),
          linkSendWays: [[false, "Copy link", "Paste it in email, SMS, Instagram or your site."], [true, "WhatsApp", "We message the customer. They pay in the chat."]].map(([wa, label, note]) => ({
            label, note,
            onClick: () => this.setState({ waOn: wa }),
            style: "display: flex; flex-direction: column; gap: 3px; padding: 12px 13px; border-radius: 10px; cursor: pointer; text-align: left; font-family: inherit; background: " + (!!s.waOn === wa ? "var(--indigo-tint)" : "var(--panel-solid)") + "; border: " + (!!s.waOn === wa ? "1.5px solid var(--indigo)" : "1px solid var(--border-strong)")
          })),
          linkSumName: (s.clientRef || "").trim() || "Untitled link",
          linkPvSlug: ((s.clientRef || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-link").slice(0, 28),
          linkPvPay: fixed ? "Pay " + s.currency + " " + (amt ? amt.toLocaleString() : "0") : "Continue",
          linkPvType: s.linkType === "One-off" ? "Closes after one payment" : "Can be paid many times",
          linkPvWallet: s.currency,
          linkSumPrice: fixed ? (s.currency + " " + (amt ? amt.toLocaleString() : "0")) : "Customer enters amount",
          linkSumRows: [
            { label: "Pays with", value: s.linkMethods.length ? s.linkMethods.length + " method" + (s.linkMethods.length > 1 ? "s" : "") : "None yet" },
            { label: "Can be paid", value: s.linkType === "One-off" ? "Once" : "Many times" },
            { label: "Money goes to", value: "Your " + s.currency + " wallet" }
          ],
          linkBackLabel: st === 1 ? "Cancel" : "Back",
          linkBack: st === 1 ? () => this.setState({ modal: null }) : () => this.setState({ linkStep: st - 1 }),
          linkNextLabel: st < 3 ? "Continue" : (s.waOn ? waLabel : "Create link"),
          linkNext: !can ? () => {} : st < 3 ? () => this.setState({ linkStep: st + 1 }) : (s.waOn
            ? () => this.setState({ waSent: true, waStage: "chat", waDelivery: /^\+?\d{9,15}$/.test(String(s.waPhone || "").replace(/\s/g, "")) ? s.waDelivery : "undelivered" })
            : () => this.setState({ linkStep: 4 })),
          linkNextStyle: "flex: 1 1 190px; padding: 13px; border-radius: 12px; border: 0; background: var(--indigo); color: var(--on-indigo); font-family: inherit; font-size: 13.5px; font-weight: 700; cursor: " + (can ? "pointer" : "not-allowed") + "; opacity: " + (can ? "1" : "0.45")
        };
      })(),
      linkStepDots: [1, 2].map(n => ({
        style: "width: 22px; height: 4px; border-radius: 999px; background: " + (s.linkStep >= n ? "var(--indigo)" : "var(--line)")
      })),
      linkQrCells: (() => {
        const N = 21, out = [];
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const fx = x > N - 8 ? x - (N - 7) : x, fy = y > N - 8 ? y - (N - 7) : y;
          const finder = (x < 7 && y < 7) || (x > N - 8 && y < 7) || (x < 7 && y > N - 8);
          let on;
          if (finder) { const r = Math.max(Math.abs(fx - 3), Math.abs(fy - 3)); on = r === 3 || r <= 1; }
          else on = ((x * 11 + y * 5 + ((x * y) % 7)) % 3 === 0);
          out.push({ style: "border-radius: 1px; background: " + (on ? "#12102a" : "transparent") });
        }
        return out;
      })(),
      clientRef: s.clientRef,
      setClientRef: e => this.setState({ clientRef: e.target.value, copied: false }),
      checkoutUrl: "https://pay.elementpay.net/c/" + (live ? "live" : "test") + "_" +
        (s.clientRef || "ref").replace(/[^a-z0-9]/gi, "").slice(0, 10).toLowerCase() + "?amount=" + amountNum + "&currency=" + s.currency,
      copyLabel: s.copied ? "Copied" : "Copy link",
      copyUrl: () => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 1800);
      },
      checkoutSnippet: 'curl https://' + (live ? "api" : "sandbox") + '.elementpay.net/api/v1/orders \\\n  -H "x-api-key: $ELEMENTPAY_API_KEY" \\\n  -d \'{\n    "order_type": 1,\n    "token": "' + s.token + '",\n    "client_ref": "' + s.clientRef + '",\n    "hosted_checkout": true,\n    "callback_url": "https://api.acme.co/hooks/elementpay",\n    "fiat_payload": { "amount": ' + amountNum + ', "currency": "' + s.currency + '" }\n  }\'',
      payAmountNumber: amountNum.toLocaleString(),
      previewAmount: fmtFiat,
      paySelect: s.pay === "select",
      payWait: s.pay === "wait",
      payPaid: s.pay === "paid",
      payInvoiceLabel: "Invoice " + (s.clientRef || "").replace(/[^0-9]/g, "").slice(-4),
      ...(() => {
        const inv = MARKETS[s.currency] || MARKETS.KES;
        const pc = s.payerCountry && MARKETS[s.payerCountry] ? s.payerCountry : s.currency;
        const pm = MARKETS[pc] || inv;
        const cross = pc !== s.currency;
        const fx = pm.rate / inv.rate * (cross ? 1.01 : 1);
        const pAmt = amountNum * fx;
        const pd = pAmt >= 1000 ? 0 : 2;
        const pStr = pAmt.toLocaleString("en-US", { minimumFractionDigits: pd, maximumFractionDigits: pd });
        this._payer = { pc, pm, cross, label: pc + " " + pStr };
        return {
          payerChips: Object.keys(MARKETS).map(c => ({
            code: c, country: MARKETS[c].country,
            flagStyle: "width: 20px; height: 14px; flex-shrink: 0; border-radius: 3px; box-shadow: 0 0 0 1px rgba(20,24,28,0.1); background: center/cover no-repeat url(/flags/flag-" + MARKETS[c].iso + ".svg)",
            onClick: () => this.setState({ payerCountry: c, pay: "select", payerMenuOpen: false }),
            style: "display: flex; align-items: center; gap: 9px; width: 100%; padding: 8px 9px; border: 0; border-radius: 8px; cursor: pointer; font-family: inherit; text-align: left; color: var(--ink); background: " + (c === pc ? "var(--indigo-tint)" : "transparent")
          })),
          payerMenuOpen: !!s.payerMenuOpen,
          togglePayerMenu: () => this.setState({ payerMenuOpen: !s.payerMenuOpen }),
          payerCountryName: pm.country,
          payerFlagStyle: "width: 18px; height: 12px; flex-shrink: 0; border-radius: 2px; box-shadow: 0 0 0 1px rgba(20,24,28,0.1); background: center/cover no-repeat url(/flags/flag-" + pm.iso + ".svg)",
          payShowCur: pc, payShowAmount: pStr,
          payCross: cross,
          payCrossNote: "≈ " + s.currency + " " + amountNum.toLocaleString() + " to " + (s.bizName || "the business").split(" ")[0]
        };
      })(),
      payOptions: [
        { id: "mpesa", label: (this._payer ? this._payer.pm : (MARKETS[s.currency] || MARKETS.KES)).wallet, note: "Approve on your handset", tag: "Instant", mark: (this._payer ? this._payer.pm : (MARKETS[s.currency] || MARKETS.KES)).mark, bg: ({ "M-PESA": "#00a651", MTN: "#ffcb05", OPAY: "#1dcf9f", AIRTEL: "#e40000", MOMO: "#ffcb05" })[(this._payer ? this._payer.pm : MARKETS.KES).mark] || "#00a651" },
        { id: "card", label: "Card", note: "Visa · Mastercard", tag: "3-D Secure", mark: "VISA", bg: "#1a1f71" },
        { id: "crypto", label: "Stablecoin", note: "USDC or USDT, any chain", tag: "On-chain", mark: "USDC", bg: "#2775ca" }
      ].map(o => {
        const on = s.payMethod === o.id;
        return {
          label: o.label, note: o.note, tag: o.tag, mark: o.mark,
          onClick: () => this.setState({ payMethod: o.id }),
          rowStyle: "width: 100%; text-align: left; font-family: inherit; display: flex; align-items: center; gap: 13px; padding: 14px 15px; border-radius: 12px; cursor: pointer; background: " +
            (on ? "var(--panel-solid)" : "transparent") + "; border: 1.5px solid " + (on ? "var(--indigo)" : "transparent") +
            (on ? "; box-shadow: 0 3px 12px rgba(59,46,211,0.12)" : ""),
          markStyle: "width: 38px; height: 27px; flex-shrink: 0; border-radius: 7px; display: grid; place-items: center; font-family: 'Manrope', system-ui, sans-serif; font-size: 8px; font-weight: 700; letter-spacing: 0.04em; color: #fff; background: " + o.bg,
          labelStyle: "font-size: 13.5px; font-weight: " + (on ? "700" : "600") + "; letter-spacing: -0.005em; color: " + (on ? "var(--ink)" : "var(--muted)"),
          checkStyle: on
            ? "width: 18px; height: 18px; border-radius: 999px; display: grid; place-items: center; background: var(--indigo); color: var(--on-indigo); font-size: 10px; font-weight: 700"
            : "width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid var(--border-strong)",
          check: on ? "✓" : ""
        };
      }),
      payCta: "Pay " + (this._payer && this._payer.cross ? this._payer.label : fmtFiat),
      payNow: () => {
        this.setState({ pay: "wait" });
        clearTimeout(this._payT);
        this._payT = setTimeout(() => this.setState(st => st.pay === "wait" ? { pay: "paid" } : {}), 2400);
      },
      payReset: () => this.setState({ pay: "select" }),
      payWaitTitle: s.payMethod === "mpesa" ? "Check your phone"
        : s.payMethod === "card" ? "Confirming with your bank"
        : "Waiting for your transfer",
      payWaitNote: s.payMethod === "mpesa" ? "Enter your " + this._payer.pm.wallet + " PIN on the prompt we just sent to " + this._payer.pm.dial + " ••• ••" + this._payer.pm.sample.slice(-2) + "."
        : s.payMethod === "card" ? "Your bank is running 3-D Secure. Do not close this page."
        : "Send " + tokenAmount + " " + s.settleAsset + " on " + s.settleChain + ". We confirm in about ten seconds.",
      payPaidNote: s.payMethod === "crypto"
        ? "Confirmed on " + s.settleChain + ". A receipt is on its way to your email."
        : "A receipt has been sent to you by SMS.",
      payPaidRows: [
        ["Paid", this._payer.cross ? this._payer.label : fmtFiat],
        ...(this._payer.cross ? [["Business receives", fmtFiat]] : []),
        ["Method", s.payMethod === "mpesa" ? this._payer.pm.wallet + " · " + this._payer.pm.dial + " •••• " + this._payer.pm.sample.slice(-3) : s.payMethod === "card" ? "Visa ••••4821" : s.settleAsset + " on " + s.settleChain],
        ["Reference", s.payMethod === "crypto" ? "0x4a1f…9c3e" : "SJ42XQ8LP1"]
      ].map(([label, value]) => ({
        label, value,
        rowStyle: "display: flex; align-items: baseline; gap: 12px; padding: 8px 0; border-top: 1px dashed var(--line); flex-wrap: wrap",
        valueStyle: "margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11.5px; text-align: right; overflow-wrap: anywhere"
      })),
      previewConversion: s.payoutChannel === "mpesa"
        ? "Settles as " + amountNum.toLocaleString() + " " + s.currency + " to M-Pesa " + s.mpesaNumber
        : "≈ " + tokenAmount + " " + s.settleAsset + " on " + s.settleChain + " at " + rate + " " + s.currency + "/" + s.settleAsset,
      methods,

      query: s.query,
      setQuery: e => this.setState({ query: e.target.value, sel: 0 }),
      statusFilters: filters,
      filterSummary: (s.filter === "All" ? "Showing all orders" : "Filtered to " + s.filter.toLowerCase()) + " · " + orders.length + " shown",
      orders,
      order,
      timeline: tl,
      drawerStatus: ({ settled: "Completed", processing: "In progress", pending: "Waiting for payment", failed: "Failed", refunded: "Refunded" })[justRefunded ? "refunded" : order.status] || order.status,
      drawerStatusStyle: "align-self: flex-start; padding: 3px 8px; border-radius: 6px; font-size: 11.5px; font-weight: 700; " + (({ settled: "background: oklch(0.94 0.05 152); color: oklch(0.4 0.14 152)", failed: "background: oklch(0.96 0.04 25); color: oklch(0.52 0.17 25)", refunded: "background: oklch(0.96 0.04 25); color: oklch(0.52 0.17 25)" })[justRefunded ? "refunded" : order.status] || "background: oklch(0.96 0.06 80); color: oklch(0.48 0.13 80)"),
      drawerKind: order.flow === "Off-ramp" ? "Payout" : "Payment" + (order.wa ? " via WhatsApp" : ""),
      drawerRows: (order.flow === "Off-ramp" ? [
        ["Recipient", order.recipient], ["They got", order.fiat], ["From your wallet", got], ["Rate", order.rate]
      ] : [
        ["Customer", order.recipient], ["They paid", order.fiat], ["You got", got], ["Rate", order.rate]
      ]).filter(r => has(r[1])).concat(order.mpesa && order.mpesa !== "—" ? [["Receipt no.", order.mpesa]] : []).map(([label, value]) => ({ label, value })),
      drawerCanRefund: order.flow !== "Off-ramp" && order.status === "settled" && !justRefunded,
      drawerTech: !!s.drawerTech,
      drawerHasHash: !!order.hash && order.hash !== "—",
      toggleDrawerTech: () => this.setState({ drawerTech: !s.drawerTech }),
      drawerTechLabel: s.drawerTech ? "Hide developer details ▴" : "Developer details ▾",
      drawerHook: order.status === "pending" ? "Not sent yet" : "Delivered · 200",
      hasSelection: visible.length > 0,
      txOpen: !!s.txOpen && visible.length > 0,
      downloadReceipt: () => this.printReceipt(order),
      ...(() => {
        const rk = s.exportRange || "30d";
        const pad = n => String(n).padStart(2, "0");
        const iso = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
        const today = new Date(2026, 9, 4);
        const back = n => { const d = new Date(today); d.setDate(d.getDate() - n); return d; };
        const ranges = { today: ["Today", 0], "7d": ["7 days", 6], "30d": ["30 days", 29], month: ["This month", today.getDate() - 1], "90d": ["90 days", 89], custom: ["Custom", null] };
        const from = rk === "custom" ? (s.exportFrom || iso(back(29))) : iso(back(ranges[rk][1]));
        const to = rk === "custom" ? (s.exportTo || iso(today)) : iso(today);
        const fmt = v => new Date(v + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
        const base = s.exportUseFilters === false ? ORD : visible;
        const days = Math.max(1, Math.round((new Date(to) - new Date(from)) / 864e5) + 1);
        const est = Math.min(base.length, Math.max(1, Math.round(base.length * Math.min(1, days / 30)))) * (days > 30 ? Math.ceil(days / 30) : 1);
        this._exportRows = base;
        this._exportName = "elementpay-transactions_" + from + "_to_" + to + ".csv";
        return {
          exportOpen: !!s.exportOpen,
          toggleExport: () => this.setState({ exportOpen: !s.exportOpen }),
          exportRanges: Object.keys(ranges).map(k => ({
            label: ranges[k][0],
            onClick: () => this.setState({ exportRange: k }),
            style: "padding: 8px 6px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 12px; font-weight: 600; white-space: nowrap; border: " + (rk === k ? "1.5px solid var(--indigo)" : "1px solid var(--border-strong)") + "; background: " + (rk === k ? "var(--indigo-tint)" : "var(--panel-solid)") + "; color: " + (rk === k ? "var(--indigo-text)" : "var(--ink)")
          })),
          exportCustom: rk === "custom",
          exportFrom: from, exportTo: to,
          setExportFrom: e => this.setState({ exportFrom: e.target.value }),
          setExportTo: e => this.setState({ exportTo: e.target.value }),
          exportUseFilters: s.exportUseFilters !== false,
          toggleExportFilters: () => this.setState({ exportUseFilters: s.exportUseFilters === false }),
          exportRangeLabel: fmt(from) + " → " + fmt(to),
          exportCountLabel: (s.fresh ? 0 : est).toLocaleString() + " transactions"
        };
      })(),
      exportCsv: () => {
        const visible = this._exportRows || [];
        this.setState({ exportOpen: false });
        const rows = [["Date", "Customer", "Type", "Amount", "You got", "Status", "Order ID", "Reference", "Receipt no."]].concat(visible.map(o => [o.created, o.recipient, o.flow === "Off-ramp" ? "Payout" : "Payment", o.fiat, o.crypto, o.status, o.id, o.ref, o.mpesa]));
        const csv = rows.map(r => r.map(v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"').join(",")).join("\n");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
        a.download = this._exportName || "elementpay-transactions.csv";
        document.body.appendChild(a); a.click(); a.remove();
      },
      closeDrawer: () => this.setState({ txOpen: false }),
      openRefund: () => this.setState({ modal: "refund", flow: null, refundOrder: order.id, refundAmount: String(order.fiat).replace(/[^0-9]/g, "") }),
      modalReceipt: s.modal === "receipt",
      openReceipt: () => this.setState({ modal: "receipt", emailedReceipt: false }),
      receiptNumber: "Receipt " + (order.ref || "—").toUpperCase(),
      receiptPaidLabel: order.status === "settled" ? "Paid in full" : order.status === "refunded" ? "Refunded" : "Not paid yet",
      receiptPaidStyle: "align-self: flex-start; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: " +
        (order.status === "settled" ? OK.bg : order.status === "refunded" ? BAD.bg : WARN.bg) + "; color: " +
        (order.status === "settled" ? OK.text : order.status === "refunded" ? BAD.text : WARN.text),
      receiptAmount: order.fiat,
      receiptRows: [
        ["Paid to", s.bizName || "Acme Foods"],
        ["Paid by", order.recipient],
        ["Method", order.flow === "On-ramp" ? "M-Pesa → " + order.crypto : "Wallet → M-Pesa"],
        ["M-Pesa ref", order.mpesa],
        ["Settlement tx", order.hash],
        ["Order", order.id],
        ["Date", order.created + " EAT"]
      ].map(([label, value]) => ({
        label, value,
        rowStyle: "display: flex; align-items: baseline; gap: 14px; padding: 10px 0; border-top: 1px dashed var(--line); flex-wrap: wrap",
        valueStyle: "margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; text-align: right; overflow-wrap: anywhere"
      })),
      receiptTotalRows: [
        ["Order total", order.fiat, false],
        ["ElementPay fee", "KES 0 · paid by merchant", false],
        ["Charged", order.fiat, true]
      ].map(([label, value, strong]) => ({
        label, value,
        rowStyle: "display: flex; align-items: baseline; gap: 14px; padding: " + (strong ? "12px 0 0" : "6px 0") + "; " + (strong ? "border-top: 1px solid var(--border-strong)" : "") + "; flex-wrap: wrap",
        valueStyle: "margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: " + (strong ? "15px" : "12px") + "; font-weight: " + (strong ? "700" : "500") + "; text-align: right"
      })),
      receiptFooter: "Questions about this payment: " + (s.bizSupport || "help@acme.co"),
      receiptEmailLabel: s.emailedReceipt ? "Emailed ✓" : "Email to customer",
      emailReceipt: () => this.setState({ emailedReceipt: true }),
      goSettings: () => this.setState({ view: "settings" }),
      railOpen: s.railOpen,
      railCollapsed: !s.railOpen,
      toggleRail: () => this.setState({ railOpen: !s.railOpen }),
      railOpenStr: s.railOpen ? "true" : "false",
      closeRail: () => this.setState({ railOpen: false }),
      railNavTap: e => {
        if (window.innerWidth > 860) return;
        const b = e.target.closest && e.target.closest("button");
        if (b) setTimeout(() => this.setState({ railOpen: false }), 0);
      },
      railHeadStyle: "display: flex; align-items: center; gap: 8px; min-width: 0; " + (s.railOpen ? "padding: 14px 12px 12px; flex-wrap: nowrap" : "padding: 14px 0 10px; flex-direction: column; gap: 10px"),
      railToggleMargin: s.railOpen ? "margin-left: auto;" : "margin: 0;",
      railStyle: "flex: " + (s.railOpen ? "0 0 248px" : "0 0 68px") + "; max-width: 100%; align-self: flex-start; background: var(--rail); color: var(--rail-text); border-right: 1px solid var(--rail-line); backdrop-filter: var(--glass-blur); display: flex; flex-direction: column; position: sticky; top: 0; height: 100dvh; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; width: " + (s.railOpen ? "auto" : "68px"),
      railToggleLabel: s.railOpen ? "«" : "»",
      goReference: () => this.setState({ view: "reference" }),

      txGated: false,
      noDeliveries: !s.liveApproved && !(s.testOrders || []).length,
      apiKeys: !s.liveApproved ? [
        { name: "Default test key", masked: "ep_sk_test_" + ((s.bizName || "acme").toLowerCase().replace(/[^a-z]/g, "").slice(0, 4) || "test") + "••••••0001", env: "Live", lastUsed: "Never", webhook: "Not set", badgeStyle: badge({ bg: "var(--sand-bg)", text: "var(--sand-text)" }) }
      ] : [
        { name: "Storefront server", masked: "ep_sk_live_4f2a••••••9dc1", env: "Live", lastUsed: "2 mins ago", webhook: "Configured", badgeStyle: badge({ bg: "var(--sand-bg)", text: "var(--sand-text)" }) },
        { name: "Payout bot", masked: "ep_sk_live_7b10••••••2ef8", env: "Live", lastUsed: "3 hours ago", webhook: "Configured", badgeStyle: badge(OK) },
        { name: "Reconciliation job", masked: "ep_sk_live_ac55••••••61b4", env: "Live", lastUsed: "Never", webhook: "Not set", badgeStyle: badge({ bg: "var(--sand-bg)", text: "var(--sand-text)" }) }
      ].filter(k => s.liveApproved || k.env !== "Live"),
      deliveries: !s.liveApproved ? (s.testOrders || []).map(o => ({ code: "200", type: "order.settled → your endpoint", meta: "test event · " + o.created, badgeStyle: badge(OK) })) : [
        { code: "200", type: "order.settled → api.acme.co", meta: "your handler answered in 184 ms. Nothing to do.", badgeStyle: badge(OK) },
        { code: "200", type: "order.failed → api.acme.co", meta: "attempt 1 · 121 ms", badgeStyle: badge(OK) },
        { code: "504", type: "order.settled → staging.acme.co", meta: "your handler timed out — POST /webhooks/elementpay never answered. Retry 3 of 5.", badgeStyle: badge(BAD) },
        { code: "429", type: "order.processing → api.acme.co", meta: "your server asked us to slow down — we will retry in 4 s. Retry 2 of 5.", badgeStyle: badge(WARN) },
        { code: "200", type: "order.refunded → api.acme.co", meta: "attempt 1 · 203 ms", badgeStyle: badge(OK) }
      ],
      verifySnippet: 'const sig = req.headers["x-elementpay-signature"];\nconst expected = crypto\n  .createHmac("sha256", process.env.EP_WEBHOOK_SECRET)\n  .update(req.rawBody)\n  .digest("hex");\n\nif (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {\n  return res.status(400).end();\n}',

      txEmpty: visible.length === 0,
      txEmptyTitle: !s.liveApproved && !(s.testOrders || []).length ? "No test payments yet" : "Nothing matches",
      txEmptyNote: !s.liveApproved && !(s.testOrders || []).length ? "Test payments you make on the testnet will show up here." : "Try a different filter or search.",
      txEmptyCta: !s.liveApproved && !(s.testOrders || []).length,
      txSummary: (!s.liveApproved ? [
        ["All", String(ORD.length), "test payments", "var(--indigo)"],
        ["Settled", String(ORD.filter(o => o.status === "settled").length), "on the testnet", OK.text],
        ["Processing", String(ORD.filter(o => o.status === "processing").length), "awaiting rail confirm", WARN.text],
        ["Pending", String(ORD.filter(o => o.status === "pending").length), "customer not paid yet", WARN.text],
        ["Failed", String(ORD.filter(o => o.status === "failed").length), "rail rejected or timed out", BAD.text],
        ["Refunded", String(ORD.filter(o => o.status === "refunded").length), "returned to the payer", NEUTRAL.text]
      ] : [
        ["All", "1,284", "orders in the last 24 h", "var(--indigo)"],
        ["Settled", (1186 - refundedCount).toLocaleString(), "98.3% of completed", OK.text],
        ["Processing", "42", "awaiting rail confirm", WARN.text],
        ["Pending", "21", "customer not paid yet", WARN.text],
        ["Failed", "21", "rail rejected or timed out", BAD.text],
        ["Refunded", (14 + refundedCount).toLocaleString(), "auto-returned on-chain", NEUTRAL.text]
      ]).map(([label, count, note, c]) => ({
        label, count, note,
        on: s.filter === label,
        onClick: () => this.setState({ filter: label, sel: 0 }),
        cardStyle: "text-align: left; cursor: pointer; backdrop-filter: var(--glass-blur); box-shadow: var(--glass-shadow); border-radius: 12px; padding: 13px 14px; display: flex; flex-direction: column; gap: 4px; border: 1px solid " +
          (s.filter === label ? "var(--indigo)" : "var(--glass-line)") + "; background: " +
          (s.filter === label ? "var(--indigo-tint)" : "var(--panel)"),
        dotStyle: "width: 8px; height: 8px; border-radius: 999px; flex-shrink: 0; background: " + c,
        labelStyle: "display: flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 600; color: " + (s.filter === label ? "var(--indigo-text)" : "var(--muted)"),
        countStyle: "font-family: 'Manrope', system-ui, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; color: " + (label === "All" ? "var(--ink)" : c)
      })),
      linkStats: [{ label: "Active links", value: "3" }, { label: "Payments (30 days)", value: "539" }, { label: "Collected (30 days)", value: "KES 412,800" }],
      activeLinks: [
        ["Checkout — standard cart", "pay.elementpay.net/c/test_acmeinv104", "variable", "USDC", "Reusable", "412 paid", "live", OK],
        ["Invoice 1042 — Acme Ltd", "pay.elementpay.net/c/test_acmeinv1042", "5,000 KES", "KES", "One-off", "1 of 1 paid", "used", NEUTRAL],
        ["Bot top-up (Telegram)", "pay.elementpay.net/c/test_bottopup01", "variable", "USDT", "Reusable", "88 paid", "live", OK],
        ["Dar es Salaam storefront", "pay.elementpay.net/c/test_dstore771", "variable", "TZS", "Reusable", "39 paid", "live", OK]
      ].map(([name, slug, amount, settles, type, paid, state, pal]) => ({
        name, slug, amount, settles, type, paid, state,
        stateLabel: state === "live" ? "Active" : "Completed",
        priceLabel: amount === "variable" ? "Customer enters amount" : amount,
        copyLabel: s.copiedKey === "link:" + slug ? "Copied" : "Copy link",
        copy: () => { try { navigator.clipboard && navigator.clipboard.writeText("https://" + slug); } catch (e) {} this.copyKey("link:" + slug); },
        qr: () => this.setState({ modal: "poster" }),
        preview: () => {
          const m = /^([\d,]+)\s*([A-Z]{3})$/.exec(amount);
          this.setState(Object.assign({ modal: "coPreview", checkoutMode: "link", pay: "select", payerMenuOpen: false, coPreviewTitle: name.split(" — ")[0] }, m ? { amount: m[1].replace(/,/g, ""), currency: m[2] } : {}));
        },
        badgeStyle: badge(pal).replace(/padding:[^;]+;/, "padding: 2px 8px;"),
        settleDot: "width: 7px; height: 7px; border-radius: 2px; flex-shrink: 0; background: " +
          (settles === "USDC" || settles === "USDT" ? INDIGO : "var(--indigo-soft)")
      })),
      invite: s.invite,
      setInvite: e => this.setState({ invite: e.target.value }),
      inviteRole: s.inviteRole,
      setInviteRole: e => this.setState({ inviteRole: e.target.value }),
      members: (!s.liveApproved ? [
        ["You", s.authEmail || "dev@acme.co", "Owner", "All keys", "Enabled", "Now"]
      ] : [
        ["Amina Njeri", "amina@acme.co", "Owner", "All keys", "Enabled", "2 mins ago"],
        ["Brian Otieno", "brian@acme.co", "Developer", "Read only", "Enabled", "18 mins ago"],
        ["Chloe Wanjiru", "chloe@acme.co", "Finance", "No key access", "Enabled", "3 hours ago"],
        ["Dan Kimani", "dan@acme.co", "Developer", "Read only", "Missing", "Yesterday"],
        ["Esther Mumo", "esther@acme.co", "Viewer", "No key access", "Enabled", "4 days ago"]
      ]).map(([name, email, role, keys, mfa, active]) => ({
        name, email, role, keys, mfa, active,
        initials: name.split(" ").map(p => p[0]).join(""),
        avatarStyle: "width: 30px; height: 30px; border-radius: 999px; flex-shrink: 0; display: grid; place-items: center; font-size: 11.5px; font-weight: 700; background: var(--indigo-tint); color: var(--indigo-text)",
        roleStyle: badge(role === "Owner" ? { bg: TINT, text: "var(--indigo-text)" } : NEUTRAL)
      })),
      hasInvites: !!s.liveApproved,
      invites: (!s.liveApproved ? [] : [
        ["fatuma@acme.co", "Sent 2 days ago by Amina", "Developer"],
        ["ops@acme.co", "Sent 5 days ago by Amina", "Finance"]
      ]).map(([email, meta, role]) => ({ email, meta, role, roleStyle: badge(NEUTRAL) })),
      roleMatrix: [
        ["Owner", "Everything, including billing, live keys and closing the account."],
        ["Admin", "Create and revoke keys, edit webhooks, refund orders, invite members."],
        ["Developer", "API keys, payment links, logs and replays. No live key reveal."],
        ["Finance", "Transactions, exports, receipts and settlement accounts. No keys."],
        ["Viewer", "Read-only dashboards and transaction history."]
      ].map(([role, can]) => ({ role, can, roleStyle: badge(role === "Owner" ? { bg: TINT, text: "var(--indigo-text)" } : NEUTRAL) })),
      keyUsage: [
        ["Storefront server", "612 / 1,000 rpm", 61, "Burst ceiling 2,000 rpm"],
        ["Payout bot", "188 / 600 rpm", 31, "Idempotency keys recommended"],
        ["Reconciliation job", "12 / 300 rpm", 4, "Batch reads, 50 per page"]
      ].map(([name, value, pct, note]) => ({
        name, value, note,
        fillStyle: "display: block; height: 100%; width: " + pct + "%; border-radius: 999px; background: " + (pct > 55 ? INDIGO : "var(--indigo-soft)")
      })),
      commonErrors: [
        ["400", "invalid_fiat_payload", "destination_type must match the rail — PHONE for M-Pesa, PAYBILL needs account_number.", BAD],
        ["402", "insufficient_liquidity", "Retry with a smaller amount or poll GET /quote until the rail reopens.", WARN],
        ["409", "duplicate_client_ref", "You already created this order. Read it back instead of retrying.", WARN],
        ["429", "rate_limited", "Back off using the Retry-After header. Bots should queue, not spin.", WARN]
      ].map(([code, type, fix, pal]) => ({ code, type, fix, badgeStyle: badge(pal) })),

      endpoints,
      endpoint: {
        method: ep.method, path: ep.path, desc: ep.desc, auth: ep.auth,
        request: ep.request, response: ep.response,
        methodStyle: this.methodColor(ep.method),
        authStyle: "margin-left: auto; padding: 3px 9px; border-radius: 999px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; background: var(--surface); color: var(--muted)"
      }
    };
  }
  pmVals(s) {
        const C = [
          ["KE", "Kenya", [["mpesa", "M-Pesa", "MP", "#00a651"], ["airtel-ke", "Airtel Money", "AM", "#e40000"]], "PesaLink"],
          ["TZ", "Tanzania", [["mpesa-tz", "M-Pesa", "MP", "#00a651"], ["mixx", "Mixx by Yas", "MX", "#00205b"], ["airtel-tz", "Airtel Money", "AM", "#e40000"], ["halo", "HaloPesa", "HP", "#f37021"]], "TIPS transfer"],
          ["UG", "Uganda", [["mtn-ug", "MTN MoMo", "MTN", "#ffcb05"], ["airtel-ug", "Airtel Money", "AM", "#e40000"]], "Bank transfer"],
          ["RW", "Rwanda", [["mtn-rw", "MTN MoMo", "MTN", "#ffcb05"], ["airtel-rw", "Airtel Money", "AM", "#e40000"]], "Bank transfer"],
          ["GH", "Ghana", [["mtn-gh", "MTN MoMo", "MTN", "#ffcb05"], ["telecel", "Telecel Cash", "TC", "#e60000"], ["at-gh", "AT Money", "AT", "#0057b8"]], "GhIPSS instant"],
          ["NG", "Nigeria", [["opay", "OPay", "OP", "#1dcf9f"], ["palmpay", "PalmPay", "PP", "#6a2bd9"], ["moniepoint", "Moniepoint", "MO", "#0357ee"]], "NIP transfer"],
          ["ZM", "Zambia", [["mtn-zm", "MTN MoMo", "MTN", "#ffcb05"], ["airtel-zm", "Airtel Money", "AM", "#e40000"]], "Bank transfer"],
          ["CI", "Côte d'Ivoire", [["orange-ci", "Orange Money", "OM", "#ff7900"], ["wave-ci", "Wave", "WV", "#1dc8f2"], ["mtn-ci", "MTN MoMo", "MTN", "#ffcb05"], ["moov-ci", "Moov Money", "MV", "#0066b3"]], "Bank transfer"],
          ["SN", "Senegal", [["orange-sn", "Orange Money", "OM", "#ff7900"], ["wave-sn", "Wave", "WV", "#1dc8f2"], ["free-sn", "Free Money", "FM", "#cd1e25"]], "Bank transfer"],
          ["CM", "Cameroon", [["mtn-cm", "MTN MoMo", "MTN", "#ffcb05"], ["orange-cm", "Orange Money", "OM", "#ff7900"]], "Bank transfer"]
        ];
        const homeIso = ({ KES: "KE", TZS: "TZ", UGX: "UG", RWF: "RW", GHS: "GH", NGN: "NG" })[s.homeCountry] || "KE";
        const scope = s.pmScope || "pick";
        const picked = s.pmCountries || [homeIso];
        const active = scope === "all" ? C : C.filter(c => picked.includes(c[0]));
        const off = s.pmOff || [];
        const flag = (iso, w, h) => "width: " + w + "px; height: " + h + "px; flex-shrink: 0; border-radius: 3px; box-shadow: 0 0 0 1px rgba(20,24,28,0.12); background: center/cover no-repeat url(/flags/flag-" + iso.toLowerCase() + ".svg)";
        const tile = (id, name, note, mark, bg) => {
          const on = !off.includes(id);
          return {
            name, note, mark, on,
            onClick: () => this.setState({ pmOff: on ? off.concat(id) : off.filter(x => x !== id) }),
            style: "display: flex; align-items: center; gap: 10px; min-width: 0; padding: 10px 11px; border-radius: 11px; cursor: pointer; font-family: inherit; text-align: left; transition: background 0.15s, border-color 0.15s; background: " + (on ? "var(--panel-solid)" : "transparent") + "; border: " + (on ? "1.5px solid var(--indigo)" : "1px solid var(--border)") + "; opacity: " + (on ? "1" : "0.6"),
            markStyle: "width: 32px; height: 32px; flex-shrink: 0; border-radius: 9px; display: grid; place-items: center; font-family: 'Manrope', system-ui, sans-serif; font-size: " + (mark.length > 2 ? "9.5px" : "11px") + "; font-weight: 800; letter-spacing: 0.02em; background: " + bg + "; color: " + (["#ffcb05", "#ff7900", "#1dc8f2", "#1dcf9f"].includes(bg) ? "#1a1a1a" : "#fff"),
            checkStyle: "width: 18px; height: 18px; flex-shrink: 0; border-radius: 999px; display: grid; place-items: center; font-size: 10px; font-weight: 800; " + (on ? "background: var(--indigo); color: var(--on-indigo)" : "background: transparent; color: transparent; box-shadow: inset 0 0 0 1.5px var(--border-strong)")
          };
        };
        const multi = active.length > 1;
        const mk = (title, rows) => {
          const ids = rows.flatMap(r => r.ids);
          const onN = ids.filter(i => !off.includes(i)).length;
          return {
            title, count: onN + " of " + ids.length + " on", rows,
            toggleLabel: onN === ids.length ? "Turn all off" : "Turn all on",
            toggleAll: () => this.setState({ pmOff: onN === ids.length ? Array.from(new Set(off.concat(ids))) : off.filter(x => !ids.includes(x)) })
          };
        };
        const row = (c, list) => ({ head: c[1], showHead: multi, flagStyle: flag(c[0], 18, 12), ids: list.map(x => x[0]), tiles: list.map(x => tile(x[0], x[1], x[4] || c[1], x[2], x[3])) });
        const sections = [
          mk("Mobile money", active.map(c => row(c, c[2]))),
          mk("Bank transfer", [{ head: "", showHead: false, ids: active.map(c => "bank-" + c[0]), tiles: active.map(c => tile("bank-" + c[0], c[3], c[1], c[0], "#6b7580")) }]),
          mk("Cards", [{ head: "", showHead: false, ids: ["visa", "mc", "amex"], tiles: [tile("visa", "Visa", "Credit and debit", "VISA", "#1a1f71"), tile("mc", "Mastercard", "Credit and debit", "MC", "#eb001b"), tile("amex", "Amex", "International", "AX", "#2e77bc")] }]),
          mk("Stablecoins", [{ head: "", showHead: false, ids: ["usdc-base", "usdt-tron", "usdc-sol"], tiles: [tile("usdc-base", "USDC", "Base", "USDC", "#2775ca"), tile("usdt-tron", "USDT", "Tron", "USDT", "#26a17b"), tile("usdc-sol", "USDC", "Solana", "USDC", "#2775ca")] }])
        ];
        const allIds = sections.flatMap(sc => sc.rows.flatMap(r => r.ids));
        const onTotal = allIds.filter(i => !off.includes(i)).length;
    return {
          pmScopes: [["pick", "Pick countries"], ["all", "All of Africa"]].map(([id, label]) => ({
            label, onClick: () => this.setState({ pmScope: id }),
            style: "padding: 7px 11px; border-radius: 7px; border: 0; cursor: pointer; font-family: inherit; font-size: 12px; font-weight: 600; white-space: nowrap; " + (scope === id ? "background: var(--panel-solid); color: var(--ink); box-shadow: 0 1px 3px rgba(20,24,28,0.12)" : "background: transparent; color: var(--muted)")
          })),
          pmPicking: scope === "pick",
          pmCountryCards: C.map(c => {
            const on = picked.includes(c[0]);
            return {
              name: c[1], on, count: c[2].length + " wallets", flagStyle: flag(c[0], 26, 18),
              onClick: () => this.setState({ pmCountries: on ? (picked.length > 1 ? picked.filter(x => x !== c[0]) : picked) : picked.concat(c[0]) }),
              style: "display: flex; align-items: center; gap: 9px; min-width: 0; padding: 9px 10px; border-radius: 10px; cursor: pointer; font-family: inherit; text-align: left; color: var(--ink); background: " + (on ? "var(--indigo-tint)" : "var(--panel-solid)") + "; border: " + (on ? "1.5px solid var(--indigo)" : "1px solid var(--border)")
            };
          }),
          pmScopeNote: scope === "all" ? "Customers in " + C.length + " countries see their local options." : "Showing options for " + active.map(c => c[1]).join(", ") + ".",
          pmSections: sections,
          linkMethodCount: onTotal === 0 ? "Pick at least one" : onTotal + " methods on",
          pmOnTotal: onTotal,
          ...(() => {
            const onIds = new Set(allIds.filter(i => !off.includes(i)));
            const first = active[0] || C[0];
            const wal = first[2].filter(x => onIds.has(x[0]));
            const rows = [];
            wal.slice(0, 3).forEach(x => rows.push({ name: x[1], note: "Prompt on your phone", mark: x[2], markStyle: "width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px; display: grid; place-items: center; font-family: 'Manrope', system-ui, sans-serif; font-size: " + (x[2].length > 2 ? "8.5px" : "10px") + "; font-weight: 800; background: " + x[3] + "; color: " + (["#ffcb05", "#ff7900", "#1dc8f2", "#1dcf9f"].includes(x[3]) ? "#1a1a1a" : "#fff") }));
            const grey = m => "width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px; display: grid; place-items: center; font-family: 'Manrope', system-ui, sans-serif; font-size: 8.5px; font-weight: 800; background: " + m + "; color: #fff";
            if (["visa", "mc", "amex"].some(i => onIds.has(i))) rows.push({ name: "Card", note: ["visa", "mc", "amex"].filter(i => onIds.has(i)).map(i => ({ visa: "Visa", mc: "Mastercard", amex: "Amex" })[i]).join(" · "), mark: "CARD", markStyle: grey("#5b6670") });
            if (onIds.has("bank-" + first[0])) rows.push({ name: "Bank transfer", note: first[3], mark: "BANK", markStyle: grey("#6b7580") });
            const coins = ["usdc-base", "usdt-tron", "usdc-sol"].filter(i => onIds.has(i));
            if (coins.length) rows.push({ name: "Stablecoin", note: Array.from(new Set(coins.map(i => i.startsWith("usdt") ? "USDT" : "USDC"))).join(" · ") + " · rate locked 15 min", mark: "USD", markStyle: grey("#4a5560") });
            return {
              pvMethods: rows.map((r, i) => Object.assign(r, { rowStyle: "display: flex; align-items: center; gap: 10px; padding: 10px 11px; border-radius: 10px; border: " + (i === 0 ? "1.5px solid var(--indigo)" : "1px solid var(--border)") + "; background: " + (i === 0 ? "var(--indigo-tint)" : "var(--panel-solid)"), dotStyle: "width: 14px; height: 14px; flex-shrink: 0; border-radius: 999px; margin-left: auto; box-sizing: border-box; border: " + (i === 0 ? "4.5px solid var(--indigo)" : "1.5px solid var(--border-strong)") })),
              pvEmpty: rows.length === 0,
              pvCountry: first[1] + (active.length > 1 ? " +" + (active.length - 1) : ""),
              pvFlagStyle: flag(first[0], 16, 11)
            };
          })()
    };
  }
}


export default Component;
