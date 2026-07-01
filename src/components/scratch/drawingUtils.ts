import type { ScratchStroke } from "./scratchTypes";

export function drawStroke(ctx: CanvasRenderingContext2D, stroke: ScratchStroke) {
  if (stroke.points.length < 2) return;

  if (stroke.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = stroke.color ?? "#0f172a";
  }

  ctx.lineWidth = stroke.width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  for (let i = 1; i < stroke.points.length; i++) {
    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
  }
  ctx.stroke();
}

export function redrawCanvas(
  canvas: HTMLCanvasElement,
  strokes: ScratchStroke[],
  background: "white" | "transparent",
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (background === "white") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }

  for (const stroke of strokes) {
    drawStroke(ctx, stroke);
  }
  ctx.globalCompositeOperation = "source-over";
}
