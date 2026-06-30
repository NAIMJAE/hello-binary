"use client";

import { motion } from "framer-motion";
import { ContentPanel } from "./ContentPanel";

type StepCommentProps = {
  comment: string;
};

export function StepComment({ comment }: StepCommentProps) {
  return (
    <ContentPanel focused title="단계 설명">
      <motion.div
        key={comment}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-3"
        initial={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-sm leading-relaxed text-amber-900">
          <span className="mr-2 font-semibold">💡</span>
          {comment}
        </p>
      </motion.div>
    </ContentPanel>
  );
}
