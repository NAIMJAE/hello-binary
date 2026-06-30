import type { Problem } from "@/types/problem";

const code = `def f(a):
    m = [[x] for x in a]
    b = m[:]
    for i in range(len(b) - 1):
        b[i+1] += b[i]
    return sum(len(x) for x in m)
 
print(f([1, 2, 3, 4]))`;

export const nestedListShallowCopy2026_1: Problem = {
  id: "nested-list-shallow-copy-2026-1",
  slug: "nested-list-shallow-copy-2026-1",
  title: "리스트 얕은 복사와 누적 확장",
  topic: "리스트",
  difficulty: "어려움",
  source: "2026년 1회차",
  estimatedMinutes: 7,
  prompt: "아래 파이썬 코드를 실행했을 때 출력되는 값을 쓰시오.",
  code,
  answer: "10",
  explanation: `1. f([1, 2, 3, 4]) 호출 시 a = [1, 2, 3, 4]
2. m = [[x] for x in a] → m = [[1], [2], [3], [4]]
3. b = m[:]는 바깥 리스트만 복사하는 얕은 복사입니다. 안쪽 리스트는 m과 같은 객체를 참조합니다.
4. i=0: b[1] += b[0] → [2]에 [1]을 더해 [2, 1]. m[1]도 같은 객체라 m = [[1], [2, 1], [3], [4]]
5. i=1: b[2] += b[1] → [3, 2, 1], m도 함께 변경
6. i=2: b[3] += b[2] → [4, 3, 2, 1], m = [[1], [2, 1], [3, 2, 1], [4, 3, 2, 1]]
7. return sum(len(x) for x in m) = 1 + 2 + 3 + 4 = 10
8. print(10) → 10`,
  traceSteps:   [
      {
        "line": 1,
        "comment": "프로그램이 시작됩니다. f([1, 2, 3, 4])가 호출됩니다.",
        "variables": []
      },
      {
        "line": 1,
        "comment": "함수 f에 인자 a = [1, 2, 3, 4]가 전달됩니다.",
        "variables": [
          {
            "name": "a",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "f 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 2, 3, 4]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "리스트 내포로 m = [[1], [2], [3], [4]]가 생성됩니다. 각 요소는 길이 1인 리스트입니다.",
        "variables": [
          {
            "name": "a",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4
            ]
          },
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2
              ],
              [
                3
              ],
              [
                4
              ]
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
              "value": "[1, 2, 3, 4]",
              "highlight": false
            },
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2, 3, 4]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "b = m[:]는 얕은 복사입니다. 바깥 리스트는 새로 만들어지지만, 안쪽 리스트 [1], [2] 등은 m과 같은 객체를 가리킵니다.",
        "variables": [
          {
            "name": "a",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4
            ]
          },
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2
              ],
              [
                3
              ],
              [
                4
              ]
            ]
          },
          {
            "name": "b",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2
              ],
              [
                3
              ],
              [
                4
              ]
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "m 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "반복문"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 2, 3, 4]",
              "highlight": false
            },
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2, 3, 4]",
              "highlight": false
            },
            {
              "id": "data_b",
              "region": "data",
              "label": "b",
              "value": "[1, 2, 3, 4]",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "data_b",
              "to": "data_m",
              "label": "얕은 복사 (내부 리스트 공유)",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 4,
        "comment": "range(len(b) - 1) = range(3). i = 0부터 반복문에 진입합니다.",
        "variables": [
          {
            "name": "a",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4
            ]
          },
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2
              ],
              [
                3
              ],
              [
                4
              ]
            ]
          },
          {
            "name": "b",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2
              ],
              [
                3
              ],
              [
                4
              ]
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
            "line": 2,
            "role": "read",
            "label": "m 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "b 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 2, 3, 4]",
              "highlight": false
            },
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2, 3, 4]",
              "highlight": false
            },
            {
              "id": "data_b",
              "region": "data",
              "label": "b",
              "value": "[1, 2, 3, 4]",
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
          "arrows": [
            {
              "from": "data_b",
              "to": "data_m",
              "label": "얕은 복사 (내부 리스트 공유)",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 5,
        "comment": "b[1] += b[0] → [2]에 [1]을 확장하여 [2, 1]. m[1]이 같은 객체라 m도 [[1], [2, 1], [3], [4]]로 바뀝니다.",
        "variables": [
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3
              ],
              [
                4
              ]
            ],
            "highlight": true
          },
          {
            "name": "b",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3
              ],
              [
                4
              ]
            ]
          },
          {
            "name": "i",
            "type": "int",
            "value": 0
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "m 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "반복문"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2,1, 3, 4]",
              "highlight": true
            },
            {
              "id": "data_b",
              "region": "data",
              "label": "b",
              "value": "[1, 2,1, 3, 4]",
              "highlight": false
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "data_b",
              "to": "data_m",
              "label": "얕은 복사 (내부 리스트 공유)",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 4,
        "comment": "i = 1로 반복이 계속됩니다.",
        "variables": [
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3
              ],
              [
                4
              ]
            ]
          },
          {
            "name": "b",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3
              ],
              [
                4
              ]
            ]
          },
          {
            "name": "i",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "m 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "b 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2,1, 3, 4]",
              "highlight": false
            },
            {
              "id": "data_b",
              "region": "data",
              "label": "b",
              "value": "[1, 2,1, 3, 4]",
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
          "arrows": [
            {
              "from": "data_b",
              "to": "data_m",
              "label": "얕은 복사 (내부 리스트 공유)",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 5,
        "comment": "b[2] += b[1] → [3, 2, 1]. m[2]도 같은 객체이므로 m = [[1], [2, 1], [3, 2, 1], [4]]",
        "variables": [
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4
              ]
            ],
            "highlight": true
          },
          {
            "name": "b",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4
              ]
            ]
          },
          {
            "name": "i",
            "type": "int",
            "value": 1
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "m 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "반복문"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2,1, 3,2,1, 4]",
              "highlight": true
            },
            {
              "id": "data_b",
              "region": "data",
              "label": "b",
              "value": "[1, 2,1, 3,2,1, 4]",
              "highlight": false
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "data_b",
              "to": "data_m",
              "label": "얕은 복사 (내부 리스트 공유)",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 4,
        "comment": "i = 2, 마지막 반복입니다.",
        "variables": [
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4
              ]
            ]
          },
          {
            "name": "b",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4
              ]
            ]
          },
          {
            "name": "i",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "m 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "b 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2,1, 3,2,1, 4]",
              "highlight": false
            },
            {
              "id": "data_b",
              "region": "data",
              "label": "b",
              "value": "[1, 2,1, 3,2,1, 4]",
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
          "arrows": [
            {
              "from": "data_b",
              "to": "data_m",
              "label": "얕은 복사 (내부 리스트 공유)",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 5,
        "comment": "b[3] += b[2] → [4, 3, 2, 1]. m = [[1], [2, 1], [3, 2, 1], [4, 3, 2, 1]]",
        "variables": [
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4,
                3,
                2,
                1
              ]
            ],
            "highlight": true
          },
          {
            "name": "b",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4,
                3,
                2,
                1
              ]
            ]
          },
          {
            "name": "i",
            "type": "int",
            "value": 2
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "m 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 4,
            "role": "read",
            "label": "반복문"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2,1, 3,2,1, 4,3,2,1]",
              "highlight": true
            },
            {
              "id": "data_b",
              "region": "data",
              "label": "b",
              "value": "[1, 2,1, 3,2,1, 4,3,2,1]",
              "highlight": false
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "data_b",
              "to": "data_m",
              "label": "얕은 복사 (내부 리스트 공유)",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 4,
        "comment": "반복문을 빠져나옵니다.",
        "variables": [
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4,
                3,
                2,
                1
              ]
            ]
          },
          {
            "name": "b",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4,
                3,
                2,
                1
              ]
            ]
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "m 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "b 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2,1, 3,2,1, 4,3,2,1]",
              "highlight": false
            },
            {
              "id": "data_b",
              "region": "data",
              "label": "b",
              "value": "[1, 2,1, 3,2,1, 4,3,2,1]",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "data_b",
              "to": "data_m",
              "label": "얕은 복사 (내부 리스트 공유)",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 6,
        "comment": "sum(len(x) for x in m) = len([1])+len([2,1])+len([3,2,1])+len([4,3,2,1]) = 1+2+3+4 = 10을 반환합니다.",
        "variables": [
          {
            "name": "m",
            "type": "list",
            "value": [
              [
                1
              ],
              [
                2,
                1
              ],
              [
                3,
                2,
                1
              ],
              [
                4,
                3,
                2,
                1
              ]
            ]
          },
          {
            "name": "반환값",
            "type": "int",
            "value": 10,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "m 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_m",
              "region": "data",
              "label": "m",
              "value": "[1, 2,1, 3,2,1, 4,3,2,1]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "print(10)이 실행되어 최종 출력값 10이 나옵니다.",
        "variables": [],
        "stdout": "10",
        "relatedLines": [
          {
            "line": 1,
            "role": "definition",
            "label": "f 정의"
          }
        ]
      }
    ],
};
