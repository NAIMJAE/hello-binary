import type { Problem } from "@/types/problem";

const code = `class P {
    static int t = 0;
    int v = 2;

    P() {
        t += v;
        show();
    }

    void show() {
        t += 1;
    }
}

class C extends P {
    int v = 5;

    C() {
        t += v;
        show();
    }

    void show() {
        t += v;
    }
}

public class Main {
    public static void main(String[] args) {
        new C();
        System.out.print(P.t);
    }
}`;

export const ctorPolyFieldCustom01: Problem = {
  id: "ctor-poly-field-custom-01",
  slug: "ctor-poly-field-custom-01",
  title: "생성자 중 다형 show·필드 초기화 순서",
  topic: "상속",
  difficulty: "어려움",
  source: "커스텀-014",
  estimatedMinutes: 7,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "12",
  explanation: `여기서 많이 틀립니다: P() 생성자 안의 show()에서 C.v=5가 이미 적용됐다고 보면 오답 17이 나옵니다.

1. new C() — 힙에 객체 할당, 모든 필드 기본값 0
2. P의 인스턴스 필드 초기화: P.v = 2
3. P() 생성자: t += P.v(2) → t=2
4. P()에서 show() — 실제 객체가 C이므로 C.show() 동적 디스패치
   → C.v는 아직 초기화 전(기본값 0) → t += 0 → t=2
5. C의 인스턴스 필드 초기화: C.v = 5
6. C() 생성자: t += C.v(5) → t=7
7. C()에서 show() → C.show(): t += 5 → t=12
8. System.out.print(P.t) → 12`,
  traceSteps: [
    {
      line: 29,
      comment: "main 시작, P.t는 static 필드로 클래스 로딩 시 0으로 초기화되어 있습니다.",
      variables: [
        { name: "P.t", type: "static int", value: 0, highlight: true }
      ],
      relatedLines: [
        { line: 2, role: "read", label: "P.t 선언" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "0", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 30,
      comment: "new C() — 힙에 C 객체를 할당합니다. P.v와 C.v 모두 아직 기본값 0입니다. (int 필드의 기본값은 0)",
      variables: [
        { name: "P.t", type: "static int", value: 0 },
        { name: "P.v (인스턴스)", type: "int", value: 0, highlight: true },
        { name: "C.v (인스턴스)", type: "int", value: 0, highlight: true }
      ],
      relatedLines: [
        { line: 15, role: "definition", label: "C 클래스 정의" },
        { line: 1, role: "read", label: "P 클래스 정의" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "0", highlight: false },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "0", highlight: true },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "0", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 3,
      comment: "P의 인스턴스 필드 초기화 — P.v = 2가 됩니다. C.v는 아직 기본값 0 그대로입니다. (상위 클래스 필드가 먼저 초기화됩니다)",
      variables: [
        { name: "P.t", type: "static int", value: 0 },
        { name: "P.v (인스턴스)", type: "int", value: 2, highlight: true },
        { name: "C.v (인스턴스)", type: "int", value: 0 }
      ],
      relatedLines: [
        { line: 2, role: "read", label: "P.t (static)" },
        { line: 1, role: "definition", label: "P 클래스" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "0", highlight: false },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: true },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "0", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 5,
      comment: "P() 생성자에 진입합니다. C() 생성자가 암묵적으로 super()를 먼저 실행하기 때문입니다.",
      variables: [
        { name: "P.t", type: "static int", value: 0 },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 0 }
      ],
      relatedLines: [
        { line: 18, role: "call", label: "C() → 암묵적 super() → P()" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "0", highlight: false },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "0", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 6,
      comment: "P() 생성자: t += v — 여기서 v는 P 클래스의 v입니다 (필드 접근은 컴파일 타입 기준). P.v=2이므로 t = 0 + 2 = 2",
      variables: [
        { name: "P.t", type: "static int", value: 2, highlight: true },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 0 }
      ],
      relatedLines: [
        { line: 2, role: "read", label: "P.t 선언" },
        { line: 3, role: "read", label: "P.v = 2" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "2", highlight: true },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "0", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 7,
      comment: "P() 생성자: show() — 실제 객체가 C이므로 다형성에 의해 C 클래스의 show()가 실행됩니다. P 클래스의 show()가 아닙니다! (생성자에서 오버라이드 가능 메서드를 부르면 위험한 이유)",
      variables: [
        { name: "P.t", type: "static int", value: 2 },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 0 }
      ],
      relatedLines: [
        { line: 23, role: "definition", label: "C.show() — 동적 디스패치로 실행됨" },
        { line: 10, role: "read", label: "P.show() — 오버라이드됨, 실행 안 됨" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "2", highlight: false },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "0", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 24,
      comment: "C 클래스의 show(): t += v — 여기서 v는 C 클래스의 v입니다. 그런데 C.v는 아직 초기화되지 않아 기본값 0입니다! t += 0 → t = 2 (변화 없음)",
      variables: [
        { name: "P.t", type: "static int", value: 2 },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 0 }
      ],
      relatedLines: [
        { line: 2, role: "read", label: "P.t 선언" },
        { line: 16, role: "read", label: "C.v — 아직 기본값 0" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "2", highlight: false },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "0 ← 아직 초기화 전!", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 16,
      comment: "P() 생성자가 완료되고, 이제 C의 인스턴스 필드가 초기화됩니다. C.v = 5",
      variables: [
        { name: "P.t", type: "static int", value: 2 },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 5, highlight: true }
      ],
      relatedLines: [
        { line: 15, role: "definition", label: "C 클래스" },
        { line: 3, role: "read", label: "P.v 필드 (이미 초기화됨)" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "2", highlight: false },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "5", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 18,
      comment: "C() 생성자 본문에 진입합니다. super() (P 생성자)는 이미 완료되었습니다.",
      variables: [
        { name: "P.t", type: "static int", value: 2 },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 5 }
      ],
      relatedLines: [
        { line: 5, role: "read", label: "P() — 이미 실행 완료" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "2", highlight: false },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "5", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 19,
      comment: "C() 생성자: t += v — 여기서 v는 C 클래스의 v=5입니다. t = 2 + 5 = 7",
      variables: [
        { name: "P.t", type: "static int", value: 7, highlight: true },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 5 }
      ],
      relatedLines: [
        { line: 2, role: "read", label: "P.t 선언" },
        { line: 16, role: "read", label: "C.v = 5" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "7", highlight: true },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "5", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 20,
      comment: "C() 생성자: show() — 실제 객체가 C이므로 C 클래스의 show()가 실행됩니다.",
      variables: [
        { name: "P.t", type: "static int", value: 7 },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 5 }
      ],
      relatedLines: [
        { line: 23, role: "definition", label: "C.show() 정의" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "7", highlight: false },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "5", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 24,
      comment: "C 클래스의 show(): t += v — 이번에는 C.v=5가 초기화된 상태입니다. t = 7 + 5 = 12",
      variables: [
        { name: "P.t", type: "static int", value: 12, highlight: true },
        { name: "P.v (인스턴스)", type: "int", value: 2 },
        { name: "C.v (인스턴스)", type: "int", value: 5 }
      ],
      relatedLines: [
        { line: 2, role: "read", label: "P.t 선언" },
        { line: 16, role: "read", label: "C.v = 5" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "12", highlight: true },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "5", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 31,
      comment: "System.out.print(P.t) — P.t = 12를 출력합니다. 최종 변화: t: 0→2→2→7→12",
      variables: [
        { name: "P.t", type: "static int", value: 12 }
      ],
      stdout: "12",
      relatedLines: [
        { line: 2, role: "read", label: "P.t 선언 (static int)" },
        { line: 6, role: "read", label: "P(): t += P.v(2) → t=2" },
        { line: 24, role: "read", label: "C.show(): t += C.v" }
      ],
      memory: {
        cells: [
          { id: "data_t", region: "data", label: "P.t (static)", value: "12", highlight: true },
          { id: "heap_pv", region: "heap", label: "P.v (인스턴스)", value: "2", highlight: false },
          { id: "heap_cv", region: "heap", label: "C.v (인스턴스)", value: "5", highlight: false }
        ],
        arrows: []
      }
    }
  ],
};
