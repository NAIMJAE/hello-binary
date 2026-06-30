import { ProblemListPage } from "@/components/ProblemListPage";
import { pythonProblems } from "@/problems/python";

export default function PythonProblemListPage() {
  return (
    <ProblemListPage
      basePath="/python"
      languageName="Python"
      problems={pythonProblems}
    />
  );
}
