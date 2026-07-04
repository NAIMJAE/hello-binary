"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_PCT = 24;
const DEFAULT_SPLIT = 50;
const STORAGE_KEY = "trace-column-split";

type TraceResizableSplitProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
};

export function TraceResizableSplit({ left, right, className = "" }: TraceResizableSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPct, setSplitPct] = useState(DEFAULT_SPLIT);
  const splitRef = useRef(splitPct);
  splitRef.current = splitPct;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const n = Number(saved);
    if (!Number.isNaN(n)) {
      setSplitPct(Math.max(MIN_PCT, Math.min(100 - MIN_PCT, n)));
    }
  }, []);

  const startDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startSplit = splitRef.current;

    const onMove = (ev: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const width = container.getBoundingClientRect().width;
      if (width <= 0) return;
      const deltaPct = ((ev.clientX - startX) / width) * 100;
      const next = Math.max(MIN_PCT, Math.min(100 - MIN_PCT, startSplit + deltaPct));
      setSplitPct(next);
    };

    const onUp = () => {
      localStorage.setItem(STORAGE_KEY, String(splitRef.current));
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex min-h-0 flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0 ${className}`}
      style={{ "--trace-split": `${splitPct}%` } as React.CSSProperties}
    >
      <div className="min-w-0 w-full lg:w-[var(--trace-split)] lg:min-w-0 lg:shrink-0">
        {left}
      </div>

      <div
        aria-orientation="vertical"
        aria-valuenow={splitPct}
        className="relative hidden shrink-0 self-stretch lg:block lg:w-px lg:bg-slate-200"
        role="separator"
      >
        <div
          className="absolute inset-y-0 -left-1.5 z-10 w-3 cursor-col-resize touch-none transition-colors hover:bg-amber-200/50 active:bg-amber-300/60"
          onPointerDown={startDrag}
        />
      </div>

      <div className="min-w-0 flex-1 lg:pl-6">{right}</div>
    </div>
  );
}
