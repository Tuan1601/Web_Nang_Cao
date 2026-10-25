export const userRoles = ["admin", "user"] as const;

export type UserRole = (typeof userRoles)[number];

export function isUserRole(value: unknown): value is UserRole {
  return value === "admin" || value === "user";
}

export function roleForEmail(email: string | null | undefined): UserRole {
  if (
    email &&
    process.env.AUTH_ADMIN_EMAIL &&
    email.toLowerCase() === process.env.AUTH_ADMIN_EMAIL.toLowerCase()
  ) {
    return "admin";
  }

  return "user";
}
