import type { Problem } from "@/types/problem";

const code = `class Main {

  public static class Collection<T>{
    T value;

    public Collection(T t){
        value = t;
    }

    public void print(){
       new Printer().print(value);
    }

   class Printer{
      void print(Integer a){
        System.out.print("A" + a);
      }
      void print(Object a){
        System.out.print("B" + a);
      }
      void print(Number a){
        System.out.print("C" + a);
      }
   }
 }

  public static void main(String[] args) {
      new Collection<>(0).print();
  }

}`;

export const genericOverloadPrint2024_3: Problem = {
  id: "generic-overload-print-2024-3",
  slug: "generic-overload-print-2024-3",
  title: "제네릭과 print 오버로딩",
  topic: "상속",
  difficulty: "어려움",
  source: "2024년 3회차",
  estimatedMinutes: 7,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "B0",
  explanation: `1. new Collection<>(0) — 0이 Integer로 추론되어 Collection<Integer>가 생성됩니다.
   - value = 0 (Integer)

2. print() 호출 → Collection.print() 실행

3. new Printer().print(value)에서 value의 **컴파일 타임 타입은 T**(제네릭 타입 변수)입니다.
   - T의 상한은 Object이므로, 오버로딩 후보는 print(Object)가 가장 적합합니다.
   - print(Integer), print(Number)는 T가 Integer/Number임이 보장되지 않아 선택되지 않습니다.

4. print(Object a) 실행 → "B" + 0 = B0

최종 출력: B0`,
  traceSteps: [
    {
      line: 27,
      comment: "main() 메서드가 시작됩니다.",
      variables: [],
    },
    {
      line: 28,
      comment: "new Collection<>(0) — 다이아몬드 연산자로 T가 Integer로 추론됩니다.",
      variables: [
        { name: "T", type: "타입", value: "Integer", highlight: true },
        { name: "인자", type: "int", value: 0, highlight: true },
      ],
      relatedLines: [{ line: 6, role: "definition", label: "Collection 생성자" }],
    },
    {
      line: 6,
      comment: "Collection(T t) 생성자에 진입합니다.",
      variables: [],
      relatedLines: [{ line: 28, role: "call", label: "Collection 생성 호출" }],
    },
    {
      line: 7,
      comment: "value = t — value에 0이 저장됩니다.",
      variables: [
        { name: "value", type: "T", value: 0, highlight: true },
      ],
      relatedLines: [{ line: 28, role: "call", label: "Collection 생성 호출" }],
      memory: {
        cells: [
          { id: "heap_value", region: "heap", label: "value", value: "0 (Integer)", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 28,
      comment: ".print()가 호출됩니다.",
      variables: [{ name: "value", type: "T", value: 0 }],
      relatedLines: [{ line: 10, role: "definition", label: "print() 정의" }],
    },
    {
      line: 10,
      comment: "Collection.print()에 진입합니다.",
      variables: [{ name: "value", type: "T", value: 0, highlight: true }],
      relatedLines: [{ line: 28, role: "call", label: "print() 호출" }],
    },
    {
      line: 11,
      comment: "new Printer().print(value) — 인자 value의 컴파일 타임 타입은 T입니다.",
      variables: [
        { name: "value (컴파일 타입)", type: "T", value: "T → 상한 Object", highlight: true },
      ],
      relatedLines: [
        { line: 15, role: "definition", label: "print(Integer)" },
        { line: 18, role: "definition", label: "print(Object)" },
        { line: 21, role: "definition", label: "print(Number)" },
      ],
    },
    {
      line: 18,
      comment: "오버로딩 결과 print(Object a)가 선택됩니다. T는 Object로만 취급되기 때문입니다.",
      variables: [
        { name: "선택된 메서드", type: "String", value: "print(Object)", highlight: true },
      ],
      relatedLines: [
        { line: 15, role: "definition", label: "print(Integer) — 미선택" },
        { line: 21, role: "definition", label: "print(Number) — 미선택" },
      ],
    },
    {
      line: 19,
      comment: 'System.out.print("B" + a) 실행 — a=0이므로 최종 출력값은 B0입니다.',
      variables: [{ name: "a", type: "Object", value: 0, highlight: true }],
      stdout: "B0",
      relatedLines: [{ line: 4, role: "read", label: "value 필드" }],
      memory: {
        cells: [
          { id: "stack_result", region: "stack", label: "출력", value: '"B0"', highlight: true },
        ],
        arrows: [],
      },
    },
  ],
};
