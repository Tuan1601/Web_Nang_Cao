"use server";

import { requireRole } from "@/lib/auth/guards";

export async function verifyAdminAccess() {
  await requireRole("admin");
  return "Quyền quản trị đã được xác minh ở Server Action.";
}
