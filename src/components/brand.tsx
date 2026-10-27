import Link from "next/link";
import { CalendarDays } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Deadline Hub - Trang chủ">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
        <CalendarDays size={21} strokeWidth={2.2} />
      </span>
      {!compact && (
        <span className="text-[17px] font-bold tracking-[-0.04em] text-ink">
          deadline<span className="text-brand">hub</span>
        </span>
      )}
    </Link>
  );
}
