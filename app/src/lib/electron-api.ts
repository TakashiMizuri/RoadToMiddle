import type { browserApi } from "./browser-api";

type Api = typeof browserApi;

type ElectronBridge = {
  invoke: (method: string, ...args: unknown[]) => Promise<unknown>;
  pickFolder: () => Promise<string | null>;
  showNotification: (title: string, body: string) => Promise<void>;
  platform: "electron";
};

declare global {
  interface Window {
    electronAPI?: ElectronBridge;
  }
}

function invoke<T>(method: string, ...args: unknown[]): Promise<T> {
  if (!window.electronAPI) {
    throw new Error("Electron API not available");
  }
  return window.electronAPI.invoke(method, ...args) as Promise<T>;
}

export const electronApi: Api = {
  getSettings: () => invoke("getSettings"),
  saveSettings: (settings) => invoke("saveSettings", settings),
  detectRepoPath: () => invoke("detectRepoPath"),
  getAllProgress: () => invoke("getAllProgress"),
  getSubtopicProgress: (subtopic_id) => invoke("getSubtopicProgress", subtopic_id),
  readLessonStep: (subtopic_id, step) => invoke("readLessonStep", subtopic_id, step),
  startSubtopic: (subtopic_id) => invoke("startSubtopic", subtopic_id),
  completeStep: (subtopic_id, step, has_exercises) =>
    invoke("completeStep", subtopic_id, step, has_exercises),
  submitTestScore: (subtopic_id, score, max_score, pass_threshold, has_exercises) =>
    invoke("submitTestScore", subtopic_id, score, max_score, pass_threshold, has_exercises),
  markSubtopicCompleted: (subtopic_id) => invoke("markSubtopicCompleted", subtopic_id),
  recordStudyHeartbeat: (subtopic_id, step, seconds) =>
    invoke("recordStudyHeartbeat", subtopic_id, step, seconds),
  logPomodoroSession: (input) => invoke("logPomodoroSession", input),
  getDashboardStats: () => invoke("getDashboardStats"),
  exportProgressMd: () => invoke("exportProgressMd"),
  resetAllProgress: () => invoke("resetAllProgress"),
  getReviewSubtopics: () => invoke("getReviewSubtopics"),
  startReviewSession: (subtopic_ids) => invoke("startReviewSession", subtopic_ids),
  recordReviewResult: (session_id, subtopic_id, card_id, was_correct) =>
    invoke("recordReviewResult", session_id, subtopic_id, card_id, was_correct),
  finishReviewSession: (session_id) => invoke("finishReviewSession", session_id),
  getReviewStats: () => invoke("getReviewStats"),
};

export async function pickRepoFolder(): Promise<string | null> {
  return window.electronAPI?.pickFolder() ?? null;
}

export async function showDesktopNotification(title: string, body: string): Promise<void> {
  await window.electronAPI?.showNotification(title, body);
}
