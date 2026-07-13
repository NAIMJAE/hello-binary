import type { Problem } from "@/types/problem";

const code = `base = {"x": [1, 2], "y": [2, 3], "z": [1]}
keys = set(base) & {"x", "z", "w"}
total = 0
for k in sorted(keys):
    base[k].append(len(keys))
    total += sum(base[k])
print(f"{total}{''.join(sorted(keys))}")`;

export const dictSetMutateSumCustom01: Problem = {
  id: "dict-set-mutate-sum-custom-01",
  slug: "dict-set-mutate-sum-custom-01",
  title: "dict·set 교집합과 리스트 돌연변이 합",
  topic: "딕셔너리",
  difficulty: "어려움",
  source: "커스텀-005",
  estimatedMinutes: 8,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "8xz",
  explanation: `여기서 많이 틀립니다: "y"까지 루프에 포함시키거나, append 전의 리스트로 sum을 계산합니다.

1. set(base) = {"x","y","z"} (딕셔너리 키만 집합으로)
2. {"x","z","w"} & {"x","y","z"} → 교집합 {"x","z"}
3. len(keys) = 2

4. sorted(keys) → ["x","z"] 순서로 for 루프:
   k="x": base["x"] = [1,2] → append(2) → [1,2,2], sum=5, total=0+5=5
   k="z": base["z"] = [1] → append(2) → [1,2], sum=3, total=5+3=8

5. f-string: {total} → "8", ''.join(sorted(keys)) → "xz"
6. "8" + "xz" = "8xz"`,
  traceSteps: [
    {
      "line": 1,
      "comment": "프로그램이 시작됩니다.",
      "variables": []
    },
    {
      "line": 1,
      "comment": "base = {\"x\": [1, 2], \"y\": [2, 3], \"z\": [1]} — 키 3개, 각 값은 리스트입니다.",
      "variables": [
        { "name": "base", "type": "dict", "value": "{x: [1,2], y: [2,3], z: [1]}", "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_base", "region": "data", "label": "base", "value": "{x: [1,2], y: [2,3], z: [1]}", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "set(base) — 딕셔너리의 키만 집합으로 추출합니다 → {\"x\", \"y\", \"z\"}",
      "variables": [
        { "name": "base", "type": "dict", "value": "{x: [1,2], y: [2,3], z: [1]}" },
        { "name": "set(base)", "type": "set", "value": "{x, y, z}", "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "read", "label": "base 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_base", "region": "data", "label": "base", "value": "{x: [1,2], y: [2,3], z: [1]}", "highlight": false },
          { "id": "data_set_base", "region": "data", "label": "set(base)", "value": "{x, y, z}", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "오른쪽 리터럴 집합 {\"x\", \"z\", \"w\"} — 여기에 \"y\"는 없고 \"w\"가 있습니다.",
      "variables": [
        { "name": "set(base)", "type": "set", "value": "{x, y, z}" },
        { "name": "리터럴", "type": "set", "value": "{x, z, w}", "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_set_base", "region": "data", "label": "set(base)", "value": "{x, y, z}", "highlight": false },
          { "id": "data_literal", "region": "data", "label": "리터럴", "value": "{x, z, w}", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "& 연산(교집합): 양쪽 모두에 있는 원소만 남깁니다. \"y\"는 오른쪽에 없고 \"w\"는 왼쪽에 없으므로 제거 → {\"x\", \"z\"}",
      "variables": [
        { "name": "base", "type": "dict", "value": "{x: [1,2], y: [2,3], z: [1]}" },
        { "name": "keys", "type": "set", "value": "{x, z}", "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_base", "region": "data", "label": "base", "value": "{x: [1,2], y: [2,3], z: [1]}", "highlight": false },
          { "id": "data_keys", "region": "data", "label": "keys", "value": "{x, z}", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "keys = {\"x\", \"z\"}, len(keys) = 2 — 이 값(2)이 이후 append에 사용됩니다.",
      "variables": [
        { "name": "base", "type": "dict", "value": "{x: [1,2], y: [2,3], z: [1]}" },
        { "name": "keys", "type": "set", "value": "{x, z}" },
        { "name": "len(keys)", "type": "int", "value": 2, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_base", "region": "data", "label": "base", "value": "{x: [1,2], y: [2,3], z: [1]}", "highlight": false },
          { "id": "data_keys", "region": "data", "label": "keys", "value": "{x, z}", "highlight": false },
          { "id": "stack_len_keys", "region": "stack", "label": "len(keys)", "value": "2", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "total = 0 — 루프에서 누적할 합계 변수를 초기화합니다.",
      "variables": [
        { "name": "base", "type": "dict", "value": "{x: [1,2], y: [2,3], z: [1]}" },
        { "name": "keys", "type": "set", "value": "{x, z}" },
        { "name": "total", "type": "int", "value": 0, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "data_base", "region": "data", "label": "base", "value": "{x: [1,2], y: [2,3], z: [1]}", "highlight": false },
          { "id": "data_keys", "region": "data", "label": "keys", "value": "{x, z}", "highlight": false },
          { "id": "stack_total", "region": "stack", "label": "total", "value": "0", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "sorted(keys) → [\"x\", \"z\"] (알파벳순). for 루프 진입, 첫 번째 k = \"x\"",
      "variables": [
        { "name": "base", "type": "dict", "value": "{x: [1,2], y: [2,3], z: [1]}" },
        { "name": "keys", "type": "set", "value": "{x, z}" },
        { "name": "total", "type": "int", "value": 0 },
        { "name": "sorted(keys)", "type": "list", "value": ["x", "z"], "highlight": true },
        { "name": "k", "type": "str", "value": "x", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "keys 선언" },
        { "line": 3, "role": "read", "label": "total 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_base", "region": "data", "label": "base", "value": "{x: [1,2], y: [2,3], z: [1]}", "highlight": false },
          { "id": "data_keys", "region": "data", "label": "keys", "value": "{x, z}", "highlight": false },
          { "id": "stack_total", "region": "stack", "label": "total", "value": "0", "highlight": false },
          { "id": "stack_k", "region": "stack", "label": "k", "value": "\"x\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "len(keys) = 2. base[\"x\"]는 현재 [1, 2]입니다.",
      "variables": [
        { "name": "k", "type": "str", "value": "x" },
        { "name": "len(keys)", "type": "int", "value": 2 },
        { "name": "base[x]", "type": "list", "value": [1, 2], "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "read", "label": "base 선언" },
        { "line": 2, "role": "read", "label": "keys 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_k", "region": "stack", "label": "k", "value": "\"x\"", "highlight": false },
          { "id": "stack_len_keys", "region": "stack", "label": "len(keys)", "value": "2", "highlight": false },
          { "id": "data_base_x", "region": "data", "label": "base[x]", "value": "[1, 2]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "base[\"x\"].append(2) → base[\"x\"] = [1, 2, 2] — 원본 리스트가 직접 변경됩니다(돌연변이).",
      "variables": [
        { "name": "k", "type": "str", "value": "x" },
        { "name": "base[x]", "type": "list", "value": [1, 2, 2], "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "read", "label": "base 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_k", "region": "stack", "label": "k", "value": "\"x\"", "highlight": false },
          { "id": "data_base_x", "region": "data", "label": "base[x]", "value": "[1, 2, 2]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "sum(base[\"x\"]) = sum([1, 2, 2]) = 1 + 2 + 2 = 5 — append 후의 리스트로 합산합니다.",
      "variables": [
        { "name": "k", "type": "str", "value": "x" },
        { "name": "base[x]", "type": "list", "value": [1, 2, 2] },
        { "name": "sum(base[k])", "type": "int", "value": 5, "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "read", "label": "base 선언" },
        { "line": 5, "role": "read", "label": "append 실행" }
      ],
      "memory": {
        "cells": [
          { "id": "data_base_x", "region": "data", "label": "base[x]", "value": "[1, 2, 2]", "highlight": false },
          { "id": "stack_sum", "region": "stack", "label": "sum(base[k])", "value": "5", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "total += 5 → total = 0 + 5 = 5",
      "variables": [
        { "name": "k", "type": "str", "value": "x" },
        { "name": "total", "type": "int", "value": 5, "highlight": true }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "total 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_k", "region": "stack", "label": "k", "value": "\"x\"", "highlight": false },
          { "id": "stack_total", "region": "stack", "label": "total", "value": "5", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "다음 k = \"z\" — sorted(keys)의 두 번째(마지막) 요소입니다.",
      "variables": [
        { "name": "base", "type": "dict", "value": "{x: [1,2,2], y: [2,3], z: [1]}" },
        { "name": "total", "type": "int", "value": 5 },
        { "name": "k", "type": "str", "value": "z", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "keys 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_base", "region": "data", "label": "base", "value": "{x: [1,2,2], y: [2,3], z: [1]}", "highlight": false },
          { "id": "stack_total", "region": "stack", "label": "total", "value": "5", "highlight": false },
          { "id": "stack_k", "region": "stack", "label": "k", "value": "\"z\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "base[\"z\"]는 현재 [1]입니다. (원소 1개짜리 리스트)",
      "variables": [
        { "name": "k", "type": "str", "value": "z" },
        { "name": "len(keys)", "type": "int", "value": 2 },
        { "name": "base[z]", "type": "list", "value": [1], "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "read", "label": "base 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_k", "region": "stack", "label": "k", "value": "\"z\"", "highlight": false },
          { "id": "stack_len_keys", "region": "stack", "label": "len(keys)", "value": "2", "highlight": false },
          { "id": "data_base_z", "region": "data", "label": "base[z]", "value": "[1]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "base[\"z\"].append(2) → base[\"z\"] = [1, 2]",
      "variables": [
        { "name": "k", "type": "str", "value": "z" },
        { "name": "base[z]", "type": "list", "value": [1, 2], "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "read", "label": "base 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_k", "region": "stack", "label": "k", "value": "\"z\"", "highlight": false },
          { "id": "data_base_z", "region": "data", "label": "base[z]", "value": "[1, 2]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "sum(base[\"z\"]) = sum([1, 2]) = 1 + 2 = 3",
      "variables": [
        { "name": "k", "type": "str", "value": "z" },
        { "name": "base[z]", "type": "list", "value": [1, 2] },
        { "name": "sum(base[k])", "type": "int", "value": 3, "highlight": true }
      ],
      "relatedLines": [
        { "line": 1, "role": "read", "label": "base 선언" },
        { "line": 5, "role": "read", "label": "append 실행" }
      ],
      "memory": {
        "cells": [
          { "id": "data_base_z", "region": "data", "label": "base[z]", "value": "[1, 2]", "highlight": false },
          { "id": "stack_sum", "region": "stack", "label": "sum(base[k])", "value": "3", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "total += 3 → total = 5 + 3 = 8",
      "variables": [
        { "name": "k", "type": "str", "value": "z" },
        { "name": "total", "type": "int", "value": 8, "highlight": true }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "total 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_k", "region": "stack", "label": "k", "value": "\"z\"", "highlight": false },
          { "id": "stack_total", "region": "stack", "label": "total", "value": "8", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "sorted(keys) 순회 완료 — 더 이상 반복할 요소가 없어 for 루프를 빠져나옵니다.",
      "variables": [
        { "name": "base", "type": "dict", "value": "{x: [1,2,2], y: [2,3], z: [1,2]}" },
        { "name": "keys", "type": "set", "value": "{x, z}" },
        { "name": "total", "type": "int", "value": 8 }
      ],
      "memory": {
        "cells": [
          { "id": "data_base", "region": "data", "label": "base", "value": "{x: [1,2,2], y: [2,3], z: [1,2]}", "highlight": false },
          { "id": "data_keys", "region": "data", "label": "keys", "value": "{x, z}", "highlight": false },
          { "id": "stack_total", "region": "stack", "label": "total", "value": "8", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "f-string 왼쪽: {total} → total은 8이므로 문자열 \"8\"이 됩니다.",
      "variables": [
        { "name": "total", "type": "int", "value": 8 },
        { "name": "{total}", "type": "str", "value": "8", "highlight": true }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "total 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_total", "region": "stack", "label": "total", "value": "8", "highlight": false },
          { "id": "data_fstr_left", "region": "data", "label": "{total}", "value": "\"8\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "f-string 오른쪽: sorted(keys) → [\"x\", \"z\"], ''.join([\"x\", \"z\"]) → \"x\" + \"z\" = \"xz\"",
      "variables": [
        { "name": "keys", "type": "set", "value": "{x, z}" },
        { "name": "sorted(keys)", "type": "list", "value": ["x", "z"] },
        { "name": "join결과", "type": "str", "value": "xz", "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "keys 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "data_keys", "region": "data", "label": "keys", "value": "{x, z}", "highlight": false },
          { "id": "data_fstr_right", "region": "data", "label": "join결과", "value": "\"xz\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "\"8\" + \"xz\" = \"8xz\" — print로 최종 출력합니다.",
      "variables": [
        { "name": "total", "type": "int", "value": 8 },
        { "name": "keys", "type": "set", "value": "{x, z}" }
      ],
      "stdout": "8xz",
      "relatedLines": [
        { "line": 2, "role": "read", "label": "keys 선언" },
        { "line": 3, "role": "read", "label": "total 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_total", "region": "stack", "label": "total", "value": "8", "highlight": false },
          { "id": "data_keys", "region": "data", "label": "keys", "value": "{x, z}", "highlight": false }
        ],
        "arrows": []
      }
    }
  ],
};
