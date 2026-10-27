import "next-auth";
import "next-auth/jwt";
import type { Role } from "@/lib/permissions";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Exclude<Role, "guest">;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    role: Exclude<Role, "guest">;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Exclude<Role, "guest">;
  }
}
