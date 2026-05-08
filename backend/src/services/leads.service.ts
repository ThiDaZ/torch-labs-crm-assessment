import { db } from "../db/index.ts";
import { leadsTable, notesTable, usersTable } from "../db/schema.ts";
import { asc, desc, eq, ilike, or } from "drizzle-orm";
import type { LeadData, LeadSource, LeadStatus } from "../types/index.ts";

// Create new Lead Service
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

// Get all leads Service
export const getLeadsService = async () => {
	const leads = await db
		.select({
			id: leadsTable.id,
			leadName: leadsTable.leadName,
			companyName: leadsTable.companyName,
			email: leadsTable.email,
			phoneNumber: leadsTable.phoneNumber,
			leadSource: leadsTable.leadSource,
			status: leadsTable.status,
			dealValue: leadsTable.dealValue,
			assignedSalesperson: {
				id: usersTable.id,
				name: usersTable.name,
			},
			created_at: leadsTable.created_at,
			updated_at: leadsTable.updated_at,
		})
		.from(leadsTable)
		.leftJoin(usersTable, eq(leadsTable.assignedSalespersonId, usersTable.id));
	return leads;
};

// Get lead by ID Service
export const getLeadByIdService = async (id: number) => {
	const lead = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
	return lead;
};

// Update lead Service
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

// Delete lead Service
export const deleteLeadService = async (id: number) => {
	await db.delete(notesTable).where(eq(notesTable.leadId, id));

	const result = await db.delete(leadsTable).where(eq(leadsTable.id, id)).returning();
	console.log(result);

	if (result.length === 0) {
		throw new Error("Lead not found");
	}

	return result;
};

// Change lead status Service
export const changeLeadStatusService = async (
	id: number,
	status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost",
) => {
	const result = await db
		.update(leadsTable)
		.set({ status })
		.where(eq(leadsTable.id, id))
		.returning();

	if (result.length === 0) {
		throw new Error("Lead not found");
	}

	return result;
};

// Search leads Service with filters and sorting
export const searchLeadsService = async (
	query?: string,
	status?: LeadStatus["status"],
	source?: LeadSource["source"],
	salePerson?: number,
	order: "asc" | "desc" = "desc",
) => {
	const filters = [];

	// only add if query exists
	if (query && query.trim()) {
		const searchCondition = or(
			ilike(leadsTable.leadName, `%${query}%`),
			ilike(leadsTable.email, `%${query}%`),
			ilike(leadsTable.companyName, `%${query}%`),
		);
		filters.push(searchCondition);
	}

	if (status) filters.push(eq(leadsTable.status, status));
	if (source) filters.push(eq(leadsTable.leadSource, source));
	if (salePerson) filters.push(eq(leadsTable.assignedSalespersonId, salePerson));

	const orderBy = order === "asc" ? asc(leadsTable.created_at) : desc(leadsTable.created_at);

	const leads = await db
		.select({
			id: leadsTable.id,
			leadName: leadsTable.leadName,
			companyName: leadsTable.companyName,
			email: leadsTable.email,
			phoneNumber: leadsTable.phoneNumber,
			leadSource: leadsTable.leadSource,
			status: leadsTable.status,
			dealValue: leadsTable.dealValue,
			assignedSalesperson: {
				id: usersTable.id,
				name: usersTable.name,
			},
			created_at: leadsTable.created_at,
			updated_at: leadsTable.updated_at,
		})
		.from(leadsTable)
		.leftJoin(usersTable, eq(leadsTable.assignedSalespersonId, usersTable.id))
		.where(filters.length > 0 ? or(...filters) : undefined)
		.orderBy(orderBy);
	return leads;
};
