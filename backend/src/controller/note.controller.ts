import type { AuthRequest } from "../middlewares/requireAuth.ts";
import type { Response } from "express";
import { createNoteService, getNotesByLeadIdService } from "../services/note.service.ts";

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

export const getNotesByLeadId = async (req: AuthRequest, resp: Response) => {
	try {
		const leadId = Number(req.params.leadId);
		if (isNaN(leadId)) {
			resp.status(400).json({ message: "Invalid lead ID" });
			return;
		}
		const result = await getNotesByLeadIdService(leadId);
		resp.status(200).json({ notes: result });
	} catch (error) {
		resp.status(500).json({ message: "Error fetching notes" });
	}
};
