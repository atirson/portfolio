import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pickLocale } from "./locale.ts";

describe("pickLocale", () => {
  it("defaults to English without a header", () => {
    assert.equal(pickLocale(undefined), "en");
    assert.equal(pickLocale(""), "en");
  });

  it("matches regional variants by base language", () => {
    assert.equal(pickLocale("pt-BR,pt;q=0.9"), "pt");
    assert.equal(pickLocale("en-US,en;q=0.9"), "en");
  });

  it("respects q-values over header order", () => {
    assert.equal(pickLocale("en;q=0.5,pt-BR;q=0.8"), "pt");
  });

  it("skips unsupported languages", () => {
    assert.equal(pickLocale("de-DE,pt;q=0.7"), "pt");
    assert.equal(pickLocale("fr,de"), "en");
  });

  it("ignores languages explicitly refused with q=0", () => {
    assert.equal(pickLocale("pt;q=0,en;q=0.1"), "en");
  });
});
