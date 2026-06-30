import type { Problem } from "@/types/problem";

const code = `i = input()
x = []

for word in i.split():
    x.append(word)

y = ''.join(x)
z = ''.join(c for c in y[::-1] if c not in 'ong')

print(z)`;

export const humanDev2026_1: Problem = {
  id: "human-dev-2026-1",
  slug: "human-dev-2026-1",
  title: "문자열 뒤집기와 필터링",
  topic: "문자열",
  difficulty: "보통",
  source: "2026년 1회차",
  estimatedMinutes: 5,
  prompt:
    "아래 파이썬 코드가 있다. 입력값으로 HumanDev를 주었을 때 출력되는 결과를 쓰시오.",
  input: "HumanDev",
  code,
  answer: "veDamuH",
  explanation: `1. input()으로 i = "HumanDev"가 저장됩니다.
2. x = [] 빈 리스트를 만듭니다.
3. i.split()은 공백이 없으므로 ["HumanDev"] 하나의 요소만 반환합니다.
4. x.append(word) 후 x = ["HumanDev"]
5. y = ''.join(x) → y = "HumanDev"
6. y[::-1]은 문자열을 뒤집어 "veDanmuH"가 됩니다.
7. 'o', 'n', 'g'에 해당하지 않는 문자만 남기면 'n'이 제거되어 z = "veDamuH"
8. print(z) → veDamuH`,
  traceSteps:   [
      {
        "line": 1,
        "comment": "프로그램이 시작됩니다. 입력값으로 \"HumanDev\"가 주어집니다.",
        "variables": []
      },
      {
        "line": 1,
        "comment": "input()이 호출되어 문자열 \"HumanDev\"이 변수 i에 저장됩니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "빈 리스트 []가 변수 x에 할당됩니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "x",
            "type": "list",
            "value": [],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "i 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_x",
              "region": "data",
              "label": "x",
              "value": "[]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "i.split()은 공백 기준으로 나눕니다. \"HumanDev\"에는 공백이 없어 [\"HumanDev\"]가 됩니다. for 루프에 진입합니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "x",
            "type": "list",
            "value": []
          },
          {
            "name": "word",
            "type": "str",
            "value": "HumanDev",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "x 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_x",
              "region": "data",
              "label": "x",
              "value": "[]",
              "highlight": false
            },
            {
              "id": "data_word",
              "region": "data",
              "label": "word",
              "value": "\"HumanDev\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 5,
        "comment": "x.append(word)로 리스트 x에 \"HumanDev\"가 추가됩니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "x",
            "type": "list",
            "value": [
              "HumanDev"
            ],
            "highlight": true
          },
          {
            "name": "word",
            "type": "str",
            "value": "HumanDev"
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "x 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_x",
              "region": "data",
              "label": "x",
              "value": "[HumanDev]",
              "highlight": true
            },
            {
              "id": "data_word",
              "region": "data",
              "label": "word",
              "value": "\"HumanDev\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "더 이상 반복할 단어가 없어 for 루프를 빠져나옵니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "x",
            "type": "list",
            "value": [
              "HumanDev"
            ]
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "x 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_x",
              "region": "data",
              "label": "x",
              "value": "[HumanDev]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "''.join(x)로 리스트 요소를 이어 붙여 y = \"HumanDev\" 문자열을 만듭니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "x",
            "type": "list",
            "value": [
              "HumanDev"
            ]
          },
          {
            "name": "y",
            "type": "str",
            "value": "HumanDev",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "x 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_x",
              "region": "data",
              "label": "x",
              "value": "[HumanDev]",
              "highlight": false
            },
            {
              "id": "data_y",
              "region": "data",
              "label": "y",
              "value": "\"HumanDev\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "y[::-1]로 문자열을 뒤집으면 \"veDanmuH\"가 됩니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "x",
            "type": "list",
            "value": [
              "HumanDev"
            ]
          },
          {
            "name": "y",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "y[::-1]",
            "type": "str",
            "value": "veDanmuH",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "y 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_x",
              "region": "data",
              "label": "x",
              "value": "[HumanDev]",
              "highlight": false
            },
            {
              "id": "data_y",
              "region": "data",
              "label": "y",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_y____1_",
              "region": "data",
              "label": "y[::-1]",
              "value": "\"veDanmuH\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "'o', 'n', 'g'에 해당하는 문자를 제외합니다. 'n'이 제거되어 z = \"veDamuH\"가 됩니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "x",
            "type": "list",
            "value": [
              "HumanDev"
            ]
          },
          {
            "name": "y",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "y[::-1]",
            "type": "str",
            "value": "veDanmuH"
          },
          {
            "name": "z",
            "type": "str",
            "value": "veDamuH",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "i 선언"
          },
          {
            "line": 2,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "y 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_x",
              "region": "data",
              "label": "x",
              "value": "[HumanDev]",
              "highlight": false
            },
            {
              "id": "data_y",
              "region": "data",
              "label": "y",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_y____1_",
              "region": "data",
              "label": "y[::-1]",
              "value": "\"veDanmuH\"",
              "highlight": false
            },
            {
              "id": "data_z",
              "region": "data",
              "label": "z",
              "value": "\"veDamuH\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "print(z)가 실행되어 최종 결과 \"veDamuH\"가 출력됩니다.",
        "variables": [
          {
            "name": "i",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "x",
            "type": "list",
            "value": [
              "HumanDev"
            ]
          },
          {
            "name": "y",
            "type": "str",
            "value": "HumanDev"
          },
          {
            "name": "z",
            "type": "str",
            "value": "veDamuH"
          }
        ],
        "stdout": "veDamuH",
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_i",
              "region": "data",
              "label": "i",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_x",
              "region": "data",
              "label": "x",
              "value": "[HumanDev]",
              "highlight": false
            },
            {
              "id": "data_y",
              "region": "data",
              "label": "y",
              "value": "\"HumanDev\"",
              "highlight": false
            },
            {
              "id": "data_z",
              "region": "data",
              "label": "z",
              "value": "\"veDamuH\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
