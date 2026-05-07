import { Router } from "express";
import {
	createNote,
	deleteNote,
	getNotesByLeadId,
	updateNote,
} from "../controller/note.controller.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";

const router: Router = Router();
router.use(requireAuth);

router.post("/", createNote);
router.get("/:leadId", getNotesByLeadId);
router.put("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);

export default router;
