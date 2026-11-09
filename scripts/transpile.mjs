// Transpiles the Claude Design .dc.html markup (sc-if / sc-for / {{ path }} bindings)
// into a single React JSX render function, preserving inline styles verbatim via S().
// Run: node scripts/transpile.mjs <input.dc.html>
import fs from "node:fs";

const SRC = process.argv[2];
let src = fs.readFileSync(SRC, "utf8");

// ---- slice markup: between <x-dc> and </x-dc>, minus <helmet>...</helmet> ----
src = src.slice(src.indexOf("<x-dc>") + 6, src.indexOf("</x-dc>"));
const hStart = src.indexOf("<helmet>");
const hEnd = src.indexOf("</helmet>");
if (hStart >= 0) src = src.slice(0, hStart) + src.slice(hEnd + 9);

// ---- parser ----
const VOID = new Set(["img", "input", "br", "hr", "meta", "link"]);

// The design export encodes names that HTML would otherwise mangle:
//   sc-raw-<tag>        -> <tag>      (table/tr/td/select survive the parser)
//   sc-camel-<a-b-c>    -> aBC        (onClick, viewBox, readOnly, ...)
// Both are stripped at parse time so everything downstream sees real names.
const camel = (s) => s.split("-").map((p, i) => (i ? p.charAt(0).toUpperCase() + p.slice(1) : p)).join("");
const normTag = (t) => (t.startsWith("sc-raw-") ? t.slice(7) : t);
const normAttr = (a) => (a.startsWith("sc-camel-") ? camel(a.slice(9)) : a);

function parse(html) {
  let i = 0;
  const root = { tag: "#root", attrs: [], children: [] };
  const stack = [root];
  const top = () => stack[stack.length - 1];
  while (i < html.length) {
    if (html[i] === "<") {
      if (html.startsWith("<!--", i)) { i = html.indexOf("-->", i) + 3; continue; }
      if (html[i + 1] === "/") {
        const j = html.indexOf(">", i);
        const name = normTag(html.slice(i + 2, j).trim());
        // pop to matching tag
        for (let k = stack.length - 1; k > 0; k--) {
          if (stack[k].tag === name) { stack.length = k; break; }
        }
        i = j + 1; continue;
      }
      // open tag
      let j = i + 1;
      while (j < html.length && /[a-zA-Z0-9-]/.test(html[j])) j++;
      const tag = normTag(html.slice(i + 1, j));
      const attrs = [];
      // attr parse (quote-aware)
      while (j < html.length) {
        while (/\s/.test(html[j])) j++;
        if (html[j] === ">" || (html[j] === "/" && html[j + 1] === ">")) break;
        let k = j;
        while (k < html.length && !/[\s=>/]/.test(html[k])) k++;
        const name = normAttr(html.slice(j, k));
        while (/\s/.test(html[k])) k++;
        if (html[k] === "=") {
          k++;
          while (/\s/.test(html[k])) k++;
          const q = html[k];
          if (q === '"' || q === "'") {
            const e = html.indexOf(q, k + 1);
            attrs.push([name, html.slice(k + 1, e)]);
            j = e + 1;
          } else {
            let e = k;
            while (e < html.length && !/[\s>]/.test(html[e])) e++;
            attrs.push([name, html.slice(k, e)]);
            j = e;
          }
        } else {
          attrs.push([name, null]);
          j = k;
        }
      }
      const selfClosed = html[j] === "/";
      i = html.indexOf(">", j) + 1;
      const node = { tag, attrs, children: [] };
      top().children.push(node);
      if (!selfClosed && !VOID.has(tag)) stack.push(node);
      // raw text containers
      if (tag === "pre" || tag === "textarea") {
        // still parsed normally; bindings inside pre are plain text + {{ }}
      }
    } else {
      const j = html.indexOf("<", i);
      const text = html.slice(i, j === -1 ? html.length : j);
      if (text) top().children.push(text);
      i = j === -1 ? html.length : j;
    }
  }
  return root;
}

// ---- helpers ----
const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&amp;/g, "&");

