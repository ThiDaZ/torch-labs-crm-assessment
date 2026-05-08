"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { updateLead } from "@/lib/api/leads/leads";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Lead, LeadListItem } from "@/lib/types";

interface EditLeadSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	lead: LeadListItem | null;
}

const leadSources = ["website", "LinkedIn", "referral", "cold email", "event"] as const;

const salespeople = [
	{ id: "1", name: "Alice Johnson" },
	{ id: "2", name: "Bob Lee" },
	{ id: "3", name: "Carla Gomez" },
];

export function EditLeadSheet({ open, onOpenChange, lead }: EditLeadSheetProps) {
	const [leadName, setLeadName] = useState(lead?.leadName ?? "");
	const [companyName, setCompanyName] = useState(lead?.companyName ?? "");
	const [email, setEmail] = useState(lead?.email ?? "");
	const [phone, setPhone] = useState(lead?.phoneNumber ?? "");
	const [leadSource, setLeadSource] = useState<Lead["leadSource"] | "">(
		(lead?.leadSource as Lead["leadSource"]) ?? "",
	);
	const [assignedTo, setAssignedTo] = useState(lead?.assignedSalesperson?.id ?? "");
	const [estimatedValue, setEstimatedValue] = useState(lead ? String(lead.dealValue ?? "") : "");

	const queryClient = useQueryClient();

	const updateLeadMutation = useMutation({
		mutationFn: async (updatedLead: Partial<Lead>) => {
			if (!lead) {
				throw new Error("No lead selected for editing");
			}

			return updateLead(lead.id, updatedLead);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] });
			onOpenChange(false);
			toast.success("Lead updated successfully");
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error(`Failed to update lead: ${error.message}`);
			} else {
				toast.error("Failed to update lead: An unknown error occurred");
			}
		},
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!lead) {
			toast.error("No lead selected for editing");
			return;
		}

		const payload: Partial<Lead> = {
			leadName: leadName.trim(),
			companyName: companyName.trim(),
			email: email.trim(),
			phoneNumber: phone.trim(),
			leadSource: leadSource || undefined,
			dealValue: Number(estimatedValue) || 0,
			assignedSalespersonId: assignedTo,
		};

		updateLeadMutation.mutate(payload);
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit Lead</SheetTitle>
					<SheetDescription>Update the lead details and save your changes.</SheetDescription>
				</SheetHeader>

				<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 px-4">
					<div className="grid gap-2">
						<Label htmlFor="lead-name">Lead Name</Label>
						<Input id="lead-name" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="company-name">Company Name</Label>
						<Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="phone">Phone Number</Label>
						<Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="lead-source">Lead Source</Label>
						<Select value={leadSource} onValueChange={(val) => setLeadSource(val as Lead["leadSource"])}>
							<SelectTrigger id="lead-source">
								<SelectValue placeholder="Select source" />
							</SelectTrigger>
							<SelectContent>
								{leadSources.map((source) => (
									<SelectItem key={source} value={source}>
										{source}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="assigned-to">Assigned Salesperson</Label>
						<Select value={assignedTo} onValueChange={setAssignedTo}>
							<SelectTrigger id="assigned-to">
								<SelectValue placeholder="Select salesperson" />
							</SelectTrigger>
							<SelectContent>
								{salespeople.map((person) => (
									<SelectItem key={person.id} value={person.id}>
										{person.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="estimated-value">Estimated Deal Value</Label>
						<Input
							id="estimated-value"
							type="number"
							min={0}
							value={estimatedValue}
							onChange={(e) => setEstimatedValue(e.target.value)}
						/>
					</div>

					<div className="flex items-center justify-end gap-2 pt-4">
						<SheetClose asChild>
							<Button variant="outline" type="button">
								Cancel
							</Button>
						</SheetClose>
						<Button type="submit" disabled={updateLeadMutation.isPending || !lead}>
							{updateLeadMutation.isPending ? "Saving..." : "Save Changes"}
						</Button>
					</div>
				</form>

				<SheetFooter />
			</SheetContent>
		</Sheet>
	);
}
