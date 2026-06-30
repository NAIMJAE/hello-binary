import type { TraceStep, Variable } from "@/types/problem";

export type DisplayVariable = Variable & {
  /** 이전 단계에서 이어져 온 값 (이번 단계에서 갱신되지 않음) */
  carriedOver?: boolean;
};

const SKIP_NAMES = new Set(["호출", "부모", "자식", "연결", "매개변수"]);

/** 함수 스코프를 벗어나면 추적에서 제거할 지역 변수 */
const FUNCTION_LOCAL_NAMES = new Set(["av", "i", "p[i]", "list_sum", "list_len", "index", "lis", "word"]);

function isFunctionEntry(step: TraceStep): boolean {
  return (
    /(?:호출|함수|메서드).*(?:진입|전달)|함수로 진입|함수에 진입|생성자 진입/.test(step.comment) &&
    !/루프에 진입|반복문에 진입|for 루프|enumerate|while.*진입/.test(step.comment)
  );
}

function shouldTrack(name: string): boolean {
  return !SKIP_NAMES.has(name);
}

function compareVariables(a: DisplayVariable, b: DisplayVariable): number {
  if (a.highlight && !b.highlight) return -1;
  if (!a.highlight && b.highlight) return 1;
  if (!a.carriedOver && b.carriedOver) return -1;
  if (a.carriedOver && !b.carriedOver) return 1;
  return a.name.localeCompare(b.name);
}

/**
 * 0..stepIndex 단계까지 변수를 누적합니다.
 * 전역·지속 변수는 이후 단계에서도 표에 남고, 이번 단계에서 바뀐 변수만 강조합니다.
 */
export function mergeTraceVariables(
  steps: TraceStep[],
  stepIndex: number,
): DisplayVariable[] {
  const map = new Map<string, DisplayVariable>();
  const end = Math.min(stepIndex, steps.length - 1);

  for (let i = 0; i <= end; i++) {
    const step = steps[i];

    if (isFunctionEntry(step)) {
      for (const name of FUNCTION_LOCAL_NAMES) {
        map.delete(name);
      }
    }

    for (const v of step.variables) {
      if (!shouldTrack(v.name)) continue;
      map.set(v.name, {
        ...v,
        highlight: false,
        carriedOver: false,
      });
    }
  }

  const currentByName = new Map(
    steps[end].variables.filter((v) => shouldTrack(v.name)).map((v) => [v.name, v]),
  );

  const result: DisplayVariable[] = [];

  for (const [name, latest] of map) {
    const inCurrent = currentByName.get(name);
    result.push({
      ...latest,
      ...(inCurrent ?? {}),
      highlight: inCurrent?.highlight ?? false,
      carriedOver: !inCurrent,
    });
  }

  return result.sort(compareVariables);
}
