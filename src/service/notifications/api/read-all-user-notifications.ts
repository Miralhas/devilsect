export const readAllUserNotifications = async () => {
  const res = await fetch("/api/user/notifications/read-all", {
    method: "PUT"
  });

  if (!res.ok) {
    throw new Error("Failed to read user notifications");
  }
}