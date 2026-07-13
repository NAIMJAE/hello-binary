import type { Problem } from "@/types/problem";

const code = `public class Main {
    static int f(int n) {
        if (n <= 1) {
            return 1;
        }
        return n + f(n - 2);
    }

    static int f(String s) {
        return f(s.length()) - s.length();
    }

    public static void main(String[] args) {
        System.out.print(f("abcd") + f(5));
    }
}`;

export const overloadRecursiveCustom01: Problem = {
  id: "overload-recursive-custom-01",
  slug: "overload-recursive-custom-01",
  title: "오버로드된 재귀 (int / String)",
  topic: "재귀",
  difficulty: "어려움",
  source: "커스텀-017",
  estimatedMinutes: 7,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "12",
  explanation: `여기서 많이 틀립니다: f("abcd")를 길이 4로만 답하거나, f(int)를 팩토리얼 패턴(n-1)으로 계산합니다.

내려가기 — f("abcd"):
1. f(String) 진입: s="abcd", s.length()=4 → f(4) - 4 계산. f(4) 결과 대기
2. f(4): 4>1 → return 4 + f(2). f(2) 결과 대기
3. f(2): 2>1 → return 2 + f(0). f(0) 결과 대기
4. f(0): 0<=1 → return 1 (베이스 케이스)

올라가기 — f("abcd"):
5. f(2) = 2 + 1 = 3
6. f(4) = 4 + 3 = 7
7. f("abcd") = 7 - 4 = 3

내려가기 — f(5):
8. f(5): 5>1 → return 5 + f(3). f(3) 결과 대기
9. f(3): 3>1 → return 3 + f(1). f(1) 결과 대기
10. f(1): 1<=1 → return 1 (베이스 케이스)

올라가기 — f(5):
11. f(3) = 3 + 1 = 4
12. f(5) = 5 + 4 = 9

최종: 3 + 9 = 12`,
  traceSteps: [
    {
      "line": 13,
      "comment": "main() 메서드가 시작됩니다.",
      "variables": [],
      "memory": {
        "cells": [],
        "arrows": []
      }
    },
    {
      "line": 14,
      "comment": "f(\"abcd\") + f(5)를 평가합니다. 먼저 f(\"abcd\")를 실행해야 합니다.",
      "variables": [],
      "relatedLines": [
        { "line": 9, "role": "definition", "label": "f(String) 정의" },
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [],
        "arrows": []
      }
    },
    {
      "line": 9,
      "comment": "[F0] f(String) 진입 — s = \"abcd\"가 매개변수로 전달됩니다. 인자가 String이므로 f(String) 오버로드가 선택됩니다.",
      "variables": [
        { "name": "s", "type": "String", "value": "\"abcd\"", "highlight": true }
      ],
      "relatedLines": [
        { "line": 14, "role": "call", "label": "main에서 f 실행" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_s", "region": "stack", "label": "s", "value": "\"abcd\"", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 10,
      "comment": "[F0] s.length() = 4. return f(4) - 4 → f(4)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"? - 4\" 형태로 대기합니다.",
      "variables": [
        { "name": "s", "type": "String", "value": "\"abcd\"" },
        { "name": "s.length()", "type": "int", "value": 4, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_s", "region": "stack", "label": "s", "value": "\"abcd\"", "highlight": false },
          { "id": "stack_len", "region": "stack", "label": "s.length()", "value": "4", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F1] f(int) 진입 — n = 4. 인자가 int이므로 f(int) 오버로드가 선택됩니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 4, "highlight": true }
      ],
      "relatedLines": [
        { "line": 10, "role": "call", "label": "F0에서 f 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "4", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "[F1] n <= 1? → 4 <= 1 → 거짓. 베이스 케이스가 아니므로 6번 줄로 갑니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 4 },
        { "name": "n <= 1", "type": "boolean", "value": false, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "4", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F1] return 4 + f(4 - 2) → f(2)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"4 + ?\" 형태로 대기합니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 4 },
        { "name": "n - 2", "type": "int", "value": 2, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "4", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F2] f(int) 진입 — n = 2",
      "variables": [
        { "name": "n", "type": "int", "value": 2, "highlight": true }
      ],
      "relatedLines": [
        { "line": 6, "role": "call", "label": "F1에서 f 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "2", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "[F2] n <= 1? → 2 <= 1 → 거짓. 베이스 케이스가 아니므로 6번 줄로 갑니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 2 },
        { "name": "n <= 1", "type": "boolean", "value": false, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "2", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F2] return 2 + f(2 - 2) → f(0)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"2 + ?\" 형태로 대기합니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 2 },
        { "name": "n - 2", "type": "int", "value": 0, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "2", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F3] f(int) 진입 — n = 0",
      "variables": [
        { "name": "n", "type": "int", "value": 0, "highlight": true }
      ],
      "relatedLines": [
        { "line": 6, "role": "call", "label": "F2에서 f 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "0", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "[F3] n <= 1? → 0 <= 1 → 참! 베이스 케이스에 도달했습니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 0 },
        { "name": "n <= 1", "type": "boolean", "value": true, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "0", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "[F3] return 1 — 베이스 케이스입니다. 이제 대기 중이던 프레임들로 거슬러 올라갑니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 0 },
        { "name": "f반환", "type": "int", "value": 1, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "0", "highlight": false },
          { "id": "stack_f_ret", "region": "stack", "label": "f반환", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F2 복귀] f(0) = 1이 돌아왔습니다. n + f(0) = 2 + 1 = 3 → F2는 3을 반환합니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 2, "highlight": true },
        { "name": "f반환", "type": "int", "value": 3, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "2", "highlight": true },
          { "id": "stack_f_ret", "region": "stack", "label": "f반환", "value": "3", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F1 복귀] f(2) = 3이 돌아왔습니다. n + f(2) = 4 + 3 = 7 → F1은 7을 반환합니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 4, "highlight": true },
        { "name": "f반환", "type": "int", "value": 7, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "4", "highlight": true },
          { "id": "stack_f_ret", "region": "stack", "label": "f반환", "value": "7", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 10,
      "comment": "[F0 복귀] f(4) = 7이 돌아왔습니다. f(4) - s.length() = 7 - 4 = 3 → f(\"abcd\") = 3",
      "variables": [
        { "name": "s", "type": "String", "value": "\"abcd\"" },
        { "name": "s.length()", "type": "int", "value": 4 },
        { "name": "f반환", "type": "int", "value": 3, "highlight": true }
      ],
      "relatedLines": [
        { "line": 9, "role": "definition", "label": "f(String) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_s", "region": "stack", "label": "s", "value": "\"abcd\"", "highlight": false },
          { "id": "stack_f_ret", "region": "stack", "label": "f반환", "value": "3", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 14,
      "comment": "f(\"abcd\") = 3 확정. 이제 f(5)를 실행합니다. 인자가 int이므로 f(int) 오버로드가 선택됩니다.",
      "variables": [
        { "name": "f(\"abcd\") 결과", "type": "int", "value": 3, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_fabcd", "region": "stack", "label": "f(\"abcd\") 결과", "value": "3", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F4] f(int) 진입 — n = 5",
      "variables": [
        { "name": "n", "type": "int", "value": 5, "highlight": true }
      ],
      "relatedLines": [
        { "line": 14, "role": "call", "label": "main에서 f 실행" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_fabcd", "region": "stack", "label": "f(\"abcd\") 결과", "value": "3", "highlight": false },
          { "id": "stack_n", "region": "stack", "label": "n", "value": "5", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "[F4] n <= 1? → 5 <= 1 → 거짓. 6번 줄로 갑니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 5 },
        { "name": "n <= 1", "type": "boolean", "value": false, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_fabcd", "region": "stack", "label": "f(\"abcd\") 결과", "value": "3", "highlight": false },
          { "id": "stack_n", "region": "stack", "label": "n", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F4] return 5 + f(5 - 2) → f(3)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"5 + ?\" 형태로 대기합니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 5 },
        { "name": "n - 2", "type": "int", "value": 3, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_fabcd", "region": "stack", "label": "f(\"abcd\") 결과", "value": "3", "highlight": false },
          { "id": "stack_n", "region": "stack", "label": "n", "value": "5", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F5] f(int) 진입 — n = 3",
      "variables": [
        { "name": "n", "type": "int", "value": 3, "highlight": true }
      ],
      "relatedLines": [
        { "line": 6, "role": "call", "label": "F4에서 f 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "3", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "[F5] n <= 1? → 3 <= 1 → 거짓. 6번 줄로 갑니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 3 },
        { "name": "n <= 1", "type": "boolean", "value": false, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "3", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F5] return 3 + f(3 - 2) → f(1)의 결과를 먼저 구해야 합니다. 현재 프레임은 \"3 + ?\" 형태로 대기합니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 3 },
        { "name": "n - 2", "type": "int", "value": 1, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "3", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 2,
      "comment": "[F6] f(int) 진입 — n = 1",
      "variables": [
        { "name": "n", "type": "int", "value": 1, "highlight": true }
      ],
      "relatedLines": [
        { "line": 6, "role": "call", "label": "F5에서 f 재귀" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 3,
      "comment": "[F6] n <= 1? → 1 <= 1 → 참! 베이스 케이스에 도달했습니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 1 },
        { "name": "n <= 1", "type": "boolean", "value": true, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "1", "highlight": false }
        ],
        "arrows": []
      }
    },
    {
      "line": 4,
      "comment": "[F6] return 1 — 베이스 케이스입니다. 대기 중이던 프레임들로 거슬러 올라갑니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 1 },
        { "name": "f반환", "type": "int", "value": 1, "highlight": true }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "1", "highlight": false },
          { "id": "stack_f_ret", "region": "stack", "label": "f반환", "value": "1", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F5 복귀] f(1) = 1이 돌아왔습니다. n + f(1) = 3 + 1 = 4 → F5는 4를 반환합니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 3, "highlight": true },
        { "name": "f반환", "type": "int", "value": 4, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_n", "region": "stack", "label": "n", "value": "3", "highlight": true },
          { "id": "stack_f_ret", "region": "stack", "label": "f반환", "value": "4", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 6,
      "comment": "[F4 복귀] f(3) = 4가 돌아왔습니다. n + f(3) = 5 + 4 = 9 → F4는 9를 반환합니다.",
      "variables": [
        { "name": "n", "type": "int", "value": 5, "highlight": true },
        { "name": "f반환", "type": "int", "value": 9, "highlight": true }
      ],
      "relatedLines": [
        { "line": 2, "role": "definition", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_fabcd", "region": "stack", "label": "f(\"abcd\") 결과", "value": "3", "highlight": false },
          { "id": "stack_n", "region": "stack", "label": "n", "value": "5", "highlight": true },
          { "id": "stack_f_ret", "region": "stack", "label": "f반환", "value": "9", "highlight": true }
        ],
        "arrows": []
      }
    },
    {
      "line": 14,
      "comment": "f(\"abcd\") = 3, f(5) = 9. 3 + 9 = 12 출력",
      "variables": [
        { "name": "f(\"abcd\") 결과", "type": "int", "value": 3 },
        { "name": "f(5) 결과", "type": "int", "value": 9 },
        { "name": "결과", "type": "int", "value": 12, "highlight": true }
      ],
      "stdout": "12",
      "relatedLines": [
        { "line": 9, "role": "read", "label": "f(String) 정의" },
        { "line": 2, "role": "read", "label": "f(int) 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_fabcd", "region": "stack", "label": "f(\"abcd\") 결과", "value": "3", "highlight": false },
          { "id": "stack_f5", "region": "stack", "label": "f(5) 결과", "value": "9", "highlight": false },
          { "id": "stack_result", "region": "stack", "label": "결과", "value": "12", "highlight": true }
        ],
        "arrows": []
      }
    }
  ],
};
