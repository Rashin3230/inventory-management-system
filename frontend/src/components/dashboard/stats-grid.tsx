"use client";

import {
  AlertTriangle,
  Boxes,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import { StatCard, StatCardSkeleton } from "@/components/dashboard/stat-card";
import { useDashboardSummary } from "@/hooks/dashboard/use-dashboard";
import { useRole } from "@/hooks/use-role";

export function StatsGrid() {
  const { data, isLoading, isError, error } = useDashboardSummary();
  const { isAdmin } = useRole();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {error instanceof Error ? error.message : "Failed to load statistics"}
      </div>
    );
  }

  const stats = [
    {
      label: "Total Products",
      value: data.totalProducts,
      description: "Active products in catalog",
      icon: Package,
    },
    {
      label: "Total Stock",
      value: data.totalStock,
      description: "Units across all products",
      icon: Boxes,
    },
    {
      label: "Low Stock Products",
      value: data.lowStockProducts,
      description: "At or below minimum level",
      icon: AlertTriangle,
    },
    {
      label: "Today's Purchases",
      value: data.todaysPurchases,
      description: "Purchase orders created today",
      icon: ShoppingCart,
      adminOnly: false,
    },
    {
      label: "Today's Sales",
      value: data.todaysSales,
      description: "Sales recorded today",
      icon: TrendingUp,
    },
    {
      label: "Inventory Value",
      value: data.inventoryValue,
      description: "Total stock value at cost",
      icon: DollarSign,
      isCurrency: true,
      adminOnly: true,
    },
  ];

  const visibleStats = stats.filter((s) => !s.adminOnly || isAdmin);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {visibleStats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          isCurrency={stat.isCurrency}
        />
      ))}
    </div>
  );
}
