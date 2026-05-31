import mongoose, { Schema, type Document, type Model, Types } from "mongoose";

import { STOCK_MOVEMENT_TYPES } from "@/utils/constants";
import type { StockMovementType } from "@/types";

export interface IStockMovement extends Document {
  productId: Types.ObjectId;
  type: StockMovementType;
  quantity: number;
  beforeStock: number;
  afterStock: number;
  referenceNumber: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const stockMovementSchema = new Schema<IStockMovement>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(STOCK_MOVEMENT_TYPES),
      required: [true, "Movement type is required"],
      index: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    beforeStock: {
      type: Number,
      required: [true, "Before stock is required"],
      min: [0, "Before stock cannot be negative"],
    },
    afterStock: {
      type: Number,
      required: [true, "After stock is required"],
      min: [0, "After stock cannot be negative"],
    },
    referenceNumber: {
      type: String,
      required: [true, "Reference number is required"],
      trim: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

stockMovementSchema.index({ productId: 1, createdAt: -1 });
stockMovementSchema.index({ type: 1, createdAt: -1 });
stockMovementSchema.index({ referenceNumber: 1 });

export const StockMovement: Model<IStockMovement> =
  mongoose.models.StockMovement ??
  mongoose.model<IStockMovement>("StockMovement", stockMovementSchema);
