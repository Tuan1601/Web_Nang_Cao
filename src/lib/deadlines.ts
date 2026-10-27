import "server-only";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { subjects } from "@/lib/subjects";

export const deadlineSchema = z.object({
  title: z.string().trim().min(5).max(120),
  subjectSlug: z.string().refine((value) => subjects.some((subject) => subject.slug === value)),
  description: z.string().trim().min(10).max(1000),
  dueDate: z.string().datetime({ offset: true }),
  type: z.string().trim().min(2).max(40),
});

export type Deadline = z.infer<typeof deadlineSchema> & {
  id: string;
  createdAt: string;
};

export type CompletionMap = Record<string, string[]>;

const deadlinesPath = path.join(process.cwd(), "data", "deadlines.json");
const completionsPath = path.join(process.cwd(), "data", "completions.json");

export async function getDeadlines(): Promise<Deadline[]> {
  const contents = await readFile(deadlinesPath, "utf8");
  return z.array(deadlineSchema.extend({
    id: z.string().min(1),
    createdAt: z.string().datetime({ offset: true }),
  })).parse(JSON.parse(contents));
}

export async function getDeadline(id: string): Promise<Deadline | undefined> {
  return (await getDeadlines()).find((deadline) => deadline.id === id);
}

export async function saveDeadlines(deadlines: Deadline[]): Promise<void> {
  await writeFile(deadlinesPath, `${JSON.stringify(deadlines, null, 2)}\n`, "utf8");
}

export async function getCompletions(): Promise<CompletionMap> {
  const contents = await readFile(completionsPath, "utf8");
  return z.record(z.array(z.string())).parse(JSON.parse(contents));
}

export async function toggleCompletion(userId: string, deadlineId: string): Promise<void> {
  const completions = await getCompletions();
  const completed = new Set(completions[userId] ?? []);
  if (completed.has(deadlineId)) completed.delete(deadlineId);
  else completed.add(deadlineId);
  completions[userId] = [...completed];
  await writeFile(completionsPath, `${JSON.stringify(completions, null, 2)}\n`, "utf8");
}
