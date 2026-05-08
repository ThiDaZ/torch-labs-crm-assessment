export const getCurrentUser = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("API URL is not defined");

  const res = await fetch(`${apiUrl}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to fetch current user");
  }

  return res.json();
};
