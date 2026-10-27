"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteDeadlineAction } from "@/app/actions";

export function DeleteDeadlineButton({ deadlineId, title }: { deadlineId: string; title: string }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <form action={deleteDeadlineAction} onSubmit={(event) => {
      if (!confirming) {
        event.preventDefault();
        setConfirming(true);
      }
    }}>
      <input type="hidden" name="deadlineId" value={deadlineId} />
      <button type="submit" aria-label={`Xóa ${title}`} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${confirming ? "border-rose-200 bg-rose-50 text-rose-700" : "border-rose-100 text-rose-600 hover:bg-rose-50"}`}>
        <Trash2 size={14} /> {confirming ? "Xác nhận xóa" : "Xóa"}
      </button>
      {confirming && <button type="button" onClick={() => setConfirming(false)} className="ml-2 text-xs font-semibold text-slate-500 hover:text-ink">Hủy</button>}
    </form>
  );
}
