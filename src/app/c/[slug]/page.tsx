import { notFound } from "next/navigation";
import { TraceViewer } from "@/components/trace/TraceViewer";
import { cProblemsBySlug } from "@/problems/c";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(cProblemsBySlug).map((slug) => ({ slug }));
}

export default async function CProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = cProblemsBySlug[slug];

  if (!problem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TraceViewer listHref="/c" problem={problem} />
    </div>
  );
}
