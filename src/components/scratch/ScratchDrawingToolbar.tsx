"use client";

import { useState } from "react";
import { PEN_COLORS } from "./scratchTypes";

export type DrawingTool = "pen" | "eraser";

export type DrawingToolState = {
  activeColor: string;
  activeTool: DrawingTool;
};

type ScratchDrawingToolbarProps = {
  toolState: DrawingToolState;
  onSelectPen: (color: string) => void;
  onSelectEraser: () => void;
  onUndo: () => void;
  onClearAll: () => void;
  canUndo: boolean;
  compact?: boolean;
  className?: string;
  leading?: React.ReactNode;
};

export function ScratchDrawingToolbar({
  toolState,
  onSelectPen,
  onSelectEraser,
  onUndo,
  onClearAll,
  canUndo,
  compact = false,
  className = "",
  leading,
}: ScratchDrawingToolbarProps) {
  return (
    <div className={`flex shrink-0 items-center gap-1.5 ${className}`}>
      {leading}
      <div className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-slate-50 p-0.5">
        {PEN_COLORS.map((color) => (
          <button
            key={color}
            aria-label={`펜 색상 ${color}`}
            className={`rounded border-2 transition ${
              compact ? "h-5 w-5" : "h-6 w-6"
            } ${
              toolState.activeTool === "pen" && toolState.activeColor === color
                ? "border-amber-400 scale-110"
                : "border-transparent hover:border-slate-300"
            }`}
            style={{ backgroundColor: color }}
            type="button"
            onClick={() => onSelectPen(color)}
          />
        ))}
      </div>
      <button
        className={`rounded-md border px-2 py-1 text-[11px] font-medium transition ${
          toolState.activeTool === "eraser"
            ? "border-slate-400 bg-slate-200 text-slate-900"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        }`}
        type="button"
        onClick={onSelectEraser}
      >
        지우개
      </button>
      <button
        aria-label="한 획 되돌리기"
        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!canUndo}
        title="한 획 되돌리기"
        type="button"
        onClick={onUndo}
      >
        ↩
      </button>
      <button
        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!canUndo}
        title="초기화"
        type="button"
        onClick={onClearAll}
      >
        초기화
      </button>
    </div>
  );
}

export function useDrawingToolState(initialColor = PEN_COLORS[0]): [
  DrawingToolState,
  {
    selectPen: (color: string) => void;
    selectEraser: () => void;
  },
] {
  const [activeColor, setActiveColor] = useState<string>(initialColor);
  const [activeTool, setActiveTool] = useState<DrawingTool>("pen");

  return [
    { activeColor, activeTool },
    {
      selectPen: (color: string) => {
        setActiveColor(color);
        setActiveTool("pen");
      },
      selectEraser: () => setActiveTool("eraser"),
    },
  ];
}
