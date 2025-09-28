import { UserLibraryParams } from "@/lib/schemas/user-library-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getUserLibraryClientSide } from "../api/get-user-library-client-side";
import { libraryKeys } from "./query-keys";

const getUserLibraryQueryOptions = (params: UserLibraryParams) => queryOptions({
  retry: 0,
  refetchOnWindowFocus: false,
  queryFn: () => getUserLibraryClientSide(params),
  queryKey: libraryKeys.getUserLibrary(params),
});

export const useGetUserLibrary = (params: UserLibraryParams) => useQuery(getUserLibraryQueryOptions(params));