const rewritePath = (s) =>
  s
    .replace(/public\/elementpay-logo\.png/g, "/elementpay-logo.png")
    .replace(/public\/brand-/g, "/brand/brand-")
    .replace(/public\/chain-/g, "/chains/chain-")
    .replace(/public\/flag-/g, "/flags/flag-");

const BIND = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$.]*)\s*\}\}/g;

function pathExpr(path, scope) {
  const parts = path.split(".");
  const rooted = scope.has(parts[0]) ? parts[0] : "v." + parts[0];
  return parts.length === 1 ? rooted : rooted + "?." + parts.slice(1).join("?.");
}

// one full binding or null
function soloBinding(val) {
  const m = /^\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$.]*)\s*\}\}$/.exec(val);
  return m ? m[1] : null;
}

const SVG_ATTR = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "text-anchor": "textAnchor",
  "dominant-baseline": "dominantBaseline",
  "vector-effect": "vectorEffect",
  "clip-path": "clipPath",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "letter-spacing": "letterSpacing",
};
const RENAME = { for: "htmlFor", class: "className", tabindex: "tabIndex", colspan: "colSpan", rowspan: "rowSpan", autocomplete: "autoComplete", spellcheck: "spellCheck", srcset: "srcSet" };

// hover classes
const hoverRules = [];
function hoverClass(css) {
  const idx = hoverRules.findIndex((r) => r === css);
  const n = idx >= 0 ? idx : hoverRules.push(css) - 1;
  return "hv" + n;
}

const TABLE_PARENTS = new Set(["table", "thead", "tbody", "tr", "select", "colgroup"]);
const NO_CHAIN = new Set(["sc-if", "sc-for"]);

let out = [];
function emit(s) { out.push(s); }

// sc-if / sc-for compile to fragments, so inside one the real parent is the
// nearest non-control ancestor. Thread that through: whitespace between rows of
// a <tbody>'s sc-for must be dropped, not emitted as a hydration-breaking node.
function emitChildren(node, scope, depth, ctx) {
  const here = NO_CHAIN.has(node.tag) ? ctx : node.tag;
  for (const c of node.children) {
    if (typeof c === "string") emitText(c, here, scope);
    else emitNode(c, scope, depth + 1, here);
  }
}

function emitText(text, parentTag, scope) {
  if (!text.trim()) {
    if (TABLE_PARENTS.has(parentTag)) return;
    if (/[ \t]/.test(text) || /\n/.test(text)) emit('{" "}');
    return;
  }
  // split on bindings
  let last = 0;
  const raw = text;
  BIND.lastIndex = 0;
  let m;
  const segs = [];
  while ((m = BIND.exec(raw))) {
    if (m.index > last) segs.push(["t", raw.slice(last, m.index)]);
    segs.push(["b", m[1]]);
    last = m.index + m[0].length;
  }
  if (last < raw.length) segs.push(["t", raw.slice(last)]);
  for (const [k, vlu] of segs) {
    if (k === "b") emit("{" + pathExpr(vlu, scope) + "}");
    else {
      const d = decode(vlu);
      if (!d.trim()) { emit('{" "}'); continue; }
      emit("{" + JSON.stringify(d) + "}");
    }
  }
}

