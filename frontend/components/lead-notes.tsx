"use client";

import { Calendar, MessageSquare, Plus, Trash2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createNote, getNotesByLeadId, deleteNote } from "@/lib/api/notes/notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Note } from "@/lib/types";
import { formattedDate } from "@/lib/util/formattedDate";

export default function LeadNotes({ leadId }: { leadId: string }) {
	const [isAdding, setIsAdding] = useState(false);
	const [newNote, setNewNote] = useState("");

	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ["leadNotes", leadId],
		queryFn: () => getNotesByLeadId(leadId),
	});

	const createNoteMutation = useMutation({
		mutationFn: async (content: string) => {
			return createNote({ leadId, content });
		},
		onSuccess: () => {
			toast.success("Note added successfully");
			queryClient.invalidateQueries({ queryKey: ["leadNotes", leadId] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error(`Failed to add note: ${error.message}`);
			} else {
				toast.error("Failed to add note: An unknown error occurred");
			}
		},
	});

	const deleteNoteMutation = useMutation({
		mutationFn: async (noteId: number) => {
			return deleteNote(noteId);
		},
		onSuccess: () => {
			toast.success("Note deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["leadNotes", leadId] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error(`Failed to delete note: ${error.message}`);
			} else {
				toast.error("Failed to delete note: An unknown error occurred");
			}
		},
	});

	const handleAddNote = () => {
		const content = newNote.trim();
		if (!content) {
			toast.error("Note content cannot be empty");
			return;
		}

		createNoteMutation.mutate(content);
		setIsAdding(false);
		setNewNote("");
	};

	const handleDeleteNote = (noteId: number) => {
		deleteNoteMutation.mutate(noteId);
	};

	return (
		<Card className="bg-background" style={{ boxShadow: "0 0 rgba(0, 0, 0, 0.1)" }}>
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{/* <MessageSquare className="h-5 w-5 text-primary" /> */}
						<CardTitle className="text-3xl font-semibold text-foreground">
							Notes ({data?.length || 0})
						</CardTitle>
					</div>
					{!isAdding && (
						<Button className="gap-1" onClick={() => setIsAdding(true)}>
							<Plus className="h-4 w-4" />
							Add Note
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{isAdding && (
					<div className="p-4 rounded-lg border border-border bg-secondary/50 space-y-3">
						<Textarea
							placeholder="Write your note here..."
							value={newNote}
							onChange={(e) => setNewNote(e.target.value)}
							className="min-h-24 bg-background border-border resize-none"
						/>
						<div className="flex justify-end gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									setIsAdding(false);
									setNewNote("");
								}}
							>
								Cancel
							</Button>
							<Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
								Save Note
							</Button>
						</div>
					</div>
				)}

				{(data?.length ?? 0) === 0 && !isAdding ? (
					<div className="text-center py-8 text-muted-foreground">
						<MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-50" />
						<p>No notes yet. Add one to get started.</p>
					</div>
				) : (
					<div className="space-y-3">
						{(data ?? []).map((note: Note) => (
							<div
								key={note.id}
								className="p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors group"
							>
								<div className="flex items-start justify-between gap-3">
									<p className="text-sm text-foreground leading-relaxed flex-1">{note.content}</p>
									<Button
										variant="ghost"
										size="icon"
										className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
										onClick={() => handleDeleteNote(note.id)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
								<div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
									<div className="flex items-center gap-1">
										<User className="h-3 w-3" />
										<span>{note.createdByName}</span>
									</div>
									<div className="flex items-center gap-1">
										<Calendar className="h-3 w-3" />
										<span>{formattedDate(note.createdAt)}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
