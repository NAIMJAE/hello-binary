import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>
#include <stdlib.h>

typedef struct Data {
    int value;
    struct Data *next;
} Data;

Data* insert(Data* head, int value) {
    Data* new_node = (Data*)malloc(sizeof(Data));
    new_node->value = value;
    new_node->next = head;
    return new_node;
}

Data* reconnect(Data* head, int value) {
    if (head == NULL || head->value == value) return head;
    Data *prev = NULL, *curr = head;
    while (curr != NULL && curr->value != value) {
        prev = curr;
        curr = curr->next;
    }

    if (curr != NULL && prev != NULL) {
        prev->next = curr->next;
        curr->next = head;
        head = curr;
    }
    return head;
}

int main() {

    Data *head = NULL, *curr;
    for (int i = 1; i <= 5; i++)
        head = insert(head, i);
    head = reconnect(head, 3);
    for (curr = head; curr != NULL; curr = curr->next)
        printf("%d", curr->value);
    return 0;
}`;

export const linkedListReconnect2025_1: Problem = {
  id: "linked-list-reconnect-2025-1",
  slug: "linked-list-reconnect-2025-1",
  title: "연결리스트 insert와 reconnect",
  topic: "연결리스트",
  difficulty: "어려움",
  source: "2025년 1회차",
  estimatedMinutes: 8,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "35421",
  explanation: `1. insert(head, i) — 앞에 삽입 (i=1~5)
   - 결과 리스트: 5→4→3→2→1

2. reconnect(head, 3) — value가 3인 노드를 찾아 head 앞으로 이동
   - prev=4, curr=3
   - 4→next = 2 (3을 건너뜀)
   - 3→next = 5 (기존 head)
   - head = 3
   - 결과: 3→5→4→2→1

