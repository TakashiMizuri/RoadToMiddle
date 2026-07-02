# Road to Fullstack Middle



Learning roadmap and desktop app for the path **Junior → Middle → Middle+** fullstack developer.



## Contents



| Path | Description |

|------|-------------|

| [ROADMAP.md](./ROADMAP.md) | Full curriculum (~1778 subtopics) |

| [AGENTS.md](./AGENTS.md) | AI mentor instructions |

| [lessons/](./lessons/) | Lesson content (`1.lection.md` … `5.exercises.md`) |

| [app/](./app/) | **Desktop learning app** (Electron + React) |



## Desktop app



Browse all topics, follow the lesson flow (lection → summary → test → answers → exercises), track progress, view stats, use Pomodoro, and **review completed topics** with flashcard mode.



### Review mode



Tab **Review**:



- Flashcards from completed subtopics (`3.test-yourself.md` + answers)

- Select specific topics or all completed

- Rate each card correct/incorrect

- 90-day calendar statistics



### Prerequisites



- [Node.js](https://nodejs.org/) 20.19+ (or 22.12+)

- **No Visual Studio / Rust required** — desktop app uses Electron



### Run desktop app (development)



```powershell

# From repository root (PowerShell — use ; not &&)

npm install

cd app

npm install

npm run desktop:dev

```



Or from root:



```powershell

npm run app:dev

```



On first launch, set the **repository path** in Settings (folder containing `ROADMAP.md` and `lessons/`). The app auto-detects the path when run from this repo.



### Browser preview (optional)



If you only want the UI in a browser tab without desktop features:



```powershell

cd app

npm run dev

```



Open http://localhost:1420/ — progress is stored in localStorage only.



### Build Windows installer



```powershell

cd app

npm run desktop:build

```



Output: `app/release/` (NSIS installer `.exe`)



### Progress storage

| Location | What |
|----------|------|
| **`app.db`** (repository root) | **SQLite** — progress, sessions, pomodoros, review, settings. Commit & push to sync across machines. |
| [PROGRESS.md](./PROGRESS.md) | Optional markdown export (Settings → enable sync) |

Legacy `%APPDATA%/road-to-middle-app/` data is migrated into `app.db` on first launch after this update.



### Regenerate topic tree



After editing `ROADMAP.md`:



```bash

npm run parse-roadmap

```



## Learning with AI (Cursor)



1. Open a subtopic in the desktop app or pick an ID from ROADMAP.

2. If lesson files are missing, ask in Cursor: `Заполни урок 0.1.1`

3. Complete self-test ≥80% before moving on.



## License



Private learning repository.

