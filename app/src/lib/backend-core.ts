import type {
  AppSettings,
  DashboardStats,
  LessonContent,
  ReviewSessionStart,
  ReviewStats,
  ReviewSubtopicInfo,
  SubtopicProgress,
} from "./types";
import { parseReviewCardsFromMarkdown } from "./parse-review-cards";
import { buildYearDates, getCurrentYear } from "./calendar-year";

export const STEP_FILES: Record<string, string> = {
  lection: "1.lection.md",
  summary: "2.summary.md",
  test: "3.test-yourself.md",
  answers: "4.test-yourself-answers.md",
  exercises: "5.exercises.md",
};

export const STORAGE_KEYS = {
  settings: "rtfm_settings",
  progress: "rtfm_progress",
  studySessions: "rtfm_study_sessions",
  pomodoro: "rtfm_pomodoro",
  reviewSessions: "rtfm_review_sessions",
  reviewResults: "rtfm_review_results",
} as const;

export interface KeyValueStorage {
  load<T>(key: string, fallback: T): T;
  save(key: string, value: unknown): void;
}

export interface BackendOptions {
  storage: KeyValueStorage;
  readLessonFile: (subtopic_id: string, step: string) => Promise<string>;
  detectRepoPath: () => Promise<string | null>;
  exportProgressMd?: (progress: SubtopicProgress[], repoPath: string) => Promise<void>;
}

interface StoredStudySession {
  id: number;
  subtopic_id: string;
  step: string;
  started_at: string;
  duration_seconds: number;
}

interface StoredPomodoroSession {
  id: number;
  subtopic_id?: string;
  session_type: string;
  planned_seconds: number;
  actual_seconds: number;
  completed: boolean;
  started_at: string;
}

export function defaultSettings(): AppSettings {
  return {
    repo_path: null,
    pomodoro_work_minutes: 25,
    pomodoro_short_break_minutes: 5,
    pomodoro_long_break_minutes: 15,
    pomodoro_sessions_until_long: 4,
    sync_progress_md: false,
    theme: "system",
  };
}

function defaultProgress(subtopic_id: string): SubtopicProgress {
  return {
    subtopic_id,
    status: "not_started",
    current_step: "lection",
    steps_completed: [],
    test_score: null,
    test_max_score: null,
    pass_threshold: 80,
    started_at: null,
    completed_at: null,
    total_study_seconds: 0,
  };
}

export function parseTestMeta(content: string): { pass_threshold: number; test_max_score: number } {
  let pass_threshold = 80;
  let test_max_score = 16;
  for (const line of content.replace(/\r\n/g, "\n").split("\n")) {
    if (line.includes("Pass threshold")) {
      const m = line.match(/(\d+)\s*%/);
      if (m) pass_threshold = Number(m[1]);
    }
    if (line.includes("Score yourself") && line.includes("/")) {
      const m = line.split("/")[1]?.match(/(\d+)/);
      if (m) test_max_score = Number(m[1]);
    }
  }
  return { pass_threshold, test_max_score };
}

