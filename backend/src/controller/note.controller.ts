import type { AuthRequest } from "../middlewares/requireAuth.ts";
import type { Response } from "express";
import {
	createNoteService,
	deleteNoteService,
	getNotesByLeadIdService,
	updateNoteService,
} from "../services/note.service.ts";

// Create Note API
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

// Get Notes for a Lead API
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

// Delete Note API
export const deleteNote = async (req: AuthRequest, resp: Response) => {
	try {
		const noteId = Number(req.params.noteId);
		if (isNaN(noteId)) {
			resp.status(400).json({ message: "Invalid note ID" });
			return;
		}
		await deleteNoteService(noteId);
		resp.status(200).json({ message: "Note deleted successfully" });
	} catch (error) {
		if (error instanceof Error) {
			resp.status(404).json({ message: error.message });
		} else {
			resp.status(500).json({ message: "Error deleting note" });
		}
	}
};

// Update Note API
export const updateNote = async (req: AuthRequest, resp: Response) => {
	try {
		const noteId = Number(req.params.noteId);
		if (isNaN(noteId)) {
			resp.status(400).json({ message: "Invalid note ID" });
			return;
		}

		const noteData = req.body;
		if (!noteData) {
			resp.status(400).json({ message: "Request body is empty" });
			return;
		}

		const result = await updateNoteService(noteId, noteData);
		resp.status(200).json({ message: "Note updated successfully", note: result });
	} catch (error) {
		if (error instanceof Error) {
			resp.status(404).json({ message: error.message });
		} else {
			resp.status(500).json({ message: "Error updating note" });
		}
	}
};
