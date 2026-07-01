import type { Problem } from "@/types/problem";

const code = `public class Main {
    public static void main(String[] args) {
        new Child();
        System.out.println(Parent.total);
    }
}

class Parent {
    static int total = 0;
    int v = 1;

    public Parent() {
        total += (++v);
        show();
    }

    public void show() {
        total += total;
    }
}

class Child extends Parent {
    int v = 10;

    public Child() {
        v += 2;
        total += v++;
        show();
    }

    @Override
    public void show() {
        total += total * 2;
    }
}`;

export const inheritanceConstructorOverride2025_1: Problem = {
  id: "inheritance-constructor-override-2025-1",
  slug: "inheritance-constructor-override-2025-1",
  title: "상속·생성자·메서드 오버라이딩",
  topic: "상속",
  difficulty: "어려움",
  source: "2025년 1회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "54",
  explanation: `1. static int total = 0 (클래스 로드 시)

2. new Child() — 객체 생성 순서
   - Parent 인스턴스 필드 v = 1
   - Child 인스턴스 필드 v = 10 (Parent.v와 별도 필드)
   - Parent() 생성자 먼저 실행 (implicit super())

3. Parent() 생성자
   - total += (++v) → Parent.v: 1→2, total = 0+2 = 2
   - show() 호출 — 실제 객체가 Child이므로 Child.show() 실행 (다형성)
   - Child.show(): total += total*2 → 2 + 4 = 6

4. Child() 생성자
   - v += 2 → Child.v: 10→12
   - total += v++ → total = 6+12 = 18, 이후 v = 13
   - show() → Child.show(): total = 18 + 36 = 54

5. System.out.println(Parent.total) → 54`,
  traceSteps:   [
      {
        "line": 2,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": [
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 0
          }
        ]
      },
      {
        "line": 3,
        "comment": "new Child() — Child 객체 생성을 시작합니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 22,
            "role": "definition",
            "label": "Child 정의"
          },
          {
            "line": 25,
            "role": "call",
            "label": "Child 호출"
          }
        ]
      },
      {
        "line": 9,
        "comment": "static int total = 0 — 클래스 로드 시 total은 0입니다.",
        "variables": [
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 0,
            "highlight": true
          }
        ]
      },
      {
        "line": 10,
        "comment": "Parent 인스턴스 필드 v = 1 로 초기화됩니다.",
        "variables": [
          {
            "name": "Parent.v",
            "type": "int",
            "value": 1,
            "highlight": true
          }
        ]
      },
      {
        "line": 23,
        "comment": "Child 인스턴스 필드 v = 10 으로 초기화됩니다. (Parent.v와 별도)",
        "variables": [
          {
            "name": "Child.v",
            "type": "int",
            "value": 10,
            "highlight": true
          }
        ]
      },
      {
        "line": 25,
        "comment": "Child() 생성자 진입 — 먼저 Parent() 생성자(super)가 호출됩니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 3,
            "role": "call",
            "label": "Child 호출 위치"
          }
        ]
      },
      {
        "line": 12,
        "comment": "Parent() 생성자 진입",
        "variables": []
      },
      {
        "line": 13,
        "comment": "total += (++v) — Parent.v: 1→2, total: 0→2",
        "variables": [
          {
            "name": "Parent.v",
            "type": "int",
            "value": 2,
            "highlight": true
          },
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 2,
            "highlight": true
          }
        ]
      },
      {
        "line": 14,
        "comment": "show() 호출 — 실제 객체가 Child이므로 Child.show()가 실행됩니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 17,
            "role": "call",
            "label": "show 호출"
          },
          {
            "line": 28,
            "role": "call",
            "label": "show 호출"
          },
          {
            "line": 32,
            "role": "call",
            "label": "show 호출"
          }
        ]
      },
      {
        "line": 32,
        "comment": "Child.show() 진입 (@Override)",
        "variables": [],
        "relatedLines": [
          {
            "line": 14,
            "role": "call",
            "label": "show 호출"
          },
          {
            "line": 17,
            "role": "call",
            "label": "show 호출"
          },
          {
            "line": 28,
            "role": "call",
            "label": "show 호출"
          }
        ]
      },
      {
        "line": 33,
        "comment": "total += total * 2 — total: 2 + 4 = 6",
        "variables": [
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 6,
            "highlight": true
          }
        ]
      },
      {
        "line": 15,
        "comment": "Parent() 생성자 종료",
        "variables": [
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 6
          }
        ]
      },
      {
        "line": 26,
        "comment": "v += 2 — Child.v: 10→12",
        "variables": [
          {
            "name": "Child.v",
            "type": "int",
            "value": 12,
            "highlight": true
          }
        ]
      },
      {
        "line": 27,
        "comment": "total += v++ — total: 6+12=18, 이후 Child.v: 13",
        "variables": [
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 18,
            "highlight": true
          },
          {
            "name": "Child.v",
            "type": "int",
            "value": 13
          }
        ]
      },
      {
        "line": 28,
        "comment": "show() 호출 — Child.show() 실행",
        "variables": [],
        "relatedLines": [
          {
            "line": 14,
            "role": "call",
            "label": "show 호출"
          },
          {
            "line": 17,
            "role": "call",
            "label": "show 호출"
          },
          {
            "line": 32,
            "role": "call",
            "label": "show 호출"
          }
        ]
      },
      {
        "line": 33,
        "comment": "Child.show() — total += total * 2 → 18 + 36 = 54",
        "variables": [
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 54,
            "highlight": true
          }
        ]
      },
      {
        "line": 29,
        "comment": "Child() 생성자 종료 — 객체 생성 완료",
        "variables": [
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 54
          }
        ]
      },
      {
        "line": 4,
        "comment": "System.out.println(Parent.total) → 54 출력",
        "variables": [
          {
            "name": "Parent.total",
            "type": "static int",
            "value": 54
          }
        ],
        "stdout": "54",
        "relatedLines": [
          {
            "line": 9,
            "role": "read",
            "label": "total 선언"
          }
        ]
      }
    ],
};
