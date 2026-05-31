"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardCharts,
  getDashboardSummary,
  getLowStockProducts,
  getRecentActivity,
} from "@/services/dashboard/dashboard.service";
import { withMockChartsIfEmpty } from "@/services/dashboard/mock-charts";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ["dashboard", "recent-activity"],
    queryFn: getRecentActivity,
  });
}

export function useLowStockProducts() {
  return useQuery({
    queryKey: ["dashboard", "low-stock"],
    queryFn: getLowStockProducts,
  });
}

export function useDashboardCharts() {
  return useQuery({
    queryKey: ["dashboard", "charts"],
    queryFn: async () => {
      const charts = await getDashboardCharts();
      return withMockChartsIfEmpty(charts);
    },
  });
}
