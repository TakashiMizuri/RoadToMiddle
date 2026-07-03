import type { LessonStep } from "./types.js";

/** Step id → primary lesson file (new format). */
export const STEP_FILES: Record<LessonStep, string> = {
  lection_eng: "1.lection-eng.md",
  lection_ru: "2.lection-ru.md",
  summary: "3.summary.md",
  test: "4.test-yourself.md",
  answers: "5.test-yourself-answers.md",
  exercises: "6.exercises.md",
};

/** Fallback filenames for lessons created before the lection-eng/ru split. */
export const LEGACY_STEP_FILES: Partial<Record<LessonStep, string[]>> = {
  lection_eng: ["1.lection.md"],
  summary: ["2.summary.md"],
  test: ["3.test-yourself.md"],
  answers: ["4.test-yourself-answers.md"],
  exercises: ["5.exercises.md"],
};

/** @deprecated use lection_eng */
export const LEGACY_STEP_ALIASES: Record<string, LessonStep> = {
  lection: "lection_eng",
};

export function normalizeLessonStep(step: string): LessonStep {
  if (step in STEP_FILES) return step as LessonStep;
  if (step in LEGACY_STEP_ALIASES) return LEGACY_STEP_ALIASES[step];
  throw new Error(`Unknown step: ${step}`);
}

export function resolveStepFilenames(step: string): string[] {
  const normalized = normalizeLessonStep(step);
  const primary = STEP_FILES[normalized];
  const legacy = LEGACY_STEP_FILES[normalized] ?? [];
  return [primary, ...legacy.filter((f) => f !== primary)];
}

export const STEP_COMPLETION_ORDER: LessonStep[] = [
  "lection_eng",
  "lection_ru",
  "summary",
  "test",
  "answers",
  "exercises",
];

export function resolveNextStep(
  current: string,
  has_exercises: boolean,
  isStepAvailable: (step: LessonStep) => boolean = () => true,
): LessonStep | null {
  const normalized = normalizeLessonStep(current);
  const idx = STEP_COMPLETION_ORDER.indexOf(normalized);
  if (idx < 0) return null;
  for (let i = idx + 1; i < STEP_COMPLETION_ORDER.length; i++) {
    const next = STEP_COMPLETION_ORDER[i];
    if (next === "exercises" && !has_exercises) continue;
    if (!isStepAvailable(next)) continue;
    return next;
  }
  return null;
}
