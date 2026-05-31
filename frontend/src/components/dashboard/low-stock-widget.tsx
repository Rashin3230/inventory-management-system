"use client";

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
import { useLowStockProducts } from "@/hooks/dashboard/use-dashboard";

export function LowStockWidget() {
  const { data, isLoading, isError, error } = useLowStockProducts();

  return (
    <Card className="col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
        <CardDescription>Products at or below minimum stock</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load low stock"}
          </p>
        )}

        {!isLoading && !isError && data?.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            All products are above minimum stock levels
          </p>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Current</TableHead>
                  <TableHead className="text-right">Minimum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.sku}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-destructive font-medium">
                      {product.currentStock}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {product.minimumStock}
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
