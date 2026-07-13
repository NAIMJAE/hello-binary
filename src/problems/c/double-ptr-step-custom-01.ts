import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

void step(int **pp) {
    printf("%d", *(*pp)++);
}

int main() {
    int a[] = {2, 5, 7, 1};
    int *p = a;
    step(&p);
    step(&p);
    printf("%d%d", *p, (int)(p - a));
    return 0;
}`;

export const doublePtrStepCustom01: Problem = {
  id: "double-ptr-step-custom-01",
  slug: "double-ptr-step-custom-01",
  title: "이중 포인터로 포인터 진행",
  topic: "포인터",
  difficulty: "어려움",
  source: "커스텀-007",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "2572",
  explanation: `여기서 많이 틀립니다:
1. *(*pp)++에서 증가하는 대상을 혼동합니다 — 배열 값(a[0])이 증가하는 것이 아니라, 포인터 p 자체가 다음 원소를 가리키도록 전진합니다. *((*pp)++)로 해석해야 합니다.
2. 후위 증가(++)이므로 printf에는 증가 전 값이 전달됩니다 — p가 a[0]을 가리킬 때 *p=2가 먼저 출력되고, 그다음 p가 a[1]로 이동합니다.
3. p - a를 배열의 값으로 착각합니다 — 포인터 뺄셈은 두 주소 사이의 원소 개수(인덱스 차이)를 반환합니다.

실행 과정:
- 1번째 step(&p): p→a[0], 출력 "2", 이후 p→a[1]
- 2번째 step(&p): p→a[1], 출력 "5", 이후 p→a[2]
- printf("%d%d", *p, p-a): *p=7, p-a=2 → "72"

