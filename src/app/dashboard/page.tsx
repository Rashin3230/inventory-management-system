"use client";

import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user ? `, ${user.name}` : ""}. Phase 3 will add metrics
          and charts here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Authenticated as</CardDescription>
            <CardTitle>{user?.name ?? "—"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <Badge className="mt-2 capitalize">{user?.role}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Account status</CardDescription>
            <CardTitle>{user?.isActive ? "Active" : "Inactive"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              JWT authentication and role-based access are configured.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Next phase</CardDescription>
            <CardTitle>Phase 3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Dashboard metrics, charts, and low-stock alerts coming next.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
