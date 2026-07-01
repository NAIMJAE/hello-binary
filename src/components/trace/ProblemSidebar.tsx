"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Problem, RelatedLine } from "@/types/problem";
import { ContentPanel } from "./ContentPanel";
import { ProblemCard } from "./ProblemCard";

type ProblemSidebarProps = {
  problem: Problem;
  activeLine?: number;
  relatedLines?: RelatedLine[];
  solutionUnlocked: boolean;
  isCorrect: boolean | null;
  skipped: boolean;
  onSubmit: (answer: string) => void;
  onSkip: () => void;
};

export function ProblemSidebar({
  problem,
  activeLine,
  relatedLines,
  solutionUnlocked,
  isCorrect,
  skipped,
  onSubmit,
  onSkip,
}: ProblemSidebarProps) {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;
    onSubmit(userAnswer.trim());
  };

  return (
    <div className="flex flex-col gap-4">
      <ProblemCard
        activeLine={solutionUnlocked ? activeLine : undefined}
        focused={solutionUnlocked}
        problem={problem}
        relatedLines={solutionUnlocked ? relatedLines : undefined}
      />

      <ContentPanel title="내 답안">
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
            <textarea
              className="w-full resize-y bg-transparent font-mono text-sm text-slate-800 outline-none placeholder:text-slate-400"
              disabled={solutionUnlocked}
              placeholder="정답을 입력하세요"
              rows={problem.answer.includes("\n") ? 3 : 2}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </div>

          {!solutionUnlocked ? (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                className="flex-1 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!userAnswer.trim()}
                type="submit"
              >
                제출하기
              </button>
              <button
                className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                type="button"
                onClick={onSkip}
              >
                모르겠어요
              </button>
            </div>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 rounded-lg px-4 py-3 text-sm font-medium ${
                skipped
                  ? "border border-slate-200 bg-slate-50 text-slate-700"
                  : isCorrect
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border border-rose-200 bg-rose-50 text-rose-800"
              }`}
              initial={{ opacity: 0, y: 4 }}
            >
              {skipped ? (
                <p>
                  풀이 과정을 확인해 보세요.
                  <br />
                  정답은{" "}
                  <span className="whitespace-pre-wrap font-mono font-semibold">
                    {problem.answer}
                  </span>
                  입니다.
                </p>
              ) : isCorrect ? (
                <p>정답입니다! 오른쪽에서 풀이 과정을 확인해 보세요.</p>
              ) : (
                <p>
                  오답입니다. 입력:{" "}
                  <span className="whitespace-pre-wrap font-mono">{userAnswer}</span>
                  <br />
                  정답:{" "}
                  <span className="whitespace-pre-wrap font-mono font-semibold">
                    {problem.answer}
                  </span>
                  <br />
                  <span className="mt-1 inline-block font-normal text-rose-700">
                    오른쪽에서 풀이 과정을 확인해 보세요.
                  </span>
                </p>
              )}
            </motion.div>
          )}
        </form>
      </ContentPanel>
    </div>
  );
}