function attrOut(name, value, tag, scope, hasHandler) {
  if (name.startsWith("hint-")) return null;
  if (name === "style-hover") return null; // handled by caller
  let jsxName = RENAME[name] || (tag === "svg" || isSvgChild ? SVG_ATTR[name] || name : SVG_ATTR[name] || name);
  if (value === null) return jsxName + '=""';
  const solo = soloBinding(value);
  if (name === "style") {
    if (solo) return "style={S(" + pathExpr(solo, scope) + ")}";
    if (/\{\{/.test(value)) {
      BIND.lastIndex = 0;
      const tpl = decode(value).replace(BIND, (_, p) => "${" + pathExpr(p, scope) + "}");
      return "style={S(`" + tpl.replace(/`/g, "\\`") + "`)}";
    }
    return "style={S(" + JSON.stringify(rewritePath(decode(value))) + ")}";
  }
  if (solo) {
    // controlled-input downgrade when no handler
    if (!hasHandler && (tag === "input" || tag === "select" || tag === "textarea")) {
      if (name === "value") jsxName = "defaultValue";
      if (name === "checked") jsxName = "defaultChecked";
    }
    return jsxName + "={" + pathExpr(solo, scope) + "}";
  }
  if (/\{\{/.test(value)) {
    BIND.lastIndex = 0;
    const tpl = decode(value).replace(BIND, (_, p) => "${" + pathExpr(p, scope) + "}");
    return jsxName + "={`" + tpl.replace(/`/g, "\\`") + "`}";
  }
  let v = decode(value);
  if (name === "src" || name === "href") v = rewritePath(v);
  if (!hasHandler && (tag === "input" || tag === "select" || tag === "textarea")) {
    if (name === "value") jsxName = "defaultValue";
    if (name === "checked") jsxName = "defaultChecked";
  }
  return jsxName + "=" + JSON.stringify(v);
}

let isSvgChild = false;
let loopN = 0;

function emitNode(node, scope, depth, ctx) {
  const { tag, attrs } = node;
  if (tag === "sc-if") {
    const cond = soloBinding(attrs.find((a) => a[0] === "value")?.[1] || "");
    emit("{(" + pathExpr(cond, scope) + ") ? (<>");
    emitChildren(node, scope, depth, ctx);
    emit("</>) : null}");
    return;
  }
  if (tag === "sc-for") {
    const list = soloBinding(attrs.find((a) => a[0] === "list")?.[1] || "");
    const as = attrs.find((a) => a[0] === "as")?.[1] || "item";
    const idx = "_i" + loopN++;
    emit("{(" + pathExpr(list, scope) + " || []).map((" + as + ", " + idx + ") => (<React.Fragment key={" + idx + "}>");
    const s2 = new Set(scope); s2.add(as);
    emitChildren(node, s2, depth, ctx);
    emit("</React.Fragment>))}");
    return;
  }
  const wasSvg = isSvgChild;
  if (tag === "svg") isSvgChild = true;
  const hasHandler = attrs.some((a) => /^on(Change|Input)$/.test(a[0]));
  const parts = [];
  let hovered = null;
  for (const [n, vlu] of attrs) {
    if (n === "style-hover") { hovered = vlu; continue; }
    const r = attrOut(n, vlu, tag, scope, hasHandler);
    if (r) parts.push(r);
  }
  if (hovered !== null && !/\{\{/.test(hovered)) {
    parts.push('className="' + hoverClass(decode(hovered)) + '"');
  }
  const open = "<" + tag + (parts.length ? " " + parts.join(" ") : "");
  if (VOID.has(tag) || node.children.length === 0) {
    emit(open + (VOID.has(tag) ? "/>" : "></" + tag + ">"));
  } else {
    emit(open + ">");
    emitChildren(node, scope, depth, ctx);
    emit("</" + tag + ">");
  }
  if (tag === "svg") isSvgChild = wasSvg;
}

const tree = parse(src);
emit("/* AUTO-GENERATED by scripts/transpile.mjs from the frozen V3 design. Do not edit by hand. */\n");
emit("// @ts-nocheck\n/* eslint-disable */\n");
emit('import React from "react";\nimport { S } from "../lib/styleString";\n\n');
emit("export default function Markup({ v }) {\n  return (<>\n");
emitChildren(tree, new Set(), 0, "#root");
emit("\n  </>);\n}\n");

fs.writeFileSync("components/markup.jsx", out.join(""));

// hover css (inline styles win over classes, so force with !important)
const css = hoverRules
  .map((r, i) => {
    const decls = r
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => d + " !important")
      .join("; ");
    return ".hv" + i + ":hover { " + decls + "; }";
  })
  .join("\n");
fs.writeFileSync("app/hover.css", css + "\n");
console.log("markup.jsx bytes:", out.join("").length, "| hover rules:", hoverRules.length);
