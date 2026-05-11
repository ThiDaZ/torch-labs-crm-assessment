export const getCurrentUser = async () => {

  const res = await fetch(`/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to fetch current user");
  }

  return res.json();
};
