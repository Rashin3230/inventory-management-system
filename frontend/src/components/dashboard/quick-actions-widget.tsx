"use client";

import Link from "next/link";
import { Package, Plus, ShoppingCart, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { hasPermission } from "@/lib/auth/permissions";

const actions = [
  {
    label: "Add Product",
    href: "/dashboard/products/new",
    icon: Package,
    module: "products" as const,
    action: "create" as const,
  },
  {
    label: "Add Supplier",
    href: "/dashboard/suppliers/new",
    icon: Truck,
    module: "suppliers" as const,
    action: "create" as const,
  },
  {
    label: "Create Purchase",
    href: "/dashboard/purchases/new",
    icon: Plus,
    module: "purchases" as const,
    action: "create" as const,
  },
  {
    label: "Create Sale",
    href: "/dashboard/sales/new",
    icon: ShoppingCart,
    module: "sales" as const,
    action: "create" as const,
  },
];

export function QuickActionsWidget() {
  const { user } = useAuth();

  const visibleActions = actions.filter((item) =>
    hasPermission(user?.role, item.module, item.action),
  );

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get started quickly</CardDescription>
      </CardHeader>
      <CardContent>
        {visibleActions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No quick actions available for your role
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {visibleActions.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant="outline">
                    <Icon className="size-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
