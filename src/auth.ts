import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { isUserRole, roleForEmail } from "@/lib/auth/roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials.password === "string" ? credentials.password : "";

        if (!email || !password) return null;

        const accounts = [
          {
            email: process.env.AUTH_ADMIN_EMAIL?.trim().toLowerCase(),
            passwordHash: process.env.AUTH_ADMIN_PASSWORD_HASH,
          },
          {
            email: process.env.AUTH_USER_EMAIL?.trim().toLowerCase(),
            passwordHash: process.env.AUTH_USER_PASSWORD_HASH,
          },
        ];
        const account = accounts.find((candidate) => candidate.email === email);

        if (!account?.passwordHash || !(await compare(password, account.passwordHash))) {
          return null;
        }

        return {
          id: email,
          email,
          name: email,
          role: roleForEmail(email),
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return true;
      return Boolean(
        profile &&
          "email_verified" in profile &&
          profile.email_verified === true,
      );
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? roleForEmail(user.email);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = isUserRole(token.role) ? token.role : "user";
      }
      return session;
    },
  },
});
