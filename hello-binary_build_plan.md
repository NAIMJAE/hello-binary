# hello-binary 빌드 플랜

> "텍스트 위주의 지루한 해설 대신, **한 줄도 건너뛰지 않고** 코드가 실행되는 흐름을 눈으로 직접 보며 이해하는 정보처리기사 실기 합격 가이드"

**최종 반영:** 2026-06-30 — 아래 내용은 현재 저장소 구현 기준입니다.

---

## 1. 타겟

- 정보처리기사 실기 시험을 독학하는 수험생
- 비전공자, 프로그래밍 언어(C언어, Java, Python) 코드 분석 문제에서 과락·감점을 겪는 수험생

---

## 2. 제품 전략 (현재)

| 항목 | 결정 · 현황 |
|------|-------------|
| 지원 언어 | **Python · C언어 · Java** — 세 언어 모두 Trace·연습장 동작 |
| 등록 문제 수 | **24문제** (Python 6 · C언어 9 · Java 9) |
| 콘텐츠 목표 | 기출 유형 중심, 문제별 `traceSteps` 사전 제작 |
| 수익화 | **완전 무료, 로그인 없음** |
| 배포 | **Netlify 예정** (설정 파일·CI는 아직 없음) |
| 플랫폼 | 데스크톱·모바일 **동등** 지원 (`max-w-7xl`, 반응형 그리드) |

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

| 열 | 역할 | 주요 컴포넌트 |
|----|------|----------------|
| **문제** | 지문·코드·(출력값) 표시 + 필기 오버레이 | `ScratchProblemPanel`, `ScratchCanvas` |
| **그림판** | 자유 필기·화살표·메모 | `ScratchCanvas` |
| **워크시트** | 변수·메모리 수기 표 | `ScratchWorksheet` |

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

| 경로 | 파일 | 설명 |
|------|------|------|
| `/` | `src/app/page.tsx` | 홈 — 언어 선택 |
| `/python` | `src/app/python/page.tsx` | Python 문제 목록 |
| `/c` | `src/app/c/page.tsx` | C언어 문제 목록 |
| `/java` | `src/app/java/page.tsx` | Java 문제 목록 |
| `/{lang}/[slug]` | `src/app/{lang}/[slug]/page.tsx` | Trace 풀이 |
| `/{lang}/[slug]/scratch` | `src/app/{lang}/[slug]/scratch/page.tsx` | 연습장 |

빌드 시 정적 페이지: 홈 1 + 목록 3 + Trace 24 + Scratch 24 ≈ **52페이지**

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

| 요소 | 설명 |
|------|------|
| 뒤로가기 | `←` + 언어별 문제 목록 (`listHref`, 홈이 아님) |
| 제목 | `h1` |
| 연습장 | `📝 연습장 열기` — 새 창 |
| 뱃지 | 출처 · 주제 · 난이도 |

### 5.3 좌측 · 우측

- **좌측** (`ProblemSidebar`): `ProblemCard` + 내 답안(제출/모르겠어요)
- **우측**: 잠금 전 안내 → 잠금 후 `TraceControls` → `StepComment` → `VariableWatcher` → `MemorySnapshotPanel`(해당 시) → `AnswerPanel`

### 5.4 카드 · 타이포 · 컴포넌트

