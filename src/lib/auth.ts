import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const accounts = [
  {
    id: "ptit-admin",
    email: "admin@ptit.edu.vn",
    password: "admin123",
    name: "Lớp trưởng",
    role: "admin" as const,
  },
  {
    id: "ptit-student",
    email: "sv@ptit.edu.vn",
    password: "sv123456",
    name: "Nguyễn Minh Châu",
    role: "user" as const,
  },
];

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Email và mật khẩu",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Mật khẩu", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;
      const account = accounts.find(
        (item) => item.email === credentials.email.trim().toLowerCase() && item.password === credentials.password,
      );
      if (!account) return null;
      return { id: account.id, email: account.email, name: account.name, role: account.role };
    },
  }),
];

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: "admin" | "user" }).role ?? (user.email === "admin@ptit.edu.vn" ? "admin" : "user");
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};