최종 출력: "2" + "5" + "72" = "2572"`,
  traceSteps: [
    {
      line: 7,
      comment: "main() 함수가 시작됩니다.",
      variables: [],
    },
    {
      line: 8,
      comment:
        "int a[] = {2, 5, 7, 1} — 정수 배열 a에 4개의 원소가 메모리에 저장됩니다.",
      variables: [
        {
          name: "a",
          type: "int[]",
          value: [2, 5, 7, 1],
          highlight: true,
        },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: true,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 9,
      comment:
        "int *p = a — 포인터 p가 배열의 시작 주소를 저장합니다. p는 a[0]을 가리킵니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "p", type: "int*", value: "→ a[0]", highlight: true },
        { name: "*p", type: "int", value: 2, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
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
      line: 10,
      comment:
        "step(&p) 호출 — p의 주소(&p)를 매개변수 pp에 전달합니다. pp는 int** 타입이므로 '포인터의 포인터'입니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "p", type: "int*", value: "→ a[0]" },
        { name: "pp", type: "int**", value: "&p", highlight: true },
      ],
      relatedLines: [
        { line: 3, role: "definition", label: "step 함수 정의" },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[0]",
            highlight: false,
          },
          {
            id: "stack_pp",
            region: "stack",
            label: "pp",
            value: "&p",
            highlight: true,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a0",
            label: "가리킴",
            highlight: false,
          },
          {
            from: "stack_pp",
            to: "stack_p",
            label: "가리킴",
            highlight: true,
          },
        ],
      },
    },
    {
      line: 4,
      comment:
        "*(*pp)++ 해석 — ① *pp는 pp가 가리키는 값, 즉 p입니다. ② *p는 p가 가리키는 a[0] = 2입니다. printf(\"%d\", 2)로 2가 출력됩니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "pp", type: "int**", value: "&p" },
        { name: "*pp", type: "int*", value: "p (→ a[0])", highlight: true },
        { name: "**pp", type: "int", value: 2, highlight: true },
      ],
      stdout: "2",
      relatedLines: [
        { line: 9, role: "read", label: "p 선언" },
        { line: 8, role: "read", label: "a 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: true,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[0]",
            highlight: false,
          },
          {
            id: "stack_pp",
            region: "stack",
            label: "pp",
            value: "&p",
            highlight: false,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a0",
            label: "가리킴",
            highlight: false,
          },
          {
            from: "stack_pp",
            to: "stack_p",
            label: "가리킴",
            highlight: false,
          },
        ],
      },
    },
    {
      line: 4,
      comment:
        "후위 증가(++) — (*pp)++에 의해 *pp, 즉 p가 a[0]에서 a[1]로 한 칸 전진합니다. 증가하는 것은 배열 값이 아니라 포인터 p 자체입니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "pp", type: "int**", value: "&p" },
        { name: "p", type: "int*", value: "→ a[1]", highlight: true },
        { name: "*p", type: "int", value: 5, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[1]",
            highlight: true,
          },
          {
            id: "stack_pp",
            region: "stack",
            label: "pp",
            value: "&p",
            highlight: false,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a1",
            label: "가리킴",
            highlight: true,
          },
          {
            from: "stack_pp",
            to: "stack_p",
            label: "가리킴",
            highlight: false,
          },
        ],
      },
    },
    {
      line: 5,
      comment:
        "step 함수가 종료되어 main()으로 돌아갑니다. pp는 스택에서 제거됩니다. p는 a[1]을 가리키는 상태입니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "p", type: "int*", value: "→ a[1]" },
        { name: "*p", type: "int", value: 5 },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[1]",
            highlight: false,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a1",
            label: "가리킴",
            highlight: false,
          },
        ],
      },
    },
    {
      line: 11,
      comment:
        "두 번째 step(&p) 호출 — 다시 pp = &p로, pp가 p를 가리킵니다. 이번에 p는 a[1]을 가리키고 있습니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "p", type: "int*", value: "→ a[1]" },
        { name: "pp", type: "int**", value: "&p", highlight: true },
      ],
      relatedLines: [
        { line: 3, role: "definition", label: "step 함수 정의" },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[1]",
            highlight: false,
          },
          {
            id: "stack_pp",
            region: "stack",
            label: "pp",
            value: "&p",
            highlight: true,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a1",
            label: "가리킴",
            highlight: false,
          },
          {
            from: "stack_pp",
            to: "stack_p",
            label: "가리킴",
            highlight: true,
          },
        ],
      },
    },
    {
      line: 4,
      comment:
        "*(*pp)++ — *pp = p, p→a[1]이므로 *p = 5. printf(\"%d\", 5)로 5가 출력됩니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "pp", type: "int**", value: "&p" },
        { name: "*pp", type: "int*", value: "p (→ a[1])", highlight: true },
        { name: "**pp", type: "int", value: 5, highlight: true },
      ],
      stdout: "5",
      relatedLines: [
        { line: 9, role: "read", label: "p 선언" },
        { line: 8, role: "read", label: "a 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            id: "data_a3",
            region: "data",
            label: "a[3]",
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[1]",
            highlight: false,
          },
          {
            id: "stack_pp",
            region: "stack",
            label: "pp",
            value: "&p",
            highlight: false,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a1",
            label: "가리킴",
            highlight: false,
          },
          {
            from: "stack_pp",
            to: "stack_p",
            label: "가리킴",
            highlight: false,
          },
        ],
      },
    },
    {
      line: 4,
      comment:
        "후위 증가로 p가 a[1]에서 a[2]로 전진합니다. 첫 번째 호출과 같은 원리입니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "pp", type: "int**", value: "&p" },
        { name: "p", type: "int*", value: "→ a[2]", highlight: true },
        { name: "*p", type: "int", value: 7, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[2]",
            highlight: true,
          },
          {
            id: "stack_pp",
            region: "stack",
            label: "pp",
            value: "&p",
            highlight: false,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a2",
            label: "가리킴",
            highlight: true,
          },
          {
            from: "stack_pp",
            to: "stack_p",
            label: "가리킴",
            highlight: false,
          },
        ],
      },
    },
    {
      line: 5,
      comment:
        "두 번째 step도 종료. main()으로 복귀합니다. p는 이제 a[2]를 가리킵니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "p", type: "int*", value: "→ a[2]" },
        { name: "*p", type: "int", value: 7 },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[2]",
            highlight: false,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a2",
            label: "가리킴",
            highlight: false,
          },
        ],
      },
    },
    {
      line: 12,
      comment:
        "printf의 첫 번째 인자 *p — p는 a[2]를 가리키므로 *p = 7입니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "p", type: "int*", value: "→ a[2]" },
        { name: "*p", type: "int", value: 7, highlight: true },
      ],
      relatedLines: [
        { line: 8, role: "read", label: "a 선언" },
        { line: 9, role: "read", label: "p 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            id: "data_a3",
            region: "data",
            label: "a[3]",
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[2]",
            highlight: false,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a2",
            label: "가리킴",
            highlight: false,
          },
        ],
      },
    },
    {
      line: 12,
      comment:
        "두 번째 인자 (int)(p - a) — 포인터 뺄셈은 인덱스 차이를 구합니다. p는 a+2 위치이므로 p - a = 2입니다.",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "p", type: "int*", value: "→ a[2]" },
        { name: "*p", type: "int", value: 7 },
        { name: "p - a", type: "int", value: 2, highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_a0",
            region: "data",
            label: "a[0]",
            value: "2",
            highlight: false,
          },
          {
            id: "data_a1",
            region: "data",
            label: "a[1]",
            value: "5",
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
            value: "1",
            highlight: false,
          },
          {
            id: "stack_p",
            region: "stack",
            label: "p",
            value: "→ a[2]",
            highlight: false,
          },
          {
            id: "stack_p_minus_a",
            region: "stack",
            label: "p - a",
            value: "2",
            highlight: true,
          },
        ],
        arrows: [
          {
            from: "stack_p",
            to: "data_a2",
            label: "가리킴",
            highlight: false,
          },
        ],
      },
    },
    {
      line: 12,
      comment:
        "printf(\"%d%d\", 7, 2) — \"%d%d\"에 7과 2가 들어가 \"72\"가 출력됩니다. 전체 출력: \"2\" + \"5\" + \"72\" = \"2572\"",
      variables: [
        { name: "a", type: "int[]", value: [2, 5, 7, 1] },
        { name: "p", type: "int*", value: "→ a[2]" },
        { name: "*p", type: "int", value: 7 },
        { name: "p - a", type: "int", value: 2 },
      ],
      stdout: "72",
      relatedLines: [
        { line: 8, role: "read", label: "a 선언" },
        { line: 9, role: "read", label: "p 선언" },
      ],
      memory: {
        cells: [
          { id: "data_a0", region: "data", label: "a[0]", value: "2", highlight: false },
          { id: "data_a1", region: "data", label: "a[1]", value: "5", highlight: false },
          { id: "data_a2", region: "data", label: "a[2]", value: "7", highlight: false },
          { id: "data_a3", region: "data", label: "a[3]", value: "1", highlight: false },
          { id: "stack_p", region: "stack", label: "p", value: "→ a[2]", highlight: false },
        ],
        arrows: [{ from: "stack_p", to: "data_a2", label: "가리킴", highlight: false }],
      },
    },
  ],
};
