import type { Problem } from "@/types/problem";

const code = `public class Main {
    public static void change(String[]  data, String s){
        data[0] = s;
        s = "Z";
    }
    
    public static void main(String[] args) {
        String data[] = { "A" };
        String s = "B";
        
        change(data, s);
        System.out.print(data[0] + s);
    }
}`;

export const stringArrayPassByValue2025_2: Problem = {
  id: "string-array-pass-by-value-2025-2",
  slug: "string-array-pass-by-value-2025-2",
  title: "배열 참조와 값 전달",
  topic: "참조",
  difficulty: "보통",
  source: "2025년 2회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 Java의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.",
  code,
  answer: "BB",
  explanation: `1. data = {"A"}, s = "B"

2. change(data, s) 호출
   - Java는 값 전달(call by value)
   - data[0] = s → 배열 요소가 "B"로 변경됨 (배열 객체는 공유)
   - s = "Z" → 매개변수 s만 변경, main의 s는 "B" 그대로

3. change 호출 후: data[0] = "B", s = "B"

4. data[0] + s = "B" + "B" = "BB"`,
  traceSteps:   [
      {
        "line": 7,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 8,
        "comment": "String data[] = { \"A\" } — 길이 1인 배열이 생성되고 data[0]=\"A\"입니다.",
        "variables": [
          {
            "name": "data[0]",
            "type": "String",
            "value": "\"A\"",
            "highlight": true
          }
        ]
      },
      {
        "line": 9,
        "comment": "String s = \"B\" — s에 \"B\"가 할당됩니다.",
        "variables": [
          {
            "name": "data[0]",
            "type": "String",
            "value": "\"A\""
          },
          {
            "name": "s",
            "type": "String",
            "value": "\"B\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "data 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_s",
              "region": "stack",
              "label": "s",
              "value": "\"B\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "change(data, s) 호출. 배열 참조와 문자열 참조가 값으로 전달됩니다.",
        "variables": [
          {
            "name": "호출",
            "type": "String",
            "value": "change(data, s)",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 11,
            "role": "call",
            "label": "change 호출 위치"
          }
        ]
      },
      {
        "line": 3,
        "comment": "data[0] = s → 배열 첫 요소가 \"B\"로 변경됩니다.",
        "variables": [
          {
            "name": "data[0]",
            "type": "String",
            "value": "\"B\"",
            "highlight": true
          },
          {
            "name": "매개변수 s",
            "type": "String",
            "value": "\"B\""
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "data 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack______s",
              "region": "stack",
              "label": "매개변수 s",
              "value": "\"B\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 4,
        "comment": "s = \"Z\" → 매개변수 s만 변경. main의 s는 여전히 \"B\"입니다.",
        "variables": [
          {
            "name": "매개변수 s",
            "type": "String",
            "value": "\"Z\""
          },
          {
            "name": "main의 s",
            "type": "String",
            "value": "\"B\"",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 2,
            "role": "definition",
            "label": "change 정의"
          },
          {
            "line": 8,
            "role": "read",
            "label": "data 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack______s",
              "region": "stack",
              "label": "매개변수 s",
              "value": "\"Z\"",
              "highlight": false
            },
            {
              "id": "stack_main__s",
              "region": "stack",
              "label": "main의 s",
              "value": "\"B\"",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 2,
        "comment": "change() 종료. data[0]=\"B\", main의 s=\"B\"",
        "variables": [
          {
            "name": "data[0]",
            "type": "String",
            "value": "\"B\""
          },
          {
            "name": "s",
            "type": "String",
            "value": "\"B\""
          }
        ],
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "data 선언"
          },
          {
            "line": 9,
            "role": "read",
            "label": "s 선언"
          },
          {
            "line": 11,
            "role": "call",
            "label": "change 호출"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_s",
              "region": "stack",
              "label": "s",
              "value": "\"B\"",
              "highlight": false
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 3,
        "comment": "data[0] + s = \"B\" + \"B\" = \"BB\"",
        "variables": [
          {
            "name": "data[0] + s",
            "type": "String",
            "value": "\"BB\"",
            "highlight": true
          }
        ],
        "stdout": "BB",
        "relatedLines": [
          {
            "line": 8,
            "role": "read",
            "label": "data 선언"
          }
        ]
      }
    ],
};
