import type { Problem } from "@/types/problem";
import { abstractTemplateCustom01 } from "./abstract-template-custom-01";
import { binarySearchBlankCustom01 } from "./binary-search-blank-custom-01";
import { ctorPolyFieldCustom01 } from "./ctor-poly-field-custom-01";
import { enumValuesIndex2025_3 } from "./enum-values-index-2025-3";
import { ifaceMultiPolyCustom01 } from "./iface-multi-poly-custom-01";
import { overloadRecursiveCustom01 } from "./overload-recursive-custom-01";
import { overrideStaticCastCustom01 } from "./override-static-cast-custom-01";
import { genericOverloadPrint2024_3 } from "./generic-overload-print-2024-3";
import { inheritanceFieldOverride2024_3 } from "./inheritance-field-override-2024-3";
import { inheritanceConstructorOverride2025_1 } from "./inheritance-constructor-override-2025-1";
import { interfaceImplements2025_3 } from "./interface-implements-2025-3";
import { lambdaExceptionCatch2025_2 } from "./lambda-exception-catch-2025-2";
import { methodOverloadPolymorphism2026_1 } from "./method-overload-polymorphism-2026-1";
import { nullPointerCatchFinally2024_3 } from "./null-pointer-catch-finally-2024-3";
import { objectArraySwap2025_2 } from "./object-array-swap-2025-2";
import { recursiveCalcOverload2025_1 } from "./recursive-calc-overload-2025-1";
import { recursiveArrayFunc2025_1 } from "./recursive-array-func-2025-1";
import { referenceMemoryDiagram2026_1 } from "./reference-memory-diagram-2026-1";
import { staticOverridePolymorphism2025_2 } from "./static-override-polymorphism-2025-2";
import { stringArrayPassByValue2025_2 } from "./string-array-pass-by-value-2025-2";
import { stringConcat2026_1 } from "./string-concat-2026-1";
import { stringEqualsArrayLoop2024_3 } from "./string-equals-array-loop-2024-3";
import { superConstructor2025_3 } from "./super-constructor-2025-3";
import { tryCatchFinally2025_1 } from "./try-catch-finally-2025-1";

export const javaProblems: Problem[] = [
  referenceMemoryDiagram2026_1,
  methodOverloadPolymorphism2026_1,
  stringConcat2026_1,
  tryCatchFinally2025_1,
  nullPointerCatchFinally2024_3,
  genericOverloadPrint2024_3,
  inheritanceFieldOverride2024_3,
  inheritanceConstructorOverride2025_1,
  recursiveArrayFunc2025_1,
  recursiveCalcOverload2025_1,
  interfaceImplements2025_3,
  superConstructor2025_3,
  enumValuesIndex2025_3,
  stringArrayPassByValue2025_2,
  lambdaExceptionCatch2025_2,
  staticOverridePolymorphism2025_2,
  objectArraySwap2025_2,
  stringEqualsArrayLoop2024_3,
  overrideStaticCastCustom01,
  ctorPolyFieldCustom01,
  abstractTemplateCustom01,
  ifaceMultiPolyCustom01,
  overloadRecursiveCustom01,
  binarySearchBlankCustom01,
];

export const javaProblemsBySlug: Record<string, Problem> = Object.fromEntries(
  javaProblems.map((p) => [p.slug, p]),
);
