import { useMemo, useState } from "react";

import {

  Bar,

  BarChart,

  Legend,

  ResponsiveContainer,

  Tooltip,

  XAxis,

  YAxis,

} from "recharts";

import { Flame, BookOpen, Clock, Timer, Target } from "lucide-react";

import type { DashboardStats, RoadmapData } from "@/lib/types";

import { findSubtopic } from "@/lib/types";

import { formatMinutes } from "@/lib/utils";

import { Button, Card } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { StudyCalendar } from "@/components/StudyCalendar";



interface DashboardPageProps {

  stats: DashboardStats | null;

  roadmap: RoadmapData;

  onContinue: (subtopicId: string) => void;

}



function StatCard({
  title,
  value,
  subtitle,
  icon,
  accent = "neutral",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  accent?: "sky" | "emerald" | "violet" | "amber" | "neutral";
}) {
  const iconBg = {
    sky: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400",
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    violet: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    neutral: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
  }[accent];

  return (
    <Card className="transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-neutral-500">{subtitle}</p>}
        </div>
        <div className={cn("rounded-xl p-2.5", iconBg)}>{icon}</div>
      </div>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="mb-6 space-y-2">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-64 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
          />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950" />
        <div className="h-64 animate-pulse rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950" />
      </div>
    </div>
  );
}



export function DashboardPage({ stats, roadmap, onContinue }: DashboardPageProps) {

  const [selectedDate, setSelectedDate] = useState<string | null>(null);



  const selectedDay = useMemo(() => {

    if (!stats || !selectedDate) return null;

    return stats.activity_by_day.find((d) => d.date === selectedDate) ?? null;

  }, [stats, selectedDate]);



  if (!stats) {
    return <DashboardSkeleton />;
  }



  const continueMeta = stats.continue_subtopic_id

    ? findSubtopic(roadmap, stats.continue_subtopic_id)

    : null;



  const chartData = stats.activity_by_day.slice(-30).map((d) => ({

    ...d,

    label: d.date.slice(5),

  }));



  return (
    <div className="h-full overflow-auto p-6">
      <div className="mx-auto max-w-6xl">
      <div className="mb-6">

        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

        <p className="text-sm text-neutral-500">

          {stats.total_completed} completed · {stats.total_in_progress} in progress ·{" "}

          {roadmap.totalSubtopics} total

        </p>

      </div>



      {continueMeta && stats.continue_subtopic_id && (

        <Card className="mb-6 flex items-center justify-between border-sky-200/60 bg-gradient-to-r from-sky-50 to-white dark:border-sky-900/50 dark:from-sky-950/30 dark:to-neutral-950">

          <div>

            <p className="text-sm font-medium">Continue learning</p>

            <p className="text-neutral-600 dark:text-neutral-300">

              {stats.continue_subtopic_id} — {continueMeta.subtopic.title}

            </p>

          </div>

          <Button onClick={() => onContinue(stats.continue_subtopic_id!)}>

            Resume

          </Button>

        </Card>

      )}



      <Card className="mb-6 flex items-center gap-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/20">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/50">

          <Flame className="h-7 w-7 text-orange-500" />

        </div>

        <div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">Daily streak</p>

          <p className="text-3xl font-bold tabular-nums">{stats.streak_days}</p>

          <p className="text-xs text-neutral-500">

            {stats.streak_days === 0

              ? "Study today to start a streak"

              : stats.streak_days === 1

                ? "day in a row — keep it going!"

                : "days in a row — keep it going!"}

          </p>

        </div>

        <div className="ml-auto hidden text-right text-sm text-neutral-500 sm:block">

          <p>Today: {formatMinutes(stats.today.study_minutes)}</p>

          <p>{stats.today.pomodoros_completed} pomodoros</p>

        </div>

      </Card>



      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Today"
          value={`${formatMinutes(stats.today.study_minutes)}`}
          subtitle={`${stats.today.subtopics_completed} topics · ${stats.today.pomodoros_completed} pomodoros`}
          icon={<BookOpen className="h-5 w-5" />}
          accent="sky"
        />

        <StatCard
          title="This week"
          value={formatMinutes(stats.week.study_minutes)}
          subtitle={`${stats.week.subtopics_completed} topics · ${stats.week.pomodoros_completed} pomodoros`}
          icon={<Clock className="h-5 w-5" />}
          accent="emerald"
        />

        <StatCard
          title="This month"
          value={formatMinutes(stats.month.study_minutes)}
          subtitle={`${stats.month.subtopics_completed} topics · ${stats.month.pomodoros_completed} pomodoros`}
          icon={<Target className="h-5 w-5" />}
          accent="violet"
        />

        <StatCard
          title="Pomodoros (week)"
          value={stats.week.pomodoros_completed}
          subtitle={`${stats.today.pomodoros_completed} completed today`}
          icon={<Timer className="h-5 w-5" />}
          accent="amber"
        />

      </div>



      <div className="mb-8 grid gap-4 xl:grid-cols-2">

        <Card>

          <h2 className="mb-4 text-sm font-medium text-neutral-500">Study calendar</h2>

          <StudyCalendar

            days={stats.activity_by_day}

            selectedDate={selectedDate}

            onSelectDate={(date) => setSelectedDate((prev) => (prev === date ? null : date))}

          />

          {selectedDay && (

            <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm dark:border-neutral-800 dark:bg-neutral-900/50">

              <p className="font-medium">{selectedDay.date}</p>

              <p className="mt-1 text-neutral-600 dark:text-neutral-300">

                {formatMinutes(selectedDay.study_minutes)} studied ·{" "}

                {selectedDay.pomodoros_completed} pomodoros ·{" "}

                {selectedDay.subtopics_completed} topics completed

              </p>

            </div>

          )}

        </Card>



        <Card>

          <h2 className="mb-4 text-sm font-medium text-neutral-500">

            Activity — last 30 days

          </h2>

          <div className="h-56">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>

                <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={4} />

                <YAxis tick={{ fontSize: 10 }} width={28} />

                <Tooltip />

                <Legend wrapperStyle={{ fontSize: 11 }} />

                <Bar

                  dataKey="study_minutes"

                  name="Study min"

                  fill="#0ea5e9"

                  radius={[4, 4, 0, 0]}

                />

                <Bar

                  dataKey="pomodoros_completed"

                  name="Pomodoros"

                  fill="#737373"

                  radius={[4, 4, 0, 0]}

                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>
      </div>
    </div>

  );
}


