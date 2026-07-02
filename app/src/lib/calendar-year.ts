const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/** Local YYYY-MM-DD (avoids UTC shift from toISOString). */
export function formatLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function eachDayOfYear(year: number): Date[] {
  const days: Date[] = [];
  const end = new Date(year, 11, 31);
  for (let d = new Date(year, 0, 1); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
}

/** Monday-start weeks; each inner array is Mon..Sun (null = outside year). */
export function buildYearWeekGrid<T>(
  year: number,
  getDay: (date: string) => T,
): (T | null)[][] {
  const weeks: (T | null)[][] = [];
  let currentWeek: (T | null)[] = [];

  const jan1 = new Date(year, 0, 1);
  const pad = (jan1.getDay() + 6) % 7;
  for (let i = 0; i < pad; i++) currentWeek.push(null);

  for (const d of eachDayOfYear(year)) {
    currentWeek.push(getDay(formatLocalDate(d)));
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  return weeks;
}

/** Week column index → month label for the year heatmap header. */
export function getMonthLabelsForWeeks(year: number, weekCount: number): (string | null)[] {
  const labels: (string | null)[] = Array(weekCount).fill(null);
  const seen = new Set<number>();

  const jan1 = new Date(year, 0, 1);
  const pad = (jan1.getDay() + 6) % 7;
  let weekIndex = 0;
  let dayInWeek = pad;

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      if (day === 1 && !seen.has(month)) {
        labels[weekIndex] = MONTHS[month];
        seen.add(month);
      }
      dayInWeek++;
      if (dayInWeek === 7) {
        weekIndex++;
        dayInWeek = 0;
      }
    }
  }

  return labels;
}

export function buildYearDates(year: number): string[] {
  return eachDayOfYear(year).map(formatLocalDate);
}
