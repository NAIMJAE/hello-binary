/**
 * Context-aware manual audit for C trace lines.
 * Run: node scripts/audit-c-trace-manual.mjs
 */
import fs from "fs";
import path from "path";

const DIR = path.resolve(import.meta.dirname, "..", "src/problems/c");
const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .sort();

function parse(file) {
  const src = fs.readFileSync(path.join(DIR, file), "utf8");
  const code = src.match(/const code = `([\s\S]*?)`;/)[1].split("\n");
  const start = src.indexOf("traceSteps:");
  let depth = 0;
  const s = src.indexOf("[", start);
  let steps = [];
  for (let i = s; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) {
        steps = Function(`"use strict"; return (${src.slice(s, i + 1)});`)();
        break;
      }
    }
  }
  return { code, steps };
}

let total = 0;

for (const file of files) {
  const { code, steps } = parse(file);
  const problems = [];

  let inArr1 = false;
  let inArr2 = false;

  steps.forEach((step, i) => {
    const c = step.comment;
    const line = code[step.line - 1]?.trim() ?? "";

    if (/arr1.*(호출|진입)/.test(c)) {
      inArr1 = true;
      inArr2 = false;
    }
    if (/arr2.*(호출|진입)/.test(c)) {
      inArr2 = true;
      inArr1 = false;
    }

    if (step.line < 1 || step.line > code.length) {
      problems.push({ step: i + 1, issue: "out of range", line: step.line, comment: c });
      return;
    }

    if (inArr2 && step.line >= 3 && step.line <= 9) {
      problems.push({
        step: i + 1,
        issue: "arr2 context on arr1 line",
        line: step.line,
        code: line,
        comment: c,
      });
    }
    if (inArr1 && step.line >= 12 && step.line <= 18) {
      problems.push({
        step: i + 1,
        issue: "arr1 context on arr2 line",
        line: step.line,
        code: line,
        comment: c,
      });
    }

    if (/printf.*출력|printf.*실행/.test(c) && !/printf/.test(line)) {
      problems.push({
        step: i + 1,
        issue: "printf step not on printf line",
        line: step.line,
        code: line,
        comment: c,
      });
    }

    if (/return av/.test(c) && !/return av/.test(line)) {
      problems.push({
        step: i + 1,
        issue: "return av step not on return line",
        line: step.line,
        code: line,
        comment: c,
      });
    }
  });

  if (problems.length) {
    total += problems.length;
    console.log(`\n### ${file}: ${problems.length} issue(s)`);
    for (const p of problems) {
      console.log(`  step ${p.step}: ${p.issue} @ L${p.line}`);
      console.log(`    code: ${p.code?.slice(0, 55)}`);
      console.log(`    comment: ${p.comment?.slice(0, 60)}`);
    }
  } else {
    console.log(`OK  ${file} (${steps.length} steps)`);
  }
}

console.log(`\nTotal issues: ${total}`);
