import { headers } from "next/headers";

import { getAuthCookie } from "@/lib/auth/session";
import { verifyToken } from "@/lib/auth/token";
import { AppError } from "@/lib/api/response";
import type { AuthContext, UserRole } from "@/types";

export async function getTokenFromRequest(): Promise<string | null> {
  const authHeader = (await headers()).get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  const cookieToken = await getAuthCookie();
  return cookieToken ?? null;
}

export async function getAuthContext(): Promise<AuthContext | null> {
  const token = await getTokenFromRequest();
  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);
    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<AuthContext> {
  const context = await getAuthContext();
  if (!context) {
    throw new AppError("Unauthorized", 401);
  }
  return context;
}

export async function requireRole(roles: UserRole[]): Promise<AuthContext> {
  const context = await requireAuth();
  if (!roles.includes(context.role)) {
    throw new AppError("Forbidden — insufficient permissions", 403);
  }
  return context;
}

export function isAdmin(role: UserRole): boolean {
  return role === "admin";
}

export function isStaff(role: UserRole): boolean {
  return role === "staff";
}
