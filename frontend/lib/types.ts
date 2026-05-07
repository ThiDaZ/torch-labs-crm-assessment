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