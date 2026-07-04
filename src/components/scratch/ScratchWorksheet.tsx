"use client";

import { motion } from "framer-motion";
import type { WorksheetConfig } from "@/types/problem";
import { usePointerReorder } from "./usePointerReorder";
import { WorksheetDragHandle } from "./WorksheetDragHandle";
import { WorksheetDragOverlay } from "./WorksheetDragOverlay";
import { createWorksheetItemId } from "./worksheetIds";

export type VariableRow = {
  id: string;
  name: string;
  value: string;
};

export type MemorySlot = {
  id: string;
  label: string;
  value: string;
};

const MAX_VARIABLE_ROWS = 20;
const MAX_MEMORY_SLOTS = 16;

const LAYOUT_TRANSITION = { layout: { duration: 0.2, ease: "easeOut" as const } };

type ScratchWorksheetProps = {
  config: WorksheetConfig;
  variableRows: VariableRow[];
  memorySlots: MemorySlot[];
  onVariableRowsChange: (rows: VariableRow[]) => void;
  onMemorySlotsChange: (slots: MemorySlot[]) => void;
  onCollapse?: () => void;
};

function AddButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <span aria-hidden className="text-sm leading-none">
        +
      </span>
      {label}
    </button>
  );
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      aria-label={label}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
      type="button"
      onClick={onClick}
    >
      <span className="text-base leading-none">−</span>
    </button>
  );
}

function VariableRowPreview({ row }: { row: VariableRow }) {
  return (
    <div className="flex items-center gap-1 border-b border-slate-50 px-1 py-1 last:border-0">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center text-slate-300">
        <svg aria-hidden className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
          <circle cx="5" cy="4" r="1.25" />
          <circle cx="11" cy="4" r="1.25" />
          <circle cx="5" cy="8" r="1.25" />
          <circle cx="11" cy="8" r="1.25" />
          <circle cx="5" cy="12" r="1.25" />
          <circle cx="11" cy="12" r="1.25" />
        </svg>
      </div>
      <div className="min-w-0 flex-1 px-1.5 py-1 font-mono text-xs text-slate-700">
        {row.name || <span className="text-slate-300">x</span>}
      </div>
      <div className="min-w-0 flex-1 px-1.5 py-1 font-mono text-xs text-slate-700">
        {row.value || <span className="text-slate-300">?</span>}
      </div>
      <div className="w-7 shrink-0" />
    </div>
  );
}

function MemorySlotPreview({ slot }: { slot: MemorySlot }) {
  return (
    <div className="flex gap-1 p-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center text-slate-300">
        <svg aria-hidden className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
          <circle cx="5" cy="4" r="1.25" />
          <circle cx="11" cy="4" r="1.25" />
          <circle cx="5" cy="8" r="1.25" />
          <circle cx="11" cy="8" r="1.25" />
          <circle cx="5" cy="12" r="1.25" />
          <circle cx="11" cy="12" r="1.25" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="border-b border-dashed border-slate-200 pb-1 font-mono text-xs font-medium text-slate-700">
          {slot.label || <span className="text-slate-300">라벨</span>}
        </p>
        <p className="mt-1.5 rounded bg-slate-50 px-2 py-1.5 font-mono text-xs text-slate-800">
          {slot.value || <span className="text-slate-300">값</span>}
        </p>
      </div>
      <div className="w-7 shrink-0" />
    </div>
  );
}

