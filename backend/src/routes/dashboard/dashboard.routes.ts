import { Router } from "express";

import { dashboardController } from "@/controllers/dashboard/dashboard.controller";
import { requireAuth } from "@/lib/auth/guard";

const router = Router();

router.use(requireAuth);

router.get(
  "/summary",
  dashboardController.getSummary.bind(dashboardController),
);
router.get(
  "/recent-activity",
  dashboardController.getRecentActivity.bind(dashboardController),
);
router.get("/low-stock", dashboardController.getLowStock.bind(dashboardController));
router.get("/charts", dashboardController.getCharts.bind(dashboardController));

export default router;
