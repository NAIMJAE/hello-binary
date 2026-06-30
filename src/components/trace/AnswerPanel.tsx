"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnswerPanelProps = {
  answer: string;
  explanation: string;
};

export function AnswerPanel({ answer, explanation }: AnswerPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <span>정답 · 해설 보기</span>
        <span className="text-slate-400">{open ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden border-t border-slate-100"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-4 px-4 py-4">
              <div>
                <p className="mb-1 text-xs font-medium tracking-wide text-slate-500">
                  정답
                </p>
                <p className="font-mono text-2xl font-bold text-emerald-700">{answer}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium tracking-wide text-slate-500">
                  전체 풀이
                </p>
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
                  {explanation}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
