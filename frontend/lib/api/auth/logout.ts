export const logoutUser = async () => {

  const res = await fetch(`/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Logout failed");
  }

  return res.json();
};
