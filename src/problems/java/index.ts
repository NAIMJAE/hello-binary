import type { Problem } from "@/types/problem";
import { enumValuesIndex2025_3 } from "./enum-values-index-2025-3";
import { interfaceImplements2025_3 } from "./interface-implements-2025-3";
import { lambdaExceptionCatch2025_2 } from "./lambda-exception-catch-2025-2";
import { methodOverloadPolymorphism2026_1 } from "./method-overload-polymorphism-2026-1";
import { objectArraySwap2025_2 } from "./object-array-swap-2025-2";
import { staticOverridePolymorphism2025_2 } from "./static-override-polymorphism-2025-2";
import { stringArrayPassByValue2025_2 } from "./string-array-pass-by-value-2025-2";
import { stringConcat2026_1 } from "./string-concat-2026-1";
import { superConstructor2025_3 } from "./super-constructor-2025-3";

export const javaProblems: Problem[] = [
  methodOverloadPolymorphism2026_1,
  stringConcat2026_1,
  interfaceImplements2025_3,
  superConstructor2025_3,
  enumValuesIndex2025_3,
  stringArrayPassByValue2025_2,
  lambdaExceptionCatch2025_2,
  staticOverridePolymorphism2025_2,
  objectArraySwap2025_2,
];

export const javaProblemsBySlug: Record<string, Problem> = Object.fromEntries(
  javaProblems.map((p) => [p.slug, p]),
);
