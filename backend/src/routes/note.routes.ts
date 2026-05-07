import { Router } from "express";
import { createNote } from "../controller/note.controller.ts";

const router: Router = Router();

router.post("/", createNote);

export default router;