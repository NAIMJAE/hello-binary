import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

struct  dat {
    int x;
    int y;
};

int main() {
    struct dat a[] = {{1, 2}, {3, 4}, {5, 6}};
    struct dat* ptr = a;
    struct dat** pptr = &ptr;

    (*pptr)[1] = (*pptr)[2];
    printf("%d 그리고 %d", a[1].x, a[1].y);

    return 0;
}`;

export const structDoublePointer2025_2: Problem = {
  id: "struct-double-pointer-2025-2",
  slug: "struct-double-pointer-2025-2",
  title: "구조체 이중 포인터와 대입",
  topic: "구조체",
  difficulty: "어려움",
  source: "2025년 2회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 C언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "5 그리고 6",
  explanation: `1. a[] = {{1,2}, {3,4}, {5,6}}
   - ptr = a (배열 시작 주소)
   - pptr = &ptr (ptr을 가리키는 이중 포인터)

2. (*pptr)[1] = (*pptr)[2]
   - *pptr = ptr
   - (*pptr)[1] = ptr[1] = a[1]
   - (*pptr)[2] = ptr[2] = a[2]
   - a[1] = a[2] → 구조체 전체 복사

3. a[1] = {5, 6}

4. printf → 출력: 5 그리고 6`,
  traceSteps:   [
      {
        "line": 8,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 9,
        "comment": "struct dat a[] = {{1,2}, {3,4}, {5,6}} 배열이 초기화됩니다.",
        "variables": [
          {
            "name": "a[0]",
            "type": "struct dat",
            "value": "{1, 2}"
          },
          {
            "name": "a[1]",
            "type": "struct dat",
            "value": "{3, 4}"
          },
          {
            "name": "a[2]",
            "type": "struct dat",
            "value": "{5, 6}",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a[]",
              "value": "{1, 2}",
              "highlight": true
            },
            {
              "id": "data_a_0_",
              "region": "data",
              "label": "a[0]",
              "value": "{1, 2}",
              "highlight": false
            },
            {
              "id": "data_a_1_",
              "region": "data",
              "label": "a[1]",
              "value": "{3, 4}",
              "highlight": false
            },
            {
              "id": "data_a_2_",
              "region": "data",
              "label": "a[2]",
              "value": "{5, 6}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "struct dat* ptr = a. ptr은 배열 a의 시작 주소를 가리킵니다.",
        "variables": [
          {
            "name": "ptr",
            "type": "struct dat*",
            "value": "&a[0]",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_ptr",
              "region": "stack",
              "label": "ptr",
              "value": "&a[0]",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_a[0]",
              "region": "stack",
              "label": "a[0]",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_ptr",
              "region": "stack",
              "label": "ptr",
              "value": "&a[0]",
              "address": "0x210",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_ptr",
              "to": "node_a[0]",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "a[] 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "pptr 선언"
          }
        ]
      },
      {
        "line": 11,
        "comment": "struct dat** pptr = &ptr. pptr은 ptr의 주소를 가리킵니다.",
        "variables": [
          {
            "name": "ptr",
            "type": "struct dat*",
            "value": "&a[0]"
          },
          {
            "name": "pptr",
            "type": "struct dat**",
            "value": "&ptr",
            "highlight": true
          },
          {
            "name": "*pptr",
            "type": "struct dat*",
            "value": "&a[0] (= ptr)"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "a[] 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "ptr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_ptr",
              "region": "stack",
              "label": "ptr",
              "value": "&a[0]",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_a[0]",
              "region": "stack",
              "label": "a[0]",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_ptr",
              "region": "stack",
              "label": "ptr",
              "value": "&a[0]",
              "address": "0x210",
              "highlight": false
            },
            {
              "id": "ptr_pptr",
              "region": "stack",
              "label": "pptr",
              "value": "&ptr",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_ptr",
              "region": "stack",
              "label": "ptr",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_pptr",
              "region": "stack",
              "label": "pptr",
              "value": "&ptr",
              "address": "0x220",
              "highlight": true
            },
            {
              "id": "ptr__pptr",
              "region": "stack",
              "label": "*pptr",
              "value": "&a[0] (= ptr)",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_a[0] (= ptr)",
              "region": "stack",
              "label": "a[0] (= ptr)",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_ptr",
              "to": "node_a[0]",
              "label": "가리킴",
              "highlight": false
            },
            {
              "from": "ptr_pptr",
              "to": "node_ptr",
              "label": "가리킴",
              "highlight": true
            },
            {
              "from": "ptr__pptr",
              "to": "node_a[0] (= ptr)",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 13,
        "comment": "(*pptr)[1] = (*pptr)[2] → a[1] = a[2]. 구조체 전체가 복사됩니다.",
        "variables": [
          {
            "name": "(*pptr)[1]",
            "type": "struct dat",
            "value": "{3, 4} → {5, 6}"
          },
          {
            "name": "(*pptr)[2]",
            "type": "struct dat",
            "value": "{5, 6}"
          },
          {
            "name": "a[1]",
            "type": "struct dat",
            "value": "{5, 6}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "a[] 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "ptr 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "pptr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a[]",
              "value": "{5, 6}",
              "highlight": true
            },
            {
              "id": "data___pptr__1_",
              "region": "data",
              "label": "(*pptr)[1]",
              "value": "{3, 4} → {5, 6}",
              "highlight": false
            },
            {
              "id": "data___pptr__2_",
              "region": "data",
              "label": "(*pptr)[2]",
              "value": "{5, 6}",
              "highlight": false
            },
            {
              "id": "data_a_1_",
              "region": "data",
              "label": "a[1]",
              "value": "{5, 6}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "printf 인자 평가: a[1].x = 5",
        "variables": [
          {
            "name": "a[1].x",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "a 선언"
          }
        ]
      },
      {
        "line": 14,
        "comment": "printf 인자 평가: a[1].y = 6",
        "variables": [
          {
            "name": "a[1].x",
            "type": "int",
            "value": 5
          },
          {
            "name": "a[1].y",
            "type": "int",
            "value": 6,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "a 선언"
          }
        ]
      },
      {
        "line": 14,
        "comment": "printf(\"%d 그리고 %d\", 5, 6) 실행. 최종 출력값은 5 그리고 6입니다.",
        "variables": [
          {
            "name": "a[1].x",
            "type": "int",
            "value": 5
          },
          {
            "name": "a[1].y",
            "type": "int",
            "value": 6
          }
        ],
        "stdout": "5 그리고 6",
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "a 선언"
          }
        ]
      }
    ],
};
