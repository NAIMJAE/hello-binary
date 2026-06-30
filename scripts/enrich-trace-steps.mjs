/**
 * Adds relatedLines and memory snapshots to trace steps.
 * Does NOT modify step.line values.
 * Run: node scripts/enrich-trace-steps.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIRS = ["src/problems/c", "src/problems/java", "src/problems/python"];
const C_POINTER_SLUGS = new Set([
  "array-average-2026-1",
  "struct-double-pointer-2025-2",
  "struct-pointer-offset-2025-3",
  "linked-list-xor-sum-2025-3",
  "linked-list-relink-2025-2",
  "linked-list-reverse-string-2025-2",
  "circular-queue-2025-2",
  "string-length-putchar-2025-3",
]);

const SKIP_CALL = new Set([
  "if",
  "while",
  "for",
  "switch",
  "printf",
  "print",
  "scanf",
  "putchar",
  "malloc",
  "free",
  "sizeof",
  "return",
  "System",
  "println",
  "printStackTrace",
  "new",
  "super",
  "throw",
  "catch",
  "len",
  "sum",
  "range",
  "enumerate",
  "input",
  "join",
  "append",
  "split",
  "tree",
  "calc",
  "def",
  "class",
]);

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

function extractSlug(src) {
  return src.match(/slug:\s*"([^"]+)"/)?.[1] ?? "";
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

function replaceTraceSteps(src, formatted) {
  const start = src.indexOf("traceSteps:");
  const arrStart = src.indexOf("[", start);
  let depth = 0;
  for (let i = arrStart; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) {
        return src.slice(0, start) + `traceSteps: ${formatted}` + src.slice(i + 1);
      }
    }
  }
  return src;
}

function formatTraceSteps(steps) {
  return JSON.stringify(steps, null, 2)
    .replace(/^/gm, "    ")
    .replace(/^\s{4}\[/, "  [")
    .trimEnd();
}

function findLine(codeLines, pred) {
  for (let i = 0; i < codeLines.length; i++) {
    if (pred(codeLines[i], i)) return i + 1;
  }
  return null;
}

function buildFunctionIndex(codeLines) {
  const defs = new Map();
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i];
    let m = line.match(
      /^(?:public\s+|private\s+|protected\s+|static\s+)*(?:void|int|double|char|String|boolean|long|float)\s+(\w+)\s*\(/,
    );
    if (m && m[1] !== "main") {
      defs.set(m[1], i + 1);
      continue;
    }
    m = line.match(/^(?:double|int|void|char|unsigned|struct\s+[\w*]+)\s+(\w+)\s*\(/);
    if (m && m[1] !== "main") {
      defs.set(m[1], i + 1);
      continue;
    }
    m = line.match(/^def\s+(\w+)\s*\(/);
    if (m) defs.set(m[1], i + 1);
    m = line.match(/^(?:struct\s+[\w*]+\s*)+(\w+)\s*\(/);
    if (m && m[1] !== "main") defs.set(m[1], i + 1);
  }
  return defs;
}

function buildVarDeclIndex(codeLines) {
  const decls = new Map();
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i];
    const multiDecl = line.match(/^\s*(?:int|double|char|unsigned|long)\s+(.+);/);
    if (multiDecl) {
      for (const part of multiDecl[1].split(",")) {
        const nm = part.trim().match(/^(\w+)/);
        if (
          nm &&
          !["if", "for", "while", "return", "void"].includes(nm[1]) &&
          !decls.has(nm[1])
        ) {
          decls.set(nm[1], i + 1);
        }
      }
    }
    const typeDecl =
      /\b(?:int|double|char|unsigned|long|String|boolean|struct\s+[\w*]+|WashingMachine|Square|Parent|BO|F|A|B|Tri)\s+(\w+)\b/g;
    for (const m of line.matchAll(typeDecl)) {
      const name = m[1];
      if (/^\s+int\s+(x|y)\s*;/.test(line) || /^\s+const char/.test(line)) continue;
      if (!["if", "for", "while", "return", "void"].includes(name) && !decls.has(name)) {
        decls.set(name, i + 1);
      }
    }
    for (const m of line.matchAll(/\b([a-zA-Z_][\w]*)\s*=/g)) {
      const name = m[1];
      const isShortDecl =
        name.length === 1 && /^(i|x|y|z|p|n|q|a|b|c|s|m|f|t|h)$/.test(name);
      if ((name.length > 1 || isShortDecl) && !decls.has(name)) decls.set(name, i + 1);
    }
    const defM = line.match(/^def\s+(\w+)\s*\(/);
    if (defM) decls.set(defM[1], i + 1);
    const mainVar = line.match(/^\s*(int|double)\s+(main)\s*\(/);
    if (mainVar) decls.set("main", i + 1);
  }
  return decls;
}

function findMainLine(codeLines) {
  return findLine(codeLines, (l) => /\bmain\s*\(/.test(l)) ?? 1;
}

function findCallSites(codeLines, funcName) {
  const sites = [];
  const re = new RegExp(`\\b${funcName}\\s*\\(`, "g");
  for (let i = 0; i < codeLines.length; i++) {
    if (re.test(codeLines[i])) sites.push(i + 1);
  }
  return sites;
}

function extractCallNames(text) {
  const names = [];
  for (const m of text.matchAll(/\b([A-Za-z_]\w*)\s*\(/g)) {
    if (!SKIP_CALL.has(m[1])) names.push(m[1]);
  }
  return [...new Set(names)];
}

function isOutputLine(lineText) {
  return /(?:print\s*\(|printf\s*\(|println\s*\(|putchar\s*\(|System\.out\.(?:print|println)\s*\()/.test(
    lineText.trim(),
  );
}

function splitCallArgs(s) {
  const parts = [];
  let cur = "";
  let depth = 0;
  let inStr = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      cur += c;
      if (c === inStr && s[i - 1] !== "\\") inStr = null;
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = c;
      cur += c;
      continue;
    }
    if (c === "(") depth++;
    else if (c === ")") depth--;
    if (c === "," && depth === 0) {
      parts.push(cur);
      cur = "";
      continue;
    }
    cur += c;
  }
  if (cur) parts.push(cur);
  return parts;
}

function extractPrintArgVars(lineText) {
  const vars = new Set();
  const TYPE_WORDS = new Set([
    "int",
    "long",
    "void",
    "boolean",
    "char",
    "byte",
    "short",
    "double",
    "float",
    "new",
  ]);
  const trimmed = lineText.trim();
  let inner = null;
  const patterns = [
    /print\s*\((.+)\)\s*;?\s*$/,
    /printf\s*\((.+)\)\s*;?\s*$/,
    /println\s*\((.+)\)\s*;?\s*$/,
    /putchar\s*\((.+)\)\s*;?\s*$/,
    /System\.out\.(?:print|println)\s*\((.+)\)\s*;?\s*$/,
  ];
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m) {
      inner = m[1];
      break;
    }
  }
  if (!inner) return vars;

  for (const m of inner.matchAll(/\brun\s*\(\s*([A-Za-z_]\w*)\s*\)/g)) {
    if (!SKIP_CALL.has(m[1]) && !TYPE_WORDS.has(m[1])) vars.add(m[1]);
  }

  const parts = splitCallArgs(inner);
  let startIdx = /^["']/.test(parts[0]?.trim()) ? 1 : 0;
  for (let i = startIdx; i < parts.length; i++) {
    let part = parts[i].trim();
    if (!part || /^["']/.test(part)) continue;
    part = part.replace(/\(\s*(?:int|long|char|byte|short|float|double|boolean)\s+\w+\s*\)\s*->[\s\S]*/g, "");
    const simple = part.match(/^([A-Za-z_]\w*)$/);
    if (simple && !SKIP_CALL.has(simple[1]) && !TYPE_WORDS.has(simple[1])) {
      vars.add(simple[1]);
      continue;
    }
    for (const vm of part.matchAll(/\b([A-Za-z_]\w*)\b/g)) {
      const name = vm[1];
      if (SKIP_CALL.has(name) || TYPE_WORDS.has(name)) continue;
      const before = part.slice(0, vm.index ?? 0);
      if (/\(\s*(?:int|long|char|byte|short|float|double|boolean)\s*$/.test(before)) continue;
      const after = part.slice((vm.index ?? 0) + name.length);
      if (/^\s*\(/.test(after)) continue;
      vars.add(name);
    }
  }
  return vars;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findVarDeclLine(codeLines, varIndex, name) {
  const nameRe = escapeRegExp(name);
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i];
    const multi = line.match(/^\s*(?:int|double|char|unsigned|long)\s+(.+);/);
    if (multi && new RegExp(`\\b${nameRe}\\b`).test(multi[1])) return i + 1;
    if (
      new RegExp(`\\b(?:int|double|char|unsigned|String|boolean|long|float|F|A|B)\\s+[^;]*\\b${nameRe}\\b`).test(
        line,
      )
    ) {
      const isParam = new RegExp(`\\([^)]*\\b${nameRe}\\b[^)]*\\)`).test(line);
      if (!isParam) return i + 1;
    }
  }
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i];
    if (new RegExp(`\\b${nameRe}\\s*=`).test(line)) return i + 1;
  }
  return varIndex.get(name) ?? null;
}

