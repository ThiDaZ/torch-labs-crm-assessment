import { Router } from "express";
import { getDashboardMetrics } from "../controller/dashboard.controller.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";

const router = Router();
router.use(requireAuth);


router.get("/dashboard-metrics", getDashboardMetrics);

export default router;
