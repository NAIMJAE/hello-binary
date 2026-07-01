import type { ReactNode } from "react";
import type { RelatedLine, RelatedLineRole } from "@/types/problem";

export const focusedPanelClass =
  "border border-emerald-300 shadow-sm shadow-emerald-100/50";
export const focusedHeaderClass = "border-b border-emerald-200 bg-emerald-50/70";

type ContentPanelProps = {
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  focused?: boolean;
};

export function ContentPanel({
  title,
  children,
  footer,
  focused = false,
}: ContentPanelProps) {
  return (
    <section
      className={`overflow-hidden rounded-xl bg-white transition-all duration-300 ${
        focused ? focusedPanelClass : "border border-slate-200 shadow-sm"
      }`}
    >
      <div
        className={`px-4 py-2 transition-colors duration-300 ${
          focused ? focusedHeaderClass : "border-b border-slate-200 bg-slate-100"
        }`}
      >
        <span className="text-xs font-medium tracking-wide text-slate-600">{title}</span>
      </div>
      {children}
      {footer}
    </section>
  );
}

type CodeLinesProps = {
  lines: string[];
  showLineNumbers?: boolean;
  activeLine?: number;
  relatedLines?: RelatedLine[];
  /** false면 내부 가로 스크롤 없이 부모가 스크롤 처리 */
  containScroll?: boolean;
  /** trace 하이라이트 범례 (연습장 등 정적 표시에서는 false) */
  showLegend?: boolean;
};

const relatedLineStyles: Record<
  RelatedLineRole,
  { row: string; num: string; code: string; border: string }
> = {
  call: {
    row: "bg-sky-50",
    num: "font-semibold text-sky-600",
    code: "border-l-2 border-sky-400 bg-sky-50/50 pl-3",
    border: "border-sky-400",
  },
  definition: {
    row: "bg-indigo-50",
    num: "font-semibold text-indigo-600",
    code: "border-l-2 border-indigo-400 bg-indigo-50/50 pl-3",
    border: "border-indigo-400",
  },
  read: {
    row: "bg-violet-50",
    num: "font-semibold text-violet-600",
    code: "border-l-2 border-violet-400 bg-violet-50/50 pl-3",
    border: "border-violet-400",
  },
};

function resolveLineRole(
  lineNumber: number,
  activeLine: number | undefined,
  relatedLines: RelatedLine[] | undefined,
): RelatedLineRole | "active" | null {
  if (activeLine !== undefined && lineNumber === activeLine) return "active";
  if (!relatedLines?.length) return null;
  const hit = relatedLines.find((r) => r.line === lineNumber);
  return hit?.role ?? null;
}

export function CodeLineLegend({ relatedLines }: { relatedLines?: RelatedLine[] }) {
  if (!relatedLines?.length) {
    return (
      <div className="flex flex-wrap gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-2 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border border-amber-400 bg-amber-50" />
          실행 중
        </span>
      </div>
    );
  }

  const roles = new Set(relatedLines.map((r) => r.role));

  return (
    <div className="flex flex-wrap gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-2 text-[11px] text-slate-500">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm border border-amber-400 bg-amber-50" />
        실행 중
      </span>
      {roles.has("call") && (
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border border-sky-400 bg-sky-50" />
          호출·정의
        </span>
      )}
      {roles.has("definition") && (
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border border-indigo-400 bg-indigo-50" />
          함수 정의
        </span>
      )}
      {roles.has("read") && (
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border border-violet-400 bg-violet-50" />
          참조 선언
        </span>
      )}
    </div>
  );
}

export function CodeLines({
  lines,
  showLineNumbers = true,
  activeLine,
  relatedLines,
  containScroll = true,
  showLegend = true,
}: CodeLinesProps) {
  return (
    <div className={containScroll ? "overflow-x-auto" : "min-w-max"}>
      {showLegend && <CodeLineLegend relatedLines={relatedLines} />}
      <pre className="p-4 font-mono text-sm leading-7 text-slate-800">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const role = resolveLineRole(lineNumber, activeLine, relatedLines);
          const isActive = role === "active";
          const relatedStyle = role && role !== "active" ? relatedLineStyles[role] : null;

          return (
            <div
              key={lineNumber}
              className={`flex rounded-md transition-colors ${
                isActive ? "bg-amber-50" : relatedStyle?.row ?? ""
              }`}
            >
              {showLineNumbers && (
                <span
                  className={`w-8 shrink-0 select-none pr-3 text-right ${
                    isActive
                      ? "font-semibold text-amber-600"
                      : relatedStyle?.num ?? "text-slate-400"
                  }`}
                >
                  {lineNumber}
                </span>
              )}
              <code
                className={`flex-1 whitespace-pre ${
                  isActive
                    ? "border-l-2 border-amber-400 bg-amber-50/50 pl-3"
                    : relatedStyle?.code ?? (showLineNumbers ? "pl-3" : "")
                }`}
              >
                {line || " "}
              </code>
            </div>
          );
        })}
      </pre>
    </div>
  );
}

type StaticCodePanelProps = {
  title: string;
  content: string;
  showLineNumbers?: boolean;
};

export function StaticCodePanel({ title, content, showLineNumbers = true }: StaticCodePanelProps) {
  const lines = content.split("\n");

  return (
    <ContentPanel title={title}>
      <CodeLines lines={lines} showLineNumbers={showLineNumbers} />
    </ContentPanel>
  );
}
