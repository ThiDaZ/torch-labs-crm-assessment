import { Router } from "express";

import { requireAuth } from "../middlewares/requireAuth.ts";
import { getAllUsers } from "../controller/user.controller.ts";

const router: Router = Router();
router.use(requireAuth);

router.get("/", getAllUsers);

export default router;