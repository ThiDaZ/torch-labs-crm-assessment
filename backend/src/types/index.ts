export interface LeadData {
	leadName: string;
	companyName?: string | "";
	email: string;
	phoneNumber: string;
	leadSource: "Website" | "LinkedIn" | "Referral" | "Cold Email";
	dealValue: number;
	assignedSalespersonId: number;
}

export interface LeadStatus {
	status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
}

export interface LeadSource {
	source: "Website" | "LinkedIn" | "Referral" | "Cold Email";
}

export interface LeadSearchFilters {
	query: string;
	status?: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
	source?: "Website" | "LinkedIn" | "Referral" | "Cold Email";
	salePerson?: number;
	order?: "asc" | "desc";
}
