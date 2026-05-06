import { db } from "../db/index.ts";
import { leadsTable } from "../db/schema.ts";

interface LeadData {
	leadName: string;
	companyName?: string | "";
	email: string;
	phoneNumber: string;
	leadSource: "Website" | "LinkedIn" | "Referral" | "Cold Email";
	dealValue: number;
	assignedSalespersonId: number;
}

export const createLeadService = async (leadData: LeadData) => {

	if (
		!leadData.leadName ||
		!leadData.email ||
		!leadData.phoneNumber ||
		!leadData.leadSource ||
		!leadData.dealValue ||
		!leadData.assignedSalespersonId
	) {
		throw new Error("Missing required lead fields");
	}

	const result = await db
		.insert(leadsTable)
		.values({
			leadName: leadData.leadName,
			companyName: leadData.companyName || null,
			email: leadData.email,
			phoneNumber: leadData.phoneNumber,
			leadSource: leadData.leadSource,
			dealValue: leadData.dealValue,
			assignedSalespersonId: leadData.assignedSalespersonId,
		})
    .returning();

	return result;
};
