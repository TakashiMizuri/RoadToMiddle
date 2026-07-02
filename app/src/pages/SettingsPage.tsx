import { useState } from "react";
import { useSettingsStore } from "@/stores/settingsStore";
import { useProgressStore } from "@/stores/progressStore";
import { api } from "@/lib/tauri-api";
import { pickRepoFolder } from "@/lib/electron-api";
import { isElectronRuntime, isTauriRuntime } from "@/lib/platform";
import { notifyStudyStatsUpdated } from "@/lib/study-stats-events";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button, Card, Input } from "@/components/ui/primitives";

export function SettingsPage() {
  const { settings, updateSettings } = useSettingsStore();
  const { resetAllProgress } = useProgressStore();
  const [resetting, setResetting] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const pickRepo = async () => {
    if (isElectronRuntime()) {
      const selected = await pickRepoFolder();
      if (selected) await updateSettings({ repo_path: selected });
      return;
    }
    if (!isTauriRuntime()) {
      window.alert("Folder picker is only available in the desktop app.");
      return;
    }
    const { open } = await import("@tauri-apps/plugin-dialog");
    const selected = await open({ directory: true, multiple: false });
    if (selected) {
      await updateSettings({ repo_path: selected as string });
    }
  };

  const handleResetProgress = async () => {
    setResetting(true);
    try {
      await resetAllProgress();
      notifyStudyStatsUpdated();
      setResetDialogOpen(false);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="h-full overflow-auto p-6">
      <div className="mx-auto max-w-xl space-y-4">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Pomodoro, theme, repository sync</p>
      </div>
        <Card>
          <h2 className="mb-3 font-medium">Repository path</h2>
          <div className="flex gap-2">
            <Input readOnly value={settings.repo_path ?? ""} placeholder="Not set" />
            <Button variant="secondary" onClick={() => void pickRepo()}>
              Browse
            </Button>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            Folder containing ROADMAP.md and lessons/. Progress is stored in{" "}
            <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">app.db</code> in the
            repository root (sync via Git).
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 font-medium">Pomodoro (minutes)</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              Work
              <Input
                type="number"
                className="mt-1"
                value={settings.pomodoro_work_minutes}
                onChange={(e) =>
                  void updateSettings({
                    pomodoro_work_minutes: Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="text-sm">
              Short break
              <Input
                type="number"
                className="mt-1"
                value={settings.pomodoro_short_break_minutes}
                onChange={(e) =>
                  void updateSettings({
                    pomodoro_short_break_minutes: Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="text-sm">
              Long break
              <Input
                type="number"
                className="mt-1"
                value={settings.pomodoro_long_break_minutes}
                onChange={(e) =>
                  void updateSettings({
                    pomodoro_long_break_minutes: Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="text-sm">
              Sessions until long
              <Input
                type="number"
                className="mt-1"
                value={settings.pomodoro_sessions_until_long}
                onChange={(e) =>
                  void updateSettings({
                    pomodoro_sessions_until_long: Number(e.target.value),
                  })
                }
              />
            </label>
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 font-medium">Appearance</h2>
          <select
            className="h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm dark:border-neutral-700 dark:bg-neutral-950"
            value={settings.theme}
            onChange={(e) => void updateSettings({ theme: e.target.value })}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </Card>

        <Card>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={settings.sync_progress_md}
              onChange={(e) =>
                void updateSettings({ sync_progress_md: e.target.checked })
              }
            />
            Sync progress to PROGRESS.md in repository
          </label>
          <Button
            className="mt-3"
            variant="secondary"
            onClick={() => void api.exportProgressMd()}
          >
            Export PROGRESS.md now
          </Button>
        </Card>

        <Card className="border-red-200 dark:border-red-900">
          <h2 className="mb-2 font-medium text-red-700 dark:text-red-400">Danger zone</h2>
          <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
            Reset all learning progress across every subtopic. Use this to start the course from
            scratch.
          </p>
          <Button
            variant="destructive"
            disabled={resetting}
            onClick={() => setResetDialogOpen(true)}
          >
            Reset all progress
          </Button>
        </Card>
      </div>

      <ConfirmDialog
        open={resetDialogOpen}
        title="Сбросить весь прогресс?"
        description={
          <>
            <p>Вы действительно хотите сбросить прогресс? Это действие нельзя отменить.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Завершённые уроки и результаты тестов</li>
              <li>Время учёбы и история Pomodoro</li>
              <li>Статистика повторений (Review)</li>
            </ul>
            {settings.sync_progress_md && settings.repo_path && (
              <p className="mt-3 text-amber-700 dark:text-amber-400">
                PROGRESS.md в репозитории тоже будет очищен.
              </p>
            )}
          </>
        }
        cancelLabel="Отмена"
        confirmLabel="Да, сбросить"
        variant="destructive"
        loading={resetting}
        onCancel={() => setResetDialogOpen(false)}
        onConfirm={() => void handleResetProgress()}
      />
    </div>
  );
}
