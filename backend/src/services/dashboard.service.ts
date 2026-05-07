import { count } from "drizzle-orm";
import { db } from "../db/index.ts";
import { leadsTable } from "../db/schema.ts";

// Get Dashboard Metrics Service
export const getDashboardMetricsService = async () => {
	const allLeads = await db.select().from(leadsTable);

	const totalLeads = allLeads.length;

	const newLeads = allLeads.filter((lead) => {
		lead.status === "New";
	}).length;

	const qualifiedLeads = allLeads.filter((lead) => {
		lead.status === "Qualified";
	}).length;

	const wonLeads = allLeads.filter((lead) => {
		lead.status === "Won";
	}).length;

	const lostLeads = allLeads.filter((lead) => {
		lead.status === "Lost";
	}).length;

	const totalEstimatedValue = allLeads.reduce((sum, lead) => sum + Number(lead.dealValue), 0);

	const totalWonValue = allLeads
		.filter((lead) => lead.status === "Won")
		.reduce((sum, lead) => sum + Number(lead.dealValue), 0);

	return {
		totalLeads,
		newLeads,
		qualifiedLeads,
		wonLeads,
		lostLeads,
		totalEstimatedValue,
		totalWonValue,
	};

};
