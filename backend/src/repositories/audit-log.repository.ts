import { AuditLog } from "@/models/AuditLog";
import type { Types } from "mongoose";

interface AuditLogInput {
  userId: Types.ObjectId | string;
  action: string;
  module: string;
  metadata?: Record<string, unknown>;
}

export class AuditLogRepository {
  async create(data: AuditLogInput) {
    return AuditLog.create({
      userId: data.userId,
      action: data.action,
      module: data.module,
      metadata: data.metadata ?? {},
    });
  }

  async findByUser(userId: string, limit = 50) {
    return AuditLog.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("userId", "name email role")
      .exec();
  }
}

export const auditLogRepository = new AuditLogRepository();
