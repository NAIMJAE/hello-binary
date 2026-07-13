# hello-binary 빌드 플랜

> "텍스트 위주의 지루한 해설 대신, **한 줄도 건너뛰지 않고** 코드가 실행되는 흐름을 눈으로 직접 보며 이해하는 정보처리기사 실기 합격 가이드"

**최종 반영:** 2026-07-06 — 아래 내용은 현재 저장소 구현 기준입니다.

---

## 1. 타겟

- 정보처리기사 실기 시험을 독학하는 수험생
- 비전공자, 프로그래밍 언어(C언어, Java, Python) 코드 분석 문제에서 과락·감점을 겪는 수험생

---

## 2. 제품 전략 (현재)


| 항목      | 결정 · 현황                                        |
| ------- | ---------------------------------------------- |
| 지원 언어   | **Python · C언어 · Java** — 세 언어 모두 Trace·연습장 동작 |
| 등록 문제 수 | **60문제** (Python 14 · C언어 22 · Java 24) — 기출 42 + 커스텀 18 |
| 콘텐츠 목표  | 기출 유형 중심, 문제별 `traceSteps` 사전 제작               |
| 수익화     | **완전 무료, 로그인 없음**                              |
| 배포      | **Netlify 예정** (설정 파일·CI는 아직 없음)               |
| 플랫폼     | 데스크톱·모바일 **동등** 지원 (`max-w-7xl`, 반응형 그리드)      |


> 초기 플랜의 "Python만 MVP"는 확장됨. 현재는 C언어·Java가 Python보다 문제 수가 많음.

---

## 3. 핵심 기능 및 차별점

### 3.1 기출 코드 시각화 (Trace)

- **Python**: 슬라이싱, 리스트, 딕셔너리, 함수, 내장 함수 등
- **C언어**: 포인터, 구조체, 연결 리스트, 큐, 연산자, 문자열 등
- **Java**: 상속, 인터페이스, enum, 참조, 람다, 연산자 등
- 문제 콘텐츠는 `src/problems/{language}/{slug}.ts`에 직접 정의

### 3.2 단계별 디버깅(Trace) UI

- **줄 단위 상세 Trace** — 루프·함수 호출·포인터 연산 등을 한 동작씩 분리해 **건너뛰지 않고** 실행 흐름 표시
- **[이전] / [다음]** 버튼으로 코드 한 줄씩 실행 흐름 제어
- **키보드 단축키** (← → 이동, Space 재생/정지)
- **단계 슬라이더** — 현재 단계 위치 표시
- **자동 재생(▶)** — 단계를 연속 재생 (1.2초 간격)
- Trace 중: **좌측 문제 코드**에서 **다중 라인 하이라이트**
  - **앰버** — 현재 실행 중인 줄 (`line`)
  - **하늘색** — 호출·참조하는 함수 정의 줄 (`relatedLines`, role `call`)
  - **인디고** — 함수 정의 줄 (`role` `definition`)
  - **보라색** — 참조하는 변수·데이터 선언 줄 (`role` `read`)
  - 코드 영역 상단에 **색상 범례** (`CodeLineLegend`)
- **단계 설명**은 우측 재생 컨트롤 아래 별도 카드로 표시
- 풀이 잠금 해제 시 **문제 카드 · 단계 설명 · 변수 추적 · 메모리 스냅샷**에 **초록(emerald) 집중 테두리** 적용

### 3.3 변수 추적 · 메모리 시각화

- 변수명·타입·값 **표(Table)** — **0단계~현재 단계 누적** (`mergeTraceVariables.ts`, `유지` 뱃지)
- 문자열·리스트 **메모리 시각화**(박스) — Python 등
- **메모리 스냅샷 패널** (`MemorySnapshotPanel`) — `memory` 데이터가 있는 단계에 표시 (언어 공통)
  - **C언어**: 스택 / 데이터(배열) / 힙, 포인터·연결 리스트 화살표
  - **Python**: 리스트·딕셔너리·문자열 데이터 영역, 스택 변수
  - **Java**: 객체 힙, 배열·필드 참조
  - 스냅샷도 **단계 누적** — `mergeTraceMemory.ts`로 이전 셀·참조는 `유지`로 남음
- **Framer Motion** 애니메이션으로 값 변경 강조
- `print` / `printf` 출력 시 **출력 결과** 영역 표시

### 3.4 정답 입력 · 해설

- **제출하기**: 정답 입력 후 제출 → 정오답 피드백 → 풀이 과정 잠금 해제
- **모르겠어요**: 입력 없이 풀이 과정 확인 (피드백에 정답 표시)
- 잠금 해제 전 우측에는 안내 문구만 표시
- **[정답·해설 보기]** 토글 — 최종 정답 + 전체 풀이 해설

### 3.5 연습장 (Scratch) — Trace 외 추가 기능

Trace 풀이 화면 헤더 **「📝 연습장 열기」** → 새 창 (`openScratchWindow.ts`)에서 `/[lang]/[slug]/scratch` 로드.

**3열 레이아웃** (`ScratchResizableColumns.tsx` — 열 경계 드래그로 너비 조절, 기본 약 33% / 33% / 34%)


