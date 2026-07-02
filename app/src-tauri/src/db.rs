use chrono::Utc;
use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use std::sync::Mutex;
use tauri::{AppHandle, Manager, State};

pub struct AppState {
    pub db: Mutex<Connection>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SubtopicStatus {
    NotStarted,
    InProgress,
    Completed,
}

impl SubtopicStatus {
    fn as_str(&self) -> &'static str {
        match self {
            Self::NotStarted => "not_started",
            Self::InProgress => "in_progress",
            Self::Completed => "completed",
        }
    }

    fn from_str(s: &str) -> Self {
        match s {
            "in_progress" => Self::InProgress,
            "completed" => Self::Completed,
            _ => Self::NotStarted,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum LessonStep {
    Lection,
    Summary,
    Test,
    Answers,
    Exercises,
}

impl LessonStep {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Lection => "lection",
            Self::Summary => "summary",
            Self::Test => "test",
            Self::Answers => "answers",
            Self::Exercises => "exercises",
        }
    }

    pub fn from_str(s: &str) -> Self {
        match s {
            "summary" => Self::Summary,
            "test" => Self::Test,
            "answers" => Self::Answers,
            "exercises" => Self::Exercises,
            _ => Self::Lection,
        }
    }

    pub fn file_name(&self) -> &'static str {
        match self {
            Self::Lection => "1.lection.md",
            Self::Summary => "2.summary.md",
            Self::Test => "3.test-yourself.md",
            Self::Answers => "4.test-yourself-answers.md",
            Self::Exercises => "5.exercises.md",
        }
    }

