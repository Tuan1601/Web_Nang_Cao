"use client";

import { useState, useTransition } from "react";
import { verifyAdminAccess } from "./actions";

export function AdminActionButton() {
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function runAction() {
    startTransition(async () => {
      const result = await verifyAdminAccess();
      setMessage(result);
    });
  }

  return (
    <div className="mt-8">
      <button
        className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
        disabled={pending}
        onClick={runAction}
        type="button"
      >
        {pending ? "Đang kiểm tra..." : "Kiểm tra quyền qua Server Action"}
      </button>
      {message ? (
        <p className="mt-4 text-sm text-emerald-800" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
