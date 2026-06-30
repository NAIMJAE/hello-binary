"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Variable, VariableValue } from "@/types/problem";
import type { DisplayVariable } from "@/lib/mergeTraceVariables";
import { focusedHeaderClass, focusedPanelClass } from "./ContentPanel";

type VariableWatcherProps = {
  variables: DisplayVariable[];
  stdout?: string;
  focused?: boolean;
};

function formatValue(value: VariableValue): string {
  if (Array.isArray(value)) {
    return `[${value.map((v) => (typeof v === "string" ? `"${v}"` : String(v))).join(", ")}]`;
  }
  if (typeof value === "string") return `"${value}"`;
  return String(value);
}

function StringMemory({ value, highlight }: { value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1">
      {value.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          animate={highlight ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          className={`flex h-8 w-8 items-center justify-center rounded border font-mono text-sm ${
            highlight
              ? "border-amber-400 bg-amber-100 text-amber-900"
              : "border-slate-200 bg-white text-slate-700"
          }`}
          transition={{ duration: 0.3 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

function ListMemory({ value, highlight }: { value: VariableValue[]; highlight?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-slate-400">[</span>
      {value.map((item, i) => (
        <motion.div
          key={i}
          animate={highlight ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          className={`rounded-lg border px-3 py-2 font-mono text-sm ${
            highlight
              ? "border-amber-400 bg-amber-50 text-amber-900"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
          transition={{ duration: 0.3 }}
        >
          {typeof item === "string" ? `"${item}"` : String(item)}
        </motion.div>
      ))}
      <span className="font-mono text-slate-400">]</span>
    </div>
  );
}

export function VariableWatcher({
  variables,
  stdout,
  focused = false,
}: VariableWatcherProps) {
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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium tracking-wide text-slate-600">변수 추적</span>
          {variables.length > 0 && (
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm border border-amber-400 bg-amber-100" />
                이번 단계 변경
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm border border-slate-300 bg-slate-50" />
                유지
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        {variables.length === 0 ? (
          <p className="text-sm text-slate-400">아직 생성된 변수가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="pb-2 pr-4 font-medium">이름</th>
                  <th className="pb-2 pr-4 font-medium">타입</th>
                  <th className="pb-2 font-medium">값</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {variables.map((v) => (
                    <motion.tr
                      key={v.name}
                      animate={{
                        opacity: 1,
                        backgroundColor: v.highlight ? "#fffbeb" : v.carriedOver ? "#f8fafc" : "#ffffff",
                      }}
                      className="border-b border-slate-50"
                      initial={{ opacity: 0 }}
                      layout
                      transition={{ duration: 0.25 }}
                    >
                      <td className="py-2 pr-4 font-mono font-semibold text-slate-800">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={v.carriedOver ? "text-slate-500" : ""}>{v.name}</span>
                          {v.carriedOver && (
                            <span className="rounded bg-slate-100 px-1 py-0.5 text-[10px] font-medium text-slate-400">
                              유지
                            </span>
                          )}
                        </span>
                      </td>
                      <td
                        className={`py-2 pr-4 font-mono ${v.carriedOver ? "text-slate-400" : "text-slate-500"}`}
                      >
                        {v.type}
                      </td>
                      <td
                        className={`py-2 font-mono ${v.carriedOver ? "text-slate-500" : "text-slate-700"}`}
                      >
                        {formatValue(v.value)}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {variables.some((v) => v.type === "str" && typeof v.value === "string") && (
          <div className="mt-4 space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              메모리 시각화
            </p>
            {variables
              .filter((v) => v.type === "str" && typeof v.value === "string")
              .map((v) => (
                <div key={`mem-${v.name}`}>
                  <p className="mb-1 font-mono text-xs text-slate-500">{v.name}</p>
                  <StringMemory
                    highlight={v.highlight}
                    value={v.value as string}
                  />
                </div>
              ))}
          </div>
        )}

        {variables.some((v) => v.type === "list" && Array.isArray(v.value)) && (
          <div className="mt-4 space-y-3">
            {variables
              .filter((v) => v.type === "list" && Array.isArray(v.value))
              .map((v) => (
                <div key={`list-${v.name}`}>
                  <p className="mb-1 font-mono text-xs text-slate-500">{v.name}</p>
                  <ListMemory
                    highlight={v.highlight}
                    value={v.value as VariableValue[]}
                  />
                </div>
              ))}
          </div>
        )}

        {stdout !== undefined && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3"
            initial={{ opacity: 0, y: 4 }}
          >
            <p className="mb-1 text-xs font-medium tracking-wide text-emerald-600">
              출력 결과
            </p>
            <p className="font-mono text-lg font-semibold text-emerald-800">{stdout}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
