import { UserLibraryParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getUserLibrarySession } from "../api/get-user-library-session";
import { libraryKeys } from "./query-keys";

export const getUserLibraryQueryOptionsSession = (params: UserLibraryParams, session: RequestCookie) => queryOptions({
  retry: 1,
  refetchOnWindowFocus: false,
  queryFn: () => getUserLibrarySession(params, session),
  queryKey: libraryKeys.getUserLibrary(params),
});

export const useGetUserLibraryWithSession = (params: UserLibraryParams, session: RequestCookie) => useQuery(
  getUserLibraryQueryOptionsSession(params, session)
);