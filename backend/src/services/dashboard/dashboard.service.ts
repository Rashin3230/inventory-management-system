import { connectDB } from "@/lib/mongodb";
import { dashboardRepository } from "@/repositories/dashboard/dashboard.repository";
import type {
  DashboardCharts,
  DashboardSummary,
  LowStockProduct,
  RecentActivityItem,
} from "@/types/dashboard";

export class DashboardService {
  async getSummary(): Promise<DashboardSummary> {
    await connectDB();
    return dashboardRepository.getSummary();
  }

  async getRecentActivity(limit = 10): Promise<RecentActivityItem[]> {
    await connectDB();
    return dashboardRepository.getRecentActivity(limit);
  }

  async getLowStockProducts(limit = 10): Promise<LowStockProduct[]> {
    await connectDB();
    return dashboardRepository.getLowStockProducts(limit);
  }

  async getCharts(): Promise<DashboardCharts> {
    await connectDB();
    return dashboardRepository.getCharts();
  }
}

export const dashboardService = new DashboardService();
