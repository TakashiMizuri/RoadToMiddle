import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LEGACY_STEP_FILES,
  STEP_FILES,
} from "../app/src/lib/lesson-steps.ts";
import type { LessonStep } from "../app/src/lib/types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ROADMAP_PATH = path.join(ROOT, "ROADMAP.md");
const LESSONS_DIR = path.join(ROOT, "lessons");
const OUT_PATH = path.join(ROOT, "app", "src", "data", "roadmap.json");

const CORE_STEPS: LessonStep[] = [
  "lection_eng",
  "lection_ru",
  "summary",
  "test",
  "answers",
];

const LESSON_STATUS_START = "<!-- LESSON-STATUS:START -->";
const LESSON_STATUS_END = "<!-- LESSON-STATUS:END -->";

export interface Subtopic {
  id: string;
  title: string;
  depth: string;
  hasLesson: boolean;
  stepsAvailable: string[];
}

export interface Node {
  id: string;
  slug: string;
  title: string;
  subtopics: Subtopic[];
}

export interface Phase {
  id: number;
  title: string;
  nodes: Node[];
}

export interface RoadmapData {
  generatedAt: string;
  totalSubtopics: number;
  phases: Phase[];
}

function stepFileExists(lessonDir: string, step: LessonStep): boolean {
  const candidates = [
    STEP_FILES[step],
    ...(LEGACY_STEP_FILES[step] ?? []),
  ];
  return candidates.some((file) => fs.existsSync(path.join(lessonDir, file)));
}

function getLessonMeta(
  subtopicId: string,
): Pick<Subtopic, "hasLesson" | "stepsAvailable"> {
  const lessonDir = path.join(LESSONS_DIR, subtopicId);
  if (!fs.existsSync(lessonDir)) {
    return { hasLesson: false, stepsAvailable: [] };
  }
  const stepsAvailable = (Object.keys(STEP_FILES) as LessonStep[]).filter(
    (step) => stepFileExists(lessonDir, step),
  );
  return { hasLesson: stepsAvailable.length > 0, stepsAvailable };
}

function parseSubtopicLine(
  line: string,
): { id: string; title: string; depth: string } | null {
  const fourCol =
    /^\|\s*([\d.]+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*.+?\s*\|$/.exec(line);
  if (fourCol && fourCol[1].includes(".")) {
    return {
      id: fourCol[1],
      title: fourCol[2].trim(),
      depth: fourCol[3].trim(),
    };
  }

  const threeCol = /^\|\s*([\d.]+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/.exec(line);
  if (threeCol && threeCol[1].includes(".")) {
    return {
      id: threeCol[1],
      title: threeCol[2].trim(),
      depth: threeCol[3].trim(),
    };
  }

  return null;
}

function getLessonMarker(
  meta: Pick<Subtopic, "hasLesson" | "stepsAvailable">,
): string {
  if (!meta.hasLesson) return "—";
  const hasAllCore = CORE_STEPS.every((step) =>
    meta.stepsAvailable.includes(step),
  );
  return hasAllCore ? "📚" : "📝";
}

function formatNodeMaterials(node: Node): string {
  let full = 0;
  let partial = 0;
  let none = 0;

  for (const subtopic of node.subtopics) {
    const marker = getLessonMarker(subtopic);
    if (marker === "📚") full += 1;
    else if (marker === "📝") partial += 1;
    else none += 1;
  }

  const total = node.subtopics.length;
  const parts = [`📚 ${full}/${total}`];
  if (partial > 0) parts.push(`📝 ${partial}`);
  if (none > 0) parts.push(`— ${none}`);
  return `> **Материалы:** ${parts.join(" · ")}`;
}

function formatGlobalLessonStatus(data: RoadmapData): string {
  let full = 0;
  let partial = 0;
  let none = 0;

  for (const phase of data.phases) {
    for (const node of phase.nodes) {
      for (const subtopic of node.subtopics) {
        const marker = getLessonMarker(subtopic);
        if (marker === "📚") full += 1;
        else if (marker === "📝") partial += 1;
        else none += 1;
      }
    }
  }

  return `> **Уроки в \`lessons/\`:** 📚 ${full} полных · 📝 ${partial} частичных · — ${none} без материалов · *обновляется: \`npm run parse-roadmap\`*`;
}

function upsertLessonStatusBlock(content: string, data: RoadmapData): string {
  const block = `${LESSON_STATUS_START}\n${formatGlobalLessonStatus(data)}\n${LESSON_STATUS_END}`;
  const statusRe = new RegExp(
    `${LESSON_STATUS_START}[\\s\\S]*?${LESSON_STATUS_END}`,
  );

  if (statusRe.test(content)) {
    return content.replace(statusRe, block);
  }

  return content.replace(
    /(> \*\*Треки:\*\*[^\n]+\n)\n+(---)/,
    `$1\n${block}\n\n$2`,
  );
}

function annotateRoadmap(content: string, data: RoadmapData): string {
  const markerById = new Map<string, string>();
  const nodeById = new Map<string, Node>();

  for (const phase of data.phases) {
    for (const node of phase.nodes) {
      nodeById.set(node.id, node);
      for (const subtopic of node.subtopics) {
        markerById.set(subtopic.id, getLessonMarker(subtopic));
      }
    }
  }

  let annotated = upsertLessonStatusBlock(content, data);
  const lines = annotated.split(/\r?\n/);
  const out: string[] = [];

  let currentNodeId: string | null = null;
  const nodeRe = /^### Узел ([\d.]+)\s*[—–-]/;
  const idLineRe = /^\*\*ID:\*\*/;
  const materialsRe = /^> \*\*Материалы:\*\*/;
  const tableHeaderRe = /^\| # \| Подтема \| Глубина(?: \| Урок)? \|$/;
  const tableSepRe = /^\|---\|---------|---------(?:\|------)?\|$/;

  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i];

    const nodeMatch = nodeRe.exec(line);
    if (nodeMatch) {
      currentNodeId = nodeMatch[1];
    }

    if (materialsRe.test(line)) {
      if (currentNodeId && nodeById.has(currentNodeId)) {
        line = formatNodeMaterials(nodeById.get(currentNodeId)!);
      } else {
        continue;
      }
    }

    if (
      idLineRe.test(line) &&
      currentNodeId &&
      nodeById.has(currentNodeId)
    ) {
      out.push(line);
      const nextLine = lines[i + 1];
      if (!nextLine || !materialsRe.test(nextLine)) {
        out.push(formatNodeMaterials(nodeById.get(currentNodeId)!));
      }
      continue;
    }

    if (tableHeaderRe.test(line)) {
      line = "| # | Подтема | Глубина | Урок |";
    } else if (tableSepRe.test(line)) {
      line = "|---|---------|---------|------|";
    } else {
      const subtopic = parseSubtopicLine(line);
      if (subtopic) {
        const marker = markerById.get(subtopic.id) ?? "—";
        line = `| ${subtopic.id} | ${subtopic.title} | ${subtopic.depth} | ${marker} |`;
      }
    }

    out.push(line);
  }

  return out.join("\n");
}

