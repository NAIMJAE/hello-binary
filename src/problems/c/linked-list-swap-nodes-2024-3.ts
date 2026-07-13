import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

struct Node {
 int value;
 struct Node* next;
};

void func(struct Node* node){
  while(node != NULL && node->next != NULL){
     int t = node->value;
     node->value = node->next->value;
     node->next->value = t;
     node = node->next->next;
  }
}

int main(){
  struct Node n1 = {1, NULL};
  struct Node n2 = {2, NULL};
  struct Node n3 = {3, NULL};

  n1.next = &n3;
  n3.next = &n2;

  func(&n1);

  struct Node* current = &n1;

  while(current != NULL){
    printf("%d", current->value);
    current = current->next;
 }

 return 0;

}`;

export const linkedListSwapNodes2024_3: Problem = {
  id: "linked-list-swap-nodes-2024-3",
  slug: "linked-list-swap-nodes-2024-3",
  title: "연결 리스트 인접 노드 값 교환",
  topic: "연결리스트",
  difficulty: "어려움",
  source: "2024년 3회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "312",
  explanation: `1. n1={1,NULL}, n2={2,NULL}, n3={3,NULL} 생성

2. n1.next=&n3, n3.next=&n2 → 연결: n1(1) → n3(3) → n2(2) → NULL

3. func(&n1) — 인접 노드 쌍의 value를 교환하고 node를 두 칸 이동합니다.
   - 1회차: n1↔n3 값 교환 → n1(3) → n3(1) → n2(2)
   - node = n2로 이동, n2->next == NULL이므로 while 종료

4. 출력 루프: n1(3) → n3(1) → n2(2) 순으로 printf
   - "3" + "1" + "2" = 312

