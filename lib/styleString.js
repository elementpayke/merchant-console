// Converts the design's inline CSS strings into React style objects, memoized.
const cache = new Map();

export function S(str) {
  if (!str) return undefined;
  const hit = cache.get(str);
  if (hit) return hit;
  const o = {};
  let depth = 0, start = 0;
  const decls = [];
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === ";" && depth === 0) { decls.push(str.slice(start, i)); start = i + 1; }
  }
  decls.push(str.slice(start));
  for (const d of decls) {
    const j = d.indexOf(":");
    if (j < 0) continue;
    const rawProp = d.slice(0, j).trim();
    let value = d.slice(j + 1).trim();
    if (!rawProp) continue;
    let important = false;
    if (/!important$/.test(value)) { value = value.replace(/\s*!important$/, ""); important = true; }
    const prop = rawProp.startsWith("--")
      ? rawProp
      : rawProp.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^Webkit|^Moz|^Ms/, (m) => m);
    o[prop] = value;
    // React has no !important support in style objects; values here never rely on it.
    void important;
  }
  if (cache.size < 20000) cache.set(str, o);
  return o;
}
