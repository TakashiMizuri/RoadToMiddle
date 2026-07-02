import { create } from "zustand";
import type { AppSettings } from "@/lib/types";
import { api } from "@/lib/tauri-api";

const defaultSettings: AppSettings = {
  repo_path: null,
  pomodoro_work_minutes: 25,
  pomodoro_short_break_minutes: 5,
  pomodoro_long_break_minutes: 15,
  pomodoro_sessions_until_long: 4,
  sync_progress_md: true,
  theme: "system",
};

interface SettingsState {
  settings: AppSettings;
  loaded: boolean;
  loadSettings: () => Promise<void>;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
  applyTheme: () => void;
}

function resolveTheme(theme: string): "light" | "dark" {
  if (theme === "dark") return "dark";
  if (theme === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: defaultSettings,
  loaded: false,

  loadSettings: async () => {
    let settings = await api.getSettings();
    const detected = await api.detectRepoPath();
    if (detected && settings.repo_path !== detected) {
      settings = { ...settings, repo_path: detected };
      await api.saveSettings(settings);
    } else if (!settings.repo_path && detected) {
      settings = { ...settings, repo_path: detected };
      await api.saveSettings(settings);
    }
    set({ settings, loaded: true });
    get().applyTheme();
  },

  updateSettings: async (partial) => {
    const settings = { ...get().settings, ...partial };
    await api.saveSettings(settings);
    set({ settings });
    get().applyTheme();
  },

  applyTheme: () => {
    const resolved = resolveTheme(get().settings.theme);
    document.documentElement.classList.toggle("dark", resolved === "dark");
  },
}));
