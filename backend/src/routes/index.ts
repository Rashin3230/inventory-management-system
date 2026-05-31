import { Router } from "express";

import authRoutes from "@/routes/auth.routes";
import healthRoutes from "@/routes/health.routes";
import dashboardRoutes from "@/routes/dashboard/dashboard.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
