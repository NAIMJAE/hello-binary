import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

typedef struct {
    int c;
    int v;
} Item;

int run(Item *arr, int n) {
    int i, s = 0;
    for (i = 0; i < n; i++) {
        if ((arr + i)->c % 2 == 0) {
            s += (arr + i)->v;
        } else {
            s -= arr[i].v;
        }
    }
    return s;
}

int main() {
    Item a[4] = {{2, 10}, {5, 3}, {4, 7}, {1, 2}};
    printf("%d", run(a, 4));
    return 0;
}`;

export const structParityFoldCustom01: Problem = {
  id: "struct-parity-fold-custom-01",
  slug: "struct-parity-fold-custom-01",
  title: "구조체 배열 패리티 폴드",
  topic: "구조체",
  difficulty: "보통",
  source: "커스텀-009",
  estimatedMinutes: 6,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "12",
  explanation: `여기서 많이 틀립니다: c가 아니라 v의 짝·홀을 기준으로 부호를 나눈다고 착각합니다.

실제로는 c(코드)의 짝·홀에 따라 v(값)를 더하거나 뺍니다.
(arr+i)->c 와 arr[i].c 는 같은 표현입니다 — 포인터 산술과 배열 인덱스의 등가성.

- i=0: c=2(짝) → s += 10 → 10
- i=1: c=5(홀) → s -= 3 → 7
- i=2: c=4(짝) → s += 7 → 14
- i=3: c=1(홀) → s -= 2 → 12

