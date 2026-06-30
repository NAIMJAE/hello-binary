/**
 * Validates and optionally fixes traceSteps line numbers.
 * Run: node scripts/validate-trace-lines.mjs [--fix]
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIRS = ["src/problems/c", "src/problems/java", "src/problems/python"];
const FIX = process.argv.includes("--fix");

function listProblems(dir) {
  return fs
    .readdirSync(path.join(ROOT, dir))
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => path.join(ROOT, dir, f));
}

function extractCode(src) {
  const m = src.match(/const code = `([\s\S]*?)`;/);
  return m ? m[1].split("\n") : null;
}

function extractTraceSteps(src) {
  const m = src.match(/traceSteps:\s*(\[[\s\S]*?\n  \]),/);
  if (!m) return null;
  return Function(`"use strict"; return (${m[1]});`)();
}

function findLine(codeLines, pred, start = 0) {
  for (let i = start; i < codeLines.length; i++) {
    if (pred(codeLines[i], i)) return i + 1;
  }
  for (let i = 0; i < codeLines.length; i++) {
    if (pred(codeLines[i], i)) return i + 1;
  }
  return null;
}

function findBestLine(codeLines, comment) {
  const c = comment;

  if (/프로그램이 시작/.test(c)) {
    return findLine(codeLines, (l) => l.trim() && !l.trim().startsWith("#")) ?? 1;
  }
  if (/2차원 리스트 data|data에 4개/.test(c)) {
    return findLine(codeLines, (l) => /^data\s*=/.test(l.trim())) ?? 1;
  }
  if (/빈 딕셔너리|result에 할당/.test(c)) {
    return findLine(codeLines, (l) => /result\s*=\s*\{\}/.test(l)) ?? 8;
  }
  if (/enumerate.*진입|for 루프에 진입/.test(c) && /index/.test(c)) {
    return findLine(codeLines, (l) => /for .+ in enumerate/.test(l)) ?? 10;
  }
  if (/for 루프 종료|enumerate.*종료/.test(c)) {
    const ln = findLine(codeLines, (l) => /for .+ in enumerate/.test(l));
    if (ln) {
      for (let i = ln; i < codeLines.length; i++) {
        if (/^print/.test(codeLines[i].trim())) return i;
        if (codeLines[i].trim() === "" && i > ln + 2) return i - 1;
      }
      return ln;
    }
  }
  if (/list_sum|sum\(lis\)/.test(c)) {
    return findLine(codeLines, (l) => /list_sum\s*=/.test(l));
  }
  if (/list_len|len\(lis\)/.test(c)) {
    return findLine(codeLines, (l) => /list_len\s*=/.test(l));
  }
  if (/result\[/.test(c) && /저장|할당/.test(c)) {
    return findLine(codeLines, (l) => /result\[/.test(l));
  }
  if (/print\(result\)/.test(c) || (/print\(/.test(c) && /최종|출력/.test(c) && /result/.test(c))) {
    return findLine(codeLines, (l) => /print\(result\)/.test(l));
  }
  if (/main\s*\(\).*(시작|함수)/.test(c)) {
    return findLine(codeLines, (l) => /\bmain\s*\(/.test(l));
  }
  if (/printf/.test(c) && /(실행|출력|최종)/.test(c)) {
    return findLine(codeLines, (l) => /printf/.test(l));
  }
  if (/struct Node t1/.test(c)) return findLine(codeLines, (l) => /struct Node t1/.test(l));
  if (/struct Node t2/.test(c)) return findLine(codeLines, (l) => /struct Node t2/.test(l));
  if (/struct Node t3/.test(c)) return findLine(codeLines, (l) => /struct Node t3/.test(l));
  if (/t3\.next/.test(c)) return findLine(codeLines, (l) => /t3\.next/.test(l));
  if (/t2\.next/.test(c)) return findLine(codeLines, (l) => /t2\.next/.test(l));
  if (/curr = &t3|curr =/.test(c) && !/curr->next/.test(c)) {
    return findLine(codeLines, (l) => /curr\s*=/.test(l) && !/curr->next/.test(l));
  }
  if (/int sum = 0/.test(c)) return findLine(codeLines, (l) => /int sum\s*=\s*0/.test(l));
  if (/while.*진입|while 루프/.test(c) && /curr/.test(c)) {
    return findLine(codeLines, (l) => /while\s*\(curr\)/.test(l));
  }
  if (/sum = sum \* 3|× 3/.test(c)) {
    return findLine(codeLines, (l) => /sum\s*=\s*sum\s*\*/.test(l));
  }
  if (/curr = curr->next/.test(c)) {
    return findLine(codeLines, (l) => /curr\s*=\s*curr->next/.test(l));
  }
  if (/sum \^ 42|187/.test(c)) {
    return findLine(codeLines, (l) => /sum\s*=\s*\(sum\s*\^/.test(l));
  }
  if (/while.*종료|NULL이 되어/.test(c)) {
    const w = findLine(codeLines, (l) => /while\s*\(/.test(l));
    if (w) {
      for (let i = w; i < codeLines.length; i++) {
        if (codeLines[i].trim() === "}" || (codeLines[i].trim() === "" && i > w + 1)) return i;
      }
    }
  }
  if (/arr1.*호출|arr1.*진입/.test(c)) return findLine(codeLines, (l) => /arr1\s*\(/.test(l));
  if (/arr2.*호출|arr2.*진입/.test(c)) return findLine(codeLines, (l) => /arr2\s*\(/.test(l));
  if (/double av = 0/.test(c)) return findLine(codeLines, (l) => /double av\s*=\s*0/.test(l));
  if (/av \+=|av →/.test(c)) return findLine(codeLines, (l) => /av\s*\+=/.test(l));
  if (/for 루프.*진입|for\s*\(i = 0/.test(c)) return findLine(codeLines, (l) => /for\s*\(/.test(l));
  if (/for 루프 종료/.test(c)) {
    const f = findLine(codeLines, (l) => /for\s*\(/.test(l));
    if (f) {
      for (let i = f; i < codeLines.length; i++) {
        if (codeLines[i].trim() === "}") return i + 1;
      }
      return findLine(codeLines, (l) => /av\s*\+=/.test(l));
    }
  }
  if (/return av/.test(c)) return findLine(codeLines, (l) => /return av\s*\//.test(l));
  if (/int arr\[10\]/.test(c)) return findLine(codeLines, (l) => /int arr\[10\]/.test(l));
  if (/int len = 10/.test(c)) return findLine(codeLines, (l) => /int len\s*=\s*10/.test(l));
  if (/lst = list/.test(c)) return findLine(codeLines, (l) => /lst\s*=\s*list/.test(l));
  if (/for c in lst/.test(c) || /다음 요소 c/.test(c)) {
    return findLine(codeLines, (l) => /for c in/.test(l));
  }
  if (/print\(c, end/.test(c)) return findLine(codeLines, (l) => /print\(c,\s*end/.test(l));
  if (/print\(\)/.test(c) && /줄바꿈/.test(c)) {
    return findLine(codeLines, (l) => /^print\(\)\s*$/.test(l.trim()));
  }
  if (/for 루프 종료/.test(c) && /lst/.test(c)) {
    return findLine(codeLines, (l) => /for c in/.test(l));
  }
  if (/i = input/.test(c)) return findLine(codeLines, (l) => /i\s*=\s*input/.test(l));
  if (/x = \[\]/.test(c)) return findLine(codeLines, (l) => /x\s*=\s*\[\]/.test(l));
  if (/for word in/.test(c)) return findLine(codeLines, (l) => /for word in/.test(l));
  if (/x\.append/.test(c)) return findLine(codeLines, (l) => /x\.append/.test(l));
  if (/y =/.test(c) && /join/.test(c)) return findLine(codeLines, (l) => /y\s*=/.test(l) && /join/.test(l));
  if (/z =/.test(c) && /join/.test(c)) return findLine(codeLines, (l) => /z\s*=/.test(l) && /join/.test(l));
  if (/print\(z\)|print\(.*z/.test(c)) return findLine(codeLines, (l) => /print\(z\)/.test(l));
  if (/li = \[/.test(c)) return findLine(codeLines, (l) => /^li\s*=/.test(l.trim()));
  if (/root = tree/.test(c)) return findLine(codeLines, (l) => /root\s*=\s*tree/.test(l));
  if (/print\(calc/.test(c)) return findLine(codeLines, (l) => /print\(calc/.test(l));
  if (/for i in range\(1/.test(c)) return findLine(codeLines, (l) => /for i in range\(1/.test(l));
  if (/nodes\[\(i/.test(c) && /append/.test(c)) {
    return findLine(codeLines, (l) => /\.children\.append/.test(l));
  }
  if (/return nodes\[0\]/.test(c)) return findLine(codeLines, (l) => /return nodes\[0\]/.test(l));
  if (/calc\(/.test(c) && /(재귀|진입|복귀)/.test(c)) {
    return findLine(codeLines, (l) => /def calc|return \(node/.test(l));
  }
  if (/def f|함수 f/.test(c)) return findLine(codeLines, (l) => /\bdef f\s*\(/.test(l));
  if (/m = \[\[x\]/.test(c)) return findLine(codeLines, (l) => /m\s*=\s*\[\[x\]/.test(l));
  if (/b = m\[:\]/.test(c)) return findLine(codeLines, (l) => /b\s*=\s*m\[:\]/.test(l));
  if (/b\[i\+1\]/.test(c)) return findLine(codeLines, (l) => /b\[i\+1\]\s*\+=/.test(l));
  if (/return sum\(len/.test(c)) return findLine(codeLines, (l) => /return sum/.test(l));
  if (/print\(f\(/.test(c)) return findLine(codeLines, (l) => /print\(f\(/.test(l));

  // Token fallback
  const tokens = [];
  for (const m of c.matchAll(/`([^`]+)`|'([^']+)'|"([^"]+)"|([a-zA-Z_][\w.\[\]\*->]*)/g)) {
    const t = (m[1] ?? m[2] ?? m[3] ?? m[4] ?? "").trim();
    if (t.length > 2) tokens.push(t);
  }
  let best = { line: null, score: 0 };
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i];
    if (!line.trim()) continue;
    let score = 0;
    for (const t of tokens) {
      if (line.includes(t)) score += 5;
    }
    if (score > best.score) best = { line: i + 1, score };
  }
  return best.line;
}

function formatTraceSteps(steps) {
  return JSON.stringify(steps, null, 2)
    .replace(/^/gm, "    ")
    .replace(/^\s{4}\[/, "  [")
    .trimEnd();
}

let totalIssues = 0;
let totalFixed = 0;

for (const dir of DIRS) {
  for (const filePath of listProblems(dir)) {
    const src = fs.readFileSync(filePath, "utf8");
    const codeLines = extractCode(src);
    const steps = extractTraceSteps(src);
    if (!codeLines || !steps) continue;

    const issues = [];
    const fixed = steps.map((step, i) => {
      const best = findBestLine(codeLines, step.comment);
      if (best && best !== step.line) {
        issues.push({
          step: i + 1,
          from: step.line,
          to: best,
          comment: step.comment.slice(0, 60),
          fromCode: (codeLines[step.line - 1] ?? "").trim(),
          toCode: (codeLines[best - 1] ?? "").trim(),
        });
        return { ...step, line: best };
      }
      return step;
    });

    const rel = path.relative(ROOT, filePath);
    if (issues.length) {
      totalIssues += issues.length;
      console.log(`\n${rel}: ${issues.length} mismatch(es)`);
      for (const iss of issues) {
        console.log(`  step ${iss.step}: ${iss.from} -> ${iss.to} | ${iss.comment}`);
        console.log(`    was: ${iss.fromCode}`);
        console.log(`    now: ${iss.toCode}`);
      }
      if (FIX) {
        const formatted = formatTraceSteps(fixed);
        const newSrc = src.replace(/traceSteps:\s*\[[\s\S]*?\n  \],/, `traceSteps: ${formatted},`);
        fs.writeFileSync(filePath, newSrc);
        totalFixed += issues.length;
      }
    }
  }
}

console.log(`\nTotal mismatches: ${totalIssues}${FIX ? `, fixed: ${totalFixed}` : " (run with --fix to apply)"}`);
