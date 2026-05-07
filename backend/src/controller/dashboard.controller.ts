import type { Response } from "express";

import { getDashboardMetricsService } from "../services/dashboard.service.ts";
import type { AuthRequest } from "../middlewares/requireAuth.ts";

export const getDashboardMetrics = async (req: AuthRequest, res: Response) => {
	try {
		const result = await getDashboardMetricsService();
		res.status(200).json(result);
	} catch (error) {
		console.error("Error fetching dashboard metrics:", error);
		res.status(500).json({ error: "Failed to fetch dashboard metrics" });
	}
};
