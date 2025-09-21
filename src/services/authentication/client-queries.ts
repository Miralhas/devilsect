import { env } from "@/env";
import { PaginationSchema, PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { buildQueryString } from "@/lib/utils";
import { User, UserInfo } from "@/types/authentication";
import { PaginatedQuery } from "@/types/pagination";
import { FetchQueryOptions, keepPreviousData, useQuery } from "@tanstack/react-query";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const getAllUsers = async (params: PaginationSchemaParams, session?: RequestCookie) => {
  if (!session) throw new Error("Unauthorized: Missing or invalid session");
  const parsedParams = PaginationSchema.parse(params);
  const queryString = buildQueryString(parsedParams);
  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + `/users${queryString}`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` },
    next: { tags: ["users"] },
  });
  if (!res.ok) throw new Error("failed to fetch users");
  return res.json() as Promise<PaginatedQuery<UserInfo[]>>;
}


export const useCurrentUserQuery = () => useQuery({
  queryFn: async () => {
    const res = await fetch("/api/user");
    if (!res.ok) throw new Error("failed to fetch user");
    return res.json() as Promise<User>;
  },
  queryKey: ["user"],
  retry: 1,
  refetchOnWindowFocus: false,
});

export const useUserNotificationCount = () => useQuery({
  queryFn: async () => {
    const res = await fetch("/api/user/unread-notifications");
    if (!res.ok) throw new Error("Failed to get user's unread notifications");
    return res.json() as Promise<{ count: number }>
  },
  queryKey: ["user", "notifications"],
  placeholderData: keepPreviousData
})

export const useGetAllUsers = (params: PaginationSchemaParams, session?: RequestCookie) => useQuery(allUsersQueryOptions(params, session));

export const allUsersQueryOptions = (params: PaginationSchemaParams, session?: RequestCookie):
  FetchQueryOptions<PaginatedQuery<UserInfo[]>> => {
  return {
    queryFn: () => getAllUsers(params, session),
    queryKey: ["user", "list", params]
  }
}

export const allUsersInitialParams: Required<PaginationSchemaParams> = { page: 0, size: 50 };