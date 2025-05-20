import { User } from "@/types/authentication";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUserQuery = () => useQuery({
  queryFn: async () => {
    const res = await fetch("/api/user");
    if (!res.ok) throw new Error("failed to fetch user");
    return res.json() as Promise<User>;
  },
  queryKey: ["user"],
  retry: 1,
});

export const useUserNotificationCount = () => useQuery({
  queryFn: async () => {
    const res = await fetch("/api/user/unread-notifications");
    if (!res.ok) throw new Error("Failed to get user's unread notifications");
    return res.json() as Promise<{ count: number }>
  },
  queryKey: ["user", "notifications"]
})