"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardShellProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
  sidebarCollapsed?: boolean;
}

export function DashboardShell({
  children,
  sidebar,
  header,
  sidebarCollapsed,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className={cn(
          "hidden shrink-0 transition-all duration-300 md:block",
          sidebarCollapsed ? "w-[72px]" : "w-64",
        )}
      >
        {sidebar}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        {header}
        <main className="flex-1 overflow-auto bg-muted/20 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export function DashboardPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
