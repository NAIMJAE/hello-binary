import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>
int main() {
    int x=7, y=4, z;
    z = y%3<3 ? 2 : 1;
    z = z & z >> 1;
    z = x>5 && z<=3 ? z*x : z/x;
    printf("%d", z);
    return 0;
}`;

export const operatorPrecedence2025_3: Problem = {
  id: "operator-precedence-2025-3",
  slug: "operator-precedence-2025-3",
  title: "연산자 우선순위와 삼항 연산",
  topic: "연산자",
  difficulty: "어려움",
  source: "2025년 3회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 C코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "0",
  explanation: `1. x = 7, y = 4

2. z = y%3<3 ? 2 : 1
   - y%3 = 4%3 = 1
   - 1 < 3 → 참 → z = 2

3. z = z & z >> 1
   - >> 가 & 보다 우선: z >> 1 = 2 >> 1 = 1
   - z & 1 = 2 & 1 = 0

4. z = x>5 && z<=3 ? z*x : z/x
   - x>5 = 참, z<=3 = 참 → 조건 참
   - z = z*x = 0×7 = 0

5. printf("%d", 0) → 출력: 0`,
  traceSteps:   [
      {
        "line": 2,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 2,
        "comment": "int x = 7이 할당됩니다.",
        "variables": [
          {
            "name": "x",
            "type": "int",
            "value": 7,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_x",
              "region": "stack",
              "label": "x",
              "value": "7",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "int y = 4가 할당됩니다.",
        "variables": [
          {
            "name": "x",
            "type": "int",
            "value": 7
          },
          {
            "name": "y",
            "type": "int",
            "value": 4,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "y 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_x",
              "region": "stack",
              "label": "x",
              "value": "7",
              "highlight": false
            },
            {
              "id": "stack_y",
              "region": "stack",
              "label": "y",
              "value": "4",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "int z가 선언됩니다. (아직 값 없음)",
        "variables": [
          {
            "name": "x",
            "type": "int",
            "value": 7
          },
          {
            "name": "y",
            "type": "int",
            "value": 4
          },
          {
            "name": "z",
            "type": "int",
            "value": "미할당",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_x",
              "region": "stack",
              "label": "x",
              "value": "7",
              "highlight": false
            },
            {
              "id": "stack_y",
              "region": "stack",
              "label": "y",
              "value": "4",
              "highlight": false
            },
            {
              "id": "stack_z",
              "region": "stack",
              "label": "z",
              "value": "미할당",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "y % 3 = 4 % 3 = 1을 계산합니다.",
        "variables": [
          {
            "name": "y % 3",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "y 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_y___3",
              "region": "stack",
              "label": "y % 3",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "1 < 3은 참이므로 삼항 연산 결과 z = 2입니다.",
        "variables": [
          {
            "name": "y % 3 < 3",
            "type": "bool",
            "value": true
          },
          {
            "name": "z",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_z",
              "region": "stack",
              "label": "z",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 5,
        "comment": ">> 연산이 &보다 우선합니다. z >> 1 = 2 >> 1 = 1",
        "variables": [
          {
            "name": "z",
            "type": "int",
            "value": 2
          },
          {
            "name": "z >> 1",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_z",
              "region": "stack",
              "label": "z",
              "value": "2",
              "highlight": false
            },
            {
              "id": "stack_z____1",
              "region": "stack",
              "label": "z >> 1",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 5,
        "comment": "z & (z >> 1) = 2 & 1 = 0. z가 0으로 갱신됩니다.",
        "variables": [
          {
            "name": "z >> 1",
            "type": "int",
            "value": 1
          },
          {
            "name": "z",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_z____1",
              "region": "stack",
              "label": "z >> 1",
              "value": "1",
              "highlight": false
            },
            {
              "id": "stack_z",
              "region": "stack",
              "label": "z",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "x > 5 → 7 > 5 → 참",
        "variables": [
          {
            "name": "x > 5",
            "type": "bool",
            "value": true,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x 선언"
          }
        ]
      },
      {
        "line": 6,
        "comment": "z <= 3 → 0 <= 3 → 참",
        "variables": [
          {
            "name": "x > 5",
            "type": "bool",
            "value": true
          },
          {
            "name": "z <= 3",
            "type": "bool",
            "value": true,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "z 선언"
          }
        ]
      },
      {
        "line": 4,
        "comment": "조건이 참이므로 z = z * x = 0 × 7 = 0",
        "variables": [
          {
            "name": "z",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_z",
              "region": "stack",
              "label": "z",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "printf(\"%d\", 0) 실행. 최종 출력값은 0입니다.",
        "variables": [
          {
            "name": "z",
            "type": "int",
            "value": 0
          }
        ],
        "stdout": "0",
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_z",
              "region": "stack",
              "label": "z",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
