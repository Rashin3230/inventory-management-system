import type { Request, Response, NextFunction } from "express";

import { connectDB } from "@/lib/mongodb";

export class HealthController {
  async check(_req: Request, res: Response, next: NextFunction) {
    try {
      await connectDB();
      res.json({
        success: true,
        data: {
          message: "Inventory Management System API is healthy",
          database: "connected",
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const healthController = new HealthController();
