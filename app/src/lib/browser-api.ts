import {
  createBackend,
  STORAGE_KEYS,
  resolveStepFilenames,
  type KeyValueStorage,
} from "./backend-core";

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

const storage: KeyValueStorage = { load: loadJson, save: saveJson };

async function fetchLessonFile(subtopic_id: string, step: string): Promise<string> {
  let lastUrl = "";
  for (const file of resolveStepFilenames(step)) {
    const url = `/lessons/${subtopic_id}/${file}`;
    lastUrl = url;
    const res = await fetch(url);
    if (res.ok) return res.text();
  }
  throw new Error(`Lesson file not found: ${lastUrl}`);
}

export const browserApi = createBackend({
  storage,
  readLessonFile: fetchLessonFile,
  detectRepoPath: async () => null,
});

export { STORAGE_KEYS };
