import { ProblemListPage } from "@/components/ProblemListPage";
import { javaProblems } from "@/problems/java";

export default function JavaProblemListPage() {
  return (
    <ProblemListPage
      basePath="/java"
      emptyMessage="Java 문제를 준비 중입니다. 곧 업데이트됩니다."
      languageName="Java"
      problems={javaProblems}
    />
  );
}
