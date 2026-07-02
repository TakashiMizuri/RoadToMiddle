import type { ActivityDay } from "@/lib/types";
import { getCurrentYear } from "@/lib/calendar-year";
import { YearHeatmapGrid } from "@/components/YearHeatmapGrid";
import { cn } from "@/lib/utils";

interface StudyCalendarProps {
  days: ActivityDay[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

function intensityClass(minutes: number, pomodoros: number): string {
  const score = minutes + pomodoros * 25;
  if (score === 0) return "bg-neutral-100 dark:bg-neutral-900";
  if (score <= 15) return "bg-sky-200 dark:bg-sky-950";
  if (score <= 30) return "bg-sky-400 dark:bg-sky-800";
  if (score <= 60) return "bg-sky-500 dark:bg-sky-700";
  return "bg-sky-600 dark:bg-sky-600";
}

export function StudyCalendar({ days, selectedDate, onSelectDate }: StudyCalendarProps) {
  const year = getCurrentYear();

  return (
    <YearHeatmapGrid
      days={days}
      year={year}
      title={`${year} — study activity`}
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      intensityClass={(day) => intensityClass(day.study_minutes, day.pomodoros_completed)}
      tooltip={(day) =>
        `${day.date}: ${day.study_minutes} min · ${day.pomodoros_completed} pomodoros · ${day.subtopics_completed} topics`
      }
      legend={
        <div className="flex items-center gap-1">
          <span>Less</span>
          {[0, 10, 25, 45, 70].map((n, i) => (
            <div
              key={n}
              className={cn(
                "h-3 w-3 rounded-sm",
                intensityClass(n + (i > 0 ? 1 : 0), 0),
              )}
            />
          ))}
          <span>More</span>
        </div>
      }
    />
  );
}
