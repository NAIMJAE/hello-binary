import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>
#include <stdlib.h>

void set(int** arr, int* data, int rows, int cols) {
    for (int i = 0; i < rows * cols; ++i) {
        arr[((i + 1) / rows) % rows][(i + 1) % cols] = data[i];
    }
}

int main() {
    int rows = 3, cols = 3, sum = 0;
    int data[] = {5, 2, 7, 4, 1, 8, 3, 6, 9};
    int** arr;
    arr = (int**) malloc(sizeof(int*) * rows);
    for (int i = 0; i < cols; i++) {
        arr[i] = (int*) malloc(sizeof(int) * cols);
    }

    set(arr, data, rows, cols);

    for (int i = 0; i < rows * cols; i++) {
        sum += arr[i / rows][i % cols] * (i % 2 == 0 ? 1 : -1);
    }

    for(int i=0; i<rows; i++) {
        free(arr[i]);
    }
    free(arr);

    printf("%d", sum);
}`;

export const malloc2dSetSum2025_1: Problem = {
  id: "malloc-2d-set-sum-2025-1",
  slug: "malloc-2d-set-sum-2025-1",
  title: "동적 2차원 배열과 set",
  topic: "포인터",
  difficulty: "어려움",
  source: "2025년 1회차",
  estimatedMinutes: 8,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "13",
  explanation: `1. rows=3, cols=3, data[] = {5, 2, 7, 4, 1, 8, 3, 6, 9}

2. malloc으로 3×3 이차원 배열 arr을 동적 할당합니다.

3. set() 함수 — data[i]를 arr[((i+1)/rows)%rows][(i+1)%cols]에 대입
   - row = ((i+1)/3) % 3, col = (i+1) % 3
   - i=0 → arr[0][1]=5, i=1 → arr[0][2]=2, i=2 → arr[1][0]=7
   - i=3 → arr[1][1]=4, i=4 → arr[1][2]=1, i=5 → arr[2][0]=8
   - i=6 → arr[2][1]=3, i=7 → arr[2][2]=6, i=8 → arr[0][0]=9

   set() 이후 arr:
   [9, 5, 2]
   [7, 4, 1]
   [8, 3, 6]

4. 합계 루프 — sum += arr[i/rows][i%cols] × (i가 짝수면 +1, 홀수면 -1)
   - i=0: +9 → sum=9
   - i=1: -5 → sum=4
   - i=2: +2 → sum=6
   - i=3: -7 → sum=-1
   - i=4: +4 → sum=3
   - i=5: -1 → sum=2
   - i=6: +8 → sum=10
   - i=7: -3 → sum=7
   - i=8: +6 → sum=13

