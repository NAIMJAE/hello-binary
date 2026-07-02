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

/** classic = 기존 카드형 스냅샷, diagram = 주소·참조 다이어그램 */
export type MemoryViewMode = "classic" | "diagram";

export type MemoryDiagramStackSlot = {
  id: string;
  name: string;
  type: string;
  address: string;
  value: string;
  kind: "primitive" | "reference";
  refTo?: string;
  highlight?: boolean;
  carriedOver?: boolean;
};

export type MemoryDiagramHeapField = {
  name: string;
  type: string;
  value: string;
  kind: "primitive" | "reference";
  refTo?: string;
  highlight?: boolean;
};

export type MemoryDiagramHeapObject = {
  id: string;
  kind: "object";
  address: string;
  typeName: string;
  fields: MemoryDiagramHeapField[];
  highlight?: boolean;
};

export type MemoryDiagramHeapArrayElement = {
  index: number;
  kind: "primitive" | "reference" | "null";
  value?: string;
  refTo?: string;
  refLabel?: string;
  highlight?: boolean;
};

export type MemoryDiagramHeapArray = {
  id: string;
  kind: "array";
  address: string;
  typeName: string;
  elements: MemoryDiagramHeapArrayElement[];
  highlight?: boolean;
};

export type MemoryDiagramHeapEntry =
  | MemoryDiagramHeapObject
  | MemoryDiagramHeapArray;

export type MemoryDiagramLink = {
  from: string;
  to: string;
  highlight?: boolean;
};

export type MemoryDiagramSnapshot = {
  stack: MemoryDiagramStackSlot[];
  heap: MemoryDiagramHeapEntry[];
  links: MemoryDiagramLink[];
};

export type TraceStep = {
  line: number;
  relatedLines?: RelatedLine[];
  comment: string;
  variables: Variable[];
  stdout?: string;
  memory?: MemorySnapshot;
  memoryDiagram?: MemoryDiagramSnapshot;
};

export type WorksheetConfig = {
  variableRows: number;
  memorySlots: number;
  /** C 포인터·연결리스트 등 — 그림판 화살표 안내만 표시 */
  showArrowHints?: boolean;
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
  worksheet?: WorksheetConfig;
  /** 미지정 시 classic. diagram이면 memoryDiagram 기반 UI 사용 */
  memoryView?: MemoryViewMode;
};
