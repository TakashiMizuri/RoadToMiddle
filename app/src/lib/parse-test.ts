export interface McqOption {
  key: string;
  text: string;
}

export interface PracticalItem {
  text: string;
  correct: string;
}

export interface TestQuestion {
  id: string;
  category: string;
  type: "mcq" | "open" | "practical";
  prompt: string;
  options?: McqOption[];
  correctOption?: string;
  answerShort: string;
  answerFull: string;
  practicalItems?: PracticalItem[];
}

function parseHeader(line: string): { id: string; category: string } | null {
  const rest = line.trim().replace(/^### /, "");
  const dot = rest.indexOf(". ");
  if (dot === -1) return null;
  const id = rest.slice(0, dot).trim();
  const after = rest.slice(dot + 2);
  const catMatch = after.match(/\[([^\]]+)\]/);
  const category = catMatch ? catMatch[1] : after.split(/\s+/).slice(0, 3).join(" ");
  return { id, category };
}

function parseQuestionBlocks(section: string): Map<string, { category: string; text: string }> {
  const map = new Map<string, { category: string; text: string }>();
  for (const block of section.split("\n---\n")) {
    const trimmed = block.trim();
    const header = trimmed.split("\n").find((l) => l.trim().startsWith("### "));
    if (!header) continue;
    const h = parseHeader(header);
    if (!h) continue;
    const body = trimmed
      .split("\n")
      .slice(trimmed.split("\n").indexOf(header) + 1)
      .join("\n")
      .trim();
    map.set(h.id, { category: h.category, text: body });
  }
  return map;
}

function parseFullAnswerBlocks(section: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const block of section.split("\n---\n")) {
    const trimmed = block.trim();
    if (trimmed.includes("## Practical P1")) {
      const body = trimmed
        .split("\n")
        .filter((l) => !l.trim().startsWith("## "))
        .join("\n")
        .trim();
      if (body) map.set("P1", body);
      continue;
    }
    const header = trimmed.split("\n").find((l) => l.trim().startsWith("### "));
    if (!header) continue;
    const h = parseHeader(header);
    if (!h) continue;
    const body = trimmed
      .split("\n")
      .slice(trimmed.split("\n").indexOf(header) + 1)
      .join("\n")
      .trim();
    map.set(h.id, body);
  }
  return map;
}

function extractAnswerShort(body: string): string {
  const lines = body.split("\n");
  const out: string[] = [];
  let inA = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("**Answer:**")) {
      inA = true;
      const rest = t.replace("**Answer:**", "").trim();
      if (rest) out.push(rest);
      continue;
    }
    if (inA) {
      if (
        t.startsWith("**Why:**") ||
        t.startsWith("**Scoring") ||
        t.startsWith("**Note") ||
        t.startsWith("**Common mistake") ||
        t.startsWith("### ") ||
        t.startsWith("## ")
      ) {
        break;
      }
      out.push(line);
    }
  }
  return out.join("\n").trim();
}

function splitMcq(body: string): { prompt: string; options: McqOption[] } {
  const promptLines: string[] = [];
  const options: McqOption[] = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^-\s+([A-D])\)\s+(.+)$/);
    if (m) options.push({ key: m[1], text: m[2] });
    else promptLines.push(line);
  }
  return { prompt: promptLines.join("\n").trim(), options };
}

function extractMcqCorrect(answerBody: string): string | null {
  const answerLine = answerBody.split("\n").find((l) => l.includes("**Answer:**"));
  if (!answerLine) return null;
  const m = answerLine.match(/\*\*([A-D])\*\*/);
  return m?.[1] ?? null;
}

function parsePracticalItems(answerBody: string): PracticalItem[] {
  const items: PracticalItem[] = [];
  for (const line of answerBody.split("\n")) {
    const m = line.match(/^\d+\.\s+(.+?)\s*→\s+\*\*([^*]+)\*\*/);
    if (m) items.push({ text: m[1].trim(), correct: m[2].trim() });
  }
  return items;
}

function parsePracticalPrompt(body: string): string {
  const lines = body.split("\n");
  const listStart = lines.findIndex((l) => /^\d+\.\s/.test(l.trim()));
  if (listStart === -1) return body;
  return lines.slice(0, listStart).join("\n").trim();
}

function parsePracticalList(body: string): string[] {
  const items: string[] = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^\d+\.\s+(.+)$/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

export function parseInteractiveTest(testMd: string, answersMd: string): TestQuestion[] {
  const test = testMd.replace(/\r\n/g, "\n");
  const answers = answersMd.replace(/\r\n/g, "\n");

  let qSection = test.slice(test.indexOf("## Questions"));
  const selfCheck = qSection.indexOf("## Self-Check");
  if (selfCheck > -1) qSection = qSection.slice(0, selfCheck);
  if (test.includes("## Practical")) {
    qSection += test.slice(test.indexOf("## Practical"), test.indexOf("## Self-Check"));
  }

  let aSection = answers.slice(answers.indexOf("## Answers"));
  const ifFailed = aSection.indexOf("## If you failed");
  if (ifFailed > -1) aSection = aSection.slice(0, ifFailed);
  if (answers.includes("## Practical P1")) {
    aSection += answers.slice(
      answers.indexOf("## Practical P1"),
      answers.indexOf("## If you failed"),
    );
  }

  const qs = parseQuestionBlocks(qSection);
  const ansFull = parseFullAnswerBlocks(aSection);
  const result: TestQuestion[] = [];

  for (const [id, { category, text }] of qs) {
    const full = ansFull.get(id);
    if (!full) continue;

    const { prompt, options } = splitMcq(text);
    const isMcq = options.length >= 2;

    if (id === "P1" || category.toLowerCase().includes("practical")) {
      const practicalItems = parsePracticalItems(full);
      const listItems = parsePracticalList(text);
      const merged =
        practicalItems.length > 0
          ? practicalItems
          : listItems.map((t, i) => ({
              text: t,
              correct: practicalItems[i]?.correct ?? "",
            }));

      if (merged.length > 0 && merged.every((p) => p.correct)) {
        result.push({
          id,
          category,
          type: "practical",
          prompt: parsePracticalPrompt(text),
          answerShort: extractAnswerShort(full),
          answerFull: full,
          practicalItems: merged,
        });
        continue;
      }
    }

    if (isMcq) {
      result.push({
        id,
        category,
        type: "mcq",
        prompt,
        options,
        correctOption: extractMcqCorrect(full) ?? undefined,
        answerShort: extractAnswerShort(full),
        answerFull: full,
      });
    } else {
      result.push({
        id,
        category,
        type: "open",
        prompt: text,
        answerShort: extractAnswerShort(full),
        answerFull: full,
      });
    }
  }

  return result.sort((a, b) => {
    const na = a.id === "P1" ? 1000 : Number(a.id);
    const nb = b.id === "P1" ? 1000 : Number(b.id);
    return (Number.isNaN(na) ? 999 : na) - (Number.isNaN(nb) ? 999 : nb);
  });
}

export function parseTestMeta(content: string): { pass_threshold: number; test_max_score: number } {
  let pass_threshold = 80;
  let test_max_score = 16;
  for (const line of content.replace(/\r\n/g, "\n").split("\n")) {
    if (line.includes("Pass threshold")) {
      const m = line.match(/(\d+)\s*%/);
      if (m) pass_threshold = Number(m[1]);
    }
    if (line.includes("Score yourself") && line.includes("/")) {
      const m = line.split("/")[1]?.match(/(\d+)/);
      if (m) test_max_score = Number(m[1]);
    }
  }
  return { pass_threshold, test_max_score };
}
