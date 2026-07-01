import { notFound } from "next/navigation";
import { ScratchPage } from "@/components/scratch/ScratchPage";
import { pythonProblemsBySlug } from "@/problems/python";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(pythonProblemsBySlug).map((slug) => ({ slug }));
}

export default async function PythonScratchPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = pythonProblemsBySlug[slug];

  if (!problem) {
    notFound();
  }

  return <ScratchPage problem={problem} />;
}
