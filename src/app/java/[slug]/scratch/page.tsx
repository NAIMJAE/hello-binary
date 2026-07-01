import { notFound } from "next/navigation";
import { ScratchPage } from "@/components/scratch/ScratchPage";
import { javaProblemsBySlug } from "@/problems/java";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(javaProblemsBySlug).map((slug) => ({ slug }));
}

export default async function JavaScratchPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = javaProblemsBySlug[slug];

  if (!problem) {
    notFound();
  }

  return <ScratchPage problem={problem} />;
}
