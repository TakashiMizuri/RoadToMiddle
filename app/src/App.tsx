import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutDashboard, BookOpen, Brain, Settings, PanelRightClose, PanelRightOpen, PanelLeftClose, PanelLeftOpen, GraduationCap } from "lucide-react";
import { NavTabs } from "@/components/NavTabs";
import { EmptyState } from "@/components/EmptyState";
import roadmapData from "@/data/roadmap.json";
import type { DashboardStats, RoadmapData } from "@/lib/types";
import { api, isBrowserPreview, isUsingBrowserFallback } from "@/lib/tauri-api";
import { STUDY_STATS_UPDATED } from "@/lib/study-stats-events";
import { useProgressStore } from "@/stores/progressStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { Sidebar } from "@/components/Sidebar";
import { LessonView } from "@/components/LessonView";
import { PomodoroWidget } from "@/components/PomodoroWidget";
import { DashboardPage } from "@/pages/DashboardPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { ReviewPage } from "@/pages/ReviewPage";
import { CourseProgressBar } from "@/components/CourseProgressBar";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type View = "dashboard" | "learn" | "review" | "settings";

const NAV_ITEMS = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "learn" as const, label: "Learn", icon: BookOpen },
  { id: "review" as const, label: "Review", icon: Brain },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

const roadmap = roadmapData as RoadmapData;

const SIDEBAR_STORAGE_KEY = "rtfm_lesson_sidebar_open";

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedId, setSelectedId] = useState<string | null>("0.1.1");
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showLessonSidebar, setShowLessonSidebar] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "false";
    } catch {
      return true;
    }
  });
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [browserFallback, setBrowserFallback] = useState(isBrowserPreview);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);

  const { progressMap, loadProgress } = useProgressStore();
  const { loadSettings } = useSettingsStore();

  useEffect(() => {
    void (async () => {
      if (!isBrowserPreview) {
        try {
          const { isPermissionGranted, requestPermission } = await import(
            "@tauri-apps/plugin-notification"
          );
          if (!(await isPermissionGranted())) {
            await requestPermission();
          }
        } catch {
          /* notifications optional */
        }
      }
    })();
    void loadSettings();
    void loadProgress();
    void api.getDashboardStats().then(setStats);
    void isUsingBrowserFallback().then(setBrowserFallback);
  }, [loadSettings, loadProgress]);

  useEffect(() => {
    const onStatsUpdated = () => {
      void api.getDashboardStats().then(setStats);
    };
    window.addEventListener(STUDY_STATS_UPDATED, onStatsUpdated);
    return () => window.removeEventListener(STUDY_STATS_UPDATED, onStatsUpdated);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        setShowRightPanel((v) => !v);
      }
      if (e.ctrlKey && e.key === "b" && view === "learn") {
        e.preventDefault();
        setShowLessonSidebar((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(showLessonSidebar));
    } catch {
      /* ignore */
    }
  }, [showLessonSidebar]);

  const refreshStats = () => void api.getDashboardStats().then(setStats);

  const courseCompleted = useMemo(
    () => Object.values(progressMap).filter((p) => p.status === "completed").length,
    [progressMap],
  );

  const navigateToSubtopic = (id: string) => {
    setSelectedId(id);
    setView("learn");
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow-sm">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="hidden text-sm font-semibold tracking-tight whitespace-nowrap sm:inline">
              Road to Middle
            </span>
          </div>
          <NavTabs
            items={NAV_ITEMS}
            active={view}
            onChange={(id) => {
              const next = id as View;
              setView(next);
              if (next === "dashboard") refreshStats();
            }}
          />
        </div>

        <CourseProgressBar completed={courseCompleted} total={roadmap.totalSubtopics} />

        <div className="flex shrink-0 items-center gap-2">
          {view === "learn" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLessonSidebar((v) => !v)}
                title={showLessonSidebar ? "Hide lesson tree (Ctrl+B)" : "Show lesson tree (Ctrl+B)"}
              >
                {showLessonSidebar ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeftOpen className="h-4 w-4" />
                )}
              </Button>
              <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900">
              <input
                type="checkbox"
                checked={hideCompleted}
                onChange={(e) => setHideCompleted(e.target.checked)}
              />
              Hide completed
            </label>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowRightPanel((v) => !v)}
            title="Toggle Pomodoro (Ctrl+P)"
          >
            {showRightPanel ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      {browserFallback && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
          Browser preview — progress saved in localStorage only. For the full desktop app run{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">npm run desktop:dev</code>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {view === "learn" && (
          <div
            className={cn(
              "relative shrink-0 overflow-hidden border-r border-neutral-200/80 bg-white transition-[width] duration-200 ease-in-out dark:border-neutral-800 dark:bg-neutral-950",
              showLessonSidebar ? "w-72" : "w-0 border-r-0",
            )}
          >
            <div className="flex h-full w-72 flex-col">
              <Sidebar
                roadmap={roadmap}
                progressMap={progressMap}
                selectedId={selectedId}
                hideCompleted={hideCompleted}
                onSelect={navigateToSubtopic}
                scrollRef={sidebarScrollRef}
                onCollapse={() => setShowLessonSidebar(false)}
              />
            </div>
          </div>
        )}

        {view === "learn" && !showLessonSidebar && (
          <div className="flex w-10 shrink-0 flex-col items-center border-r border-neutral-200/80 bg-white py-2 dark:border-neutral-800 dark:bg-neutral-950">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setShowLessonSidebar(true)}
              title="Show lesson tree (Ctrl+B)"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
          </div>
        )}

        <main className={cn("min-w-0 flex-1 bg-neutral-50 dark:bg-neutral-950", view !== "learn" && "overflow-auto")}>
          {view === "dashboard" && (
            <DashboardPage
              stats={stats}
              roadmap={roadmap}
              onContinue={navigateToSubtopic}
            />
          )}
          {view === "learn" && selectedId && (
            <LessonView
              roadmap={roadmap}
              subtopicId={selectedId}
              onNavigate={(id) => {
                navigateToSubtopic(id);
                void loadProgress();
                refreshStats();
              }}
            />
          )}
          {view === "learn" && !selectedId && (
            <EmptyState
              icon={BookOpen}
              title="Choose a subtopic"
              description="Pick a lesson from the sidebar to start learning, or use search to find a topic."
            />
          )}
          {view === "review" && <ReviewPage roadmap={roadmap} />}
          {view === "settings" && <SettingsPage />}
        </main>

        {showRightPanel && view !== "review" && (
          <aside className="w-64 shrink-0 border-l border-neutral-200/80 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <PomodoroWidget
              subtopicId={view === "learn" ? selectedId : null}
              todayPomodoros={stats?.today.pomodoros_completed ?? 0}
              weekPomodoros={stats?.week.pomodoros_completed ?? 0}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
