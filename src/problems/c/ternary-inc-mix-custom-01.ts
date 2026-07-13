import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

int main() {
    int a = 4, b = 3, c = 2, d;
    d = a > b && ++c < 5 ? a++ * c : --b;
    printf("%d %d %d %d", a, b, c, d);
    return 0;
}`;

export const ternaryIncMixCustom01: Problem = {
  id: "ternary-inc-mix-custom-01",
  slug: "ternary-inc-mix-custom-01",
  title: "삼항·논리·증감 혼합",
  topic: "연산자",
  difficulty: "어려움",
  source: "커스텀-011",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "5 3 3 12",
  explanation: `여기서 많이 틀립니다:
1. a++ * c에서 a가 곱셈 전에 증가한다고 봅니다 — a++는 후위 증가이므로 곱셈에는 현재값 4가 사용되고, 곱셈이 끝난 뒤에 a가 5가 됩니다.
2. && 단락 평가로 ++c가 실행되지 않는다고 봅니다 — && 왼쪽(a > b)이 참이면 오른쪽(++c < 5)도 반드시 평가됩니다. 왼쪽이 거짓일 때만 건너뜁니다.
3. 삼항 연산자의 false 분기(--b)도 실행된다고 봅니다 — 조건이 참이면 true 분기(a++ * c)만 실행되고, --b는 절대 실행되지 않습니다.

실행 과정:
① a > b → 4 > 3 → 참
② && 오른쪽 평가: ++c → c=3, 3 < 5 → 참 → && 전체 참
③ 삼항 true 분기: a++ * c → 4 × 3 = 12 → d = 12, a = 5
④ false 분기(--b)는 실행 안 됨 → b = 3 유지

printf: a=5, b=3, c=3, d=12
최종 출력: "5 3 3 12"`,
  traceSteps: [
    {
      line: 3,
      comment: "main() 함수가 시작됩니다.",
      variables: [],
    },
    {
      line: 4,
      comment:
        "int a = 4, b = 3, c = 2 — 세 변수가 초기화됩니다.",
      variables: [
        { name: "a", type: "int", value: 4, highlight: true },
        { name: "b", type: "int", value: 3, highlight: true },
        { name: "c", type: "int", value: 2, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "4",
            highlight: true,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: true,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "2",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "int d — d는 선언만 되고 아직 초기화되지 않았습니다. 다음 줄에서 값이 결정됩니다.",
      variables: [
        { name: "a", type: "int", value: 4 },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 2 },
        { name: "d", type: "int", value: "미정", highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "4",
            highlight: false,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "2",
            highlight: false,
          },
          {
            id: "stack_d",
            region: "stack",
            label: "d",
            value: "?",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 5,
      comment:
        "삼항 연산식 평가 시작 — d = (a > b && ++c < 5) ? a++ * c : --b. 먼저 조건부터 왼쪽에서 오른쪽으로 평가합니다.",
      variables: [
        { name: "a", type: "int", value: 4 },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 2 },
        { name: "d", type: "int", value: "미정" },
      ],
    },
    {
      line: 5,
      comment:
        "&& 왼쪽 평가: a > b → 4 > 3 → 참(1). 왼쪽이 참이므로 && 오른쪽도 반드시 평가해야 합니다.",
      variables: [
        { name: "a", type: "int", value: 4 },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 2 },
        { name: "a > b", type: "bool", value: true, highlight: true },
      ],
      relatedLines: [{ line: 4, role: "read", label: "a, b 선언" }],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "4",
            highlight: false,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "2",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 5,
      comment:
        "++ c (전위 증가) — c가 2에서 3으로 증가합니다. 전위이므로 증가된 값 3이 바로 사용됩니다.",
      variables: [
        { name: "a", type: "int", value: 4 },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 3, highlight: true },
      ],
      relatedLines: [{ line: 4, role: "read", label: "c 선언" }],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "4",
            highlight: false,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "3",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 5,
      comment:
        "++c < 5 → 3 < 5 → 참. && 전체 결과: 참 && 참 = 참. 삼항 조건이 참이므로 true 분기(a++ * c)를 실행합니다.",
      variables: [
        { name: "a", type: "int", value: 4 },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 3 },
        { name: "++c < 5", type: "bool", value: true, highlight: true },
        {
          name: "&& 결과",
          type: "bool",
          value: true,
          highlight: true,
        },
      ],
    },
    {
      line: 5,
      comment:
        "true 분기: a++ * c 실행 — a++는 후위 증가이므로 곱셈에는 현재값 a=4가 사용됩니다. 4 × 3 = 12. d = 12",
      variables: [
        { name: "a", type: "int", value: 4 },
        { name: "c", type: "int", value: 3 },
        { name: "a × c", type: "int", value: 12, highlight: true },
        { name: "d", type: "int", value: 12, highlight: true },
      ],
      relatedLines: [{ line: 4, role: "read", label: "a, c 선언" }],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "4",
            highlight: false,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_d",
            region: "stack",
            label: "d",
            value: "12",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 5,
      comment:
        "a++ 후위 증가 — 곱셈이 끝난 뒤 a가 4에서 5로 증가합니다. (후위이므로 곱셈에는 4가 쓰였습니다)",
      variables: [
        { name: "a", type: "int", value: 5, highlight: true },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 3 },
        { name: "d", type: "int", value: 12 },
      ],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "5",
            highlight: true,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_d",
            region: "stack",
            label: "d",
            value: "12",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 5,
      comment:
        "false 분기(--b)는 실행되지 않습니다 — 삼항 조건이 참이었으므로 --b는 건너뜁니다. b는 3 그대로 유지됩니다.",
      variables: [
        { name: "a", type: "int", value: 5 },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 3 },
        { name: "d", type: "int", value: 12 },
      ],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "5",
            highlight: false,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_d",
            region: "stack",
            label: "d",
            value: "12",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 5,
      comment:
        "삼항 연산 최종 결과 확인 — a=5, b=3, c=3, d=12. 이 네 값이 printf에 전달됩니다.",
      variables: [
        { name: "a", type: "int", value: 5 },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 3 },
        { name: "d", type: "int", value: 12 },
      ],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "5",
            highlight: false,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_d",
            region: "stack",
            label: "d",
            value: "12",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment:
        "printf(\"%d %d %d %d\", 5, 3, 3, 12) — 공백으로 구분되어 \"5 3 3 12\"가 출력됩니다.",
      variables: [
        { name: "a", type: "int", value: 5 },
        { name: "b", type: "int", value: 3 },
        { name: "c", type: "int", value: 3 },
        { name: "d", type: "int", value: 12 },
      ],
      stdout: "5 3 3 12",
      relatedLines: [{ line: 4, role: "read", label: "변수 선언" }],
      memory: {
        cells: [
          {
            id: "stack_a",
            region: "stack",
            label: "a",
            value: "5",
            highlight: false,
          },
          {
            id: "stack_b",
            region: "stack",
            label: "b",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_c",
            region: "stack",
            label: "c",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_d",
            region: "stack",
            label: "d",
            value: "12",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
  ],
};