| 열        | 역할                       | 주요 컴포넌트                                |
| -------- | ------------------------ | -------------------------------------- |
| **문제**   | 지문·코드·(출력값) 표시 + 필기 오버레이 | `ScratchProblemPanel`, `ScratchCanvas` |
| **그림판**  | 자유 필기·화살표·메모             | `ScratchCanvas`                        |
| **워크시트** | 변수·메모리 수기 표              | `ScratchWorksheet`                     |


**필기**

- 문제·그림판 **각각** 펜 5색, 지우개, 되돌리기(↩), 초기화
- 문제 영역 **필기 켜짐/꺼짐** 토글 (꺼지면 필기 레이어만 숨김, 원문 표시)
- 커스텀 커서 (펜 색·지우개 모양)
- 문제 코드는 Trace용 `CodeLines` 재사용 (`showLegend={false}` — 실행 중 범례 없음)
- 가로로 긴 코드: 패널 스크롤 + 열 너비 조절

**워크시트**

- 변수 표(이름·값), 메모리 슬롯(라벨·값)
- `+` 로 행·슬롯 추가, `−` 삭제 (변수 최대 20, 메모리 최대 16)
- **⋮⋮ 핸들 드래그**로 순서 변경 (`usePointerReorder.ts`, framer-motion `layout` 애니메이션)
- `problem.worksheet` 없으면 `resolveWorksheet.ts`가 `traceSteps`에서 행·슬롯 수 추론
- 포인터·연결리스트 문제는 `showArrowHints`로 그림판 화살표 안내

**저장·이탈**

- **이미지로 저장** — 3열 전체 PNG (`html-to-image`, `exportScratchImage.ts`)
- localStorage 없음 — **자동 저장 없음**, 닫기 전 PNG 저장 권장
- dirty 시 `beforeunload` 이탈 경고
- 헤더 **!** 아이콘 호버 시 연습장 사용법 (`ScratchGuide.tsx`)

### 3.6 코드 표시 원칙

- **문제 코드는 Trace 좌측에만** 표시 — 우측에 코드 중복 없음
- Trace 하이라이트는 **좌측 문제 코드**에서만 동작
- 우측: 재생 컨트롤 → 단계 설명 → 변수 추적 → 메모리 스냅샷(있을 때) → 정답·해설
- 연습장 문제 열: Trace 범례 없이 정적 코드 + 필기 오버레이

### 3.7 Next.js 기반 웹

- SSG로 문제·연습장 페이지 사전 렌더링 (`generateStaticParams`)
- 라이트 모드 중심의 깔끔한 학습 사이트 톤

---

## 4. 사이트 구조 (페이지)

```
홈 (/)
  └─ 언어 선택 — Python · C언어 · Java
       ├─ /python | /c | /java — 문제 목록 + 🎲 랜덤
       │    └─ /[lang]/[slug] — Trace 풀이
       │         └─ /[lang]/[slug]/scratch — 연습장 (새 창)
```

### 라우트 일람


| 경로                       | 파일                                       | 설명           |
| ------------------------ | ---------------------------------------- | ------------ |
| `/`                      | `src/app/page.tsx`                       | 홈 — 언어 선택    |
| `/python`                | `src/app/python/page.tsx`                | Python 문제 목록 |
| `/c`                     | `src/app/c/page.tsx`                     | C언어 문제 목록    |
| `/java`                  | `src/app/java/page.tsx`                  | Java 문제 목록   |
| `/{lang}/[slug]`         | `src/app/{lang}/[slug]/page.tsx`         | Trace 풀이     |
| `/{lang}/[slug]/scratch` | `src/app/{lang}/[slug]/scratch/page.tsx` | 연습장          |


빌드 시 정적 페이지: 홈 1 + 목록 3 + Trace 33 + Scratch 33 ≈ **70페이지**

### 네비게이션 흐름

1. **홈**: 세 언어 카드 (`src/data/languages.ts`), 부제 "정보처리기사 실기 준비"
2. **문제 목록**: 카드 그리드, 주제 태그 표시(필터 UI 없음), 랜덤 버튼
3. **Trace 풀이**: ← 문제 목록, **연습장 열기**, 2단 레이아웃
4. **연습장**: 팝업 전체 화면, 3열 + PNG 저장

---

## 5. 기본 UI 스펙 (Trace)

> 예외(입력값 없음, stdout 없음 등)가 없다면 Trace 문제 페이지는 이 레이아웃을 따른다.

### 5.1 전체 구조

**데스크톱**: 헤더(전체 너비) + 좌우 2단 (`max-w-7xl`)  
**모바일**: 헤더 + 세로 스택

```
┌────────────────────────────────────────────────────────────┐
│ [← 문제 목록]  제목    [📝 연습장]  [회차][주제][난이도]      │
├─────────────────────────────┬──────────────────────────────┤
│  [좌측]                      │  [우측]                       │
│  문제 카드 + 내 답안          │  (잠금 전) 안내 카드           │
│                              │  (잠금 후) 재생·설명·변수·메모리 │
└─────────────────────────────┴──────────────────────────────┘
```

### 5.2 헤더


| 요소   | 설명                                  |
| ---- | ----------------------------------- |
| 뒤로가기 | `←` + 언어별 문제 목록 (`listHref`, 홈이 아님) |
| 제목   | `h1`                                |
| 연습장  | `📝 연습장 열기` — 새 창                   |
| 뱃지   | 출처 · 주제 · 난이도                       |


### 5.3 좌측 · 우측

