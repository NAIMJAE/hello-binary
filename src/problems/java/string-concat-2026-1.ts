import type { Problem } from "@/types/problem";

const code = `public class Main {
    public static void main(String[] args) {
        int x1 = 9;
        int x2 = 2;
        String x3 = "3";
        System.out.println(x1 + x2 + "2" + x3);
    }
}`;

export const stringConcat2026_1: Problem = {
  id: "string-concat-2026-1",
  slug: "string-concat-2026-1",
  title: "문자열 연결 연산",
  topic: "연산자",
  difficulty: "보통",
  source: "2026년 1회차",
  estimatedMinutes: 4,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "1123",
  explanation: `1. x1 = 9, x2 = 2, x3 = "3"

2. x1 + x2 + "2" + x3 는 왼쪽부터 순서대로 평가됩니다.

3. x1 + x2 = 9 + 2 = 11 (정수 덧셈)

4. 11 + "2" = "112" (정수가 문자열로 변환 후 연결)

5. "112" + x3 = "112" + "3" = "1123"

6. System.out.println("1123") → 출력: 1123`,
  traceSteps:   [
      {
        "line": 2,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 3,
        "comment": "x1 = 9가 할당됩니다.",
        "variables": [
          {
            "name": "x1",
            "type": "int",
            "value": 9,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_x1",
              "region": "stack",
              "label": "x1",
              "value": "9",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "x2 = 2가 할당됩니다.",
        "variables": [
          {
            "name": "x1",
            "type": "int",
            "value": 9
          },
          {
            "name": "x2",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x1 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_x1",
              "region": "stack",
              "label": "x1",
              "value": "9",
              "highlight": false
            },
            {
              "id": "stack_x2",
              "region": "stack",
              "label": "x2",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 5,
        "comment": "x3 = \"3\"이 할당됩니다.",
        "variables": [
          {
            "name": "x1",
            "type": "int",
            "value": 9
          },
          {
            "name": "x2",
            "type": "int",
            "value": 2
          },
          {
            "name": "x3",
            "type": "String",
            "value": "\"3\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x1 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "x2 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_x1",
              "region": "stack",
              "label": "x1",
              "value": "9",
              "highlight": false
            },
            {
              "id": "stack_x2",
              "region": "stack",
              "label": "x2",
              "value": "2",
              "highlight": false
            },
            {
              "id": "stack_x3",
              "region": "stack",
              "label": "x3",
              "value": "\"3\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "x1 + x2 = 9 + 2 = 11. 아직 모두 정수이므로 덧셈으로 계산됩니다.",
        "variables": [
          {
            "name": "x1 + x2",
            "type": "int",
            "value": 11,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x1 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "x2 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "x3 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_x1___x2",
              "region": "stack",
              "label": "x1 + x2",
              "value": "11",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "11 + \"2\" = \"112\". 문자열이 등장하면 정수 11이 문자열로 변환되어 연결됩니다.",
        "variables": [
          {
            "name": "11 + \"2\"",
            "type": "String",
            "value": "\"112\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x1 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "x2 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "x3 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_11____2_",
              "region": "stack",
              "label": "11 + \"2\"",
              "value": "\"112\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "\"112\" + x3 = \"112\" + \"3\" = \"1123\"",
        "variables": [
          {
            "name": "결과",
            "type": "String",
            "value": "\"1123\"",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "\"1123\"",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x1 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "x2 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "x3 선언"
          }
        ]
      },
      {
        "line": 6,
        "comment": "println 인자 평가 완료 — 결과 문자열 \"1123\"",
        "variables": [
          {
            "name": "결과",
            "type": "String",
            "value": "\"1123\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x1 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "x2 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "x3 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "\"1123\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "System.out.println(\"1123\") 실행. 최종 출력값은 1123입니다.",
        "variables": [
          {
            "name": "결과",
            "type": "String",
            "value": "\"1123\""
          }
        ],
        "stdout": "1123",
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "x1 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "x2 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "x3 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "\"1123\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
