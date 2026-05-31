import type { Request, Response, NextFunction } from "express";

import { verifyToken } from "@/lib/auth/token";
import { AUTH_COOKIE_NAME } from "@/lib/auth/cookie";
import { AppError } from "@/lib/api/response";
import type { AuthContext, UserRole } from "@/types";

export interface AuthenticatedRequest extends Request {
  auth?: AuthContext;
}

function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];
  return cookieToken ?? null;
}

export async function getAuthContext(
  req: Request,
): Promise<AuthContext | null> {
  const token = getTokenFromRequest(req);
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

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const context = await getAuthContext(req);
    if (!context) {
      throw new AppError("Unauthorized", 401);
    }
    req.auth = context;
    next();
  } catch (error) {
    next(error);
  }
}

export async function requireRole(
  roles: UserRole[],
): Promise<
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>
> {
  return async (req, res, next) => {
    try {
      const context = await getAuthContext(req);
      if (!context) {
        throw new AppError("Unauthorized", 401);
      }
      if (!roles.includes(context.role)) {
        throw new AppError("Forbidden — insufficient permissions", 403);
      }
      req.auth = context;
      next();
    } catch (error) {
      next(error);
    }
  };
}
