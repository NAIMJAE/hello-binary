import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

struct Node {
    struct Node* next;
    unsigned int x;
};

int main() {
    struct Node t1 = { 0, 5u };
    struct Node t2 = { 0, 7u };
    struct Node t3 = { 0, 11u };

    t3.next = &t2;
    t2.next = &t1;

    struct Node* curr = &t3;
    int sum = 0;

    while (curr) {
        sum = sum * 3 + curr->x;
        curr = curr->next;
    }

    sum = (sum ^ 42u) + 100u;

    printf("%u\\n", sum);
}`;

export const linkedListXorSum2025_3: Problem = {
  id: "linked-list-xor-sum-2025-3",
  slug: "linked-list-xor-sum-2025-3",
  title: "연결 리스트와 XOR 연산",
  topic: "연결리스트",
  difficulty: "어려움",
  source: "2025년 3회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 C코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "187",
  explanation: `1. t1.x=5, t2.x=7, t3.x=11
   - t3.next → t2 → t1 → NULL

2. while 루프 (sum = sum * 3 + curr->x)
   - t3: sum = 0×3 + 11 = 11
   - t2: sum = 11×3 + 7 = 40
   - t1: sum = 40×3 + 5 = 125

3. sum = (125 ^ 42) + 100
   - 125 ^ 42 = 87
   - 87 + 100 = 187

