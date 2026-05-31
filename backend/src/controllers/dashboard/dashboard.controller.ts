import type { Response, NextFunction } from "express";

import { dashboardService } from "@/services/dashboard/dashboard.service";
import type { AuthenticatedRequest } from "@/lib/auth/guard";

export class DashboardController {
  async getSummary(
    _req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await dashboardService.getSummary();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getRecentActivity(
    _req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await dashboardService.getRecentActivity(10);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getLowStock(
    _req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await dashboardService.getLowStockProducts(10);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getCharts(
    _req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await dashboardService.getCharts();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();
