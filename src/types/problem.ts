export type VariableValue = string | number | boolean | null | VariableValue[];

export type Variable = {
  name: string;
  type: string;
  value: VariableValue;
  highlight?: boolean;
};

export type RelatedLineRole = "call" | "definition" | "read";

export type RelatedLine = {
  line: number;
  role: RelatedLineRole;
  label?: string;
};

export type MemoryRegion = "stack" | "heap" | "data";

export type MemoryCell = {
  id: string;
  region: MemoryRegion;
  label: string;
  value: string;
  address?: string;
  highlight?: boolean;
  /** 이전 단계에서 이어진 셀 (이번 단계에서 갱신되지 않음) */
  carriedOver?: boolean;
};

export type MemoryArrow = {
  from: string;
  to: string;
  label?: string;
  highlight?: boolean;
};

export type MemorySnapshot = {
  cells: MemoryCell[];
  arrows: MemoryArrow[];
};

export type TraceStep = {
  line: number;
  relatedLines?: RelatedLine[];
  comment: string;
  variables: Variable[];
  stdout?: string;
  memory?: MemorySnapshot;
};

export type Problem = {
  id: string;
  slug: string;
  title: string;
  topic: string;
  difficulty: "쉬움" | "보통" | "어려움";
  source: string;
  estimatedMinutes: number;
  prompt: string;
  input?: string;
  output?: string;
  code: string;
  answer: string;
  explanation: string;
  traceSteps: TraceStep[];
};
