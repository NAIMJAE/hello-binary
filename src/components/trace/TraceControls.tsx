"use client";

type TraceControlsProps = {
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSliderChange: (index: number) => void;
  onTogglePlay: () => void;
};

export function TraceControls({
  stepIndex,
  totalSteps,
  isPlaying,
  onPrev,
  onNext,
  onSliderChange,
  onTogglePlay,
}: TraceControlsProps) {
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>
          단계 {stepIndex + 1} / {totalSteps}
        </span>
        <span className="hidden text-xs sm:inline">
          ← → 이동 · Space 재생/정지
        </span>
      </div>

      <input
        className="mb-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-amber-500"
        max={totalSteps - 1}
        min={0}
        type="range"
        value={stepIndex}
        onChange={(e) => onSliderChange(Number(e.target.value))}
      />

      <div className="flex items-center justify-center gap-3">
        <button
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={isFirst}
          type="button"
          onClick={onPrev}
        >
          ← 이전
        </button>

        <button
          className={`rounded-lg px-5 py-2 text-sm font-medium text-white transition ${
            isPlaying
              ? "bg-slate-700 hover:bg-slate-800"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
          type="button"
          onClick={onTogglePlay}
        >
          {isPlaying ? "⏸ 정지" : "▶ 자동 재생"}
        </button>

        <button
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={isLast}
          type="button"
          onClick={onNext}
        >
          다음 →
        </button>
      </div>
    </section>
  );
}
