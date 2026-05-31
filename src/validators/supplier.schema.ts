import { z } from "zod";

export const createSupplierSchema = z.object({
  supplierName: z
    .string()
    .min(2, "Supplier name must be at least 2 characters")
    .max(200, "Supplier name cannot exceed 200 characters"),
  contactPerson: z.string().min(2, "Contact person is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
});

export const updateSupplierSchema = createSupplierSchema.partial();

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;
