import { USER_ROLES, PRODUCT_STATUS, STOCK_MOVEMENT_TYPES } from "@/utils/constants";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type ProductStatus =
  (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

export type StockMovementType =
  (typeof STOCK_MOVEMENT_TYPES)[keyof typeof STOCK_MOVEMENT_TYPES];

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
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

export interface AuthContext {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}
