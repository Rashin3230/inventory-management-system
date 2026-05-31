import { authController } from "@/controllers/auth.controller";

export async function GET() {
  return authController.me();
}
