"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import type { Problem } from "@/types/problem";
import { answersMatch } from "@/lib/normalizeAnswer";
import { mergeTraceMemory } from "@/lib/mergeTraceMemory";
import { mergeTraceMemoryDiagram } from "@/lib/mergeTraceMemoryDiagram";
import { mergeTraceVariables } from "@/lib/mergeTraceVariables";
import { openScratchWindow } from "@/lib/openScratchWindow";
import {
  readTraceControlsMode,
  writeTraceControlsMode,
} from "@/lib/traceControlsMode";
import { AnswerPanel } from "./AnswerPanel";
import { ProblemSidebar } from "./ProblemSidebar";
import { StepComment } from "./StepComment";
import { TraceControls, type TraceControlsMode } from "./TraceControls";
import { MemorySnapshotPanel } from "./MemorySnapshotPanel";
import { MemoryDiagramPanel } from "./MemoryDiagramPanel";
import { VariableWatcher } from "./VariableWatcher";

type TraceViewerProps = {
  problem: Problem;
  listHref: string;
  scratchBasePath: string;
};

export function TraceViewer({ problem, listHref, scratchBasePath }: TraceViewerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [solutionUnlocked, setSolutionUnlocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [skipped, setSkipped] = useState(false);
  const [controlsMode, setControlsMode] = useState<TraceControlsMode>("inline");

  useEffect(() => {
    setControlsMode(readTraceControlsMode());
  }, []);

  const toggleControlsMode = useCallback(() => {
    setControlsMode((prev) => {
      const next = prev === "inline" ? "dock" : "inline";
      writeTraceControlsMode(next);
      return next;
    });
  }, []);

  const { traceSteps } = problem;
  const currentStep = traceSteps[stepIndex];
  const totalSteps = traceSteps.length;

  const displayVariables = useMemo(
    () => mergeTraceVariables(traceSteps, stepIndex),
    [traceSteps, stepIndex],
  );

  const displayMemory = useMemo(
    () =>
      problem.memoryView === "diagram"
        ? null
        : mergeTraceMemory(traceSteps, stepIndex),
    [traceSteps, stepIndex, problem.memoryView],
  );

  const displayMemoryDiagram = useMemo(
    () =>
      problem.memoryView === "diagram"
        ? mergeTraceMemoryDiagram(traceSteps, stepIndex)
        : null,
    [traceSteps, stepIndex, problem.memoryView],
  );

  const unlockSolution = useCallback(() => {
    setSolutionUnlocked(true);
    setStepIndex(0);
    setIsPlaying(false);
  }, []);

  const handleSubmit = useCallback(
    (answer: string) => {
      setSkipped(false);
      setIsCorrect(answersMatch(answer, problem.answer));
      unlockSolution();
    },
    [problem.answer, unlockSolution],
  );

  const handleSkip = useCallback(() => {
    setSkipped(true);
    setIsCorrect(null);
    unlockSolution();
  }, [unlockSolution]);

  const goPrev = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(totalSteps - 1, i + 1));
  }, [totalSteps]);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  useEffect(() => {
    if (!isPlaying || !solutionUnlocked) return;

    if (stepIndex >= totalSteps - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setStepIndex((i) => i + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, totalSteps, solutionUnlocked]);

  useEffect(() => {
    if (!solutionUnlocked) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext, togglePlay, solutionUnlocked]);

  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 py-6 ${
        solutionUnlocked && controlsMode === "dock" ? "pb-20" : ""
      }`}
    >
      <header className="mb-6 flex items-center gap-3">
        <Link
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          href={listHref}
        >
          <span aria-hidden="true">←</span>
          문제 목록
        </Link>
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{problem.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800 transition hover:border-amber-300 hover:bg-amber-100"
              type="button"
              onClick={() => openScratchWindow(scratchBasePath, problem.id, problem.slug)}
            >
              📝 연습장 열기
            </button>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
              {problem.source}
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
              {problem.topic}
            </span>
            <span className="rounded-full bg-violet-50 px-2.5 py-1 font-medium text-violet-700">
              {problem.difficulty}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        <ProblemSidebar
          activeLine={currentStep.line}
          isCorrect={isCorrect}
          problem={problem}
          relatedLines={currentStep.relatedLines}
          skipped={skipped}
          solutionUnlocked={solutionUnlocked}
          onSkip={handleSkip}
          onSubmit={handleSubmit}
        />

        <div className="relative flex flex-col gap-4">
          {!solutionUnlocked && (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm lg:min-h-[480px]">
              <p className="text-lg font-medium text-slate-700">풀이 과정</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                정답을 제출하거나 &lsquo;모르겠어요&rsquo;를 누르면, 한 줄씩 실행되는 과정을
                건너뛰지 않고 단계별로 확인할 수 있습니다. 실행 중인 줄은 앰버색으로,
                호출·참조하는 다른 줄은 별도 색으로 함께 표시됩니다.
              </p>
            </div>
          )}

          {solutionUnlocked && (
            <>
              {controlsMode === "inline" && (
                <TraceControls
                  isPlaying={isPlaying}
                  mode={controlsMode}
                  stepIndex={stepIndex}
                  totalSteps={totalSteps}
                  onNext={goNext}
                  onPrev={goPrev}
                  onSliderChange={setStepIndex}
                  onToggleMode={toggleControlsMode}
                  onTogglePlay={togglePlay}
                />
              )}

              {currentStep.comment && (
                <StepComment comment={currentStep.comment} />
              )}

              <VariableWatcher
                focused
                stdout={currentStep.stdout}
                variables={displayVariables}
              />

              {displayMemoryDiagram && (
                <MemoryDiagramPanel focused memory={displayMemoryDiagram} />
              )}

              {displayMemory && (
                <MemorySnapshotPanel focused memory={displayMemory} />
              )}

              <AnswerPanel answer={problem.answer} explanation={problem.explanation} />
            </>
          )}
        </div>
      </div>

      {solutionUnlocked && controlsMode === "dock" && (
        <TraceControls
          isPlaying={isPlaying}
          mode={controlsMode}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          onNext={goNext}
          onPrev={goPrev}
          onSliderChange={setStepIndex}
          onToggleMode={toggleControlsMode}
          onTogglePlay={togglePlay}
        />
      )}
    </div>
  );
}
