import type { Problem } from "@/types/problem";
import { binaryTreeCalc2025_1 } from "./binary-tree-calc-2025-1";
import { dictEnumerateSum2025_3 } from "./dict-enumerate-sum-2025-3";
import { dictSetIntersection2025_2 } from "./dict-set-intersection-2025-2";
import { dictSetMutateSumCustom01 } from "./dict-set-mutate-sum-custom-01";
import { humanDev2026_1 } from "./human-dev-2026-1";
import { listReverseSwapSum2024_3 } from "./list-reverse-swap-sum-2024-3";
import { listSlicePrint2026_1 } from "./list-slice-print-2026-1";
import { nestedCompMutateCustom01 } from "./nested-comp-mutate-custom-01";
import { nestedListShallowCopy2026_1 } from "./nested-list-shallow-copy-2026-1";
import { oddLenCompJoinCustom01 } from "./odd-len-comp-join-custom-01";
import { recursiveParitySumCustom01 } from "./recursive-parity-sum-custom-01";
import { rotateSplitSliceCustom01 } from "./rotate-split-slice-custom-01";
import { strideSliceJoinCustom01 } from "./stride-slice-join-custom-01";
import { typeCheckBranchReturn2024_3 } from "./type-check-branch-return-2024-3";

export const pythonProblems: Problem[] = [
  humanDev2026_1,
  listSlicePrint2026_1,
  typeCheckBranchReturn2024_3,
  listReverseSwapSum2024_3,
  nestedListShallowCopy2026_1,
  dictEnumerateSum2025_3,
  dictSetIntersection2025_2,
  binaryTreeCalc2025_1,
  oddLenCompJoinCustom01,
  nestedCompMutateCustom01,
  strideSliceJoinCustom01,
  rotateSplitSliceCustom01,
  dictSetMutateSumCustom01,
  recursiveParitySumCustom01,
];

export const pythonProblemsBySlug: Record<string, Problem> = Object.fromEntries(
  pythonProblems.map((p) => [p.slug, p]),
);
