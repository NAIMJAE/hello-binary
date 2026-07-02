/**
 * Precise Java trace line audit with overload/function context.
 * Run: node scripts/audit-java-trace-manual.mjs [--verbose]
 */
import fs from "fs";
import path from "path";

const DIR = path.resolve(import.meta.dirname, "..", "src/problems/java");
const VERBOSE = process.argv.includes("--verbose");

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

/** Find method regions: { name, start, end } 1-based */
function parseMethods(codeLines) {
  const methods = [];
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i].trim();
    let name = null;
    if (/public\s+static\s+void\s+main\s*\(/.test(line)) name = "main";
    else {
      const m = line.match(
        /(?:public|private|static|\s)+[\w<>\[\],\s]+\s+(\w+)\s*\([^)]*\)\s*\{?/,
      );
      if (m && !line.endsWith(";") && !/^(if|for|while|catch)/.test(line))
        name = m[1];
    }
    if (name) {
      let depth = 0;
      let started = false;
      for (let j = i; j < codeLines.length; j++) {
        for (const ch of codeLines[j]) {
          if (ch === "{") {
            depth++;
            started = true;
          } else if (ch === "}") depth--;
        }
        if (started && depth === 0) {
          methods.push({ name, start: i + 1, end: j + 1 });
          break;
        }
      }
    }
  }
  return methods;
}

