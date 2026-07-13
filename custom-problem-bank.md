# 커스텀 문제 뱅크

> **코드(`.ts`)·Trace 구현 전에** 문제 코드와 정답만 이 파일에 먼저 적습니다.  
> 기획·규칙: [`custom-problem-plan.md`](./custom-problem-plan.md)

**난이도 캘리브레이션 (기출 42문항 기준, 2026-07-13 조정)**

| 언어 | 기출 code 비어있지 않은 줄 (대략) | 커스텀 목표 |
|------|----------------------------------|------------|
| Python | 중앙값 ~7, 어려움은 트리·얕은복사 등 **다단계 함정** | **6~16줄**, 한 줄 퀴즈 금지 |
| C | 중앙값 ~20, 어려움 20~35 (구조체·연결리스트·포인터 함수) | **15~30줄**, `#include`+함수/`struct` |
| Java | 중앙값 ~18, 어려움 18~29 (2~3클래스·디스패치) | **15~28줄**, 클래스 ≥2 |

기출처럼 **정답은 짧고**, 난이도는 **추적 단계·함정**에 둔다. (`쉬움` 미사용)

---

## 상태 범례

| 표시 | 의미 |
|------|------|
| `📝 초안완료` | code + answer 확정. `.ts` 미구현 |
| `🚧 구현중` | Trace 작성 중 |
| `✅ 구현완료` | `src/problems/...` 등록 완료 |

---

## 진행 현황

| source | 언어 | 유형 | slug | 난이도 | 상태 |
|--------|------|------|------|--------|------|
| 커스텀-001 | Python | PY-C | odd-len-comp-join-custom-01 | 보통 | ✅ |
| 커스텀-002 | Python | PY-C | nested-comp-mutate-custom-01 | 어려움 | ✅ |
| 커스텀-003 | Python | PY-B | stride-slice-join-custom-01 | 보통 | ✅ |
| 커스텀-004 | Python | PY-B | rotate-split-slice-custom-01 | 보통 | ✅ |
| 커스텀-005 | Python | PY-A | dict-set-mutate-sum-custom-01 | 어려움 | ✅ |
| 커스텀-006 | Python | AL-A | recursive-parity-sum-custom-01 | 어려움 | ✅ |
| 커스텀-007 | C | C-A | double-ptr-step-custom-01 | 어려움 | ✅ |
| 커스텀-008 | C | C-A | split-avg-product-custom-01 | 보통 | ✅ |
| 커스텀-009 | C | C-B | struct-parity-fold-custom-01 | 보통 | ✅ |
| 커스텀-010 | C | C-C | struct-shift-xor-custom-01 | 어려움 | ✅ |
| 커스텀-011 | C | C-C | ternary-inc-mix-custom-01 | 어려움 | ✅ |
| 커스텀-012 | C | AL-A / 연결 | list-swap-head-custom-01 | 어려움 | ✅ |
| 커스텀-013 | Java | JV-A | override-static-cast-custom-01 | 어려움 | ✅ |
| 커스텀-014 | Java | JV-B | ctor-poly-field-custom-01 | 어려움 | ✅ |
| 커스텀-015 | Java | JV-C | abstract-template-custom-01 | 보통 | ✅ |
| 커스텀-016 | Java | JV-C | iface-multi-poly-custom-01 | 보통 | ✅ |
| 커스텀-017 | Java | AL-A | overload-recursive-custom-01 | 어려움 | ✅ |
| 커스텀-018 | Java | AL-B | binary-search-blank-custom-01 | 보통 | ✅ |

---

## 문제 본문

### 커스텀-001 — 홀수 길이 필터 컴프리헨션 + join

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | python |
| 유형 ID | PY-C |
| topic | 컴프리헨션 |
| difficulty | 보통 |
| slug | `odd-len-comp-join-custom-01` |

**학습 목표:** 필터 컴프리헨션 → 튜플 보관 → 문자열 역순 join·길이 합.

**함정:** 짝수 길이 단어를 남기거나, 역순을 단어 전체가 아니라 문자 단위로만 적용.

**prompt:**
> 다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```python
data = ["ab", "cde", "fg", "hij"]
t = [(w, len(w)) for w in data if len(w) % 2 == 1]
s = "".join(x[0][::-1] for x in t)
print(f"{s}{sum(x[1] for x in t)}")
```

**answer:**

```
edcjih6
```

---

### 커스텀-002 — 이중 컴프리헨션 후 원본 리스트 변형

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | python |
| 유형 ID | PY-C |
| topic | 컴프리헨션 |
| difficulty | 어려움 |
| slug | `nested-comp-mutate-custom-01` |

