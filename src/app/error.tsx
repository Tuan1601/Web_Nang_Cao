"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Page rendering failed:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[55vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600"><AlertTriangle size={25} /></span>
      <h1 className="text-2xl font-bold text-ink">Đã có lỗi xảy ra</h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Không thể tải nội dung lúc này. Vui lòng thử lại sau ít phút.</p>
      <button onClick={() => reset()} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
        <RotateCcw size={16} /> Thử lại
      </button>
    </div>
  );
}