- **좌측** (`ProblemSidebar`): `ProblemCard` + 내 답안(제출/모르겠어요)
- **우측**: 잠금 전 안내 → 잠금 후 `TraceControls` → `StepComment` → `VariableWatcher` → `MemorySnapshotPanel`(해당 시) → `AnswerPanel`

### 5.4 카드 · 타이포 · 컴포넌트


| 용도             | 스타일                                              |
| -------------- | ------------------------------------------------ |
| 기본 카드          | `rounded-xl`, `border-slate-200`, `ContentPanel` |
| focused (풀이 중) | `border-emerald-300`, `shadow-emerald-100/50`    |
| 본문             | Pretendard Variable                              |
| 코드             | JetBrains Mono                                   |


```
src/components/trace/
├── TraceViewer.tsx
├── ProblemSidebar.tsx
├── ProblemCard.tsx
├── StepComment.tsx
├── ContentPanel.tsx      # CodeLines, CodeLineLegend, showLegend 옵션
├── TraceControls.tsx
├── VariableWatcher.tsx
├── MemorySnapshotPanel.tsx
└── AnswerPanel.tsx

src/components/scratch/
├── ScratchViewer.tsx
├── ScratchResizableColumns.tsx
├── ScratchProblemPanel.tsx
├── ScratchCanvas.tsx
├── ScratchWorksheet.tsx
├── ScratchDrawingToolbar.tsx
├── ScratchGuide.tsx
├── usePointerReorder.ts
├── WorksheetDragHandle.tsx
├── WorksheetDragOverlay.tsx
├── drawingUtils.ts · drawingCursors.ts · scratchTypes.ts
├── worksheetReorder.ts · worksheetIds.ts · resolveWorksheet.ts (lib)
├── exportScratchImage.ts (lib)
└── openScratchWindow.ts (lib)
```

---

## 6. 기술 아키텍처

### 6.1 Trace 엔진

- **미리 계산된 단계 데이터(Precomputed)** — `traceSteps` 배열
- **다중 라인 하이라이트**: `relatedLines` (`scripts/enrich-trace-steps.mjs`로 보강)
- **메모리 스냅샷**: `memory` 필드 (`enrich-trace-steps.mjs`)
- **줄 번호 검증**: `scripts/fix-trace-lines.mjs`, `scripts/validate-trace-lines.mjs`
- **품질 감사**: `scripts/audit-final.mjs`, `scripts/audit-print-highlights.mjs`
- UI 누적 병합: `src/lib/mergeTraceVariables.ts`, `src/lib/mergeTraceMemory.ts`

### 6.2 콘텐츠 구조

```
src/problems/
├── python/   # 6문제 + index.ts
├── c/        # 13문제 + index.ts
└── java/     # 14문제 + index.ts
```

동적 라우팅: `/[lang]/[slug]`, `/[lang]/[slug]/scratch` + `generateStaticParams`

### 6.3 문제 데이터 필드 (`src/types/problem.ts`)


| 필드                                        | 설명                                   |
| ----------------------------------------- | ------------------------------------ |
| `id`, `slug`, `title`, `topic`            | 식별·표시                                |
| `difficulty`                              | 쉬움 / 보통 / 어려움                        |
| `source`, `estimatedMinutes`              | 출처, 예상 시간                            |
| `prompt`, `code`, `answer`, `explanation` | 본문                                   |
| `input?`                                  | 입력값 (없으면 UI 생략)                      |
| `output?`                                 | 기대 출력 (있으면 문제 카드에 표시, 드문 사용)         |
| `traceSteps`                              | Trace 단계 배열 (필수)                     |
| `worksheet?`                              | 연습장 워크시트 초기 행·슬롯 (없으면 trace에서 자동 추론) |
| `memoryView?`                             | `"classic"`(기본) 또는 `"diagram"` — 메모리 UI 모드 |


### 6.4 Trace Step 스키마

```ts
type RelatedLineRole = "call" | "definition" | "read";

type RelatedLine = {
  line: number;
  role: RelatedLineRole;
  label?: string;
};

type MemoryCell = {
  id: string;
  region: "stack" | "heap" | "data";
  label: string;
  value: string;
  address?: string;
  highlight?: boolean;
  carriedOver?: boolean;  // UI 병합 시 유지 셀
};

type MemoryArrow = {
  from: string;
  to: string;
  label?: string;
  highlight?: boolean;
};

type MemorySnapshot = {
  cells: MemoryCell[];
  arrows: MemoryArrow[];
};

type TraceStep = {
  line: number;
  relatedLines?: RelatedLine[];
  comment: string;
  variables: Variable[];
  stdout?: string;
  memory?: MemorySnapshot;           // classic 모드 — 스택/데이터/힙 카드
  memoryDiagram?: MemoryDiagramSnapshot;  // diagram 모드 — 주소·참조 다이어그램
};

type Variable = {
  name: string;
  type: string;
  value: string | number | boolean | null | VariableValue[];
  highlight?: boolean;
};

type WorksheetConfig = {
  variableRows: number;
  memorySlots: number;
  showArrowHints?: boolean;
};
```

### 6.5 기술 스택


