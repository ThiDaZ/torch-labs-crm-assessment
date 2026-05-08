"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import {
	Building2,
	DollarSign,
	GripVertical,
	MessageSquare,
	MoreHorizontal,
	Pencil,
	Trash2,
	User,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { getLeads, updateStatus, deleteLead } from "@/lib/api/leads/leads";
import { toast } from "sonner";
import type { LeadListItem } from "@/lib/types";
import { EditLeadSheet } from "../edit-lead-sheet";
import DeleteLeadDialog from "../delete-lead-dialog";

interface Lead {
	id: string;
	name: string;
	companyName?: string;
	email: string;
	phoneNumber: string;
	leadSource: string;
	status: string;
	dealValue: number;
	assignedSalesperson?: string;
	notes?: number;
}

interface Column {
	id: string;
	title: string;
	lead: Lead[];
	color?: string;
}

const columnColors: Record<string, string> = {
	new: "#8B7355",
	contacted: "#6B8E23",
	qualified: "#CD853F",
	"proposal-sent": "#556B2F",
	won: "#2d5016",
	lost: "#8b0000",
};

export default function KanbanBoard() {
	const [openMenuId, setOpenMenuId] = useState<string | null>(null);
	const [openEditSheet, setOpenEditSheet] = useState(false);
	const [selectedLeadForEdit, setSelectedLeadForEdit] = useState<LeadListItem | null>(null);
	const [editSheetKey, setEditSheetKey] = useState(0);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [selectedLeadForDelete, setSelectedLeadForDelete] = useState<LeadListItem | null>(null);

	const queryClient = useQueryClient();

  //get leads data
	const { data: leadsData = [], isLoading, isError } = useQuery({
		queryKey: ["leads"],
		queryFn: getLeads,
	});

	// update status mutation with cache invalidation
	const updateStatusMutation = useMutation({
		mutationFn: ({ leadId, newStatus }: { leadId: string; newStatus: string }) =>
			updateStatus(leadId, newStatus),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error(`Failed to update status: ${error.message}`);
			} else {
				toast.error("Failed to update status");
			}
		},
	});

	// delete lead mutation with cache invalidation
	const deleteLeadMutation = useMutation({
		mutationFn: (leadId: string) => deleteLead(leadId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] });
			setOpenDeleteDialog(false);
			toast.success("Lead deleted successfully");
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error(`Failed to delete lead: ${error.message}`);
			} else {
				toast.error("Failed to delete lead");
			}
		},
	});

  // transform leads data into columns for the Kanban board
	const columns: Column[] = useMemo(() => {
		const groupedByStatus: Record<string, Lead[]> = {
			"new": [],
			"contacted": [],
			"qualified": [],
			"proposal-sent": [],
			"won": [],
			"lost": [],
		};


		const statusMap: Record<string, string> = {
			New: "new",
			Contacted: "contacted",
			Qualified: "qualified",
			"Proposal Sent": "proposal-sent",
			Won: "won",
			Lost: "lost",
		};

    // group leads by status and map to the format needed for the board
		leadsData.forEach((lead: LeadListItem) => {
			const status = statusMap[lead.status] ?? "new";
			if (groupedByStatus[status]) {
				groupedByStatus[status].push({
					id: String(lead.id),
					name: lead.leadName,
					companyName: lead.companyName || "",
					email: lead.email,
					phoneNumber: lead.phoneNumber,
					leadSource: lead.leadSource,
					status: lead.status,
					assignedSalesperson: lead.assignedSalesperson?.name || "Unassigned",
					dealValue: lead.dealValue,
				});
			}
		});

		return [
			{ id: "new", title: "New", lead: groupedByStatus.new, color: columnColors.new },
			{ id: "contacted", title: "Contacted", lead: groupedByStatus.contacted, color: columnColors.contacted },
			{ id: "qualified", title: "Qualified", lead: groupedByStatus.qualified, color: columnColors.qualified },
			{ id: "proposal-sent", title: "Proposal Sent", lead: groupedByStatus["proposal-sent"], color: columnColors["proposal-sent"] },
			{ id: "won", title: "Won", lead: groupedByStatus.won, color: columnColors.won },
			{ id: "lost", title: "Lost", lead: groupedByStatus.lost, color: columnColors.lost },
		];
	}, [leadsData]);

	const handleDragStart = (e: React.DragEvent, task: Lead, columnId: string) => {
		e.dataTransfer.setData("text/plain", JSON.stringify({ task, sourceColumnId: columnId }));
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const openEditDialog = (lead: LeadListItem) => {
		setSelectedLeadForEdit(lead);
		setEditSheetKey((current) => current + 1);
		setOpenEditSheet(true);
	};

	const openDeleteDialogFn = (lead: LeadListItem) => {
		setSelectedLeadForDelete(lead);
		setOpenDeleteDialog(true);
	};

	const handleDeleteLeadConfirm = () => {
		if (selectedLeadForDelete?.id) {
			deleteLeadMutation.mutate(String(selectedLeadForDelete.id));
		}
	};

	const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
		e.preventDefault();
		const data = JSON.parse(e.dataTransfer.getData("text/plain"));
		const { task, sourceColumnId } = data;

		if (sourceColumnId === targetColumnId) return;

		// map column ID to backend status enum value
		const statusMap: Record<string, string> = {
			"new": "New",
			"contacted": "Contacted",
			"qualified": "Qualified",
			"proposal-sent": "Proposal Sent",
			"won": "Won",
			"lost": "Lost",
		};

		const newStatus = statusMap[targetColumnId];

		// use mutation to update status
		if (newStatus && task.id) {
			updateStatusMutation.mutate({ leadId: task.id, newStatus });
		}
	};

	return (
		<>
		<div className="flex flex-col ">
			{/* <div className="mb-8 text-center pt-6">
				<h1 className="text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-2">
					Lead Management
				</h1>
				<p className="text-neutral-700 dark:text-neutral-300">Drag and drop lead management</p>
			</div> */}

			{isLoading && (
				<div className="flex items-center justify-center flex-1">
					<p className="text-neutral-600 dark:text-neutral-400">Loading leads...</p>
				</div>
			)}

			{isError && (
				<div className="flex items-center justify-center flex-1">
					<p className="text-red-600 dark:text-red-400">Error loading leads. Please try again.</p>
				</div>
			)}

			{!isLoading && !isError && (
				<div className="overflow-x-auto flex-1">
					<div className="flex gap-6 p-6 items-start">
						{columns.map((column) => (
						<div
							key={column.id}
								className="min-w-[320px] shrink-0 bg-white/20 dark:bg-neutral-900/20 backdrop-blur-xl rounded-3xl p-5 border border-border dark:border-neutral-700/50"
							onDragOver={handleDragOver}
							onDrop={(e) => handleDrop(e, column.id)}
						>
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-3">
									<div
										className="w-4 h-4 rounded-full "
										style={{ backgroundColor: column.color }}
									/>
									<h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
										{column.title}
									</h3>
									<Badge className="bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border-neutral-200/50 dark:border-neutral-600/50">
										{column.lead.length}
									</Badge>
								</div>
							</div>

							<div className="space-y-4">
								{column.lead.map((lead) => (
									<div
										key={lead.id}
										draggable
										onDragStart={(e) => handleDragStart(e, lead, column.id)}
										className="bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-primary/50"
									>
										<div className="flex items-start justify-between gap-2">
											<div className="flex items-center gap-2 min-w-0">
												<GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
												<div className="min-w-0">
													<Link
														href={`/leads/${lead.id}`}
														className="font-medium text-foreground hover:text-primary truncate block"
													>
														{lead.name}
													</Link>
													<div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
														<Building2 className="h-3 w-3" />
														<span className="truncate">{lead.companyName}</span>
													</div>
												</div>
											</div>
											<div className="relative shrink-0">
												<Button
													variant="ghost"
													size="sm"
													className="h-6 w-6 p-0"
													onClick={() => setOpenMenuId(openMenuId === lead.id ? null : lead.id)}
												>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
												{openMenuId === lead.id && (
													<div className="absolute right-0 top-7 z-10 min-w-30 bg-card border border-border rounded-md shadow-lg py-1">
														<button
															className="w-full px-3 py-1.5 text-sm text-left hover:bg-secondary flex items-center gap-2 text-foreground"
															onClick={() => {
																const fullLead = leadsData.find((item) => String(item.id) === lead.id);
																if (fullLead) {
																	setOpenMenuId(null);
																	openEditDialog(fullLead);
																}
															}}
														>
															<Pencil className="h-3 w-3" />
															Edit
														</button>
														<button
															className="w-full px-3 py-1.5 text-sm text-left hover:bg-secondary flex items-center gap-2 text-destructive"
														onClick={() => {
															const fullLead = leadsData.find((item) => String(item.id) === lead.id);
															if (fullLead) {
																setOpenMenuId(null);
																openDeleteDialogFn(fullLead);
															}
														}}
														>
															<Trash2 className="h-3 w-3" />
															Delete
														</button>
													</div>
												)}
											</div>
										</div>

										<div className="mt-3">
											<div className="flex items-center gap-1 text-xs text-muted-foreground">
												<DollarSign className="h-3 w-3" />
												<span className="font-medium text-foreground">
													{lead.dealValue}
												</span>
											</div>
											<Separator className="bg-muted-foreground/30 mt-4 mb-2" />
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-1 text-xs text-muted-foreground">
													<User className="h-3 w-3" />
													<span className="truncate">{lead.assignedSalesperson}</span>
												</div>
												<div className="flex items-center gap-1 text-xs text-muted-foreground">
													<MessageSquare className="h-3 w-3" />
													<span>{lead.notes}</span>
												</div>
											</div>
										</div>
									</div>

								))}
							</div>
						</div>
					))}
				</div>
			</div>
			)}

		</div>

		<DeleteLeadDialog
			open={openDeleteDialog}
			onOpenChange={setOpenDeleteDialog}
			handleDeleteLead={handleDeleteLeadConfirm}
			isDeleting={deleteLeadMutation.isPending}
			data={{
				id: selectedLeadForDelete?.id ?? "",
				name: selectedLeadForDelete?.leadName ?? "",
				companyName: selectedLeadForDelete?.companyName ?? "",
			}}
		/>
      <EditLeadSheet key={editSheetKey} open={openEditSheet} onOpenChange={setOpenEditSheet} lead={selectedLeadForEdit} />
		</>
	);
}
