import { useMemo, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronDown, ChevronRight, Circle, CircleCheck, CircleDot, PanelLeftClose, Search } from "lucide-react";
import type { RoadmapData, SubtopicProgress } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge, Button, Input } from "@/components/ui/primitives";

type FlatRow =
  | { type: "phase"; id: string; title: string; phaseId: number; completed: number; total: number }
  | { type: "node"; id: string; title: string; phaseId: number; nodeId: string; completed: number; total: number }
  | { type: "subtopic"; id: string; title: string; hasLesson: boolean; depth: string };

const ROW_HEIGHT: Record<FlatRow["type"], number> = {
  phase: 40,
  node: 32,
  subtopic: 44,
};

interface SidebarProps {
  roadmap: RoadmapData;
  progressMap: Record<string, SubtopicProgress>;
  selectedId: string | null;
  hideCompleted: boolean;
  onSelect: (id: string) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onCollapse?: () => void;
}

function statusIcon(status?: SubtopicProgress["status"]) {
  if (status === "completed") return <CircleCheck className="h-3.5 w-3.5 text-emerald-500" />;
  if (status === "in_progress") return <CircleDot className="h-3.5 w-3.5 text-amber-500" />;
  return <Circle className="h-3.5 w-3.5 text-neutral-300 dark:text-neutral-600" />;
}

export function Sidebar({
  roadmap,
  progressMap,
  selectedId,
  hideCompleted,
  onSelect,
  scrollRef,
  onCollapse,
}: SidebarProps) {
  const [query, setQuery] = useState("");
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(
    () => new Set([0, 1]),
  );
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    () => new Set(["0.1"]),
  );

  const rows = useMemo(() => {
    const result: FlatRow[] = [];
    const q = query.trim().toLowerCase();

    for (const phase of roadmap.phases) {
      const phaseSubtopics = phase.nodes.flatMap((n) => n.subtopics);
      const completed = phaseSubtopics.filter(
        (s) => progressMap[s.id]?.status === "completed",
      ).length;

      const phaseMatches = phase.title.toLowerCase().includes(q);
      let phaseHasVisible = phaseMatches;

      const nodeRows: FlatRow[] = [];
      for (const node of phase.nodes) {
        const visibleSubtopics = node.subtopics.filter((s) => {
          if (hideCompleted && progressMap[s.id]?.status === "completed") return false;
          if (!q) return true;
          return (
            s.id.includes(q) ||
            s.title.toLowerCase().includes(q) ||
            node.title.toLowerCase().includes(q) ||
            phaseMatches
          );
        });

        if (visibleSubtopics.length === 0 && !node.title.toLowerCase().includes(q) && !phaseMatches) {
          continue;
        }

        phaseHasVisible = true;
        const nodeCompleted = node.subtopics.filter(
          (s) => progressMap[s.id]?.status === "completed",
        ).length;
        nodeRows.push({
          type: "node",
          id: `node-${node.id}`,
          title: node.title,
          phaseId: phase.id,
          nodeId: node.id,
          completed: nodeCompleted,
          total: node.subtopics.length,
        });

        if (expandedNodes.has(node.id) || q) {
          for (const s of visibleSubtopics) {
            nodeRows.push({
              type: "subtopic",
              id: s.id,
              title: s.title,
              hasLesson: s.hasLesson,
              depth: s.depth,
            });
          }
        }
      }

      if (!phaseHasVisible && q) continue;

      result.push({
        type: "phase",
        id: `phase-${phase.id}`,
        title: phase.title,
        phaseId: phase.id,
        completed,
        total: phaseSubtopics.length,
      });

      if (expandedPhases.has(phase.id) || q) {
        result.push(...nodeRows);
      }
    }

    return result;
  }, [roadmap, progressMap, hideCompleted, query, expandedPhases, expandedNodes]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => ROW_HEIGHT[rows[index].type],
    overscan: 12,
  });

  return (
    <div className="flex h-full flex-col bg-white dark:bg-neutral-950">
      <div className="border-b border-neutral-200 p-3 dark:border-neutral-800">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Lessons
          </span>
          {onCollapse && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onCollapse}
              title="Hide panel (Ctrl+B)"
            >
              <PanelLeftClose className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search subtopics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto p-2">
        <div
          style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}
        >
          {virtualizer.getVirtualItems().map((item) => {
            const row = rows[item.index];
            const rowHeight = ROW_HEIGHT[row.type];
            return (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: rowHeight,
                  transform: `translateY(${item.start}px)`,
                }}
              >
                {row.type === "phase" && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedPhases((prev) => {
                        const next = new Set(prev);
                        if (next.has(row.phaseId)) next.delete(row.phaseId);
                        else next.add(row.phaseId);
                        return next;
                      })
                    }
                    className="flex h-10 w-full items-center gap-2 rounded-lg px-2 text-left text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  >
                    {expandedPhases.has(row.phaseId) ? (
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1 truncate">
                      Phase {row.phaseId} · {row.title}
                    </span>
                    <span className="ml-auto shrink-0 text-xs tabular-nums text-neutral-500">
                      {row.completed}/{row.total}
                    </span>
                  </button>
                )}

                {row.type === "node" && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedNodes((prev) => {
                        const next = new Set(prev);
                        if (next.has(row.nodeId)) next.delete(row.nodeId);
                        else next.add(row.nodeId);
                        return next;
                      })
                    }
                    className="flex h-8 w-full items-center gap-2 rounded-lg pl-6 pr-2 text-left text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                  >
                    {expandedNodes.has(row.nodeId) ? (
                      <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1 truncate">
                      {row.nodeId} · {row.title}
                    </span>
                    <span className="ml-auto shrink-0 text-xs tabular-nums text-neutral-500">
                      {row.completed}/{row.total}
                    </span>
                  </button>
                )}

                {row.type === "subtopic" && (
                  <button
                    type="button"
                    onClick={() => onSelect(row.id)}
                    className={cn(
                      "flex h-11 w-full items-center gap-2 rounded-lg pl-9 pr-2 text-left text-xs transition-colors",
                      selectedId === row.id
                        ? "bg-sky-50 ring-1 ring-inset ring-sky-500/35 dark:bg-sky-950/40 dark:ring-sky-400/30"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-900",
                    )}
                  >
                    <span className="shrink-0">{statusIcon(progressMap[row.id]?.status)}</span>
                    <span className="min-w-0 flex-1 overflow-hidden">
                      <span className="block h-4 truncate font-medium leading-4 text-neutral-800 dark:text-neutral-100">
                        {row.id}
                      </span>
                      <span className="block h-4 truncate leading-4 text-neutral-500">{row.title}</span>
                    </span>
                    {!row.hasLesson && (
                      <Badge variant="muted" className="shrink-0 self-center">
                        empty
                      </Badge>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
