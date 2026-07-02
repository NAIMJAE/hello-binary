import type {
  MemoryDiagramHeapEntry,
  MemoryDiagramLink,
  MemoryDiagramSnapshot,
  MemoryDiagramStackSlot,
  TraceStep,
} from "@/types/problem";

function linkKey(link: MemoryDiagramLink): string {
  return `${link.from}:${link.to}`;
}

function mergeHeapEntry(
  existing: MemoryDiagramHeapEntry,
  incoming: MemoryDiagramHeapEntry,
): MemoryDiagramHeapEntry {
  if (existing.kind === "array" && incoming.kind === "array") {
    const elementMap = new Map(existing.elements.map((e) => [e.index, e]));
    for (const el of incoming.elements) {
      elementMap.set(el.index, { ...el, highlight: false });
    }
    return {
      ...incoming,
      elements: [...elementMap.values()].sort((a, b) => a.index - b.index),
      highlight: incoming.highlight ?? false,
    };
  }

  if (existing.kind === "object" && incoming.kind === "object") {
    const fieldMap = new Map(existing.fields.map((f) => [f.name, f]));
    for (const field of incoming.fields) {
      fieldMap.set(field.name, { ...field, highlight: false });
    }
    return {
      ...incoming,
      fields: [...fieldMap.values()],
      highlight: incoming.highlight ?? false,
    };
  }

  return { ...incoming, highlight: incoming.highlight ?? false };
}

/**
 * 0..stepIndex 단계의 memoryDiagram 스냅샷을 누적합니다.
 */
export function mergeTraceMemoryDiagram(
  steps: TraceStep[],
  stepIndex: number,
): MemoryDiagramSnapshot | null {
  const stackMap = new Map<string, MemoryDiagramStackSlot>();
  const heapMap = new Map<string, MemoryDiagramHeapEntry>();
  const linkMap = new Map<string, MemoryDiagramLink>();
  const end = Math.min(stepIndex, steps.length - 1);

  for (let i = 0; i <= end; i++) {
    const diagram = steps[i].memoryDiagram;
    if (!diagram) continue;

    for (const slot of diagram.stack) {
      stackMap.set(slot.id, { ...slot, highlight: false, carriedOver: false });
    }
    for (const entry of diagram.heap) {
      const prev = heapMap.get(entry.id);
      heapMap.set(
        entry.id,
        prev ? mergeHeapEntry(prev, entry) : { ...entry, highlight: false },
      );
    }
    for (const link of diagram.links) {
      linkMap.set(linkKey(link), { ...link, highlight: false });
    }
  }

  if (stackMap.size === 0 && heapMap.size === 0) return null;

  const current = steps[end].memoryDiagram;
  const currentStackIds = new Set(current?.stack.map((s) => s.id) ?? []);

  const stack: MemoryDiagramStackSlot[] = [...stackMap.values()]
    .map((slot) => {
      const inCurrent = current?.stack.find((s) => s.id === slot.id);
      return {
        ...slot,
        ...(inCurrent ?? {}),
        highlight: inCurrent?.highlight ?? false,
        carriedOver: !currentStackIds.has(slot.id),
      };
    })
    .sort((a, b) => a.address.localeCompare(b.address));

  const heap: MemoryDiagramHeapEntry[] = [...heapMap.values()]
    .map((entry) => {
      const inCurrent = current?.heap.find((h) => h.id === entry.id);
      if (!inCurrent) return { ...entry, highlight: false };
      if (entry.kind === "array" && inCurrent.kind === "array") {
        return {
          ...entry,
          ...inCurrent,
          elements: inCurrent.elements,
          highlight: inCurrent.highlight ?? false,
        };
      }
      if (entry.kind === "object" && inCurrent.kind === "object") {
        return {
          ...entry,
          ...inCurrent,
          fields: inCurrent.fields,
          highlight: inCurrent.highlight ?? false,
        };
      }
      return { ...inCurrent, highlight: inCurrent.highlight ?? false };
    })
    .sort((a, b) => a.address.localeCompare(b.address));

  const links: MemoryDiagramLink[] = [...linkMap.values()]
    .map((link) => {
      const inCurrent = current?.links.find((l) => linkKey(l) === linkKey(link));
      return {
        ...link,
        highlight: inCurrent?.highlight ?? false,
      };
    })
    .filter((link) => heapMap.has(link.to));

  return { stack, heap, links };
}
