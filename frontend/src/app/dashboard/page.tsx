"use client";

import { useAuth } from "@/hooks/use-auth";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { InventoryValueChart } from "@/components/dashboard/inventory-value-chart";
import { MonthlySalesChart } from "@/components/dashboard/monthly-sales-chart";
import { MonthlyPurchasesChart } from "@/components/dashboard/monthly-purchases-chart";
import { RecentActivityWidget } from "@/components/dashboard/recent-activity-widget";
import { LowStockWidget } from "@/components/dashboard/low-stock-widget";
import { QuickActionsWidget } from "@/components/dashboard/quick-actions-widget";
import { DashboardPageSkeleton } from "@/components/dashboard/dashboard-shell";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <DashboardPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back{user ? `, ${user.name}` : ""}. Here&apos;s your inventory
          overview.
        </p>
      </div>

      <StatsGrid />

      <div className="grid gap-4 lg:grid-cols-3">
        <InventoryValueChart />
        <MonthlySalesChart />
        <MonthlyPurchasesChart />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <RecentActivityWidget />
        <LowStockWidget />
      </div>

      <QuickActionsWidget />
    </div>
  );
}
