"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecentActivity } from "@/hooks/dashboard/use-dashboard";
import { formatDate } from "@/utils/format";

const typeLabels = {
  purchase: "Purchase",
  sale: "Sale",
  adjustment: "Adjustment",
} as const;

const typeVariants = {
  purchase: "secondary" as const,
  sale: "default" as const,
  adjustment: "outline" as const,
};

export function RecentActivityWidget() {
  const { data, isLoading, isError, error } = useRecentActivity();

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest purchases, sales, and adjustments</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load activity"}
          </p>
        )}

        {!isLoading && !isError && data?.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No recent activity yet
          </p>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={`${item.type}-${item.id}`}>
                    <TableCell>
                      <Badge variant={typeVariants[item.type]}>
                        {typeLabels[item.type]}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(item.date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
