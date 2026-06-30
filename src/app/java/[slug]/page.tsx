import { notFound } from "next/navigation";
import { TraceViewer } from "@/components/trace/TraceViewer";
import { javaProblemsBySlug } from "@/problems/java";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(javaProblemsBySlug).map((slug) => ({ slug }));
}

export default async function JavaProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = javaProblemsBySlug[slug];

  if (!problem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TraceViewer listHref="/java" problem={problem} />
    </div>
  );
}
