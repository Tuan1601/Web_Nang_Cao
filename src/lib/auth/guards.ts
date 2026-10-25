import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { UserRole } from "@/lib/auth/roles";

export async function requireUser() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return session.user;
}

export async function requireRole(role: UserRole) {
  const user = await requireUser();

  if (user.role !== role) {
    redirect("/forbidden");
  }

  return user;
}
