import type { DrawingTool } from "./ScratchDrawingToolbar";

function svgCursor(svg: string, hotspotX: number, hotspotY: number, fallback: string) {
  const encoded = encodeURIComponent(svg);
  return `url("data:image/svg+xml,${encoded}") ${hotspotX} ${hotspotY}, ${fallback}`;
}

export function getDrawingCursor(tool: DrawingTool, color: string): string {
  if (tool === "eraser") {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><rect x="5" y="8" width="14" height="10" rx="2" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/><rect x="7" y="10" width="10" height="6" rx="1" fill="#cbd5e1"/></svg>`;
    return svgCursor(svg, 12, 12, "cell");
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><circle cx="12" cy="12" r="5" fill="${color}" stroke="white" stroke-width="2"/><line x1="12" y1="2" x2="12" y2="22" stroke="${color}" stroke-width="1.5" opacity="0.35"/><line x1="2" y1="12" x2="22" y2="12" stroke="${color}" stroke-width="1.5" opacity="0.35"/></svg>`;
  return svgCursor(svg, 12, 12, "crosshair");
}
