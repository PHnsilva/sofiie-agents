import { readFile } from 'node:fs/promises';
import { z } from 'zod';

const entrySchema = z.strictObject({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.enum(['reference', 'approved']),
  sources: z.array(z.string()).min(1),
});
const entriesSchema = z.array(entrySchema);

export async function searchKnowledge(query: string) {
  const text = z.string().trim().min(2).max(200).parse(query);
  const reference = entriesSchema.parse(
    JSON.parse(await readFile(new URL('../../knowledge/references.json', import.meta.url), 'utf8')),
  );
  const approved = entriesSchema.parse(
    JSON.parse(await readFile(new URL('../../knowledge/approved.json', import.meta.url), 'utf8')),
  );
  const tokens = text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .split(/\s+/);
  return [...reference, ...approved]
    .map((entry) => {
      const corpus = `${entry.title} ${entry.content}`
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();
      return { ...entry, score: tokens.filter((token) => corpus.includes(token)).length };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
