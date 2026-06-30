import type { Problem } from "@/types/problem";

const code = `lst = list(range(10))
for c in lst[::-2]:
    print(c, end='A')
print()`;

export const listSlicePrint2026_1: Problem = {
  id: "list-slice-print-2026-1",
  slug: "list-slice-print-2026-1",
  title: "리스트 슬라이싱과 print",
  topic: "슬라이싱",
  difficulty: "보통",
  source: "2026년 1회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "9A7A5A3A1A",
  explanation: `1. list(range(10))으로 lst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]가 됩니다.
2. lst[::-2]는 뒤에서부터 2칸 간격으로 요소를 가져와 [9, 7, 5, 3, 1]이 됩니다.
3. for 루프에서 각 c에 대해 print(c, end='A')가 실행됩니다.
   - 9 → "9A", 7 → "9A7A", 5 → "9A7A5A", 3 → "9A7A5A3A", 1 → "9A7A5A3A1A"
4. end='A'이므로 값 뒤에 'A'가 붙고 줄바꿈 없이 이어 출력됩니다.
5. 마지막 print()는 줄바꿈만 출력합니다.
6. 최종 출력: 9A7A5A3A1A`,
  traceSteps:   [
      {
        "line": 1,
        "comment": "프로그램이 시작됩니다.",
        "variables": []
      },
      {
        "line": 1,
        "comment": "range(10)은 0~9이고, list()로 감싸 lst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]가 됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
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
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "lst[::-2]는 뒤에서부터 2칸 간격으로 슬라이싱하여 [9, 7, 5, 3, 1]이 됩니다. for 루프에 진입합니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 9,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
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
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "9",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "print(9, end='A')가 실행되어 '9A'가 출력됩니다. (줄바꿈 없음)",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 9
          }
        ],
        "stdout": "9A",
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "9",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "c (for 루프)"
          }
        ]
      },
      {
        "line": 2,
        "comment": "다음 요소 c = 7로 루프가 계속됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 7,
            "highlight": true
          }
        ],
        "stdout": "9A",
        "relatedLines": [
          {
            "line": 1,
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
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "7",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "print(7, end='A')가 실행되어 '7A'가 이어서 출력됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 7
          }
        ],
        "stdout": "9A7A",
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "7",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "c (for 루프)"
          }
        ]
      },
      {
        "line": 2,
        "comment": "다음 요소 c = 5",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "stdout": "9A7A",
        "relatedLines": [
          {
            "line": 1,
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
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "print(5, end='A') → 누적 출력 '9A7A5A'",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 5
          }
        ],
        "stdout": "9A7A5A",
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "5",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "c (for 루프)"
          }
        ]
      },
      {
        "line": 2,
        "comment": "다음 요소 c = 3",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "stdout": "9A7A5A",
        "relatedLines": [
          {
            "line": 1,
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
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "print(3, end='A') → 누적 출력 '9A7A5A3A'",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 3
          }
        ],
        "stdout": "9A7A5A3A",
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "3",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "c (for 루프)"
          }
        ]
      },
      {
        "line": 2,
        "comment": "다음 요소 c = 1",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "stdout": "9A7A5A3A",
        "relatedLines": [
          {
            "line": 1,
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
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "print(1, end='A') → 누적 출력 '9A7A5A3A1A'",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          {
            "name": "c",
            "type": "int",
            "value": 1
          }
        ],
        "stdout": "9A7A5A3A1A",
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            },
            {
              "id": "stack_c",
              "region": "stack",
              "label": "c",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "c (for 루프)"
          }
        ]
      },
      {
        "line": 2,
        "comment": "더 이상 반복할 요소가 없어 for 루프를 빠져나옵니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ],
        "stdout": "9A7A5A3A1A",
        "relatedLines": [
          {
            "line": 1,
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
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "print()가 실행되어 줄바꿈이 출력됩니다. 최종 출력값은 9A7A5A3A1A입니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          }
        ],
        "stdout": "9A7A5A3A1A",
        "relatedLines": [
          {
            "line": 1,
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
              "value": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
