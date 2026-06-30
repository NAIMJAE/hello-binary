import type { Problem } from "@/types/problem";

const code = `enum Tri {
    A("A"), B("AB"), C("ABC");

    private String code;

    Tri(String code) {
        this.code = code;
    }

    public String code() {
        return code;
    }
}

public class Main {
    public static void main(String[] args) {
        Tri t = Tri.values()[Tri.A.name().length()];
        System.out.print(t.code());
    }
}`;

export const enumValuesIndex2025_3: Problem = {
  id: "enum-values-index-2025-3",
  slug: "enum-values-index-2025-3",
  title: "enum values와 인덱스",
  topic: "enum",
  difficulty: "보통",
  source: "2025년 3회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 Java에 대한 코드이다. 알맞는 출력값을 작성하시오.",
  code,
  answer: "AB",
  explanation: `1. Tri.A.name() → "A"
   - "A".length() = 1

2. Tri.values() → [A, B, C] (선언 순서대로 인덱스 0, 1, 2)

3. Tri.values()[1] → B

4. t = B, t.code() → "AB"

5. System.out.print("AB") → 출력: AB`,
  traceSteps:   [
      {
        "line": 16,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 17,
        "comment": "Tri.A.name() → 상수 A의 이름 문자열 \"A\"를 반환합니다.",
        "variables": [
          {
            "name": "Tri.A.name()",
            "type": "String",
            "value": "\"A\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "enum Tri"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "code() 정의"
          }
        ]
      },
      {
        "line": 17,
        "comment": "\"A\".length() = 1 — 배열 인덱스로 사용할 값이 결정됩니다.",
        "variables": [
          {
            "name": "Tri.A.name()",
            "type": "String",
            "value": "\"A\""
          },
          {
            "name": "인덱스",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "enum Tri"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "code() 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack____",
              "region": "stack",
              "label": "인덱스",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "Tri.values() → [A, B, C] (선언 순서대로 인덱스 0, 1, 2)",
        "variables": [
          {
            "name": "Tri.values()",
            "type": "Tri[]",
            "value": "[A, B, C]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "enum Tri"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "code() 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_Tri",
              "region": "data",
              "label": "Tri",
              "value": "[A, B, C]",
              "highlight": true
            },
            {
              "id": "stack_Tri",
              "region": "stack",
              "label": "Tri",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "heap_Tri_values__",
              "region": "heap",
              "label": "Tri.values()",
              "value": "[A, B, C]",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_Tri",
              "to": "data_Tri",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 17,
        "comment": "Tri.values()[1] → B가 선택됩니다.",
        "variables": [
          {
            "name": "Tri.values()[1]",
            "type": "Tri",
            "value": "B",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "enum Tri"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "code() 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "heap_Tri_values___1_",
              "region": "heap",
              "label": "Tri.values()[1]",
              "value": "B",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 1,
        "comment": "Tri t = B — t에 B 상수가 할당됩니다.",
        "variables": [
          {
            "name": "t",
            "type": "Tri",
            "value": "B",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "definition",
            "label": "code() 정의"
          },
          {
            "line": 17,
            "role": "read",
            "label": "t 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "heap_t",
              "region": "heap",
              "label": "t",
              "value": "B",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 18,
        "comment": "t.code() → B의 code 필드 \"AB\"를 반환합니다.",
        "variables": [
          {
            "name": "t.code()",
            "type": "String",
            "value": "\"AB\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "t 선언"
          }
        ]
      },
      {
        "line": 18,
        "comment": "System.out.print(\"AB\") 실행. 최종 출력값은 AB입니다.",
        "variables": [
          {
            "name": "t.code()",
            "type": "String",
            "value": "\"AB\""
          }
        ],
        "stdout": "AB",
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "t 선언"
          }
        ]
      }
    ],
};
