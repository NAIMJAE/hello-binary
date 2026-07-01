"use client";

import { createPortal } from "react-dom";
import type { PointerDragState } from "./usePointerReorder";

type WorksheetDragOverlayProps = {
  drag: PointerDragState | null;
  children: React.ReactNode;
};

export function WorksheetDragOverlay({ drag, children }: WorksheetDragOverlayProps) {
  if (!drag || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: drag.x - drag.offsetX,
        top: drag.y - drag.offsetY,
        width: drag.width,
      }}
    >
      <div className="scale-[1.02] rounded-lg border border-amber-300 bg-white opacity-95 shadow-lg shadow-slate-300/50 ring-2 ring-amber-200/60">
        {children}
      </div>
    </div>,
    document.body,
  );
}
