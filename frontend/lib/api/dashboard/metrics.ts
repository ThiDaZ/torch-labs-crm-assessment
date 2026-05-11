export const getDashboardMetrics = async () => {

	const response = await fetch(`/api/dashboard/metrics`, {
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
