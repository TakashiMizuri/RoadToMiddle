import type { ReviewDayStats } from "@/lib/types";
import { getCurrentYear } from "@/lib/calendar-year";
import { YearHeatmapGrid } from "@/components/YearHeatmapGrid";
import { cn } from "@/lib/utils";

interface ReviewCalendarProps {
  days: ReviewDayStats[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

function intensityClass(cards: number): string {
  if (cards === 0) return "bg-neutral-100 dark:bg-neutral-900";
  if (cards <= 5) return "bg-emerald-200 dark:bg-emerald-950";
  if (cards <= 15) return "bg-emerald-400 dark:bg-emerald-800";
  if (cards <= 30) return "bg-emerald-500 dark:bg-emerald-700";
  return "bg-emerald-600 dark:bg-emerald-600";
}

export function ReviewCalendar({ days, selectedDate, onSelectDate }: ReviewCalendarProps) {
  const year = getCurrentYear();

  return (
    <YearHeatmapGrid
      days={days}
      year={year}
      title={`${year} — card reviews`}
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      intensityClass={(day) => intensityClass(day.cards_reviewed)}
      tooltip={(day) =>
        `${day.date}: ${day.cards_reviewed} cards (${day.cards_correct}✓ ${day.cards_incorrect}✗)`
      }
      legend={
        <div className="flex items-center gap-1">
          <span>Less</span>
          {[0, 5, 15, 30, 40].map((n, i) => (
            <div
              key={n}
              className={cn(
                "h-3 w-3 rounded-sm",
                intensityClass(n + (i > 0 ? 1 : 0)),
              )}
            />
          ))}
          <span>More</span>
        </div>
      }
    />
  );
}
