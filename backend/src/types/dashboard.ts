export interface DashboardSummary {
  totalProducts: number;
  totalStock: number;
  lowStockProducts: number;
  todaysPurchases: number;
  todaysSales: number;
  inventoryValue: number;
}

export interface RecentActivityItem {
  id: string;
  type: "purchase" | "sale" | "adjustment";
  product: string;
  quantity: number;
  user: string;
  date: string;
  referenceNumber?: string;
}

export interface LowStockProduct {
  _id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
}

export interface CategoryInventoryValue {
  category: string;
  value: number;
}

export interface MonthlyTrendPoint {
  month: string;
  amount: number;
}

export interface DashboardCharts {
  inventoryValueByCategory: CategoryInventoryValue[];
  monthlySalesTrend: MonthlyTrendPoint[];
  monthlyPurchaseTrend: MonthlyTrendPoint[];
}
