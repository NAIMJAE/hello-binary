"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Problem } from "@/types/problem";
import { buildScratchFilename, exportScratchImage } from "@/lib/exportScratchImage";
import { resolveWorksheet } from "@/lib/resolveWorksheet";
import { ScratchCanvas } from "./ScratchCanvas";
import { ScratchDrawingToolbar, useDrawingToolState } from "./ScratchDrawingToolbar";
import { ScratchGuide } from "./ScratchGuide";
import { ScratchProblemPanel } from "./ScratchProblemPanel";
import { ScratchResizableColumns } from "./ScratchResizableColumns";
import {
  createEmptyMemorySlots,
  createEmptyVariableRows,
  ScratchWorksheet,
} from "./ScratchWorksheet";
import type { ScratchStroke } from "./scratchTypes";

type ScratchViewerProps = {
  problem: Problem;
};

export function ScratchViewer({ problem }: ScratchViewerProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const worksheet = useMemo(() => resolveWorksheet(problem), [problem]);

  const [canvasStrokes, setCanvasStrokes] = useState<ScratchStroke[]>([]);
  const [problemStrokes, setProblemStrokes] = useState<ScratchStroke[]>([]);
  const [canvasTool, canvasToolActions] = useDrawingToolState();
  const [problemTool, problemToolActions] = useDrawingToolState();
  const [annotationVisible, setAnnotationVisible] = useState(true);
  const [forceShowAnnotations, setForceShowAnnotations] = useState(false);
  const [hasExported, setHasExported] = useState(false);
  const [variableRows, setVariableRows] = useState(() =>
    createEmptyVariableRows(worksheet.variableRows),
  );
  const [memorySlots, setMemorySlots] = useState(() =>
    createEmptyMemorySlots(worksheet.memorySlots),
  );
  const [exporting, setExporting] = useState(false);

  const isDirty = useMemo(() => {
    if (canvasStrokes.length > 0 || problemStrokes.length > 0) return true;
    if (variableRows.some((r) => r.name.trim() || r.value.trim())) return true;
    if (memorySlots.some((s) => s.label.trim() || s.value.trim())) return true;
    return false;
  }, [canvasStrokes, problemStrokes, variableRows, memorySlots]);

  const handleExport = async () => {
    if (!exportRef.current || exporting) return;
    setExporting(true);
    setForceShowAnnotations(true);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    try {
      await exportScratchImage(exportRef.current, buildScratchFilename(problem.slug));
      setHasExported(true);
    } catch (err) {
      console.error(err);
      window.alert("이미지 저장에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setForceShowAnnotations(false);
      setExporting(false);
    }
  };

  useEffect(() => {
    if (!isDirty || hasExported) return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty, hasExported]);

  const toggleAnnotation = useCallback(() => {
    setAnnotationVisible((v) => !v);
  }, []);

  const clearProblemStrokes = useCallback(() => {
    if (problemStrokes.length === 0) return;
    if (window.confirm("문제 영역 필기를 모두 지울까요?")) {
      setProblemStrokes([]);
    }
  }, [problemStrokes.length]);

  const clearCanvasStrokes = useCallback(() => {
    if (canvasStrokes.length === 0) return;
    if (window.confirm("그림판 필기를 모두 지울까요?")) {
      setCanvasStrokes([]);
    }
  }, [canvasStrokes.length]);

  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-medium text-amber-600">연습장</p>
            <ScratchGuide />
          </div>
          <h1 className="truncate text-sm font-bold text-slate-900">{problem.title}</h1>
        </div>
        <button
          className="shrink-0 rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={exporting}
          type="button"
          onClick={handleExport}
        >
          {exporting ? "저장 중…" : "이미지로 저장"}
        </button>
      </header>

      <ScratchResizableColumns containerRef={exportRef}>
        <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
          <div className="shrink-0 border-b border-slate-200 bg-white px-3 py-2">
            <div className="flex items-center justify-between gap-x-3 gap-y-2">
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs font-medium text-slate-500">문제</span>
                <button
                  className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                    annotationVisible
                      ? "border-amber-300 bg-amber-50 text-amber-800"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                  type="button"
                  onClick={toggleAnnotation}
                >
                  {annotationVisible ? "필기 켜짐" : "필기 꺼짐"}
                </button>
              </div>
              <ScratchDrawingToolbar
                canUndo={problemStrokes.length > 0}
                className="shrink-0"
                compact
                toolState={problemTool}
                onClearAll={clearProblemStrokes}
                onSelectEraser={problemToolActions.selectEraser}
                onSelectPen={problemToolActions.selectPen}
                onUndo={() => setProblemStrokes((s) => s.slice(0, -1))}
              />
            </div>
            {!annotationVisible && (
              <p className="mt-1.5 text-[10px] text-slate-400">
                필기 꺼짐 — 원문만 보입니다. 필기 레이어가 숨겨집니다.
              </p>
            )}
          </div>
          <ScratchProblemPanel
            className="min-h-0 flex-1"
            activeColor={problemTool.activeColor}
            activeTool={problemTool.activeTool}
            annotationVisible={annotationVisible}
            forceShowAnnotations={forceShowAnnotations}
            problem={problem}
            strokes={problemStrokes}
            onStrokesChange={setProblemStrokes}
          />
        </div>

        <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
          <div className="flex shrink-0 items-center justify-between gap-x-3 gap-y-2 border-b border-slate-100 bg-slate-50 px-3 py-2">
            <span className="shrink-0 text-xs font-medium text-slate-500">
              그림판 — 필기·화살표·메모
            </span>
            <ScratchDrawingToolbar
              canUndo={canvasStrokes.length > 0}
              className="shrink-0"
              compact
              toolState={canvasTool}
              onClearAll={clearCanvasStrokes}
              onSelectEraser={canvasToolActions.selectEraser}
              onSelectPen={canvasToolActions.selectPen}
              onUndo={() => setCanvasStrokes((s) => s.slice(0, -1))}
            />
          </div>
          <div className="relative min-h-0 overflow-hidden">
            <ScratchCanvas
              activeColor={canvasTool.activeColor}
              activeTool={canvasTool.activeTool}
              background="white"
              className="absolute inset-0 size-full"
              strokes={canvasStrokes}
              onStrokesChange={setCanvasStrokes}
            />
          </div>
        </div>

        <div className="h-full min-h-0 overflow-hidden">
          <ScratchWorksheet
            config={worksheet}
            memorySlots={memorySlots}
            variableRows={variableRows}
            onMemorySlotsChange={setMemorySlots}
            onVariableRowsChange={setVariableRows}
          />
        </div>
      </ScratchResizableColumns>
    </div>
  );
}
