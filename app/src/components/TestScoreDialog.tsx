import { useState } from "react";
import { Button } from "@/components/ui/primitives";
import { Input } from "@/components/ui/primitives";

interface TestScoreDialogProps {
  open: boolean;
  maxScore: number;
  passThreshold: number;
  onSubmit: (score: number) => void;
  onClose: () => void;
}

export function TestScoreDialog({
  open,
  maxScore,
  passThreshold,
  onSubmit,
  onClose,
}: TestScoreDialogProps) {
  const [score, setScore] = useState("");

  if (!open) return null;

  const num = Number(score);
  const pct = maxScore > 0 ? (num / maxScore) * 100 : 0;
  const passed = pct >= passThreshold;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
        <h3 className="text-lg font-semibold">Submit test score</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Self-check your answers before opening the answer key. Pass threshold: {passThreshold}%
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Input
            type="number"
            min={0}
            max={maxScore}
            placeholder="Correct"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            autoFocus
          />
          <span className="text-sm text-neutral-500">/ {maxScore}</span>
        </div>
        {score && (
          <p
            className={`mt-2 text-sm ${passed ? "text-emerald-600" : "text-amber-600"}`}
          >
            {pct.toFixed(0)}% — {passed ? "Pass" : "Below threshold, review and retry"}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!score || Number.isNaN(num)}
            onClick={() => {
              onSubmit(num);
              setScore("");
            }}
          >
            Submit & continue
          </Button>
        </div>
      </div>
    </div>
  );
}
