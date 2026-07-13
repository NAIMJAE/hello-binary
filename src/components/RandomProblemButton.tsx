"use client";

import { useRouter } from "next/navigation";
import type { Problem } from "@/types/problem";
import type { SourceFilter } from "@/lib/problemFilters";

type RandomProblemButtonProps = {
  problems: Problem[];
  basePath: string;
  sourceFilter: SourceFilter;
  onSourceFilterChange?: (source: SourceFilter) => void;
};

const sourceOptions: { value: SourceFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "exam", label: "기출만" },
  { value: "custom", label: "커스텀만" },
];

export function RandomProblemButton({
  problems,
  basePath,
  sourceFilter,
  onSourceFilterChange,
}: RandomProblemButtonProps) {
  const router = useRouter();
  const disabled = problems.length === 0;

  const handleClick = () => {
    if (disabled) return;
    const random = problems[Math.floor(Math.random() * problems.length)];
    router.push(`${basePath}/${random.slug}`);
  };

  const scopeHint =
    sourceFilter === "exam"
      ? "기출"
      : sourceFilter === "custom"
        ? "커스텀"
        : "전체";

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50/80 shadow-sm ring-1 ring-amber-600/5">
      <div className="flex flex-wrap gap-1.5 border-b border-amber-100/80 px-4 py-3">
        <span className="mr-1 self-center text-[11px] font-medium text-amber-800/70">
          랜덤 범위
        </span>
        {sourceOptions.map((opt) => {
          const active = sourceFilter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                active
                  ? "bg-amber-600 text-white"
                  : "bg-white/80 text-amber-900/70 ring-1 ring-amber-200 hover:bg-amber-50"
              }`}
              onClick={() => onSourceFilterChange?.(opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <button
        className="group relative w-full p-5 text-left transition-all duration-300 enabled:hover:bg-amber-50/40 disabled:cursor-not-allowed disabled:opacity-55"
        type="button"
        disabled={disabled}
        onClick={handleClick}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-amber-200/30 blur-2xl transition group-hover:bg-amber-300/40"
        />
        <p className="relative font-semibold text-amber-900">랜덤 문제</p>
        <p className="relative mt-1.5 text-sm text-amber-800/75">
          {disabled
            ? `${scopeHint} 범위에 풀 수 있는 문제가 없습니다. 필터를 바꿔 보세요.`
            : `${scopeHint} ${problems.length}개 중 무작위로 하나를 풀어보세요.`}
        </p>
      </button>
    </div>
  );
}
