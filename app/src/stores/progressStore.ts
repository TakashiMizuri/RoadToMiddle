import { create } from "zustand";
import type { SubtopicProgress } from "@/lib/types";
import { api } from "@/lib/tauri-api";

interface ProgressState {
  progressMap: Record<string, SubtopicProgress>;
  loading: boolean;
  loadProgress: () => Promise<void>;
  resetAllProgress: () => Promise<void>;
  refreshSubtopic: (id: string) => Promise<SubtopicProgress>;
  setProgress: (p: SubtopicProgress) => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progressMap: {},
  loading: false,

  loadProgress: async () => {
    set({ loading: true });
    try {
      const all = await api.getAllProgress();
      const map: Record<string, SubtopicProgress> = {};
      for (const p of all) map[p.subtopic_id] = p;
      set({ progressMap: map });
    } finally {
      set({ loading: false });
    }
  },

  resetAllProgress: async () => {
    await api.resetAllProgress();
    set({ progressMap: {} });
  },

  refreshSubtopic: async (id) => {
    const p = await api.getSubtopicProgress(id);
    get().setProgress(p);
    return p;
  },

  setProgress: (p) =>
    set((s) => ({
      progressMap: { ...s.progressMap, [p.subtopic_id]: p },
    })),
}));
