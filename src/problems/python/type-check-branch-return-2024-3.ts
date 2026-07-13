import type { Problem } from "@/types/problem";

const code = `def func(value):
    if type(value) == type(100):
        return 100
    elif type(value) == type(""):
        return len(value)
    else:
        return 20


a = '100.0'
b = 100.0
c = (100, 200)

print(func(a) + func(b) + func(c))`;

export const typeCheckBranchReturn2024_3: Problem = {
  id: "type-check-branch-return-2024-3",
  slug: "type-check-branch-return-2024-3",
  title: "type 비교와 분기 반환",
  topic: "함수",
  difficulty: "보통",
  source: "2024년 3회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "45",
  explanation: `1. a = '100.0' 는 문자열(str), b = 100.0 은 실수(float), c = (100, 200) 은 튜플(tuple)입니다.
2. func는 입력 타입에 따라 값을 반환합니다.
   - int 타입이면 100 반환
   - str 타입이면 문자열 길이 반환
   - 그 외 타입이면 20 반환
3. func(a): a는 str이므로 len("100.0") = 5 반환
4. func(b): b는 float이므로 else 분기에서 20 반환
5. func(c): c는 tuple이므로 else 분기에서 20 반환
6. 최종 계산: 5 + 20 + 20 = 45
7. 출력값은 45입니다.`,
  traceSteps:   [
      {
        "line": 10,
        "comment": "프로그램이 시작됩니다.",
        "variables": []
      },
      {
        "line": 10,
        "comment": "a = '100.0' 이 할당됩니다.",
        "variables": [
          {
            "name": "a",
            "type": "str",
            "value": "100.0",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "\"100.0\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "b = 100.0 이 할당됩니다.",
        "variables": [
          {
            "name": "a",
            "type": "str",
            "value": "100.0"
          },
          {
            "name": "b",
            "type": "float",
            "value": 100,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "\"100.0\"",
              "highlight": false
            },
            {
              "id": "stack_b",
              "region": "stack",
              "label": "b",
              "value": "100",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          }
        ]
      },
      {
        "line": 12,
        "comment": "c = (100, 200) 이 할당됩니다.",
        "variables": [
          {
            "name": "a",
            "type": "str",
            "value": "100.0"
          },
          {
            "name": "b",
            "type": "float",
            "value": 100
          },
          {
            "name": "c",
            "type": "tuple",
            "value": [
              100,
              200
            ],
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "\"100.0\"",
              "highlight": false
            },
            {
              "id": "stack_b",
              "region": "stack",
              "label": "b",
              "value": "100",
              "highlight": false
            },
            {
              "id": "data_c",
              "region": "data",
              "label": "c",
              "value": "[100, 200]",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          }
        ]
      },
      {
        "line": 14,
        "comment": "print의 첫 번째 인자 func(a)를 호출합니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ]
      },
      {
        "line": 1,
        "comment": "func(value)에 value = a('100.0')가 전달됩니다.",
        "variables": [
          {
            "name": "value",
            "type": "str",
            "value": "100.0",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_value",
              "region": "data",
              "label": "value",
              "value": "\"100.0\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "type(value) == type(\"\") 조건이 참이므로 문자열 분기로 이동합니다.",
        "variables": [
          {
            "name": "분기",
            "type": "bool",
            "value": true,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "call",
            "label": "type 호출"
          }
        ]
      },
      {
        "line": 5,
        "comment": "len(value) = len('100.0') = 5를 반환합니다.",
        "variables": [
          {
            "name": "func(a)",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_func_a_",
              "region": "stack",
              "label": "func(a)",
              "value": "5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "다음으로 func(b)를 호출합니다.",
        "variables": [
          {
            "name": "func(a)",
            "type": "int",
            "value": 5
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_func_a_",
              "region": "stack",
              "label": "func(a)",
              "value": "5",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "b는 float이므로 if/elif가 모두 거짓이고 else 분기로 이동합니다.",
        "variables": [
          {
            "name": "분기",
            "type": "bool",
            "value": false,
            "highlight": true
          }
        ]
      },
      {
        "line": 7,
        "comment": "else에서 20을 반환합니다. func(b) = 20",
        "variables": [
          {
            "name": "func(b)",
            "type": "int",
            "value": 20,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "call",
            "label": "func 호출"
          },
          {
            "line": 1,
            "role": "definition",
            "label": "func 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_func_b_",
              "region": "stack",
              "label": "func(b)",
              "value": "20",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "마지막으로 func(c)를 호출합니다.",
        "variables": [
          {
            "name": "func(a)",
            "type": "int",
            "value": 5
          },
          {
            "name": "func(b)",
            "type": "int",
            "value": 20
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_func_a_",
              "region": "stack",
              "label": "func(a)",
              "value": "5",
              "highlight": false
            },
            {
              "id": "stack_func_b_",
              "region": "stack",
              "label": "func(b)",
              "value": "20",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "c는 tuple이므로 else 분기에서 20을 반환합니다. func(c) = 20",
        "variables": [
          {
            "name": "func(c)",
            "type": "int",
            "value": 20,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "call",
            "label": "func 호출"
          },
          {
            "line": 1,
            "role": "definition",
            "label": "func 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_func_c_",
              "region": "stack",
              "label": "func(c)",
              "value": "20",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "func(a)+func(b)+func(c) = 5 + 20 + 20 = 45, print로 출력합니다.",
        "variables": [
          {
            "name": "결과",
            "type": "int",
            "value": 45,
            "highlight": true
          }
        ],
        "stdout": "45",
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "45",
              "highlight": true
            }
          ],
          "arrows": []
        }
      }
    ],
};
