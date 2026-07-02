import { browserApi } from "./browser-api";

import { electronApi } from "./electron-api";

import { isElectronRuntime, isTauriRuntime } from "./platform";

import type {

  AppSettings,

  DashboardStats,

  LessonContent,

  ReviewSessionStart,

  ReviewStats,

  ReviewSubtopicInfo,

  SubtopicProgress,

} from "./types";



type Api = typeof browserApi;



async function tauriInvoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {

  const { invoke } = await import("@tauri-apps/api/core");

  return invoke<T>(cmd, args);

}



const tauriApi: Api = {

  getSettings: () => tauriInvoke<AppSettings>("get_settings"),

  saveSettings: (settings) => tauriInvoke<void>("save_settings_cmd", { settings }),

  detectRepoPath: () => tauriInvoke<string | null>("detect_repo_path"),

  getAllProgress: () => tauriInvoke<SubtopicProgress[]>("get_all_progress_cmd"),

  getSubtopicProgress: (subtopic_id) =>

    tauriInvoke<SubtopicProgress>("get_subtopic_progress_cmd", { subtopic_id }),

  readLessonStep: (subtopic_id, step) =>

    tauriInvoke<LessonContent>("read_lesson_step", { subtopic_id, step }),

  startSubtopic: (subtopic_id) => tauriInvoke<SubtopicProgress>("start_subtopic", { subtopic_id }),

  completeStep: (subtopic_id, step, has_exercises) =>

    tauriInvoke<SubtopicProgress>("complete_step", {

      subtopic_id,

      step,

      has_exercises,

    }),

  submitTestScore: (subtopic_id, score, max_score, pass_threshold, has_exercises) =>

    tauriInvoke<SubtopicProgress>("submit_test_score", {

      subtopic_id,

      score,

      max_score,

      pass_threshold,

      has_exercises,

    }),

  markSubtopicCompleted: (subtopic_id) =>

    tauriInvoke<SubtopicProgress>("mark_subtopic_completed", { subtopic_id }),

  recordStudyHeartbeat: (subtopic_id, step, seconds) =>

    tauriInvoke<void>("record_study_heartbeat", { subtopic_id, step, seconds }),

  logPomodoroSession: (input) => tauriInvoke<void>("log_pomodoro_session", { input }),

  getDashboardStats: () => tauriInvoke<DashboardStats>("get_dashboard_stats"),

  exportProgressMd: () => tauriInvoke<void>("export_progress_md_cmd"),

  resetAllProgress: () => tauriInvoke<void>("reset_all_progress_cmd"),

  getReviewSubtopics: () => tauriInvoke<ReviewSubtopicInfo[]>("get_review_subtopics"),

  startReviewSession: (subtopic_ids) =>

    tauriInvoke<ReviewSessionStart>("start_review_session", { subtopic_ids }),

  recordReviewResult: (session_id, subtopic_id, card_id, was_correct) =>

    tauriInvoke<void>("record_review_result", {

      session_id,

      subtopic_id,

      card_id,

      was_correct,

    }),

  finishReviewSession: (session_id) =>

    tauriInvoke<void>("finish_review_session", { session_id }),

  getReviewStats: () => tauriInvoke<ReviewStats>("get_review_stats"),

};



let cachedApi: Api | null = null;

let resolving: Promise<Api> | null = null;



/** Pick Electron, Tauri, or browser API. */

export async function resolveApi(): Promise<Api> {

  if (cachedApi) return cachedApi;

  if (!resolving) {

    resolving = (async () => {

      if (isElectronRuntime()) {

        cachedApi = electronApi;

        return cachedApi;

      }

      if (isTauriRuntime()) {

        try {

          await tauriInvoke<AppSettings>("get_settings");

          cachedApi = tauriApi;

          return cachedApi;

        } catch {

          console.warn("Tauri backend unavailable. Using browser fallback.");

        }

      }

      cachedApi = browserApi;

      return cachedApi;

    })();

  }

  return resolving;

}



