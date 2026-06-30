import fs from "fs";

const DIRS = ["src/problems/c", "src/problems/java", "src/problems/python"];

function extractCode(src) {
  return src.match(/const code = `([\s\S]*?)`;/)[1].split("\n");
}

function extractTraceSteps(src) {
  const start = src.indexOf("traceSteps:");
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
}

function isOutput(t) {
  return /print\s*\(|printf\s*\(|println\s*\(|putchar\s*\(|System\.out\.(?:print|println)/.test(
    t.trim(),
  );
}

console.log("=== 마지막 출력 단계 ===");
for (const dir of DIRS) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts") && x !== "index.ts")) {
    const src = fs.readFileSync(`${dir}/${f}`, "utf8");
    const code = extractCode(src);
    const steps = extractTraceSteps(src);
    const last = steps[steps.length - 1];
    const lt = (code[last.line - 1] || "").trim();
    if (!isOutput(lt)) continue;
    const rl =
      (last.relatedLines || []).map((r) => `L${r.line}:${r.role}`).join(", ") || "없음";
    console.log(f.replace(".ts", "").padEnd(38), `active L${last.line}`, "| related:", rl);
  }
}

let bad = 0;
for (const dir of DIRS) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts") && x !== "index.ts")) {
    const src = fs.readFileSync(`${dir}/${f}`, "utf8");
    const code = extractCode(src);
    const steps = extractTraceSteps(src);
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      const lt = (code[s.line - 1] || "").trim();
      for (const r of s.relatedLines || []) {
        const rt = (code[r.line - 1] || "").trim();
        if (isOutput(rt) && !isOutput(lt) && r.role !== "call") bad++;
      }
    }
  }
}
console.log(`\n비출력 단계에 print가 related( call 제외 ): ${bad}건`);
