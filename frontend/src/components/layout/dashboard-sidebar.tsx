"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRole } from "@/hooks/use-role";
import { APP_NAME } from "@/utils/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/suppliers", label: "Suppliers", icon: Truck },
  { href: "/dashboard/purchases", label: "Purchases", icon: ShoppingCart },
  { href: "/dashboard/sales", label: "Sales", icon: ShoppingCart },
  { href: "/dashboard/inventory", label: "Inventory", icon: Warehouse },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function DashboardSidebar({
  collapsed,
  onToggle,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { isAdmin } = useRole();

  const visibleNav = navItems.filter(
    (item) => !item.adminOnly || isAdmin,
  );

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-card",
        collapsed ? "w-[72px]" : "w-64",
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-3">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Package className="size-5 shrink-0" />
            <span className="truncate text-sm">{APP_NAME}</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <Package className="size-5" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggle}
          className={cn("hidden shrink-0 md:inline-flex", collapsed && "mx-auto")}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {visibleNav.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export { navItems };
