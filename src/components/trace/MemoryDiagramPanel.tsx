"use client";

import { motion } from "framer-motion";
import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import type {
  MemoryDiagramHeapArray,
  MemoryDiagramHeapEntry,
  MemoryDiagramHeapObject,
  MemoryDiagramLink,
  MemoryDiagramSnapshot,
  MemoryDiagramStackSlot,
} from "@/types/problem";
import { focusedHeaderClass, focusedPanelClass } from "./ContentPanel";

type MemoryDiagramPanelProps = {
  memory: MemoryDiagramSnapshot;
  focused?: boolean;
};

type ArrowPath = {
  key: string;
  d: string;
  fromRegion: "stack" | "heap";
  highlight: boolean;
  z: number;
};

function formatAddressRef(address: string) {
  return `${address} 주소 참조`;
}

function boxClass(highlight: boolean, carried = false) {
  if (highlight) {
    return "border-amber-400 bg-amber-50 shadow-sm shadow-amber-100";
  }
  if (carried) {
    return "border-slate-200 bg-slate-50";
  }
  return "border-slate-200 bg-white";
}

function LabelRow({
  label,
  value,
  highlight,
  valueClassName,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  valueClassName?: string;
}) {
  return (
    <div
      className={`grid grid-cols-[auto_1fr] gap-x-2 font-mono text-[11px] ${
        highlight ? "text-amber-900" : "text-slate-600"
      }`}
    >
      <span className="text-slate-400">{label}</span>
      <span className={valueClassName ?? "font-medium text-slate-800"}>: {value}</span>
    </div>
  );
}

function TypeValueRow({
  type,
  value,
  highlight,
}: {
  type: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto_1fr] gap-x-2 font-mono text-[11px] ${
        highlight ? "text-amber-900" : "text-slate-600"
      }`}
    >
      <span className="text-slate-400">type</span>
      <span className="text-slate-700">: {type}</span>
      <span className="text-slate-400">value</span>
      <span className="font-medium text-slate-800">: {value}</span>
    </div>
  );
}

function StackSlotBox({ slot }: { slot: MemoryDiagramStackSlot }) {
  const carried = slot.carriedOver && !slot.highlight;

  return (
    <motion.div
      animate={slot.highlight ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      className={`rounded-lg border px-3 py-2 ${boxClass(!!slot.highlight, carried)}`}
      data-diagram-anchor="stack-out"
      data-diagram-id={slot.id}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-xs font-semibold text-slate-800">
          {slot.name}
          <span className="ml-1 font-normal text-slate-400">:{slot.type}</span>
        </span>
        <span className="font-mono text-[10px] text-slate-400">{slot.address}</span>
      </div>
      <p className="mt-1.5 font-mono text-xs text-slate-700">
        {slot.kind === "reference" ? (
          <span className="text-violet-800">{formatAddressRef(slot.value)}</span>
        ) : (
          slot.value
        )}
      </p>
    </motion.div>
  );
}

function HeapObjectBox({ object }: { object: MemoryDiagramHeapObject }) {
  return (
    <motion.div
      animate={object.highlight ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      className={`rounded-lg border px-3 py-2 ${boxClass(!!object.highlight)}`}
      data-diagram-anchor="heap-in"
      data-diagram-id={object.id}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-2 space-y-1 border-b border-slate-100 pb-2">
        <LabelRow highlight={object.highlight} label="name" value={object.typeName} />
        <LabelRow
          label="address"
          value={object.address}
          valueClassName="font-medium text-violet-700"
        />
      </div>
      <div className="space-y-2">
        {object.fields.map((field) => (
          <div
            key={field.name}
            className={`space-y-1 rounded px-1.5 py-1 ${
              field.highlight ? "bg-amber-100/80" : "bg-slate-50/60"
            }`}
            data-diagram-id={`${object.id}_field_${field.name}`}
          >
            <LabelRow highlight={field.highlight} label="name" value={field.name} />
            <TypeValueRow
              highlight={field.highlight}
              type={field.type}
              value={
                field.kind === "reference"
                  ? formatAddressRef(field.value)
                  : field.value
              }
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function HeapArrayBox({ array }: { array: MemoryDiagramHeapArray }) {
  return (
    <motion.div
      animate={array.highlight ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      className={`rounded-lg border px-3 py-2 ${boxClass(!!array.highlight)}`}
      data-diagram-anchor="heap-in"
      data-diagram-id={array.id}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-2 space-y-1 border-b border-slate-100 pb-2">
        <LabelRow highlight={array.highlight} label="name" value={array.typeName} />
        <LabelRow
          label="address"
          value={array.address}
          valueClassName="font-medium text-violet-700"
        />
      </div>
      <div className="space-y-1.5">
        {array.elements.map((el) => (
          <div
            key={el.index}
            className={`space-y-1 rounded px-1.5 py-1 ${
              el.highlight ? "bg-amber-100/80" : "bg-slate-50/60"
            }`}
            data-diagram-anchor="heap-internal-out"
            data-diagram-id={`${array.id}_el_${el.index}`}
          >
            <LabelRow
              highlight={el.highlight}
              label="name"
              value={el.refLabel ? `[${el.index}] (${el.refLabel})` : `[${el.index}]`}
            />
            {el.kind === "null" ? (
              <TypeValueRow type="ref" value="null" highlight={el.highlight} />
            ) : el.kind === "reference" ? (
              <TypeValueRow
                highlight={el.highlight}
                type={array.typeName.replace("[]", "")}
                value={formatAddressRef(el.value ?? "")}
              />
            ) : (
              <TypeValueRow
                highlight={el.highlight}
                type="primitive"
                value={el.value ?? ""}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function HeapEntryBox({ entry }: { entry: MemoryDiagramHeapEntry }) {
  if (entry.kind === "array") {
    return <HeapArrayBox array={entry} />;
  }
  return <HeapObjectBox object={entry} />;
}

function isStackLink(from: string) {
  return from.startsWith("stack_");
}

/** 스택: 우측 상단 출발 · 우측 하단 도착 / 힙: 좌측 상단 출발 · 좌측 하단 도착 */
const TOP_RATIO = 0.22;
const BOTTOM_RATIO = 0.78;

function isStackId(id: string) {
  return id.startsWith("stack_");
}

function getExitAnchor(
  id: string,
  rect: DOMRect,
  containerRect: DOMRect,
): [number, number] {
  const y = rect.top + rect.height * TOP_RATIO - containerRect.top;
  if (isStackId(id)) {
    return [rect.right - containerRect.left, y];
  }
  return [rect.left - containerRect.left, y];
}

function getEnterAnchor(
  id: string,
  rect: DOMRect,
  containerRect: DOMRect,
): [number, number] {
  const y = rect.top + rect.height * BOTTOM_RATIO - containerRect.top;
  if (isStackId(id)) {
    return [rect.right - containerRect.left, y];
  }
  return [rect.left - containerRect.left, y];
}

function pathBetween(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i][0]} ${points[i][1]}`;
  }
  return d;
}

