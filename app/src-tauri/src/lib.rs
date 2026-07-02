mod db;
mod review;

use db::{init_db, AppState};
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            let conn = init_db(app.handle())?;
            app.manage(AppState {
                db: std::sync::Mutex::new(conn),
            });

            if let Some(default_repo) = db::detect_default_repo() {
                let state = app.state::<AppState>();
                if let Ok(conn) = state.db.lock() {
                    let settings = db::load_settings(&conn).unwrap_or_default();
                    if settings.repo_path.is_none() {
                        let mut s = settings;
                        s.repo_path = Some(default_repo);
                        let _ = db::save_settings(&conn, &s);
                    }
                }
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            db::get_settings,
            db::save_settings_cmd,
            db::detect_repo_path,
            db::get_all_progress_cmd,
            db::get_subtopic_progress_cmd,
            db::read_lesson_step,
            db::start_subtopic,
            db::complete_step,
            db::submit_test_score,
            db::mark_subtopic_completed,
            db::record_study_heartbeat,
            db::log_pomodoro_session,
            db::get_dashboard_stats,
            db::export_progress_md_cmd,
            db::reset_all_progress_cmd,
            review::get_review_subtopics,
            review::start_review_session,
            review::record_review_result,
            review::finish_review_session,
            review::get_review_stats,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
