export const logout = async () => {
  const res = await fetch("/api/user/logout", { method: "POST" });
  if (!res.ok) throw new Error("[LogouMutation] - Failed to logou current user");
};