3. printf 연속 출력 → 35421`,
  traceSteps:   [
      {
        "line": 32,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 34,
        "comment": "Data *head = NULL, *curr; — head는 NULL로 시작합니다.",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "NULL",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "curr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "NULL",
              "address": "0x200",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 35,
        "comment": "for 루프 — i=1, insert(head, 1) 호출",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
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
        "line": 9,
        "comment": "insert(head, 1) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 1
          },
          {
            "name": "head(입력)",
            "type": "Data*",
            "value": "NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 36,
            "role": "call",
            "label": "insert 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head____",
              "region": "stack",
              "label": "head(입력)",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "1",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "malloc(sizeof(Data)) — 새 노드 할당",
        "variables": [
          {
            "name": "new_node",
            "type": "Data*",
            "value": "노드(1)",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node",
              "region": "stack",
              "label": "new_node",
              "value": "노드(1)",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_노드(1)",
              "region": "stack",
              "label": "노드(1)",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node",
              "to": "node_노드(1)",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 11,
        "comment": "new_node->value = 1",
        "variables": [
          {
            "name": "new_node->value",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_new_node__value",
              "region": "stack",
              "label": "new_node->value",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "new_node->next = head",
        "variables": [
          {
            "name": "new_node->next",
            "type": "Data*",
            "value": "NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node__next",
              "region": "stack",
              "label": "new_node->next",
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
        "comment": "return new_node — head = 1",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_1",
              "region": "stack",
              "label": "1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 35,
        "comment": "for 루프 — i=2, insert(head, 2) 호출",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
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
        "line": 9,
        "comment": "insert(head, 2) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 2
          },
          {
            "name": "head(입력)",
            "type": "Data*",
            "value": "1"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 36,
            "role": "call",
            "label": "insert 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head____",
              "region": "stack",
              "label": "head(입력)",
              "value": "1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_1",
              "region": "stack",
              "label": "1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head____",
              "to": "node_1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 10,
        "comment": "malloc(sizeof(Data)) — 새 노드 할당",
        "variables": [
          {
            "name": "new_node",
            "type": "Data*",
            "value": "노드(2)",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node",
              "region": "stack",
              "label": "new_node",
              "value": "노드(2)",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_노드(2)",
              "region": "stack",
              "label": "노드(2)",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node",
              "to": "node_노드(2)",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 11,
        "comment": "new_node->value = 2",
        "variables": [
          {
            "name": "new_node->value",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_new_node__value",
              "region": "stack",
              "label": "new_node->value",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "new_node->next = head",
        "variables": [
          {
            "name": "new_node->next",
            "type": "Data*",
            "value": "1"
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node__next",
              "region": "stack",
              "label": "new_node->next",
              "value": "1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_1",
              "region": "stack",
              "label": "1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node__next",
              "to": "node_1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 13,
        "comment": "return new_node — head = 2→1",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "2→1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "2→1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_2→1",
              "region": "stack",
              "label": "2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_2→1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 35,
        "comment": "for 루프 — i=3, insert(head, 3) 호출",
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
            "line": 17,
            "role": "read",
            "label": "head 선언"
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
        "line": 9,
        "comment": "insert(head, 3) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 3
          },
          {
            "name": "head(입력)",
            "type": "Data*",
            "value": "2→1"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 36,
            "role": "call",
            "label": "insert 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head____",
              "region": "stack",
              "label": "head(입력)",
              "value": "2→1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_2→1",
              "region": "stack",
              "label": "2→1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "3",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head____",
              "to": "node_2→1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 10,
        "comment": "malloc(sizeof(Data)) — 새 노드 할당",
        "variables": [
          {
            "name": "new_node",
            "type": "Data*",
            "value": "노드(3)",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node",
              "region": "stack",
              "label": "new_node",
              "value": "노드(3)",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_노드(3)",
              "region": "stack",
              "label": "노드(3)",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node",
              "to": "node_노드(3)",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 11,
        "comment": "new_node->value = 3",
        "variables": [
          {
            "name": "new_node->value",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_new_node__value",
              "region": "stack",
              "label": "new_node->value",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "new_node->next = head",
        "variables": [
          {
            "name": "new_node->next",
            "type": "Data*",
            "value": "2→1"
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node__next",
              "region": "stack",
              "label": "new_node->next",
              "value": "2→1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_2→1",
              "region": "stack",
              "label": "2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node__next",
              "to": "node_2→1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 13,
        "comment": "return new_node — head = 3→2→1",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "3→2→1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "3→2→1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_3→2→1",
              "region": "stack",
              "label": "3→2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_3→2→1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 35,
        "comment": "for 루프 — i=4, insert(head, 4) 호출",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 4,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "4",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "insert(head, 4) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 4
          },
          {
            "name": "head(입력)",
            "type": "Data*",
            "value": "3→2→1"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 36,
            "role": "call",
            "label": "insert 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head____",
              "region": "stack",
              "label": "head(입력)",
              "value": "3→2→1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_3→2→1",
              "region": "stack",
              "label": "3→2→1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "4",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head____",
              "to": "node_3→2→1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 10,
        "comment": "malloc(sizeof(Data)) — 새 노드 할당",
        "variables": [
          {
            "name": "new_node",
            "type": "Data*",
            "value": "노드(4)",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node",
              "region": "stack",
              "label": "new_node",
              "value": "노드(4)",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_노드(4)",
              "region": "stack",
              "label": "노드(4)",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node",
              "to": "node_노드(4)",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 11,
        "comment": "new_node->value = 4",
        "variables": [
          {
            "name": "new_node->value",
            "type": "int",
            "value": 4,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_new_node__value",
              "region": "stack",
              "label": "new_node->value",
              "value": "4",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "new_node->next = head",
        "variables": [
          {
            "name": "new_node->next",
            "type": "Data*",
            "value": "3→2→1"
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node__next",
              "region": "stack",
              "label": "new_node->next",
              "value": "3→2→1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_3→2→1",
              "region": "stack",
              "label": "3→2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node__next",
              "to": "node_3→2→1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 13,
        "comment": "return new_node — head = 4→3→2→1",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "4→3→2→1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "4→3→2→1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_4→3→2→1",
              "region": "stack",
              "label": "4→3→2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_4→3→2→1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 35,
        "comment": "for 루프 — i=5, insert(head, 5) 호출",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "insert(head, 5) 진입",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 5
          },
          {
            "name": "head(입력)",
            "type": "Data*",
            "value": "4→3→2→1"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 36,
            "role": "call",
            "label": "insert 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head____",
              "region": "stack",
              "label": "head(입력)",
              "value": "4→3→2→1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_4→3→2→1",
              "region": "stack",
              "label": "4→3→2→1",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "5",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head____",
              "to": "node_4→3→2→1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 10,
        "comment": "malloc(sizeof(Data)) — 새 노드 할당",
        "variables": [
          {
            "name": "new_node",
            "type": "Data*",
            "value": "노드(5)",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node",
              "region": "stack",
              "label": "new_node",
              "value": "노드(5)",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_노드(5)",
              "region": "stack",
              "label": "노드(5)",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node",
              "to": "node_노드(5)",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 11,
        "comment": "new_node->value = 5",
        "variables": [
          {
            "name": "new_node->value",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_new_node__value",
              "region": "stack",
              "label": "new_node->value",
              "value": "5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "new_node->next = head",
        "variables": [
          {
            "name": "new_node->next",
            "type": "Data*",
            "value": "4→3→2→1"
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_new_node__next",
              "region": "stack",
              "label": "new_node->next",
              "value": "4→3→2→1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_4→3→2→1",
              "region": "stack",
              "label": "4→3→2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_new_node__next",
              "to": "node_4→3→2→1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 13,
        "comment": "return new_node — head = 5→4→3→2→1",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "5→4→3→2→1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "5→4→3→2→1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_5→4→3→2→1",
              "region": "stack",
              "label": "5→4→3→2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_5→4→3→2→1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 37,
        "comment": "reconnect(head, 3) 호출 — 리스트 5→4→3→2→1",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "5→4→3→2→1"
          }
        ],
        "relatedLines": [
          {
            "line": 16,
            "role": "call",
            "label": "reconnect 호출"
          },
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "5→4→3→2→1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_5→4→3→2→1",
              "region": "stack",
              "label": "5→4→3→2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_5→4→3→2→1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 16,
        "comment": "reconnect() 진입 — value=3 인 노드를 찾아 head 앞으로 이동",
        "variables": [
          {
            "name": "value",
            "type": "int",
            "value": 3
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 37,
            "role": "call",
            "label": "reconnect 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_value",
              "region": "stack",
              "label": "value",
              "value": "3",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "head->value(5) != 3 — 계속 진행",
        "variables": [
          {
            "name": "head->value",
            "type": "int",
            "value": 5
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_head__value",
              "region": "stack",
              "label": "head->value",
              "value": "5",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 18,
        "comment": "prev = NULL, curr = head(5)",
        "variables": [
          {
            "name": "prev",
            "type": "Data*",
            "value": "NULL"
          },
          {
            "name": "curr",
            "type": "Data*",
            "value": "5",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_prev",
              "region": "stack",
              "label": "prev",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "5",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_5",
              "region": "stack",
              "label": "5",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_curr",
              "to": "node_5",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 20,
        "comment": "while 1회 — curr=5≠3, prev=5",
        "variables": [
          {
            "name": "prev",
            "type": "Data*",
            "value": "5"
          },
          {
            "name": "curr",
            "type": "Data*",
            "value": "5"
          }
        ],
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_prev",
              "region": "stack",
              "label": "prev",
              "value": "5",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_5",
              "region": "stack",
              "label": "5",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "5",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_prev",
              "to": "node_5",
              "label": "가리킴",
              "highlight": false
            },
            {
              "from": "ptr_curr",
              "to": "node_5",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 21,
        "comment": "curr = curr->next → curr=4",
        "variables": [
          {
            "name": "curr",
            "type": "Data*",
            "value": "4",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "4",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_4",
              "region": "stack",
              "label": "4",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_curr",
              "to": "node_4",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 20,
        "comment": "while 2회 — curr=4≠3, prev=4",
        "variables": [
          {
            "name": "prev",
            "type": "Data*",
            "value": "4",
            "highlight": true
          },
          {
            "name": "curr",
            "type": "Data*",
            "value": "4"
          }
        ],
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_prev",
              "region": "stack",
              "label": "prev",
              "value": "4",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_4",
              "region": "stack",
              "label": "4",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "4",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_prev",
              "to": "node_4",
              "label": "가리킴",
              "highlight": true
            },
            {
              "from": "ptr_curr",
              "to": "node_4",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 21,
        "comment": "curr = curr->next → curr=3",
        "variables": [
          {
            "name": "curr",
            "type": "Data*",
            "value": "3",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "3",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_3",
              "region": "stack",
              "label": "3",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_curr",
              "to": "node_3",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 19,
        "comment": "while 종료 — curr->value == 3",
        "variables": [
          {
            "name": "curr->value",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "curr"
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
              "id": "stack_curr__value",
              "region": "stack",
              "label": "curr->value",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 25,
        "comment": "prev(4)->next = curr(3)->next → 4가 2를 가리킴",
        "variables": [
          {
            "name": "prev->next",
            "type": "Data*",
            "value": "2"
          }
        ],
        "relatedLines": [
          {
            "line": 18,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_prev__next",
              "region": "stack",
              "label": "prev->next",
              "value": "2",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_2",
              "region": "stack",
              "label": "2",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_prev__next",
              "to": "node_2",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 26,
        "comment": "curr(3)->next = head(5) → 3이 5를 가리킴",
        "variables": [
          {
            "name": "curr->next",
            "type": "Data*",
            "value": "5"
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "curr"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_curr__next",
              "region": "stack",
              "label": "curr->next",
              "value": "5",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_5",
              "region": "stack",
              "label": "5",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_curr",
              "region": "stack",
              "label": "curr",
              "value": "5",
              "address": "0x240",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_curr__next",
              "to": "node_5",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 27,
        "comment": "head = curr → head=3, 리스트 3→5→4→2→1",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "3→5→4→2→1",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "curr 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "3→5→4→2→1",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_3→5→4→2→1",
              "region": "stack",
              "label": "3→5→4→2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_3→5→4→2→1",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 29,
        "comment": "reconnect() 반환 — head=3",
        "variables": [
          {
            "name": "head",
            "type": "Data*",
            "value": "3→5→4→2→1"
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "3→5→4→2→1",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_3→5→4→2→1",
              "region": "stack",
              "label": "3→5→4→2→1",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_3→5→4→2→1",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 39,
        "comment": "printf(\"%d\", 3) 실행",
        "variables": [],
        "stdout": "3",
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "curr 선언"
          }
        ]
      },
      {
        "line": 39,
        "comment": "printf(\"%d\", 5) 실행",
        "variables": [],
        "stdout": "35",
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "curr 선언"
          }
        ]
      },
      {
        "line": 39,
        "comment": "printf(\"%d\", 4) 실행",
        "variables": [],
        "stdout": "354",
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "curr 선언"
          }
        ]
      },
      {
        "line": 39,
        "comment": "printf(\"%d\", 2) 실행",
        "variables": [],
        "stdout": "3542",
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "curr 선언"
          }
        ]
      },
      {
        "line": 39,
        "comment": "printf(\"%d\", 1) 실행",
        "variables": [],
        "stdout": "35421",
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "value 선언"
          },
          {
            "line": 18,
            "role": "read",
            "label": "curr 선언"
          }
        ]
      }
    ],
};
