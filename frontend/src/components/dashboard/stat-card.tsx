import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatNumber } from "@/utils/format";

interface StatCardProps {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
  isCurrency?: boolean;
}

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  isCurrency = false,
}: StatCardProps) {
  const displayValue = isCurrency ? formatCurrency(value) : formatNumber(value);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardDescription>{label}</CardDescription>
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-bold">{displayValue}</CardTitle>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  );
}
