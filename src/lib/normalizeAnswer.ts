/** Normalize line endings and trim outer whitespace for answer comparison. */
export function normalizeAnswer(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

export function answersMatch(userInput: string, expected: string): boolean {
  return normalizeAnswer(userInput) === normalizeAnswer(expected);
}
