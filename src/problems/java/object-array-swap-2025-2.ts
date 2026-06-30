import type { Problem } from "@/types/problem";

const code = `public class Main{
    public static class BO {
        public int v;
        public BO(int v) {
            this.v = v;
        }
    }
    public static void main(String[] args) {
        BO a = new BO(1);
        BO b = new BO(2);
        BO c = new BO(3);
        BO[] arr = {a, b, c};
        BO t = arr[0];
        arr[0] = arr[2];
        arr[2] = t;
        arr[1].v = arr[0].v;
        System.out.println(a.v + "a" + b.v + "b" + c.v);
    }
}`;

export const objectArraySwap2025_2: Problem = {
  id: "object-array-swap-2025-2",
  slug: "object-array-swap-2025-2",
  title: "객체 배열 참조와 필드 변경",
  topic: "참조",
  difficulty: "어려움",
  source: "2025년 2회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 Java언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "1a3b3",
  explanation: `1. a(v=1), b(v=2), c(v=3) 생성
   arr = {a, b, c}

2. arr[0]과 arr[2] 교환 (배열 슬롯만 바뀜, 객체는 그대로)
   - arr = {c, b, a}

3. arr[1].v = arr[0].v → b.v = c.v = 3
   - b 객체의 v가 2 → 3으로 변경

4. a.v=1, b.v=3, c.v=3 (변수 a,b,c가 가리키는 객체 기준)

5. 1 + "a" + 3 + "b" + 3 = "1a3b3"`,
  traceSteps:   [
      {
        "line": 8,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 9,
        "comment": "BO a = new BO(1) — a 객체가 생성되고 v=1이 할당됩니다.",
        "variables": [
          {
            "name": "a.v",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "BO 호출"
          },
          {
            "line": 11,
            "role": "call",
            "label": "BO 호출"
          }
        ]
      },
      {
        "line": 10,
        "comment": "BO b = new BO(2) — b 객체가 생성되고 v=2가 할당됩니다.",
        "variables": [
          {
            "name": "a.v",
            "type": "int",
            "value": 1
          },
          {
            "name": "b.v",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "BO 호출"
          },
          {
            "line": 9,
            "role": "call",
            "label": "BO 호출"
          },
          {
            "line": 9,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "call",
            "label": "BO 호출"
          }
        ]
      },
      {
        "line": 11,
        "comment": "BO c = new BO(3) — c 객체가 생성되고 v=3이 할당됩니다.",
        "variables": [
          {
            "name": "a.v",
            "type": "int",
            "value": 1
          },
          {
            "name": "b.v",
            "type": "int",
            "value": 2
          },
          {
            "name": "c.v",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "BO 호출"
          },
          {
            "line": 9,
            "role": "call",
            "label": "BO 호출"
          },
          {
            "line": 9,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "b 선언"
          }
        ]
      },
      {
        "line": 12,
        "comment": "BO[] arr = {a, b, c} — 배열이 생성되고 세 참조가 저장됩니다.",
        "variables": [
          {
            "name": "a.v",
            "type": "int",
            "value": 1
          },
          {
            "name": "b.v",
            "type": "int",
            "value": 2
          },
          {
            "name": "c.v",
            "type": "int",
            "value": 3
          },
          {
            "name": "arr",
            "type": "BO[]",
            "value": "[a, b, c]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "[a, b, c]",
              "highlight": true
            },
            {
              "id": "stack_arr",
              "region": "stack",
              "label": "arr",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[a, b, c]",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 13,
        "comment": "BO t = arr[0] — t가 a를 가리키는 arr[0] 슬롯의 참조를 받습니다.",
        "variables": [
          {
            "name": "arr",
            "type": "BO[]",
            "value": "[a, b, c]"
          },
          {
            "name": "t",
            "type": "BO",
            "value": "a (v=1)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "[a, b, c]",
              "highlight": false
            },
            {
              "id": "stack_arr",
              "region": "stack",
              "label": "arr",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[a, b, c]",
              "highlight": false
            },
            {
              "id": "heap_t",
              "region": "heap",
              "label": "t",
              "value": "a (v=1)",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 14,
        "comment": "arr[0] = arr[2] — arr[0] 슬롯이 c를 가리키도록 변경됩니다.",
        "variables": [
          {
            "name": "arr",
            "type": "BO[]",
            "value": "[c, b, c]",
            "highlight": true
          },
          {
            "name": "t",
            "type": "BO",
            "value": "a (v=1)"
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "arr 선언"
          },
          {
            "line": 13,
            "role": "read",
            "label": "t 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "[c, b, c]",
              "highlight": true
            },
            {
              "id": "stack_arr",
              "region": "stack",
              "label": "arr",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[c, b, c]",
              "highlight": true
            },
            {
              "id": "heap_t",
              "region": "heap",
              "label": "t",
              "value": "a (v=1)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 15,
        "comment": "arr[2] = t — arr[2] 슬롯이 a를 가리키도록 변경됩니다. 배열은 [c, b, a]가 됩니다.",
        "variables": [
          {
            "name": "arr",
            "type": "BO[]",
            "value": "[c, b, a]",
            "highlight": true
          },
          {
            "name": "a.v",
            "type": "int",
            "value": 1
          },
          {
            "name": "b.v",
            "type": "int",
            "value": 2
          },
          {
            "name": "c.v",
            "type": "int",
            "value": 3
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "c 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "[c, b, a]",
              "highlight": true
            },
            {
              "id": "stack_arr",
              "region": "stack",
              "label": "arr",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[c, b, a]",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 16,
        "comment": "arr[1].v = arr[0].v — arr[1]은 b, arr[0]은 c이므로 b.v = c.v = 3",
        "variables": [
          {
            "name": "arr[0].v (c)",
            "type": "int",
            "value": 3
          },
          {
            "name": "b.v",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_arr",
              "region": "stack",
              "label": "arr",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 17,
        "comment": "println 인자 평가: a.v=1, b.v=3, c.v=3",
        "variables": [
          {
            "name": "a.v",
            "type": "int",
            "value": 1
          },
          {
            "name": "b.v",
            "type": "int",
            "value": 3
          },
          {
            "name": "c.v",
            "type": "int",
            "value": 3
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "v 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "c 선언"
          }
        ]
      },
      {
        "line": 5,
        "comment": "1 + \"a\" + 3 + \"b\" + 3 = \"1a3b3\"",
        "variables": [
          {
            "name": "결과",
            "type": "String",
            "value": "\"1a3b3\"",
            "highlight": true
          }
        ],
        "stdout": "1a3b3",
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "\"1a3b3\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      }
    ],
};
