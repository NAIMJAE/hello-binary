import { ScratchViewer } from "@/components/scratch/ScratchViewer";
import type { Problem } from "@/types/problem";

type ScratchPageProps = {
  problem: Problem;
};

export function ScratchPage({ problem }: ScratchPageProps) {
  return <ScratchViewer problem={problem} />;
}
