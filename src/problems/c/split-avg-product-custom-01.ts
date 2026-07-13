import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

int left(int *p, int n) {
    int i, s = 0;
    for (i = 0; i < n / 2; i++) {
        s += p[i];
    }
    return s;
}

int right(int *p, int n) {
    int i, s = 0;
    for (i = n / 2; i < n; i++) {
        s += *(p + i);
    }
    return s;
}

int main() {
    int a[] = {4, 1, 7, 2, 8, 3};
    int n = 6;
    printf("%d", left(a, n) * right(a, n));
    return 0;
}`;

export const splitAvgProductCustom01: Problem = {
  id: "split-avg-product-custom-01",
  slug: "split-avg-product-custom-01",
  title: "좌·우 구간 포인터 합의 곱",
  topic: "포인터",
  difficulty: "보통",
  source: "커스텀-008",
  estimatedMinutes: 6,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "156",
  explanation: `여기서 많이 틀립니다:
1. n/2 경계에서 인덱스 범위를 혼동합니다 — left는 i=0,1,2(3개), right는 i=3,4,5(3개)로 정확히 반으로 나뉩니다.
2. p[i]와 *(p+i)에 차이가 있다고 착각합니다 — 둘은 완전히 같은 표현입니다. left는 p[i], right는 *(p+i)를 사용하지만 결과는 동일합니다.
3. left와 right의 반환값을 더한다(+)고 보는 실수 — printf에서 곱셈(*)을 합니다.

실행 과정:
- n=6, n/2=3
- left: i=0,1,2 → p[0]+p[1]+p[2] = 4+1+7 = 12
- right: i=3,4,5 → *(p+3)+*(p+4)+*(p+5) = 2+8+3 = 13
- 12 × 13 = 156

