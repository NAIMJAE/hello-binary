import type { Problem } from "@/types/problem";

const code = `class A {
    String f(Object x) {
        return "1";
    }
    
    String g() {
        return f("a"); 
    }
}

class B extends A {
    String f(Object x) {
        return "2";
    }
    
    String f(String x) {
        return "3";
    }
}

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.g());
    }
}`;

export const methodOverloadPolymorphism2026_1: Problem = {
  id: "method-overload-polymorphism-2026-1",
  slug: "method-overload-polymorphism-2026-1",
  title: "오버로딩과 다형성",
  topic: "상속",
  difficulty: "어려움",
  source: "2026년 1회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "2",
  explanation: `1. A a = new B();
   - 참조 타입: A, 실제 객체: B

2. a.g() 호출
   - B는 g()를 오버라이드하지 않음 → A의 g()가 실행됨
   - this는 실제로 B 인스턴스를 가리킴

3. A.g() 안의 f("a") 호출
   - 컴파일 시점(A 클래스 기준): A에는 f(Object)만 보임
   - "a"는 Object로도 매칭되므로 f(Object)로 결정 (f(String)은 선택되지 않음)
   - 실행 시점: B가 f(Object)를 오버라이드했으므로 B.f(Object) 실행 → "2"

4. B.f(String)이 "3"을 반환하더라도, A.g()에서 호출된 메서드는 f(Object)로 이미 결정됨

5. System.out.println("2") → 출력: 2`,
  traceSteps:   [
      {
        "line": 22,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 23,
        "comment": "A a = new B() — 참조 변수 타입은 A, 실제 생성된 객체는 B입니다.",
        "variables": [
          {
            "name": "a (참조 타입)",
            "type": "String",
            "value": "A"
          },
          {
            "name": "a (실제 객체)",
            "type": "String",
            "value": "B",
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a________",
              "region": "stack",
              "label": "a (참조 타입)",
              "value": "A",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 24,
        "comment": "a.g() 호출. B에는 g()가 없으므로 A에서 상속받은 g()가 실행됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "a.g() → A.g()",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 23,
            "role": "read",
            "label": "a 선언"
          }
        ]
      },
      {
        "line": 23,
        "comment": "A.g() 진입 — this는 실제로 B 인스턴스를 가리킵니다.",
        "variables": [
          {
            "name": "this (실제 객체)",
            "type": "String",
            "value": "B",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "g() 정의"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_this________",
              "region": "stack",
              "label": "this (실제 객체)",
              "value": "B",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "f(\"a\") 호출. 컴파일 시점(A 클래스)에는 f(Object)만 보이므로 f(Object)로 결정됩니다.",
        "variables": [
          {
            "name": "인자",
            "type": "String",
            "value": "a"
          },
          {
            "name": "컴파일 시 선택",
            "type": "String",
            "value": "f(Object x)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "call",
            "label": "f 호출"
          },
          {
            "line": 6,
            "role": "definition",
            "label": "g() 정의"
          },
          {
            "line": 12,
            "role": "call",
            "label": "f 호출"
          },
          {
            "line": 16,
            "role": "call",
            "label": "f 호출"
          },
          {
            "line": 23,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack___",
              "region": "stack",
              "label": "인자",
              "value": "a",
              "highlight": false
            },
            {
              "id": "stack_________",
              "region": "stack",
              "label": "컴파일 시 선택",
              "value": "f(Object x)",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "B에는 f(Object)와 f(String)가 있지만 f(String)은 선택되지 않습니다.",
        "variables": [
          {
            "name": "f(Object) in B",
            "type": "String",
            "value": "\"2\""
          },
          {
            "name": "f(String) in B",
            "type": "String",
            "value": "\"3\" (호출 안 됨)"
          },
          {
            "name": "선택된 메서드",
            "type": "String",
            "value": "B.f(Object)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 7,
            "role": "call",
            "label": "f 호출"
          },
          {
            "line": 12,
            "role": "call",
            "label": "f 호출"
          },
          {
            "line": 16,
            "role": "call",
            "label": "f 호출"
          },
          {
            "line": 16,
            "role": "read",
            "label": "x 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_f_Object__in_B",
              "region": "stack",
              "label": "f(Object) in B",
              "value": "\"2\"",
              "highlight": false
            },
            {
              "id": "stack_f_String__in_B",
              "region": "stack",
              "label": "f(String) in B",
              "value": "\"3\" (호출 안 됨)",
              "highlight": false
            },
            {
              "id": "stack________",
              "region": "stack",
              "label": "선택된 메서드",
              "value": "B.f(Object)",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "B.f(Object x) 실행 — x=\"a\", return \"2\"",
        "variables": [
          {
            "name": "x",
            "type": "Object",
            "value": "a"
          },
          {
            "name": "반환값",
            "type": "String",
            "value": "\"2\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 7,
            "role": "call",
            "label": "f 호출"
          },
          {
            "line": 12,
            "role": "call",
            "label": "f 호출"
          },
          {
            "line": 16,
            "role": "call",
            "label": "f 호출 위치"
          },
          {
            "line": 16,
            "role": "read",
            "label": "x 선언"
          }
        ]
      },
      {
        "line": 3,
        "comment": "A.g()가 \"2\"를 반환합니다.",
        "variables": [
          {
            "name": "g() 반환",
            "type": "String",
            "value": "\"2\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 6,
            "role": "definition",
            "label": "g() 정의"
          },
          {
            "line": 23,
            "role": "read",
            "label": "a 선언"
          }
        ]
      },
      {
        "line": 24,
        "comment": "System.out.println(\"2\") 실행. 최종 출력값은 2입니다.",
        "variables": [
          {
            "name": "g() 반환",
            "type": "String",
            "value": "\"2\""
          }
        ],
        "stdout": "2",
        "relatedLines": [
          {
            "line": 23,
            "role": "read",
            "label": "a 선언"
          }
        ]
      }
    ],
};
