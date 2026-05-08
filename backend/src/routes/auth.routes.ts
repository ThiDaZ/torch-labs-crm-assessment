import { Router } from "express";
import { login } from "../controller/auth.controller.ts";

const router: Router = Router();
router.post("/login", login);

export default router;

