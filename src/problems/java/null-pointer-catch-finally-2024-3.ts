import type { Problem } from "@/types/problem";

const code = `public class ExceptionHandling {
  public static void main(String[] args) {
      int sum = 0;
      try {
          func();
      } catch (NullPointerException e) {
          sum = sum + 1;
      } catch (Exception e) {
          sum = sum + 10;
      } finally {
          sum = sum + 100;
      }
      System.out.print(sum);
  }

  static void func() throws Exception {
      throw new NullPointerException();
  }
}`;

export const nullPointerCatchFinally2024_3: Problem = {
  id: "null-pointer-catch-finally-2024-3",
  slug: "null-pointer-catch-finally-2024-3",
  title: "NullPointerException catch와 finally",
  topic: "예외처리",
  difficulty: "보통",
  source: "2024년 3회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "101",
  explanation: `1. int sum = 0

2. try 블록에서 func() 호출
   - func() 내부에서 NullPointerException 발생

3. catch(NullPointerException e) — 가장 먼저 맞는 catch 블록 실행
   - sum = sum + 1 → sum = 1

4. catch(Exception e) — 이미 NullPointerException이 처리되어 실행되지 않음

5. finally 블록은 항상 실행
   - sum = sum + 100 → sum = 101

6. System.out.print(101) → 출력: 101`,
  traceSteps:   [
      {
        "line": 2,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 3,
        "comment": "int sum = 0",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "try 블록에 진입합니다.",
        "variables": []
      },
      {
        "line": 5,
        "comment": "func()를 호출합니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 16,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 16,
        "comment": "func()에 진입합니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 5,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 17,
        "comment": "throw new NullPointerException() — NullPointerException이 발생합니다.",
        "variables": [
          {
            "name": "e",
            "type": "NullPointerException",
            "value": "발생",
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "catch(NullPointerException e) — 발생한 예외를 잡습니다.",
        "variables": [
          {
            "name": "e",
            "type": "NullPointerException",
            "value": "잡힘",
            "highlight": true
          }
        ]
      },
      {
        "line": 7,
        "comment": "sum = sum + 1 — sum이 1이 됩니다.",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "sum 선언"
          }
        ]
      },
      {
        "line": 8,
        "comment": "catch(Exception e) — NullPointerException이 이미 처리되어 이 블록은 실행되지 않습니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "catch 정의"
          }
        ]
      },
      {
        "line": 10,
        "comment": "finally 블록에 진입 — try/catch 이후 항상 실행됩니다.",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 1
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 6,
            "role": "definition",
            "label": "catch 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "sum = sum + 100 — sum이 101이 됩니다.",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 101,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "101",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "sum 선언"
          }
        ]
      },
      {
        "line": 13,
        "comment": "System.out.print(sum) 실행 — 최종 출력값은 101입니다.",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 101
          }
        ],
        "stdout": "101",
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "101",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
