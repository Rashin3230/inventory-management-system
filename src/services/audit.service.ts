import { auditLogRepository } from "@/repositories/audit-log.repository";

export class AuditService {
  async log(
    userId: string,
    action: string,
    module: string,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    try {
      await auditLogRepository.create({
        userId,
        action,
        module,
        metadata,
      });
    } catch (error) {
      console.error("[AuditService] Failed to log action:", error);
    }
  }
}

export const auditService = new AuditService();
