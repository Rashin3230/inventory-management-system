"use client";

import { ThemeProvider } from "next-themes";

import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryProvider>{children}</QueryProvider>
      <Toaster richColors closeButton position="top-right" />
    </ThemeProvider>
  );
}
