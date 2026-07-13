import type { Problem } from "@/types/problem";

const code = `interface I {
    int v();
}

interface J extends I {
    int w();
}

class X implements J {
    public int v() { return 2; }
    public int w() { return 5; }
}

class Y extends X {
    public int v() { return 7; }
}

public class Main {
    public static void main(String[] args) {
        J p = new Y();
        I q = p;
        System.out.print("" + p.v() + q.v() + p.w());
    }
}`;

export const ifaceMultiPolyCustom01: Problem = {
  id: "iface-multi-poly-custom-01",
  slug: "iface-multi-poly-custom-01",
  title: "인터페이스 상속 체인 다형 호출",
  topic: "인터페이스",
  difficulty: "보통",
  source: "커스텀-016",
  estimatedMinutes: 5,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "775",
  explanation: `여기서 많이 틀립니다: q.v()를 X의 v()인 2로 보거나, p.w()를 Y에서 찾지 못해 오류로 판단합니다.

1. J p = new Y() — 참조 타입은 J, 실제 객체는 Y
2. I q = p — 같은 Y 객체를 I 참조로 봄
3. p.v() — 런타임 타입 Y → Y 클래스의 v() 실행 = 7
4. q.v() — 참조 타입은 I이지만 실제 객체는 Y → Y 클래스의 v() 실행 = 7
5. p.w() — Y 클래스에 w() 없음 → X 클래스에서 상속받은 w() 실행 = 5
6. "" + 7 + 7 + 5 → 문자열 결합 = "775"`,
  traceSteps: [
    {
      "line": 19,
      "comment": "main() 메서드가 시작됩니다. 아직 변수가 없습니다.",
      "variables": [],
      "memory": {
        "cells": [],
        "arrows": []
      }
    },
    {
      "line": 20,
      "comment": "J p = new Y() — 참조 타입은 J, 실제 생성되는 객체는 Y입니다. Y는 X를 상속하고 X는 J를 구현합니다.",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체", "highlight": true }
      ],
      "relatedLines": [
        { "line": 14, "role": "definition", "label": "Y 클래스 정의" },
        { "line": 9, "role": "read", "label": "X 클래스 정의" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": true },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": true }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": true }
        ]
      }
    },
    {
      "line": 21,
      "comment": "I q = p — p가 가리키는 같은 Y 객체를 I 타입 참조로 저장합니다. 객체는 하나, 참조만 둘입니다.",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체" },
        { "name": "q", "type": "I (참조)", "value": "Y 객체 (p와 동일)", "highlight": true }
      ],
      "relatedLines": [
        { "line": 20, "role": "read", "label": "p 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": false },
          { "id": "stack_q", "region": "stack", "label": "q", "value": "→ Y객체", "highlight": true },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": false },
          { "from": "stack_q", "to": "heap_y", "label": "참조", "highlight": true }
        ]
      }
    },
    {
      "line": 22,
      "comment": "\"\" + p.v() 평가 시작 — p의 런타임 타입은 Y입니다. Y 클래스의 v()를 실행합니다.",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체" },
        { "name": "q", "type": "I (참조)", "value": "Y 객체 (p와 동일)" }
      ],
      "relatedLines": [
        { "line": 15, "role": "definition", "label": "Y.v() 정의" },
        { "line": 20, "role": "read", "label": "p 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": false },
          { "id": "stack_q", "region": "stack", "label": "q", "value": "→ Y객체", "highlight": false },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": false },
          { "from": "stack_q", "to": "heap_y", "label": "참조", "highlight": false }
        ]
      }
    },
    {
      "line": 15,
      "comment": "Y 클래스의 v() 실행 → return 7. p.v()의 결과는 7입니다.",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체" },
        { "name": "q", "type": "I (참조)", "value": "Y 객체 (p와 동일)" },
        { "name": "p.v() 결과", "type": "int", "value": 7, "highlight": true }
      ],
      "relatedLines": [
        { "line": 20, "role": "read", "label": "p 선언" },
        { "line": 14, "role": "read", "label": "Y 클래스" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": false },
          { "id": "stack_q", "region": "stack", "label": "q", "value": "→ Y객체", "highlight": false },
          { "id": "stack_pv", "region": "stack", "label": "p.v() 결과", "value": "7", "highlight": true },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": false },
          { "from": "stack_q", "to": "heap_y", "label": "참조", "highlight": false }
        ]
      }
    },
    {
      "line": 22,
      "comment": "q.v() 평가 — q의 참조 타입은 I이지만, 실제 객체는 여전히 Y입니다. 다형성에 의해 Y 클래스의 v()를 실행합니다.",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체" },
        { "name": "q", "type": "I (참조)", "value": "Y 객체 (p와 동일)" },
        { "name": "p.v() 결과", "type": "int", "value": 7 }
      ],
      "relatedLines": [
        { "line": 15, "role": "definition", "label": "Y.v() 정의" },
        { "line": 21, "role": "read", "label": "q 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": false },
          { "id": "stack_q", "region": "stack", "label": "q", "value": "→ Y객체", "highlight": false },
          { "id": "stack_pv", "region": "stack", "label": "p.v() 결과", "value": "7", "highlight": false },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": false },
          { "from": "stack_q", "to": "heap_y", "label": "참조", "highlight": false }
        ]
      }
    },
    {
      "line": 15,
      "comment": "Y 클래스의 v() 실행 → return 7. q.v()의 결과도 7입니다. (같은 객체이므로 당연히 같은 메서드)",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체" },
        { "name": "q", "type": "I (참조)", "value": "Y 객체 (p와 동일)" },
        { "name": "p.v() 결과", "type": "int", "value": 7 },
        { "name": "q.v() 결과", "type": "int", "value": 7, "highlight": true }
      ],
      "relatedLines": [
        { "line": 21, "role": "read", "label": "q 선언" },
        { "line": 14, "role": "read", "label": "Y 클래스" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": false },
          { "id": "stack_q", "region": "stack", "label": "q", "value": "→ Y객체", "highlight": false },
          { "id": "stack_pv", "region": "stack", "label": "p.v() 결과", "value": "7", "highlight": false },
          { "id": "stack_qv", "region": "stack", "label": "q.v() 결과", "value": "7", "highlight": true },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": false },
          { "from": "stack_q", "to": "heap_y", "label": "참조", "highlight": false }
        ]
      }
    },
    {
      "line": 22,
      "comment": "p.w() 평가 — p의 런타임 타입 Y에는 w()가 정의되지 않았습니다. X 클래스에서 상속받은 w()를 실행합니다.",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체" },
        { "name": "q", "type": "I (참조)", "value": "Y 객체 (p와 동일)" },
        { "name": "p.v() 결과", "type": "int", "value": 7 },
        { "name": "q.v() 결과", "type": "int", "value": 7 }
      ],
      "relatedLines": [
        { "line": 11, "role": "definition", "label": "X.w() 정의" },
        { "line": 20, "role": "read", "label": "p 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": false },
          { "id": "stack_q", "region": "stack", "label": "q", "value": "→ Y객체", "highlight": false },
          { "id": "stack_pv", "region": "stack", "label": "p.v() 결과", "value": "7", "highlight": false },
          { "id": "stack_qv", "region": "stack", "label": "q.v() 결과", "value": "7", "highlight": false },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": false },
          { "from": "stack_q", "to": "heap_y", "label": "참조", "highlight": false }
        ]
      }
    },
    {
      "line": 11,
      "comment": "X 클래스의 w() 실행 → return 5. Y는 w()를 오버라이드하지 않았으므로 X의 구현이 사용됩니다.",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체" },
        { "name": "q", "type": "I (참조)", "value": "Y 객체 (p와 동일)" },
        { "name": "p.v() 결과", "type": "int", "value": 7 },
        { "name": "q.v() 결과", "type": "int", "value": 7 },
        { "name": "p.w() 결과", "type": "int", "value": 5, "highlight": true }
      ],
      "relatedLines": [
        { "line": 9, "role": "read", "label": "X 클래스" },
        { "line": 20, "role": "read", "label": "p 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": false },
          { "id": "stack_q", "region": "stack", "label": "q", "value": "→ Y객체", "highlight": false },
          { "id": "stack_pv", "region": "stack", "label": "p.v() 결과", "value": "7", "highlight": false },
          { "id": "stack_qv", "region": "stack", "label": "q.v() 결과", "value": "7", "highlight": false },
          { "id": "stack_pw", "region": "stack", "label": "p.w() 결과", "value": "5", "highlight": true },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": false },
          { "from": "stack_q", "to": "heap_y", "label": "참조", "highlight": false }
        ]
      }
    },
    {
      "line": 22,
      "comment": "\"\" + 7 + 7 + 5 → 빈 문자열에 int를 순서대로 이어붙입니다. \"7\" → \"77\" → \"775\" 출력",
      "variables": [
        { "name": "p", "type": "J (참조)", "value": "Y 객체" },
        { "name": "q", "type": "I (참조)", "value": "Y 객체 (p와 동일)" },
        { "name": "p.v() 결과", "type": "int", "value": 7 },
        { "name": "q.v() 결과", "type": "int", "value": 7 },
        { "name": "p.w() 결과", "type": "int", "value": 5 },
        { "name": "결과", "type": "String", "value": "\"775\"", "highlight": true }
      ],
      "stdout": "775",
      "relatedLines": [
        { "line": 20, "role": "read", "label": "p 선언" },
        { "line": 21, "role": "read", "label": "q 선언" }
      ],
      "memory": {
        "cells": [
          { "id": "stack_p", "region": "stack", "label": "p", "value": "→ Y객체", "highlight": false },
          { "id": "stack_q", "region": "stack", "label": "q", "value": "→ Y객체", "highlight": false },
          { "id": "stack_result", "region": "stack", "label": "결과", "value": "\"775\"", "highlight": true },
          { "id": "heap_y", "region": "heap", "label": "Y 객체", "value": "v()→7, w()→5(상속)", "highlight": false }
        ],
        "arrows": [
          { "from": "stack_p", "to": "heap_y", "label": "참조", "highlight": false },
          { "from": "stack_q", "to": "heap_y", "label": "참조", "highlight": false }
        ]
      }
    }
  ],
};
