/**
 * Precise C trace line audit with function-context awareness.
 * Run: node scripts/audit-c-trace-lines.mjs [--fix]
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FIX = process.argv.includes("--fix");
const DIR = path.join(ROOT, "src/problems/c");

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

/** Parse function/block regions: { name, start, end } (1-based lines) */
function parseFunctions(codeLines) {
  const funcs = [];
  const patterns = [
    /^(\w[\w\s\*]*?)\s+(\w+)\s*\([^)]*\)\s*\{/,
    /^int\s+main\s*\(/,
    /^void\s+(\w+)\s*\(/,
    /^double\s+(\w+)\s*\(/,
    /^Data\*\s+(\w+)\s*\(/,
  ];
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i].trim();
    let name = null;
    if (/^int\s+main\s*\(/.test(line)) name = "main";
    else {
      const m = line.match(
        /^(?:double|int|void|char|struct\s+\w+|\w+\*?)\s+(\w+)\s*\(/,
      );
      if (m && !line.endsWith(";")) name = m[1];
    }
    if (name) {
      let depth = 0;
      let started = false;
      for (let j = i; j < codeLines.length; j++) {
        for (const ch of codeLines[j]) {
          if (ch === "{") { depth++; started = true; }
          else if (ch === "}") depth--;
        }
        if (started && depth === 0) {
          funcs.push({ name, start: i + 1, end: j + 1 });
          break;
        }
      }
    }
  }
  return funcs;
}

function inferContext(comment, prevContext) {
  const c = comment;
  if (/main\s*\(\).*(시작|함수)/.test(c)) return "main";
  if (/arr1.*(호출|진입)/.test(c)) return "arr1";
  if (/arr2.*(호출|진입)/.test(c)) return "arr2";
  if (/insert\s*\(/.test(c) && /진입|malloc|new_node|return new_node|i=\d+.*arr\[/.test(c))
    return "insert";
  if (/reconnect\s*\(/.test(c) && /진입|prev|curr|while|head/.test(c)) return "reconnect";
  if (/set\s*\(\)|set\(\)|재배치/.test(c) && !/malloc.*set/.test(c)) {
    if (/set\(\) 완료|set\(\) 종료|set\(\) for/.test(c)) return "set";
    if (/sum.*루프|i=\d+.*arr\[/.test(c) && prevContext === "main") return "main";
    if (/i=\d+.*row=/.test(c) || /set\(\) 진입|set 루프/.test(c)) return "set";
  }
  if (/dec\s*\(/.test(c) || /& 0xA5/.test(c)) return "dec";
  if (/sum\s*\(&s|sum\s*\(/.test(c) && /진입|score|Kim|Lee/.test(c)) return "sum";
  if (/enq\s*\(|deq\s*\(/.test(c)) return c.match(/enq|deq/)?.[0] ?? prevContext;
  if (/func\s*\(/.test(c) || /func\(/.test(c)) {
    if (/main/.test(c)) return "main";
    return "func";
  }
  return prevContext;
}

function scoreLine(codeLine, comment, funcName) {
  const line = codeLine.trim();
  const c = comment;
  if (!line) return 0;
  let score = 0;

  // Strong signals
  if (/main\s*\(\)/.test(c) && /\bmain\s*\(/.test(line)) score += 100;
  if (/arr1.*(호출|진입)/.test(c) && /arr1\s*\(/.test(line)) score += 100;
  if (/arr2.*(호출|진입)/.test(c) && /arr2\s*\(/.test(line)) score += 100;
  if (/insert\s*\(.*진입|insert\(head/.test(c) && /insert\s*\(/.test(line)) score += 100;
  if (/reconnect\s*\(/.test(c) && /reconnect\s*\(/.test(line) && /진입|호출/.test(c))
    score += 100;
  if (/set\s*\(\)\s*진입|set\s*\(arr/.test(c) && /void set\s*\(/.test(line)) score += 100;
  if (/dec\s*\(/.test(c) && /int dec\s*\(/.test(line)) score += 80;
  if (/sum\s*\(&s/.test(c) && /int sum\s*\(/.test(line)) score += 80;

  if (/double av\s*=\s*0/.test(c) && /double av\s*=\s*0/.test(line)) score += 80;
  if (/av\s*\+=/.test(c) && /av\s*\+=/.test(line)) {
    score += 60;
    if (funcName === "arr1" && /p\[i\]/.test(line)) score += 40;
    if (funcName === "arr2" && /\*\s*\(\s*p\s*\+/.test(line)) score += 40;
  }
  if (/p\[i\]|p\[0\]/.test(c) && /p\[i\]/.test(line)) score += 50;
  if (/\*\s*\(p\+|\*\(p\+/.test(c) && /\*\s*\(\s*p\s*\+/.test(line)) score += 50;
  if (/return av/.test(c) && /return av/.test(line)) score += 80;
  if (/printf/.test(c) && /printf/.test(line)) score += 80;
  if (/malloc/.test(c) && /malloc/.test(line)) score += 60;
  if (/for\s*\(/.test(c) && /for\s*\(/.test(line)) score += 40;
  if (/return 0/.test(c) && /return 0/.test(line)) score += 60;
  if (/prev->next|curr->next/.test(c) && /prev->next|curr->next|head\s*=/.test(line))
    score += 50;

  // Token overlap
  const tokens = [];
  for (const m of c.matchAll(
    /`([^`]+)`|'([^']+)'|"([^"]+)"|(\b\w[\w.\[\]\*->]*\b)/g,
  )) {
    const t = (m[1] ?? m[2] ?? m[3] ?? m[4] ?? "").trim();
    if (t.length > 2 && !/^(int|for|the|and|호출|진입|반환)$/.test(t)) tokens.push(t);
  }
  for (const t of tokens) {
    if (line.includes(t)) score += 8;
  }

  return score;
}

function findBestInContext(codeLines, comment, funcs, context) {
  const func = funcs.find((f) => f.name === context);
  const start = func ? func.start : 1;
  const end = func ? func.end : codeLines.length;

  let best = { line: null, score: 0 };
  for (let i = start - 1; i < end; i++) {
    const s = scoreLine(codeLines[i], comment, context);
    if (s > best.score) best = { line: i + 1, score: s };
  }
  if (best.score < 20) {
    // fallback: whole file
    for (let i = 0; i < codeLines.length; i++) {
      const s = scoreLine(codeLines[i], comment, context);
      if (s > best.score) best = { line: i + 1, score: s };
    }
  }
  return best.score >= 20 ? best.line : null;
}

function replaceTraceSteps(src, steps) {
  const start = src.indexOf("traceSteps:");
  const arrStart = src.indexOf("[", start);
  let depth = 0;
  for (let i = arrStart; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) {
        const formatted = JSON.stringify(steps, null, 2).replace(/"([^"]+)":/g, "$1:");
        return src.slice(0, start) + `traceSteps:   ${formatted}` + src.slice(i + 1);
      }
    }
  }
  return src;
}

let totalIssues = 0;
let totalFixed = 0;

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts")) {
  const filePath = path.join(DIR, file);
  const src = fs.readFileSync(filePath, "utf8");
  const codeLines = extractCode(src);
  const steps = extractTraceSteps(src);
  if (!codeLines || !steps) continue;

  const funcs = parseFunctions(codeLines);
  let context = "main";
  const issues = [];
  const fixed = steps.map((step, i) => {
    context = inferContext(step.comment, context);
    const best = findBestInContext(codeLines, step.comment, funcs, context);
    if (best && best !== step.line) {
      const cur = (codeLines[step.line - 1] ?? "").trim();
      const exp = (codeLines[best - 1] ?? "").trim();
      // Only flag if current line is clearly wrong (low score) or best is much better
      const curScore = scoreLine(codeLines[step.line - 1] ?? "", step.comment, context);
      const bestScore = scoreLine(codeLines[best - 1] ?? "", step.comment, context);
      if (bestScore > curScore + 15 || curScore < 25) {
        issues.push({
          step: i + 1,
          ctx: context,
          from: step.line,
          to: best,
          cur,
          exp,
          comment: step.comment.slice(0, 65),
        });
        return { ...step, line: best };
      }
    }
    return step;
  });

  if (issues.length) {
    totalIssues += issues.length;
    console.log(`\n${file}: ${issues.length} issue(s)`);
    console.log(`  Functions: ${funcs.map((f) => `${f.name}(${f.start}-${f.end})`).join(", ")}`);
    for (const iss of issues) {
      console.log(`  step ${iss.step} [${iss.ctx}]: L${iss.from} -> L${iss.to}`);
      console.log(`    comment: ${iss.comment}`);
      console.log(`    was: ${iss.cur}`);
      console.log(`    fix: ${iss.exp}`);
    }
    if (FIX) {
      fs.writeFileSync(filePath, replaceTraceSteps(src, fixed));
      totalFixed += issues.length;
    }
  } else {
    console.log(`OK  ${file}`);
  }
}

console.log(`\nTotal: ${totalIssues} issue(s)${FIX ? `, fixed ${totalFixed}` : " (run with --fix)"}`);
