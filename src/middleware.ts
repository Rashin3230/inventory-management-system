import { NextResponse, type NextRequest } from "next/server";

import { verifyToken } from "@/lib/auth/token";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";
import { isAdminRole } from "@/lib/auth/permissions";

const PUBLIC_ROUTES = ["/", "/login"];
const AUTH_ROUTES = ["/login"];
const ADMIN_ROUTE_PREFIX = "/dashboard/adjustments";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/api/auth/login");

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isProtectedApi =
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/health") &&
    !pathname.startsWith("/api/auth/login");

  const token =
    request.cookies.get(AUTH_COOKIE_NAME)?.value ??
    request.headers.get("authorization")?.replace("Bearer ", "");

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

  if ((isProtectedRoute || isProtectedApi) && !isAuthenticated) {
    if (isProtectedApi) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    isAuthenticated &&
    pathname.startsWith(ADMIN_ROUTE_PREFIX) &&
    userRole &&
    !isAdminRole(userRole as "admin" | "staff")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/api/:path*",
  ],
};
