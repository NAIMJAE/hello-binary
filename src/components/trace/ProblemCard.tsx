import type { Problem, RelatedLine } from "@/types/problem";
import { ContentPanel, CodeLines } from "./ContentPanel";

type ProblemCardProps = {
  problem: Problem;
  activeLine?: number;
  relatedLines?: RelatedLine[];
  focused?: boolean;
};

export function ProblemCard({
  problem,
  activeLine,
  relatedLines,
  focused = false,
}: ProblemCardProps) {
  const codeLines = problem.code.split("\n");

  return (
    <ContentPanel focused={focused} title="문제">
      <div className="divide-y divide-slate-100">
        <div className="px-4 py-4">
          <p className="text-sm leading-relaxed text-slate-700">{problem.prompt}</p>
          {problem.input && (
            <p className="mt-2 text-sm text-slate-600">
              입력값:{" "}
              <span className="font-mono text-slate-800">{problem.input}</span>
            </p>
          )}
        </div>

        <div className="bg-slate-50/80">
          <p className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
            문제 코드
          </p>
          <CodeLines activeLine={activeLine} lines={codeLines} relatedLines={relatedLines} />
        </div>

        {problem.output && (
          <div className="bg-slate-50/80">
            <p className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
              출력값
            </p>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-7 text-slate-800">
              {problem.output}
            </pre>
          </div>
        )}
      </div>
    </ContentPanel>
  );
}
