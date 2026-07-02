interface CourseProgressBarProps {
  completed: number;
  total: number;
}

export function CourseProgressBar({ completed, total }: CourseProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 1000) / 10 : 0;

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2 text-xs">
          <span className="truncate text-neutral-500">Course progress</span>
          <span className="shrink-0 tabular-nums font-medium text-neutral-700 dark:text-neutral-300">
            {completed}/{total} · {pct}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