| 영역      | 선택                                              |
| ------- | ----------------------------------------------- |
| 프레임워크   | Next.js 16 (App Router) + React 19 + TypeScript |
| 스타일     | Tailwind CSS v4                                 |
| 애니메이션   | Framer Motion                                   |
| 연습장 PNG | html-to-image                                   |
| 본문 폰트   | Pretendard Variable                             |
| 코드 폰트   | JetBrains Mono (`next/font`)                    |
| 코드 표시   | 자체 `CodeLines` + 줄 단위 Trace 하이라이트               |
| 배포 (예정) | Netlify                                         |
| 렌더링     | SSG                                             |


---

## 7. 개발 단계 (로드맵)

### Phase 1 — 기반 & Trace 코어 ✅

- 프로젝트 구조·디자인 시스템
- Trace Step 타입·샘플 문제
- 코드 줄 하이라이트 + 단계 이동 UI
- Variable Watcher (표 + 메모리 시각화)

### Phase 2 — Trace UX & 기본 UI ✅

- 키보드 단축키, 슬라이더, 자동 재생
- Framer Motion 변수 변경 애니메이션
- 정답 입력 · 모르겠어요 · 정답·해설 토글
- 좌우 2단 레이아웃 + 반응형
- 메모리 스냅샷 패널 (다언어)
- `relatedLines` 다중 하이라이트 + 범례

### Phase 3 — 사이트 구조 & 다언어 콘텐츠 ✅ (부분)

- 홈 (언어 선택 UI) — Python · C언어 · Java 활성
- 언어별 문제 목록 (`ProblemListPage`)
- 랜덤 문제 진입 (`RandomProblemButton`)
- 동적 라우팅 `/[lang]/[slug]`
- **60문제** Trace 데이터 (Python 14 / C언어 22 / Java 24, 커스텀 18 포함)
- trace 보조 스크립트 5종
- Python 문제 수 추가 (초기 목표 20에 미달)
- 주제별 **필터** UI (현재는 태그 표시만)

### Phase 4 — 연습장 (Scratch) ✅

- `/[lang]/[slug]/scratch` 라우트 (3언어)
- 3열 레이아웃 + 리사이즈 가능 열 경계
- 문제·그림판 필기 (독립 툴바, 초기화, 커서)
- 워크시트 (변수·메모리, 추가/삭제, 드래그 순서 변경)
- PNG 이미지 저장
- Trace 화면에서 연습장 새 창 열기
- 연습장 사용법 가이드 (`ScratchGuide`)

### Phase 5 — 런칭 & 품질

- Netlify 배포 (`netlify.toml`, 빌드 설정)
- SEO 메타·OG (페이지별 `generateMetadata`)
- 도메인 연결
- 성능·접근성 점검
- 콘텐츠 확장 (Python 보강, 난이도·주제 균형)

### Phase 6 — 이후 (Post-MVP)

- (선택) 로그인·북마크·학습 진행률
- (선택) Shiki/Prism 문법 하이라이트
- (선택) 연습장 localStorage 자동 저장

---

## 8. UI 예외 케이스


| 상황             | 처리                                |
| -------------- | --------------------------------- |
| `input` 없음     | 문제 카드에서 입력값 한 줄 생략                |
| `output` 있음    | 문제 카드·연습장에 출력값 섹션 표시              |
| `stdout` 없는 단계 | 변수 추적에서 출력 결과 영역 미표시              |
| `memory` 없는 단계 | 메모리 스냅샷 패널 미표시                    |
| 변수 없는 단계       | "아직 생성된 변수가 없습니다"                 |
| 연습장 Trace 범례   | `showLegend={false}` — 실행 중 표시 없음 |
| 연습장 자동 저장      | 없음 — PNG 수동 저장                    |


---

## 9. 미결정 / 추후 논의

- 도메인·브랜딩 (hello-binary 외 서비스명)
- Netlify `publish` 디렉터리 (.next 직접 지정 vs Next Runtime 플러그인)
- Python 문제 수·주제 커버리지 확대 우선순위
- 주제별 필터 vs 검색
- Shiki/Prism 도입 여부

---

## 10. 결정 요약 (Q&A 기록)


| 질문         | 결정                                   |
| ---------- | ------------------------------------ |
| MVP 범위     | 3언어 Trace + 연습장까지 구현됨                |
| Trace 엔진   | 미리 계산된 `traceSteps`                  |
| 콘텐츠        | `src/problems/{lang}/{slug}.ts`      |
| Trace 레이아웃 | 헤더 + 좌(문제) 우(풀이) / 모바일 스택            |
| 연습장        | 3열(문제·그림판·워크시트), 새 창, PNG 저장         |
| 정답 입력      | 제출 또는 모르겠어요 → Trace 해제               |
| 코드 하이라이트   | Trace 좌측만; 연습장은 정적 코드 + 필기           |
| 변수·메모리 UI  | 단계 누적 + Framer Motion                |
| 폰트         | Pretendard Variable + JetBrains Mono |
| 목록 구조      | 홈 → 언어별 목록 / 랜덤                      |
| C 표기       | UI에서 **C언어** (언어 카드·목록)              |
| 로그인·수익화    | 무료, 로그인 없음                           |
| 배포         | Netlify 예정 (미배포)                     |
| 등록 문제      | 60 (Python 14, C언어 22, Java 24; 커스텀 18) |

---

## 11. 문제 콘텐츠 제작 가이드

