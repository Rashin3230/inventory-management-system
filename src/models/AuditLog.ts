import mongoose, { Schema, type Document, type Model, Types } from "mongoose";

export interface IAuditLog extends Document {
  userId: Types.ObjectId;
  action: string;
  module: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    action: {
      type: String,
      required: [true, "Action is required"],
      trim: true,
      index: true,
    },
    module: {
      type: String,
      required: [true, "Module is required"],
      trim: true,
      index: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ module: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ??
  mongoose.model<IAuditLog>("AuditLog", auditLogSchema);
