"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { getDeadlineCompletionAction, markDeadlineCompleteAction } from "@/app/actions";

export function DeadlineCompletion({ deadlineId }: { deadlineId: string }) {
  const { status } = useSession();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      getDeadlineCompletionAction(deadlineId).then(setCompleted).catch((error: unknown) => {
        console.error("Could not load deadline completion:", error);
      });
    }
  }, [deadlineId, status]);

  if (status !== "authenticated") {
    return <p className="mt-5 rounded-xl bg-blue-50 p-4 text-center text-xs text-blue-800"><Link href={`/login?callbackUrl=/deadlines/${deadlineId}`} className="font-bold underline">Đăng nhập</Link> để đánh dấu deadline đã hoàn thành.</p>;
  }

  async function markComplete() {
    setLoading(true);
    setError("");
    try {
      await markDeadlineCompleteAction(deadlineId);
      setCompleted(true);
    } catch (actionError) {
      console.error("Could not mark deadline complete:", actionError);
      setError("Không thể cập nhật tiến độ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={markComplete} disabled={completed || loading} className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition disabled:cursor-default ${completed ? "border border-emerald-200 bg-emerald-50 text-emerald-700" : "bg-brand text-white hover:bg-brand-dark disabled:opacity-70"}`}>
        <CheckCircle2 size={17} /> {completed ? "Đã hoàn thành" : loading ? "Đang lưu..." : "Đánh dấu đã hoàn thành"}
      </button>
      {error && <p role="alert" className="mt-2 text-center text-xs text-rose-600">{error}</p>}
    </>
  );
}
