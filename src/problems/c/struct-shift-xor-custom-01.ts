import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

typedef struct {
    unsigned x;
    int k;
} P;

int main() {
    P a = {13, 2};
    P b = {7, 1};
    unsigned r = (a.x << a.k) | (b.x >> b.k);
    r = r ^ (a.x + b.k);
    printf("%u", r);
    return 0;
}`;

export const structShiftXorCustom01: Problem = {
  id: "struct-shift-xor-custom-01",
  slug: "struct-shift-xor-custom-01",
  title: "구조체 필드 시프트·OR·XOR",
  topic: "연산자",
  difficulty: "어려움",
  source: "커스텀-010",
  estimatedMinutes: 7,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "57",
  explanation: `여기서 많이 틀립니다: <<, >>, |, ^ 연산 우선순위를 왼쪽부터 단순 적용하거나, 시프트량을 필드 k에 맞추지 않습니다.

1) a.x << a.k = 13 << 2
   - 13 = 0b00001101, 좌측 2칸 이동 → 0b00110100 = 52

2) b.x >> b.k = 7 >> 1
   - 7 = 0b00000111, 우측 1칸 이동 → 0b00000011 = 3

3) r = 52 | 3
   - 0b00110100 | 0b00000011 = 0b00110111 = 55

4) a.x + b.k = 13 + 1 = 14

5) r = 55 ^ 14
   - 0b00110111 ^ 0b00001110 = 0b00111001 = 57

최종 출력: 57`,
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
      comment: "P a = {13, 2} — 구조체 a 초기화: x=13, k=2",
      variables: [
        { name: "a.x", type: "unsigned", value: 13, highlight: true },
        { name: "a.k", type: "int", value: 2, highlight: true }
      ],
      relatedLines: [
        { line: 3, role: "read", label: "P 구조체 정의" }
      ],
      memory: {
        cells: [
          { id: "stack_a_x", region: "stack", label: "a.x", value: "13", highlight: true },
          { id: "stack_a_k", region: "stack", label: "a.k", value: "2", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 10,
      comment: "P b = {7, 1} — 구조체 b 초기화: x=7, k=1",
      variables: [
        { name: "a.x", type: "unsigned", value: 13 },
        { name: "a.k", type: "int", value: 2 },
        { name: "b.x", type: "unsigned", value: 7, highlight: true },
        { name: "b.k", type: "int", value: 1, highlight: true }
      ],
      relatedLines: [
        { line: 3, role: "read", label: "P 구조체 정의" }
      ],
      memory: {
        cells: [
          { id: "stack_a_x", region: "stack", label: "a.x", value: "13", highlight: false },
          { id: "stack_a_k", region: "stack", label: "a.k", value: "2", highlight: false },
          { id: "stack_b_x", region: "stack", label: "b.x", value: "7", highlight: true },
          { id: "stack_b_k", region: "stack", label: "b.k", value: "1", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "a.x << a.k = 13 << 2 = 52 (이진: 1101 → 110100)",
      variables: [
        { name: "a.x", type: "unsigned", value: 13 },
        { name: "a.k", type: "int", value: 2 },
        { name: "a.x << a.k", type: "unsigned", value: 52, highlight: true }
      ],
      relatedLines: [
        { line: 9, role: "read", label: "a 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_a_x", region: "stack", label: "a.x", value: "13 (0b1101)", highlight: false },
          { id: "stack_tmp_shift_l", region: "stack", label: "13<<2", value: "52 (0b110100)", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "b.x >> b.k = 7 >> 1 = 3 (이진: 111 → 011)",
      variables: [
        { name: "b.x", type: "unsigned", value: 7 },
        { name: "b.k", type: "int", value: 1 },
        { name: "a.x << a.k", type: "unsigned", value: 52 },
        { name: "b.x >> b.k", type: "unsigned", value: 3, highlight: true }
      ],
      relatedLines: [
        { line: 10, role: "read", label: "b 선언" }
      ],
      memory: {
        cells: [
          { id: "stack_b_x", region: "stack", label: "b.x", value: "7 (0b111)", highlight: false },
          { id: "stack_tmp_shift_r", region: "stack", label: "7>>1", value: "3 (0b011)", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "52 | 3 = 55 (이진: 110100 | 000011 = 110111)",
      variables: [
        { name: "a.x << a.k", type: "unsigned", value: 52 },
        { name: "b.x >> b.k", type: "unsigned", value: 3 },
        { name: "52 | 3", type: "unsigned", value: 55, highlight: true }
      ],
      memory: {
        cells: [
          { id: "stack_tmp_or", region: "stack", label: "52|3", value: "55 (0b110111)", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 11,
      comment: "unsigned r = 55 — r에 OR 결과 저장",
      variables: [
        { name: "a.x", type: "unsigned", value: 13 },
        { name: "a.k", type: "int", value: 2 },
        { name: "b.x", type: "unsigned", value: 7 },
        { name: "b.k", type: "int", value: 1 },
        { name: "r", type: "unsigned", value: 55, highlight: true }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r", value: "55", highlight: true },
          { id: "stack_a_x", region: "stack", label: "a.x", value: "13", highlight: false },
          { id: "stack_b_x", region: "stack", label: "b.x", value: "7", highlight: false }
        ],
        arrows: []
      }
    },
    {
      line: 12,
      comment: "a.x + b.k = 13 + 1 = 14",
      variables: [
        { name: "a.x", type: "unsigned", value: 13 },
        { name: "b.k", type: "int", value: 1 },
        { name: "r", type: "unsigned", value: 55 },
        { name: "a.x + b.k", type: "int", value: 14, highlight: true }
      ],
      relatedLines: [
        { line: 9, role: "read", label: "a.x 값" },
        { line: 10, role: "read", label: "b.k 값" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r", value: "55", highlight: false },
          { id: "stack_tmp_add", region: "stack", label: "13+1", value: "14", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 12,
      comment: "r = 55 ^ 14 = 57 (이진: 110111 ^ 001110 = 111001)",
      variables: [
        { name: "a.x", type: "unsigned", value: 13 },
        { name: "a.k", type: "int", value: 2 },
        { name: "b.x", type: "unsigned", value: 7 },
        { name: "b.k", type: "int", value: 1 },
        { name: "r", type: "unsigned", value: 57, highlight: true }
      ],
      relatedLines: [
        { line: 11, role: "read", label: "r 이전 값 55" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r", value: "57 (0b111001)", highlight: true }
        ],
        arrows: []
      }
    },
    {
      line: 13,
      comment: "printf(\"%u\", 57) → 화면에 57 출력",
      variables: [
        { name: "r", type: "unsigned", value: 57, highlight: true }
      ],
      stdout: "57",
      relatedLines: [
        { line: 11, role: "read", label: "r 선언" },
        { line: 12, role: "read", label: "r 최종 대입" }
      ],
      memory: {
        cells: [
          { id: "stack_r", region: "stack", label: "r", value: "57", highlight: true }
        ],
        arrows: []
      }
    }
  ],
};
