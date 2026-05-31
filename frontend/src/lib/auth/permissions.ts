import type { UserRole } from "@/types";

export function isAdminRole(role: UserRole): boolean {
  return role === "admin";
}
