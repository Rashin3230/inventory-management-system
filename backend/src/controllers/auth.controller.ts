import type { Response, NextFunction } from "express";

import { authService } from "@/services/auth.service";
import { AppError } from "@/lib/api/response";
import { loginSchema } from "@/validators/login.schema";
import type { AuthenticatedRequest } from "@/lib/auth/guard";

export class AuthController {
  async login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const parsed = loginSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.errors[0]?.message ?? "Invalid input",
          400,
        );
      }

      const result = await authService.login(parsed.data, res);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.auth) {
        throw new AppError("Unauthorized", 401);
      }
      const user = await authService.getCurrentUser(req.auth.userId);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.auth) {
        throw new AppError("Unauthorized", 401);
      }
      await authService.logout(req.auth.userId, res);
      res.json({
        success: true,
        data: { message: "Logged out successfully" },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
