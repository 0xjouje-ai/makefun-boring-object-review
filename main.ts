import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One-line review of the dustpan: the dullest everyday object with the
// most recognisable failure. Every sweep leaves the same thin line of
// dust behind, yet the dustpan turns up again like today is the day.
// The joke is the object's own dullness: a decade of the same failure,
// met with unfounded optimism. The turn lands in the last words.
const line =
  "The dustpan has missed the same last line of dust for ten years, and still turns up to every sweep like today is the day.";

// The gate accepts a single line of 1-200 characters. Reject control
// characters so the entry stays one clean printable line.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry is ${line.length} characters, outside the 1-200 gate`);
}
for (const ch of line) {
  const code = ch.charCodeAt(0);
  if (code < 32 || code === 127) {
    throw new Error(`entry contains control character ${code}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read the file straight back and confirm it matches the intended
// text byte for byte before finishing.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the intended line");
}
console.log(`wrote ${line.length}-character entry to /output/entry.txt`);
