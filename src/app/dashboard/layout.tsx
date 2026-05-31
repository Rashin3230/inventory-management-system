import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto bg-muted/20 p-6">{children}</main>
    </div>
  );
}
