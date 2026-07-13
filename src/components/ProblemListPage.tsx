"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { RandomProblemButton } from "@/components/RandomProblemButton";
import {
  applyProblemFilters,
  isCustomProblem,
  type DifficultyFilter,
  type SortKey,
  type SourceFilter,
} from "@/lib/problemFilters";
import type { Problem } from "@/types/problem";

type ProblemListPageProps = {
  languageName: string;
  basePath: string;
  problems: Problem[];
  emptyMessage?: string;
};

const difficultyStyles: Record<Problem["difficulty"], string> = {
  쉬움: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  보통: "bg-sky-50 text-sky-700 ring-sky-600/10",
  어려움: "bg-violet-50 text-violet-700 ring-violet-600/10",
};

const sourceOptions: { value: SourceFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "exam", label: "기출만" },
  { value: "custom", label: "커스텀만" },
];

const difficultyOptions: { value: DifficultyFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "보통", label: "보통" },
  { value: "어려움", label: "어려움" },
];

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "등록순" },
  { value: "source", label: "출처순" },
  { value: "topic", label: "주제명" },
  { value: "difficulty", label: "난이도" },
  { value: "time", label: "예상 시간" },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
        active
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ProblemListCard({ problem, basePath }: { problem: Problem; basePath: string }) {
  const custom = isCustomProblem(problem);

  return (
    <li className="h-full">
      <Link
        className="group relative flex h-full min-h-[9.5rem] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/70 hover:shadow-lg hover:shadow-amber-100/40"
        href={`${basePath}/${problem.slug}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-amber-100/90 via-orange-50/50 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
              custom
                ? "bg-teal-50 text-teal-800 ring-1 ring-teal-600/15"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {problem.source}
          </span>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 ring-1 ring-blue-600/10">
            {problem.topic}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${difficultyStyles[problem.difficulty]}`}
          >
            {problem.difficulty}
          </span>
        </div>

        <h3 className="relative mt-3 line-clamp-2 flex-1 text-base font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-amber-950">
          {problem.title}
        </h3>

        <div className="relative mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-400">약 {problem.estimatedMinutes}분</span>
          <span className="text-xs font-semibold text-amber-600 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
            풀기 →
          </span>
        </div>
      </Link>
    </li>
  );
}

export function ProblemListPage({
  languageName,
  basePath,
  problems,
  emptyMessage = "아직 등록된 문제가 없습니다.",
}: ProblemListPageProps) {
  const [source, setSource] = useState<SourceFilter>("all");
  const [topic, setTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [sort, setSort] = useState<SortKey>("default");

  const topics = useMemo(
    () => [...new Set(problems.map((p) => p.topic))].sort((a, b) => a.localeCompare(b, "ko")),
    [problems],
  );

  const visible = useMemo(
    () => applyProblemFilters(problems, { source, topic, difficulty, sort }),
    [problems, source, topic, difficulty, sort],
  );

  const randomPool = useMemo(
    () =>
      applyProblemFilters(problems, {
        source,
        topic,
        difficulty,
        sort: "default",
      }),
    [problems, source, topic, difficulty],
  );

  const hasAnyProblems = problems.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12">
        <header className="space-y-4">
          <Link
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-800"
            href="/"
          >
            <span aria-hidden="true">←</span>
            언어 선택
          </Link>
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-wide text-amber-600">{languageName}</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              문제 선택
            </h1>
            <p className="max-w-2xl text-slate-600">
              출처·주제·난이도로 걸러 보거나, 랜덤으로 시작해 보세요.
            </p>
          </div>
        </header>

        {hasAnyProblems ? (
          <>
            <section className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold tracking-wide text-slate-400">출처</p>
                <div className="flex flex-wrap gap-1.5">
                  {sourceOptions.map((opt) => (
                    <Chip
                      key={opt.value}
                      active={source === opt.value}
                      onClick={() => setSource(opt.value)}
                    >
                      {opt.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-semibold tracking-wide text-slate-400">주제</p>
                <div className="flex flex-wrap gap-1.5">
                  <Chip active={topic === null} onClick={() => setTopic(null)}>
                    전체
                  </Chip>
                  {topics.map((t) => (
                    <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold tracking-wide text-slate-400">난이도</p>
                  <div className="flex flex-wrap gap-1.5">
                    {difficultyOptions.map((opt) => (
                      <Chip
                        key={opt.value}
                        active={difficulty === opt.value}
                        onClick={() => setDifficulty(opt.value)}
                      >
                        {opt.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="shrink-0 font-semibold tracking-wide text-slate-400">정렬</span>
                  <select
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm text-slate-800 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <RandomProblemButton
              basePath={basePath}
              problems={randomPool}
              sourceFilter={source}
              onSourceFilterChange={setSource}
            />

            <section className="space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-sm font-semibold tracking-wide text-slate-500">문제 목록</h2>
                <span className="text-xs font-medium text-slate-400">
                  {visible.length}
                  {visible.length !== problems.length ? ` / ${problems.length}` : ""}
                  문제
                </span>
              </div>

              {visible.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((problem) => (
                    <ProblemListCard
                      key={problem.id}
                      basePath={basePath}
                      problem={problem}
                    />
                  ))}
                </ul>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                  <p className="text-slate-600">조건에 맞는 문제가 없습니다. 필터를 바꿔 보세요.</p>
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-slate-600">{emptyMessage}</p>
          </div>
        )}

        <ContentDisclaimer />
      </main>
    </div>
  );
}
