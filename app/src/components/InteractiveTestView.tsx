import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Eye, ChevronDown, ChevronUp } from "lucide-react";
import type { TestQuestion } from "@/lib/parse-test";
import { MarkdownView } from "@/components/MarkdownView";
import { Button, Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type QuestionState =
  | { kind: "mcq"; selected: string; correct: boolean }
  | { kind: "open"; revealed: boolean; selfCorrect: boolean | null }
  | { kind: "practical"; picks: Record<number, string>; checked: boolean; correct: boolean };

interface InteractiveTestViewProps {
  questions: TestQuestion[];
  maxScore: number;
  passThreshold: number;
  onSubmit: (score: number) => void;
  onPrevious?: () => void;
  canGoPrevious?: boolean;
}

function computeScore(questions: TestQuestion[], states: Record<string, QuestionState>): number {
  let score = 0;
  for (const q of questions) {
    const s = states[q.id];
    if (!s) continue;
    if (s.kind === "mcq" && s.correct) score += 1;
    if (s.kind === "open" && s.selfCorrect === true) score += 1;
    if (s.kind === "practical" && s.correct) score += 1;
  }
  return score;
}

function isAnswered(_q: TestQuestion, s: QuestionState | undefined): boolean {
  if (!s) return false;
  if (s.kind === "mcq") return true;
  if (s.kind === "open") return s.selfCorrect !== null;
  if (s.kind === "practical") return s.checked;
  return false;
}

export function InteractiveTestView({
  questions,
  maxScore,
  passThreshold,
  onSubmit,
  onPrevious,
  canGoPrevious = false,
}: InteractiveTestViewProps) {
  const [states, setStates] = useState<Record<string, QuestionState>>({});
  const [expandedExplain, setExpandedExplain] = useState<Record<string, boolean>>({});

  const score = useMemo(() => computeScore(questions, states), [questions, states]);
  const answeredCount = questions.filter((q) => isAnswered(q, states[q.id])).length;
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const passed = pct >= passThreshold;
  const allAnswered = answeredCount === questions.length;

  const toggleExplain = (id: string) =>
    setExpandedExplain((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Interactive test</p>
            <p className="text-xs text-neutral-500">
              Click options or reveal answers — feedback is instant
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={passed ? "success" : "muted"}>
              {score} / {maxScore} ({pct.toFixed(0)}%)
            </Badge>
            <span className="text-xs text-neutral-500">
              {answeredCount}/{questions.length} answered
            </span>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <div
            className="h-full rounded-full bg-sky-500 transition-all duration-300"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-6">
      {questions.map((q) => {
        const state = states[q.id];
        const explained = expandedExplain[q.id];

        return (
          <div
            key={q.id}
            className={cn(
              "rounded-xl border p-5 transition-colors",
              state?.kind === "mcq" && state.correct && "border-emerald-300 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20",
              state?.kind === "mcq" && state.selected && !state.correct && "border-red-300 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20",
              state?.kind === "open" && state.selfCorrect === true && "border-emerald-300 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20",
              state?.kind === "open" && state.selfCorrect === false && "border-red-300 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20",
              state?.kind === "practical" && state.checked && state.correct && "border-emerald-300 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20",
              state?.kind === "practical" && state.checked && !state.correct && "border-red-300 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20",
              !state && "border-neutral-200 dark:border-neutral-800",
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="font-semibold tabular-nums">{q.id}.</span>
              <Badge variant="muted">{q.category}</Badge>
            </div>

            <MarkdownView content={q.prompt} compact />

            {q.type === "mcq" && q.options && (
              <div className="mt-4 space-y-2">
                {q.options.map((opt) => {
                  const selected = state?.kind === "mcq" && state.selected === opt.key;
                  const isCorrect = q.correctOption === opt.key;
                  const answered = state?.kind === "mcq";
                  const showCorrect = answered && isCorrect;
                  const showWrong = answered && selected && !state.correct;

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={answered}
                      onClick={() =>
                        setStates((prev) => ({
                          ...prev,
                          [q.id]: {
                            kind: "mcq",
                            selected: opt.key,
                            correct: opt.key === q.correctOption,
                          },
                        }))
                      }
                      className={cn(
                        "flex w-full cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                        !answered && "hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30",
                        showCorrect && "border-emerald-500 bg-emerald-100 dark:bg-emerald-950/40",
                        showWrong && "border-red-500 bg-red-100 dark:bg-red-950/40",
                        answered && !showCorrect && !showWrong && "opacity-50",
                      )}
                    >
                      <span className="font-semibold tabular-nums">{opt.key})</span>
                      <span className="flex-1">{opt.text}</span>
                      {showCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
                      {showWrong && <XCircle className="h-4 w-4 shrink-0 text-red-600" />}
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === "open" && (
              <div className="mt-4 space-y-3">
                {!(state?.kind === "open" && state.revealed) ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      setStates((prev) => ({
                        ...prev,
                        [q.id]: { kind: "open", revealed: true, selfCorrect: null },
                      }))
                    }
                  >
                    <Eye className="mr-1 h-3.5 w-3.5" /> Reveal answer
                  </Button>
                ) : (
                  <>
                    <div className="rounded-lg border border-sky-200 bg-sky-50/80 p-4 dark:border-sky-900 dark:bg-sky-950/30">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-sky-700 dark:text-sky-400">
                        Expected answer
                      </p>
                      <MarkdownView content={q.answerFull} compact />
                    </div>
                    {state.selfCorrect === null && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() =>
                            setStates((prev) => ({
                              ...prev,
                              [q.id]: { kind: "open", revealed: true, selfCorrect: true },
                            }))
                          }
                        >
                          <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> I was right
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setStates((prev) => ({
                              ...prev,
                              [q.id]: { kind: "open", revealed: true, selfCorrect: false },
                            }))
                          }
                        >
                          <XCircle className="mr-1 h-3.5 w-3.5" /> I was wrong
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {q.type === "practical" && q.practicalItems && (
              <div className="mt-4 space-y-4">
                {q.practicalItems.map((item, idx) => {
                  const picks = state?.kind === "practical" ? state.picks : {};
                  const checked = state?.kind === "practical" && state.checked;
                  const pick = picks[idx];
                  const isItemCorrect = checked && pick === item.correct;

                  return (
                    <div key={idx} className="space-y-2">
                      <p className="text-sm font-medium">
                        {idx + 1}. {item.text}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Local", "Centralized", "Distributed"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={checked}
                            onClick={() =>
                              setStates((prev) => {
                                const prevPractical = prev[q.id];
                                return {
                                  ...prev,
                                  [q.id]: {
                                    kind: "practical" as const,
                                    picks: {
                                      ...(prevPractical?.kind === "practical"
                                        ? prevPractical.picks
                                        : {}),
                                      [idx]: choice,
                                    },
                                    checked: false,
                                    correct: false,
                                  },
                                };
                              })
                            }
                            className={cn(
                              "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                              pick === choice && !checked && "border-sky-500 bg-sky-100 dark:bg-sky-950",
                              checked && choice === item.correct && "border-emerald-500 bg-emerald-100 dark:bg-emerald-950",
                              checked && pick === choice && choice !== item.correct && "border-red-500 bg-red-100 dark:bg-red-950",
                              !pick && !checked && "border-neutral-200 hover:border-neutral-400 dark:border-neutral-700",
                            )}
                          >
                            {choice}
                          </button>
                        ))}
                        {checked && isItemCorrect && (
                          <CheckCircle2 className="h-4 w-4 self-center text-emerald-600" />
                        )}
                        {checked && pick && !isItemCorrect && (
                          <XCircle className="h-4 w-4 self-center text-red-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
                {!(state?.kind === "practical" && state.checked) && (
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={
                      !q.practicalItems.every(
                        (_, idx) =>
                          state?.kind === "practical" && state.picks[idx] != null,
                      )
                    }
                    onClick={() => {
                      const prevState = states[q.id];
                      const picks =
                        prevState?.kind === "practical" ? prevState.picks : {};
                      const allCorrect = q.practicalItems!.every(
                        (item, idx) => picks[idx] === item.correct,
                      );
                      setStates((prev) => ({
                        ...prev,
                        [q.id]: {
                          kind: "practical",
                          picks,
                          checked: true,
                          correct: allCorrect,
                        },
                      }));
                    }}
                  >
                    Check answers
                  </Button>
                )}
              </div>
            )}

            {state && isAnswered(q, state) && (
              <div className="mt-4 border-t border-neutral-200 pt-3 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => toggleExplain(q.id)}
                  className="flex cursor-pointer items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                >
                  {explained ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                  Full explanation
                </button>
                {explained && (
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <MarkdownView content={q.answerFull} compact />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      </div>

      <div className="shrink-0 border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {onPrevious && (
              <Button variant="ghost" onClick={onPrevious} disabled={!canGoPrevious}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
            )}
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {allAnswered
                ? passed
                  ? `Passed (${passThreshold}% required) — you can open Answers for full review`
                  : `Below ${passThreshold}% — review mistakes and retry`
                : `Answer all ${questions.length} questions to finish`}
            </p>
          </div>
          <Button disabled={!allAnswered} onClick={() => onSubmit(score)}>
            Finish test ({score}/{maxScore})
          </Button>
        </div>
      </div>
    </div>
  );
}
