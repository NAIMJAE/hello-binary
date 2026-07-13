import type { Problem } from "@/types/problem";

const code = `def g(a, i):
    if i >= len(a):
        return 0
    v = a[i]
    if v % 2 == 0:
        return v + g(a, i + 1)
    return g(a, i + 1) - v

print(g([5, 2, 7, 4, 1], 0))`;

export const recursiveParitySumCustom01: Problem = {
  id: "recursive-parity-sum-custom-01",
  slug: "recursive-parity-sum-custom-01",
  title: "재귀 짝홀 부호 합",
  topic: "재귀",
  difficulty: "어려움",
  source: "커스텀-006",
  estimatedMinutes: 8,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "-7",
  explanation: `여기서 많이 틀립니다: 홀수에서도 v를 먼저 더하거나, 재귀 반환값을 한 번에 암산하여 부호를 놓칩니다.

내려가기 (각 프레임에서 재귀 결과를 기다림):
1. g(a,0): v=5, 홀수 → return g(a,1) - 5 (대기)
2. g(a,1): v=2, 짝수 → return 2 + g(a,2) (대기)
3. g(a,2): v=7, 홀수 → return g(a,3) - 7 (대기)
4. g(a,3): v=4, 짝수 → return 4 + g(a,4) (대기)
5. g(a,4): v=1, 홀수 → return g(a,5) - 1 (대기)
6. g(a,5): i=5 >= 5 → return 0 (베이스 케이스)

올라가기 (한 단계씩 산술 계산):
7. g(a,4) = 0 - 1 = -1
8. g(a,3) = 4 + (-1) = 3
9. g(a,2) = 3 - 7 = -4
10. g(a,1) = 2 + (-4) = -2
11. g(a,0) = -2 - 5 = -7

출력: -7`,
  traceSteps: [
    {
      "line": 9,
      "comment": "프로그램이 시작됩니다.",
      "variables": []
    },
    {
      "line": 9,
      "comment": "print의 인자로 g([5, 2, 7, 4, 1], 0)을 평가합니다. 먼저 g 함수를 실행해야 합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1], "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 1,
      "comment": "[F0] g(a, 0) 진입 — a = [5, 2, 7, 4, 1], i = 0이 매개변수로 전달됩니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 0, "highlight": true }
      ],
      "relatedLines": [
        { "line": 9, "role": "call", "label": "g 최초 실행" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "0", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F0] i >= len(a)? → 0 >= 5 → 거짓. 베이스 케이스가 아니므로 계속 진행합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 0 },
        { "name": "len(a)", "type": "int", "value": 5, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "0", "highlight": false },
          { "id": "stack_len_a", "region": "stack", "label": "len(a)", "value": "5", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "[F0] v = a[0] = 5",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 0 },
        { "name": "v", "type": "int", "value": 5, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "0", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "5", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "[F0] v % 2 → 5 % 2 = 1, 1 == 0? 거짓 → 홀수이므로 6번 줄(짝수 분기)을 건너뛰고 7번 줄로 갑니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 0 },
        { "name": "v", "type": "int", "value": 5 },
        { "name": "v % 2", "type": "int", "value": 1, "highlight": true }
      ],
      "relatedLines": [
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "0", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "5", "highlight": false },
          { "id": "stack_v_mod_2", "region": "stack", "label": "v % 2", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "[F0] return g(a, 0+1) - 5 → g(a,1)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"? - 5\" 형태로 대기합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 0 },
        { "name": "v", "type": "int", "value": 5 }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "0", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 1,
      "comment": "[F1] g(a, 1) 진입 — i = 1",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 1, "highlight": true }
      ],
      "relatedLines": [
        { "line": 7, "role": "call", "label": "F0에서 g 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F1] i >= len(a)? → 1 >= 5 → 거짓",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 1 },
        { "name": "len(a)", "type": "int", "value": 5 }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "1", "highlight": false },
          { "id": "stack_len_a", "region": "stack", "label": "len(a)", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "[F1] v = a[1] = 2",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 1 },
        { "name": "v", "type": "int", "value": 2, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "1", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "2", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "[F1] v % 2 → 2 % 2 = 0, 0 == 0? 참 → 짝수이므로 6번 줄(짝수 분기)로 갑니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 1 },
        { "name": "v", "type": "int", "value": 2 },
        { "name": "v % 2", "type": "int", "value": 0, "highlight": true }
      ],
      "relatedLines": [
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "1", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "2", "highlight": false },
          { "id": "stack_v_mod_2", "region": "stack", "label": "v % 2", "value": "0", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F1] return 2 + g(a, 1+1) → g(a,2)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"2 + ?\" 형태로 대기합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 1 },
        { "name": "v", "type": "int", "value": 2 }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "1", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "2", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 1,
      "comment": "[F2] g(a, 2) 진입 — i = 2",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 2, "highlight": true }
      ],
      "relatedLines": [
        { "line": 6, "role": "call", "label": "F1에서 g 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "2", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F2] i >= len(a)? → 2 >= 5 → 거짓",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 2 },
        { "name": "len(a)", "type": "int", "value": 5 }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "2", "highlight": false },
          { "id": "stack_len_a", "region": "stack", "label": "len(a)", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "[F2] v = a[2] = 7",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 2 },
        { "name": "v", "type": "int", "value": 7, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "2", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "7", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "[F2] v % 2 → 7 % 2 = 1, 1 == 0? 거짓 → 홀수이므로 7번 줄로 갑니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 2 },
        { "name": "v", "type": "int", "value": 7 },
        { "name": "v % 2", "type": "int", "value": 1, "highlight": true }
      ],
      "relatedLines": [
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "2", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "7", "highlight": false },
          { "id": "stack_v_mod_2", "region": "stack", "label": "v % 2", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "[F2] return g(a, 2+1) - 7 → g(a,3)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"? - 7\" 형태로 대기합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 2 },
        { "name": "v", "type": "int", "value": 7 }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "2", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "7", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 1,
      "comment": "[F3] g(a, 3) 진입 — i = 3",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 3, "highlight": true }
      ],
      "relatedLines": [
        { "line": 7, "role": "call", "label": "F2에서 g 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "3", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F3] i >= len(a)? → 3 >= 5 → 거짓",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 3 },
        { "name": "len(a)", "type": "int", "value": 5 }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "3", "highlight": false },
          { "id": "stack_len_a", "region": "stack", "label": "len(a)", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "[F3] v = a[3] = 4",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 3 },
        { "name": "v", "type": "int", "value": 4, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "3", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "4", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "[F3] v % 2 → 4 % 2 = 0, 0 == 0? 참 → 짝수이므로 6번 줄로 갑니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 3 },
        { "name": "v", "type": "int", "value": 4 },
        { "name": "v % 2", "type": "int", "value": 0, "highlight": true }
      ],
      "relatedLines": [
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "3", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "4", "highlight": false },
          { "id": "stack_v_mod_2", "region": "stack", "label": "v % 2", "value": "0", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F3] return 4 + g(a, 3+1) → g(a,4)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"4 + ?\" 형태로 대기합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 3 },
        { "name": "v", "type": "int", "value": 4 }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "3", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "4", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 1,
      "comment": "[F4] g(a, 4) 진입 — i = 4",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 4, "highlight": true }
      ],
      "relatedLines": [
        { "line": 6, "role": "call", "label": "F3에서 g 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "4", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F4] i >= len(a)? → 4 >= 5 → 거짓",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 4 },
        { "name": "len(a)", "type": "int", "value": 5 }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "4", "highlight": false },
          { "id": "stack_len_a", "region": "stack", "label": "len(a)", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "[F4] v = a[4] = 1",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 4 },
        { "name": "v", "type": "int", "value": 1, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "4", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "[F4] v % 2 → 1 % 2 = 1, 1 == 0? 거짓 → 홀수이므로 7번 줄로 갑니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 4 },
        { "name": "v", "type": "int", "value": 1 },
        { "name": "v % 2", "type": "int", "value": 1, "highlight": true }
      ],
      "relatedLines": [
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "4", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "1", "highlight": false },
          { "id": "stack_v_mod_2", "region": "stack", "label": "v % 2", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "[F4] return g(a, 4+1) - 1 → g(a,5)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"? - 1\" 형태로 대기합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 4 },
        { "name": "v", "type": "int", "value": 1 }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "4", "highlight": false },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "1", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 1,
      "comment": "[F5] g(a, 5) 진입 — i = 5",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 5, "highlight": true }
      ],
      "relatedLines": [
        { "line": 7, "role": "call", "label": "F4에서 g 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "5", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F5] i >= len(a)? → 5 >= 5 → 참! 드디어 베이스 케이스에 도달했습니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 5 },
        { "name": "len(a)", "type": "int", "value": 5 }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "5", "highlight": false },
          { "id": "stack_len_a", "region": "stack", "label": "len(a)", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "[F5] return 0 — 베이스 케이스입니다. 이제 대기 중이던 프레임들로 거슬러 올라가며 산술 계산을 합니다.",
      "variables": [
        { "name": "i", "type": "int", "value": 5 },
        { "name": "g반환", "type": "int", "value": 0, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_i", "region": "stack", "label": "i", "value": "5", "highlight": false },
          { "id": "stack_g_ret", "region": "stack", "label": "g반환", "value": "0", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "[F4 복귀] g(a,5) = 0이 돌아왔습니다. g(a,5) - v = 0 - 1 = -1 → F4는 -1을 반환합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 4, "highlight": true },
        { "name": "v", "type": "int", "value": 1, "highlight": true },
        { "name": "g반환", "type": "int", "value": -1, "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" },
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "4", "highlight": true },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "1", "highlight": true },
          { "id": "stack_g_ret", "region": "stack", "label": "g반환", "value": "-1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F3 복귀] g(a,4) = -1이 돌아왔습니다. v + g(a,4) = 4 + (-1) = 3 → F3는 3을 반환합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 3, "highlight": true },
        { "name": "v", "type": "int", "value": 4, "highlight": true },
        { "name": "g반환", "type": "int", "value": 3, "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" },
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "3", "highlight": true },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "4", "highlight": true },
          { "id": "stack_g_ret", "region": "stack", "label": "g반환", "value": "3", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "[F2 복귀] g(a,3) = 3이 돌아왔습니다. g(a,3) - v = 3 - 7 = -4 → F2는 -4를 반환합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 2, "highlight": true },
        { "name": "v", "type": "int", "value": 7, "highlight": true },
        { "name": "g반환", "type": "int", "value": -4, "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" },
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "2", "highlight": true },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "7", "highlight": true },
          { "id": "stack_g_ret", "region": "stack", "label": "g반환", "value": "-4", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F1 복귀] g(a,2) = -4가 돌아왔습니다. v + g(a,2) = 2 + (-4) = -2 → F1은 -2를 반환합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 1, "highlight": true },
        { "name": "v", "type": "int", "value": 2, "highlight": true },
        { "name": "g반환", "type": "int", "value": -2, "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" },
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "1", "highlight": true },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "2", "highlight": true },
          { "id": "stack_g_ret", "region": "stack", "label": "g반환", "value": "-2", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "[F0 복귀] g(a,1) = -2가 돌아왔습니다. g(a,1) - v = -2 - 5 = -7 → F0는 -7을 반환합니다.",
      "variables": [
        { "name": "a", "type": "list", "value": [5, 2, 7, 4, 1] },
        { "name": "i", "type": "int", "value": 0, "highlight": true },
        { "name": "v", "type": "int", "value": 5, "highlight": true },
        { "name": "g반환", "type": "int", "value": -7, "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" },
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_a", "region": "data", "label": "a", "value": "[5, 2, 7, 4, 1]", "highlight": false },
          { "id": "stack_i", "region": "stack", "label": "i", "value": "0", "highlight": true },
          { "id": "stack_v", "region": "stack", "label": "v", "value": "5", "highlight": true },
          { "id": "stack_g_ret", "region": "stack", "label": "g반환", "value": "-7", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 9,
      "comment": "g([5, 2, 7, 4, 1], 0)의 최종 반환값은 -7입니다. print(-7) → 출력합니다.",
      "variables": [
        { "name": "g반환", "type": "int", "value": -7 }
      ],
      "stdout": "-7",
      "relatedLines": [
        { "line": 1, "role": "definition", "label": "g 정의" },
        { "line": 4, "role": "read", "label": "v 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_g_ret", "region": "stack", "label": "g반환", "value": "-7", "highlight": false }
        ],
        "arrows": []
      }
    }
  ],
};