function linkFromRegion(from: string): "stack" | "heap" {
  return isStackLink(from) ? "stack" : "heap";
}

function DiagramArrows({
  links,
  containerRef,
}: {
  links: MemoryDiagramLink[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const uid = useId();
  const [paths, setPaths] = useState<ArrowPath[]>([]);

  const updatePaths = useCallback(() => {
    const container = containerRef.current;
    if (!container || links.length === 0) {
      setPaths([]);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const stackCol = container.querySelector<HTMLElement>('[data-diagram-region="stack"]');
    const heapCol = container.querySelector<HTMLElement>('[data-diagram-region="heap"]');
    if (!stackCol || !heapCol) return;

    const stackRect = stackCol.getBoundingClientRect();
    const heapRect = heapCol.getBoundingClientRect();

    const gutterX =
      (stackRect.right + heapRect.left) / 2 - containerRect.left;
    const heapInternalLaneX = heapRect.left - containerRect.left - 14;

    const next: ArrowPath[] = [];

    for (const link of links) {
      const fromEl = container.querySelector<HTMLElement>(
        `[data-diagram-id="${link.from}"]`,
      );
      const toEl = container.querySelector<HTMLElement>(
        `[data-diagram-id="${link.to}"]`,
      );
      if (!fromEl || !toEl) continue;

      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();
      const [x1, y1] = getExitAnchor(link.from, fr, containerRect);
      const [x2, y2] = getEnterAnchor(link.to, tr, containerRect);

      let points: [number, number][];

      if (isStackLink(link.from)) {
        points = [
          [x1, y1],
          [gutterX, y1],
          [gutterX, y2],
          [x2, y2],
        ];
      } else {
        points = [
          [x1, y1],
          [heapInternalLaneX, y1],
          [heapInternalLaneX, y2],
          [x2, y2],
        ];
      }

      const highlight = !!link.highlight;

      next.push({
        key: `${link.from}-${link.to}`,
        d: pathBetween(points),
        fromRegion: linkFromRegion(link.from),
        highlight,
        z: highlight ? 2 : 1,
      });
    }

    next.sort((a, b) => a.z - b.z);
    setPaths(next);
  }, [containerRef, links]);

  useLayoutEffect(() => {
    updatePaths();
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updatePaths);
    observer.observe(container);
    window.addEventListener("resize", updatePaths);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePaths);
    };
  }, [containerRef, updatePaths]);

  if (paths.length === 0) return null;

  const markerStack = `diagram-arrow-stack-${uid.replace(/:/g, "")}`;
  const markerHeap = `diagram-arrow-heap-${uid.replace(/:/g, "")}`;
  const markerStackActive = `${markerStack}-active`;
  const markerHeapActive = `${markerHeap}-active`;

  const linkStroke = (fromRegion: "stack" | "heap", highlight: boolean) => {
    if (highlight) {
      return fromRegion === "stack"
        ? { className: "text-amber-600", opacity: 0.85 }
        : { className: "text-orange-600", opacity: 0.85 };
    }
    return fromRegion === "stack"
      ? { className: "text-violet-500", opacity: 0.55 }
      : { className: "text-orange-500", opacity: 0.55 };
  };

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      <defs>
        <marker
          id={markerStack}
          markerHeight="4"
          markerUnits="strokeWidth"
          markerWidth="4"
          orient="auto"
          refX="3.2"
          refY="2"
        >
          <path d="M0,0 L0,4 L4,2 z" fill="currentColor" />
        </marker>
        <marker
          id={markerHeap}
          markerHeight="4"
          markerUnits="strokeWidth"
          markerWidth="4"
          orient="auto"
          refX="3.2"
          refY="2"
        >
          <path d="M0,0 L0,4 L4,2 z" fill="currentColor" />
        </marker>
        <marker
          id={markerStackActive}
          markerHeight="4"
          markerUnits="strokeWidth"
          markerWidth="4"
          orient="auto"
          refX="3.2"
          refY="2"
        >
          <path d="M0,0 L0,4 L4,2 z" fill="#d97706" />
        </marker>
        <marker
          id={markerHeapActive}
          markerHeight="4"
          markerUnits="strokeWidth"
          markerWidth="4"
          orient="auto"
          refX="3.2"
          refY="2"
        >
          <path d="M0,0 L0,4 L4,2 z" fill="#ea580c" />
        </marker>
      </defs>
      {paths.map((path) => {
        const stroke = linkStroke(path.fromRegion, path.highlight);
        const markerId =
          path.fromRegion === "stack"
            ? path.highlight
              ? markerStackActive
              : markerStack
            : path.highlight
              ? markerHeapActive
              : markerHeap;

        return (
          <path
            key={path.key}
            className={stroke.className}
            d={path.d}
            fill="none"
            markerEnd={`url(#${markerId})`}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={stroke.opacity}
            strokeWidth={path.highlight ? 2 : 1.5}
          />
        );
      })}
    </svg>
  );
}

