import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import {
  defaultSettings,
  STORAGE_KEYS,
  type KeyValueStorage,
} from "../src/lib/backend-core.js";
import type { AppSettings, SubtopicProgress } from "../src/lib/types.js";

const MIGRATION_MARKER = ".migrated-to-sqlite";

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

interface StoredReviewSession {
  id: number;
  subtopic_ids: string[];
}

interface StoredReviewResult {
  session_id: number;
  subtopic_id: string;
  card_id: string;
  was_correct: boolean;
  answered_at: string;
}

function runMigrations(db: Database.Database): void {
  db.exec(`
    PRAGMA journal_mode = DELETE;

    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS subtopic_progress (
      subtopic_id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'not_started',
      current_step TEXT NOT NULL DEFAULT 'lection',
      steps_completed TEXT NOT NULL DEFAULT '[]',
      test_score INTEGER,
      test_max_score INTEGER,
      pass_threshold INTEGER NOT NULL DEFAULT 80,
      started_at TEXT,
      completed_at TEXT,
      total_study_seconds INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY,
      subtopic_id TEXT NOT NULL,
      step TEXT NOT NULL,
      started_at TEXT NOT NULL,
      duration_seconds INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pomodoro_sessions (
      id INTEGER PRIMARY KEY,
      subtopic_id TEXT,
      session_type TEXT NOT NULL,
      planned_seconds INTEGER NOT NULL,
      actual_seconds INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      started_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS review_sessions (
      id INTEGER PRIMARY KEY,
      started_at TEXT NOT NULL DEFAULT '',
      subtopic_ids TEXT NOT NULL DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS review_card_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      subtopic_id TEXT NOT NULL,
      card_id TEXT NOT NULL,
      was_correct INTEGER NOT NULL,
      answered_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_study_sessions_started ON study_sessions(started_at);
    CREATE INDEX IF NOT EXISTS idx_pomodoro_started ON pomodoro_sessions(started_at);
    CREATE INDEX IF NOT EXISTS idx_review_results_answered ON review_card_results(answered_at);
  `);
}

function loadSettings(db: Database.Database): AppSettings {
  const row = db
    .prepare("SELECT value FROM app_settings WHERE key = ?")
    .get(STORAGE_KEYS.settings) as { value: string } | undefined;
  if (!row) return defaultSettings();
  try {
    return JSON.parse(row.value) as AppSettings;
  } catch {
    return defaultSettings();
  }
}

function saveSettings(db: Database.Database, settings: AppSettings): void {
  db.prepare(
    `INSERT INTO app_settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function loadProgressMap(db: Database.Database): Record<string, SubtopicProgress> {
  const rows = db
    .prepare(
      `SELECT subtopic_id, status, current_step, steps_completed, test_score, test_max_score,
              pass_threshold, started_at, completed_at, total_study_seconds
       FROM subtopic_progress`,
    )
    .all() as Array<{
    subtopic_id: string;
    status: string;
    current_step: string;
    steps_completed: string;
    test_score: number | null;
    test_max_score: number | null;
    pass_threshold: number;
    started_at: string | null;
    completed_at: string | null;
    total_study_seconds: number;
  }>;

  const map: Record<string, SubtopicProgress> = {};
  for (const row of rows) {
    let steps_completed: string[] = [];
    try {
      steps_completed = JSON.parse(row.steps_completed) as string[];
    } catch {
      steps_completed = [];
    }
    map[row.subtopic_id] = {
      subtopic_id: row.subtopic_id,
      status: row.status as SubtopicProgress["status"],
      current_step: row.current_step,
      steps_completed,
      test_score: row.test_score,
      test_max_score: row.test_max_score,
      pass_threshold: row.pass_threshold,
      started_at: row.started_at,
      completed_at: row.completed_at,
      total_study_seconds: row.total_study_seconds,
    };
  }
  return map;
}

function saveProgressMap(db: Database.Database, map: Record<string, SubtopicProgress>): void {
  const tx = db.transaction((entries: SubtopicProgress[]) => {
    db.prepare("DELETE FROM subtopic_progress").run();
    const insert = db.prepare(
      `INSERT INTO subtopic_progress (
         subtopic_id, status, current_step, steps_completed, test_score, test_max_score,
         pass_threshold, started_at, completed_at, total_study_seconds
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    for (const p of entries) {
      insert.run(
        p.subtopic_id,
        p.status,
        p.current_step,
        JSON.stringify(p.steps_completed),
        p.test_score,
        p.test_max_score,
        p.pass_threshold,
        p.started_at,
        p.completed_at,
        p.total_study_seconds,
      );
    }
  });
  tx(Object.values(map));
}

