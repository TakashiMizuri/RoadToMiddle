export interface ParsedReviewCard {
  subtopic_id: string;
  card_id: string;
  category: string;
  question: string;
  answer: string;
}

function parseHeader(line: string): { card_id: string; category: string } | null {
  const rest = line.trim().replace(/^### /, "");
  const dot = rest.indexOf(". ");
  if (dot === -1) return null;
  const card_id = rest.slice(0, dot).trim();
  const after = rest.slice(dot + 2);
  const catMatch = after.match(/\[([^\]]+)\]/);
  const category = catMatch ? catMatch[1] : after.split(/\s+/).slice(0, 3).join(" ");
  return { card_id, category };
}

function extractAnswer(body: string): string {
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

function parseBlocks(section: string, isAnswer = false): Map<string, string> {
  const map = new Map<string, string>();
  for (const block of section.split("\n---\n")) {
    const trimmed = block.trim();
    const header = trimmed.split("\n").find((l) => l.trim().startsWith("### "));
    if (!header) continue;
    const h = parseHeader(header);
    if (!h) continue;
    const body = trimmed
      .split("\n")
      .slice(trimmed.split("\n").indexOf(header) + 1)
      .join("\n");
    map.set(h.card_id, isAnswer ? extractAnswer(body) : body.trim());
  }
  return map;
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
    map.set(h.card_id, { category: h.category, text: body });
  }
  return map;
}

export function parseReviewCardsFromMarkdown(
  subtopicId: string,
  testMd: string,
  answersMd: string,
): ParsedReviewCard[] {
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
  const ans = parseBlocks(aSection, true);

  const cards: ParsedReviewCard[] = [];
  for (const [card_id, { category, text }] of qs) {
    const answer = ans.get(card_id);
    if (!answer) continue;
    cards.push({
      subtopic_id: subtopicId,
      card_id,
      category,
      question: text,
      answer,
    });
  }
  return cards;
}
