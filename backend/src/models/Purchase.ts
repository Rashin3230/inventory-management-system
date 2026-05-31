import mongoose, { Schema, type Document, type Model, Types } from "mongoose";

export interface IPurchase extends Document {
  purchaseNumber: string;
  supplier: Types.ObjectId;
  totalAmount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const purchaseSchema = new Schema<IPurchase>(
  {
    purchaseNumber: {
      type: String,
      required: [true, "Purchase number is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Supplier is required"],
      index: true,
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    date: {
      type: Date,
      required: [true, "Purchase date is required"],
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true },
);

purchaseSchema.index({ date: -1 });
purchaseSchema.index({ supplier: 1, date: -1 });

export const Purchase: Model<IPurchase> =
  mongoose.models.Purchase ??
  mongoose.model<IPurchase>("Purchase", purchaseSchema);
