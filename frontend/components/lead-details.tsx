"use client";

import { useState } from "react";
import {
	Building2,
	Calendar,
	Clock,
	DollarSign,
	Globe,
	Mail,
	Pencil,
	Phone,
	User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getLeadById } from "@/lib/api/leads/leads";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/auth/me";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { EditLeadSheet } from "./edit-lead-sheet";

function formatCurrency(value: number) {
	return new Intl.NumberFormat("en-LK", {
		style: "currency",
		currency: "LKR",
		maximumFractionDigits: 2,
	}).format(value);
}

function formatDate(value: string | null | undefined) {
	if (!value) {
		return "N/A";
	}

	const parsedDate = new Date(value);
	return Number.isNaN(parsedDate.getTime())
		? "N/A"
		: parsedDate.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
}

export function LeadDetailClient({ leadId }: { leadId: string }) {
	const [isEditing, setIsEditing] = useState(false);

	const { data: leadDetail, isLoading, isError, error } = useQuery({
		queryKey: ["lead", leadId],
		queryFn: () => getLeadById(leadId),
		enabled: Boolean(leadId),
	});

	const { data: me } = useQuery({ queryKey: ["me"], queryFn: getCurrentUser });

	if (isLoading) {
		return (
			<Card className="bg-card border-border">
				<CardContent className="p-6 text-sm text-muted-foreground">Loading lead details...</CardContent>
			</Card>
		);
	}

	if (isError) {
		return (
			<Card className="bg-card border-border">
				<CardContent className="p-6 text-sm text-destructive">
					{error instanceof Error ? error.message : "Failed to load lead details"}
				</CardContent>
			</Card>
		);
	}

	if (!leadDetail) {
		return (
			<Card className="bg-card border-border">
				<CardContent className="p-6 text-sm text-muted-foreground">Lead not found.</CardContent>
			</Card>
		);
	}

	const leadForEdit = {
		id: leadDetail.id,
		leadName: leadDetail.leadName,
		companyName: leadDetail.companyName,
		email: leadDetail.email,
		phoneNumber: leadDetail.phoneNumber,
		leadSource: leadDetail.leadSource,
		status: leadDetail.status,
		dealValue: leadDetail.dealValue,
		assignedSalesperson: leadDetail.assignedSalesperson,
		createdAt: leadDetail.createdAt,
		updatedAt: leadDetail.updatedAt ?? leadDetail.createdAt,
	};

	return (
		<>
			<Card className="bg-card border-border">
				<CardHeader className="pb-4">
					<div className="flex items-start justify-between">
						<div>
							<CardTitle className="text-2xl font-semibold text-foreground">
								{leadDetail.leadName}
							</CardTitle>
							<div className="flex items-center gap-2 mt-1 text-muted-foreground">
								<Building2 className="h-4 w-4" />
								<span>{leadDetail.companyName}</span>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Badge variant="outline">{leadDetail.status}</Badge>
							<Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
								<Pencil className="h-4 w-4 mr-1" />
								Edit
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
								Contact Information
							</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary">
										<Mail className="h-4 w-4 text-muted-foreground" />
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Email</p>
										{leadDetail.email}
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary">
										<Phone className="h-4 w-4 text-muted-foreground" />
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Phone</p>
										{leadDetail.phoneNumber}
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary">
										<Globe className="h-4 w-4 text-muted-foreground" />
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Lead Source</p>
										<p className="text-sm text-foreground">{leadDetail.leadSource}</p>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
								Deal Information
							</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary">
										<DollarSign className="h-4 w-4 text-muted-foreground" />
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Estimated Deal Value</p>
										<p className="text-sm font-medium text-success">
											{formatCurrency(leadDetail.dealValue)}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary">
										<User className="h-4 w-4 text-muted-foreground" />
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Assigned Salesperson</p>
										<p className="text-sm text-foreground">{leadDetail.assignedSalesperson.name}</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="pt-4 border-t border-border">
						<div className="flex flex-wrap gap-6">
							<div className="flex items-center gap-2 text-sm">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span className="text-muted-foreground">Created:</span>
								<span className="text-foreground">{formatDate(leadDetail.createdAt)}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span className="text-muted-foreground">Last Updated:</span>
								<span className="text-foreground">{formatDate(leadDetail.updatedAt)}</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<EditLeadSheet open={isEditing} onOpenChange={setIsEditing} lead={leadForEdit} />
		</>
	);
}
