import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import {
  createBackend,
  defaultSettings,
  STEP_FILES,
  STORAGE_KEYS,
} from "../src/lib/backend-core.js";
import type { SubtopicProgress } from "../src/lib/types.js";
import { createSqliteStorage } from "./sqlite-storage.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_DB_FILE = "app.db";

export function findRepoFromCwd(): string | null {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, "ROADMAP.md"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

const require = createRequire(import.meta.url);

function readRepoPathFromLegacyDb(legacyDbPath: string): string | null {
  if (!fs.existsSync(legacyDbPath)) return null;
  try {
    const Database = require("better-sqlite3") as typeof import("better-sqlite3").default;
    const db = new Database(legacyDbPath, { readonly: true });
    try {
      const row = db
        .prepare("SELECT value FROM app_settings WHERE key = ?")
        .get(STORAGE_KEYS.settings) as { value: string } | undefined;
      if (!row) return null;
      const settings = JSON.parse(row.value) as { repo_path?: string | null };
      if (settings.repo_path && fs.existsSync(path.join(settings.repo_path, "ROADMAP.md"))) {
        return settings.repo_path;
      }
    } finally {
      db.close();
    }
  } catch {
    return null;
  }
  return null;
}

export function resolveRepoRoot(userDataDir: string): string {
  const fromCwd = findRepoFromCwd();
  if (fromCwd) return fromCwd;

  const legacyDb = path.join(userDataDir, REPO_DB_FILE);
  const fromLegacy = readRepoPathFromLegacyDb(legacyDb);
  if (fromLegacy) return fromLegacy;

  throw new Error(
    "Repository not found. Start the app from the project folder (with ROADMAP.md) or set Repository path in Settings.",
  );
}

function migrateDatabaseToRepo(
  repoDbPath: string,
  legacyAppDb: string,
  legacyJsonDir: string,
): void {
  if (fs.existsSync(repoDbPath)) return;

  fs.mkdirSync(path.dirname(repoDbPath), { recursive: true });

  if (fs.existsSync(legacyAppDb)) {
    console.log(`[sqlite] Moving database to repo: ${legacyAppDb} → ${repoDbPath}`);
    fs.copyFileSync(legacyAppDb, repoDbPath);
    return;
  }

  if (
    fs.existsSync(path.join(legacyJsonDir, `${STORAGE_KEYS.progress}.json`)) ||
    fs.existsSync(path.join(legacyJsonDir, `${STORAGE_KEYS.settings}.json`))
  ) {
    console.log(`[sqlite] Creating repo database from legacy JSON in ${legacyJsonDir}`);
    createSqliteStorage(repoDbPath, legacyJsonDir);
  }
}

function repoPathFromSettings(storage: ReturnType<typeof createSqliteStorage>): string | null {
  const settings = storage.load(STORAGE_KEYS.settings, defaultSettings());
  if (settings.repo_path && fs.existsSync(path.join(settings.repo_path, "ROADMAP.md"))) {
    return settings.repo_path;
  }
  return findRepoFromCwd();
}

function readLessonFromRepo(repoPath: string, subtopic_id: string, step: string): string {
  const file = STEP_FILES[step];
  if (!file) throw new Error(`Unknown step: ${step}`);
  const filePath = path.join(repoPath, "lessons", subtopic_id, file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Lesson file not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

async function writeProgressMd(progress: SubtopicProgress[], repoPath: string): Promise<void> {
  let md =
    "# Progress\n\n" +
    "> Статусы: 🔲 не начат · 🔄 в процессе · ✅ пройден (self-test ≥80%)\n\n" +
    "| ID | Status | Test score | Date completed |\n" +
    "|----|--------|------------|----------------|\n";

  for (const p of progress.sort((a, b) => a.subtopic_id.localeCompare(b.subtopic_id))) {
    const icon =
      p.status === "completed" ? "✅" : p.status === "in_progress" ? "🔄" : "🔲";
    const score = p.test_score != null ? String(p.test_score) : "";
    const date = p.completed_at ?? "";
    md += `| ${p.subtopic_id} | ${icon} | ${score} | ${date} |\n`;
  }

  md += "\n---\n\n## Notes\n\n<!-- Личные заметки -->\n";
  fs.writeFileSync(path.join(repoPath, "PROGRESS.md"), md, "utf8");
}

export function createElectronBackend(userDataDir: string) {
  const repoPath = resolveRepoRoot(userDataDir);
  const dbPath = path.join(repoPath, REPO_DB_FILE);
  const legacyAppDb = path.join(userDataDir, REPO_DB_FILE);
  const legacyDataDir = path.join(userDataDir, "data");

  migrateDatabaseToRepo(dbPath, legacyAppDb, legacyJsonDir);

  const storage = createSqliteStorage(dbPath, legacyDataDir);

  const settings = storage.load(STORAGE_KEYS.settings, defaultSettings());
  if (settings.repo_path !== repoPath) {
    storage.save(STORAGE_KEYS.settings, { ...settings, repo_path: repoPath });
  }

  const backend = createBackend({
    storage,
    readLessonFile: async (subtopic_id, step) => {
      const repo = repoPathFromSettings(storage);
      if (!repo) {
        throw new Error("Repository path not set. Open Settings and select the repo folder.");
      }
      return readLessonFromRepo(repo, subtopic_id, step);
    },
    detectRepoPath: async () => findRepoFromCwd(),
    exportProgressMd: writeProgressMd,
  });

  return { backend, storage, dbPath, repoPath, repoPathFromSettings: () => repoPathFromSettings(storage) };
}

export function getPreloadPath(): string {
  const candidates = [
    path.join(__dirname, "preload.cjs"),
    path.join(__dirname, "..", "electron", "preload.cjs"),
    path.join(__dirname, "preload.js"),
    path.join(__dirname, "..", "electron", "preload.js"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return path.resolve(p);
  }
  return path.resolve(candidates[0]);
}
