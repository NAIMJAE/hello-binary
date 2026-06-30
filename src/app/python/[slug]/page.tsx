import { notFound } from "next/navigation";
import { TraceViewer } from "@/components/trace/TraceViewer";
import { pythonProblemsBySlug } from "@/problems/python";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(pythonProblemsBySlug).map((slug) => ({ slug }));
}

export default async function PythonProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = pythonProblemsBySlug[slug];

  if (!problem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TraceViewer listHref="/python" problem={problem} />
    </div>
  );
}
