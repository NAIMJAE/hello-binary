import type { Problem } from "@/types/problem";

const code = `raw = "hello-binary-code"
parts = raw.split("-")
mid = "".join(p[1:] + p[0] for p in parts)
print(mid[::-2])`;

export const rotateSplitSliceCustom01: Problem = {
  id: "rotate-split-slice-custom-01",
  slug: "rotate-split-slice-custom-01",
  title: "split 회전 join과 역간격 슬라이스",
  topic: "문자열",
  difficulty: "보통",
  source: "커스텀-004",
  estimatedMinutes: 7,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "cdbrnhle",
  explanation: `여기서 많이 틀립니다: mid[::-1](역순)과 mid[::-2](2칸 건너뛰기 역순)를 혼동하거나, join 결과 문자열의 길이를 잘못 세어 인덱스가 어긋납니다.

1. split("-") → ["hello", "binary", "code"] (3개 토큰)

2. 생성기 p[1:]+p[0]은 첫 글자를 맨 뒤로 보내는 "왼쪽 회전"입니다:
   - "hello" → "ello"+"h" = "elloh"
   - "binary" → "inary"+"b" = "inaryb"
   - "code" → "ode"+"c" = "odec"
   "".join → mid = "ellohinarybodec" (길이 15)

3. mid[::-2]: 끝에서 시작해 2칸씩 역방향 (인덱스 14,12,10,8,6,4,2,0)
   e(0) l(1) l(2) o(3) h(4) i(5) n(6) a(7) r(8) y(9) b(10) o(11) d(12) e(13) c(14)
   14→c, 12→d, 10→b, 8→r, 6→n, 4→h, 2→l, 0→e → "cdbrnhle"`,
  traceSteps: [
    {
      "line": 1,
      "comment": "프로그램이 시작됩니다.",
      "variables": []
    },
    {
      "line": 1,
      "comment": "raw = \"hello-binary-code\" — 하이픈이 2개 포함된 문자열입니다.",
      "variables": [
        { "name": "raw", "type": "str", "value": "hello-binary-code", "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_raw", "region": "data", "label": "raw", "value": "\"hello-binary-code\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "raw.split(\"-\") — 구분자 \"-\"를 기준으로 문자열을 잘라 리스트를 만듭니다.",
      "variables": [
        { "name": "raw", "type": "str", "value": "hello-binary-code" }
      ],
      "relatedLines": [
        { "line": 1, "role": "read", "label": "raw 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_raw", "region": "data", "label": "raw", "value": "\"hello-binary-code\"", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "parts = [\"hello\", \"binary\", \"code\"] — \"-\" 기준으로 3개 토큰이 생성됩니다.",
      "variables": [
        { "name": "raw", "type": "str", "value": "hello-binary-code" },
        { "name": "parts", "type": "list", "value": ["hello", "binary", "code"], "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_raw", "region": "data", "label": "raw", "value": "\"hello-binary-code\"", "highlight": false },
          { "id": "data_parts", "region": "data", "label": "parts", "value": "[\"hello\", \"binary\", \"code\"]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "\"\".join(생성기) 진입 — for p in parts에서 각 p에 대해 p[1:]+p[0] (첫 글자를 뒤로 보내는 왼쪽 회전)을 수행합니다. 첫 번째 p = \"hello\"",
      "variables": [
        { "name": "parts", "type": "list", "value": ["hello", "binary", "code"] },
        { "name": "p", "type": "str", "value": "hello", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "parts 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_parts", "region": "data", "label": "parts", "value": "[\"hello\", \"binary\", \"code\"]", "highlight": false },
          { "id": "stack_p", "region": "stack", "label": "p", "value": "\"hello\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "p = \"hello\" → p[1:] = \"ello\" (인덱스 1부터 끝까지), p[0] = \"h\" (첫 글자)",
      "variables": [
        { "name": "p", "type": "str", "value": "hello" },
        { "name": "p[1:]", "type": "str", "value": "ello", "highlight": true },
        { "name": "p[0]", "type": "str", "value": "h", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "parts 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "\"hello\"", "highlight": false },
          { "id": "data_p_slice", "region": "data", "label": "p[1:]", "value": "\"ello\"", "highlight": true },
          { "id": "data_p_0", "region": "data", "label": "p[0]", "value": "\"h\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "p[1:] + p[0] = \"ello\" + \"h\" = \"elloh\" — 첫 번째 조각이 완성됩니다.",
      "variables": [
        { "name": "p", "type": "str", "value": "hello" },
        { "name": "p[1:]+p[0]", "type": "str", "value": "elloh", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "parts 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "\"hello\"", "highlight": false },
          { "id": "data_piece", "region": "data", "label": "p[1:]+p[0]", "value": "\"elloh\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "다음 p = \"binary\" → p[1:] = \"inary\", p[0] = \"b\"",
      "variables": [
        { "name": "p", "type": "str", "value": "binary", "highlight": true },
        { "name": "p[1:]", "type": "str", "value": "inary", "highlight": true },
        { "name": "p[0]", "type": "str", "value": "b", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "parts 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "\"binary\"", "highlight": true },
          { "id": "data_p_slice", "region": "data", "label": "p[1:]", "value": "\"inary\"", "highlight": true },
          { "id": "data_p_0", "region": "data", "label": "p[0]", "value": "\"b\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "p[1:] + p[0] = \"inary\" + \"b\" = \"inaryb\" — 두 번째 조각이 완성됩니다.",
      "variables": [
        { "name": "p", "type": "str", "value": "binary" },
        { "name": "p[1:]+p[0]", "type": "str", "value": "inaryb", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "parts 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "\"binary\"", "highlight": false },
          { "id": "data_piece", "region": "data", "label": "p[1:]+p[0]", "value": "\"inaryb\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "다음 p = \"code\" → p[1:] = \"ode\", p[0] = \"c\"",
      "variables": [
        { "name": "p", "type": "str", "value": "code", "highlight": true },
        { "name": "p[1:]", "type": "str", "value": "ode", "highlight": true },
        { "name": "p[0]", "type": "str", "value": "c", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "parts 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "\"code\"", "highlight": true },
          { "id": "data_p_slice", "region": "data", "label": "p[1:]", "value": "\"ode\"", "highlight": true },
          { "id": "data_p_0", "region": "data", "label": "p[0]", "value": "\"c\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "p[1:] + p[0] = \"ode\" + \"c\" = \"odec\" — 세 번째(마지막) 조각이 완성됩니다.",
      "variables": [
        { "name": "p", "type": "str", "value": "code" },
        { "name": "p[1:]+p[0]", "type": "str", "value": "odec", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "parts 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "\"code\"", "highlight": false },
          { "id": "data_piece", "region": "data", "label": "p[1:]+p[0]", "value": "\"odec\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "\"\".join([\"elloh\", \"inaryb\", \"odec\"]) = \"ellohinarybodec\" → mid에 대입합니다. 길이 15.",
      "variables": [
        { "name": "raw", "type": "str", "value": "hello-binary-code" },
        { "name": "parts", "type": "list", "value": ["hello", "binary", "code"] },
        { "name": "mid", "type": "str", "value": "ellohinarybodec", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "parts 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_raw", "region": "data", "label": "raw", "value": "\"hello-binary-code\"", "highlight": false },
          { "id": "data_parts", "region": "data", "label": "parts", "value": "[\"hello\", \"binary\", \"code\"]", "highlight": false },
          { "id": "data_mid", "region": "data", "label": "mid", "value": "\"ellohinarybodec\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "mid[::-2] — step=-2이므로 끝(인덱스 14)에서 시작하여 2칸씩 왼쪽으로 이동합니다. len(mid) = 15",
      "variables": [
        { "name": "mid", "type": "str", "value": "ellohinarybodec" },
        { "name": "len(mid)", "type": "int", "value": 15, "highlight": true }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "mid 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_mid", "region": "data", "label": "mid", "value": "\"ellohinarybodec\"", "highlight": false },
          { "id": "stack_len_mid", "region": "stack", "label": "len(mid)", "value": "15", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "mid 인덱스 매핑: e(0) l(1) l(2) o(3) h(4) i(5) n(6) a(7) r(8) y(9) b(10) o(11) d(12) e(13) c(14). 수집할 인덱스는 14, 12, 10, 8, 6, 4, 2, 0",
      "variables": [
        { "name": "mid", "type": "str", "value": "ellohinarybodec" }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "mid 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_mid", "region": "data", "label": "mid", "value": "\"ellohinarybodec\"", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "인덱스 14→'c', 12→'d', 10→'b', 8→'r' 수집 → 현재까지 \"cdbr\"",
      "variables": [
        { "name": "mid", "type": "str", "value": "ellohinarybodec" },
        { "name": "수집", "type": "str", "value": "cdbr", "highlight": true }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "mid 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_mid", "region": "data", "label": "mid", "value": "\"ellohinarybodec\"", "highlight": false },
          { "id": "data_collect", "region": "data", "label": "수집", "value": "\"cdbr\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "인덱스 6→'n', 4→'h', 2→'l', 0→'e' 수집 → 최종 결과 \"cdbrnhle\"",
      "variables": [
        { "name": "mid", "type": "str", "value": "ellohinarybodec" },
        { "name": "수집", "type": "str", "value": "cdbrnhle", "highlight": true }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "mid 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_mid", "region": "data", "label": "mid", "value": "\"ellohinarybodec\"", "highlight": false },
          { "id": "data_collect", "region": "data", "label": "수집", "value": "\"cdbrnhle\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "print(\"cdbrnhle\") — 최종 출력입니다.",
      "variables": [
        { "name": "mid", "type": "str", "value": "ellohinarybodec" },
        { "name": "mid[::-2]", "type": "str", "value": "cdbrnhle" }
      ],
      "stdout": "cdbrnhle",
      "relatedLines": [
        { "line": 3, "role": "read", "label": "mid 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_mid", "region": "data", "label": "mid", "value": "\"ellohinarybodec\"", "highlight": false },
          { "id": "data_result", "region": "data", "label": "mid[::-2]", "value": "\"cdbrnhle\"", "highlight": false }
        ],
        "arrows": []
      }
    }
  ],
};
