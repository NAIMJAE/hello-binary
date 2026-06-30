import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>
#include <stdlib.h>

struct node {
    char c;
    struct node* p;
};

struct node* func(char* s) {
    struct node* h = NULL, *n;

    while(*s) {
        n = malloc(sizeof(struct node));
        n->c = *s++;
        n->p = h;
        h = n;
    }

    return h;
}

int main() {
    struct node* n = func("BEST");

    while(n) {
        putchar(n->c);
        struct node* t = n;
        n = n->p;
        free(t);
    }

    return 0;
}`;

export const linkedListReverseString2025_2: Problem = {
  id: "linked-list-reverse-string-2025-2",
  slug: "linked-list-reverse-string-2025-2",
  title: "연결 리스트로 문자열 역순",
  topic: "연결리스트",
  difficulty: "어려움",
  source: "2025년 2회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "TSEB",
  explanation: `1. func("BEST") — 앞에 삽입(head insertion) 방식으로 리스트 생성
   - 'B' → B→NULL
   - 'E' → E→B→NULL
   - 'S' → S→E→B→NULL
   - 'T' → T→S→E→B→NULL

2. 반환된 head는 'T' 노드

3. main에서 head부터 p를 따라 출력
   - T, S, E, B 순서

4. 출력: TSEB`,
  traceSteps:   [
      {
        "line": 22,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 23,
        "comment": "struct node* n = func(\"BEST\") 호출 — func 함수로 진입합니다.",
        "variables": [
          {
            "name": "입력",
            "type": "char*",
            "value": "\"BEST\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr___",
              "region": "stack",
              "label": "입력",
              "value": "\"BEST\"",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_\"BEST\"",
              "region": "stack",
              "label": "\"BEST\"",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr___",
              "to": "node_\"BEST\"",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 10,
        "comment": "struct node* h = NULL, *n",
        "variables": [
          {
            "name": "h",
            "type": "struct node*",
            "value": "NULL",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_h",
              "region": "stack",
              "label": "h",
              "value": "NULL",
              "address": "0x200",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "while(*s) — *s = 'B' ≠ '\\0', 루프 진입",
        "variables": [
          {
            "name": "*s",
            "type": "char",
            "value": "'B'"
          }
        ]
      },
      {
        "line": 13,
        "comment": "n = malloc(sizeof(struct node))",
        "variables": [
          {
            "name": "n",
            "type": "struct node*",
            "value": "새 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n",
              "region": "stack",
              "label": "n",
              "value": "새 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_새 노드",
              "region": "stack",
              "label": "새 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n",
              "to": "node_새 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 14,
        "comment": "n->c = *s++ → n->c = 'B', s는 'E'를 가리킴",
        "variables": [
          {
            "name": "n->c",
            "type": "char",
            "value": "'B'",
            "highlight": true
          },
          {
            "name": "*s",
            "type": "char",
            "value": "'E'"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 15,
        "comment": "n->p = h → n->p = NULL",
        "variables": [
          {
            "name": "n->p",
            "type": "struct node*",
            "value": "NULL",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n__p",
              "region": "stack",
              "label": "n->p",
              "value": "NULL",
              "address": "0x200",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 16,
        "comment": "h = n → 리스트: B → NULL",
        "variables": [
          {
            "name": "리스트",
            "type": "String",
            "value": "B → NULL",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 15,
            "role": "read",
            "label": "n->p 연결"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack____",
              "region": "stack",
              "label": "리스트",
              "value": "B → NULL",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "while(*s) — *s = 'E' ≠ '\\0'",
        "variables": [
          {
            "name": "*s",
            "type": "char",
            "value": "'E'"
          }
        ]
      },
      {
        "line": 13,
        "comment": "n = malloc(sizeof(struct node))",
        "variables": [
          {
            "name": "n",
            "type": "struct node*",
            "value": "새 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n",
              "region": "stack",
              "label": "n",
              "value": "새 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_새 노드",
              "region": "stack",
              "label": "새 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n",
              "to": "node_새 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 14,
        "comment": "n->c = *s++ → n->c = 'E', s는 'S'를 가리킴",
        "variables": [
          {
            "name": "n->c",
            "type": "char",
            "value": "'E'",
            "highlight": true
          },
          {
            "name": "*s",
            "type": "char",
            "value": "'S'"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 15,
        "comment": "n->p = h → n->p = B 노드",
        "variables": [
          {
            "name": "n->p",
            "type": "struct node*",
            "value": "B 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n__p",
              "region": "stack",
              "label": "n->p",
              "value": "B 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_B 노드",
              "region": "stack",
              "label": "B 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n__p",
              "to": "node_B 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 16,
        "comment": "h = n → 리스트: E → B → NULL",
        "variables": [
          {
            "name": "리스트",
            "type": "String",
            "value": "E → B → NULL",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 15,
            "role": "read",
            "label": "n->p 연결"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack____",
              "region": "stack",
              "label": "리스트",
              "value": "E → B → NULL",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "while(*s) — *s = 'S' ≠ '\\0'",
        "variables": [
          {
            "name": "*s",
            "type": "char",
            "value": "'S'"
          }
        ]
      },
      {
        "line": 13,
        "comment": "n = malloc(sizeof(struct node))",
        "variables": [
          {
            "name": "n",
            "type": "struct node*",
            "value": "새 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n",
              "region": "stack",
              "label": "n",
              "value": "새 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_새 노드",
              "region": "stack",
              "label": "새 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n",
              "to": "node_새 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 14,
        "comment": "n->c = *s++ → n->c = 'S', s는 'T'를 가리킴",
        "variables": [
          {
            "name": "n->c",
            "type": "char",
            "value": "'S'",
            "highlight": true
          },
          {
            "name": "*s",
            "type": "char",
            "value": "'T'"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 15,
        "comment": "n->p = h → n->p = E 노드",
        "variables": [
          {
            "name": "n->p",
            "type": "struct node*",
            "value": "E 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n__p",
              "region": "stack",
              "label": "n->p",
              "value": "E 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_E 노드",
              "region": "stack",
              "label": "E 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n__p",
              "to": "node_E 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 16,
        "comment": "h = n → 리스트: S → E → B → NULL",
        "variables": [
          {
            "name": "리스트",
            "type": "String",
            "value": "S → E → B → NULL",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 15,
            "role": "read",
            "label": "n->p 연결"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack____",
              "region": "stack",
              "label": "리스트",
              "value": "S → E → B → NULL",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "while(*s) — *s = 'T' ≠ '\\0'",
        "variables": [
          {
            "name": "*s",
            "type": "char",
            "value": "'T'"
          }
        ]
      },
      {
        "line": 13,
        "comment": "n = malloc(sizeof(struct node))",
        "variables": [
          {
            "name": "n",
            "type": "struct node*",
            "value": "새 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n",
              "region": "stack",
              "label": "n",
              "value": "새 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_새 노드",
              "region": "stack",
              "label": "새 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n",
              "to": "node_새 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 14,
        "comment": "n->c = *s++ → n->c = 'T', s는 '\\0'를 가리킴",
        "variables": [
          {
            "name": "n->c",
            "type": "char",
            "value": "'T'",
            "highlight": true
          },
          {
            "name": "*s",
            "type": "char",
            "value": "'\\0'"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 15,
        "comment": "n->p = h → n->p = S 노드",
        "variables": [
          {
            "name": "n->p",
            "type": "struct node*",
            "value": "S 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n__p",
              "region": "stack",
              "label": "n->p",
              "value": "S 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_S 노드",
              "region": "stack",
              "label": "S 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n__p",
              "to": "node_S 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 16,
        "comment": "h = n → 리스트: T → S → E → B → NULL",
        "variables": [
          {
            "name": "리스트",
            "type": "String",
            "value": "T → S → E → B → NULL",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 15,
            "role": "read",
            "label": "n->p 연결"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack____",
              "region": "stack",
              "label": "리스트",
              "value": "T → S → E → B → NULL",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "while(*s) — *s = '\\0', 루프 종료",
        "variables": [
          {
            "name": "*s",
            "type": "char",
            "value": "'\\0'"
          }
        ]
      },
      {
        "line": 19,
        "comment": "return h → T 노드(head) 반환",
        "variables": [
          {
            "name": "n (head)",
            "type": "struct node*",
            "value": "T 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n__head_",
              "region": "stack",
              "label": "n (head)",
              "value": "T 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_T 노드",
              "region": "stack",
              "label": "T 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n__head_",
              "to": "node_T 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          }
        ]
      },
      {
        "line": 12,
        "comment": "while(n) — n은 T 노드, 루프 진입",
        "variables": [
          {
            "name": "n->c",
            "type": "char",
            "value": "'T'"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 14,
            "role": "read",
            "label": "n->c 선언"
          },
          {
            "line": 25,
            "role": "read",
            "label": "출력 while 루프"
          }
        ]
      },
      {
        "line": 26,
        "comment": "putchar(n->c) → putchar('T')",
        "variables": [
          {
            "name": "출력",
            "type": "char",
            "value": "'T'",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "c 선언"
          },
          {
            "line": 13,
            "role": "read",
            "label": "n 선언"
          }
        ]
      },
      {
        "line": 6,
        "comment": "struct node* t = n",
        "variables": [
          {
            "name": "t",
            "type": "struct node*",
            "value": "T 노드"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_t",
              "region": "stack",
              "label": "t",
              "value": "T 노드",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_T 노드",
              "region": "stack",
              "label": "T 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_t",
              "to": "node_T 노드",
              "label": "가리킴",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 27,
            "role": "read",
            "label": "t 선언"
          }
        ]
      },
      {
        "line": 28,
        "comment": "n = n->p → n은 S 노드",
        "variables": [
          {
            "name": "n",
            "type": "struct node*",
            "value": "S 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n",
              "region": "stack",
              "label": "n",
              "value": "S 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_S 노드",
              "region": "stack",
              "label": "S 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n",
              "to": "node_S 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 13,
            "role": "read",
            "label": "n 선언"
          },
          {
            "line": 15,
            "role": "read",
            "label": "n->p 연결"
          }
        ]
      },
      {
        "line": 29,
        "comment": "free(t) — T 노드 해제",
        "variables": []
      },
      {
        "line": 12,
        "comment": "while(n) — n은 S 노드",
        "variables": [
          {
            "name": "n->c",
            "type": "char",
            "value": "'S'"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 14,
            "role": "read",
            "label": "n->c 선언"
          },
          {
            "line": 25,
            "role": "read",
            "label": "출력 while 루프"
          }
        ]
      },
      {
        "line": 26,
        "comment": "putchar(n->c) → putchar('S')",
        "variables": [
          {
            "name": "출력",
            "type": "char",
            "value": "'S'",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "c 선언"
          },
          {
            "line": 13,
            "role": "read",
            "label": "n 선언"
          }
        ]
      },
      {
        "line": 6,
        "comment": "struct node* t = n",
        "variables": [
          {
            "name": "t",
            "type": "struct node*",
            "value": "S 노드"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_t",
              "region": "stack",
              "label": "t",
              "value": "S 노드",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_S 노드",
              "region": "stack",
              "label": "S 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_t",
              "to": "node_S 노드",
              "label": "가리킴",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 27,
            "role": "read",
            "label": "t 선언"
          }
        ]
      },
      {
        "line": 28,
        "comment": "n = n->p → n은 E 노드",
        "variables": [
          {
            "name": "n",
            "type": "struct node*",
            "value": "E 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n",
              "region": "stack",
              "label": "n",
              "value": "E 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_E 노드",
              "region": "stack",
              "label": "E 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n",
              "to": "node_E 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 13,
            "role": "read",
            "label": "n 선언"
          },
          {
            "line": 15,
            "role": "read",
            "label": "n->p 연결"
          }
        ]
      },
      {
        "line": 29,
        "comment": "free(t) — S 노드 해제",
        "variables": []
      },
      {
        "line": 12,
        "comment": "while(n) — n은 E 노드",
        "variables": [
          {
            "name": "n->c",
            "type": "char",
            "value": "'E'"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 14,
            "role": "read",
            "label": "n->c 선언"
          },
          {
            "line": 25,
            "role": "read",
            "label": "출력 while 루프"
          }
        ]
      },
      {
        "line": 26,
        "comment": "putchar(n->c) → putchar('E')",
        "variables": [
          {
            "name": "출력",
            "type": "char",
            "value": "'E'",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "c 선언"
          },
          {
            "line": 13,
            "role": "read",
            "label": "n 선언"
          }
        ]
      },
      {
        "line": 6,
        "comment": "struct node* t = n",
        "variables": [
          {
            "name": "t",
            "type": "struct node*",
            "value": "E 노드"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_t",
              "region": "stack",
              "label": "t",
              "value": "E 노드",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_E 노드",
              "region": "stack",
              "label": "E 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_t",
              "to": "node_E 노드",
              "label": "가리킴",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 27,
            "role": "read",
            "label": "t 선언"
          }
        ]
      },
      {
        "line": 28,
        "comment": "n = n->p → n은 B 노드",
        "variables": [
          {
            "name": "n",
            "type": "struct node*",
            "value": "B 노드",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n",
              "region": "stack",
              "label": "n",
              "value": "B 노드",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_B 노드",
              "region": "stack",
              "label": "B 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_n",
              "to": "node_B 노드",
              "label": "가리킴",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 13,
            "role": "read",
            "label": "n 선언"
          },
          {
            "line": 15,
            "role": "read",
            "label": "n->p 연결"
          }
        ]
      },
      {
        "line": 29,
        "comment": "free(t) — E 노드 해제",
        "variables": []
      },
      {
        "line": 12,
        "comment": "while(n) — n은 B 노드",
        "variables": [
          {
            "name": "n->c",
            "type": "char",
            "value": "'B'"
          }
        ],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 14,
            "role": "read",
            "label": "n->c 선언"
          },
          {
            "line": 25,
            "role": "read",
            "label": "출력 while 루프"
          }
        ]
      },
      {
        "line": 26,
        "comment": "putchar(n->c) → putchar('B'). 최종 출력값은 TSEB입니다.",
        "variables": [
          {
            "name": "출력",
            "type": "char",
            "value": "'B'",
            "highlight": true
          }
        ],
        "stdout": "TSEB",
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "c 선언"
          },
          {
            "line": 13,
            "role": "read",
            "label": "n 선언"
          }
        ]
      },
      {
        "line": 6,
        "comment": "struct node* t = n",
        "variables": [
          {
            "name": "t",
            "type": "struct node*",
            "value": "B 노드"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_t",
              "region": "stack",
              "label": "t",
              "value": "B 노드",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_B 노드",
              "region": "stack",
              "label": "B 노드",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_t",
              "to": "node_B 노드",
              "label": "가리킴",
              "highlight": false
            }
          ]
        },
        "relatedLines": [
          {
            "line": 27,
            "role": "read",
            "label": "t 선언"
          }
        ]
      },
      {
        "line": 28,
        "comment": "n = n->p → n = NULL",
        "variables": [
          {
            "name": "n",
            "type": "struct node*",
            "value": "NULL",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_n",
              "region": "stack",
              "label": "n",
              "value": "NULL",
              "address": "0x200",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "func 정의"
          },
          {
            "line": 13,
            "role": "read",
            "label": "n 선언"
          },
          {
            "line": 15,
            "role": "read",
            "label": "n->p 연결"
          }
        ]
      },
      {
        "line": 12,
        "comment": "free(t) — B 노드 해제. while 루프 종료",
        "variables": []
      }
    ],
};