function testPassed(p: SubtopicProgress): boolean {
  if (p.test_score == null || p.test_max_score == null || p.test_max_score <= 0) return false;
  return (p.test_score / p.test_max_score) * 100 >= p.pass_threshold;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function daysAgoIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function isSince(iso: string, sinceIso: string): boolean {
  return iso >= sinceIso;
}

export function createBackend(options: BackendOptions) {
  const { storage, readLessonFile, detectRepoPath, exportProgressMd } = options;
  const K = STORAGE_KEYS;

  const loadJson = <T,>(key: string, fallback: T): T => storage.load(key, fallback);
  const saveJson = (key: string, value: unknown) => storage.save(key, value);

  const getProgressMap = (): Record<string, SubtopicProgress> => loadJson(K.progress, {});
  const saveProgressMap = (map: Record<string, SubtopicProgress>) => saveJson(K.progress, map);
  const getStudySessions = (): StoredStudySession[] => loadJson(K.studySessions, []);
  const saveStudySessions = (sessions: StoredStudySession[]) => saveJson(K.studySessions, sessions);
  const getPomodoroSessions = (): StoredPomodoroSession[] => loadJson(K.pomodoro, []);
  const savePomodoroSessions = (sessions: StoredPomodoroSession[]) => saveJson(K.pomodoro, sessions);

  const maybeSyncProgress = async () => {
    const settings = loadJson(K.settings, defaultSettings());
    if (!settings.sync_progress_md || !settings.repo_path || !exportProgressMd) return;
    const progress = Object.values(getProgressMap()).filter((p) => p.status !== "not_started");
    await exportProgressMd(progress, settings.repo_path);
  };

  function computeStreak(
    progress: SubtopicProgress[],
    studySessions: StoredStudySession[],
    pomodoros: StoredPomodoroSession[],
  ): number {
    let streak = 0;
    for (let daysAgo = 0; daysAgo < 365; daysAgo++) {
      const day = daysAgoIso(daysAgo).slice(0, 10);
      const completed = progress.filter(
        (p) => p.status === "completed" && p.completed_at?.startsWith(day),
      ).length;
      const studySecs = studySessions
        .filter((s) => s.started_at.startsWith(day))
        .reduce((sum, s) => sum + s.duration_seconds, 0);
      const pomoCount = pomodoros.filter(
        (p) => p.completed && p.session_type === "work" && p.started_at.startsWith(day),
      ).length;
      const active = completed > 0 || studySecs >= 25 * 60 || pomoCount > 0;
      if (daysAgo === 0) {
        if (!active) break;
        streak = 1;
      } else if (active) {
        streak += 1;
      } else {
        break;
      }
    }
    return streak;
  }

  function buildDashboardStats(): DashboardStats {
    const map = getProgressMap();
    const progress = Object.values(map);
    const completed = progress.filter((p) => p.status === "completed");
    const inProgress = progress.filter((p) => p.status === "in_progress");
    const studySessions = getStudySessions();
    const pomodoros = getPomodoroSessions();

    const continueId =
      inProgress.sort((a, b) => (b.started_at ?? "").localeCompare(a.started_at ?? ""))[0]
        ?.subtopic_id ?? null;

    const todayStart = daysAgoIso(0).slice(0, 10) + "T00:00:00.000Z";
    const weekStart = daysAgoIso(7);
    const monthStart = daysAgoIso(30);

    const statsForRange = (since: string) => {
      const subtopics_completed = completed.filter(
        (p) => p.completed_at && isSince(p.completed_at, since),
      ).length;
      const study_seconds = studySessions
        .filter((s) => isSince(s.started_at, since))
        .reduce((sum, s) => sum + s.duration_seconds, 0);
      const pomodoros_completed = pomodoros.filter(
        (p) => p.completed && p.session_type === "work" && isSince(p.started_at, since),
      ).length;
      return {
        subtopics_completed,
        study_minutes: Math.floor(study_seconds / 60),
        pomodoros_completed,
      };
    };

    const activity_by_day = buildYearDates(getCurrentYear()).map((date) => {
      const study_seconds = studySessions
        .filter((s) => s.started_at.startsWith(date))
        .reduce((sum, s) => sum + s.duration_seconds, 0);
      const subtopics_completed = completed.filter((p) =>
        p.completed_at?.startsWith(date),
      ).length;
      const pomodoros_completed = pomodoros.filter(
        (p) => p.completed && p.session_type === "work" && p.started_at.startsWith(date),
      ).length;
      return {
        date,
        study_minutes: Math.floor(study_seconds / 60),
        subtopics_completed,
        pomodoros_completed,
      };
    });

    return {
      today: statsForRange(todayStart),
      week: statsForRange(weekStart),
      month: statsForRange(monthStart),
      streak_days: computeStreak(progress, studySessions, pomodoros),
      total_completed: completed.length,
      total_in_progress: inProgress.length,
      activity_by_day,
      continue_subtopic_id: continueId,
    };
  }

  return {
    getSettings: async (): Promise<AppSettings> => loadJson(K.settings, defaultSettings()),

    saveSettings: async (settings: AppSettings): Promise<void> => {
      saveJson(K.settings, settings);
    },

    detectRepoPath,

    getAllProgress: async (): Promise<SubtopicProgress[]> => Object.values(getProgressMap()),

    getSubtopicProgress: async (subtopic_id: string): Promise<SubtopicProgress> =>
      getProgressMap()[subtopic_id] ?? defaultProgress(subtopic_id),

    readLessonStep: async (subtopic_id: string, step: string): Promise<LessonContent> => {
      const content = await readLessonFile(subtopic_id, step);
      const meta = step === "test" ? parseTestMeta(content) : null;
      return {
        content,
        step,
        pass_threshold: meta?.pass_threshold ?? null,
        test_max_score: meta?.test_max_score ?? null,
      };
    },

    startSubtopic: async (subtopic_id: string): Promise<SubtopicProgress> => {
      const map = getProgressMap();
      const p = map[subtopic_id] ?? defaultProgress(subtopic_id);
      if (!p.started_at) p.started_at = new Date().toISOString();
      p.status = "in_progress";
      map[subtopic_id] = p;
      saveProgressMap(map);
      await maybeSyncProgress();
      return p;
    },

    completeStep: async (
      subtopic_id: string,
      step: string,
      has_exercises: boolean,
    ): Promise<SubtopicProgress> => {
      const map = getProgressMap();
      const p = { ...(map[subtopic_id] ?? defaultProgress(subtopic_id)) };
      if (!p.steps_completed.includes(step)) p.steps_completed.push(step);
      if (!p.started_at) p.started_at = new Date().toISOString();
      p.status = "in_progress";

      const order = ["lection", "summary", "test", "answers", "exercises"];
      const idx = order.indexOf(step);
      if (idx >= 0 && idx < order.length - 1) {
        const next = order[idx + 1];
        if (next === "exercises" && !has_exercises) {
          if (step === "answers" && testPassed(p)) {
            p.status = "completed";
            p.completed_at = new Date().toISOString();
          }
        } else if (next !== "exercises" || has_exercises) {
          p.current_step = next;
        }
      }
      if (step === "answers" && !has_exercises && testPassed(p)) {
        p.status = "completed";
        p.completed_at = new Date().toISOString();
      }
      if (step === "exercises") {
        p.status = "completed";
        p.completed_at = new Date().toISOString();
      }

      map[subtopic_id] = p;
      saveProgressMap(map);
      await maybeSyncProgress();
      return p;
    },

    submitTestScore: async (
      subtopic_id: string,
      score: number,
      max_score: number,
      pass_threshold: number,
      _has_exercises?: boolean,
    ): Promise<SubtopicProgress> => {
      const map = getProgressMap();
      const p = { ...(map[subtopic_id] ?? defaultProgress(subtopic_id)) };
      p.test_score = score;
      p.test_max_score = max_score;
      p.pass_threshold = pass_threshold;
      if (!p.steps_completed.includes("test")) p.steps_completed.push("test");
      const pct = max_score > 0 ? (score / max_score) * 100 : 0;
      p.current_step = pct >= pass_threshold ? "answers" : "test";
      if (!p.started_at) p.started_at = new Date().toISOString();
      p.status = "in_progress";
      map[subtopic_id] = p;
      saveProgressMap(map);
      await maybeSyncProgress();
      return p;
    },

    markSubtopicCompleted: async (subtopic_id: string): Promise<SubtopicProgress> => {
      const map = getProgressMap();
      const p = { ...(map[subtopic_id] ?? defaultProgress(subtopic_id)) };
      p.status = "completed";
      p.completed_at = new Date().toISOString();
      map[subtopic_id] = p;
      saveProgressMap(map);
      await maybeSyncProgress();
      return p;
    },

    recordStudyHeartbeat: async (
      subtopic_id: string,
      step: string,
      seconds: number,
    ): Promise<void> => {
      const map = getProgressMap();
      const p = { ...(map[subtopic_id] ?? defaultProgress(subtopic_id)) };
      p.total_study_seconds += seconds;
      if (!p.started_at) {
        p.started_at = new Date().toISOString();
        p.status = "in_progress";
      }
      map[subtopic_id] = p;
      saveProgressMap(map);

      const sessions = getStudySessions();
      const today = new Date().toISOString().slice(0, 10);
      const existing = [...sessions]
        .reverse()
        .find(
          (s) =>
            s.subtopic_id === subtopic_id &&
            s.step === step &&
            s.started_at.startsWith(today),
        );
      if (existing) {
        existing.duration_seconds += seconds;
      } else {
        const last = sessions.length > 0 ? sessions[sessions.length - 1] : undefined;
        sessions.push({
          id: (last?.id ?? 0) + 1,
          subtopic_id,
          step,
          started_at: new Date().toISOString(),
          duration_seconds: seconds,
        });
      }
      saveStudySessions(sessions);
    },

    logPomodoroSession: async (input: {
      subtopic_id?: string;
      session_type: string;
      planned_seconds: number;
      actual_seconds: number;
      completed: boolean;
    }): Promise<void> => {
      const sessions = getPomodoroSessions();
      const last = sessions.length > 0 ? sessions[sessions.length - 1] : undefined;
      sessions.push({
        id: (last?.id ?? 0) + 1,
        subtopic_id: input.subtopic_id,
        session_type: input.session_type,
        planned_seconds: input.planned_seconds,
        actual_seconds: input.actual_seconds,
        completed: input.completed,
        started_at: new Date().toISOString(),
      });
      savePomodoroSessions(sessions);
    },

    getDashboardStats: async (): Promise<DashboardStats> => buildDashboardStats(),

    exportProgressMd: async (): Promise<void> => {
      const settings = loadJson(K.settings, defaultSettings());
      if (!settings.repo_path || !exportProgressMd) {
        throw new Error("Repository path not set");
      }
      const progress = Object.values(getProgressMap()).filter((p) => p.status !== "not_started");
      await exportProgressMd(progress, settings.repo_path);
    },

    resetAllProgress: async (): Promise<void> => {
      saveProgressMap({});
      saveJson(K.studySessions, []);
      saveJson(K.pomodoro, []);
      saveJson(K.reviewSessions, []);
      saveJson(K.reviewResults, []);
      await maybeSyncProgress();
    },

    getReviewSubtopics: async (): Promise<ReviewSubtopicInfo[]> => {
      const map = getProgressMap();
      const completed = Object.keys(map).filter((id) => map[id].status === "completed");
      const result: ReviewSubtopicInfo[] = [];
      for (const subtopic_id of completed) {
        try {
          const test = await readLessonFile(subtopic_id, "test");
          const answers = await readLessonFile(subtopic_id, "answers");
          const cards = parseReviewCardsFromMarkdown(subtopic_id, test, answers);
          if (cards.length > 0) {
            result.push({ subtopic_id, card_count: cards.length });
          }
        } catch {
          /* skip */
        }
      }
      return result.sort((a, b) => a.subtopic_id.localeCompare(b.subtopic_id));
    },

    startReviewSession: async (subtopic_ids: string[]): Promise<ReviewSessionStart> => {
      const allCards = [];
      for (const subtopic_id of subtopic_ids) {
        const test = await readLessonFile(subtopic_id, "test");
        const answers = await readLessonFile(subtopic_id, "answers");
        allCards.push(...parseReviewCardsFromMarkdown(subtopic_id, test, answers));
      }
      if (allCards.length === 0) {
        throw new Error("No review cards found for selected topics");
      }
      const sessions = loadJson<{ id: number; subtopic_ids: string[] }[]>(K.reviewSessions, []);
      const last = sessions.length > 0 ? sessions[sessions.length - 1] : undefined;
      const session_id = (last?.id ?? 0) + 1;
      sessions.push({ id: session_id, subtopic_ids });
      saveJson(K.reviewSessions, sessions);
      return { session_id, cards: shuffle(allCards) };
    },

    recordReviewResult: async (
      session_id: number,
      subtopic_id: string,
      card_id: string,
      was_correct: boolean,
    ): Promise<void> => {
      const results = loadJson<
        {
          session_id: number;
          subtopic_id: string;
          card_id: string;
          was_correct: boolean;
          answered_at: string;
        }[]
      >(K.reviewResults, []);
      results.push({
        session_id,
        subtopic_id,
        card_id,
        was_correct,
        answered_at: new Date().toISOString(),
      });
      saveJson(K.reviewResults, results);
    },

    finishReviewSession: async (_session_id: number): Promise<void> => {},

    getReviewStats: async (): Promise<ReviewStats> => {
      const results = loadJson<{ was_correct: boolean; answered_at: string }[]>(K.reviewResults, []);
      const today = new Date().toISOString().slice(0, 10);
      const weekAgo = Date.now() - 7 * 86400000;

      const todayR = results.filter((r) => r.answered_at.startsWith(today));
      const weekR = results.filter((r) => new Date(r.answered_at).getTime() >= weekAgo);
      const correct = results.filter((r) => r.was_correct).length;

      const activity_by_day = buildYearDates(getCurrentYear()).map((dateStr) => {
        const dayR = results.filter((r) => r.answered_at.startsWith(dateStr));
        return {
          date: dateStr,
          cards_reviewed: dayR.length,
          cards_correct: dayR.filter((r) => r.was_correct).length,
          cards_incorrect: dayR.filter((r) => !r.was_correct).length,
          sessions: 0,
        };
      });

      return {
        today: {
          date: today,
          cards_reviewed: todayR.length,
          cards_correct: todayR.filter((r) => r.was_correct).length,
          cards_incorrect: todayR.filter((r) => !r.was_correct).length,
          sessions: 0,
        },
        week_cards: weekR.length,
        week_correct: weekR.filter((r) => r.was_correct).length,
        week_incorrect: weekR.filter((r) => !r.was_correct).length,
        total_cards_reviewed: results.length,
        accuracy_pct: results.length ? (correct / results.length) * 100 : 0,
        activity_by_day,
      };
    },
  };
}

export type BackendApi = ReturnType<typeof createBackend>;