function bindMethod(method: keyof Api) {

  return (...args: unknown[]) =>

    resolveApi().then((impl) => {

      const fn = impl[method] as (...a: unknown[]) => unknown;

      return fn(...args);

    });

}



/** Unified API: Electron / Tauri desktop or browser preview. */

export const api = {

  getSettings: () => bindMethod("getSettings")() as ReturnType<Api["getSettings"]>,

  saveSettings: (...args: Parameters<Api["saveSettings"]>) =>

    bindMethod("saveSettings")(...args) as ReturnType<Api["saveSettings"]>,

  detectRepoPath: () => bindMethod("detectRepoPath")() as ReturnType<Api["detectRepoPath"]>,

  getAllProgress: () => bindMethod("getAllProgress")() as ReturnType<Api["getAllProgress"]>,

  getSubtopicProgress: (...args: Parameters<Api["getSubtopicProgress"]>) =>

    bindMethod("getSubtopicProgress")(...args) as ReturnType<Api["getSubtopicProgress"]>,

  readLessonStep: (...args: Parameters<Api["readLessonStep"]>) =>

    bindMethod("readLessonStep")(...args) as ReturnType<Api["readLessonStep"]>,

  startSubtopic: (...args: Parameters<Api["startSubtopic"]>) =>

    bindMethod("startSubtopic")(...args) as ReturnType<Api["startSubtopic"]>,

  completeStep: (...args: Parameters<Api["completeStep"]>) =>

    bindMethod("completeStep")(...args) as ReturnType<Api["completeStep"]>,

  submitTestScore: (...args: Parameters<Api["submitTestScore"]>) =>

    bindMethod("submitTestScore")(...args) as ReturnType<Api["submitTestScore"]>,

  markSubtopicCompleted: (...args: Parameters<Api["markSubtopicCompleted"]>) =>

    bindMethod("markSubtopicCompleted")(...args) as ReturnType<Api["markSubtopicCompleted"]>,

  recordStudyHeartbeat: (...args: Parameters<Api["recordStudyHeartbeat"]>) =>

    bindMethod("recordStudyHeartbeat")(...args) as ReturnType<Api["recordStudyHeartbeat"]>,

  logPomodoroSession: (...args: Parameters<Api["logPomodoroSession"]>) =>

    bindMethod("logPomodoroSession")(...args) as ReturnType<Api["logPomodoroSession"]>,

  getDashboardStats: () => bindMethod("getDashboardStats")() as ReturnType<Api["getDashboardStats"]>,

  exportProgressMd: () => bindMethod("exportProgressMd")() as ReturnType<Api["exportProgressMd"]>,

  resetAllProgress: () =>
    bindMethod("resetAllProgress")() as ReturnType<Api["resetAllProgress"]>,

  getReviewSubtopics: () =>

    bindMethod("getReviewSubtopics")() as ReturnType<Api["getReviewSubtopics"]>,

  startReviewSession: (...args: Parameters<Api["startReviewSession"]>) =>

    bindMethod("startReviewSession")(...args) as ReturnType<Api["startReviewSession"]>,

  recordReviewResult: (...args: Parameters<Api["recordReviewResult"]>) =>

    bindMethod("recordReviewResult")(...args) as ReturnType<Api["recordReviewResult"]>,

  finishReviewSession: (...args: Parameters<Api["finishReviewSession"]>) =>

    bindMethod("finishReviewSession")(...args) as ReturnType<Api["finishReviewSession"]>,

  getReviewStats: () => bindMethod("getReviewStats")() as ReturnType<Api["getReviewStats"]>,

} satisfies Api;



export const isBrowserPreview = !isElectronRuntime() && !isTauriRuntime();



export async function isUsingBrowserFallback(): Promise<boolean> {

  const impl = await resolveApi();

  return impl === browserApi;

}


