import type { ApiResponse } from "@/types";
import type {
  DashboardCharts,
  DashboardSummary,
  LowStockProduct,
  RecentActivityItem,
} from "@/types/dashboard";

async function fetchDashboard<T>(path: string): Promise<T> {
  const response = await fetch(`/api/dashboard/${path}`, {
    credentials: "include",
  });

  const data = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !data.data) {
    throw new Error(data.message ?? `Failed to fetch dashboard ${path}`);
  }

  return data.data;
}

export function getDashboardSummary() {
  return fetchDashboard<DashboardSummary>("summary");
}

export function getRecentActivity() {
  return fetchDashboard<RecentActivityItem[]>("recent-activity");
}

export function getLowStockProducts() {
  return fetchDashboard<LowStockProduct[]>("low-stock");
}

export function getDashboardCharts() {
  return fetchDashboard<DashboardCharts>("charts");
}
