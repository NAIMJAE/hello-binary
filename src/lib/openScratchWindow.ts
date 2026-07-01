export function openScratchWindow(basePath: string, problemId: string, slug: string) {
  const url = `${window.location.origin}${basePath}/${slug}/scratch`;
  window.open(
    url,
    `hb-scratch-${problemId}`,
    "width=1400,height=900,resizable=yes,scrollbars=yes",
  );
}
