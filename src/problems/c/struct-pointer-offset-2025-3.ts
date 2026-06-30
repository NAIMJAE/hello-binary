import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

struct Test {
    int i;
    const char *g;
};

int main() {
    struct Test test[] = {{1, "AB"}, {2, "DC"}, {3, "EB"}};
    struct Test *p = &test[1];
    printf("%s", p->g + (p->i - 1));
    return 0;
}`;

export const structPointerOffset2025_3: Problem = {
  id: "struct-pointer-offset-2025-3",
  slug: "struct-pointer-offset-2025-3",
  title: "구조체와 포인터 오프셋",
  topic: "구조체",
  difficulty: "어려움",
  source: "2025년 3회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 C코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "C",
  explanation: `1. test[] = {{1,"AB"}, {2,"DC"}, {3,"EB"}}

2. p = &test[1] → p는 두 번째 요소 {2, "DC"}를 가리킴
   - p->i = 2
   - p->g = "DC" (문자열 "DC"의 시작 주소)

3. p->i - 1 = 2 - 1 = 1

4. p->g + 1 → 문자열 포인터에 1을 더하면 두 번째 문자부터 시작
   - "DC"에서 인덱스 1 → 'C'부터 끝까지 → "C"

5. printf("%s", "C") → 출력: C`,
  traceSteps:   [
      {
        "line": 8,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 9,
        "comment": "struct Test test[] = {{1,\"AB\"}, {2,\"DC\"}, {3,\"EB\"}} 초기화",
        "variables": [
          {
            "name": "test[0]",
            "type": "struct Test",
            "value": "{1, \"AB\"}"
          },
          {
            "name": "test[1]",
            "type": "struct Test",
            "value": "{2, \"DC\"}",
            "highlight": true
          },
          {
            "name": "test[2]",
            "type": "struct Test",
            "value": "{3, \"EB\"}"
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "Test 구조체"
          },
          {
            "line": 10,
            "role": "read",
            "label": "p 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_test_0_",
              "region": "data",
              "label": "test[0]",
              "value": "{1, \"AB\"}",
              "highlight": false
            },
            {
              "id": "data_test_1_",
              "region": "data",
              "label": "test[1]",
              "value": "{2, \"DC\"}",
              "highlight": true
            },
            {
              "id": "data_test_2_",
              "region": "data",
              "label": "test[2]",
              "value": "{3, \"EB\"}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "struct Test *p = &test[1]",
        "variables": [
          {
            "name": "p",
            "type": "struct Test*",
            "value": "&test[1]",
            "highlight": true
          },
          {
            "name": "p->i",
            "type": "int",
            "value": 2
          },
          {
            "name": "p->g",
            "type": "const char*",
            "value": "\"DC\""
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_p",
              "region": "stack",
              "label": "p",
              "value": "&test[1]",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_test[1]",
              "region": "stack",
              "label": "test[1]",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_p",
              "region": "stack",
              "label": "p",
              "value": "&test[1]",
              "address": "0x230",
              "highlight": true
            },
            {
              "id": "ptr_p__g",
              "region": "stack",
              "label": "p->g",
              "value": "\"DC\"",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_\"DC\"",
              "region": "stack",
              "label": "\"DC\"",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_p__i",
              "region": "stack",
              "label": "p->i",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_p",
              "to": "node_test[1]",
              "label": "가리킴",
              "highlight": true
            },
            {
              "from": "ptr_p__g",
              "to": "node_\"DC\"",
              "label": "가리킴",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "Test 구조체"
          },
          {
            "line": 9,
            "role": "read",
            "label": "test[] 선언"
          }
        ]
      },
      {
        "line": 11,
        "comment": "p->i - 1 = 2 - 1 = 1",
        "variables": [
          {
            "name": "p->i",
            "type": "int",
            "value": 2
          },
          {
            "name": "p->i - 1",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_p__i",
              "region": "stack",
              "label": "p->i",
              "value": "2",
              "highlight": false
            },
            {
              "id": "stack_p__i___1",
              "region": "stack",
              "label": "p->i - 1",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "g 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "p 선언"
          }
        ]
      },
      {
        "line": 11,
        "comment": "p->g + (p->i - 1) = \"DC\" + 1 → 두 번째 문자부터 \"C\"",
        "variables": [
          {
            "name": "p->g",
            "type": "const char*",
            "value": "\"DC\""
          },
          {
            "name": "p->g + (p->i - 1)",
            "type": "const char*",
            "value": "\"C\"",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_p__g",
              "region": "stack",
              "label": "p->g",
              "value": "\"DC\"",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_\"DC\"",
              "region": "stack",
              "label": "\"DC\"",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_p__g____p__i___1_",
              "region": "stack",
              "label": "p->g + (p->i - 1)",
              "value": "\"C\"",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_\"C\"",
              "region": "stack",
              "label": "\"C\"",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_p__g",
              "to": "node_\"DC\"",
              "label": "가리킴",
              "highlight": false
            },
            {
              "from": "ptr_p__g____p__i___1_",
              "to": "node_\"C\"",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "g 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "p 선언"
          }
        ]
      },
      {
        "line": 11,
        "comment": "printf(\"%s\", \"C\") 실행. 최종 출력값은 C입니다.",
        "variables": [
          {
            "name": "p->g + (p->i - 1)",
            "type": "const char*",
            "value": "\"C\""
          }
        ],
        "stdout": "C",
        "memory": {
          "cells": [
            {
              "id": "ptr_p__g____p__i___1_",
              "region": "stack",
              "label": "p->g + (p->i - 1)",
              "value": "\"C\"",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_\"C\"",
              "region": "stack",
              "label": "\"C\"",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_p__g____p__i___1_",
              "to": "node_\"C\"",
              "label": "가리킴",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "g 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "p 선언"
          }
        ]
      }
    ],
};
