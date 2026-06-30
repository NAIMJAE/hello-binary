/**
 * Fixes traceSteps line numbers by matching step comments to code lines.
 * Run: node scripts/fix-trace-lines.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIRS = ["src/problems/c", "src/problems/java", "src/problems/python"];

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

function findLine(codeLines, pred, start = 0) {
  for (let i = start; i < codeLines.length; i++) {
    if (pred(codeLines[i], i)) return i + 1;
  }
  for (let i = 0; i < codeLines.length; i++) {
    if (pred(codeLines[i], i)) return i + 1;
  }
  return null;
}

export function findBestLine(codeLines, comment) {
  const c = comment;

  if (/프로그램이 시작/.test(c)) {
    return findLine(codeLines, (l) => l.trim() && !l.trim().startsWith("#")) ?? 1;
  }
  if (/2차원 리스트 data|data에 4개/.test(c)) {
    return findLine(codeLines, (l) => /^data\s*=/.test(l.trim())) ?? 1;
  }
  if (/빈 딕셔너리|result에 할당/.test(c)) {
    return findLine(codeLines, (l) => /result\s*=\s*\{\}/.test(l));
  }
  if (/enumerate.*진입|for 루프에 진입/.test(c) && /index|lis=/.test(c)) {
    return findLine(codeLines, (l) => /for .+ in enumerate/.test(l));
  }
  if (/for 루프 다음|— for 루프 다음/.test(c)) {
    return findLine(codeLines, (l) => /for .+ in enumerate/.test(l));
  }
  if (/모든 요소를 처리해 for 루프|for 루프를 빠져나/.test(c) && /result/.test(c)) {
    return findLine(codeLines, (l) => /result\[/.test(l));
  }
  if (/list_sum|sum\(lis\)/.test(c)) {
    return findLine(codeLines, (l) => /list_sum\s*=/.test(l));
  }
  if (/list_len|len\(lis\)/.test(c)) {
    return findLine(codeLines, (l) => /list_len\s*=/.test(l));
  }
  if (/result\[\d+\].*저장|result\[\d+\] =/.test(c)) {
    return findLine(codeLines, (l) => /result\[/.test(l));
  }
  if (/print\(result\)/.test(c)) {
    return findLine(codeLines, (l) => /print\(result\)/.test(l));
  }
  if (/range\(10\)|lst = \[0/.test(c)) {
    return findLine(codeLines, (l) => /lst\s*=\s*list/.test(l));
  }
  if (/lst\[::-2\].*for 루프|for 루프에 진입/.test(c) && /슬라이싱/.test(c)) {
    return findLine(codeLines, (l) => /for c in/.test(l));
  }
  if (/다음 요소 c|더 이상 반복할 요소/.test(c)) {
    return findLine(codeLines, (l) => /for c in/.test(l));
  }
  if (/print\(c, end|print\(\d+, end/.test(c)) {
    return findLine(codeLines, (l) => /print\(c,\s*end/.test(l));
  }
  if (/print\(\)/.test(c) && /줄바꿈/.test(c)) {
    return findLine(codeLines, (l) => /^print\(\)\s*$/.test(l.trim()));
  }
  if (/input\(\)/.test(c) && /i에 저장/.test(c)) {
    return findLine(codeLines, (l) => /i\s*=\s*input/.test(l));
  }
  if (/빈 리스트.*x에|x = \[\]/.test(c)) {
    return findLine(codeLines, (l) => /x\s*=\s*\[\]/.test(l));
  }
  if (/i\.split\(\).*for 루프|for 루프에 진입/.test(c) && /HumanDev|단어/.test(c)) {
    return findLine(codeLines, (l) => /for word in/.test(l));
  }
  if (/더 이상 반복할 단어/.test(c)) {
    return findLine(codeLines, (l) => /for word in/.test(l));
  }
  if (/''\.join\(x\)|y = .*HumanDev/.test(c) && !/y\[::-1\]/.test(c)) {
    return findLine(codeLines, (l) => /y\s*=/.test(l) && /join/.test(l));
  }
  if (/y\[::-1\]|veDanmuH/.test(c)) {
    return findLine(codeLines, (l) => /z\s*=/.test(l) && /join/.test(l));
  }
  if (/'o', 'n', 'g'|veDamuH/.test(c) && /제외/.test(c)) {
    return findLine(codeLines, (l) => /z\s*=/.test(l) && /join/.test(l));
  }
  if (/print\(z\)/.test(c)) {
    return findLine(codeLines, (l) => /print\(z\)/.test(l));
  }
  if (/f\(\[1, 2, 3, 4\]\)|f\(\[1/.test(c) && /호출|시작/.test(c)) {
    return findLine(codeLines, (l) => /print\(f\(/.test(l));
  }
  if (/함수 f에|def f/.test(c)) {
    return findLine(codeLines, (l) => /\bdef f\s*\(/.test(l));
  }
  if (/b\[\d+\] \+= b\[\d+\]/.test(c)) {
    return findLine(codeLines, (l) => /b\[i\+1\]\s*\+=/.test(l));
  }
  if (/리스트 내포로 m/.test(c)) {
    return findLine(codeLines, (l) => /m\s*=\s*\[\[x\]/.test(l));
  }
  if (/b = m\[:\]/.test(c)) {
    return findLine(codeLines, (l) => /b\s*=\s*m\[:\]/.test(l));
  }
  if (/range\(len\(b\)|range\(3\).*i = 0/.test(c)) {
    return findLine(codeLines, (l) => /for i in range/.test(l));
  }
  if (/i = \d+.*반복|마지막 반복/.test(c) && /nested|얕은/.test(c) === false) {
    return findLine(codeLines, (l) => /for i in range/.test(l));
  }
  if (/반복문을 빠져나|반복문.*빠져/.test(c)) {
    return findLine(codeLines, (l) => /for i in range/.test(l));
  }
  if (/sum\(len\(x\) for x in m\)|= 10을 반환/.test(c)) {
    return findLine(codeLines, (l) => /return sum/.test(l));
  }
  if (/print\(10\)|print\(f\(/.test(c) && /최종/.test(c)) {
    return findLine(codeLines, (l) => /print\(f\(/.test(l));
  }
  if (/li = \[3, 5/.test(c)) {
    return findLine(codeLines, (l) => /^li\s*=/.test(l.trim()));
  }
  if (/root = tree/.test(c)) {
    return findLine(codeLines, (l) => /root\s*=\s*tree/.test(l));
  }
  if (/리스트 내포로 7개|nodes\[0\]=Node/.test(c)) {
    return findLine(codeLines, (l) => /nodes = \[Node/.test(l));
  }
  if (/for i in range\(1, 7\)|for i in range\(1/.test(c)) {
    return findLine(codeLines, (l) => /for i in range\(1/.test(l));
  }
  if (/nodes\[\d+\]\.children\.append|\.children\.append\(nodes/.test(c)) {
    return findLine(codeLines, (l) => /\.children\.append/.test(l));
  }
  if (/for 루프 종료/.test(c) && /nodes/.test(c)) {
    return findLine(codeLines, (l) => /for i in range\(1/.test(l));
  }
  if (/return nodes\[0\]/.test(c)) {
    return findLine(codeLines, (l) => /return nodes\[0\]/.test(l));
  }
  if (/print\(calc/.test(c)) {
    return findLine(codeLines, (l) => /print\(calc/.test(l));
  }
  if (/calc\(/.test(c) && /(재귀|진입|복귀|level)/.test(c)) {
    return findLine(codeLines, (l) => /def calc|return \(node/.test(l));
  }
  if (/def tree|tree 함수/.test(c)) {
    return findLine(codeLines, (l) => /\bdef tree\s*\(/.test(l));
  }

  // C / Java patterns
  if (/main\s*\(\).*(시작|함수|메서드)/.test(c)) {
    return findLine(codeLines, (l) => /\bmain\s*\(/.test(l));
  }
  if (/(printf|putchar|print\(|System\.out\.(print|println)).*(실행|출력|최종|누적)/.test(c)) {
    const ln = findLine(codeLines, (l) =>
      /printf|putchar|print\s*\(|System\.out\.(print|println)/.test(l)
    );
    if (ln) return ln;
  }
  if (/arr1\s*\(/.test(c) && /호출|진입/.test(c)) {
    return findLine(codeLines, (l) => /arr1\s*\(/.test(l));
  }
  if (/arr2\s*\(/.test(c) && /호출|진입/.test(c)) {
    return findLine(codeLines, (l) => /arr2\s*\(/.test(l));
  }
  if (/int arr\[10\]/.test(c)) {
    return findLine(codeLines, (l) => /int arr\[10\]/.test(l));
  }
  if (/int len = 10/.test(c)) {
    return findLine(codeLines, (l) => /int len\s*=\s*10/.test(l));
  }
  if (/double av = 0/.test(c)) {
    return findLine(codeLines, (l) => /double av\s*=\s*0/.test(l));
  }
  if (/av \+=|av →/.test(c)) {
    return findLine(codeLines, (l) => /av\s*\+=/.test(l));
  }
  if (/for 루프 종료/.test(c) && /av|p\[9\]|\*\(p\+9\)/.test(c)) {
    return findLine(codeLines, (l) => /av\s*\+=/.test(l));
  }
  if (/for\s*\(i = 0|for 루프.*진입/.test(c)) {
    return findLine(codeLines, (l) => /for\s*\(/.test(l));
  }
  if (/return av/.test(c)) {
    return findLine(codeLines, (l) => /return av\s*\//.test(l));
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
  if (/while.*진입|while 루프/.test(c) && /curr/.test(c) && !/종료/.test(c)) {
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
  if (/while.*종료|NULL이 되어|조건 거짓.*루프 종료/.test(c)) {
    const w = findLine(codeLines, (l) => /while\s*\(/.test(l));
    if (w) {
      const inc = findLine(codeLines, (l) => /\+\+a/.test(l), w - 1);
      if (inc) return inc;
      return w;
    }
  }
  if (/int a = 0/.test(c)) {
    return findLine(codeLines, (l) => /int a\s*=\s*0/.test(l));
  }
  if (/char str\[\]/.test(c)) {
    return findLine(codeLines, (l) => /char str\[\]/.test(l));
  }
  if (/\+\+a/.test(c)) return findLine(codeLines, (l) => /\+\+a/.test(l));
  if (/putchar/.test(c)) return findLine(codeLines, (l) => /putchar/.test(l));

  // dict-set-intersection
  if (/lst = \[1/.test(c)) return findLine(codeLines, (l) => /^lst\s*=/.test(l.trim()));
  if (/dst =/.test(c)) return findLine(codeLines, (l) => /dst\s*=/.test(l));
  if (/s = set/.test(c)) return findLine(codeLines, (l) => /s\s*=\s*set/.test(l));
  if (/lst\[0\] = 99/.test(c)) return findLine(codeLines, (l) => /lst\[0\]\s*=/.test(l));
  if (/dst\[2\]/.test(c)) return findLine(codeLines, (l) => /dst\[2\]/.test(l));
  if (/s\.add/.test(c)) return findLine(codeLines, (l) => /s\.add/.test(l));
  if (/교집합|len\(/.test(c) && /print/.test(c)) {
    return findLine(codeLines, (l) => /print\(len/.test(l));
  }

  // Java patterns (abbreviated - keep existing from original)
  if (/change\s*\(/.test(c) && /호출/.test(c)) {
    return findLine(codeLines, (l) => /change\s*\(/.test(l));
  }
  if (/run\s*\(/.test(c) && /호출/.test(c)) {
    return findLine(codeLines, (l) => /run\s*\(/.test(l));
  }
  if (/super\s*\(/.test(c) || /밑줄.*super|super가/.test(c)) {
    return findLine(codeLines, (l) => /super\s*\(/.test(l) || /____/.test(l));
  }
  if (/implements/.test(c) && /빈칸/.test(c)) {
    return findLine(codeLines, (l) => /____/.test(l) || /implements/.test(l));
  }
  if (/String data\[\]/.test(c)) return findLine(codeLines, (l) => /String data\s*\[\]/.test(l));
  if (/String s = "B"/.test(c)) return findLine(codeLines, (l) => /String s\s*=\s*"B"/.test(l));
  if (/data\[0\] = s/.test(c)) return findLine(codeLines, (l) => /data\[0\]\s*=\s*s/.test(l));
  if (/s = "Z"/.test(c) && /매개변수/.test(c)) {
    return findLine(codeLines, (l) => /s\s*=\s*"Z"/.test(l));
  }
  if (/BO a = new/.test(c)) return findLine(codeLines, (l) => /BO a\s*=\s*new/.test(l));
  if (/BO b = new/.test(c)) return findLine(codeLines, (l) => /BO b\s*=\s*new/.test(l));
  if (/BO c = new/.test(c)) return findLine(codeLines, (l) => /BO c\s*=\s*new/.test(l));
  if (/BO\[\] arr/.test(c)) return findLine(codeLines, (l) => /BO\[\]\s*arr/.test(l));
  if (/arr\[0\] = arr\[2\]/.test(c)) return findLine(codeLines, (l) => /arr\[0\]\s*=\s*arr\[2\]/.test(l));
  if (/arr\[2\] = t/.test(c)) return findLine(codeLines, (l) => /arr\[2\]\s*=\s*t/.test(l));
  if (/arr\[1\]\.v/.test(c)) return findLine(codeLines, (l) => /arr\[1\]\.v/.test(l));
  if (/Parent ref = new Child/.test(c)) {
    return findLine(codeLines, (l) => /Parent ref\s*=\s*new Child/.test(l));
  }
  if (/ref\.x\(2\)|Child\.x/.test(c)) {
    return findLine(codeLines, (l) => /public int x\(int i\)/.test(l));
  }
  if (/ref\.id\(\)|Parent\.id/.test(c)) {
    return findLine(codeLines, (l) => /static String id/.test(l));
  }
  if (/System\.out\.println/.test(c)) {
    return findLine(codeLines, (l) => /System\.out\.(print|println)/.test(l));
  }
  if (/wm\.run\(\)|run\(\) 호출/.test(c)) {
    return findLine(codeLines, (l) => /\.run\(\)/.test(l));
  }
  if (/throw new Exception/.test(c)) {
    return findLine(codeLines, (l) => /throw new Exception/.test(l));
  }
  if (/apply\(3\)/.test(c)) {
    return findLine(codeLines, (l) => /apply\(3\)|f\.apply\(3\)/.test(l));
  }
  if (/catch/.test(c) && /return|반환/.test(c)) {
    return findLine(codeLines, (l) => /catch/.test(l));
  }
  if (/g\(\) 호출|a\.g\(\)/.test(c)) {
    return findLine(codeLines, (l) => /\.g\(\)/.test(l));
  }
  if (/f\("a"\)|A\.g\(\) 내부/.test(c)) {
    return findLine(codeLines, (l) => /return f\("a"\)/.test(l));
  }
  if (/B\.f\(Object\)/.test(c)) {
    return findLine(codeLines, (l) => /String f\(Object x\)/.test(l));
  }
  if (/width|height/.test(c) && /10/.test(c)) {
    return findLine(codeLines, (l) => /this\.(width|height)\s*=/.test(l));
  }
  if (/getSquareArea/.test(c)) return findLine(codeLines, (l) => /getSquareArea/.test(l));
  if (/Tri\.A\.name|name\(\)/.test(c)) {
    return findLine(codeLines, (l) => /\.name\(\)/.test(l));
  }
  if (/Tri\.values/.test(c)) return findLine(codeLines, (l) => /Tri\.values/.test(l));
  if (/t\.code\(\)/.test(c)) return findLine(codeLines, (l) => /\.code\(\)/.test(l));
  if (/z = y%3|y % 3/.test(c)) return findLine(codeLines, (l) => /z\s*=\s*y\s*%/.test(l));
  if (/z &|z >>/.test(c)) return findLine(codeLines, (l) => /z\s*=\s*z\s*&/.test(l));
  if (/x > 5|z <= 3/.test(c)) return findLine(codeLines, (l) => /z\s*=\s*x>5/.test(l));
  if (/enq\(&q,\s*1\)/.test(c)) return findLine(codeLines, (l) => /enq\s*\(&q,\s*1\)/.test(l));
  if (/enq\(&q,\s*2\)/.test(c)) return findLine(codeLines, (l) => /enq\s*\(&q,\s*2\)/.test(l));
  if (/enq\(&q,\s*3\)/.test(c)) return findLine(codeLines, (l) => /enq\s*\(&q,\s*3\)/.test(l));
  if (/deq\(\)|first = deq|second = deq/.test(c)) {
    return findLine(codeLines, (l) => /deq\s*\(|first\s*=\s*deq|second\s*=\s*deq/.test(l));
  }
  if (/q->a\[q->rear\]/.test(c)) return findLine(codeLines, (l) => /q->a\[q->rear\]/.test(l));
  if (/q->rear =/.test(c)) return findLine(codeLines, (l) => /q->rear\s*=/.test(l));
  if (/q->front =/.test(c)) return findLine(codeLines, (l) => /q->front\s*=/.test(l));
  if (/a\.n = &b/.test(c)) return findLine(codeLines, (l) => /a\.n\s*=\s*&b/.test(l));
  if (/b\.n = &c/.test(c) && !/재연결/.test(c)) {
    return findLine(codeLines, (l) => /b\.n\s*=\s*&c/.test(l));
  }
  if (/c\.n = &a/.test(c)) return findLine(codeLines, (l) => /c\.n\s*=\s*&a/.test(l));
  if (/b\.n = NULL/.test(c)) return findLine(codeLines, (l) => /b\.n\s*=\s*NULL/.test(l));
  if (/\(\*pptr\)\[1\]/.test(c)) return findLine(codeLines, (l) => /\(\*pptr\)\[1\]/.test(l));
  if (/ptr = a/.test(c)) return findLine(codeLines, (l) => /ptr\s*=\s*a/.test(l));
  if (/pptr = &ptr/.test(c)) return findLine(codeLines, (l) => /pptr\s*=\s*&ptr/.test(l));
  if (/p->g \+/.test(c) || /p->i - 1/.test(c)) {
    return findLine(codeLines, (l) => /printf/.test(l));
  }
  if (/malloc/.test(c)) return findLine(codeLines, (l) => /malloc/.test(l));
  if (/n->c = \*s/.test(c)) return findLine(codeLines, (l) => /n->c\s*=/.test(l));
  if (/n->p = h/.test(c)) return findLine(codeLines, (l) => /n->p\s*=\s*h/.test(l));
  if (/h = n/.test(c)) return findLine(codeLines, (l) => /\bh\s*=\s*n/.test(l));
  if (/return h/.test(c)) return findLine(codeLines, (l) => /return h/.test(l));
  if (/free\s*\(t\)/.test(c)) return findLine(codeLines, (l) => /free\s*\(/.test(l));
  if (/n = n->p/.test(c)) return findLine(codeLines, (l) => /n\s*=\s*n->p/.test(l));
  if (/head = &c/.test(c)) return findLine(codeLines, (l) => /head\s*=\s*&c/.test(l));
  if (/struct dat a\[\]/.test(c)) return findLine(codeLines, (l) => /struct dat a\[\]/.test(l));
  if (/test\[\] 배열|p = &test/.test(c)) {
    return findLine(codeLines, (l) => /p\s*=\s*&test/.test(l));
  }
  if (/struct node a =/.test(c)) return findLine(codeLines, (l) => /struct node a\s*=/.test(l));
  if (/struct node b =/.test(c)) return findLine(codeLines, (l) => /struct node b\s*=/.test(l));
  if (/struct node c =/.test(c)) return findLine(codeLines, (l) => /struct node c\s*=/.test(l));

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

function fixFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const codeLines = extractCode(src);
  const steps = extractTraceSteps(src);
  if (!codeLines || !steps) return { filePath, changed: false, skipped: !steps };

  const fixed = steps.map((step) => {
    const best = findBestLine(codeLines, step.comment);
    return best && best !== step.line ? { ...step, line: best } : step;
  });

  const changes = fixed.filter((s, i) => s.line !== steps[i].line).length;
  if (changes === 0) return { filePath, changed: false, changes: 0 };

  const formatted = formatTraceSteps(fixed);
  const newSrc = replaceTraceSteps(src, formatted);
  fs.writeFileSync(filePath, newSrc);
  return { filePath, changed: true, changes };
}

for (const dir of DIRS) {
  for (const file of listProblems(dir)) {
    const r = fixFile(file);
    const rel = path.relative(ROOT, r.filePath);
    if (r.skipped) console.log(`SKIP  ${rel}`);
    else console.log(r.changed ? `FIXED ${rel}: ${r.changes}` : `OK    ${rel}`);
  }
}
