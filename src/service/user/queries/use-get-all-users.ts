import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getAllUsers } from "../api/get-all-users";
import { userKeys } from "./query-keys";

export const allUsersQueryOptions = (params: PaginationSchemaParams, session?: RequestCookie) => queryOptions({
  queryFn: () => getAllUsers(params, session),
  queryKey: userKeys.allUsers(params),
});

export const useGetAllUsers = (params: PaginationSchemaParams, session?: RequestCookie) => useQuery(allUsersQueryOptions(params, session));
export const allUsersInitialParams: Required<PaginationSchemaParams> = { page: 0, size: 50 };