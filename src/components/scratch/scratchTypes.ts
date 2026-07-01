export type ScratchStroke = {
  tool: "pen" | "eraser";
  color?: string;
  width: number;
  points: { x: number; y: number }[];
};

export const PEN_COLORS = ["#0f172a", "#dc2626", "#2563eb", "#16a34a", "#ea580c"] as const;

export const PEN_WIDTH = 2.5;
export const ERASER_WIDTH = 18;