function extractVarRefs(step, text) {
  const refs = new Set();

  for (const v of step.variables) {
    const base = v.name.split(/[.[\]]/)[0];
    if (base && base !== "호출" && base !== "부모" && base !== "자식" && base !== "연결") {
      refs.add(base);
    }
  }

  const multiChar = [
    "arr",
    "len",
    "ptr",
    "pptr",
    "head",
    "curr",
    "root",
    "li",
    "data",
    "lst",
    "result",
    "sum",
    "dst",
    "nodes",
    "wm",
    "ref",
    "sq",
    "x1",
    "x2",
    "x3",
  ];
  for (const v of multiChar) {
    if (new RegExp(`\\b${v}\\b`).test(text)) refs.add(v);
  }

  for (const m of text.matchAll(/\b(t[123])\b/g)) refs.add(m[1]);
  for (const m of text.matchAll(/&(\w+)\b/g)) refs.add(m[1]);

  if (/\bx\b/.test(text) && /\bx\s*=|x>|x\)|x,/.test(text)) refs.add("x");
  if (/\by\b/.test(text) && /\by\s*=|y%|y,/.test(text)) refs.add("y");
  if (/\bz\b/.test(text) && /\bz\s*=|z&|z>|z,|z\)/.test(text)) refs.add("z");

  if (/->c|n->c/.test(text)) refs.delete("c");
  if (/struct node\s+\w/.test(text) && !step.variables.some((v) => v.name === "c")) refs.delete("c");

  return [...refs];
}

function addDef(related, line, name, activeLine) {
  if (line && line !== activeLine) {
    related.push({ line, role: "definition", label: `${name} 정의`, _score: 9 });
  }
}

function addCallSite(related, line, label, activeLine) {
  if (line && line !== activeLine) {
    related.push({ line, role: "call", label, _score: 10 });
  }
}

function addRead(related, line, label, activeLine, score = 6) {
  if (line && line !== activeLine) {
    related.push({ line, role: "read", label, _score: score });
  }
}

