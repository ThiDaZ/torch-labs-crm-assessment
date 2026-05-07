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
	leadSource: "website" | "LinkedIn" | "referral" | "cold email" | "event";
	dealValue: number;
	assignedSalespersonId: string;
}
