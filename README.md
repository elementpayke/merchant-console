# ElementPay Merchant Console

The Merchant & Developer Console, implemented from the frozen V3 design
(`ElementPay Merchant V3 frozen 2026-11-08.dc.html`, Claude Design project
*"Dev console redesign kickoff"*).

All data is mocked, exactly as in the design prototype. The backend plan for
wiring it to `element-pay-aggregator` lives in that repo at
`docs/console-backend-assessment.md`.

## Run

```bash
npm install
npm run dev
```

## How this codebase maps to the design

| Piece | Source |
| --- | --- |
| `lib/logic.js` | The design's state machine, mock data and handlers, ported verbatim (a React class). Flag/chain assets rewritten to local `/public` paths; `flagcdn.com` replaced with bundled SVGs. |
| `components/markup.jsx` | **Generated** from the design markup by `scripts/transpile.mjs` (`sc-if`/`sc-for`/`{{ }}` → JSX). Do not edit by hand — edit the design and re-run the transpiler. |
| `app/theme.css` | The design's tokens and base styles verbatim (light + dark + sandbox band). |
| `app/hover.css` | Generated hover styles. |
| `components/Console.jsx`, `app/page.tsx` | Glue: mounts the ported class client-side with the design's default props. |
| `public/` | Brand assets from the design project (logo, OAuth marks, chain marks, flags — flags for cn/gb/eu/de/rw/gh/in/us/za/usdc/usdt drawn locally to remove the flagcdn dependency). |

## Demo controls

- **Demo state** (bottom right): account status (Unverified → Live → Payouts
  paused), live/sandbox, business scope, populated/empty data, partner status.
- **Ctrl K**: global search.
- Home country switcher (top bar): KES, TZS, UGX, RWF, GHS, NGN.

External references that remain by design: QR images (`api.qrserver.com`) and
two token logos (`cryptologos.cc`); everything else is bundled.
