import mongoose, { Schema, type Document, type Model, Types } from "mongoose";

export interface IPurchaseItem extends Document {
  purchaseId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  costPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const purchaseItemSchema = new Schema<IPurchaseItem>(
  {
    purchaseId: {
      type: Schema.Types.ObjectId,
      ref: "Purchase",
      required: [true, "Purchase ID is required"],
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
      index: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    costPrice: {
      type: Number,
      required: [true, "Cost price is required"],
      min: [0, "Cost price cannot be negative"],
    },
  },
  { timestamps: true },
);

purchaseItemSchema.index({ purchaseId: 1, productId: 1 });

export const PurchaseItem: Model<IPurchaseItem> =
  mongoose.models.PurchaseItem ??
  mongoose.model<IPurchaseItem>("PurchaseItem", purchaseItemSchema);
