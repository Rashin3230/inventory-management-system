import { authService } from "@/services/auth.service";
import { requireAuth } from "@/lib/auth/guard";
import { AppError, apiSuccess, handleApiError } from "@/lib/api/response";
import { loginSchema } from "@/validators/login.schema";
import type { NextRequest } from "next/server";

export class AuthController {
  async login(request: NextRequest) {
    try {
      const body = await request.json();
      const parsed = loginSchema.safeParse(body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.errors[0]?.message ?? "Invalid input",
          400,
        );
      }

      const result = await authService.login(parsed.data);
      return apiSuccess(result);
    } catch (error) {
      return handleApiError(error);
    }
  }

  async me() {
    try {
      const auth = await requireAuth();
      const user = await authService.getCurrentUser(auth.userId);
      return apiSuccess(user);
    } catch (error) {
      return handleApiError(error);
    }
  }

  async logout() {
    try {
      const auth = await requireAuth();
      await authService.logout(auth.userId);
      return apiSuccess({ message: "Logged out successfully" });
    } catch (error) {
      return handleApiError(error);
    }
  }
}

export const authController = new AuthController();