최종 출력: 312`,
  traceSteps:   [
      {
        "line": 17,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 18,
        "comment": "struct Node n1 = {1, NULL}",
        "variables": [
          {
            "name": "n1.value",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "n1.next",
            "type": "struct Node*",
            "value": "NULL"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n1_next",
              "region": "stack",
              "label": "n1.next",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 19,
        "comment": "struct Node n2 = {2, NULL}",
        "variables": [
          {
            "name": "n1.value",
            "type": "int",
            "value": 1
          },
          {
            "name": "n2.value",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "n2.next",
            "type": "struct Node*",
            "value": "NULL"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n2_next",
              "region": "stack",
              "label": "n2.next",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "n1 선언"
          }
        ]
      },
      {
        "line": 20,
        "comment": "struct Node n3 = {3, NULL}",
        "variables": [
          {
            "name": "n2.value",
            "type": "int",
            "value": 2
          },
          {
            "name": "n3.value",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "n3.next",
            "type": "struct Node*",
            "value": "NULL"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n3_next",
              "region": "stack",
              "label": "n3.next",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 19,
            "role": "read",
            "label": "n2 선언"
          }
        ]
      },
      {
        "line": 22,
        "comment": "n1.next = &n3 — n1이 n3를 가리킵니다.",
        "variables": [
          {
            "name": "n1.next",
            "type": "struct Node*",
            "value": "&n3",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n1_next",
              "region": "stack",
              "label": "n1.next",
              "value": "&n3",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_n3",
              "region": "stack",
              "label": "n3",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n1_next",
              "to": "node_n3",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "n1 선언"
          },
          {
            "line": 20,
            "role": "read",
            "label": "n3 선언"
          }
        ]
      },
      {
        "line": 23,
        "comment": "n3.next = &n2 — 리스트가 n1(1) → n3(3) → n2(2) → NULL 입니다.",
        "variables": [
          {
            "name": "n3.next",
            "type": "struct Node*",
            "value": "&n2",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n3_next",
              "region": "stack",
              "label": "n3.next",
              "value": "&n2",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_n2",
              "region": "stack",
              "label": "n2",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n3_next",
              "to": "node_n2",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 19,
            "role": "read",
            "label": "n2 선언"
          },
          {
            "line": 20,
            "role": "read",
            "label": "n3 선언"
          }
        ]
      },
      {
        "line": 25,
        "comment": "func(&n1)가 호출됩니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 8,
            "role": "call",
            "label": "func 호출"
          },
          {
            "line": 8,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 18,
            "role": "read",
            "label": "n1 선언"
          }
        ]
      },
      {
        "line": 8,
        "comment": "func에 진입 — node가 &n1을 가리킵니다.",
        "variables": [
          {
            "name": "node",
            "type": "struct Node*",
            "value": "&n1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "node 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "n1 선언"
          },
          {
            "line": 25,
            "role": "call",
            "label": "func 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_node",
              "region": "stack",
              "label": "node",
              "value": "&n1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_n1",
              "region": "stack",
              "label": "n1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_node",
              "to": "node_n1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 9,
        "comment": "while 조건 참 — node와 node->next가 모두 NULL이 아닙니다.",
        "variables": [
          {
            "name": "node",
            "type": "struct Node*",
            "value": "&n1"
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "node 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_node",
              "region": "stack",
              "label": "node",
              "value": "&n1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_n1",
              "region": "stack",
              "label": "n1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_node",
              "to": "node_n1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 10,
        "comment": "int t = node->value — t = 1",
        "variables": [
          {
            "name": "t",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "node",
            "type": "struct Node*",
            "value": "&n1"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_node",
              "region": "stack",
              "label": "node",
              "value": "&n1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_n1",
              "region": "stack",
              "label": "n1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_t",
              "region": "stack",
              "label": "t",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_node",
              "to": "node_n1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 11,
        "comment": "node->value = node->next->value — n1.value가 3이 됩니다.",
        "variables": [
          {
            "name": "n1.value",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "n1 선언"
          }
        ]
      },
      {
        "line": 12,
        "comment": "node->next->value = t — n3.value가 1이 됩니다.",
        "variables": [
          {
            "name": "n3.value",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 20,
            "role": "read",
            "label": "n3 선언"
          }
        ]
      },
      {
        "line": 13,
        "comment": "node = node->next->next — node가 &n2를 가리킵니다.",
        "variables": [
          {
            "name": "node",
            "type": "struct Node*",
            "value": "&n2",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_node",
              "region": "stack",
              "label": "node",
              "value": "&n2",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_n2",
              "region": "stack",
              "label": "n2",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_node",
              "to": "node_n2",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "node 선언"
          },
          {
            "line": 19,
            "role": "read",
            "label": "n2 선언"
          }
        ]
      },
      {
        "line": 9,
        "comment": "while 조건 거짓 — node->next가 NULL이므로 루프를 종료합니다.",
        "variables": [
          {
            "name": "node",
            "type": "struct Node*",
            "value": "&n2"
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "node 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_node",
              "region": "stack",
              "label": "node",
              "value": "&n2",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_n2",
              "region": "stack",
              "label": "n2",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_node",
              "to": "node_n2",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 27,
        "comment": "struct Node* current = &n1 — 출력 순회를 시작합니다.",
        "variables": [
          {
            "name": "current",
            "type": "struct Node*",
            "value": "&n1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "n1 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_current",
              "region": "stack",
              "label": "current",
              "value": "&n1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_n1",
              "region": "stack",
              "label": "n1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&n1",
              "address": "0x240",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_current",
              "to": "node_n1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 29,
        "comment": "while(current != NULL) — 출력 루프에 진입합니다.",
        "variables": [
          {
            "name": "current",
            "type": "struct Node*",
            "value": "&n1"
          }
        ],
        "relatedLines": [
          {
            "line": 27,
            "role": "read",
            "label": "current 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_current",
              "region": "stack",
              "label": "current",
              "value": "&n1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_n1",
              "region": "stack",
              "label": "n1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&n1",
              "address": "0x240",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_current",
              "to": "node_n1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 30,
        "comment": "printf — 첫 노드 n1.value = 3 출력",
        "variables": [
          {
            "name": "current->value",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "stdout": "3",
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 27,
            "role": "read",
            "label": "current 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "3",
              "address": "0x240",
              "highlight": true
            },
            {
              "id": "stack_current__value",
              "region": "stack",
              "label": "current->value",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 31,
        "comment": "current = current->next — current가 &n3를 가리킵니다.",
        "variables": [
          {
            "name": "current",
            "type": "struct Node*",
            "value": "&n3",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 20,
            "role": "read",
            "label": "n3 선언"
          },
          {
            "line": 27,
            "role": "read",
            "label": "current 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_current",
              "region": "stack",
              "label": "current",
              "value": "&n3",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_n3",
              "region": "stack",
              "label": "n3",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&n3",
              "address": "0x240",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_current",
              "to": "node_n3",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 30,
        "comment": "n3.value = 1 출력",
        "variables": [
          {
            "name": "current->value",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "stdout": "1",
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 27,
            "role": "read",
            "label": "current 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "1",
              "address": "0x240",
              "highlight": true
            },
            {
              "id": "stack_current__value",
              "region": "stack",
              "label": "current->value",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 31,
        "comment": "current = &n2",
        "variables": [
          {
            "name": "current",
            "type": "struct Node*",
            "value": "&n2",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 19,
            "role": "read",
            "label": "n2 선언"
          },
          {
            "line": 27,
            "role": "read",
            "label": "current 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_current",
              "region": "stack",
              "label": "current",
              "value": "&n2",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_n2",
              "region": "stack",
              "label": "n2",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "&n2",
              "address": "0x240",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_current",
              "to": "node_n2",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 30,
        "comment": "n2.value = 2 출력 — 최종 출력값은 312입니다.",
        "variables": [
          {
            "name": "current->value",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "stdout": "2",
        "relatedLines": [
          {
            "line": 4,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 27,
            "role": "read",
            "label": "current 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "2",
              "address": "0x240",
              "highlight": true
            },
            {
              "id": "stack_current__value",
              "region": "stack",
              "label": "current->value",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 29,
        "comment": "current->next == NULL — 출력 루프 종료",
        "variables": [
          {
            "name": "current",
            "type": "struct Node*",
            "value": "NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 27,
            "role": "read",
            "label": "current 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_current",
              "region": "stack",
              "label": "current",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "NULL",
              "address": "0x240",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
