import { Router } from "express";
import { login, getCurrentUser, logout } from "../controller/auth.controller.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";

const router: Router = Router();
router.post("/login", login);
router.get("/me", requireAuth, getCurrentUser);
router.post("/logout", logout);

export default router;

