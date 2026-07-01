import type { Problem } from "@/types/problem";

const code = `public class Main {
  public static void main(String[] args) {
    System.out.println(calc("5"));
  }

  static int calc(int value) {
    if (value <= 1) return value;
    return calc(value - 1) + calc(value - 2);
  }

  static int calc(String str) {
    int value = Integer.valueOf(str);
    if (value <= 1) return value;
    return calc(value - 1) + calc(value - 3);
  }
}`;

export const recursiveCalcOverload2025_1: Problem = {
  id: "recursive-calc-overload-2025-1",
  slug: "recursive-calc-overload-2025-1",
  title: "재귀 calc 오버로딩",
  topic: "재귀",
  difficulty: "어려움",
  source: "2025년 1회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "4",
  explanation: `1. calc("5") — String 오버로드 호출, value=5

2. calc(4) + calc(2) — int 오버로드
   - calc(int): calc(value-1) + calc(value-2)
   - calc(String): calc(value-1) + calc(value-3) ← 주의!

3. calc(4) = calc(3) + calc(2)
   - calc(3) = calc(2) + calc(1) = 1 + 1 = 2
   - calc(2) = calc(1) + calc(0) = 1 + 0 = 1
   → calc(4) = 2 + 1 = 3

4. calc(2) = calc(1) + calc(0) = 1 + 0 = 1

5. calc("5") = 3 + 1 = 4`,
  traceSteps:   [
      {
        "line": 2,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 3,
        "comment": "calc(\"5\") 호출 — String 오버로드",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "calc(\"5\")",
            "highlight": true
          }
        ]
      },
      {
        "line": 11,
        "comment": "calc(String str) 진입",
        "variables": [
          {
            "name": "str",
            "type": "String",
            "value": "\"5\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "str 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_str",
              "region": "data",
              "label": "str[]",
              "value": "\"\"5\"\"",
              "highlight": true
            },
            {
              "id": "stack_str",
              "region": "stack",
              "label": "str",
              "value": "→ 문자열",
              "address": "0x100",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_str",
              "to": "data_str",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 12,
        "comment": "int value = Integer.valueOf(\"5\") → value=5",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 13,
        "comment": "if (value <= 1) — value(5) <= 1 ? 거짓",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": false,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "false",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "조건 거짓 → calc(4) + calc(2) 호출 — int 오버로드 (value-1, value-3)",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "calc(4) + calc(2)",
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 4) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 4,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "4",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(4) <= 1 ? 거짓",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": false,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "false",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "조건 거짓 → calc(3) + calc(2) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "calc(3) + calc(2)",
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 3) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(3) <= 1 ? 거짓",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": false,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "false",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "조건 거짓 → calc(2) + calc(1) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "calc(2) + calc(1)",
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 2) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(2) <= 1 ? 거짓",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": false,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "false",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "조건 거짓 → calc(1) + calc(0) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "calc(1) + calc(0)",
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 1) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(1) <= 1 ? 참",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건 참 → 1 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 0) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(0) <= 1 ? 참",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건 참 → 0 반환",
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
        "line": 8,
        "comment": "calc(2) 반환 — 1 + 0 = 1",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 1) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(1) <= 1 ? 참",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건 참 → 1 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ]
      },
      {
        "line": 8,
        "comment": "calc(3) 반환 — 1 + 1 = 2",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 2) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(2) <= 1 ? 거짓",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": false,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "false",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "조건 거짓 → calc(1) + calc(0) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "calc(1) + calc(0)",
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 1) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(1) <= 1 ? 참",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건 참 → 1 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 0) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(0) <= 1 ? 참",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건 참 → 0 반환",
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
        "line": 8,
        "comment": "calc(2) 반환 — 1 + 0 = 1",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ]
      },
      {
        "line": 8,
        "comment": "calc(4) 반환 — 2 + 1 = 3",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 2) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(2) <= 1 ? 거짓",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": false,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "false",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "조건 거짓 → calc(1) + calc(0) 호출",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "calc(1) + calc(0)",
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 1) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(1) <= 1 ? 참",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건 참 → 1 반환",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ]
      },
      {
        "line": 6,
        "comment": "calc(int 0) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "value 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "if (value <= 1) — value(0) <= 1 ? 참",
        "variables": [
          {
            "name": "value <= 1",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value____1",
              "region": "stack",
              "label": "value <= 1",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건 참 → 0 반환",
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
        "line": 8,
        "comment": "calc(2) 반환 — 1 + 0 = 1",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ]
      },
      {
        "line": 14,
        "comment": "calc(\"5\") 반환 — 3 + 1 = 4",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 4,
            "highlight": true
          }
        ]
      },
      {
        "line": 3,
        "comment": "System.out.println(4) → 4 출력",
        "variables": [
          {
            "name": "결과",
            "type": "int",
            "value": 4
          }
        ],
        "stdout": "4",
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "4",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