4. printf("%u\\n", 187) → 출력: 187`,
  traceSteps:   [
      {
        "line": 8,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 9,
        "comment": "struct Node t1 = { 0, 5u } — t1.x = 5, t1.next = NULL",
        "variables": [
          {
            "name": "t1.x",
            "type": "unsigned int",
            "value": 5,
            "highlight": true
          },
          {
            "name": "t1.next",
            "type": "struct Node*",
            "value": "NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "node_t1",
              "region": "stack",
              "label": "t1",
              "value": "x = 5\nnext = NULL",
              "address": "0x13c",
              "highlight": true
            },
            {
              "id": "ptr_t1_next",
              "region": "stack",
              "label": "t1.next",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "struct Node t2 = { 0, 7u } — t2.x = 7, t2.next = NULL",
        "variables": [
          {
            "name": "t1.x",
            "type": "unsigned int",
            "value": 5
          },
          {
            "name": "t2.x",
            "type": "unsigned int",
            "value": 7,
            "highlight": true
          },
          {
            "name": "t2.next",
            "type": "struct Node*",
            "value": "NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "node_t1",
              "region": "stack",
              "label": "t1",
              "value": "x = 5\nnext = NULL",
              "address": "0x13c",
              "highlight": false
            },
            {
              "id": "node_t2",
              "region": "stack",
              "label": "t2",
              "value": "x = 7\nnext = NULL",
              "address": "0x14c",
              "highlight": true
            },
            {
              "id": "ptr_t2_next",
              "region": "stack",
              "label": "t2.next",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "struct Node t3 = { 0, 11u } — t3.x = 11, t3.next = NULL",
        "variables": [
          {
            "name": "t2.x",
            "type": "unsigned int",
            "value": 7
          },
          {
            "name": "t3.x",
            "type": "unsigned int",
            "value": 11,
            "highlight": true
          },
          {
            "name": "t3.next",
            "type": "struct Node*",
            "value": "NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "node_t2",
              "region": "stack",
              "label": "t2",
              "value": "x = 7\nnext = NULL",
              "address": "0x14c",
              "highlight": false
            },
            {
              "id": "node_t3",
              "region": "stack",
              "label": "t3",
              "value": "x = 11\nnext = NULL",
              "address": "0x15c",
              "highlight": true
            },
            {
              "id": "ptr_t3_next",
              "region": "stack",
              "label": "t3.next",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 13,
        "comment": "t3.next = &t2 — t3가 t2를 가리킵니다.",
        "variables": [
          {
            "name": "t3.next",
            "type": "struct Node*",
            "value": "&t2",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3 선언"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_t3_next",
              "region": "stack",
              "label": "t3.next",
              "value": "&t2",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_t2",
              "region": "stack",
              "label": "t2",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "node_t3",
              "region": "stack",
              "label": "t3",
              "value": "x = ?\nnext = &t2",
              "address": "0x15c",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_t3_next",
              "to": "node_t2",
              "label": "가리킴",
              "highlight": true
            },
            {
              "from": "node_t3",
              "to": "node_t2",
              "label": "next",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 14,
        "comment": "t2.next = &t1 — t2가 t1을 가리킵니다. 연결: t3 → t2 → t1 → NULL",
        "variables": [
          {
            "name": "t2.next",
            "type": "struct Node*",
            "value": "&t1",
            "highlight": true
          },
          {
            "name": "t1.next",
            "type": "struct Node*",
            "value": "NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_t2_next",
              "region": "stack",
              "label": "t2.next",
              "value": "&t1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_t1",
              "region": "stack",
              "label": "t1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "node_t2",
              "region": "stack",
              "label": "t2",
              "value": "x = ?\nnext = &t1",
              "address": "0x14c",
              "highlight": true
            },
            {
              "id": "ptr_t1_next",
              "region": "stack",
              "label": "t1.next",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_t2_next",
              "to": "node_t1",
              "label": "가리킴",
              "highlight": true
            },
            {
              "from": "node_t2",
              "to": "node_t1",
              "label": "next",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 16,
        "comment": "struct Node* curr = &t3",
        "variables": [
          {
            "name": "curr",
            "type": "struct Node*",
            "value": "&t3",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&t3",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_t3",
              "region": "stack",
              "label": "t3",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_curr",
              "to": "node_t3",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 17,
        "comment": "int sum = 0",
        "variables": [
          {
            "name": "curr",
            "type": "struct Node*",
            "value": "&t3"
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
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&t3",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_t3",
              "region": "stack",
              "label": "t3",
              "value": "(노드)",
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
          "arrows": [
            {
              "from": "ptr_curr",
              "to": "node_t3",
              "label": "가리킴",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 16,
            "role": "read",
            "label": "curr 선언"
          }
        ]
      },
      {
        "line": 19,
        "comment": "while (curr) — curr가 NULL이 아니므로 루프에 진입합니다.",
        "variables": [
          {
            "name": "curr",
            "type": "struct Node*",
            "value": "&t3"
          },
          {
            "name": "curr->x",
            "type": "unsigned int",
            "value": 11
          }
        ],
        "relatedLines": [
          {
            "line": 16,
            "role": "read",
            "label": "curr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&t3",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_t3",
              "region": "stack",
              "label": "t3",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_curr__x",
              "region": "stack",
              "label": "curr->x",
              "value": "11",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_curr",
              "to": "node_t3",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 20,
        "comment": "sum = sum * 3 + curr->x = 0 × 3 + 11 = 11",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 11,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          },
          {
            "line": 17,
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
              "value": "11",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 21,
        "comment": "curr = curr->next — curr가 &t2를 가리킵니다.",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 11
          },
          {
            "name": "curr",
            "type": "struct Node*",
            "value": "&t2",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          },
          {
            "line": 17,
            "role": "read",
            "label": "sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&t2",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_t2",
              "region": "stack",
              "label": "t2",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "11",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_curr",
              "to": "node_t2",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 20,
        "comment": "sum = 11 × 3 + 7 = 40",
        "variables": [
          {
            "name": "curr->x",
            "type": "unsigned int",
            "value": 7
          },
          {
            "name": "sum",
            "type": "int",
            "value": 40,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          },
          {
            "line": 17,
            "role": "read",
            "label": "sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "7",
              "address": "0x240",
              "highlight": false
            },
            {
              "id": "stack_curr__x",
              "region": "stack",
              "label": "curr->x",
              "value": "7",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "40",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 21,
        "comment": "curr = curr->next — curr가 &t1을 가리킵니다.",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 40
          },
          {
            "name": "curr",
            "type": "struct Node*",
            "value": "&t1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          },
          {
            "line": 17,
            "role": "read",
            "label": "sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&t1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_t1",
              "region": "stack",
              "label": "t1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "40",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_curr",
              "to": "node_t1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 20,
        "comment": "sum = 40 × 3 + 5 = 125",
        "variables": [
          {
            "name": "curr->x",
            "type": "unsigned int",
            "value": 5
          },
          {
            "name": "sum",
            "type": "int",
            "value": 125,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          },
          {
            "line": 17,
            "role": "read",
            "label": "sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "5",
              "address": "0x240",
              "highlight": false
            },
            {
              "id": "stack_curr__x",
              "region": "stack",
              "label": "curr->x",
              "value": "5",
              "highlight": false
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "125",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 21,
        "comment": "curr = curr->next — curr가 NULL. while 루프 종료",
        "variables": [
          {
            "name": "sum",
            "type": "int",
            "value": 125
          },
          {
            "name": "curr",
            "type": "struct Node*",
            "value": "NULL",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "t1"
          },
          {
            "line": 10,
            "role": "read",
            "label": "t2"
          },
          {
            "line": 11,
            "role": "read",
            "label": "t3"
          },
          {
            "line": 16,
            "role": "read",
            "label": "curr"
          },
          {
            "line": 17,
            "role": "read",
            "label": "sum 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "NULL",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "stack_sum",
              "region": "stack",
              "label": "sum",
              "value": "125",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 24,
        "comment": "sum ^ 42u = 125 ^ 42 = 87",
        "variables": [
          {
            "name": "sum ^ 42u",
            "type": "unsigned int",
            "value": 87,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_sum___42u",
              "region": "stack",
              "label": "sum ^ 42u",
              "value": "87",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "sum 선언"
          }
        ]
      },
      {
        "line": 24,
        "comment": "87 + 100u = 187. sum이 187로 갱신됩니다.",
        "variables": [
          {
            "name": "sum",
            "type": "unsigned int",
            "value": 187,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
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
              "value": "187",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 26,
        "comment": "printf(\"%u\\n\", 187) 실행. 최종 출력값은 187입니다.",
        "variables": [
          {
            "name": "sum",
            "type": "unsigned int",
            "value": 187
          }
        ],
        "stdout": "187",
        "relatedLines": [
          {
            "line": 17,
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
              "value": "187",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
