import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseHeader(line: string) {
  const rest = line.trim().replace(/^### /, "");
  const dot = rest.indexOf(". ");
  if (dot === -1) return null;
  return { card_id: rest.slice(0, dot).trim(), category: rest.match(/\[([^\]]+)\]/)?.[1] ?? "General" };
}

function extractAnswer(body: string) {
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
      if (t.startsWith("**Why:**") || t.startsWith("**Scoring") || t.startsWith("### ") || t.startsWith("## ")) break;
      out.push(line);
    }
  }
  return out.join("\n").trim();
}

function parseBlocks(section: string, isAnswer = false) {
  const map = new Map<string, string>();
  for (const block of section.split("\n---\n")) {
    const trimmed = block.trim();
    const header = trimmed.split("\n").find((l) => l.trim().startsWith("### "));
    if (!header) continue;
    const h = parseHeader(header);
    if (!h) continue;
    const body = trimmed.split("\n").slice(trimmed.split("\n").indexOf(header) + 1).join("\n");
    map.set(h.card_id, isAnswer ? extractAnswer(body) : body.trim());
  }
  return map;
}

function loadCards(subtopicId: string) {
  const test = fs.readFileSync(path.join(root, `lessons/${subtopicId}/3.test-yourself.md`), "utf-8").replace(/\r\n/g, "\n");
  const answers = fs.readFileSync(path.join(root, `lessons/${subtopicId}/4.test-yourself-answers.md`), "utf-8").replace(/\r\n/g, "\n");

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
    aSection += answers.slice(answers.indexOf("## Practical P1"), answers.indexOf("## If you failed"));
  }

  const qs = parseBlocks(qSection);
  const ans = parseBlocks(aSection, true);
  const cards = [...qs.keys()].filter((id) => ans.has(id));
  return { total: cards.length, ids: cards };
}

const result = loadCards("0.1.1");
console.log(`Matched ${result.total} cards:`, result.ids.join(", "));
