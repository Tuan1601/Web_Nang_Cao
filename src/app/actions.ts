"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { deadlineSchema, getCompletions, getDeadlines, saveDeadlines, toggleCompletion } from "@/lib/deadlines";

const deadlineIdSchema = z.string().regex(/^\d{1,8}$/, "Mã deadline không hợp lệ.");
const localDateTimeSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Vui lòng chọn ngày và giờ hợp lệ.");

async function requireActionPermission(action: "complete_deadline" | "add_deadline" | "delete_deadline") {
  const session = await getServerSession(authOptions);
  if (!session?.user || !can(session.user.role, action)) {
    throw new Error("Bạn không có quyền thực hiện thao tác này.");
  }
  return session.user;
}

export async function getDeadlineCompletionAction(deadlineId: string): Promise<boolean> {
  const user = await requireActionPermission("complete_deadline");
  const parsedId = deadlineIdSchema.safeParse(deadlineId);
  if (!parsedId.success) throw new Error("Mã deadline không hợp lệ.");
  const deadlines = await getDeadlines();
  if (!deadlines.some((deadline) => deadline.id === parsedId.data)) throw new Error("Deadline không tồn tại.");
  const completions = await getCompletions();
  return completions[user.id]?.includes(parsedId.data) ?? false;
}

export async function markDeadlineCompleteAction(deadlineId: string): Promise<void> {
  const user = await requireActionPermission("complete_deadline");
  const parsedId = deadlineIdSchema.safeParse(deadlineId);
  if (!parsedId.success) throw new Error("Mã deadline không hợp lệ.");
  const deadlines = await getDeadlines();
  if (!deadlines.some((deadline) => deadline.id === parsedId.data)) throw new Error("Deadline không tồn tại.");
  const completions = await getCompletions();
  if (!completions[user.id]?.includes(parsedId.data)) {
    await toggleCompletion(user.id, parsedId.data);
  }
  revalidatePath(`/deadlines/${parsedId.data}`);
  revalidatePath("/dashboard");
}

export type AddDeadlineState = { error?: string; success?: boolean };

export async function addDeadlineAction(_previous: AddDeadlineState, formData: FormData): Promise<AddDeadlineState> {
  await requireActionPermission("add_deadline");

  const localDate = localDateTimeSchema.safeParse(formData.get("dueDate"));
  if (!localDate.success) return { error: "Vui lòng chọn ngày và giờ hạn nộp hợp lệ." };
  const dueDate = new Date(`${localDate.data}:00+07:00`);
  if (Number.isNaN(dueDate.getTime())) return { error: "Ngày hạn nộp không hợp lệ." };

  const parsed = deadlineSchema.safeParse({
    title: formData.get("title"),
    subjectSlug: formData.get("subjectSlug"),
    description: formData.get("description"),
    dueDate: dueDate.toISOString(),
    type: formData.get("type"),
  });
  if (!parsed.success) return { error: "Thông tin chưa hợp lệ. Hãy kiểm tra tên, môn học, mô tả và loại deadline." };

  const deadlines = await getDeadlines();
  const nextId = String(Math.max(0, ...deadlines.map((deadline) => Number(deadline.id) || 0)) + 1);
  await saveDeadlines([...deadlines, { ...parsed.data, id: nextId, createdAt: new Date().toISOString() }]);
  revalidatePath("/");
  revalidatePath("/deadlines");
  revalidatePath("/admin");
  revalidatePath(`/deadlines/${nextId}`);
  revalidatePath("/sitemap.xml");
  return { success: true };
}

export async function deleteDeadlineAction(formData: FormData) {
  await requireActionPermission("delete_deadline");
  const parsedId = deadlineIdSchema.safeParse(formData.get("deadlineId"));
  if (!parsedId.success) throw new Error("Mã deadline không hợp lệ.");
  const deadlines = await getDeadlines();
  if (!deadlines.some((deadline) => deadline.id === parsedId.data)) throw new Error("Deadline không tồn tại.");
  await saveDeadlines(deadlines.filter((deadline) => deadline.id !== parsedId.data));
  revalidatePath("/");
  revalidatePath("/deadlines");
  revalidatePath("/admin");
  revalidatePath(`/deadlines/${parsedId.data}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin?deleted=1");
}