**학습 목표:** 중첩 for 컴프리헨션으로 만든 `out`과, 이후 `rows` 돌연변이의 독립/종속.

**함정:** `out`이 `rows`와 같은 참조라고 착각하거나, `append` 후 `out`도 바뀐다고 봄.

**prompt:**
> 다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```python
rows = [[i, i + 1] for i in range(1, 4)]
out = [v for r in rows for v in r if v % 2 == 0]
rows[1].append(out[0])
print("".join(str(x) for x in out), len(rows[1]), sep="-")
```

**answer:**

```
224-3
```

---

### 커스텀-003 — 짝·홀 인덱스 슬라이스와 join

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | python |
| 유형 ID | PY-B |
| topic | 슬라이싱 |
| difficulty | 보통 |
| slug | `stride-slice-join-custom-01` |

**학습 목표:** `[::2]`, `[1::2][::-1]`, 부분 슬라이스를 `join`으로 결합.

**함정:** `TRACEPOINT` 인덱스를 1-based로 세거나, `a[1:4]`를 `AEON`으로 확장.

**prompt:**
> 다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```python
s = "TRACEPOINT"
a = s[::2]
b = s[1::2][::-1]
print("-".join([a, b, a[1:4]]))
```

**answer:**

```
TAEON-TIPCR-AEO
```

---

### 커스텀-004 — split 회전 join 후 역간격 슬라이스

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | python |
| 유형 ID | PY-B |
| topic | 문자열 |
| difficulty | 보통 |
| slug | `rotate-split-slice-custom-01` |

**학습 목표:** 토큰별 회전 → 연결 → `[::-2]` 다단계 문자열 가공 (기출 `human-dev`급 파이프라인).

**함정:** 리스트 `[::-1]`과 문자열 `[::-2]`를 혼동.

**prompt:**
> 다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```python
raw = "hello-binary-code"
parts = raw.split("-")
mid = "".join(p[1:] + p[0] for p in parts)
print(mid[::-2])
```

**answer:**

```
cdbrnhle
```

---

### 커스텀-005 — dict·set 교집합 후 리스트 돌연변이 합

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | python |
| 유형 ID | PY-A |
| topic | 딕셔너리 |
| difficulty | 어려움 |
| slug | `dict-set-mutate-sum-custom-01` |

**학습 목표:** 키 교집합 순회 중 **같은 리스트 객체**에 append하며 합산 (얕은 공유 감각).

**함정:** `append` 전 합만 구하거나, `y` 키까지 포함.

**prompt:**
> 다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```python
base = {"x": [1, 2], "y": [2, 3], "z": [1]}
keys = set(base) & {"x", "z", "w"}
total = 0
for k in sorted(keys):
    base[k].append(len(keys))
    total += sum(base[k])
print(f"{total}{''.join(sorted(keys))}")
```

**answer:**

```
8xz
```

---

### 커스텀-006 — 재귀 짝홀 부호 합

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | python |
| 유형 ID | AL-A |
| topic | 재귀 |
| difficulty | 어려움 |
| slug | `recursive-parity-sum-custom-01` |

**학습 목표:** 인덱스 재귀로 짝수 `+` / 홀수 `-` 누적 (기출 재귀 배열 계열).

**함정:** 모든 원소를 더하거나, 재귀 종료 조건을 `i == len`이 아니라 `v`로 둠.

**prompt:**
> 다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```python
def g(a, i):
    if i >= len(a):
        return 0
    v = a[i]
    if v % 2 == 0:
        return v + g(a, i + 1)
    return g(a, i + 1) - v

print(g([5, 2, 7, 4, 1], 0))
```

**answer:**

```
-7
```

---

### 커스텀-007 — 이중 포인터로 포인터 진행

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | c |
| 유형 ID | C-A |
| topic | 포인터 |
| difficulty | 어려움 |
| slug | `double-ptr-step-custom-01` |

**학습 목표:** `int **`로 호출자 포인터를 진행시키며 값 출력 (기출 이중 포인터급).

**함정:** `p`가 `main`에서 안 움직인다고 보거나, `p-a`를 값으로 착각.

**prompt:**
> 다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```c
#include <stdio.h>

void step(int **pp) {
    printf("%d", *(*pp)++);
}

int main() {
    int a[] = {2, 5, 7, 1};
    int *p = a;
    step(&p);
    step(&p);
    printf("%d%d", *p, (int)(p - a));
    return 0;
}
```

**answer:**

```
2572
```

**메모:** 출력 2, 5 후 `*p=7`, `p-a=2` → `2572`.

---

### 커스텀-008 — 좌·우 구간 포인터 합의 곱

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | c |
| 유형 ID | C-A |
| topic | 포인터 |
| difficulty | 보통 |
| slug | `split-avg-product-custom-01` |

