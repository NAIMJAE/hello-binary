import type { Problem } from "@/types/problem";

const code = `public class Main {
    static class Box {
        int v;
        Box(int v) { this.v = v; }
    }
    public static void main(String[] args) {
        Box x = new Box(1);
        Box y = new Box(2);
        Box z = new Box(3);
        Box[] arr = { x, y, z };
        Box tmp = arr[0];
        arr[0] = arr[2];
        arr[2] = tmp;
        arr[1].v = arr[0].v;
        System.out.print(x.v + "" + y.v + z.v);
    }
}`;

export const referenceMemoryDiagram2026_1: Problem = {
  id: "reference-memory-diagram-2026-1",
  slug: "reference-memory-diagram-2026-1",
  title: "테스트",
  topic: "참조",
  difficulty: "어려움",
  source: "9999년",
  estimatedMinutes: 7,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "133",
  memoryView: "diagram",
  explanation: `1. x(v=1), y(v=2), z(v=3) — 힙에 Box 객체 3개 생성
   스택 변수 x, y, z는 각 객체의 주소(참조)를 보관합니다.

2. arr = { x, y, z } — 힙에 Box[] 배열 생성
   배열 슬롯 [0],[1],[2]에 x, y, z 참조가 저장됩니다.

3. tmp = arr[0] — tmp도 x 객체를 가리킵니다.

4. arr[0] = arr[2] — 배열 슬롯만 변경, arr = { z, y, x }

5. arr[2] = tmp — arr[2]가 x를 가리킴, arr = { z, y, x }

6. arr[1].v = arr[0].v
   - arr[1]은 y, arr[0]은 z → y.v = z.v = 3

7. x.v=1, y.v=3, z.v=3 → 출력: 133`,
  traceSteps:   [
      {
        "line": 7,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "Box 호출"
          },
          {
            "line": 9,
            "role": "call",
            "label": "Box 호출"
          }
        ]
      },
      {
        "line": 8,
        "comment": "Box x = new Box(1) — 힙에 Box 객체가 생성되고, 스택 변수 x가 그 주소를 참조합니다.",
        "variables": [
          {
            "name": "x.v",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ],
        "memoryDiagram": {
          "stack": [
            {
              "id": "stack_x",
              "name": "x",
              "type": "Box",
              "address": "0x7C00",
              "value": "0x200",
              "kind": "reference",
              "refTo": "heap_x",
              "highlight": true
            }
          ],
          "heap": [
            {
              "id": "heap_x",
              "kind": "object",
              "address": "0x200",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "1",
                  "kind": "primitive",
                  "highlight": true
                }
              ],
              "highlight": true
            }
          ],
          "links": [
            {
              "from": "stack_x",
              "to": "heap_x",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "Box 호출"
          },
          {
            "line": 7,
            "role": "call",
            "label": "Box 호출"
          },
          {
            "line": 7,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 9,
            "role": "call",
            "label": "Box 호출"
          }
        ]
      },
      {
        "line": 9,
        "comment": "Box y = new Box(2) — y도 별도의 Box 객체를 힙에 생성하고 참조합니다.",
        "variables": [
          {
            "name": "x.v",
            "type": "int",
            "value": 1
          },
          {
            "name": "y.v",
            "type": "int",
            "value": 2,
            "highlight": true
          }
        ],
        "memoryDiagram": {
          "stack": [
            {
              "id": "stack_x",
              "name": "x",
              "type": "Box",
              "address": "0x7C00",
              "value": "0x200",
              "kind": "reference",
              "refTo": "heap_x"
            },
            {
              "id": "stack_y",
              "name": "y",
              "type": "Box",
              "address": "0x7C08",
              "value": "0x208",
              "kind": "reference",
              "refTo": "heap_y",
              "highlight": true
            }
          ],
          "heap": [
            {
              "id": "heap_x",
              "kind": "object",
              "address": "0x200",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "1",
                  "kind": "primitive"
                }
              ]
            },
            {
              "id": "heap_y",
              "kind": "object",
              "address": "0x208",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "2",
                  "kind": "primitive",
                  "highlight": true
                }
              ],
              "highlight": true
            }
          ],
          "links": [
            {
              "from": "stack_x",
              "to": "heap_x"
            },
            {
              "from": "stack_y",
              "to": "heap_y",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 4,
            "role": "call",
            "label": "Box 호출"
          },
          {
            "line": 7,
            "role": "call",
            "label": "Box 호출"
          },
          {
            "line": 7,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "y 선언"
          }
        ]
      },
      {
        "line": 10,
        "comment": "Box z = new Box(3) — z도 힙 객체를 참조합니다.",
        "variables": [
          {
            "name": "x.v",
            "type": "int",
            "value": 1
          },
          {
            "name": "y.v",
            "type": "int",
            "value": 2
          },
          {
            "name": "z.v",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "memoryDiagram": {
          "stack": [
            {
              "id": "stack_x",
              "name": "x",
              "type": "Box",
              "address": "0x7C00",
              "value": "0x200",
              "kind": "reference",
              "refTo": "heap_x"
            },
            {
              "id": "stack_y",
              "name": "y",
              "type": "Box",
              "address": "0x7C08",
              "value": "0x208",
              "kind": "reference",
              "refTo": "heap_y"
            },
            {
              "id": "stack_z",
              "name": "z",
              "type": "Box",
              "address": "0x7C10",
              "value": "0x220",
              "kind": "reference",
              "refTo": "heap_z",
              "highlight": true
            }
          ],
          "heap": [
            {
              "id": "heap_x",
              "kind": "object",
              "address": "0x200",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "1",
                  "kind": "primitive"
                }
              ]
            },
            {
              "id": "heap_y",
              "kind": "object",
              "address": "0x208",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "2",
                  "kind": "primitive"
                }
              ]
            },
            {
              "id": "heap_z",
              "kind": "object",
              "address": "0x220",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "3",
                  "kind": "primitive",
                  "highlight": true
                }
              ],
              "highlight": true
            }
          ],
          "links": [
            {
              "from": "stack_x",
              "to": "heap_x"
            },
            {
              "from": "stack_y",
              "to": "heap_y"
            },
            {
              "from": "stack_z",
              "to": "heap_z",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 7,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "z 선언"
          }
        ]
      },
      {
        "line": 11,
        "comment": "Box[] arr = { x, y, z } — 힙에 배열 객체가 생성되고, 각 슬롯에 x·y·z 참조가 저장됩니다.",
        "variables": [
          {
            "name": "arr",
            "type": "Box[]",
            "value": "[x, y, z]",
            "highlight": true
          }
        ],
        "memoryDiagram": {
          "stack": [
            {
              "id": "stack_x",
              "name": "x",
              "type": "Box",
              "address": "0x7C00",
              "value": "0x200",
              "kind": "reference",
              "refTo": "heap_x"
            },
            {
              "id": "stack_y",
              "name": "y",
              "type": "Box",
              "address": "0x7C08",
              "value": "0x208",
              "kind": "reference",
              "refTo": "heap_y"
            },
            {
              "id": "stack_z",
              "name": "z",
              "type": "Box",
              "address": "0x7C10",
              "value": "0x220",
              "kind": "reference",
              "refTo": "heap_z"
            },
            {
              "id": "stack_arr",
              "name": "arr",
              "type": "Box[]",
              "address": "0x7C18",
              "value": "0x300",
              "kind": "reference",
              "refTo": "heap_arr",
              "highlight": true
            }
          ],
          "heap": [
            {
              "id": "heap_x",
              "kind": "object",
              "address": "0x200",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "1",
                  "kind": "primitive"
                }
              ]
            },
            {
              "id": "heap_y",
              "kind": "object",
              "address": "0x208",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "2",
                  "kind": "primitive"
                }
              ]
            },
            {
              "id": "heap_z",
              "kind": "object",
              "address": "0x220",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "3",
                  "kind": "primitive"
                }
              ]
            },
            {
              "id": "heap_arr",
              "kind": "array",
              "address": "0x300",
              "typeName": "Box[]",
              "elements": [
                {
                  "index": 0,
                  "kind": "reference",
                  "value": "0x200",
                  "refTo": "heap_x",
                  "refLabel": "x",
                  "highlight": true
                },
                {
                  "index": 1,
                  "kind": "reference",
                  "value": "0x208",
                  "refTo": "heap_y",
                  "refLabel": "y",
                  "highlight": true
                },
                {
                  "index": 2,
                  "kind": "reference",
                  "value": "0x220",
                  "refTo": "heap_z",
                  "refLabel": "z",
                  "highlight": true
                }
              ],
              "highlight": true
            }
          ],
          "links": [
            {
              "from": "stack_x",
              "to": "heap_x"
            },
            {
              "from": "stack_y",
              "to": "heap_y"
            },
            {
              "from": "stack_z",
              "to": "heap_z"
            },
            {
              "from": "stack_arr",
              "to": "heap_arr",
              "highlight": true
            },
            {
              "from": "heap_arr_el_0",
              "to": "heap_x",
              "highlight": true
            },
            {
              "from": "heap_arr_el_1",
              "to": "heap_y",
              "highlight": true
            },
            {
              "from": "heap_arr_el_2",
              "to": "heap_z",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 7,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 10,
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
              "value": "[x, y, z]",
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
              "value": "[x, y, z]",
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
        "line": 12,
        "comment": "Box tmp = arr[0] — tmp가 x 객체(0x200)를 참조합니다.",
        "variables": [
          {
            "name": "tmp",
            "type": "Box",
            "value": "x (v=1)",
            "highlight": true
          }
        ],
        "memoryDiagram": {
          "stack": [
            {
              "id": "stack_tmp",
              "name": "tmp",
              "type": "Box",
              "address": "0x7C20",
              "value": "0x200",
              "kind": "reference",
              "refTo": "heap_x",
              "highlight": true
            }
          ],
          "heap": [],
          "links": [
            {
              "from": "stack_tmp",
              "to": "heap_x",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 10,
            "role": "read",
            "label": "arr 선언"
          },
          {
            "line": 11,
            "role": "read",
            "label": "tmp 선언"
          }
        ]
      },
      {
        "line": 13,
        "comment": "arr[0] = arr[2] — 배열 슬롯 [0]이 z를 가리키도록 바뀝니다. arr = { z, y, x }",
        "variables": [
          {
            "name": "arr",
            "type": "Box[]",
            "value": "[z, y, x]",
            "highlight": true
          }
        ],
        "memoryDiagram": {
          "stack": [],
          "heap": [
            {
              "id": "heap_arr",
              "kind": "array",
              "address": "0x300",
              "typeName": "Box[]",
              "elements": [
                {
                  "index": 0,
                  "kind": "reference",
                  "value": "0x220",
                  "refTo": "heap_z",
                  "refLabel": "z",
                  "highlight": true
                },
                {
                  "index": 1,
                  "kind": "reference",
                  "value": "0x208",
                  "refTo": "heap_y",
                  "refLabel": "y"
                },
                {
                  "index": 2,
                  "kind": "reference",
                  "value": "0x200",
                  "refTo": "heap_x",
                  "refLabel": "x"
                }
              ],
              "highlight": true
            }
          ],
          "links": [
            {
              "from": "heap_arr_el_0",
              "to": "heap_z",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "z 선언"
          },
          {
            "line": 10,
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
              "value": "[z, y, x]",
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
              "value": "[z, y, x]",
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
        "line": 14,
        "comment": "arr[2] = tmp — 슬롯 [2]가 x를 가리킵니다. arr = { z, y, x }",
        "variables": [
          {
            "name": "arr",
            "type": "Box[]",
            "value": "[z, y, x]",
            "highlight": true
          }
        ],
        "memoryDiagram": {
          "stack": [],
          "heap": [
            {
              "id": "heap_arr",
              "kind": "array",
              "address": "0x300",
              "typeName": "Box[]",
              "elements": [
                {
                  "index": 0,
                  "kind": "reference",
                  "value": "0x220",
                  "refTo": "heap_z",
                  "refLabel": "z"
                },
                {
                  "index": 1,
                  "kind": "reference",
                  "value": "0x208",
                  "refTo": "heap_y",
                  "refLabel": "y"
                },
                {
                  "index": 2,
                  "kind": "reference",
                  "value": "0x200",
                  "refTo": "heap_x",
                  "refLabel": "x",
                  "highlight": true
                }
              ],
              "highlight": true
            }
          ],
          "links": [
            {
              "from": "heap_arr_el_2",
              "to": "heap_x",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "z 선언"
          },
          {
            "line": 10,
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
              "value": "[z, y, x]",
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
              "value": "[z, y, x]",
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
        "line": 15,
        "comment": "arr[1].v = arr[0].v — arr[1]은 y, arr[0]은 z이므로 y.v = z.v = 3",
        "variables": [
          {
            "name": "arr[0].v (z)",
            "type": "int",
            "value": 3
          },
          {
            "name": "y.v",
            "type": "int",
            "value": 3,
            "highlight": true
          }
        ],
        "memoryDiagram": {
          "stack": [],
          "heap": [
            {
              "id": "heap_y",
              "kind": "object",
              "address": "0x208",
              "typeName": "Box",
              "fields": [
                {
                  "name": "v",
                  "type": "int",
                  "value": "3",
                  "kind": "primitive",
                  "highlight": true
                }
              ],
              "highlight": true
            }
          ],
          "links": [
            {
              "from": "heap_arr_el_1",
              "to": "heap_y",
              "highlight": true
            },
            {
              "from": "heap_arr_el_0",
              "to": "heap_z",
              "highlight": true
            }
          ]
        },
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "v 선언"
          },
          {
            "line": 7,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "data_arr",
              "region": "data",
              "label": "arr",
              "value": "3",
              "highlight": false
            },
            {
              "id": "stack_arr",
              "region": "stack",
              "label": "arr",
              "value": "→ 배열",
              "address": "0x100",
              "highlight": false
            }
          ],
          "arrows": [
            {
              "from": "stack_arr",
              "to": "data_arr",
              "label": "주소",
              "highlight": false
            }
          ]
        }
      },
      {
        "line": 16,
        "comment": "x.v=1, y.v=3, z.v=3 → System.out.print → 133",
        "variables": [
          {
            "name": "x.v",
            "type": "int",
            "value": 1
          },
          {
            "name": "y.v",
            "type": "int",
            "value": 3
          },
          {
            "name": "z.v",
            "type": "int",
            "value": 3
          },
          {
            "name": "출력",
            "type": "String",
            "value": "\"133\"",
            "highlight": true
          }
        ],
        "stdout": "133",
        "relatedLines": [
          {
            "line": 7,
            "role": "read",
            "label": "x 선언"
          },
          {
            "line": 8,
            "role": "read",
            "label": "y 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "z 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "출력",
              "value": "\"133\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      }
    ],
};
