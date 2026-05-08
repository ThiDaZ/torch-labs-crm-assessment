"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { searchLeads } from "@/lib/api/leads/leads";
import { getAllUsers } from "@/lib/api/users/users";
import type { LeadListItem, User } from "@/lib/types";

export default function Search({ onFilter }: { onFilter?: (leads: LeadListItem[]) => void }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [filterSource, setFilterSource] = useState("all");
	const [filterSalesperson, setFilterSalesperson] = useState("all");

	const leadSources = ["Website", "LinkedIn", "Referral", "Cold Email"];
	const statusOptions = [
		{ label: "New", value: "New" },
		{ label: "Contacted", value: "Contacted" },
		{ label: "Qualified", value: "Qualified" },
		{ label: "Proposal Sent", value: "Proposal Sent" },
		{ label: "Won", value: "Won" },
		{ label: "Lost", value: "Lost" },
	];

	const { data: users = [] } = useQuery({
		queryKey: ["salespeople"],
		queryFn: getAllUsers,
	});

	const { data: filteredLeads = [] } = useQuery({
		queryKey: ["leads", "search", searchQuery, filterStatus, filterSource, filterSalesperson],
		queryFn: () =>
			searchLeads(
				searchQuery || undefined,
				filterStatus,
				filterSource,
				filterSalesperson
			),
		staleTime: 0,
	});

	// Notify parent of filtered results
	useEffect(() => {
		onFilter?.(filteredLeads);
	}, [filteredLeads, onFilter]);

	const hasActiveFilters =
		searchQuery.trim() !== "" ||
		filterStatus !== "all" ||
		filterSource !== "all" ||
		filterSalesperson !== "all";

	const clearFilters = () => {
		setSearchQuery("");
		setFilterStatus("all");
		setFilterSource("all");
		setFilterSalesperson("all");
	};
	return (
		<>
			{/* Search and Filters */}
			<div className="px-6 pb-4">
				<div className="flex flex-wrap items-center gap-3">
					{/* Search Bar */}
					<div className="relative flex-1 min-w-[250px] max-w-md">
						<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search leads by name, company, or email..."
							className="pl-9 bg-background"
						/>
					</div>

					{/* Status Filter */}
					<Select value={filterStatus} onValueChange={setFilterStatus}>
						<SelectTrigger className="w-[160px] bg-background">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
						{statusOptions.map((col) => (
							<SelectItem key={col.value} value={col.value}>
									{col.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Lead Source Filter */}
					<Select value={filterSource} onValueChange={setFilterSource}>
						<SelectTrigger className="w-[160px] bg-background">
							<SelectValue placeholder="Lead Source" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Sources</SelectItem>
							{leadSources.map((source) => (
								<SelectItem key={source} value={source}>
									{source}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Salesperson Filter */}
					<Select value={filterSalesperson} onValueChange={setFilterSalesperson}>
						<SelectTrigger className="w-[180px] bg-background">
							<SelectValue placeholder="Salesperson" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Salespeople</SelectItem>
						{(users as User[]).map((person) => (
							<SelectItem key={person.id} value={String(person.id)}>
								{person.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Clear Filters Button */}
					{hasActiveFilters && (
						<Button
							variant="ghost"
							size="sm"
							onClick={clearFilters}
							className="text-muted-foreground"
						>
							<X className="h-4 w-4 mr-1" />
							Clear
						</Button>
					)}
				</div>

				{/* Active Filters Summary */}
				{hasActiveFilters && (
					<div className="mt-3 text-sm text-muted-foreground">
						Showing {filteredLeads.length} results
					</div>
				)}
			</div>
		</>
	);
}
