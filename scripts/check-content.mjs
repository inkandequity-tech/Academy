#!/usr/bin/env node
// Runs before every build. Fails if:
//  1. anything that looks like a Bar enrolment number appears in the source (never publish it);
//  2. promotional wording barred for advocates (BCI Rule 36) appears;
//  3. the course content is incomplete or malformed (see check-course.ts).
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname;
const DIRS = ["app", "components", "content", "lib", "supabase", "README.md"];
const EXT = new Set([".ts", ".tsx", ".md", ".sql", ".css", ".json", ".mjs"]);

const ENROLMENT = [
  /\b(?:UP|U\.P\.)\s*\/\s*[A-Z]?\d{2,6}\s*\/\s*\d{2,4}\b/i,               // UP/1234/2018, U.P./A123/18
  /\benrol+ment\s*(?:no|number|id|#)\b\.?\s*[:\-]?\s*[A-Z]{0,4}[\/\s-]*\d/i,  // "Enrolment No. 1234"
  /\bbar\s*council\s*(?:no|number|id)\b\.?\s*[:\-]?\s*\d/i,
];
const PROMO = [/\bbest (?:lawyer|advocate|law firm)s?\b/i, /\bno\.?\s*1 (?:lawyer|advocate|firm)\b/i, /\bguaranteed? (?:win|success|result)s?\b/i, /\bwin your case\b/i, /\btop[- ]rated (?:lawyer|advocate)s?\b/i, /\bhire us\b/i];

function walk(p, out = []) {
  const full = join(ROOT, p);
  const st = statSync(full, { throwIfNoEntry: false });
  if (!st) return out;
  if (st.isDirectory()) for (const f of readdirSync(full)) walk(join(p, f), out);
  else if (EXT.has(extname(p))) out.push(p);
  return out;
}

const problems = [];
for (const file of DIRS.flatMap((d) => walk(d))) {
  if (file.endsWith("check-content.mjs")) continue;
  readFileSync(join(ROOT, file), "utf8").split("\n").forEach((line, i) => {
    for (const re of ENROLMENT) if (re.test(line)) problems.push(`${file}:${i + 1}: looks like an enrolment number. It must never be published.`);
    for (const re of PROMO) if (re.test(line)) problems.push(`${file}:${i + 1}: promotional wording (BCI Rule 36): ${line.trim().slice(0, 80)}`);
  });
}

const r = spawnSync(process.execPath, ["--conditions=react-server", "--experimental-strip-types", "--no-warnings", join(ROOT, "scripts/check-course.ts")], { encoding: "utf8" });
if (r.status !== 0) problems.push(...(r.stdout + r.stderr).trim().split("\n").filter(Boolean));

if (problems.length) {
  console.error("Content check failed:\n" + problems.map((p) => "  - " + p).join("\n"));
  process.exit(1);
}
console.log("Content check OK" + (r.stdout ? ": " + r.stdout.trim() : ""));
