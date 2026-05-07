import { Lead } from "@/lib/types";

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
