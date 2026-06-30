import type { Problem } from "@/types/problem";

const code = `interface Machine {
    void run();
}

class WashingMachine (____빈칸____) Machine {
    private String name;

    public WashingMachine() {
        this.name = "LG Washer";
    }

    public void run() {
        System.out.println("Washing machine running");
    }
}

public class Main {
    public static void main(String[] args) {
        WashingMachine wm = new WashingMachine();
        wm.run();
    }
}`;

export const interfaceImplements2025_3: Problem = {
  id: "interface-implements-2025-3",
  slug: "interface-implements-2025-3",
  title: "인터페이스 구현 키워드",
  topic: "인터페이스",
  difficulty: "쉬움",
  source: "2025년 3회차",
  estimatedMinutes: 3,
  prompt:
    "아래 코드는 Machine 이라는 인터페이스를 정의하고 WashingMachine 클래스에서 해당 인터페이스를 사용하고자 한다. 빈칸에 들어갈 올바른 키워드를 작성하시오.",
  code,
  answer: "implements",
  explanation: `1. Machine은 run() 메서드를 선언한 인터페이스입니다.

2. 클래스가 인터페이스를 구현할 때는 implements 키워드를 사용합니다.
   - class WashingMachine implements Machine

3. implements를 채우면 WashingMachine은 Machine의 run()을 반드시 구현해야 합니다.
   - 코드에 public void run() { ... } 가 이미 정의되어 있음

4. main에서 wm.run() 호출 시 "Washing machine running" 출력`,
  traceSteps:   [
      {
        "line": 18,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 19,
        "comment": "WashingMachine wm = new WashingMachine() — 생성자가 호출됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "new WashingMachine()",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "call",
            "label": "WashingMachine 호출"
          },
          {
            "line": 5,
            "role": "read",
            "label": "WashingMachine 클래스"
          },
          {
            "line": 8,
            "role": "call",
            "label": "WashingMachine 호출"
          },
          {
            "line": 8,
            "role": "definition",
            "label": "생성자 정의"
          }
        ]
      },
      {
        "line": 5,
        "comment": "WashingMachine() 생성자 진입",
        "variables": [],
        "relatedLines": [
          {
            "line": 8,
            "role": "definition",
            "label": "생성자 정의"
          },
          {
            "line": 19,
            "role": "call",
            "label": "WashingMachine 호출 위치"
          }
        ]
      },
      {
        "line": 9,
        "comment": "this.name = \"LG Washer\" — name 필드가 초기화됩니다.",
        "variables": [
          {
            "name": "name",
            "type": "String",
            "value": "\"LG Washer\"",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_name",
              "region": "stack",
              "label": "name",
              "value": "\"LG Washer\"",
              "highlight": true
            }
          ],
          "arrows": []
        },
        "relatedLines": [
          {
            "line": 6,
            "role": "read",
            "label": "name 선언"
          }
        ]
      },
      {
        "line": 5,
        "comment": "객체 생성 완료 — WashingMachine implements Machine (빈칸 정답: implements)",
        "variables": [
          {
            "name": "빈칸 정답",
            "type": "keyword",
            "value": "implements",
            "highlight": true
          },
          {
            "name": "wm",
            "type": "WashingMachine",
            "value": "new WashingMachine()"
          },
          {
            "name": "wm.name",
            "type": "String",
            "value": "\"LG Washer\""
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "Machine 인터페이스"
          },
          {
            "line": 12,
            "role": "definition",
            "label": "run() 정의"
          },
          {
            "line": 19,
            "role": "read",
            "label": "wm 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "heap_wm",
              "region": "heap",
              "label": "wm",
              "value": "new WashingMachine()",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "wm.run() 호출 — Machine 인터페이스의 run() 구현이 실행됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "wm.run()",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 1,
            "role": "read",
            "label": "Machine 인터페이스"
          },
          {
            "line": 5,
            "role": "read",
            "label": "implements 위치"
          },
          {
            "line": 12,
            "role": "call",
            "label": "run 호출"
          },
          {
            "line": 12,
            "role": "definition",
            "label": "run() 정의"
          },
          {
            "line": 20,
            "role": "call",
            "label": "run 호출"
          }
        ]
      },
      {
        "line": 13,
        "comment": "run() 본문: System.out.println(\"Washing machine running\")",
        "variables": [
          {
            "name": "출력",
            "type": "String",
            "value": "\"Washing machine running\"",
            "highlight": true
          }
        ],
        "stdout": "Washing machine running",
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "출력",
              "value": "\"Washing machine running\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      }
    ],
};
