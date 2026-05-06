import { Router } from "express";
import { createLead } from "../controller/leads.controller.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";

const router: Router = Router();

router.use(requireAuth);

router.post("/", createLead);

export default router;
