import { Router } from "express";
import { createNote, getNotesByLeadId } from "../controller/note.controller.ts";

const router: Router = Router();

router.post("/", createNote);
router.get("/:leadId", getNotesByLeadId);

export default router;