5. printf("%d", sum) → 13`,
  traceSteps:   [
      {
        "line": 10,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 11,
        "comment": "rows=3, cols=3, sum=0 으로 초기화합니다.",
        "variables": [
          {
            "name": "rows",
            "type": "int",
            "value": 3
          },
          {
            "name": "cols",
            "type": "int",
            "value": 3
          },
          {
            "name": "sum",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_rows",
              "region": "stack",
              "label": "rows",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_cols",
              "region": "stack",
              "label": "cols",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "data[] = {5, 2, 7, 4, 1, 8, 3, 6, 9} 가 초기화됩니다.",
        "variables": [
          {
            "name": "data",
            "type": "int[]",
            "value": [
              5,
              2,
              7,
              4,
              1,
              8,
              3,
              6,
              9
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
              "value": "[5, 2, 7, 4, 1, 8, 3, 6, 9]",
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
        "line": 13,
        "comment": "int** arr; — 2차원 배열을 가리킬 이중 포인터를 선언합니다.",
        "variables": [
          {
            "name": "arr",
            "type": "int**",
            "value": "미할당",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 14,
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
              "value": "미할당",
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
              "id": "ptr_arr",
              "region": "stack",
              "label": "arr",
              "value": "미할당",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_미할당",
              "region": "stack",
              "label": "미할당",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": true
            },
            {
              "from": "ptr_arr",
              "to": "node_미할당",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 14,
        "comment": "arr = malloc(sizeof(int*) * rows) — 행 포인터 3개를 힙에 할당합니다.",
        "variables": [
          {
            "name": "arr",
            "type": "int**",
            "value": "→ 3개 행 포인터",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "→ 3개 행 포인터",
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
              "id": "ptr_arr",
              "region": "stack",
              "label": "arr",
              "value": "→ 3개 행 포인터",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_→ 3개 행 포인터",
              "region": "stack",
              "label": "→ 3개 행 포인터",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": true
            },
            {
              "from": "ptr_arr",
              "to": "node_→ 3개 행 포인터",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 15,
        "comment": "for(i=0; i<cols; i++) — 각 행에 int 3개를 할당하는 루프 시작",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
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
        "line": 16,
        "comment": "i=0: arr[0] = malloc(sizeof(int) * cols) — 0행에 int 3개 할당",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0
          },
          {
            "name": "arr",
            "type": "int**",
            "value": "1행 할당 완료",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 14,
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
              "value": "1행 할당 완료",
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
              "id": "ptr_arr",
              "region": "stack",
              "label": "arr",
              "value": "1행 할당 완료",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_1행 할당 완료",
              "region": "stack",
              "label": "1행 할당 완료",
              "value": "(노드)",
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
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": true
            },
            {
              "from": "ptr_arr",
              "to": "node_1행 할당 완료",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 16,
        "comment": "i=1: arr[1] = malloc(sizeof(int) * cols) — 1행에 int 3개 할당",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1
          },
          {
            "name": "arr",
            "type": "int**",
            "value": "2행 할당 완료",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 14,
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
              "value": "2행 할당 완료",
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
              "id": "ptr_arr",
              "region": "stack",
              "label": "arr",
              "value": "2행 할당 완료",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_2행 할당 완료",
              "region": "stack",
              "label": "2행 할당 완료",
              "value": "(노드)",
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
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": true
            },
            {
              "from": "ptr_arr",
              "to": "node_2행 할당 완료",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 16,
        "comment": "i=2: arr[2] = malloc(sizeof(int) * cols) — 2행에 int 3개 할당",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2
          },
          {
            "name": "arr",
            "type": "int**",
            "value": "3행 할당 완료",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 14,
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
              "value": "3행 할당 완료",
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
              "id": "ptr_arr",
              "region": "stack",
              "label": "arr",
              "value": "3행 할당 완료",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_3행 할당 완료",
              "region": "stack",
              "label": "3행 할당 완료",
              "value": "(노드)",
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
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": true
            },
            {
              "from": "ptr_arr",
              "to": "node_3행 할당 완료",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 19,
        "comment": "set(arr, data, rows, cols) 함수를 호출합니다.",
        "variables": [
          {
            "name": "rows",
            "type": "int",
            "value": 3
          },
          {
            "name": "cols",
            "type": "int",
            "value": 3
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "definition",
            "label": "set 정의"
          },
          {
            "line": 11,
            "role": "read",
            "label": "rows 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_rows",
              "region": "stack",
              "label": "rows",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_cols",
              "region": "stack",
              "label": "cols",
              "value": "3",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "set() 진입 — data 원소를 2차원 배열에 재배치합니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
          },
          {
            "line": 19,
            "role": "call",
            "label": "set 호출"
          }
        ]
      },
      {
        "line": 5,
        "comment": "for(i=0; i<rows*cols; ++i) — set 루프 시작 (총 9회)",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0,
            "highlight": true
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
        "line": 6,
        "comment": "i=0: row=0, col=1 → arr[0][1] = data[0] = 5",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0
          },
          {
            "name": "arr[0][1]",
            "type": "int",
            "value": 5,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[?,5,?],[?,?,?],[?,?,?]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "5",
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
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[?,5,?],[?,?,?],[?,?,?]]",
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
        "line": 6,
        "comment": "i=1: row=0, col=2 → arr[0][2] = data[1] = 2",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1
          },
          {
            "name": "arr[0][2]",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[?,5,2],[?,?,?],[?,?,?]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "2",
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
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[?,5,2],[?,?,?],[?,?,?]]",
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
        "line": 6,
        "comment": "i=2: row=1, col=0 → arr[1][0] = data[2] = 7",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2
          },
          {
            "name": "arr[1][0]",
            "type": "int",
            "value": 7,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[?,5,2],[7,?,?],[?,?,?]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "7",
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
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[?,5,2],[7,?,?],[?,?,?]]",
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
        "line": 6,
        "comment": "i=3: row=1, col=1 → arr[1][1] = data[3] = 4",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 3
          },
          {
            "name": "arr[1][1]",
            "type": "int",
            "value": 4,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[?,5,2],[7,4,?],[?,?,?]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "4",
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
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[?,5,2],[7,4,?],[?,?,?]]",
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
        "line": 6,
        "comment": "i=4: row=1, col=2 → arr[1][2] = data[4] = 1",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 4
          },
          {
            "name": "arr[1][2]",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[?,5,2],[7,4,1],[?,?,?]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "4",
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[?,5,2],[7,4,1],[?,?,?]]",
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
        "line": 6,
        "comment": "i=5: row=2, col=0 → arr[2][0] = data[5] = 8",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 5
          },
          {
            "name": "arr[2][0]",
            "type": "int",
            "value": 8,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[?,5,2],[7,4,1],[8,?,?]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "8",
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
              "value": "5",
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[?,5,2],[7,4,1],[8,?,?]]",
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
        "line": 6,
        "comment": "i=6: row=2, col=1 → arr[2][1] = data[6] = 3",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 6
          },
          {
            "name": "arr[2][1]",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[?,5,2],[7,4,1],[8,3,?]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "6",
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[?,5,2],[7,4,1],[8,3,?]]",
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
        "line": 6,
        "comment": "i=7: row=2, col=2 → arr[2][2] = data[7] = 6",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 7
          },
          {
            "name": "arr[2][2]",
            "type": "int",
            "value": 6,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[?,5,2],[7,4,1],[8,3,6]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "6",
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
              "value": "7",
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[?,5,2],[7,4,1],[8,3,6]]",
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
        "line": 6,
        "comment": "i=8: row=0, col=0 → arr[0][0] = data[8] = 9",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 8
          },
          {
            "name": "arr[0][0]",
            "type": "int",
            "value": 9,
            "highlight": true
          },
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[9,5,2],[7,4,1],[8,3,6]]"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 14,
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
              "value": "9",
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
              "value": "8",
              "highlight": false
            },
            {
              "id": "heap_arr",
              "region": "heap",
              "label": "arr",
              "value": "[[9,5,2],[7,4,1],[8,3,6]]",
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
        "line": 7,
        "comment": "set() for 루프 종료 — 9회 대입 완료",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 9
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "definition",
            "label": "set 정의"
          },
          {
            "line": 5,
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
              "value": "9",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "set() 종료 — arr = [[9,5,2],[7,4,1],[8,3,6]]",
        "variables": [
          {
            "name": "arr",
            "type": "int[][]",
            "value": "[[9,5,2],[7,4,1],[8,3,6]]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 4,
            "role": "definition",
            "label": "set 정의"
          },
          {
            "line": 14,
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
              "value": "[[9,5,2],[7,4,1],[8,3,6]]",
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
              "value": "[[9,5,2],[7,4,1],[8,3,6]]",
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
        "line": 21,
        "comment": "for(i=0; i<rows*cols; i++) — 합계 루프 시작, sum=0",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0,
            "highlight": true
          },
          {
            "name": "sum",
            "type": "int",
            "value": 0
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
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
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=0: arr[0][0]=9, 짝수 → sum += 9 → sum=9",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 0
          },
          {
            "name": "sum",
            "type": "int",
            "value": 9,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
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
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "9",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=1: arr[0][1]=5, 홀수 → sum -= 5 → sum=4",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1
          },
          {
            "name": "sum",
            "type": "int",
            "value": 4,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
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
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "4",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=2: arr[0][2]=2, 짝수 → sum += 2 → sum=6",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2
          },
          {
            "name": "sum",
            "type": "int",
            "value": 6,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
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
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "6",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=3: arr[1][0]=7, 홀수 → sum -= 7 → sum=-1",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 3
          },
          {
            "name": "sum",
            "type": "int",
            "value": -1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "-1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=4: arr[1][1]=4, 짝수 → sum += 4 → sum=3",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 4
          },
          {
            "name": "sum",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "4",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=5: arr[1][2]=1, 홀수 → sum -= 1 → sum=2",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 5
          },
          {
            "name": "sum",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "5",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=6: arr[2][0]=8, 짝수 → sum += 8 → sum=10",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 6
          },
          {
            "name": "sum",
            "type": "int",
            "value": 10,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "6",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "10",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=7: arr[2][1]=3, 홀수 → sum -= 3 → sum=7",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 7
          },
          {
            "name": "sum",
            "type": "int",
            "value": 7,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "7",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "7",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 22,
        "comment": "i=8: arr[2][2]=6, 짝수 → sum += 6 → sum=13",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 8
          },
          {
            "name": "sum",
            "type": "int",
            "value": 13,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "arr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "8",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "13",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 23,
        "comment": "합계 for 루프 종료 — sum=13",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 13,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "13",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 30,
        "comment": "printf(\"%d\", sum) 실행 → 13 출력",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 13
          }
        ],
        "stdout": "13",
        "relatedLines": [
          {
            "line": 11,
            "role": "read",
            "label": "sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "13",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
