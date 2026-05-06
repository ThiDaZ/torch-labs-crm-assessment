import { Router } from "express";
import { createLead, getLeadById, getLeads } from "../controller/leads.controller.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";

const router: Router = Router();

router.use(requireAuth);

router.post("/", createLead);
router.get("/:id", getLeadById);
router.get("/", getLeads);

export default router;
