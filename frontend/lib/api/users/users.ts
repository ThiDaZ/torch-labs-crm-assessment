export const getAllUsers = async () => {
	const response = await fetch(`/api/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Failed to fetch users";
		throw new Error(errorMessage);
	}

	const users = await response.json();
	return users;
};
