import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

struct N {
    int v;
    struct N *n;
};

int main() {
    struct N a = {4, 0};
    struct N b = {1, 0};
    struct N c = {6, 0};
    struct N d = {2, 0};
    a.n = &b;
    b.n = &c;
    c.n = &d;
    d.n = 0;

    struct N *h = &a;
    struct N *t = h->n;
    h->n = t->n;
    t->n = h;
    h = t;

    printf("%d%d%d%d", h->v, h->n->v, h->n->n->v, h->n->n->n->v);
    return 0;
}`;

export const listSwapHeadCustom01: Problem = {
  id: "list-swap-head-custom-01",
  slug: "list-swap-head-custom-01",
  title: "연결리스트 머리 두 노드 스왑",
  topic: "연결리스트",
  difficulty: "어려움",
  source: "커스텀-012",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "1462",
  explanation: `여기서 많이 틀립니다: 노드 값만 교환한다고 보거나, h를 갱신하지 않아 순회 시작점이 a로 남는다고 착각합니다.

초기 리스트: a(4) → b(1) → c(6) → d(2) → NULL

스왑 과정 (포인터만 변경, 값은 그대로):
- h = &a → h는 a를 가리킴
- t = h->n → t = &b (a의 다음 노드)
- h->n = t->n → a.n = &c (a가 c를 가리키도록 변경)
- t->n = h → b.n = &a (b가 a를 가리키도록 변경)
- h = t → h = &b (시작점을 b로 변경)

스왑 후 리스트: b(1) → a(4) → c(6) → d(2) → NULL
h부터 순회: 1, 4, 6, 2

