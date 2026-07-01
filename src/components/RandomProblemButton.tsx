"use client";

import { useRouter } from "next/navigation";
import type { Problem } from "@/types/problem";

type RandomProblemButtonProps = {
  problems: Problem[];
  basePath: string;
};

export function RandomProblemButton({ problems, basePath }: RandomProblemButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    const random = problems[Math.floor(Math.random() * problems.length)];
    router.push(`${basePath}/${random.slug}`);
  };

  return (
    <button
      className="group relative w-full overflow-hidden rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50/80 p-5 text-left shadow-sm ring-1 ring-amber-600/5 transition-all duration-300 hover:border-amber-300 hover:shadow-md hover:shadow-amber-100/50"
      type="button"
      onClick={handleClick}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-amber-200/30 blur-2xl transition group-hover:bg-amber-300/40"
      />
      <p className="relative font-semibold text-amber-900">🎲 랜덤 문제</p>
      <p className="relative mt-1.5 text-sm text-amber-800/75">
        {problems.length}개 문제 중 무작위로 하나를 풀어보세요.
      </p>
    </button>
  );
}
