import { Lead, LeadDetail, LeadListItem } from "@/lib/types";

// Create a new lead API call
export const createLead = async (newLead: Lead) => {
	const response = await fetch(`/api/leads`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newLead),
		credentials: "include",
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to create lead";
		throw new Error(errorMessage);
	}
	return response.json();
};

// Get all leads API call
export const getLeads = async (): Promise<LeadListItem[]> => {
	const response = await fetch(`/api/leads`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to fetch leads";
		throw new Error(errorMessage);
	}
	const data: { leads?: LeadListItem[] } = await response.json();
	return data.leads ?? [];
};

// Get lead by ID API call
export const getLeadById = async (leadId: string): Promise<LeadDetail> => {
	const response = await fetch(`/api/leads/${leadId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	const payload: { lead?: Record<string, unknown>; error?: string; message?: string } =
		await response.json();

	if (!response.ok) {
		const errorMessage = payload.error ?? payload.message ?? "Failed to fetch lead details";
		throw new Error(errorMessage);
	}

	const lead = payload.lead;
	if (!lead) {
		throw new Error("Failed to fetch lead details");
	}

	return {
		id: String(lead.id ?? leadId),
		leadName: String(lead.leadName ?? ""),
		companyName: String(lead.companyName ?? ""),
		email: String(lead.email ?? ""),
		phoneNumber: String(lead.phoneNumber ?? ""),
		leadSource: String(lead.leadSource ?? ""),
		status: String(lead.status ?? ""),
		dealValue: Number(lead.dealValue ?? 0),
		assignedSalesperson: {
			id: String((lead.assignedSalesperson as { id?: string | number } | undefined)?.id ?? ""),
			name: String((lead.assignedSalesperson as { name?: string } | undefined)?.name ?? ""),
		},
		createdAt: String(lead.created_at ?? lead.createdAt ?? ""),
		updatedAt: lead.updated_at
			? String(lead.updated_at)
			: lead.updatedAt
				? String(lead.updatedAt)
				: null,
	};
};

// Update lead status API call
export const updateStatus = async (leadId: string, newStatus: string) => {
	const response = await fetch(`/api/leads/${leadId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ status: newStatus }),
		credentials: "include",
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to update lead status";
		throw new Error(errorMessage);
	}
	return response.json();
};

// Delete lead API call
export const deleteLead = async (leadId: string) => {
	const response = await fetch(`/api/leads/${leadId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to delete lead";
		throw new Error(errorMessage);
	}
	return response.json();
};

// Update lead API call
export const updateLead = async (leadId: string, updatedData: Partial<Lead>) => {
	const response = await fetch(`/api/leads/${leadId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedData),
		credentials: "include",
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to update lead";
		throw new Error(errorMessage);
	}
	return response.json();
};

// Search leads API call with filters and sorting
export const searchLeads = async (
	query?: string,
	status?: string,
	source?: string,
	salePerson?: string,
	order: "asc" | "desc" = "desc",
): Promise<LeadListItem[]> => {
	const params = new URLSearchParams();
	if (query) params.append("query", query);
	if (status && status !== "all") params.append("status", status);
	if (source && source !== "all") params.append("source", source);
	if (salePerson && salePerson !== "all") params.append("salePerson", salePerson);
	params.append("order", order);

	const response = await fetch(`/api/leads/search?${params.toString()}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to search leads";
		throw new Error(errorMessage);
	}
	const data: { leads?: LeadListItem[] } = await response.json();
	return data.leads ?? [];
};
