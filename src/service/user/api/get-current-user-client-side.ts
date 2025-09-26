import { User } from "@/types/authentication";

export const getCurrentUserClientSide = async () => {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("failed to fetch user");
  return res.json() as Promise<User>;
};