최종 출력: 156`,
  traceSteps: [
    {
      line: 19,
      comment: "main() 함수가 시작됩니다.",
      variables: [],
    },
    {
      line: 20,
      comment:
        "int a[] = {4, 1, 7, 2, 8, 3} — 정수 배열 a에 6개의 원소가 저장됩니다.",
      variables: [
        {
          name: "a",
          type: "int[]",
          value: [4, 1, 7, 2, 8, 3],
          highlight: true,
        },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "4",
            highlight: true,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "1",
            highlight: true,
          },
          {
            id: "data_a2",
            region: "data",
            label: "a[2]",
            value: "7",
            highlight: true,
          },
          {
            id: "data_a3",
            region: "data",
            label: "a[3]",
            value: "2",
            highlight: true,
          },
          {
            id: "data_a4",
            region: "data",
            label: "a[4]",
            value: "8",
            highlight: true,
          },
          {
            id: "data_a5",
            region: "data",
            label: "a[5]",
            value: "3",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 21,
      comment: "int n = 6 — 배열의 원소 개수를 n에 저장합니다.",
      variables: [
        { name: "a", type: "int[]", value: [4, 1, 7, 2, 8, 3] },
        { name: "n", type: "int", value: 6, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "4",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "1",
            highlight: false,
          },
          {
            id: "data_a2",
            region: "data",
            label: "a[2]",
            value: "7",
            highlight: false,
          },
          {
            id: "data_a3",
            region: "data",
            label: "a[3]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a4",
            region: "data",
            label: "a[4]",
            value: "8",
            highlight: false,
          },
          {
            id: "data_a5",
            region: "data",
            label: "a[5]",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_n",
            region: "stack",
            label: "n",
            value: "6",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 22,
      comment:
        "printf 실행 전, 먼저 left(a, n)을 평가합니다. left 함수가 호출됩니다.",
      variables: [
        { name: "a", type: "int[]", value: [4, 1, 7, 2, 8, 3] },
        { name: "n", type: "int", value: 6 },
      ],
      relatedLines: [
        { line: 3, role: "definition", label: "left 함수 정의" },
      ],
    },
    {
      line: 3,
      comment:
        "left(a, 6) 함수 진입 — 매개변수 p는 배열 a를 가리키고, n=6입니다.",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]", highlight: true },
        { name: "n", type: "int", value: 6 },
      ],
      relatedLines: [{ line: 22, role: "call", label: "left 호출" }],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "4",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "1",
            highlight: false,
          },
          {
            id: "data_a2",
            region: "data",
            label: "a[2]",
            value: "7",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[0]",
            highlight: true,
          },
        ],
        arrows: [
          { from: "stack_p", to: "data_a0", label: "가리킴", highlight: true },
        ],
      },
    },
    {
      line: 4,
      comment:
        "int i, s = 0 — 루프 변수 i와 합계 s를 초기화합니다. n/2 = 6/2 = 3이므로 i < 3 동안 반복합니다.",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "n", type: "int", value: 6 },
        { name: "n / 2", type: "int", value: 3, highlight: true },
        { name: "i", type: "int", value: 0, highlight: true },
        { name: "s", type: "int", value: 0, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "0",
            highlight: true,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "0",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment:
        "i=0: 0 < 3 참 → s += p[0]. p[0]은 a[0] = 4입니다. s = 0 + 4 = 4",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "i", type: "int", value: 0 },
        { name: "s", type: "int", value: 4, highlight: true },
        { name: "p[0]", type: "int", value: 4, highlight: true },
      ],
      relatedLines: [{ line: 5, role: "read", label: "for 조건" }],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "4",
            highlight: true,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "1",
            highlight: false,
          },
          {
            id: "data_a2",
            region: "data",
            label: "a[2]",
            value: "7",
            highlight: false,
          },
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "0",
            highlight: false,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "4",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment:
        "i=1: 1 < 3 참 → s += p[1]. p[1]은 a[1] = 1입니다. s = 4 + 1 = 5",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "i", type: "int", value: 1, highlight: true },
        { name: "s", type: "int", value: 5, highlight: true },
        { name: "p[1]", type: "int", value: 1, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "4",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "1",
            highlight: true,
          },
          {
            id: "data_a2",
            region: "data",
            label: "a[2]",
            value: "7",
            highlight: false,
          },
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "1",
            highlight: true,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "5",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 6,
      comment:
        "i=2: 2 < 3 참 → s += p[2]. p[2]은 a[2] = 7입니다. s = 5 + 7 = 12",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "i", type: "int", value: 2, highlight: true },
        { name: "s", type: "int", value: 12, highlight: true },
        { name: "p[2]", type: "int", value: 7, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "4",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "1",
            highlight: false,
          },
          {
            id: "data_a2",
            region: "data",
            label: "a[2]",
            value: "7",
            highlight: true,
          },
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "2",
            highlight: true,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
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
        "i=3: 3 < 3 거짓 → for 루프를 빠져나갑니다. left 함수의 합계 s = 12입니다.",
      variables: [
        { name: "i", type: "int", value: 3, highlight: true },
        { name: "s", type: "int", value: 12 },
      ],
      memory: {
        cells: [
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "3",
            highlight: true,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "12",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 8,
      comment: "return s — left 함수가 12를 반환합니다.",
      variables: [
        { name: "s", type: "int", value: 12 },
        { name: "left(a,n)", type: "int", value: 12, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "stack_left_result",
            region: "stack",
            label: "left(a,n)",
            value: "12",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 22,
      comment:
        "다음으로 right(a, n)을 평가합니다. right 함수가 호출됩니다.",
      variables: [
        { name: "a", type: "int[]", value: [4, 1, 7, 2, 8, 3] },
        { name: "n", type: "int", value: 6 },
        { name: "left(a,n)", type: "int", value: 12 },
      ],
      relatedLines: [
        { line: 11, role: "definition", label: "right 함수 정의" },
      ],
    },
    {
      line: 11,
      comment:
        "right(a, 6) 함수 진입 — p는 배열 a를 가리키고, n=6입니다.",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]", highlight: true },
        { name: "n", type: "int", value: 6 },
      ],
      relatedLines: [{ line: 22, role: "call", label: "right 호출" }],
      memory: {
        cells: [
          {
            id: "data_a3",
            region: "data",
            label: "a[3]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a4",
            region: "data",
            label: "a[4]",
            value: "8",
            highlight: false,
          },
          {
            id: "data_a5",
            region: "data",
            label: "a[5]",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[0]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 12,
      comment:
        "int i, s = 0 — i의 시작값은 n/2 = 3, s = 0. i < 6(= n) 동안 반복합니다.",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "n", type: "int", value: 6 },
        { name: "n / 2", type: "int", value: 3, highlight: true },
        { name: "i", type: "int", value: 3, highlight: true },
        { name: "s", type: "int", value: 0, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "3",
            highlight: true,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "0",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 14,
      comment:
        "i=3: 3 < 6 참 → s += *(p+3). *(p+3)은 a[3] = 2입니다. s = 0 + 2 = 2. (*(p+i)는 p[i]와 동일합니다)",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "i", type: "int", value: 3 },
        { name: "s", type: "int", value: 2, highlight: true },
        { name: "*(p+3)", type: "int", value: 2, highlight: true },
      ],
      relatedLines: [{ line: 13, role: "read", label: "for 조건" }],
      memory: {
        cells: [
          {
            id: "data_a3",
            region: "data",
            label: "a[3]",
            value: "2",
            highlight: true,
          },
          {
            id: "data_a4",
            region: "data",
            label: "a[4]",
            value: "8",
            highlight: false,
          },
          {
            id: "data_a5",
            region: "data",
            label: "a[5]",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "2",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 14,
      comment:
        "i=4: 4 < 6 참 → s += *(p+4). *(p+4)은 a[4] = 8입니다. s = 2 + 8 = 10",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "i", type: "int", value: 4, highlight: true },
        { name: "s", type: "int", value: 10, highlight: true },
        { name: "*(p+4)", type: "int", value: 8, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a3",
            region: "data",
            label: "a[3]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a4",
            region: "data",
            label: "a[4]",
            value: "8",
            highlight: true,
          },
          {
            id: "data_a5",
            region: "data",
            label: "a[5]",
            value: "3",
            highlight: false,
          },
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "4",
            highlight: true,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "10",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 14,
      comment:
        "i=5: 5 < 6 참 → s += *(p+5). *(p+5)은 a[5] = 3입니다. s = 10 + 3 = 13",
      variables: [
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "i", type: "int", value: 5, highlight: true },
        { name: "s", type: "int", value: 13, highlight: true },
        { name: "*(p+5)", type: "int", value: 3, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a3",
            region: "data",
            label: "a[3]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a4",
            region: "data",
            label: "a[4]",
            value: "8",
            highlight: false,
          },
          {
            id: "data_a5",
            region: "data",
            label: "a[5]",
            value: "3",
            highlight: true,
          },
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "5",
            highlight: true,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "13",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 13,
      comment:
        "i=6: 6 < 6 거짓 → for 루프를 빠져나갑니다. right 함수의 합계 s = 13입니다.",
      variables: [
        { name: "i", type: "int", value: 6, highlight: true },
        { name: "s", type: "int", value: 13 },
      ],
      memory: {
        cells: [
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "6",
            highlight: true,
          },
          {
            id: "stack_s",
            region: "stack",
            label: "s",
            value: "13",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 16,
      comment: "return s — right 함수가 13을 반환합니다.",
      variables: [
        { name: "s", type: "int", value: 13 },
        { name: "right(a,n)", type: "int", value: 13, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "stack_right_result",
            region: "stack",
            label: "right(a,n)",
            value: "13",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 22,
      comment:
        "left(a,n) * right(a,n) = 12 × 13 = 156. 곱셈 결과를 계산합니다.",
      variables: [
        { name: "left(a,n)", type: "int", value: 12 },
        { name: "right(a,n)", type: "int", value: 13 },
        {
          name: "left × right",
          type: "int",
          value: 156,
          highlight: true,
        },
      ],
      memory: {
        cells: [
          {
            id: "stack_left_result",
            region: "stack",
            label: "left(a,n)",
            value: "12",
            highlight: false,
          },
          {
            id: "stack_right_result",
            region: "stack",
            label: "right(a,n)",
            value: "13",
            highlight: false,
          },
          {
            id: "stack_product",
            region: "stack",
            label: "left × right",
            value: "156",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 22,
      comment:
        "printf(\"%d\", 156) — 최종 출력 \"156\"입니다.",
      variables: [
        { name: "left × right", type: "int", value: 156 },
      ],
      stdout: "156",
      relatedLines: [
        { line: 20, role: "read", label: "a 선언" },
        { line: 21, role: "read", label: "n 선언" },
      ],
    },
  ],
};
