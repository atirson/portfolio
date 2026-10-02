import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const load = (locale: string): Json =>
  JSON.parse(
    readFileSync(new URL(`./${locale}.json`, import.meta.url), "utf8"),
  );

/** Shape of a JSON value: object keys and array lengths, ignoring text. */
function shape(value: Json): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, shape(value[key])]),
    );
  }
  return typeof value;
}

it("en and pt translations have the same structure", () => {
  assert.deepEqual(shape(load("pt")), shape(load("en")));
});

it("about text keeps the {years} placeholder", () => {
  for (const locale of ["en", "pt"]) {
    const about = (load(locale) as Record<string, Json>).about;
    assert.match(String(about), /\{years\}/, locale);
  }
});
