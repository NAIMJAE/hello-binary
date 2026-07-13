type ContentDisclaimerProps = {
  className?: string;
};

export function ContentDisclaimer({ className = "" }: ContentDisclaimerProps) {
  return (
    <aside
      className={`rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-xs leading-relaxed text-slate-500 ${className}`}
    >
      <p>
        본 사이트의 <span className="font-medium text-slate-600">커스텀</span> 문제는
        정보처리기사 실기 대비를 위한{" "}
        <span className="font-medium text-slate-600">연습용 자체 제작</span> 콘텐츠입니다.
        기출 문제와 구분되어 있으며, 출제 기관의 공식 자료가 아닙니다.
      </p>
      <p className="mt-1.5">
        기출 회차 표기가 있는 문항은 학습 참고용으로 구성되었습니다.
      </p>
    </aside>
  );
}