function inferContext(comment, prev) {
  const c = comment;
  if (/main\s*\(\).*(시작|메서드)/.test(c)) return "main";
  if (/calc\s*\(\s*"/.test(c) || /calc\s*\(\s*String/.test(c) || /String\s*오버로드/.test(c))
    return "calcString";
  if (/calc\s*\(\s*int|calc\(int\s+\d|calc\(\d/.test(c) && !/String/.test(c)) return "calcInt";
  if (/arr1.*(호출|진입)/.test(c)) return "arr1";
  if (/arr2.*(호출|진입)/.test(c)) return "arr2";
  if (/run\s*\(/.test(c) && /진입|호출/.test(c)) return "run";
  if (/apply\s*\(/.test(c) || /람다|f\.apply/.test(c)) return "apply";
  if (/Parent\s*\(\)\s*생성자/.test(c)) return "Parent";
  if (/Child\s*\(\)\s*생성자/.test(c)) return "Child";
  if (/calc\s*\(\s*String\s*str\s*\)\s*진입/.test(c)) return "calcString";
  if (/calc\s*\(\s*int\s+value\s*\)\s*진입/.test(c)) return "calcInt";
  if (/try\s*블록|try\s*\{/.test(c)) return "try";
  if (/catch\s*\(/.test(c) && !/실행되지/.test(c)) return "catch";
  if (/finally/.test(c)) return "finally";
  if (/func\s*\(/.test(c) && /진입|호출/.test(c)) return "func";
  return prev;
}

function findLine(codeLines, pred) {
  for (let i = 0; i < codeLines.length; i++) {
    if (pred(codeLines[i], i)) return i + 1;
  }
  return null;
}

function expectedLine(codeLines, comment, context, methods) {
  const c = comment;

  const rules = [
    [/main\s*\(\).*(시작|메서드)/, (l) => /\bmain\s*\(/.test(l)],
    [/System\.out\.println|println.*출력/, (l) => /System\.out\.println|println/.test(l)],
    [/calc\s*\(\s*"/.test(c) || (/calc\s*\(\s*"/.test(c)), (l) => /calc\s*\(\s*"/.test(l) || /println\s*\(\s*calc\s*\(\s*"/.test(l)],
    [/calc\s*\(\s*String\s*str\s*\)\s*진입/, (l) => /calc\s*\(\s*String/.test(l)],
    [/Integer\.valueOf/, (l) => /Integer\.valueOf/.test(l)],
    [/if\s*\(\s*value\s*<=\s*1\s*\).*(거짓|참)/, (l) => /if\s*\(\s*value\s*<=\s*1/.test(l)],
    [/조건 거짓.*calc\s*\(/, (l) => /return calc/.test(l)],
    [/calc\s*\(\s*int\s+\d+\s*\)\s*진입/, (l) => /static\s+int\s+calc\s*\(\s*int/.test(l)],
    [/value\s*\(\d+\)\s*<=\s*1.*반환/, (l) => /if\s*\(\s*value\s*<=\s*1/.test(l)],
    [/calc\s*\(\d+\)\s*반환/, (l) => /return/.test(l)],
    [/try\s*블록/, (l) => /try\s*\{/.test(l)],
    [/ArithmeticException.*잡/, (l) => /catch\s*\(\s*ArithmeticException/.test(l)],
    [/출력1.*실행|System\.out\.print\s*\(\s*"출력1"/, (l) => /print\s*\(\s*"출력1"/.test(l)],
    [/출력5.*실행|System\.out\.print\s*\(\s*"출력5"/, (l) => /print\s*\(\s*"출력5"/.test(l)],
    [/실행되지 않/, (l) => /catch\s*\(/.test(l)],
    [/finally\s*블록/, (l) => /finally\s*\{/.test(l)],
    [/new\s+Child\s*\(\)/, (l) => /new\s+Child\s*\(\)/.test(l)],
    [/Parent\s*\(\)\s*생성자\s*진입/, (l) => /public\s+Parent\s*\(/.test(l)],
    [/Child\s*\(\)\s*생성자\s*진입/, (l) => /public\s+Child\s*\(/.test(l)],
    [/Child\.show\s*\(\)\s*진입|@Override/, (l) => /void\s+show\s*\(/.test(l) && /total\s*\*=|total\s*\+=\s*total/.test(l) || /public\s+void\s+show/.test(l)],
    [/total\s*\+=\s*\(\+\+v\)/, (l) => /total\s*\+=\s*\(\+\+v\)/.test(l)],
    [/total\s*\+=\s*v\+\+/, (l) => /total\s*\+=\s*v\+\+/.test(l)],
    [/func\s*\(\s*0,\s*4\s*\)\s*호출/, (l) => /println\s*\(\s*func/.test(l) || /func\s*\(/.test(l)],
    [/func\s*\(\s*0,\s*4\s*\)\s*진입/, (l) => /static\s+int\s+func/.test(l)],
    [/st\s*>=\s*end.*0\s*반환/, (l) => /if\s*\(\s*st\s*>=\s*end/.test(l)],
    [/mid\s*=.*\/\s*2/, (l) => /mid\s*=/.test(l)],
    [/run\s*\(f\)\s*호출|run\s*\(f\)/, (l) => /run\s*\(f\)/.test(l)],
    [/run\s*\(\)\s*내부\s*try|run\(\)\s*내부/, (l) => /try\s*\{/.test(l)],
    [/f\.apply\s*\(\s*3\s*\)/, (l) => /apply\s*\(\s*3\s*\)/.test(l) || /return\s+f\.apply/.test(l)],
    [/Exception.*catch|catch.*Exception/, (l) => /catch\s*\(/.test(l)],
  ];

  for (const [re, pred] of rules) {
    if (re.test(c)) {
      const ln = findLine(codeLines, pred);
      if (ln) return ln;
    }
  }

  // Context-scoped search
  const methodMap = {
    calcString: methods.find((m) => /calc/.test(m.name) && m.start > 1),
    calcInt: methods.find((m) => codeLines[m.start - 1]?.includes("calc(int")),
    run: methods.find((m) => m.name === "run"),
    Parent: methods.find((m) => m.name === "Parent"),
    Child: methods.find((m) => m.name === "Child"),
    func: methods.find((m) => m.name === "func"),
    main: methods.find((m) => m.name === "main"),
  };

  if (context === "calcInt" && /if\s*\(\s*value/.test(c)) {
    const m = methods.find((m) => codeLines[m.start - 1]?.includes("calc(int"));
    if (m) return findLine(codeLines.slice(m.start - 1, m.end), (l) => /if\s*\(\s*value/.test(l)) + m.start - 1;
  }

  return null;
}

let total = 0;
const allIssues = [];

for (const file of fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .sort()) {
  const { code, steps } = parse(file);
  const methods = parseMethods(code);
  const problems = [];
  let context = "main";

  steps.forEach((step, i) => {
    context = inferContext(step.comment, context);
    const line = code[step.line - 1]?.trim() ?? "";

    if (step.line < 1 || step.line > code.length) {
      problems.push({ step: i + 1, issue: "out of range", line: step.line, comment: step.comment });
      return;
    }

    // calc overload context: int steps should not use String calc lines
    const calcIntMethod = methods.find((m) => code[m.start - 1]?.includes("calc(int"));
    const calcStrMethod = methods.find((m) => code[m.start - 1]?.includes("calc(String"));

    if (context === "calcInt" && calcStrMethod) {
      const onStrReturn =
        step.line >= calcStrMethod.start &&
        step.line <= calcStrMethod.end &&
        /return\s+calc/.test(line);
      if (
        step.line >= calcStrMethod.start &&
        step.line <= calcStrMethod.end &&
        !onStrReturn
      ) {
        problems.push({
          step: i + 1,
          issue: "calcInt context on calcString lines",
          line: step.line,
          code: line,
          comment: step.comment,
          ctx: context,
        });
      }
    }
    if (context === "calcString" && calcIntMethod) {
      if (
        step.line >= calcIntMethod.start &&
        step.line <= calcIntMethod.end &&
        !/진입/.test(step.comment)
      ) {
        // only flag if clearly wrong
      }
    }

    // Parent vs Child constructor confusion
    const parentM = methods.find((m) => m.name === "Parent");
    const childM = methods.find((m) => m.name === "Child");
    if (context === "Child" && parentM && step.line >= parentM.start && step.line <= parentM.end) {
      if (/Child\.v|v\s*\+=\s*2|total\s*\+=\s*v\+\+/.test(step.comment)) {
        problems.push({
          step: i + 1,
          issue: "Child context on Parent lines",
          line: step.line,
          code: line,
          comment: step.comment,
          ctx: context,
        });
      }
    }
    if (context === "Parent" && childM && step.line >= childM.start && step.line <= childM.end) {
      problems.push({
        step: i + 1,
        issue: "Parent context on Child lines",
        line: step.line,
        code: line,
        comment: step.comment,
        ctx: context,
      });
    }

    // Strict semantic checks
    const checks = [
      [/main\s*\(\).*(시작|메서드)/, /\bmain\s*\(/],
      [/System\.out\.println.*출력|println.*→/, /println/],
      [/Integer\.valueOf/, /Integer\.valueOf/],
      [/try\s*블록에?\s*진입/, /try\s*\{/],
      [/finally\s*블록/, /finally\s*\{/],
      [/new\s+Child\s*\(\)/, /new\s+Child/],
      [/Parent\s*\(\)\s*생성자\s*진입/, /public\s+Parent\s*\(/],
      [/Child\s*\(\)\s*생성자\s*진입/, /public\s+Child\s*\(/],
      [/static\s+int\s+total/, /static\s+int\s+total/],
    ];

    for (const [commentRe, lineRe] of checks) {
      if (commentRe.test(step.comment) && !lineRe.test(line)) {
        const fix = findLine(code, (l) => lineRe.test(l));
        problems.push({
          step: i + 1,
          issue: `semantic mismatch: ${commentRe.source}`,
          line: step.line,
          code: line.slice(0, 55),
          comment: step.comment.slice(0, 60),
          fix,
          ctx: context,
        });
        break;
      }
    }
  });

  if (problems.length) {
    total += problems.length;
    allIssues.push({ file, problems, methods, steps: steps.length });
    console.log(`\n### ${file} (${steps.length} steps): ${problems.length} issue(s)`);
    if (VERBOSE) console.log(`  Methods: ${methods.map((m) => `${m.name}(${m.start}-${m.end})`).join(", ")}`);
    for (const p of problems) {
      console.log(`  step ${p.step} [${p.ctx || "?"}]: ${p.issue} @ L${p.line}${p.fix ? ` -> L${p.fix}?` : ""}`);
      console.log(`    was: ${p.code}`);
      console.log(`    comment: ${p.comment}`);
    }
  } else {
    console.log(`OK  ${file} (${steps.length} steps)`);
  }
}

console.log(`\nTotal issues: ${total}`);
