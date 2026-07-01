import type { Problem, WorksheetConfig } from "@/types/problem";

const SKIP_VAR_NAMES = new Set(["호출", "부모", "자식", "연결", "결과", "합계", "입력"]);

function countMeaningfulVariables(problem: Problem): number {
  let max = 0;
  for (const step of problem.traceSteps) {
    const names = new Set<string>();
    for (const v of step.variables) {
      const base = v.name.split(/[.[\]]/)[0];
      if (base && !SKIP_VAR_NAMES.has(base)) names.add(base);
    }
    max = Math.max(max, names.size);
  }
  return max;
}

function countMaxMemoryCells(problem: Problem): number {
  let max = 0;
  for (const step of problem.traceSteps) {
    if (step.memory?.cells.length) {
      max = Math.max(max, step.memory.cells.length);
    }
  }
  return max;
}

export function resolveWorksheet(problem: Problem): WorksheetConfig {
  if (problem.worksheet) return problem.worksheet;

  const varCount = countMeaningfulVariables(problem);
  const memoryCount = countMaxMemoryCells(problem);
  const hasMemory = memoryCount > 0;

  return {
    variableRows: Math.min(Math.max(varCount + 2, 5), 14),
    memorySlots: hasMemory ? Math.min(Math.max(memoryCount + 2, 4), 12) : 0,
    showArrowHints: hasMemory,
  };
}
