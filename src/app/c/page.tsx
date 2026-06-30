import { ProblemListPage } from "@/components/ProblemListPage";
import { cProblems } from "@/problems/c";

export default function CProblemListPage() {
  return (
    <ProblemListPage basePath="/c" languageName="C" problems={cProblems} />
  );
}
