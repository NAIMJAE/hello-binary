"use client";

import { motion } from "framer-motion";
import type { MemoryArrow, MemoryCell, MemoryRegion, MemorySnapshot } from "@/types/problem";
import { focusedHeaderClass, focusedPanelClass } from "./ContentPanel";

type MemorySnapshotPanelProps = {
  memory: MemorySnapshot;
  focused?: boolean;
};

const regionLabels: Record<MemoryRegion, string> = {
  stack: "스택",
  heap: "힙",
  data: "데이터",
};

const regionOrder: MemoryRegion[] = ["stack", "data", "heap"];

function cellsByRegion(cells: MemoryCell[]) {
  const map: Record<MemoryRegion, MemoryCell[]> = {
    stack: [],
    data: [],
    heap: [],
  };
  for (const cell of cells) {
    map[cell.region].push(cell);
  }
  return map;
}

function MemoryCellBox({ cell }: { cell: MemoryCell }) {
  const carried = cell.carriedOver && !cell.highlight;

  return (
    <motion.div
      animate={
        cell.highlight
          ? { scale: [1, 1.02, 1], borderColor: "#f59e0b" }
          : { scale: 1, borderColor: carried ? "#cbd5e1" : "#e2e8f0" }
      }
      className={`rounded-lg border px-3 py-2 ${
        cell.highlight
          ? "border-amber-400 bg-amber-50 shadow-sm shadow-amber-100"
          : carried
            ? "border-slate-200 bg-slate-50"
            : "border-slate-200 bg-white"
      }`}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-700">
          <span className={carried ? "text-slate-500" : ""}>{cell.label}</span>
          {carried && (
            <span className="rounded bg-slate-100 px-1 py-0.5 text-[10px] font-medium text-slate-400">
              유지
            </span>
          )}
        </span>
        {cell.address && (
          <span className="font-mono text-[10px] text-slate-400">{cell.address}</span>
        )}
      </div>
      <p
        className={`mt-1 whitespace-pre-wrap font-mono text-sm ${
          carried ? "text-slate-500" : "text-slate-800"
        }`}
      >
        {cell.value}
      </p>
    </motion.div>
  );
}

function ArrowRow({ arrow, fromCell, toCell }: { arrow: MemoryArrow; fromCell?: MemoryCell; toCell?: MemoryCell }) {
  if (!fromCell || !toCell) return null;

  return (
    <div
      className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs ${
        arrow.highlight ? "bg-amber-50 text-amber-800" : "text-slate-500"
      }`}
    >
      <span className="font-mono font-medium">{fromCell.label}</span>
      <span aria-hidden="true">→</span>
      {arrow.label && <span className="text-slate-400">{arrow.label}</span>}
      <span aria-hidden="true">→</span>
      <span className="font-mono font-medium">{toCell.label}</span>
    </div>
  );
}

export function MemorySnapshotPanel({ memory, focused = false }: MemorySnapshotPanelProps) {
  const grouped = cellsByRegion(memory.cells);
  const cellMap = new Map(memory.cells.map((c) => [c.id, c]));

  return (
    <section
      className={`overflow-hidden rounded-xl bg-white transition-all duration-300 ${
        focused ? focusedPanelClass : "border border-slate-200 shadow-sm"
      }`}
    >
      <div
        className={`px-4 py-2 transition-colors duration-300 ${
          focused ? focusedHeaderClass : "border-b border-slate-200 bg-slate-100"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium tracking-wide text-slate-600">메모리 스냅샷</span>
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm border border-amber-400 bg-amber-100" />
              이번 단계 변경
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm border border-slate-300 bg-slate-50" />
              유지
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {regionOrder.map((region) => {
          const cells = grouped[region];
          if (cells.length === 0) return null;

          return (
            <div key={region}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {regionLabels[region]}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {cells.map((cell) => (
                  <MemoryCellBox key={cell.id} cell={cell} />
                ))}
              </div>
            </div>
          );
        })}

        {memory.arrows.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              참조 관계
            </p>
            <div className="space-y-1 rounded-lg border border-slate-100 bg-slate-50/80 p-3">
              {memory.arrows.map((arrow, i) => (
                <ArrowRow
                  key={`${arrow.from}-${arrow.to}-${i}`}
                  arrow={arrow}
                  fromCell={cellMap.get(arrow.from)}
                  toCell={cellMap.get(arrow.to)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
