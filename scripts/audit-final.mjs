/**
 * Final audit: trace completeness, relatedLines, memory, last-step sanity.
 * Run: node scripts/audit-final.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIRS = ["src/problems/c", "src/problems/java", "src/problems/python"];

function listProblems() {
  const out = [];
  for (const dir of DIRS) {
    for (const f of fs.readdirSync(path.join(ROOT, dir))) {
      if (f.endsWith(".ts") && f !== "index.ts") out.push(path.join(ROOT, dir, f));
    }
  }
  return out.sort();
}

function extractCode(src) {
  const m = src.match(/const code = `([\s\S]*?)`;/);
  return m ? m[1].split("\n") : null;
}

function extractTraceSteps(src) {
  const start = src.indexOf("traceSteps:");
  if (start < 0) return null;
  const arrStart = src.indexOf("[", start);
  let depth = 0;
  for (let i = arrStart; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) {
        return Function(`"use strict"; return (${src.slice(arrStart, i + 1)});`)();
      }
    }
  }
  return null;
}

function isOutputLine(t) {
  return /print\s*\(|printf\s*\(|println\s*\(|putchar\s*\(|System\.out\.(?:print|println)/.test(
    t.trim(),
  );
}

const issues = [];
const summary = [];

for (const filePath of listProblems()) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const src = fs.readFileSync(filePath, "utf8");
  const code = extractCode(src);
  const steps = extractTraceSteps(src);

  if (!code) {
    issues.push({ file: rel, type: "no-code" });
    continue;
  }
  if (!steps?.length) {
    issues.push({ file: rel, type: "no-traceSteps" });
    continue;
  }

  const withRelated = steps.filter((s) => s.relatedLines?.length).length;
  const withMemory = steps.filter((s) => s.memory?.cells?.length).length;
  const badLines = steps.filter((s) => s.line < 1 || s.line > code.length);
  const emptyComment = steps.filter((s) => !s.comment?.trim());
  const last = steps[steps.length - 1];
  const lastText = (code[last.line - 1] ?? "").trim();

  if (badLines.length) {
    issues.push({ file: rel, type: "line-out-of-range", count: badLines.length });
  }
  if (emptyComment.length) {
    issues.push({ file: rel, type: "empty-comment", count: emptyComment.length });
  }

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    const lt = (code[s.line - 1] ?? "").trim();
    for (const r of s.relatedLines ?? []) {
      if (r.line < 1 || r.line > code.length) {
        issues.push({ file: rel, type: "related-line-out-of-range", step: i + 1, line: r.line });
      }
      const rt = (code[r.line - 1] ?? "").trim();
      if (isOutputLine(rt) && !isOutputLine(lt) && r.role !== "call") {
        issues.push({
          file: rel,
          type: "print-in-related-not-active",
          step: i + 1,
          active: s.line,
          related: r.line,
        });
      }
      if (r.line === s.line && r.role !== "call") {
        issues.push({ file: rel, type: "related-same-as-active", step: i + 1, line: s.line });
      }
    }
    if (isOutputLine(lt) && /최종|출력/.test(s.comment ?? "")) {
      const reads = (s.relatedLines ?? []).filter((r) => r.role === "read");
      const defs = (s.relatedLines ?? []).filter((r) => r.role === "definition");
      const hasRef = reads.length > 0 || defs.length > 0;
      const isLiteral = /println\s*\(\s*["']|print\s*\(\s*["']|putchar\s*\(\s*['"]/.test(lt);
      if (!hasRef && !isLiteral) {
        issues.push({
          file: rel,
          type: "final-output-no-read",
          step: i + 1,
          line: s.line,
          text: lt.slice(0, 50),
        });
      }
    }
  }

  summary.push({
    file: rel.replace("src/problems/", ""),
    steps: steps.length,
    related: withRelated,
    memory: withMemory,
    lastLine: last.line,
    lastCode: lastText.slice(0, 42),
    lastRelated: (last.relatedLines ?? []).map((r) => `L${r.line}:${r.role}`).join(",") || "-",
    hasStdout: !!last.stdout,
  });
}

console.log("=== 24문제 요약 ===\n");
const maxFile = Math.max(...summary.map((s) => s.file.length));
for (const s of summary) {
  console.log(
    s.file.padEnd(maxFile),
    `steps ${String(s.steps).padStart(3)}`,
    `related ${String(s.related).padStart(3)}/${s.steps}`,
    `memory ${String(s.memory).padStart(3)}/${s.steps}`,
    `| last L${String(s.lastLine).padStart(2)}`,
    s.lastRelated.padEnd(28),
    s.hasStdout ? "[stdout]" : "",
  );
}

console.log(`\n=== 이슈: ${issues.length}건 ===\n`);
if (issues.length === 0) {
  console.log("이슈 없음 ✓");
} else {
  for (const x of issues) console.log(JSON.stringify(x));
}

process.exit(issues.length > 0 ? 1 : 0);
