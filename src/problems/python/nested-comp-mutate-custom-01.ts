import type { Problem } from "@/types/problem";

const code = `rows = [[i, i + 1] for i in range(1, 4)]
out = [v for r in rows for v in r if v % 2 == 0]
rows[1].append(out[0])
print("".join(str(x) for x in out), len(rows[1]), sep="-")`;

export const nestedCompMutateCustom01: Problem = {
  id: "nested-comp-mutate-custom-01",
  slug: "nested-comp-mutate-custom-01",
  title: "이중 컴프리헨션과 원본 리스트 변형",
  topic: "컴프리헨션",
  difficulty: "어려움",
  source: "커스텀-002",
  estimatedMinutes: 8,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "224-3",
  explanation: `여기서 많이 틀립니다: out이 rows와 같은 참조라 append 후 out도 바뀐다고 착각합니다. 또한 이중 for의 순서(바깥 r → 안쪽 v)를 뒤집는 실수도 흔합니다.

1번 줄 컴프리헨션을 for로 풀면:
1. range(1,4) → i=1, 2, 3 순서
2. i=1 → [1, 1+1] = [1, 2]
3. i=2 → [2, 2+1] = [2, 3]
4. i=3 → [3, 3+1] = [3, 4]
   → rows = [[1, 2], [2, 3], [3, 4]]

2번 줄 이중 for를 풀면 (바깥 r → 안쪽 v):
5. r=[1,2]: v=1, 1%2!=0 → 버림
6. r=[1,2]: v=2, 2%2==0 → out에 2 추가
7. r=[2,3]: v=2, 짝수 → 추가
8. r=[2,3]: v=3, 홀수 → 버림
9. r=[3,4]: v=3, 홀수 → 버림
10. r=[3,4]: v=4, 짝수 → 추가
    → out = [2, 2, 4] (새 리스트, rows와 별개 객체)

3번 줄:
11. out[0]=2 (정수 값). rows[1].append(2) → rows[1]=[2,3,2]
12. out은 그대로 [2,2,4] (참조 공유 아님)

4번 줄 join 생성기를 for로 풀면:
13. x=2 → str(2)="2", x=2 → "2", x=4 → "4"
14. "".join → "224"
15. len(rows[1])=len([2,3,2])=3
16. print("224", 3, sep="-") → 224-3`,
  traceSteps: [
    {
      line: 1,
      comment: "프로그램이 시작됩니다.",
      variables: [],
    },
    {
      line: 1,
      comment:
        "range(1, 4) 컴프리헨션 시작. 가상 for: for i in range(1,4) → [i, i+1]. rows=[]로 초기화합니다.",
      variables: [
        { name: "rows", type: "list", value: [], highlight: true },
      ],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 1,
      comment: "i=1 → [1, 1+1] = [1, 2]를 rows에 추가합니다.",
      variables: [
        { name: "i", type: "int", value: 1, highlight: true },
        {
          name: "rows",
          type: "list",
          value: [[1, 2]],
          highlight: true,
        },
      ],
      memory: {
        cells: [
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "1",
            highlight: true,
          },
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2]]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 1,
      comment: "i=2 → [2, 3] 추가",
      variables: [
        { name: "i", type: "int", value: 2, highlight: true },
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3]],
          highlight: true,
        },
      ],
      memory: {
        cells: [
          {
            id: "stack_i",
            region: "stack",
            label: "i",
            value: "2",
            highlight: true,
          },
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3]]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 1,
      comment:
        "i=3 → [3, 4] 추가. rows = [[1,2],[2,3],[3,4]] 완성",
      variables: [
        { name: "i", type: "int", value: 3, highlight: true },
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
          highlight: true,
        },
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
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment:
        "이중 컴프리헨션 시작. 가상 for: for r in rows → for v in r → if v%2==0. out=[]로 초기화합니다.",
      variables: [
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
        },
        { name: "out", type: "list", value: [], highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "rows 선언" }],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: false,
          },
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "r=[1, 2], v=1. 1%2!=0 → 홀수, 버림",
      variables: [
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
        },
        { name: "r", type: "list", value: [1, 2], highlight: true },
        { name: "v", type: "int", value: 1, highlight: true },
        { name: "out", type: "list", value: [] },
      ],
      relatedLines: [{ line: 1, role: "read", label: "rows 선언" }],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: false,
          },
          {
            id: "stack_r",
            region: "stack",
            label: "r",
            value: "[1, 2]",
            highlight: true,
          },
          {
            id: "stack_v",
            region: "stack",
            label: "v",
            value: "1",
            highlight: true,
          },
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment:
        "같은 r=[1,2]에서 v=2. 2%2==0 → 짝수. out에 2 추가 → out=[2]",
      variables: [
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
        },
        { name: "r", type: "list", value: [1, 2] },
        { name: "v", type: "int", value: 2, highlight: true },
        { name: "out", type: "list", value: [2], highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "rows 선언" }],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: false,
          },
          {
            id: "stack_r",
            region: "stack",
            label: "r",
            value: "[1, 2]",
            highlight: false,
          },
          {
            id: "stack_v",
            region: "stack",
            label: "v",
            value: "2",
            highlight: true,
          },
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "바깥 r=[2, 3]으로 전환. v=2, 2%2==0 → 짝수. out=[2, 2]",
      variables: [
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
        },
        { name: "r", type: "list", value: [2, 3], highlight: true },
        { name: "v", type: "int", value: 2, highlight: true },
        {
          name: "out",
          type: "list",
          value: [2, 2],
          highlight: true,
        },
      ],
      relatedLines: [{ line: 1, role: "read", label: "rows 선언" }],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: false,
          },
          {
            id: "stack_r",
            region: "stack",
            label: "r",
            value: "[2, 3]",
            highlight: true,
          },
          {
            id: "stack_v",
            region: "stack",
            label: "v",
            value: "2",
            highlight: true,
          },
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "같은 r=[2,3]에서 v=3. 3%2!=0 → 홀수, 버림",
      variables: [
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
        },
        { name: "r", type: "list", value: [2, 3] },
        { name: "v", type: "int", value: 3, highlight: true },
        { name: "out", type: "list", value: [2, 2] },
      ],
      relatedLines: [{ line: 1, role: "read", label: "rows 선언" }],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: false,
          },
          {
            id: "stack_r",
            region: "stack",
            label: "r",
            value: "[2, 3]",
            highlight: false,
          },
          {
            id: "stack_v",
            region: "stack",
            label: "v",
            value: "3",
            highlight: true,
          },
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "바깥 r=[3, 4]으로 전환. v=3, 3%2!=0 → 홀수, 버림",
      variables: [
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
        },
        { name: "r", type: "list", value: [3, 4], highlight: true },
        { name: "v", type: "int", value: 3, highlight: true },
        { name: "out", type: "list", value: [2, 2] },
      ],
      relatedLines: [{ line: 1, role: "read", label: "rows 선언" }],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: false,
          },
          {
            id: "stack_r",
            region: "stack",
            label: "r",
            value: "[3, 4]",
            highlight: true,
          },
          {
            id: "stack_v",
            region: "stack",
            label: "v",
            value: "3",
            highlight: true,
          },
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment:
        "v=4, 4%2==0 → 짝수. out에 4 추가. out = [2, 2, 4] 완성 (rows와 별개 객체)",
      variables: [
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
        },
        { name: "r", type: "list", value: [3, 4] },
        { name: "v", type: "int", value: 4, highlight: true },
        {
          name: "out",
          type: "list",
          value: [2, 2, 4],
          highlight: true,
        },
      ],
      relatedLines: [{ line: 1, role: "read", label: "rows 선언" }],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: false,
          },
          {
            id: "stack_v",
            region: "stack",
            label: "v",
            value: "4",
            highlight: true,
          },
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2, 4]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment:
        "out[0]=2 (정수 값). rows[1]은 현재 [2, 3]. append할 준비를 합니다.",
      variables: [
        { name: "out", type: "list", value: [2, 2, 4] },
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3], [3, 4]],
        },
      ],
      relatedLines: [
        { line: 1, role: "read", label: "rows 선언" },
        { line: 2, role: "read", label: "out 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2, 4]",
            highlight: false,
          },
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3],[3,4]]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment:
        "rows[1].append(2) → rows[1]=[2, 3, 2]. out은 그대로 [2, 2, 4] (참조 공유 아님)",
      variables: [
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3, 2], [3, 4]],
          highlight: true,
        },
        { name: "out", type: "list", value: [2, 2, 4] },
      ],
      relatedLines: [
        { line: 1, role: "read", label: "rows 선언" },
        { line: 2, role: "read", label: "out 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3,2],[3,4]]",
            highlight: true,
          },
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2, 4]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "\"\".join(str(x) for x in out) 시작. 가상 for: for x in out → str(x) 수집.",
      variables: [
        { name: "out", type: "list", value: [2, 2, 4] },
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3, 2], [3, 4]],
        },
      ],
      relatedLines: [
        { line: 2, role: "read", label: "out 선언" },
        { line: 1, role: "read", label: "rows 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2, 4]",
            highlight: false,
          },
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3,2],[3,4]]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment: "x=2 (out의 첫 번째). str(2)=\"2\"",
      variables: [
        { name: "out", type: "list", value: [2, 2, 4] },
        { name: "x", type: "int", value: 2, highlight: true },
        { name: "str(x)", type: "str", value: "2", highlight: true },
      ],
      relatedLines: [{ line: 2, role: "read", label: "out 선언" }],
      memory: {
        cells: [
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2, 4]",
            highlight: false,
          },
          {
            id: "stack_x",
            region: "stack",
            label: "x",
            value: "2",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment: "x=2 (out의 두 번째). str(2)=\"2\" — 값이 같지만 별도 원소입니다.",
      variables: [
        { name: "out", type: "list", value: [2, 2, 4] },
        { name: "x", type: "int", value: 2 },
        { name: "str(x)", type: "str", value: "2" },
      ],
      relatedLines: [{ line: 2, role: "read", label: "out 선언" }],
      memory: {
        cells: [
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2, 4]",
            highlight: false,
          },
          {
            id: "stack_x",
            region: "stack",
            label: "x",
            value: "2",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment: "x=4. str(4)=\"4\"",
      variables: [
        { name: "out", type: "list", value: [2, 2, 4] },
        { name: "x", type: "int", value: 4, highlight: true },
        { name: "str(x)", type: "str", value: "4", highlight: true },
      ],
      relatedLines: [{ line: 2, role: "read", label: "out 선언" }],
      memory: {
        cells: [
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2, 4]",
            highlight: false,
          },
          {
            id: "stack_x",
            region: "stack",
            label: "x",
            value: "4",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "\"\".join(\"2\",\"2\",\"4\") → \"224\"",
      variables: [
        { name: "out", type: "list", value: [2, 2, 4] },
        { name: "result", type: "str", value: "224", highlight: true },
      ],
      relatedLines: [{ line: 2, role: "read", label: "out 선언" }],
      memory: {
        cells: [
          {
            id: "data_out",
            region: "data",
            label: "out",
            value: "[2, 2, 4]",
            highlight: false,
          },
          {
            id: "data_result",
            region: "data",
            label: "result",
            value: "\"224\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "len(rows[1])=len([2,3,2])=3. print(\"224\", 3, sep=\"-\") → 224-3",
      variables: [
        { name: "result", type: "str", value: "224" },
        {
          name: "rows",
          type: "list",
          value: [[1, 2], [2, 3, 2], [3, 4]],
        },
        {
          name: "len(rows[1])",
          type: "int",
          value: 3,
          highlight: true,
        },
      ],
      stdout: "224-3",
      relatedLines: [
        { line: 1, role: "read", label: "rows 선언" },
        { line: 2, role: "read", label: "out 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_result",
            region: "data",
            label: "result",
            value: "\"224\"",
            highlight: false,
          },
          {
            id: "data_rows",
            region: "data",
            label: "rows",
            value: "[[1,2],[2,3,2],[3,4]]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
  ],
};
