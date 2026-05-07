import type { Response } from "express";

import { getTotalLeadsService } from "../services/dashboard.service.ts";
import type { AuthRequest } from "../middlewares/requireAuth.ts";

export const getLeadsCount = async (req: AuthRequest, res: Response) => {
	try {
		const result = await getTotalLeadsService();
		res.status(200).json({ count: result });
	} catch (error) {
		console.error("Error fetching leads count:", error);
		res.status(500).json({ error: "Failed to fetch leads count" });
	}
};