**학습 목표:** `p[i]`와 `*(p+i)` 두 헬퍼로 반쪽 합을 구한 뒤 곱 (기출 `array-average` 톤).

**함정:** `n/2` 경계를 한쪽만 포함/제외.

**prompt:**
> 다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```c
#include <stdio.h>

int left(int *p, int n) {
    int i, s = 0;
    for (i = 0; i < n / 2; i++) {
        s += p[i];
    }
    return s;
}

int right(int *p, int n) {
    int i, s = 0;
    for (i = n / 2; i < n; i++) {
        s += *(p + i);
    }
    return s;
}

int main() {
    int a[] = {4, 1, 7, 2, 8, 3};
    int n = 6;
    printf("%d", left(a, n) * right(a, n));
    return 0;
}
```

**answer:**

```
156
```

---

### 커스텀-009 — 구조체 배열 패리티 폴드

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | c |
| 유형 ID | C-B |
| topic | 구조체 |
| difficulty | 보통 |
| slug | `struct-parity-fold-custom-01` |

**학습 목표:** `arr+i` / `arr[i].` 로 구조체 필드 조건을 적용.

**함정:** `c`가 아니라 `v`의 짝홀로 부호를 나눔.

**prompt:**
> 다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```c
#include <stdio.h>

typedef struct {
    int c;
    int v;
} Item;

int run(Item *arr, int n) {
    int i, s = 0;
    for (i = 0; i < n; i++) {
        if ((arr + i)->c % 2 == 0) {
            s += (arr + i)->v;
        } else {
            s -= arr[i].v;
        }
    }
    return s;
}

int main() {
    Item a[4] = {{2, 10}, {5, 3}, {4, 7}, {1, 2}};
    printf("%d", run(a, 4));
    return 0;
}
```

**answer:**

```
12
```

---

### 커스텀-010 — 구조체 필드 시프트·OR·XOR

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | c |
| 유형 ID | C-C |
| topic | 연산자 |
| difficulty | 어려움 |
| slug | `struct-shift-xor-custom-01` |

**학습 목표:** 구조체 필드를 비트 연산에 섞어 우선순위대로 계산 (기출 decrypt 축소판).

**함정:** `<<` / `|` / `^` 순서를 왼쪽부터 단순 적용.

**prompt:**
> 다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```c
#include <stdio.h>

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
}
```

**answer:**

```
57
```

---

### 커스텀-011 — 삼항·논리·증감 혼합

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | c |
| 유형 ID | C-C |
| topic | 연산자 |
| difficulty | 어려움 |
| slug | `ternary-inc-mix-custom-01` |

**학습 목표:** `&&` 단락·`++c`·삼항·`a++`가 한 식에 있을 때 부수 효과 추적 (기출 우선순위급).

**함정:** `a++ * c`에서 `a`가 곱셈 전에 증가한다고 봄.

**prompt:**
> 다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```c
#include <stdio.h>

int main() {
    int a = 4, b = 3, c = 2, d;
    d = a > b && ++c < 5 ? a++ * c : --b;
    printf("%d %d %d %d", a, b, c, d);
    return 0;
}
```

**answer:**

```
5 3 3 12
```

---

### 커스텀-012 — 연결리스트 머리 두 노드 스왑

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | c |
| 유형 ID | AL-A (연결 재연결) |
| topic | 연결리스트 |
| difficulty | 어려움 |
| slug | `list-swap-head-custom-01` |

**학습 목표:** 포인터 세 줄로 머리 두 노드 순서를 바꾼 뒤 순회 출력 (기출 relink급).

**함정:** 값 교환으로 생각하거나, `h`를 갱신하지 않음.

**prompt:**
> 다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```c
#include <stdio.h>

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
}
```

**answer:**

```
1462
```

---

### 커스텀-013 — 오버라이드·static·캐스트 오버로드

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | java |
| 유형 ID | JV-A |
| topic | 상속 |
| difficulty | 어려움 |
| slug | `override-static-cast-custom-01` |

**학습 목표:** 인스턴스 오버라이드 vs static 바인딩 vs 캐스트 후 오버로드 (기출 `static-override`·`method-overload` 합성).

**함정:** `r.tag()`를 `"B"`로 보거나, `f(2)`를 `A` 기준으로 +1.

**prompt:**
> 다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```java
class A {
    int f(int x) { return x + 1; }
    static String tag() { return "A"; }
}

class B extends A {
    int f(int x) { return x + 4; }
    int f(String s) { return s.length(); }
    static String tag() { return "B"; }
}

public class Main {
    public static void main(String[] args) {
        A r = new B();
        System.out.print(r.f(2) + r.tag() + ((B) r).f("xy"));
    }
}
```

