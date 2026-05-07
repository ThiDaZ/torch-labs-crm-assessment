import type { AuthRequest } from "../middlewares/requireAuth.ts";
import type { Response } from "express";
import { createNoteService } from "../services/note.service.ts";

export const createNote = async (req: AuthRequest, resp: Response) => {
	try {
		const noteData = req.body;
		if (!noteData) {
			resp.status(400).json({ message: "Request body is empty" });
			return;
		}
		const result = await createNoteService(noteData);
		resp.status(201).json({ message: "Note created successfully", note: result });
	} catch (error) {
		resp.status(500).json({ message: "Error creating note" });
	}
};
