import { toPng } from "html-to-image";

export async function exportScratchImage(root: HTMLElement, filename: string) {
  const dataUrl = await toPng(root, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#ffffff",
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export function buildScratchFilename(slug: string) {
  const date = new Date().toISOString().slice(0, 10);
  return `hello-binary_${slug}_${date}.png`;
}
