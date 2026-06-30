import type { Problem } from "@/types/problem";

const code = `public class Main {

    static interface F {
        int apply(int x) throws Exception;
    }

    public static int run(F f) {
        try {
            return f.apply(3);
        } catch (Exception e) {
            return 7;
        }
    }

    public static void main(String[] args) {

        F f = (x) -> {
            if (x > 2) {
                throw new Exception();
            }
            return x * 2;
        };

        System.out.print(run(f) + run((int n) -> n + 9));
    }

}`;

export const lambdaExceptionCatch2025_2: Problem = {
  id: "lambda-exception-catch-2025-2",
  slug: "lambda-exception-catch-2025-2",
  title: "람다식과 예외 처리",
  topic: "람다",
  difficulty: "어려움",
  source: "2025년 2회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 Java언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "19",
  explanation: `1. run(f) 호출
   - f.apply(3): x=3, x>2 → Exception 발생
   - catch에서 7 반환

2. run((int n) -> n + 9) 호출
   - apply(3): n=3, 예외 없음 → 3+9 = 12 반환

3. run(f) + run(...) = 7 + 12 = 19

4. System.out.print(19) → 출력: 19`,
  traceSteps:   [
      {
        "line": 15,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 15,
        "comment": "람다 f 정의: x>2이면 Exception, 아니면 x*2 반환",
        "variables": [
          {
            "name": "f",
            "type": "F",
            "value": "(x) -> { ... }",
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
            "line": 17,
            "role": "read",
            "label": "f 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "heap_f",
              "region": "heap",
              "label": "f",
              "value": "(x) -> { ... }",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "run(f) 호출 — 첫 번째 인자로 람다 f가 전달됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "run(f)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 24,
            "role": "call",
            "label": "run 호출 위치"
          }
        ]
      },
      {
        "line": 7,
        "comment": "run() 내부 try 블록 진입",
        "variables": []
      },
      {
        "line": 9,
        "comment": "f.apply(3) 호출 — 람다에 x=3이 전달됩니다.",
        "variables": [
          {
            "name": "x",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "apply 호출 위치"
          },
          {
            "line": 4,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 17,
            "role": "read",
            "label": "f 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_x",
              "region": "stack",
              "label": "x",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "x=3, x>2 조건 참 → Exception 발생",
        "variables": [
          {
            "name": "x > 2",
            "type": "bool",
            "value": true,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "call",
            "label": "apply 호출"
          }
        ]
      },
      {
        "line": 10,
        "comment": "Exception이 catch 블록에서 잡힙니다.",
        "variables": [
          {
            "name": "catch",
            "type": "String",
            "value": "Exception e",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "f 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_catch",
              "region": "stack",
              "label": "catch",
              "value": "Exception e",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "catch에서 return 7 — run(f)는 7을 반환합니다.",
        "variables": [
          {
            "name": "run(f)",
            "type": "int",
            "value": 7,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "f 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_run_f_",
              "region": "stack",
              "label": "run(f)",
              "value": "7",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "run((int n) -> n + 9) 호출 — 두 번째 람다가 전달됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "run((int n) -> n + 9)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 24,
            "role": "call",
            "label": "run 호출 위치"
          }
        ]
      },
      {
        "line": 7,
        "comment": "run() 내부 try 블록 진입 (두 번째 호출)",
        "variables": []
      },
      {
        "line": 9,
        "comment": "apply(3) 호출 — n=3, 예외 없이 n+9 계산",
        "variables": [
          {
            "name": "n",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "apply 호출"
          },
          {
            "line": 17,
            "role": "read",
            "label": "f 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_n",
              "region": "stack",
              "label": "n",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "return 12 — run(람다)는 12를 반환합니다.",
        "variables": [
          {
            "name": "run(람다)",
            "type": "int",
            "value": 12,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_run____",
              "region": "stack",
              "label": "run(람다)",
              "value": "12",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "7 + 12 = 19",
        "variables": [
          {
            "name": "run(f)",
            "type": "int",
            "value": 7
          },
          {
            "name": "run(람다)",
            "type": "int",
            "value": 12
          },
          {
            "name": "합계",
            "type": "int",
            "value": 19,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "apply 호출"
          },
          {
            "line": 17,
            "role": "read",
            "label": "f 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_run_f_",
              "region": "stack",
              "label": "run(f)",
              "value": "7",
              "highlight": false
            },
            {
              "id": "stack_run____",
              "region": "stack",
              "label": "run(람다)",
              "value": "12",
              "highlight": false
            },
            {
              "id": "stack___",
              "region": "stack",
              "label": "합계",
              "value": "19",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 24,
        "comment": "System.out.print(19) 실행. 최종 출력값은 19입니다.",
        "variables": [
          {
            "name": "합계",
            "type": "int",
            "value": 19
          }
        ],
        "stdout": "19",
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "f 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "합계",
              "value": "19",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
