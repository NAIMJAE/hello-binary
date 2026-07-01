"use client";

const GUIDE_ITEMS = [
  "세 영역 사이 경계선을 드래그해 문제·그림판·워크시트 너비를 조절해 보세요.",
  "문제 영역은 「필기 켜짐 / 꺼짐」으로 필기 레이어 표시를 바꿀 수 있습니다. 꺼두면 원문만 보이고 실수로 필기할 일이 없어요.",
  "문제와 그림판은 각각 펜·지우개·되돌리기(↩)·초기화가 따로 동작합니다.",
  "워크시트의 변수·메모리 표에 풀이 과정을 직접 적어 보세요. ⋮⋮ 핸들로 순서를 바꿀 수 있고, + 버튼으로 행·슬롯을 추가할 수 있습니다.",
  "우측 상단 「이미지로 저장」으로 필기와 워크시트 전체를 PNG로 남길 수 있습니다.",
  "연습장 내용은 자동 저장되지 않습니다. 창을 닫기 전에 이미지로 저장해 두세요.",
  "코드가 가로로 길면 문제 열을 넓히거나, 문제 영역을 스크롤해 확인하세요.",
] as const;

export function ScratchGuide() {
  return (
    <div className="group relative inline-flex">
      <button
        aria-label="연습장 사용법 보기"
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-amber-300/80 bg-amber-50 text-[10px] font-bold leading-none text-amber-700 transition hover:border-amber-400 hover:bg-amber-100"
        type="button"
      >
        !
      </button>

      <div
        className="pointer-events-none absolute left-0 top-full z-50 w-72 pt-1.5 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
        role="tooltip"
      >
        <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-3 shadow-lg shadow-slate-200/60">
          <p className="mb-2 text-xs font-semibold text-slate-800">연습장 사용법</p>
          <ul className="space-y-2 text-[11px] leading-relaxed text-slate-600">
            {GUIDE_ITEMS.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-amber-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
