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