> 기존 33문제의 공통 패턴을 정리한 **작성·등록·검증** 절차입니다. 새 문제를 추가할 때 이 섹션을 체크리스트로 사용합니다.

### 11.1 현재 등록 현황 (60문제 = 기출 42 + 커스텀 18)

커스텀(`source: 커스텀-00N`)은 [`custom-problem-bank.md`](./custom-problem-bank.md) 기준으로 언어별 6문제씩 등록됨.

#### Python (14 = 기출 8 + 커스텀 6)

| slug | 제목(요약) | 주제 | 난이도 | trace 단계 |
|------|-----------|------|--------|-----------|
| `human-dev-2026-1` | 문자열 뒤집기와 필터링 | 문자열 | 보통 | 10 |
| `list-slice-print-2026-1` | 리스트 슬라이싱과 print | 슬라이싱 | 보통 | 14 |
| `nested-list-shallow-copy-2026-1` | 얕은 복사 | 리스트 | 어려움 | 13 |
| `dict-enumerate-sum-2025-3` | enumerate와 딕셔너리 튜플 값 | 딕셔너리 | 보통 | 21 |
| `dict-set-intersection-2025-2` | set 교집합 | 딕셔너리 | 보통 | 9 |
| `binary-tree-calc-2025-1` | 이진 트리 재귀 계산 | 함수 | 어려움 | 29 |

#### C언어 (22 = 기출 16 + 커스텀 6)

| slug | 주제 | 난이도 | trace 단계 |
|------|------|--------|-----------|
| `array-average-2026-1` | 포인터 | 보통 | 51 |
| `char-array-insert-2025-1` | 문자열 | 보통 | 19 |
| `string-length-putchar-2025-3` | 문자열 | 보통 | 35 |
| `operator-precedence-2025-3` | 연산자 | 어려움 | 12 |
| `struct-pointer-offset-2025-3` | 구조체 | 어려움 | 6 |
| `struct-double-pointer-2025-2` | 구조체 | 어려움 | 8 |
| `struct-score-decrypt-2025-1` | 구조체 | 어려움 | 31 |
| `malloc-2d-set-sum-2025-1` | 포인터 | 어려움 | 35 |
| `linked-list-reconnect-2025-1` | 연결리스트 | 어려움 | 50 |
| `linked-list-relink-2025-2` | 연결리스트 | 어려움 | 15 |
| `linked-list-reverse-string-2025-2` | 연결리스트 | 어려움 | 45 |
| `linked-list-xor-sum-2025-3` | 연결리스트 | 어려움 | 18 |
| `circular-queue-2025-2` | 큐 | 어려움 | 24 |

#### Java (24 = 기출 18 + 커스텀 6)

| slug | 주제 | 난이도 | trace 단계 |
|------|------|--------|-----------|
| `try-catch-finally-2025-1` | 예외처리 | 보통 | 11 |
| `interface-implements-2025-3` | 인터페이스 | 쉬움 | 7 |
| `enum-values-index-2025-3` | enum | 보통 | 8 |
| `string-concat-2026-1` | 연산자 | 보통 | 9 |
| `string-array-pass-by-value-2025-2` | 참조 | 보통 | 8 |
| `super-constructor-2025-3` | 상속 | 보통 | 9 |
| `method-overload-polymorphism-2026-1` | 상속 | 어려움 | 9 |
| `static-override-polymorphism-2025-2` | 상속 | 어려움 | 6 |
| `inheritance-constructor-override-2025-1` | 상속 | 어려움 | 18 |
| `recursive-array-func-2025-1` | 재귀 | 어려움 | 29 |
| `recursive-calc-overload-2025-1` | 재귀 | 어려움 | 49 |
| `lambda-exception-catch-2025-2` | 람다 | 어려움 | 14 |
| `object-array-swap-2025-2` | 참조 | 어려움 | 11 |
| `reference-memory-diagram-2026-1` | 참조 (diagram UI) | 어려움 | 10 |

**통계 요약:** trace 단계 수는 **6~51단계**(평균 약 20단계). `relatedLines`·`memory`가 있는 단계 비율은 대부분 **80% 이상**. `worksheet` 필드를 명시한 문제는 **없음** — 전부 `resolveWorksheet.ts`가 자동 추론.

---

### 11.2 파일 구조와 네이밍 규칙

```
src/problems/{language}/{slug}.ts   ← 문제 1개 = 파일 1개
src/problems/{language}/index.ts    ← 배열 등록 (필수)
```

| 항목 | 규칙 | 예시 |
|------|------|------|
| **slug** (파일명·URL) | kebab-case, `{개념}-{연도}-{회차}` | `char-array-insert-2025-1` |
| **id** | slug와 동일 | `"char-array-insert-2025-1"` |
| **export 변수명** | camelCase, 연도·회차는 `_` 구분 | `charArrayInsert2025_1` |
| **code 상수** | 파일 상단 `const code = \`...\`;` | 템플릿 리터럴 필수 |
| **언어 폴더** | `python` · `c` · `java` | UI 표기는 C만 **C언어** |

동일 회차에 여러 문제가 있으면 slug 끝 숫자로 구분 (`-2025-1`, `-2025-2`, `-2025-3`).

---

### 11.3 문제 추가 절차 (체크리스트)

