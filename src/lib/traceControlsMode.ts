import type { TraceControlsMode } from "@/components/trace/TraceControls";

const STORAGE_KEY = "trace-controls-mode";

export function readTraceControlsMode(): TraceControlsMode {
  if (typeof window === "undefined") return "inline";
  return localStorage.getItem(STORAGE_KEY) === "dock" ? "dock" : "inline";
}

export function writeTraceControlsMode(mode: TraceControlsMode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, mode);
}
