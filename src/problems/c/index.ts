import type { Problem } from "@/types/problem";
import { arrayAverage2026_1 } from "./array-average-2026-1";
import { circularQueue2025_2 } from "./circular-queue-2025-2";
import { linkedListRelink2025_2 } from "./linked-list-relink-2025-2";
import { linkedListReverseString2025_2 } from "./linked-list-reverse-string-2025-2";
import { linkedListXorSum2025_3 } from "./linked-list-xor-sum-2025-3";
import { operatorPrecedence2025_3 } from "./operator-precedence-2025-3";
import { structDoublePointer2025_2 } from "./struct-double-pointer-2025-2";
import { structPointerOffset2025_3 } from "./struct-pointer-offset-2025-3";
import { stringLengthPutchar2025_3 } from "./string-length-putchar-2025-3";

export const cProblems: Problem[] = [
  arrayAverage2026_1,
  structPointerOffset2025_3,
  stringLengthPutchar2025_3,
  linkedListXorSum2025_3,
  operatorPrecedence2025_3,
  circularQueue2025_2,
  structDoublePointer2025_2,
  linkedListRelink2025_2,
  linkedListReverseString2025_2,
];

export const cProblemsBySlug: Record<string, Problem> = Object.fromEntries(
  cProblems.map((p) => [p.slug, p]),
);
