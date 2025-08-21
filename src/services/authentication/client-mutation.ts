import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => useMutation({
  mutationFn: async () => {
    const res = await fetch("/api/user/logout", { method: "POST" });
    if (!res.ok) throw new Error("[LogouMutation] - Failed to logou current user");
  },
}) 