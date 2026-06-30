import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>
#define SIZE 3

typedef struct {
    int a[SIZE];
    int front;
    int rear;
} Queue;

void enq(Queue* q, int val){
    q->a[q->rear] = val;
    q->rear = (q->rear + 1) % SIZE;
}

int deq(Queue* q) {
    int val = q->a[q->front];
    q->front = (q->front + 1) % SIZE;
    return val;
}

int main() {
    Queue q = {{0}, 0, 0};

    enq(&q,1); enq(&q,2); deq(&q); enq(&q, 3);

    int first = deq(&q);
    int second = deq(&q);
    printf("%d 그리고 %d", first, second);

    return 0;
}`;

export const circularQueue2025_2: Problem = {
  id: "circular-queue-2025-2",
  slug: "circular-queue-2025-2",
  title: "원형 큐 enqueue/dequeue",
  topic: "큐",
  difficulty: "어려움",
  source: "2025년 2회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "2 그리고 3",
  explanation: `1. 초기: front=0, rear=0, a=[0,0,0]

2. enq(1) → a[0]=1, rear=1
   enq(2) → a[1]=2, rear=2

3. deq() → 1 반환, front=1
   (큐에 남은 값: 2)

4. enq(3) → a[2]=3, rear=0
   (큐: [2, 3])

5. first = deq() → 2
   second = deq() → 3