```
[1] 기출 선정·코드 정리
      ↓
[2] src/problems/{lang}/{slug}.ts 파일 생성
      ↓
[3] code · 메타데이터 · answer · explanation 작성
      ↓
[4] traceSteps 수동 작성 (핵심 작업)
      ↓
[5] (선택) node scripts/enrich-trace-steps.mjs  — relatedLines·memory 보강
      ↓
[6] node scripts/validate-trace-lines.mjs       — 줄 번호 검증
      ↓
[7] node scripts/audit-final.mjs                  — 종합 품질 감사
      ↓
[8] index.ts에 import + 배열 등록
      ↓
[9] npm run dev → /{lang}/{slug} · /scratch 수동 확인
      ↓
[10] npm run build — SSG 페이지 생성 확인
```

**라우트는 수정하지 않아도 됩니다.** `generateStaticParams`가 `index.ts`의 slug 목록을 읽어 Trace·연습장 페이지를 자동 생성합니다.

---

### 11.4 Problem 메타데이터 작성

#### 필수 필드

| 필드 | 작성 요령 |
|------|----------|
| `title` | 문제 목록·헤더에 표시. 핵심 개념이 드러나게 (예: "문자 배열 삽입과 밀기") |
| `topic` | 목록 카드 태그. 기존 주제명 재사용 권장 (아래 11.4.1 참고) |
| `difficulty` | `"쉬움"` · `"보통"` · `"어려움"` — 현재 쉬움은 1문제, 어려움 비중 높음 |
| `source` | `"2025년 1회차"` 형식 |
| `estimatedMinutes` | 5~7분이 대부분 |
| `prompt` | 시험 지문 톤. 언어명 포함: "다음은 C언어에 대한 문제이다…" |
| `code` | `const code` 템플릿 리터럴. **Trace 줄 번호 = 이 문자열의 1-based 줄** |
| `answer` | 사용자가 입력하는 정답 문자열. 줄바꿈 포함 시 `\n` (예: `"4\nBACDE"`) |
| `explanation` | 번호·표 형식의 **전체 풀이**. Trace 잠금 해제 후 토글로 표시 |

#### 선택 필드

| 필드 | 사용 시점 |
|------|----------|
| `input` | `input()` 등 고정 입력이 있을 때만. 문제 카드에 "입력값" 행 표시 (`human-dev-2026-1`) |
| `output` | 빈칸 채우기·기호 정답 형식일 때. 문제 카드에 "출력값" 행 표시 (`dict-enumerate-sum-2025-3`) |
| `worksheet` | 연습장 초기 행·슬롯을 직접 지정할 때. **현재 미사용** — 생략 시 trace에서 추론 |
| `memoryView: "diagram"` | Java 참조·힙 다이어그램이 핵심일 때. `memoryDiagram` 단계 데이터 필요 |

#### 11.4.1 기존 topic 목록 (재사용 권장)

- **Python:** 슬라이싱, 리스트, 딕셔너리, 문자열, 함수
- **C언어:** 포인터, 구조체, 연결리스트, 큐, 문자열, 연산자
- **Java:** 상속, 참조, 재귀, 예외처리, 인터페이스, enum, 람다, 연산자

---

### 11.5 `code` 작성 규칙

1. **템플릿 리터럴** — `const code = \`...\`;` 패턴 유지 (검증 스크립트가 이 형식을 파싱).
2. **줄 번호 기준** — `traceSteps[].line`은 `code` 본문의 1번째 줄부터 계산. `#include`, `import`, 빈 줄도 번호에 포함.
3. **이스케이프** — C `printf`의 `\n`은 템플릿 안에서 `\\n`으로 작성.
4. **시험지 충실도** — 기출과 동일한 들여쓰기·공백 유지. Trace 하이라이트가 코드와 1:1 대응해야 함.
5. **실행 가능 여부** — 실제 컴파일/실행은 필수 아님. Trace는 **수동 시뮬레이션** 데이터.

---

### 11.6 `traceSteps` 작성 가이드 (핵심)

Trace 품질이 서비스 차별점이므로, **가장 많은 시간을 쓰는 단계**입니다.

#### 11.6.1 단계 분해 원칙

| 원칙 | 설명 | 예시 |
|------|------|------|
| **한 동작 = 한 단계** | 루프 1회전, 대입 1번, 함수 진입·복귀를 분리 | `for` 매 반복마다 별도 step |
| **건너뛰지 않기** | 시험에서 헷갈리는 지점(형변환, 포인터 이동, 예외 분기)을 반드시 포함 | `Data[3]-Data[1]` 계산 단계 |
| **시작·종료 단계** | 첫 step: "프로그램/ main() 시작". 마지막: 최종 출력 또는 return | Java `main()` 시작 → `line: 3` |
| **실행 안 되는 분기** | `catch` 미실행 블록도 **설명 step**으로 남김 (학습용) | `try-catch-finally`의 ArrayIndex catch |
| **빈 variables 허용** | 분기 진입·루프 조건 확인 등 설명만 있는 단계 OK | `"try 블록에 진입합니다."` |

#### 11.6.2 `line` (현재 실행 줄)

- **앰버 하이라이트** 대상. 반드시 `code` 범위 안 (1 ~ 줄 수).
- 한 줄에서 여러 동작이 일어나면 **같은 line에 여러 step** 가능 (예: `line: 1`에 "시작" + "변수 대입").
- 함수 내부 실행 시 해당 함수의 줄 번호 사용 (`main`이 23행이면 C 함수 본문은 그 이후 줄).

