export const getDashboardMetrics = async () => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) {
		throw new Error("API URL is not defined in environment variables");
	}

	const response = await fetch(`${apiUrl}/dashboard/metrics`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch dashboard metrics`);
	}

	return response.json();
};
