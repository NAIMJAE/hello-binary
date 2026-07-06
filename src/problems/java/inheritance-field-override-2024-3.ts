import type { Problem } from "@/types/problem";

const code = `public class Main{
  public static void main(String[] args){
    Base a =  new Derivate();
    Derivate b = new Derivate();

    System.out.print(a.getX() + a.x + b.getX() + b.x);
  }
}


class Base{
  int x = 3;

  int getX(){
     return x * 2;
  }
}

class Derivate extends Base{
  int x = 7;

  int getX(){
     return x * 3;
  }
}`;

export const inheritanceFieldOverride2024_3: Problem = {
  id: "inheritance-field-override-2024-3",
  slug: "inheritance-field-override-2024-3",
  title: "상속과 필드·메서드 오버라이딩",
  topic: "상속",
  difficulty: "어려움",
  source: "2024년 3회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "52",
  explanation: `1. Base a = new Derivate()
   - 참조 타입: Base, 실제 객체: Derivate
   - Base의 x=3이 먼저 초기화된 뒤 Derivate의 x=7이 초기화됩니다.

2. Derivate b = new Derivate() — 동일하게 x=7인 Derivate 객체

3. a.getX() — **메서드는 다형성** 적용 → Derivate.getX() 실행
   - Derivate의 x=7 → 7 × 3 = 21

4. a.x — **필드는 다형성 없음** → 참조 타입(Base) 기준
   - Base의 x = 3 (Derivate의 x=7이 아님!)

5. b.getX() → 7 × 3 = 21
6. b.x → 참조 타입 Derivate → x = 7

7. 21 + 3 + 21 + 7 = 52`,
  traceSteps: [
    {
      line: 2,
      comment: "main() 메서드가 시작됩니다.",
      variables: [],
    },
    {
      line: 3,
      comment: "Base a = new Derivate() — 참조 타입 Base, 실제 객체 Derivate가 생성됩니다.",
      variables: [
        { name: "a (참조 타입)", type: "String", value: "Base" },
        { name: "a (실제 객체)", type: "String", value: "Derivate", highlight: true },
      ],
      relatedLines: [{ line: 19, role: "definition", label: "Derivate 정의" }],
      memory: {
        cells: [
          {
            id: "heap_a",
            region: "heap",
            label: "a → Derivate",
            value: "Base.x=3, Derivate.x=7",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment: "Derivate b = new Derivate() — Derivate 객체가 하나 더 생성됩니다.",
      variables: [
        { name: "a (실제 객체)", type: "String", value: "Derivate" },
        { name: "b", type: "Derivate", value: "x=7", highlight: true },
      ],
      relatedLines: [{ line: 19, role: "definition", label: "Derivate 정의" }],
      memory: {
        cells: [
          {
            id: "heap_b",
            region: "heap",
            label: "b → Derivate",
            value: "Base.x=3, Derivate.x=7",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment: "a.getX() — 인스턴스 메서드는 런타임 타입(Derivate)의 getX()가 호출됩니다.",
      variables: [
        { name: "a.getX()", type: "int", value: "Derivate.getX() → 7×3", highlight: true },
      ],
      relatedLines: [
        { line: 22, role: "definition", label: "Derivate.getX()" },
        { line: 3, role: "read", label: "a 선언" },
      ],
    },
    {
      line: 23,
      comment: "Derivate.getX() — x=7이므로 7 × 3 = 21을 반환합니다.",
      variables: [{ name: "a.getX()", type: "int", value: 21, highlight: true }],
      relatedLines: [{ line: 6, role: "call", label: "a.getX() 호출" }],
      memory: {
        cells: [
          { id: "stack_getX_a", region: "stack", label: "a.getX()", value: "21", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment: "a.x — 필드는 참조 타입(Base) 기준으로 접근하므로 Base.x = 3입니다.",
      variables: [
        { name: "a.getX()", type: "int", value: 21 },
        { name: "a.x", type: "int", value: 3, highlight: true },
      ],
      relatedLines: [{ line: 12, role: "read", label: "Base.x 선언" }],
      memory: {
        cells: [
          { id: "stack_ax", region: "stack", label: "a.x", value: "3 (Base 필드)", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment: "b.getX() — Derivate.getX() → 7 × 3 = 21",
      variables: [
        { name: "a.getX()", type: "int", value: 21 },
        { name: "a.x", type: "int", value: 3 },
        { name: "b.getX()", type: "int", value: 21, highlight: true },
      ],
      relatedLines: [
        { line: 22, role: "definition", label: "Derivate.getX()" },
        { line: 4, role: "read", label: "b 선언" },
      ],
    },
    {
      line: 6,
      comment: "b.x — 참조 타입 Derivate이므로 Derivate.x = 7입니다.",
      variables: [
        { name: "b.getX()", type: "int", value: 21 },
        { name: "b.x", type: "int", value: 7, highlight: true },
      ],
      relatedLines: [{ line: 20, role: "read", label: "Derivate.x 선언" }],
      memory: {
        cells: [
          { id: "stack_bx", region: "stack", label: "b.x", value: "7 (Derivate 필드)", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment: "21 + 3 + 21 + 7 = 52. System.out.print(52) 실행 — 최종 출력값은 52입니다.",
      variables: [{ name: "결과", type: "int", value: 52, highlight: true }],
      stdout: "52",
      relatedLines: [
        { line: 3, role: "read", label: "a 선언" },
        { line: 4, role: "read", label: "b 선언" },
      ],
      memory: {
        cells: [
          { id: "stack_result", region: "stack", label: "결과", value: "52", highlight: true },
        ],
        arrows: [],
      },
    },
  ],
};
