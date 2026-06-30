import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>
#include <stdlib.h>

struct node {
    int p;
    struct node* n;
};

int main() {
    struct node a = {1, NULL};
    struct node b = {2, NULL};
    struct node c = {3, NULL};

    a.n = &b; b.n = &c; c.n = NULL;
    c.n = &a; a.n = &b; b.n = NULL;
    struct node* head = &c;
    printf("%d %d %d", head->p, head->n->p, head->n->n->p);
    return 0;
}`;

export const linkedListRelink2025_2: Problem = {
  id: "linked-list-relink-2025-2",
  slug: "linked-list-relink-2025-2",
  title: "연결 리스트 포인터 재연결",
  topic: "연결리스트",
  difficulty: "어려움",
  source: "2025년 2회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 C언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "3 1 2",
  explanation: `1. a(p=1), b(p=2), c(p=3) 생성

2. a.n=&b; b.n=&c; c.n=NULL → a→b→c→NULL

3. c.n=&a; a.n=&b; b.n=NULL → 연결 재설정
   - c→a→b→NULL (b.n가 &c에서 NULL로 덮어씀)

4. head = &c
   - head->p = 3
   - head->n->p = a.p = 1
   - head->n->n->p = b.p = 2

5. printf → 출력: 3 1 2`,
  traceSteps:   [
      {
        "line": 9,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 10,
        "comment": "struct node a = {1, NULL}",
        "variables": [
          {
            "name": "a.p",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "a.n",
            "type": "struct node*",
            "value": "NULL"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_a_n",
              "region": "stack",
              "label": "a.n",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "data_a",
              "region": "data",
              "label": "a[]",
              "value": "NULL",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 11,
        "comment": "struct node b = {2, NULL}",
        "variables": [
          {
            "name": "a.p",
            "type": "int",
            "value": 1
          },
          {
            "name": "b.p",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "b.n",
            "type": "struct node*",
            "value": "NULL"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_b_n",
              "region": "stack",
              "label": "b.n",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          }
        ]
      },
      {
        "line": 12,
        "comment": "struct node c = {3, NULL}",
        "variables": [
          {
            "name": "b.p",
            "type": "int",
            "value": 2
          },
          {
            "name": "c.p",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "c.n",
            "type": "struct node*",
            "value": "NULL"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_c_n",
              "region": "stack",
              "label": "c.n",
              "value": "NULL",
              "address": "0x200",
              "highlight": false
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          }
        ]
      },
      {
        "line": 14,
        "comment": "a.n = &b",
        "variables": [
          {
            "name": "a.n",
            "type": "struct node*",
            "value": "&b",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_a_n",
              "region": "stack",
              "label": "a.n",
              "value": "&b",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_b",
              "region": "stack",
              "label": "b",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "data_a",
              "region": "data",
              "label": "a[]",
              "value": "&b",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_a_n",
              "to": "node_b",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 14,
        "comment": "b.n = &c",
        "variables": [
          {
            "name": "b.n",
            "type": "struct node*",
            "value": "&c",
            "highlight": true
          },
          {
            "name": "연결",
            "type": "String",
            "value": "a → b"
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_b_n",
              "region": "stack",
              "label": "b.n",
              "value": "&c",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_c",
              "region": "stack",
              "label": "c",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_b_n",
              "to": "node_c",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 14,
        "comment": "c.n = NULL → a → b → c → NULL",
        "variables": [
          {
            "name": "c.n",
            "type": "struct node*",
            "value": "NULL",
            "highlight": true
          },
          {
            "name": "연결",
            "type": "String",
            "value": "a → b → c → NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_c_n",
              "region": "stack",
              "label": "c.n",
              "value": "NULL",
              "address": "0x200",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 15,
        "comment": "c.n = &a",
        "variables": [
          {
            "name": "c.n",
            "type": "struct node*",
            "value": "&a",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_c_n",
              "region": "stack",
              "label": "c.n",
              "value": "&a",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_a",
              "region": "stack",
              "label": "a",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_c_n",
              "to": "node_a",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 14,
        "comment": "a.n = &b (이미 &b이므로 변화 없음)",
        "variables": [
          {
            "name": "a.n",
            "type": "struct node*",
            "value": "&b",
            "highlight": true
          },
          {
            "name": "연결",
            "type": "String",
            "value": "c → a → b"
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_a_n",
              "region": "stack",
              "label": "a.n",
              "value": "&b",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_b",
              "region": "stack",
              "label": "b",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "data_a",
              "region": "data",
              "label": "a[]",
              "value": "&b",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_a_n",
              "to": "node_b",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 15,
        "comment": "b.n = NULL → c → a → b → NULL",
        "variables": [
          {
            "name": "b.n",
            "type": "struct node*",
            "value": "NULL",
            "highlight": true
          },
          {
            "name": "연결",
            "type": "String",
            "value": "c → a → b → NULL"
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "a 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "b 선언"
          },
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_b_n",
              "region": "stack",
              "label": "b.n",
              "value": "NULL",
              "address": "0x200",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 16,
        "comment": "struct node* head = &c",
        "variables": [
          {
            "name": "head",
            "type": "struct node*",
            "value": "&c",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "c 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_head",
              "region": "stack",
              "label": "head",
              "value": "&c",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_c",
              "region": "stack",
              "label": "c",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_head",
              "to": "node_c",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 17,
        "comment": "printf 인자 평가: head->p = 3",
        "variables": [
          {
            "name": "head->p",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "p 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "n 선언"
          },
          {
            "line": 16,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_head__p",
              "region": "stack",
              "label": "head->p",
              "value": "3",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "printf 인자 평가: head->n->p = a.p = 1",
        "variables": [
          {
            "name": "head->p",
            "type": "int",
            "value": 3
          },
          {
            "name": "head->n->p",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "p 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "n 선언"
          },
          {
            "line": 16,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_head__p",
              "region": "stack",
              "label": "head->p",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_head__n__p",
              "region": "stack",
              "label": "head->n->p",
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "printf 인자 평가: head->n->n->p = b.p = 2",
        "variables": [
          {
            "name": "head->p",
            "type": "int",
            "value": 3
          },
          {
            "name": "head->n->p",
            "type": "int",
            "value": 1
          },
          {
            "name": "head->n->n->p",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "p 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "n 선언"
          },
          {
            "line": 16,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_head__p",
              "region": "stack",
              "label": "head->p",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_head__n__p",
              "region": "stack",
              "label": "head->n->p",
              "value": "1",
              "highlight": false
            },
            {
              "id": "stack_head__n__n__p",
              "region": "stack",
              "label": "head->n->n->p",
              "value": "2",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 17,
        "comment": "printf(\"%d %d %d\", 3, 1, 2) 실행. 최종 출력값은 3 1 2입니다.",
        "variables": [
          {
            "name": "head->p",
            "type": "int",
            "value": 3
          },
          {
            "name": "head->n->p",
            "type": "int",
            "value": 1
          },
          {
            "name": "head->n->n->p",
            "type": "int",
            "value": 2
          }
        ],
        "stdout": "3 1 2",
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "p 선언"
          },
          {
            "line": 14,
            "role": "read",
            "label": "n 선언"
          },
          {
            "line": 16,
            "role": "read",
            "label": "head 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_head__p",
              "region": "stack",
              "label": "head->p",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_head__n__p",
              "region": "stack",
              "label": "head->n->p",
              "value": "1",
              "highlight": false
            },
            {
              "id": "stack_head__n__n__p",
              "region": "stack",
              "label": "head->n->n->p",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
