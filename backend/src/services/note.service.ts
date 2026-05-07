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
