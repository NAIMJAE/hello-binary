import type { Problem } from "@/types/problem";

const code = `data = [
    [3, 5, 2, 4, 1],
    [4, 5, 1],
    [4, 4, 1, 5, 4],
    [4, 5]
]

result = {}

for index, lis in enumerate(data):
    list_sum = sum(lis)
    list_len = len(lis)

    result[index] = (list_sum, list_len)

print(result)`;

export const dictEnumerateSum2025_3: Problem = {
  id: "dict-enumerate-sum-2025-3",
  slug: "dict-enumerate-sum-2025-3",
  title: "enumerate와 딕셔너리 튜플 값",
  topic: "딕셔너리",
  difficulty: "보통",
  source: "2025년 3회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 출력값에 알맞는 값을 작성하시오.",
  output: "{0: (①, ②), 1: (③, ④), 2: (⑤, ⑥), 3: (⑦, ⑧)}",
  code,
  answer: "15,5,10,3,18,5,9,2",
  explanation: `각 행마다 sum(리스트)와 len(리스트)를 튜플로 result[index]에 저장합니다.

| index | lis | sum → ①③⑤⑦ | len → ②④⑥⑧ |
|-------|-----|-------------|-------------|
| 0 | [3,5,2,4,1] | 15 (①) | 5 (②) |
| 1 | [4,5,1] | 10 (③) | 3 (④) |
| 2 | [4,4,1,5,4] | 18 (⑤) | 5 (⑥) |
| 3 | [4,5] | 9 (⑦) | 2 (⑧) |

print(result) → {0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}

정답 입력: ①~⑧ 순서대로 15,5,10,3,18,5,9,2`,
  traceSteps:   [
      {
        "line": 1,
        "comment": "프로그램이 시작됩니다.",
        "variables": []
      },
      {
        "line": 1,
        "comment": "2차원 리스트 data에 4개의 내부 리스트가 저장됩니다.",
        "variables": [
          {
            "name": "data",
            "type": "list",
            "value": [
              [
                3,
                5,
                2,
                4,
                1
              ],
              [
                4,
                5,
                1
              ],
              [
                4,
                4,
                1,
                5,
                4
              ],
              [
                4,
                5
              ]
            ],
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_data",
              "region": "data",
              "label": "data",
              "value": "[3,5,2,4,1, 4,5,1, 4,4,1,5,4, 4,5]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "빈 딕셔너리 {}가 result에 할당됩니다.",
        "variables": [
          {
            "name": "data",
            "type": "list",
            "value": [
              [
                3,
                5,
                2,
                4,
                1
              ],
              [
                4,
                5,
                1
              ],
              [
                4,
                4,
                1,
                5,
                4
              ],
              [
                4,
                5
              ]
            ]
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "data 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_data",
              "region": "data",
              "label": "data",
              "value": "[3,5,2,4,1, 4,5,1, 4,4,1,5,4, 4,5]",
              "highlight": false
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "enumerate(data)로 index=0, lis=[3,5,2,4,1]부터 for 루프에 진입합니다.",
        "variables": [
          {
            "name": "data",
            "type": "list",
            "value": [
              [
                3,
                5,
                2,
                4,
                1
              ],
              [
                4,
                5,
                1
              ],
              [
                4,
                4,
                1,
                5,
                4
              ],
              [
                4,
                5
              ]
            ]
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{}"
          },
          {
            "name": "index",
            "type": "int",
            "value": 0,
            "highlight": true
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              3,
              5,
              2,
              4,
              1
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_data",
              "region": "data",
              "label": "data",
              "value": "[3,5,2,4,1, 4,5,1, 4,4,1,5,4, 4,5]",
              "highlight": false
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{}",
              "highlight": false
            },
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "0",
              "highlight": true
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[3, 5, 2, 4, 1]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "sum(lis) = 3+5+2+4+1 = 15 → list_sum = 15 (①)",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 0
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              3,
              5,
              2,
              4,
              1
            ]
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 15,
            "highlight": true
          },
          {
            "name": "list_len",
            "type": "int",
            "value": 5
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{}"
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "list_len 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "0",
              "highlight": false
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[3, 5, 2, 4, 1]",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "15",
              "highlight": true
            },
            {
              "id": "stack_list_len",
              "region": "stack",
              "label": "list_len",
              "value": "5",
              "highlight": false
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "len(lis) = 5 → list_len = 5 (②)",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 0
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              3,
              5,
              2,
              4,
              1
            ]
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 15
          },
          {
            "name": "list_len",
            "type": "int",
            "value": 5,
            "highlight": true
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{}"
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "list_sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "0",
              "highlight": false
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[3, 5, 2, 4, 1]",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "15",
              "highlight": false
            },
            {
              "id": "stack_list_len",
              "region": "stack",
              "label": "list_len",
              "value": "5",
              "highlight": true
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "result[0] = (15, 5)가 저장됩니다.",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 0
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 15
          },
          {
            "name": "list_len",
            "type": "int",
            "value": 5
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5)}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "list_sum 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "list_len 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "0",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "15",
              "highlight": false
            },
            {
              "id": "stack_list_len",
              "region": "stack",
              "label": "list_len",
              "value": "5",
              "highlight": false
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5)}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "enumerate(data)로 index=1, lis=[4,5,1] — for 루프 다음 반복에 진입합니다.",
        "variables": [
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5)}"
          },
          {
            "name": "index",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              5,
              1
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5)}",
              "highlight": false
            },
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "1",
              "highlight": true
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 5, 1]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "sum(lis) = 4+5+1 = 10 → list_sum = 10 (③)",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 1
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              5,
              1
            ]
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 10,
            "highlight": true
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5)}"
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "1",
              "highlight": false
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 5, 1]",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "10",
              "highlight": true
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5)}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "len(lis) = 3 → list_len = 3 (④)",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 1
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              5,
              1
            ]
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 10
          },
          {
            "name": "list_len",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5)}"
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "list_sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "1",
              "highlight": false
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 5, 1]",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "10",
              "highlight": false
            },
            {
              "id": "stack_list_len",
              "region": "stack",
              "label": "list_len",
              "value": "3",
              "highlight": true
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5)}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "result[1] = (10, 3)가 저장됩니다.",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 1
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 10
          },
          {
            "name": "list_len",
            "type": "int",
            "value": 3
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3)}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "list_sum 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "list_len 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "1",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "10",
              "highlight": false
            },
            {
              "id": "stack_list_len",
              "region": "stack",
              "label": "list_len",
              "value": "3",
              "highlight": false
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3)}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "enumerate(data)로 index=2, lis=[4,4,1,5,4] — for 루프 다음 반복에 진입합니다.",
        "variables": [
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3)}"
          },
          {
            "name": "index",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              4,
              1,
              5,
              4
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3)}",
              "highlight": false
            },
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "2",
              "highlight": true
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 4, 1, 5, 4]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "sum(lis) = 4+4+1+5+4 = 18 → list_sum = 18 (⑤)",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 2
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              4,
              1,
              5,
              4
            ]
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 18,
            "highlight": true
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3)}"
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "2",
              "highlight": false
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 4, 1, 5, 4]",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "18",
              "highlight": true
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3)}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "len(lis) = 5 → list_len = 5 (⑥)",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 2
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              4,
              1,
              5,
              4
            ]
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 18
          },
          {
            "name": "list_len",
            "type": "int",
            "value": 5,
            "highlight": true
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3)}"
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "list_sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "2",
              "highlight": false
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 4, 1, 5, 4]",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "18",
              "highlight": false
            },
            {
              "id": "stack_list_len",
              "region": "stack",
              "label": "list_len",
              "value": "5",
              "highlight": true
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3)}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "result[2] = (18, 5)가 저장됩니다.",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 2
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 18
          },
          {
            "name": "list_len",
            "type": "int",
            "value": 5
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5)}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "list_sum 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "list_len 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "2",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "18",
              "highlight": false
            },
            {
              "id": "stack_list_len",
              "region": "stack",
              "label": "list_len",
              "value": "5",
              "highlight": false
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5)}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "enumerate(data)로 index=3, lis=[4,5] — for 루프 다음 반복에 진입합니다.",
        "variables": [
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5)}"
          },
          {
            "name": "index",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              5
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5)}",
              "highlight": false
            },
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "3",
              "highlight": true
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 5]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "sum(lis) = 4+5 = 9 → list_sum = 9 (⑦)",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 3
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              5
            ]
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 9,
            "highlight": true
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5)}"
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "3",
              "highlight": false
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 5]",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "9",
              "highlight": true
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5)}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "len(lis) = 2 → list_len = 2 (⑧)",
        "variables": [
          {
            "name": "index",
            "type": "int",
            "value": 3
          },
          {
            "name": "lis",
            "type": "list",
            "value": [
              4,
              5
            ]
          },
          {
            "name": "list_sum",
            "type": "int",
            "value": 9
          },
          {
            "name": "list_len",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5)}"
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "list_sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_index",
              "region": "stack",
              "label": "index",
              "value": "3",
              "highlight": false
            },
            {
              "id": "data_lis",
              "region": "data",
              "label": "lis",
              "value": "[4, 5]",
              "highlight": false
            },
            {
              "id": "stack_list_sum",
              "region": "stack",
              "label": "list_sum",
              "value": "9",
              "highlight": false
            },
            {
              "id": "stack_list_len",
              "region": "stack",
              "label": "list_len",
              "value": "2",
              "highlight": true
            },
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5)}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "result[3] = (9, 2)가 저장됩니다.",
        "variables": [
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "모든 요소를 처리해 for 루프를 빠져나옵니다.",
        "variables": [
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}"
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 16,
        "comment": "print(result) → {0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}. ①=15, ②=5, ③=10, ④=3, ⑤=18, ⑥=5, ⑦=9, ⑧=2",
        "variables": [
          {
            "name": "result",
            "type": "dict",
            "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}"
          }
        ],
        "stdout": "{0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}",
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_result",
              "region": "data",
              "label": "result",
              "value": "{0: (15, 5), 1: (10, 3), 2: (18, 5), 3: (9, 2)}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
