import { SignJWT, jwtVerify } from "jose";

import { env } from "@/lib/env";
import type { JwtPayload, UserRole } from "@/types";

const secret = new TextEncoder().encode(env.JWT_SECRET);

function parseExpiresIn(value: string): number {
  const match = value.match(/^(\d+)([smhd])$/);
  if (!match) {
    return 7 * 24 * 60 * 60;
  }

  const amount = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return amount;
    case "m":
      return amount * 60;
    case "h":
      return amount * 60 * 60;
    case "d":
      return amount * 24 * 60 * 60;
    default:
      return 7 * 24 * 60 * 60;
  }
}

export function getTokenMaxAge(): number {
  return parseExpiresIn(env.JWT_EXPIRES_IN);
}

export async function generateToken(payload: {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret, {
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
