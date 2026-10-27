export type Role = "guest" | "user" | "admin";

export type Action =
  | "view_deadlines"
  | "complete_deadline"
  | "add_deadline"
  | "delete_deadline";

const permissions: Record<Role, readonly Action[]> = {
  guest: ["view_deadlines"],
  user: ["view_deadlines", "complete_deadline"],
  admin: [
    "view_deadlines",
    "complete_deadline",
    "add_deadline",
    "delete_deadline",
  ],
};

export function can(role: Role, action: Action): boolean {
  return permissions[role].includes(action);
}
