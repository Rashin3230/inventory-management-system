import { z } from "zod";

import { USER_ROLES } from "@/utils/constants";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password cannot exceed 128 characters"),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.STAFF]).default(USER_ROLES.STAFF),
  isActive: z.boolean().default(true),
});

export const updateUserSchema = createUserSchema
  .partial()
  .extend({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password cannot exceed 128 characters")
      .optional(),
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
