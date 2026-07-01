"use client";

import { useEffect, useRef, useState } from "react";
import type { Problem } from "@/types/problem";
import { CodeLines } from "@/components/trace/ContentPanel";
import { ScratchCanvas } from "./ScratchCanvas";
import type { ScratchStroke } from "./scratchTypes";

/** 문제 본문 끝 아래 추가 필기·메모 공간 */
const DRAW_BOTTOM_PAD = 240;

type ScratchProblemPanelProps = {
  problem: Problem;
  strokes: ScratchStroke[];
  onStrokesChange: (strokes: ScratchStroke[]) => void;
  activeColor: string;
  activeTool: "pen" | "eraser";
  annotationVisible: boolean;
  forceShowAnnotations?: boolean;
  className?: string;
};

export function ScratchProblemPanel({
  problem,
  strokes,
  onStrokesChange,
  activeColor,
  activeTool,
  annotationVisible,
  forceShowAnnotations = false,
  className = "",
}: ScratchProblemPanelProps) {
  const codeLines = problem.code.split("\n");
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const innerEl = innerContentRef.current;
    const scrollEl = scrollRef.current;
    if (!innerEl || !scrollEl) return;

    const update = () => {
      setInnerHeight(innerEl.offsetHeight);
      setContentWidth(Math.max(innerEl.scrollWidth, scrollEl.clientWidth));
      setViewportHeight(scrollEl.clientHeight);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(innerEl);
    observer.observe(scrollEl);
    return () => observer.disconnect();
  }, [problem]);

  const padHeight = Math.max(DRAW_BOTTOM_PAD, viewportHeight - innerHeight);
  const overlayHeight = innerHeight + padHeight;

  return (
    <div className={`flex min-h-0 flex-col overflow-hidden bg-slate-50/50 ${className}`}>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto">
        <div
          className="relative"
          style={{ width: contentWidth, minHeight: overlayHeight }}
        >
          <div ref={innerContentRef} className="min-w-max">
            <div className="border-b border-slate-100 px-4 py-4">
              <p className="text-sm leading-relaxed text-slate-700">{problem.prompt}</p>
              {problem.input && (
                <p className="mt-2 text-sm text-slate-600">
                  입력값: <span className="font-mono text-slate-800">{problem.input}</span>
                </p>
              )}
            </div>
            <div>
              <p className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
                문제 코드
              </p>
              <CodeLines containScroll={false} lines={codeLines} showLegend={false} />
            </div>
            {problem.output && (
              <div>
                <p className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
                  출력값
                </p>
                <pre className="min-w-max p-4 font-mono text-sm leading-7 text-slate-800">
                  {problem.output}
                </pre>
              </div>
            )}
          </div>

          <div aria-hidden className="shrink-0" style={{ height: padHeight }} />

          {overlayHeight > 0 && contentWidth > 0 && (
            <div
              className="absolute inset-0"
              style={{ width: contentWidth, height: overlayHeight }}
            >
              <ScratchCanvas
                activeColor={activeColor}
                activeTool={activeTool}
                background="transparent"
                className="size-full"
                forceShowLayer={forceShowAnnotations}
                interactive={annotationVisible}
                layerVisible={annotationVisible}
                strokes={strokes}
                onStrokesChange={onStrokesChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
