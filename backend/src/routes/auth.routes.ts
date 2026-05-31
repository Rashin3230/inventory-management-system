import { Router } from "express";

import { authController } from "@/controllers/auth.controller";
import { requireAuth } from "@/lib/auth/guard";

const router = Router();

router.post("/login", authController.login.bind(authController));
router.get("/me", requireAuth, authController.me.bind(authController));
router.post("/logout", requireAuth, authController.logout.bind(authController));

export default router;
