export const STUDY_STATS_UPDATED = "study-stats-updated";

export function notifyStudyStatsUpdated() {
  window.dispatchEvent(new CustomEvent(STUDY_STATS_UPDATED));
}
