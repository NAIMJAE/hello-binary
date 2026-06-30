import type { MemoryArrow, MemoryCell, MemorySnapshot, TraceStep } from "@/types/problem";

export type DisplayMemorySnapshot = MemorySnapshot;

const FUNCTION_LOCAL_CELL_IDS = new Set([
  "stack_av",
  "stack_i",
  "stack_p[i]",
  "stack_list_sum",
  "stack_list_len",
  "stack_index",
  "stack_lis",
  "stack_word",
]);

function isFunctionEntry(step: TraceStep): boolean {
  return (
    /(?:호출|함수|메서드).*(?:진입|전달)|함수로 진입|함수에 진입|생성자 진입/.test(step.comment) &&
    !/루프에 진입|반복문에 진입|for 루프|enumerate|while.*진입/.test(step.comment)
  );
}

function arrowKey(arrow: MemoryArrow): string {
  return `${arrow.from}:${arrow.to}:${arrow.label ?? ""}`;
}

/**
 * 0..stepIndex 단계의 memory 스냅샷을 누적합니다.
 * 한번 등장한 셀·화살표는 이후 단계에서도 유지됩니다.
 */
export function mergeTraceMemory(
  steps: TraceStep[],
  stepIndex: number,
): DisplayMemorySnapshot | null {
  const cellMap = new Map<string, MemoryCell>();
  const arrowMap = new Map<string, MemoryArrow>();
  const end = Math.min(stepIndex, steps.length - 1);

  for (let i = 0; i <= end; i++) {
    const step = steps[i];

    if (isFunctionEntry(step)) {
      for (const id of FUNCTION_LOCAL_CELL_IDS) {
        cellMap.delete(id);
      }
    }

    if (!step.memory) continue;

    for (const cell of step.memory.cells) {
      cellMap.set(cell.id, { ...cell, highlight: false, carriedOver: false });
    }
    for (const arrow of step.memory.arrows) {
      arrowMap.set(arrowKey(arrow), { ...arrow, highlight: false });
    }
  }

  if (cellMap.size === 0) return null;

  const current = steps[end].memory;
  const currentCellIds = new Set(current?.cells.map((c) => c.id) ?? []);
  const currentArrowKeys = new Set((current?.arrows ?? []).map(arrowKey));

  const cells: MemoryCell[] = [...cellMap.values()]
    .map((cell) => {
      const inCurrent = current?.cells.find((c) => c.id === cell.id);
      return {
        ...cell,
        ...(inCurrent ?? {}),
        highlight: inCurrent?.highlight ?? false,
        carriedOver: !currentCellIds.has(cell.id),
      };
    })
    .sort((a, b) => {
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      if (!a.carriedOver && b.carriedOver) return -1;
      if (a.carriedOver && !b.carriedOver) return 1;
      return a.label.localeCompare(b.label);
    });

  const arrows: MemoryArrow[] = [...arrowMap.values()]
    .map((arrow) => {
      const inCurrent = current?.arrows.find((a) => arrowKey(a) === arrowKey(arrow));
      return {
        ...arrow,
        highlight: inCurrent?.highlight ?? false,
      };
    })
    .filter((arrow) => {
      const fromExists = cellMap.has(arrow.from);
      const toExists = cellMap.has(arrow.to);
      return fromExists && toExists;
    });

  return { cells, arrows };
}
