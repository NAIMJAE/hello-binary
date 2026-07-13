import type { Problem } from "@/types/problem";

const code = `s = "TRACEPOINT"
a = s[::2]
b = s[1::2][::-1]
print("-".join([a, b, a[1:4]]))`;

export const strideSliceJoinCustom01: Problem = {
  id: "stride-slice-join-custom-01",
  slug: "stride-slice-join-custom-01",
  title: "짝·홀 인덱스 슬라이스와 join",
  topic: "슬라이싱",
  difficulty: "보통",
  source: "커스텀-003",
  estimatedMinutes: 7,
  prompt:
    "다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "TAEON-TIPCR-AEO",
  explanation: `여기서 많이 틀립니다: 인덱스를 1부터 세거나, a[1:4]의 끝 인덱스 4를 포함시킵니다.

인덱스 맵 (0-based):
T  R  A  C  E  P  O  I  N  T
0  1  2  3  4  5  6  7  8  9

2번 줄 s[::2]를 인덱스 한 칸씩 풀면:
1. start=0, step=2 → 짝수 인덱스만 수집
2. idx 0→T, idx 2→A, idx 4→E, idx 6→O, idx 8→N
   → a = "TAEON"

3번 줄 s[1::2][::-1]는 두 단계:
3. s[1::2]: start=1, step=2 → 홀수 인덱스
4. idx 1→R, idx 3→C, idx 5→P, idx 7→I, idx 9→T → "RCPIT"
5. "RCPIT"[::-1] → 뒤집기 → b = "TIPCR"

4번 줄:
6. a[1:4]: a="TAEON", 인덱스 1 이상 4 미만
7. idx 1→A, idx 2→E, idx 3→O → "AEO" (idx 4의 N은 제외)
8. [a, b, a[1:4]] = ["TAEON", "TIPCR", "AEO"]
9. "-".join(...) → TAEON-TIPCR-AEO`,
  traceSteps: [
    {
      line: 1,
      comment: "프로그램이 시작됩니다.",
      variables: [],
    },
    {
      line: 1,
      comment:
        "s = \"TRACEPOINT\". 인덱스: 0:T 1:R 2:A 3:C 4:E 5:P 6:O 7:I 8:N 9:T (총 10글자)",
      variables: [
        {
          name: "s",
          type: "str",
          value: "TRACEPOINT",
          highlight: true,
        },
      ],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment:
        "s[::2] — start=0, stop=끝, step=2 (짝수 인덱스만 수집). idx=0 → s[0]='T'",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "idx", type: "int", value: 0, highlight: true },
        { name: "a", type: "str", value: "T", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "0",
            highlight: true,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"T\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "idx=2 → s[2]='A'. a=\"TA\"",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "idx", type: "int", value: 2, highlight: true },
        { name: "a", type: "str", value: "TA", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "2",
            highlight: true,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TA\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "idx=4 → s[4]='E'. a=\"TAE\"",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "idx", type: "int", value: 4, highlight: true },
        { name: "a", type: "str", value: "TAE", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "4",
            highlight: true,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAE\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "idx=6 → s[6]='O'. a=\"TAEO\"",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "idx", type: "int", value: 6, highlight: true },
        { name: "a", type: "str", value: "TAEO", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "6",
            highlight: true,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEO\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 2,
      comment: "idx=8 → s[8]='N'. a = \"TAEON\" 완성",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "idx", type: "int", value: 8, highlight: true },
        { name: "a", type: "str", value: "TAEON", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "8",
            highlight: true,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment:
        "s[1::2] — start=1, step=2 (홀수 인덱스만 수집). idx=1 → s[1]='R'",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "a", type: "str", value: "TAEON" },
        { name: "idx", type: "int", value: 1, highlight: true },
        { name: "tmp", type: "str", value: "R", highlight: true },
      ],
      relatedLines: [
        { line: 1, role: "read", label: "s 선언" },
        { line: 2, role: "read", label: "a 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "1",
            highlight: true,
          },
          {
            id: "data_tmp",
            region: "data",
            label: "tmp",
            value: "\"R\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment: "idx=3 → s[3]='C'. tmp=\"RC\"",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "a", type: "str", value: "TAEON" },
        { name: "idx", type: "int", value: 3, highlight: true },
        { name: "tmp", type: "str", value: "RC", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "3",
            highlight: true,
          },
          {
            id: "data_tmp",
            region: "data",
            label: "tmp",
            value: "\"RC\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment: "idx=5 → s[5]='P'. tmp=\"RCP\"",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "a", type: "str", value: "TAEON" },
        { name: "idx", type: "int", value: 5, highlight: true },
        { name: "tmp", type: "str", value: "RCP", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "5",
            highlight: true,
          },
          {
            id: "data_tmp",
            region: "data",
            label: "tmp",
            value: "\"RCP\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment: "idx=7 → s[7]='I'. tmp=\"RCPI\"",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "a", type: "str", value: "TAEON" },
        { name: "idx", type: "int", value: 7, highlight: true },
        { name: "tmp", type: "str", value: "RCPI", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "7",
            highlight: true,
          },
          {
            id: "data_tmp",
            region: "data",
            label: "tmp",
            value: "\"RCPI\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment: "idx=9 → s[9]='T'. tmp = \"RCPIT\" 완성",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "a", type: "str", value: "TAEON" },
        { name: "idx", type: "int", value: 9, highlight: true },
        { name: "tmp", type: "str", value: "RCPIT", highlight: true },
      ],
      relatedLines: [{ line: 1, role: "read", label: "s 선언" }],
      memory: {
        cells: [
          {
            id: "data_s",
            region: "data",
            label: "s",
            value: "\"TRACEPOINT\"",
            highlight: false,
          },
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "9",
            highlight: true,
          },
          {
            id: "data_tmp",
            region: "data",
            label: "tmp",
            value: "\"RCPIT\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 3,
      comment:
        "\"RCPIT\"[::-1] → 뒤에서 앞으로 읽기: T←I←P←C←R → b = \"TIPCR\"",
      variables: [
        { name: "s", type: "str", value: "TRACEPOINT" },
        { name: "a", type: "str", value: "TAEON" },
        { name: "tmp", type: "str", value: "RCPIT" },
        { name: "b", type: "str", value: "TIPCR", highlight: true },
      ],
      relatedLines: [
        { line: 1, role: "read", label: "s 선언" },
        { line: 2, role: "read", label: "a 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "data_tmp",
            region: "data",
            label: "tmp",
            value: "\"RCPIT\"",
            highlight: false,
          },
          {
            id: "data_b",
            region: "data",
            label: "b",
            value: "\"TIPCR\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "a[1:4] 계산. a=\"TAEON\"에서 인덱스 1 이상 4 미만. idx=1 → a[1]='A'",
      variables: [
        { name: "a", type: "str", value: "TAEON" },
        { name: "b", type: "str", value: "TIPCR" },
        { name: "idx", type: "int", value: 1, highlight: true },
        {
          name: "a[1:4]",
          type: "str",
          value: "A",
          highlight: true,
        },
      ],
      relatedLines: [{ line: 2, role: "read", label: "a 선언" }],
      memory: {
        cells: [
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "data_b",
            region: "data",
            label: "b",
            value: "\"TIPCR\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "1",
            highlight: true,
          },
          {
            id: "data_a14",
            region: "data",
            label: "a[1:4]",
            value: "\"A\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment: "idx=2 → a[2]='E'. a[1:4]=\"AE\"",
      variables: [
        { name: "a", type: "str", value: "TAEON" },
        { name: "b", type: "str", value: "TIPCR" },
        { name: "idx", type: "int", value: 2, highlight: true },
        {
          name: "a[1:4]",
          type: "str",
          value: "AE",
          highlight: true,
        },
      ],
      relatedLines: [{ line: 2, role: "read", label: "a 선언" }],
      memory: {
        cells: [
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "data_b",
            region: "data",
            label: "b",
            value: "\"TIPCR\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "2",
            highlight: true,
          },
          {
            id: "data_a14",
            region: "data",
            label: "a[1:4]",
            value: "\"AE\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "idx=3 → a[3]='O'. a[1:4]=\"AEO\" 완성 (idx 4의 'N'은 포함하지 않음)",
      variables: [
        { name: "a", type: "str", value: "TAEON" },
        { name: "b", type: "str", value: "TIPCR" },
        { name: "idx", type: "int", value: 3, highlight: true },
        {
          name: "a[1:4]",
          type: "str",
          value: "AEO",
          highlight: true,
        },
      ],
      relatedLines: [{ line: 2, role: "read", label: "a 선언" }],
      memory: {
        cells: [
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "data_b",
            region: "data",
            label: "b",
            value: "\"TIPCR\"",
            highlight: false,
          },
          {
            id: "stack_idx",
            region: "stack",
            label: "idx",
            value: "3",
            highlight: true,
          },
          {
            id: "data_a14",
            region: "data",
            label: "a[1:4]",
            value: "\"AEO\"",
            highlight: true,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "[a, b, a[1:4]] = [\"TAEON\", \"TIPCR\", \"AEO\"] — 리스트를 만듭니다.",
      variables: [
        { name: "a", type: "str", value: "TAEON" },
        { name: "b", type: "str", value: "TIPCR" },
        { name: "a[1:4]", type: "str", value: "AEO" },
      ],
      relatedLines: [
        { line: 2, role: "read", label: "a 선언" },
        { line: 3, role: "read", label: "b 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "data_b",
            region: "data",
            label: "b",
            value: "\"TIPCR\"",
            highlight: false,
          },
          {
            id: "data_a14",
            region: "data",
            label: "a[1:4]",
            value: "\"AEO\"",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
    {
      line: 4,
      comment:
        "\"-\".join([\"TAEON\", \"TIPCR\", \"AEO\"]) → \"TAEON-TIPCR-AEO\" 출력",
      variables: [
        { name: "a", type: "str", value: "TAEON" },
        { name: "b", type: "str", value: "TIPCR" },
        { name: "a[1:4]", type: "str", value: "AEO" },
      ],
      stdout: "TAEON-TIPCR-AEO",
      relatedLines: [
        { line: 2, role: "read", label: "a 선언" },
        { line: 3, role: "read", label: "b 선언" },
      ],
      memory: {
        cells: [
          {
            id: "data_a",
            region: "data",
            label: "a",
            value: "\"TAEON\"",
            highlight: false,
          },
          {
            id: "data_b",
            region: "data",
            label: "b",
            value: "\"TIPCR\"",
            highlight: false,
          },
          {
            id: "data_a14",
            region: "data",
            label: "a[1:4]",
            value: "\"AEO\"",
            highlight: false,
          },
        ],
        arrows: [],
      },
    },
  ],
};
