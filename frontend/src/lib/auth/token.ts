import { jwtVerify } from "jose";

import type { JwtPayload, UserRole } from "@/types";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured in frontend environment");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, getSecret(), {
    algorithms: ["HS256"],
  });

  if (!payload.sub || !payload.email || !payload.role || !payload.name) {
    throw new Error("Invalid token payload");
  }

  return {
    sub: payload.sub,
    email: String(payload.email),
    name: String(payload.name),
    role: payload.role as UserRole,
  };
}
