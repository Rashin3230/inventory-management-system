import { USER_ROLES } from "@/utils/constants";
import type { UserRole } from "@/types";

export const ROLE_PERMISSIONS = {
  admin: {
    products: ["create", "read", "update", "delete"],
    suppliers: ["create", "read", "update", "delete"],
    purchases: ["create", "read", "update", "delete"],
    sales: ["create", "read", "update", "delete"],
    inventory: ["read", "export"],
    adjustments: ["create", "read"],
    reports: ["read", "export"],
    users: ["create", "read", "update", "delete"],
    auditLogs: ["read"],
  },
  staff: {
    products: ["read"],
    suppliers: ["read"],
    purchases: ["create", "read"],
    sales: ["create", "read"],
    inventory: ["read", "export"],
    adjustments: [],
    reports: ["read"],
    users: [],
    auditLogs: [],
  },
} as const;

export type PermissionModule = keyof typeof ROLE_PERMISSIONS.admin;
export type PermissionAction = "create" | "read" | "update" | "delete" | "export";

export function hasPermission(
  role: UserRole,
  module: PermissionModule,
  action: PermissionAction,
): boolean {
  const permissions = ROLE_PERMISSIONS[role] as Record<
    PermissionModule,
    readonly string[]
  >;
  return permissions[module]?.includes(action) ?? false;
}

export function requirePermission(
  role: UserRole,
  module: PermissionModule,
  action: PermissionAction,
): void {
  if (!hasPermission(role, module, action)) {
    throw new Error(`Forbidden: ${role} cannot ${action} ${module}`);
  }
}

export const ADMIN_ONLY_ROUTES = [
  "/dashboard/adjustments",
  "/dashboard/users",
  "/dashboard/audit-logs",
];

export function isAdminRole(role: UserRole): boolean {
  return role === USER_ROLES.ADMIN;
}