function prioritizeRelated(items, activeLine, max = 5) {
  const seen = new Set();
  const out = [];
  for (const item of [...items].sort((a, b) => (b._score ?? 0) - (a._score ?? 0))) {
    if (item.line === activeLine) continue;
    const key = `${item.line}:${item.role}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const { _score, ...rest } = item;
    out.push(rest);
    if (out.length >= max) break;
  }
  return out.sort((a, b) => a.line - b.line);
}

function inferRelatedLines(step, codeLines, funcIndex, varIndex, mainLine) {
  const lineText = codeLines[step.line - 1] ?? "";
  const text = `${lineText} ${step.comment}`;
  const related = [];

  const fnEnter =
    /(?:호출|함수).*(?:진입|전달)|함수로 진입|함수에 진입|메서드.*진입|생성자 진입/.test(step.comment) &&
    !/루프에 진입|반복문에 진입|for 루프|while.*진입|enumerate.*진입/.test(step.comment);
  const returning =
    /복귀|반환.*main|main.*복귀|호출부로|리턴|return/.test(step.comment) &&
    /calc|arr1|arr2|tree|f\b|func/.test(step.comment);

  if (fnEnter) {
    const fnMatch =
      step.comment.match(/\b([A-Za-z_]\w*)\s*\(/) ??
      step.comment.match(/\b(func|arr1|arr2|tree|calc|change|run|deq|enq|Square|Rectangle|WashingMachine)\b/);
    if (fnMatch) {
      const fn = fnMatch[1];
      const sites = findCallSites(codeLines, fn);
      const defLine = funcIndex.get(fn);
      const site = sites.filter((l) => l !== defLine).find((l) => l > mainLine) ?? sites.find((l) => l !== defLine) ?? sites[0];
      if (site) addCallSite(related, site, `${fn} 호출 위치`, step.line);
      if (defLine && defLine !== step.line) addDef(related, defLine, fn, step.line);
    }
  }

  if (returning) {
    for (const fn of ["arr1", "arr2", "tree", "calc", "f", "func"]) {
      if (new RegExp(`\\b${fn}\\b`).test(step.comment)) {
        const sites = findCallSites(codeLines, fn);
        const site = sites.find((l) => l > mainLine) ?? sites[sites.length - 1];
        if (site) addCallSite(related, site, `${fn} 호출 위치`, step.line);
        if (funcIndex.get(fn)) addDef(related, funcIndex.get(fn), fn, step.line);
      }
    }
  }

  for (const fn of extractCallNames(text)) {
    const defLine = funcIndex.get(fn);
    if (defLine) addDef(related, defLine, fn, step.line);
    if (lineText.includes(`${fn}(`)) {
      for (const site of findCallSites(codeLines, fn)) {
        if (site !== defLine && site !== step.line) {
          addCallSite(related, site, `${fn} 호출`, step.line);
        }
      }
    }
  }

  const printCalcLine = findLine(codeLines, (l) => /print\s*\(\s*calc/.test(l));
  if (/print\(calc|calc\(root/.test(text)) {
    addDef(related, funcIndex.get("calc"), "calc", step.line);
    addRead(related, varIndex.get("root"), "root 선언", step.line, 7);
    addRead(related, varIndex.get("li"), "li 선언", step.line, 6);
    if (step.line !== printCalcLine && (fnEnter || returning)) {
      if (printCalcLine) addCallSite(related, printCalcLine, "print(calc) 호출", step.line);
    }
  }

  if (/calc\(/.test(step.comment) && step.line === funcIndex.get("calc") && fnEnter) {
    addDef(related, funcIndex.get("calc"), "calc", step.line);
    if (printCalcLine) addCallSite(related, printCalcLine, "print(calc) 호출", step.line);
  }

  if (/tree\(|root = tree/.test(text)) {
    addDef(related, funcIndex.get("tree"), "tree", step.line);
    addRead(related, varIndex.get("li"), "li 선언", step.line, 7);
  }

  if (/\.children\.append|for i in range\(1/.test(text)) {
    addDef(related, funcIndex.get("tree"), "tree", step.line);
    addRead(related, findLine(codeLines, (l) => /for i in range\(1/.test(l)), "트리 연결 루프", step.line, 8);
    addRead(related, findLine(codeLines, (l) => /nodes = \[Node/.test(l)), "노드 생성", step.line, 7);
  }

  const printFLine = findLine(codeLines, (l) => /print\s*\(\s*f\s*\(/.test(l));
  if (/print\(f\(|f\(\[1/.test(text)) {
    addDef(related, funcIndex.get("f"), "f", step.line);
    if (step.line !== printFLine && (fnEnter || returning)) {
      if (printFLine) addCallSite(related, printFLine, "print(f(...)) 호출", step.line);
    }
  }

  if (/함수 f|def f/.test(step.comment) && step.line === funcIndex.get("f") && fnEnter) {
    if (printFLine) addCallSite(related, printFLine, "호출 위치", step.line);
  }

  if (/enumerate|for index, lis/.test(text)) {
    addRead(related, varIndex.get("data"), "data 선언", step.line, 8);
    addRead(related, varIndex.get("result"), "result 선언", step.line, 7);
  }

  if (/for c in lst|lst\[::-2\]/.test(text)) {
    addRead(related, varIndex.get("lst"), "lst 선언", step.line, 8);
  }

  if (/for word in|i\.split/.test(text)) {
    addRead(related, varIndex.get("i"), "i 선언", step.line, 8);
    addRead(related, varIndex.get("x"), "x 선언", step.line, 6);
  }

  if (/''\.join|y\[::-1\]/.test(text)) {
    addRead(related, varIndex.get("x"), "x 선언", step.line, 6);
    addRead(related, varIndex.get("y"), "y 선언", step.line, 7);
  }

  if (/for i in range\(len\(b\)|b\[i\+1\]|b = m\[:\]/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /for i in range/.test(l)), "반복문", step.line, 8);
    addRead(related, findLine(codeLines, (l) => /m\s*=\s*\[\[x\]/.test(l)), "m 선언", step.line, 7);
    addRead(related, findLine(codeLines, (l) => /b\s*=\s*m\[:\]/.test(l)), "b 선언", step.line, 7);
  }

  if (/arr1|arr2/.test(text)) {
    for (const fn of ["arr1", "arr2"]) {
      if (text.includes(fn)) addDef(related, funcIndex.get(fn), fn, step.line);
    }
    addRead(related, varIndex.get("arr"), "arr 선언", step.line, 8);
    addRead(related, varIndex.get("len"), "len 선언", step.line, 7);
  }

  if (/curr->|curr\s*=|&t[123]|t[123]\.next/.test(text)) {
    for (const v of ["t1", "t2", "t3", "curr"]) {
      const ln = varIndex.get(v) ?? findLine(codeLines, (l) => new RegExp(`\\bstruct Node ${v}\\b|${v}\\.`).test(l));
      if (ln) addRead(related, ln, `${v}`, step.line, v === "curr" ? 8 : 6);
    }
    if (/while\s*\(curr\)/.test(lineText)) {
      addRead(related, findLine(codeLines, (l) => /struct Node\* curr/.test(l)), "curr 선언", step.line, 8);
    }
  }

  if (/\*pptr|pptr|ptr\[|\(\*pptr\)/.test(text)) {
    for (const v of ["ptr", "pptr", "a"]) {
      const ln = varIndex.get(v);
      if (ln) addRead(related, ln, `${v} 선언`, step.line, 7);
    }
  }

  if (/p\[|p\+|\*\(p/.test(text)) {
    addRead(related, varIndex.get("arr"), "arr 선언", step.line, 8);
    if (funcIndex.get("arr1") && step.line > funcIndex.get("arr1")) {
      addDef(related, funcIndex.get("arr1"), "arr1", step.line);
    }
    if (funcIndex.get("arr2") && step.line > funcIndex.get("arr2")) {
      addDef(related, funcIndex.get("arr2"), "arr2", step.line);
    }
  }

  if (/func\(|n->c|n->p|malloc|h = n|return h/.test(text) && !/putchar/.test(text)) {
    addDef(related, funcIndex.get("func"), "func", step.line);
    if (fnEnter || /func\(/.test(step.comment)) {
      addCallSite(related, findLine(codeLines, (l) => /func\s*\(/.test(l) && !/^struct/.test(l.trim())), "func 호출", step.line);
    }
    if (/n->c/.test(text)) addRead(related, findLine(codeLines, (l) => /n->c\s*=/.test(l)), "n->c 대입", step.line, 8);
    if (/n->p|h = n/.test(text)) {
      addRead(related, findLine(codeLines, (l) => /n->p\s*=/.test(l)), "n->p 연결", step.line, 7);
    }
  }

  if (/putchar|while\s*\(n\)/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /while\s*\(n\)/.test(l)), "출력 while 루프", step.line, 9);
    addRead(related, findLine(codeLines, (l) => /func\s*\(/.test(l) && !/struct/.test(l.trim())), "func 호출", step.line, 7);
    addDef(related, funcIndex.get("func"), "func", step.line);
  }

  if (/implements|Machine 인터페이스|wm\.run/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /interface Machine/.test(l)), "Machine 인터페이스", step.line, 9);
    addRead(related, findLine(codeLines, (l) => /implements|____/.test(l)), "implements 위치", step.line, 9);
    addDef(related, findLine(codeLines, (l) => /public void run/.test(l)), "run()", step.line);
  }

  if (/WashingMachine\(\)|new WashingMachine/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /class WashingMachine/.test(l)), "WashingMachine 클래스", step.line, 8);
    addDef(related, findLine(codeLines, (l) => /public WashingMachine\(\)/.test(l)), "생성자", step.line);
  }

  if (/super\s*\(|Rectangle\(/.test(text)) {
    addDef(related, findLine(codeLines, (l) => /Rectangle\s*\(/.test(l)), "Rectangle", step.line);
    if (/super/.test(text)) {
      addCallSite(related, findLine(codeLines, (l) => /super\s*\(/.test(l)), "super() 호출", step.line);
    }
  }

  if (/Square\(|getSquareArea/.test(text)) {
    addDef(related, findLine(codeLines, (l) => /Square\s*\(int/.test(l)), "Square", step.line);
    addRead(related, varIndex.get("sq"), "sq 선언", step.line, 7);
    if (/getSquareArea/.test(text)) {
      addDef(related, findLine(codeLines, (l) => /getSquareArea/.test(l)), "getSquareArea()", step.line);
    }
  }

  if (/ref\.|Parent ref|new Child/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /Parent ref/.test(l)), "ref 선언", step.line, 8);
    addDef(related, findLine(codeLines, (l) => /class Child/.test(l)), "Child", step.line);
    if (/ref\.x\(/.test(text)) addDef(related, findLine(codeLines, (l) => /public int x\(int/.test(l)), "Child.x()", step.line);
    if (/ref\.id\(/.test(text)) addDef(related, findLine(codeLines, (l) => /static String id/.test(l)), "Parent.id()", step.line);
  }

  if (/change\s*\(|매개변수/.test(text) && /data|s\s*=/.test(text)) {
    addDef(related, findLine(codeLines, (l) => /void change|change\s*\(/.test(l)), "change", step.line);
    addRead(related, findLine(codeLines, (l) => /String data\s*\[\]/.test(l)), "data 선언", step.line, 8);
  }

  if (/wm\.run|\.run\(\)/.test(text)) {
    addDef(related, findLine(codeLines, (l) => /public void run/.test(l)), "run()", step.line);
  }

  if (/apply\(3\)|lambda|catch/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /F f\s*=/.test(l)), "f 선언", step.line, 7);
    if (/catch/.test(text)) addDef(related, findLine(codeLines, (l) => /catch/.test(l)), "catch", step.line);
  }

  if (/g\(\)|\.g\(\)|f\("a"\)/.test(text)) {
    addDef(related, findLine(codeLines, (l) => /String g\(\)/.test(l)), "g()", step.line);
    addRead(related, findLine(codeLines, (l) => /A a\s*=/.test(l)), "a 선언", step.line, 7);
  }

  if (/BO\[|arr\[0\]|object-array/.test(text) || /arr\[/.test(text) && /BO/.test(codeLines.join("\n"))) {
    addRead(related, findLine(codeLines, (l) => /BO\[\]\s*arr/.test(l)), "arr 선언", step.line, 8);
  }

  if (/Tri\.|enum|values\(\)/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /Tri t\s*=/.test(l)), "t 선언", step.line, 7);
    if (/values\(\)/.test(text)) addDef(related, findLine(codeLines, (l) => /\.values\(\)/.test(l)), "values()", step.line);
  }

  if (/enq\s*\(|deq\s*\(|circular|queue/.test(text)) {
    addDef(related, findLine(codeLines, (l) => /\b(enq|deq)\s*\(/.test(l)), "큐 함수", step.line);
    addRead(related, findLine(codeLines, (l) => /struct queue|Queue/.test(l)), "큐 선언", step.line, 7);
  }

  if (/p->g|p->i|struct Test \*p|test\[\]/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /struct Test test\[\]/.test(l)), "test[] 선언", step.line, 9);
    addRead(related, findLine(codeLines, (l) => /struct Test \*p\s*=/.test(l)), "p 선언", step.line, 9);
    addRead(related, findLine(codeLines, (l) => /struct Test \{/.test(l)), "Test 구조체", step.line, 6);
  }

  if (/\(\*pptr\)|pptr|ptr\s*=/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /struct dat a\[\]/.test(l)), "a[] 선언", step.line, 9);
    addRead(related, findLine(codeLines, (l) => /struct dat\* ptr/.test(l)), "ptr 선언", step.line, 8);
    addRead(related, findLine(codeLines, (l) => /struct dat\*\* pptr/.test(l)), "pptr 선언", step.line, 8);
  }

  if (/Tri\.values|Tri\.A|\.name\(\)|\.code\(\)|enum Tri/.test(text)) {
    addRead(related, findLine(codeLines, (l) => /^enum Tri/.test(l)), "enum Tri", step.line, 9);
    addDef(related, findLine(codeLines, (l) => /public String code\(\)/.test(l)), "code()", step.line);
    addRead(related, findLine(codeLines, (l) => /Tri t\s*=/.test(l)), "t 선언", step.line, 8);
    if (/t\.code\(\)|\.code\(\)/.test(text) && step.line !== findLine(codeLines, (l) => /public String code\(\)/.test(l))) {
      addCallSite(related, findLine(codeLines, (l) => /t\.code\(\)|\.code\(\)/.test(l)), "t.code() 호출", step.line);
    }
  }

  if (/x1 \+ x2|println|\"1123\"|덧셈|연결|11 \+|112/.test(text)) {
    for (const v of ["x1", "x2", "x3"]) {
      if ((text.includes(v) || (v === "x2" && /11 \+|x2/.test(text)) || (v === "x3" && /112|x3/.test(text))) && varIndex.get(v)) {
        addRead(related, varIndex.get(v), `${v} 선언`, step.line, 8);
      }
    }
  }

  if (/a\.n|b\.n|c\.n|head/.test(text)) {
    for (const v of ["a", "b", "c", "head"]) {
      const ln = varIndex.get(v);
      if (ln && new RegExp(`\\b${v}\\b`).test(text)) addRead(related, ln, `${v} 선언`, step.line, 6);
    }
  }

  if (/dst|lst\[0\]|s\.add|set\(/.test(text)) {
    addRead(related, varIndex.get("lst"), "lst 선언", step.line, 7);
    addRead(related, varIndex.get("dst"), "dst 선언", step.line, 7);
    addRead(related, varIndex.get("s"), "s 선언", step.line, 6);
  }

  if (/x1|x2|x3/.test(text)) {
    for (const v of ["x1", "x2", "x3"]) {
      if (text.includes(v) && varIndex.get(v)) {
        addRead(related, varIndex.get(v), `${v} 선언`, step.line, text.includes(`${v} =`) ? 9 : 7);
      }
    }
  }

  for (const v of extractVarRefs(step, text)) {
    const decl = findVarDeclLine(codeLines, varIndex, v);
    if (decl) {
      const score = step.variables.some((sv) => sv.name.startsWith(v) && sv.highlight) ? 8 : 5;
      addRead(related, decl, `${v} 선언`, step.line, score);
    }
  }

  const activeIsOutput = isOutputLine(lineText);

  for (let i = related.length - 1; i >= 0; i--) {
    const rText = (codeLines[related[i].line - 1] ?? "").trim();
    if (isOutputLine(rText)) {
      const keepCallOnEnter = related[i].role === "call" && fnEnter;
      if (!keepCallOnEnter) related.splice(i, 1);
    }
  }

  if (activeIsOutput) {
    const outputVars = new Set();
    for (const v of extractPrintArgVars(lineText)) outputVars.add(v);
    for (const v of step.variables) {
      const base = v.name.split(/[.[\]]/)[0];
      if (
        base &&
        !["호출", "부모", "자식", "연결", "결과", "합계"].includes(base) &&
        new RegExp(`\\b${escapeRegExp(base)}\\b`).test(lineText)
      ) {
        outputVars.add(base);
      }
      const argMatch = v.name.match(/\(([^)]+)\)/);
      if (argMatch) {
        for (const part of argMatch[1].split(",")) {
          const nm = part.trim().split("=")[0].trim();
          if (nm && !SKIP_CALL.has(nm)) outputVars.add(nm);
        }
      }
    }
    for (const dm of lineText.matchAll(/\.(\w+)\s*\(/g)) {
      outputVars.delete(dm[1]);
    }
    for (const v of [...outputVars]) {
      if (funcIndex.has(v)) outputVars.delete(v);
    }
    for (const v of outputVars) {
      if (SKIP_CALL.has(v)) continue;
      const decl = findVarDeclLine(codeLines, varIndex, v);
      if (decl) {
        addRead(related, decl, `${v} 선언`, step.line, 15);
      } else {
        const forLine = findLine(codeLines, (l) =>
          new RegExp(`for\\s+${escapeRegExp(v)}\\s+in`).test(l),
        );
        if (forLine) addRead(related, forLine, `${v} (for 루프)`, step.line, 14);
      }
    }
    for (const v of outputVars) {
      const forLine = findLine(codeLines, (l) =>
        new RegExp(`for\\s+${escapeRegExp(v)}\\s+in\\s+(\\w+)`).test(l),
      );
      if (!forLine) continue;
      const fm = codeLines[forLine - 1].match(
        new RegExp(`for\\s+${escapeRegExp(v)}\\s+in\\s+(\\w+)`),
      );
      if (fm) {
        const srcDecl = findVarDeclLine(codeLines, varIndex, fm[1]);
        if (srcDecl) addRead(related, srcDecl, `${fm[1]} 선언`, step.line, 13);
      }
    }

    if (outputVars.size > 0) {
      const keepNames = new Set(outputVars);
      for (const v of outputVars) {
        const forLine = findLine(codeLines, (l) =>
          new RegExp(`for\\s+${escapeRegExp(v)}\\s+in\\s+(\\w+)`).test(l),
        );
        if (forLine) {
          const fm = codeLines[forLine - 1].match(
            new RegExp(`for\\s+${escapeRegExp(v)}\\s+in\\s+(\\w+)`),
          );
          if (fm) keepNames.add(fm[1]);
        }
      }
      for (let i = related.length - 1; i >= 0; i--) {
        if (related[i].role !== "read") continue;
        const label = related[i].label ?? "";
        const varName = label.replace(/\s*선언$/, "").replace(/\s*\(for 루프\)$/, "");
        if (label.includes("(for 루프)") && outputVars.has(varName)) continue;
        if (keepNames.has(varName)) continue;
        related.splice(i, 1);
      }
    }

    const keepDefNames = new Set();
    if (/\bprint\s*\(\s*f\s*\(/.test(lineText)) keepDefNames.add("f");
    if (/\bprint\s*\(\s*calc\s*\(/.test(lineText)) keepDefNames.add("calc");

    for (let i = related.length - 1; i >= 0; i--) {
      const item = related[i];
      if (item.role === "read") continue;
      if (item.role === "definition") {
        const defName = item.label?.replace(/\s*정의$/, "");
        if (defName && keepDefNames.has(defName)) continue;
      }
      related.splice(i, 1);
    }
  }

  return prioritizeRelated(related, step.line, activeIsOutput ? 6 : 5);
}

function formatArrayValue(value) {
  if (!Array.isArray(value)) return String(value);
  return `[${value.join(", ")}]`;
}

function buildGenericMemory(step, slug) {
  const cells = [];
  const arrows = [];
  const SKIP = new Set(["호출", "부모", "자식", "연결", "매개변수"]);

  for (const v of step.variables) {
    if (SKIP.has(v.name)) continue;
    const hl = !!v.highlight;
    const idSafe = v.name.replace(/[^a-zA-Z0-9_]/g, "_");

    if (v.type === "list" || (Array.isArray(v.value) && !v.name.includes("."))) {
      cells.push({
        id: `data_${idSafe}`,
        region: "data",
        label: v.name,
        value: formatArrayValue(v.value),
        highlight: hl,
      });
      continue;
    }

    if (
      v.type === "dict" ||
      v.type === "set" ||
      (typeof v.value === "string" && (/^\{/.test(v.value) || /^\{/.test(String(v.value))))
    ) {
      cells.push({
        id: `data_${idSafe}`,
        region: "data",
        label: v.name,
        value: String(v.value),
        highlight: hl,
      });
      continue;
    }

    if (v.type === "str" && typeof v.value === "string" && !v.name.includes("반환")) {
      cells.push({
        id: `data_${idSafe}`,
        region: "data",
        label: v.name,
        value: `"${v.value}"`,
        highlight: hl,
      });
      continue;
    }

    if (v.type === "BO[]" || v.type.includes("[]") && !["int[]", "char[]", "double[]"].includes(v.type)) {
      cells.push({
        id: `heap_${idSafe}`,
        region: "heap",
        label: v.name,
        value: formatArrayValue(v.value),
        highlight: hl,
      });
      continue;
    }

    if (
      ["BO", "Square", "WashingMachine", "Parent", "Child", "Tri", "F"].includes(v.type) ||
      /^(sq|wm|ref|t|a|b|c)$/.test(v.name) && typeof v.value === "string" && v.value.includes("=")
    ) {
      cells.push({
        id: `heap_${idSafe}`,
        region: "heap",
        label: v.name,
        value: String(v.value),
        highlight: hl,
      });
      continue;
    }

    if (v.name.includes(".children") || v.name.startsWith("nodes")) {
      cells.push({
        id: `heap_${idSafe}`,
        region: "heap",
        label: v.name,
        value: formatArrayValue(v.value),
        highlight: hl,
      });
      continue;
    }

    if (
      typeof v.value === "number" ||
      v.type === "boolean" ||
      ["int", "double", "float", "String", "unsigned int", "long"].includes(v.type)
    ) {
      if (!v.name.includes(".") && !v.name.includes("[") && !v.name.includes("반환")) {
        cells.push({
          id: `stack_${idSafe}`,
          region: "stack",
          label: v.name,
          value: String(v.value),
          highlight: hl,
        });
      }
    }
  }

  const hasM = step.variables.some((v) => v.name === "m");
  const hasB = step.variables.some((v) => v.name === "b");
  if (hasM && hasB && (slug.includes("nested-list") || step.comment.includes("얕은"))) {
    arrows.push({
      from: "data_b",
      to: "data_m",
      label: "얕은 복사 (내부 리스트 공유)",
      highlight: step.variables.some((v) => v.name === "b" && v.highlight),
    });
  }

  const hasLst = step.variables.some((v) => v.name === "lst");
  const hasDst = step.variables.some((v) => v.name === "dst");
  if (hasLst && hasDst && step.variables.some((v) => v.name === "dst" && v.highlight)) {
    arrows.push({
      from: "data_dst",
      to: "data_lst",
      label: "슬라이스 복사",
      highlight: true,
    });
  }

  return { cells, arrows };
}

function buildMemorySnapshot(step, slug, codeLines) {
  const cells = [];
  const arrows = [];
  const cellIds = new Set();

  function addCell(cell) {
    if (cellIds.has(cell.id)) {
      const idx = cells.findIndex((c) => c.id === cell.id);
      if (idx >= 0 && cell.highlight) cells[idx] = { ...cells[idx], highlight: true };
      return;
    }
    cellIds.add(cell.id);
    cells.push(cell);
  }

  function addArrow(arrow) {
    arrows.push(arrow);
  }

  const arrVar = step.variables.find((v) => v.name === "arr" || v.type.includes("[]"));
  const arrValues = Array.isArray(arrVar?.value)
    ? arrVar.value
    : [80, 20, 50, 55, 45, 95, 55, 10, 40, 80];

  const inArrFunc = step.line >= 3 && step.line <= 18;
  const mentionsPointer = /p\[|\*\(p|ptr|pptr|curr|->|&t|arr\[|malloc|next/.test(
    `${step.comment} ${codeLines[step.line - 1] ?? ""}`,
  );

  if (slug === "array-average-2026-1" && (inArrFunc || arrVar || mentionsPointer)) {
    const pIndex = step.variables.find((v) => v.name === "i")?.value ?? 0;
    const pVal = step.variables.find((v) => v.name === "p[i]")?.value;
    const arrDisplay =
      typeof pIndex === "number" && pVal !== undefined
        ? arrValues
            .map((n, idx) => (idx === pIndex ? `[${n}]` : String(n)))
            .join(", ")
        : arrValues.join(", ");

    addCell({
      id: "data_arr",
      region: "data",
      label: "arr / p →",
      value: `[${arrDisplay}]`,
      highlight: step.variables.some((v) => v.name === "p[i]" && v.highlight),
    });

    if (inArrFunc) {
      addCell({
        id: "stack_p",
        region: "stack",
        label: "p (매개변수)",
        value: "→ arr[0]",
        address: "0x100",
        highlight: /p\[|\*\(p/.test(step.comment),
      });
      addArrow({
        from: "stack_p",
        to: "data_arr",
        label: "p → 배열",
        highlight: /p\[|\*\(p/.test(step.comment),
      });
    } else if (arrVar) {
      addCell({
        id: "stack_arr",
        region: "stack",
        label: "arr",
        value: "→ 배열",
        address: "0x100",
        highlight: !!arrVar.highlight,
      });
      addArrow({ from: "stack_arr", to: "data_arr", label: "주소", highlight: !!arrVar.highlight });
    }

    for (const v of step.variables) {
      if (["av", "i", "len"].includes(v.name)) {
        addCell({
          id: `stack_${v.name}`,
          region: "stack",
          label: v.name,
          value: String(v.value),
          highlight: !!v.highlight,
        });
      }
    }
  }

  for (const v of step.variables) {
    const hl = !!v.highlight;
    const name = v.name.split(/[.\[]/)[0];

    if (v.type.includes("[]") || name === "arr" || (Array.isArray(v.value) && v.type === "int[]")) {
      const dataId = `data_${name}`;
      addCell({
        id: dataId,
        region: "data",
        label: name,
        value: formatArrayValue(v.value),
        highlight: hl,
      });
      const stackId = `stack_${name}`;
      addCell({
        id: stackId,
        region: "stack",
        label: name,
        value: "→ 배열",
        address: "0x100",
        highlight: hl,
      });
      addArrow({ from: stackId, to: dataId, label: "주소", highlight: hl });
    }

    if (v.type.includes("*") || v.value === "NULL" || String(v.value).startsWith("&")) {
      const stackId = `ptr_${v.name.replace(/[^a-zA-Z0-9_]/g, "_")}`;
      addCell({
        id: stackId,
        region: "stack",
        label: v.name,
        value: String(v.value),
        address: "0x200",
        highlight: hl,
      });
      const target = String(v.value).replace(/^&/, "");
      if (target && target !== "NULL") {
        const targetId = `node_${target}`;
        if (!cellIds.has(targetId)) {
          addCell({
            id: targetId,
            region: "stack",
            label: target,
            value: "(노드)",
            highlight: false,
          });
        }
        addArrow({ from: stackId, to: targetId, label: "가리킴", highlight: hl });
      }
    }

    if (/^t[123]$/.test(name) || /^t[123]\./.test(v.name)) {
      const nodeName = name.match(/^t[123]/)?.[0] ?? name;
      const nodeId = `node_${nodeName}`;
      const xVar = step.variables.find((x) => x.name === `${nodeName}.x`);
      const nextVar = step.variables.find((x) => x.name === `${nodeName}.next`);
      const xVal = xVar ? String(xVar.value) : "?";
      const nextVal = nextVar ? String(nextVar.value) : "NULL";
      addCell({
        id: nodeId,
        region: "stack",
        label: nodeName,
        value: `x = ${xVal}\nnext = ${nextVal}`,
        address: `0x${(300 + Number(nodeName[1]) * 16).toString(16)}`,
        highlight: hl || !!xVar?.highlight || !!nextVar?.highlight,
      });
    }

    if (v.name === "curr" || v.name.startsWith("curr")) {
      addCell({
        id: "ptr_curr",
        region: "stack",
        label: "curr",
        value: String(v.value),
        address: "0x240",
        highlight: hl,
      });
      const target = String(v.value).replace(/^&/, "");
      if (target.startsWith("t")) {
        addArrow({ from: "ptr_curr", to: `node_${target}`, label: "가리킴", highlight: hl });
      }
    }

    if (name === "ptr" || name === "pptr") {
      const id = `stack_${name}`;
      addCell({
        id,
        region: "stack",
        label: name,
        value: String(v.value),
        address: name === "ptr" ? "0x210" : "0x220",
        highlight: hl,
      });
    }

    if (name === "a" && v.type.includes("struct")) {
      addCell({
        id: "data_a",
        region: "data",
        label: "a[]",
        value: String(v.value),
        highlight: hl,
      });
      if (varIndexHasPtr(step, "ptr")) {
        addArrow({ from: "stack_ptr", to: "data_a", label: "ptr → a", highlight: hl });
      }
    }

    if (v.name === "str" || (v.type === "char[]" && typeof v.value === "string")) {
      const dataId = "data_str";
      addCell({
        id: dataId,
        region: "data",
        label: "str[]",
        value: typeof v.value === "string" ? `"${v.value}"` : String(v.value),
        highlight: hl,
      });
      addCell({
        id: "stack_str",
        region: "stack",
        label: "str",
        value: "→ 문자열",
        address: "0x100",
        highlight: hl,
      });
      addArrow({ from: "stack_str", to: dataId, label: "주소", highlight: hl });
    }

    if (name === "p" && v.type.includes("*")) {
      addCell({
        id: "stack_p",
        region: "stack",
        label: "p",
        value: String(v.value),
        address: "0x230",
        highlight: hl,
      });
      if (cells.some((c) => c.id === "data_arr")) {
        addArrow({ from: "stack_p", to: "data_arr", label: "매개변수", highlight: hl });
      }
    }

    if (/^a$/.test(v.name) && v.type === "int" && /str\[a\]/.test(step.comment)) {
      addCell({
        id: "stack_a",
        region: "stack",
        label: "a",
        value: String(v.value),
        address: "0x204",
        highlight: hl,
      });
    }
  }

  if (slug.includes("linked-list") && cells.length > 0) {
    linkListNodes(cells, arrows, step);
  }

  const generic = buildGenericMemory(step, slug);
  for (const cell of generic.cells) addCell(cell);
  for (const arrow of generic.arrows) addArrow(arrow);

  return cells.length > 0 ? { cells, arrows: dedupeArrows(arrows) } : undefined;
}

function varIndexHasPtr(step, name) {
  return step.variables.some((v) => v.name === name);
}

function linkListNodes(cells, arrows, step) {
  const nodeCells = cells.filter((c) => c.id.startsWith("node_t"));
  for (const v of step.variables) {
    const m = v.name.match(/^(t[123])\.next$/);
    if (!m) continue;
    const fromId = `node_${m[1]}`;
    const val = String(v.value);
    if (val.startsWith("&t")) {
      const toId = `node_${val.slice(1)}`;
      arrows.push({
        from: fromId,
        to: toId,
        label: "next",
        highlight: !!v.highlight,
      });
    }
  }
}

function dedupeArrows(arrows) {
  const seen = new Set();
  return arrows.filter((a) => {
    const key = `${a.from}:${a.to}:${a.label ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function enrichFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const codeLines = extractCode(src);
  const steps = extractTraceSteps(src);
  const slug = extractSlug(src);
  if (!codeLines || !steps) return { filePath, changed: false };

  const funcIndex = buildFunctionIndex(codeLines);
  const varIndex = buildVarDeclIndex(codeLines);
  const mainLine = findMainLine(codeLines);

  let relatedCount = 0;
  let memoryCount = 0;

  const enriched = steps.map((step) => {
    const relatedLines = inferRelatedLines(step, codeLines, funcIndex, varIndex, mainLine);
    const memory = buildMemorySnapshot(step, slug, codeLines);

    if (relatedLines.length) relatedCount++;
    if (memory) memoryCount++;

    const next = { ...step };
    if (relatedLines.length) next.relatedLines = relatedLines;
    else delete next.relatedLines;

    if (memory) next.memory = memory;
    else delete next.memory;

    return next;
  });

  const formatted = formatTraceSteps(enriched);
  const newSrc = replaceTraceSteps(src, formatted);
  const changed = newSrc !== src;
  if (changed) fs.writeFileSync(filePath, newSrc);

  return { filePath, changed, relatedCount, memoryCount, slug };
}

let totalRelated = 0;
let totalMemory = 0;

for (const dir of DIRS) {
  for (const file of listProblems(dir)) {
    const r = enrichFile(file);
    const rel = path.relative(ROOT, r.filePath);
    console.log(
      r.changed
        ? `ENRICHED ${rel}: related steps=${r.relatedCount}, memory steps=${r.memoryCount}`
        : `OK       ${rel}`,
    );
    totalRelated += r.relatedCount ?? 0;
    totalMemory += r.memoryCount ?? 0;
  }
}

console.log(`\nTotal steps with relatedLines: ${totalRelated}`);
console.log(`Total steps with memory: ${totalMemory}`);