function loadStudySessions(db: Database.Database): StoredStudySession[] {
  return db
    .prepare(
      "SELECT id, subtopic_id, step, started_at, duration_seconds FROM study_sessions ORDER BY id",
    )
    .all() as StoredStudySession[];
}

function saveStudySessions(db: Database.Database, sessions: StoredStudySession[]): void {
  const tx = db.transaction((rows: StoredStudySession[]) => {
    db.prepare("DELETE FROM study_sessions").run();
    const insert = db.prepare(
      "INSERT INTO study_sessions (id, subtopic_id, step, started_at, duration_seconds) VALUES (?, ?, ?, ?, ?)",
    );
    for (const s of rows) {
      insert.run(s.id, s.subtopic_id, s.step, s.started_at, s.duration_seconds);
    }
  });
  tx(sessions);
}

function loadPomodoroSessions(db: Database.Database): StoredPomodoroSession[] {
  const rows = db
    .prepare(
      `SELECT id, subtopic_id, session_type, planned_seconds, actual_seconds, completed, started_at
       FROM pomodoro_sessions ORDER BY id`,
    )
    .all() as Array<{
    id: number;
    subtopic_id: string | null;
    session_type: string;
    planned_seconds: number;
    actual_seconds: number;
    completed: number;
    started_at: string;
  }>;

  return rows.map((row) => ({
    id: row.id,
    subtopic_id: row.subtopic_id ?? undefined,
    session_type: row.session_type,
    planned_seconds: row.planned_seconds,
    actual_seconds: row.actual_seconds,
    completed: row.completed === 1,
    started_at: row.started_at,
  }));
}

