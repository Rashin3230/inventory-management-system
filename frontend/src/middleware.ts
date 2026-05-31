import { NextResponse, type NextRequest } from "next/server";

import { verifyToken } from "@/lib/auth/token";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";
import { isAdminRole } from "@/lib/auth/permissions";

const AUTH_ROUTES = ["/login"];
const ADMIN_ROUTES = ["/dashboard/users"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = pathname.startsWith("/dashboard");

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  let isAuthenticated = false;
  let userRole: string | null = null;

  if (token) {
    try {
      const payload = await verifyToken(token);
      isAuthenticated = true;
      userRole = payload.role;
    } catch {
      isAuthenticated = false;
    }
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    isAuthenticated &&
    userRole &&
    !isAdminRole(userRole as "admin" | "staff") &&
    ADMIN_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
