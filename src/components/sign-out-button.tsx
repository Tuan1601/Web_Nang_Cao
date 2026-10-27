"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={`inline-flex items-center gap-2 rounded-lg text-sm font-semibold transition-colors ${className}`}
    >
      <LogOut size={16} />
      Đăng xuất
    </button>
  );
}