최종 출력: 12`,
  traceSteps: [
    {
      line: 20,
      comment: "main() 시작",
      variables: [],
      memory: {
        cells: [],
        arrows: []
      }
    },
    {
      line: 21,
      comment: "Item a[4] = {{2,10},{5,3},{4,7},{1,2}} — 구조체 배열 초기화",
      variables: [
        { name: "a[0]", type: "Item", value: "{c=2, v=10}", highlight: true },
        { name: "a[1]", type: "Item", value: "{c=5, v=3}", highlight: true },
        { name: "a[2]", type: "Item", value: "{c=4, v=7}", highlight: true },
        { name: "a[3]", type: "Item", value: "{c=1, v=2}", highlight: true }
      ],
      relatedLines: [
        { line: 3, role: "read", label: "Item 구조체 정의" }
      ],
      memory: {
        cells: [
          { id: "data_a0", region: "data", label: "a[0]", value: "{2, 10}", highlight: true },
          { id: "data_a1", region: "data", label: "a[1]", value: "{5, 3}", highlight: true },
          { id: "data_a2", region: "data", label: "a[2]", value: "{4, 7}", highlight: true },
          { id: "data_a3", region: "data", label: "a[3]", value: "{1, 2}", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 8,
      comment: "run(a, 4) 진입 — arr=a의 주소, n=4",
      variables: [
        { name: "arr", type: "Item*", value: "&a[0]", highlight: true },
        { name: "n", type: "int", value: 4, highlight: true }
      ],
      relatedLines: [
        { line: 21, role: "read", label: "a 배열 전달" }
      ],
      memory: {
        cells: [
          { id: "stack_arr", region: "stack", label: "arr", value: "&a[0]", highlight: true },
          { id: "stack_n", region: "stack", label: "n", value: "4", highlight: true },
          { id: "data_a", region: "data", label: "a[]", value: "[{2,10},{5,3},{4,7},{1,2}]", highlight: false }
        ],
        arrows: [
          { from: "stack_arr", to: "data_a", label: "배열 시작 주소", highlight: true }
        ]
      }
    },
    {
      line: 9,
      comment: "int i, s = 0 — 반복 변수 i 선언, 합계 s를 0으로 초기화",
      variables: [
        { name: "arr", type: "Item*", value: "&a[0]" },
        { name: "n", type: "int", value: 4 },
        { name: "i", type: "int", value: "?", highlight: true },
        { name: "s", type: "int", value: 0, highlight: true }
      ],
      memory: {
        cells: [
          { id: "stack_arr", region: "stack", label: "arr", value: "&a[0]", highlight: false },
          { id: "stack_n", region: "stack", label: "n", value: "4", highlight: false },
          { id: "stack_i", region: "stack", label: "i", value: "?", highlight: true },
          { id: "stack_s", region: "stack", label: "s", value: "0", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 10,
      comment: "for i=0: 0 < 4 → 참, 루프 진입",
      variables: [
        { name: "i", type: "int", value: 0, highlight: true },
        { name: "s", type: "int", value: 0 },
        { name: "n", type: "int", value: 4 }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "0", highlight: true },
          { id: "stack_s", region: "stack", label: "s", value: "0", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "(arr+0)->c = 2 → 2%2 == 0 → 참(짝수) → if 분기 진입. ※ (arr+i)->c 는 arr[i].c와 동일",
      variables: [
        { name: "i", type: "int", value: 0 },
        { name: "(arr+0)->c", type: "int", value: 2, highlight: true },
        { name: "s", type: "int", value: 0 }
      ],
      relatedLines: [
        { line: 4, role: "read", label: "c 필드 정의" }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "0", highlight: false },
          { id: "data_a0", region: "data", label: "a[0]", value: "{c=2, v=10}", highlight: true }
        ],
        arrows: [
          { from: "stack_arr", to: "data_a0", label: "arr+0", highlight: true }
        ]
      }
    },
    {
      line: 12,
      comment: "s += (arr+0)->v → s = 0 + 10 = 10. ※ (arr+i)->v 도 arr[i].v와 동일",
      variables: [
        { name: "i", type: "int", value: 0 },
        { name: "(arr+0)->v", type: "int", value: 10, highlight: true },
        { name: "s", type: "int", value: 10, highlight: true }
      ],
      relatedLines: [
        { line: 5, role: "read", label: "v 필드 정의" },
        { line: 9, role: "read", label: "s 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_s", region: "stack", label: "s", value: "10", highlight: true },
          { id: "data_a0", region: "data", label: "a[0]", value: "{c=2, v=10}", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 10,
      comment: "for i=1: 1 < 4 → 참, 루프 계속",
      variables: [
        { name: "i", type: "int", value: 1, highlight: true },
        { name: "s", type: "int", value: 10 },
        { name: "n", type: "int", value: 4 }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "1", highlight: true },
          { id: "stack_s", region: "stack", label: "s", value: "10", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "(arr+1)->c = 5 → 5%2 == 1 → 거짓(홀수) → else 분기 진입",
      variables: [
        { name: "i", type: "int", value: 1 },
        { name: "(arr+1)->c", type: "int", value: 5, highlight: true },
        { name: "s", type: "int", value: 10 }
      ],
      relatedLines: [
        { line: 4, role: "read", label: "c 필드 정의" }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "1", highlight: false },
          { id: "data_a1", region: "data", label: "a[1]", value: "{c=5, v=3}", highlight: true }
        ],
        arrows: [
          { from: "stack_arr", to: "data_a1", label: "arr+1", highlight: true }
        ]
      }
    },
    {
      line: 14,
      comment: "s -= arr[1].v → s = 10 - 3 = 7. ※ arr[i].v 는 (arr+i)->v와 동일 표현",
      variables: [
        { name: "i", type: "int", value: 1 },
        { name: "arr[1].v", type: "int", value: 3, highlight: true },
        { name: "s", type: "int", value: 7, highlight: true }
      ],
      relatedLines: [
        { line: 5, role: "read", label: "v 필드 정의" },
        { line: 9, role: "read", label: "s 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_s", region: "stack", label: "s", value: "7", highlight: true },
          { id: "data_a1", region: "data", label: "a[1]", value: "{c=5, v=3}", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 10,
      comment: "for i=2: 2 < 4 → 참, 루프 계속",
      variables: [
        { name: "i", type: "int", value: 2, highlight: true },
        { name: "s", type: "int", value: 7 },
        { name: "n", type: "int", value: 4 }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "2", highlight: true },
          { id: "stack_s", region: "stack", label: "s", value: "7", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "(arr+2)->c = 4 → 4%2 == 0 → 참(짝수) → if 분기 진입",
      variables: [
        { name: "i", type: "int", value: 2 },
        { name: "(arr+2)->c", type: "int", value: 4, highlight: true },
        { name: "s", type: "int", value: 7 }
      ],
      relatedLines: [
        { line: 4, role: "read", label: "c 필드 정의" }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "2", highlight: false },
          { id: "data_a2", region: "data", label: "a[2]", value: "{c=4, v=7}", highlight: true }
        ],
        arrows: [
          { from: "stack_arr", to: "data_a2", label: "arr+2", highlight: true }
        ]
      }
    },
    {
      line: 12,
      comment: "s += (arr+2)->v → s = 7 + 7 = 14",
      variables: [
        { name: "i", type: "int", value: 2 },
        { name: "(arr+2)->v", type: "int", value: 7, highlight: true },
        { name: "s", type: "int", value: 14, highlight: true }
      ],
      relatedLines: [
        { line: 5, role: "read", label: "v 필드 정의" },
        { line: 9, role: "read", label: "s 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_s", region: "stack", label: "s", value: "14", highlight: true },
          { id: "data_a2", region: "data", label: "a[2]", value: "{c=4, v=7}", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 10,
      comment: "for i=3: 3 < 4 → 참, 루프 계속",
      variables: [
        { name: "i", type: "int", value: 3, highlight: true },
        { name: "s", type: "int", value: 14 },
        { name: "n", type: "int", value: 4 }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "3", highlight: true },
          { id: "stack_s", region: "stack", label: "s", value: "14", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "(arr+3)->c = 1 → 1%2 == 1 → 거짓(홀수) → else 분기 진입",
      variables: [
        { name: "i", type: "int", value: 3 },
        { name: "(arr+3)->c", type: "int", value: 1, highlight: true },
        { name: "s", type: "int", value: 14 }
      ],
      relatedLines: [
        { line: 4, role: "read", label: "c 필드 정의" }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "3", highlight: false },
          { id: "data_a3", region: "data", label: "a[3]", value: "{c=1, v=2}", highlight: true }
        ],
        arrows: [
          { from: "stack_arr", to: "data_a3", label: "arr+3", highlight: true }
        ]
      }
    },
    {
      line: 14,
      comment: "s -= arr[3].v → s = 14 - 2 = 12",
      variables: [
        { name: "i", type: "int", value: 3 },
        { name: "arr[3].v", type: "int", value: 2, highlight: true },
        { name: "s", type: "int", value: 12, highlight: true }
      ],
      relatedLines: [
        { line: 5, role: "read", label: "v 필드 정의" },
        { line: 9, role: "read", label: "s 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_s", region: "stack", label: "s", value: "12", highlight: true },
          { id: "data_a3", region: "data", label: "a[3]", value: "{c=1, v=2}", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 10,
      comment: "for i=4: 4 < 4 → 거짓, 루프 종료",
      variables: [
        { name: "i", type: "int", value: 4, highlight: true },
        { name: "s", type: "int", value: 12 },
        { name: "n", type: "int", value: 4 }
      ],
      memory: {
        cells: [
          { id: "stack_i", region: "stack", label: "i", value: "4", highlight: true },
          { id: "stack_s", region: "stack", label: "s", value: "12", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 17,
      comment: "return s → 12를 main()에 반환",
      variables: [
        { name: "s", type: "int", value: 12, highlight: true }
      ],
      relatedLines: [
        { line: 9, role: "read", label: "s 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_s", region: "stack", label: "s", value: "12", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 22,
      comment: "printf(\"%d\", 12) → 화면에 12 출력",
      variables: [
        { name: "run(a,4)", type: "int", value: 12, highlight: true }
      ],
      stdout: "12",
      relatedLines: [
        { line: 8, role: "read", label: "run 함수 정의" },
        { line: 21, role: "read", label: "a 배열 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_result", region: "stack", label: "run(a,4)", value: "12", highlight: true }
        ],
        arrows: []
      }
    }
  ],
};
