import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>
char Data[5] = {'B', 'A', 'D', 'E'};
char c;

int main(){
    int i, temp, temp2;

    c = 'C';
    printf("%d\\n", Data[3]-Data[1]);

    for(i=0;i<5;++i){
        if(Data[i]>c)
            break;
    }

    temp = Data[i];
    Data[i] = c;
    i++;

    for(;i<5;++i){
        temp2 = Data[i];
        Data[i] = temp;
        temp = temp2;
    }

    for(i=0;i<5;i++){
        printf("%c", Data[i]);
    }
}`;

export const charArrayInsert2025_1: Problem = {
  id: "char-array-insert-2025-1",
  slug: "char-array-insert-2025-1",
  title: "문자 배열 삽입과 밀기",
  topic: "문자열",
  difficulty: "보통",
  source: "2025년 1회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "4\nBACDE",
  explanation: `1. 전역 char Data[5] = {'B','A','D','E'} → Data = "BADE" + '\\0' (Data[4]='\\0')

2. c = 'C' (ASCII 67)

3. printf("%d\\n", Data[3]-Data[1])
   - Data[3]='E'(69), Data[1]='A'(65) → 69-65 = 4
   - 첫 줄 출력: 4

4. for에서 Data[i] > c 인 첫 i 찾기
   - i=0 'B'(66)≤67, i=1 'A'(65)≤67, i=2 'D'(68)>67 → break, i=2

5. temp='D', Data[2]='C', i=3 → Data = "BAC\\0E"

6. 두 번째 for로 i=3~4 오른쪽 밀기
   - i=3: Data[3]='D', temp='E'
   - i=4: Data[4]='E', temp='\\0'
   → Data = "BACDE"

7. printf("%c", ...) 연속 출력 → BACDE

전체 출력:
4
BACDE

