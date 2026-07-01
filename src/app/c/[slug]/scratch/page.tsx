import { notFound } from "next/navigation";
import { ScratchPage } from "@/components/scratch/ScratchPage";
import { cProblemsBySlug } from "@/problems/c";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(cProblemsBySlug).map((slug) => ({ slug }));
}

export default async function CScratchPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = cProblemsBySlug[slug];

  if (!problem) {
    notFound();
  }

  return <ScratchPage problem={problem} />;
}
