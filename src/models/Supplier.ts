import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISupplier extends Document {
  supplierName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const supplierSchema = new Schema<ISupplier>(
  {
    supplierName: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
      maxlength: [200, "Supplier name cannot exceed 200 characters"],
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

supplierSchema.index({ supplierName: "text", email: "text" });
supplierSchema.index({ email: 1 });

export const Supplier: Model<ISupplier> =
  mongoose.models.Supplier ??
  mongoose.model<ISupplier>("Supplier", supplierSchema);