#### 11.6.3 `comment` (단계 설명)

- 우측 `StepComment` 카드에 표시. **한국어**, 수험생 눈높이.
- 변수 값 변화를 문장에 명시: `"int len = 10"`, `"i=2, Data[2]='D'(68)>67 → break"`.
- 검증 스크립트가 comment 키워드로 line을 추론하므로, **코드와 어긋나는 표현 금지**.

#### 11.6.4 `variables` (변수 추적)

```ts
{ name: "i", type: "int", value: 2, highlight: true }
```

| 규칙 | 내용 |
|------|------|
| `highlight: true` | **이번 단계에서 바뀐 값**만. UI·메모리 패널에서 강조 |
| `highlight` 생략/false | 이전 값 유지 표시 (누적 테이블에 `유지` 뱃지) |
| `type` | 언어 타입 문자열: `int`, `int[]`, `list`, `str`, `Box`, `ArithmeticException` 등 |
| `value` | 원시값·문자열·배열·중첩 배열. 객체 요약은 문자열 (`"x=1\nnext=NULL"`) |
| 제외 이름 | `호출`, `부모`, `자식`, `연결` — UI 추적·워크시트에서 스킵 |
| 함수 지역 변수 | `mergeTraceVariables.ts`가 함수 진입 시 `av`, `i`, `list_sum` 등 일부 자동 제거 |

#### 11.6.5 `stdout` (출력)

- `print` / `printf` / `putchar` / `System.out.print` 실행 **해당 step에만** 설정.
- **누적되지 않음** — 각 step의 `stdout`은 그 시점 출력분만 (`VariableWatcher`가 `currentStep.stdout` 표시).
- 여러 줄 출력 문제: 줄마다 별도 step + 각각 `stdout` (예: `char-array-insert` — `"4"` / `"BACDE"`).
- 최종 단계에 전체 출력을 요약하려면 `comment`에 명시: `"최종 출력은 출력1출력5"`.

#### 11.6.6 `relatedLines` (다중 하이라이트)

```ts
{ line: 2, role: "read", label: "Data 선언" }
{ line: 5, role: "definition", label: "arr1 정의" }
{ line: 27, role: "call", label: "arr1 호출" }
```

| role | 색상 | 용도 |
|------|------|------|
| `call` | 하늘색 | 현재 줄이 호출·참조하는 **호출 위치** |
| `definition` | 인디고 | 참조하는 **함수·메서드 정의** |
| `read` | 보라색 | 읽는 **변수 선언 줄** |

- 수동 작성 가능. `enrich-trace-steps.mjs`가 comment·variables 기반으로 **자동 보강** (기존 문제 대부분 이 스크립트 결과 포함).
- 출력 줄(`print`/`printf`)은 active가 아닐 때 related에서 제외하는 규칙이 audit에 있음.

#### 11.6.7 `memory` vs `memoryDiagram`

| | `memory` (classic) | `memoryDiagram` (diagram) |
|--|-------------------|---------------------------|
| **UI** | `MemorySnapshotPanel` — stack/data/heap 카드 | `MemoryDiagramPanel` — 주소·참조 다이어그램 |
| **활성화** | step에 `memory` 있으면 표시 | `memoryView: "diagram"` + step에 `memoryDiagram` |
| **사용 언어** | Python·C·Java 대부분 | 현재 **Java 1문제** (`reference-memory-diagram-2026-1`) |
| **누적** | `mergeTraceMemory.ts` — 이전 셀 `유지` | `mergeTraceMemoryDiagram.ts` |

**C언어 memory 관례**

- `region: "stack"` — 지역 변수·포인터 (`address` 선택)
- `region: "data"` — 배열·문자열 본문
- `region: "heap"` — `malloc`, 객체
- `MemoryArrow` — `from`/`to`는 cell `id` 참조. 포인터·`next` 연결 표현
- 연결 리스트: `node_t1`, `ptr_curr` 등 **id 네이밍 일관성** 유지

**Python memory 관례**

- 리스트·딕셔너리·문자열 → `region: "data"`
- 루프 변수 → `region: "stack"`
- 얕은 복사 문제: `arrows`로 "얕은 복사 (내부 리스트 공유)" 표현

---

### 11.7 `index.ts` 등록

```ts
// 1. import 추가
import { myNewProblem2026_2 } from "./my-new-problem-2026-2";

// 2. 배열에 추가 (목록 표시 순서 = 배열 순서)
export const cProblems: Problem[] = [
  myNewProblem2026_2,  // 최신 문제를 앞에 두는 패턴이 많음
  // ...
];
```

- `*ProblemsBySlug`는 배열에서 자동 생성 — **별도 수정 불필요**.
- slug 중복 시 마지막 항목이 덮어씀 → **slug 유일성** 확인.

---

### 11.8 연습장(Scratch) 연동

| 항목 | 동작 |
|------|------|
| 라우트 | `/{lang}/{slug}/scratch` — index 등록만으로 자동 생성 |
| 워크시트 행 수 | `resolveWorksheet.ts`가 traceSteps의 변수·memory 최대치에서 추론 |
| `showArrowHints` | memory가 있는 문제 → 그림판 화살표 안내 자동 활성화 |
| 코드 표시 | Trace용 `CodeLines` 재사용, `showLegend={false}` |
| `input` / `output` | Trace와 동일하게 문제 패널에 표시 |

