import { authController } from "@/controllers/auth.controller";

export async function POST() {
  return authController.logout();
}
