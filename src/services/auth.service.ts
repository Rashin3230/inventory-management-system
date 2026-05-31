import { comparePassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/token";
import { setAuthCookie, clearAuthCookie } from "@/lib/auth/session";
import { AppError } from "@/lib/api/response";
import { connectDB } from "@/lib/mongodb";
import { userRepository } from "@/repositories/user.repository";
import { auditService } from "@/services/audit.service";
import type { LoginInput } from "@/validators/login.schema";
import type { LoginResponse, SafeUser } from "@/types";

export class AuthService {
  async login(input: LoginInput): Promise<LoginResponse> {
    await connectDB();
    const user = await userRepository.findByEmail(input.email, true);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      throw new AppError("Account is deactivated. Contact administrator.", 403);
    }

    const isValid = await comparePassword(input.password, user.password);

    if (!isValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = await generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setAuthCookie(accessToken);

    await auditService.log(user._id.toString(), "LOGIN", "auth", {
      email: user.email,
    });

    const safeUser: SafeUser = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { accessToken, user: safeUser };
  }

  async getCurrentUser(userId: string): Promise<SafeUser> {
    await connectDB();
    const user = await userRepository.findByIdSafe(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!user.isActive) {
      throw new AppError("Account is deactivated", 403);
    }

    return user;
  }

  async logout(userId: string): Promise<void> {
    await connectDB();
    await clearAuthCookie();
    await auditService.log(userId, "LOGOUT", "auth");
  }
}

export const authService = new AuthService();
