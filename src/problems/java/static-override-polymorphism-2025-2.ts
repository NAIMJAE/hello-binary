import type { Problem } from "@/types/problem";

const code = `public class Main{

    public static class Parent {

        public int x(int i) { return i + 2; }
        public static String id() { return "P";}
        
    }

    public static class Child extends Parent {
        
        public int x(int i) { return i + 3; }
        public String x(String s) { return s + "R"; }
        public static String id() { return "C"; }
        
    }

    public static void main(String[] args) {

        Parent ref = new Child();
        System.out.println(ref.x(2) + ref.id());
        
    }
    
}`;

export const staticOverridePolymorphism2025_2: Problem = {
  id: "static-override-polymorphism-2025-2",
  slug: "static-override-polymorphism-2025-2",
  title: "오버라이딩과 static 메서드",
  topic: "상속",
  difficulty: "어려움",
  source: "2025년 2회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 Java언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "5P",
  explanation: `1. Parent ref = new Child();
   - 참조 타입: Parent, 실제 객체: Child

2. ref.x(2) — 인스턴스 메서드는 런타임 타입(Child) 기준
   - Child.x(int) 오버라이드 → 2 + 3 = 5

3. ref.id() — static 메서드는 컴파일 시점 참조 타입(Parent) 기준
   - Parent.id() → "P" (Child.id()는 호출되지 않음)

4. 5 + "P" = "5P" (정수가 문자열로 변환 후 연결)`,
  traceSteps:   [
      {
        "line": 18,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 20,
        "comment": "Parent ref = new Child() — 참조 타입 Parent, 실제 객체 Child",
        "variables": [
          {
            "name": "ref (참조 타입)",
            "type": "String",
            "value": "Parent"
          },
          {
            "name": "ref (실제 객체)",
            "type": "String",
            "value": "Child",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "definition",
            "label": "Child 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_ref________",
              "region": "stack",
              "label": "ref (참조 타입)",
              "value": "Parent",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 12,
        "comment": "ref.x(2) 평가 — 인스턴스 메서드는 런타임 타입 Child의 오버라이드가 실행됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "Child.x(2)"
          },
          {
            "name": "ref.x(2)",
            "type": "int",
            "value": 5,
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "definition",
            "label": "Child 정의"
          },
          {
            "line": 12,
            "role": "call",
            "label": "x 호출"
          },
          {
            "line": 13,
            "role": "call",
            "label": "x 호출"
          },
          {
            "line": 20,
            "role": "read",
            "label": "ref 선언"
          }
        ]
      },
      {
        "line": 6,
        "comment": "ref.id() 평가 — static 메서드는 컴파일 시점 참조 타입 Parent 기준 → \"P\"",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "Parent.id()"
          },
          {
            "name": "ref.id()",
            "type": "String",
            "value": "\"P\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "definition",
            "label": "Child 정의"
          },
          {
            "line": 14,
            "role": "call",
            "label": "id 호출"
          },
          {
            "line": 20,
            "role": "read",
            "label": "ref 선언"
          }
        ]
      },
      {
        "line": 20,
        "comment": "5 + \"P\" = \"5P\" (정수 5가 문자열로 변환 후 연결)",
        "variables": [
          {
            "name": "ref.x(2)",
            "type": "int",
            "value": 5
          },
          {
            "name": "ref.id()",
            "type": "String",
            "value": "\"P\""
          },
          {
            "name": "결과",
            "type": "String",
            "value": "\"5P\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 10,
            "role": "definition",
            "label": "Child 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "\"5P\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 21,
        "comment": "System.out.println(\"5P\") 실행. 최종 출력값은 5P입니다.",
        "variables": [
          {
            "name": "결과",
            "type": "String",
            "value": "\"5P\""
          }
        ],
        "stdout": "5P",
        "relatedLines": [
          {
            "line": 20,
            "role": "read",
            "label": "ref 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "결과",
              "value": "\"5P\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      }
    ],
};
