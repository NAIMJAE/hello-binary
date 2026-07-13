import type { Problem } from "@/types/problem";

const code = `class A {
    int f(int x) { return x + 1; }
    static String tag() { return "A"; }
}

class B extends A {
    int f(int x) { return x + 4; }
    int f(String s) { return s.length(); }
    static String tag() { return "B"; }
}

public class Main {
    public static void main(String[] args) {
        A r = new B();
        System.out.print(r.f(2) + r.tag() + ((B) r).f("xy"));
    }
}`;

export const overrideStaticCastCustom01: Problem = {
  id: "override-static-cast-custom-01",
  slug: "override-static-cast-custom-01",
  title: "오버라이드·static·캐스트 오버로드",
  topic: "상속",
  difficulty: "어려움",
  source: "커스텀-013",
  estimatedMinutes: 6,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "6A2",
  explanation: `여기서 많이 틀립니다: r.tag()를 "B"로 보거나, r.f(2)를 A 기준 x+1=3으로 계산합니다.

1. A r = new B() — 참조 타입 A, 실제 객체 B
2. r.f(2) — 인스턴스 메서드는 런타임 타입 B의 B.f(int) 오버라이드 실행 → 2+4 = 6
3. r.tag() — static 메서드는 컴파일 타입 A 기준 정적 바인딩 → A.tag() = "A"
4. ((B) r).f("xy") — B로 캐스트 후 B.f(String) 오버로드 → "xy".length() = 2
5. 6 + "A" + 2 — 정수→문자열 변환 후 결합 = "6A2"`,
  traceSteps: [
    {
      line: 13,
      comment: "main 시작, 아직 변수가 없습니다.",
      variables: [],
      memory: {
        cells: [],
        arrows: []
      }
    },
    {
      line: 14,
      comment: "new B() — B 객체를 힙에 생성합니다. B는 A를 상속하므로 f(int) 오버라이드와 f(String) 오버로드, static tag()를 가집니다.",
      variables: [],
      relatedLines: [
        { line: 6, role: "definition", label: "B 클래스 정의" },
        { line: 1, role: "read", label: "A 클래스 정의" }
      ],
      memory: {
        cells: [
          { id: "heap_b", region: "heap", label: "B 객체", value: "f(int)→오버라이드, f(String)→오버로드", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 14,
      comment: "A r = new B() — 참조 타입은 A, 실제 객체는 B입니다. r은 스택에서 힙의 B 객체를 가리킵니다.",
      variables: [
        { name: "r", type: "A (→B)", value: "B 객체", highlight: true }
      ],
      relatedLines: [
        { line: 1, role: "read", label: "A 클래스 정의" },
        { line: 6, role: "read", label: "B 클래스 정의" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r (타입 A)", value: "→ B객체", highlight: true },
          { id: "heap_b", region: "heap", label: "B 객체", value: "f(int)→오버라이드, f(String)→오버로드", highlight: false }
        ],
        arrows: [
          { from: "stack_r", to: "heap_b", label: "참조", highlight: true }
        ]
      }
    },
    {
      line: 7,
      comment: "r.f(2) — f(int)는 인스턴스 메서드이므로 런타임 타입 B 기준으로 동적 디스패치됩니다. A.f(int)가 아닌 B.f(int) 오버라이드가 실행됩니다. → 2 + 4 = 6",
      variables: [
        { name: "r", type: "A (→B)", value: "B 객체" },
        { name: "r.f(2)", type: "int", value: 6, highlight: true }
      ],
      relatedLines: [
        { line: 2, role: "read", label: "A.f(int) — 오버라이드됨, 실행 안 됨" },
        { line: 15, role: "call", label: "r.f(2) 실행 위치" },
        { line: 14, role: "read", label: "r 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r (타입 A)", value: "→ B객체", highlight: false },
          { id: "stack_x", region: "stack", label: "x (B.f 매개변수)", value: "2", highlight: true },
          { id: "stack_rf2", region: "stack", label: "r.f(2) 결과", value: "6", highlight: true },
          { id: "heap_b", region: "heap", label: "B 객체", value: "f(int): 2+4=6", highlight: false }
        ],
        arrows: [
          { from: "stack_r", to: "heap_b", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 3,
      comment: "r.tag() — tag()는 static 메서드입니다. static 메서드는 오버라이드가 아닌 정적 바인딩이므로 컴파일 타입 A 기준으로 A.tag()가 실행됩니다. → \"A\" (B.tag()=\"B\"가 아닙니다!)",
      variables: [
        { name: "r", type: "A (→B)", value: "B 객체" },
        { name: "r.f(2)", type: "int", value: 6 },
        { name: "r.tag()", type: "String", value: "\"A\"", highlight: true }
      ],
      relatedLines: [
        { line: 9, role: "read", label: "B.tag() — 실행되지 않음" },
        { line: 14, role: "read", label: "r 선언 (컴파일 타입 A)" },
        { line: 15, role: "call", label: "r.tag() 실행 위치" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r (타입 A)", value: "→ B객체", highlight: false },
          { id: "stack_rf2", region: "stack", label: "r.f(2) 결과", value: "6", highlight: false },
          { id: "stack_rtag", region: "stack", label: "r.tag() 결과", value: "\"A\"", highlight: true },
          { id: "heap_b", region: "heap", label: "B 객체", value: "static은 객체가 아닌 클래스에 속함", highlight: false }
        ],
        arrows: [
          { from: "stack_r", to: "heap_b", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 8,
      comment: "((B) r).f(\"xy\") — r을 B로 명시적 캐스트합니다. 이제 컴파일 타입이 B이므로 B.f(String) 오버로드가 보입니다. \"xy\".length() = 2",
      variables: [
        { name: "r", type: "A (→B)", value: "B 객체" },
        { name: "r.f(2)", type: "int", value: 6 },
        { name: "r.tag()", type: "String", value: "\"A\"" },
        { name: "((B)r).f(\"xy\")", type: "int", value: 2, highlight: true }
      ],
      relatedLines: [
        { line: 14, role: "read", label: "r 선언" },
        { line: 15, role: "call", label: "((B)r).f(\"xy\") 실행 위치" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r (타입 A)", value: "→ B객체", highlight: false },
          { id: "stack_rf2", region: "stack", label: "r.f(2) 결과", value: "6", highlight: false },
          { id: "stack_rtag", region: "stack", label: "r.tag() 결과", value: "\"A\"", highlight: false },
          { id: "stack_s", region: "stack", label: "s (B.f 매개변수)", value: "\"xy\"", highlight: true },
          { id: "stack_bfxy", region: "stack", label: "((B)r).f(\"xy\") 결과", value: "2", highlight: true },
          { id: "heap_b", region: "heap", label: "B 객체", value: "f(String): \"xy\".length()=2", highlight: false }
        ],
        arrows: [
          { from: "stack_r", to: "heap_b", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 15,
      comment: "6 + \"A\" + 2 — 왼쪽부터 평가합니다. 정수 6이 문자열 \"A\"와 + 연산 → \"6A\", 다시 정수 2와 + → \"6A2\"로 결합됩니다.",
      variables: [
        { name: "r", type: "A (→B)", value: "B 객체" },
        { name: "r.f(2)", type: "int", value: 6 },
        { name: "r.tag()", type: "String", value: "\"A\"" },
        { name: "((B)r).f(\"xy\")", type: "int", value: 2 },
        { name: "결과", type: "String", value: "\"6A2\"", highlight: true }
      ],
      relatedLines: [
        { line: 14, role: "read", label: "r 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r (타입 A)", value: "→ B객체", highlight: false },
          { id: "stack_result", region: "stack", label: "결과", value: "\"6A2\"", highlight: true },
          { id: "heap_b", region: "heap", label: "B 객체", value: "f(int)→6, tag()→A, f(String)→2", highlight: false }
        ],
        arrows: [
          { from: "stack_r", to: "heap_b", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 15,
      comment: "System.out.print(\"6A2\") — 최종 출력은 \"6A2\"입니다.",
      variables: [
        { name: "r", type: "A (→B)", value: "B 객체" },
        { name: "결과", type: "String", value: "\"6A2\"" }
      ],
      stdout: "6A2",
      relatedLines: [
        { line: 14, role: "read", label: "r 선언" },
        { line: 7, role: "read", label: "B.f(int) → 6" },
        { line: 3, role: "read", label: "A.tag() → \"A\"" },
        { line: 8, role: "read", label: "B.f(String) → 2" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r (타입 A)", value: "→ B객체", highlight: false },
          { id: "stack_result", region: "stack", label: "출력", value: "\"6A2\"", highlight: true },
          { id: "heap_b", region: "heap", label: "B 객체", value: "f(int)→6, tag()→A, f(String)→2", highlight: false }
        ],
        arrows: [
          { from: "stack_r", to: "heap_b", label: "참조", highlight: false }
        ]
      }
    }
  ],
};