function savePomodoroSessions(db: Database.Database, sessions: StoredPomodoroSession[]): void {
  const tx = db.transaction((rows: StoredPomodoroSession[]) => {
    db.prepare("DELETE FROM pomodoro_sessions").run();
    const insert = db.prepare(
      `INSERT INTO pomodoro_sessions (
         id, subtopic_id, session_type, planned_seconds, actual_seconds, completed, started_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    );
    for (const s of rows) {
      insert.run(
        s.id,
        s.subtopic_id ?? null,
        s.session_type,
        s.planned_seconds,
        s.actual_seconds,
        s.completed ? 1 : 0,
        s.started_at,
      );
    }
  });
  tx(sessions);
}

function loadReviewSessions(db: Database.Database): StoredReviewSession[] {
  const rows = db
    .prepare("SELECT id, subtopic_ids FROM review_sessions ORDER BY id")
    .all() as Array<{ id: number; subtopic_ids: string }>;

  return rows.map((row) => ({
    id: row.id,
    subtopic_ids: JSON.parse(row.subtopic_ids) as string[],
  }));
}

function saveReviewSessions(db: Database.Database, sessions: StoredReviewSession[]): void {
  const tx = db.transaction((rows: StoredReviewSession[]) => {
    db.prepare("DELETE FROM review_sessions").run();
    const insert = db.prepare(
      "INSERT INTO review_sessions (id, started_at, subtopic_ids) VALUES (?, ?, ?)",
    );
    for (const s of rows) {
      insert.run(s.id, new Date().toISOString(), JSON.stringify(s.subtopic_ids));
    }
  });
  tx(sessions);
}

function loadReviewResults(db: Database.Database): StoredReviewResult[] {
  return db
    .prepare(
      `SELECT session_id, subtopic_id, card_id, was_correct, answered_at
       FROM review_card_results ORDER BY id`,
    )
    .all()
    .map((row) => ({
      session_id: (row as StoredReviewResult).session_id,
      subtopic_id: (row as StoredReviewResult).subtopic_id,
      card_id: (row as StoredReviewResult).card_id,
      was_correct: Boolean((row as { was_correct: number }).was_correct),
      answered_at: (row as StoredReviewResult).answered_at,
    }));
}

function saveReviewResults(db: Database.Database, results: StoredReviewResult[]): void {
  const tx = db.transaction((rows: StoredReviewResult[]) => {
    db.prepare("DELETE FROM review_card_results").run();
    const insert = db.prepare(
      `INSERT INTO review_card_results (session_id, subtopic_id, card_id, was_correct, answered_at)
       VALUES (?, ?, ?, ?, ?)`,
    );
    for (const r of rows) {
      insert.run(r.session_id, r.subtopic_id, r.card_id, r.was_correct ? 1 : 0, r.answered_at);
    }
  });
  tx(results);
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function migrateFromJsonFiles(db: Database.Database, legacyDataDir: string): void {
  const markerPath = path.join(legacyDataDir, MIGRATION_MARKER);
  if (fs.existsSync(markerPath)) return;

  const existing = db.prepare("SELECT COUNT(*) AS count FROM subtopic_progress").get() as {
    count: number;
  };
  if (existing.count > 0) {
    fs.mkdirSync(legacyDataDir, { recursive: true });
    fs.writeFileSync(markerPath, new Date().toISOString(), "utf8");
    return;
  }

  const progressFile = path.join(legacyDataDir, `${STORAGE_KEYS.progress}.json`);
  const hasJson =
    fs.existsSync(progressFile) ||
    fs.existsSync(path.join(legacyDataDir, `${STORAGE_KEYS.settings}.json`));

  if (!hasJson) {
    fs.mkdirSync(legacyDataDir, { recursive: true });
    fs.writeFileSync(markerPath, new Date().toISOString(), "utf8");
    return;
  }

  console.log("[sqlite] Migrating progress from JSON files to app.db");

  saveSettings(
    db,
    readJsonFile(path.join(legacyDataDir, `${STORAGE_KEYS.settings}.json`), defaultSettings()),
  );
  saveProgressMap(
    db,
    readJsonFile<Record<string, SubtopicProgress>>(
      path.join(legacyDataDir, `${STORAGE_KEYS.progress}.json`),
      {},
    ),
  );
  saveStudySessions(
    db,
    readJsonFile<StoredStudySession[]>(
      path.join(legacyDataDir, `${STORAGE_KEYS.studySessions}.json`),
      [],
    ),
  );
  savePomodoroSessions(
    db,
    readJsonFile<StoredPomodoroSession[]>(
      path.join(legacyDataDir, `${STORAGE_KEYS.pomodoro}.json`),
      [],
    ),
  );
  saveReviewSessions(
    db,
    readJsonFile<StoredReviewSession[]>(
      path.join(legacyDataDir, `${STORAGE_KEYS.reviewSessions}.json`),
      [],
    ),
  );
  saveReviewResults(
    db,
    readJsonFile<StoredReviewResult[]>(
      path.join(legacyDataDir, `${STORAGE_KEYS.reviewResults}.json`),
      [],
    ),
  );

  fs.mkdirSync(legacyDataDir, { recursive: true });
  fs.writeFileSync(markerPath, new Date().toISOString(), "utf8");
}

export function createSqliteStorage(dbPath: string, legacyDataDir: string): KeyValueStorage {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  runMigrations(db);
  migrateFromJsonFiles(db, legacyDataDir);

  const handlers: Record<string, { load: () => unknown; save: (value: unknown) => void }> = {
    [STORAGE_KEYS.settings]: {
      load: () => loadSettings(db),
      save: (value) => saveSettings(db, value as AppSettings),
    },
    [STORAGE_KEYS.progress]: {
      load: () => loadProgressMap(db),
      save: (value) => saveProgressMap(db, value as Record<string, SubtopicProgress>),
    },
    [STORAGE_KEYS.studySessions]: {
      load: () => loadStudySessions(db),
      save: (value) => saveStudySessions(db, value as StoredStudySession[]),
    },
    [STORAGE_KEYS.pomodoro]: {
      load: () => loadPomodoroSessions(db),
      save: (value) => savePomodoroSessions(db, value as StoredPomodoroSession[]),
    },
    [STORAGE_KEYS.reviewSessions]: {
      load: () => loadReviewSessions(db),
      save: (value) => saveReviewSessions(db, value as StoredReviewSession[]),
    },
    [STORAGE_KEYS.reviewResults]: {
      load: () => loadReviewResults(db),
      save: (value) => saveReviewResults(db, value as StoredReviewResult[]),
    },
  };

  return {
    load<T>(key: string, fallback: T): T {
      const handler = handlers[key];
      if (!handler) return fallback;
      try {
        return handler.load() as T;
      } catch (error) {
        console.error(`[sqlite] Failed to load key ${key}:`, error);
        return fallback;
      }
    },
    save(key: string, value: unknown): void {
      const handler = handlers[key];
      if (!handler) {
        throw new Error(`Unknown storage key: ${key}`);
      }
      handler.save(value);
    },
  };
}
