import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

int func(){
 static int x =0;
  x+=2;
  return x;
}

int main(){
  int x = 1;
  int sum=0;
  for(int i=0;i<4;i++) {
    x++;
    sum+=func();
  }
  printf("%d", sum);

  return 0;
}`;

export const staticVarFuncLoop2024_3: Problem = {
  id: "static-var-func-loop-2024-3",
  slug: "static-var-func-loop-2024-3",
  title: "static 변수와 함수 호출 누적",
  topic: "함수",
  difficulty: "보통",
  source: "2024년 3회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "20",
  explanation: `1. main의 지역 변수 x=1, sum=0 — func 안의 static x와는 별개입니다.

2. for(i=0~3) 4회 반복:
   | i | main x (x++ 후) | func static x | func 반환 | sum |
   |---|-----------------|---------------|-----------|-----|
   | 0 | 2 | 0→2 (최초 초기화) | 2 | 2 |
   | 1 | 3 | 2→4 | 4 | 6 |
   | 2 | 4 | 4→6 | 6 | 12 |
   | 3 | 5 | 6→8 | 8 | 20 |

3. static int x는 프로그램 전체에서 **한 번만** 0으로 초기화되고, 이후 호출마다 값이 유지됩니다.
4. func()는 호출될 때마다 x+=2 후 현재 x를 반환합니다.

