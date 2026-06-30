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
      className="w-full rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-4 text-left transition hover:border-amber-400 hover:bg-amber-100/80"
      type="button"
      onClick={handleClick}
    >
      <p className="font-medium text-amber-900">🎲 랜덤 문제</p>
      <p className="mt-1 text-sm text-amber-800/80">
        {problems.length}개 문제 중 무작위로 하나를 풀어보세요.
      </p>
    </button>
  );
}
