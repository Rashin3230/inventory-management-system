"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { APP_NAME } from "@/utils/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/suppliers", label: "Suppliers", icon: Truck },
  { href: "/dashboard/purchases", label: "Purchases", icon: ShoppingCart },
  { href: "/dashboard/sales", label: "Sales", icon: ShoppingCart },
  { href: "/dashboard/inventory", label: "Inventory", icon: Warehouse },
  { href: "/dashboard/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/dashboard/adjustments", label: "Adjustments", icon: Settings, adminOnly: true },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout, isLoggingOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const visibleNav = navItems.filter(
    (item) => !item.adminOnly || user?.role === "admin",
  );

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <Package className="size-5" />
        <span className="font-semibold">{APP_NAME}</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {visibleNav.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        {user && (
          <div className="mb-3 space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <Badge variant="secondary" className="capitalize">
              {user.role}
            </Badge>
          </div>
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="size-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </aside>
  );
}
