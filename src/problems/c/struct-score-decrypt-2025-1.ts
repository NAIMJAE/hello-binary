import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

typedef struct student {
    char* name;
    int score[3];
} Student;

int dec(int enc) {
    return enc & 0xA5;
}

int sum(Student* p) {
    return dec(p->score[0]) + dec(p->score[1]) + dec(p->score[2]);
}

int main() {
    Student s[2] = { "Kim", {0xA0, 0xA5, 0xDB}, "Lee", {0xA0, 0xED, 0x81} };
    Student* p = s;
    int result = 0;

    for (int i = 0; i < 2; i++) {
        result += sum(&s[i]);
    }
    printf("%d", result);
    return 0;
}`;

export const structScoreDecrypt2025_1: Problem = {
  id: "struct-score-decrypt-2025-1",
  slug: "struct-score-decrypt-2025-1",
  title: "구조체 점수 복호화 합계",
  topic: "구조체",
  difficulty: "어려움",
  source: "2025년 1회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "908",
  explanation: `1. dec(enc) = enc & 0xA5 (비트 AND 복호화)

2. Kim — score {0xA0, 0xA5, 0xDB}
   - 0xA0 & 0xA5 = 0xA0 (160)
   - 0xA5 & 0xA5 = 0xA5 (165)
   - 0xDB & 0xA5 = 0x81 (129)
   - sum = 454

3. Lee — score {0xA0, 0xED, 0x81}
   - 0xA0 & 0xA5 = 0xA0 (160)
   - 0xED & 0xA5 = 0xA5 (165)
   - 0x81 & 0xA5 = 0x81 (129)
   - sum = 454

