import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Brain,
  Check,
  ChevronRight,
  RotateCcw,
  X,
} from "lucide-react";
import type { RoadmapData, ReviewCard, ReviewStats } from "@/lib/types";
import { findSubtopic } from "@/lib/types";
import { api } from "@/lib/tauri-api";
import { MarkdownView } from "@/components/MarkdownView";
import { ReviewCalendar } from "@/components/ReviewCalendar";
import { Button, Card, Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

interface ReviewPageProps {
  roadmap: RoadmapData;
}

type ReviewTab = "practice" | "stats";
type SessionPhase = "setup" | "active" | "done";

export function ReviewPage({ roadmap }: ReviewPageProps) {
  const [tab, setTab] = useState<ReviewTab>("practice");
  const [available, setAvailable] = useState<
    { subtopic_id: string; card_count: number; title: string }[]
  >([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [phase, setPhase] = useState<SessionPhase>("setup");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [cards, setCards] = useState<ReviewCard[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionIncorrect, setSessionIncorrect] = useState(0);

  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const loadAvailable = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await api.getReviewSubtopics();
      setAvailable(
        list.map((item) => ({
          ...item,
          title: findSubtopic(roadmap, item.subtopic_id)?.subtopic.title ?? item.subtopic_id,
        })),
      );
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [roadmap]);

  const loadStats = useCallback(async () => {
    try {
      setStats(await api.getReviewStats());
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    void loadAvailable();
    void loadStats();
  }, [loadAvailable, loadStats]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(available.map((a) => a.subtopic_id)));
  };

  const totalSelectedCards = useMemo(
    () =>
      available
        .filter((a) => selected.has(a.subtopic_id))
        .reduce((sum, a) => sum + a.card_count, 0),
    [available, selected],
  );

  const startSession = async (ids: string[]) => {
    setError(null);
    try {
      const session = await api.startReviewSession(ids);
      setSessionId(session.session_id);
      setCards(session.cards);
      setIndex(0);
      setRevealed(false);
      setSessionCorrect(0);
      setSessionIncorrect(0);
      setPhase("active");
    } catch (e) {
      setError(String(e));
    }
  };

  const currentCard = cards[index];

  const rateCard = async (correct: boolean) => {
    if (!sessionId || !currentCard) return;
    await api.recordReviewResult(
      sessionId,
      currentCard.subtopic_id,
      currentCard.card_id,
      correct,
    );
    if (correct) setSessionCorrect((c) => c + 1);
    else setSessionIncorrect((c) => c + 1);

    if (index + 1 >= cards.length) {
      await api.finishReviewSession(sessionId);
      setPhase("done");
      void loadStats();
    } else {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  };

  const resetSession = () => {
    setPhase("setup");
    setSessionId(null);
    setCards([]);
    setIndex(0);
    void loadStats();
  };

  const selectedDayStats = stats?.activity_by_day.find((d) => d.date === selectedDate);

  if (phase === "active" && currentCard) {
    const progress = ((index + (revealed ? 0.5 : 0)) / cards.length) * 100;
    const meta = findSubtopic(roadmap, currentCard.subtopic_id);

    return (
      <div className="flex h-full flex-col">
        <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-500">
              Card {index + 1} / {cards.length}
            </span>
            <span className="text-neutral-500">
              {sessionCorrect}✓ · {sessionIncorrect}✗
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div
              className="h-full bg-neutral-900 transition-all dark:bg-neutral-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="muted">{currentCard.subtopic_id}</Badge>
            <Badge>{currentCard.category}</Badge>
            {meta && (
              <span className="truncate text-xs text-neutral-500">{meta.subtopic.title}</span>
            )}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto px-6 py-6">
          {!revealed ? (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                Question
              </p>
              <MarkdownView content={currentCard.question} />
            </div>
          ) : (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-emerald-600">
                Answer
              </p>
              <MarkdownView content={currentCard.answer} />
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
          {!revealed ? (
            <Button onClick={() => setRevealed(true)} className="min-w-40">
              Show answer <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="min-w-32 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                onClick={() => void rateCard(false)}
              >
                <X className="mr-1 h-4 w-4" /> Incorrect
              </Button>
              <Button
                className="min-w-32 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600"
                onClick={() => void rateCard(true)}
              >
                <Check className="mr-1 h-4 w-4" /> Correct
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const total = sessionCorrect + sessionIncorrect;
    const pct = total > 0 ? Math.round((sessionCorrect / total) * 100) : 0;

    return (
      <div className="flex h-full items-center justify-center p-6">
        <Card className="max-w-md text-center">
          <Brain className="mx-auto mb-4 h-10 w-10 text-neutral-400" />
          <h2 className="text-xl font-semibold">Session complete</h2>
          <p className="mt-2 text-3xl font-bold tabular-nums">{pct}%</p>
          <p className="text-sm text-neutral-500">
            {sessionCorrect} correct · {sessionIncorrect} incorrect · {total} cards
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="secondary" onClick={resetSession}>
              Back to setup
            </Button>
            <Button
              onClick={() => {
                const ids = [...selected];
                if (ids.length) void startSession(ids);
              }}
            >
              <RotateCcw className="mr-1 h-4 w-4" /> Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Review mode</h1>
          <p className="text-sm text-neutral-500">
            Flashcards from completed topics&apos; self-tests
          </p>
        </div>
        <div className="flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
          <button
            type="button"
            onClick={() => setTab("practice")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium",
              tab === "practice" && "bg-white shadow-sm dark:bg-neutral-800",
            )}
          >
            Practice
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("stats");
              void loadStats();
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium",
              tab === "stats" && "bg-white shadow-sm dark:bg-neutral-800",
            )}
          >
            Statistics
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {tab === "stats" && stats && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <p className="text-sm text-neutral-500">Today</p>
              <p className="text-2xl font-semibold">{stats.today.cards_reviewed}</p>
              <p className="text-xs text-neutral-500">
                {stats.today.cards_correct}✓ · {stats.today.cards_incorrect}✗
              </p>
            </Card>
            <Card>
              <p className="text-sm text-neutral-500">This week</p>
              <p className="text-2xl font-semibold">{stats.week_cards}</p>
              <p className="text-xs text-neutral-500">
                {stats.week_correct}✓ · {stats.week_incorrect}✗
              </p>
            </Card>
            <Card>
              <p className="text-sm text-neutral-500">All time</p>
              <p className="text-2xl font-semibold">{stats.total_cards_reviewed}</p>
            </Card>
            <Card>
              <p className="text-sm text-neutral-500">Accuracy</p>
              <p className="text-2xl font-semibold">{stats.accuracy_pct.toFixed(0)}%</p>
            </Card>
          </div>

          <Card>
            <ReviewCalendar
              days={stats.activity_by_day}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            {selectedDayStats && selectedDate && (
              <div className="mt-4 border-t border-neutral-200 pt-4 text-sm dark:border-neutral-800">
                <strong>{selectedDate}</strong>: {selectedDayStats.cards_reviewed} cards reviewed
                ({selectedDayStats.cards_correct} correct, {selectedDayStats.cards_incorrect}{" "}
                incorrect) · {selectedDayStats.sessions} session(s)
              </div>
            )}
          </Card>
        </div>
      )}

      {tab === "practice" && (
        <div className="max-w-2xl">
          {loading ? (
            <p className="text-neutral-500">Loading completed topics...</p>
          ) : available.length === 0 ? (
            <Card>
              <p className="text-neutral-600 dark:text-neutral-300">
                No completed topics with review cards yet.
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                Complete a subtopic (self-test ≥80%) to unlock its flashcards here.
              </p>
            </Card>
          ) : (
            <>
              <div className="mb-4 flex gap-2">
                <Button variant="secondary" size="sm" onClick={selectAll}>
                  Select all completed ({available.length})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelected(new Set())}
                >
                  Clear
                </Button>
              </div>

              <div className="mb-6 max-h-80 space-y-2 overflow-auto rounded-xl border border-neutral-200 p-3 dark:border-neutral-800">
                {available.map((item) => (
                  <label
                    key={item.subtopic_id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(item.subtopic_id)}
                      onChange={() => toggle(item.subtopic_id)}
                      className="mt-1"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="font-medium">{item.subtopic_id}</span>
                      <span className="ml-2 text-xs text-neutral-500">
                        {item.card_count} cards
                      </span>
                      <span className="block truncate text-sm text-neutral-500">
                        {item.title}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              <Button
                disabled={selected.size === 0}
                onClick={() => void startSession([...selected])}
              >
                Start review — {totalSelectedCards} cards from {selected.size} topic(s)
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
