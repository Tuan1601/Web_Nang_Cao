"use client";

import { useActionState } from "react";
import {
  signInWithCredentials,
  signInWithGoogle,
  type SignInState,
} from "./actions";

const initialState: SignInState = {};

export function SignInForm() {
  const [state, action, pending] = useActionState(
    signInWithCredentials,
    initialState,
  );

  return (
    <div className="mt-8 space-y-5">
      <form action={action} className="space-y-4">
        <label className="block space-y-2 text-sm font-medium">
          <span>Email</span>
          <input
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none ring-blue-600 focus:ring-2"
            name="email"
            required
            type="email"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          <span>Mật khẩu</span>
          <input
            autoComplete="current-password"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none ring-blue-600 focus:ring-2"
            name="password"
            required
            type="password"
          />
        </label>
        {state.error ? (
          <p className="text-sm text-red-700" role="alert">
            {state.error}
          </p>
        ) : null}
        <button
          className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          {pending ? "Đang đăng nhập..." : "Đăng nhập bằng email"}
        </button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-slate-500">hoặc</span>
        </div>
      </div>
      <form action={signInWithGoogle}>
        <button
          className="w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold transition hover:bg-slate-50"
          type="submit"
        >
          Tiếp tục với Google
        </button>
      </form>
    </div>
  );
}
