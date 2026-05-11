import { Note } from "@/lib/types";

// Get note by lead ID API call
export const getNotesByLeadId = async (leadId: string) => {
	const response = await fetch(`/api/note/${leadId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to fetch notes";
		throw new Error(errorMessage);
	}
	const data: { notes?: Note[] } = await response.json();
	return data.notes ?? [];
};

// Create new note API call
export const createNote = async (noteData: { leadId: string; content: string }) => {
	const response = await fetch(`/api/note`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(noteData),
		credentials: "include",
	});
	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to create note";
		throw new Error(errorMessage);
	}
	return response.json();
};

// Delete note API call
export const deleteNote = async (noteId: number) => {
	const response = await fetch(`/api/note/${noteId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to delete note";
		throw new Error(errorMessage);
	}
};

// Update note API call
export const updateNote = async (noteId: number, content: string) => {
	const response = await fetch(`/api/note/${noteId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ content }),
		credentials: "include",
	});
	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to update note";
		throw new Error(errorMessage);
	}
	return response.json();
};
