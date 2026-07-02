import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ROADMAP_PATH = path.join(ROOT, "ROADMAP.md");
const LESSONS_DIR = path.join(ROOT, "lessons");
const OUT_PATH = path.join(ROOT, "app", "src", "data", "roadmap.json");

const STEP_FILES: Record<string, string> = {
  lection: "1.lection.md",
  summary: "2.summary.md",
  test: "3.test-yourself.md",
  answers: "4.test-yourself-answers.md",
  exercises: "5.exercises.md",
};

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

function getLessonMeta(subtopicId: string): Pick<Subtopic, "hasLesson" | "stepsAvailable"> {
  const lessonDir = path.join(LESSONS_DIR, subtopicId);
  if (!fs.existsSync(lessonDir)) {
    return { hasLesson: false, stepsAvailable: [] };
  }
  const stepsAvailable = Object.entries(STEP_FILES)
    .filter(([, file]) => fs.existsSync(path.join(lessonDir, file)))
    .map(([step]) => step);
  return { hasLesson: stepsAvailable.length > 0, stepsAvailable };
}

function parseRoadmap(content: string): RoadmapData {
  const lines = content.split(/\r?\n/);
  const phases: Phase[] = [];
  let currentPhase: Phase | null = null;
  let currentNode: Node | null = null;
  let pendingSlug: string | null = null;

  const phaseRe = /^## Фаза (\d+):\s*(.+)$/;
  const nodeRe = /^### Узел ([\d.]+)\s*[—–-]\s*(.+)$/;
  const slugRe = /^\*\*ID:\*\*\s*`([^`]+)`/;
  const subtopicRe = /^\|\s*([\d.]+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/;

  for (const line of lines) {
    const phaseMatch = line.match(phaseRe);
    if (phaseMatch) {
      currentPhase = {
        id: Number(phaseMatch[1]),
        title: phaseMatch[2].trim(),
        nodes: [],
      };
      phases.push(currentPhase);
      currentNode = null;
      pendingSlug = null;
      continue;
    }

    const nodeMatch = line.match(nodeRe);
    if (nodeMatch && currentPhase) {
      currentNode = {
        id: nodeMatch[1],
        slug: "",
        title: nodeMatch[2].trim(),
        subtopics: [],
      };
      currentPhase.nodes.push(currentNode);
      pendingSlug = null;
      continue;
    }

    const slugMatch = line.match(slugRe);
    if (slugMatch && currentNode) {
      currentNode.slug = slugMatch[1];
      continue;
    }

    const subtopicMatch = line.match(subtopicRe);
    if (subtopicMatch && currentNode) {
      const id = subtopicMatch[1];
      if (id === "#" || id.includes(".")) {
        if (id === "#") continue;
        const meta = getLessonMeta(id);
        currentNode.subtopics.push({
          id,
          title: subtopicMatch[2].trim(),
          depth: subtopicMatch[3].trim().replace(/\*\*/g, ""),
          ...meta,
        });
      }
    }
  }

  const totalSubtopics = phases.reduce(
    (sum, p) => sum + p.nodes.reduce((ns, n) => ns + n.subtopics.length, 0),
    0,
  );

  return {
    generatedAt: new Date().toISOString(),
    totalSubtopics,
    phases,
  };
}

function main() {
  if (!fs.existsSync(ROADMAP_PATH)) {
    console.error(`ROADMAP.md not found at ${ROADMAP_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(ROADMAP_PATH, "utf-8");
  const data = parseRoadmap(content);

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(data, null, 2), "utf-8");

  console.log(
    `Parsed ${data.phases.length} phases, ${data.totalSubtopics} subtopics → ${OUT_PATH}`,
  );
}

main();
