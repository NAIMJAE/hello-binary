import type { Problem } from "@/types/problem";

const code = `public class Main {

    public static void main(String[] args) {
        int[] data = {3, 5, 8, 12, 17};
        System.out.println(func(data, 0, data.length - 1));
    }

    static int func(int[] a, int st, int end) {
        if (st >= end) return 0;
        int mid = (st + end) / 2;
        return a[mid] + Math.max(func(a, st, mid), func(a, mid + 1, end));
    }

}`;

export const recursiveArrayFunc2025_1: Problem = {
  id: "recursive-array-func-2025-1",
  slug: "recursive-array-func-2025-1",
  title: "배열 분할 재귀 func",
  topic: "재귀",
  difficulty: "어려움",
  source: "2025년 1회차",
  estimatedMinutes: 8,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "20",
  explanation: `1. data = {3, 5, 8, 12, 17}, func(data, 0, 4) 호출

2. func(a, st, end) — st >= end 이면 0 반환
   - mid = (st + end) / 2
   - return a[mid] + max(func(a, st, mid), func(a, mid+1, end))

3. func(0, 4): mid=2, a[2]=8
   - func(0, 2): mid=1, a[1]=5
     - func(0, 1): mid=0, a[0]=3
       - func(0, 0)=0, func(1, 1)=0 → 3+0=3
     - func(2, 2)=0 → 5+max(3,0)=8
   - func(3, 4): mid=3, a[3]=12
     - func(3, 3)=0, func(4, 4)=0 → 12+0=12
   → 8 + max(8, 12) = 20

4. System.out.println(20) → 20`,
  traceSteps:   [
      {
        "line": 3,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 4,
        "comment": "int[] data = {3, 5, 8, 12, 17} 가 초기화됩니다.",
        "variables": [
          {
            "name": "data",
            "type": "int[]",
            "value": [
              3,
              5,
              8,
              12,
              17
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
              "value": "[3, 5, 8, 12, 17]",
              "highlight": true
            },
            {
              "id": "stack_data",
              "region": "stack",
              "label": "data",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_data",
              "to": "data_data",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 5,
        "comment": "func(data, 0, 4) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(0, 4)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "data 선언"
          }
        ]
      },
      {
        "line": 8,
        "comment": "func(0, 4) 진입 — st=0, end=4",
        "variables": [
          {
            "name": "st",
            "type": "int",
            "value": 0
          },
          {
            "name": "end",
            "type": "int",
            "value": 4
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "st 선언"
          },
          {
            "line": 11,
            "role": "call",
            "label": "func 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_st",
              "region": "stack",
              "label": "st",
              "value": "0",
              "highlight": false
            },
            {
              "id": "stack_end",
              "region": "stack",
              "label": "end",
              "value": "4",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "mid = (0+4)/2 = 2, a[mid]=a[2]=8",
        "variables": [
          {
            "name": "mid",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "a[mid]",
            "type": "int",
            "value": 8
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_mid",
              "region": "stack",
              "label": "mid",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "func(0, 2) 호출 (왼쪽 재귀)",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(0, 2)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 8,
        "comment": "func(0, 2) 진입 — st=0, end=2",
        "variables": [
          {
            "name": "st",
            "type": "int",
            "value": 0
          },
          {
            "name": "end",
            "type": "int",
            "value": 2
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "st 선언"
          },
          {
            "line": 11,
            "role": "call",
            "label": "func 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_st",
              "region": "stack",
              "label": "st",
              "value": "0",
              "highlight": false
            },
            {
              "id": "stack_end",
              "region": "stack",
              "label": "end",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "mid = (0+2)/2 = 1, a[mid]=a[1]=5",
        "variables": [
          {
            "name": "mid",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "a[mid]",
            "type": "int",
            "value": 5
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_mid",
              "region": "stack",
              "label": "mid",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "func(0, 1) 호출 (왼쪽 재귀)",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(0, 1)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 8,
        "comment": "func(0, 1) 진입 — st=0, end=1",
        "variables": [
          {
            "name": "st",
            "type": "int",
            "value": 0
          },
          {
            "name": "end",
            "type": "int",
            "value": 1
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "st 선언"
          },
          {
            "line": 11,
            "role": "call",
            "label": "func 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_st",
              "region": "stack",
              "label": "st",
              "value": "0",
              "highlight": false
            },
            {
              "id": "stack_end",
              "region": "stack",
              "label": "end",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "mid = (0+1)/2 = 0, a[mid]=a[0]=3",
        "variables": [
          {
            "name": "mid",
            "type": "int",
            "value": 0,
            "highlight": true
          },
          {
            "name": "a[mid]",
            "type": "int",
            "value": 3
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_mid",
              "region": "stack",
              "label": "mid",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "func(0, 0) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(0, 0)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 9,
        "comment": "func(0, 0) — st >= end → 0 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ]
      },
      {
        "line": 11,
        "comment": "func(1, 1) 호출 (오른쪽 재귀)",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(1, 1)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 9,
        "comment": "func(1, 1) — st >= end → 0 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ]
      },
      {
        "line": 11,
        "comment": "func(0, 1) 반환 — 3 + max(0, 0) = 3",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 11,
        "comment": "func(2, 2) 호출 (오른쪽 재귀)",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(2, 2)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 9,
        "comment": "func(2, 2) — st >= end → 0 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ]
      },
      {
        "line": 11,
        "comment": "func(0, 2) 반환 — 5 + max(3, 0) = 8",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 8,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 11,
        "comment": "func(3, 4) 호출 (오른쪽 재귀)",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(3, 4)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 8,
        "comment": "func(3, 4) 진입 — st=3, end=4",
        "variables": [
          {
            "name": "st",
            "type": "int",
            "value": 3
          },
          {
            "name": "end",
            "type": "int",
            "value": 4
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "st 선언"
          },
          {
            "line": 11,
            "role": "call",
            "label": "func 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_st",
              "region": "stack",
              "label": "st",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_end",
              "region": "stack",
              "label": "end",
              "value": "4",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "mid = (3+4)/2 = 3, a[mid]=a[3]=12",
        "variables": [
          {
            "name": "mid",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "a[mid]",
            "type": "int",
            "value": 12
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_mid",
              "region": "stack",
              "label": "mid",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "func(3, 3) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(3, 3)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 9,
        "comment": "func(3, 3) — st >= end → 0 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ]
      },
      {
        "line": 11,
        "comment": "func(4, 4) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "func(4, 4)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 9,
        "comment": "func(4, 4) — st >= end → 0 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ]
      },
      {
        "line": 11,
        "comment": "func(3, 4) 반환 — 12 + max(0, 0) = 12",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 12,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 11,
        "comment": "func(0, 4) 반환 — 8 + max(8, 12) = 20",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 20,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          }
        ]
      },
      {
        "line": 5,
        "comment": "System.out.println(20) → 20 출력",
        "variables": [
          {
            "name": "결과",
            "type": "int",
            "value": 20
          }
        ],
        "stdout": "20",
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "data 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "20",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
