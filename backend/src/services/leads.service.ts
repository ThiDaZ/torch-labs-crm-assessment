import { db } from "../db/index.ts";
import { leadsTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";

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
			dealValue: leadData.dealValue.toFixed(2),
			assignedSalespersonId: leadData.assignedSalespersonId,
		})
		.returning();

	return result;
};

export const getLeadsService = async () => {
	const leads = await db.select().from(leadsTable);
	return leads;
};

export const getLeadByIdService = async (id: number) => {

  console.log("Fetching lead with ID:", id);

	const lead = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
	return lead;
};
