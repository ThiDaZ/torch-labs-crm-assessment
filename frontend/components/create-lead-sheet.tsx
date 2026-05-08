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
	SheetTrigger,
} from "@/components/ui/sheet";
import { Lead } from "@/lib/types";
import { createLead } from "@/lib/api/leads/leads";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function CreateLeadSheet() {
	const [leadName, setLeadName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [leadSource, setLeadSource] = useState("");
	const [assignedTo, setAssignedTo] = useState("");
	const [estimatedValue, setEstimatedValue] = useState("");
	const [open, setOpen] = useState(false);

	const queryClient = useQueryClient();
	const leadSources = ["website", "LinkedIn", "referral", "cold email", "event"];

	const salespeople = [
		{ id: "1", name: "Alice Johnson" },
	];

	const createLeadMutation = useMutation({
		mutationFn: async (newLead: Lead) => {
			return createLead(newLead);
		},
		onSuccess: () => {
			// Invalidate leads cache to refetch
			queryClient.invalidateQueries({ queryKey: ["leads"] });
			
			// reset form
			setLeadName("");
			setCompanyName("");
			setEmail("");
			setPhone("");
			setLeadSource("");
			setAssignedTo("");
			setEstimatedValue("");
			setOpen(false);
			toast.success("Lead created successfully");
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error(`Failed to create lead: ${error.message}`);
			} else {
				toast.error("Failed to create lead: An unknown error occurred");
			}
		},
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const payload: Lead = {
			leadName,
			companyName,
			email,
			phoneNumber: phone,
			leadSource: leadSource as Lead["leadSource"],
			dealValue: Number(estimatedValue) || 0,
			assignedSalespersonId: assignedTo,
		};

		createLeadMutation.mutate(payload);
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline">New Lead</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create Lead</SheetTitle>
					<SheetDescription>Fill out the form to add a new lead.</SheetDescription>
				</SheetHeader>

					<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 px-4">
					<div className="grid gap-2">
						<Label htmlFor="lead-name">Lead Name</Label>
						<Input id="lead-name" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="company-name">Company Name</Label>
						<Input
							id="company-name"
							value={companyName}
							onChange={(e) => setCompanyName(e.target.value)}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="phone">Phone Number</Label>
						<Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="lead-source">Lead Source</Label>
						<Select value={leadSource} onValueChange={(val) => setLeadSource(val)}>
							<SelectTrigger id="lead-source">
								<SelectValue placeholder="Select source" />
							</SelectTrigger>
						
							<SelectContent>
								{leadSources.map((s) => (
									<SelectItem key={s} value={s}>
										{s}
									</SelectItem>
								))}
							</SelectContent>
							</Select>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="assigned-to">Assigned Salesperson</Label>
						<Select value={assignedTo} onValueChange={(val) => setAssignedTo(val)}>
							<SelectTrigger id="assigned-to">
								<SelectValue placeholder="Select salesperson" />
							</SelectTrigger>
							<SelectContent>
								{salespeople.map((s) => (
									<SelectItem key={s.id} value={s.id}>
										{s.name}
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
							<Button variant="outline">Cancel</Button>
						</SheetClose>
						<Button type="submit" disabled={createLeadMutation.isPending}>
							{createLeadMutation.isPending ? "Creating..." : "Create Lead"}
						</Button>
					</div>
				</form>

				<SheetFooter />
			</SheetContent>
		</Sheet>
	);
}
