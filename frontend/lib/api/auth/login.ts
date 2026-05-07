export const loginUser = async (email: string, password: string) => {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
		credentials: "include",
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		const errorMessage = errorResponse.error ?? "Login failed";
		throw new Error(errorMessage);
	}
	return response.json();
};
