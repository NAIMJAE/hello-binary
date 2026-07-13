import type { Problem } from "@/types/problem";

const code = `abstract class Op {
    abstract int calc(int x);

    int run(int x) {
        return calc(x) + base();
    }

    int base() {
        return 3;
    }
}

class Mul extends Op {
    int calc(int x) {
        return x * 2;
    }

    int base() {
        return 1;
    }
}

public class Main {
    public static void main(String[] args) {
        Op a = new Mul();
        System.out.print(a.run(4) + new Mul().base());
    }
}`;

export const abstractTemplateCustom01: Problem = {
  id: "abstract-template-custom-01",
  slug: "abstract-template-custom-01",
  title: "추상 템플릿 메서드 + base 오버라이드",
  topic: "추상클래스",
  difficulty: "보통",
  source: "커스텀-015",
  estimatedMinutes: 5,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "10",
  explanation: `여기서 많이 틀립니다: run() 안의 base()를 Op 클래스의 3으로 계산하거나, calc(4)를 추상 메서드라 실행 불가로 봅니다.

1. Op a = new Mul() — 참조 타입 Op, 실제 객체 Mul
2. a.run(4) — Op 클래스에 정의된 템플릿 메서드 run() 진입
   - calc(4) → 추상 메서드, Mul 클래스의 Mul.calc(4) 동적 디스패치 → 4*2 = 8
   - base() → Mul이 오버라이드한 Mul.base() 동적 디스패치 → 1 (Op.base()=3이 아님!)
   - run(4) = 8 + 1 = 9
3. new Mul().base() → Mul.base() = 1
4. 9 + 1 = 10`,
  traceSteps: [
    {
      line: 24,
      comment: "main 시작, 아직 변수가 없습니다.",
      variables: [],
      memory: {
        cells: [],
        arrows: []
      }
    },
    {
      line: 25,
      comment: "new Mul() — Mul 객체를 힙에 생성합니다. Mul은 Op를 상속하며 calc()과 base()를 오버라이드합니다.",
      variables: [],
      relatedLines: [
        { line: 13, role: "definition", label: "Mul 클래스 정의" },
        { line: 1, role: "read", label: "Op 추상 클래스 정의" }
      ],
      memory: {
        cells: [
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "calc()→x*2, base()→1", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 25,
      comment: "Op a = new Mul() — a에 대입합니다. 참조 타입은 Op, 실제 객체는 Mul입니다.",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체", highlight: true }
      ],
      relatedLines: [
        { line: 1, role: "read", label: "Op 추상 클래스" },
        { line: 13, role: "read", label: "Mul 클래스" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: true },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "calc()→x*2, base()→1", highlight: false }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: true }
        ]
      }
    },
    {
      line: 4,
      comment: "a.run(4) — Op 클래스에 정의된 템플릿 메서드 run()에 진입합니다. 매개변수 x=4. run() 안에서 calc(x)와 base()를 순서대로 실행합니다.",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체" },
        { name: "x (run 매개변수)", type: "int", value: 4, highlight: true }
      ],
      relatedLines: [
        { line: 25, role: "call", label: "a.run(4) 실행 위치" },
        { line: 1, role: "definition", label: "Op 추상 클래스" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: false },
          { id: "stack_x_run", region: "stack", label: "x (run 매개변수)", value: "4", highlight: true },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "calc()→x*2, base()→1", highlight: false }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 15,
      comment: "calc(x) — 추상 메서드이므로 런타임 타입 Mul의 Mul.calc(4)가 동적 디스패치됩니다. return 4 * 2 = 8",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체" },
        { name: "x (run 매개변수)", type: "int", value: 4 },
        { name: "calc(4) 결과", type: "int", value: 8, highlight: true }
      ],
      relatedLines: [
        { line: 14, role: "definition", label: "Mul.calc(int) 정의" },
        { line: 2, role: "read", label: "Op.calc — 추상 메서드 선언" },
        { line: 5, role: "call", label: "run()에서 calc(x) 실행" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: false },
          { id: "stack_x_run", region: "stack", label: "x (run 매개변수)", value: "4", highlight: false },
          { id: "stack_calc", region: "stack", label: "calc(4) 결과", value: "8", highlight: true },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "calc(4)→8", highlight: false }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 19,
      comment: "base() — Mul이 오버라이드한 Mul.base()가 동적 디스패치됩니다. return 1 (Op.base()=3이 아닙니다!)",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체" },
        { name: "x (run 매개변수)", type: "int", value: 4 },
        { name: "calc(4) 결과", type: "int", value: 8 },
        { name: "base() 결과", type: "int", value: 1, highlight: true }
      ],
      relatedLines: [
        { line: 18, role: "definition", label: "Mul.base() 오버라이드 — 실행됨" },
        { line: 8, role: "read", label: "Op.base()=3 — 오버라이드됨, 실행 안 됨" },
        { line: 5, role: "call", label: "run()에서 base() 실행" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: false },
          { id: "stack_x_run", region: "stack", label: "x (run 매개변수)", value: "4", highlight: false },
          { id: "stack_calc", region: "stack", label: "calc(4) 결과", value: "8", highlight: false },
          { id: "stack_base", region: "stack", label: "base() 결과", value: "1", highlight: true },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "calc(4)→8, base()→1", highlight: false }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 5,
      comment: "run(4) 반환 — return calc(4) + base() = 8 + 1 = 9. 템플릿 메서드 안의 calc()과 base() 모두 Mul 클래스 기준으로 실행되었습니다.",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체" },
        { name: "a.run(4) 결과", type: "int", value: 9, highlight: true }
      ],
      relatedLines: [
        { line: 4, role: "definition", label: "Op.run(int) 정의" },
        { line: 14, role: "read", label: "Mul.calc → 8" },
        { line: 18, role: "read", label: "Mul.base → 1" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: false },
          { id: "stack_run_result", region: "stack", label: "a.run(4) 결과", value: "9", highlight: true },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "calc(4)→8, base()→1", highlight: false }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 26,
      comment: "new Mul() — 두 번째 Mul 객체를 힙에 생성합니다.",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체" },
        { name: "a.run(4) 결과", type: "int", value: 9 }
      ],
      relatedLines: [
        { line: 13, role: "definition", label: "Mul 클래스 정의" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: false },
          { id: "stack_run_result", region: "stack", label: "a.run(4) 결과", value: "9", highlight: false },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "calc(4)→8, base()→1", highlight: false },
          { id: "heap_mul2", region: "heap", label: "Mul 객체 #2", value: "새로 생성", highlight: true }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 19,
      comment: "new Mul().base() — 두 번째 Mul 객체의 Mul.base() 실행 → return 1. (역시 Op.base()=3이 아닌 Mul.base()=1)",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체" },
        { name: "a.run(4) 결과", type: "int", value: 9 },
        { name: "new Mul().base()", type: "int", value: 1, highlight: true }
      ],
      relatedLines: [
        { line: 18, role: "definition", label: "Mul.base() 오버라이드" },
        { line: 8, role: "read", label: "Op.base()=3 — 오버라이드됨" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: false },
          { id: "stack_run_result", region: "stack", label: "a.run(4) 결과", value: "9", highlight: false },
          { id: "stack_base2", region: "stack", label: "new Mul().base() 결과", value: "1", highlight: true },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "a가 참조", highlight: false },
          { id: "heap_mul2", region: "heap", label: "Mul 객체 #2", value: "base()→1", highlight: false }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 26,
      comment: "a.run(4) + new Mul().base() = 9 + 1 = 10 — 최종 합산입니다.",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체" },
        { name: "a.run(4) 결과", type: "int", value: 9 },
        { name: "new Mul().base()", type: "int", value: 1 },
        { name: "결과", type: "int", value: 10, highlight: true }
      ],
      relatedLines: [
        { line: 25, role: "read", label: "a 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: false },
          { id: "stack_result", region: "stack", label: "결과", value: "10", highlight: true },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "run(4)→9", highlight: false },
          { id: "heap_mul2", region: "heap", label: "Mul 객체 #2", value: "base()→1", highlight: false }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: false }
        ]
      }
    },
    {
      line: 26,
      comment: "System.out.print(10) — 최종 출력은 10입니다.",
      variables: [
        { name: "a", type: "Op (→Mul)", value: "Mul 객체" },
        { name: "결과", type: "int", value: 10 }
      ],
      stdout: "10",
      relatedLines: [
        { line: 25, role: "read", label: "a 선언" },
        { line: 5, role: "read", label: "run(): calc(x)+base()" },
        { line: 15, role: "read", label: "Mul.calc(4) → 8" },
        { line: 19, role: "read", label: "Mul.base() → 1" }
      ],
      memory: {
        cells: [
          { id: "stack_a", region: "stack", label: "a (타입 Op)", value: "→ Mul#1", highlight: false },
          { id: "stack_result", region: "stack", label: "출력", value: "10", highlight: true },
          { id: "heap_mul1", region: "heap", label: "Mul 객체 #1", value: "run(4)→9", highlight: false },
          { id: "heap_mul2", region: "heap", label: "Mul 객체 #2", value: "base()→1", highlight: false }
        ],
        arrows: [
          { from: "stack_a", to: "heap_mul1", label: "참조", highlight: false }
        ]
      }
    }
  ],
};
