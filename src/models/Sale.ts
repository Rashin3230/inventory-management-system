import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISale extends Document {
  salesNumber: string;
  customerName: string;
  totalAmount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const saleSchema = new Schema<ISale>(
  {
    salesNumber: {
      type: String,
      required: [true, "Sales number is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    date: {
      type: Date,
      required: [true, "Sale date is required"],
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true },
);

saleSchema.index({ date: -1 });
saleSchema.index({ customerName: 1 });

export const Sale: Model<ISale> =
  mongoose.models.Sale ?? mongoose.model<ISale>("Sale", saleSchema);
