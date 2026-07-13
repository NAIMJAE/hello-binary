import type { Problem } from "@/types/problem";

const code = `public class Main {
    static int find(int[] a, int key) {
        int left = 0;
        int right = a.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (a[mid] == key) {
                return mid;
            }
            if (a[mid] < key) {
                left = ____;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] a = {2, 4, 6, 8, 10, 12};
        System.out.print(find(a, 10) + find(a, 5));
    }
}`;

export const binarySearchBlankCustom01: Problem = {
  id: "binary-search-blank-custom-01",
  slug: "binary-search-blank-custom-01",
  title: "이진 탐색 빈칸 (헬퍼 포함)",
  topic: "탐색",
  difficulty: "보통",
  source: "커스텀-018",
  estimatedMinutes: 5,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 밑줄(빈칸)에 알맞은 코드를 작성하시오. (표기는 `mid + 1`)",
  output: "3",
  code,
  answer: "mid + 1",
  explanation: `여기서 많이 틀립니다: left = mid 또는 left = mid - 1로 적습니다.

핵심 논리:
1. a[mid] < key → key는 mid보다 오른쪽에 있음
2. mid는 이미 확인했으므로 탐색 범위는 mid+1 ~ right
3. 따라서 left = mid + 1이 정답

만약 left = mid로 쓰면:
- left=2, right=2, mid=2일 때 a[mid]<key → left=2(변화 없음) → 무한 루프

시뮬레이션 (빈칸을 mid + 1로 채운 경우):
- find(a, 10): left=0,right=5 → mid=2,a[2]=6<10 → left=3
  → mid=4,a[4]=10==10 → return 4
- find(a, 5): left=0,right=5 → mid=2,a[2]=6>5 → right=1
  → mid=0,a[0]=2<5 → left=1 → mid=1,a[1]=4<5 → left=2
  → 2>1 탈출 → return -1
- 출력: 4 + (-1) = 3 (빈칸 채점 답은 mid + 1)`,
  traceSteps: [
    {
      "line": 19,
      "comment": "main() 메서드가 시작됩니다.",
      "variables": [],
      "memory": {
        "cells": [],
        "arrows": []
      }
    },
    {
      "line": 20,
      "comment": "int[] a = {2, 4, 6, 8, 10, 12} — 배열 a가 힙에 생성됩니다.",
      "variables": [
        { "name": "a", "type": "int[]", "value": "[2, 4, 6, 8, 10, 12]", "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_a", "region": "stack", "label": "a", "value": "→ 배열", "highlight": true },
          { "id": "heap_arr", "region": "heap", "label": "a[]", "value": "[2, 4, 6, 8, 10, 12]", "highlight": true }
        ],
        "arrows": [
          { "from": "stack_a", "to": "heap_arr", "label": "참조", "highlight": true }
        ]
      }
    },
    {
      "line": 21,
      "comment": "find(a, 10) + find(a, 5) 평가 시작. 먼저 find(a, 10)을 실행합니다.",
      "variables": [
        { "name": "a", "type": "int[]", "value": "[2, 4, 6, 8, 10, 12]" }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "find 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_a", "region": "stack", "label": "a", "value": "→ 배열", "highlight": false },
          { "id": "heap_arr", "region": "heap", "label": "a[]", "value": "[2, 4, 6, 8, 10, 12]", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_a", "to": "heap_arr", "label": "참조", "highlight": false }
        ]
      }
    },
    {
      "line": 3,
      "comment": "find(a, 10) — left = 0, right = a.length - 1 = 5, key = 10으로 초기화합니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 10, "highlight": true },
        { "name": "left", "type": "int", "value": 0, "highlight": true },
        { "name": "right", "type": "int", "value": 5, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "read", "label": "매개변수" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": true },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": true },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": true },
          { "id": "heap_arr", "region": "heap", "label": "a[]", "value": "[2, 4, 6, 8, 10, 12]", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "while: left <= right? → 0 <= 5 → 참. 반복 진입합니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 10 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "left <= right", "type": "boolean", "value": true, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "1회차: mid = (0 + 5) / 2 = 2",
      "variables": [
        { "name": "key", "type": "int", "value": 10 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "mid", "type": "int", "value": 2, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "2", "highlight": true },
          { "id": "heap_arr", "region": "heap", "label": "a[]", "value": "[2, 4, 6, 8, 10, 12]", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "a[2] == key? → 6 == 10? → 거짓. 일치하지 않습니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 10 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "mid", "type": "int", "value": 2 },
        { "name": "a[mid]", "type": "int", "value": 6, "highlight": true }
      ],
      "relatedLines": [
        { "line": 6, "role": "read", "label": "mid 계산" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "2", "highlight": false },
          { "id": "heap_arr", "region": "heap", "label": "a[]", "value": "[2, 4, ⟨6⟩, 8, 10, 12]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 10,
      "comment": "a[2] < key? → 6 < 10? → 참. key가 mid 오른쪽에 있으므로 left를 갱신해야 합니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 10 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "mid", "type": "int", "value": 2 },
        { "name": "a[mid] < key", "type": "boolean", "value": true, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "2", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 11,
      "comment": "빈칸 = mid + 1 → left = 2 + 1 = 3. mid는 이미 확인했으므로 그 다음부터 탐색합니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 10 },
        { "name": "left", "type": "int", "value": 3, "highlight": true },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "mid", "type": "int", "value": 2 },
        { "name": "빈칸 답", "type": "코드", "value": "mid + 1", "highlight": true }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "left 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "3", "highlight": true },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "2", "highlight": false },
          { "id": "stack_blank", "region": "stack", "label": "빈칸 답", "value": "mid + 1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "while: left <= right? → 3 <= 5 → 참. 2회차 반복 진입합니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 10 },
        { "name": "left", "type": "int", "value": 3 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "left <= right", "type": "boolean", "value": true, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "3", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "2회차: mid = (3 + 5) / 2 = 4",
      "variables": [
        { "name": "key", "type": "int", "value": 10 },
        { "name": "left", "type": "int", "value": 3 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "mid", "type": "int", "value": 4, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "3", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "4", "highlight": true },
          { "id": "heap_arr", "region": "heap", "label": "a[]", "value": "[2, 4, 6, 8, ⟨10⟩, 12]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 7,
      "comment": "a[4] == key? → 10 == 10? → 참! 찾았습니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 10 },
        { "name": "left", "type": "int", "value": 3 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "mid", "type": "int", "value": 4 },
        { "name": "a[mid] == key", "type": "boolean", "value": true, "highlight": true }
      ],
      "relatedLines": [
        { "line": 6, "role": "read", "label": "mid 계산" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "10", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "4", "highlight": false },
          { "id": "heap_arr", "region": "heap", "label": "a[]", "value": "[2, 4, 6, 8, ⟨10⟩, 12]", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 8,
      "comment": "return mid → return 4. find(a, 10) = 4",
      "variables": [
        { "name": "find(a,10) 결과", "type": "int", "value": 4, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_find10", "region": "stack", "label": "find(a,10) 결과", "value": "4", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 21,
      "comment": "find(a, 10) = 4 확정. 이제 find(a, 5)를 실행합니다. 배열에 5는 없습니다.",
      "variables": [
        { "name": "find(a,10) 결과", "type": "int", "value": 4 }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "find 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_find10", "region": "stack", "label": "find(a,10) 결과", "value": "4", "highlight": false },
          { "id": "heap_arr", "region": "heap", "label": "a[]", "value": "[2, 4, 6, 8, 10, 12]", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "find(a, 5) — left = 0, right = 5, key = 5로 초기화합니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 5, "highlight": true },
        { "name": "left", "type": "int", "value": 0, "highlight": true },
        { "name": "right", "type": "int", "value": 5, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_find10", "region": "stack", "label": "find(a,10) 결과", "value": "4", "highlight": false },
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": true },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": true },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "1회차: mid = (0 + 5) / 2 = 2, a[2] = 6",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "mid", "type": "int", "value": 2, "highlight": true },
        { "name": "a[mid]", "type": "int", "value": 6, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "2", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 10,
      "comment": "a[2] < key? → 6 < 5? → 거짓. else 분기로 갑니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 5 },
        { "name": "mid", "type": "int", "value": 2 },
        { "name": "a[mid] < key", "type": "boolean", "value": false, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "5", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "2", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 13,
      "comment": "right = mid - 1 = 2 - 1 = 1. key가 mid 왼쪽에 있으므로 오른쪽 범위를 줄입니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 1, "highlight": true },
        { "name": "mid", "type": "int", "value": 2 }
      ],
      "relatedLines": [
        { "line": 4, "role": "read", "label": "right 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "1", "highlight": true },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "2", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "2회차: mid = (0 + 1) / 2 = 0, a[0] = 2",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 1 },
        { "name": "mid", "type": "int", "value": 0, "highlight": true },
        { "name": "a[mid]", "type": "int", "value": 2, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "1", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "0", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 10,
      "comment": "a[0] < key? → 2 < 5? → 참. 빈칸(mid + 1) 적용합니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 0 },
        { "name": "right", "type": "int", "value": 1 },
        { "name": "mid", "type": "int", "value": 0 },
        { "name": "a[mid] < key", "type": "boolean", "value": true, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "0", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "1", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "0", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 11,
      "comment": "left = mid + 1 = 0 + 1 = 1",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 1, "highlight": true },
        { "name": "right", "type": "int", "value": 1 },
        { "name": "mid", "type": "int", "value": 0 }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "left 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "1", "highlight": true },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "1", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "0", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "3회차: mid = (1 + 1) / 2 = 1, a[1] = 4",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 1 },
        { "name": "right", "type": "int", "value": 1 },
        { "name": "mid", "type": "int", "value": 1, "highlight": true },
        { "name": "a[mid]", "type": "int", "value": 4, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "1", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "1", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 10,
      "comment": "a[1] < key? → 4 < 5? → 참. 빈칸(mid + 1) 적용합니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 1 },
        { "name": "right", "type": "int", "value": 1 },
        { "name": "mid", "type": "int", "value": 1 },
        { "name": "a[mid] < key", "type": "boolean", "value": true, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "1", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "1", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "1", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 11,
      "comment": "left = mid + 1 = 1 + 1 = 2. 이제 left(2) > right(1)이 될 것입니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 2, "highlight": true },
        { "name": "right", "type": "int", "value": 1 },
        { "name": "mid", "type": "int", "value": 1 }
      ],
      "relatedLines": [
        { "line": 3, "role": "read", "label": "left 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "2", "highlight": true },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "1", "highlight": false },
          { "id": "stack_mid", "region": "stack", "label": "mid", "value": "1", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 5,
      "comment": "while: left <= right? → 2 <= 1 → 거짓. 반복 종료합니다. 5를 찾지 못했습니다.",
      "variables": [
        { "name": "key", "type": "int", "value": 5 },
        { "name": "left", "type": "int", "value": 2 },
        { "name": "right", "type": "int", "value": 1 },
        { "name": "left <= right", "type": "boolean", "value": false, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_key", "region": "stack", "label": "key", "value": "5", "highlight": false },
          { "id": "stack_left", "region": "stack", "label": "left", "value": "2", "highlight": false },
          { "id": "stack_right", "region": "stack", "label": "right", "value": "1", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 16,
      "comment": "return -1. 배열에 5가 없으므로 -1을 반환합니다. find(a, 5) = -1",
      "variables": [
        { "name": "find(a,5) 결과", "type": "int", "value": -1, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_find10", "region": "stack", "label": "find(a,10) 결과", "value": "4", "highlight": false },
          { "id": "stack_find5", "region": "stack", "label": "find(a,5) 결과", "value": "-1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 21,
      "comment": "find(a,10) + find(a,5) = 4 + (-1) = 3 출력. 빈칸 정답은 mid + 1입니다. (mid를 쓰면 무한 루프, mid-1을 쓰면 원소 누락)",
      "variables": [
        { "name": "find(a,10) 결과", "type": "int", "value": 4 },
        { "name": "find(a,5) 결과", "type": "int", "value": -1 },
        { "name": "결과", "type": "int", "value": 3, "highlight": true }
      ],
      "stdout": "3",
      "relatedLines": [
        { "line": 11, "role": "read", "label": "빈칸 위치" },
        { "line": 2, "role": "read", "label": "find 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_find10", "region": "stack", "label": "find(a,10) 결과", "value": "4", "highlight": false },
          { "id": "stack_find5", "region": "stack", "label": "find(a,5) 결과", "value": "-1", "highlight": false },
          { "id": "stack_result", "region": "stack", "label": "결과", "value": "3", "highlight": true }
        ],
        "arrows": []
      }
    }
  ],
};
