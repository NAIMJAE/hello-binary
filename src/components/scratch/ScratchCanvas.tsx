"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { drawStroke, redrawCanvas } from "./drawingUtils";
import { getDrawingCursor } from "./drawingCursors";
import type { ScratchStroke } from "./scratchTypes";
import { ERASER_WIDTH, PEN_WIDTH } from "./scratchTypes";

type ScratchCanvasProps = {
  strokes: ScratchStroke[];
  onStrokesChange: (strokes: ScratchStroke[]) => void;
  activeColor: string;
  activeTool: "pen" | "eraser";
  background?: "white" | "transparent";
  /** 필기 레이어 표시 (false면 투명·클릭 통과, stroke는 유지) */
  layerVisible?: boolean;
  /**보내기 등 일시적으로 필기 표시 */
  forceShowLayer?: boolean;
  interactive?: boolean;
  className?: string;
};

export function ScratchCanvas({
  strokes,
  onStrokesChange,
  activeColor,
  activeTool,
  background = "white",
  layerVisible = true,
  forceShowLayer = false,
  interactive = true,
  className = "",
}: ScratchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const currentStrokeRef = useRef<ScratchStroke | null>(null);
  const strokesRef = useRef(strokes);
  const activeToolRef = useRef(activeTool);
  const activeColorRef = useRef(activeColor);
  const canDrawRef = useRef(interactive && layerVisible);
  const pointerCleanupRef = useRef<(() => void) | null>(null);
  strokesRef.current = strokes;
  activeToolRef.current = activeTool;
  activeColorRef.current = activeColor;
  canDrawRef.current = interactive && layerVisible;

  const showLayer = layerVisible || forceShowLayer;
  const canDraw = interactive && layerVisible;
  const drawingCursor =
    canDraw && showLayer ? getDrawingCursor(activeTool, activeColor) : undefined;

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    redrawCanvas(canvas, strokesRef.current, background);
  }, [background]);

  useLayoutEffect(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => resizeCanvas());
    observer.observe(container);
    return () => observer.disconnect();
  }, [resizeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) redrawCanvas(canvas, strokes, background);
  }, [strokes, background]);

  const clientToPoint = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const appendPoint = useCallback((clientX: number, clientY: number) => {
    if (!drawingRef.current || !currentStrokeRef.current) return;
    const point = clientToPoint(clientX, clientY);
    currentStrokeRef.current.points.push(point);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawStroke(ctx, currentStrokeRef.current);
  }, [clientToPoint]);

  const finishStroke = useCallback(() => {
    pointerCleanupRef.current?.();
    pointerCleanupRef.current = null;
    if (!drawingRef.current || !currentStrokeRef.current) return;
    drawingRef.current = false;
    if (currentStrokeRef.current.points.length >= 2) {
      const stroke = currentStrokeRef.current;
      onStrokesChange([...strokesRef.current, stroke]);
    }
    currentStrokeRef.current = null;
  }, [onStrokesChange]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canDrawRef.current) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const point = clientToPoint(e.clientX, e.clientY);
    currentStrokeRef.current = {
      tool: activeToolRef.current,
      color: activeToolRef.current === "pen" ? activeColorRef.current : undefined,
      width: activeToolRef.current === "eraser" ? ERASER_WIDTH : PEN_WIDTH,
      points: [point],
    };

    const pointerId = e.pointerId;

    const onWindowMove = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      appendPoint(ev.clientX, ev.clientY);
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowEnd);
      window.removeEventListener("pointercancel", onWindowEnd);
    };

    const onWindowEnd = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      finishStroke();
    };

    pointerCleanupRef.current?.();
    pointerCleanupRef.current = cleanup;
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowEnd);
    window.addEventListener("pointercancel", onWindowEnd);
  };

  useEffect(() => () => pointerCleanupRef.current?.(), []);

  return (
    <div
      ref={containerRef}
      className={`min-h-0 min-w-0 ${background === "white" ? "bg-white" : ""} ${className || "relative size-full"}`}
      style={drawingCursor ? { cursor: drawingCursor } : undefined}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 touch-none transition-opacity ${
          showLayer ? "opacity-100" : "opacity-0"
        } ${canDraw ? "pointer-events-auto" : "pointer-events-none"}`}
        style={drawingCursor ? { cursor: drawingCursor } : undefined}
        onPointerCancel={finishStroke}
        onPointerDown={handlePointerDown}
      />
    </div>
  );
}
