"use client";

import { useState } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DashboardShell
      sidebarCollapsed={collapsed}
      sidebar={
        <DashboardSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />
      }
      header={<DashboardHeader />}
    >
      {children}
    </DashboardShell>
  );
}
