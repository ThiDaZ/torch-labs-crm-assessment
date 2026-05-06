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
	if (!leadData) {
		throw new Error("Request body is empty");
	}

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
			dealValue: Number(leadData.dealValue).toFixed(2),
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
	const lead = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
	return lead;
};

export const updateLeadService = async (id: number, leadData: Partial<LeadData>) => {
	if (!leadData) {
		throw new Error("Request body is empty");
	}

	const result = await db
		.update(leadsTable)
		.set({
			...leadData,
			dealValue: String(leadData.dealValue),
			updated_at: new Date(),
		})
		.where(eq(leadsTable.id, id))
		.returning();

	if (result.length === 0) {
		throw new Error("Lead not found");
	}

	return result;
};

export const deleteLeadService = async (id: number) => {
	const result = await db.delete(leadsTable).where(eq(leadsTable.id, id)).returning();
  console.log(result);

  if (result.length === 0) {
    throw new Error("Lead not found");
  }
};
