export type LessonStep =
  | "lection_eng"
  | "lection_ru"
  | "summary"
  | "test"
  | "answers"
  | "exercises";

export type SubtopicStatus = "not_started" | "in_progress" | "completed";

export interface Subtopic {
  id: string;
  title: string;
  depth: string;
  hasLesson: boolean;
  stepsAvailable: string[];
}

export interface RoadmapNode {
  id: string;
  slug: string;
  title: string;
  subtopics: Subtopic[];
}

export interface RoadmapPhase {
  id: number;
  title: string;
  nodes: RoadmapNode[];
}

export interface RoadmapData {
  generatedAt: string;
  totalSubtopics: number;
  phases: RoadmapPhase[];
}

export interface SubtopicProgress {
  subtopic_id: string;
  status: SubtopicStatus;
  current_step: string;
  steps_completed: string[];
  test_score: number | null;
  test_max_score: number | null;
  pass_threshold: number;
  started_at: string | null;
  completed_at: string | null;
  total_study_seconds: number;
}

export interface AppSettings {
  repo_path: string | null;
  pomodoro_work_minutes: number;
  pomodoro_short_break_minutes: number;
  pomodoro_long_break_minutes: number;
  pomodoro_sessions_until_long: number;
  sync_progress_md: boolean;
  theme: string;
}

export interface StatsSummary {
  subtopics_completed: number;
  study_minutes: number;
  pomodoros_completed: number;
}

export interface ActivityDay {
  date: string;
  study_minutes: number;
  subtopics_completed: number;
  pomodoros_completed: number;
}

export interface DashboardStats {
  today: StatsSummary;
  week: StatsSummary;
  month: StatsSummary;
  streak_days: number;
  total_completed: number;
  total_in_progress: number;
  activity_by_day: ActivityDay[];
  continue_subtopic_id: string | null;
}

export interface LessonContent {
  content: string;
  step: string;
  pass_threshold: number | null;
  test_max_score: number | null;
}

export interface ReviewCard {
  subtopic_id: string;
  card_id: string;
  category: string;
  question: string;
  answer: string;
}

export interface ReviewSubtopicInfo {
  subtopic_id: string;
  card_count: number;
}

export interface ReviewSessionStart {
  session_id: number;
  cards: ReviewCard[];
}

export interface ReviewDayStats {
  date: string;
  cards_reviewed: number;
  cards_correct: number;
  cards_incorrect: number;
  sessions: number;
}

export interface ReviewStats {
  today: ReviewDayStats;
  week_cards: number;
  week_correct: number;
  week_incorrect: number;
  total_cards_reviewed: number;
  accuracy_pct: number;
  activity_by_day: ReviewDayStats[];
}

export const STEP_ORDER: LessonStep[] = [
  "lection_eng",
  "lection_ru",
  "summary",
  "test",
  "answers",
  "exercises",
];

export const STEP_LABELS: Record<LessonStep, string> = {
  lection_eng: "Lection (EN)",
  lection_ru: "Lection (RU)",
  summary: "Summary",
  test: "Test",
  answers: "Answers",
  exercises: "Exercises",
};

export function getNextSubtopicId(
  roadmap: RoadmapData,
  currentId: string,
): string | null {
  const allIds = roadmap.phases.flatMap((p) =>
    p.nodes.flatMap((n) => n.subtopics.map((s) => s.id)),
  );
  const idx = allIds.indexOf(currentId);
  if (idx === -1 || idx >= allIds.length - 1) return null;
  return allIds[idx + 1];
}

export function findSubtopic(
  roadmap: RoadmapData,
  id: string,
): { subtopic: Subtopic; phase: RoadmapPhase; node: RoadmapNode } | null {
  for (const phase of roadmap.phases) {
    for (const node of phase.nodes) {
      const subtopic = node.subtopics.find((s) => s.id === id);
      if (subtopic) return { subtopic, phase, node };
    }
  }
  return null;
}

export function flattenSubtopics(roadmap: RoadmapData): Subtopic[] {
  return roadmap.phases.flatMap((p) => p.nodes.flatMap((n) => n.subtopics));
}
