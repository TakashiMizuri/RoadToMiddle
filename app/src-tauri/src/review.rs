use crate::db::{repo_path_or_err, read_lesson_file, AppState, LessonStep};
use chrono::Utc;
use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::State;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ReviewCard {
    pub subtopic_id: String,
    pub card_id: String,
    pub category: String,
    pub question: String,
    pub answer: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ReviewSubtopicInfo {
    pub subtopic_id: String,
    pub card_count: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ReviewSessionStart {
    pub session_id: i64,
    pub cards: Vec<ReviewCard>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ReviewDayStats {
    pub date: String,
    pub cards_reviewed: i64,
    pub cards_correct: i64,
    pub cards_incorrect: i64,
    pub sessions: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ReviewStats {
    pub today: ReviewDayStats;
    pub week_cards: i64,
    pub week_correct: i64,
    pub week_incorrect: i64,
    pub total_cards_reviewed: i64,
    pub accuracy_pct: f64,
    pub activity_by_day: Vec<ReviewDayStats>,
}

pub fn run_review_migrations(conn: &Connection) -> Result<(), String> {
    conn.execute_batch(
        "
        CREATE TABLE IF NOT EXISTS review_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            started_at TEXT NOT NULL,
            ended_at TEXT,
            subtopic_ids TEXT NOT NULL,
            cards_total INTEGER NOT NULL DEFAULT 0,
            cards_correct INTEGER NOT NULL DEFAULT 0,
            cards_incorrect INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS review_card_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id INTEGER NOT NULL,
            subtopic_id TEXT NOT NULL,
            card_id TEXT NOT NULL,
            was_correct INTEGER NOT NULL,
            answered_at TEXT NOT NULL,
            FOREIGN KEY(session_id) REFERENCES review_sessions(id)
        );

        CREATE INDEX IF NOT EXISTS idx_review_results_answered ON review_card_results(answered_at);
        ",
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

fn normalize_md(content: &str) -> String {
    content.replace("\r\n", "\n")
}

fn parse_header(line: &str) -> Option<(String, String)> {
    let line = line.trim();
    let rest = line.strip_prefix("### ")?;
    let (id_part, after) = rest.split_once(". ")?;
    let card_id = id_part.trim().to_string();
    let category = if let Some(start) = after.find('[') {
        if let Some(end) = after[start + 1..].find(']') {
            after[start + 1..start + 1 + end].to_string()
        } else {
            "General".to_string()
        }
    } else {
        after
            .split_whitespace()
            .take(3)
            .collect::<Vec<_>>()
            .join(" ")
    };
    Some((card_id, category))
}

fn extract_section(content: &str, start_marker: &str, end_markers: &[&str]) -> String {
    let lower = content.to_lowercase();
    let start_marker_lower = start_marker.to_lowercase();
    let start = lower
        .find(&start_marker_lower)
        .map(|i| i + start_marker.len())
        .unwrap_or(0);
    let slice = &content[start..];
    let mut end = slice.len();
    for marker in end_markers {
        if let Some(pos) = slice.to_lowercase().find(&marker.to_lowercase()) {
            if pos < end {
                end = pos;
            }
        }
    }
    slice[..end].to_string()
}

fn parse_blocks(section: &str) -> HashMap<String, (String, String)> {
    let mut map = HashMap::new();
    for block in section.split("\n---\n") {
        let trimmed = block.trim();
        if trimmed.is_empty() {
            continue;
        }

        if trimmed.contains("## Practical P1") {
            let body: String = trimmed
                .lines()
                .filter(|l| !l.trim().starts_with("## "))
                .collect::<Vec<_>>()
                .join("\n");
            let answer = extract_answer_text(&body);
            if !answer.is_empty() {
                map.insert("P1".to_string(), ("Practical".to_string(), answer));
            }
            continue;
        }

        let header_line = match trimmed.lines().find(|l| l.trim().starts_with("### ")) {
            Some(l) => l,
            None => continue,
        };

        let (card_id, category) = match parse_header(header_line) {
            Some(v) => v,
            None => continue,
        };

        let mut body_lines = Vec::new();
        let mut past_header = false;
        for line in trimmed.lines() {
            if line.trim().starts_with("### ") {
                if past_header {
                    break;
                }
                past_header = true;
                continue;
            }
            if past_header {
                body_lines.push(line);
            }
        }
        let body = body_lines.join("\n").trim().to_string();

        if header_line.trim().starts_with("## Practical P1") {
            let answer = extract_answer_text(&body);
            if !answer.is_empty() {
                map.insert("P1".to_string(), ("Practical".to_string(), answer));
            }
        } else if !body.is_empty() || card_id == "P1" {
            map.insert(card_id, (category, body));
        }
    }
    map
}

fn extract_answer_text(body: &str) -> String {
    let mut answer_lines = Vec::new();
    let mut in_answer = false;
    for line in body.lines() {
        let t = line.trim();
        if t.starts_with("**Answer:**") {
            in_answer = true;
            let rest = t.trim_start_matches("**Answer:**").trim();
            if !rest.is_empty() {
                answer_lines.push(rest.to_string());
            }
            continue;
        }
        if in_answer {
            if t.starts_with("**Why:**")
                || t.starts_with("**Scoring")
                || t.starts_with("**Note")
                || t.starts_with("**Common mistake")
            {
                break;
            }
            if t.starts_with("### ") || t.starts_with("## ") {
                break;
            }
            answer_lines.push(line.to_string());
        }
    }
    answer_lines.join("\n").trim().to_string()
}

fn parse_questions(test_md: &str) -> HashMap<String, (String, String)> {
    let test_md = normalize_md(test_md);
    let questions_section = extract_section(
        &test_md,
        "## Questions",
        &["## Practical", "## Self-Check", "## If you failed"],
    );
    let mut map = parse_blocks(&questions_section);

    if test_md.contains("## Practical") {
        let practical = extract_section(&test_md, "## Practical", &["## Self-Check"]);
        if let Some(block) = practical.split("\n---\n").find(|b| b.contains("### P1")) {
            if let Some(header) = block.lines().find(|l| l.trim().starts_with("### ")) {
                if let Some((card_id, category)) = parse_header(header) {
                    let body: String = block
                        .lines()
                        .skip_while(|l| !l.trim().starts_with("### "))
                        .skip(1)
                        .collect::<Vec<_>>()
                        .join("\n")
                        .trim()
                        .to_string();
                    map.insert(card_id, (category, body));
                }
            }
        }
    }
    map
}

fn parse_answers(answers_md: &str) -> HashMap<String, String> {
    let answers_md = normalize_md(answers_md);
    let answers_section = extract_section(
        &answers_md,
        "## Answers",
        &["## Practical", "## If you failed", "## Next step"],
    );
    let mut map: HashMap<String, String> = HashMap::new();

    for block in answers_section.split("\n---\n") {
        let trimmed = block.trim();
        if trimmed.is_empty() {
            continue;
        }
        let header_line = match trimmed.lines().find(|l| l.trim().starts_with("### ")) {
            Some(l) => l,
            None => continue,
        };
        if let Some((card_id, _)) = parse_header(header_line) {
            let mut body_lines = Vec::new();
            let mut past_header = false;
            for line in trimmed.lines() {
                if line.trim().starts_with("### ") {
                    if past_header {
                        break;
                    }
                    past_header = true;
                    continue;
                }
                if past_header {
                    body_lines.push(line);
                }
            }
            let answer = extract_answer_text(&body_lines.join("\n"));
            if !answer.is_empty() {
                map.insert(card_id, answer);
            }
        }
    }

    if answers_md.contains("## Practical P1") {
        let practical = extract_section(&answers_md, "## Practical P1", &["## If you failed"]);
        let answer = extract_answer_text(&practical);
        if !answer.is_empty() {
            map.insert("P1".to_string(), answer);
        }
    }

    map
}

pub fn load_cards_for_subtopic(
    repo: &std::path::Path,
    subtopic_id: &str,
) -> Result<Vec<ReviewCard>, String> {
    let test = read_lesson_file(repo, subtopic_id, &LessonStep::Test)?;
    let answers = read_lesson_file(repo, subtopic_id, &LessonStep::Answers)?;
    let questions = parse_questions(&test);
    let answers_map = parse_answers(&answers);

    let mut cards = Vec::new();
    for (card_id, (category, question)) in questions {
        if let Some(answer) = answers_map.get(&card_id) {
            cards.push(ReviewCard {
                subtopic_id: subtopic_id.to_string(),
                card_id,
                category,
                question,
                answer: answer.clone(),
            });
        }
    }

    cards.sort_by(|a, b| a.card_id.cmp(&b.card_id));
    Ok(cards)
}

fn shuffle_cards(cards: &mut [ReviewCard]) {
    use std::collections::hash_map::DefaultHasher;
    use std::hash::{Hash, Hasher};
    use std::time::{SystemTime, UNIX_EPOCH};

    let seed = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_nanos() as u64;

    for i in (1..cards.len()).rev() {
        let mut hasher = DefaultHasher::new();
        (seed, i).hash(&mut hasher);
        let j = (hasher.finish() as usize) % (i + 1);
        cards.swap(i, j);
    }
}

#[tauri::command]
pub fn get_review_subtopics(state: State<'_, AppState>) -> Result<Vec<ReviewSubtopicInfo>, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let repo = repo_path_or_err(&conn)?;

    let mut stmt = conn
        .prepare("SELECT subtopic_id FROM subtopic_progress WHERE status = 'completed' ORDER BY subtopic_id")
        .map_err(|e| e.to_string())?;

    let ids: Vec<String> = stmt
        .query_map([], |row| row.get(0))
        .map_err(|e| e.to_string())?
        .filter_map(|r| r.ok())
        .collect();

    let mut result = Vec::new();
    for id in ids {
        match load_cards_for_subtopic(&repo, &id) {
            Ok(cards) if !cards.is_empty() => result.push(ReviewSubtopicInfo {
                subtopic_id: id,
                card_count: cards.len() as i64,
            }),
            _ => {}
        }
    }
    Ok(result)
}

#[tauri::command]
pub fn start_review_session(
    state: State<'_, AppState>,
    subtopic_ids: Vec<String>,
) -> Result<ReviewSessionStart, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let repo = repo_path_or_err(&conn)?;

    let mut all_cards = Vec::new();
    for id in &subtopic_ids {
        if let Ok(mut cards) = load_cards_for_subtopic(&repo, id) {
            all_cards.append(&mut cards);
        }
    }

    if all_cards.is_empty() {
        return Err("No review cards found for selected topics".to_string());
    }

    shuffle_cards(&mut all_cards);

    let ids_json = serde_json::to_string(&subtopic_ids).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO review_sessions (started_at, subtopic_ids, cards_total)
         VALUES (?1, ?2, ?3)",
        params![Utc::now().to_rfc3339(), ids_json, all_cards.len() as i64],
    )
    .map_err(|e| e.to_string())?;

    let session_id = conn.last_insert_rowid();

    Ok(ReviewSessionStart {
        session_id,
        cards: all_cards,
    })
}

#[tauri::command]
pub fn record_review_result(
    state: State<'_, AppState>,
    session_id: i64,
    subtopic_id: String,
    card_id: String,
    was_correct: bool,
) -> Result<(), String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;

    conn.execute(
        "INSERT INTO review_card_results (session_id, subtopic_id, card_id, was_correct, answered_at)
         VALUES (?1, ?2, ?3, ?4, ?5)",
        params![
            session_id,
            subtopic_id,
            card_id,
            if was_correct { 1 } else { 0 },
            Utc::now().to_rfc3339(),
        ],
    )
    .map_err(|e| e.to_string())?;

    let col = if was_correct {
        "cards_correct"
    } else {
        "cards_incorrect"
    };
    conn.execute(
        &format!("UPDATE review_sessions SET {col} = {col} + 1 WHERE id = ?1"),
        params![session_id],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn finish_review_session(state: State<'_, AppState>, session_id: i64) -> Result<(), String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE review_sessions SET ended_at = ?1 WHERE id = ?2",
        params![Utc::now().to_rfc3339(), session_id],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn compute_review_stats(conn: &Connection) -> Result<ReviewStats, String> {
    let now = Utc::now();
    let today_start = now.date_naive().and_hms_opt(0, 0, 0).unwrap().and_utc();
    let week_start = now - chrono::Duration::days(7);

    let today = day_review_stats(conn, &today_start.to_rfc3339(), &(today_start + chrono::Duration::days(1)).to_rfc3339())?;

    let week_correct: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM review_card_results WHERE was_correct = 1 AND answered_at >= ?1",
            params![week_start.to_rfc3339()],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let week_incorrect: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM review_card_results WHERE was_correct = 0 AND answered_at >= ?1",
            params![week_start.to_rfc3339()],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let total: i64 = conn
        .query_row("SELECT COUNT(*) FROM review_card_results", [], |row| row.get(0))
        .unwrap_or(0);

    let correct_total: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM review_card_results WHERE was_correct = 1",
            [],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let accuracy_pct = if total > 0 {
        (correct_total as f64 / total as f64) * 100.0
    } else {
        0.0
    };

    let mut activity_by_day = Vec::new();
    let year = now.date_naive().year();
    let mut day = chrono::NaiveDate::from_ymd_opt(year, 1, 1).unwrap();
    let last = chrono::NaiveDate::from_ymd_opt(year, 12, 31).unwrap();

    while day <= last {
        let day_start = day.and_hms_opt(0, 0, 0).unwrap().and_utc();
        let day_end = day_start + chrono::Duration::days(1);
        activity_by_day.push(day_review_stats(
            conn,
            &day_start.to_rfc3339(),
            &day_end.to_rfc3339(),
        )?);
        day += chrono::Duration::days(1);
    }

    Ok(ReviewStats {
        today,
        week_cards: week_correct + week_incorrect,
        week_correct,
        week_incorrect,
        total_cards_reviewed: total,
        accuracy_pct,
        activity_by_day,
    })
}

fn day_review_stats(conn: &Connection, start: &str, end: &str) -> Result<ReviewDayStats, String> {
    let cards_reviewed: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM review_card_results WHERE answered_at >= ?1 AND answered_at < ?2",
            params![start, end],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let cards_correct: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM review_card_results WHERE was_correct = 1 AND answered_at >= ?1 AND answered_at < ?2",
            params![start, end],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let cards_incorrect: i64 = cards_reviewed - cards_correct;

    let sessions: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM review_sessions WHERE started_at >= ?1 AND started_at < ?2",
            params![start, end],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let date = start.chars().take(10).collect();

    Ok(ReviewDayStats {
        date,
        cards_reviewed,
        cards_correct,
        cards_incorrect,
        sessions,
    })
}

#[tauri::command]
pub fn get_review_stats(state: State<'_, AppState>) -> Result<ReviewStats, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    compute_review_stats(&conn)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_sample_questions_and_answers() {
        let test_md = r#"## Questions

### 1. [Recall]
What does VCS stand for?

---

### 2. [Recall]
Name one centralized and one distributed VCS.

---

## Self-Check
"#;
        let answers_md = r#"## Answers

### 1. [Recall]
**Answer:** Version Control System.

**Why:** Because.

---

### 2. [Recall]
**Answer:** SVN and Git.

---
"#;
        let q = parse_questions(test_md);
        assert_eq!(q.len(), 2);
        let a = parse_answers(answers_md);
        assert_eq!(a.len(), 2);
    }
}
