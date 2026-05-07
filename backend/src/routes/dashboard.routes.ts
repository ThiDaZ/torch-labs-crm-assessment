import { Router } from "express";
import { getLeadsCount } from "../controller/dashboard.controller.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";

const router = Router();
router.use(requireAuth);


router.get("/leads-count", getLeadsCount);

export default router;
