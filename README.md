# ElementPay Merchant Console

The Merchant & Developer Console, implemented from the V3 design in the Claude
Design project *"Dev console redesign kickoff"* (artboard **ElementPay Merchant
V3**, export saved 2026-11-09).

All data is mocked, exactly as in the design prototype. The backend plan for
wiring it to `element-pay-aggregator` lives in that repo at
`docs/console-backend-assessment.md`.

## Run

```bash
npm install
npm run dev
```

## Updating from a new design export

Save the artboard from claude.ai as a complete web page, then:

```bash
node scripts/extract-design.mjs "~/Downloads/<saved page>.html"
node scripts/port-logic.mjs
node scripts/transpile.mjs .design/design.dc.html
cp .design/style2.css app/theme.css   # drop the leading blank line
npm run build
```

The saved page is **not** the design source — it wraps the real `.dc.html` in a
`__bundler/template` JSON string and swaps every asset reference for an opaque
UUID. `extract-design.mjs` unwraps it and maps those UUIDs back to `public/`
names **by content hash**, failing loudly if any reference can't be resolved.

Intermediates land in `.design/` (gitignored).

## How this codebase maps to the design

| Piece | Source |
| --- | --- |
| `lib/logic.js` | **Generated** by `scripts/port-logic.mjs` from the design's state machine, mock data and handlers (a React class), verbatim apart from asset URLs. Every rewrite is asserted — a format change in a future export aborts the port rather than silently shipping broken images. |
| `components/markup.jsx` | **Generated** by `scripts/transpile.mjs` (`sc-if`/`sc-for`/`sc-raw-*`/`sc-camel-*`/`{{ }}` → JSX). Do not edit by hand — edit the design and re-run. |
| `app/theme.css` | The design's tokens and base styles verbatim (light + dark + sandbox band). |
| `app/hover.css` | Generated hover styles. |
| `components/Console.jsx`, `app/page.tsx` | Glue: mounts the ported class client-side with the design's default props. |
| `public/` | Brand assets from the design project (logo, OAuth marks, chain marks, flags). |

### Design-export encodings the transpiler handles

HTML can't round-trip everything the design needs, so the export encodes three
things that `transpile.mjs` decodes:

- `sc-raw-<tag>` → `<tag>` — `table`/`thead`/`tbody`/`tr`/`th`/`td`/`select`
  would otherwise be hoisted or dropped by the HTML parser.
- `sc-camel-<a-b-c>` → `aBC` — attribute names are case-insensitive in HTML, so
  `onClick`, `onChange`, `viewBox`, `readOnly`, `autoFocus` arrive kebab-cased.
- `sc-if` / `sc-for` compile to fragments, so the *real* parent of a table row is
  the nearest non-control ancestor. The transpiler threads that through when
  deciding whether whitespace is significant; without it, blank text nodes land
  inside `<tbody>` and React reports a hydration error.

## Assets

Flags under `public/flags` cover all nine home markets plus the codes used in
mock data. The design now ships a ~190-country picker, so any country outside
that set falls back to `flagcdn.com` via `EP_FLAG_URL` in `lib/logic.js` — drop
an SVG into `public/flags` and re-run `port-logic.mjs` to bundle more.

QR codes are generated locally (the design inlines a `qrcode` implementation),
so the previous `api.qrserver.com` dependency is gone. Four token logos still
load from `cryptologos.cc` by design.

Fonts load from the Google Fonts CDN (`app/layout.tsx`). The saved page also
bundles 12 `woff2` files; `extract-design.mjs` unpacks them to `.design/assets`
but they are unused.

## Demo controls

- **Demo state** (bottom right): account status (Unverified → Live → Payouts
  paused), live/sandbox, business scope, populated/empty data, partner status.
- **Ctrl K**: global search.
- Home country switcher (top bar): KES, TZS, UGX, RWF, GHS, NGN, ZAR, MWK, BWP.

## Deviation from the design source

The design's `COUNTRIES` constant ships 193 entries and **omits six of the nine
home markets** — Kenya, Tanzania, Uganda, Rwanda, Ghana and Nigeria. Only South
Africa, Malawi and Botswana are present. In onboarding that meant:

- Searching "Kenya" in *Country of registration* returned "No country matches
  that search."
- The picker's "Local rails" group listed 3 markets instead of 9.

`scripts/port-logic.mjs` re-inserts the six in alphabetical position (193 → 199
entries). The patch is keyed on the country code and is self-healing: once the
design is fixed upstream it adds nothing and reports `none missing (design fixed
upstream)`.

This is the **only** intentional divergence from the design's logic. Everything
else in `lib/logic.js` is verbatim apart from asset URLs.