5. printf("%d", sum) → 20`,
  traceSteps: [
    {
      line: 9,
      comment: "main() 함수가 시작됩니다.",
      variables: [],
    },
    {
      line: 10,
      comment: "int x = 1 — main의 지역 변수 x가 1로 초기화됩니다.",
      variables: [{ name: "x", type: "int", value: 1, highlight: true }],
      memory: {
        cells: [
          { id: "stack_x", region: "stack", label: "x (main)", value: "1", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 11,
      comment: "int sum = 0",
      variables: [
        { name: "x", type: "int", value: 1 },
        { name: "sum", type: "int", value: 0, highlight: true },
      ],
      memory: {
        cells: [
          { id: "stack_x", region: "stack", label: "x (main)", value: "1", highlight: false },
          { id: "stack_sum", region: "stack", label: "sum", value: "0", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 12,
      comment: "for(i=0; i<4; i++) — 첫 번째 반복 i=0",
      variables: [
        { name: "x", type: "int", value: 1 },
        { name: "sum", type: "int", value: 0 },
        { name: "i", type: "int", value: 0, highlight: true },
      ],
      memory: {
        cells: [{ id: "stack_i", region: "stack", label: "i", value: "0", highlight: true }],
        arrows: [],
      },
    },
    {
      line: 13,
      comment: "x++ — main의 x가 2가 됩니다.",
      variables: [
        { name: "x", type: "int", value: 2, highlight: true },
        { name: "sum", type: "int", value: 0 },
        { name: "i", type: "int", value: 0 },
      ],
      memory: {
        cells: [
          { id: "stack_x", region: "stack", label: "x (main)", value: "2", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 14,
      comment: "func()가 호출됩니다.",
      variables: [{ name: "sum", type: "int", value: 0 }],
      relatedLines: [{ line: 3, role: "definition", label: "func 정의" }],
    },
    {
      line: 4,
      comment: "func에 진입 — static int x = 0이 **최초 1회만** 초기화됩니다.",
      variables: [{ name: "x (static)", type: "int", value: 0, highlight: true }],
      relatedLines: [{ line: 14, role: "call", label: "func 호출" }],
      memory: {
        cells: [
          { id: "data_static_x", region: "data", label: "x (static)", value: "0", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 5,
      comment: "x += 2 — static x가 2가 됩니다.",
      variables: [{ name: "x (static)", type: "int", value: 2, highlight: true }],
      memory: {
        cells: [
          { id: "data_static_x", region: "data", label: "x (static)", value: "2", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment: "return x — 2를 반환합니다.",
      variables: [{ name: "반환값", type: "int", value: 2, highlight: true }],
      relatedLines: [{ line: 14, role: "call", label: "func 호출 위치" }],
    },
    {
      line: 14,
      comment: "sum += func() — sum = 0 + 2 = 2",
      variables: [
        { name: "x", type: "int", value: 2 },
        { name: "sum", type: "int", value: 2, highlight: true },
        { name: "i", type: "int", value: 0 },
      ],
      memory: {
        cells: [
          { id: "stack_sum", region: "stack", label: "sum", value: "2", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 12,
      comment: "다음 반복 i=1",
      variables: [
        { name: "x", type: "int", value: 2 },
        { name: "sum", type: "int", value: 2 },
        { name: "i", type: "int", value: 1, highlight: true },
      ],
    },
    {
      line: 13,
      comment: "x++ — main의 x가 3이 됩니다.",
      variables: [
        { name: "x", type: "int", value: 3, highlight: true },
        { name: "sum", type: "int", value: 2 },
        { name: "i", type: "int", value: 1 },
      ],
    },
    {
      line: 4,
      comment: "func 재진입 — static x는 초기화되지 않고 이전 값 2를 유지합니다.",
      variables: [{ name: "x (static)", type: "int", value: 2, highlight: true }],
      relatedLines: [{ line: 14, role: "call", label: "func 호출" }],
      memory: {
        cells: [
          { id: "data_static_x", region: "data", label: "x (static)", value: "2", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 5,
      comment: "x += 2 — static x가 4가 됩니다.",
      variables: [{ name: "x (static)", type: "int", value: 4, highlight: true }],
      memory: {
        cells: [
          { id: "data_static_x", region: "data", label: "x (static)", value: "4", highlight: true },
        ],
        arrows: [],
      },
    },
    {
      line: 14,
      comment: "sum += 4 — sum = 2 + 4 = 6",
      variables: [
        { name: "x", type: "int", value: 3 },
        { name: "sum", type: "int", value: 6, highlight: true },
        { name: "i", type: "int", value: 1 },
      ],
    },
    {
      line: 12,
      comment: "다음 반복 i=2",
      variables: [
        { name: "i", type: "int", value: 2, highlight: true },
        { name: "sum", type: "int", value: 6 },
      ],
    },
    {
      line: 13,
      comment: "x++ — main의 x가 4가 됩니다.",
      variables: [{ name: "x", type: "int", value: 4, highlight: true }],
    },
    {
      line: 5,
      comment: "func 호출 — static x: 4 → 6, 반환값 6",
      variables: [
        { name: "x (static)", type: "int", value: 6, highlight: true },
        { name: "반환값", type: "int", value: 6, highlight: true },
      ],
      relatedLines: [{ line: 3, role: "definition", label: "func 정의" }],
    },
    {
      line: 14,
      comment: "sum += 6 — sum = 12",
      variables: [{ name: "sum", type: "int", value: 12, highlight: true }],
    },
    {
      line: 12,
      comment: "다음 반복 i=3",
      variables: [
        { name: "i", type: "int", value: 3, highlight: true },
        { name: "sum", type: "int", value: 12 },
      ],
    },
    {
      line: 13,
      comment: "x++ — main의 x가 5가 됩니다.",
      variables: [{ name: "x", type: "int", value: 5, highlight: true }],
    },
    {
      line: 5,
      comment: "func 호출 — static x: 6 → 8, 반환값 8",
      variables: [
        { name: "x (static)", type: "int", value: 8, highlight: true },
        { name: "반환값", type: "int", value: 8, highlight: true },
      ],
    },
    {
      line: 14,
      comment: "sum += 8 — sum = 20",
      variables: [{ name: "sum", type: "int", value: 20, highlight: true }],
    },
    {
      line: 12,
      comment: "for 루프가 종료됩니다 (i=4, 조건 i<4 불만족).",
      variables: [
        { name: "sum", type: "int", value: 20 },
        { name: "i", type: "int", value: 4 },
      ],
    },
    {
      line: 16,
      comment: "printf(\"%d\", sum) 실행 — 최종 출력값은 20입니다.",
      variables: [{ name: "sum", type: "int", value: 20 }],
      stdout: "20",
      relatedLines: [{ line: 11, role: "read", label: "sum 선언" }],
      memory: {
        cells: [
          { id: "stack_sum", region: "stack", label: "sum", value: "20", highlight: true },
        ],
        arrows: [],
      },
    },
  ],
};