6. printf → 출력: 2 그리고 3`,
  traceSteps:   [
      {
        "line": 21,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 8,
        "comment": "Queue q = {{0}, 0, 0}. front=0, rear=0으로 초기화됩니다.",
        "variables": [
          {
            "name": "a",
            "type": "int[]",
            "value": [
              0,
              0,
              0
            ]
          },
          {
            "name": "front",
            "type": "int",
            "value": 0
          },
          {
            "name": "rear",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[0, 0, 0]",
              "highlight": false
            },
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "0",
              "highlight": false
            },
            {
              "id": "stack_rear",
              "region": "stack",
              "label": "rear",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_a",
              "to": "data_a",
              "label": "주소",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "rear 선언"
          }
        ]
      },
      {
        "line": 24,
        "comment": "enq(&q, 1) 호출 — enq 함수로 진입합니다.",
        "variables": [
          {
            "name": "호출",
            "type": "str",
            "value": "enq(&q, 1)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "큐 선언"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "enq 정의"
          },
          {
            "line": 15,
            "role": "definition",
            "label": "deq 정의"
          },
          {
            "line": 16,
            "role": "read",
            "label": "q 선언"
          },
          {
            "line": 26,
            "role": "call",
            "label": "deq 호출"
          }
        ]
      },
      {
        "line": 11,
        "comment": "q->a[q->rear] = val → a[0] = 1",
        "variables": [
          {
            "name": "a",
            "type": "int[]",
            "value": [
              1,
              0,
              0
            ],
            "highlight": true
          },
          {
            "name": "rear",
            "type": "int",
            "value": 0
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "rear 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 0, 0]",
              "highlight": true
            },
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "stack_rear",
              "region": "stack",
              "label": "rear",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_a",
              "to": "data_a",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 12,
        "comment": "q->rear = (0 + 1) % 3 = 1",
        "variables": [
          {
            "name": "a",
            "type": "int[]",
            "value": [
              1,
              0,
              0
            ]
          },
          {
            "name": "rear",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 0, 0]",
              "highlight": false
            },
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            },
            {
              "id": "stack_rear",
              "region": "stack",
              "label": "rear",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_a",
              "to": "data_a",
              "label": "주소",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "rear 선언"
          }
        ]
      },
      {
        "line": 24,
        "comment": "enq(&q, 2) 호출 — enq 함수로 진입합니다.",
        "variables": [
          {
            "name": "호출",
            "type": "str",
            "value": "enq(&q, 2)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "큐 선언"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "enq 정의"
          },
          {
            "line": 15,
            "role": "definition",
            "label": "deq 정의"
          },
          {
            "line": 16,
            "role": "read",
            "label": "q 선언"
          },
          {
            "line": 26,
            "role": "call",
            "label": "deq 호출"
          }
        ]
      },
      {
        "line": 11,
        "comment": "q->a[q->rear] = val → a[1] = 2",
        "variables": [
          {
            "name": "a",
            "type": "int[]",
            "value": [
              1,
              2,
              0
            ],
            "highlight": true
          },
          {
            "name": "rear",
            "type": "int",
            "value": 1
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "rear 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 2, 0]",
              "highlight": true
            },
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "stack_rear",
              "region": "stack",
              "label": "rear",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_a",
              "to": "data_a",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 12,
        "comment": "q->rear = (1 + 1) % 3 = 2",
        "variables": [
          {
            "name": "a",
            "type": "int[]",
            "value": [
              1,
              2,
              0
            ]
          },
          {
            "name": "rear",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 2, 0]",
              "highlight": false
            },
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            },
            {
              "id": "stack_rear",
              "region": "stack",
              "label": "rear",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "stack_a",
              "to": "data_a",
              "label": "주소",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "rear 선언"
          }
        ]
      },
      {
        "line": 15,
        "comment": "deq(&q) 호출 — deq 함수로 진입합니다.",
        "variables": [
          {
            "name": "호출",
            "type": "str",
            "value": "deq(&q)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "큐 선언"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "큐 함수 정의"
          },
          {
            "line": 16,
            "role": "read",
            "label": "q 선언"
          },
          {
            "line": 24,
            "role": "call",
            "label": "deq 호출 위치"
          },
          {
            "line": 26,
            "role": "call",
            "label": "deq 호출"
          }
        ]
      },
      {
        "line": 16,
        "comment": "int val = q->a[q->front] → val = a[0] = 1",
        "variables": [
          {
            "name": "val",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "front",
            "type": "int",
            "value": 0
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_val",
              "region": "stack",
              "label": "val",
              "value": "1",
              "highlight": true
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "q->front = (0 + 1) % 3 = 1",
        "variables": [
          {
            "name": "val",
            "type": "int",
            "value": 1
          },
          {
            "name": "front",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "큐 내용",
            "type": "String",
            "value": "[2]"
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          },
          {
            "line": 16,
            "role": "read",
            "label": "val 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_val",
              "region": "stack",
              "label": "val",
              "value": "1",
              "highlight": false
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "1",
              "highlight": true
            },
            {
              "id": "stack_____",
              "region": "stack",
              "label": "큐 내용",
              "value": "[2]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 18,
        "comment": "return val → 1 반환. 큐에 2만 남습니다.",
        "variables": [
          {
            "name": "deq 반환",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "front",
            "type": "int",
            "value": 1
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 24,
        "comment": "enq(&q, 3) 호출 — enq 함수로 진입합니다.",
        "variables": [
          {
            "name": "호출",
            "type": "str",
            "value": "enq(&q, 3)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "큐 선언"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "enq 정의"
          },
          {
            "line": 15,
            "role": "definition",
            "label": "deq 정의"
          },
          {
            "line": 16,
            "role": "read",
            "label": "q 선언"
          },
          {
            "line": 26,
            "role": "call",
            "label": "deq 호출"
          }
        ]
      },
      {
        "line": 11,
        "comment": "q->a[q->rear] = val → a[2] = 3",
        "variables": [
          {
            "name": "a",
            "type": "int[]",
            "value": [
              1,
              2,
              3
            ],
            "highlight": true
          },
          {
            "name": "rear",
            "type": "int",
            "value": 2
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "rear 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 2, 3]",
              "highlight": true
            },
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": true
            },
            {
              "id": "stack_rear",
              "region": "stack",
              "label": "rear",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_a",
              "to": "data_a",
              "label": "주소",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 12,
        "comment": "q->rear = (2 + 1) % 3 = 0. 큐: [2, 3]",
        "variables": [
          {
            "name": "a",
            "type": "int[]",
            "value": [
              1,
              2,
              3
            ]
          },
          {
            "name": "rear",
            "type": "int",
            "value": 0,
            "highlight": true
          },
          {
            "name": "큐 내용",
            "type": "String",
            "value": "[2, 3]"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_a",
              "region": "data",
              "label": "a",
              "value": "[1, 2, 3]",
              "highlight": false
            },
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            },
            {
              "id": "stack_rear",
              "region": "stack",
              "label": "rear",
              "value": "0",
              "highlight": true
            },
            {
              "id": "stack_____",
              "region": "stack",
              "label": "큐 내용",
              "value": "[2, 3]",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_a",
              "to": "data_a",
              "label": "주소",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "rear 선언"
          }
        ]
      },
      {
        "line": 15,
        "comment": "int first = deq(&q) 호출 — deq 함수로 진입합니다.",
        "variables": [
          {
            "name": "호출",
            "type": "str",
            "value": "deq(&q)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "큐 선언"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "큐 함수 정의"
          },
          {
            "line": 16,
            "role": "read",
            "label": "q 선언"
          },
          {
            "line": 24,
            "role": "call",
            "label": "deq 호출 위치"
          },
          {
            "line": 26,
            "role": "call",
            "label": "deq 호출"
          }
        ]
      },
      {
        "line": 16,
        "comment": "int val = q->a[q->front] → val = a[1] = 2",
        "variables": [
          {
            "name": "val",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "front",
            "type": "int",
            "value": 1
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_val",
              "region": "stack",
              "label": "val",
              "value": "2",
              "highlight": true
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "q->front = (1 + 1) % 3 = 2",
        "variables": [
          {
            "name": "val",
            "type": "int",
            "value": 2
          },
          {
            "name": "front",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          },
          {
            "line": 16,
            "role": "read",
            "label": "val 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_val",
              "region": "stack",
              "label": "val",
              "value": "2",
              "highlight": false
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 18,
        "comment": "return val → first = 2",
        "variables": [
          {
            "name": "first",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "front",
            "type": "int",
            "value": 2
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          },
          {
            "line": 26,
            "role": "read",
            "label": "first 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_first",
              "region": "stack",
              "label": "first",
              "value": "2",
              "highlight": true
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 15,
        "comment": "int second = deq(&q) 호출 — deq 함수로 진입합니다.",
        "variables": [
          {
            "name": "호출",
            "type": "str",
            "value": "deq(&q)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "큐 선언"
          },
          {
            "line": 10,
            "role": "definition",
            "label": "큐 함수 정의"
          },
          {
            "line": 16,
            "role": "read",
            "label": "q 선언"
          },
          {
            "line": 24,
            "role": "call",
            "label": "deq 호출 위치"
          },
          {
            "line": 26,
            "role": "call",
            "label": "deq 호출"
          }
        ]
      },
      {
        "line": 16,
        "comment": "int val = q->a[q->front] → val = a[2] = 3",
        "variables": [
          {
            "name": "val",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "front",
            "type": "int",
            "value": 2
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_val",
              "region": "stack",
              "label": "val",
              "value": "3",
              "highlight": true
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "q->front = (2 + 1) % 3 = 0",
        "variables": [
          {
            "name": "val",
            "type": "int",
            "value": 3
          },
          {
            "name": "front",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          },
          {
            "line": 16,
            "role": "read",
            "label": "val 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_val",
              "region": "stack",
              "label": "val",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 18,
        "comment": "return val → second = 3",
        "variables": [
          {
            "name": "second",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "front",
            "type": "int",
            "value": 0
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "front 선언"
          },
          {
            "line": 27,
            "role": "read",
            "label": "second 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_second",
              "region": "stack",
              "label": "second",
              "value": "3",
              "highlight": true
            },
            {
              "id": "stack_front",
              "region": "stack",
              "label": "front",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 28,
        "comment": "printf(\"%d 그리고 %d\", first, second) 실행. 최종 출력값은 2 그리고 3입니다.",
        "variables": [
          {
            "name": "first",
            "type": "int",
            "value": 2
          },
          {
            "name": "second",
            "type": "int",
            "value": 3
          }
        ],
        "stdout": "2 그리고 3",
        "relatedLines": [
          {
            "line": 26,
            "role": "read",
            "label": "first 선언"
          },
          {
            "line": 27,
            "role": "read",
            "label": "second 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_first",
              "region": "stack",
              "label": "first",
              "value": "2",
              "highlight": false
            },
            {
              "id": "stack_second",
              "region": "stack",
              "label": "second",
              "value": "3",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
