import { z } from "zod";

import { PRODUCT_STATUS } from "@/utils/constants";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name cannot exceed 200 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional().default(""),
  unit: z.string().min(1, "Unit is required"),
  costPrice: z.coerce.number().min(0, "Cost price cannot be negative"),
  sellingPrice: z.coerce.number().min(0, "Selling price cannot be negative"),
  currentStock: z.coerce
    .number()
    .min(0, "Stock cannot be negative")
    .optional()
    .default(0),
  minimumStock: z.coerce
    .number()
    .min(0, "Minimum stock cannot be negative")
    .optional()
    .default(0),
  status: z
    .enum([
      PRODUCT_STATUS.ACTIVE,
      PRODUCT_STATUS.INACTIVE,
      PRODUCT_STATUS.DISCONTINUED,
    ])
    .optional()
    .default(PRODUCT_STATUS.ACTIVE),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