최종 출력: 1462`,
  traceSteps: [
    {
      line: 8,
      comment: "main() 시작",
      variables: [],
      memory: {
        cells: [],
        arrows: []
      }
    },
    {
      line: 9,
      comment: "struct N a = {4, 0} — 노드 a 생성, v=4, n=NULL",
      variables: [
        { name: "a.v", type: "int", value: 4, highlight: true },
        { name: "a.n", type: "struct N*", value: "NULL", highlight: true }
      ],
      relatedLines: [
        { line: 3, role: "read", label: "struct N 정의" }
      ],
      memory: {
        cells: [
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=NULL}", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 10,
      comment: "struct N b = {1, 0} — 노드 b 생성, v=1, n=NULL",
      variables: [
        { name: "a.v", type: "int", value: 4 },
        { name: "b.v", type: "int", value: 1, highlight: true },
        { name: "b.n", type: "struct N*", value: "NULL", highlight: true }
      ],
      memory: {
        cells: [
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=NULL}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=NULL}", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "struct N c = {6, 0} — 노드 c 생성, v=6, n=NULL",
      variables: [
        { name: "a.v", type: "int", value: 4 },
        { name: "b.v", type: "int", value: 1 },
        { name: "c.v", type: "int", value: 6, highlight: true },
        { name: "c.n", type: "struct N*", value: "NULL", highlight: true }
      ],
      memory: {
        cells: [
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=NULL}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=NULL}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=NULL}", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 12,
      comment: "struct N d = {2, 0} — 노드 d 생성, v=2, n=NULL",
      variables: [
        { name: "a.v", type: "int", value: 4 },
        { name: "b.v", type: "int", value: 1 },
        { name: "c.v", type: "int", value: 6 },
        { name: "d.v", type: "int", value: 2, highlight: true },
        { name: "d.n", type: "struct N*", value: "NULL", highlight: true }
      ],
      memory: {
        cells: [
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=NULL}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=NULL}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=NULL}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 13,
      comment: "a.n = &b — a의 다음을 b로 설정",
      variables: [
        { name: "a.n", type: "struct N*", value: "&b", highlight: true }
      ],
      relatedLines: [
        { line: 9, role: "read", label: "a 선언" },
        { line: 10, role: "read", label: "b 선언" }
      ],
      memory: {
        cells: [
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&b}", highlight: true },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=NULL}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=NULL}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: false }
        ],
        arrows: [
          { from: "node_a", to: "node_b", label: "a.n", highlight: true }
        ]
      }
    },
    {
      line: 14,
      comment: "b.n = &c — b의 다음을 c로 설정",
      variables: [
        { name: "a.n", type: "struct N*", value: "&b" },
        { name: "b.n", type: "struct N*", value: "&c", highlight: true }
      ],
      relatedLines: [
        { line: 10, role: "read", label: "b 선언" },
        { line: 11, role: "read", label: "c 선언" }
      ],
      memory: {
        cells: [
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&b}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=&c}", highlight: true },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=NULL}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: false }
        ],
        arrows: [
          { from: "node_a", to: "node_b", label: "a.n", highlight: false },
          { from: "node_b", to: "node_c", label: "b.n", highlight: true }
        ]
      }
    },
    {
      line: 15,
      comment: "c.n = &d — c의 다음을 d로 설정",
      variables: [
        { name: "b.n", type: "struct N*", value: "&c" },
        { name: "c.n", type: "struct N*", value: "&d", highlight: true }
      ],
      relatedLines: [
        { line: 11, role: "read", label: "c 선언" },
        { line: 12, role: "read", label: "d 선언" }
      ],
      memory: {
        cells: [
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&b}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=&c}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=&d}", highlight: true },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: false }
        ],
        arrows: [
          { from: "node_a", to: "node_b", label: "a.n", highlight: false },
          { from: "node_b", to: "node_c", label: "b.n", highlight: false },
          { from: "node_c", to: "node_d", label: "c.n", highlight: true }
        ]
      }
    },
    {
      line: 16,
      comment: "d.n = 0 — 리스트 끝. 완성: a(4)→b(1)→c(6)→d(2)→NULL",
      variables: [
        { name: "d.n", type: "struct N*", value: "NULL", highlight: true }
      ],
      memory: {
        cells: [
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&b}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=&c}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=&d}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: true }
        ],
        arrows: [
          { from: "node_a", to: "node_b", label: "a.n", highlight: false },
          { from: "node_b", to: "node_c", label: "b.n", highlight: false },
          { from: "node_c", to: "node_d", label: "c.n", highlight: false }
        ]
      }
    },
    {
      line: 18,
      comment: "struct N *h = &a — 포인터 h가 리스트 첫 노드 a를 가리킴",
      variables: [
        { name: "h", type: "struct N*", value: "&a", highlight: true }
      ],
      relatedLines: [
        { line: 9, role: "read", label: "a 선언" }
      ],
      memory: {
        cells: [
          { id: "ptr_h", region: "stack", label: "h", value: "&a", highlight: true },
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&b}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=&c}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=&d}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: false }
        ],
        arrows: [
          { from: "ptr_h", to: "node_a", label: "h", highlight: true },
          { from: "node_a", to: "node_b", label: "a.n", highlight: false },
          { from: "node_b", to: "node_c", label: "b.n", highlight: false },
          { from: "node_c", to: "node_d", label: "c.n", highlight: false }
        ]
      }
    },
    {
      line: 19,
      comment: "struct N *t = h->n — h는 a이므로 h->n = a.n = &b, t가 b를 가리킴",
      variables: [
        { name: "h", type: "struct N*", value: "&a" },
        { name: "t", type: "struct N*", value: "&b", highlight: true }
      ],
      relatedLines: [
        { line: 10, role: "read", label: "b 선언" },
        { line: 13, role: "read", label: "a.n = &b 대입" }
      ],
      memory: {
        cells: [
          { id: "ptr_h", region: "stack", label: "h", value: "&a", highlight: false },
          { id: "ptr_t", region: "stack", label: "t", value: "&b", highlight: true },
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&b}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=&c}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=&d}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: false }
        ],
        arrows: [
          { from: "ptr_h", to: "node_a", label: "h", highlight: false },
          { from: "ptr_t", to: "node_b", label: "t", highlight: true },
          { from: "node_a", to: "node_b", label: "a.n", highlight: false },
          { from: "node_b", to: "node_c", label: "b.n", highlight: false },
          { from: "node_c", to: "node_d", label: "c.n", highlight: false }
        ]
      }
    },
    {
      line: 20,
      comment: "h->n = t->n — t는 &b이므로 t->n = b.n = &c. a.n을 &c로 변경 (a가 이제 c를 가리킴)",
      variables: [
        { name: "h", type: "struct N*", value: "&a" },
        { name: "t", type: "struct N*", value: "&b" },
        { name: "a.n", type: "struct N*", value: "&c", highlight: true }
      ],
      relatedLines: [
        { line: 9, role: "read", label: "a 선언" },
        { line: 11, role: "read", label: "c 선언" }
      ],
      memory: {
        cells: [
          { id: "ptr_h", region: "stack", label: "h", value: "&a", highlight: false },
          { id: "ptr_t", region: "stack", label: "t", value: "&b", highlight: false },
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&c}", highlight: true },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=&c}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=&d}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: false }
        ],
        arrows: [
          { from: "ptr_h", to: "node_a", label: "h", highlight: false },
          { from: "ptr_t", to: "node_b", label: "t", highlight: false },
          { from: "node_a", to: "node_c", label: "a.n (변경됨)", highlight: true },
          { from: "node_b", to: "node_c", label: "b.n", highlight: false },
          { from: "node_c", to: "node_d", label: "c.n", highlight: false }
        ]
      }
    },
    {
      line: 21,
      comment: "t->n = h — t는 &b, h는 &a이므로 b.n을 &a로 변경 (b가 이제 a를 가리킴)",
      variables: [
        { name: "h", type: "struct N*", value: "&a" },
        { name: "t", type: "struct N*", value: "&b" },
        { name: "b.n", type: "struct N*", value: "&a", highlight: true }
      ],
      relatedLines: [
        { line: 9, role: "read", label: "a 선언" },
        { line: 10, role: "read", label: "b 선언" }
      ],
      memory: {
        cells: [
          { id: "ptr_h", region: "stack", label: "h", value: "&a", highlight: false },
          { id: "ptr_t", region: "stack", label: "t", value: "&b", highlight: false },
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&c}", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=&a}", highlight: true },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=&d}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: false }
        ],
        arrows: [
          { from: "ptr_h", to: "node_a", label: "h", highlight: false },
          { from: "ptr_t", to: "node_b", label: "t", highlight: false },
          { from: "node_b", to: "node_a", label: "b.n (변경됨)", highlight: true },
          { from: "node_a", to: "node_c", label: "a.n", highlight: false },
          { from: "node_c", to: "node_d", label: "c.n", highlight: false }
        ]
      }
    },
    {
      line: 22,
      comment: "h = t — h를 &b로 변경. 리스트 시작이 b가 됨: b(1)→a(4)→c(6)→d(2)→NULL",
      variables: [
        { name: "h", type: "struct N*", value: "&b", highlight: true },
        { name: "t", type: "struct N*", value: "&b" }
      ],
      relatedLines: [
        { line: 18, role: "read", label: "h 선언" },
        { line: 19, role: "read", label: "t 선언" }
      ],
      memory: {
        cells: [
          { id: "ptr_h", region: "stack", label: "h", value: "&b", highlight: true },
          { id: "ptr_t", region: "stack", label: "t", value: "&b", highlight: false },
          { id: "node_b", region: "stack", label: "b", value: "{v=1, n=&a}", highlight: false },
          { id: "node_a", region: "stack", label: "a", value: "{v=4, n=&c}", highlight: false },
          { id: "node_c", region: "stack", label: "c", value: "{v=6, n=&d}", highlight: false },
          { id: "node_d", region: "stack", label: "d", value: "{v=2, n=NULL}", highlight: false }
        ],
        arrows: [
          { from: "ptr_h", to: "node_b", label: "h (변경됨)", highlight: true },
          { from: "node_b", to: "node_a", label: "b.n", highlight: false },
          { from: "node_a", to: "node_c", label: "a.n", highlight: false },
          { from: "node_c", to: "node_d", label: "c.n", highlight: false }
        ]
      }
    },
    {
      line: 24,
      comment: "printf — h->v=1, h->n->v=4, h->n->n->v=6, h->n->n->n->v=2 → 1462 출력",
      variables: [
        { name: "h->v", type: "int", value: 1, highlight: true },
        { name: "h->n->v", type: "int", value: 4, highlight: true },
        { name: "h->n->n->v", type: "int", value: 6, highlight: true },
        { name: "h->n->n->n->v", type: "int", value: 2, highlight: true }
      ],
      stdout: "1462",
      relatedLines: [
        { line: 4, role: "read", label: "v 필드 정의" },
        { line: 5, role: "read", label: "n 필드 정의" },
        { line: 18, role: "read", label: "h 포인터 선언" }
      ],
      memory: {
        cells: [
          { id: "ptr_h", region: "stack", label: "h", value: "&b", highlight: false },
          { id: "node_b", region: "stack", label: "b(1번째)", value: "{v=1, n=&a}", highlight: true },
          { id: "node_a", region: "stack", label: "a(2번째)", value: "{v=4, n=&c}", highlight: true },
          { id: "node_c", region: "stack", label: "c(3번째)", value: "{v=6, n=&d}", highlight: true },
          { id: "node_d", region: "stack", label: "d(4번째)", value: "{v=2, n=NULL}", highlight: true }
        ],
        arrows: [
          { from: "ptr_h", to: "node_b", label: "h", highlight: false },
          { from: "node_b", to: "node_a", label: "b.n", highlight: false },
          { from: "node_a", to: "node_c", label: "a.n", highlight: false },
          { from: "node_c", to: "node_d", label: "c.n", highlight: false }
        ]
      }
    }
  ],
};
