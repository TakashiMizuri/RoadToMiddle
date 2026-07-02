import { create } from "zustand";
import { api } from "@/lib/tauri-api";
import { showDesktopNotification } from "@/lib/electron-api";
import { isElectronRuntime, isTauriRuntime } from "@/lib/platform";
import { notifyStudyStatsUpdated } from "@/lib/study-stats-events";
import { useSettingsStore } from "./settingsStore";

export type PomodoroPhase = "idle" | "work" | "short_break" | "long_break";

interface PomodoroState {
  phase: PomodoroPhase;
  secondsLeft: number;
  isRunning: boolean;
  completedWorkSessions: number;
  linkedSubtopicId: string | null;
  intervalId: number | null;
  phaseStartedAt: number | null;
  plannedSeconds: number;
  startWork: (subtopicId?: string) => void;
  startBreak: (long?: boolean) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

function getWorkSeconds() {
  return useSettingsStore.getState().settings.pomodoro_work_minutes * 60;
}

function getShortBreakSeconds() {
  return useSettingsStore.getState().settings.pomodoro_short_break_minutes * 60;
}

function getLongBreakSeconds() {
  return useSettingsStore.getState().settings.pomodoro_long_break_minutes * 60;
}

async function notify(title: string, body: string) {
  if (isElectronRuntime()) {
    await showDesktopNotification(title, body);
    return;
  }
  if (!isTauriRuntime()) return;
  try {
    const { sendNotification } = await import("@tauri-apps/plugin-notification");
    await sendNotification({ title, body });
  } catch {
    /* notifications may be denied */
  }
}

function clearTimer(intervalId: number | null) {
  if (intervalId) window.clearInterval(intervalId);
}

function logSession(
  phase: PomodoroPhase,
  planned: number,
  actual: number,
  completed: boolean,
  subtopicId: string | null,
) {
  if (phase === "idle") return;
  void api
    .logPomodoroSession({
      subtopic_id: subtopicId ?? undefined,
      session_type: phase,
      planned_seconds: planned,
      actual_seconds: actual,
      completed,
    })
    .then(() => notifyStudyStatsUpdated());
}

export const usePomodoroStore = create<PomodoroState>((set, get) => {
  const tick = () => {
    const state = get();
    if (!state.isRunning) return;

    if (state.secondsLeft <= 1) {
      const planned = state.plannedSeconds;

      logSession(state.phase, planned, planned, true, state.linkedSubtopicId);
      clearTimer(state.intervalId);

      if (state.phase === "work") {
        const sessions = state.completedWorkSessions + 1;
        const untilLong =
          useSettingsStore.getState().settings.pomodoro_sessions_until_long;
        const longBreak = sessions % untilLong === 0;
        void notify(
          "Pomodoro complete",
          longBreak ? "Time for a long break" : "Time for a short break",
        );
        set({
          completedWorkSessions: sessions,
          isRunning: false,
          intervalId: null,
          phaseStartedAt: null,
        });
        get().startBreak(longBreak);
      } else {
        void notify("Break over", "Ready for another focus session?");
        set({
          phase: "idle",
          secondsLeft: getWorkSeconds(),
          isRunning: false,
          intervalId: null,
          phaseStartedAt: null,
          plannedSeconds: getWorkSeconds(),
        });
      }
      return;
    }

    set({ secondsLeft: state.secondsLeft - 1 });
  };

  return {
    phase: "idle",
    secondsLeft: getWorkSeconds(),
    isRunning: false,
    completedWorkSessions: 0,
    linkedSubtopicId: null,
    intervalId: null,
    phaseStartedAt: null,
    plannedSeconds: getWorkSeconds(),

    startWork: (subtopicId) => {
      clearTimer(get().intervalId);
      const planned = getWorkSeconds();
      const id = window.setInterval(tick, 1000);
      set({
        phase: "work",
        secondsLeft: planned,
        plannedSeconds: planned,
        isRunning: true,
        linkedSubtopicId: subtopicId ?? null,
        intervalId: id,
        phaseStartedAt: Date.now(),
      });
    },

    startBreak: (long = false) => {
      clearTimer(get().intervalId);
      const planned = long ? getLongBreakSeconds() : getShortBreakSeconds();
      const id = window.setInterval(tick, 1000);
      set({
        phase: long ? "long_break" : "short_break",
        secondsLeft: planned,
        plannedSeconds: planned,
        isRunning: true,
        intervalId: id,
        phaseStartedAt: Date.now(),
      });
    },

    pause: () => set({ isRunning: false }),

    resume: () => {
      if (get().isRunning) return;
      clearTimer(get().intervalId);
      const id = window.setInterval(tick, 1000);
      set({ isRunning: true, intervalId: id });
    },

    reset: () => {
      const state = get();
      if (state.phase !== "idle" && state.phaseStartedAt) {
        const elapsed = state.plannedSeconds - state.secondsLeft;
        if (elapsed >= 60) {
          logSession(
            state.phase,
            state.plannedSeconds,
            elapsed,
            false,
            state.linkedSubtopicId,
          );
        }
      }
      clearTimer(state.intervalId);
      set({
        phase: "idle",
        secondsLeft: getWorkSeconds(),
        isRunning: false,
        intervalId: null,
        phaseStartedAt: null,
        plannedSeconds: getWorkSeconds(),
      });
    },
  };
});