| 용도 | 스타일 |
|------|--------|
| 기본 카드 | `rounded-xl`, `border-slate-200`, `ContentPanel` |
| focused (풀이 중) | `border-emerald-300`, `shadow-emerald-100/50` |
| 본문 | Pretendard Variable |
| 코드 | JetBrains Mono |

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
├── c/        # 9문제 + index.ts
└── java/     # 9문제 + index.ts
```

동적 라우팅: `/[lang]/[slug]`, `/[lang]/[slug]/scratch` + `generateStaticParams`

### 6.3 문제 데이터 필드 (`src/types/problem.ts`)

| 필드 | 설명 |
|------|------|
| `id`, `slug`, `title`, `topic` | 식별·표시 |
| `difficulty` | 쉬움 / 보통 / 어려움 |
| `source`, `estimatedMinutes` | 출처, 예상 시간 |
| `prompt`, `code`, `answer`, `explanation` | 본문 |
| `input?` | 입력값 (없으면 UI 생략) |
| `output?` | 기대 출력 (있으면 문제 카드에 표시, 드문 사용) |
| `traceSteps` | Trace 단계 배열 (필수) |
| `worksheet?` | 연습장 워크시트 초기 행·슬롯 (없으면 trace에서 자동 추론) |

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
  memory?: MemorySnapshot;
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

| 영역 | 선택 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) + React 19 + TypeScript |
| 스타일 | Tailwind CSS v4 |
| 애니메이션 | Framer Motion |
| 연습장 PNG | html-to-image |
| 본문 폰트 | Pretendard Variable |
| 코드 폰트 | JetBrains Mono (`next/font`) |
| 코드 표시 | 자체 `CodeLines` + 줄 단위 Trace 하이라이트 |
| 배포 (예정) | Netlify |
| 렌더링 | SSG |

---

## 7. 개발 단계 (로드맵)

### Phase 1 — 기반 & Trace 코어 ✅

- [x] 프로젝트 구조·디자인 시스템
- [x] Trace Step 타입·샘플 문제
- [x] 코드 줄 하이라이트 + 단계 이동 UI
- [x] Variable Watcher (표 + 메모리 시각화)

### Phase 2 — Trace UX & 기본 UI ✅

- [x] 키보드 단축키, 슬라이더, 자동 재생
- [x] Framer Motion 변수 변경 애니메이션
- [x] 정답 입력 · 모르겠어요 · 정답·해설 토글
- [x] 좌우 2단 레이아웃 + 반응형
- [x] 메모리 스냅샷 패널 (다언어)
- [x] `relatedLines` 다중 하이라이트 + 범례

### Phase 3 — 사이트 구조 & 다언어 콘텐츠 ✅ (부분)

- [x] 홈 (언어 선택 UI) — Python · C언어 · Java 활성
- [x] 언어별 문제 목록 (`ProblemListPage`)
- [x] 랜덤 문제 진입 (`RandomProblemButton`)
- [x] 동적 라우팅 `/[lang]/[slug]`
- [x] **24문제** Trace 데이터 (Python 6 / C언어 9 / Java 9)
- [x] trace 보조 스크립트 5종
- [ ] Python 문제 수 추가 (초기 목표 20에 미달)
- [ ] 주제별 **필터** UI (현재는 태그 표시만)

### Phase 4 — 연습장 (Scratch) ✅

- [x] `/[lang]/[slug]/scratch` 라우트 (3언어)
- [x] 3열 레이아웃 + 리사이즈 가능 열 경계
- [x] 문제·그림판 필기 (독립 툴바, 초기화, 커서)
- [x] 워크시트 (변수·메모리, 추가/삭제, 드래그 순서 변경)
- [x] PNG 이미지 저장
- [x] Trace 화면에서 연습장 새 창 열기
- [x] 연습장 사용법 가이드 (`ScratchGuide`)

### Phase 5 — 런칭 & 품질

- [ ] Netlify 배포 (`netlify.toml`, 빌드 설정)
- [ ] SEO 메타·OG (페이지별 `generateMetadata`)
- [ ] 도메인 연결
- [ ] 성능·접근성 점검
- [ ] 콘텐츠 확장 (Python 보강, 난이도·주제 균형)

### Phase 6 — 이후 (Post-MVP)

- [ ] (선택) 로그인·북마크·학습 진행률
- [ ] (선택) Shiki/Prism 문법 하이라이트
- [ ] (선택) 연습장 localStorage 자동 저장

---

## 8. UI 예외 케이스

| 상황 | 처리 |
|------|------|
| `input` 없음 | 문제 카드에서 입력값 한 줄 생략 |
| `output` 있음 | 문제 카드·연습장에 출력값 섹션 표시 |
| `stdout` 없는 단계 | 변수 추적에서 출력 결과 영역 미표시 |
| `memory` 없는 단계 | 메모리 스냅샷 패널 미표시 |
| 변수 없는 단계 | "아직 생성된 변수가 없습니다" |
| 연습장 Trace 범례 | `showLegend={false}` — 실행 중 표시 없음 |
| 연습장 자동 저장 | 없음 — PNG 수동 저장 |

---

## 9. 미결정 / 추후 논의

- [ ] 도메인·브랜딩 (hello-binary 외 서비스명)
- [ ] Netlify `publish` 디렉터리 (.next 직접 지정 vs Next Runtime 플러그인)
- [ ] Python 문제 수·주제 커버리지 확대 우선순위
- [ ] 주제별 필터 vs 검색
- [ ] Shiki/Prism 도입 여부

---

## 10. 결정 요약 (Q&A 기록)

| 질문 | 결정 |
|------|------|
| MVP 범위 | 3언어 Trace + 연습장까지 구현됨 |
| Trace 엔진 | 미리 계산된 `traceSteps` |
| 콘텐츠 | `src/problems/{lang}/{slug}.ts` |
| Trace 레이아웃 | 헤더 + 좌(문제) 우(풀이) / 모바일 스택 |
| 연습장 | 3열(문제·그림판·워크시트), 새 창, PNG 저장 |
| 정답 입력 | 제출 또는 모르겠어요 → Trace 해제 |
| 코드 하이라이트 | Trace 좌측만; 연습장은 정적 코드 + 필기 |
| 변수·메모리 UI | 단계 누적 + Framer Motion |
| 폰트 | Pretendard Variable + JetBrains Mono |
| 목록 구조 | 홈 → 언어별 목록 / 랜덤 |
| C 표기 | UI에서 **C언어** (언어 카드·목록) |
| 로그인·수익화 | 무료, 로그인 없음 |
| 배포 | Netlify 예정 (미배포) |
| 등록 문제 | 24 (Python 6, C언어 9, Java 9) |
