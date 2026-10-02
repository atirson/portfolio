import assert from "node:assert/strict";
import { it } from "node:test";
import { getExperienceYears } from "./experience.ts";

it("counts years since the career start", () => {
  assert.equal(getExperienceYears(new Date("2026-10-01")), 7);
});
