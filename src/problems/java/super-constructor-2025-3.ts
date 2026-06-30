import type { Problem } from "@/types/problem";

const code = `class Rectangle {

    int width, height;

    Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
}

class Square extends Rectangle {

    Square(int a) {
        ____(a, a);
    }

    int getSquareArea() {
        return width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Square sq = new Square(10);
        System.out.println(sq.getSquareArea());
    }
}`;

export const superConstructor2025_3: Problem = {
  id: "super-constructor-2025-3",
  slug: "super-constructor-2025-3",
  title: "상속과 super 생성자",
  topic: "상속",
  difficulty: "보통",
  source: "2025년 3회차",
  estimatedMinutes: 4,
  prompt:
    "다음은 Java의 상속과 생성자 호출에 관한 코드이다. 밑줄에 알맞은 단어를 작성하시오.",
  code,
  answer: "super",
  explanation: `1. Square는 Rectangle을 상속합니다.

2. 자식 클래스 생성자에서 부모 클래스 생성자를 호출할 때 super 키워드를 사용합니다.
   - ____(a, a) → super(a, a)

3. super(a, a)는 Rectangle(int width, int height)를 호출
   - width = 10, height = 10

4. getSquareArea() = 10 × 10 = 100`,
  traceSteps:   [
      {
        "line": 23,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 24,
        "comment": "Square sq = new Square(10) — Square 생성자 호출이 시작됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "new Square(10)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 13,
            "role": "call",
            "label": "Square 호출"
          },
          {
            "line": 13,
            "role": "definition",
            "label": "Square 정의"
          }
        ]
      },
      {
        "line": 13,
        "comment": "Square(int a) 진입 — a=10",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 10,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 24,
            "role": "call",
            "label": "Square 호출"
          },
          {
            "line": 24,
            "role": "read",
            "label": "sq 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "10",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 14,
        "comment": "super(a, a) 호출 — 밑줄에는 super 키워드가 들어가며 Rectangle(int, int) 생성자로 위임합니다.",
        "variables": [
          {
            "name": "밑줄 정답",
            "type": "keyword",
            "value": "super",
            "highlight": true
          },
          {
            "name": "호출",
            "type": "String",
            "value": "super(10, 10) → Rectangle 생성자"
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "definition",
            "label": "Rectangle 정의"
          }
        ]
      },
      {
        "line": 6,
        "comment": "Rectangle(int width, int height) 진입 — width=10, height=10",
        "variables": [
          {
            "name": "width (매개변수)",
            "type": "int",
            "value": 10
          },
          {
            "name": "height (매개변수)",
            "type": "int",
            "value": 10
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "definition",
            "label": "Rectangle 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_width_______",
              "region": "stack",
              "label": "width (매개변수)",
              "value": "10",
              "highlight": false
            },
            {
              "id": "stack_height_______",
              "region": "stack",
              "label": "height (매개변수)",
              "value": "10",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "this.width = width — 필드 width에 10이 할당됩니다.",
        "variables": [
          {
            "name": "width",
            "type": "int",
            "value": 10,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_width",
              "region": "stack",
              "label": "width",
              "value": "10",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "width 선언"
          }
        ]
      },
      {
        "line": 6,
        "comment": "this.height = height — 필드 height에 10이 할당됩니다.",
        "variables": [
          {
            "name": "width",
            "type": "int",
            "value": 10
          },
          {
            "name": "height",
            "type": "int",
            "value": 10,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "height 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_width",
              "region": "stack",
              "label": "width",
              "value": "10",
              "highlight": false
            },
            {
              "id": "stack_height",
              "region": "stack",
              "label": "height",
              "value": "10",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "Square(10) 생성 완료 — sq가 width=10, height=10인 객체를 가리킵니다.",
        "variables": [
          {
            "name": "sq",
            "type": "Square",
            "value": "Square(10)",
            "highlight": true
          },
          {
            "name": "width",
            "type": "int",
            "value": 10
          },
          {
            "name": "height",
            "type": "int",
            "value": 10
          }
        ],
        "relatedLines": [
          {
            "line": 3,
            "role": "read",
            "label": "width 선언"
          },
          {
            "line": 13,
            "role": "definition",
            "label": "Square 정의"
          },
          {
            "line": 24,
            "role": "read",
            "label": "sq 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "heap_sq",
              "region": "heap",
              "label": "sq",
              "value": "Square(10)",
              "highlight": true
            },
            {
              "id": "stack_width",
              "region": "stack",
              "label": "width",
              "value": "10",
              "highlight": false
            },
            {
              "id": "stack_height",
              "region": "stack",
              "label": "height",
              "value": "10",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 6,
        "comment": "sq.getSquareArea() = width × height = 10 × 10 = 100",
        "variables": [
          {
            "name": "getSquareArea()",
            "type": "int",
            "value": 100,
            "highlight": true
          }
        ],
        "stdout": "100",
        "relatedLines": [
          {
            "line": 13,
            "role": "definition",
            "label": "Square 정의"
          },
          {
            "line": 17,
            "role": "definition",
            "label": "getSquareArea() 정의"
          },
          {
            "line": 24,
            "role": "read",
            "label": "sq 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_getSquareArea__",
              "region": "stack",
              "label": "getSquareArea()",
              "value": "100",
              "highlight": true
            }
          ],
          "arrows": []
        }
      }
    ],
};
