// One-Liner Laughs — make.fun bounty u-coral-404-one-liner-laughs-aa872d41
// Writes a single funny line (at most 200 characters) to entry.txt.
//
// The line was picked by generating 10 candidates in the build session and
// ranking them head-to-head with a free LLM judge (Groq gpt-oss-120b) against
// the competition's own judging criteria: one-line joke with setup + payoff,
// laugh-out-loud funny, surprising twist, fresh angle, no wasted words.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I tried to meditate, but my brain kept opening tabs — I'm the only person who can doomscroll in silence.";

// Gate: the sealed scorer requires /output/entry.txt to be UTF-8 text of
// 1 to 200 characters, not only white space, a single line.
function checkLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkLine(JOKE);
  // $MAKEFUN_OUTPUT_DIR when the grader sets it, otherwise /output.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  // Create the output folder if missing; never delete it (or anything in it
  // besides the entry file we own).
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  // Write exactly the joke, no trailing newline: the gate counts characters,
  // so the file must be byte-identical on every run.
  writeFileSync(target, JOKE, "utf8");
  console.log(`wrote ${JOKE.length} chars to ${target}`);
}

main();
