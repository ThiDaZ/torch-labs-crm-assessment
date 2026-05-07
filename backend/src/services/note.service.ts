import { db } from "../db/index.ts";
import { notesTable } from "../db/schema.ts";

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
