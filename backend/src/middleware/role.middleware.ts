import type { Request, Response, NextFunction } from "express";

import { getAuthContext } from "@/lib/auth/guard";
import { AppError } from "@/lib/api/response";
import type { UserRole } from "@/types";

export function requireRoles(...roles: UserRole[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const context = await getAuthContext(req);
      if (!context) {
        throw new AppError("Unauthorized", 401);
      }
      if (!roles.includes(context.role)) {
        throw new AppError("Forbidden — insufficient permissions", 403);
      }
      (req as Request & { auth: typeof context }).auth = context;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export const requireAdmin = requireRoles("admin");
