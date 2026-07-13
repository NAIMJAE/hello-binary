import type { Problem } from "@/types/problem";

const code = `def func(lst):
  for i in range(len(lst) //2):
    lst[i], lst[-i-1] = lst[-i-1], lst[i]

lst = [1,2,3,4,5,6]
func(lst)
print(sum(lst[::2]) - sum(lst[1::2]))`;

export const listReverseSwapSum2024_3: Problem = {
  id: "list-reverse-swap-sum-2024-3",
  slug: "list-reverse-swap-sum-2024-3",
  title: "리스트 양끝 교환과 슬라이스 합",
  topic: "리스트",
  difficulty: "보통",
  source: "2024년 3회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "3",
  explanation: `1. lst = [1, 2, 3, 4, 5, 6]

2. func(lst) 호출 — len(lst) // 2 = 3이므로 i = 0, 1, 2 세 번 반복합니다.
   - i=0: lst[0] ↔ lst[-1]  → [6, 2, 3, 4, 5, 1]
   - i=1: lst[1] ↔ lst[-2]  → [6, 5, 3, 4, 2, 1]
   - i=2: lst[2] ↔ lst[-3]  → [6, 5, 4, 3, 2, 1]
   리스트가 [6, 5, 4, 3, 2, 1]로 뒤집힙니다.

3. sum(lst[::2]) = 6 + 4 + 2 = 12  (짝수 인덱스 0, 2, 4)
4. sum(lst[1::2]) = 5 + 3 + 1 = 9   (홀수 인덱스 1, 3, 5)
5. 12 - 9 = 3

최종 출력: 3`,
  traceSteps:   [
      {
        "line": 5,
        "comment": "프로그램이 시작됩니다.",
        "variables": []
      },
      {
        "line": 5,
        "comment": "lst = [1, 2, 3, 4, 5, 6]가 할당됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4,
              5,
              6
            ],
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[1, 2, 3, 4, 5, 6]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "func(lst)가 호출됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
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
          },
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[1, 2, 3, 4, 5, 6]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 1,
        "comment": "함수 func에 진입합니다. 매개변수 lst는 [1, 2, 3, 4, 5, 6]입니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4,
              5,
              6
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 6,
            "role": "call",
            "label": "func 호출 위치"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[1, 2, 3, 4, 5, 6]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "for i in range(len(lst) // 2) — len(lst)=6, 6//2=3이므로 i=0부터 시작합니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          {
            "name": "i",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[1, 2, 3, 4, 5, 6]",
              "highlight": false
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "lst[0] ↔ lst[-1] 교환 — 1과 6을 바꿔 lst = [6, 2, 3, 4, 5, 1]",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              6,
              2,
              3,
              4,
              5,
              1
            ],
            "highlight": true
          },
          {
            "name": "i",
            "type": "int",
            "value": 0
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[6, 2, 3, 4, 5, 1]",
              "highlight": true
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "다음 반복 i=1",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              6,
              2,
              3,
              4,
              5,
              1
            ]
          },
          {
            "name": "i",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[6, 2, 3, 4, 5, 1]",
              "highlight": false
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ]
      },
      {
        "line": 3,
        "comment": "lst[1] ↔ lst[-2] 교환 — 2와 5를 바꿔 lst = [6, 5, 3, 4, 2, 1]",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              6,
              5,
              3,
              4,
              2,
              1
            ],
            "highlight": true
          },
          {
            "name": "i",
            "type": "int",
            "value": 1
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[6, 5, 3, 4, 2, 1]",
              "highlight": true
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ]
      },
      {
        "line": 2,
        "comment": "다음 반복 i=2",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              6,
              5,
              3,
              4,
              2,
              1
            ]
          },
          {
            "name": "i",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[6, 5, 3, 4, 2, 1]",
              "highlight": false
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ]
      },
      {
        "line": 3,
        "comment": "lst[2] ↔ lst[-3] 교환 — 3과 4를 바꿔 lst = [6, 5, 4, 3, 2, 1]",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              6,
              5,
              4,
              3,
              2,
              1
            ],
            "highlight": true
          },
          {
            "name": "i",
            "type": "int",
            "value": 2
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[6, 5, 4, 3, 2, 1]",
              "highlight": true
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ]
      },
      {
        "line": 2,
        "comment": "for 루프가 종료됩니다. func가 main으로 복귀합니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              6,
              5,
              4,
              3,
              2,
              1
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 6,
            "role": "call",
            "label": "func 호출 위치"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[6, 5, 4, 3, 2, 1]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "sum(lst[::2]) — 짝수 인덱스 [6, 4, 2]의 합은 12입니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              6,
              5,
              4,
              3,
              2,
              1
            ]
          },
          {
            "name": "sum(lst[::2])",
            "type": "int",
            "value": 12,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[6, 5, 4, 3, 2, 1]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "sum(lst[1::2]) — 홀수 인덱스 [5, 3, 1]의 합은 9입니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              6,
              5,
              4,
              3,
              2,
              1
            ]
          },
          {
            "name": "sum(lst[1::2])",
            "type": "int",
            "value": 9,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[6, 5, 4, 3, 2, 1]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "12 - 9 = 3. print(3) 실행 — 최종 출력값은 3입니다.",
        "variables": [
          {
            "name": "결과",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "stdout": "3",
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "lst 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      }
    ],
};
