import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

int main(void) {
    char str[] = "REPUBLICOFKOREA";
    int a = 0;

    while (str[a] != '\\0')
        ++a;

    putchar(str[a - 2]);
    return 0;
}`;

export const stringLengthPutchar2025_3: Problem = {
  id: "string-length-putchar-2025-3",
  slug: "string-length-putchar-2025-3",
  title: "문자열 길이와 putchar",
  topic: "문자열",
  difficulty: "보통",
  source: "2025년 3회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 C코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "E",
  explanation: `1. str[] = "REPUBLICOFKOREA" (길이 15, 인덱스 0~14)

2. while (str[a] != '\\0') ++a;
   - a가 널 문자('\\0') 위치에 도달할 때까지 증가
   - 루프 종료 시 a = 15

3. str[a - 2] = str[13]
   - 인덱스: R(0) E(1) P(2) U(3) B(4) L(5) I(6) C(7) O(8) F(9) K(10) O(11) R(12) E(13) A(14)
   - str[13] = 'E'

4. putchar('E') → 출력: E`,
  traceSteps:   [
      {
        "line": 3,
        "comment": "main(void) 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 4,
        "comment": "char str[] = \"REPUBLICOFKOREA\". 길이 15, 인덱스 0~14입니다.",
        "variables": [
          {
            "name": "str",
            "type": "char[]",
            "value": "\"REPUBLICOFKOREA\"",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_str",
              "region": "data",
              "label": "str",
              "value": "\"REPUBLICOFKOREA\"",
              "highlight": true
            },
            {
              "id": "stack_str",
              "region": "stack",
              "label": "str",
              "value": "→ 배열",
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
        "line": 5,
        "comment": "int a = 0",
        "variables": [
          {
            "name": "str",
            "type": "char[]",
            "value": "\"REPUBLICOFKOREA\""
          },
          {
            "name": "a",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_str",
              "region": "data",
              "label": "str",
              "value": "\"REPUBLICOFKOREA\"",
              "highlight": false
            },
            {
              "id": "stack_str",
              "region": "stack",
              "label": "str",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            },
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_str",
              "to": "data_str",
              "label": "주소",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          }
        ]
      },
      {
        "line": 7,
        "comment": "while (str[a] != '\\0') — str[0] = 'R' ≠ '\\0', 루프 진입",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 0
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'R'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "0",
              "address": "0x204",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 1",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[1] = 'E' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 1
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'E'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 2",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[2] = 'P' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 2
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'P'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 3",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[3] = 'U' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 3
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'U'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "3",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 4",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 4,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "4",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[4] = 'B' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 4
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'B'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "4",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 5",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[5] = 'L' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 5
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'L'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "5",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 6",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 6,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "6",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[6] = 'I' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 6
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'I'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "6",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 7",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 7,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "7",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[7] = 'C' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 7
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'C'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "7",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 8",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 8,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "8",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[8] = 'O' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 8
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'O'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "8",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 9",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 9,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "9",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[9] = 'F' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 9
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'F'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "9",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 10",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 10,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "10",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[10] = 'K' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 10
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'K'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "10",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 11",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 11,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "11",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[11] = 'O' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 11
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'O'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "11",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 12",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 12,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "12",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[12] = 'R' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 12
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'R'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "12",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 13",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 13,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "13",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[13] = 'E' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 13
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'E'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "13",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 14",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 14,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "14",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "while — str[14] = 'A' ≠ '\\0'",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 14
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'A'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "14",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "++a → a = 15",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 15,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "15",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "while — str[15] = '\\0'. 조건 거짓, 루프 종료",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 15,
            "highlight": true
          },
          {
            "name": "str[a]",
            "type": "char",
            "value": "'\\0'"
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "15",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "putchar(str[a - 2]) = putchar(str[13]) = putchar('E')",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 15
          },
          {
            "name": "a - 2",
            "type": "int",
            "value": 13,
            "highlight": true
          },
          {
            "name": "str[13]",
            "type": "char",
            "value": "'E'",
            "highlight": true
          }
        ],
        "stdout": "E",
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "str 선언"
          },
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "15",
              "highlight": false
            },
            {
              "id": "stack_a___2",
              "region": "stack",
              "label": "a - 2",
              "value": "13",
              "highlight": true
            }
          ],
          "arrows": []
        }
      }
    ],
};
