import { buildYearWeekGrid, getCurrentYear, getMonthLabelsForWeeks } from "@/lib/calendar-year";
import { cn } from "@/lib/utils";

interface YearHeatmapGridProps<T extends { date: string }> {
  days: T[];
  year?: number;
  title: string;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  intensityClass: (day: T) => string;
  tooltip: (day: T) => string;
  legend: React.ReactNode;
}

export function YearHeatmapGrid<T extends { date: string }>({
  days,
  year = getCurrentYear(),
  title,
  selectedDate,
  onSelectDate,
  intensityClass,
  tooltip,
  legend,
}: YearHeatmapGridProps<T>) {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const empty = { date: "" } as T;

  const weeks = buildYearWeekGrid(year, (date) => byDate.get(date) ?? { ...empty, date });
  const monthLabels = getMonthLabelsForWeeks(year, weeks.length);

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
        <span>{title}</span>
        {legend}
      </div>
      <div className="inline-flex gap-2">
        <div className="flex flex-col gap-1 pt-4 text-[10px] leading-none text-neutral-400">
          <span className="h-3">M</span>
          <span className="h-3 invisible">T</span>
          <span className="h-3">W</span>
          <span className="h-3 invisible">T</span>
          <span className="h-3">F</span>
          <span className="h-3 invisible">S</span>
          <span className="h-3 invisible">S</span>
        </div>
        <div>
          <div className="mb-1 flex gap-1">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="w-3 shrink-0 overflow-visible text-[10px] leading-none text-neutral-400"
                style={{ minWidth: "0.75rem" }}
              >
                {label ?? ""}
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) =>
                  day && day.date ? (
                    <button
                      key={day.date}
                      type="button"
                      title={tooltip(day)}
                      onClick={() => onSelectDate(day.date)}
                      className={cn(
                        "h-3 w-3 cursor-pointer rounded-sm transition ring-offset-1 hover:ring-2 hover:ring-neutral-400",
                        intensityClass(day),
                        selectedDate === day.date &&
                          "ring-2 ring-neutral-900 dark:ring-neutral-100",
                      )}
                    />
                  ) : (
                    <div key={`empty-${wi}-${di}`} className="h-3 w-3" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
