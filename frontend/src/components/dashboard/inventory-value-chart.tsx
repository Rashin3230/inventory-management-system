"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardCharts } from "@/hooks/dashboard/use-dashboard";
import { formatCurrency } from "@/utils/format";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function InventoryValueChart() {
  const { data, isLoading, isError } = useDashboardCharts();

  if (isLoading) {
    return (
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="mx-auto size-48 rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Inventory Value by Category</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-destructive">
          Failed to load chart data
        </CardContent>
      </Card>
    );
  }

  const chartData = data.data.inventoryValueByCategory;

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Inventory Value by Category</CardTitle>
        <CardDescription>
          Stock value distribution
          {data.isMock && (
            <span className="ml-1 text-amber-600">
              {/* TODO: Remove mock data when products are seeded via Product module */}
              (sample data)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No inventory data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ category }) => category}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
