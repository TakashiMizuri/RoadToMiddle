import {
  createBackend,
  STEP_FILES,
  STORAGE_KEYS,
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
  const file = STEP_FILES[step];
  if (!file) throw new Error(`Unknown step: ${step}`);
  const url = `/lessons/${subtopic_id}/${file}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Lesson file not found: ${url}`);
  return res.text();
}

export const browserApi = createBackend({
  storage,
  readLessonFile: fetchLessonFile,
  detectRepoPath: async () => null,
});

export { STORAGE_KEYS };