export function ScratchWorksheet({
  config,
  variableRows,
  memorySlots,
  onVariableRowsChange,
  onMemorySlotsChange,
  onCollapse,
}: ScratchWorksheetProps) {
  const variables = usePointerReorder(variableRows, onVariableRowsChange);
  const memory = usePointerReorder(memorySlots, onMemorySlotsChange);

  const updateVariable = (id: string, field: "name" | "value", text: string) => {
    onVariableRowsChange(
      variableRows.map((row) => (row.id === id ? { ...row, [field]: text } : row)),
    );
  };

  const updateMemory = (id: string, field: "label" | "value", text: string) => {
    onMemorySlotsChange(
      memorySlots.map((slot) => (slot.id === id ? { ...slot, [field]: text } : slot)),
    );
  };

  const addVariableRow = () => {
    if (variableRows.length >= MAX_VARIABLE_ROWS) return;
    onVariableRowsChange([...variableRows, { id: createWorksheetItemId(), name: "", value: "" }]);
  };

  const removeVariableRow = (id: string) => {
    if (variableRows.length <= 1) return;
    onVariableRowsChange(variableRows.filter((row) => row.id !== id));
  };

  const addMemorySlot = () => {
    if (memorySlots.length >= MAX_MEMORY_SLOTS) return;
    onMemorySlotsChange([
      ...memorySlots,
      { id: createWorksheetItemId(), label: "", value: "" },
    ]);
  };

  const removeMemorySlot = (id: string) => {
    onMemorySlotsChange(memorySlots.filter((slot) => slot.id !== id));
  };

  const findVariableIndex = (id: string) => variableRows.findIndex((row) => row.id === id);
  const findMemoryIndex = (id: string) => memorySlots.findIndex((slot) => slot.id === id);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-slate-50/30">
      <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-slate-900">워크시트</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              변수와 메모리를 직접 적어 보세요. ⋮⋮ 핸들을 드래그하면 순서가 바뀝니다.
            </p>
          </div>
          {onCollapse && (
            <button
              aria-label="워크시트 접기"
              className="shrink-0 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              title="워크시트 접기"
              type="button"
              onClick={onCollapse}
            >
              접기 ▶
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <section>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-xs font-semibold tracking-wide text-slate-500">
              변수
              <span className="ml-1 font-normal text-slate-400">({variableRows.length})</span>
            </h3>
            <AddButton
              disabled={variableRows.length >= MAX_VARIABLE_ROWS}
              label="행 추가"
              onClick={addVariableRow}
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs text-slate-500">
                  <th className="w-9" aria-label="순서" />
                  <th className="px-2 py-1.5 font-medium">이름</th>
                  <th className="px-2 py-1.5 font-medium">값</th>
                  <th className="w-9" />
                </tr>
              </thead>
              <tbody className={variables.isDragging ? "select-none" : undefined}>
                {variables.displayItems.map((row) => {
                  const placeholder = variables.isPlaceholder(row);
                  const originalIndex = findVariableIndex(row.id);

                  return (
                    <motion.tr
                      key={row.id}
                      layout
                      ref={(el) => variables.setItemRef(row.id, el)}
                      className={`border-b border-slate-50 last:border-0 ${
                        placeholder
                          ? "border-2 border-dashed border-amber-200 bg-amber-50/40 opacity-40"
                          : ""
                      }`}
                      transition={LAYOUT_TRANSITION}
                    >
                      <td className="p-1">
                        {variableRows.length > 1 && (
                          <WorksheetDragHandle
                            label={`변수 ${originalIndex + 1}번째 행 순서 변경`}
                            onPointerDown={(e) => {
                              const rowEl = e.currentTarget.closest("tr");
                              if (rowEl instanceof HTMLElement) {
                                variables.startDrag(originalIndex, e, rowEl);
                              }
                            }}
                          />
                        )}
                      </td>
                      <td className="p-1">
                        <input
                          className="w-full rounded border border-transparent bg-transparent px-1.5 py-1 font-mono text-xs outline-none focus:border-slate-200 focus:bg-slate-50 disabled:opacity-60"
                          disabled={variables.isDragging}
                          placeholder="x"
                          type="text"
                          value={row.name}
                          onChange={(e) => updateVariable(row.id, "name", e.target.value)}
                        />
                      </td>
                      <td className="p-1">
                        <input
                          className="w-full rounded border border-transparent bg-transparent px-1.5 py-1 font-mono text-xs outline-none focus:border-slate-200 focus:bg-slate-50 disabled:opacity-60"
                          disabled={variables.isDragging}
                          placeholder="?"
                          type="text"
                          value={row.value}
                          onChange={(e) => updateVariable(row.id, "value", e.target.value)}
                        />
                      </td>
                      <td className="p-1">
                        {variableRows.length > 1 && (
                          <RemoveButton
                            label="변수 행 삭제"
                            onClick={() => removeVariableRow(row.id)}
                          />
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-xs font-semibold tracking-wide text-slate-500">
              메모리
              <span className="ml-1 font-normal text-slate-400">({memorySlots.length})</span>
            </h3>
            <AddButton
              disabled={memorySlots.length >= MAX_MEMORY_SLOTS}
              label="슬롯 추가"
              onClick={addMemorySlot}
            />
          </div>

          {memorySlots.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-4 text-center text-xs text-slate-400">
              메모리 박스가 필요하면 위 + 슬롯 추가를 누르세요.
            </p>
          ) : (
            <div className={`grid grid-cols-1 gap-2 ${memory.isDragging ? "select-none" : ""}`}>
              {memory.displayItems.map((slot) => {
                const placeholder = memory.isPlaceholder(slot);
                const originalIndex = findMemoryIndex(slot.id);

                return (
                  <motion.div
                    key={slot.id}
                    data-memory-card
                    layout
                    ref={(el) => memory.setItemRef(slot.id, el)}
                    className={`flex gap-1 rounded-lg border bg-white p-2 shadow-sm ${
                      placeholder
                        ? "border-2 border-dashed border-amber-300 bg-amber-50/40 opacity-40"
                        : "border-slate-200"
                    }`}
                    transition={LAYOUT_TRANSITION}
                  >
                    {memorySlots.length > 1 && (
                      <WorksheetDragHandle
                        label={`메모리 ${originalIndex + 1}번째 슬롯 순서 변경`}
                        onPointerDown={(e) => {
                          const cardEl = e.currentTarget.closest("[data-memory-card]");
                          if (cardEl instanceof HTMLElement) {
                            memory.startDrag(originalIndex, e, cardEl);
                          }
                        }}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <input
                        className="mb-1.5 w-full border-b border-dashed border-slate-200 bg-transparent pb-1 font-mono text-xs font-medium text-slate-700 outline-none focus:border-amber-300 disabled:opacity-60"
                        disabled={memory.isDragging}
                        placeholder="라벨 (예: sum, curr)"
                        type="text"
                        value={slot.label}
                        onChange={(e) => updateMemory(slot.id, "label", e.target.value)}
                      />
                      <input
                        className="w-full rounded bg-slate-50 px-2 py-1.5 font-mono text-xs text-slate-800 outline-none ring-1 ring-slate-100 focus:ring-amber-200 disabled:opacity-60"
                        disabled={memory.isDragging}
                        placeholder="값"
                        type="text"
                        value={slot.value}
                        onChange={(e) => updateMemory(slot.id, "value", e.target.value)}
                      />
                    </div>
                    <RemoveButton
                      label="메모리 슬롯 삭제"
                      onClick={() => removeMemorySlot(slot.id)}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}

          {config.showArrowHints && memorySlots.length > 0 && (
            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              포인터·노드 연결은 그림판에 화살표로 그려 보세요.
            </p>
          )}
        </section>
      </div>

      <WorksheetDragOverlay drag={variables.drag}>
        {variables.draggedItem && <VariableRowPreview row={variables.draggedItem} />}
      </WorksheetDragOverlay>

      <WorksheetDragOverlay drag={memory.drag}>
        {memory.draggedItem && <MemorySlotPreview slot={memory.draggedItem} />}
      </WorksheetDragOverlay>
    </div>
  );
}

export function createEmptyVariableRows(count: number): VariableRow[] {
  return Array.from({ length: Math.max(count, 1) }, () => ({
    id: createWorksheetItemId(),
    name: "",
    value: "",
  }));
}

export function createEmptyMemorySlots(count: number): MemorySlot[] {
  return Array.from({ length: count }, () => ({
    id: createWorksheetItemId(),
    label: "",
    value: "",
  }));
}
