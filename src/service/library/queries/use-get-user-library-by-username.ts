import { UserLibraryParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getUserLibraryByUsername } from "../api/get-user-library-by-username";
import { libraryKeys } from "./query-keys";

export const getUserLibraryByUsernameQueryOptions = (username: string, params: UserLibraryParams = {}) => queryOptions({
  queryFn: () => getUserLibraryByUsername(username, params),
  queryKey: libraryKeys.getUserLibrary(params),
});

export const useGetUserLibraryByUsername = (
  username: string, params: UserLibraryParams = {}
) => useQuery(getUserLibraryByUsernameQueryOptions(username, params));