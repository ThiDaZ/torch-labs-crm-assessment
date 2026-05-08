export const formattedDate = (value: string | null | undefined) => {
	if (!value) {
		return "N/A";
	}

	const parsedDate = new Date(value);

	if (!Number.isNaN(parsedDate.getTime())) {
		// Example output: "May 8, 2026, 3:30 PM"
		return parsedDate.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	} else {
		return "N/A";
	}
};
