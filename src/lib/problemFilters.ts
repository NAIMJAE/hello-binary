import type { Problem } from "@/types/problem";

export type SourceFilter = "all" | "exam" | "custom";
export type DifficultyFilter = "all" | Problem["difficulty"];
export type SortKey = "default" | "source" | "topic" | "difficulty" | "time";

export function isCustomProblem(problem: Problem): boolean {
  return problem.source.startsWith("커스텀-");
}

export function filterBySource(problems: Problem[], source: SourceFilter): Problem[] {
  if (source === "exam") return problems.filter((p) => !isCustomProblem(p));
  if (source === "custom") return problems.filter((p) => isCustomProblem(p));
  return problems;
}

export function filterByTopic(problems: Problem[], topic: string | null): Problem[] {
  if (!topic) return problems;
  return problems.filter((p) => p.topic === topic);
}

export function filterByDifficulty(
  problems: Problem[],
  difficulty: DifficultyFilter,
): Problem[] {
  if (difficulty === "all") return problems;
  return problems.filter((p) => p.difficulty === difficulty);
}

/** 기출: 연도·회차 내림차순. 커스텀: 번호 내림차순. 기출이 커스텀보다 앞에. */
function sourceRank(problem: Problem): [number, number, number] {
  if (isCustomProblem(problem)) {
    const num = Number(problem.source.replace("커스텀-", "")) || 0;
    return [1, 0, -num];
  }
  const match = problem.source.match(/(\d+)\s*년(?:\s*(\d+)\s*회차)?/);
  const year = match ? Number(match[1]) : 0;
  const round = match?.[2] ? Number(match[2]) : 0;
  return [0, -year, -round];
}

const difficultyOrder: Record<Problem["difficulty"], number> = {
  쉬움: 0,
  보통: 1,
  어려움: 2,
};

export function sortProblems(problems: Problem[], sort: SortKey): Problem[] {
  const list = [...problems];
  if (sort === "default") return list;

  list.sort((a, b) => {
    if (sort === "topic") {
      return a.topic.localeCompare(b.topic, "ko") || a.title.localeCompare(b.title, "ko");
    }
    if (sort === "difficulty") {
      return (
        difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty] ||
        a.title.localeCompare(b.title, "ko")
      );
    }
    if (sort === "time") {
      return a.estimatedMinutes - b.estimatedMinutes || a.title.localeCompare(b.title, "ko");
    }
    // source
    const ra = sourceRank(a);
    const rb = sourceRank(b);
    for (let i = 0; i < 3; i++) {
      if (ra[i] !== rb[i]) return ra[i] - rb[i];
    }
    return a.title.localeCompare(b.title, "ko");
  });

  return list;
}

export function applyProblemFilters(
  problems: Problem[],
  options: {
    source: SourceFilter;
    topic: string | null;
    difficulty: DifficultyFilter;
    sort: SortKey;
  },
): Problem[] {
  const filtered = filterByDifficulty(
    filterByTopic(filterBySource(problems, options.source), options.topic),
    options.difficulty,
  );
  return sortProblems(filtered, options.sort);
}
