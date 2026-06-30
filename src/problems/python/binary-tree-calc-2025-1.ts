import type { Problem } from "@/types/problem";

const code = `class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def tree(li):
    nodes = [Node(i) for i in li]
    for i in range(1, len(li)):
        nodes[(i - 1) // 2].children.append(nodes[i])
    return nodes[0]

def calc(node, level=0):
    if node is None:
        return 0
    return (node.value if level % 2 == 1 else 0) + sum(calc(n, level + 1) for n in node.children)

li = [3, 5, 8, 12, 15, 18, 21]

root = tree(li)

print(calc(root))`;

export const binaryTreeCalc2025_1: Problem = {
  id: "binary-tree-calc-2025-1",
  slug: "binary-tree-calc-2025-1",
  title: "이진 트리 홀수 레벨 합",
  topic: "함수",
  difficulty: "어려움",
  source: "2025년 1회차",
  estimatedMinutes: 8,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "13",
  explanation: `1. tree(li)는 배열을 완전 이진 트리 형태로 만듭니다.
   - 규칙: 인덱스 i의 부모 = (i-1)//2
   - nodes[i].children에 nodes[(i-1)//2]가 자식으로 연결됨

   트리 구조:
        3 (레벨 0, index 0)
       / \\
      5   8 (레벨 1, index 1, 2)
     / \\ / \\
   12 15 18 21 (레벨 2, index 3~6)

2. calc(node, level) 규칙
   - level % 2 == 1 (홀수 레벨) → node.value를 합에 포함
   - level % 2 == 0 (짝수 레벨) → 0 (값 미포함)
   - + 모든 자식에 대한 calc(n, level+1)의 합

3. 재귀 호출 순서 (깊이 우선)
   calc(3,0)=0 + calc(5,1) + calc(8,1)
   calc(5,1)=5 + calc(12,2) + calc(15,2) = 5+0+0 = 5
   calc(8,1)=8 + calc(18,2) + calc(21,2) = 8+0+0 = 8
   calc(12,2)=0, calc(15,2)=0, calc(18,2)=0, calc(21,2)=0

4. 최종: 0 + 5 + 8 = 13`,
  traceSteps:   [
      {
        "line": 1,
        "comment": "프로그램이 시작됩니다.",
        "variables": []
      },
      {
        "line": 17,
        "comment": "li = [3, 5, 8, 12, 15, 18, 21]이 할당됩니다. (인덱스 0~6)",
        "variables": [
          {
            "name": "li",
            "type": "list",
            "value": [
              3,
              5,
              8,
              12,
              15,
              18,
              21
            ],
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_li",
              "region": "data",
              "label": "li",
              "value": "[3, 5, 8, 12, 15, 18, 21]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 19,
        "comment": "root = tree(li) 호출. tree 함수로 배열을 이진 트리로 변환합니다.",
        "variables": [
          {
            "name": "li",
            "type": "list",
            "value": [
              3,
              5,
              8,
              12,
              15,
              18,
              21
            ]
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 17,
            "role": "read",
            "label": "li 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_li",
              "region": "data",
              "label": "li",
              "value": "[3, 5, 8, 12, 15, 18, 21]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "리스트 내포로 7개 Node 생성. nodes[0]=Node(3), nodes[1]=Node(5), … nodes[6]=Node(21)",
        "variables": [
          {
            "name": "li",
            "type": "list",
            "value": [
              3,
              5,
              8,
              12,
              15,
              18,
              21
            ]
          },
          {
            "name": "nodes",
            "type": "list",
            "value": [
              "Node(3)",
              "Node(5)",
              "Node(8)",
              "Node(12)",
              "Node(15)",
              "Node(18)",
              "Node(21)"
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 17,
            "role": "read",
            "label": "li 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_li",
              "region": "data",
              "label": "li",
              "value": "[3, 5, 8, 12, 15, 18, 21]",
              "highlight": false
            },
            {
              "id": "data_nodes",
              "region": "data",
              "label": "nodes",
              "value": "[Node(3), Node(5), Node(8), Node(12), Node(15), Node(18), Node(21)]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 8,
        "comment": "for i in range(1, 7) 시작. i=1: 부모 인덱스 (1-1)//2 = 0 → nodes[0](값 3)의 자식에 nodes[1](값 5) 연결",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "부모",
            "type": "int",
            "value": 3
          },
          {
            "name": "자식",
            "type": "int",
            "value": 5
          },
          {
            "name": "연결",
            "type": "str",
            "value": "3 → [5]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "노드 생성"
          },
          {
            "line": 17,
            "role": "read",
            "label": "li 선언"
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
        "comment": "nodes[0].children.append(nodes[1]) 실행 완료",
        "variables": [
          {
            "name": "nodes[0].children",
            "type": "list",
            "value": [
              5
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "nodes 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_nodes_0__children",
              "region": "data",
              "label": "nodes[0].children",
              "value": "[5]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "i=2: 부모 (2-1)//2 = 0 → nodes[0](3)의 자식에 nodes[2](8) 연결",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "부모",
            "type": "int",
            "value": 3
          },
          {
            "name": "자식",
            "type": "int",
            "value": 8
          },
          {
            "name": "연결",
            "type": "str",
            "value": "3 → [5, 8]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 7,
            "role": "read",
            "label": "nodes 선언"
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
        "comment": "nodes[0].children.append(nodes[2]) 실행 완료",
        "variables": [
          {
            "name": "nodes[0].children",
            "type": "list",
            "value": [
              5,
              8
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "nodes 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_nodes_0__children",
              "region": "data",
              "label": "nodes[0].children",
              "value": "[5, 8]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "i=3: 부모 (3-1)//2 = 1 → nodes[1](5)의 자식에 nodes[3](12) 연결",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "부모",
            "type": "int",
            "value": 5
          },
          {
            "name": "자식",
            "type": "int",
            "value": 12
          },
          {
            "name": "연결",
            "type": "str",
            "value": "5 → [12]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "노드 생성"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
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
        "comment": "nodes[1].children.append(nodes[3]) 실행 완료",
        "variables": [
          {
            "name": "nodes[1].children",
            "type": "list",
            "value": [
              12
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "nodes 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_nodes_1__children",
              "region": "data",
              "label": "nodes[1].children",
              "value": "[12]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "i=4: 부모 (4-1)//2 = 1 → nodes[1](5)의 자식에 nodes[4](15) 연결",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 4,
            "highlight": true
          },
          {
            "name": "부모",
            "type": "int",
            "value": 5
          },
          {
            "name": "자식",
            "type": "int",
            "value": 15
          },
          {
            "name": "연결",
            "type": "str",
            "value": "5 → [12, 15]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "노드 생성"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
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
        "comment": "nodes[1].children.append(nodes[4]) 실행 완료",
        "variables": [
          {
            "name": "nodes[1].children",
            "type": "list",
            "value": [
              12,
              15
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "nodes 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_nodes_1__children",
              "region": "data",
              "label": "nodes[1].children",
              "value": "[12, 15]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "i=5: 부모 (5-1)//2 = 2 → nodes[2](8)의 자식에 nodes[5](18) 연결",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 5,
            "highlight": true
          },
          {
            "name": "부모",
            "type": "int",
            "value": 8
          },
          {
            "name": "자식",
            "type": "int",
            "value": 18
          },
          {
            "name": "연결",
            "type": "str",
            "value": "8 → [18]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "노드 생성"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
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
        "comment": "nodes[2].children.append(nodes[5]) 실행 완료",
        "variables": [
          {
            "name": "nodes[2].children",
            "type": "list",
            "value": [
              18
            ],
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "nodes 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_nodes_2__children",
              "region": "data",
              "label": "nodes[2].children",
              "value": "[18]",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "i=6: 부모 (6-1)//2 = 2 → nodes[2](8)의 자식에 nodes[6](21) 연결",
        "variables": [
          {
            "name": "i",
            "type": "int",
            "value": 6,
            "highlight": true
          },
          {
            "name": "부모",
            "type": "int",
            "value": 8
          },
          {
            "name": "자식",
            "type": "int",
            "value": 21
          },
          {
            "name": "연결",
            "type": "str",
            "value": "8 → [18, 21]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "노드 생성"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_i",
              "region": "stack",
              "label": "i",
              "value": "6",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "nodes[2].children.append(nodes[6]) 실행 완료. for 루프 종료",
        "variables": [
          {
            "name": "nodes[2].children",
            "type": "list",
            "value": [
              18,
              21
            ],
            "highlight": true
          },
          {
            "name": "전체 트리",
            "type": "str",
            "value": "3→[5,8], 5→[12,15], 8→[18,21]",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "tree 정의"
          },
          {
            "line": 7,
            "role": "read",
            "label": "nodes 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "트리 연결 루프"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_nodes_2__children",
              "region": "data",
              "label": "nodes[2].children",
              "value": "[18, 21]",
              "highlight": true
            },
            {
              "id": "data______",
              "region": "data",
              "label": "전체 트리",
              "value": "\"3→[5,8], 5→[12,15], 8→[18,21]\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 10,
        "comment": "return nodes[0] → root는 value=3인 노드. root = Node(3)",
        "variables": [
          {
            "name": "root.value",
            "type": "int",
            "value": 3,
            "highlight": true
          },
          {
            "name": "root.children",
            "type": "list",
            "value": [
              5,
              8
            ]
          }
        ],
        "relatedLines": [
          {
            "line": 7,
            "role": "read",
            "label": "nodes 선언"
          },
          {
            "line": 19,
            "role": "read",
            "label": "root 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_root_children",
              "region": "data",
              "label": "root.children",
              "value": "[5, 8]",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 21,
        "comment": "print(calc(root)) 호출. calc(3, level=0)부터 재귀가 시작됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "str",
            "value": "calc(node=3, level=0)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 12,
            "role": "definition",
            "label": "calc 정의"
          },
          {
            "line": 19,
            "role": "read",
            "label": "root 선언"
          }
        ]
      },
      {
        "line": 12,
        "comment": "calc(3, 0): level=0 → 0%2=0(짝수) → 이번 노드 기여값 0. 자식 [5, 8]에 대해 calc 호출 필요",
        "variables": [
          {
            "name": "node.value",
            "type": "int",
            "value": 3
          },
          {
            "name": "level",
            "type": "int",
            "value": 0
          },
          {
            "name": "level % 2",
            "type": "int",
            "value": 0
          },
          {
            "name": "이번 기여",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_level",
              "region": "stack",
              "label": "level",
              "value": "0",
              "highlight": false
            },
            {
              "id": "stack_level___2",
              "region": "stack",
              "label": "level % 2",
              "value": "0",
              "highlight": false
            },
            {
              "id": "stack______",
              "region": "stack",
              "label": "이번 기여",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 15,
            "role": "read",
            "label": "level % 2 선언"
          }
        ]
      },
      {
        "line": 12,
        "comment": "calc(5, 1) 진입: level=1 → 1%2=1(홀수) → 이번 노드 기여값 5. 자식 [12, 15] 재귀 호출",
        "variables": [
          {
            "name": "node.value",
            "type": "int",
            "value": 5
          },
          {
            "name": "level",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "이번 기여",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_level",
              "region": "stack",
              "label": "level",
              "value": "1",
              "highlight": true
            },
            {
              "id": "stack______",
              "region": "stack",
              "label": "이번 기여",
              "value": "5",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "calc(12, 2): level=2(짝수) → 기여값 0. children=[] 이므로 자식 재귀 없음 → 반환 0",
        "variables": [
          {
            "name": "node.value",
            "type": "int",
            "value": 12
          },
          {
            "name": "level",
            "type": "int",
            "value": 2
          },
          {
            "name": "이번 기여",
            "type": "int",
            "value": 0
          },
          {
            "name": "반환",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_level",
              "region": "stack",
              "label": "level",
              "value": "2",
              "highlight": false
            },
            {
              "id": "stack______",
              "region": "stack",
              "label": "이번 기여",
              "value": "0",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "calc(15, 2): level=2(짝수) → 기여값 0, 자식 없음 → 반환 0",
        "variables": [
          {
            "name": "node.value",
            "type": "int",
            "value": 15
          },
          {
            "name": "level",
            "type": "int",
            "value": 2
          },
          {
            "name": "반환",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_level",
              "region": "stack",
              "label": "level",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "calc(5, 1) 복귀: 5 + sum(0, 0) = 5 + 0 = 5 반환",
        "variables": [
          {
            "name": "calc(5,1)",
            "type": "int",
            "value": 5,
            "highlight": true
          },
          {
            "name": "누적 합",
            "type": "int",
            "value": 5
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_calc_5_1_",
              "region": "stack",
              "label": "calc(5,1)",
              "value": "5",
              "highlight": true
            },
            {
              "id": "stack_____",
              "region": "stack",
              "label": "누적 합",
              "value": "5",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "calc(8, 1) 진입: level=1(홀수) → 이번 노드 기여값 8. 자식 [18, 21] 재귀 호출",
        "variables": [
          {
            "name": "node.value",
            "type": "int",
            "value": 8
          },
          {
            "name": "level",
            "type": "int",
            "value": 1,
            "highlight": true
          },
          {
            "name": "이번 기여",
            "type": "int",
            "value": 8,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_level",
              "region": "stack",
              "label": "level",
              "value": "1",
              "highlight": true
            },
            {
              "id": "stack______",
              "region": "stack",
              "label": "이번 기여",
              "value": "8",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "calc(18, 2): level=2(짝수) → 기여값 0, 자식 없음 → 반환 0",
        "variables": [
          {
            "name": "node.value",
            "type": "int",
            "value": 18
          },
          {
            "name": "level",
            "type": "int",
            "value": 2
          },
          {
            "name": "반환",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_level",
              "region": "stack",
              "label": "level",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "calc(21, 2): level=2(짝수) → 기여값 0, 자식 없음 → 반환 0",
        "variables": [
          {
            "name": "node.value",
            "type": "int",
            "value": 21
          },
          {
            "name": "level",
            "type": "int",
            "value": 2
          },
          {
            "name": "반환",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_level",
              "region": "stack",
              "label": "level",
              "value": "2",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "calc(8, 1) 복귀: 8 + sum(0, 0) = 8 반환",
        "variables": [
          {
            "name": "calc(8,1)",
            "type": "int",
            "value": 8,
            "highlight": true
          },
          {
            "name": "누적 합",
            "type": "int",
            "value": 5
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_calc_8_1_",
              "region": "stack",
              "label": "calc(8,1)",
              "value": "8",
              "highlight": true
            },
            {
              "id": "stack_____",
              "region": "stack",
              "label": "누적 합",
              "value": "5",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "calc(3, 0) 복귀: 0 + calc(5,1) + calc(8,1) = 0 + 5 + 8 = 13 반환",
        "variables": [
          {
            "name": "calc(5,1)",
            "type": "int",
            "value": 5
          },
          {
            "name": "calc(8,1)",
            "type": "int",
            "value": 8
          },
          {
            "name": "calc(root)",
            "type": "int",
            "value": 13,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_calc_5_1_",
              "region": "stack",
              "label": "calc(5,1)",
              "value": "5",
              "highlight": false
            },
            {
              "id": "stack_calc_8_1_",
              "region": "stack",
              "label": "calc(8,1)",
              "value": "8",
              "highlight": false
            },
            {
              "id": "stack_calc_root_",
              "region": "stack",
              "label": "calc(root)",
              "value": "13",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 21,
        "comment": "print(13) 실행. 최종 출력값은 13입니다.",
        "variables": [
          {
            "name": "calc(root)",
            "type": "int",
            "value": 13
          }
        ],
        "stdout": "13",
        "relatedLines": [
          {
            "line": 12,
            "role": "definition",
            "label": "calc 정의"
          },
          {
            "line": 19,
            "role": "read",
            "label": "root 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_calc_root_",
              "region": "stack",
              "label": "calc(root)",
              "value": "13",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
