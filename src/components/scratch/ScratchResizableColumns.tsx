"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_COLUMN_PCT = 16;
const DEFAULT_SPLITS = [33.33, 66.66] as const;
const WORKSHEET_STRIP_PX = 40;

type ScratchResizableColumnsProps = {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  worksheetCollapsed?: boolean;
  onExpandWorksheet?: () => void;
};

function ColumnHandle({
  onPointerDown,
}: {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      aria-orientation="vertical"
      className="relative w-0 shrink-0 pointer-events-none"
      role="separator"
    >
      <div
        className="pointer-events-auto absolute top-0 bottom-0 -left-1.5 z-20 w-3 cursor-col-resize"
        onPointerDown={onPointerDown}
      />
    </div>
  );
}

function WorksheetExpandStrip({ onExpand }: { onExpand: () => void }) {
  return (
    <button
      aria-label="워크시트 펼치기"
      className="flex h-full w-10 shrink-0 flex-col items-center justify-center gap-1 border-l border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-amber-50 hover:text-amber-800"
      type="button"
      onClick={onExpand}
    >
      <span aria-hidden className="text-xs">
        ◀
      </span>
      <span
        className="text-[10px] font-medium tracking-wide"
        style={{ writingMode: "vertical-rl" }}
      >
        워크시트
      </span>
    </button>
  );
}

export function ScratchResizableColumns({
  children,
  className = "",
  containerRef,
  worksheetCollapsed = false,
  onExpandWorksheet,
}: ScratchResizableColumnsProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const savedSplitsRef = useRef<[number, number] | null>(null);
  const splitsRef = useRef<[number, number]>([...DEFAULT_SPLITS]);
  const prevCollapsedRef = useRef(worksheetCollapsed);

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (containerRef && "current" in containerRef) {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [containerRef],
  );

  const [splits, setSplits] = useState<[number, number]>([...DEFAULT_SPLITS]);
  splitsRef.current = splits;

  useEffect(() => {
    const wasCollapsed = prevCollapsedRef.current;
    if (!wasCollapsed && worksheetCollapsed) {
      savedSplitsRef.current = splitsRef.current;
    }
    if (wasCollapsed && !worksheetCollapsed && savedSplitsRef.current) {
      setSplits(savedSplitsRef.current);
      savedSplitsRef.current = null;
    }
    prevCollapsedRef.current = worksheetCollapsed;
  }, [worksheetCollapsed]);

  const dragRef = useRef<{
    handle: 0 | 1;
    startX: number;
    startSplits: [number, number];
    collapsed: boolean;
  } | null>(null);

  const clampSplits = useCallback(
    (next: [number, number], collapsed: boolean): [number, number] => {
      let [s1, s2] = next;
      if (collapsed) {
        const stripPct =
          innerRef.current && innerRef.current.getBoundingClientRect().width > 0
            ? (WORKSHEET_STRIP_PX / innerRef.current.getBoundingClientRect().width) * 100
            : 4;
        const maxS1 = 100 - MIN_COLUMN_PCT - stripPct;
        s1 = Math.max(MIN_COLUMN_PCT, Math.min(s1, maxS1));
        return [s1, s2];
      }
      s1 = Math.max(MIN_COLUMN_PCT, Math.min(s1, 100 - MIN_COLUMN_PCT * 2));
      s2 = Math.max(s1 + MIN_COLUMN_PCT, Math.min(s2, 100 - MIN_COLUMN_PCT));
      return [s1, s2];
    },
    [],
  );

  const startDrag = (handle: 0 | 1) => (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = {
      handle,
      startX: e.clientX,
      startSplits: [...splitsRef.current],
      collapsed: worksheetCollapsed,
    };

    const onMove = (ev: PointerEvent) => {
      const drag = dragRef.current;
      const container = innerRef.current;
      if (!drag || !container) return;

      const width = container.getBoundingClientRect().width;
      if (width <= 0) return;

      const deltaPct = ((ev.clientX - drag.startX) / width) * 100;
      const [start1, start2] = drag.startSplits;

      if (drag.collapsed || drag.handle === 0) {
        setSplits(clampSplits([start1 + deltaPct, start2], drag.collapsed));
      } else {
        setSplits(clampSplits([start1, start2 + deltaPct], false));
      }
    };

    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const [split1, split2] = splits;

  if (worksheetCollapsed) {
    return (
      <div ref={setContainerRef} className={`flex h-full min-h-0 min-w-0 flex-1 ${className}`}>
        <div
          className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
          style={{ width: `${split1}%` }}
        >
          {children[0]}
        </div>
        <ColumnHandle onPointerDown={startDrag(0)} />
        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-l border-slate-200">
          {children[1]}
        </div>
        {onExpandWorksheet && <WorksheetExpandStrip onExpand={onExpandWorksheet} />}
      </div>
    );
  }

  return (
    <div ref={setContainerRef} className={`flex h-full min-h-0 min-w-0 flex-1 ${className}`}>
      <div
        className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
        style={{ width: `${split1}%` }}
      >
        {children[0]}
      </div>
      <ColumnHandle onPointerDown={startDrag(0)} />
      <div
        className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden border-l border-slate-200"
        style={{ width: `${split2 - split1}%` }}
      >
        {children[1]}
      </div>
      <ColumnHandle onPointerDown={startDrag(1)} />
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-l border-slate-200">
        {children[2]}
      </div>
    </div>
  );
}
