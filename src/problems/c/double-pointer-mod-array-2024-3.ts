import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

void func(int** arr, int size){
  for(int i=0; i<size; i++){
     *(*arr + i) = (*(*arr+i) + i) % size;
  }
}

int main(){
  int arr[] = {3,1, 4, 1, 5};
  int* p = arr;
  int** pp = &p;
  int num = 6;

  func(pp, 5);
  num = arr[2];
  printf("%d", num);

  return 0;
}`;

export const doublePointerModArray2024_3: Problem = {
  id: "double-pointer-mod-array-2024-3",
  slug: "double-pointer-mod-array-2024-3",
  title: "이중 포인터와 배열 mod 연산",
  topic: "포인터",
  difficulty: "어려움",
  source: "2024년 3회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "1",
  explanation: `1. arr[] = {3, 1, 4, 1, 5}, p = arr, pp = &p, num = 6

2. func(pp, 5) — *(*arr + i)는 arr[i]와 같습니다.
   - i=0: (3+0)%5 = 3
   - i=1: (1+1)%5 = 2
   - i=2: (4+2)%5 = 1
   - i=3: (1+3)%5 = 4
   - i=4: (5+4)%5 = 4
   → arr = {3, 2, 1, 4, 4}

3. num = arr[2] = 1
4. printf("%d", 1) → 출력: 1`,
  traceSteps:   [
      {
        "line": 9,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 10,
        "comment": "int arr[] = {3, 1, 4, 1, 5}가 초기화됩니다.",
        "variables": [
          {
            "name": "arr",
            "type": "int[]",
            "value": [
              3,
              1,
              4,
              1,
              5
            ],
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "[3, 1, 4, 1, 5]",
              "highlight": true
            },
            {
              "id": "stack_arr",
              "region": "stack",
              "label": "arr",
              "value": "→ 배열",
              "address": "0x100",
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
        "line": 11,
        "comment": "int* p = arr — p가 배열 arr의 시작 주소를 가리킵니다.",
        "variables": [
          {
            "name": "arr",
            "type": "int[]",
            "value": [
              3,
              1,
              4,
              1,
              5
            ]
          },
          {
            "name": "p",
            "type": "int*",
            "value": "→ arr[0]",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "[3, 1, 4, 1, 5]",
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
              "id": "ptr_p",
              "region": "stack",
              "label": "p",
              "value": "→ arr[0]",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_→ arr[0]",
              "region": "stack",
              "label": "→ arr[0]",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_p",
              "region": "stack",
              "label": "p",
              "value": "→ arr[0]",
              "address": "0x230",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": false
            },
            {
              "from": "ptr_p",
              "to": "node_→ arr[0]",
              "label": "가리킴",
              "highlight": true
            },
            {
              "from": "stack_p",
              "to": "data_arr",
              "label": "매개변수",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "arr 선언"
          }
        ]
      },
      {
        "line": 12,
        "comment": "int** pp = &p — pp는 p를 가리키는 이중 포인터입니다.",
        "variables": [
          {
            "name": "p",
            "type": "int*",
            "value": "→ arr[0]"
          },
          {
            "name": "pp",
            "type": "int**",
            "value": "&p",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_p",
              "region": "stack",
              "label": "p",
              "value": "→ arr[0]",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_→ arr[0]",
              "region": "stack",
              "label": "→ arr[0]",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_p",
              "region": "stack",
              "label": "p",
              "value": "→ arr[0]",
              "address": "0x230",
              "highlight": false
            },
            {
              "id": "ptr_pp",
              "region": "stack",
              "label": "pp",
              "value": "&p",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_p",
              "region": "stack",
              "label": "p",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_p",
              "to": "node_→ arr[0]",
              "label": "가리킴",
              "highlight": false
            },
            {
              "from": "ptr_pp",
              "to": "node_p",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 11,
            "role": "read",
            "label": "p 선언"
          }
        ]
      },
      {
        "line": 13,
        "comment": "int num = 6",
        "variables": [
          {
            "name": "num",
            "type": "int",
            "value": 6,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_num",
              "region": "stack",
              "label": "num",
              "value": "6",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 15,
        "comment": "func(pp, 5)가 호출됩니다.",
        "variables": [
          {
            "name": "size",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "call",
            "label": "func 호출"
          },
          {
            "line": 3,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 3,
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
              "value": "5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "func에 진입 — arr 매개변수는 pp(&p)를 받습니다. *arr == p == arr 배열 시작",
        "variables": [
          {
            "name": "size",
            "type": "int",
            "value": 5
          },
          {
            "name": "*arr",
            "type": "int*",
            "value": "→ arr[0]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "arr 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "p 선언"
          },
          {
            "line": 15,
            "role": "call",
            "label": "func 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr__arr",
              "region": "stack",
              "label": "*arr",
              "value": "→ arr[0]",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_→ arr[0]",
              "region": "stack",
              "label": "→ arr[0]",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_size",
              "region": "stack",
              "label": "size",
              "value": "5",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr__arr",
              "to": "node_→ arr[0]",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 5,
        "comment": "for(i=0; i<5; i++) — i=0, arr[0] = (3+0)%5 = 3",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0,
            "highlight": true
          },
          {
            "name": "arr[0]",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "3",
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
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "0",
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
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "arr 선언"
          }
        ]
      },
      {
        "line": 5,
        "comment": "i=1 — arr[1] = (1+1)%5 = 2",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[]",
            "value": [
              3,
              2,
              4,
              1,
              5
            ],
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "[3, 2, 4, 1, 5]",
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
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "1",
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
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "arr 선언"
          }
        ]
      },
      {
        "line": 5,
        "comment": "i=2 — arr[2] = (4+2)%5 = 1",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "arr[2]",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "1",
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
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "2",
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
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "arr 선언"
          }
        ]
      },
      {
        "line": 5,
        "comment": "i=3 — arr[3] = (1+3)%5 = 4",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[]",
            "value": [
              3,
              2,
              1,
              4,
              5
            ],
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "[3, 2, 1, 4, 5]",
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
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "3",
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
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "arr 선언"
          }
        ]
      },
      {
        "line": 5,
        "comment": "i=4 — arr[4] = (5+4)%5 = 4. for 루프 종료 후 arr = {3,2,1,4,4}",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 4,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[]",
            "value": [
              3,
              2,
              1,
              4,
              4
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 10,
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
              "value": "[3, 2, 1, 4, 4]",
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
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "4",
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
        "comment": "num = arr[2] — arr[2]는 1이므로 num = 1",
        "variables": [
          {
            "name": "num",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "arr 선언"
          },
          {
            "line": 13,
            "role": "read",
            "label": "num 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_num",
              "region": "stack",
              "label": "num",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "printf(\"%d\", num) 실행 — 최종 출력값은 1입니다.",
        "variables": [
          {
            "name": "num",
            "type": "int",
            "value": 1
          }
        ],
        "stdout": "1",
        "relatedLines": [
          {
            "line": 13,
            "role": "read",
            "label": "num 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_num",
              "region": "stack",
              "label": "num",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
