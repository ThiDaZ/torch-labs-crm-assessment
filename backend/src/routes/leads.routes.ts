import { Router } from "express";
import { createLead, getLeadById, getLeads, updateLead } from "../controller/leads.controller.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";

const router: Router = Router();

router.use(requireAuth);

router.post("/", createLead);
router.get("/:id", getLeadById);
router.get("/", getLeads);
router.put("/:id", updateLead);

export default router;
