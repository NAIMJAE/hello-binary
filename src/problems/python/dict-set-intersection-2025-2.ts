import type { Problem } from "@/types/problem";

const code = `lst = [1,2,3]
dst = {i : i* 2 for i in lst}
s = set(dst.values())
lst[0] = 99 
dst[2]=7
s.add(99)
print(len(s & set(dst.values())))`;

export const dictSetIntersection2025_2: Problem = {
  id: "dict-set-intersection-2025-2",
  slug: "dict-set-intersection-2025-2",
  title: "딕셔너리·집합 교집합",
  topic: "딕셔너리",
  difficulty: "보통",
  source: "2025년 2회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 Pyhon언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "2",
  explanation: `1. lst = [1, 2, 3]
2. dst = {1: 2, 2: 4, 3: 6} (딕셔너리 내포)
3. s = set(dst.values()) → s = {2, 4, 6}
4. lst[0] = 99 → lst만 [99, 2, 3]으로 바뀌고 dst는 그대로
5. dst[2] = 7 → dst = {1: 2, 2: 7, 3: 6}
6. s.add(99) → s = {2, 4, 6, 99}
7. set(dst.values()) = {2, 7, 6}
8. s & set(dst.values()) = {2, 6} (교집합)
9. len({2, 6}) = 2`,
  traceSteps:   [
      {
        "line": 1,
        "comment": "프로그램이 시작됩니다.",
        "variables": []
      },
      {
        "line": 1,
        "comment": "lst = [1, 2, 3]이 할당됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              1,
              2,
              3
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
              "value": "[1, 2, 3]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "딕셔너리 내포로 dst = {1: 2, 2: 4, 3: 6}이 생성됩니다. (키: 원소, 값: 원소×2)",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              1,
              2,
              3
            ]
          },
          {
            "name": "dst",
            "type": "dict",
            "value": "{1: 2, 2: 4, 3: 6}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "s 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[1, 2, 3]",
              "highlight": false
            },
            {
              "id": "data_dst",
              "region": "data",
              "label": "dst",
              "value": "{1: 2, 2: 4, 3: 6}",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "data_dst",
              "to": "data_lst",
              "label": "슬라이스 복사",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 3,
        "comment": "dst.values()는 [2, 4, 6]이고, set()으로 s = {2, 4, 6}이 됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              1,
              2,
              3
            ]
          },
          {
            "name": "dst",
            "type": "dict",
            "value": "{1: 2, 2: 4, 3: 6}"
          },
          {
            "name": "s",
            "type": "set",
            "value": "{2, 4, 6}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "dst 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[1, 2, 3]",
              "highlight": false
            },
            {
              "id": "data_dst",
              "region": "data",
              "label": "dst",
              "value": "{1: 2, 2: 4, 3: 6}",
              "highlight": false
            },
            {
              "id": "data_s",
              "region": "data",
              "label": "s",
              "value": "{2, 4, 6}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "lst[0] = 99로 리스트만 [99, 2, 3]이 됩니다. dst는 lst와 별개이므로 변하지 않습니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              99,
              2,
              3
            ],
            "highlight": true
          },
          {
            "name": "dst",
            "type": "dict",
            "value": "{1: 2, 2: 4, 3: 6}"
          },
          {
            "name": "s",
            "type": "set",
            "value": "{2, 4, 6}"
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "dst 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "s 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[99, 2, 3]",
              "highlight": true
            },
            {
              "id": "data_dst",
              "region": "data",
              "label": "dst",
              "value": "{1: 2, 2: 4, 3: 6}",
              "highlight": false
            },
            {
              "id": "data_s",
              "region": "data",
              "label": "s",
              "value": "{2, 4, 6}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "dst[2] = 7로 dst = {1: 2, 2: 7, 3: 6}이 됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              99,
              2,
              3
            ]
          },
          {
            "name": "dst",
            "type": "dict",
            "value": "{1: 2, 2: 7, 3: 6}",
            "highlight": true
          },
          {
            "name": "s",
            "type": "set",
            "value": "{2, 4, 6}"
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "s 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[99, 2, 3]",
              "highlight": false
            },
            {
              "id": "data_dst",
              "region": "data",
              "label": "dst",
              "value": "{1: 2, 2: 7, 3: 6}",
              "highlight": true
            },
            {
              "id": "data_s",
              "region": "data",
              "label": "s",
              "value": "{2, 4, 6}",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "data_dst",
              "to": "data_lst",
              "label": "슬라이스 복사",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 6,
        "comment": "s.add(99)로 s = {2, 4, 6, 99}가 됩니다.",
        "variables": [
          {
            "name": "lst",
            "type": "list",
            "value": [
              99,
              2,
              3
            ]
          },
          {
            "name": "dst",
            "type": "dict",
            "value": "{1: 2, 2: 7, 3: 6}"
          },
          {
            "name": "s",
            "type": "set",
            "value": "{2, 4, 6, 99}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "dst 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "s 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_lst",
              "region": "data",
              "label": "lst",
              "value": "[99, 2, 3]",
              "highlight": false
            },
            {
              "id": "data_dst",
              "region": "data",
              "label": "dst",
              "value": "{1: 2, 2: 7, 3: 6}",
              "highlight": false
            },
            {
              "id": "data_s",
              "region": "data",
              "label": "s",
              "value": "{2, 4, 6, 99}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "set(dst.values()) = {2, 7, 6}. s & {2, 7, 6} = {2, 6} (공통 원소 2와 6)",
        "variables": [
          {
            "name": "s",
            "type": "set",
            "value": "{2, 4, 6, 99}"
          },
          {
            "name": "dst",
            "type": "dict",
            "value": "{1: 2, 2: 7, 3: 6}"
          },
          {
            "name": "dst.values()",
            "type": "set",
            "value": "{2, 7, 6}",
            "highlight": true
          },
          {
            "name": "교집합",
            "type": "set",
            "value": "{2, 6}",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "lst 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "dst 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_s",
              "region": "data",
              "label": "s",
              "value": "{2, 4, 6, 99}",
              "highlight": false
            },
            {
              "id": "data_dst",
              "region": "data",
              "label": "dst",
              "value": "{1: 2, 2: 7, 3: 6}",
              "highlight": false
            },
            {
              "id": "data_dst_values__",
              "region": "data",
              "label": "dst.values()",
              "value": "{2, 7, 6}",
              "highlight": true
            },
            {
              "id": "data____",
              "region": "data",
              "label": "교집합",
              "value": "{2, 6}",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "len({2, 6}) = 2가 출력됩니다.",
        "variables": [
          {
            "name": "s",
            "type": "set",
            "value": "{2, 4, 6, 99}"
          },
          {
            "name": "dst",
            "type": "dict",
            "value": "{1: 2, 2: 7, 3: 6}"
          },
          {
            "name": "교집합",
            "type": "set",
            "value": "{2, 6}"
          }
        ],
        "stdout": "2",
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "dst 선언"
          },
          {
            "line": 3,
            "role": "read",
            "label": "s 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_s",
              "region": "data",
              "label": "s",
              "value": "{2, 4, 6, 99}",
              "highlight": false
            },
            {
              "id": "data_dst",
              "region": "data",
              "label": "dst",
              "value": "{1: 2, 2: 7, 3: 6}",
              "highlight": false
            },
            {
              "id": "data____",
              "region": "data",
              "label": "교집합",
              "value": "{2, 6}",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
