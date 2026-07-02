import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { usePomodoroStore } from "@/stores/pomodoroStore";
import { formatTimer } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/primitives";
import { Card } from "@/components/ui/primitives";

interface PomodoroWidgetProps {
  subtopicId?: string | null;
  todayPomodoros?: number;
  weekPomodoros?: number;
}

const PHASE_RING: Record<string, string> = {
  work: "text-sky-500",
  short_break: "text-emerald-500",
  long_break: "text-violet-500",
  idle: "text-neutral-300 dark:text-neutral-700",
};

export function PomodoroWidget({
  subtopicId,
  todayPomodoros = 0,
  weekPomodoros = 0,
}: PomodoroWidgetProps) {
  const {
    phase,
    secondsLeft,
    isRunning,
    completedWorkSessions,
    plannedSeconds,
    startWork,
    pause,
    resume,
    reset,
  } = usePomodoroStore();

  const label =
    phase === "work"
      ? "Focus"
      : phase === "short_break"
        ? "Short break"
        : phase === "long_break"
          ? "Long break"
          : "Pomodoro";

  const progress =
    phase !== "idle" && plannedSeconds > 0
      ? ((plannedSeconds - secondsLeft) / plannedSeconds) * 100
      : 0;
  const circumference = 2 * Math.PI * 54;
  const ringColor = PHASE_RING[phase] ?? PHASE_RING.idle;

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <Timer className="h-4 w-4" />
          {label}
        </div>
        {phase === "work" && completedWorkSessions > 0 && (
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs tabular-nums text-neutral-500 dark:bg-neutral-800">
            #{completedWorkSessions + 1}
          </span>
        )}
      </div>

      <div className="relative mx-auto mb-4 h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-neutral-100 dark:text-neutral-800"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className={cn("transition-all duration-1000", ringColor)}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tabular-nums tracking-tight">
            {formatTimer(secondsLeft)}
          </span>
          {isRunning && (
            <span className="mt-0.5 text-[10px] uppercase tracking-wider text-neutral-400">
              running
            </span>
          )}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-2 py-2 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-neutral-500">Today</p>
          <p className="text-lg font-semibold tabular-nums">{todayPomodoros}</p>
        </div>
        <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-2 py-2 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-neutral-500">Week</p>
          <p className="text-lg font-semibold tabular-nums">{weekPomodoros}</p>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {phase === "idle" ? (
          <Button size="sm" className="w-full" onClick={() => startWork(subtopicId ?? undefined)}>
            <Play className="mr-1 h-3.5 w-3.5" />
            Start focus
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              onClick={() => (isRunning ? pause() : resume())}
            >
              {isRunning ? (
                <>
                  <Pause className="mr-1 h-3.5 w-3.5" /> Pause
                </>
              ) : (
                <>
                  <Play className="mr-1 h-3.5 w-3.5" /> Resume
                </>
              )}
            </Button>
            <Button size="sm" variant="ghost" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
