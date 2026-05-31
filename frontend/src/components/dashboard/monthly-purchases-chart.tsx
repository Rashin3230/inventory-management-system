"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

export function MonthlyPurchasesChart() {
  const { data, isLoading, isError } = useDashboardCharts();

  if (isLoading) {
    return (
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <Skeleton className="h-5 w-44" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[280px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Monthly Purchase Trend</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-destructive">
          Failed to load chart data
        </CardContent>
      </Card>
    );
  }

  const chartData = data.data.monthlyPurchaseTrend;

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Monthly Purchase Trend</CardTitle>
        <CardDescription>
          Purchase spending over time
          {data.isMock && (
            <span className="ml-1 text-amber-600">
              {/* TODO: Integrate with Purchase module API when available */}
              (sample data)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No purchase data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar
                dataKey="amount"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
