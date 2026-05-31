import { authController } from "@/controllers/auth.controller";

export async function POST(request: Request) {
  return authController.login(request as import("next/server").NextRequest);
}
