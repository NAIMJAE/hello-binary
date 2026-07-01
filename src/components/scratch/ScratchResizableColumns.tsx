"use client";

import { useCallback, useRef, useState } from "react";

const MIN_COLUMN_PCT = 16;
const DEFAULT_SPLITS = [33.33, 66.66] as const;

type ScratchResizableColumnsProps = {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
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

export function ScratchResizableColumns({
  children,
  className = "",
  containerRef,
}: ScratchResizableColumnsProps) {
  const innerRef = useRef<HTMLDivElement>(null);
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
  const dragRef = useRef<{
    handle: 0 | 1;
    startX: number;
    startSplits: [number, number];
  } | null>(null);

  const clampSplits = useCallback((next: [number, number]): [number, number] => {
    let [s1, s2] = next;
    s1 = Math.max(MIN_COLUMN_PCT, Math.min(s1, 100 - MIN_COLUMN_PCT * 2));
    s2 = Math.max(s1 + MIN_COLUMN_PCT, Math.min(s2, 100 - MIN_COLUMN_PCT));
    return [s1, s2];
  }, []);

  const startDrag = (handle: 0 | 1) => (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = { handle, startX: e.clientX, startSplits: [...splits] };

    const onMove = (ev: PointerEvent) => {
      const drag = dragRef.current;
      const container = innerRef.current;
      if (!drag || !container) return;

      const width = container.getBoundingClientRect().width;
      if (width <= 0) return;

      const deltaPct = ((ev.clientX - drag.startX) / width) * 100;
      const [start1, start2] = drag.startSplits;

      if (drag.handle === 0) {
        setSplits(clampSplits([start1 + deltaPct, start2]));
      } else {
        setSplits(clampSplits([start1, start2 + deltaPct]));
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
