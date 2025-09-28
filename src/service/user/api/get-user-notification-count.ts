export const getUserNotificationCount = async () => {
  const res = await fetch("/api/user/unread-notifications");
  if (!res.ok) throw new Error("Failed to get user's unread notifications");
  return res.json() as Promise<{ count: number }>
}