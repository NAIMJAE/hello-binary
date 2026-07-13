import type { Problem } from "@/types/problem";
import { charArrayInsert2025_1 } from "./char-array-insert-2025-1";
import { doublePtrStepCustom01 } from "./double-ptr-step-custom-01";
import { listSwapHeadCustom01 } from "./list-swap-head-custom-01";
import { malloc2dSetSum2025_1 } from "./malloc-2d-set-sum-2025-1";
import { arrayAverage2026_1 } from "./array-average-2026-1";
import { circularQueue2025_2 } from "./circular-queue-2025-2";
import { doublePointerModArray2024_3 } from "./double-pointer-mod-array-2024-3";
import { linkedListReconnect2025_1 } from "./linked-list-reconnect-2025-1";
import { linkedListRelink2025_2 } from "./linked-list-relink-2025-2";
import { linkedListSwapNodes2024_3 } from "./linked-list-swap-nodes-2024-3";
import { linkedListReverseString2025_2 } from "./linked-list-reverse-string-2025-2";
import { linkedListXorSum2025_3 } from "./linked-list-xor-sum-2025-3";
import { operatorPrecedence2025_3 } from "./operator-precedence-2025-3";
import { splitAvgProductCustom01 } from "./split-avg-product-custom-01";
import { structDoublePointer2025_2 } from "./struct-double-pointer-2025-2";
import { structParityFoldCustom01 } from "./struct-parity-fold-custom-01";
import { structPointerOffset2025_3 } from "./struct-pointer-offset-2025-3";
import { structScoreDecrypt2025_1 } from "./struct-score-decrypt-2025-1";
import { structShiftXorCustom01 } from "./struct-shift-xor-custom-01";
import { stringLengthPutchar2025_3 } from "./string-length-putchar-2025-3";
import { staticVarFuncLoop2024_3 } from "./static-var-func-loop-2024-3";
import { ternaryIncMixCustom01 } from "./ternary-inc-mix-custom-01";

export const cProblems: Problem[] = [
  arrayAverage2026_1,
  staticVarFuncLoop2024_3,
  doublePointerModArray2024_3,
  charArrayInsert2025_1,
  malloc2dSetSum2025_1,
  structPointerOffset2025_3,
  structScoreDecrypt2025_1,
  stringLengthPutchar2025_3,
  linkedListXorSum2025_3,
  linkedListReconnect2025_1,
  operatorPrecedence2025_3,
  circularQueue2025_2,
  structDoublePointer2025_2,
  linkedListRelink2025_2,
  linkedListSwapNodes2024_3,
  linkedListReverseString2025_2,
  doublePtrStepCustom01,
  splitAvgProductCustom01,
  structParityFoldCustom01,
  structShiftXorCustom01,
  ternaryIncMixCustom01,
  listSwapHeadCustom01,
];

export const cProblemsBySlug: Record<string, Problem> = Object.fromEntries(
  cProblems.map((p) => [p.slug, p]),
);