명시적 `worksheet`가 필요한 경우 (행이 추론보다 많아야 할 때):

```ts
worksheet: { variableRows: 8, memorySlots: 6, showArrowHints: true }
```

---

### 11.9 품질 검증 스크립트

| 스크립트 | 명령 | 역할 |
|---------|------|------|
| `validate-trace-lines.mjs` | `node scripts/validate-trace-lines.mjs` | comment ↔ line 불일치 탐지. `--fix`로 자동 수정 (신중히 사용) |
| `enrich-trace-steps.mjs` | `node scripts/enrich-trace-steps.mjs` | `relatedLines`·`memory` 자동 생성·갱신. **`line`은 변경 안 함** |
| `audit-final.mjs` | `node scripts/audit-final.mjs` | 전 문제 요약 + 이슈 목록. **exit 1 = 이슈 있음** |
| `audit-c-trace-manual.mjs` | C 전용 | 함수 진입·arr1/arr2 맥락 등 C 특화 줄 검사 |
| `audit-c-trace-lines.mjs` | C 전용 | C 줄 번호 패턴 감사 |
| `audit-java-trace-manual.mjs` | Java 전용 | Java Trace 수동 규칙 감사 |
| `audit-print-highlights.mjs` | 공통 | 출력 줄 하이라이트·related 규칙 |

**권장 순서:** traceSteps 초안 → `enrich` → `validate` → 브라우저 확인 → `audit-final` 통과.

`package.json`에는 아직 스크립트 alias 없음 — `node scripts/...`로 직접 실행.

---

### 11.10 언어·유형별 작성 팁

#### Python

- `input` 문제: 첫 step comment에 입력값 명시 (`"HumanDev"가 주어집니다`).
- 슬라이싱·리스트 컴프리헨션: **중간 결과 리스트**를 variables에 배열로 넣기.
- 재귀(`binary-tree-calc`): 함수 **진입·복귀** step + `role: "call"` / `"definition"` relatedLines.

#### C언어

- 포인터 문제: `p[i]` vs `*(p+i)` 등가성을 단계별로 보여줌 (`array-average` 참고).
- 연결 리스트: 노드 생성 → `next` 연결 → 순회를 **시각적으로 분리**. memory arrows 필수.
- `printf` 여러 번: stdout step 분리. 형식 문자열 결과를 comment에 계산 과정 포함.
- 전역 변수(`Data[]`): stack이 아닌 data 영역 또는 별도 표현.

#### Java

- 상속·오버라이딩: **어떤 클래스의 메서드가 호출되는지** comment에 명시.
- 예외: try → catch 매칭 → finally 순서. 실행되지 않는 catch도 step으로 설명.
- 참조·힙이 핵심이면 `memoryView: "diagram"` + `memoryDiagram` 수동 작성 검토.
- `System.out.print` (println 아님): stdout에 줄바꿈 없이 이어 붙는 형태 주의.

---

### 11.11 흔한 실수·주의사항

| 실수 | 결과 | 예방 |
|------|------|------|
| `index.ts` 미등록 | 404, 목록에 안 보임 | 등록 후 `generateStaticParams` 확인 |
| line 번호 어긋남 | 잘못된 줄 하이라이트 | `validate-trace-lines.mjs` |
| highlight 남용 | 강조 효과 상실 | 변경된 변수만 `highlight: true` |
| stdout 누적 기대 | UI는 step별 출력만 표시 | 여러 출력은 step 분리 또는 comment에 합산 설명 |
| `enrich` 후 수동 수정 덮어쓰기 | 손봤던 memory 사라짐 | enrich 전 백업, 또는 enrich 후 재수정 |
| slug·export명 불일치 | import 오류 | 기존 파일 패턴 복사 |
| C `\\n` 이스케이프 누락 | 코드 표시 깨짐 | 템플릿 리터럴 이스케이프 확인 |
| diagram·classic 혼용 | UI 한쪽만 표시 | `memoryView`와 step 데이터 종류 일치 |
| `reference-memory-diagram` 수준 미달 | diagram 문제는 수동 작성 부담 큼 | 참조 문제만 diagram, 나머지는 classic |

---

### 11.12 최소 작업 예시 (골격)

```ts
import type { Problem } from "@/types/problem";

const code = `// 시험지 코드 그대로`;

export const myProblem2026_2: Problem = {
  id: "my-problem-2026-2",
  slug: "my-problem-2026-2",
  title: "문제 제목",
  topic: "포인터",
  difficulty: "보통",
  source: "2026년 2회차",
  estimatedMinutes: 6,
  prompt: "다음은 C언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.",
  code,
  answer: "42",
  explanation: "1. ...\n2. ...",
  traceSteps: [
    { line: 1, comment: "main() 함수가 시작됩니다.", variables: [] },
    {
      line: 2,
      comment: "int x = 10 — x에 10이 저장됩니다.",
      variables: [{ name: "x", type: "int", value: 10, highlight: true }],
    },
    // ... 모든 실행·분기·출력을 빠짐없이
    { line: 5, comment: "printf 출력 → 42", variables: [], stdout: "42" },
  ],
};
```

이후 `index.ts` 등록 → `enrich` → `audit-final` → 브라우저에서 Trace·연습장 확인.


