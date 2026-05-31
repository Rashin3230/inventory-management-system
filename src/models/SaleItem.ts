import mongoose, { Schema, type Document, type Model, Types } from "mongoose";

export interface ISaleItem extends Document {
  saleId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  sellingPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const saleItemSchema = new Schema<ISaleItem>(
  {
    saleId: {
      type: Schema.Types.ObjectId,
      ref: "Sale",
      required: [true, "Sale ID is required"],
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
    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: [0, "Selling price cannot be negative"],
    },
  },
  { timestamps: true },
);

saleItemSchema.index({ saleId: 1, productId: 1 });

export const SaleItem: Model<ISaleItem> =
  mongoose.models.SaleItem ??
  mongoose.model<ISaleItem>("SaleItem", saleItemSchema);
