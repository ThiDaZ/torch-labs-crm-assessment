export interface DashboardMetricsProps {
	data: {
		totalLeads: number;
		newLeads: number;
		qualifiedLeads: number;
		wonLeads: number;
		lostLeads: number;
		totalEstimatedValue: number;
		totalWonValue: number;
		totalLostValue: number;
		contactedLeads: number;
		proposalLeads: number;
	};
}

export interface Lead {
	leadName: string;
	companyName: string;
	email: string;
	phoneNumber: string;
	leadSource: "Website" | "LinkedIn" | "Referral" | "Cold Email";
	dealValue: number;
	status?: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
	assignedSalespersonId: number;
}

export interface LeadListItem {
	id: string;
	leadName: string;
	companyName: string;
	email: string;
	phoneNumber: string;
	leadSource: string;
	status: string;
	dealValue: number;
	assignedSalesperson: {
		id: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
}

export interface LeadDetail {
	id: string;
	leadName: string;
	companyName: string;
	email: string;
	phoneNumber: string;
	leadSource: string;
	status: string;
	dealValue: number;
	assignedSalesperson: {
		id: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string | null;
}

export interface User {
	id: number | string;
	name: string;
}

export interface Note {
	id: number;
	leadId: number;
	content: string;
	createdBy: number;
	createdAt: string;
	updatedAt: string;
}
