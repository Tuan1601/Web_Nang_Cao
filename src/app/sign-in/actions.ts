"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type SignInState = {
  error?: string;
};

export async function signInWithCredentials(
  _previousState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email hoặc mật khẩu không đúng." };
    }
    throw error;
  }

  return {};
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}
