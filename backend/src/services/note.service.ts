import { db } from "../db/index.ts";
import { eq } from "drizzle-orm";

import { notesTable } from "../db/schema.ts";

// Create New Note Service
export const createNoteService = async (noteData: any) => {
	const result = await db
		.insert(notesTable)
		.values({
			leadId: noteData.leadId,
			content: noteData.content,
			createdBy: noteData.createdBy,
		})
		.returning();
	return result;
};

// Get Notes for a Lead
export const getNotesByLeadIdService = async (leadId: number) => {
	const result = await db.select().from(notesTable).where(eq(notesTable.leadId, leadId));
	return result;
};

// Delete Note Service
export const deleteNoteService = async (noteId: number) => {
	const result = await db.delete(notesTable).where(eq(notesTable.id, noteId)).returning();

	if (result.length === 0) {
		throw new Error("Note not found");
	}
};

// Update Note Service
export const updateNoteService = async (noteId: number, noteData: any) => {
	const result = await db
		.update(notesTable)
		.set({
			content: noteData.content,
			updated_at: new Date(),
		})
		.where(eq(notesTable.id, noteId))
		.returning();
	if (result.length === 0) {
		throw new Error("Note not found");
	}
	return result;
};
