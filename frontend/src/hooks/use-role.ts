"use client";

import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/types";

export function useRole() {
  const { user } = useAuth();
  const role = user?.role;

  return {
    role,
    isAdmin: role === "admin",
    isStaff: role === "staff",
    hasRole: (roles: UserRole[]) => (role ? roles.includes(role) : false),
  };
}
