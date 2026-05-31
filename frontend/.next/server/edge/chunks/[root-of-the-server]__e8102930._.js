(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__e8102930._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/frontend/src/lib/auth/token.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [middleware-edge] (ecmascript)");
;
function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured in frontend environment");
    }
    return new TextEncoder().encode(secret);
}
async function verifyToken(token) {
    const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, getSecret(), {
        algorithms: [
            "HS256"
        ]
    });
    if (!payload.sub || !payload.email || !payload.role || !payload.name) {
        throw new Error("Invalid token payload");
    }
    return {
        sub: payload.sub,
        email: String(payload.email),
        name: String(payload.name),
        role: payload.role
    };
}
}),
"[project]/frontend/src/lib/auth/constants.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_COOKIE_NAME",
    ()=>AUTH_COOKIE_NAME
]);
const AUTH_COOKIE_NAME = "access_token";
}),
"[project]/frontend/src/lib/auth/permissions.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasPermission",
    ()=>hasPermission,
    "isAdminRole",
    ()=>isAdminRole
]);
const ROLE_PERMISSIONS = {
    admin: {
        products: [
            "create",
            "read",
            "update",
            "delete"
        ],
        suppliers: [
            "create",
            "read",
            "update",
            "delete"
        ],
        purchases: [
            "create",
            "read",
            "update",
            "delete"
        ],
        sales: [
            "create",
            "read",
            "update",
            "delete"
        ],
        inventory: [
            "read",
            "export"
        ],
        reports: [
            "read",
            "export"
        ],
        users: [
            "create",
            "read",
            "update",
            "delete"
        ]
    },
    staff: {
        products: [
            "read"
        ],
        suppliers: [
            "read"
        ],
        purchases: [
            "create",
            "read"
        ],
        sales: [
            "create",
            "read"
        ],
        inventory: [
            "read",
            "export"
        ],
        reports: [
            "read"
        ],
        users: []
    }
};
function hasPermission(role, module, action) {
    if (!role) return false;
    return ROLE_PERMISSIONS[role][module]?.includes(action) ?? false;
}
function isAdminRole(role) {
    return role === "admin";
}
}),
"[project]/frontend/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2f$token$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/auth/token.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/auth/constants.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2f$permissions$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/auth/permissions.ts [middleware-edge] (ecmascript)");
;
;
;
;
const AUTH_ROUTES = [
    "/login"
];
const ADMIN_ROUTES = [
    "/dashboard/users"
];
async function middleware(request) {
    const { pathname } = request.nextUrl;
    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isProtectedRoute = pathname.startsWith("/dashboard");
    const token = request.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AUTH_COOKIE_NAME"])?.value;
    let isAuthenticated = false;
    let userRole = null;
    if (token) {
        try {
            const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2f$token$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["verifyToken"])(token);
            isAuthenticated = true;
            userRole = payload.role;
        } catch  {
            isAuthenticated = false;
        }
    }
    if (isAuthenticated && isAuthRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
    }
    if (isAuthenticated && userRole && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2f$permissions$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isAdminRole"])(userRole) && ADMIN_ROUTES.some((route)=>pathname.startsWith(route))) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/dashboard/:path*",
        "/login"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__e8102930._.js.map