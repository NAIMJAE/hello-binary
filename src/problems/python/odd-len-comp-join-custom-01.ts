import type { Problem } from "@/types/problem";

const code = `data = ["ab", "cde", "fg", "hij"]
t = [(w, len(w)) for w in data if len(w) % 2 == 1]
s = "".join(x[0][::-1] for x in t)
print(f"{s}{sum(x[1] for x in t)}")`;

export const oddLenCompJoinCustom01: Problem = {
  id: "odd-len-comp-join-custom-01",
  slug: "odd-len-comp-join-custom-01",
  title: "홀수 길이 필터 컴프리헨션과 join",
  topic: "컴프리헨션",
  difficulty: "보통",
  source: "커스텀-001",
  estimatedMinutes: 7,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "edcjih6",
  explanation: `여기서 많이 틀립니다: 짝수 길이를 남기거나, 역순을 단어 단위로만 적용한다고 착각합니다.

2번 줄 컴프리헨션을 for로 풀면:
1. t = [] (빈 리스트로 시작)
2. w="ab", len("ab")=2, 2%2==0 → 조건 거짓 → 버림
3. w="cde", len("cde")=3, 3%2==1 → 참 → ("cde", 3) 추가
4. w="fg", len("fg")=2, 2%2==0 → 버림
5. w="hij", len("hij")=3, 3%2==1 → 참 → ("hij", 3) 추가
   → t = [("cde", 3), ("hij", 3)]

3번 줄 join 생성기를 for로 풀면:
6. x=("cde",3) → x[0]="cde" → "cde"[::-1]="edc"
7. x=("hij",3) → x[0]="hij" → "hij"[::-1]="jih"
8. "".join("edc","jih") → s = "edcjih"

4번 줄 sum 생성기를 for로 풀면:
9. acc=0
10. x=("cde",3) → x[1]=3 → acc=0+3=3
11. x=("hij",3) → x[1]=3 → acc=3+3=6
12. f"{s}{6}" → "edcjih"+"6" → print("edcjih6")`,
  traceSteps: [
    {
      line: 1,
      comment: "프로그램이 시작됩니다.",
      variables: [],
    },
    {
      line: 1,
      comment:
        "data = [\"ab\", \"cde\", \"fg\", \"hij\"] — 문자열 4개짜리 리스트를 생성합니다.",
      variables: [
        {
          name: "data",
          type: "list",
          value: ["ab", "cde", "fg", "hij"],
          highlight: true,
        },
      ],
      memory: {
        cells: [
          {
            id: "data_data",
            region: "data",
            label: "data",
            value: "[\"ab\",\"cde\",\"fg\",\"hij\"]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment:
        "리스트 컴프리헨션 시작. 가상 for: for w in data → if len(w)%2==1 → (w, len(w)). t=[]로 초기화합니다.",
      variables: [
        {
          name: "data",
          type: "list",
          value: ["ab", "cde", "fg", "hij"],
        },
        { name: "t", type: "list", value: [], highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "data 선언" }],
      memory: {
        cells: [
          {
            id: "data_data",
            region: "data",
            label: "data",
            value: "[\"ab\",\"cde\",\"fg\",\"hij\"]",
            highlight: false,
          },
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment:
        "w=\"ab\", len(\"ab\")=2, 2%2==0 → 조건 거짓. t에 넣지 않고 건너뜁니다.",
      variables: [
        {
          name: "data",
          type: "list",
          value: ["ab", "cde", "fg", "hij"],
        },
        { name: "w", type: "str", value: "ab", highlight: true },
        { name: "t", type: "list", value: [] },
      ],
      relatedLines: [{ line: 1, role: "read", label: "data 선언" }],
      memory: {
        cells: [
          {
            id: "data_data",
            region: "data",
            label: "data",
            value: "[\"ab\",\"cde\",\"fg\",\"hij\"]",
            highlight: false,
          },
          {
            id: "stack_w",
            region: "stack",
            label: "w",
            value: "\"ab\"",
            highlight: true,
          },
          {
            id: "data_t",
            region: "data",
            label: "t",
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
        "w=\"cde\", len(\"cde\")=3, 3%2==1 → 조건 참. (\"cde\", 3)을 t에 추가합니다.",
      variables: [
        {
          name: "data",
          type: "list",
          value: ["ab", "cde", "fg", "hij"],
        },
        { name: "w", type: "str", value: "cde", highlight: true },
        {
          name: "t",
          type: "list",
          value: "[(\"cde\", 3)]",
          highlight: true,
        },
      ],
      relatedLines: [{ line: 1, role: "read", label: "data 선언" }],
      memory: {
        cells: [
          {
            id: "data_data",
            region: "data",
            label: "data",
            value: "[\"ab\",\"cde\",\"fg\",\"hij\"]",
            highlight: false,
          },
          {
            id: "stack_w",
            region: "stack",
            label: "w",
            value: "\"cde\"",
            highlight: true,
          },
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[(cde,3)]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "w=\"fg\", len(\"fg\")=2, 2%2==0 → 조건 거짓. 건너뜁니다.",
      variables: [
        {
          name: "data",
          type: "list",
          value: ["ab", "cde", "fg", "hij"],
        },
        { name: "w", type: "str", value: "fg", highlight: true },
        { name: "t", type: "list", value: "[(\"cde\", 3)]" },
      ],
      relatedLines: [{ line: 1, role: "read", label: "data 선언" }],
      memory: {
        cells: [
          {
            id: "data_data",
            region: "data",
            label: "data",
            value: "[\"ab\",\"cde\",\"fg\",\"hij\"]",
            highlight: false,
          },
          {
            id: "stack_w",
            region: "stack",
            label: "w",
            value: "\"fg\"",
            highlight: true,
          },
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[(cde,3)]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment:
        "w=\"hij\", len(\"hij\")=3, 3%2==1 → 참. (\"hij\", 3) 추가. t = [(\"cde\", 3), (\"hij\", 3)] 완성",
      variables: [
        {
          name: "data",
          type: "list",
          value: ["ab", "cde", "fg", "hij"],
        },
        { name: "w", type: "str", value: "hij", highlight: true },
        {
          name: "t",
          type: "list",
          value: "[(\"cde\", 3), (\"hij\", 3)]",
          highlight: true,
        },
      ],
      relatedLines: [{ line: 1, role: "read", label: "data 선언" }],
      memory: {
        cells: [
          {
            id: "data_data",
            region: "data",
            label: "data",
            value: "[\"ab\",\"cde\",\"fg\",\"hij\"]",
            highlight: false,
          },
          {
            id: "stack_w",
            region: "stack",
            label: "w",
            value: "\"hij\"",
            highlight: true,
          },
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[(cde,3),(hij,3)]",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment:
        "\"\".join 생성기 시작. 가상 for: for x in t → x[0][::-1]을 수집하여 이어 붙입니다.",
      variables: [
        {
          name: "t",
          type: "list",
          value: "[(\"cde\", 3), (\"hij\", 3)]",
        },
      ],
      relatedLines: [{ line: 2, role: "read", label: "t 선언" }],
      memory: {
        cells: [
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[(cde,3),(hij,3)]",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment:
        "x=(\"cde\", 3). x[0]=\"cde\" → \"cde\"[::-1]=\"edc\" (한 글자씩 뒤에서 앞으로)",
      variables: [
        {
          name: "t",
          type: "list",
          value: "[(\"cde\", 3), (\"hij\", 3)]",
        },
        {
          name: "x",
          type: "tuple",
          value: "(\"cde\", 3)",
          highlight: true,
        },
        {
          name: "x[0][::-1]",
          type: "str",
          value: "edc",
          highlight: true,
        },
      ],
      relatedLines: [{ line: 2, role: "read", label: "t 선언" }],
      memory: {
        cells: [
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[(cde,3),(hij,3)]",
            highlight: false,
          },
          {
            id: "stack_x",
            region: "stack",
            label: "x",
            value: "(cde,3)",
            highlight: true,
          },
          {
            id: "data_rev",
            region: "data",
            label: "x[0][::-1]",
            value: "\"edc\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment:
        "x=(\"hij\", 3). x[0]=\"hij\" → \"hij\"[::-1]=\"jih\"",
      variables: [
        {
          name: "t",
          type: "list",
          value: "[(\"cde\", 3), (\"hij\", 3)]",
        },
        {
          name: "x",
          type: "tuple",
          value: "(\"hij\", 3)",
          highlight: true,
        },
        {
          name: "x[0][::-1]",
          type: "str",
          value: "jih",
          highlight: true,
        },
      ],
      relatedLines: [{ line: 2, role: "read", label: "t 선언" }],
      memory: {
        cells: [
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[(cde,3),(hij,3)]",
            highlight: false,
          },
          {
            id: "stack_x",
            region: "stack",
            label: "x",
            value: "(hij,3)",
            highlight: true,
          },
          {
            id: "data_rev",
            region: "data",
            label: "x[0][::-1]",
            value: "\"jih\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment:
        "\"\".join(\"edc\", \"jih\") → s = \"edcjih\". 구분자 없이 이어 붙입니다.",
      variables: [
        {
          name: "t",
          type: "list",
          value: "[(\"cde\", 3), (\"hij\", 3)]",
        },
        { name: "s", type: "str", value: "edcjih", highlight: true },
      ],
      relatedLines: [{ line: 2, role: "read", label: "t 선언" }],
      memory: {
        cells: [
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[(cde,3),(hij,3)]",
            highlight: false,
          },
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"edcjih\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "sum(x[1] for x in t) 시작. 가상 for: for x in t → x[1](길이)을 누적합니다. acc=0",
      variables: [
        { name: "s", type: "str", value: "edcjih" },
        {
          name: "t",
          type: "list",
          value: "[(\"cde\", 3), (\"hij\", 3)]",
        },
        { name: "acc", type: "int", value: 0, highlight: true },
      ],
      relatedLines: [
        { line: 2, role: "read", label: "t 선언" },
        { line: 3, role: "read", label: "s 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"edcjih\"",
            highlight: false,
          },
          {
            id: "data_t",
            region: "data",
            label: "t",
            value: "[(cde,3),(hij,3)]",
            highlight: false,
          },
          {
            id: "stack_acc",
            region: "stack",
            label: "acc",
            value: "0",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment: "x=(\"cde\", 3), x[1]=3 → acc = 0 + 3 = 3",
      variables: [
        { name: "s", type: "str", value: "edcjih" },
        {
          name: "x",
          type: "tuple",
          value: "(\"cde\", 3)",
          highlight: true,
        },
        { name: "acc", type: "int", value: 3, highlight: true },
      ],
      relatedLines: [
        { line: 2, role: "read", label: "t 선언" },
        { line: 3, role: "read", label: "s 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"edcjih\"",
            highlight: false,
          },
          {
            id: "stack_x",
            region: "stack",
            label: "x",
            value: "(cde,3)",
            highlight: true,
          },
          {
            id: "stack_acc",
            region: "stack",
            label: "acc",
            value: "3",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment: "x=(\"hij\", 3), x[1]=3 → acc = 3 + 3 = 6",
      variables: [
        { name: "s", type: "str", value: "edcjih" },
        {
          name: "x",
          type: "tuple",
          value: "(\"hij\", 3)",
          highlight: true,
        },
        { name: "acc", type: "int", value: 6, highlight: true },
      ],
      relatedLines: [
        { line: 2, role: "read", label: "t 선언" },
        { line: 3, role: "read", label: "s 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"edcjih\"",
            highlight: false,
          },
          {
            id: "stack_x",
            region: "stack",
            label: "x",
            value: "(hij,3)",
            highlight: true,
          },
          {
            id: "stack_acc",
            region: "stack",
            label: "acc",
            value: "6",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "f\"{s}{sum(...)}\" → f\"edcjih{6}\" → \"edcjih6\" 출력",
      variables: [
        { name: "s", type: "str", value: "edcjih" },
        { name: "acc", type: "int", value: 6 },
      ],
      stdout: "edcjih6",
      relatedLines: [
        { line: 2, role: "read", label: "t 선언" },
        { line: 3, role: "read", label: "s 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"edcjih\"",
            highlight: false,
          },
          {
            id: "stack_acc",
            region: "stack",
            label: "acc",
            value: "6",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
  ],
};
