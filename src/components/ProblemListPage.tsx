import Link from "next/link";
import { RandomProblemButton } from "@/components/RandomProblemButton";
import type { Problem } from "@/types/problem";

type ProblemListPageProps = {
  languageName: string;
  basePath: string;
  problems: Problem[];
  emptyMessage?: string;
};

export function ProblemListPage({
  languageName,
  basePath,
  problems,
  emptyMessage = "아직 등록된 문제가 없습니다.",
}: ProblemListPageProps) {
  const topics = [...new Set(problems.map((p) => p.topic))];

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
            <p className="text-sm font-medium text-amber-600">{languageName}</p>
            <h1 className="text-3xl font-bold text-slate-900">문제 선택</h1>
            <p className="text-slate-600">
              풀고 싶은 문제를 고르거나, 랜덤으로 시작해 보세요.
            </p>
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {problems.length > 0 ? (
          <>
            <RandomProblemButton basePath={basePath} problems={problems} />

            <section className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide text-slate-500">
                문제 목록 ({problems.length})
              </h2>
              <ul className="space-y-2">
                {problems.map((problem) => (
                  <li key={problem.id}>
                    <Link
                      className="block rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:border-amber-300 hover:shadow-md"
                      href={`${basePath}/${problem.slug}`}
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                          {problem.source}
                        </span>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">
                          {problem.topic}
                        </span>
                        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-violet-700">
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="mt-2 font-medium text-slate-900">{problem.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-slate-600">{emptyMessage}</p>
          </div>
        )}
      </main>
    </div>
  );
}
