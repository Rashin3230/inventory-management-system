// TODO: Replace with live API data once Purchase and Sales modules are fully implemented.
// Used as fallback when backend returns empty chart datasets.

import type { DashboardCharts } from "@/types/dashboard";

export const MOCK_DASHBOARD_CHARTS: DashboardCharts = {
  inventoryValueByCategory: [
    { category: "Electronics", value: 45000 },
    { category: "Office Supplies", value: 12500 },
    { category: "Furniture", value: 28000 },
    { category: "Hardware", value: 18750 },
  ],
  monthlySalesTrend: [
    { month: "Jan 2026", amount: 12000 },
    { month: "Feb 2026", amount: 15500 },
    { month: "Mar 2026", amount: 14200 },
    { month: "Apr 2026", amount: 17800 },
    { month: "May 2026", amount: 16400 },
    { month: "Jun 2026", amount: 19200 },
  ],
  monthlyPurchaseTrend: [
    { month: "Jan 2026", amount: 8000 },
    { month: "Feb 2026", amount: 9500 },
    { month: "Mar 2026", amount: 11000 },
    { month: "Apr 2026", amount: 10200 },
    { month: "May 2026", amount: 12800 },
    { month: "Jun 2026", amount: 11500 },
  ],
};

export function withMockChartsIfEmpty(charts: DashboardCharts): {
  data: DashboardCharts;
  isMock: boolean;
} {
  const isEmpty =
    charts.inventoryValueByCategory.length === 0 &&
    charts.monthlySalesTrend.length === 0 &&
    charts.monthlyPurchaseTrend.length === 0;

  if (isEmpty) {
    return { data: MOCK_DASHBOARD_CHARTS, isMock: true };
  }

  const useMockSales = charts.monthlySalesTrend.length === 0;
  const useMockPurchases = charts.monthlyPurchaseTrend.length === 0;
  const useMockCategory = charts.inventoryValueByCategory.length === 0;

  if (useMockSales || useMockPurchases || useMockCategory) {
    return {
      data: {
        inventoryValueByCategory: useMockCategory
          ? MOCK_DASHBOARD_CHARTS.inventoryValueByCategory
          : charts.inventoryValueByCategory,
        monthlySalesTrend: useMockSales
          ? MOCK_DASHBOARD_CHARTS.monthlySalesTrend
          : charts.monthlySalesTrend,
        monthlyPurchaseTrend: useMockPurchases
          ? MOCK_DASHBOARD_CHARTS.monthlyPurchaseTrend
          : charts.monthlyPurchaseTrend,
      },
      isMock: true,
    };
  }

  return { data: charts, isMock: false };
}
