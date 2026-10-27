"use client";

import { useEffect, useState } from "react";

const dayMs = 86_400_000;

export function Countdown({ dueDate, compact = false }: { dueDate: string; compact?: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const days = now === null ? null : Math.ceil((new Date(dueDate).getTime() - now) / dayMs);
  const overdue = days !== null && days < 0;
  const label = days === null
    ? "Đang tính thời hạn"
    : days === 0
      ? "Hạn chót hôm nay"
      : overdue
        ? `Quá hạn ${Math.abs(days)} ngày`
        : `Còn ${days} ngày`;

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${
      overdue ? "bg-rose-50 text-rose-600" : days === 0 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
    } ${compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"}`}>
      {label}
    </span>
  );
}
