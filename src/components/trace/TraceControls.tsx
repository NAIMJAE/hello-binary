"use client";

export type TraceControlsMode = "inline" | "dock";

type TraceControlsProps = {
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  mode: TraceControlsMode;
  onPrev: () => void;
  onNext: () => void;
  onSliderChange: (index: number) => void;
  onTogglePlay: () => void;
  onToggleMode: () => void;
};

function ModeToggleButton({
  mode,
  onToggleMode,
  compact = false,
}: {
  mode: TraceControlsMode;
  onToggleMode: () => void;
  compact?: boolean;
}) {
  const isDock = mode === "dock";

  return (
    <button
      aria-label={isDock ? "재생바를 원래 위치로" : "재생바를 하단에 고정"}
      aria-pressed={isDock}
      className={
        compact
          ? "shrink-0 rounded-md border border-slate-200 px-2 py-0.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          : "rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
      }
      title={isDock ? "원래 위치로" : "하단 고정"}
      type="button"
      onClick={onToggleMode}
    >
      {isDock ? "⤢" : "📌"}
      {!compact && (
        <span className="ml-1">{isDock ? "원래 위치" : "하단 고정"}</span>
      )}
    </button>
  );
}

function TraceControlsCore({
  stepIndex,
  totalSteps,
  isPlaying,
  compact,
  onPrev,
  onNext,
  onSliderChange,
  onTogglePlay,
}: Pick<
  TraceControlsProps,
  | "stepIndex"
  | "totalSteps"
  | "isPlaying"
  | "onPrev"
  | "onNext"
  | "onSliderChange"
  | "onTogglePlay"
> & { compact?: boolean }) {
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  return (
    <>
      <input
        aria-label="단계 슬라이더"
        className={`w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-amber-500 ${
          compact ? "mb-2 h-1.5" : "mb-4 h-2"
        }`}
        max={totalSteps - 1}
        min={0}
        type="range"
        value={stepIndex}
        onChange={(e) => onSliderChange(Number(e.target.value))}
      />

      <div
        className={`flex items-center justify-center ${
          compact ? "gap-2" : "gap-3"
        }`}
      >
        <button
          aria-label="이전 단계"
          className={`rounded-lg border border-slate-200 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 ${
            compact ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"
          }`}
          disabled={isFirst}
          type="button"
          onClick={onPrev}
        >
          {compact ? "←" : "← 이전"}
        </button>

        <button
          aria-label={isPlaying ? "정지" : "자동 재생"}
          className={`rounded-lg font-medium text-white transition ${
            compact ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm"
          } ${
            isPlaying
              ? "bg-slate-700 hover:bg-slate-800"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
          type="button"
          onClick={onTogglePlay}
        >
          {isPlaying ? (compact ? "⏸" : "⏸ 정지") : compact ? "▶" : "▶ 자동 재생"}
        </button>

        <button
          aria-label="다음 단계"
          className={`rounded-lg border border-slate-200 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 ${
            compact ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"
          }`}
          disabled={isLast}
          type="button"
          onClick={onNext}
        >
          {compact ? "→" : "다음 →"}
        </button>
      </div>
    </>
  );
}

export function TraceControls({
  stepIndex,
  totalSteps,
  isPlaying,
  mode,
  onPrev,
  onNext,
  onSliderChange,
  onTogglePlay,
  onToggleMode,
}: TraceControlsProps) {
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  if (mode === "dock") {
    return (
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        role="toolbar"
        aria-label="단계 재생 컨트롤"
      >
        <section className="pointer-events-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm">
          <input
            aria-label="단계 슬라이더"
            className="mb-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-amber-500"
            max={totalSteps - 1}
            min={0}
            type="range"
            value={stepIndex}
            onChange={(e) => onSliderChange(Number(e.target.value))}
          />

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <span className="justify-self-start text-xs font-medium tabular-nums text-slate-500">
              {stepIndex + 1}/{totalSteps}
            </span>

            <div className="flex items-center justify-center gap-1">
              <button
                aria-label="이전 단계"
                className="rounded-md border border-slate-200 px-2 py-0.5 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={isFirst}
                type="button"
                onClick={onPrev}
              >
                ←
              </button>

              <button
                aria-label={isPlaying ? "정지" : "자동 재생"}
                className={`rounded-md px-2.5 py-0.5 text-sm font-medium text-white transition ${
                  isPlaying
                    ? "bg-slate-700 hover:bg-slate-800"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
                type="button"
                onClick={onTogglePlay}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              <button
                aria-label="다음 단계"
                className="rounded-md border border-slate-200 px-2 py-0.5 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={isLast}
                type="button"
                onClick={onNext}
              >
                →
              </button>
            </div>

            <div className="flex items-center justify-end gap-1.5">
              <span className="hidden text-[10px] text-slate-400 whitespace-nowrap sm:inline sm:text-xs">
                ← → 이동 · Space 재생/정지
              </span>
              <ModeToggleButton compact mode={mode} onToggleMode={onToggleMode} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      role="toolbar"
      aria-label="단계 재생 컨트롤"
    >
      <div className="mb-3 flex items-center justify-between gap-2 text-sm text-slate-500">
        <span>
          단계 {stepIndex + 1} / {totalSteps}
        </span>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs sm:inline">
            ← → 이동 · Space 재생/정지
          </span>
          <ModeToggleButton mode={mode} onToggleMode={onToggleMode} />
        </div>
      </div>

      <TraceControlsCore
        isPlaying={isPlaying}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        onNext={onNext}
        onPrev={onPrev}
        onSliderChange={onSliderChange}
        onTogglePlay={onTogglePlay}
      />
    </section>
  );
}