4. result = 454 + 454 = 908`,
  traceSteps:   [
      {
        "line": 16,
        "comment": "main() 함수가 시작됩니다.",
        "variables": []
      },
      {
        "line": 17,
        "comment": "Student s[2] 초기화 — Kim, Lee",
        "variables": [
          {
            "name": "s[0].name",
            "type": "char*",
            "value": "\"Kim\""
          },
          {
            "name": "s[0].score",
            "type": "int[3]",
            "value": [
              160,
              165,
              219
            ],
            "highlight": true
          },
          {
            "name": "s[1].name",
            "type": "char*",
            "value": "\"Lee\""
          },
          {
            "name": "s[1].score",
            "type": "int[3]",
            "value": [
              160,
              237,
              129
            ]
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_s_0__name",
              "region": "stack",
              "label": "s[0].name",
              "value": "\"Kim\"",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_\"Kim\"",
              "region": "stack",
              "label": "\"Kim\"",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "ptr_s_1__name",
              "region": "stack",
              "label": "s[1].name",
              "value": "\"Lee\"",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_\"Lee\"",
              "region": "stack",
              "label": "\"Lee\"",
              "value": "(노드)",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_s_0__name",
              "to": "node_\"Kim\"",
              "label": "가리킴",
              "highlight": false
            },
            {
              "from": "ptr_s_1__name",
              "to": "node_\"Lee\"",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 18,
        "comment": "Student* p = s",
        "variables": [
          {
            "name": "p",
            "type": "Student*",
            "value": "&s[0]",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_p",
              "region": "stack",
              "label": "p",
              "value": "&s[0]",
              "address": "0x200",
              "highlight": true
            },
            {
              "id": "node_s[0]",
              "region": "stack",
              "label": "s[0]",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "stack_p",
              "region": "stack",
              "label": "p",
              "value": "&s[0]",
              "address": "0x230",
              "highlight": true
            }
          ],
          "arrows": [
            {
              "from": "ptr_p",
              "to": "node_s[0]",
              "label": "가리킴",
              "highlight": true
            }
          ]
        }
      },
      {
        "line": 19,
        "comment": "int result = 0",
        "variables": [
          {
            "name": "result",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_result",
              "region": "stack",
              "label": "result",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 21,
        "comment": "for 루프 — i=0, sum(&s[0]) 호출 (Kim)",
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
            "line": 12,
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
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "sum(&s[0]) 진입 — Kim의 score 3개 복호화",
        "variables": [
          {
            "name": "p->name",
            "type": "char*",
            "value": "\"Kim\""
          },
          {
            "name": "p->score",
            "type": "int[3]",
            "value": [
              160,
              165,
              219
            ]
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_p__name",
              "region": "stack",
              "label": "p->name",
              "value": "\"Kim\"",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_\"Kim\"",
              "region": "stack",
              "label": "\"Kim\"",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "data_p__score",
              "region": "data",
              "label": "p->score",
              "value": "[160, 165, 219]",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_p__name",
              "to": "node_\"Kim\"",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 13,
        "comment": "dec(p->score[0]) 호출 — enc=0xA0",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xA0",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "dec 정의"
          },
          {
            "line": 8,
            "role": "read",
            "label": "enc 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xA0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "dec(0xA0) 진입",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xA0"
          }
        ],
        "relatedLines": [
          {
            "line": 13,
            "role": "call",
            "label": "dec 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xA0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "0xA0 & 0xA5 = 0xA0 (160)",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 160,
            "highlight": true
          }
        ]
      },
      {
        "line": 13,
        "comment": "dec(p->score[1]) 호출 — enc=0xA5",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xA5",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "dec 정의"
          },
          {
            "line": 8,
            "role": "read",
            "label": "enc 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xA5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "dec(0xA5) 진입",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xA5"
          }
        ],
        "relatedLines": [
          {
            "line": 13,
            "role": "call",
            "label": "dec 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xA5",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "0xA5 & 0xA5 = 0xA5 (165)",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 165,
            "highlight": true
          }
        ]
      },
      {
        "line": 13,
        "comment": "dec(p->score[2]) 호출 — enc=0xDB",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xDB",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "dec 정의"
          },
          {
            "line": 8,
            "role": "read",
            "label": "enc 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xDB",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "dec(0xDB) 진입",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xDB"
          }
        ],
        "relatedLines": [
          {
            "line": 13,
            "role": "call",
            "label": "dec 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xDB",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "0xDB & 0xA5 = 0x81 (129)",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 129,
            "highlight": true
          }
        ]
      },
      {
        "line": 13,
        "comment": "sum 반환 — 160 + 165 + 129 = 454",
        "variables": [
          {
            "name": "sum(&s[0])",
            "type": "int",
            "value": 454,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "dec 정의"
          },
          {
            "line": 12,
            "role": "read",
            "label": "sum 선언"
          }
        ]
      },
      {
        "line": 22,
        "comment": "result += 454 → result=454",
        "variables": [
          {
            "name": "result",
            "type": "int",
            "value": 454,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 19,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_result",
              "region": "stack",
              "label": "result",
              "value": "454",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 21,
        "comment": "for 루프 — i=1, sum(&s[1]) 호출 (Lee)",
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
            "line": 12,
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
              "value": "1",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "sum(&s[1]) 진입 — Lee의 score 3개 복호화",
        "variables": [
          {
            "name": "p->name",
            "type": "char*",
            "value": "\"Lee\""
          },
          {
            "name": "p->score",
            "type": "int[3]",
            "value": [
              160,
              237,
              129
            ]
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "ptr_p__name",
              "region": "stack",
              "label": "p->name",
              "value": "\"Lee\"",
              "address": "0x200",
              "highlight": false
            },
            {
              "id": "node_\"Lee\"",
              "region": "stack",
              "label": "\"Lee\"",
              "value": "(노드)",
              "highlight": false
            },
            {
              "id": "data_p__score",
              "region": "data",
              "label": "p->score",
              "value": "[160, 237, 129]",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "ptr_p__name",
              "to": "node_\"Lee\"",
              "label": "가리킴",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 13,
        "comment": "dec(p->score[0]) 호출 — enc=0xA0",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xA0",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "dec 정의"
          },
          {
            "line": 8,
            "role": "read",
            "label": "enc 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xA0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "dec(0xA0) 진입",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xA0"
          }
        ],
        "relatedLines": [
          {
            "line": 13,
            "role": "call",
            "label": "dec 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xA0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "0xA0 & 0xA5 = 0xA0 (160)",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 160,
            "highlight": true
          }
        ]
      },
      {
        "line": 13,
        "comment": "dec(p->score[1]) 호출 — enc=0xED",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xED",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "dec 정의"
          },
          {
            "line": 8,
            "role": "read",
            "label": "enc 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xED",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "dec(0xED) 진입",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0xED"
          }
        ],
        "relatedLines": [
          {
            "line": 13,
            "role": "call",
            "label": "dec 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0xED",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "0xED & 0xA5 = 0xA5 (165)",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 165,
            "highlight": true
          }
        ]
      },
      {
        "line": 13,
        "comment": "dec(p->score[2]) 호출 — enc=0x81",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0x81",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "dec 정의"
          },
          {
            "line": 8,
            "role": "read",
            "label": "enc 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0x81",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "dec(0x81) 진입",
        "variables": [
          {
            "name": "enc",
            "type": "int",
            "value": "0x81"
          }
        ],
        "relatedLines": [
          {
            "line": 13,
            "role": "call",
            "label": "dec 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_enc",
              "region": "stack",
              "label": "enc",
              "value": "0x81",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "0x81 & 0xA5 = 0x81 (129)",
        "variables": [
          {
            "name": "반환값",
            "type": "int",
            "value": 129,
            "highlight": true
          }
        ]
      },
      {
        "line": 13,
        "comment": "sum 반환 — 160 + 165 + 129 = 454",
        "variables": [
          {
            "name": "sum(&s[1])",
            "type": "int",
            "value": 454,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "dec 정의"
          },
          {
            "line": 12,
            "role": "read",
            "label": "sum 선언"
          }
        ]
      },
      {
        "line": 22,
        "comment": "result += 454 → result=908",
        "variables": [
          {
            "name": "result",
            "type": "int",
            "value": 908,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "read",
            "label": "sum 선언"
          },
          {
            "line": 19,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_result",
              "region": "stack",
              "label": "result",
              "value": "908",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 24,
        "comment": "printf(\"%d\", result) → 908 출력",
        "variables": [
          {
            "name": "result",
            "type": "int",
            "value": 908
          }
        ],
        "stdout": "908",
        "relatedLines": [
          {
            "line": 19,
            "role": "read",
            "label": "result 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_result",
              "region": "stack",
              "label": "result",
              "value": "908",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
