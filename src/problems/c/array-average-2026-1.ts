import type { Problem } from "@/types/problem";

const code = `#include <stdio.h>

double arr1(int p[], int len) {
    double av = 0;
    int i;
    for (i = 0; i < len; i++) {
        av += (double) p[i];
    }
    return av / len;
}

double arr2(int * p, int len) {
    double av = 0;
    int i;
    for (i = 0; i < len; i++) {
        av += (double)( * (p + i));
    }
    return av / len;
}

int main() {
    int arr[10] = {80, 20, 50, 55, 45, 95, 55, 10, 40, 80};
    int len = 10;

    printf("%.2f", arr1(arr, len) + arr2(arr, len));

    return 0;
}`;

export const arrayAverage2026_1: Problem = {
  id: "array-average-2026-1",
  slug: "array-average-2026-1",
  title: "배열 평균과 포인터",
  topic: "포인터",
  difficulty: "보통",
  source: "2026년 1회차",
  estimatedMinutes: 6,
  prompt:
    "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "106.00",
  explanation: `1. arr[10] = {80, 20, 50, 55, 45, 95, 55, 10, 40, 80}, len = 10

2. arr1(p[], len): p[i]로 접근
   - 합계 = 80+20+50+55+45+95+55+10+40+80 = 530
   - 평균 = 530 / 10 = 53.0

3. arr2(*p, len): *(p+i)로 접근 (포인터 연산)
   - 같은 배열, 같은 합계 530 → 평균 53.0

4. printf("%.2f", 53.0 + 53.0) = printf("%.2f", 106.0) → 106.00`,
  traceSteps:   [
  {
    line: 21,
    comment: "main() 함수가 시작됩니다.",
    variables: []
  },
  {
    line: 22,
    comment: "int arr[10] = {80, 20, 50, 55, 45, 95, 55, 10, 40, 80}",
    variables: [
      {
        name: "arr",
        type: "int[]",
        value: [
          80,
          20,
          50,
          55,
          45,
          95,
          55,
          10,
          40,
          80
        ],
        highlight: true
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: true
        },
        {
          id: "stack_arr",
          region: "stack",
          label: "arr",
          value: "→ 배열",
          address: "0x100",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_arr",
          to: "data_arr",
          label: "주소",
          highlight: true
        }
      ]
    }
  },
  {
    line: 23,
    comment: "int len = 10",
    variables: [
      {
        name: "arr",
        type: "int[]",
        value: [
          80,
          20,
          50,
          55,
          45,
          95,
          55,
          10,
          40,
          80
        ]
      },
      {
        name: "len",
        type: "int",
        value: 10,
        highlight: true
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_arr",
          region: "stack",
          label: "arr",
          value: "→ 배열",
          address: "0x100",
          highlight: false
        },
        {
          id: "stack_len",
          region: "stack",
          label: "len",
          value: "10",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_arr",
          to: "data_arr",
          label: "주소",
          highlight: false
        }
      ]
    },
    relatedLines: [
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ]
  },
  {
    line: 3,
    comment: "arr1(arr, len) 호출 — arr1 함수로 진입합니다.",
    variables: [
      {
        name: "호출",
        type: "str",
        value: "arr1(arr, 10)",
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      },
      {
        line: 25,
        role: "call",
        label: "arr1 호출 위치"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: false
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: false
        }
      ]
    }
  },
  {
    line: 4,
    comment: "double av = 0",
    variables: [
      {
        name: "av",
        type: "double",
        value: 0,
        highlight: true
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: false
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "0",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: false
        }
      ]
    }
  },
  {
    line: 6,
    comment: "for (i = 0; ...) — i = 0, p[0] = 80",
    variables: [
      {
        name: "i",
        type: "int",
        value: 0,
        highlight: true
      },
      {
        name: "p[i]",
        type: "int",
        value: 80
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 3,
        role: "read",
        label: "p 선언"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[[80], 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "0",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[0] → av = 80",
    variables: [
      {
        name: "av",
        type: "double",
        value: 80,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "80",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 1, p[1] = 20",
    variables: [
      {
        name: "i",
        type: "int",
        value: 1,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "1",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[1] → av = 100",
    variables: [
      {
        name: "av",
        type: "double",
        value: 100,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "100",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 2, p[2] = 50",
    variables: [
      {
        name: "i",
        type: "int",
        value: 2,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "2",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[2] → av = 150",
    variables: [
      {
        name: "av",
        type: "double",
        value: 150,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "150",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 3, p[3] = 55",
    variables: [
      {
        name: "i",
        type: "int",
        value: 3,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "3",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[3] → av = 205",
    variables: [
      {
        name: "av",
        type: "double",
        value: 205,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "205",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 4, p[4] = 45",
    variables: [
      {
        name: "i",
        type: "int",
        value: 4,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "4",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[4] → av = 250",
    variables: [
      {
        name: "av",
        type: "double",
        value: 250,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "250",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 5, p[5] = 95",
    variables: [
      {
        name: "i",
        type: "int",
        value: 5,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "5",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[5] → av = 345",
    variables: [
      {
        name: "av",
        type: "double",
        value: 345,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "345",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 6, p[6] = 55",
    variables: [
      {
        name: "i",
        type: "int",
        value: 6,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "6",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[6] → av = 400",
    variables: [
      {
        name: "av",
        type: "double",
        value: 400,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "400",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 7, p[7] = 10",
    variables: [
      {
        name: "i",
        type: "int",
        value: 7,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "7",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[7] → av = 410",
    variables: [
      {
        name: "av",
        type: "double",
        value: 410,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "410",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 8, p[8] = 40",
    variables: [
      {
        name: "i",
        type: "int",
        value: 8,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "8",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[8] → av = 450",
    variables: [
      {
        name: "av",
        type: "double",
        value: 450,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "450",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 6,
    comment: "i = 9, p[9] = 80",
    variables: [
      {
        name: "i",
        type: "int",
        value: 9,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 5,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "9",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 7,
    comment: "av += p[9] → av = 530. for 루프 종료",
    variables: [
      {
        name: "av",
        type: "double",
        value: 530,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr1 정의"
      },
      {
        line: 4,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "530",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 9,
    comment: "return av / len = 530 / 10 = 53.0",
    variables: [
      {
        name: "arr1 반환",
        type: "double",
        value: 53,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: false
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: false
        }
      ]
    }
  },
  {
    line: 12,
    comment: "arr2(arr, len) 호출 — arr2 함수로 진입합니다.",
    variables: [
      {
        name: "arr1 반환",
        type: "double",
        value: 53
      },
      {
        name: "호출",
        type: "str",
        value: "arr2(arr, 10)",
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "read",
        label: "len 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      },
      {
        line: 25,
        role: "call",
        label: "arr2 호출 위치"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: false
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: false
        }
      ]
    }
  },
  {
    line: 13,
    comment: "double av = 0 (arr2 내부)",
    variables: [
      {
        name: "av",
        type: "double",
        value: 0,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "read",
        label: "len 선언"
      },
      {
        line: 12,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: false
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "0",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: false
        }
      ]
    }
  },
  {
    line: 15,
    comment: "for (i = 0; ...) — *(p + 0) = 80",
    variables: [
      {
        name: "i",
        type: "int",
        value: 0,
        highlight: true
      },
      {
        name: "*(p+i)",
        type: "int",
        value: 80
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "0",
          highlight: true
        },
        {
          id: "stack___p_i_",
          region: "stack",
          label: "*(p+i)",
          value: "80",
          highlight: false
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+0) → av = 80",
    variables: [
      {
        name: "av",
        type: "double",
        value: 80,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "80",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 1, *(p+1) = 20",
    variables: [
      {
        name: "i",
        type: "int",
        value: 1,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "1",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+1) → av = 100",
    variables: [
      {
        name: "av",
        type: "double",
        value: 100,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "100",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 2, *(p+2) = 50",
    variables: [
      {
        name: "i",
        type: "int",
        value: 2,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "2",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+2) → av = 150",
    variables: [
      {
        name: "av",
        type: "double",
        value: 150,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "150",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 3, *(p+3) = 55",
    variables: [
      {
        name: "i",
        type: "int",
        value: 3,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "3",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+3) → av = 205",
    variables: [
      {
        name: "av",
        type: "double",
        value: 205,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "205",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 4, *(p+4) = 45",
    variables: [
      {
        name: "i",
        type: "int",
        value: 4,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "4",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+4) → av = 250",
    variables: [
      {
        name: "av",
        type: "double",
        value: 250,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "250",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 5, *(p+5) = 95",
    variables: [
      {
        name: "i",
        type: "int",
        value: 5,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "5",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+5) → av = 345",
    variables: [
      {
        name: "av",
        type: "double",
        value: 345,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "345",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 6, *(p+6) = 55",
    variables: [
      {
        name: "i",
        type: "int",
        value: 6,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "6",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+6) → av = 400",
    variables: [
      {
        name: "av",
        type: "double",
        value: 400,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "400",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 7, *(p+7) = 10",
    variables: [
      {
        name: "i",
        type: "int",
        value: 7,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "7",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+7) → av = 410",
    variables: [
      {
        name: "av",
        type: "double",
        value: 410,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "410",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 8, *(p+8) = 40",
    variables: [
      {
        name: "i",
        type: "int",
        value: 8,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "8",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+8) → av = 450",
    variables: [
      {
        name: "av",
        type: "double",
        value: 450,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "450",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 15,
    comment: "i = 9, *(p+9) = 80",
    variables: [
      {
        name: "i",
        type: "int",
        value: 9,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 14,
        role: "read",
        label: "i 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      },
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_i",
          region: "stack",
          label: "i",
          value: "9",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 16,
    comment: "av += *(p+9) → av = 530. for 루프 종료",
    variables: [
      {
        name: "av",
        type: "double",
        value: 530,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 3,
        role: "definition",
        label: "arr2 정의"
      },
      {
        line: 13,
        role: "read",
        label: "av 선언"
      },
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: true
        },
        {
          id: "stack_av",
          region: "stack",
          label: "av",
          value: "530",
          highlight: true
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: true
        }
      ]
    }
  },
  {
    line: 18,
    comment: "return 530 / 10 = 53.0",
    variables: [
      {
        name: "arr2 반환",
        type: "double",
        value: 53,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 23,
        role: "read",
        label: "len 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "data_arr",
          region: "data",
          label: "arr / p →",
          value: "[80, 20, 50, 55, 45, 95, 55, 10, 40, 80]",
          highlight: false
        },
        {
          id: "stack_p",
          region: "stack",
          label: "p (매개변수)",
          value: "→ arr[0]",
          address: "0x100",
          highlight: false
        }
      ],
      arrows: [
        {
          from: "stack_p",
          to: "data_arr",
          label: "p → 배열",
          highlight: false
        }
      ]
    }
  },
  {
    line: 25,
    comment: "arr1(53.0) + arr2(53.0) = 106.0",
    variables: [
      {
        name: "arr1 반환",
        type: "double",
        value: 53
      },
      {
        name: "arr2 반환",
        type: "double",
        value: 53
      },
      {
        name: "합계",
        type: "double",
        value: 106,
        highlight: true
      }
    ],
    relatedLines: [
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "stack___",
          region: "stack",
          label: "합계",
          value: "106",
          highlight: true
        }
      ],
      arrows: []
    }
  },
  {
    line: 25,
    comment: "printf(\"%.2f\", 106.0) → 106.00 출력",
    variables: [
      {
        name: "합계",
        type: "double",
        value: 106
      }
    ],
    stdout: "106.00",
    relatedLines: [
      {
        line: 22,
        role: "read",
        label: "arr 선언"
      }
    ],
    memory: {
      cells: [
        {
          id: "stack___",
          region: "stack",
          label: "합계",
          value: "106",
          highlight: false
        }
      ],
      arrows: []
    }
  }
],
};
