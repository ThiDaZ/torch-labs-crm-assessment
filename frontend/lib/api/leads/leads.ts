import { Lead, LeadListItem } from "@/lib/types";

export const createLead = async (newLead: Lead) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) {
		throw new Error("API URL is not defined in environment variables");
	}

	const response = await fetch(`${apiUrl}/leads`, {
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

export const getLeads = async (): Promise<LeadListItem[]> => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) {
		throw new Error("API URL is not defined in environment variables");
	}

	const response = await fetch(`${apiUrl}/leads`, {
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

export const updateStatus = async (leadId: string, newStatus: string) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) {
		throw new Error("API URL is not defined in environment variables");
	}
	const response = await fetch(`${apiUrl}/leads/${leadId}`, {
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

export const deleteLead = async (leadId: string) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) {
		throw new Error("API URL is not defined in environment variables");
	}
	const response = await fetch(`${apiUrl}/leads/${leadId}`, {
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

export const updateLead = async (leadId: string, updatedData: Partial<Lead>) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) {
		throw new Error("API URL is not defined in environment variables");
	}
	const response = await fetch(`${apiUrl}/leads/${leadId}`, {
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