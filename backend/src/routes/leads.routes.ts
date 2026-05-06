import { Router } from "express";
import {
	changeLeadStatus,
	createLead,
	deleteLead,
	getLeadById,
	getLeads,
	searchLeads,
	updateLead,
} from "../controller/leads.controller.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";

const router: Router = Router();

router.use(requireAuth);

router.get("/search", searchLeads);
router.post("/", createLead);
router.get("/:id", getLeadById);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);
router.patch("/:id", changeLeadStatus);

export default router;
