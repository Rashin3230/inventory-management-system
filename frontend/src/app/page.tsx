import Link from "next/link";
import { Package, ShieldCheck, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/utils/constants";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Package className="size-5" />
            <span>{APP_NAME}</span>
          </div>
          <Link href="/login">
            <Button>Sign in</Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-medium text-muted-foreground">
              Phase 1 complete — foundation ready
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Manage inventory with clarity and control
            </h1>
            <p className="text-lg text-muted-foreground">
              Track products, purchases, sales, stock movements, and reports
              in one professional dashboard built with Next.js, MongoDB, and
              Shadcn UI.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <FeatureCard
              icon={<Package className="size-5" />}
              title="Product & Stock"
              description="CRUD products, monitor levels, and export inventory data."
            />
            <FeatureCard
              icon={<TrendingUp className="size-5" />}
              title="Purchases & Sales"
              description="Automatic stock updates with full movement history."
            />
            <FeatureCard
              icon={<ShieldCheck className="size-5" />}
              title="Role-based Access"
              description="Admin and staff roles with protected routes and audit logs."
            />
          </div>

          <div className="rounded-xl border bg-muted/40 p-6">
            <h2 className="font-semibold">Next steps</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                Copy <code className="rounded bg-muted px-1.5 py-0.5">.env.example</code>{" "}
                to <code className="rounded bg-muted px-1.5 py-0.5">.env.local</code>{" "}
                and add your MongoDB Atlas URI.
              </li>
              <li>
                Run <code className="rounded bg-muted px-1.5 py-0.5">npm run dev</code>{" "}
                and verify{" "}
                <code className="rounded bg-muted px-1.5 py-0.5">/api/health</code>.
              </li>
              <li>Confirm Phase 1, then we proceed to models and authentication.</li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