function parseRoadmap(content: string): RoadmapData {
  const lines = content.split(/\r?\n/);
  const phases: Phase[] = [];
  let currentPhase: Phase | null = null;
  let currentNode: Node | null = null;

  const phaseRe = /^## Фаза (\d+):\s*(.+)$/;
  const nodeRe = /^### Узел ([\d.]+)\s*[—–-]\s*(.+)$/;
  const slugRe = /^\*\*ID:\*\*\s*`([^`]+)`/;

  for (const line of lines) {
    const phaseMatch = phaseRe.exec(line);
    if (phaseMatch) {
      currentPhase = {
        id: Number(phaseMatch[1]),
        title: phaseMatch[2].trim(),
        nodes: [],
      };
      phases.push(currentPhase);
      currentNode = null;
      continue;
    }

    const nodeMatch = nodeRe.exec(line);
    if (nodeMatch && currentPhase) {
      currentNode = {
        id: nodeMatch[1],
        slug: "",
        title: nodeMatch[2].trim(),
        subtopics: [],
      };
      currentPhase.nodes.push(currentNode);
      continue;
    }

    const slugMatch = slugRe.exec(line);
    if (slugMatch && currentNode) {
      currentNode.slug = slugMatch[1];
      continue;
    }

    const subtopic = parseSubtopicLine(line);
    if (subtopic && currentNode) {
      currentNode.subtopics.push({
        id: subtopic.id,
        title: subtopic.title,
        depth: subtopic.depth.replace(/\*\*/g, ""),
        ...getLessonMeta(subtopic.id),
      });
    }
  }

  const totalSubtopics = phases.reduce(
    (sum, phase) =>
      sum +
      phase.nodes.reduce((nodeSum, node) => nodeSum + node.subtopics.length, 0),
    0,
  );

  return {
    generatedAt: new Date().toISOString(),
    totalSubtopics,
    phases,
  };
}

function main() {
  const annotateOnly = process.argv.includes("--annotate-only");
  const skipAnnotate = process.argv.includes("--no-annotate");

  if (!fs.existsSync(ROADMAP_PATH)) {
    console.error(`ROADMAP.md not found at ${ROADMAP_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(ROADMAP_PATH, "utf-8");
  const data = parseRoadmap(content);

  if (!skipAnnotate) {
    const annotated = annotateRoadmap(content, data);
    fs.writeFileSync(ROADMAP_PATH, annotated, "utf-8");
    console.log(`Annotated lesson markers in ${ROADMAP_PATH}`);
  }

  if (!annotateOnly) {
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, JSON.stringify(data, null, 2), "utf-8");
    console.log(
      `Parsed ${data.phases.length} phases, ${data.totalSubtopics} subtopics → ${OUT_PATH}`,
    );
  }
}

main();
