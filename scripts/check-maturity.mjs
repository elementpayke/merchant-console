// Node check for the maturity map: run with `npm run check`.
import assert from "node:assert/strict";
import { applyCatalogMaturity, corridorTag, maturitySuffix, maturityTag, _resetMaturityForTests } from "../lib/maturity.js";

_resetMaturityForTests();
assert.equal(maturityTag("KES"), "Live");
assert.equal(maturityTag("kes"), "Live");
assert.equal(maturityTag("NGN"), "Pilot");
assert.equal(maturityTag(undefined), "Pilot");
assert.equal(maturitySuffix("KES"), "");
assert.equal(maturitySuffix("USD"), " \u00b7 Pilot");
assert.equal(corridorTag("KES", "Live"), "Live");
assert.equal(corridorTag("KES", "Pilot"), "Pilot");
assert.equal(corridorTag("NGN", "Live"), "Pilot", "a pilot home currency cannot have live corridors");

const map = applyCatalogMaturity({
  onramp: { countries: { KE: { currency: "KES", maturity: "live" }, NG: { currency: "NGN", maturity: "live" } } },
  offramp: { countries: { TZ: { currency: "TZS", maturity: "pilot" } } },
  international_bank: { currencies: { EUR: { maturity: "roadmap" }, GBP: { maturity: "nonsense" } } },
});
assert.equal(map.NGN, "Live");
assert.equal(maturityTag("EUR"), "Roadmap");
assert.equal(maturityTag("GBP"), "Pilot", "unknown values fall back");
assert.equal(maturitySuffix("EUR"), " \u00b7 Roadmap");
assert.equal(corridorTag("NGN", "Live"), "Live", "a promoted home currency unlocks live corridors");
_resetMaturityForTests();
assert.equal(maturityTag("NGN"), "Pilot");
console.log("maturity ok");
