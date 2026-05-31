export type UserRole = "admin" | "staff";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface SafeUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  accessToken: string;
  user: SafeUser;
}