(답안 입력란에는 4 다음 줄에 BACDE 를 입력)`,
  traceSteps:   [
      {
        "line": 2,
        "comment": "전역 배열 Data[5] = {'B','A','D','E'}가 초기화됩니다. 나머지 한 칸(Data[4])은 '\\0'입니다.",
        "variables": [
          {
            "name": "Data",
            "type": "char[]",
            "value": "['B','A','D','E','\\0']",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_Data",
              "region": "data",
              "label": "Data",
              "value": "['B','A','D','E','\\0']",
              "highlight": true
            },
            {
              "id": "stack_Data",
              "region": "stack",
              "label": "Data",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "data_str",
              "region": "data",
              "label": "str[]",
              "value": "\"['B','A','D','E','\\0']\"",
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
              "from": "stack_Data",
              "to": "data_Data",
              "label": "주소",
              "highlight": true
            },
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
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 6,
        "comment": "int i, temp, temp2; — 지역 변수를 선언합니다.",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": "미할당",
            "highlight": true
          },
          {
            "name": "temp",
            "type": "int",
            "value": "미할당",
            "highlight": true
          },
          {
            "name": "temp2",
            "type": "int",
            "value": "미할당",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "미할당",
              "highlight": true
            },
            {
              "id": "stack_temp",
              "region": "stack",
              "label": "temp",
              "value": "미할당",
              "highlight": true
            },
            {
              "id": "stack_temp2",
              "region": "stack",
              "label": "temp2",
              "value": "미할당",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "c = 'C' (ASCII 67)",
        "variables": [
          {
            "name": "c",
            "type": "char",
            "value": "'C' (67)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "c 선언"
          }
        ]
      },
      {
        "line": 9,
        "comment": "Data[3]-Data[1] = 'E'-'A' = 69-65 = 4",
        "variables": [
          {
            "name": "Data[3]",
            "type": "char",
            "value": "'E' (69)"
          },
          {
            "name": "Data[1]",
            "type": "char",
            "value": "'A' (65)"
          },
          {
            "name": "Data[3]-Data[1]",
            "type": "int",
            "value": 4,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          }
        ]
      },
      {
        "line": 9,
        "comment": "printf(\"%d\\n\", 4) 실행 → 첫 줄에 4 출력",
        "variables": [
          {
            "name": "Data[3]-Data[1]",
            "type": "int",
            "value": 4
          }
        ],
        "stdout": "4",
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          }
        ]
      },
      {
        "line": 11,
        "comment": "for(i=0; i<5; ++i) — i=0, Data[0]='B'(66)",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0,
            "highlight": true
          },
          {
            "name": "Data[0]",
            "type": "char",
            "value": "'B' (66)"
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 13,
        "comment": "Data[0]='B' > 'C'? → 66>67 거짓, break 하지 않음",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0
          },
          {
            "name": "Data[i]",
            "type": "char",
            "value": "'B' (66)"
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "for — i=1, Data[1]='A'(65)",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "Data[1]",
            "type": "char",
            "value": "'A' (65)"
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
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
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "Data[1]='A' > 'C'? → 65>67 거짓",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1
          },
          {
            "name": "Data[i]",
            "type": "char",
            "value": "'A' (65)"
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "for — i=2, Data[2]='D'(68)",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "Data[2]",
            "type": "char",
            "value": "'D' (68)"
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
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
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 13,
        "comment": "Data[2]='D' > 'C'? → 68>67 참 → break",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "Data[i]",
            "type": "char",
            "value": "'D' (68)"
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
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
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 16,
        "comment": "temp = Data[i] = Data[2] = 'D'",
        "variables": [
          {
            "name": "temp",
            "type": "char",
            "value": "'D'",
            "highlight": true
          },
          {
            "name": "i",
            "type": "int",
            "value": 2
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "temp 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "Data[2] = c = 'C'",
        "variables": [
          {
            "name": "Data",
            "type": "char[]",
            "value": "['B','A','C','E','\\0']",
            "highlight": true
          },
          {
            "name": "temp",
            "type": "char",
            "value": "'D'"
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "temp 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_Data",
              "region": "data",
              "label": "Data",
              "value": "['B','A','C','E','\\0']",
              "highlight": true
            },
            {
              "id": "stack_Data",
              "region": "stack",
              "label": "Data",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "data_str",
              "region": "data",
              "label": "str[]",
              "value": "\"['B','A','C','E','\\0']\"",
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
              "from": "stack_Data",
              "to": "data_Data",
              "label": "주소",
              "highlight": true
            },
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
        "line": 18,
        "comment": "i++ → i=3",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "두 번째 for — i=3, temp2=Data[3]='E', Data[3]='D', temp='E'",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "Data",
            "type": "char[]",
            "value": "['B','A','C','D','\\0']",
            "highlight": true
          },
          {
            "name": "temp",
            "type": "char",
            "value": "'E'"
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_Data",
              "region": "data",
              "label": "Data",
              "value": "['B','A','C','D','\\0']",
              "highlight": true
            },
            {
              "id": "stack_Data",
              "region": "stack",
              "label": "Data",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "data_str",
              "region": "data",
              "label": "str[]",
              "value": "\"['B','A','C','D','\\0']\"",
              "highlight": true
            },
            {
              "id": "stack_str",
              "region": "stack",
              "label": "str",
              "value": "→ 문자열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_Data",
              "to": "data_Data",
              "label": "주소",
              "highlight": true
            },
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
        "line": 11,
        "comment": "두 번째 for — i=4, temp2=Data[4]='\\0', Data[4]='E', temp='\\0'",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 4,
            "highlight": true
          },
          {
            "name": "Data",
            "type": "char[]",
            "value": "['B','A','C','D','E']",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "i 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_Data",
              "region": "data",
              "label": "Data",
              "value": "['B','A','C','D','E']",
              "highlight": true
            },
            {
              "id": "stack_Data",
              "region": "stack",
              "label": "Data",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "data_str",
              "region": "data",
              "label": "str[]",
              "value": "\"['B','A','C','D','E']\"",
              "highlight": true
            },
            {
              "id": "stack_str",
              "region": "stack",
              "label": "str",
              "value": "→ 문자열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "4",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_Data",
              "to": "data_Data",
              "label": "주소",
              "highlight": true
            },
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
        "line": 26,
        "comment": "for(i=0; i<5; i++) — Data를 문자 단위로 출력",
        "variables": [
          {
            "name": "Data",
            "type": "char[]",
            "value": "['B','A','C','D','E']",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_Data",
              "region": "data",
              "label": "Data",
              "value": "['B','A','C','D','E']",
              "highlight": true
            },
            {
              "id": "stack_Data",
              "region": "stack",
              "label": "Data",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "data_str",
              "region": "data",
              "label": "str[]",
              "value": "\"['B','A','C','D','E']\"",
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
              "from": "stack_Data",
              "to": "data_Data",
              "label": "주소",
              "highlight": true
            },
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
        "line": 9,
        "comment": "printf(\"%c\", ...) 5회 실행 → BACDE 출력. 최종 출력은 4와 BACDE 두 줄입니다.",
        "variables": [
          {
            "name": "Data",
            "type": "char[]",
            "value": "['B','A','C','D','E']"
          }
        ],
        "stdout": "BACDE",
        "relatedLines": [
          {
            "line": 2,
            "role": "read",
            "label": "Data 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_Data",
              "region": "data",
              "label": "Data",
              "value": "['B','A','C','D','E']",
              "highlight": false
            },
            {
              "id": "stack_Data",
              "region": "stack",
              "label": "Data",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            },
            {
              "id": "data_str",
              "region": "data",
              "label": "str[]",
              "value": "\"['B','A','C','D','E']\"",
              "highlight": false
            },
            {
              "id": "stack_str",
              "region": "stack",
              "label": "str",
              "value": "→ 문자열",
              "address": "0x100",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_Data",
              "to": "data_Data",
              "label": "주소",
              "highlight": false
            },
            {
              "from": "stack_str",
              "to": "data_str",
              "label": "주소",
              "highlight": false
            }
          ]
        }
      }
    ],
};
