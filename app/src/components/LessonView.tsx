import { useCallback, useEffect, useMemo, useState } from "react";

import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from "lucide-react";

import type { LessonStep, RoadmapData, Subtopic } from "@/lib/types";

import { STEP_LABELS, STEP_ORDER, findSubtopic, getNextSubtopicId } from "@/lib/types";

import { api } from "@/lib/tauri-api";

import { notifyStudyStatsUpdated } from "@/lib/study-stats-events";

import { parseInteractiveTest } from "@/lib/parse-test";

import { useProgressStore } from "@/stores/progressStore";

import { MarkdownView } from "@/components/MarkdownView";

import { InteractiveTestView } from "@/components/InteractiveTestView";

import { Button, Badge } from "@/components/ui/primitives";

import { cn } from "@/lib/utils";



interface LessonViewProps {

  roadmap: RoadmapData;

  subtopicId: string;

  onNavigate: (id: string) => void;

}



export function LessonView({ roadmap, subtopicId, onNavigate }: LessonViewProps) {

  const { progressMap, setProgress, refreshSubtopic } = useProgressStore();

  const [step, setStep] = useState<LessonStep>("lection_eng");

  const [content, setContent] = useState<string>("");

  const [answersContent, setAnswersContent] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [testMeta, setTestMeta] = useState<{ max: number; threshold: number }>({

    max: 16,

    threshold: 80,

  });



  const meta = findSubtopic(roadmap, subtopicId);

  const progress = progressMap[subtopicId];

  const subtopic: Subtopic | undefined = meta?.subtopic;

  const hasExercises = subtopic?.stepsAvailable.includes("exercises") ?? false;



  const testQuestions = useMemo(() => {

    if (!content || !answersContent) return [];

    return parseInteractiveTest(content, answersContent);

  }, [content, answersContent]);



  const availableSteps = useMemo(() => {
    if (!subtopic) return STEP_ORDER.slice(0, 4);

    if (subtopic.stepsAvailable.length > 0) {
      return STEP_ORDER.filter((s) => subtopic.stepsAvailable.includes(s));
    }

    if (subtopic.hasLesson) {
      return STEP_ORDER.filter((s) => s !== "lection_ru" && s !== "exercises");
    }

    return STEP_ORDER.slice(0, 4);
  }, [subtopic]);



  const loadStep = useCallback(
    async (s: LessonStep) => {
      if (!subtopic?.hasLesson) {
        setError(null);
        setContent("");
        setAnswersContent("");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const lesson = await api.readLessonStep(subtopicId, s);
        setContent(lesson.content);

        if (lesson.test_max_score) {
          setTestMeta({
            max: lesson.test_max_score,
            threshold: lesson.pass_threshold ?? 80,
          });
        }

        if (s === "test") {
          const answers = await api.readLessonStep(subtopicId, "answers");
          setAnswersContent(answers.content);
        } else {
          setAnswersContent("");
        }
      } catch (e) {
        setError(String(e));
        setContent("");
        setAnswersContent("");
      } finally {
        setLoading(false);
      }
    },
    [subtopic, subtopicId],
  );

  const changeStep = useCallback(
    (next: LessonStep) => {
      if (next === step) return;
      setLoading(true);
      setError(null);
      setStep(next);
    },
    [step],
  );



  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (e.ctrlKey && e.key === "ArrowRight") {

        e.preventDefault();

        const idx = availableSteps.indexOf(step);

        if (idx < availableSteps.length - 1) changeStep(availableSteps[idx + 1]);

      }

    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);

  }, [step, availableSteps]);



  useEffect(() => {
    void api.startSubtopic(subtopicId).then((p) => {
      setProgress(p);
      setLoading(true);
      setStep((p.current_step as LessonStep) ?? "lection_eng");
    });
  }, [subtopicId, setProgress]);



  useEffect(() => {

    void loadStep(step);

  }, [step, loadStep]);



  useEffect(() => {

    const interval = window.setInterval(() => {

      void api.recordStudyHeartbeat(subtopicId, step, 30).then(() => {

        notifyStudyStatsUpdated();

      });

    }, 30_000);

    return () => clearInterval(interval);

  }, [subtopicId, step]);



  const canOpenAnswers = useMemo(() => {

    if (!progress?.test_score || !progress.test_max_score) return false;

    return (

      (progress.test_score / progress.test_max_score) * 100 >=

      progress.pass_threshold

    );

  }, [progress]);



  const goNextStep = () => {
    const idx = availableSteps.indexOf(step);
    if (idx < availableSteps.length - 1) changeStep(availableSteps[idx + 1]);
  };

  const goPrevStep = () => {
    const idx = availableSteps.indexOf(step);
    if (idx > 0) changeStep(availableSteps[idx - 1]);
  };



  const handleCompleteStep = async () => {

    const updated = await api.completeStep(subtopicId, step, hasExercises);

    setProgress(updated);

    const idx = availableSteps.indexOf(step);

    if (idx < availableSteps.length - 1) {
      changeStep(availableSteps[idx + 1]);
    }

    if (updated.status === "completed") {

      void refreshSubtopic(subtopicId);

    }

  };



  const handleTestSubmit = async (score: number) => {

    const updated = await api.submitTestScore(

      subtopicId,

      score,

      testMeta.max,

      testMeta.threshold,

      hasExercises,

    );

    setProgress(updated);

    const pct = (score / testMeta.max) * 100;

    if (pct >= testMeta.threshold) {

      await api.completeStep(subtopicId, "test", hasExercises);
      changeStep("answers");

    }

  };



  if (!meta) {

    return <div className="p-8 text-neutral-500">Subtopic not found</div>;

  }



  const nextId = getNextSubtopicId(roadmap, subtopicId);



  return (

    <div className="flex h-full flex-col bg-white dark:bg-neutral-950">

      <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">

        <p className="text-xs text-neutral-500">
          Phase {meta.phase.id} · {meta.phase.title}
          <span className="mx-1.5 text-neutral-300 dark:text-neutral-700">/</span>
          {meta.node.id} · {meta.node.title}
        </p>

        <h1 className="mt-1 text-xl font-semibold tracking-tight">

          {subtopicId} — {subtopic?.title}

        </h1>

        <div className="mt-3 flex flex-wrap gap-1.5">

          {availableSteps.map((s) => {

            const locked = s === "answers" && !canOpenAnswers;

            const done = progress?.steps_completed.includes(s) ?? false;

            return (

              <button

                key={s}

                type="button"

                disabled={locked}

                onClick={() => !locked && changeStep(s)}

                className={cn(

                  "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",

                  step === s

                    ? "bg-sky-600 text-white shadow-sm dark:bg-sky-500"

                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700",

                  locked && "cursor-not-allowed opacity-50",

                  !locked && "cursor-pointer",

                )}

              >

                {done && (

                  <CheckCircle2

                    className={cn(

                      "h-3.5 w-3.5 shrink-0",

                      step === s ? "text-emerald-300" : "text-emerald-500",

                    )}

                    aria-hidden

                  />

                )}

                {locked && !done && <Lock className="h-3 w-3 shrink-0" aria-hidden />}

                {STEP_LABELS[s]}

              </button>

            );

          })}

        </div>

      </div>



      <div className={cn("min-h-0 flex-1", step === "test" ? "overflow-hidden" : "overflow-auto px-6 py-6")}>

        {!subtopic?.hasLesson ? (

          <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center dark:border-neutral-700">

            <p className="text-neutral-600 dark:text-neutral-300">

              Lesson content not created yet.

            </p>

            <p className="mt-2 text-sm text-neutral-500">

              In Cursor, ask AI: <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">Заполни урок {subtopicId}</code>

            </p>

          </div>

        ) : loading ? (
          <p className="text-neutral-500">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : step === "test" && testQuestions.length > 0 ? (
          <InteractiveTestView
            questions={testQuestions}
            maxScore={testMeta.max}
            passThreshold={testMeta.threshold}
            onSubmit={(score) => void handleTestSubmit(score)}
            onPrevious={goPrevStep}
            canGoPrevious={availableSteps.indexOf(step) > 0}
          />
        ) : step === "test" && answersContent && testQuestions.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-amber-600">
              Could not parse interactive test — showing raw content.
            </p>
            <MarkdownView content={content} />
          </div>
        ) : (
          <MarkdownView content={content} />
        )}

      </div>



      {step !== "test" && (

      <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">

        <Button variant="ghost" onClick={goPrevStep} disabled={availableSteps.indexOf(step) === 0}>

          <ArrowLeft className="mr-1 h-4 w-4" /> Previous

        </Button>



        <div className="flex items-center gap-2">

          {progress?.status === "completed" && (

            <Badge variant="success">

              <CheckCircle2 className="mr-1 h-3 w-3" /> Completed

            </Badge>

          )}

          <Button onClick={() => void handleCompleteStep()}>

            Complete step

          </Button>

        </div>



        <div className="flex gap-2">

          {progress?.status === "completed" && nextId && (

            <Button onClick={() => onNavigate(nextId)}>

              Next subtopic <ArrowRight className="ml-1 h-4 w-4" />

            </Button>

          )}

          {step !== availableSteps[availableSteps.length - 1] && (

            <Button variant="secondary" onClick={goNextStep}>

              Next <ArrowRight className="ml-1 h-4 w-4" />

            </Button>

          )}

        </div>

      </div>

      )}

    </div>

  );

}


