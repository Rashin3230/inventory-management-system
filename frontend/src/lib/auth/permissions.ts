import type { UserRole } from "@/types";

type PermissionModule =
  | "products"
  | "suppliers"
  | "purchases"
  | "sales"
  | "inventory"
  | "reports"
  | "users";

type PermissionAction = "create" | "read" | "update" | "delete" | "export";

const ROLE_PERMISSIONS: Record<
  UserRole,
  Record<PermissionModule, PermissionAction[]>
> = {
  admin: {
    products: ["create", "read", "update", "delete"],
    suppliers: ["create", "read", "update", "delete"],
    purchases: ["create", "read", "update", "delete"],
    sales: ["create", "read", "update", "delete"],
    inventory: ["read", "export"],
    reports: ["read", "export"],
    users: ["create", "read", "update", "delete"],
  },
  staff: {
    products: ["read"],
    suppliers: ["read"],
    purchases: ["create", "read"],
    sales: ["create", "read"],
    inventory: ["read", "export"],
    reports: ["read"],
    users: [],
  },
};

export function hasPermission(
  role: UserRole | undefined,
  module: PermissionModule,
  action: PermissionAction,
): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role][module]?.includes(action) ?? false;
}

export function isAdminRole(role: UserRole | undefined): boolean {
  return role === "admin";
}