    pub fn next(&self, has_exercises: bool) -> Option<Self> {
        match self {
            Self::Lection => Some(Self::Summary),
            Self::Summary => Some(Self::Test),
            Self::Test => Some(Self::Answers),
            Self::Answers if has_exercises => Some(Self::Exercises),
            Self::Answers => None,
            Self::Exercises => None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SubtopicProgress {
    pub subtopic_id: String,
    pub status: SubtopicStatus,
    pub current_step: String,
    pub steps_completed: Vec<String>,
    pub test_score: Option<i32>,
    pub test_max_score: Option<i32>,
    pub pass_threshold: i32,
    pub started_at: Option<String>,
    pub completed_at: Option<String>,
    pub total_study_seconds: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppSettings {
    pub repo_path: Option<String>,
    pub pomodoro_work_minutes: i32,
    pub pomodoro_short_break_minutes: i32,
    pub pomodoro_long_break_minutes: i32,
    pub pomodoro_sessions_until_long: i32,
    pub sync_progress_md: bool,
    pub theme: String,
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            repo_path: None,
            pomodoro_work_minutes: 25,
            pomodoro_short_break_minutes: 5,
            pomodoro_long_break_minutes: 15,
            pomodoro_sessions_until_long: 4,
            sync_progress_md: true,
            theme: "system".to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StatsSummary {
    pub subtopics_completed: i64,
    pub study_minutes: i64,
    pub pomodoros_completed: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DashboardStats {
    pub today: StatsSummary,
    pub week: StatsSummary,
    pub month: StatsSummary,
    pub streak_days: i64,
    pub total_completed: i64,
    pub total_in_progress: i64,
    pub activity_by_day: Vec<ActivityDay>,
    pub continue_subtopic_id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActivityDay {
    pub date: String,
    pub study_minutes: i64,
    pub subtopics_completed: i64,
    pub pomodoros_completed: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LessonContent {
    pub content: String,
    pub step: String,
    pub pass_threshold: Option<i32>,
    pub test_max_score: Option<i32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PomodoroLogInput {
    pub subtopic_id: Option<String>,
    pub session_type: String,
    pub planned_seconds: i32,
    pub actual_seconds: i32,
    pub completed: bool,
}

pub fn init_db(app: &AppHandle) -> Result<Connection, String> {
    let app_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    std::fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;
    let db_path = app_dir.join("app.db");
    let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;
    run_migrations(&conn)?;
    crate::review::run_review_migrations(&conn)?;
    Ok(conn)
}

fn run_migrations(conn: &Connection) -> Result<(), String> {
    conn.execute_batch(
        "
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
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subtopic_id TEXT NOT NULL,
            step TEXT NOT NULL,
            started_at TEXT NOT NULL,
            ended_at TEXT,
            duration_seconds INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS pomodoro_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subtopic_id TEXT,
            session_type TEXT NOT NULL,
            planned_seconds INTEGER NOT NULL,
            actual_seconds INTEGER NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0,
            started_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_study_sessions_started ON study_sessions(started_at);
        CREATE INDEX IF NOT EXISTS idx_pomodoro_started ON pomodoro_sessions(started_at);
        ",
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn get_setting(conn: &Connection, key: &str) -> Result<Option<String>, String> {
    conn.query_row(
        "SELECT value FROM app_settings WHERE key = ?1",
        params![key],
        |row| row.get(0),
    )
    .optional()
    .map_err(|e| e.to_string())
}

pub fn set_setting(conn: &Connection, key: &str, value: &str) -> Result<(), String> {
    conn.execute(
        "INSERT INTO app_settings (key, value) VALUES (?1, ?2)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        params![key, value],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn load_settings(conn: &Connection) -> Result<AppSettings, String> {
    let mut settings = AppSettings::default();
    if let Some(v) = get_setting(conn, "repo_path")? {
        settings.repo_path = Some(v);
    }
    if let Some(v) = get_setting(conn, "pomodoro_work_minutes")? {
        settings.pomodoro_work_minutes = v.parse().unwrap_or(25);
    }
    if let Some(v) = get_setting(conn, "pomodoro_short_break_minutes")? {
        settings.pomodoro_short_break_minutes = v.parse().unwrap_or(5);
    }
    if let Some(v) = get_setting(conn, "pomodoro_long_break_minutes")? {
        settings.pomodoro_long_break_minutes = v.parse().unwrap_or(15);
    }
    if let Some(v) = get_setting(conn, "pomodoro_sessions_until_long")? {
        settings.pomodoro_sessions_until_long = v.parse().unwrap_or(4);
    }
    if let Some(v) = get_setting(conn, "sync_progress_md")? {
        settings.sync_progress_md = v == "true";
    }
    if let Some(v) = get_setting(conn, "theme")? {
        settings.theme = v;
    }
    Ok(settings)
}

pub fn save_settings(conn: &Connection, settings: &AppSettings) -> Result<(), String> {
    if let Some(ref p) = settings.repo_path {
        set_setting(conn, "repo_path", p)?;
    }
    set_setting(
        conn,
        "pomodoro_work_minutes",
        &settings.pomodoro_work_minutes.to_string(),
    )?;
    set_setting(
        conn,
        "pomodoro_short_break_minutes",
        &settings.pomodoro_short_break_minutes.to_string(),
    )?;
    set_setting(
        conn,
        "pomodoro_long_break_minutes",
        &settings.pomodoro_long_break_minutes.to_string(),
    )?;
    set_setting(
        conn,
        "pomodoro_sessions_until_long",
        &settings.pomodoro_sessions_until_long.to_string(),
    )?;
    set_setting(
        conn,
        "sync_progress_md",
        if settings.sync_progress_md {
            "true"
        } else {
            "false"
        },
    )?;
    set_setting(conn, "theme", &settings.theme)?;
    Ok(())
}

fn row_to_progress(row: &rusqlite::Row<'_>) -> Result<SubtopicProgress, rusqlite::Error> {
    let steps_json: String = row.get(3)?;
    let steps_completed: Vec<String> = serde_json::from_str(&steps_json).unwrap_or_default();
    Ok(SubtopicProgress {
        subtopic_id: row.get(0)?,
        status: SubtopicStatus::from_str(row.get::<_, String>(1)?.as_str()),
        current_step: row.get(2)?,
        steps_completed,
        test_score: row.get(4)?,
        test_max_score: row.get(5)?,
        pass_threshold: row.get(6)?,
        started_at: row.get(7)?,
        completed_at: row.get(8)?,
        total_study_seconds: row.get(9)?,
    })
}

pub fn get_progress(conn: &Connection, subtopic_id: &str) -> Result<SubtopicProgress, String> {
    conn.query_row(
        "SELECT subtopic_id, status, current_step, steps_completed, test_score, test_max_score,
                pass_threshold, started_at, completed_at, total_study_seconds
         FROM subtopic_progress WHERE subtopic_id = ?1",
        params![subtopic_id],
        row_to_progress,
    )
    .optional()
    .map_err(|e| e.to_string())?
    .unwrap_or(SubtopicProgress {
        subtopic_id: subtopic_id.to_string(),
        status: SubtopicStatus::NotStarted,
        current_step: LessonStep::Lection.as_str().to_string(),
        steps_completed: vec![],
        test_score: None,
        test_max_score: None,
        pass_threshold: 80,
        started_at: None,
        completed_at: None,
        total_study_seconds: 0,
    })
    .pipe(Ok)
}

trait Pipe: Sized {
    fn pipe<F, R>(self, f: F) -> R
    where
        F: FnOnce(Self) -> R,
    {
        f(self)
    }
}

impl<T> Pipe for T {}

pub fn get_all_progress(conn: &Connection) -> Result<Vec<SubtopicProgress>, String> {
    let mut stmt = conn
        .prepare(
            "SELECT subtopic_id, status, current_step, steps_completed, test_score, test_max_score,
                    pass_threshold, started_at, completed_at, total_study_seconds
             FROM subtopic_progress",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], row_to_progress)
        .map_err(|e| e.to_string())?;
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

pub fn upsert_progress(conn: &Connection, progress: &SubtopicProgress) -> Result<(), String> {
    let steps_json =
        serde_json::to_string(&progress.steps_completed).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO subtopic_progress
         (subtopic_id, status, current_step, steps_completed, test_score, test_max_score,
          pass_threshold, started_at, completed_at, total_study_seconds)
         VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)
         ON CONFLICT(subtopic_id) DO UPDATE SET
           status=excluded.status, current_step=excluded.current_step,
           steps_completed=excluded.steps_completed, test_score=excluded.test_score,
           test_max_score=excluded.test_max_score, pass_threshold=excluded.pass_threshold,
           started_at=excluded.started_at, completed_at=excluded.completed_at,
           total_study_seconds=excluded.total_study_seconds",
        params![
            progress.subtopic_id,
            progress.status.as_str(),
            progress.current_step,
            steps_json,
            progress.test_score,
            progress.test_max_score,
            progress.pass_threshold,
            progress.started_at,
            progress.completed_at,
            progress.total_study_seconds,
        ],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn repo_path_or_err(conn: &Connection) -> Result<PathBuf, String> {
    let settings = load_settings(conn)?;
    settings
        .repo_path
        .map(PathBuf::from)
        .filter(|p| p.join("ROADMAP.md").exists())
        .ok_or_else(|| "Repository path not set or ROADMAP.md missing".to_string())
}

pub fn read_lesson_file(
    repo: &Path,
    subtopic_id: &str,
    step: &LessonStep,
) -> Result<String, String> {
    let path = repo
        .join("lessons")
        .join(subtopic_id)
        .join(step.file_name());
    if !path.exists() {
        return Err(format!("Lesson file not found: {}", path.display()));
    }
    std::fs::read_to_string(&path).map_err(|e| e.to_string())
}

pub fn parse_test_meta(content: &str) -> (Option<i32>, Option<i32>) {
    let mut pass_threshold = None;
    let mut test_max = None;

    for line in content.lines() {
        if line.contains("Pass threshold") {
            if let Some(rest) = line.split("Pass threshold").nth(1) {
                let digits: String = rest
                    .chars()
                    .take_while(|c| c.is_ascii_digit() || *c == ' ')
                    .filter(|c| c.is_ascii_digit())
                    .collect();
                pass_threshold = digits.parse().ok();
            }
            if pass_threshold.is_none() {
                if let Some(before_pct) = line.split('%').next() {
                    let digits: String = before_pct
                        .chars()
                        .rev()
                        .take_while(|c| c.is_ascii_digit())
                        .collect::<String>()
                        .chars()
                        .rev()
                        .collect();
                    pass_threshold = digits.parse().ok();
                }
            }
        }
        if line.contains("Score yourself") {
            if let Some(after_slash) = line.split('/').nth(1) {
                let digits: String = after_slash
                    .chars()
                    .take_while(|c| c.is_ascii_digit())
                    .collect();
                test_max = digits.parse().ok();
            }
        }
    }

    (pass_threshold, test_max)
}

pub fn export_progress_md(conn: &Connection, repo: &Path) -> Result<(), String> {
    let mut stmt = conn
        .prepare(
            "SELECT subtopic_id, status, test_score, completed_at
             FROM subtopic_progress
             WHERE status != 'not_started'
             ORDER BY subtopic_id",
        )
        .map_err(|e| e.to_string())?;

    let rows = stmt
        .query_map([], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, String>(1)?,
                row.get::<_, Option<i32>>(2)?,
                row.get::<_, Option<String>>(3)?,
            ))
        })
        .map_err(|e| e.to_string())?;

    let mut md = String::from(
        "# Progress\n\n\
         > Статусы: 🔲 не начат · 🔄 в процессе · ✅ пройден (self-test ≥80%)\n\n\
         | ID | Status | Test score | Date completed |\n\
         |----|--------|------------|----------------|\n",
    );

    for row in rows {
        let (id, status, score, completed_at) = row.map_err(|e| e.to_string())?;
        let icon = match status.as_str() {
            "completed" => "✅",
            "in_progress" => "🔄",
            _ => "🔲",
        };
        let score_str = score.map(|s| s.to_string()).unwrap_or_default();
        let date_str = completed_at.unwrap_or_default();
        md.push_str(&format!(
            "| {id} | {icon} | {score_str} | {date_str} |\n"
        ));
    }

    md.push_str("\n---\n\n## Notes\n\n<!-- Личные заметки -->\n");
    std::fs::write(repo.join("PROGRESS.md"), md).map_err(|e| e.to_string())?;
    Ok(())
}

pub fn reset_all_progress(conn: &Connection) -> Result<(), String> {
    conn.execute("DELETE FROM subtopic_progress", [])
        .map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM study_sessions", [])
        .map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM pomodoro_sessions", [])
        .map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM review_card_results", [])
        .map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM review_sessions", [])
        .map_err(|e| e.to_string())?;
    Ok(())
}

fn stats_for_range(conn: &Connection, since: &str) -> Result<StatsSummary, String> {
    let subtopics: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM subtopic_progress
             WHERE status = 'completed' AND completed_at >= ?1",
            params![since],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    let study_secs: i64 = conn
        .query_row(
            "SELECT COALESCE(SUM(duration_seconds), 0) FROM study_sessions WHERE started_at >= ?1",
            params![since],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    let pomodoros: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM pomodoro_sessions
             WHERE completed = 1 AND session_type = 'work' AND started_at >= ?1",
            params![since],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    Ok(StatsSummary {
        subtopics_completed: subtopics,
        study_minutes: study_secs / 60,
        pomodoros_completed: pomodoros,
    })
}

pub fn compute_dashboard_stats(conn: &Connection) -> Result<DashboardStats, String> {
    let now = Utc::now();
    let today_start = now.date_naive().and_hms_opt(0, 0, 0).unwrap();
    let week_start = now - chrono::Duration::days(7);
    let month_start = now - chrono::Duration::days(30);

    let today = stats_for_range(conn, &today_start.and_utc().to_rfc3339())?;
    let week = stats_for_range(conn, &week_start.to_rfc3339())?;
    let month = stats_for_range(conn, &month_start.to_rfc3339())?;

    let total_completed: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM subtopic_progress WHERE status = 'completed'",
            [],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    let total_in_progress: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM subtopic_progress WHERE status = 'in_progress'",
            [],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    let continue_subtopic_id: Option<String> = conn
        .query_row(
            "SELECT subtopic_id FROM subtopic_progress
             WHERE status = 'in_progress'
             ORDER BY started_at DESC LIMIT 1",
            [],
            |row| row.get(0),
        )
        .optional()
        .map_err(|e| e.to_string())?;

    let mut activity_by_day = Vec::new();
    let year = now.date_naive().year();
    let mut day = chrono::NaiveDate::from_ymd_opt(year, 1, 1).unwrap();
    let last = chrono::NaiveDate::from_ymd_opt(year, 12, 31).unwrap();

    while day <= last {
        let day_start = day.and_hms_opt(0, 0, 0).unwrap().and_utc();
        let day_end = day_start + chrono::Duration::days(1);
        let ds = day_start.to_rfc3339();
        let de = day_end.to_rfc3339();

        let study_secs: i64 = conn
            .query_row(
                "SELECT COALESCE(SUM(duration_seconds), 0) FROM study_sessions
                 WHERE started_at >= ?1 AND started_at < ?2",
                params![ds, de],
                |row| row.get(0),
            )
            .unwrap_or(0);

        let completed: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM subtopic_progress
                 WHERE status = 'completed' AND completed_at >= ?1 AND completed_at < ?2",
                params![ds, de],
                |row| row.get(0),
            )
            .unwrap_or(0);

        let pomodoros: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM pomodoro_sessions
                 WHERE completed = 1 AND session_type = 'work'
                 AND started_at >= ?1 AND started_at < ?2",
                params![ds, de],
                |row| row.get(0),
            )
            .unwrap_or(0);

        activity_by_day.push(ActivityDay {
            date: day.to_string(),
            study_minutes: study_secs / 60,
            subtopics_completed: completed,
            pomodoros_completed: pomodoros,
        });

        day += chrono::Duration::days(1);
    }

    let streak_days = compute_streak(conn)?;

    Ok(DashboardStats {
        today,
        week,
        month,
        streak_days,
        total_completed,
        total_in_progress,
        activity_by_day,
        continue_subtopic_id,
    })
}

fn compute_streak(conn: &Connection) -> Result<i64, String> {
    let mut streak = 0i64;
    let now = Utc::now();

    for days_ago in 0..365 {
        let day = now - chrono::Duration::days(days_ago);
        let day_start = day.date_naive().and_hms_opt(0, 0, 0).unwrap().and_utc();
        let day_end = day_start + chrono::Duration::days(1);
        let ds = day_start.to_rfc3339();
        let de = day_end.to_rfc3339();

        let completed: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM subtopic_progress
                 WHERE status = 'completed' AND completed_at >= ?1 AND completed_at < ?2",
                params![ds, de],
                |row| row.get(0),
            )
            .unwrap_or(0);

        let study_secs: i64 = conn
            .query_row(
                "SELECT COALESCE(SUM(duration_seconds), 0) FROM study_sessions
                 WHERE started_at >= ?1 AND started_at < ?2",
                params![ds, de],
                |row| row.get(0),
            )
            .unwrap_or(0);

        let pomodoros: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM pomodoro_sessions
                 WHERE completed = 1 AND session_type = 'work'
                 AND started_at >= ?1 AND started_at < ?2",
                params![ds, de],
                |row| row.get(0),
            )
            .unwrap_or(0);

        let active = completed > 0 || study_secs >= 25 * 60 || pomodoros > 0;
        if days_ago == 0 {
            if !active {
                break;
            }
            streak = 1;
        } else if active {
            streak += 1;
        } else {
            break;
        }
    }

    Ok(streak)
}

// Fix typo chronic -> chrono in activity loop - I'll fix when writing lib.rs commands

pub fn detect_default_repo() -> Option<String> {
    let cwd = std::env::current_dir().ok()?;
    for candidate in [cwd.clone(), cwd.parent()?.to_path_buf()] {
        if candidate.join("ROADMAP.md").exists() {
            return Some(candidate.to_string_lossy().to_string());
        }
    }
    None
}

#[tauri::command]
pub fn get_settings(state: State<'_, AppState>) -> Result<AppSettings, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    load_settings(&conn)
}

#[tauri::command]
pub fn save_settings_cmd(
    state: State<'_, AppState>,
    settings: AppSettings,
) -> Result<(), String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    save_settings(&conn, &settings)
}

#[tauri::command]
pub fn detect_repo_path() -> Option<String> {
    detect_default_repo()
}

#[tauri::command]
pub fn get_all_progress_cmd(state: State<'_, AppState>) -> Result<Vec<SubtopicProgress>, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    get_all_progress(&conn)
}

#[tauri::command]
pub fn get_subtopic_progress_cmd(
    state: State<'_, AppState>,
    subtopic_id: String,
) -> Result<SubtopicProgress, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    get_progress(&conn, &subtopic_id)
}

#[tauri::command]
pub fn read_lesson_step(
    state: State<'_, AppState>,
    subtopic_id: String,
    step: String,
) -> Result<LessonContent, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let repo = repo_path_or_err(&conn)?;
    let lesson_step = LessonStep::from_str(&step);
    let content = read_lesson_file(&repo, &subtopic_id, &lesson_step)?;

    let (pass_threshold, test_max_score) = if matches!(lesson_step, LessonStep::Test) {
        parse_test_meta(&content)
    } else {
        (None, None)
    };

    Ok(LessonContent {
        content,
        step,
        pass_threshold,
        test_max_score,
    })
}

#[tauri::command]
pub fn start_subtopic(
    state: State<'_, AppState>,
    subtopic_id: String,
) -> Result<SubtopicProgress, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let mut progress = get_progress(&conn, &subtopic_id)?;
    if progress.started_at.is_none() {
        progress.started_at = Some(Utc::now().to_rfc3339());
    }
    progress.status = SubtopicStatus::InProgress;
    upsert_progress(&conn, &progress)?;

    conn.execute(
        "INSERT INTO study_sessions (subtopic_id, step, started_at) VALUES (?1, ?2, ?3)",
        params![subtopic_id, progress.current_step, Utc::now().to_rfc3339()],
    )
    .map_err(|e| e.to_string())?;

    Ok(progress)
}

fn test_passed(progress: &SubtopicProgress) -> bool {
    match (progress.test_score, progress.test_max_score) {
        (Some(score), Some(max)) if max > 0 => {
            (score as f64 / max as f64) * 100.0 >= progress.pass_threshold as f64
        }
        _ => false,
    }
}

#[tauri::command]
pub fn complete_step(
    state: State<'_, AppState>,
    subtopic_id: String,
    step: String,
    has_exercises: bool,
) -> Result<SubtopicProgress, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let mut progress = get_progress(&conn, &subtopic_id)?;
    let lesson_step = LessonStep::from_str(&step);

    if !progress.steps_completed.contains(&step) {
        progress.steps_completed.push(step.clone());
    }

    if progress.started_at.is_none() {
        progress.started_at = Some(Utc::now().to_rfc3339());
    }
    progress.status = SubtopicStatus::InProgress;

    if let Some(next) = lesson_step.next(has_exercises) {
        progress.current_step = next.as_str().to_string();
    } else if matches!(lesson_step, LessonStep::Answers) && !has_exercises {
        if test_passed(&progress) {
            progress.status = SubtopicStatus::Completed;
            progress.completed_at = Some(Utc::now().to_rfc3339());
        }
    } else if matches!(lesson_step, LessonStep::Exercises) {
        progress.status = SubtopicStatus::Completed;
        progress.completed_at = Some(Utc::now().to_rfc3339());
    }

    upsert_progress(&conn, &progress)?;

    if let Ok(settings) = load_settings(&conn) {
        if settings.sync_progress_md {
            if let Ok(repo) = repo_path_or_err(&conn) {
                let _ = export_progress_md(&conn, &repo);
            }
        }
    }

    Ok(progress)
}

#[tauri::command]
pub fn submit_test_score(
    state: State<'_, AppState>,
    subtopic_id: String,
    score: i32,
    max_score: i32,
    pass_threshold: i32,
    has_exercises: bool,
) -> Result<SubtopicProgress, String> {
    let _ = has_exercises;
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let mut progress = get_progress(&conn, &subtopic_id)?;

    progress.test_score = Some(score);
    progress.test_max_score = Some(max_score);
    progress.pass_threshold = pass_threshold;

    if !progress.steps_completed.contains(&"test".to_string()) {
        progress.steps_completed.push("test".to_string());
    }

    let pct = if max_score > 0 {
        (score as f64 / max_score as f64) * 100.0
    } else {
        0.0
    };

    if pct >= pass_threshold as f64 {
        progress.current_step = LessonStep::Answers.as_str().to_string();
    } else {
        progress.current_step = LessonStep::Test.as_str().to_string();
    }

    if progress.started_at.is_none() {
        progress.started_at = Some(Utc::now().to_rfc3339());
    }
    progress.status = if matches!(progress.status, SubtopicStatus::Completed) {
        SubtopicStatus::Completed
    } else {
        SubtopicStatus::InProgress
    };

    upsert_progress(&conn, &progress)?;

    if let Ok(settings) = load_settings(&conn) {
        if settings.sync_progress_md {
            if let Ok(repo) = repo_path_or_err(&conn) {
                let _ = export_progress_md(&conn, &repo);
            }
        }
    }

    Ok(progress)
}

#[tauri::command]
pub fn mark_subtopic_completed(
    state: State<'_, AppState>,
    subtopic_id: String,
) -> Result<SubtopicProgress, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let mut progress = get_progress(&conn, &subtopic_id)?;
    progress.status = SubtopicStatus::Completed;
    progress.completed_at = Some(Utc::now().to_rfc3339());
    upsert_progress(&conn, &progress)?;

    if let Ok(settings) = load_settings(&conn) {
        if settings.sync_progress_md {
            if let Ok(repo) = repo_path_or_err(&conn) {
                let _ = export_progress_md(&conn, &repo);
            }
        }
    }

    Ok(progress)
}

#[tauri::command]
pub fn record_study_heartbeat(
    state: State<'_, AppState>,
    subtopic_id: String,
    step: String,
    seconds: i32,
) -> Result<(), String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;

    conn.execute(
        "UPDATE subtopic_progress SET total_study_seconds = total_study_seconds + ?1
         WHERE subtopic_id = ?2",
        params![seconds, subtopic_id],
    )
    .ok();

    conn.execute(
        "UPDATE study_sessions SET duration_seconds = duration_seconds + ?1
         WHERE id = (SELECT id FROM study_sessions WHERE subtopic_id = ?2 AND step = ?3
                     AND ended_at IS NULL ORDER BY id DESC LIMIT 1)",
        params![seconds, subtopic_id, step],
    )
    .map_err(|e| e.to_string())?;

    let mut progress = get_progress(&conn, &subtopic_id)?;
    progress.total_study_seconds += seconds as i64;
    if progress.started_at.is_none() {
        progress.started_at = Some(Utc::now().to_rfc3339());
        progress.status = SubtopicStatus::InProgress;
    }
    upsert_progress(&conn, &progress)?;

    Ok(())
}

#[tauri::command]
pub fn log_pomodoro_session(
    state: State<'_, AppState>,
    input: PomodoroLogInput,
) -> Result<(), String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO pomodoro_sessions
         (subtopic_id, session_type, planned_seconds, actual_seconds, completed, started_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![
            input.subtopic_id,
            input.session_type,
            input.planned_seconds,
            input.actual_seconds,
            if input.completed { 1 } else { 0 },
            Utc::now().to_rfc3339(),
        ],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn get_dashboard_stats(state: State<'_, AppState>) -> Result<DashboardStats, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    compute_dashboard_stats(&conn)
}

#[tauri::command]
pub fn export_progress_md_cmd(state: State<'_, AppState>) -> Result<(), String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let repo = repo_path_or_err(&conn)?;
    export_progress_md(&conn, &repo)
}

#[tauri::command]
pub fn reset_all_progress_cmd(state: State<'_, AppState>) -> Result<(), String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    reset_all_progress(&conn)?;
    let settings = load_settings(&conn)?;
    if settings.sync_progress_md {
        if let Some(repo) = settings.repo_path {
            let repo_path = std::path::Path::new(&repo);
            if repo_path.join("ROADMAP.md").exists() {
                let _ = export_progress_md(&conn, repo_path);
            }
        }
    }
    Ok(())
}
