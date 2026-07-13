import type { Problem } from "@/types/problem";

const code = `public class Main{
  static String[] s = new String[3];

  static void func(String[] s, int size){
    for(int i=1; i<size; i++){
      if(s[i-1].equals(s[i])){
        System.out.print("O");
      }else{
        System.out.print("N");
      }
    }
    for(String m : s){
      System.out.print(m);
    }
  }

  public static void main(String[] args){
    s[0] = "A";
    s[1] = "A";
    s[2] = new String("A");

    func(s, 3);
  }
}`;

export const stringEqualsArrayLoop2024_3: Problem = {
  id: "string-equals-array-loop-2024-3",
  slug: "string-equals-array-loop-2024-3",
  title: "equals 비교와 문자열 배열 순회",
  topic: "참조",
  difficulty: "보통",
  source: "2024년 3회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "OOAAA",
  explanation: `1. static 배열 s는 길이 3으로 생성되고, main에서 s[0], s[1], s[2] 모두 문자열 "A"가 들어갑니다.

2. s[2]는 new String("A")로 만들어져 참조는 다를 수 있지만, equals()는 문자열 내용 비교이므로 "A"와 "A"는 같다고 판단합니다.

3. 첫 번째 for(i=1~2):
   - i=1: s[0].equals(s[1]) -> true -> "O" 출력
   - i=2: s[1].equals(s[2]) -> true -> "O" 출력
   따라서 "OO"가 출력됩니다.

4. 두 번째 for(String m : s)에서 배열 원소를 순서대로 출력:
   - "A", "A", "A" 출력 -> "AAA"

5. 최종 출력은 "OO" + "AAA" = OOAAA`,
  traceSteps:   [
      {
        "line": 17,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 18,
        "comment": "s[0] = \"A\"가 저장됩니다.",
        "variables": [
          {
            "name": "s",
            "type": "String[]",
            "value": [
              "\"A\"",
              "null",
              "null"
            ],
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_s",
              "region": "data",
              "label": "s",
              "value": "[\"A\", null, null]",
              "highlight": true
            },
            {
              "id": "stack_s",
              "region": "stack",
              "label": "s",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_s",
              "to": "data_s",
              "label": "주소",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "s 선언"
          }
        ]
      },
      {
        "line": 19,
        "comment": "s[1] = \"A\"가 저장됩니다.",
        "variables": [
          {
            "name": "s",
            "type": "String[]",
            "value": [
              "\"A\"",
              "\"A\"",
              "null"
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
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
              "value": "[\"A\", \"A\", null]",
              "highlight": true
            },
            {
              "id": "stack_s",
              "region": "stack",
              "label": "s",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_s",
              "to": "data_s",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 20,
        "comment": "s[2] = new String(\"A\")로 마지막 원소가 채워집니다.",
        "variables": [
          {
            "name": "s",
            "type": "String[]",
            "value": [
              "\"A\"",
              "\"A\"",
              "\"A\""
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
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
              "value": "[\"A\", \"A\", \"A\"]",
              "highlight": true
            },
            {
              "id": "stack_s",
              "region": "stack",
              "label": "s",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_s",
              "to": "data_s",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 22,
        "comment": "호출문이 실행되어 정의된 메서드 내부 흐름으로 이동합니다.",
        "variables": [
          {
            "name": "size",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "func 호출"
          },
          {
            "line": 4,
            "role": "read",
            "label": "size 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_size",
              "region": "stack",
              "label": "size",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 5,
        "comment": "func에 진입하고 첫 번째 for 루프(i=1)로 비교를 시작합니다.",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "size",
            "type": "int",
            "value": 3
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "size 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "1",
              "highlight": true
            },
            {
              "id": "stack_size",
              "region": "stack",
              "label": "size",
              "value": "3",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "if 조건의 equals 비교 결과가 true입니다.",
        "variables": [
          {
            "name": "비교결과",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_____",
              "region": "stack",
              "label": "비교결과",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건이 true이므로 \"O\"를 출력합니다.",
        "variables": [],
        "stdout": "O"
      },
      {
        "line": 5,
        "comment": "다음 반복(i=2)로 진행합니다.",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "size",
            "type": "int",
            "value": 3
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "size 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "2",
              "highlight": true
            },
            {
              "id": "stack_size",
              "region": "stack",
              "label": "size",
              "value": "3",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "두 번째 조건 비교도 true입니다. 같은 문자 내용이므로 참으로 판단됩니다.",
        "variables": [
          {
            "name": "비교결과",
            "type": "boolean",
            "value": true,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_____",
              "region": "stack",
              "label": "비교결과",
              "value": "true",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "조건이 true이므로 \"O\"를 한 번 더 출력합니다. 현재까지 출력은 OO입니다.",
        "variables": [],
        "stdout": "O"
      },
      {
        "line": 12,
        "comment": "두 번째 for-each 루프에 진입하고 첫 원소 m=\"A\"를 꺼냅니다.",
        "variables": [
          {
            "name": "m",
            "type": "String",
            "value": "\"A\"",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_m",
              "region": "stack",
              "label": "m",
              "value": "\"A\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 13,
        "comment": "첫 번째 원소 \"A\"를 출력합니다.",
        "variables": [
          {
            "name": "m",
            "type": "String",
            "value": "\"A\""
          }
        ],
        "stdout": "A",
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "m 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_m",
              "region": "stack",
              "label": "m",
              "value": "\"A\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "두 번째 원소 m=\"A\"를 순회합니다.",
        "variables": [
          {
            "name": "m",
            "type": "String",
            "value": "\"A\"",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_m",
              "region": "stack",
              "label": "m",
              "value": "\"A\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 13,
        "comment": "두 번째 \"A\"를 출력합니다.",
        "variables": [
          {
            "name": "m",
            "type": "String",
            "value": "\"A\""
          }
        ],
        "stdout": "A",
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "m 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_m",
              "region": "stack",
              "label": "m",
              "value": "\"A\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "세 번째 원소 m=\"A\"를 순회합니다.",
        "variables": [
          {
            "name": "m",
            "type": "String",
            "value": "\"A\"",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_m",
              "region": "stack",
              "label": "m",
              "value": "\"A\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 13,
        "comment": "세 번째 \"A\"를 출력합니다. 최종 출력은 OOAAA입니다.",
        "variables": [
          {
            "name": "m",
            "type": "String",
            "value": "\"A\""
          }
        ],
        "stdout": "A",
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "m 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_m",
              "region": "stack",
              "label": "m",
              "value": "\"A\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