export function MemoryDiagramPanel({ memory, focused = false }: MemoryDiagramPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
          <span className="text-xs font-medium tracking-wide text-slate-600">
            메모리 다이어그램
          </span>
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm border border-amber-400 bg-amber-100" />
              이번 단계 변경
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-0.5 w-3 bg-violet-500/55" />
              스택 참조
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-0.5 w-3 bg-orange-500/55" />
              힙 참조
            </span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative overflow-x-auto p-4 pl-8 pr-8">
        <DiagramArrows containerRef={containerRef} links={memory.links} />

        <div className="grid min-w-[560px] gap-10 sm:grid-cols-2 sm:gap-16">
          <div data-diagram-region="stack">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              스택 (지역 변수)
            </p>
            <div className="space-y-2">
              {memory.stack.length === 0 ? (
                <p className="text-xs text-slate-400">—</p>
              ) : (
                memory.stack.map((slot) => <StackSlotBox key={slot.id} slot={slot} />)
              )}
            </div>
          </div>

          <div data-diagram-region="heap">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              힙 (객체·배열)
            </p>
            <div className="space-y-2">
              {memory.heap.length === 0 ? (
                <p className="text-xs text-slate-400">—</p>
              ) : (
                memory.heap.map((entry) => (
                  <HeapEntryBox key={entry.id} entry={entry} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