**answer:**

```
6A2
```

---

### 커스텀-014 — 생성자 중 다형 show·필드 초기화 순서

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | java |
| 유형 ID | JV-B |
| topic | 상속 |
| difficulty | 어려움 |
| slug | `ctor-poly-field-custom-01` |

**학습 목표:** 부모 생성자에서 오버라이드 `show` 호출 시 **자식 필드가 아직 기본값**인 점 (기출 `inheritance-constructor-override`급).

**함정:** `C.v=5`가 부모 생성자 시점부터 적용된다고 봄 → 오답 `17` 등.

**prompt:**
> 다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```java
class P {
    static int t = 0;
    int v = 2;

    P() {
        t += v;
        show();
    }

    void show() {
        t += 1;
    }
}

class C extends P {
    int v = 5;

    C() {
        t += v;
        show();
    }

    void show() {
        t += v;
    }
}

public class Main {
    public static void main(String[] args) {
        new C();
        System.out.print(P.t);
    }
}
```

**answer:**

```
12
```

**메모:** P생성: t=2, show→C.show(v=0) t=2 → 필드 v=5 → C생성 t=7 → show t=12.

---

### 커스텀-015 — 추상 템플릿 메서드 + base 오버라이드

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | java |
| 유형 ID | JV-C |
| topic | 추상클래스 |
| difficulty | 보통 |
| slug | `abstract-template-custom-01` |

**학습 목표:** `run` 템플릿 안에서 `calc`·`base` 동적 바인딩.

**함정:** `base()`를 부모의 3으로만 계산.

**prompt:**
> 다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```java
abstract class Op {
    abstract int calc(int x);

    int run(int x) {
        return calc(x) + base();
    }

    int base() {
        return 3;
    }
}

class Mul extends Op {
    int calc(int x) {
        return x * 2;
    }

    int base() {
        return 1;
    }
}

public class Main {
    public static void main(String[] args) {
        Op a = new Mul();
        System.out.print(a.run(4) + new Mul().base());
    }
}
```

**answer:**

```
10
```

---

### 커스텀-016 — 인터페이스 상속 체인 다형 호출

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | java |
| 유형 ID | JV-C |
| topic | 인터페이스 |
| difficulty | 보통 |
| slug | `iface-multi-poly-custom-01` |

**학습 목표:** `J`/`I` 참조로도 최종 오버라이드 `v()`가 호출됨.

**함정:** `q.v()`를 `X`의 2로 봄.

**prompt:**
> 다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```java
interface I {
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
}
```

**answer:**

```
775
```

---

### 커스텀-017 — 오버로드된 재귀 (int / String)

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | java |
| 유형 ID | AL-A |
| topic | 재귀 |
| difficulty | 어려움 |
| slug | `overload-recursive-custom-01` |

**학습 목표:** `f(String)`이 `f(int)`를 호출하는 오버로드+재귀 (기출 `recursive-calc-overload` 톤).

**함정:** `f("abcd")`를 길이 4로만 답하거나, `f(5)`를 팩토리얼로 계산.

**prompt:**
> 다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

**code:**

```java
public class Main {
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
}
```

**answer:**

```
12
```

---

### 커스텀-018 — 이진 탐색 빈칸 (헬퍼 포함)

| 항목 | 값 |
|------|-----|
| 상태 | ✅ 구현완료 |
| 언어 | java |
| 유형 ID | AL-B |
| topic | 탐색 |
| difficulty | 보통 |
| slug | `binary-search-blank-custom-01` |

**학습 목표:** `a[mid] < key`일 때 `left` 갱신. 주변은 기출형 헬퍼+main.

**함정:** `left = mid` / `right = mid + 1`.

**prompt:**
> 다음은 Java 코드에 대한 문제이다. 밑줄(빈칸)에 알맞은 코드를 작성하시오. (표기는 `mid + 1`)

**code:**

```java
public class Main {
    static int find(int[] a, int key) {
        int left = 0;
        int right = a.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (a[mid] == key) {
                return mid;
            }
            if (a[mid] < key) {
                left = ____;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] a = {2, 4, 6, 8, 10, 12};
        System.out.print(find(a, 10) + find(a, 5));
    }
}
```

**answer:**

```
mid + 1
```

**메모:** 빈칸을 올바르게 채우면 `main` 출력은 `3`이지만, 채점 답은 빈칸 코드.

---

## 다음 번호

이어서 초안 추가 시 **커스텀-019**부터.  
이전 초안(3~8줄 퀴즈형)은 기출 대비 과하게 가벼워 **전량 교체**함.
