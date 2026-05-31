import mongoose, { Schema, type Document, type Model } from "mongoose";

import { PRODUCT_STATUS } from "@/utils/constants";
import type { ProductStatus } from "@/types";

export interface IProduct extends Document {
  sku: string;
  name: string;
  category: string;
  description: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStock: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    unit: {
      type: String,
      required: [true, "Unit is required"],
      trim: true,
    },
    costPrice: {
      type: Number,
      required: [true, "Cost price is required"],
      min: [0, "Cost price cannot be negative"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: [0, "Selling price cannot be negative"],
    },
    currentStock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    minimumStock: {
      type: Number,
      default: 0,
      min: [0, "Minimum stock cannot be negative"],
    },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.ACTIVE,
      index: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", sku: "text", category: "text" });
productSchema.index({ currentStock: 1, minimumStock: 1 });
productSchema.index({ status: 1, category: 1 });

export const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", productSchema);
