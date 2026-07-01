import type { Problem } from "@/types/problem";

const code = `public class Main {

  public static void main(String[] args) {

    int a=5,b=0;

    try{
      System.out.print(a/b);
    }catch(ArithmeticException e){
      System.out.print("출력1");
    }catch(ArrayIndexOutOfBoundsException e) {
      System.out.print("출력2");
    }catch(NumberFormatException e) {
      System.out.print("출력3");
    }catch(Exception e){
      System.out.print("출력4");
    }finally{
      System.out.print("출력5");
    }
  }
}`;

export const tryCatchFinally2025_1: Problem = {
  id: "try-catch-finally-2025-1",
  slug: "try-catch-finally-2025-1",
  title: "다중 catch와 finally",
  topic: "예외처리",
  difficulty: "보통",
  source: "2025년 1회차",
  estimatedMinutes: 5,
  prompt:
    "다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "출력1출력5",
  explanation: `1. a=5, b=0

2. try 블록에서 System.out.print(a/b) → 5/0 연산
   - 0으로 나누므로 ArithmeticException 발생

3. catch(ArithmeticException e) 블록 실행
   - System.out.print("출력1") → 출력1

4. catch(ArrayIndexOutOfBoundsException), catch(NumberFormatException), catch(Exception) 블록
   - 예외가 이미 ArithmeticException catch에서 처리되었으므로 실행되지 않음

5. finally 블록은 예외 발생 여부와 관계없이 항상 실행
   - System.out.print("출력5") → 출력5

전체 출력: 출력1출력5`,
  traceSteps:   [
      {
        "line": 3,
        "comment": "main() 메서드가 시작됩니다.",
        "variables": []
      },
      {
        "line": 5,
        "comment": "int a=5, b=0; — a는 5, b는 0으로 초기화됩니다.",
        "variables": [
          {
            "name": "a",
            "type": "int",
            "value": 5,
            "highlight": true
          },
          {
            "name": "b",
            "type": "int",
            "value": 0,
            "highlight": true
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a",
              "region": "stack",
              "label": "a",
              "value": "5",
              "highlight": true
            },
            {
              "id": "stack_b",
              "region": "stack",
              "label": "b",
              "value": "0",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 7,
        "comment": "try 블록에 진입합니다.",
        "variables": []
      },
      {
        "line": 8,
        "comment": "System.out.print(a/b) — 5/0 연산 시도 → ArithmeticException 발생",
        "variables": [
          {
            "name": "a/b",
            "type": "int",
            "value": "5/0 → 예외",
            "highlight": true
          }
        ],
        "relatedLines": [
          {
            "line": 5,
            "role": "read",
            "label": "a 선언"
          }
        ],
        "memory": {
          "cells": [
            {
              "id": "stack_a_b",
              "region": "stack",
              "label": "a/b",
              "value": "5/0 → 예외",
              "highlight": true
            }
          ],
          "arrows": []
        }
      },
      {
        "line": 9,
        "comment": "catch(ArithmeticException e) — 발생한 예외를 잡습니다.",
        "variables": [
          {
            "name": "e",
            "type": "ArithmeticException",
            "value": "/ by zero",
            "highlight": true
          }
        ]
      },
      {
        "line": 10,
        "comment": "System.out.print(\"출력1\") 실행",
        "variables": [],
        "stdout": "출력1"
      },
      {
        "line": 11,
        "comment": "catch(ArrayIndexOutOfBoundsException) — 예외가 이미 처리되어 이 블록은 실행되지 않습니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "catch 정의"
          }
        ]
      },
      {
        "line": 13,
        "comment": "catch(NumberFormatException) — 예외가 이미 처리되어 이 블록은 실행되지 않습니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "catch 정의"
          }
        ]
      },
      {
        "line": 15,
        "comment": "catch(Exception) — 예외가 이미 처리되어 이 블록은 실행되지 않습니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "catch 정의"
          }
        ]
      },
      {
        "line": 17,
        "comment": "finally 블록 진입 — try/catch 이후 항상 실행됩니다.",
        "variables": [],
        "relatedLines": [
          {
            "line": 9,
            "role": "definition",
            "label": "catch 정의"
          }
        ]
      },
      {
        "line": 18,
        "comment": "System.out.print(\"출력5\") 실행 — 최종 출력은 출력1출력5",
        "variables": [],
        "stdout": "출력5"
      }
    ],
};
